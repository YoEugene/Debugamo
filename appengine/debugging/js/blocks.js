/**
 * Self-Defined Blocks
 */

'use strict';

goog.provide('Debugging.Blocks');

goog.require('Blockly');
goog.require('Blockly.JavaScript');
goog.require('BlocklyGames');

// goog.require('Blockly.Blocks.colour');  // Deprecated
// goog.require('Blockly.Constants.Colour');
// goog.require('Blockly.JavaScript.colour');

// goog.require('Blockly.Blocks.lists');  // Deprecated
// goog.require('Blockly.Constants.Lists');
// goog.require('Blockly.JavaScript.lists');

// goog.require('Blockly.Blocks.logic');  // Deprecated
// goog.require('Blockly.Constants.Logic');
// goog.require('Blockly.JavaScript.logic');

// goog.require('Blockly.Blocks.loops');  // Deprecated
// goog.require('Blockly.Constants.Loops');
// goog.require('Blockly.JavaScript.loops');

goog.require('Blockly.Blocks.math'); // Deprecated
goog.require('Blockly.Constants.Math');
goog.require('Blockly.JavaScript.math');

// goog.require('Blockly.Blocks.procedures');
// goog.require('Blockly.JavaScript.procedures');

// goog.require('Blockly.Blocks.texts');  // Deprecated
// goog.require('Blockly.Constants.Text');
// goog.require('Blockly.JavaScript.texts');

// goog.require('Blockly.Blocks.variables');  // Deprecated.
// goog.require('Blockly.Constants.Variables');
// goog.require('Blockly.JavaScript.variables');


var Scope_Blocks = Debugging.Blocks;

/**
 * Common HSV hue
 */
Scope_Blocks.MOVEMENT_HUE = 290;
Scope_Blocks.LOOPS_HUE = 120;
Scope_Blocks.LOGIC_HUE = 210;

// Extensions to Blockly's language and JavaScript generator.

Blockly.Blocks['DrinkShop_getNewCup'] = {
    init: function() {
        this.jsonInit({
            "message0": BlocklyGames.getMsg('DrinkShop_getNewCup'),
            "previousStatement": null,
            "nextStatement": null,
            "colour": Scope_Blocks.MOVEMENT_HUE,
            "tooltip": BlocklyGames.getMsg('DrinkShop_getNewCup')
        });
    }
}
Blockly.JavaScript['DrinkShop_getNewCup'] = function(block) {
    return 'getNewCup();\n';
};

Blockly.Blocks['robot_say'] = {
    init: function() {
        this.jsonInit({
            "type": "robot_say",
            "message0": "機器人說出 %1",
            "args0": [{
                "type": "input_value",
                "name": "robot_say_label"
            }],
            "previousStatement": null,
            "nextStatement": null,
            "colour": 285,
            "tooltip": "",
            "helpUrl": ""
        })
    }
}

Blockly.JavaScript['robot_say'] = function(block) {
    block.setDeletable(false);
    block.setEditable(false);
    block.setMovable(false);
}

Blockly.Blocks['str_io'] = {
    init: function() {
        this.jsonInit({
            "type": "str",
            "message0": "%1",
            "args0": [{
                "type": "field_input",
                "name": "str",
                "text": "字串"
            }],
            "output": null,
            "colour": 150,
            "tooltip": "",
            "helpUrl": ""
        })
    }
}

Blockly.Blocks['number_io'] = {
    init: function() {
        this.jsonInit({
            "type": "number_io",
            "message0": "%1",
            "args0": [{
                "type": "field_number",
                "name": "number",
                "value": 0
            }],
            "output": null,
            "colour": 0,
            "tooltip": "",
            "helpUrl": ""
        })
    }
}

Blockly.Blocks['variable_get'] = {
    init: function() {
        this.jsonInit({
            "type": "variable_get",
            "message0": "%1",
            "args0": [{
                "type": "field_variable",
                "name": "var_get",
                "variable": "變數"
            }],
            "inputsInline": false,
            "output": null,
            "colour": 330,
            "tooltip": "",
            "helpUrl": ""
        })
    }
}

Blockly.Blocks['variable_set'] = {
    init: function() {
        this.jsonInit({
            "type": "variable_set",
            "message0": "設定變數 %1 為 %2",
            "args0": [{
                    "type": "field_variable",
                    "name": "variable",
                    "variable": "變數"
                },
                {
                    "type": "input_value",
                    "name": "NAME"
                }
            ],
            "inputsInline": false,
            "previousStatement": null,
            "nextStatement": null,
            "colour": 330,
            "tooltip": "",
            "helpUrl": ""
        })
    }
}

Blockly.Blocks['counter_loop'] = {
    init: function() {
        this.jsonInit({
            "type": "counter_loop",
            "message0": "計數 %1 , 從 %2 到 %3 執行: %4",
            "args0": [{
                    "type": "field_variable",
                    "name": "counter_int",
                    "variable": "counter"
                },
                {
                    "type": "input_value",
                    "name": "counter"
                },
                {
                    "type": "input_value",
                    "name": "from_int"
                },
                {
                    "type": "input_statement",
                    "name": "to_int"
                }
            ],
            "inputsInline": true,
            "previousStatement": null,
            "nextStatement": null,
            "colour": 120,
            "tooltip": "",
            "helpUrl": ""
        })
    }
}

