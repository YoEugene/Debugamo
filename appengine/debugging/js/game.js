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
    Game.things = {};
    Game.stop();
    UI.reset();
    Game.stepAnchor = false;
    Game.currentInterpreter = undefined;
};

Game.stop = function() {
    Game.stopProgram = true;
}

Game.isSamePosition = function(a, b) {
    return (a[0] == b[0]) && (a[1] == b[1]);
}

/** private methods
 *
 */

Game.getThingPos = function(thing) {
    return Game.things[thing].position;
};

Game.addThingToVariables = function(variable_name) {
    if (Number.isInteger(variable_name[variable_name.length - 1] * 1)) {
        Blockly.getMainWorkspace().createVariable(variable_name.slice(0, variable_name.length-1)+'s', '', '');
        return;
    }
    Blockly.getMainWorkspace().createVariable(variable_name, '', '')
};

Game.errorMessage = function(cmdKey, msgKey) {
    return BlocklyGames.getMsg('DrinkShop_msg_errorIn').replace('%1', BlocklyGames.getMsg(cmdKey)) + '\n'
        // + BlocklyGames.getMsg('DrinkShop_msg_reason') + ': '
        +
        BlocklyGames.getMsg(msgKey);
};

Game.levelFailedMessage = function(msgKey) {
    var msg = BlocklyGames.getMsg(msgKey);
    if (msg.indexOf("Unknown message") != -1) msg = msgKey;
    return "<span>" + BlocklyGames.getMsg('DrinkShop_msg_levelFailed' + Math.ceil(Math.random() * 3)) + '<br><br>' + msg + "</span>";
};

Game.isLastBlock = function(id) {
    var lastBlock = BlocklyGames.workspace.getAllBlocks()[BlocklyGames.workspace.getAllBlocks().length - 1].type == 'variables_get' ? BlocklyGames.workspace.getAllBlocks()[BlocklyGames.workspace.getAllBlocks().length - 2] : BlocklyGames.workspace.getAllBlocks()[BlocklyGames.workspace.getAllBlocks().length - 1];
    if (id !== 'block_id_' + lastBlock.id)
        return true;
    else
        return false;
}

// block methods

Game.commands = {};

Game.commands.moveRobot = function(direction_name, numOfMove, id, disableAnchor, originalStepSpeed) {
    if (!originalStepSpeed) {
        var originalStepSpeed = Debugging.STEP_SPEED;
        Debugging.STEP_SPEED = numOfMove * (UI.drawSpeed * UI.drawFrame + UI.drawSpeed + 30) + 30;
    }

    // highlight current block;
    BlocklyInterface.highlight(id);

    var direction = direction_name[0].toLowerCase();

    ////////////////// BUGGY /////////////////  (try UI.moveRobot(99))
    UI.moveRobot(direction);

    if (numOfMove == 1) {
        if (!disableAnchor) {
            Debugging.STEP_SPEED = originalStepSpeed;
            if (Game.isLastBlock(id))
                Game.stepAnchor = true;
        }
    } else {
        setTimeout(function() {
            Game.commands.moveRobot(direction, numOfMove - 1, id, disableAnchor, originalStepSpeed);
        }, UI.drawSpeed * UI.drawFrame + UI.drawSpeed + 30);
    }
}

Game.commands.robotGoto = function(thing, id) {

    console.log('goto ' + thing);

    if (thing.hasOwnProperty('class') && thing.class == "Array") {
        if (thing.properties.length > 1)
            UI.showFailText('Debugging_msg_errGotoCannotGotoMultipleThingsAtOnce')
        else if (thing.properties.length == 0) {
            UI.showFailText('Debugging_msg_errGotoEmptyList')
        } else {
            Game.commands.robotGoto(thing.properties[0], id);
        }
        return;
    }

    // highlight current block;
    BlocklyInterface.highlight(id);

    // there is a 'kitten1', 'kitten2' such a list-like thing, but user try to find 'kitten'
    for (thing_name in Game.things) {
        if (thing_name.indexOf(thing) != -1 && thing_name != thing) {
            UI.showFailText('Debugging_msg_errGotoDontKnowWhichToGoto');
            return;
        }
    }

    if (!Game.things.hasOwnProperty(thing)) {
        UI.showFailText('Debugging_msg_errGotoNoSuchThing')
        return;
    }
    x_delta = Game.things[thing].position[0] - Game.things.robot.position[0];
    y_delta = Game.things[thing].position[1] - Game.things.robot.position[1];
    if (x_delta < 0) direction_x = 'l';
    else direction_x = 'r';
    if (y_delta < 0) direction_y = 'u';
    else direction_y = 'd';


    if (x_delta !== 0 && y_delta !== 0) {
        var totalNumOfMove = Math.abs(x_delta) + Math.abs(y_delta);
        var originalStepSpeed = Debugging.STEP_SPEED;
        Debugging.STEP_SPEED = totalNumOfMove * (UI.drawFrame * UI.drawSpeed + UI.drawSpeed + 60) + 60;
        Game.commands.moveRobot(direction_x, Math.abs(x_delta), id, true, originalStepSpeed);
        setTimeout(function() { Game.commands.moveRobot(direction_y, Math.abs(y_delta), id, false, originalStepSpeed); }, Math.abs(x_delta) * (UI.drawFrame * UI.drawSpeed + UI.drawSpeed + 30) + 60);
    } else if (x_delta !== 0) {
        Game.commands.moveRobot(direction_x, Math.abs(x_delta), id, false);
    } else if (y_delta !== 0) {
        Game.commands.moveRobot(direction_y, Math.abs(y_delta), id, false);
    }
    // if not last block
    if (Game.isLastBlock(id))
        Game.stepAnchor = true;

    // console.log('goto [' + Game.things[thing].position + ']');

}

