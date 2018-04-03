/**
 * Self-Defined Blocks
 */

'use strict';

goog.provide('Test.Blocks');

goog.require('Blockly');
goog.require('Blockly.JavaScript');
goog.require('BlocklyGames');

goog.require('Blockly.Blocks.colour');  // Deprecated
goog.require('Blockly.Constants.Colour');
goog.require('Blockly.JavaScript.colour');

goog.require('Blockly.Blocks.lists');  // Deprecated
goog.require('Blockly.Constants.Lists');
goog.require('Blockly.JavaScript.lists');

goog.require('Blockly.Blocks.logic');  // Deprecated
goog.require('Blockly.Constants.Logic');
goog.require('Blockly.JavaScript.logic');

goog.require('Blockly.Blocks.loops');  // Deprecated
goog.require('Blockly.Constants.Loops');
goog.require('Blockly.JavaScript.loops');

goog.require('Blockly.Blocks.math');  // Deprecated
goog.require('Blockly.Constants.Math');
goog.require('Blockly.JavaScript.math');

goog.require('Blockly.Blocks.procedures');
goog.require('Blockly.JavaScript.procedures');

goog.require('Blockly.Blocks.texts');  // Deprecated
goog.require('Blockly.Constants.Text');
goog.require('Blockly.JavaScript.texts');

goog.require('Blockly.Blocks.variables');  // Deprecated.
goog.require('Blockly.Constants.Variables');
goog.require('Blockly.JavaScript.variables');


/**
 * Common HSV hue
 */
Test.Blocks.MOVEMENT_HUE = 290;
Test.Blocks.LOOPS_HUE = 120;
Test.Blocks.LOGIC_HUE = 210;

// Extensions to Blockly's language and JavaScript generator.

Blockly.Blocks['test_helloWorld'] = {
  /**
   * Block for moving forward.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": BlocklyGames.getMsg('Test_helloWorld'),
      "previousStatement": null,
      "nextStatement": null,
      "colour": Test.Blocks.MOVEMENT_HUE,
      "tooltip": BlocklyGames.getMsg('Test_helloWorld')  // Test_helloWorldToolTip
    });
  }
};

Blockly.JavaScript['test_helloWorld'] = function(block) {
  // Generate JavaScript for moving forward.
  // return 'window.alert(\'Hello World!\');\n';
  return 'alert(\'Hello World!\');\n';
  // return 'console.log(\'Hello World!\');\n';
};

