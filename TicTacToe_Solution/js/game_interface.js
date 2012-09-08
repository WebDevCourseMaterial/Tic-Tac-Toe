
/**
 * @fileoverview Interface for the model of the Tic-Tac-Toe example.
 *
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('ttt.GameInterface');
goog.provide('ttt.Mark');
goog.provide('ttt.GameState');


/**
 * Enum for the different marks that might be in a square.
 * @enum {string}
 */
ttt.Mark = {
    EMPTY: '-',
    X_MARK: 'X',
    O_MARK: 'O'
};


/**
 * Enum for the different states the game might be in.
 * @enum {string}
 */
ttt.GameState = {
    X_TURN: 'X\'s turn',
    O_TURN: 'O\'s turn',
    X_WIN: 'X Wins!',
    O_WIN: 'O Wins!',
    TIE: 'Tie game'
};



/**
 * Interface for the methods of Tic-Tac-Toe game.
 *
 * @interface
 */
ttt.GameInterface = function() {};


/**
 * Resets the game to an empty board.
 */
ttt.GameInterface.prototype.reset = function() {};


/**
 * Inform the model that a press event occurred in the square. The model will
 * then update the state of the game. Note the row and column are zero based.
 * 
 * @param {number} row Row of the game board to get.
 * @param {number} col Column of the game board to get.
 */
ttt.GameInterface.prototype.pressAtLocation = function(row, col) {};


/**
 * Returns the mark (X, O, or empty) found in the square.
 * Note the row and column are zero based.
 *
 * @param {number} row Row of the game board to get.
 * @param {number} col Column of the game board to get.
 * @return {ttt.Mark} The mark found in that square.
 */
ttt.GameInterface.prototype.getMarkForLocation = function(row, col) {};


/**
 * Returns the current state of the game.
 *
 * @return {ttt.GameState} Current game state.
 */
ttt.GameInterface.prototype.getGameState = function() {};
