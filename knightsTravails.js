class Board {
  constructor(size = 8) {
    this.squaresMap = new Map();
    this.size = size;
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
        if (
          xCoord >= 0 &&
          xCoord <= this.size - 1 &&
          yCoord >= 0 &&
          yCoord <= this.size - 1
        ) {
          return `${xCoord},${yCoord}`;
        }
      })
      .filter((move) => move);

    return moves;
  };

  // Console logs the given path
  printPath = function (path) {
    console.log(`Shortest route from ${path[0]} to ${path[path.length - 1]}:`);
    let resultString = '';
    for (let i = 0; i < path.length - 1; i += 1) {
      resultString += ` ${path[i]} =>`;
    }
    resultString += ` ${path[path.length - 1]}`;
    console.log(resultString);
  };

  // Fills squares map with keys for each board square and assigns empty array as key value
  makeSquares = function () {
    for (let x = 0; x < this.size; x += 1) {
      for (let y = 0; y < this.size; y += 1) {
        this.squaresMap.set(`${[x, y]}`, []);
      }
    }
  };

  // Assigns viable knight-moves to moves array for each board square
  makeMoves = function () {
    for (let [key] of this.squaresMap) {
      let [x, y] = key.split(',');
      x = parseInt(x);
      y = parseInt(y);
      const legalMoves = this.legalMoves([x, y]);
      this.squaresMap.set(key, legalMoves);
    }
  };

  // Passses the first encountered path from bread-first-search of board graph to print function
  shortestPath = function (start, finish) {
    const paths = [];
    const visitedSquares = new Set();
    const queue = [];
    queue.push([start, [start]]);
    visitedSquares[start] = true;

    while (queue.length > 0) {
      let [current, path] = queue.shift();
      visitedSquares[current] = true;
      visitedSquares.add(current);

      if (current === finish) {
        paths.push(path);
        break;
      }

      const possibleMoves = this.squaresMap.get(current);

      for (let move of possibleMoves) {
        if (!visitedSquares.has(move)) {
          queue.push([move, [...path, move]]);
        }
      }
    }

    this.printPath(paths[0]);
  };
}

// Creates board and logs example routes
function driver() {
  const myBoard = new Board();
  myBoard.makeSquares();
  myBoard.makeMoves();
  myBoard.shortestPath('0,0', '2,1');
  myBoard.shortestPath('5,5', '4,2');
  myBoard.shortestPath('7,7', '6,7');
}

driver();
