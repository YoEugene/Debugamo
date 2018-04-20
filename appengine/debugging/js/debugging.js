/**
 * Debugamo: Debugging Mission
 */

// Debugging Game Function

goog.provide('Debugging');

goog.require('Blockly.FieldDropdown');
goog.require('BlocklyDialogs');
goog.require('BlocklyGames');
goog.require('BlocklyInterface');
goog.require('Blockly.Workspace');
goog.require('Debugging.Blocks');
goog.require('Debugging.Game');
goog.require('Debugging.UI');
goog.require('Debugging.Levels');
goog.require('Debugging.soy');

BlocklyGames.NAME = 'debugging';

var Scope = Debugging;

Scope.MAX_STEPS = 10000;

BlocklyInterface.nextLevel = function() {
    if (BlocklyGames.LEVEL < BlocklyGames.MAX_LEVEL) {
        window.location = window.location.protocol + '//' +
            window.location.host + window.location.pathname +
            '?lang=' + BlocklyGames.LANG + '&level=' + (BlocklyGames.LEVEL + 1);
    } else {
        BlocklyInterface.indexPage();
    }
};

Scope.initBlocklyDivSize = function() {
    // resize blocklyDiv width
    // var blocklyFlyoutWidth = document.getElementsByClassName('blocklyFlyout')[0].clientWidth;
    // document.getElementById('blockly').style.width = "calc(35vw + " + blocklyFlyoutWidth + "px)";
    // document.getElementById('debugamo-code-editor-left').style.width = "calc(65vw - 50px - " + blocklyFlyoutWidth + "px)";
    // Blockly.svgResize(BlocklyGames.workspace);
};

Scope.initHeaderWidth = function() {
    var toolboxHeader = document.getElementById('toolbox-header');
    var workspaceHeader = document.getElementById('workspace-header');
    var widthCategory = $('.blocklyToolboxDiv').width();
    var widthBlock = document.getElementsByClassName('blocklyFlyoutBackground')[0].getBoundingClientRect().width;
    var widthWorkspace = document.getElementsByClassName('blocklyWorkspace')[0].getBoundingClientRect().width;
    if (widthCategory == undefined) {
        toolboxHeader.style.width = widthBlock + 'px';
        workspaceHeader.style.width = (widthWorkspace - widthBlock - 30) + 'px';
    } else {
        toolboxHeader.style.width = widthCategory + 'px';
        workspaceHeader.style.width = (widthWorkspace - widthCategory - 30) + 'px';
    }
    console.log('Re-init Header Width.');
}

/**
 * Initialize Blockly and the game.  Called on page load.
 */
