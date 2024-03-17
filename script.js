console.log("We in");

// Should move this to file
const mazeData = {
  "rows": 6,
  "cols": 7,
  "start": {
      "row": 0,
      "col": 0
  },
  "goal": {
      "row": 1,
      "col": 0
  },
  "maze": [
    [
      { "row": 0, "col": 0, "north": true, "east": false, "west": true, "south": true },
      { "row": 0, "col": 1, "north": true, "east": true, "west": false, "south": false },
      { "row": 0, "col": 2, "north": true, "east": false, "west": true, "south": false },
      { "row": 0, "col": 3, "north": true, "east": true, "west": false, "south": false },
      { "row": 0, "col": 4, "north": true, "east": false, "west": true, "south": true },
      { "row": 0, "col": 5, "north": true, "east": false, "west": false, "south": false },
      { "row": 0, "col": 6, "north": true, "east": true, "west": false, "south": false }
    ],
    [
      { "row": 1, "col": 0, "north": true, "east": true, "west": true, "south": false },
      { "row": 1, "col": 1, "north": false, "east": false, "west": true, "south": true },
      { "row": 1, "col": 2, "north": false, "east": true, "west": false, "south": true },
      { "row": 1, "col": 3, "north": false, "east": true, "west": true, "south": false },
      { "row": 1, "col": 4, "north": true, "east": false, "west": true, "south": false },
      { "row": 1, "col": 5, "north": false, "east": true, "west": false, "south": true },
      { "row": 1, "col": 6, "north": false, "east": true, "west": true, "south": false }
    ],
    [
      { "row": 2, "col": 0, "north": false, "east": false, "west": true, "south": false },
      { "row": 2, "col": 1, "north": true, "east": false, "west": false, "south": true },
      { "row": 2, "col": 2, "north": true, "east": false, "west": false, "south": true },
      { "row": 2, "col": 3, "north": false, "east": true, "west": false, "south": true },
      { "row": 2, "col": 4, "north": false, "east": true, "west": true, "south": false },
      { "row": 2, "col": 5, "north": true, "east": false, "west": true, "south": false },
      { "row": 2, "col": 6, "north": false, "east": true, "west": false, "south": true }
    ],
    [
      { "row": 3, "col": 0, "north": false, "east": false, "west": true, "south": true },
      { "row": 3, "col": 1, "north": true, "east": true, "west": false, "south": false },
      { "row": 3, "col": 2, "north": true, "east": false, "west": true, "south": false },
      { "row": 3, "col": 3, "north": true, "east": false, "west": false, "south": true },
      { "row": 3, "col": 4, "north": false, "east": true, "west": false, "south": true },
      { "row": 3, "col": 5, "north": false, "east": true, "west": true, "south": false },
      { "row": 3, "col": 6, "north": true, "east": true, "west": true, "south": false }
    ],
    [
      { "row": 4, "col": 0, "north": true, "east": false, "west": true, "south": false },
      { "row": 4, "col": 1, "north": false, "east": true, "west": false, "south": true },
      { "row": 4, "col": 2, "north": false, "east": false, "west": true, "south": true },
      { "row": 4, "col": 3, "north": true, "east": true, "west": false, "south": false },
      { "row": 4, "col": 4, "north": true, "east": true, "west": true, "south": false },
      { "row": 4, "col": 5, "north": false, "east": true, "west": true, "south": false },
      { "row": 4, "col": 6, "north": false, "east": true, "west": true, "south": false }
    ],
    [
      { "row": 5, "col": 0, "north": false, "east": false, "west": true, "south": true },
      { "row": 5, "col": 1, "north": true, "east": false, "west": false, "south": true },
      { "row": 5, "col": 2, "north": true, "east": false, "west": false, "south": true },
      { "row": 5, "col": 3, "north": false, "east": true, "west": false, "south": true },
      { "row": 5, "col": 4, "north": false, "east": false, "west": true, "south": true },
      { "row": 5, "col": 5, "north": false, "east": false, "west": false, "south": true },
      { "row": 5, "col": 6, "north": false, "east": true, "west": false, "south": true }
    ]
  ]
};


