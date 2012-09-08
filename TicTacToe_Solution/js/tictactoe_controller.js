
/**
 * @fileoverview Serves as the view controller for the Tic-Tac-Toe example.
 *
 * @author fisherds@gmail.com (Dave Fisher)
 */

goog.provide('ttt.TicTacToeController');

goog.require('goog.debug.Logger');
goog.require('goog.dom');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.events.EventTarget');
goog.require('goog.events.EventHandler');
goog.require('goog.ui.Control');
goog.require('ttt.Game');


/**
 * One and only controller for the Tic-Tac-Toe game.
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 */
ttt.TicTacToeController = function() {
  goog.base(this);

  /**
   * Array of button controls.  Reference held for later disposal.
   * @type {Array.<goog.ui.Control>}
   * @private
   */
  this.squareControls_ = [];

  /**
   * Model object that represents the game board.
   * @type {ttt.Game}
   * @private
   */
  this.game_ = new ttt.Game();

  /**
   * Holds events that should only be removed when the controller is disposed.
   * @type {goog.events.EventHandler}
   * @private
   */
  this.eventHandler_ = new goog.events.EventHandler(this);

  this.init_();
};
goog.inherits(ttt.TicTacToeController, goog.events.EventTarget);


/**
 * Path to the empty square image.
 * @type {string}
 * @const
 */
ttt.TicTacToeController.EMPTY_IMAGE = 'images/empty.png';


/**
 * Path to the X image.
 * @type {string}
 * @const
 */
ttt.TicTacToeController.X_IMAGE = 'images/mark_x.png';


/**
 * Path to the O image.
 * @type {string}
 * @const
 */
ttt.TicTacToeController.O_IMAGE = 'images/mark_o.png';


/**
 * Logger for this class.
 * @type {goog.debug.Logger}
 */
ttt.TicTacToeController.prototype.logger =
    goog.debug.Logger.getLogger('ttt.TicTacToeController');


/**
 * Initialize the view controller.
 * @private
 */
ttt.TicTacToeController.prototype.init_ = function() {
  // Add control objects to the board square elements.
  var boardSquareEls = goog.dom.getElementsByClass(
      goog.getCssName('square'));
  goog.array.forEach(boardSquareEls, goog.bind(function(boardSquareEl) {
    var squareControl = new goog.ui.Control('');
    squareControl.decorate(boardSquareEl);
    this.eventHandler_.listen(squareControl, goog.ui.Component.EventType.ACTION,
        this.handleSquarePress_);
    this.squareControls_.push(squareControl);    
  }, this));

  // Add a listener to the new game button.
  var newGameEl = goog.dom.getElementByClass(goog.getCssName('new-game'));
  this.newGameControl_ = new goog.ui.Control('');
  this.newGameControl_.decorate(newGameEl);
  this.eventHandler_.listen(this.newGameControl_,
      goog.ui.Component.EventType.ACTION, this.handleNewGame_);
};


/**
 * Handle a click on a board square.
 *
 * @param {goog.events.Event} e Click event.
 * @private
 */
ttt.TicTacToeController.prototype.handleSquarePress_ = function(e) {
  for (var i = 0; i < this.squareControls_.length; i++) {
    if (e.target == this.squareControls_[i]) {
      this.logger.info('Pressed square i = ' + i + 
          '(' + Math.floor(i / 3) + ',' + (i % 3) + ')');
      this.game_.pressAtLocation(Math.floor(i / 3), i % 3);
      this.updateImageAtLocation_(e.target.getElement(),
          Math.floor(i / 3), i % 3);
    }
  }
  this.updateGameState_();
};


/**
 * Handle a press to the new game button.
 *
 * @param {goog.events.Event} e Click event.
 * @private
 */
ttt.TicTacToeController.prototype.handleNewGame_ = function(e) {
  this.logger.info('Pressed the new game.');
  this.game_.reset();
  for (var i = 0; i < this.squareControls_.length; i++) {
    var squareEl = this.squareControls_[i].getElement();
    squareEl.src = ttt.TicTacToeController.EMPTY_IMAGE;
  }
  this.updateGameState_();
};


/**
 * Updates the img element src attribute as appropriate.
 *
 * @param {Element} imgEl Image element to update
 * @param {number} row Row to use from the model object.
 * @param {number} col Column to use from the model object.
 */
ttt.TicTacToeController.prototype.updateImageAtLocation_ =
    function(imgEl, row, col) {
  switch (this.game_.getMarkForLocation(row, col)) {
  case ttt.Mark.EMPTY:
    imgEl.src = ttt.TicTacToeController.EMPTY_IMAGE;
    break;
  case ttt.Mark.X_MARK:
    imgEl.src = ttt.TicTacToeController.X_IMAGE;
    break;
  case ttt.Mark.O_MARK:
    imgEl.src = ttt.TicTacToeController.O_IMAGE;
    break;
  }
};


/**
 * Updates the img element src attribute as appropriate.

 */
ttt.TicTacToeController.prototype.updateGameState_ = function() {
  var gameStateEl = goog.dom.getElementByClass(goog.getCssName('game-state'));
  var gameState = this.game_.getGameState();
  gameStateEl.innerHTML = gameState;
  
  var gameBoardEl = goog.dom.getElementByClass(goog.getCssName('board'));
  goog.dom.classes.remove(gameBoardEl, 'xturn', 'oturn');
  switch (gameState) {
  case ttt.GameState.X_TURN:
    goog.dom.classes.add(gameBoardEl, 'xturn');
    break;
  case ttt.GameState.O_TURN:
    goog.dom.classes.add(gameBoardEl, 'oturn');
    break;
  default:
    // No hover states for the board.
    break;
  }
};


/** @inheritDoc */
ttt.TicTacToeController.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');

  // Remove listeners added.
  this.eventHandler_.removeAll();
  goog.dispose(this.eventHandler_);
  delete this.eventHandler_;

  // Remove listeners added by controls.
  for (var i = 0; i < this.squareControls_.length; i++) {
    goog.dispose(this.squareControls_[i]);
  }
  delete this.squareControls_;
};
