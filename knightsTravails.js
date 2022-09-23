class Queue {
  constructor() {
    this.items = [];
  }

  // Adds element to the end of the queue array
  enqueue = function (element) {
    this.items.push(element);
  };

  // removes AND returns the first item in the queue array or underflow if empty
  dequeue() {
    if (this.isEmpty()) {
      return 'Underflow';
    }
    return this.items.shift();
  }

  // Returns the front element of the queue
  front() {
    if (this.isEmpty()) {
      return 'No elements in queue';
    }
    return this.items[0];
  }

  // Returns true is the items array is empty
  isEmpty() {
    return this.items.length == 0;
  }
}

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
          return [xCoord, yCoord];
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
    const startString = `${start[0]},${start[1]}`;

    const visitedSquares = {};
    const queue = new Queue();

    visitedSquares[startString] = true;
    queue.enqueue(startString);
    console.log(visitedSquares);

    while (!queue.isEmpty()) {
      const currentSquare = queue.dequeue();
      console.log(currentSquare);

      const movesList = this.squaresMap.get(currentSquare);

      for (let i in movesList) {
        let nextMove = movesList[i];

        if (!visitedSquares[nextMove]) {
          visitedSquares[nextMove] = true;
          const queueString = `${nextMove[0]},${nextMove[1]}`;
          queue.enqueue(queueString);
        }
      }
    }

    console.log(queue);
  };
}

const myBoard = new Board();

myBoard.makeSquares();
myBoard.makeMoves();
console.log(myBoard.squaresMap);
myBoard.findRoute([2, 1], [4, 5]);
