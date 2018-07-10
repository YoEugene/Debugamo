/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Text blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.texts');  // Deprecated
goog.provide('Blockly.Constants.Text');

goog.require('Blockly.Blocks');
goog.require('Blockly');


/**
 * Common HSV hue for all blocks in this category.
 * Should be the same as Blockly.Msg.TEXTS_HUE
 * @readonly
 */
Blockly.Constants.Text.HUE = 160;
/** @deprecated Use Blockly.Constants.Text.HUE */
Blockly.Blocks.texts.HUE = Blockly.Constants.Text.HUE;

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  // Block for text value
  {
    "type": "text",
    "message0": "%1",
    "args0": [{
      "type": "field_input",
      "name": "TEXT",
      "text": ""
    }],
    "output": "String",
    "colour": "%{BKY_TEXTS_HUE}",
    "helpUrl": "%{BKY_TEXT_TEXT_HELPURL}",
    "tooltip": "%{BKY_TEXT_TEXT_TOOLTIP}",
    "extensions": [
      "text_quotes",
      "parent_tooltip_when_inline"
    ]
  },{
    "type": "text_list",
    "message0": "%1",
    "args0": [{
      "type": "field_input",
      "name": "TEXT",
      "text": ""
    }],
    "output": "String",
    "colour": "%{BKY_TEXTS_HUE}",
    "helpUrl": "%{BKY_TEXT_TEXT_HELPURL}",
    "tooltip": "%{BKY_TEXT_TEXT_TOOLTIP}",
    "extensions": [
      "parent_tooltip_when_inline"
    ]
  },{
    "type": "text_list_backup",
    "message0": "%1 %2 %3",
    "args0": [{
      "type": "field_image",
      "src": "data:image/png;base64,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",
      "width": 16,
      "height": 16,
      "alt": "["
    },
    {
      "type": "field_input",
      "name": "TEXT",
      "text": ""
    },
    {
      "type": "field_image",
      "src": "data:image/png;base64,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",
      "width": 16,
      "height": 16,
      "alt": "]"
    }],
    "output": "String",
    "colour": "%{BKY_TEXTS_HUE}",
    "helpUrl": "%{BKY_TEXT_TEXT_HELPURL}",
    "tooltip": "%{BKY_TEXT_TEXT_TOOLTIP}",
    "extensions": [
      "parent_tooltip_when_inline"
    ]
  },{
    "type": "text_join",
    "message0": "",
    "output": "String",
    "colour": "%{BKY_TEXTS_HUE}",
    "helpUrl": "%{BKY_TEXT_JOIN_HELPURL}",
    "tooltip": "%{BKY_TEXT_JOIN_TOOLTIP}",
    "mutator": "text_join_mutator"

  },
  {
    "type": "text_create_join_container",
    "message0": "%{BKY_TEXT_CREATE_JOIN_TITLE_JOIN} %1 %2",
    "args0": [{
      "type": "input_dummy"
    },
    {
      "type": "input_statement",
      "name": "STACK"
    }],
    "colour": "%{BKY_TEXTS_HUE}",
    "tooltip": "%{BKY_TEXT_CREATE_JOIN_TOOLTIP}",
    "enableContextMenu": false
  },
  {
    "type": "text_create_join_item",
    "message0": "%{BKY_TEXT_CREATE_JOIN_ITEM_TITLE_ITEM}",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_TEXTS_HUE}",
    "tooltip": "{%BKY_TEXT_CREATE_JOIN_ITEM_TOOLTIP}",
    "enableContextMenu": false
  },
  {
    "type": "text_append",
    "message0": "%{BKY_TEXT_APPEND_TITLE}",
    "args0": [{
      "type": "field_variable",
      "name": "VAR",
      "variable": "%{BKY_TEXT_APPEND_VARIABLE}"
    },
    {
      "type": "input_value",
      "name": "TEXT"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_TEXTS_HUE}",
    "extensions": [
      "text_append_tooltip"
    ]
  },
  {
    "type": "text_length",
    "message0": "%{BKY_TEXT_LENGTH_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "check": ['String', 'Array']
      }
    ],
    "output": 'Number',
    "colour": "%{BKY_TEXTS_HUE}",
    "tooltip": "%{BKY_TEXT_LENGTH_TOOLTIP}",
    "helpUrl": "%{BKY_TEXT_LENGTH_HELPURL}"
  },
  {
    "type": "text_isEmpty",
    "message0": "%{BKY_TEXT_ISEMPTY_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "check": ['String', 'Array']
      }
    ],
    "output": 'Boolean',
    "colour": "%{BKY_TEXTS_HUE}",
    "tooltip": "%{BKY_TEXT_ISEMPTY_TOOLTIP}",
    "helpUrl": "%{BKY_TEXT_ISEMPTY_HELPURL}"
  },
  {
    "type": "text_indexOf",
    "message0": "%{BKY_TEXT_INDEXOF_TITLE}",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "String"
      },
      {
        "type": "field_dropdown",
        "name": "END",
        "options": [
          [
            "%{BKY_TEXT_INDEXOF_OPERATOR_FIRST}",
            "FIRST"
          ],
          [
            "%{BKY_TEXT_INDEXOF_OPERATOR_LAST}",
            "LAST"
          ]
        ]
      },
      {
        "type": "input_value",
        "name": "FIND",
        "check": "String"
      }
    ],
    "output": "Number",
    "colour": "%{BKY_TEXTS_HUE}",
    "helpUrl": "%{BKY_TEXT_INDEXOF_HELPURL}",
    "inputsInline": true,
    "extensions": [
      "text_indexOf_tooltip"
    ]
  },
  {
    "type": "text_charAt",
    "message0": "%{BKY_TEXT_CHARAT_TITLE}", // "in text %1 %2"
    "args0": [
      {
        "type":"input_value",
        "name": "VALUE",
        "check": "String"
      },
      {
        "type": "input_dummy",
        "name": "AT"
      }
    ],
    "output": "String",
    "colour": "%{BKY_TEXTS_HUE}",
    "helpUrl": "%{BKY_TEXT_CHARAT_HELPURL}",
    "inputsInline": true,
    "mutator": "text_charAt_mutator"
  }
]);  // END JSON EXTRACT (Do not delete this comment.)

