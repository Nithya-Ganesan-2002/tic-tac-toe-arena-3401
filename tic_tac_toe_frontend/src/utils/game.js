/**
 * Determines the winner and winning row for the given board.
 * @param {Array} squares - 9 elements ("X", "O", or null)
 * @returns {object} e.g. { winner: "X", combo: [0,1,2] } or { winner: null, combo: null }
 */
// PUBLIC_INTERFACE
export function calculateWinner(squares) {
  const lines = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6] // diagonals
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], combo: line };
    }
  }
  return { winner: null, combo: null };
}
// PUBLIC_INTERFACE
export function isDraw(squares) {
  return squares.every(sq => sq) && !calculateWinner(squares).winner;
}
