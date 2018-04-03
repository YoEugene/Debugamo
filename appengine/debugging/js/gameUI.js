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
// var robotPos = [0, 0];
// var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
// window.requestAnimationFrame = requestAnimationFrame;

UI.init = function(shopState) {

    UI.drawn = {};
    UI.dom = {};
    UI.animationInProgress = false;
    UI.robotPos = [0, 2];
    Levels = Debugging.Levels;
    level = Levels[BlocklyGames.LEVEL - 1];
    console.log(level);
    UI.drawGrid(document.getElementById('playground'), UI.robotPos);
};

UI.reset = function() {
    UI.animationInProgress = false;
    UI.robotPos = [0, 2];
    UI.drawGrid(document.getElementById('playground'), UI.robotPos);
};

// JUSTTT FORRRRRR TESTTTTTTTT DELETE IT
UI.drawGrid = function(cvs, robotPos, direction) {
    ctx = cvs.getContext("2d");
    var specialGrndInd = level.specialGrndInd;
    var specialGrndName = level.specialGrndName;
    
    // load image
    var specialGrndImg = [];
    for (var i=0, item; item=specialGrndName[i]; i++) {
        var tmpImg = new Image();
        specialGrndImg.push(tmpImg);
        specialGrndImg[i].src = "/debugging/public/img/" + item + ".default.png";
    }

    var img = new Image();
    img.src = "/debugging/public/img/" + level.ground + ".default.png";

    var imgw = cvs.width / level.mapSize;
    ctx.strokeStyle = level.grndColor;
    ctx.lineWidth = 1;

    img.onload = function() {
        for (var i = 0; i < level.mapSize; i++) {
            for (var j = 0; j < level.mapSize; j++) {
                var tmp = specialGrndInd.indexOfForArrays([i, j]);
                if (tmp == -1) {
                    ctx.drawImage(this, imgw * i, imgw * j, imgw, imgw);
                    ctx.strokeRect(imgw * i, imgw * j, imgw, imgw)
                } else {
                    
                        // setTimeout(function(){
                            ctx.drawImage(specialGrndImg[tmp], imgw * i, imgw * j, imgw, imgw);
                            ctx.strokeRect(imgw * i, imgw * j, imgw, imgw)
                            console.log('draw');
                        // },10)
                        
                    // }
                }
            }
        }
        
        UI.drawRobot();
    }
}

UI.resetGrid = function() {
    document.getElementById('playground').getContext("2d").clearRect(0, 0, 400, 400);
    UI.robotPos = [0, 2];
    console.log('reset')
}

UI.drawRobot = function() {
    cvs = document.getElementById('playground');
    ctx = cvs.getContext("2d");
    var size_of_map = level.mapSize;
    var imgw = cvs.width / size_of_map;
    var img = new Image();
    var imgGoal = new Image();
    img.src = "/debugging/public/img/robot2.png";
    imgGoal.src = "/debugging/public/img/kitten.default.png";

    
    if (UI.animationInProgress) {
        ctx.drawImage(imgGoal, imgw * 4, imgw * 4, imgw, imgw);
        ctx.drawImage(img, imgw * UI.robotPos[0], imgw * UI.robotPos[1], imgw, imgw);
    }
    else {
        imgGoal.onload = function(){
            ctx.drawImage(imgGoal, imgw * 4, imgw * 4, imgw, imgw);
            // img.onload = function(){
                ctx.drawImage(img, imgw * UI.robotPos[0], imgw * UI.robotPos[1], imgw, imgw);
            // }  
        }    
    }
    
    console.log('draw robot & goal');
}

UI.animate = function(cvs, percentFinished, direction) {
    var ctx = cvs.getContext('2d');
    // number of animation frame
    var animateFrameNum = 6;
    // time each frame (ms)
    var speed = 10;

    if (percentFinished >= 100) {
        UI.animationInProgress = false;
        return;
    }

    var size_of_map = level.mapSize;
    var imgw = 400 / size_of_map;

    if (direction != undefined) {
        if (direction == 'r' && UI.robotPos[0] == (size_of_map - 1)) {
            return;
        } else if (direction == 'l' && UI.robotPos[0] == 0) {
            return;
        } else if (direction == 'u' && UI.robotPos[1] == 0) {
            return;
        } else if (direction == 'd' && UI.robotPos[1] == (size_of_map - 1)) {
            return;
        }   

        if (direction == 'r' || direction == 'l')
            posIndex = 0;
        else
            posIndex = 1;

        if (direction == 'r' || direction == 'd') {
            UI.robotPos[posIndex] += 1.0 / animateFrameNum;
            UI.robotPos[posIndex] = Math.round(UI.robotPos[posIndex] * animateFrameNum) / animateFrameNum;
        } else {
            UI.robotPos[posIndex] -= 1.0 / animateFrameNum;
            UI.robotPos[posIndex] = Math.round(UI.robotPos[posIndex] * animateFrameNum) / animateFrameNum;
        }
    }

    UI.animationInProgress = true;

    setTimeout(function() {
        percentFinished += 100 / animateFrameNum;
        UI.drawGrid(cvs, UI.robotPos, direction);
        UI.animate(cvs, percentFinished, direction);
    }, speed);

    // if (percentFinished < 100) {
    //     requestAnimationFrame(UI.animate)
    // }
}

// requestAnimationFrame(UI.animate);

UI.animateRobot = function(direction) {
    if (UI.animationInProgress)
        return;
    else {
        UI.animate(document.getElementById('playground'), 0, direction);
    }
}

Array.prototype.indexOfForArrays = function(search) {
    var searchJson = JSON.stringify(search); // "[3,566,23,79]"
    var arrJson = this.map(JSON.stringify); // ["[2,6,89,45]", "[3,566,23,79]", "[434,677,9,23]"]

    return arrJson.indexOf(searchJson);
};