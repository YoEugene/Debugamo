/**
 * 遊戲 UI 功能設定區
 */

// UI function 定義

goog.provide('Debugging.UI');

goog.require('Debugging.Levels');
goog.require('Blockly');
goog.require('BlocklyGames');

var UI = Debugging.UI;

var level = {},
    robot = {};
// var robot.position = [0, 0];
// var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
// window.requestAnimationFrame = requestAnimationFrame;

UI.init = function() {
    level = $.extend(true, {}, Levels[BlocklyGames.LEVEL]);
    robot = $.extend(true, {}, level.robot);

    Game.things.robot = robot;

    UI.missionGuideInd = 0;
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
    $('#guide-inner-box').find('p').html(level.missionGuideDescription[0]);

    UI.initGoalList();

    UI.updateRuntimeUserInterface();

    UI.stopAnimation = false;
    UI.animationSetTimeoutIds = [];
};

UI.reset = function() {

    // deep copy of object
    level = $.extend(true, {}, Levels[BlocklyGames.LEVEL]);
    robot = $.extend(true, {}, level.robot);

    var i;
    for (i = 0; i < UI.animationSetTimeoutIds.length + 30; i++) {
        clearTimeout(UI.animationSetTimeoutIds[i]);
    }

    Game.things.robot = robot;

    UI.updateRuntimeUserInterface();

    $('#goal-list').find('li').removeClass('success');
    $('#goal-list').find('li').removeClass('fail');

    UI.animationSetTimeoutIds = [];

    BlocklyInterface.highlight(null);
};

UI.initGoalList = function() {
    var i;
    for (i = 0; i < level.goals.length; i++) {
        $('#goal-list').append('<li><span class="icon success_icon">✔</span><span class="icon fail_icon">✘</span>' + level.goals[i] + '</li>');
    }
};

UI.showNewPlayerText = function() {
    var begin = document.getElementById('begin');
    var style = {
        width: '45%',
        left: '25%',
        top: '5em'
    };
    BlocklyDialogs.showDialog(begin, null, true, true, style,
        BlocklyDialogs.stopDialogKeyDown, true);
}

UI.showPreviousGuide = function(e) {
    // Prevent double-clicks or double-taps.
    if (BlocklyInterface.eventSpam(e)) {
        return;
    }

    UI.missionGuideInd -= 1;
    $('#guide-inner-box').find('p').html(level.missionGuideDescription[UI.missionGuideInd]);
    if (!isDef(level.missionGuideDescription[UI.missionGuideInd - 1])) {
        $('#guidePreviousButton').hide();
    }
    $('#guideNextButton').show();
}

UI.showNextGuide = function(e) {
    // Prevent double-clicks or double-taps.
    if (BlocklyInterface.eventSpam(e)) {
        return;
    }

    UI.missionGuideInd += 1;
    $('#guide-inner-box').find('p').html(level.missionGuideDescription[UI.missionGuideInd]);
    if (!isDef(level.missionGuideDescription[UI.missionGuideInd + 1])) {
        $('#guideNextButton').hide();
        $('#debugamo-code-editor-container').css('z-index', 1);
        $('#debugamo-code-editor-container').css('opacity', 1);
        $('#mission-goal-container').css('z-index', 1)
        $('#mission-goal-container').css('opacity', 1)
        $('#game-buttons').css('z-index', 1)
        $('#game-buttons').css('opacity', 1)
    }
    $('#guidePreviousButton').show();
}

UI.showFailText = function(msg) {
    $('#runButton').hide();
    $('#stepButton').hide();
    $('#resetButton').show();
    Game.stop();
    var fail = document.createElement('div');
    fail.className = "failText";
    fail.innerHTML = "<img style='width: 60px' src='debugging/public/img/robot.sad.png' />：" + Game.levelFailedMessage(msg);

    var style = {
        width: '50%',
        left: '25%',
        top: '5em'
    };
    BlocklyDialogs.showDialog(fail, null, false, true, style,
        BlocklyDialogs.stopDialogKeyDown);

    Game.stepAnchor = true;
}

UI.showWorkspace = function() {
    $('#debugamo-code-editor-container').css('z-index', 1);
    $('#debugamo-code-editor-container').css('opacity', 1);
    $('#mission-goal-container').css('z-index', 1)
    $('#mission-goal-container').css('opacity', 1)
    $('#game-buttons').css('z-index', 1)
    $('#game-buttons').css('opacity', 1)
}

UI.setAvatar = function(avatar) {
    localStorage.setItem('avatar', avatar);
    localStorage.setItem('newPlayer', '0');
    $('#player-avatar').attr('src', 'debugging/public/img/' + avatar);
    var i;
    for (i = 0; i < $('#avatar-choose-box').find('img').length; i++) {
        if ($('#avatar-choose-box').find('img')[i].src.split('/')[$('#avatar-choose-box').find('img')[0].src.split('/').length - 1] == avatar)
            $($('#avatar-choose-box').find('img')[i]).addClass('selected');
        else
            $($('#avatar-choose-box').find('img')[i]).removeClass('selected');
    }
    $('#begin').find('button').attr('disabled', false);
}

