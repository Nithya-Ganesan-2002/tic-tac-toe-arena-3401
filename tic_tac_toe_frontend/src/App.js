import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';
import GameStats from './components/GameStats';
import { calculateWinner, isDraw } from './utils/game';
import { basicAIMove } from './utils/ai';

// PUBLIC_INTERFACE
function App() {
  /**
   * Main App entry: Manages game state, theme, gameplay, stats.
   */
  const [theme, setTheme] = useState('light');
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [mode, setMode] = useState('2P'); // '2P' or 'AI'
  const [stats, setStats] = useState({ xWins: 0, oWins: 0, draws: 0 });
  const [status, setStatus] = useState('');
  const [winningCombo, setWinningCombo] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Handle AI turn
    if (mode === 'AI' && !gameOver && !xIsNext) {
      const timeout = setTimeout(() => {
        const aiMove = basicAIMove(squares, 'O');
        handleMove(aiMove);
      }, 420);
      return () => clearTimeout(timeout);
    }
  }, [xIsNext, mode, gameOver, squares]);

  useEffect(() => {
    // Evaluate game end whenever board changes
    const { winner, combo } = calculateWinner(squares);
    if (winner) {
      setGameOver(true);
      setWinningCombo(combo);
      if (winner === 'X') setStats(s => ({ ...s, xWins: s.xWins + 1 }));
      else setStats(s => ({ ...s, oWins: s.oWins + 1 }));
      setStatus(`Winner: ${winner}`);
    } else if (isDraw(squares)) {
      setGameOver(true);
      setStats(s => ({ ...s, draws: s.draws + 1 }));
      setStatus('Draw!');
      setWinningCombo(null);
    } else {
      setStatus(`Next: ${xIsNext ? 'X' : 'O'}${mode === 'AI' && !xIsNext ? ' (AI)' : ''}`);
      setWinningCombo(null);
    }
  }, [squares, xIsNext, mode]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // PUBLIC_INTERFACE
  function handleMove(idx) {
    if (gameOver || squares[idx]) return;
    const board = squares.slice();
    board[idx] = xIsNext ? 'X' : 'O';
    setSquares(board);
    setXIsNext(x => !x);
  }

  // PUBLIC_INTERFACE
  function restartGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setStatus('');
    setWinningCombo(null);
    setGameOver(false);
  }

  // PUBLIC_INTERFACE
  function handleModeChange(newMode) {
    setMode(newMode);
    restartGame();
    setStats({ xWins: 0, oWins: 0, draws: 0 });
  }

  return (
    <div className="App">
      <header className="App-header">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <div className="ttt-container">
          <h1 className="ttt-title">
            Tic Tac Toe
          </h1>
          <GameStats stats={stats} mode={mode} />
          <div className="ttt-mode-switch">
            <button
              className={`ttt-mode-btn${mode === '2P' ? ' active' : ''}`}
              onClick={() => handleModeChange('2P')}
              disabled={mode === '2P'}
            >
              2 Players
            </button>
            <button
              className={`ttt-mode-btn${mode === 'AI' ? ' active' : ''}`}
              onClick={() => handleModeChange('AI')}
              disabled={mode === 'AI'}
            >
              Player vs AI
            </button>
          </div>
          <div className="ttt-status" aria-live="polite">{status}</div>
          <Board
            squares={squares}
            onClick={gameOver ? () => {} : handleMove}
            winningCombo={winningCombo}
          />
          <button
            className="ttt-reset-btn"
            onClick={restartGame}
            style={{ marginTop: 20 }}
            aria-label="Restart game"
          >
            Restart Game
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