Scope.init = function() {
    // Render the Soy template.
    document.body.innerHTML = Scope.soy.start({}, null, {
        lang: BlocklyGames.LANG,
        level: BlocklyGames.LEVEL,
        maxLevel: BlocklyGames.MAX_LEVEL,
        html: BlocklyGames.IS_HTML
    });

    BlocklyInterface.init();

    var rtl = BlocklyGames.isRtl(); // right to left?
    var blocklyDiv = document.getElementById('blockly');

    /* Init Blockly */
    var toolbox = document.getElementById('toolbox');
    var scale = Levels[BlocklyGames.LEVEL].scale || 1;
    // init blocks or categories
    var categoryIds = Levels[BlocklyGames.LEVEL].categoryIds;
    // No specify category
    if (categoryIds.length == 0) {
        var blockIds = Levels[BlocklyGames.LEVEL].blockIds;
        blockIds.forEach(function(blockId) {
            var block = document.getElementById(blockId);
            toolbox.appendChild(block);
        });
    } else {
        categoryIds.forEach(function(categoryId) {
            var category = document.getElementById(categoryId);
            toolbox.appendChild(category);
        });
    }
    
    BlocklyGames.workspace = Blockly.inject('blockly', {
        'media': 'third-party/blockly/media/',
        'rtl': rtl,
        'readOnly': false,
        'toolbox': toolbox,
        'trashcan': true,
        'zoom': {
            controls: false,
            wheel: false,
            startScale: scale,
            maxScale: scale,
            minScale: 0.5,
            scaleSpeed: 1,
        },
    });

    //   BlocklyGames.workspace.loadAudio_(Maze.SKIN.winSound, 'win');
    //   BlocklyGames.workspace.loadAudio_(Maze.SKIN.crashSound, 'fail');
    //   Not really needed, there are no user-defined functions or variables.
    //   Blockly.JavaScript.addReservedWords('moveForward,moveBackward,' +
    //       'turnRight,turnLeft,isPathForward,isPathRight,isPathBackward,isPathLeft');


    // if there is no saved xml(which means level just started, or empty xml, load the defaultBlocks from levels.js)
    var savedXml = BlocklyGames.loadFromLocalStorage('debugging', BlocklyGames.LEVEL);
    if ( savedXml == undefined || savedXml == "" || savedXml == '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables></xml>') {
        BlocklyInterface.saveToLocalStorage(Levels[BlocklyGames.LEVEL].defaultBlocks);
    }

    // load defualt blocks or load stored blocks from Local Storage / Session Storage / DB
    var defaultXml = localStorage.savedBlocks;
    BlocklyInterface.loadBlocks(defaultXml, false);
    console.log('load blocks');

    // Scope.initBlocklyDivSize();
    Scope.initHeaderWidth();

    // On Window resize init workspace header width
    window.addEventListener('resize', function(event) {
        Scope.initHeaderWidth();
    }, true);

    // Maze.reset(true);
    BlocklyGames.workspace.addChangeListener(function() {
        BlocklyInterface.saveToLocalStorage()
        console.log('Saved to Localstorage by change.');
    });

    Game.init(BlocklyGames.LEVEL);

    BlocklyGames.bindClick('runButton', Scope.runButtonClick);
    BlocklyGames.bindClick('stepButton', Scope.stepButtonClick);
    BlocklyGames.bindClick('resetButton', Scope.resetButtonClick);
    BlocklyGames.bindClick('clearLocalStorageButton', Scope.clearLocalStorageButton);
    BlocklyGames.bindClick('helpButton', Scope.showHelp);
    BlocklyGames.bindClick('guidePreviousButton', UI.showPreviousGuide);
    BlocklyGames.bindClick('guideNextButton', UI.showNextGuide);

    // Lazy-load the JavaScript interpreter.
    setTimeout(BlocklyInterface.importInterpreter, 1);
    // Lazy-load the syntax-highlighting.
    setTimeout(BlocklyInterface.importPrettify, 1);

    // init IntroJS
    // BlocklyGames.bindClick('guideButton', introJs().start());

    // // enable Kibo
    // var k = new Kibo();

    // k.down(['right', 'left', 'up', 'down'], function(e) {
    //     UI.moveRobot(e.key[5].toLowerCase());
    // });

    var done = JSON.parse(localStorage.done).indexOf(BlocklyGames.LEVEL) != -1;
    // Show new player text
    if (localStorage.newPlayer == "1") {
        UI.showNewPlayerText();
    }
    // if not new player but undone
    else if (done) {
        UI.showWorkspace();
    }

    if (localStorage.speed == "1") {
        Scope.changeToSpeedMode();
        $('#speedMode').prop("checked", true);
    } else {
        Scope.changeToSlowMode();
    }

};

/**
 * merge code with list initiation...  append such like "var kittens = ['kitten1', 'kitten2'];\n" into code
 */
