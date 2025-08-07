import React from 'react';

// PUBLIC_INTERFACE
function Square({ value, onClick, highlight }) {
  /**
   * Represents a single square in the board.
   * @param {string} value - Value to display ("X", "O", or null).
   * @param {Function} onClick - Click handler.
   * @param {boolean} highlight - True if this square is part of winning combo.
   */
  return (
    <button
      className={`ttt-square${highlight ? ' ttt-square-win' : ''}`}
      onClick={onClick}
      aria-label={value ? `Cell ${value}` : 'Empty cell'}
      disabled={!!value}
      tabIndex={0}
    >
      {value}
    </button>
  );
}

export default Square;
