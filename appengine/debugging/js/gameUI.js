/**
 * 遊戲 UI 功能設定區
 */

// UI functioin 定義

goog.provide('Debugging.UI');

goog.require('Debugging.Game.Levels');
goog.require('Blockly');
goog.require('BlocklyGames');

var UI = Debugging.UI;
var level = {}, robot = {};
// var robot.position = [0, 0];
// var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
// window.requestAnimationFrame = requestAnimationFrame;

UI.init = function() {
    level = $.extend(true, {}, Debugging.Game.Levels[BlocklyGames.LEVEL]);
    robot = Debugging.Game.things.robot;

    // ?
    UI.drawn = {};
    UI.dom = {};

    UI.animationInProgress = false;
    UI.missionGuideInd = 0;
    UI.images = {};
    UI.getImage('unknown.default');
    UI.drawGrid($('#playground')[0], false);
    // UI.getImage('unknown.default');
    if (window.localStorage.hasOwnProperty('avatar'))
        $('#player-avatar').attr('src', 'debugging/public/img/' + window.localStorage.avatar);
    $('#guidePreviousButton').hide();
    $('#guide-inner-box').find('p').html(level.missionGuideDescription[0]);

    if (window.localStorage.newPlayer == "1") {
        Debugging.showNewPlayerText()
    }
};

UI.reset = function() {
    UI.animationInProgress = false;
    // deep copy of object
    level = $.extend(true, {}, Debugging.Game.Levels[BlocklyGames.LEVEL]);
    // deep copy of array
    robot.position = Debugging.Game.Levels[BlocklyGames.LEVEL].robot.position.slice();
    // deep copy of array
    robot.grab = Debugging.Game.Levels[BlocklyGames.LEVEL].robot.grab.slice();

    UI.updateRuntimeUserInterface();
};

UI.setAvatar = function(avatar) {
    window.localStorage.setItem('avatar', avatar);
    window.localStorage.setItem('newPlayer', '0');
    $('#player-avatar').attr('src', 'debugging/public/img/' + avatar);

    console.log($('#player-avatar')[0].src);
}

// JUSTTT FORRRRRR TESTTTTTTTT DELETE IT
UI.drawGrid = function(cvs, isAnimation) {

    ctx = cvs.getContext("2d");
    var robotPos = robot.position;
    var specialGrndInd = level.specialGrndInd;
    var specialGrndName = level.specialGrndName;

    var grndImg = UI.getImage(level.ground);
    if (!grndImg) grndImg = UI.getImage('unknown.default');

    var imgw = cvs.width / level.mapSize;
    ctx.strokeStyle = level.grndColor;
    ctx.lineWidth = 1;

    if (!!grndImg) {
        for (var i = 0; i < level.mapSize; i++) {
            for (var j = 0; j < level.mapSize; j++) {
                // If animation is not in progress, draw anyway; if is in progress, draw only the grids beside robot
                if (!isAnimation || (Math.floor(Math.abs(robotPos[0] - i)) <= 1 && Math.floor(Math.abs(robotPos[1] - j)) <= 1)) {
                    var tmp = indexOfForArrays([i, j], specialGrndInd);
                    if (tmp == -1) {
                        try {
                            ctx.drawImage(grndImg, imgw * i, imgw * j, imgw, imgw);
                        } catch(e) { console.log('unknown.default image not loaded yet');}
                        ctx.strokeRect(imgw * i, imgw * j, imgw, imgw)
                    } else {
                        var specialImg = UI.getImage(specialGrndName[tmp]);
                        if (!specialImg) specialImg = UI.getImage('unknown.default');
                        try {
                            ctx.drawImage(specialImg, imgw * i, imgw * j, imgw, imgw);
                        } catch(e) { console.log('unknown.default image not loaded yet');}
                        ctx.strokeRect(imgw * i, imgw * j, imgw, imgw)
                    }

                    var tmp2 = indexOfForArrays([i, j], level.thingsInd);
                    if (tmp2 != -1) {
                        var thingImg = UI.getImage(level.thingsName[tmp2]);
                        if (!thingImg) thingImg = UI.getImage('unknown.default');
                        try {
                            ctx.drawImage(thingImg, imgw * i, imgw * j, imgw, imgw);
                        } catch(e) { console.log('unknown.default image not loaded yet');}
                        ctx.strokeRect(imgw * i, imgw * j, imgw, imgw)
                        // console.log('draw ' + level.thingsName[tmp2]);
                    }

                    // console.log('draw grid ' + i + ', ' + j);
                }
            }
        }
    }

    UI.drawThings('robot');
    if (isAnimation) {
        for (i = 0; i < robot.grab.length; i++) {
            UI.drawThings(robot.grab[i]);
        }
    }
}