Game.commands.robotGrab = function(thing, id) {

    console.log('grab ' + thing);

    if (thing.hasOwnProperty('class') && thing.class == "Array") {
        var i;
        for (i = 0; i < thing.properties.length; i++) {
            Game.commands.robotGrab(thing.properties[i], id);
        }
        return;
    }

    // highlight current block;
    BlocklyInterface.highlight(id);

    // there is a 'kitten1', 'kitten2' such a list-like thing, but user try to find 'kitten'
    for (thing_name in Game.things) {
        if (thing_name.indexOf(thing) != -1 && thing_name != thing) {
            UI.showFailText('Debugging_msg_errGrabDontKnowWhichToGrab');
            return;
        }
    }

    if (thing == 'robot') {
        UI.showFailText('DeMo cannot grab it own self...');
        return;
    }

    if (!Game.things.hasOwnProperty(thing)) {
        UI.showFailText('Debugging_msg_errGrabNoSuchThing');
        return;
    }
    if (Game.things[thing].position[0] == Game.things.robot.position[0] && Game.things[thing].position[1] == Game.things.robot.position[1]) {
        Game.things.robot.grab.push(thing);
        Game.things.robot.state = "grab";
        UI.drawGrid($('#playground')[0], true);
        if (Game.isLastBlock(id))
            Game.stepAnchor = true;
    } else {
        UI.showFailText("Debugging_msg_errGrabWrongPosition");
        return;
    }
}

Game.commands.robotDrop = function(thing, id) {

    console.log('drop ' + thing);

    // if thing is Array
    if (thing.hasOwnProperty('class') && thing.class == "Array") {
        var i;
        for (i = 0; i < thing.properties.length; i++) {
            Game.commands.robotDrop(thing.properties[i], id);
        }
        return;
    }

    // highlight current block;
    BlocklyInterface.highlight(id);

    // there is a 'kitten1', 'kitten2' such a list-like thing DeMo is grabbing, but user try to drop 'kitten'
    var i, counter = 0;
    for (i = 0; i < Game.things.robot.grab.length; i++) {
        var grabbed_thing = Game.things.robot.grab[i];
        if (grabbed_thing.indexOf(thing) != -1 && grabbed_thing != thing) {
            counter += 1;
        }
    }
    // only one thing that DeMo is grabbing. e.g. 'kitten1'
    if (counter == 1)
        thing = grabbed_thing;
    // more than one thing that DeMo is grabbing. e.g. 'kitten1' and 'kitten2'
    else if (counter > 1) {
        UI.showFailText('Debugging_msg_errDropDontKnowWhichToDrop');
        return;
    }

    if (thing == 'robot') {
        UI.showFailText('DeMo cannot drop it own self...');
        return;
    }

    if (!Game.things.hasOwnProperty(thing)) {
        UI.showFailText('Debugging_msg_errDropNoSuchThing')
        return;
    }
    if (Game.things.robot.grab.indexOf(thing) != -1) {
        var ind = Game.things.robot.grab.indexOf(thing);
        Game.things.robot.grab.splice(ind, 1);
        if (Game.things.robot.grab.length == 0) {
            Game.things.robot.state = "default";
            UI.drawGrid($('#playground')[0], true);
        }
        if (Game.isLastBlock(id))
            Game.stepAnchor = true;
    } else {
        UI.showFailText("Debugging_msg_errDropHaventGrabYet")
        return;
    }
}