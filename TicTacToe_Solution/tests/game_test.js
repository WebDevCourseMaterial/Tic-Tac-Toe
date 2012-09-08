
/**
 * @fileoverview Unit tests for the game.js file.
 *
 * @author fisherds@gmail.com (Dave Fisher)
 */


/** Objects under test. */
var game;
var stubs = new goog.testing.PropertyReplacer();

function setUpPage() {
  goog.debug.LogManager.getRoot().setLevel(goog.debug.Logger.Level.INFO);
  var logconsole = new goog.debug.Console();
  logconsole.setCapturing(true);
}


function setUp() {
  game = new ttt.Game();
}

function tearDown() {
}


function testReset() {
  // Reset is called on construction.
  assertEquals(ttt.Mark.EMPTY, game.board_[0][0]);
  assertEquals(ttt.Mark.EMPTY, game.board_[0][1]);
  assertEquals(ttt.Mark.EMPTY, game.board_[0][2]);
  assertEquals(ttt.Mark.EMPTY, game.board_[1][0]);
  assertEquals(ttt.Mark.EMPTY, game.board_[1][1]);
  assertEquals(ttt.Mark.EMPTY, game.board_[1][2]);
  assertEquals(ttt.Mark.EMPTY, game.board_[2][0]);
  assertEquals(ttt.Mark.EMPTY, game.board_[2][1]);
  assertEquals(ttt.Mark.EMPTY, game.board_[2][2]);
  assertEquals(ttt.GameState.X_TURN, game.gameState_);
}


function testPressAtLocation_oneMove() {
  game.pressAtLocation(0, 0);
  assertEquals(ttt.Mark.X_MARK, game.board_[0][0]);
  assertEquals(ttt.GameState.O_TURN, game.gameState_);
}

function testPressAtLocation_completeXWin() {
  game.pressAtLocation(0, 0);
  assertEquals(ttt.Mark.X_MARK, game.board_[0][0]);
  assertEquals(ttt.GameState.O_TURN, game.gameState_);
  game.pressAtLocation(0, 1);
  assertEquals(ttt.Mark.O_MARK, game.board_[0][1]);
  assertEquals(ttt.GameState.X_TURN, game.gameState_);
  game.pressAtLocation(1, 1);
  assertEquals(ttt.Mark.X_MARK, game.board_[1][1]);
  assertEquals(ttt.GameState.O_TURN, game.gameState_);
  game.pressAtLocation(0, 2);
  assertEquals(ttt.Mark.O_MARK, game.board_[0][2]);
  assertEquals(ttt.GameState.X_TURN, game.gameState_);
  game.pressAtLocation(2, 2);
  assertEquals(ttt.Mark.X_MARK, game.board_[2][2]);
  assertEquals(ttt.GameState.X_WIN, game.gameState_);
}

function testPressAtLocation_completeCat() {
  game.pressAtLocation(0, 0);
  game.pressAtLocation(1, 0);
  game.pressAtLocation(0, 1);
  game.pressAtLocation(1, 1);
  game.pressAtLocation(1, 2);
  game.pressAtLocation(0, 2);
  game.pressAtLocation(2, 0);
  game.pressAtLocation(2, 1);
  game.pressAtLocation(2, 2);
  assertEquals(ttt.GameState.TIE, game.gameState_);
}

function testCheckForGameOver() {
  
}


function testHasMarkWon() {
  
}


function testIsBoardFull() {
    
}

function testGetMarkForLocation() {
  assertEquals(ttt.Mark.EMPTY, game.getMarkForLocation(0,0));
  game.pressAtLocation(0, 0);
  assertEquals(ttt.Mark.X_MARK, game.getMarkForLocation(0,0));
}

function testGetGameState() {
  assertEquals(ttt.GameState.X_TURN, game.getGameState());
  game.pressAtLocation(0, 0);
  assertEquals(ttt.GameState.O_TURN, game.getGameState());
}


