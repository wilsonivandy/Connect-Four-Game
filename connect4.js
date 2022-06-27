/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 7;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])
let htmlBoard;

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(j=0; j<HEIGHT; j++){
    let columns = [];
    for(i=0; i<WIDTH; i++) {
      columns.push(null)
    }
    board.push(columns);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  htmlBoard = document.getElementById('board');

  // TODO: Create The Rows and the clickable section
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: Create Rows for the table
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for(i=0; i<board.length; i++) {
    if (board[board.length - 1][x] === null) {
      return board.length - 1;
    }
    if (board[i][x] !== null) {
      if (i === 0) {
        return null;
      } else {
        return i-1;
      }
    }
  }
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell

  let newDiv = document.createElement('div');
  newDiv.classList.add('piece');
  newDiv.classList.add(`p${currPlayer}`);
  document.getElementById(`${y}-${x}`).append(newDiv);
  console.log(`${y}-${x}`);
  console.log('put in htmlboard');
  console.log(board);
  let arr = board[y];
  console.log(arr);
  arr[x] = currPlayer;
  console.log('put in JSboard');
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  //debugger;
  console.log('top row clicked')
  let x = +evt.target.id;
  console.log(board);

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  console.log('this is y: ', `${y}`);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  //check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (checkForTie()) {
    return endGame(`It's a Tie!`);
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  (currPlayer === 1) ? (currPlayer = 2) : (currPlayer = 1);
}

function checkForTie(){
  return board.every(function(arr) {
    return arr.every(el => el !== null)
  })
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // 2 for-loops iterating through each row, then each element and checking
  // if it can make a horizontal/vertical/diagonal(right or left) with divs
  // of the same class of either p1 or p2 (currPlayer)

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
