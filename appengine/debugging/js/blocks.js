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

// BlocklyGames.reserved_thing_names = ["robot", "kitten", "dog", "piglet", "bird", "puppy", "rock", "bucket", "basket", "medicine", "box"];

// set hat for beginning block, see: https://developers.google.com/blockly/guides/create-custom-blocks/block-paradigms
Blockly.BlockSvg.START_HAT = true;

// Extensions to Blockly's language and JavaScript generator.
Blockly.Blocks['When_Run'] = {
    init: function() {
        this.jsonInit({
            "type": "robot_grab",
            "message0": BlocklyGames.getMsg('Debugging_when_run'),
            "nextStatement": null,
            "colour": "#FDA400",
            "tooltip": "按下「運行」時，會從這裡開始執行程式積木",
            "helpUrl": ""
        })
    }
}

Blockly.JavaScript['When_Run'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
    // var code = '...;\n';
    return "";
};

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
            "colour": "#00B0BD",
            "tooltip": "讓迪摩往指定的方向走指定的步數",
            "helpUrl": ""
        });
    }
};
Blockly.JavaScript['Move_Robot'] = function(block) {
    var direction = block.getFieldValue('DIRECTION');
    var num = parseInt(block.getFieldValue('NUM_OF_MOVE'));
    var code = "";
    code += "moveRobot('" + direction + "', " + num + ");\n";
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
            "colour": "#00B0BD",
            "tooltip": "讓迪摩前往指定的對象，注意：太多轉彎可能造成迪摩無法抵達對象",
            "helpUrl": "",
        })
    }
}
Blockly.JavaScript['Robot_Goto'] = function(block) {
    var thing_name, code;
    if (block.getInputTargetBlock('GOTO_NAME') == null) {
        code = 'robotGoto();\n';
    } else if (block.getInputTargetBlock('GOTO_NAME').type == 'lists_create_with') {
        thing_name = Blockly.JavaScript.blockToCode(block.getInputTargetBlock('GOTO_NAME'))[0].replace(new RegExp('"', 'g'), '').replace(new RegExp('\'', 'g'), '').substr(1).slice(0, -1).split(', ').join('", "');
        code = 'robotGoto(["' + thing_name + '"]);\n';
    } else if (block.getInputTargetBlock('GOTO_NAME').type.indexOf('lists_getIndex') != -1) {
        thing_name = Blockly.JavaScript.blockToCode(block.getInputTargetBlock('GOTO_NAME'))[0];
        code = 'robotGoto(' + thing_name + ');\n';
    } else {
        thing_name = block.getInputTargetBlock('GOTO_NAME').getFieldValue('VAR') || block.getInputTargetBlock('GOTO_NAME').getFieldValue('TEXT');
        var reserved = false;
        BlocklyGames.reserved_thing_names.forEach(function(reserved_thing) {
            if (reserved_thing == thing_name || reserved_thing == thing_name.substring(0, thing_name.length - 1)) {
                reserved = true;
            }
        })
        if (reserved) {
            code = "robotGoto('" + thing_name + "');\n";
        } else {
            code = "robotGoto(" + thing_name + ");\n";
        }
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
            "colour": "#509918",
            "tooltip": "讓迪摩拿起位於同一個位置的指定對象",
            "helpUrl": ""
        })
    }
};
Blockly.JavaScript['Robot_Grab'] = function(block) {
    // console.log(block);
    // console.log(block.type);
    var thing_name, code;
    if (block.getInputTargetBlock('GRAB_NAME') == null) {
        code = 'robotGrab();\n';
    } else if (block.getInputTargetBlock('GRAB_NAME').type == "lists_create_with") {
        thing_name = Blockly.JavaScript.blockToCode(block.getInputTargetBlock('GRAB_NAME'))[0].replace(new RegExp('"', 'g'), '').replace(new RegExp('\'', 'g'), '').substr(1).slice(0, -1).split(', ').join('", "');
        code = 'robotGrab(["' + thing_name + '"]);\n';
    } else if (block.getInputTargetBlock('GRAB_NAME').type.indexOf('lists_getIndex') != -1) {
        thing_name = Blockly.JavaScript.blockToCode(block.getInputTargetBlock('GRAB_NAME'))[0];
        code = 'robotGrab(' + thing_name + ');\n';
    } else {
        thing_name = block.getInputTargetBlock('GRAB_NAME').getFieldValue('VAR') || block.getInputTargetBlock('GRAB_NAME').getFieldValue('TEXT');
        var reserved = false;
        BlocklyGames.reserved_thing_names.forEach(function(reserved_thing) {
            if (reserved_thing == thing_name || reserved_thing == thing_name.substring(0, thing_name.length - 1)) {
                reserved = true;
            }
        })
        if (reserved) {
            code = "robotGrab('" + thing_name + "');\n";
        } else {
            code = "robotGrab(" + thing_name + ");\n";
        }
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
            "colour": "#509918",
            "tooltip": "",
            "helpUrl": ""
        })
    }
};

