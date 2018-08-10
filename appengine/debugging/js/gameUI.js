/**
 * 遊戲 UI 功能設定區
 */

// UI function 定義

goog.provide('Debugging.UI');

goog.require('Levels');
goog.require('Blockly');
goog.require('BlocklyGames');

var UI = Debugging.UI;

var level = {},
    robot = {},
    alertLock = undefined;

UI.init = function() {
    level = $.extend(true, {}, Levels[BlocklyGames.LEVEL]);
    robot = $.extend(true, {}, level.robot);

    Game.things.robot = robot;

    for (var i = 0; i < level.thingsName.length; i++) {
        // console.log(level.thingsName[i]);
        Game.addThingToVariables(level.thingsName[i]);
    }

    UI.missionGuideInd = 0;
    $('#guide-inner-box').find('p').html(level.missionGuideDescription[0]);
    UI.images = {};
    UI.getImage('unknown');
    UI.getImage('robot');
    UI.getImage('robot', 'happy');
    UI.getImage('robot', 'sad');
    UI.getImage('robot', 'grab');
    UI.drawGrid($('#playground')[0], false);
    if (localStorage.hasOwnProperty('avatar'))
        $('#player-avatar').attr('src', 'debugging/public/img/' + localStorage.avatar);
    $('#guidePreviousButton').hide();

    UI.initGoalList();
    UI.initPositionNumbers();

    UI.updateRuntimeUserInterface();

    // if (Levels[BlocklyGames.LEVEL].isEvaluation) {
    // console.log('here');
    // $('#goalHeader').hide();
    // $('#evaluationOptionHeader').show();
    // $('#game-buttons').hide();
    // $('#mission-goal-container').addClass('evaluation-container');
    // } else {
    $('#goalHeader').show();
    $('#evaluationOptionHeader').hide();
    $('#evaluationOptionMapHeader').hide();
    $('#game-buttons').show();
    $('#mission-goal-container').removeClass('evaluation-container');
    // }

    UI.stopAnimation = false;
    UI.animationSetTimeoutIds = [];

    var cvs = $('#playground')[0];
    // draw a grid index on the canvas while mouse is moving on canvas (disable while game is playing/animating)
    cvs.addEventListener('mousemove', function(event) { if (Game.stopProgram) UI.updateMouseGridPosition(cvs, event); }, false);
    // clear the grid index after mouse leave canvas (disable while game is playing/animating)
    cvs.addEventListener('mouseleave', function() { if (Game.stopProgram) UI.updateRuntimeUserInterface(); }, false);
    // update and highlight selected grid while click on the grid/canvas (disable while game is playing/animating)
    cvs.addEventListener('click', function() { if (Game.stopProgram) UI.updateSelectedGrid(cvs, event); }, false);
};

UI.reset = function() {
    // deep copy of object
    level = $.extend(true, {}, Levels[BlocklyGames.LEVEL]);
    robot = $.extend(true, {}, level.robot);

    // for LEVEL 8
    alertLock = undefined;

    var i;
    for (i = 0; i < UI.animationSetTimeoutIds.length + 30; i++) {
        clearTimeout(UI.animationSetTimeoutIds[i]);
    }

    Game.things.robot = robot;

    UI.updateRuntimeUserInterface();

    $('#goal-list').find('li').removeClass('success');
    $('#goal-list').find('li').removeClass('fail');

    UI.animationSetTimeoutIds = [];

    if (UI.missionGuideInd == -1) {
        UI.missionGuideInd = 0;
        $('#guide-inner-box').find('p').html(level.missionGuideDescription[0]);
    }

    BlocklyInterface.highlight(null);
};

UI.initGoalList = function() {
    var i;
    // if (Levels[BlocklyGames.LEVEL].isEvaluation) {
    //     if (Levels[BlocklyGames.LEVEL].isMapOptions) {
    //         $('#goal-list').append('<li>1. 在地圖上點選你認為是答案的位置</li>');
    //         $('#goal-list').append('<li>2. 按底下「送出答案」</li>');
    //     } else {
    //         // shuffle goal list
    //         level.options = shuffle(level.options);

    //         for (i = 0; i < level.options.length; i++) {
    //             $('#goal-list').append('<li><label><input class="uk-radio" type="radio" value="' + level.options[i] + '" name="optionRadio">' + level.options[i] + '</label></li>');
    //         }
    //     }
    //     $('#goal-right-box').append('<button id="answer-button"><i id="submit-icon" uk-icon="icon: push"></i>送出答案</button>')
    //     BlocklyGames.bindClick('answer-button', Debugging.checkAnswer);
    // } else {
    for (i = 0; i < level.goals.length; i++) {
        $('#goal-list').append('<li><span class="icon success_icon">✔</span><span class="icon fail_icon">✘</span>' + level.goals[i] + '</li>');
    }
    // }
};

