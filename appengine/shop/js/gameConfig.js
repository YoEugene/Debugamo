/**
 * Blockly Games: Drink Shop
 */

goog.provide('Shop.Game.Config');

Shop.Game.Config.constants = {
  shop: {
    cupCapacities: {
      large: 700,   // 2
      medium: 500,  // 1.428571
      small: 350,   // 1
    },
    prices: {
      blackTea: {
        large: 25,
        medium: 20,
        small: 15,
      },
      greenTea: {
        large: 25,
        medium: 20,
        small: 15,
      },
      milkTea: {
        large: 50,
        medium: 35,
        small: 25,
      },
    },
    materialPrices: {
      blackTea: 0.01,  // $/ml
      greenTea: 0.01,
      milk: 0.02,
    },
  },
  robot: {
    actions: {
      getNewCup: {
        timeSpent: 5, // seconds
      },
      fillCup: {
        timeSpent: 10, // seconds
      },
      coverCup: {
        timeSpent: 5, // seconds
      },
      serve: {
        timeSpent: 5,
      },
    },
  },
};

Shop.Game.Config.levels = [
  // Level 0
  undefined,
  // Level 1
  {
    blockIds: ['block_DrinkShop_getNewCup', 'block_DrinkShop_fillCupWith', 'block_DrinkShop_coverCup'],
    scale: 1.25,
    goal: "製作一杯紅茶。",
    desc:
    '請將程式積木拉到右邊空白的程式編輯區，<br />' +
    '並由上到下依照正確順序拼接，<br />' +
    '然後按下下方的「執行程式」按鈕，<br />' +
    '讓機器人幫你製作一杯紅茶。<br />' +
    '<img src=\"shop/public/hints/zh/level_1_hint.png\" class=\"hint-img\" alt=\"level 1 hint\" width=\"250\">',
    getInitialShopState: function() {
      return {
        money: 0,
        remainingTime: 20,
        materials: {
          blackTea: 500,
          cup: 1,
        }
      };
    },
    checkLevelComplete: function() {
      var robot = Game.getRobot();
      // not holding a cup
      if (!robot.holding || robot.holding.class !== "cup") {
        throw Game.levelFailedMessage('DrinkShop_msg_noCup');
      }

      var cup = robot.holding;
      // cup is empty
      if (Object.keys(cup.filled).length === 0) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupEmpty');
      }

      // not black tea in cup
      if (!cup.filled.hasOwnProperty("black tea")) {
        throw Game.levelFailedMessage('DrinkShop_msg_notBlackTea');
      }
      // TODO: check more

      // cup not covered
      if (!cup.isCovered) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupNotCovered');
      }

      return true;
    },
  },
  // Level 2
  {
    blockIds: ['block_DrinkShop_getNewCup', 'block_DrinkShop_fillCupWith', 'block_DrinkShop_coverCup'],
    scale: 1.25,
    goal: "製作一杯綠茶。",
    desc:
    '你可以點擊程式積木中的選單來選擇不同的飲料。<br />' +
    '<img src="shop/public/hints/zh/level_2_hint.png" class="hint-img" alt="level 2 hint" width="250">',
    getInitialShopState: function() {
      return {
        money: 0,
        remainingTime: 20,
        materials: {
          greenTea: 500,
          cup: 1,
        }
      };
    },
    checkLevelComplete: function() {
      var robot = Game.getRobot();
      // not holding a cup
      if (!robot.holding || robot.holding.class !== "cup") {
        throw Game.levelFailedMessage('DrinkShop_msg_noCup');
      }

      var cup = robot.holding;
      // cup is empty
      if (Object.keys(cup.filled).length === 0) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupEmpty');
      }

      // not green tea in cup
      if (!cup.filled.hasOwnProperty("green tea")) {
        throw Game.levelFailedMessage('DrinkShop_msg_notGreenTea');
      }
      // TODO: check more

      // cup not covered
      if (!cup.isCovered) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupNotCovered');
      }

      return true;
    },
  },
  // Level 3
  {
    blockIds: ['block_DrinkShop_getNewCup', 'block_DrinkShop_fillCupWithVolume', 'block_DrinkShop_coverCup'],
    scale: 1,
    goal: "製作一杯奶茶。",
    desc:
    '杯子的容量是 500 毫升。<br />' +
    '<br />' +
    '本店的奶茶，<br />' +
    '原料是紅茶和牛奶，<br />' +
    '紅茶：牛奶的比例是6:4。<br />' +
    '所以，<br />' +
    '紅茶的體積是 500 × 0.6 = ??? 毫升，<br />' +
    '牛奶的體積是 500 × 0.4 = ??? 毫升。<br />' +
    '<br />' +
    '你可以輸入不同的數字來改變飲料倒入的量。<br />' +
    '<img src="shop/public/hints/zh/level_3_hint.png" class="hint-img" alt="level 3 hint" width="250">',
    getInitialShopState: function() {
      return {
        money: 0,
        remainingTime: 30,
        materials: {
          blackTea: 500,
          greenTea: 500,
          milk: 500,
          cup: 1,
        }
      };
    },
    checkLevelComplete: function() {
      var robot = Game.getRobot();
      // not holding a cup
      if (!robot.holding || robot.holding.class !== "cup") {
        throw Game.levelFailedMessage('DrinkShop_msg_noCup');
      }

      var cup = robot.holding;
      // cup is empty
      if (Object.keys(cup.filled).length === 0) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupEmpty');
      }

      // no black tea in cup
      if (!cup.filled.hasOwnProperty("black tea")) {
        throw Game.levelFailedMessage('DrinkShop_msg_noBlackTea');
      }
      // no milk in cup
      if (!cup.filled.hasOwnProperty("milk")) {
        throw Game.levelFailedMessage('DrinkShop_msg_noMilk');
      }

      // cup not full
      if (cup.filledVolume < 499.9) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupNotFull');
      }

      // not only black tea and milk
      if (Object.keys(cup.filled).length > 2) {
        throw Game.levelFailedMessage('DrinkShop_msg_notOnlyBlackTeaAndMilk');
      }

      // not correct proportion
      if (cup.filled["black tea"] !== 300 || cup.filled["milk"] !== 200) {
        throw Game.levelFailedMessage('DrinkShop_msg_notCorrectProportion');
      }

      // cup not covered
      if (!cup.isCovered) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupNotCovered');
      }

      return true;
    },
  },
  // Level 4
  {
    blockIds: ['block_DrinkShop_getNewCup', 'block_DrinkShop_fillCupWithVolume', 'block_DrinkShop_coverCup'],
    scale: 1,
    goal: "製作一杯珍珠奶茶。",
    desc:
    '本店的珍珠奶茶，<br />' +
    '原料有珍珠、紅茶、牛奶，<br />' +
    '珍珠要佔據杯子容量的20%，<br />' +
    '紅茶：牛奶的比例一樣要維持6:4。<br />' +
    '所以，<br />' +
    '珍珠的體積是 500 × 0.2 = ??? 毫升，<br />' +
    '紅茶的體積是 500 × (1 - 0.2) × 0.6 = ??? 毫升，<br />' +
    '牛奶的體積是 500 × (1 - 0.2) × 0.4 = ??? 毫升。<br />',
    getInitialShopState: function() {
      return {
        money: 0,
        remainingTime: 40,
        materials: {
          blackTea: 500,
          greenTea: 500,
          milk: 500,
          boba: 500,
          cup: 1,
        }
      };
    },
    checkLevelComplete: function() {
      var robot = Game.getRobot();
      // not holding a cup
      if (!robot.holding || robot.holding.class !== "cup") {
        throw Game.levelFailedMessage('DrinkShop_msg_noCup');
      }

      var cup = robot.holding;
      // cup is empty
      if (Object.keys(cup.filled).length === 0) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupEmpty');
      }

      // no black tea in cup
      if (!cup.filled.hasOwnProperty("black tea")) {
        throw Game.levelFailedMessage('DrinkShop_msg_noBlackTea');
      }
      // no milk in cup
      if (!cup.filled.hasOwnProperty("milk")) {
        throw Game.levelFailedMessage('DrinkShop_msg_noMilk');
      }
      // no boba in cup
      if (!cup.filled.hasOwnProperty("boba")) {
        throw Game.levelFailedMessage('DrinkShop_msg_noBoba');
      }

      // cup not full
      if (cup.filledVolume < 499.9) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupNotFull');
      }

      // not only black tea and milk and boba
      if (Object.keys(cup.filled).length > 3) {
        throw Game.levelFailedMessage('DrinkShop_msg_tooManyMaterials');
      }

      // not correct proportion
      if (cup.filled["boba"] !== 100 || cup.filled["black tea"] !== 240 || cup.filled["milk"] !== 160) {
        throw Game.levelFailedMessage('DrinkShop_msg_notCorrectProportion');
      }

      // cup not covered
      if (!cup.isCovered) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupNotCovered');
      }

      return true;
    },
  },
  // Level 5
  {
    blockIds: [
      'block_DrinkShop_getNewCup',
      'block_DrinkShop_fillCupWithVolume',
      'block_DrinkShop_coverCup',
      'block_math_arithmetic',
    ],
    scale: 0.875,
    goal: "製作一杯珍珠奶綠。<br />讓機器人幫你計算各種原料的體積。",
    desc:
    '本店的珍珠奶綠，<br />' +
    '原料有珍珠、綠茶、牛奶，<br />' +
    '珍珠要佔據杯子容量的20%，<br />' +
    '綠茶：牛奶的比例是65:35。<br />' +
    '<br />' +
    '在前一關，你自己算出了珍珠奶茶的各種原料的體積，<br />' +
    '但珍珠奶綠的原料比例更複雜，沒這麼容易計算。<br />' +
    '但不用擔心，我們的機器人很擅長計算，<br />' +
    '你可以在程式中寫算式，讓機器人幫你計算。<br />' +
    '<img src="shop/public/hints/zh/level_5_hint_1.png" class="hint-img" alt="level 5 hint 1" width="200">' +
    '<img src="shop/public/hints/zh/level_5_hint_2.png" class="hint-img" alt="level 5 hint 2" width="250">',
    getInitialShopState: function() {
      return {
        money: 0,
        remainingTime: 40,
        materials: {
          blackTea: 500,
          greenTea: 500,
          milk: 500,
          boba: 500,
          cup: 1,
        }
      };
    },
    checkLevelComplete: function() {
      var robot = Game.getRobot();
      // not holding a cup
      if (!robot.holding || robot.holding.class !== "cup") {
        throw Game.levelFailedMessage('DrinkShop_msg_noCup');
      }

      var cup = robot.holding;
      // cup is empty
      if (Object.keys(cup.filled).length === 0) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupEmpty');
      }

      // no green tea in cup
      if (!cup.filled.hasOwnProperty("green tea")) {
        throw Game.levelFailedMessage('DrinkShop_msg_noGreenTea');
      }
      // no milk in cup
      if (!cup.filled.hasOwnProperty("milk")) {
        throw Game.levelFailedMessage('DrinkShop_msg_noMilk');
      }
      // no boba in cup
      if (!cup.filled.hasOwnProperty("boba")) {
        throw Game.levelFailedMessage('DrinkShop_msg_noBoba');
      }

      // cup not full
      if (cup.filledVolume < 499.9) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupNotFull');
      }

      // not only black tea and milk and boba
      if (Object.keys(cup.filled).length > 3) {
        throw Game.levelFailedMessage('DrinkShop_msg_tooManyMaterials');
      }

      // not correct proportion
      if (cup.filled["boba"] !== 100 || cup.filled["green tea"] !== 260 || cup.filled["milk"] !== 140) {
        throw Game.levelFailedMessage('DrinkShop_msg_notCorrectProportion');
      }

      // cup not covered
      if (!cup.isCovered) {
        throw Game.levelFailedMessage('DrinkShop_msg_cupNotCovered');
      }

      return true;
    },
  },
];
