/**
 * 遊戲功能設定區
 */

// 遊戲 function 定義

goog.provide('Debugging.Game');

goog.require('Blockly.JavaScript');
goog.require('Debugging.UI');
goog.require('Debugging.Levels');

var Game = Debugging.Game;

/*
Game.state
Game.commands.xxx
Game.levels
*/

Game.init = function(level) {
    Game.things = {};
    Game.things.robot = $.extend({}, Levels[level].robot);
    UI.init();
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

Game.commands.robotGrab = function(thing) {
    if (Game.things[thing].position[0] == Game.things.robot.position[0] && Game.things[thing].position[1] == Game.things.robot.position[1]) {
        Game.things.robot.grab.push(thing);
        Game.things.robot.img = "robot1";
        UI.drawGrid($('#playground')[0], false);
        UI.drawThings(thing);
    } else {
        window.alert("DeMo can only grab a thing with same position :(");
        return;
    }
}

Game.commands.robotDrop = function(thing) {
    if (Game.things.robot.grab.indexOf(thing) != -1) {
        var ind = Game.things.robot.grab.indexOf(thing);
        Game.things.robot.grab.splice(ind, 1);
        if (Game.things.robot.grab.length == 0) {
            Game.things.robot.img = "robot2";
            UI.drawGrid($('#playground')[0], false);
            UI.drawThings('robot');
        }
    } else {
        window.alert("Robot haven't grab " + thing + " yet.")
        return;
    }
}