UI.initPositionNumbers = function() {
    var canvasWidth = $('#playground').width();
    var gridWidth = canvasWidth / level.mapSize;
    var marginTop = (gridWidth - 12) / 2;
    var height = (gridWidth + 12) / 2;

    columnNumbers = $('.position-numbers')[0];
    rowNumbers = $('.position-numbers')[1];

    var i;
    for (i = 0; i < level.mapSize; i++) {
        $(columnNumbers).append('<span style="width:' + gridWidth + 'px">' + i + '</span>');
        $(rowNumbers).append('<span style="margin-top:' + marginTop + 'px;height:' + height + 'px">' + i + '</span>');
    }
};

UI.showNewPlayerText = function() {
    var begin = document.getElementById('begin');
    var style = {
        width: '60%',
        left: '20%',
        top: '5em'
    };
    BlocklyDialogs.showDialog(begin, null, true, true, style,
        BlocklyDialogs.stopDialogKeyDown, true);
};

UI.showPreviousGuide = function(e) {
    // Prevent double-clicks or double-taps.
    if (BlocklyInterface.eventSpam(e)) {
        return;
    }

    Debugging.addLog('UI.showPreviousGuide');

    UI.missionGuideInd -= 1;
    $('#guide-inner-box').find('p').html(level.missionGuideDescription[UI.missionGuideInd]);
    if (!isDef(level.missionGuideDescription[UI.missionGuideInd - 1])) {
        $('#guidePreviousButton').hide();
    }
    $('#guideNextButton').show();
};

UI.showNextGuide = function(e) {
    // Prevent double-clicks or double-taps.
    if (BlocklyInterface.eventSpam(e)) {
        return;
    }

    Debugging.addLog('UI.showNextGuide');

    UI.missionGuideInd += 1;
    $('#guide-inner-box').find('p').html(level.missionGuideDescription[UI.missionGuideInd]);
    if (!isDef(level.missionGuideDescription[UI.missionGuideInd + 1])) {
        $('#guideNextButton').hide();
        UI.showOrHideInterface(true);
    }
    if (UI.missionGuideInd > 0)
        $('#guidePreviousButton').show();
};

UI.showOrHideInterface = function(show) {
    if (show) {
        $('#mission-guide-box').css('z-index', 1);
        $('#dialogShadow').css('visibility', 'hidden');
        $('#dialogShadow').css('opacity', '0.3');
        $('#dialogShadow').css('z-index', '1');

        $('#debugamo-code-editor-container').css('z-index', 1);
        $('#debugamo-code-editor-container').css('opacity', 1);
        $('#mission-goal-container').css('z-index', 1)
        $('#mission-goal-container').css('opacity', 1)
        $('#game-buttons').css('z-index', 1)
        $('#game-buttons').css('opacity', 1)
        Game.UIVisible = true;
    } else {
        $('#guideNextButton').show();
        UI.missionGuideInd = 0;
        $('#guide-inner-box').find('p').html(level.missionGuideDescription[0]);

        $('#mission-guide-box').css('z-index', 100);
        $('#dialogShadow').css('visibility', 'visible');
        $('#dialogShadow').css('opacity', '0.8');
        $('#dialogShadow').css('z-index', '10');

        $('#debugamo-code-editor-container').css('z-index', -1);
        $('#debugamo-code-editor-container').css('opacity', 0);
        $('#mission-goal-container').css('z-index', -1)
        $('#mission-goal-container').css('opacity', 0)
        $('#game-buttons').css('z-index', -1)
        $('#game-buttons').css('opacity', 0)
        Game.UIVisible = false;
    }
};

UI.showText = function(msg) {
    var fail = document.createElement('div');
    var msgStr = BlocklyGames.getMsg(msg);
    if (msgStr.indexOf("Unknown message") != -1) msgStr = msg;
    fail.className = "failText";
    fail.innerHTML = '<img style="width: 60px" src="debugging/public/img/robot.default.png" />：' + msgStr + '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" style="background-color: #ffa400; border: 1px solid #ffa400" onclick="BlocklyDialogs.hideDialog(true)">' + BlocklyGames.getMsg('Games_dialogOk') + '</button></div>';

    var style = {
        width: '50%',
        left: '25%',
        top: '5em'
    };
    BlocklyDialogs.showDialog(fail, null, false, true, style,
        BlocklyDialogs.stopDialogKeyDown);
}

