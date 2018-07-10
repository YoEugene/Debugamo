/**
 * 遊戲功能設定區
 */

// 遊戲 function 定義

goog.provide('Debugging.Game');

goog.require('Blockly.JavaScript');
goog.require('Debugging.UI');
goog.require('Levels');

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
    Game.selectedGrid = undefined;
    // init all game-needed audio/sound
    // if (localStorage.currentLevel != '1')
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

    Game.kiboFunction = true;
    Game.stopProgram = true;
    Game.UIVisible = true;

    // init Kibo
    var k = new Kibo();
    k.down(['down'], function(e) {
        if (Game.kiboFunction && isDef(Levels[BlocklyGames.LEVEL].missionGuideDescription[UI.missionGuideInd + 1])) {
            UI.showNextGuide(e);
        }
    });
    k.down(['up'], function(e) {
        if (Game.kiboFunction && UI.missionGuideInd > 0)
            UI.showPreviousGuide(e);
    });

    // k.down(['w'], function(e) {
    //     if (Game.UIVisible && $('#runButton').css('display') != 'none')
    //         $('#runButton').click();
    // });

    // k.down(['e'], function(e) {
    //     if (Game.UIVisible && $('#stepButton').css('display') != 'none')
    //         $('#stepButton').click();
    // });

    // k.down(['r'], function(e) {
    //     if (Game.UIVisible && $('#resetButton').css('display') != 'none')
    //         $('#resetButton').click();
    // });

    // k.down(['space'], function(e) {
    //     if (Game.UIVisible && $('#resetButton').css('display') != 'none')
    //         $('#resetButton').click();
    // });
};

/**
 * init all the sounds needed in the game
 */
Game.initAudio = function() {
    var audioMgr = BlocklyGames.workspace.getAudioManager();
    var pathToMedia = 'debugging/public/sound/';
    audioMgr.load(
        [pathToMedia + 'goal_finalSuccess.mp3', pathToMedia + 'goal_finalSuccess.wav'], 'success');
    audioMgr.load(
        [pathToMedia + 'grab.mp3', pathToMedia + 'grab.wav'], 'grab');
    audioMgr.load(
        [pathToMedia + 'drop.mp3', pathToMedia + 'drop.wav'], 'drop');
    audioMgr.load(
        [pathToMedia + 'failure.mp3'], 'fail');
    audioMgr.load(
        [pathToMedia + 'energyUp.mp3', pathToMedia + 'energyUp.wav'], 'start');
    // audioMgr.load(
        // [pathToMedia + 'gidget_tutorial.mp3'], 'gidget_tutorial');

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
    Game.removeGlassCounter = 0;
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
        Debugging.addLog('Game.changeToSpeed');
        Game.changeToSpeedMode();
    } else {
        // $('#speedMode').prop("checked", false);
        Debugging.addLog('Game.changeToSlow');
        Game.changeToSlowMode();
    }
};

/**
 * Change to speed mode
 */
Game.changeToSpeedMode = function() {
    Debugging.STEP_SPEED = 6;
    UI.drawFrame = 3;
    UI.drawSpeed = 5;
    localStorage.setItem('speed', '1');
    console.log('[Game] Speed mode.');
};

/**
 * Change to slow mode
 */
