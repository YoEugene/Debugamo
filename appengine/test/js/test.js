/**
 * Blockly Games: Test
 * A template for building a new app.
 */

goog.provide('Test');

goog.require('Blockly.FieldDropdown');
goog.require('BlocklyDialogs');
goog.require('BlocklyGames');
goog.require('BlocklyInterface');
goog.require('Test.Blocks');
goog.require('Test.soy');

BlocklyGames.NAME = 'test';

var Scope = Test;


BlocklyInterface.nextLevel = function() {
  if (BlocklyGames.LEVEL < BlocklyGames.MAX_LEVEL) {
    window.location = window.location.protocol + '//' +
        window.location.host + window.location.pathname +
        '?lang=' + BlocklyGames.LANG + '&level=' + (BlocklyGames.LEVEL + 1);
  } else {
    BlocklyInterface.indexPage();
  }
};


/**
 * Initialize Blockly and the game.  Called on page load.
 */
Scope.init = function() {
  // Render the Soy template.
  document.body.innerHTML = Scope.soy.start({}, null,
      {lang: BlocklyGames.LANG,
       level: BlocklyGames.LEVEL,
       maxLevel: BlocklyGames.MAX_LEVEL,
       html: BlocklyGames.IS_HTML});

  BlocklyInterface.init();

  var rtl = BlocklyGames.isRtl();  // right to left?
  var blocklyDiv = document.getElementById('blockly');
  var visualization = document.getElementById('visualization');
  var onresize = function(e) {
    var top = visualization.offsetTop;
    blocklyDiv.style.top = Math.max(10, top - window.pageYOffset) + 'px';
    blocklyDiv.style.left = rtl ? '10px' : '420px';
    blocklyDiv.style.width = (window.innerWidth - 440) + 'px';
  };
  window.addEventListener('scroll', function() {
    onresize();
    Blockly.svgResize(BlocklyGames.workspace);
  });
  window.addEventListener('resize', onresize);
  onresize();

  var toolbox = document.getElementById('toolbox');
  var scale = 1 + (1 - (BlocklyGames.LEVEL / BlocklyGames.MAX_LEVEL)) / 3;
  BlocklyGames.workspace = Blockly.inject('blockly',
      {'media': 'third-party/blockly/media/',
    //    'maxBlocks': Maze.MAX_BLOCKS,
       'rtl': rtl,
       'toolbox': toolbox,
       'trashcan': true,
       'zoom': {'startScale': scale}});
//   BlocklyGames.workspace.loadAudio_(Maze.SKIN.winSound, 'win');
//   BlocklyGames.workspace.loadAudio_(Maze.SKIN.crashSound, 'fail');
//   Not really needed, there are no user-defined functions or variables.
//   Blockly.JavaScript.addReservedWords('moveForward,moveBackward,' +
//       'turnRight,turnLeft,isPathForward,isPathRight,isPathBackward,isPathLeft');

  // load defualt blocks or load stored blocks from Local Storage / Session Storage / DB
  var defaultXml = '';
  BlocklyInterface.loadBlocks(defaultXml, false);

//   Maze.reset(true);
//   BlocklyGames.workspace.addChangeListener(function() {Maze.updateCapacity()});

  BlocklyGames.bindClick('runButton', Scope.runButtonClick);
  // BlocklyGames.bindClick('resetButton', Maze.resetButtonClick);

  // Lazy-load the JavaScript interpreter.
  setTimeout(BlocklyInterface.importInterpreter, 1);
  // Lazy-load the syntax-highlighting.
  setTimeout(BlocklyInterface.importPrettify, 1);
};