UI.showFailText = function(msg) {
    Debugging.addLog('showFailText_' + msg);
    Game.things.robot.state = 'sad';
    UI.drawThings('robot');
    $('#runButton').hide();
    $('#stepButton').hide();
    $('#resetButton').show();
    Game.play('fail', 0.25);
    Game.stop();
    var fail = document.createElement('div');
    fail.className = "failText";
    fail.innerHTML = "<img style='width: 60px' src='debugging/public/img/robot.sad.png' />：" + Game.levelFailedMessage(msg) + '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" style="background-color: #ffa400; border: 1px solid #ffa400" onclick="BlocklyDialogs.hideDialog(true)">' + BlocklyGames.getMsg('Games_dialogOk') + '</button></div>';

    var style = {
        width: '50%',
        left: '25%',
        top: '5em'
    };
    BlocklyDialogs.showDialog(fail, null, false, true, style,
        BlocklyDialogs.stopDialogKeyDown);

    Game.stepAnchor = true;
};

UI.setAvatar = function(avatar) {
    localStorage.setItem('avatar', avatar);
    $('#player-avatar').attr('src', 'debugging/public/img/' + avatar);
    var i;
    for (i = 0; i < $('#avatar-choose-box').find('img').length; i++) {
        if ($('#avatar-choose-box').find('img')[i].src.split('/')[$('#avatar-choose-box').find('img')[0].src.split('/').length - 1] == avatar)
            $($('#avatar-choose-box').find('img')[i]).addClass('selected');
        else
            $($('#avatar-choose-box').find('img')[i]).removeClass('selected');
    }
};

UI.checkAllNewPlayerInfoIsFilled = function() {
    // var school = $('#playerSchool').val();
    // var grade = $('#playerGrade').val();
    // var classNum = $('#playerClass').val();
    // var num = $('#playerNumber').val();
    // var name = $('#playerName').val();
    $('#playerSchool').val('AN');
    var school = $('#playerSchool').val();
    $('#playerGrade').val('0');
    var grade = $('#playerGrade').val();
    $('#playerClass').val('0');
    var classNum = $('#playerClass').val();
    $('#playerNumber').val('anonymous');
    var num = $('#playerNumber').val();
    $('#playerName').val('anonymous');
    var name = $('#playerName').val();

    if (school != null && grade != null && classNum != null && num != "" && name != "" && localStorage.avatar != undefined) {
        $('#startGameBtn').attr('disabled', false);
    } else {
        $('#startGameBtn').attr('disabled', true);
    }
}