Game.changeToSlowMode = function() {
    Debugging.STEP_SPEED = 12;
    UI.drawFrame = 7;
    UI.drawSpeed = 14;
    localStorage.removeItem('speed');
    console.log('[Game] Slow mode.');
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

Game.isUncrossable = function(pos) {
    for (thing in Game.things) {
        if ((thing.indexOf('boulder') != -1) && Game.isSamePosition(Game.things[thing].position, pos)) {
            // console.log('meet boulder!');
            return true;
        }
    }
    if (BlocklyGames.LEVEL == '8' && Game.isSamePosition(pos, Game.things.rat.position) && Game.things.rat.state == "default")
        return true;
    return false;
};

Game.checkAnswer = function(e) {
    var blockId = Blockly.selected.id;

    // Prevent double-clicks or double-taps.
    if (BlocklyInterface.eventSpam(e)) {
        return;
    }

    if (level.answer.indexOf(blockId) != -1) {
        Game.evaluationEnd = true;
        Game.play('success', 0.2);
        UI.showText('答對了！現在你可以開始編輯積木，請修正錯誤的積木讓我通過關卡。');
        Debugging.addLog('Game.checkAnswerCorrect');
        BlocklyGames.workspace.options.readOnly = false;
        $('#restoreBlockHeader').show();
        Debugging.initHeaderWidth();
    } else {
        Debugging.addLog('Game.checkAnswerWrong_' + blockId);
        localStorage.numOfChanceToAnswer = localStorage.numOfChanceToAnswer * 1 - 1;
        if (localStorage.numOfChanceToAnswer == "0") {
            Game.evaluationEnd = true;
            // Game.play('fail', 0.25);

            var i;
            for (i = 0; i < level.answer.length; i++) {
                BlocklyInterface.highlight(level.answer[i]);
            }

            UI.showText('(X) 三次都答錯了！正確答案是目前亮起來的積木，只要修改它迪摩就可以過關，請幫我想想該怎麼修正。');
            BlocklyGames.workspace.options.readOnly = false;
            $('#restoreBlockHeader').show();
            Debugging.initHeaderWidth();
            
            return;
        }
        UI.showText('(X) 這不是正確的答案。<br>運行看看仔細想想，只要修改「唯一一個」錯誤的積木，迪摩就可以達成目標順利過關。');
    }
}

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

Game.commands.moveThing = function(direction_name, numOfMove, thing_name, originalStepSpeed) {
    if (!originalStepSpeed) {
        var originalStepSpeed = Debugging.STEP_SPEED;
        Debugging.STEP_SPEED = numOfMove * (UI.drawSpeed * UI.drawFrame + UI.drawSpeed + 30) + 30;
    }

    var direction = direction_name[0].toLowerCase();

    UI.moveThing(direction, thing_name);

    if (numOfMove == 1) {
        Debugging.STEP_SPEED = originalStepSpeed;
    } else {
        setTimeout(function() {
            Game.commands.moveThing(direction, numOfMove - 1, thing_name, originalStepSpeed);
        }, UI.drawSpeed * UI.drawFrame + UI.drawSpeed + 30);
    }
}

Game.commands.robotGoto = function(thing) {

    // console.log('goto ' + thing);
    // console.log(thing);

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

    // console.log(direction_x);
    // console.log(direction_y);

    if (x_delta !== 0 && y_delta !== 0) {
        var totalNumOfMove = Math.abs(x_delta) + Math.abs(y_delta);
        var originalStepSpeed = Debugging.STEP_SPEED;
        Debugging.STEP_SPEED = totalNumOfMove * (UI.drawFrame * UI.drawSpeed + UI.drawSpeed + 60) + 60;
        Game.commands.moveRobot(direction_y, Math.abs(y_delta), true, originalStepSpeed);
        setTimeout(function() { Game.commands.moveRobot(direction_x, Math.abs(x_delta), false, originalStepSpeed); }, Math.abs(y_delta) * (UI.drawFrame * UI.drawSpeed + UI.drawSpeed + 30) + 60);
    } else if (x_delta !== 0) {
        Game.commands.moveRobot(direction_x, Math.abs(x_delta), false);
    } else if (y_delta !== 0) {
        Game.commands.moveRobot(direction_y, Math.abs(y_delta), false);
    }

    // console.log('goto [' + Game.things[thing].position + ']');

}

Game.commands.robotGrab = function(thing) {

    // console.log('grab ' + thing);

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
        UI.showFailText('迪摩無法拿起自己...');
        return;
    }

    if (!Game.things.hasOwnProperty(thing)) {
        UI.showFailText('Debugging_msg_errGrabNoSuchThing');
        return;
    }
    if (Game.isSamePosition(Game.things[thing].position, Game.things.robot.position) && Game.things.robot.grab.indexOf(thing) == -1) {
        Game.things.robot.grab.push(thing);
        Game.things.robot.state = "grab";
        Game.play('grab');
        UI.drawGrid($('#playground')[0], true);
    } else if (Game.isSamePosition(Game.things[thing].position, Game.things.robot.position) && Game.things.robot.grab.indexOf(thing) != -1) {
        UI.showFailText("Debugging_msg_errGrabAlreadyGrabbed");
        return;
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
        UI.showFailText('迪摩無法放下自己...');
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

Game.commands.stepAnchor = function(id) {
    if (id == 'When_Run') return;
    Game.stepAnchor = true;
}

Game.commands.robotSay = function(text) {
    if (isDef(text) && text.hasOwnProperty('class') && text.class == "Array") {
        var tmp = "[";
        for (var i = 0; i < text.properties.length; i++) {
            tmp += '"' + text.properties[i] + '"';
            if (i != text.properties.length - 1) {
                tmp += ', '
            }
        }
        tmp += ']'
        text = tmp;
    }
    console.log(text);

    if (text == undefined)
        UI.showFailText('Debugging_msg_errSayTextNotDefined');

    if (BlocklyGames.LEVEL == 8 && Game.isSamePosition(Game.things.robot.position, [2, 2]) && text == '["dog1", "safe", "dog2"]') {
        Game.things.rat.state = 'happy';
        alert('老鼠放下戒心了！');
    } else if (BlocklyGames.LEVEL == 8 && Game.isSamePosition(Game.things.robot.position, [2, 2]) && text != '["dog1", "safe", "dog2"]') {
        UI.showFailText('通關密語錯誤！老鼠還是維持著戒心，或許右邊的筆記(note)會告訴我什麼資訊');
        return;
    } else if (BlocklyGames.LEVEL == 8) {
        UI.showFailText('距離老鼠不夠近，老鼠沒有聽到通關密語');
        return;
    }
    $('#guide-inner-box').css('background-color', '#f9ff9f')
    $('#guide-inner-box').find('p').html('迪摩說：「' + text + '」');
    UI.missionGuideInd = -1;
    $('#guidePreviousButton').hide();
    $('#guideNextButton').show();
    setTimeout(function() { $('#guide-inner-box').css('background-color', '#fff') }, 800);
}

Game.commands.removeRock = function() {
    var flag = false;
    var robotPos = Debugging.Game.getThingPos('robot');
    for (thing in Game.things) {
        if (thing.indexOf('rock') != -1 && Game.isSamePosition(robotPos, Game.things[thing].position)) {
            delete Game.things[thing];
            var ind = level.thingsName.indexOf(thing);
            level.thingsName.splice(ind, 1);
            level.thingsInd.splice(ind, 1);
            UI.updateRuntimeUserInterface();
            flag = true;
            // console.log(level.thingsName);
            // console.log(Game.things);
        }
    }

    if (!flag) {
        UI.showFailText('迪摩所在的位置沒有石頭，無法碎大石 :(')
        return;
    }

    Game.commands.robotSay('碎！');
    Game.play('grab');
};

Game.commands.changeRock = function() {
    var flag = false,
        flag2 = false;
    if ('rockTarget' in Game.things) {
        flag2 = true;
    }
    for (thing in Game.things) {
        if (!flag && thing.indexOf('rock') != -1) {
            if (flag2) {
                tmp = $.extend(true, {}, Game.things[thing]);
                tmp2 = $.extend(true, {}, Game.things['rockTarget']);
                delete Game.things[thing];
                var ind = level.thingsName.indexOf(thing);
                var ind2 = level.thingsName.indexOf('rockTarget');
                level.thingsName[ind] = 'rockTarget';
                level.thingsName[ind2] = thing;
                Game.things.rockTarget = tmp;
                Game.things[thing] = tmp2;

                // console.log(level.thingsName);
                // console.log(Game.things);
                flag = true;
            } else {
                tmp = $.extend(true, {}, Game.things[thing]);
                delete Game.things[thing];
                var ind = level.thingsName.indexOf(thing);
                level.thingsName[ind] = 'rockTarget';
                Game.things.rockTarget = tmp;
                // console.log(level.thingsName);
                // console.log(Game.things);
                flag = true;
            }
        }
    }
};

Game.removeGlassCounter = 0;

Game.commands.removeGlass = function() {
    if (Game.removeGlassCounter < 2) {
        Game.removeGlassCounter += 1;
        Game.commands.robotSay('掃玻璃第 ' + Game.removeGlassCounter + ' 次');
    } else if (Game.removeGlassCounter == 2) {
        var flag = false;
        var robotPos = Debugging.Game.getThingPos('robot');
        for (thing in Game.things) {
            if (thing.indexOf('glass') != -1 && Game.isSamePosition(robotPos, Game.things[thing].position)) {
                delete Game.things[thing];
                var ind = level.thingsName.indexOf(thing);
                level.thingsName.splice(ind, 1);
                level.thingsInd.splice(ind, 1);
                UI.updateRuntimeUserInterface();
                flag = true;
                // console.log(level.thingsName);
                // console.log(Game.things);
            }
        }

        if (!flag) {
            UI.showFailText('迪摩所在的位置沒有玻璃，無法清除玻璃 :(')
            return;
        }

        Game.removeGlassCounter = 0;
        Game.commands.robotSay('掃玻璃第 3 次，成功清除');
        Game.play('grab');
    }
};

Game.commands.changeGlass = function() {
    var flag = false,
        flag2 = false;
    if ('glassTarget' in Game.things) {
        flag2 = true;
    }
    for (thing in Game.things) {
        if (!flag && thing.indexOf('glass') != -1) {
            if (flag2) {
                tmp = $.extend(true, {}, Game.things[thing]);
                tmp2 = $.extend(true, {}, Game.things['glassTarget']);
                delete Game.things[thing];
                var ind = level.thingsName.indexOf(thing);
                var ind2 = level.thingsName.indexOf('glassTarget');
                level.thingsName[ind] = 'glassTarget';
                level.thingsName[ind2] = thing;
                Game.things.glassTarget = tmp;
                Game.things[thing] = tmp2;

                // console.log(level.thingsName);
                // console.log(Game.things);
                flag = true;
            } else {
                tmp = $.extend(true, {}, Game.things[thing]);
                delete Game.things[thing];
                var ind = level.thingsName.indexOf(thing);
                level.thingsName[ind] = 'glassTarget';
                Game.things.glassTarget = tmp;
                // console.log(level.thingsName);
                // console.log(Game.things);
                flag = true;
            }
        }
    }
};


function copyxml() {
    $('#current_xml').text(localStorage['debugging' + BlocklyGames.LEVEL]);
    var range = document.createRange();
    range.selectNodeContents($('#current_xml').get(0));
    var s = window.getSelection();
    s.removeAllRanges();
    s.addRange(range);
    document.execCommand("copy");
    console.log('xml copied!');
}