UI.drawThings = function(thing_name) {

    if (!isDef(thing_name)) {
        var i;
        for (i = 0; i < level.thingsInd.length; i++) {
            var thingPos = level.thingsInd[i];
            var thingName = level.thingsName[i];
            Game.things[thingName] = { position: thingPos, img: thingName };
            UI.drawThings(thingName);
        }

        UI.drawThings('robot');

        return;
    }

    // console.log('draw ' + thing_name);

    if (thing_name == 'robot')
        var thing = robot;
    else
        var thing = Game.things[thing_name];

    cvs = $('#playground')[0];
    ctx = cvs.getContext("2d");
    var size_of_map = level.mapSize;
    var imgw = cvs.width / size_of_map;
    var img = UI.getImage(thing.img);
    if (!img) img = UI.getImage('unknown.default');

    if (!!img) {
        try {
            ctx.drawImage(img, imgw * thing.position[0], imgw * thing.position[1], imgw, imgw);
        } catch(e) { console.log('unknown.default image not loaded yet');}
    }

}

UI.getImage = function(label) {

    // If this has already been checked, return what's there.
    if (this.images.hasOwnProperty(label)) {
        return this.images[label];
    }

    // For now, mark it as false.
    this.images[label] = false;

    $.ajax({
        url: "debugging/public/img/" + label + ".png",
        context: this,
        success: function() {
            // An image has loaded! Create the image, cache it, and update the UI.
            var image = new Image();
            // we update the interface after AJAX returns its result
            image.onload = function() {
                UI.images[label] = image;
                UI.updateRuntimeUserInterface();
            };
            image.src = "debugging/public/img/" + label + ".png";

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {

            // Mark this name as not existing
            this.images[label] = false;

        }
    });

    return false;
}

UI.updateRuntimeUserInterface = function() {
    UI.drawGrid($('#playground')[0], false);
    UI.drawThings();
}

UI.animate = function(cvs, percentFinished, direction, animateFrameNum, frameTimeMs) {
    var ctx = cvs.getContext('2d');

    if (percentFinished >= 100) {
        UI.animationInProgress = false;
        return;
    }

    var size_of_map = level.mapSize;
    var imgw = 400 / size_of_map;

    if (direction != undefined) {
        if (direction == 'r' && robot.position[0] == (size_of_map - 1)) {
            return;
        } else if (direction == 'l' && robot.position[0] == 0) {
            return;
        } else if (direction == 'u' && robot.position[1] == 0) {
            return;
        } else if (direction == 'd' && robot.position[1] == (size_of_map - 1)) {
            return;
        }

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

    UI.animationInProgress = true;

    setTimeout(function() {
        percentFinished += 100 / animateFrameNum;
        UI.drawGrid(cvs, true);
        UI.animate(cvs, percentFinished, direction, animateFrameNum, frameTimeMs);
    }, frameTimeMs);


    // if (percentFinished < 100) {
    //     requestAnimationFrame(UI.animate)
    // }
}

// requestAnimationFrame(UI.animate);

UI.moveRobot = function(direction) {
    if (UI.animationInProgress)
        return;
    else {
        UI.animate($('#playground')[0], 0, direction, 5, 10);
    }
}

UI.showPreviousGuide = function() {
    UI.missionGuideInd -= 1;
    $('#guide-inner-box').find('p').html(level.missionGuideDescription[UI.missionGuideInd]);
    if (!isDef(level.missionGuideDescription[UI.missionGuideInd - 1])) {
        $('#guidePreviousButton').hide();
    }
    $('#guideNextButton').show();
}

UI.showNextGuide = function() {
    UI.missionGuideInd += 1;
    $('#guide-inner-box').find('p').html(level.missionGuideDescription[UI.missionGuideInd]);
    if (!isDef(level.missionGuideDescription[UI.missionGuideInd + 1])) {
        $('#guideNextButton').hide();
    }
    $('#guidePreviousButton').show();
}

function indexOfForArrays(search, origin) {
    var searchJson = JSON.stringify(search); // "[3,566,23,79]"
    var arrJson = origin.map(JSON.stringify); // ["[2,6,89,45]", "[3,566,23,79]", "[434,677,9,23]"]

    return arrJson.indexOf(searchJson);
};

function isDef(value) { return typeof value !== 'undefined'; }