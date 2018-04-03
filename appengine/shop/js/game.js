/**
 * define the behaviors of commands in the game
 */

'use strict';

goog.provide('Shop.Game');
goog.require('Blockly.JavaScript');
goog.require('Shop.Game.UI');
goog.require('Shop.utils');
goog.require('Shop.Game.Config');

var Game = Shop.Game;
// Game.svg = document.getElementById('svgShop');

/*
Game.state
Game.commands.xxx
Game.levels
*/

// Game.init = function(levelSettings) {
Game.init = function(level) {
  Game.constants = Shop.Game.Config.constants;
  Game.levelConfig = Shop.Game.Config.levels[level];

  Game.initState();
  Game.UI.init(Game.state.shop);
  document.getElementById('drink-shop-level-desc').innerHTML = Game.levelConfig.desc;
  document.getElementById('drink-shop-level-desc-goal').innerHTML = Game.levelConfig.goal;
};

Game.initState = function () {
  Game.state = {
    shop: Game.levelConfig.getInitialShopState(),
    robot: {
      holding: null,
      served: [],
    },
    log: [],
  };
};

Game.reset = function () {
  Game.initState();
  Game.UI.reset(Game.state.shop);
};

/** private methods
 *
 */

Game.getRobot = function() {
  return Game.state.robot;
};

Game.errorMessage = function(cmdKey, msgKey) {
  return BlocklyGames.getMsg('DrinkShop_msg_errorIn').replace('%1', BlocklyGames.getMsg(cmdKey)) + '\n'
    // + BlocklyGames.getMsg('DrinkShop_msg_reason') + ': '
    + BlocklyGames.getMsg(msgKey);
};

Game.levelFailedMessage = function(msgKey) {
  return BlocklyGames.getMsg('DrinkShop_msg_levelFailed') + '\n'
    // + BlocklyGames.getMsg('DrinkShop_msg_reason') + ': '
    + BlocklyGames.getMsg(msgKey);
};

Game.spendTime = function(timeSpent) {
  // data
  // Game.state.shop.timeSpent += timeSpent;
  Game.state.shop.remainingTime -= timeSpent;
  // UI
  Game.UI.updateTime(Game.state.shop.remainingTime);
};

Game.earnMoney = function(money) {
  // data
  // Game.state.shop.timeSpent += timeSpent;
  Game.state.shop.money += money;
  // UI
  Game.UI.updateMoney(Game.state.shop.money);
};

// block methods

Game.commands = {};

Game.commands.getNewCup = function() {
  // data
  var robot = Game.getRobot();
  robot.holding = {
    class: "cup",
    capacity: 500,
    filled: {},
    filledVolume: 0,
  };
  Game.state.shop.materials.cup -= 1;
  Game.spendTime(Game.constants.robot.actions.getNewCup.timeSpent);

  // UI
  Game.UI.getNewCup(robot.holding);
};

Game.commands.fillCupWith = function(materialName) {
  var robot = Game.getRobot();

  // check error
  if (!robot.holding || robot.holding.class != "cup") {
    console.log("command error: robot not holding a cup");
    throw Game.errorMessage('DrinkShop_fillCupWith', 'DrinkShop_msg_noCup');
  }
  if (!!robot.holding.isCovered) {
    console.log("command error: cup has been covered");
    throw Game.errorMessage('DrinkShop_fillCupWith', 'DrinkShop_msg_cupCovered');
  }

  var cup = robot.holding;
  var volume = cup.capacity; // - cup.filledVolume;

  // error: drink will overflow
  if (volume > cup.capacity - cup.filledVolume) {
    throw Game.errorMessage('DrinkShop_fillCupWithVolume', 'DrinkShop_msg_drinkOverflow');
  }

  Game.spendTime(Game.constants.robot.actions.fillCup.timeSpent);

  if (volume > 0) {
    // data
    if (!cup.filled.hasOwnProperty(materialName)) {
      cup.filled[materialName] = 0;
    }
    cup.filled[materialName] += volume;
    cup.filledVolume += volume;
    // UI
    Game.UI.updateCup(cup);
  }
};

Game.commands.fillCupWithVolume = function(materialName, volume) {
  var robot = Game.getRobot();

  // check error
  if (!robot.holding || robot.holding.class !== "cup") {
    console.log("command error: robot not holding a cup");
    throw Game.errorMessage('DrinkShop_fillCupWith', 'DrinkShop_msg_noCup');
  }
  if (!!robot.holding.isCovered) {
    console.log("command error: cup has been covered");
    throw Game.errorMessage('DrinkShop_fillCupWith', 'DrinkShop_msg_cupCovered');
  }

  var cup = robot.holding;

  // error: drink will overflow
  if (volume > cup.capacity - cup.filledVolume) {
    console.log("command error: drink will overflow");
    throw Game.errorMessage('DrinkShop_fillCupWithVolume', 'DrinkShop_msg_drinkOverflow');
  }

  Game.spendTime(Game.constants.robot.actions.fillCup.timeSpent);

  if (volume > 0) {
    // data
    if (!cup.filled.hasOwnProperty(materialName)) {
      cup.filled[materialName] = 0;
    }
    cup.filled[materialName] += volume;
    cup.filledVolume += volume;
    // UI
    Game.UI.updateCup(cup);
  }
};

Game.commands.coverCup = function(drink) {
  var robot = Game.getRobot();
  if (!robot.holding || robot.holding.class !== "cup") {
    console.log("command error: robot not holding cup");
    throw Game.errorMessage('DrinkShop_coverCup', 'DrinkShop_msg_noCup');
  }
  robot.holding.isCovered = true;
  Game.UI.drawCupCap();
  Game.spendTime(Game.constants.robot.actions.coverCup.timeSpent);
};

Game.commands.serve = function() {
  var robot = Game.getRobot();
  if (!robot.holding || robot.holding.class != "cup") {
    console.log("command error: robot not holding cup");
    throw Game.errorMessage('DrinkShop_coverCup', 'DrinkShop_msg_noCup');
  }
  robot.served.push(robot.holding);
  robot.holding = null;

  UI.drawHand();
  Game.spendTime(Game.constants.robot.actions.serve.timeSpent);
  Game.earnMoney(20);

  setTimeout(function() {
    UI.cleanWorkspace();
  }, 500);
};