Blockly.Blocks['text_getSubstring'] = {
  /**
   * Block for getting substring.
   * @this Blockly.Block
   */
  init: function() {
    this['WHERE_OPTIONS_1'] = [
      [Blockly.Msg.TEXT_GET_SUBSTRING_START_FROM_START, 'FROM_START'],
      [Blockly.Msg.TEXT_GET_SUBSTRING_START_FROM_END, 'FROM_END'],
      [Blockly.Msg.TEXT_GET_SUBSTRING_START_FIRST, 'FIRST']
    ];
    this['WHERE_OPTIONS_2'] = [
      [Blockly.Msg.TEXT_GET_SUBSTRING_END_FROM_START, 'FROM_START'],
      [Blockly.Msg.TEXT_GET_SUBSTRING_END_FROM_END, 'FROM_END'],
      [Blockly.Msg.TEXT_GET_SUBSTRING_END_LAST, 'LAST']
    ];
    this.setHelpUrl(Blockly.Msg.TEXT_GET_SUBSTRING_HELPURL);
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendValueInput('STRING')
        .setCheck('String')
        .appendField(Blockly.Msg.TEXT_GET_SUBSTRING_INPUT_IN_TEXT);
    this.appendDummyInput('AT1');
    this.appendDummyInput('AT2');
    if (Blockly.Msg.TEXT_GET_SUBSTRING_TAIL) {
      this.appendDummyInput('TAIL')
          .appendField(Blockly.Msg.TEXT_GET_SUBSTRING_TAIL);
    }
    this.setInputsInline(true);
    this.setOutput(true, 'String');
    this.updateAt_(1, true);
    this.updateAt_(2, true);
    this.setTooltip(Blockly.Msg.TEXT_GET_SUBSTRING_TOOLTIP);
  },
  /**
   * Create XML to represent whether there are 'AT' inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var isAt1 = this.getInput('AT1').type == Blockly.INPUT_VALUE;
    container.setAttribute('at1', isAt1);
    var isAt2 = this.getInput('AT2').type == Blockly.INPUT_VALUE;
    container.setAttribute('at2', isAt2);
    return container;
  },
  /**
   * Parse XML to restore the 'AT' inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var isAt1 = (xmlElement.getAttribute('at1') == 'true');
    var isAt2 = (xmlElement.getAttribute('at2') == 'true');
    this.updateAt_(1, isAt1);
    this.updateAt_(2, isAt2);
  },
  /**
   * Create or delete an input for a numeric index.
   * This block has two such inputs, independant of each other.
   * @param {number} n Specify first or second input (1 or 2).
   * @param {boolean} isAt True if the input should exist.
   * @private
   * @this Blockly.Block
   */
  updateAt_: function(n, isAt) {
    // Create or delete an input for the numeric index.
    // Destroy old 'AT' and 'ORDINAL' inputs.
    this.removeInput('AT' + n);
    this.removeInput('ORDINAL' + n, true);
    // Create either a value 'AT' input or a dummy input.
    if (isAt) {
      this.appendValueInput('AT' + n).setCheck('Number');
      if (Blockly.Msg.ORDINAL_NUMBER_SUFFIX) {
        this.appendDummyInput('ORDINAL' + n)
            .appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX);
      }
    } else {
      this.appendDummyInput('AT' + n);
    }
    // Move tail, if present, to end of block.
    if (n == 2 && Blockly.Msg.TEXT_GET_SUBSTRING_TAIL) {
      this.removeInput('TAIL', true);
      this.appendDummyInput('TAIL')
          .appendField(Blockly.Msg.TEXT_GET_SUBSTRING_TAIL);
    }
    var menu = new Blockly.FieldDropdown(this['WHERE_OPTIONS_' + n],
        function(value) {
          var newAt = (value == 'FROM_START') || (value == 'FROM_END');
          // The 'isAt' variable is available due to this function being a
          // closure.
          if (newAt != isAt) {
            var block = this.sourceBlock_;
            block.updateAt_(n, newAt);
            // This menu has been destroyed and replaced.
            // Update the replacement.
            block.setFieldValue(value, 'WHERE' + n);
            return null;
          }
          return undefined;
        });

    this.getInput('AT' + n)
        .appendField(menu, 'WHERE' + n);
    if (n == 1) {
      this.moveInputBefore('AT1', 'AT2');
    }
  }
};

