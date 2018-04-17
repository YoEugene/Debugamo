/**
 * Self-Defined Blocks
 */

'use strict';

goog.provide('Debugging.Blocks');

goog.require('Blockly');
goog.require('Blockly.JavaScript');
goog.require('BlocklyGames');

// goog.require('Blockly.Blocks.colour');  // Deprecated
goog.require('Blockly.Constants.Colour');
goog.require('Blockly.JavaScript.colour');

// goog.require('Blockly.Blocks.lists');  // Deprecated
goog.require('Blockly.Constants.Lists');
goog.require('Blockly.JavaScript.lists');

// goog.require('Blockly.Blocks.logic');  // Deprecated
goog.require('Blockly.Constants.Logic');
goog.require('Blockly.JavaScript.logic');

// goog.require('Blockly.Blocks.loops');  // Deprecated
goog.require('Blockly.Constants.Loops');
goog.require('Blockly.JavaScript.loops');

// goog.require('Blockly.Blocks.math'); // Deprecated
goog.require('Blockly.Constants.Math');
goog.require('Blockly.JavaScript.math');

goog.require('Blockly.Blocks.procedures');
goog.require('Blockly.JavaScript.procedures');

// goog.require('Blockly.Blocks.texts');  // Deprecated
goog.require('Blockly.Constants.Text');
goog.require('Blockly.JavaScript.texts');

// goog.require('Blockly.Blocks.variables');  // Deprecated.
goog.require('Blockly.Constants.Variables');
goog.require('Blockly.JavaScript.variables');


var Scope_Blocks = Debugging.Blocks;

/**
 * Common HSV hue
 */
Scope_Blocks.MOVEMENT_HUE = 290;
Scope_Blocks.LOOPS_HUE = 120;
Scope_Blocks.LOGIC_HUE = 210;

// Extensions to Blockly's language and JavaScript generator.
Blockly.Blocks['Move_Robot'] = {
    init: function() {
        this.jsonInit({
            "type": "move_robot",
            "message0": "向 %1 走 %2 步",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "DIRECTION",
                    "options": [
                        ["左邊", "Left"],
                        ["右邊", "Right"],
                        ["上面", "Up"],
                        ["下面", "Down"]
                    ]
                },
                {
                    "type": "field_number",
                    "name": "NUM_OF_MOVE",
                    "value": 0,
                    "min": 1,
                    "max": 99
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 120,
            "tooltip": "",
            "helpUrl": ""
        });
    }
};
Blockly.JavaScript['Move_Robot'] = function(block) {
    // var direction = block.getFieldValue('DIRECTION')[0].toLowerCase();
    var direction = block.getFieldValue('DIRECTION');
    var num = parseInt(block.getFieldValue('NUM_OF_MOVE'));
    var code = 'moveRobot("' + direction + '", ' + num + ', "block_id_' + block.id + '");\n';
    return code;
}

Blockly.Blocks['Robot_Grab'] = {
    init: function() {
        this.jsonInit({
            "type": "robot_grab",
            "message0": "拿起 %1",
            "args0": [{
                "type": "field_variable",
                "name": "GRAB_NAME",
                "variable": "物件名稱"
            }],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
        })
    }
};
Blockly.JavaScript['Robot_Grab'] = function(block) {
    var thing_name = block.getFieldValue('GRAB_NAME');
    var code = 'robotGrab("' + thing_name + '", "block_id_' + block.id + '");\n';
    return code;
};

Blockly.Blocks['Robot_Drop'] = {
    init: function() {
        this.jsonInit({
            "type": "robot_drop",
            "message0": "放下 %1",
            "args0": [{
                "type": "field_variable",
                "name": "DROP_NAME",
                "variable": "物件名稱"
            }],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
        })
    }
};
Blockly.JavaScript['Robot_Drop'] = function(block) {
    var thing_name = block.getFieldValue('DROP_NAME');
    var code = 'robotDrop("' + thing_name + '", "block_id_' + block.id + '");\n';
    return code;
};

Blockly.Blocks['Robot_Goto'] = {
    init: function() {
        this.jsonInit({
            "type": "robot_goto",
            "message0": "前往 %1",
            "args0": [{
                "type": "field_variable",
                "name": "GOTO_NAME",
                "variable": "物件名稱"
            }],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 120,
            "tooltip": "",
            "helpUrl": ""
        })
    }
}
Blockly.JavaScript['Robot_Goto'] = function(block) {
    var thing_name = block.getFieldValue('GOTO_NAME');
    var code = 'robotGoto("' + thing_name + '", "block_id_' + block.id + '");\n';
    return code;
};