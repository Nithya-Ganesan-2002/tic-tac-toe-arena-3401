import React from 'react';
import Square from './Square';

// PUBLIC_INTERFACE
function Board({ squares, onClick, winningCombo }) {
  /**
   * Renders the 3x3 tic tac toe board.
   * @param {Array} squares - Current state of each square.
   * @param {Function} onClick - Click handler for a square.
   * @param {Array} winningCombo - Indices of the winning row, if any.
   */
  return (
    <div className="ttt-board">
      {squares.map((value, idx) => (
        <Square
          key={idx}
          value={value}
          onClick={() => onClick(idx)}
          highlight={winningCombo && winningCombo.includes(idx)}
        />
      ))}
    </div>
  );
}

export default Board;