UI.drawGrid = function(cvs, isAnimation) {

    // console.log('drawgrid: ' + isAnimation);

    ctx = cvs.getContext("2d");
    var robotPos = robot.position;
    var specialGrndInd = level.specialGrndInd;
    var specialGrndName = level.specialGrndName;

    var imgw = cvs.width / level.mapSize;
    ctx.strokeStyle = level.grndColor;
    ctx.lineWidth = 2;

    if (level.ground.indexOf('.') != -1) {
        var grndImgName = level.ground.split('.')[0];
        var grndImgState = level.ground.split('.')[1];
        var grndImg = UI.getImage(grndImgName, grndImgState);
    } else {
        var grndImg = UI.getImage(level.ground);
    }
    if (!grndImg) grndImg = UI.getImage('unknown');
    if (!!grndImg) {
        for (var j = 0; j < level.mapSize; j++) {
            for (var i = 0; i < level.mapSize; i++) {
                // If animation is not in progress, draw anyway; if is in progress, draw only the grids beside robot
                if (!isAnimation || UI.isAdjacentGrid(robotPos, [i, j])) {
                    var tmp = indexOfForArrays([i, j], specialGrndInd);
                    if (tmp == -1) {
                        ctx.drawImage(grndImg, imgw * i, imgw * j, imgw, imgw);
                        if (!!Game.selectedGrid && Game.isSamePosition([i, j], Game.selectedGrid)) {
                            ctx.strokeStyle = "#f7c63b";
                            ctx.lineWidth = 10;
                            ctx.strokeRect(imgw * i + 5, imgw * j + 5, imgw - 10, imgw - 10);
                            ctx.strokeStyle = level.grndColor;
                            ctx.lineWidth = 2;
                        } else {
                            ctx.strokeRect(imgw * i, imgw * j, imgw, imgw)
                        }
                    } else {
                        var specialImg;
                        if (specialGrndName[tmp].indexOf('.') != -1) {
                            var grndimgname = specialGrndName[tmp].split('.')[0];
                            var grndimgstate = specialGrndName[tmp].split('.')[1];
                            specialImg = UI.getImage(grndimgname, grndimgstate);
                        } else {
                            specialImg = UI.getImage(specialGrndName[tmp]);
                        }
                        if (!specialImg) specialImg = UI.getImage('unknown');
                        if (!!specialImg) {
                            ctx.drawImage(specialImg, imgw * i, imgw * j, imgw, imgw);
                            if (!!Game.selectedGrid && Game.isSamePosition([i, j], Game.selectedGrid)) {
                                ctx.strokeStyle = "#f7c63b";
                                ctx.lineWidth = 10;
                                ctx.strokeRect(imgw * i + 5, imgw * j + 5, imgw - 10, imgw - 10);
                                ctx.strokeStyle = level.grndColor;
                                ctx.lineWidth = 2;
                            } else {
                                ctx.strokeRect(imgw * i, imgw * j, imgw, imgw)
                            }
                        }
                    }
                }

                // Must be animation in progress AND nearby, will draw the thing
                if (isAnimation && UI.isAdjacentGrid(robotPos, [i, j])) {
                    // draw things nearby
                    var k;
                    for (k = 0; k < level.thingsName.length; k++) {
                        // there is level.thingsName[k] at position [i, j]
                        if (Game.things.hasOwnProperty(level.thingsName[k]))
                            var position = Game.things[level.thingsName[k]].position;
                        else
                            var position = level.thingsInd[k];
                        // Dont draw it if robot is grabing it, will draw it later anyway
                        if (i == position[0] && j == position[1] && (robot.grab.indexOf(level.thingsName[k]) == -1)) {
                            UI.drawThings(level.thingsName[k]);
                        }
                    }
                }
            }
        }

        UI.drawThings('robot');
        UI.drawTags('robot');
        if (isAnimation) {
            for (i = 0; i < robot.grab.length; i++) {
                UI.drawThings(robot.grab[i]);
                UI.drawTags(robot.grab[i]);
            }
        }

        for (var j = 0; j < level.mapSize; j++) {
            for (var i = 0; i < level.mapSize; i++) {
                if (isAnimation && UI.isAdjacentGrid(robotPos, [i, j - 1])) {
                    // draw things nearby
                    var k;
                    for (k = 0; k < level.thingsName.length; k++) {
                        if (Game.things.hasOwnProperty(level.thingsName[k]))
                            var position = Game.things[level.thingsName[k]].position;
                        if (position[0] == i && position[1] == j)
                            UI.drawTags(level.thingsName[k]);
                    }
                }
            }
        }
    }
};

