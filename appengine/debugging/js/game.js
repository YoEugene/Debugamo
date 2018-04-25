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
    // init all game-needed audio/sound
    Game.initAudio();
    UI.init();

    if (localStorage.speed == "1") {
        $('#speedMode').prop("checked", true);
        Game.changeToSpeedMode();
    } else {
        Game.changeToSlowMode();
    }

    // disable orphan block, see: https://developers.google.com/blockly/guides/create-custom-blocks/block-paradigms
    BlocklyGames.workspace.addChangeListener(Blockly.Events.disableOrphans);
};

/**
 * init all the sounds needed in the game
 */
Game.initAudio = function() {
    var audioMgr = BlocklyGames.workspace.getAudioManager();
    var pathToMedia = 'debugging/public/sound/';
    audioMgr.load(
        [pathToMedia + 'goal_finalSuccess.wav'], 'success');
    audioMgr.load(
        [pathToMedia + 'grab.wav'], 'grab');
    audioMgr.load(
        [pathToMedia + 'drop.wav'], 'drop');
    audioMgr.load(
        [pathToMedia + 'failure.mp3'], 'fail');
    audioMgr.load(
        [pathToMedia + 'energyUp.wav'], 'start');

    // Bind temporary hooks that preload the sounds.
    var soundBinds = [];
    var unbindSounds = function() {
        while (soundBinds.length) {
            Blockly.unbindEvent_(soundBinds.pop());
        }
        audioMgr.preload();
    }
}

/**
 * play sounds pre-loaded in Game.initAudio
 * opt_volume - volume setting range fomr [0, 1], default: 0.5
 */
Game.play = function(sound_name, opt_volume) {
    if (!opt_volume) opt_volume = 0.5;
    var audioMgr = BlocklyGames.workspace.getAudioManager();
    try {
        audioMgr.SOUNDS_[sound_name].volume = opt_volume;
        audioMgr.SOUNDS_[sound_name].play();
    } catch (e) {
        console.error(e);
    }
}

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

/**
 * Toggle change speed mode
 */
Game.speedModeChange = function() {
    if (!$('#speedMode').prop("checked")) {
        // $('#speedMode').prop("checked", true);
        Game.changeToSpeedMode();
    } else {
        // $('#speedMode').prop("checked", false);
        Game.changeToSlowMode();
    }
};

/**
 * Change to speed mode
 */
Game.changeToSpeedMode = function() {
    // $('#speedMode').prop("checked", true);
    Debugging.STEP_SPEED = 7;
    UI.drawFrame = 5;
    UI.drawSpeed = 10;
    localStorage.setItem('speed', '1');
    console.log('speed');  
};

/**
 * Change to slow mode
 */
Game.changeToSlowMode = function() {
    // $('#speedMode').prop("checked", false);
    Debugging.STEP_SPEED = 18;
    UI.drawFrame = 10;
    UI.drawSpeed = 20;
    localStorage.removeItem('speed');
    console.log('slow');  
};

/** private methods
 *
 */

Game.getThingPos = function(thing) {
    return Game.things[thing].position;
};

Game.addThingToVariables = function(variable_name) {
    if (Number.isInteger(variable_name[variable_name.length - 1] * 1)) {
        return;
    }
    Blockly.getMainWorkspace().createVariable(variable_name, '', '')
};

Game.levelFailedMessage = function(msgKey) {
    var msg = BlocklyGames.getMsg(msgKey);
    if (msg.indexOf("Unknown message") != -1) msg = msgKey;
    return "<span>" + BlocklyGames.getMsg('Debugging_msg_levelFailed' + Math.ceil(Math.random() * 3)) + '<br><br>' + msg + "</span>";
};

// block methods

Game.commands = {};