//********* MODEL *********

let startCell = "🚀"
let goalCell = "🏁"

//Stack to keep track of the route
let route = []; 

// Maze model
function mazeModel(rows, cols) {
    const maze = [];
    for (let i = 0; i < rows; i++) {
        maze.push([]);
        for (let j = 0; j < cols; j++) {
            maze[i].push({
                north: false, 
                east: false,
                south: false,
                west: false
            });
        }
    }
    return maze;
}

// Function to visit a cell and find a path through the maze
function visitCell(row, col) {
  const mazeElement = document.getElementById('maze');
  const cells = mazeElement.querySelectorAll('.cell');
  const index = row * mazeData.cols + col;
  const cell = cells[index];
  
  // Mark the cell as visited
  cell.visited = true;
  // Change the color of the cell to lightgreen
  changeCellColor(row, col, 'lightgreen');
  
  // Push the cell to the route stack
  route.push(cell);
  
  // If the cell is the goal, we're done
  if (row === mazeData.goal.row && col === mazeData.goal.col) {
    console.log('Goal reached!');
    return true;
  }
  
  // Define the order of directions to visit cells in
  const directions = ['east', 'south', 'west', 'north'];
  
  // Loop through the directions
  for (let dir of directions) {
    let nextRow = row, nextCol = col;
    // Update the next row and column based on the direction
    if (dir === 'east') nextCol++;
    else if (dir === 'south') nextRow++;
    else if (dir === 'west') nextCol--;
    else if (dir === 'north') nextRow--;
    
    // Check if the next cell is within the maze bounds
    if (nextRow >= 0 && nextRow < mazeData.rows &&
        nextCol >= 0 && nextCol < mazeData.cols) {
      const nextIndex = nextRow * mazeData.cols + nextCol;
      const nextCell = cells[nextIndex];
      
      // Check if the next cell is not visited yet and if there's no wall in the current direction
      if (!nextCell.visited && !mazeData.maze[row][col][dir.toLowerCase()]) {
        // Visit the next cell recursively
        console.log(`Visiting cell (${nextRow}, ${nextCol})...`);
        if (visitCell(nextRow, nextCol)) {
          return true; // If the goal is reached, stop the recursion
        }
      }
    }
  }
  
  // If there are no more valid neighbors, backtrack
  console.log('Backtracking...');
  route.pop(); // Remove the last visited cell from the route
  return false;
}


//********* VIEW *********

// Draw maze using the provided model
function drawMaze(mazeData) {
  const mazeElement = document.getElementById('maze');

  mazeElement.innerHTML = ''; // Clear previous maze

  const rows = mazeData.rows;
  const cols = mazeData.cols;
  const maze = mazeData.maze;
  startCell = mazeData.start;
  goalCell = mazeData.goal;

  // Set grid-template-columns property dynamically
  mazeElement.style.gridTemplateColumns = `repeat(${cols}, auto)`;

  maze.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
          const cellElement = document.createElement('div');
          cellElement.classList.add('cell');
          if (cell.north) cellElement.classList.add('north');
          if (cell.east) cellElement.classList.add('east');
          if (cell.south) cellElement.classList.add('south');
          if (cell.west) cellElement.classList.add('west');

          if (cell.row === startCell.row && cell.col === startCell.col) {
            cellElement.textContent = "🚀"; 
        } else if (cell.row === goalCell.row && cell.col === goalCell.col) {
            cellElement.textContent = "🏁"; 
        }


          mazeElement.appendChild(cellElement);
      });
  });
}


function changeCellColor(row, col, color) {
  const mazeElement = document.getElementById('maze');
  const cells = mazeElement.querySelectorAll('.cell');
  const index = row * mazeData.cols + col;
  
  if (index >= 0 && index < cells.length) {
      cells[index].style.backgroundColor = color;
  } else {
      console.error('Invalid row or column provided.');
  }
}


//********* CONTROLLER *********

drawMaze(mazeData); // Draw the maze using the provided model
visitCell(0,0); // Start solver from the start cell