UI.drawGridThing = function(cvs, isAnimation, thing_name) {

    // console.log('drawgrid: ' + isAnimation);

    ctx = cvs.getContext("2d");
    var thingPos = Game.things[thing_name].position;
    var robotPos = robot.position;
    var specialGrndInd = level.specialGrndInd;
    var specialGrndName = level.specialGrndName;

    var imgw = cvs.width / level.mapSize;
    ctx.strokeStyle = level.grndColor;
    ctx.lineWidth = 2;

    if (level.ground.indexOf('.') != -1) {
        var grndImgName = level.ground.split('.')[0];
        var grndImgState = level.ground.split('.')[1];
        var grndImg = UI.getImage(grndImgName, grndImgState);
    } else {
        var grndImg = UI.getImage(level.ground);
    }
    if (!grndImg) grndImg = UI.getImage('unknown');
    if (!!grndImg) {
        for (var j = 0; j < level.mapSize; j++) {
            for (var i = 0; i < level.mapSize; i++) {
                // If animation is not in progress, draw anyway; if is in progress, draw only the grids beside robot
                if (!isAnimation || UI.isAdjacentGrid(thingPos, [i, j])) {
                    var tmp = indexOfForArrays([i, j], specialGrndInd);
                    if (tmp == -1) {
                        ctx.drawImage(grndImg, imgw * i, imgw * j, imgw, imgw);
                        if (!!Game.selectedGrid && Game.isSamePosition([i, j], Game.selectedGrid)) {
                            ctx.strokeStyle = "#f7c63b";
                            ctx.lineWidth = 10;
                            ctx.strokeRect(imgw * i + 5, imgw * j + 5, imgw - 10, imgw - 10);
                            ctx.strokeStyle = level.grndColor;
                            ctx.lineWidth = 2;
                        } else {
                            ctx.strokeRect(imgw * i, imgw * j, imgw, imgw)
                        }
                    } else {
                        var specialImg;
                        if (specialGrndName[tmp].indexOf('.') != -1) {
                            var grndimgname = specialGrndName[tmp].split('.')[0];
                            var grndimgstate = specialGrndName[tmp].split('.')[1];
                            specialImg = UI.getImage(grndimgname, grndimgstate);
                        } else {
                            specialImg = UI.getImage(specialGrndName[tmp]);
                        }
                        if (!specialImg) specialImg = UI.getImage('unknown');
                        if (!!specialImg) {
                            ctx.drawImage(specialImg, imgw * i, imgw * j, imgw, imgw);
                            if (!!Game.selectedGrid && Game.isSamePosition([i, j], Game.selectedGrid)) {
                                ctx.strokeStyle = "#f7c63b";
                                ctx.lineWidth = 10;
                                ctx.strokeRect(imgw * i + 5, imgw * j + 5, imgw - 10, imgw - 10);
                                ctx.strokeStyle = level.grndColor;
                                ctx.lineWidth = 2;
                            } else {
                                ctx.strokeRect(imgw * i, imgw * j, imgw, imgw)
                            }
                        }
                    }
                }

                // Must be animation in progress AND nearby the animated thing, will draw the thing
                if (isAnimation && UI.isAdjacentGrid(thingPos, [i, j])) {
                    // draw things nearby
                    var k;
                    for (k = 0; k < level.thingsName.length; k++) {
                        // there is level.thingsName[k] at position [i, j]
                        if (Game.things.hasOwnProperty(level.thingsName[k]))
                            var position = Game.things[level.thingsName[k]].position;
                        else
                            var position = level.thingsInd[k];
                        // Dont draw it if the thing is grabing it, will draw it later anyway
                        if (Game.isSamePosition([i, j], position) && (Game.things[thing_name].grab.indexOf(level.thingsName[k]) == -1)) {
                            UI.drawThings(level.thingsName[k]);
                        }
                        // have to draw robot again because previous "drawThings" doesn't inspect if robot is nearby and need a redraw
                        if (Game.isSamePosition([i, j], robotPos))
                            UI.drawThings('robot');
                    }
                }
            }
        }

        UI.drawThings(thing_name);
        UI.drawTags(thing_name);
        if (isAnimation) {
            for (i = 0; i < Game.things[thing_name].grab.length; i++) {
                UI.drawThings(Game.things[thing_name].grab[i]);
                UI.drawTags(Game.things[thing_name].grab[i]);
            }
        }

        for (var j = 0; j < level.mapSize; j++) {
            for (var i = 0; i < level.mapSize; i++) {
                if (isAnimation && UI.isAdjacentGrid(thingPos, [i, j - 1])) {
                    // draw things nearby
                    var k;
                    for (k = 0; k < level.thingsName.length; k++) {
                        if (Game.things.hasOwnProperty(level.thingsName[k]))
                            var position = Game.things[level.thingsName[k]].position;
                        if (position[0] == i && position[1] == j)
                            UI.drawTags(level.thingsName[k]);
                    }
                }
            }
        }
    }
};

UI.drawThings = function(thing_name) {
    if (!isDef(thing_name)) {
        var i, thingName, thingPos, thingState;
        for (i = 0; i < level.thingsInd.length; i++) {
            if (Game.things.hasOwnProperty(level.thingsName[i])) {
                thingName = level.thingsName[i];
                thingPos = Game.things[thingName].position;
                thingState = Game.things[thingName].state;
            } else {
                thingName = level.thingsName[i].slice();
                thingPos = level.thingsInd[i].slice();
                thingState = 'default';
            }
            Game.things[thingName] = { position: thingPos, state: thingState, grab: [] };
            if (BlocklyGames.reserved_thing_names.indexOf(thingName) == -1) {
                BlocklyGames.reserved_thing_names.push(thingName);
            }
            UI.drawThings(thingName);
        }

        UI.drawThings('robot');

        return;
    }

    if (thing_name == 'robot')
        var thing = Game.things.robot;
    else
        var thing = Game.things[thing_name];

    cvs = $('#playground')[0];
    ctx = cvs.getContext("2d");
    var size_of_map = level.mapSize;
    var imgw = cvs.width / size_of_map;
    var img = UI.getImage(thing_name, thing.state);
    if (!img) img = UI.getImage('unknown');
    if (!!img) {
        ctx.drawImage(img, imgw * thing.position[0], imgw * thing.position[1], imgw, imgw);
        // console.log('drawed ' + thing_name);
    }
};

