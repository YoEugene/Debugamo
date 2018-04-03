goog.provide('Shop.Game.UI.Config');

Shop.Game.UI.Config = {};

var Config = Shop.Game.UI.Config;

var scale = 100;
var middleX = scale / 2;
var middleY = scale / 2;

Config.colors = {};

Config.colors["black tea"] = {r: 192, g: 64, b: 0, a: 0.75};
Config.colors["green tea"] = {r: 224, g: 200, b: 48, a: 0.75};
Config.colors["milk"] = {r: 255, g: 255, b: 240, a: 1};

Config.getMaterialColor = function(materialName) {
  if (Config.colors.hasOwnProperty(materialName)) {
    return Config.colors[materialName];
  }
  return {r: 0, g: 0, b: 0, a: 0};
}

Config.cup = {
  topWidth: 50,
  bottomWidth: 35,
  height: 60,
  element: 'polygon',
  attributes:{
    'fill': 'rgba(0, 0, 0, 0)',
    'stroke': '#fff',
    'stroke-width': 2,
    'stroke-linejoin': 'round',
    'stroke-alignment': 'outer',
  },
};
var cup = Config.cup;
cup.topleftX = middleX - Config.cup.topWidth / 2;
cup.topY = middleY - Config.cup.height / 2;
cup.toprightX = middleX + Config.cup.topWidth / 2;
cup.bottomrightX = middleX + Config.cup.bottomWidth / 2;
cup.bottomY = middleY + Config.cup.height / 2;
cup.bottomleftX = middleX - Config.cup.bottomWidth / 2;
cup.attributes.points = '{0},{1} {2},{1} {3},{4} {5},{4}'.format(
  cup.topleftX,
  cup.topY,
  cup.toprightX,
  cup.bottomrightX,
  cup.bottomY,
  cup.bottomleftX
);

Config.cupLight = {
  ratio: 0.625,
  element: 'line',
};
var ratio = Config.cupLight.ratio;
Config.cupLight.attributes = {
  x1: middleX + Config.cup.topWidth / 2 * ratio,
  y1: middleY - Config.cup.height / 2 * ratio,
  x2: middleX + Config.cup.bottomWidth / 2 * ratio,
  y2: middleY + Config.cup.height / 2 * ratio,
  'stroke': 'rgba(255, 255, 255, 0.5)',
  'stroke-width': 4,
  'stroke-linecap': 'round',
};

// var cup = Config.cup;
Config.cupCap = {
  topWidth: 50,
  bottomWidth: 55,
  height: 10,
  element: 'polygon',
};
var cupCap = Config.cupCap;
Config.cupCap.attributes = {
  points: '{0},{1} {2},{1} {3},{4} {5},{4}'.format(
    middleX - cupCap.topWidth / 2,
    cup.topY - cupCap.height / 2,
    middleX + cupCap.topWidth / 2,
    middleX + cupCap.bottomWidth / 2,
    cup.topY + cupCap.height / 2,
    middleX - cupCap.bottomWidth / 2
  ),
  'fill': '#ddd',
};

Config.hand = {
  // fingerWidth: 20,
  element: 'line',
  attributes: {
    x1: 50,
    y1: 50,
    x2: scale,
    y2: 50,
    'stroke': '#ffc57b',
    'stroke-width': 25,
    'stroke-linecap': 'round',
  },
};
