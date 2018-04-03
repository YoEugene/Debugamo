goog.provide('Shop.Game.UI');
goog.require('Shop.Game.UI.Config');
goog.require('Blockly');
goog.require('Shop.utils');
goog.require('goog.graphics.SvgGraphics');

var UI = Shop.Game.UI;

UI.init = function(shopState) {
  UI.svg = document.getElementById('svgWorkspace');

  // goog.graphics.SvgGraphics.drawRect(10, 50, 50, 10, '#eee', '#ccc', UI.svg);

  UI.drawn = {};
  UI.dom = {}

  // UI.drawObject(UI.Config.background, UI.svg);
  // UI.drawObject(UI.Config.workspace, UI.svg);
  UI.dom.workspace = document.getElementById('workspace-main');
  UI.dom.timeText = document.getElementById('status-time-text');
  UI.dom.moneyText = document.getElementById('status-money-text');

  UI.updateMoney(shopState.money);
  UI.updateTime(shopState.remainingTime);
};

UI.reset = function(shopState) {
  UI.cleanWorkspace();
  UI.drawn = {};

  UI.updateMoney(shopState.money);
  UI.updateTime(shopState.remainingTime);
};

// private

UI.rgbaToStr = function(color) {
  return "rgba({0}, {1}, {2}, {3})".format(
    parseInt(color.r),
    parseInt(color.g),
    parseInt(color.b),
    color.a
  );
}

UI.mixNum = function(num1, volume1, num2, volume2) {
  if (volume1 + volume2 == 0) {
    return 0;
  }
  return (num1 * volume1 + num2 * volume2) / (volume1 + volume2);
}

UI.mixAlpha = function(value1, weight1, value2, weight2) {
  if (weight1 + weight2 == 0) {
    return 0;
  }
  var power = 100;
  return Math.pow((Math.pow(value1, power) * weight1 + Math.pow(value2, power) * weight2) / (weight1 + weight2), (1 / power));
}

UI.mixColor = function(color1, volume1, color2, volume2) {
  return {
    r: UI.mixNum(color1.r, volume1 * color1.a, color2.r, volume2 * color2.a),
    g: UI.mixNum(color1.g, volume1 * color1.a, color2.g, volume2 * color2.a),
    b: UI.mixNum(color1.b, volume1 * color1.a, color2.b, volume2 * color2.a),
    a: UI.mixAlpha(color1.a, volume1, color2.a, volume2),
  };
}

UI.drawObject = function(objConfig, parent) {
  // var object = UI.Config[objName];
  var attributes = objConfig.attributes;
  var shape = document.createElementNS(Blockly.SVG_NS, objConfig.element);
  Object.keys(objConfig.attributes).map(function(attributeName) {
    shape.setAttribute(attributeName, objConfig.attributes[attributeName]);
  });
  parent.appendChild(shape);
  return shape;
};

UI.removeChildren = function(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

UI.cleanWorkspace = function() {
  UI.removeChildren(UI.dom.workspace);
};

UI.drawCup = function() {
  UI.drawn.cup = UI.drawObject(UI.Config.cup, UI.dom.workspace);
  UI.drawObject(UI.Config.cupLight, UI.dom.workspace);
};

// public API

UI.getNewCup = function(cup) {
  Game.UI.cleanWorkspace();
  Game.UI.drawCup();
};

UI.updateCup = function(cup) {
  var drinkColor = {r: 0, g: 0, b: 0, a: 0};
  var drinkVolume = 0; // for mixing color

  Object.keys(cup.filled).forEach(function(materialName) {
    var materialVolume = cup.filled[materialName];
    var materialColor = UI.Config.getMaterialColor(materialName);
    drinkColor = UI.mixColor(drinkColor, drinkVolume, materialColor, materialVolume);
    drinkVolume += materialVolume;
  });

  UI.drawn.cup.setAttribute('fill', UI.rgbaToStr(drinkColor));
};

UI.fillCup = function(color) {
  UI.drawn.cup.setAttribute('fill', color);
};

UI.drawCupCap = function(color) {
  UI.drawObject(UI.Config.cupCap, UI.dom.workspace);
};

UI.drawHand = function() {
  UI.drawObject(UI.Config.hand, UI.dom.workspace);
};

UI.drawTimeMoney = function() {
  UI.drawObject(UI.Config.hand, UI.dom.workspace);
};

UI.updateTime = function (time) {
  UI.dom.timeText.textContent = time;
};

UI.updateMoney = function (money) {
  UI.dom.moneyText.textContent = money;
};