// /**
//  * Inject the Maze API into a JavaScript interpreter.
//  * @param {!Object} scope Global scope.
//  * @param {!Interpreter} interpreter The JS interpreter.
//  */
Scope.initInterpreter = function(interpreter, scope) {
//   // API
//   var wrapper;
//   wrapper = function(id) {
//     Maze.move(0, id.toString());
//   };
//   interpreter.setProperty(scope, 'moveForward',
//       interpreter.createNativeFunction(wrapper));
//   wrapper = function(id) {
//     Maze.move(2, id.toString());
//   };
//   interpreter.setProperty(scope, 'moveBackward',
//       interpreter.createNativeFunction(wrapper));
//   wrapper = function(id) {
//     Maze.turn(0, id.toString());
//   };
//   interpreter.setProperty(scope, 'turnLeft',
//       interpreter.createNativeFunction(wrapper));
//   wrapper = function(id) {
//     Maze.turn(1, id.toString());
//   };
//   interpreter.setProperty(scope, 'turnRight',
//       interpreter.createNativeFunction(wrapper));
//   wrapper = function(id) {
//     return interpreter.createPrimitive(Maze.isPath(0, id.toString()));
//   };
//   interpreter.setProperty(scope, 'isPathForward',
//       interpreter.createNativeFunction(wrapper));
//   wrapper = function(id) {
//     return interpreter.createPrimitive(Maze.isPath(1, id.toString()));
//   };
//   interpreter.setProperty(scope, 'isPathRight',
//       interpreter.createNativeFunction(wrapper));
//   wrapper = function(id) {
//     return interpreter.createPrimitive(Maze.isPath(2, id.toString()));
//   };
//   interpreter.setProperty(scope, 'isPathBackward',
//       interpreter.createNativeFunction(wrapper));
//   wrapper = function(id) {
//     return interpreter.createPrimitive(Maze.isPath(3, id.toString()));
//   };
//   interpreter.setProperty(scope, 'isPathLeft',
//       interpreter.createNativeFunction(wrapper));
//   wrapper = function() {
//     return interpreter.createPrimitive(Maze.notDone());
//   };
//   interpreter.setProperty(scope, 'notDone',
//       interpreter.createNativeFunction(wrapper));

  // wrapper = function() {
  //   return interpreter.createPrimitive(window.alert('wrapper'));
  // };
  // interpreter.setProperty(scope, 'alert',
  //     interpreter.createNativeFunction(wrapper));

  var wrapper = function(text) {
    text = text ? text.toString() : '';
    return interpreter.createPrimitive(window.alert(text));
  };
  interpreter.setProperty(scope, 'alert',
      interpreter.createNativeFunction(wrapper));
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
  // Maze.result = Maze.ResultType.UNSET;
  var interpreter = new Interpreter(code, Scope.initInterpreter);

  // console.log(code);

  // try {
  //   eval(code);
  // } catch (e) {
  //   alert(e);
  // }

  interpreter.run();
  // interpreter.step();

  // try {
  //   var ticks = 10000;
  //   while (interpreter.step()) {
  //     if (ticks-- == 0) {
  //       throw Infinity;
  //     }
  //   }
  // } catch (e) {
  // //   // A boolean is thrown for normal termination.
  // //   // Abnormal termination is a user error.
  // //   if (e === Infinity) {
  // //     Maze.result = Maze.ResultType.TIMEOUT;
  // //   } else if (e === false) {
  // //     Maze.result = Maze.ResultType.ERROR;
  // //   } else {
  // //     // Syntax error, can't happen.
  // //     Maze.result = Maze.ResultType.ERROR;
  // //     alert(e);
  // //   }
  // }

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
  BlocklyInterface.saveToLocalStorage();
  BlocklyDialogs.congratulations();
};

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
  // var runButton = document.getElementById('runButton');
  // var resetButton = document.getElementById('resetButton');
  // // Ensure that Reset button is at least as wide as Run button.
  // if (!resetButton.style.minWidth) {
  //   resetButton.style.minWidth = runButton.offsetWidth + 'px';
  // }
  // runButton.style.display = 'none';
  // resetButton.style.display = 'inline';
  // BlocklyGames.workspace.traceOn(true);
  // Maze.reset(false);
  Scope.execute();
};



/**
 * Initialize Blockly and the game.
 */
window.addEventListener('load', Scope.init);