Blockly.Blocks['text_changeCase'] = {
  /**
   * Block for changing capitalization.
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS = [
      [Blockly.Msg.TEXT_CHANGECASE_OPERATOR_UPPERCASE, 'UPPERCASE'],
      [Blockly.Msg.TEXT_CHANGECASE_OPERATOR_LOWERCASE, 'LOWERCASE'],
      [Blockly.Msg.TEXT_CHANGECASE_OPERATOR_TITLECASE, 'TITLECASE']
    ];
    this.setHelpUrl(Blockly.Msg.TEXT_CHANGECASE_HELPURL);
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendValueInput('TEXT')
        .setCheck('String')
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'CASE');
    this.setOutput(true, 'String');
    this.setTooltip(Blockly.Msg.TEXT_CHANGECASE_TOOLTIP);
  }
};

Blockly.Blocks['text_trim'] = {
  /**
   * Block for trimming spaces.
   * @this Blockly.Block
   */
  init: function() {
    var OPERATORS = [
      [Blockly.Msg.TEXT_TRIM_OPERATOR_BOTH, 'BOTH'],
      [Blockly.Msg.TEXT_TRIM_OPERATOR_LEFT, 'LEFT'],
      [Blockly.Msg.TEXT_TRIM_OPERATOR_RIGHT, 'RIGHT']
    ];
    this.setHelpUrl(Blockly.Msg.TEXT_TRIM_HELPURL);
    this.setColour(Blockly.Blocks.texts.HUE);
    this.appendValueInput('TEXT')
        .setCheck('String')
        .appendField(new Blockly.FieldDropdown(OPERATORS), 'MODE');
    this.setOutput(true, 'String');
    this.setTooltip(Blockly.Msg.TEXT_TRIM_TOOLTIP);
  }
};

