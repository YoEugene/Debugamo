/**
 * 遊戲 UI 功能設定區
 */

// UI functioin 定義

goog.provide('Debugging.UI');

goog.require('Debugging.Levels');
goog.require('Blockly');
goog.require('BlocklyGames');
goog.require('Debugging.utils');

var UI = Debugging.UI;
var Levels = {};
var level = {};
// var robot.position = [0, 0];
// var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
// window.requestAnimationFrame = requestAnimationFrame;

UI.init = function(shopState) {
    Levels = $.extend({}, Debugging.Levels);
    level = $.extend({}, Levels[BlocklyGames.LEVEL - 1]);
    UI.robot = $.extend({}, level.robot);

    // ?
    UI.drawn = {};
    UI.dom = {};

    UI.animationInProgress = false;
    UI.missionGuideInd = 0;
    UI.images = {};
    UI.drawGrid($('#playground')[0], false);
    // UI.getImage('unknown.default');
    $('#guidePreviousButton').hide();
    console.log(level.missionGuideDescription[0]);
    $('#inner-box').find('p').html(level.missionGuideDescription[0]);
};

UI.reset = function() {
    UI.animationInProgress = false;
    Levels = $.extend({}, Debugging.Levels);
    level = $.extend({}, Levels[BlocklyGames.LEVEL - 1]);
    UI.robot = $.extend({}, level.robot);

    UI.updateRuntimeUserInterface();
};

// JUSTTT FORRRRRR TESTTTTTTTT DELETE IT
UI.drawGrid = function(cvs, isAnimation) {

    ctx = cvs.getContext("2d");
    var robotPos = UI.robot.position;
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
                    var tmp = specialGrndInd.indexOfForArrays([i, j]);
                    if (tmp == -1) {
                        ctx.drawImage(grndImg, imgw * i, imgw * j, imgw, imgw);
                        ctx.strokeRect(imgw * i, imgw * j, imgw, imgw)
                    } else {
                        var specialImg = UI.getImage(specialGrndName[tmp]);
                        if (!specialImg) specialImg = UI.getImage('unknown.default');
                        ctx.drawImage(specialImg, imgw * i, imgw * j, imgw, imgw);
                        ctx.strokeRect(imgw * i, imgw * j, imgw, imgw)
                    }

                    console.log('draw grid ' + i + ', ' + j);
                }
            }
        }
    }

    UI.drawThings();
}

UI.drawThings = function(thing_name) {

    if (!isDef(thing_name)) {
        var i;
        for (i = 0; i < level.thingsInd.length; i++) {
            var thingPos = level.thingsInd[i];
            var thingName = level.thingsName[i];
            level[thingName] = { position: thingPos, img: thingName };
            UI.drawThings(thingName);
        }

        UI.drawThings('robot');

        return;
    }

    if (thing_name == 'robot')
        var thing = UI.robot;
    else
        var thing = level[thing_name];

    cvs = $('#playground')[0];
    ctx = cvs.getContext("2d");
    var size_of_map = level.mapSize;
    var imgw = cvs.width / size_of_map;
    var img = UI.getImage(thing.img);
    if (!img) img = UI.getImage('unknown.default');

    if (!!img) {
        ctx.drawImage(img, imgw * thing.position[0], imgw * thing.position[1], imgw, imgw);
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
                console.log('onload finished');
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
    // UI.drawThings();
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
        if (direction == 'r' && UI.robot.position[0] == (size_of_map - 1)) {
            return;
        } else if (direction == 'l' && UI.robot.position[0] == 0) {
            return;
        } else if (direction == 'u' && UI.robot.position[1] == 0) {
            return;
        } else if (direction == 'd' && UI.robot.position[1] == (size_of_map - 1)) {
            return;
        }

        if (direction == 'r' || direction == 'l')
            posIndex = 0;
        else
            posIndex = 1;

        if (direction == 'r' || direction == 'd') {
            UI.robot.position[posIndex] += 1.0 / animateFrameNum;
        } else {
            UI.robot.position[posIndex] -= 1.0 / animateFrameNum;
        }
        UI.robot.position[posIndex] = Math.round(UI.robot.position[posIndex] * animateFrameNum) / animateFrameNum;
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
    console.log('animate!');
    if (UI.animationInProgress)
        return;
    else {
        UI.animate($('#playground')[0], 0, direction, 5, 10);
    }
}

UI.showPreviousGuide = function() {
    UI.missionGuideInd -= 1;
    $('#inner-box').find('p').html(level.missionGuideDescription[UI.missionGuideInd]);
    if (!isDef(level.missionGuideDescription[UI.missionGuideInd - 1])) {
        $('#guidePreviousButton').hide();
    }
    $('#guideNextButton').show();
}

UI.showNextGuide = function() {
    UI.missionGuideInd += 1;
    $('#inner-box').find('p').html(level.missionGuideDescription[UI.missionGuideInd]);
    if (!isDef(level.missionGuideDescription[UI.missionGuideInd + 1])) {
        $('#guideNextButton').hide();
    }
    $('#guidePreviousButton').show();
}

Array.prototype.indexOfForArrays = function(search) {
    var searchJson = JSON.stringify(search); // "[3,566,23,79]"
    var arrJson = this.map(JSON.stringify); // ["[2,6,89,45]", "[3,566,23,79]", "[434,677,9,23]"]

    return arrJson.indexOf(searchJson);
};

function isDef(value) { return typeof value !== 'undefined'; }