Scope.mergeCodeWithListInit = function(code, thingsName) {
    var i, j, k, listTag = [];
    for (i = 0; i < thingsName.length; i++) {
        name = thingsName[i];
        if (Number.isInteger(name[name.length - 1] * 1)) {
            name = name.slice(0, name.length - 1);
            listTag.push(name);
            break
        }
    }

    console.log(listTag);
    if (listTag.length == 0)
        return code;
    // var kittens = ['kitten1','kitten2'];\n
    for (j = 0; j < listTag.length; j++) {
        var prependCode = "var " + listTag[j] + "s = [";
        var tmp = [];
        for (k = 0; k < thingsName.length; k++) {
            nm = thingsName[k];
            if (nm.indexOf(listTag[j]) != -1) {
                tmp.push(nm);
            }
        }
        tmp = tmp.join('", "');
        tmp = '"' + tmp + '"';
        prependCode += tmp + '];\n';
        console.log(prependCode);
        code = prependCode + code;
    }

    return code;
}

/**
 * Inject the Maze API into a JavaScript interpreter.
 * @param {!Object} scope Global scope.
 * @param {!Interpreter} interpreter The JS interpreter.
 */
Scope.initInterpreter = function(interpreter, scope) {
    var commandNames = Object.keys(Game.commands);
    commandNames.map(function(commandName) {
        interpreter.setProperty(scope, commandName, interpreter.createNativeFunction(Game.commands[commandName]));
    });
};

/**
 * Execute the user's code.  Heaven help us...
 */
Scope.execute = function() {

    Game.stopProgram = false;

    if (!('Interpreter' in window)) {
        // Interpreter lazy loads and hasn't arrived yet.  Try again later.
        console.log('lazy load');
        setTimeout(Scope.execute, 250);
        return;
    }

    var code = Blockly.JavaScript.workspaceToCode(BlocklyGames.workspace);

    console.log(Object.keys(Game.things));
    code = Scope.mergeCodeWithListInit(code, Object.keys(Game.things));

    console.log(code);

    var interpreter = new Interpreter(code, Scope.initInterpreter);


    // try {
    //   eval(code);
    // } catch (e) {
    //   alert(e);
    // }


    Scope.interpretCode(interpreter, 0);
};

/**
 * Execute a step of workspace code
 */

Scope.executeStep = function(pass_in_interpreter) {

    Game.stepInProgress = true;

    if (!('Interpreter' in window)) {
        // Interpreter lazy loads and hasn't arrived yet.  Try again later.
        setTimeout(Scope.executeStep, 250);
        return;
    }

    if (!!pass_in_interpreter) {
        var interpreter = pass_in_interpreter;
    }
    else if (!Game.currentInterpreter) {
        var code = Blockly.JavaScript.workspaceToCode(BlocklyGames.workspace);
        
        console.log(Object.keys(Game.things));
        code = Scope.mergeCodeWithListInit(code, Object.keys(Game.things));

        console.log(code);

        var interpreter = new Interpreter(code, Scope.initInterpreter);
    } else {
        var interpreter = Game.currentInterpreter;
    }

    try {
        if (!Game.stepAnchor && interpreter.step()) {
            setTimeout(function() {
                Scope.executeStep(interpreter);
            }, Scope.STEP_SPEED);
        } else if (!interpreter.step()) {
            // finished all steps
            // clear saved interpreter
            Game.currentInterpreter = undefined;
            $('#stepButton').hide();

            // Check if level is completed
            setTimeout(function(){
                Scope.checkCurrentLevelComplete();
            }, 300);
        } else if (Game.stepAnchor) {
            // Save current interpreter
            Game.currentInterpreter = interpreter;
        } 
    } catch (e) {
        // Debugamo: setTimeout generate a short period of delay, so dom can update normally
        // levels.js : $($('#goal-list').find('li')[0]).addClass('fail'); -> Set goal <li> to red color
        if (e === Infinity) {
            setTimeout(function(){UI.showFailText('DrinkShop_msg_tooManySteps');},10);
        } else if (typeof e === 'string') {
            setTimeout(function(){UI.showFailText(e);},10);
            console.log(e);
        } else {
            // Syntax error, can't happen.
            setTimeout(function(){UI.showFailText(e);},10);
            console.log(e);
        }
    }

    Game.stepInProgress = false;

}

/**
 * Interpret Workspace Code
 */

