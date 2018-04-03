/**
 * 遊戲功能設定區
 */

// 遊戲 function 定義

goog.provide('Debugging.Game');

goog.require('Blockly.JavaScript');
goog.require('Debugging.UI');
goog.require('Debugging.utils');
goog.require('Debugging.Game.Config');

var Game = Debugging.Game;

/*
Game.state
Game.commands.xxx
Game.levels
*/

Game.init = function(level) {
    Game.constants = Debugging.Game.Config.constants;
    Game.levelConfig = Debugging.Game.Config.levels[level];

    Game.initState();
    UI.init(Game.state.shop);
};

Game.initState = function() {
    Game.state = {
        shop: Game.levelConfig.getInitialCoffeeShopState(),
        robot: {
            holding: null,
            served: [],
        },
        log: [],
    };
};

Game.reset = function() {
    // Game.initState();
    UI.reset();
};

/** private methods
 *
 */

Game.getRobotPos = function() {
    return UI.robotPos;
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

Game.commands.getNewCup = function() {
    // data
    var robot = Game.getRobot();
    robot.holding = {
        class: "cup",
        capacity: 500,
        filled: {},
        filledVolume: 0,
    };
    Game.state.shop.materials.cup -= 1;

    // UI
    UI.getNewCup(robot.holding);
};

Game.commands.animateRobot = function(direction) {
    UI.animateRobot(direction);
}