UI.drawTags = function(thing_name) {
    cvs = $('#playground')[0];
    ctx = cvs.getContext("2d");
    ctx.font = "28px Arial";
    var size_of_map = level.mapSize;
    var imgw = cvs.width / size_of_map;
    if (isDef(thing_name)) {
        UI.drawATag(thing_name, ctx, imgw);
        // console.log('draw tag: ' + thing_name);
    } else {
        for (thing_name in Game.things) {
            UI.drawATag(thing_name, ctx, imgw);
        }
        // console.log('draw all tags');
    }
};

UI.drawATag = function(thing, ctx, imgw) {
    // dont-draw tag list
    if (thing.indexOf('boulder') != -1)
        return;

    var tag_name;
    // if name's last index is integer, it should be an item in a list
    if (thing[thing.length - 1].toUpperCase() == thing[thing.length - 1]) {
        // 'kitten1' --> 'kitten'
        tag_name = thing.slice(0, thing.length - 1)
    } else { tag_name = thing; }

    ctx.fillStyle = "black";
    var textWidth = ctx.measureText(tag_name).width;
    var textXOffset = (imgw - textWidth) / 2;
    var textYOffset = UI.getTextOffset([Game.things[thing].position[0], Game.things[thing].position[1]], thing);
    ctx.fillText(tag_name, imgw * Game.things[thing].position[0] + textXOffset, imgw * Game.things[thing].position[1] - textYOffset - 10);
    ctx.fillStyle = "white";
    textYOffset -= 1;
    textXOffset += 1;
    ctx.fillText(tag_name, imgw * Game.things[thing].position[0] + textXOffset, imgw * Game.things[thing].position[1] - textYOffset - 10);
};

UI.getTextOffset = function(pos, name) {
    var i;
    var counter = 0;
    for (thing in Game.things) {
        if (Game.things[thing].position[0] == pos[0] && Game.things[thing].position[1] == pos[1] && thing != name) {
            counter += 30;
        } else if (Game.things[thing].position[0] == pos[0] && Game.things[thing].position[1] == pos[1] && thing == name) {
            return counter;
        }
    }
};

UI.updateMouseGridPosition = function(canvas, event) {
    UI.updateRuntimeUserInterface();

    var ctx = canvas.getContext("2d");
    var size_of_map = level.mapSize;
    var mousePos = getMousePos(canvas, event);
    var gridIndex = [Math.floor(mousePos.x / ($(canvas).width() / size_of_map)), Math.floor(mousePos.y / ($(canvas).width() / size_of_map))]

    ctx.font = "35px Arial";
    ctx.fillStyle = "black";
    var textXOffset = (mousePos.x / $(canvas).width() * canvas.width) + 5;
    var textYOffset = (mousePos.y / $(canvas).width() * canvas.width) - 5;
    ctx.fillText('[' + gridIndex.toString() + ']', textXOffset, textYOffset);
    ctx.fillStyle = "white";
    textYOffset -= 1;
    textXOffset += 1;
    ctx.fillText('[' + gridIndex.toString() + ']', textXOffset, textYOffset);
};

UI.updateSelectedGrid = function(canvas, event) {
    var ctx = canvas.getContext("2d");
    var size_of_map = level.mapSize;
    var mousePos = getMousePos(canvas, event);
    var gridIndex = [Math.floor(mousePos.x / ($(canvas).width() / size_of_map)), Math.floor(mousePos.y / ($(canvas).width() / size_of_map))]
    Game.selectedGrid = gridIndex;

    UI.updateRuntimeUserInterface();
};