Blockly.JavaScript['Robot_Drop'] = function(block) {
    var code = "",
        thing_name;

    // allow list of text OR list of variable as input
    if (block.getInputTargetBlock('DROP_NAME') == null) {
        code = 'robotDrop();\n';
    } else if (block.getInputTargetBlock('DROP_NAME').type == "lists_create_with") {
        thing_name = Blockly.JavaScript.blockToCode(block.getInputTargetBlock('DROP_NAME'))[0].replace(new RegExp('"', 'g'), '').replace(new RegExp('\'', 'g'), '').substr(1).slice(0, -1).split(', ').join('", "');
        code = 'robotDrop(["' + thing_name + '"]);\n';
    } else if (block.getInputTargetBlock('DROP_NAME').type.indexOf('lists_getIndex') != -1) {
        thing_name = Blockly.JavaScript.blockToCode(block.getInputTargetBlock('DROP_NAME'))[0];
        code = 'robotDrop(' + thing_name + ');\n';
    } else {
        // allow text OR variable as input
        thing_name = block.getInputTargetBlock('DROP_NAME').getFieldValue('VAR') || block.getInputTargetBlock('DROP_NAME').getFieldValue('TEXT');
        var reserved = false;
        BlocklyGames.reserved_thing_names.forEach(function(reserved_thing) {
            if (reserved_thing == thing_name || reserved_thing == thing_name.substring(0, thing_name.length - 1)) {
                reserved = true;
            }
        })
        if (reserved) {
            code = "robotDrop('" + thing_name + "');\n";
        } else {
            code = "robotDrop(" + thing_name + ");\n";
        }
    }
    return code;
};

