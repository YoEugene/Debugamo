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
    Game.stopProgram = false;
    Game.things.robot = $.extend({}, Levels[level].robot);
    UI.init();
};

Game.reset = function() {
    // Game.initState();
    Game.stop();
    UI.reset();
    Game.stepAnchor = false;
    Game.currentInterpreter = undefined;
    BlocklyInterface.highlight(null);
};

Game.stop = function() {
    Game.stopProgram = true;
}

/** private methods
 *
 */

Game.getThingPos = function(thing) {
    return Game.things[thing].position;
};

Game.addThingToVariables = function(variable_name) {
    Blockly.getMainWorkspace().createVariable(variable_name, '')
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

Game.commands.moveRobot = function(direction_name, numOfMove, id, disableAnchor) {
    // highlight current block;
    console.log(id);
    BlocklyInterface.highlight(id);

    var direction = direction_name[0].toLowerCase();

    UI.moveRobot(direction);
    if (numOfMove == 1) {
        if (!disableAnchor)
            Game.stepAnchor = true;
        return;
    }

    Game.commands.moveRobot(direction, numOfMove-1, id, disableAnchor);
}

Game.commands.robotGrab = function(thing, id) {
    // highlight current block;
    console.log(id);
    BlocklyInterface.highlight(id);

    if (!Game.things.hasOwnProperty(thing)) {
        window.alert(BlocklyGames.getMsg('Debugging_msg_errGrabNoSuchThing'))
        Game.reset();
        return;
    }
    if (Game.things[thing].position[0] == Game.things.robot.position[0] && Game.things[thing].position[1] == Game.things.robot.position[1]) {
        Game.things.robot.grab.push(thing);
        Game.things.robot.img = "robot1";
        UI.drawGrid($('#playground')[0], false);
        UI.drawThings(thing);
        Game.stepAnchor = true;
    } else {
        window.alert("DeMo can only grab a thing at DeMo's position :(");
        Game.reset();
        return;
    }
}

Game.commands.robotDrop = function(thing, id) {
    // highlight current block;
    console.log(id);
    BlocklyInterface.highlight(id);
    
    if (!Game.things.hasOwnProperty(thing)) {
        window.alert(BlocklyGames.getMsg('Debugging_msg_errDropNoSuchThing'))
        Game.reset();
        return;
    }
    if (Game.things.robot.grab.indexOf(thing) != -1) {
        var ind = Game.things.robot.grab.indexOf(thing);
        Game.things.robot.grab.splice(ind, 1);
        if (Game.things.robot.grab.length == 0) {
            Game.things.robot.img = "robot2";
            UI.drawGrid($('#playground')[0], false);
            UI.drawThings('robot');
        }
        Game.stepAnchor = true;
    } else {
        window.alert("DeMo haven't grab " + thing + " yet.")
        Game.reset();
        return;
    }
}

Game.commands.robotGoto = function(thing, id) {
    // highlight current block;
    console.log(id);
    BlocklyInterface.highlight(id);
    
    if (!Game.things.hasOwnProperty(thing)) {
        window.alert(BlocklyGames.getMsg('Debugging_msg_errGotoNoSuchThing'))
        Game.reset();
        return;
    }
    x_delta = Game.things[thing].position[0] - Game.things.robot.position[0];
    y_delta = Game.things[thing].position[1] - Game.things.robot.position[1];
    if (x_delta < 0) direction_x = 'l'; else direction_x = 'r';
    if (y_delta < 0) direction_y = 'u'; else direction_y = 'd';

    if (x_delta !== 0 && y_delta !== 0) {
        Game.commands.moveRobot(direction_x, Math.abs(x_delta), id, true);
        setTimeout(function(){Game.commands.moveRobot(direction_y, Math.abs(y_delta), id, false);}, UI.drawFrame * UI.drawSpeed + 10);
    } else if (x_delta !== 0) {
        Game.commands.moveRobot(direction_x, Math.abs(x_delta), id, false);
    } else if (x_delta !== 0) {
        Game.commands.moveRobot(direction_y, Math.abs(y_delta), id, false);
    }
    Game.stepAnchor = true;

    console.log('goto [' + Game.things[thing].position + ']');

}