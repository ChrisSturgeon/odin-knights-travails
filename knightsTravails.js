class Board {
  constructor() {
    this.squaresMap = new Map();
  }

  // Returns legal moves as array for given board coordinates
  legalMoves = function (coords) {
    const offsets = [
      [1, 2],
      [2, 1],
      [2, -1],
      [1, -2],
      [-1, -2],
      [-2, -1],
      [-2, 1],
      [-1, 2],
    ];

    const moves = offsets
      .map((offset) => {
        const xCoord = coords[0] + offset[0];
        const yCoord = coords[1] + offset[1];
        if (xCoord >= 0 && xCoord <= 7 && yCoord >= 0 && yCoord <= 7) {
          return `${xCoord},${yCoord}`;
        }
      })
      .filter((move) => move);

    return moves;
  };

  // Fills squares map with keys for each board square and assigns empty array as key value
  makeSquares = function (size = 8) {
    for (let x = 0; x < size; x += 1) {
      for (let y = 0; y < size; y += 1) {
        this.squaresMap.set(`${[x, y]}`, []);
      }
    }
  };

  // Assigns viable knight-moves to moves array for each board square
  makeMoves = function () {
    for (let [key, value] of this.squaresMap) {
      let [x, y] = key.split(',');
      x = parseInt(x);
      y = parseInt(y);
      const legalMoves = this.legalMoves([x, y]);
      this.squaresMap.set(key, legalMoves);
    }
  };

  findRoute = function (start, finish) {
    const visitedSquares = {};
    const queue = [];

    visitedSquares[start] = true;
    queue.push(start);
    console.log(visitedSquares);

    while (queue.length > 0) {
      const currentSquare = queue.shift();
      console.log(currentSquare);
      // console.log(queue.items.length);

      if (currentSquare === finish) {
        console.log('Found you!');
        console.log(visitedSquares);
        break;
      }

      const movesList = this.squaresMap.get(currentSquare);

      for (let i in movesList) {
        let nextMove = movesList[i];

        if (!visitedSquares[nextMove]) {
          visitedSquares[nextMove] = true;
          const queueString = nextMove;
          queue.push(queueString);
        }
      }
    }

    console.log(visitedSquares);
    console.log(this.steps);
  };
}

const myBoard = new Board();

myBoard.makeSquares();
myBoard.makeMoves();
console.log(myBoard.squaresMap);
myBoard.findRoute('3,1', '2,2');
