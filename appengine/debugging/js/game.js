/**
 * 遊戲功能設定區
 */

// 遊戲 function 定義

goog.provide('Debugging.Game');

goog.require('Blockly.JavaScript');
goog.require('Debugging.UI');
goog.require('Debugging.Game.Levels');

var Game = Debugging.Game;

/*
Game.state
Game.commands.xxx
Game.levels
*/

Game.init = function(level) {
    Game.things = {};
    Game.levelConfig = Debugging.Game.Levels[level];
    Game.things.robot = $.extend({}, Game.levelConfig.robot);
    UI.init()
};

Game.reset = function() {
    // Game.initState();
    UI.reset();
};

/** private methods
 *
 */

Game.getThingPos = function(thing) {
    return Game.things[thing].position;
};

Game.errorMessage = function(cmdKey, msgKey) {
    return BlocklyGames.getMsg('DrinkShop_msg_errorIn').replace('%1', BlocklyGames.getMsg(cmdKey)) + '\n'
        // + BlocklyGames.getMsg('DrinkShop_msg_reason') + ': '
        +
        BlocklyGames.getMsg(msgKey);
};

Game.levelFailedMessage = function(msgKey) {
    return BlocklyGames.getMsg('DrinkShop_msg_levelFailed') + '\n'
        // + BlocklyGames.getMsg('DrinkShop_msg_reason') + ': '
        +
        BlocklyGames.getMsg(msgKey);
};

// block methods

Game.commands = {};

Game.commands.moveRobot = function(direction, numOfMove) {
    UI.moveRobot(direction);
    if (numOfMove == 1) return;
    var i;
    for (i = 0; i < numOfMove - 1; i++) {
        setTimeout(function() { Game.commands.moveRobot(direction, numOfMove-1); }, 150);
    }
}