UI.getImage = function(name, state) {

    // if name's last index is integer or CAPITAL LETTER like A B C, it should be an item in a list
    if (name[name.length - 1] == name[name.length - 1].toUpperCase()) {
        // 'kitten1' --> 'kitten'
        name = name.slice(0, name.length - 1)
    }

    if (state)
        var imgName = name + '.' + state;
    else
        var imgName = name + '.default';

    // If this has already been checked, return what's there.
    if (this.images.hasOwnProperty(imgName)) {
        return this.images[imgName];
    }

    // For now, mark it as false.
    this.images[imgName] = false;

    $.ajax({
        url: "debugging/public/img/" + imgName + ".png",
        context: this,
        success: function() {
            // An image has loaded! Create the image, cache it, and update the UI.
            var image = new Image();
            // we update the interface after AJAX returns its result
            image.onload = function() {
                UI.images[imgName] = image;
                UI.updateRuntimeUserInterface();
            };
            image.src = "debugging/public/img/" + imgName + ".png";
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            // Mark this name as not existing, so UI will show unknown image
            console.error('[UI] Fail loading image: ' + imgName);
            this.images[imgName] = false;
        }
    });

    return false;
};

UI.updateRuntimeUserInterface = function() {
    UI.drawGrid($('#playground')[0], false);
    UI.drawThings();
    UI.drawTags();
    // console.log('[UI] Canvas updated.');
};

UI.animate = function(cvs, percentFinished, direction, animateFrameNum, frameTimeMs) {
    // Clicked reset button
    if (UI.stopAnimation) {
        UI.drawGrid(cvs, true);
        BlocklyInterface.highlight(null);
        return;
    }

    var ctx = cvs.getContext('2d');

    if (percentFinished >= 100) {
        ////////////////////// SPECIAL FOR LEVEL 8 DEBUGAMO ///////////////////////
        if (!isDef(alertLock)) {
            alertLock = true;
            setTimeout(function() {
                if (BlocklyGames.LEVEL == '8' && Game.isSamePosition(Game.things.robot.position, Game.things.note.position)) {
                    alert('筆記上寫：這棟建築的老鼠很膽小，一有風吹草動就嚇壞。試試看走到「他的面前」，對他說 [ "dog1", "safe", "dog2" ] 看看會發生什麼事');
                }
            }, 4 * UI.drawFrame * UI.drawSpeed);
        }

        return;
    }

    var size_of_map = level.mapSize;
    var imgw = 400 / size_of_map;

    if (direction != undefined) {
        // reach end of grid
        if (direction == 'r' && robot.position[0] == (size_of_map - 1)) {
            return;
        } else if (direction == 'l' && robot.position[0] == 0) {
            return;
        } else if (direction == 'u' && robot.position[1] == 0) {
            return;
        } else if (direction == 'd' && robot.position[1] == (size_of_map - 1)) {
            return;
        }

        // reach uncrossable thing
        if (direction == 'r' && Game.isUncrossable([robot.position[0] + 1, robot.position[1]])) {
            return;
        } else if (direction == 'l' && Game.isUncrossable([robot.position[0] - 1, robot.position[1]])) {
            return;
        } else if (direction == 'u' && Game.isUncrossable([robot.position[0], robot.position[1] - 1])) {
            return;
        } else if (direction == 'd' && Game.isUncrossable([robot.position[0], robot.position[1] + 1])) {
            return;
        }

        // console.log('animate');

        if (direction == 'r' || direction == 'l')
            posIndex = 0;
        else
            posIndex = 1;

        if (direction == 'r' || direction == 'd') {
            robot.position[posIndex] += 1.0 / animateFrameNum;
            var i;
            for (i = 0; i < robot.grab.length; i++) {
                Game.things[robot.grab[i]].position[posIndex] += 1.0 / animateFrameNum;
            }
        } else {
            robot.position[posIndex] -= 1.0 / animateFrameNum;
            for (i = 0; i < robot.grab.length; i++) {
                Game.things[robot.grab[i]].position[posIndex] -= 1.0 / animateFrameNum;
            }
        }
        robot.position[posIndex] = Math.round(robot.position[posIndex] * animateFrameNum) / animateFrameNum;
        for (i = 0; i < robot.grab.length; i++) {
            Game.things[robot.grab[i]].position[posIndex] = Math.round(Game.things[robot.grab[i]].position[posIndex] * animateFrameNum) / animateFrameNum;
        }
    }

    UI.animationSetTimeoutIds.push(
        setTimeout(function() {
            percentFinished += 100 / animateFrameNum;
            percentFinished = Math.round(percentFinished * animateFrameNum) / animateFrameNum;
            UI.drawGrid(cvs, true);
            UI.animate(cvs, percentFinished, direction, animateFrameNum, frameTimeMs);
        }, frameTimeMs)
    )
};