Blockly.Blocks['arithmetic'] = {
    init: function() {
        this.jsonInit({
            "type": "arithmetic",
            "message0": "%1 %2 %3",
            "args0": [{
                    "type": "input_value",
                    "name": "arithmetic_a"
                },
                {
                    "type": "field_dropdown",
                    "name": "arithmetic_option",
                    "options": [
                        [
                            "+",
                            "plus"
                        ],
                        [
                            "-",
                            "minus"
                        ],
                        [
                            "x",
                            "time"
                        ],
                        [
                            "÷",
                            "divide"
                        ]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "arithmetic_b"
                }
            ],
            "inputsInline": true,
            "output": null,
            "colour": 90,
            "tooltip": "",
            "helpUrl": ""
        })
    }
}

Blockly.Blocks['check_order'] = {
    init: function() {
        this.jsonInit({
            "type": "check_order",
            "message0": "查詢訂單 ( 第 %1 筆訂單飲料的 %2 )",
            "args0": [{
                    "type": "input_value",
                    "name": "check_index"
                },
                {
                    "type": "field_dropdown",
                    "name": "check_item",
                    "options": [
                        [
                            "名稱",
                            "name"
                        ],
                        [
                            "大小",
                            "size"
                        ],
                        [
                            "杯數",
                            "amount"
                        ]
                    ]
                }
            ],
            "output": null,
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
        })
    }
}

Blockly.Blocks['check_menu_price'] = {
    init: function() {
        this.jsonInit({
            "type": "check_menu_price",
            "message0": "查詢價目表 (飲料名稱： %1 , 大小： %2 )",
            "args0": [{
                    "type": "field_variable",
                    "name": "NAME",
                    "variable": "name"
                },
                {
                    "type": "field_variable",
                    "name": "SIZE",
                    "variable": "size"
                }
            ],
            "output": null,
            "colour": 230,
            "tooltip": "",
            "helpUrl": ""
        })
    }
}

Blockly.Blocks['DrinkShop_fillCupWith'] = {
    init: function() {
        this.jsonInit({
            "message0": BlocklyGames.getMsg('DrinkShop_fillCupWith') + " %1",
            "args0": [{
                "type": "field_dropdown",
                "name": "drink_dropdown",
                "options": [
                    [BlocklyGames.getMsg('DrinkShop_blackTea'), "black tea"],
                    [BlocklyGames.getMsg('DrinkShop_greenTea'), "green tea"],
                ]
            }],
            "previousStatement": null,
            "nextStatement": null,
            "colour": Scope_Blocks.MOVEMENT_HUE,
            "tooltip": BlocklyGames.getMsg('DrinkShop_fillCupWith'),
        });
    }
}

Blockly.Blocks['Move_Robot'] = {
    init: function() {
        this.jsonInit({
            "type": "move_robot",
            "message0": "向 %1 走 %2 步",
            "args0": [{
                    "type": "field_dropdown",
                    "name": "DIRECTION",
                    "options": [
                        [
                            "左邊",
                            "LEFT"
                        ],
                        [
                            "右邊",
                            "RIGHT"
                        ],
                        [
                            "上面",
                            "UP"
                        ],
                        [
                            "下面",
                            "DOWN"
                        ]
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
    var direction = block.getFieldValue('DIRECTION')[0].toLowerCase();
    var num = parseInt(block.getFieldValue('NUM_OF_MOVE'));
    var code = ""
    for (var i = 0; i < num; i++) {
        code += 'animateRobot("' + direction +'");\n';
    }
    return code;
}

Blockly.JavaScript['DrinkShop_fillCupWith'] = function(block) {
    var drink_str = block.getFieldValue('drink_dropdown');
    return 'fillCupWith("' + drink_str + '");\n';
};

Blockly.Blocks['DrinkShop_fillCupWithVolume'] = {
    init: function() {
        this.jsonInit({
            "message0": BlocklyGames.getMsg('DrinkShop_fillCupWithVolume') + " %1 %2 " + BlocklyGames.getMsg('DrinkShop_ml'),
            "args0": [{
                    "type": "field_dropdown",
                    "name": "MATERIAL",
                    "options": [
                        [BlocklyGames.getMsg('DrinkShop_blackTea'), "black tea"],
                        [BlocklyGames.getMsg('DrinkShop_greenTea'), "green tea"],
                        [BlocklyGames.getMsg('DrinkShop_milk'), "milk"],
                        // [ BlocklyGames.getMsg('DrinkShop_ice'), "ice" ],
                        [BlocklyGames.getMsg('DrinkShop_boba'), "boba"],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "VOLUME"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": Scope_Blocks.MOVEMENT_HUE,
            "tooltip": BlocklyGames.getMsg('DrinkShop_fillCupWithVolume'),
        });
    }
}
Blockly.JavaScript['DrinkShop_fillCupWithVolume'] = function(block) {
    var material = block.getFieldValue('MATERIAL');
    var volume = Blockly.JavaScript.valueToCode(block, 'VOLUME',
        Blockly.JavaScript.ORDER_COMMA) || 0;
    console.log(volume);
    return 'fillCupWithVolume("' + material + '", ' + volume + ');\n';
};

Blockly.Blocks['DrinkShop_coverCup'] = {
    init: function() {
        this.jsonInit({
            "message0": BlocklyGames.getMsg('DrinkShop_coverCup'),
            "previousStatement": null,
            "nextStatement": null,
            "colour": Scope_Blocks.MOVEMENT_HUE,
            "tooltip": BlocklyGames.getMsg('DrinkShop_coverCup')
        });
    }
}
Blockly.JavaScript['DrinkShop_coverCup'] = function(block) {
    return 'coverCup();\n';
};

Blockly.Blocks['DrinkShop_serve'] = {
    init: function() {
        this.jsonInit({
            "message0": BlocklyGames.getMsg('DrinkShop_serve'),
            "previousStatement": null,
            "nextStatement": null,
            "colour": Scope_Blocks.MOVEMENT_HUE,
            "tooltip": BlocklyGames.getMsg('DrinkShop_serve')
        });
    }
}
Blockly.JavaScript['DrinkShop_serve'] = function(block) {
    return 'serve();\n';
};