Blockly.Blocks['Robot_Say'] = {
    init: function() {
        this.jsonInit({
            "type": "robot_say",
            "message0": "迪摩說 %1 %2",
            "args0": [{
                    "type": "input_value",
                    "name": "SAY_TEXT",
                    "check": [
                        "String",
                    ]
                },
                {
                    "type": "input_dummy"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#00B0BD",
            "tooltip": "",
            "helpUrl": "",
        })
    }
}
Blockly.JavaScript['Robot_Say'] = function(block) {
    var say_text, code = "";
    // console.log(block.getInputTargetBlock('SAY_TEXT'));
    // if (block.getInputTargetBlock('SAY_TEXT').type == "variables_get") {
    say_text = Blockly.JavaScript.valueToCode(block, 'SAY_TEXT', Blockly.JavaScript.ORDER_ATOMIC);
    // say_text = block.getInputTargetBlock('SAY_TEXT').getFieldValue('VAR');
    code = "robotSay(" + say_text + ");\n";
    // }
    // else if (block.getInputTargetBlock('SAY_TEXT').type == "text") {
    // say_text = block.getInputTargetBlock('SAY_TEXT').getFieldValue('TEXT');
    // code = "robotSay('" + say_text + "');\n";
    // }
    return code;
};

Blockly.Blocks['Check_Infection'] = {
    init: function() {
        this.jsonInit({
            "type": "check_infection",
            "message0": "檢查 %1 是否受感染",
            "args0": [{
                "type": "field_variable",
                "name": "ANIMAL",
                "variable": "kitten"
            }],
            "output": "Boolean",
            "colour": "#00B0BD",
            "tooltip": "檢查小動物是否受感染，有感染的話答案會是真(true)，沒有的話答案會是否(false)",
            "helpUrl": ""
        })
    }
}
Blockly.JavaScript['Check_Infection'] = function(block) {
    var variable_animal = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ANIMAL'), Blockly.Variables.NAME_TYPE);
    // TODO: Assemble JavaScript into code variable.
    console.log(variable_animal);
    var code = "checkInfection(" + variable_animal + ")";
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.Blocks['Check_Infection_Before'] = {
    init: function() {
        this.jsonInit({
            "type": "check_infection_before",
            "message0": "檢查 %1 是否曾經受過感染",
            "args0": [{
                "type": "field_variable",
                "name": "ANIMAL",
                "variable": "kitten"
            }],
            "output": "Boolean",
            "colour": "#00B0BD",
            "tooltip": "檢查小動物是否曾經受過感染，曾有感染的話答案會是真(true)，不曾感染的話答案會是否(false)",
            "helpUrl": ""
        })
    }
}
Blockly.JavaScript['Check_Infection_Before'] = function(block) {
    var variable_animal = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ANIMAL'), Blockly.Variables.NAME_TYPE);
    // TODO: Assemble JavaScript into code variable.
    console.log(variable_animal);
    var code = "checkInfectionBefore(" + variable_animal + ")";
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.Blocks['Robot_Remove_Rock'] = {
    init: function() {
        this.jsonInit({
            "type": "robot_remove_rock",
            "message0": "迪摩碎大石",
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#00B0BD",
            "tooltip": "如果迪摩所在的位置有石頭，擊碎該石頭",
            "helpUrl": ""
        })
    }
}
Blockly.JavaScript['Robot_Remove_Rock'] = function(block) {
    var code = "removeRock();\n";
    return code;
}

Blockly.Blocks['Robot_Remove_Glass'] = {
    init: function() {
        this.jsonInit({
            "type": "robot_remove_glass",
            "message0": "迪摩掃玻璃",
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#00B0BD",
            "tooltip": "如果迪摩所在的位置有玻璃，試著清除該石頭",
            "helpUrl": ""
        })
    }
}
Blockly.JavaScript['Robot_Remove_Glass'] = function(block) {
    var code = "removeGlass();\n";
    return code;
}

Blockly.Blocks['There_Is_Rock'] = {
    init: function() {
        this.jsonInit({
            "type": "there_is_rock",
            "message0": "地圖中還有石頭",
            "output": null,
            "colour": "#00B0BD",
            "tooltip": "檢查地圖中是否還有石頭。有的會則答案為是(true)，否則為否(false)",
            "helpUrl": ""
        })
    }
}
Blockly.JavaScript['There_Is_Rock'] = function(block) {
    var code = "stillHaveRocks()";
    return [code, Blockly.JavaScript.ORDER_NONE];
}

Blockly.Blocks['There_Is_Glass'] = {
    init: function() {
        this.jsonInit({
            "type": "there_is_glass",
            "message0": "地圖中還有玻璃",
            "output": null,
            "colour": "#00B0BD",
            "tooltip": "檢查地圖中是否還有玻璃。有的會則答案為是(true)，否則為否(false)",
            "helpUrl": ""
        })
    }
}
Blockly.JavaScript['There_Is_Glass'] = function(block) {
    var code = "stillHaveGlass()";
    return [code, Blockly.JavaScript.ORDER_NONE];
}