UI.animateThing = function(cvs, percentFinished, direction, animateFrameNum, frameTimeMs, thing_name) {
    // Clicked reset button
    if (UI.stopAnimation) {
        UI.drawGridThing(cvs, true, thing_name);
        BlocklyInterface.highlight(null);
        return;
    }

    var ctx = cvs.getContext('2d');

    if (percentFinished >= 100) {
        return;
    }

    var size_of_map = level.mapSize;
    var imgw = 400 / size_of_map;

    if (direction != undefined) {
        // reach end of grid
        if (direction == 'r' && Game.things[thing_name].position[0] == (size_of_map - 1)) {
            return;
        } else if (direction == 'l' && Game.things[thing_name].position[0] == 0) {
            return;
        } else if (direction == 'u' && Game.things[thing_name].position[1] == 0) {
            return;
        } else if (direction == 'd' && Game.things[thing_name].position[1] == (size_of_map - 1)) {
            return;
        }

        // reach uncrossable thing
        if (direction == 'r' && Game.isUncrossable([Game.things[thing_name].position[0] + 1, Game.things[thing_name].position[1]])) {
            return;
        } else if (direction == 'l' && Game.isUncrossable([Game.things[thing_name].position[0] - 1, Game.things[thing_name].position[1]])) {
            return;
        } else if (direction == 'u' && Game.isUncrossable([Game.things[thing_name].position[0], Game.things[thing_name].position[1] - 1])) {
            return;
        } else if (direction == 'd' && Game.isUncrossable([Game.things[thing_name].position[0], Game.things[thing_name].position[1] + 1])) {
            return;
        }

        // console.log('animate');

        if (direction == 'r' || direction == 'l')
            posIndex = 0;
        else
            posIndex = 1;

        if (direction == 'r' || direction == 'd') {
            Game.things[thing_name].position[posIndex] += 1.0 / animateFrameNum;
            var i;
            for (i = 0; i < Game.things[thing_name].grab.length; i++) {
                Game.things[Game.things[thing_name].grab[i]].position[posIndex] += 1.0 / animateFrameNum;
            }
        } else {
            Game.things[thing_name].position[posIndex] -= 1.0 / animateFrameNum;
            for (i = 0; i < Game.things[thing_name].grab.length; i++) {
                Game.things[Game.things[thing_name].grab[i]].position[posIndex] -= 1.0 / animateFrameNum;
            }
        }
        Game.things[thing_name].position[posIndex] = Math.round(Game.things[thing_name].position[posIndex] * animateFrameNum) / animateFrameNum;
        for (i = 0; i < Game.things[thing_name].grab.length; i++) {
            Game.things[Game.things[thing_name].grab[i]].position[posIndex] = Math.round(Game.things[Game.things[thing_name].grab[i]].position[posIndex] * animateFrameNum) / animateFrameNum;
        }
    }

    UI.animationSetTimeoutIds.push(
        setTimeout(function() {
            percentFinished += 100 / animateFrameNum;
            percentFinished = Math.round(percentFinished * animateFrameNum) / animateFrameNum;
            UI.drawGridThing(cvs, true, thing_name);
            UI.animateThing(cvs, percentFinished, direction, animateFrameNum, frameTimeMs, thing_name);
        }, frameTimeMs)
    )
};

UI.moveRobot = function(direction) {
    UI.animate($('#playground')[0], 0, direction, UI.drawFrame, UI.drawSpeed);
};

UI.moveThing = function(direction, thing) {
    UI.animateThing($('#playground')[0], 0, direction, UI.drawFrame, UI.drawSpeed, thing);
};

// position:a as center, if position:b is 
UI.isAdjacentGrid = function(a, b) {
    if ( Math.abs(a[0] - b[0]) <= 1 || Math.abs(a[1] - b[1]) <= 1 ) {
        return true;
    } else {
        return false;
    }
    // if (Math.floor(Math.abs(a[0] - b[0])) < 1 && Math.floor(Math.abs(a[1] - b[1])) <= 2)
    //     return true
    // else if ((Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])) == 1)
    //     return true
    // else
    //     return false
};

function indexOfForArrays(search, origin) {
    var searchJson = JSON.stringify(search); // "[3,566,23,79]"
    var arrJson = origin.map(JSON.stringify); // ["[2,6,89,45]", "[3,566,23,79]", "[434,677,9,23]"]

    return arrJson.indexOf(searchJson);
};

function isDef(value) { return typeof value !== 'undefined'; }

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
};