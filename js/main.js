'use strict';
const BOMB = '💣 ';
const EMPTY = '';
const FLAG = '🚩';

var elBoard = document.querySelector('.board');

var gBoard;
var gEmptyPositions;
var gBombsPos;

var gLevels = {
  beginner: {
    SIZE: 4,
    MINES: 2,
  },
  medium: {
    SIZE: 8,
    MINES: 12,
  },
  expert: {
    SIZE: 12,
    MINES: 30,
  },
};

var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
};

function initGame() {
  gEmptyPositions = emptyPositions();
  gBoard = createBoard(gLevels.beginner.SIZE, gLevels.beginner.SIZE);
  gBombsPos = setMinesNegsCount();
  buildBoard();
  renderBoard(gBoard);
}

function buildBoard() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard.length; j++) {
      if (gBoard[i][j].isMine) continue;
      gBoard[i][j].minesAroundCount = countMinesNeighbor(gBoard, i, j);
    }
  }
}
function setMinesNegsCount() {
  var bombPosition = [];
  for (var i = 0; i < gLevels.beginner.MINES; i++) {
    var currIdx = getRandomInt(gEmptyPositions.length - 1, 0);
    var availablePos = gEmptyPositions[currIdx];
    bombPosition.push(availablePos);
    gBoard[availablePos.i][availablePos.j].isMine = true;
    gEmptyPositions.splice(currIdx, 1);
  }
  return bombPosition;
}

function renderBoard(board) {
  elBoard.innerHTML = '';
  var strHtml = '';
  for (var i = 0; i < board.length; i++) {
    strHtml += '<tr>';
    for (var j = 0; j < board.length; j++) {
      strHtml += `<td id="cell-${i}-${j}" class="unclicked"
       onclick="cellClicked(this,${i},${j})">${
        gBoard[i][j].isMine
          ? BOMB
          : gBoard[i][j].minesAroundCount
          ? gBoard[i][j].minesAroundCount
          : ' '
      }
      </td>`;
    }

    strHtml += '</tr>';
  }
  elBoard.innerHTML = strHtml;
}

function emptyPositions() {
  var board = [];
  for (var i = 0; i < gLevels.beginner.SIZE; i++) {
    for (var j = 0; j < gLevels.beginner.SIZE; j++) {
      board.push({ i, j });
    }
  }
  return board;
}
function cellClicked(elCell, i, j) {
  var cell = gBoard[i][j];
  if (cell.isShown || cell.isMarked) return;
  else {
    if (cell.isMine) {
      for (var i = 0; i < gBombsPos.length; i++) {
        document
          .querySelector(getSelector(gBombsPos[i]))
          .classList.remove('unclicked');
      }
      gGame.isOn = false;
    }
    gGame.shownCount++;

    elCell.classList.remove('unclicked');

    cell.isShown = true;
  }
}
function cellMarked(elCell, ev) {
  ev.preventDefault();
}

function checkGameover() {}

function expandShown(board, elCell, i, j) {
  // elCell.classList.remove('unclicked');
}

// function sizeChoose(elBtn, size) {
//   return gLevels.
// }
function getSelector(coord) {
  console.log(coord);
  return '#cell-' + coord.i + '-' + coord.j;
}
