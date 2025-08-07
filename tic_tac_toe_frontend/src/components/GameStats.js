import React from 'react';

// PUBLIC_INTERFACE
function GameStats({ stats, mode }) {
  /**
   * Displays current stats (win/loss/draw) for players.
   * @param {Object} stats - { xWins, oWins, draws }
   * @param {string} mode - Current game mode ('AI' or '2P')
   */
  return (
    <div className="ttt-stats">
      <div className="ttt-stats-group">
        <span className="ttt-x">X</span> Wins: {stats.xWins}
      </div>
      <div className="ttt-stats-group">
        <span className="ttt-o">O</span> Wins: {stats.oWins}
      </div>
      <div className="ttt-stats-group">
        Draws: {stats.draws}
      </div>
      <div className="ttt-mode-label">
        Mode: <strong>{mode === 'AI' ? 'Player vs AI' : '2 Players'}</strong>
      </div>
    </div>
  );
}

export default GameStats;
