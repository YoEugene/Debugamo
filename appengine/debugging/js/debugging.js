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
goog.require('Debugging.Game.Config');
goog.require('Debugging.soy');

BlocklyGames.NAME = 'debugging';

var Scope = Debugging;

Scope.MAX_STEPS = 10000;
Scope.STEP_SPEED = 100;

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
    // document.getElementById('drink-shop-code-editor-left').style.width = "calc(65vw - 50px - " + blocklyFlyoutWidth + "px)";
    // Blockly.svgResize(BlocklyGames.workspace);
};

Scope.initHeaderWidth = function() {
    var toolboxHeader = document.getElementById('toolbox-header');
    var workspaceHeader = document.getElementById('workspace-header');
    var width1 = document.getElementsByClassName('blocklyFlyoutBackground')[0].getBoundingClientRect().width;
    var width2 = document.getElementsByClassName('blocklyWorkspace')[0].getBoundingClientRect().width;
    toolboxHeader.style.width = width1 + 'px';
    workspaceHeader.style.width = (width2 - width1 - 30) + 'px';
    console.log('initHeaderWidth done.');
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
    var scale = Scope.Game.Config.levels[BlocklyGames.LEVEL].scale || 1;
    // init blocks
    var blockIds = Scope.Game.Config.levels[BlocklyGames.LEVEL].blockIds;
    blockIds.forEach(function(blockId) {
        var block = document.getElementById(blockId);
        toolbox.appendChild(block);
    });
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

    // load defualt blocks or load stored blocks from Local Storage / Session Storage / DB
    var defaultXml = window.localStorage.savedBlocks;
    BlocklyInterface.loadBlocks(defaultXml, false);

    Scope.initBlocklyDivSize();
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
    BlocklyGames.bindClick('helpButton', Scope.showHelp);
    // BlocklyGames.bindClick('drink-shop-price-list', Scope.showPrice);
    BlocklyGames.bindClick('saveButton', BlocklyInterface.saveToLocalStorage);

    var shopContainer = document.getElementById('drink-shop-left-container');

    // Lazy-load the JavaScript interpreter.
    setTimeout(BlocklyInterface.importInterpreter, 1);
    // Lazy-load the syntax-highlighting.
    setTimeout(BlocklyInterface.importPrettify, 1);

    // init IntroJS
    // BlocklyGames.bindClick('guideButton', introJs().start());

    // init Kibo
    var k = new Kibo();

    k.down(['right','left','up','down'], function(e){
        Debugging.UI.animateRobot(e.key[5].toLowerCase());
    });

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
            if (Debugging.Game.Config.levels[BlocklyGames.LEVEL].checkLevelComplete()) {
                BlocklyInterface.saveToLocalStorage();
                BlocklyDialogs.congratulations();
            }
            // else will throw error message
        }
    } catch (e) {
        if (e === Infinity) {
            window.alert(BlocklyGames.getMsg('DrinkShop_msg_tooManySteps'));
        } else if (typeof e === 'string') {
            window.alert(e);
        } else {
            // Syntax error, can't happen.
            window.alert(e);
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
 * Show the help pop-up.
 */

Scope.showPrice = function() {
    var price = document.getElementById('price_list');
    var button = document.getElementById('priceButton');
    var style = {
        width: '50%',
        left: '25%',
        top: '5em'
    };
    BlocklyDialogs.showDialog(price, button, true, true, style,
        BlocklyDialogs.stopDialogKeyDown);
    BlocklyDialogs.startDialogKeyDown();
}

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

/**
 * Save the blocks for a one-time reload.
 */
Scope.saveToStorage = function() {
    // MSIE 11 does not support sessionStorage on file:// URLs.
    if (typeof Blockly != undefined && window.localStorage) {
        var xml = Blockly.Xml.workspaceToDom(BlocklyGames.workspace);
        var text = Blockly.Xml.domToText(xml);
        window.localStorage.savedBlocks = text;
    }

    console.log('Current blocks saved!')
};

/**
 * Initialize Blockly and the game.
 */
window.addEventListener('load', Scope.init);