Scope.interpretCode = function(interpreter, stepCount) {
    try {
        // infinite loop
        if (stepCount > Scope.MAX_STEPS) {
            throw Infinity;
        }
        // next step
        if (!Game.stopProgram && interpreter.step()) {
            setTimeout(function() {
                Scope.interpretCode(interpreter, stepCount + 1);
            }, Scope.STEP_SPEED);
        }
        // click reset/stop button
        else if (Game.stopProgram) {
            Game.stopProgram = false;
            return;
        }
        // when the code is fully executed, check if the user passes the level
        else if (!interpreter.step()) {
            setTimeout(function(){
                Scope.checkCurrentLevelComplete();
            }, 300);
            // else will throw error message
        }
    } catch (e) {
        // Debugamo: setTimeout generate a short period of delay, so dom can update normally
        // levels.js : $($('#goal-list').find('li')[0]).addClass('fail'); -> Set goal <li> to red color
        if (e === Infinity) {
            setTimeout(function(){UI.showFailText('DrinkShop_msg_tooManySteps');},10);
        } else if (typeof e === 'string') {
            setTimeout(function(){UI.showFailText(e);},10);
            console.log(e);
        } else {
            // Syntax error, can't happen.
            setTimeout(function(){UI.showFailText(e);},10);
            console.log(e);
        }
    }
}

/**
 * Check if this level is completed
 * If yes, show congratz msg; else show fail msg
 */

Scope.checkCurrentLevelComplete = function() {
    if (Levels[BlocklyGames.LEVEL].checkLevelComplete()) {
        Game.things.robot.state = 'happy';
        BlocklyInterface.saveToLocalStorage();
        BlocklyDialogs.congratulations();
        var done = JSON.parse(localStorage.done);
        if (done.indexOf(BlocklyGames.LEVEL) == -1) {
            done.push(BlocklyGames.LEVEL);
            localStorage.done = JSON.stringify(done);
            $('.level_in_progress').addClass('level_done');
            if ($('.level_disable')[0] != undefined) {
                $($('.level_disable')[0]).addClass('level_in_progress');
                $($('.level_disable')[0]).removeClass('level_disable');
            }
        }
        BlocklyInterface.highlight(null);
    } else {
        Game.things.robot.state = 'sad';
    }
    UI.drawGrid($('#playground')[0], false);
    UI.drawThings();
    UI.drawTags();
}

/**
 * Click the run button.  Start the program.
 * @param {!Event} e Mouse or touch event.
 */
Scope.runButtonClick = function(e) {
    // Prevent double-clicks or double-taps.
    if (BlocklyInterface.eventSpam(e)) {
        return;
    }
    BlocklyDialogs.hideDialog(false);

    // Only allow a single top block on level 1.
    // if (BlocklyGames.LEVEL == 1 &&
    //     BlocklyGames.workspace.getTopBlocks().length > 1 &&
    //     Maze.result != Maze.ResultType.SUCCESS &&
    //     !BlocklyGames.loadFromLocalStorage(BlocklyGames.NAME,
    //                                        BlocklyGames.LEVEL)) {
    //   Maze.levelHelp();
    //   return;
    // }
    var runButton = document.getElementById('runButton');
    var stepButton = document.getElementById('stepButton');
    var resetButton = document.getElementById('resetButton');
    // Ensure that Reset button is at least as wide as Run button.
    if (!resetButton.style.minWidth) {
        resetButton.style.minWidth = runButton.offsetWidth + 'px';
    }
    runButton.style.display = 'none';
    stepButton.style.display = 'none';
    resetButton.style.display = 'inline';
    // BlocklyGames.workspace.traceOn(true);

    Game.reset();
    Scope.execute();
};

/**
 * Click the step button.  Run the program for one step.
 * @param {!Event} e Mouse or touch event.
 */