Blockly.Blocks['text_print'] = {
  /**
   * Block for print statement.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.TEXT_PRINT_TITLE,
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": Blockly.Blocks.texts.HUE,
      "tooltip": Blockly.Msg.TEXT_PRINT_TOOLTIP,
      "helpUrl": Blockly.Msg.TEXT_PRINT_HELPURL
    });
  }
};

Blockly.Blocks['text_prompt_ext'] = {
  /**
   * Block for prompt function (external message).
   * @this Blockly.Block
   */
  init: function() {
    var TYPES = [
      [Blockly.Msg.TEXT_PROMPT_TYPE_TEXT, 'TEXT'],
      [Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER, 'NUMBER']
    ];
    this.setHelpUrl(Blockly.Msg.TEXT_PROMPT_HELPURL);
    this.setColour(Blockly.Blocks.texts.HUE);
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    var dropdown = new Blockly.FieldDropdown(TYPES, function(newOp) {
      thisBlock.updateType_(newOp);
    });
    this.appendValueInput('TEXT')
        .appendField(dropdown, 'TYPE');
    this.setOutput(true, 'String');
    this.setTooltip(function() {
      return (thisBlock.getFieldValue('TYPE') == 'TEXT') ?
          Blockly.Msg.TEXT_PROMPT_TOOLTIP_TEXT :
          Blockly.Msg.TEXT_PROMPT_TOOLTIP_NUMBER;
    });
  },
  /**
   * Modify this block to have the correct output type.
   * @param {string} newOp Either 'TEXT' or 'NUMBER'.
   * @private
   * @this Blockly.Block
   */
  updateType_: function(newOp) {
    this.outputConnection.setCheck(newOp == 'NUMBER' ? 'Number' : 'String');
  },
  /**
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('type', this.getFieldValue('TYPE'));
    return container;
  },
  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.updateType_(xmlElement.getAttribute('type'));
  }
};

Blockly.Blocks['text_prompt'] = {
  /**
   * Block for prompt function (internal message).
   * The 'text_prompt_ext' block is preferred as it is more flexible.
   * @this Blockly.Block
   */
  init: function() {
    this.mixin(Blockly.Constants.Text.QUOTE_IMAGE_MIXIN);
    var TYPES = [
      [Blockly.Msg.TEXT_PROMPT_TYPE_TEXT, 'TEXT'],
      [Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER, 'NUMBER']
    ];

    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    this.setHelpUrl(Blockly.Msg.TEXT_PROMPT_HELPURL);
    this.setColour(Blockly.Blocks.texts.HUE);
    var dropdown = new Blockly.FieldDropdown(TYPES, function(newOp) {
      thisBlock.updateType_(newOp);
    });
    this.appendDummyInput()
        .appendField(dropdown, 'TYPE')
        .appendField(this.newQuote_(true))
        .appendField(new Blockly.FieldTextInput(''), 'TEXT')
        .appendField(this.newQuote_(false));
    this.setOutput(true, 'String');
    this.setTooltip(function() {
      return (thisBlock.getFieldValue('TYPE') == 'TEXT') ?
          Blockly.Msg.TEXT_PROMPT_TOOLTIP_TEXT :
          Blockly.Msg.TEXT_PROMPT_TOOLTIP_NUMBER;
    });
  },
  updateType_: Blockly.Blocks['text_prompt_ext'].updateType_,
  mutationToDom: Blockly.Blocks['text_prompt_ext'].mutationToDom,
  domToMutation: Blockly.Blocks['text_prompt_ext'].domToMutation
};

