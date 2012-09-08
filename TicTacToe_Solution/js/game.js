
/**
 * @fileoverview Serves as the model for the Tic-Tac-Toe example.
 *
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('ttt.Game');

goog.require('goog.array');



/**
 * Model object that keeps the state for the Tic-Tac-Toe game.
 *
 * @constructor
 * @implements {ttt.GameInterface}
 */
ttt.Game = function() {
  
  /**
   * Game board.  3x3 array of ttt.Marks.
   * @type {Array.<Array.<ttt.Mark>>}
   */
  this.board_ = null;
  
  /**
   * Game state.
   * @type {ttt.GameState}}
   */
  this.gameState_ = null;
  
  this.reset();
};


/**
 * Number of rows in the Tic-Tac-Toe game board.
 * @type {number}
 * @const
 */
ttt.Game.NUM_ROWS = 3;


/**
 * Number of columns in the Tic-Tac-Toe game board.
 * @type {number}
 * @const
 */
ttt.Game.NUM_COLS = 3;


/** inheritDoc */
ttt.Game.prototype.reset = function() {
  this.board_ = [];
  for (var row = 0; row < ttt.Game.NUM_ROWS; row++) {
    var currentRow = [];
    for (var col = 0; col < ttt.Game.NUM_COLS; col++) {
      currentRow.push(ttt.Mark.EMPTY);
    }
    this.board_.push(currentRow);
  }
  this.gameState_ = ttt.GameState.X_TURN;
};


/** inheritDoc */
ttt.Game.prototype.pressAtLocation = function(row, col) {
  if (row < 0 || row > ttt.Game.NUM_ROWS ||
      col < 0 || col > ttt.Game.NUM_COLS) {
    this.logger.warning('Invalid row/col. Row = ' + row + ' Col = ' + col);
    return;
  }
  if (this.board_[row][col] != ttt.Mark.EMPTY) {
    this.logger.info('Click on non-empty square. Row = ' + row + ' Col = ' + col);
    return;
  }
  if (this.gameState_ == ttt.GameState.X_TURN) {
    this.board_[row][col] = ttt.Mark.X_MARK;
    this.gameState_ = ttt.GameState.O_TURN;
  } else if (this.gameState_ == ttt.GameState.O_TURN) {
    this.board_[row][col] = ttt.Mark.O_MARK;
    this.gameState_ = ttt.GameState.X_TURN;
  }
  this.checkForGameOver();
};


/**
 * Updates the game state if the game is now over.
 */
ttt.Game.prototype.checkForGameOver = function() {
  if (!(this.gameState_ == ttt.GameState.X_TURN ||
        this.gameState_ == ttt.GameState.O_TURN)) {
    return; // Game has been won already.
  }
  if (this.hasMarkWon(ttt.Mark.X_MARK)) {
    this.gameState_ = ttt.GameState.X_WIN;
  } else if (this.hasMarkWon(ttt.Mark.O_MARK)) {
    this.gameState_ = ttt.GameState.O_WIN;
  } else if (this.isBoardFull()) {
    this.gameState_ = ttt.GameState.TIE;
  }
};


/**
 * Checks if the mark type (X or O) has won.
 *
 * @param {ttt.Mark} mark Mark (X or O) to check for win.
 * @return {boolean} True if this mark type has won.
 */
ttt.Game.prototype.hasMarkWon = function(mark) {
  var allMarksMatch = true;
  // Check all the columns for a win.
  for (var col = 0; col < ttt.Game.NUM_COLS; col++) {
    allMarksMatch = true;
    for (var row = 0; row < ttt.Game.NUM_ROWS; row++) {
      if (this.board_[row][col] != mark) {
        allMarksMatch = false;
        break;
      }
    }
    if (allMarksMatch) return true;
  }

  // Check all the rows for a win.
  for (var row = 0; row < ttt.Game.NUM_ROWS; row++) {
    allMarksMatch = true;
    for (var col = 0; col < ttt.Game.NUM_COLS; col++) {
      if (this.board_[row][col] != mark) {
        allMarksMatch = false;
        break;
      }
    }
    if (allMarksMatch) return true;
  }
  
  // Check down right diagonal.
  if (this.board_[0][0] == mark &&
      this.board_[1][1] == mark &&
      this.board_[2][2] == mark) {
    return true;
  }
  //Check up right diagonal.
  if (this.board_[2][0] == mark &&
      this.board_[1][1] == mark &&
      this.board_[0][2] == mark) {
    return true;
  }
  return false;
};


/**
 * Checks if the game board is full.
 *
 * @return {boolean} True if the board is full.
 */
ttt.Game.prototype.isBoardFull = function() {
  for (var row = 0; row < ttt.Game.NUM_ROWS; row++) {
    for (var col = 0; col < ttt.Game.NUM_COLS; col++) {
      if (this.board_[row][col] == ttt.Mark.EMPTY) {
        return false;
      }
    }
  }
  return true;
};


/** inheritDoc */
ttt.Game.prototype.getMarkForLocation = function(row, col) {
  return this.board_[row][col];
};


/** inheritDoc */
ttt.Game.prototype.getGameState = function() {
  return this.gameState_;
};
