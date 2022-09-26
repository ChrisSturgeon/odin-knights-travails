# odin-knights-travails

The Knight's Travails assignment from The Odin Project.

Assignment can be found <a href="https://www.theodinproject.com/lessons/javascript-knights-travails"> here.</a>

A graph is created simulating all possible moves of a knight on a chess board.

Board squares are assigned to verticies and edges as legal moves. A breadth-first-search algorithm is then used to find the shortest possible path between given start and finish squares.

A driver function has been provided with some example routes for an 8 x 8 chessboard. The results can either be viewed by running 'Node knightsTravails.js' in the terminal, or in the console of index.html.

Alternatively, you can make your own chess board of any size with by running the following functions:

const yourBoard = new Board(size);
bigBoard.makeSquares();
bigBoard.makeMoves();
bigBoard.shortestPath('x,y', 'x,y');
