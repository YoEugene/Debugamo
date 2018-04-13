/**
 * Debugamo: Debugging Mission
 */

// Debugging Game Function

goog.provide('Debugging');

goog.require('Blockly.FieldDropdown');
goog.require('BlocklyDialogs');
goog.require('BlocklyGames');
goog.require('BlocklyInterface');
goog.require('Debugging.Blocks');
goog.require('Debugging.Game');
goog.require('Debugging.UI');
goog.require('Debugging.Levels');
goog.require('Debugging.soy');

BlocklyGames.NAME = 'debugging';

var Scope = Debugging;

Scope.MAX_STEPS = 10000;
Scope.STEP_SPEED = 90;

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

    Scope.Game.init(level = BlocklyGames.LEVEL);

    BlocklyGames.bindClick('runButton', Scope.runButtonClick);
    BlocklyGames.bindClick('resetButton', Scope.resetButtonClick);
    BlocklyGames.bindClick('clearLocalStorageButton', Scope.clearLocalStorageButton);
    BlocklyGames.bindClick('helpButton', Scope.showHelp);
    BlocklyGames.bindClick('guidePreviousButton', Scope.UI.showPreviousGuide);
    BlocklyGames.bindClick('guideNextButton', Scope.UI.showNextGuide);

    // Lazy-load the JavaScript interpreter.
    setTimeout(BlocklyInterface.importInterpreter, 1);
    // Lazy-load the syntax-highlighting.
    setTimeout(BlocklyInterface.importPrettify, 1);

    // init IntroJS
    // BlocklyGames.bindClick('guideButton', introJs().start());

    // init Kibo
    var k = new Kibo();

    k.down(['right', 'left', 'up', 'down'], function(e) {
        Scope.UI.moveRobot(e.key[5].toLowerCase());
    });

    var done = JSON.parse(localStorage.done).indexOf(BlocklyGames.LEVEL) != -1;
    // Show new player text
    if (localStorage.newPlayer == "1") {
        Scope.UI.showNewPlayerText();
    }
    // if not new player but undone
    else if (done) {
        UI.showWorkspace();
    }

};


// /**
//  * Inject the Maze API into a JavaScript interpreter.
//  * @param {!Object} scope Global scope.
//  * @param {!Interpreter} interpreter The JS interpreter.
//  */
Scope.initInterpreter = function(interpreter, scope) {
    //   // API
    var wrapper;
    //   wrapper = function(id) {
    //     Maze.move(0, id.toString());
    //   };
    //   interpreter.setProperty(scope, 'moveForward',
    //       interpreter.createNativeFunction(wrapper));

    /* create native functions for commands in interpreter */

    var commandNames = Object.keys(Scope.Game.commands);
    commandNames.map(function(commandName) {
        interpreter.setProperty(scope, commandName, interpreter.createNativeFunction(Scope.Game.commands[commandName]));
    });
};

/**
 * Execute the user's code.  Heaven help us...
 */
Scope.execute = function() {
    if (!('Interpreter' in window)) {
        // Interpreter lazy loads and hasn't arrived yet.  Try again later.
        setTimeout(Scope.execute, 250);
        return;
    }

    // Maze.log = [];
    var code = Blockly.JavaScript.workspaceToCode(BlocklyGames.workspace);
    console.log(code);
    // Maze.result = Maze.ResultType.UNSET;
    var interpreter = new Interpreter(code, Scope.initInterpreter);


    // try {
    //   eval(code);
    // } catch (e) {
    //   alert(e);
    // }

    // interpreter.run();

    Scope.interpretCode(interpreter, 0);

    // Try running the user's code.  There are four possible outcomes:
    // 1. If pegman reaches the finish [SUCCESS], true is thrown.
    // 2. If the program is terminated due to running too long [TIMEOUT],
    //    false is thrown.
    // 3. If another error occurs [ERROR], that error is thrown.
    // 4. If the program ended normally but without solving the maze [FAILURE],
    //    no error or exception is thrown.
    // try {
    //   var ticks = 10000;  // 10k ticks runs Pegman for about 8 minutes.
    //   while (interpreter.step()) {
    //     if (ticks-- == 0) {
    //       throw Infinity;
    //     }
    //   }
    //   Maze.result = Maze.notDone() ?
    //       Maze.ResultType.FAILURE : Maze.ResultType.SUCCESS;
    // } catch (e) {
    //   // A boolean is thrown for normal termination.
    //   // Abnormal termination is a user error.
    //   if (e === Infinity) {
    //     Maze.result = Maze.ResultType.TIMEOUT;
    //   } else if (e === false) {
    //     Maze.result = Maze.ResultType.ERROR;
    //   } else {
    //     // Syntax error, can't happen.
    //     Maze.result = Maze.ResultType.ERROR;
    //     alert(e);
    //   }
    // }

    // // Fast animation if execution is successful.  Slow otherwise.
    // if (Maze.result == Maze.ResultType.SUCCESS) {
    //   Maze.stepSpeed = 100;
    //   Maze.log.push(['finish', null]);
    // } else {
    //   Maze.stepSpeed = 150;
    // }

    // // Maze.log now contains a transcript of all the user's actions.
    // // Reset the maze and animate the transcript.
    // Maze.reset(false);
    // Maze.pidList.push(setTimeout(Maze.animate, 100));
};

Scope.interpretCode = function(interpreter, stepCount) {
    try {
        // infinite loop
        if (stepCount > Scope.MAX_STEPS) {
            throw Infinity;
        }
        // next step
        if (interpreter.step()) {
            setTimeout(function() {
                Scope.interpretCode(interpreter, stepCount + 1);
            }, Scope.STEP_SPEED);
        }
        // when the code is fully executed, check if the user passes the level
        else {
            if (Levels[BlocklyGames.LEVEL].checkLevelComplete()) {
                Game.things.robot.img = 'robot4';
                Scope.UI.drawGrid($('#playground')[0], false);
                BlocklyInterface.saveToLocalStorage();
                BlocklyDialogs.congratulations();
                var done = JSON.parse(localStorage.done);
                if (done.indexOf(BlocklyGames.LEVEL) == -1)
                    done.push(BlocklyGames.LEVEL);
                localStorage.done = JSON.stringify(done);
                $('.level_in_progress').addClass('level_done');
            }
            // else will throw error message
        }
    } catch (e) {
        if (e === Infinity) {
            window.alert(BlocklyGames.getMsg('DrinkShop_msg_tooManySteps'));
        } else if (typeof e === 'string') {
            window.alert(e);
            console.log(e);
        } else {
            // Syntax error, can't happen.
            window.alert(e);
            console.log(e);
        }
    }
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
    var resetButton = document.getElementById('resetButton');
    // Ensure that Reset button is at least as wide as Run button.
    if (!resetButton.style.minWidth) {
        resetButton.style.minWidth = runButton.offsetWidth + 'px';
    }
    runButton.style.display = 'none';
    resetButton.style.display = 'inline';
    // BlocklyGames.workspace.traceOn(true);

    Scope.Game.reset();
    Scope.execute();
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
    document.getElementById('runButton').style.display = 'inline';
    document.getElementById('resetButton').style.display = 'none';
    // BlocklyGames.workspace.traceOn(false);
    Scope.Game.reset();
    // Maze.levelHelp();
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
Scope.modeChange = function() {
    if ($('#debugMode').prop("checked"))
        localStorage.setItem('debug', '1');
    else
        localStorage.removeItem('debug');
}

/**
 * Initialize Blockly and the game.
 */
window.addEventListener('load', Scope.init);