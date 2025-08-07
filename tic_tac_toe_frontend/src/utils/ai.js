// PUBLIC_INTERFACE
export function getEmptyIndices(squares) {
  /** Returns an array of indices that are not occupied in squares. */
  return squares.map((val, i) => (val ? null : i)).filter(i => i !== null);
}

// PUBLIC_INTERFACE
export function basicAIMove(squares, aiMark = 'O') {
  /**
   * Very basic AI: pick the first available move.
   * Upgrade with smarter logic as needed.
   * @param {Array} squares - Current board
   * @param {string} aiMark - "X" or "O"
   * @returns Index to place AI move
   */
  const empty = getEmptyIndices(squares);
  // Naive: random empty cell for some "unpredictability"
  if (!empty.length) return null;
  return empty[Math.floor(Math.random() * empty.length)];
}