Blockly.Blocks['text_count'] = {
  /**
   * Block for counting how many times one string appears within another string.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.TEXT_COUNT_MESSAGE0,
      "args0": [
        {
          "type": "input_value",
          "name": "SUB",
          "check": "String"
        },
        {
          "type": "input_value",
          "name": "TEXT",
          "check": "String"
        }
      ],
      "output": "Number",
      "inputsInline": true,
      "colour": Blockly.Blocks.texts.HUE,
      "tooltip": Blockly.Msg.TEXT_COUNT_TOOLTIP,
      "helpUrl": Blockly.Msg.TEXT_COUNT_HELPURL
    });
  }
};

Blockly.Blocks['text_replace'] = {
  /**
   * Block for replacing one string with another in the text.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.TEXT_REPLACE_MESSAGE0,
      "args0": [
        {
          "type": "input_value",
          "name": "FROM",
          "check": "String"
        },
        {
          "type": "input_value",
          "name": "TO",
          "check": "String"
        },
        {
          "type": "input_value",
          "name": "TEXT",
          "check": "String"
        }
      ],
      "output": "String",
      "inputsInline": true,
      "colour": Blockly.Blocks.texts.HUE,
      "tooltip": Blockly.Msg.TEXT_REPLACE_TOOLTIP,
      "helpUrl": Blockly.Msg.TEXT_REPLACE_HELPURL
    });
  }
};

Blockly.Blocks['text_reverse'] = {
  /**
   * Block for reversing a string.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.TEXT_REVERSE_MESSAGE0,
      "args0": [
        {
          "type": "input_value",
          "name": "TEXT",
          "check": "String"
        }
      ],
      "output": "String",
      "inputsInline": true,
      "colour": Blockly.Blocks.texts.HUE,
      "tooltip": Blockly.Msg.TEXT_REVERSE_TOOLTIP,
      "helpUrl": Blockly.Msg.TEXT_REVERSE_HELPURL
    });
  }
};

/**
 *
 * @mixin
 * @package
 * @readonly
 */
Blockly.Constants.Text.QUOTE_IMAGE_MIXIN = {
  /**
   * Image data URI of an LTR opening double quote (same as RTL closing couble quote).
   * @readonly
   */
  QUOTE_IMAGE_LEFT_DATAURI:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC',
  /**
   * Image data URI of an LTR closing double quote (same as RTL opening couble quote).
   * @readonly
   */
  QUOTE_IMAGE_RIGHT_DATAURI:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==',
  /**
   * Pixel width of QUOTE_IMAGE_LEFT_DATAURI and QUOTE_IMAGE_RIGHT_DATAURI.
   * @readonly
   */
  QUOTE_IMAGE_WIDTH: 12,
  /**
   * Pixel height of QUOTE_IMAGE_LEFT_DATAURI and QUOTE_IMAGE_RIGHT_DATAURI.
   * @readonly
   */
  QUOTE_IMAGE_HEIGHT: 12,

  /**
   * Inserts appropriate quote images before and after the named field.
   * @param {string} fieldName The name of the field to wrap with quotes.
   */
  quoteField_: function(fieldName) {
    for (var i = 0, input; input = this.inputList[i]; i++) {
      for (var j = 0, field; field = input.fieldRow[j]; j++) {
        if (fieldName == field.name) {
          input.insertFieldAt(j, this.newQuote_(true));
          input.insertFieldAt(j + 2, this.newQuote_(false));
          return;
        }
      }
    }
    console.warn('field named "' + fieldName + '" not found in ' + this.toDevString());
  },

  /**
   * A helper function that generates a FieldImage of an opening or
   * closing double quote. The selected quote will be adapted for RTL blocks.
   * @param {boolean} open If the image should be open quote (“ in LTR).
   *                       Otherwise, a closing quote is used (” in LTR).
   * @returns {!Blockly.FieldImage} The new field.
   */
  newQuote_: function(open) {
    var isLeft = this.RTL? !open : open;
    var dataUri = isLeft ?
      this.QUOTE_IMAGE_LEFT_DATAURI :
      this.QUOTE_IMAGE_RIGHT_DATAURI;
    return new Blockly.FieldImage(
      dataUri,
      this.QUOTE_IMAGE_WIDTH,
      this.QUOTE_IMAGE_HEIGHT,
      isLeft ? '\u201C' : '\u201D');
  }
};

/** Wraps TEXT field with images of double quote characters. */
Blockly.Constants.Text.TEXT_QUOTES_EXTENSION = function() {
  this.mixin(Blockly.Constants.Text.QUOTE_IMAGE_MIXIN);
  this.quoteField_('TEXT');
};

/**
 * Mixin for mutator functions in the 'text_join_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Text.TEXT_JOIN_MUTATOR_MIXIN = {
  /**
   * Create XML to represent number of text inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the text inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('text_create_join_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('text_create_join_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('ADD' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY')
          .appendField(this.newQuote_(true))
          .appendField(this.newQuote_(false));
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        var input = this.appendValueInput('ADD' + i);
        if (i == 0) {
          input.appendField(Blockly.Msg.TEXT_JOIN_TITLE_CREATEWITH);
        }
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
  }
};

// Performs final setup of a text_join block.
Blockly.Constants.Text.TEXT_JOIN_EXTENSION = function() {
  // Add the quote mixin for the itemCount_ = 0 case.
  this.mixin(Blockly.Constants.Text.QUOTE_IMAGE_MIXIN);
  // initialize the mutator values
  this.itemCount_ = 2;
  this.updateShape_();
  // Configure the mutator ui
  this.setMutator(new Blockly.Mutator(['text_create_join_item']));
};

Blockly.Constants.Text.TEXT_APPEND_TOOLTIP_EXTENSION = function() {
  // Assign 'this' to a variable for use in the tooltip closure below.
  var thisBlock = this;
  this.setTooltip(function() {
    if (Blockly.Msg.TEXT_APPEND_TOOLTIP) {
      return Blockly.Msg.TEXT_APPEND_TOOLTIP.replace('%1',
          thisBlock.getFieldValue('VAR'));
    }
    return '';
  });
};

Blockly.Constants.Text.TEXT_INDEXOF_TOOLTIP_EXTENSION = function() {
  // Assign 'this' to a variable for use in the tooltip closure below.
  var thisBlock = this;
  this.setTooltip(function() {
    return Blockly.Msg.TEXT_INDEXOF_TOOLTIP.replace('%1',
        thisBlock.workspace.options.oneBasedIndex ? '0' : '-1');
  });
};

/**
 * Mixin for mutator functions in the 'text_charAt_mutator' extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Text.TEXT_CHARAT_MUTATOR_MIXIN = {
  /**
   * Create XML to represent whether there is an 'AT' input.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var isAt = this.getInput('AT').type == Blockly.INPUT_VALUE;
    container.setAttribute('at', isAt);
    return container;
  },
  /**
   * Parse XML to restore the 'AT' input.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    // Note: Until January 2013 this block did not have mutations,
    // so 'at' defaults to true.
    var isAt = (xmlElement.getAttribute('at') != 'false');
    this.updateAt_(isAt);
  },
  /**
   * Create or delete an input for the numeric index.
   * @param {boolean} isAt True if the input should exist.
   * @private
   * @this Blockly.Block
   */
  updateAt_: function(isAt) {
    // Destroy old 'AT' and 'ORDINAL' inputs.
    this.removeInput('AT');
    this.removeInput('ORDINAL', true);
    // Create either a value 'AT' input or a dummy input.
    if (isAt) {
      this.appendValueInput('AT').setCheck('Number');
      if (Blockly.Msg.ORDINAL_NUMBER_SUFFIX) {
        this.appendDummyInput('ORDINAL')
            .appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX);
      }
    } else {
      this.appendDummyInput('AT');
    }
    if (Blockly.Msg.TEXT_CHARAT_TAIL) {
      this.removeInput('TAIL', true);
      this.appendDummyInput('TAIL')
          .appendField(Blockly.Msg.TEXT_CHARAT_TAIL);
    }
    var menu = new Blockly.FieldDropdown(this.WHERE_OPTIONS, function(value) {
      var newAt = (value == 'FROM_START') || (value == 'FROM_END');
      // The 'isAt' variable is available due to this function being a closure.
      if (newAt != isAt) {
        var block = this.sourceBlock_;
        block.updateAt_(newAt);
        // This menu has been destroyed and replaced.  Update the replacement.
        block.setFieldValue(value, 'WHERE');
        return null;
      }
      return undefined;
    });
    this.getInput('AT').appendField(menu, 'WHERE');
  }
};

