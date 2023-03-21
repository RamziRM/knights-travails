// Create a 2D array to represent the game board
const boardSize = 8;
const board = Array.from({ length: boardSize }, () =>
  Array.from({ length: boardSize }, () => false)
);

// Define the knight's moves
const mapKnightMoves = [  [2, 1],
  [1, 2],
  [-1, 2],
  [-2, 1],
  [-2, -1],
  [-1, -2],
  [1, -2],
  [2, -1],
];

// Define a function to check if a cell is valid on the board
const isValidCell = (x, y) => {
  return x >= 0 && x < boardSize && y >= 0 && y < boardSize;
};

// Define a function to get all possible moves from a cell
const getValidMoves = (x, y) => {
  const moves = [];
  for (let i = 0; i < mapKnightMoves.length; i++) {
    const dx = mapKnightMoves[i][0];
    const dy = mapKnightMoves[i][1];
    const newX = x + dx;
    const newY = y + dy;
    if (isValidCell(newX, newY)) {
      moves.push([newX, newY]);
    }
  }
  return moves;
};

// Define the knight class
class Knight {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // Define a function to move the knight to a new cell
  moveTo(x, y) {
    this.x = x;
    this.y = y;
  }

  // Define a function to get all possible moves from the knight's current cell
  getPossibleMoves() {
    return getValidMoves(this.x, this.y);
  }
}

// Define the knightMoves function
const knightMoves = (start, end) => {
  // Create a queue for the BFS algorithm
  const queue = [];
  // Add the start cell to the queue
  queue.push([start]);
  // Create a set to keep track of visited cells
  const visited = new Set();
  visited.add(JSON.stringify(start));
  // Run the BFS algorithm
  while (queue.length > 0) {
    // Get the next path from the queue
    const path = queue.shift();
    // Get the last cell in the path
    const [x, y] = path[path.length - 1];
    // Check if we've reached the end cell
    if (x === end[0] && y === end[1]) {
      // Return the path if we have
      return path;
    }
    // Get all possible moves from the current cell
    const knight = new Knight(x, y);
    const moves = knight.getPossibleMoves();
    // Add each valid move to the queue
    for (let i = 0; i < moves.length; i++) {
      const [newX, newY] = moves[i];
      const cell = [newX, newY];
      if (!visited.has(JSON.stringify(cell))) {
        const newPath = [...path, cell];
        queue.push(newPath);
        visited.add(JSON.stringify(cell));
      }
    }
  }
  // Return null
  return null;
};