Game.commands.moveRobot = function(direction_name, numOfMove, disableAnchor, originalStepSpeed) {
    if (!originalStepSpeed) {
        var originalStepSpeed = Debugging.STEP_SPEED;
        Debugging.STEP_SPEED = numOfMove * (UI.drawSpeed * UI.drawFrame + UI.drawSpeed + 30) + 30;
    }

    var direction = direction_name[0].toLowerCase();

    UI.moveRobot(direction);

    if (numOfMove == 1) {
        if (!disableAnchor) {
            Debugging.STEP_SPEED = originalStepSpeed;
        }
    } else {
        setTimeout(function() {
            Game.commands.moveRobot(direction, numOfMove - 1, disableAnchor, originalStepSpeed);
        }, UI.drawSpeed * UI.drawFrame + UI.drawSpeed + 30);
    }
}

Game.commands.robotGoto = function(thing) {

    // console.log('goto ' + thing);

    // if nothing is passed in
    if (thing == undefined) {
        UI.showFailText('Debugging_msg_errGotoNoSuchThing');
        return;
    }

    // "thing" type is Array
    if (thing.hasOwnProperty('class') && thing.class == "Array") {
        if (thing.properties.length > 1)
            UI.showFailText('Debugging_msg_errGotoCannotGotoMultipleThingsAtOnce')
        else if (thing.properties.length == 0) {
            UI.showFailText('Debugging_msg_errGotoEmptyList')
        } else {
            Game.commands.robotGoto(thing.properties[0]);
        }
        return;
    }

    // there is a 'kitten1', 'kitten2' such a list-like thing, but user try to find 'kitten'
    for (thing_name in Game.things) {
        // there are some list-like things such as 'kitten1' 'kitten' but no 'kitten'
        if (thing_name.indexOf(thing) != -1 && thing != thing_name) {
            UI.showFailText('Debugging_msg_errGotoCannotGotoAList');
            return;
        }
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
        Game.commands.moveRobot(direction_x, Math.abs(x_delta), true, originalStepSpeed);
        setTimeout(function() { Game.commands.moveRobot(direction_y, Math.abs(y_delta), false, originalStepSpeed); }, Math.abs(x_delta) * (UI.drawFrame * UI.drawSpeed + UI.drawSpeed + 30) + 60);
    } else if (x_delta !== 0) {
        Game.commands.moveRobot(direction_x, Math.abs(x_delta), false);
    } else if (y_delta !== 0) {
        Game.commands.moveRobot(direction_y, Math.abs(y_delta), false);
    }

    // console.log('goto [' + Game.things[thing].position + ']');

}

Game.commands.robotGrab = function(thing) {

    console.log('grab ' + thing);

    // if nothing is passed in
    if (thing == undefined) {
        UI.showFailText('Debugging_msg_errGrabUndefined');
        return;
    }

    if (thing.hasOwnProperty('class') && thing.class == "Array") {
        // if (Game.things.hasOwnProperty()) ////////////////////////////////////// prevent unexist list pass in
        var i;
        for (i = 0; i < thing.properties.length; i++) {
            Game.commands.robotGrab(thing.properties[i]);
        }
        return;
    }

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
    if (Game.isSamePosition(Game.things[thing].position, Game.things.robot.position)) {
        Game.things.robot.grab.push(thing);
        Game.things.robot.state = "grab";
        Game.play('grab');
        UI.drawGrid($('#playground')[0], true);
    } else {
        UI.showFailText("Debugging_msg_errGrabWrongPosition");
        return;
    }
}

Game.commands.robotDrop = function(thing) {

    // console.log('drop ' + thing);

    // if nothing is passed in
    if (thing == undefined) {
        UI.showFailText('Debugging_msg_errDropNoSuchThing');
        return;
    }

    // if thing is Array
    if (thing.hasOwnProperty('class') && thing.class == "Array") {
        var i;
        for (i = 0; i < thing.properties.length; i++) {
            Game.commands.robotDrop(thing.properties[i]);
        }
        return;
    }

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
        Game.play('drop', 0.5);
        if (Game.things.robot.grab.length == 0) {
            Game.things.robot.state = "default";
            UI.drawGrid($('#playground')[0], true);
        }
    } else {
        UI.showFailText("Debugging_msg_errDropHaventGrabYet")
        return;
    }
}

Game.commands.highlightBlock = function(id) { BlocklyInterface.highlight(id); }

Game.commands.stepAnchor = function(id) { if (id == 'When_Run') return; Game.stepAnchor = true; }