// Does the initial mutator update of text_charAt and adds the tooltip
Blockly.Constants.Text.TEXT_CHARAT_EXTENSION = function() {
    this.WHERE_OPTIONS = [
        [Blockly.Msg.TEXT_CHARAT_FROM_START, 'FROM_START'],
        [Blockly.Msg.TEXT_CHARAT_FROM_END, 'FROM_END'],
        [Blockly.Msg.TEXT_CHARAT_FIRST, 'FIRST'],
        [Blockly.Msg.TEXT_CHARAT_LAST, 'LAST'],
        [Blockly.Msg.TEXT_CHARAT_RANDOM, 'RANDOM']
      ];
    this.updateAt_(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var where = thisBlock.getFieldValue('WHERE');
      var tooltip = Blockly.Msg.TEXT_CHARAT_TOOLTIP;
      if (where == 'FROM_START' || where == 'FROM_END') {
        var msg = (where == 'FROM_START') ?
            Blockly.Msg.LISTS_INDEX_FROM_START_TOOLTIP :
            Blockly.Msg.LISTS_INDEX_FROM_END_TOOLTIP;
        if (msg) {
          tooltip += '  ' + msg.replace('%1',
              thisBlock.workspace.options.oneBasedIndex ? '#1' : '#0');
        }
      }
      return tooltip;
    });
};

Blockly.Extensions.register('text_indexOf_tooltip',
  Blockly.Constants.Text.TEXT_INDEXOF_TOOLTIP_EXTENSION);

Blockly.Extensions.register('text_quotes',
  Blockly.Constants.Text.TEXT_QUOTES_EXTENSION);

Blockly.Extensions.register('text_append_tooltip',
  Blockly.Constants.Text.TEXT_APPEND_TOOLTIP_EXTENSION);

Blockly.Extensions.registerMutator('text_join_mutator',
  Blockly.Constants.Text.TEXT_JOIN_MUTATOR_MIXIN,
  Blockly.Constants.Text.TEXT_JOIN_EXTENSION);

Blockly.Extensions.registerMutator('text_charAt_mutator',
  Blockly.Constants.Text.TEXT_CHARAT_MUTATOR_MIXIN,
  Blockly.Constants.Text.TEXT_CHARAT_EXTENSION);