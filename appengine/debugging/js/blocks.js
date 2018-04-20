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
                    "max": 10
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
    var code = "";
    code += "moveRobot('" + direction + "', " + num + ", 'block_id_" + block.id + "');\n";
    // var i;
    // for (i = 0; i < num; i++) {
    // code += "moveRobot('" + direction + "', " + (num - i) + ", 'block_id_" + block.id + "');\n";
    // }
    return code;
}

Blockly.Blocks['Robot_Goto'] = {
    init: function() {
        this.jsonInit({
            "type": "robot_goto",
            "message0": "前往 %1 %2",
            "args0": [{
                    "type": "input_value",
                    "name": "GOTO_NAME",
                    "check": [
                        "String",
                        "Array"
                    ]
                },
                {
                    "type": "input_dummy"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 120,
            "tooltip": "",
            "helpUrl": ""
        })
    }
}
Blockly.JavaScript['Robot_Goto'] = function(block) {
    var thing_name, code;
    if (block.getInputTargetBlock('GOTO_NAME').type == 'lists_create_with') {
        thing_name = Blockly.JavaScript.blockToCode(block.getInputTargetBlock('GOTO_NAME'))[0].replace(new RegExp('"', 'g'), '').replace(new RegExp('\'', 'g'), '').substr(1).slice(0, -1).split(', ').join('", "');
        code = 'robotGoto(["' + thing_name + '"], \'block_id_' + block.id + '\');\n';
    } else if (block.getInputTargetBlock('GOTO_NAME').type == 'lists_getIndex') {
        thing_name = Blockly.JavaScript.blockToCode(block.getInputTargetBlock('GOTO_NAME'))[0];
        code = 'robotGoto(' + thing_name + ', \'block_id_' + block.id + '\');\n';
    } else {
        thing_name = Blockly.JavaScript.valueToCode(block, 'GOTO_NAME', Blockly.JavaScript.ORDER_ATOMIC);
        code = "robotGoto('" + thing_name + "', 'block_id_" + block.id + "');\n";
    }
    return code;
};

Blockly.Blocks['Robot_Grab'] = {
    init: function() {
        this.jsonInit({
            "type": "robot_grab",
            "message0": "拿起 %1 %2",
            "args0": [{
                    "type": "input_value",
                    "name": "GRAB_NAME",
                    "check": [
                        "String",
                        "Array"
                    ]
                },
                {
                    "type": "input_dummy"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
        })
    }
};
Blockly.JavaScript['Robot_Grab'] = function(block) {
    // console.log(block);
    // console.log(block.type);
    var thing_name, code;
    if (block.getInputTargetBlock('GRAB_NAME').type == "lists_create_with") {
        thing_name = Blockly.JavaScript.blockToCode(block.getInputTargetBlock('GRAB_NAME'))[0].replace(new RegExp('"', 'g'), '').replace(new RegExp('\'', 'g'), '').substr(1).slice(0, -1).split(', ').join('", "');
        code = 'robotGrab(["' + thing_name + '"], \'block_id_' + block.id + '\');\n';
    } else if (block.getInputTargetBlock('GRAB_NAME').type == "lists_getIndex") {
        thing_name = Blockly.JavaScript.blockToCode(block.getInputTargetBlock('GRAB_NAME'))[0];
        code = 'robotGrab(' + thing_name + ', \'block_id_' + block.id + '\');\n';
    } else {
        thing_name = block.getInputTargetBlock('GRAB_NAME').getFieldValue('VAR') || block.getInputTargetBlock('GRAB_NAME').getFieldValue('TEXT');
        code = "robotGrab('" + thing_name + "', 'block_id_" + block.id + "');\n";
    }
    return code;
};

Blockly.Blocks['Robot_Drop'] = {
    init: function() {
        this.jsonInit({
            "type": "robot_drop",
            "message0": "放下 %1 %2",
            "args0": [{
                    "type": "input_value",
                    "name": "DROP_NAME",
                    "check": [
                        "String",
                        "Array"
                    ]
                },
                {
                    "type": "input_dummy"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
        })
    }
};
Blockly.JavaScript['Robot_Drop'] = function(block) {
    var code = "",
        thing_name;

    // allow list of text OR list of variable as input
    if (block.getInputTargetBlock('DROP_NAME').type == "lists_create_with") {
        thing_name = Blockly.JavaScript.blockToCode(block.getInputTargetBlock('DROP_NAME'))[0].replace(new RegExp('"', 'g'), '').replace(new RegExp('\'', 'g'), '').substr(1).slice(0, -1).split(', ').join('", "');
        code += 'robotDrop(["' + thing_name + '"], \'block_id_' + block.id + '\');\n';
    } else if (block.getInputTargetBlock('DROP_NAME').type == "lists_getIndex") {
        thing_name = Blockly.JavaScript.blockToCode(block.getInputTargetBlock('DROP_NAME'))[0];
        code += 'robotDrop(' + thing_name + ', \'block_id_' + block.id + '\');\n';
    } else {
        // allow text OR variable as input
        thing_name = block.getInputTargetBlock('DROP_NAME').getFieldValue('VAR') || block.getInputTargetBlock('DROP_NAME').getFieldValue('TEXT');
        code += "robotDrop('" + thing_name + "', 'block_id_" + block.id + "');\n";
    }
    return code;
};