Scope.stepButtonClick = function(e) {
    // Prevent double-clicks or double-taps.
    if (BlocklyInterface.eventSpam(e) || Game.stepInProgress) {
        return;
    }

    BlocklyDialogs.hideDialog(false);

    var runButton = document.getElementById('runButton');
    var stepButton = document.getElementById('stepButton');
    var resetButton = document.getElementById('resetButton');
    var gameButtons = document.getElementById('game-buttons');
    // Ensure that Reset button is at least as wide as Run button.
    if (!resetButton.style.minWidth) {
        resetButton.style.minWidth = runButton.offsetWidth + 'px';
    }
    runButton.style.display = 'none';
    // stepButton.style.display = 'none';
    // gameButtons.style.textAlign = 'right';
    resetButton.style.display = 'inline-block';

    Game.stopProgram = false;
    Game.stepAnchor = false;

    Scope.executeStep();

};

/**
 * Click the reset button.  Reset the maze.
 * @param {!Event} e Mouse or touch event.
 */
Scope.resetButtonClick = function(e) {
    // Prevent double-clicks or double-taps.
    if (BlocklyInterface.eventSpam(e)) {
        return;
    }
    // disable animation for a short of period
    UI.stopAnimation = true;

    document.getElementById('runButton').style.display = 'inline-block';
    document.getElementById('stepButton').style.display = 'inline-block';
    document.getElementById('resetButton').style.display = 'none';
    document.getElementById('game-buttons').style.textAlign = 'left';
    // BlocklyGames.workspace.traceOn(false);
    Game.reset();
    // Maze.levelHelp();
    // enable animation after short of period
    setTimeout(function(){UI.stopAnimation = false;}, 500)
};

/** 
 * Clear LocalStorage
 */
Scope.clearLocalStorageButton = function() {
    localStorage.clear();
    localStorage.setItem('debug', "1");
    localStorage.setItem('newPlayer', "1");
}

/**
 * Show the help pop-up.
 */

Scope.showHelp = function() {
    var help = document.getElementById('help');
    var button = document.getElementById('helpButton');
    var style = {
        width: '50%',
        left: '25%',
        top: '5em'
    };
    BlocklyDialogs.showDialog(help, button, true, true, style,
        BlocklyDialogs.stopDialogKeyDown);
    BlocklyDialogs.startDialogKeyDown();
};

Scope.startGame = function() {
    if (BlocklyDialogs.isDialogVisible_) {
        BlocklyDialogs.hideDialog(false);
    }
}

/**
 * Save the blocks for a one-time reload.
 */
Scope.saveToStorage = function() {
    // MSIE 11 does not support sessionStorage on file:// URLs.
    if (typeof Blockly != undefined && localStorage) {
        var xml = Blockly.Xml.workspaceToDom(BlocklyGames.workspace);
        var text = Blockly.Xml.domToText(xml);
        localStorage.savedBlocks = text;
    }

    console.log('Current blocks saved!')
};

/**
 * Change Debug Mode
 */
Scope.debugModeChange = function() {
    if ($('#debugMode').prop("checked"))
        localStorage.setItem('debug', '1');
    else
        localStorage.removeItem('debug');
}

/**
 * Toggle change speed mode
 */
Scope.speedModeChange = function() {
    if (!$('#speedMode').prop("checked")) {
        Scope.changeToSpeedMode();   
        console.log('changed to speed mode');
    }
    else {
        Scope.changeToSlowMode();   
        console.log('changed to slow mode');
    }
}

/**
 * Change to speed mode
 */
Scope.changeToSpeedMode = function() {
    localStorage.setItem('speed', '1');
    Scope.STEP_SPEED = 7;
    UI.drawFrame = 5;
    UI.drawSpeed = 10;
}

/**
 * Change to slow mode
 */
Scope.changeToSlowMode = function() {
    localStorage.removeItem('speed');
    Scope.STEP_SPEED = 18;
    UI.drawFrame = 10;
    UI.drawSpeed = 20;
}

/**
 * Initialize Blockly and the game.
 */
window.addEventListener('load', Scope.init);