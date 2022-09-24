function Graph() {
  return {
    chessBoard: new Map(),

    addVertices(size = 8 /* Standard chess board size is 8 */) {
      // Create a square board
      for (let i = 0; i < size; i += 1) {
        for (let j = 0; j < size; j += 1) {
          // The key needs to be set as a string
          // or else the get() in addEdges() does not work
          this.chessBoard.set(`${[i, j]}`, []);
        }
      }
    },

    // Connect all board squares based on knight's move pattern
    addEdges(board = this.chessBoard) {
      for (let [pos] of board) {
        const posArr = pos.split(',');
        const x = parseInt(posArr[0]);
        const y = parseInt(posArr[1]);
        // Change direction based on clock position
        const direction = {
          1: [x + 1, y + 2],
          2: [x + 2, y + 1],
          4: [x + 2, y - 1],
          5: [x + 1, y - 2],
          7: [x - 1, y - 2],
          8: [x - 2, y - 1],
          10: [x - 2, y + 1],
          11: [x - 1, y + 2],
        };
        for (let clock in direction) {
          const move = direction[clock].toString();
          if (board.has(move) && !board.get(pos).includes(move)) {
            this.chessBoard.get(pos).push(move);
          }
        }
      }
    },
  };
}

const testBoard = new Graph();
testBoard.addVertices();
testBoard.addEdges();

console.log(testBoard);