UI.drawGrid = function(cvs, isAnimation) {

    // console.log('drawgrid: ' + isAnimation);

    ctx = cvs.getContext("2d");
    var robotPos = robot.position;
    var specialGrndInd = level.specialGrndInd;
    var specialGrndName = level.specialGrndName;

    var imgw = cvs.width / level.mapSize;
    ctx.strokeStyle = level.grndColor;
    ctx.lineWidth = 1;

    var grndImg = UI.getImage(level.ground);
    if (!grndImg) grndImg = UI.getImage('unknown');
    if (!!grndImg) {
        for (var j = 0; j < level.mapSize; j++) {
            for (var i = 0; i < level.mapSize; i++) {
                // If animation is not in progress, draw anyway; if is in progress, draw only the grids beside robot
                if (!isAnimation || UI.isAdjacentGrid(robotPos, [i, j])) {
                    var tmp = indexOfForArrays([i, j], specialGrndInd);
                    if (tmp == -1) {
                        ctx.drawImage(grndImg, imgw * i, imgw * j, imgw, imgw);
                        ctx.strokeRect(imgw * i, imgw * j, imgw, imgw)
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
                            ctx.strokeRect(imgw * i, imgw * j, imgw, imgw)
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
}

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
            Game.things[thingName] = { position: thingPos, state: thingState };
            Game.addThingToVariables(thingName);
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
}

UI.drawTags = function(thing_name) {
    cvs = $('#playground')[0];
    ctx = cvs.getContext("2d");
    ctx.font = "14px Arial";
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
}

UI.drawATag = function(thing, ctx, imgw) {
    var tag_name;
    // if name's last index is integer, it should be an item in a list
    if (Number.isInteger(thing[thing.length - 1] * 1)) {
        // 'kitten1' --> 'kitten'
        tag_name = thing.slice(0, thing.length - 1)
    } else {tag_name = thing;}

    ctx.fillStyle = "black";
    var textWidth = ctx.measureText(tag_name).width;
    var textXOffset = (imgw - textWidth) / 2;
    var textYOffset = UI.getTextOffset([Game.things[thing].position[0], Game.things[thing].position[1]], thing);
    ctx.fillText(tag_name, imgw * Game.things[thing].position[0] + textXOffset, imgw * Game.things[thing].position[1] - textYOffset - 5);
    ctx.fillStyle = "white";
    textYOffset -= 1;
    textXOffset += 1;
    ctx.fillText(tag_name, imgw * Game.things[thing].position[0] + textXOffset, imgw * Game.things[thing].position[1] - textYOffset - 5);
}

UI.getTextOffset = function(pos, name) {
    var i;
    var counter = 0;
    for (thing in Game.things) {
        if (Game.things[thing].position[0] == pos[0] && Game.things[thing].position[1] == pos[1] && thing != name) {
            counter += 15;
        } else if (Game.things[thing].position[0] == pos[0] && Game.things[thing].position[1] == pos[1] && thing == name) {
            return counter;
        }
    }
}

UI.getImage = function(name, state) {

    // if name's last index is integer, it should be an item in a list
    if (Number.isInteger(name[name.length - 1] * 1)) {
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
            console.log('[UI] Fail loading image: ' + imgName);
            this.images[imgName] = false;
        }
    });

    return false;
}

UI.updateRuntimeUserInterface = function() {
    UI.drawGrid($('#playground')[0], false);
    UI.drawThings();
    UI.drawTags();
    // console.log('[UI] Canvas updated.');
}

UI.animate = function(cvs, percentFinished, direction, animateFrameNum, frameTimeMs) {
    // Clicked reset button
    if (UI.stopAnimation) {
        UI.drawGrid(cvs, true);
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
        if (direction == 'r' && robot.position[0] == (size_of_map - 1)) {
            console.log('reach end');
            return;
        } else if (direction == 'l' && robot.position[0] == 0) {
            console.log('reach end');
            return;
        } else if (direction == 'u' && robot.position[1] == 0) {
            console.log('reach end');
            return;
        } else if (direction == 'd' && robot.position[1] == (size_of_map - 1)) {
            console.log('reach end');
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
}

UI.moveRobot = function(direction, numOfMove, disableAnchor) {
    UI.animate($('#playground')[0], 0, direction, UI.drawFrame, UI.drawSpeed);
}

UI.isAdjacentGrid = function(a, b) {
    // a is robot position
    if (Math.floor(Math.abs(a[0] - b[0])) < 1 && Math.floor(Math.abs(a[1] - b[1])) <= 1)
        return true
    else if ((Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1])) == 1)
        return true
    else
        return false
}

function indexOfForArrays(search, origin) {
    var searchJson = JSON.stringify(search); // "[3,566,23,79]"
    var arrJson = origin.map(JSON.stringify); // ["[2,6,89,45]", "[3,566,23,79]", "[434,677,9,23]"]

    return arrJson.indexOf(searchJson);
};

function isDef(value) { return typeof value !== 'undefined'; }