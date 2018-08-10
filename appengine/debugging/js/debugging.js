/**
 * Debugamo: Debugging Mission
 */

// Debugging Game Function

goog.provide('Debugging');

goog.require('Blockly.FieldDropdown');
goog.require('BlocklyDialogs');
goog.require('BlocklyGames');
goog.require('BlocklyInterface');
goog.require('Blockly.Workspace');
goog.require('Debugging.Blocks');
goog.require('Debugging.Game');
goog.require('Debugging.UI');
goog.require('Levels');
goog.require('Debugging.soy');

BlocklyGames.NAME = 'debugging';

var Scope = Debugging;

Scope.MAX_STEPS = 10000;

/**
 * Route-to and Start next level
 */
// BlocklyInterface.nextLevel = function() {
//     if (BlocklyGames.LEVEL < BlocklyGames.MAX_LEVEL) {
//         window.location = window.location.protocol + '//' +
//             window.location.host + window.location.pathname +
//             '?lang=' + BlocklyGames.LANG + '&level=' + (BlocklyGames.LEVEL + 1);
//     } else {
//         BlocklyInterface.indexPage();
//     }
// };

/**
 * Initialize Blockly and the game.  Called on page load.
 */
Scope.init = function() {
    // Render the Soy template.
    document.body.innerHTML = Scope.soy.start({}, null, {
        lang: BlocklyGames.LANG,
        level: BlocklyGames.LEVEL,
        maxLevel: BlocklyGames.MAX_LEVEL,
        html: BlocklyGames.IS_HTML
    });

    BlocklyInterface.init();

    var rtl = BlocklyGames.isRtl(); // right to left?
    var blocklyDiv = document.getElementById('blockly');

    /* Init Blockly */
    var toolbox = document.getElementById('toolbox');
    var scale = Levels[BlocklyGames.LEVEL].scale || 1;
    var readOnly = false;
    // var readOnly = Levels[BlocklyGames.LEVEL].isEvaluation || false;

    // init blocks or categories
    var defaultCategories = ["Logic", "Loops", "Math", "Text", "Lists", "Colour", "Variables", "Functions"];
    var categoryIds = Levels[BlocklyGames.LEVEL].categoryIds;
    if (categoryIds.length > 0)
        categoryIds = defaultCategories.concat(categoryIds);

    var blockIds = [];
    if (categoryIds.length == 0) {
        blockIds = Levels[BlocklyGames.LEVEL].blockIds;
        blockIds.forEach(function(blockId) {
            var block = document.getElementById(blockId);
            toolbox.appendChild(block);
        });
    } else {
        categoryIds.forEach(function(categoryId) {
            var category = document.getElementById(categoryId);
            toolbox.appendChild(category);
        });
    }
    // if category then enable scrollbar, else if block is more than 3, enable scrollbar (if evaluation level disable it)
    // var scrollbars = readOnly ? false : categoryIds.length > 0 || blockIds.length > 3;
    var scrollbars = categoryIds.length > 0 || blockIds.length > 3;
    if (BlocklyGames.LEVEL == 10) {
        var maxBlocks = 7;
    } else if (BlocklyGames.LEVEL == 16) {
        var maxBlocks = 7;
    } else {
        var maxBlocks = Infinity;
    }

    BlocklyGames.workspace = Blockly.inject('blockly', {
        'media': 'third-party/blockly/media/',
        'rtl': rtl,
        'scrollbars': scrollbars,
        'readOnly': readOnly,
        'toolbox': toolbox,
        'trashcan': true,
        'maxBlocks': maxBlocks,
        'zoom': {
            controls: false,
            wheel: false,
            startScale: scale,
            maxScale: scale,
            minScale: 0.5,
            scaleSpeed: 1,
        },
    });

    // init Game
    Game.init(BlocklyGames.LEVEL);

    // add highlight function;
    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    Blockly.JavaScript.STATEMENT_SUFFIX = 'stepAnchor(%1);\n';
    Blockly.JavaScript.addReservedWords('stepAnchor,highlightBlock');

    var done = JSON.parse(localStorage.done).indexOf(BlocklyGames.LEVEL) != -1;
    // Show new player text
    if (localStorage.newPlayer == "1") {
        UI.showNewPlayerText();
        // Game.play('gidget_tutorial', 0.15);
    }
    // if not new player and already finished this level
    else if (done) {
        UI.showOrHideInterface(true)
    }

    // set current level in localStorage
    localStorage.setItem('currentLevel', BlocklyGames.LEVEL);
    
    // init log
    localStorage.setItem('log', '[]');
    localStorage.setItem('blockVersion', '[]');

    // if there is no saved xml(which means level just started, or empty xml, load the defaultBlocks from levels.js)
    var savedXml = BlocklyGames.loadFromLocalStorage('debugging', BlocklyGames.LEVEL);
    if (!done || Levels[BlocklyGames.LEVEL].isEvaluation) {
        console.log('[Game] Load default blocks.');
        BlocklyInterface.saveToLocalStorage(Levels[BlocklyGames.LEVEL].defaultBlocks);
    }

    // load defualt blocks or load stored blocks from Local Storage / Session Storage / DB
    var savedXml = localStorage.savedBlocks;
    BlocklyInterface.loadBlocks(savedXml, false);
    // console.log('[Game] Load saved blocks.');

    Scope.initHeaderWidth();

    // On Window resize init workspace header width
    window.addEventListener('resize', function(event) {
        Scope.initHeaderWidth();
    }, true);

    // Maze.reset(true);
    BlocklyGames.workspace.addChangeListener(function() {
        BlocklyInterface.saveToLocalStorage()
        if (!isDef(localStorage.lastBlockVersion)) {
            localStorage.lastBlockVersion = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(BlocklyGames.workspace));
        } else if (localStorage.lastBlockVersion != Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(BlocklyGames.workspace))) {
            Scope.addLog('editBlock')
            Scope.addVer(Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(BlocklyGames.workspace)));
            localStorage.lastBlockVersion = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(BlocklyGames.workspace));
        }
        console.log('[Game] Save blocks to localstorage');
    });


    BlocklyGames.bindClick('runButton', Scope.runButtonClick);
    BlocklyGames.bindClick('stepButton', Scope.stepButtonClick);
    BlocklyGames.bindClick('resetButton', Scope.resetButtonClick);
    BlocklyGames.bindClick('clearLocalStorageButton', Scope.clearLocalStorageButton);
    BlocklyGames.bindClick('restartGameButton', Scope.restartGameButtonClick);
    BlocklyGames.bindClick('helpButton', Scope.showHelp);
    BlocklyGames.bindClick('guidePreviousButton', UI.showPreviousGuide);
    BlocklyGames.bindClick('guideNextButton', UI.showNextGuide);
    BlocklyGames.bindClick('restoreBlockHeader', Scope.restoreBlock);
    BlocklyGames.bindClick('showCodeHeader', Scope.showCode);
    BlocklyGames.bindClick('guideButton', Scope.startIntro);
    BlocklyGames.bindClick('loadSolutionButton', Scope.loadSolution);
    BlocklyGames.bindClick('bigQueryTest', Scope.bigQueryLogSend);
    BlocklyGames.bindClick('musicOnOff', Scope.musicOnOff);

    // Lazy-load the JavaScript interpreter.
    setTimeout(BlocklyInterface.importInterpreter, 1);
    // Lazy-load the syntax-highlighting.
    setTimeout(BlocklyInterface.importPrettify, 1);

    // trial playing 
    // if (BlocklyGames.LEVEL == 6 && window.location.origin != "http://localhost:8080") {
    //     var developing = document.getElementById('developing');
    //     var style = {
    //         width: '60%',
    //         left: '20%',
    //         top: '5em'
    //     };
    //     BlocklyDialogs.showDialog(developing, null, true, true, style,
    //         BlocklyDialogs.stopDialogKeyDown, true);
    //     return;
    // }

    // init tutorial
    var tutorialFinishedOne = localStorage.tutorialFinishedOne;
    if (!tutorialFinishedOne && localStorage.newPlayer == "0") {
        // console.log(tutorialFinishedOne);
        // console.log(localStorage.newPlayer);
        Scope.startIntro();
    }
    if (!done && tutorialFinishedOne && localStorage.newPlayer == "0") {
        UI.showOrHideInterface(false);
    }

    var tutorialFinishedThree = localStorage.tutorialFinishedThree;

    // enable developer mode
    if (window.location.origin == "http://localhost:8080") {
        console.log('[Game] Enable developer mode.');
        // localStorage.setItem('done', '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]');
        // localStorage.setItem('maxDoneLevel', '18');
        $('#debugModeBox').show();
        $('#loadSolutionButton').show();
        $('#clearLocalStorageButton').show();
    }

    Scope.getAuthToken();

    if (localStorage.newPlayer == "1") {
        $('#begin').on('keyup', UI.checkAllNewPlayerInfoIsFilled);
        $('#begin').on('click', UI.checkAllNewPlayerInfoIsFilled);
    }

    if (Levels[BlocklyGames.LEVEL].isEvaluation) {
        // re-init numOfChanceToAnswer to 3
        $('#restoreBlockHeader').hide();
        BlocklyGames.workspace.options.readOnly = true;
        localStorage.numOfChanceToAnswer = "3";
    }

    $('#dialogStorage').append('<audio loop id="backgroundMusic"><source src="debugging/public/sound/gidget_tutorial.mp3" type="audio/mpeg"></audio>');
    if (localStorage.musicPlay == "1") {
        var audio = document.getElementById("backgroundMusic");
        audio.volume = 0.15;
        setTimeout(function() { 
            audio.play();
        }, 3000);
    }

    setTimeout(function(){
        $('#loadSolutionButton').show();
    },300000)
};

/**
 * add log into localStorage
 */
Scope.addLog = function(action) {
    var d = new Date();
    var time = d.getTime();
    // console.log(time);
    // console.log(action);
    var log = JSON.parse(localStorage.log);
    log.push({
        time: time,
        action: action
    })
    var logStr = JSON.stringify(log);
    localStorage.log = logStr;
    // console.log(localStorage.log);
    console.log('action added into localStorage log!');
};

/**
 * add block version into localStorage
 */
Scope.addVer = function(version_xml_string) {
    var d = new Date();
    var time = d.getTime();
    // console.log(time);
    console.log(version_xml_string);
    var blockVersion = JSON.parse(localStorage.blockVersion);
    if (blockVersion.length != 0 && time - blockVersion[blockVersion.length-1].time < 500) {
        console.log('too quick!');
        return;
    }
    blockVersion.push({
        time: time,
        xml: version_xml_string
    })
    var blockVersionStr = JSON.stringify(blockVersion);
    localStorage.blockVersion = blockVersionStr;
    // console.log(localStorage.blockVersion);
    console.log('versions added into localStorage log!');
};

/**
 * Switch music
 */
Scope.musicOnOff = function() {
    if (localStorage.musicPlay == '1') {
        localStorage.musicPlay = '0';
        var audio = document.getElementById("backgroundMusic");
        audio.volume = 0.001;
        audio.pause();
    } else {
        localStorage.musicPlay = '1';
        var audio = document.getElementById("backgroundMusic");
        audio.volume = 0.15;
        audio.play();
    }
}

/**
 * Get Google OAuth token
 */
Scope.getAuthToken = function() {
    var d = new Date();
    if (!isDef(localStorage.token) || d.getTime() / 1000 > Number(localStorage.lastAuthTime) / 1000 + 3000) {

        // save last auth time in milliseconds
        localStorage.lastAuthTime = d.getTime();

        var pHeader = { "alg": "RS256", "typ": "JWT" };
        var sHeader = JSON.stringify(pHeader);

        var d = new Date();
        var currentSecond = Math.floor(d.getTime() / 1000);

        var pClaim = {
            'iss': 'debugamo@appspot.gserviceaccount.com',
            'scope': 'https://www.googleapis.com/auth/bigquery https://www.googleapis.com/auth/bigquery.insertdata https://www.googleapis.com/auth/cloud-platform',
            'aud': 'https://www.googleapis.com/oauth2/v4/token',
            'exp': currentSecond + 3600,
            'iat': currentSecond
        };
        var sClaim = JSON.stringify(pClaim);

        var key = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCs1sH5aFSqfKiw\nErIry00IfM+dZ8mx09QGealtylq35SgWhpuE/4vlkAIQ05IKOhn0LD/otvhsz6ti\n+Rgpxq6jJEP1+61BevOgUZHOKYeCUEY2jBD4uQQezDeCM7i5EhGxcY0aX/dFCpTQ\nHP5UKJfQakKIM4NLbGtOYEotYaoK8hDaJWy6ClvpoBjZqL61tGgKiCRLf0z04Qr5\ncSqnZ3MwjMySwx0ktsQ5F1cIBCz1Cg3amd8kMzQg+Ay8SqXOdfX7RimtyxEZ/YuZ\n42NdSjP6tHPzszSKDnsNaPvfFf/5DqpZQFTVaEobFBH9K+Hco78bT8oNX1TlmNQC\nTajIE47/AgMBAAECggEAOoJa2NzWKH6Ztj0l/ohMdA6YU79COoYsdOKzldyWGEGl\nb/ayZ/QAPj6hTGPqwLaJeayPF+70qxUj/hW39dBx5v1MWlWQAaYnGgLy+lj5rAYT\ntrx0tFYhjHFyawuqQVBaF/kKHL8W3FLoLIlcGU5CkkWebzANBrfVnYsgITu6Dgj0\nWzv0/kqpsoMInFqXFKD2gRcAGb5sO6P2WmcmNpKGSvIuWXBVee3bfxjX6amMZNlh\nmTwDmLZtdxdK88dHacgYmdy9BkTyoUi+AX62ZouYhFjSVhz3ANgDMAv+qRP8TzMH\nLzmBEiFnfEsFJ+xx4IAx0K7zRzY2MyUWX9r9zf3x2QKBgQDbcTTE8f1wpvcZ5h9w\niC4jCnKwSUN/vFha7StSYQ1Srp4pkxXMrBEI+MldXmexUZ9Ne3W1RVCNQOCIiZKW\nw86XEo6w4EekQy7JfPXWZrHnXxX1YqVWhTuecUOkITfgoBfLlvB17kCVczlMBX2z\nMr+cwYihN6aRshV2tYtOQqsjFwKBgQDJogI4k5qFUn6uRANlLygh3P5SJnjGO7L7\n9ZHW/FOBTyMzFHZoGyR4vw0zWKXYpPi6j3W2TGn2ctTKjohdllzqj6SIJNXp0Omk\nFHA80NDowVYgATRlFfnwPjRHFY0l+X3xKqzHpnG9L8GCVPeCdIietWmT/w4GlFn5\nPU3dZzgEWQKBgBec2tzGXUsd7EDxLjjhrnU+zpCBka3RCoDePGck4lYfTA2VMidP\n7JVWj/RoEChYbBfeTRAwYTaR4JdQlmF6uGQxLwGBYLQgNoyf0aQ8cLBA3xAEiV4C\nACRQc8LZgDW/hE/38e/+rxxlxaiUfq4lq9CmUplmb5oF26Fmb5MAQYIJAoGAPXMP\nZDivvfP/QZLeygaOH4vfQiARbLCjAqC7mp55wI3it12EHIQxIE9xcXWRza2xVAIG\nqNEu9fnXGghITOVXWfD+/rLjMogFvIiyEAa/tD+/xK85TZld+7apbgSGaM1ZcZdE\n4u+5+CNGwTat2+cx/9Rf4ce4eY7awNfLFC+x5bkCgYBYClYp3HeJ/FmduhYLfWOA\nbd8zLudZnBhFALbHW9TyHYF/qgM3tLIqisSzRgpyOIF81vac97zvAn2aydf1yNqo\nw97Cy05b6Yj4I+HUhD2m0UHH7IMB+8A4ktu3BZv/uE9on5JDxC0aMAvFUEPORzAF\nw/nc3RbJCU2ion1Q3kmE+w==\n-----END PRIVATE KEY-----\n";
        var sJWS = KJUR.jws.JWS.sign(null, sHeader, sClaim, key);

        var payload = {
            grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            assertion: sJWS
        }

        $.post("https://www.googleapis.com/oauth2/v4/token", payload, function(response) {
            localStorage.token = response.access_token;
        });
    }
}

/**
 * Send localStorage log back to server
 */
Scope.bigQueryLogSend = function() {
    var user = localStorage.user;
    if (JSON.parse(user).name == 'admin' || JSON.parse(user).name == 'anonymous') {
        console.log('admin pass bigQuery logging');
        return;
    }
    var logText = localStorage.log;
    var blockVersion = localStorage.blockVersion
    var d = String(new Date());
    var xhr = new XMLHttpRequest();
    var payload = { 'rows': [{ 'json': { 'time': d, 'user': user, 'level': localStorage.currentLevel, 'action': logText, 'blockVersion': blockVersion, 'numOfAction': JSON.parse(logText).length, 'numOfBlockVersion': JSON.parse(blockVersion).length} }] };

    xhr.open("POST", "https://www.googleapis.com/bigquery/v2/projects/debugamo/datasets/userlog/tables/levelLog/insertAll", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.token);
    xhr.send(JSON.stringify(payload));
}

/**
 * Initiate workspace header width
 */
Scope.initHeaderWidth = function() {
    var toolboxHeader = document.getElementById('toolbox-header');
    var workspaceHeader = document.getElementById('workspace-header');
    var blocklyFlyout = document.getElementsByClassName('blocklyFlyout')[0];
    var widthWorkspace = document.getElementsByClassName('blocklySvg')[0].getBoundingClientRect().width;
    if (Levels[BlocklyGames.LEVEL].isEvaluation && !Game.evaluationEnd) {
        // workspaceHeader.style.display = 'none';
        blocklyFlyout.style.display = 'none';
        toolboxHeader.style.display = 'none';

        workspaceHeader.style.display = 'inline-block';
        workspaceHeader.style.width = (widthWorkspace - 2) + 'px';

    } else {
        blocklyFlyout.style.display = 'inline-block';
        toolboxHeader.style.display = 'inline-block';
        workspaceHeader.style.display = 'inline-block';
        var widthCategory = $('.blocklyToolboxDiv').width();
        var widthBlock = document.getElementsByClassName('blocklyFlyoutBackground')[0].getBoundingClientRect().width;
        if (widthCategory == undefined) {
            toolboxHeader.style.width = widthBlock + 'px';
            workspaceHeader.style.width = (widthWorkspace - widthBlock - 2) + 'px';
        } else {
            toolboxHeader.style.width = widthCategory + 'px';
            workspaceHeader.style.width = (widthWorkspace - widthCategory - 2) + 'px';
        }
    }
    console.log('[UI] Reinitialize blockly workspace width.');
}

/**
 * start intro JS tutorial
 */
Scope.startIntro = function() {
    Scope.addLog('startIntro');
    UI.showOrHideInterface(true);
    $('#guideNextButton').hide();
    $('#guidePreviousButton').hide();
    $('#guide-inner-box').find('p').html(BlocklyGames.getMsg('Debugging_hello'))
    Game.kiboFunction = false;
    var intro = introJs();
    intro.setOptions({
        steps: [{
                intro: "<b>歡迎來到 Debugamo 介面導覽</b><br><br>迪摩需要你的幫忙，<b>找出並修復有問題的積木</b>，清理倒塌建築並拯救小動物。讓我們來看看等一下會用到的介面吧！",
            }, {
                element: '#mission-guide-box',
                intro: "<b>【關卡指示】</b><br><br>為了幫助你理解關卡任務，迪摩會在每一關的最開始<b>解釋目前的情況</b>，以及要援救的對象。",
                position: 'auto',
            }, {
                element: '#debugamo-code-editor-container',
                intro: "<b>【程式積木區】</b><br><br>你會在這裡編輯積木，與迪摩一起完成每關列出的任務。<br><br><b>程式積木</b>是你可以使用的工具，隨著關卡進行你會有越來越多的積木可以使用。<br><br><b>程式晶片</b>是積木運作的地方，按下「運行」之後，連在<b>黃色的積木</b>底下的積木就會讓迪摩開始運作。<br><br>右上角的<b>重新開始</b>按鈕，可以幫你復原回最初始的積木。右下角的<b>垃圾桶</b>，只要拖移積木丟進垃圾桶即可刪除。",
                position: 'auto',
            },
            {
                element: '#debugamo-world-container',
                intro: '<b>【世界】</b><br><br>迪摩會在這裡到處移動、與物件以及朋友們互動。<br><br>下方的<b>運行</b>按鈕會執行剛剛介紹的程式積木區，隨後出現的<b>重置</b>按鈕則會停止程式運行，並將物件重置回原本的位置。迪摩會確實按照每一個積木運作，所以儘可能找到錯誤的積木並修復！',
                position: 'auto',
            },
            {
                element: '#mission-goal-box',
                intro: "<b>【關卡任務】</b><br><br>這裡會條列出<b>每一關的任務</b>是什麼。如果運行後沒有完成任務，迪摩會提示你問題出在哪裡。",
                position: 'auto',
            },
            {
                intro: '<b>【開始探索】</b><br><br>大致上就是這樣，剩下的讓你自由探索。現在就讓我們開始第一關吧！',
            }
        ],
        exitOnOverlayClick: false,
        exitOnEsc: false,
        disableInteraction: true,
        showBullets: false,
        showProgress: true,
        tooltipClass: 'debugamo-introJs-tooltip',
        scrollToElement: false,
        nextLabel: '往後 &rarr;',
        prevLabel: '&larr; 往前',
        doneLabel: '開始吧！'
    });
    intro.oncomplete(function() {
        if (!localStorage.tutorialFinishedOne)
            UI.showOrHideInterface(false);
        $('#guideNextButton').show();
        UI.missionGuideInd = 0;
        $('#guide-inner-box').find('p').html(level.missionGuideDescription[0]);
        localStorage.setItem('tutorialFinishedOne', '1');
        Game.kiboFunction = true;
    })
    intro.start();
}

/**
 * load solutions
 */
Scope.loadSolution = function() {
    Scope.addLog('loadSolution')
    BlocklyInterface.saveToLocalStorage(level.solutionBlocks);
    BlocklyInterface.loadBlocks(level.solutionBlocks, false);
}

/**
 * restore to original blocks
 */
Scope.restoreBlock = function() {
    BlocklyDialogs.restoreCode();
}

/**
 * show JavaScript code
 */
Scope.showCode = function() {
    BlocklyDialogs.showCode();
}

/**
 * merge code with list initiation...  append such like "var kittens = ['kitten1', 'kitten2'];\n" into code
 */
Scope.mergeCodeWithListInit = function(code, thingsName) {
    var i, j, k, listTag = [];
    for (i = 0; i < thingsName.length; i++) {
        name = thingsName[i];
        if (Number.isInteger(name[name.length - 1] * 1)) {
            name = name.slice(0, name.length - 1);
            if (listTag.indexOf(name) == -1)
                listTag.push(name);
        }
    }

    if (listTag.length == 0)
        return code;
    // var kittens = ['kitten1','kitten2'];\n
    for (j = 0; j < listTag.length; j++) {
        var prependCode = "var " + listTag[j] + "s = [";
        var tmp = [];
        for (k = 0; k < thingsName.length; k++) {
            nm = thingsName[k];
            if (nm.indexOf(listTag[j]) != -1) {
                tmp.push(nm);
            }
        }
        tmp = tmp.join('", "');
        tmp = '"' + tmp + '"';
        prependCode += tmp + '];\n';
        code = prependCode + code;
    }

    return code;
}

/**
 * Restart Game
 * Show Dialoag to ask user if he/she wanna back to level 1 or login page
 */
Scope.restartGameButtonClick = function() {
    BlocklyDialogs.restartGame();
}

/**
 * Click the run button.  Start the program.
 * @param {!Event} e Mouse or touch event.
 */
Scope.runButtonClick = function(e) {
    // Prevent double-clicks or double-taps.
    if (BlocklyInterface.eventSpam(e)) {
        return;
    }

    Scope.addLog('run');

    var runButton = document.getElementById('runButton');
    var stepButton = document.getElementById('stepButton');
    var resetButton = document.getElementById('resetButton');
    // Ensure that Reset button is at least as wide as Run button.
    if (!resetButton.style.minWidth) {
        resetButton.style.minWidth = runButton.offsetWidth + 'px';
    }
    runButton.style.display = 'none';
    stepButton.style.display = 'none';
    resetButton.style.display = 'inline';

    BlocklyDialogs.hideDialog(false);
    Game.reset();
    BlocklyInterface.highlight('When_Run');
    Game.play('start', 0.3);

    // start animation after start sound played
    setTimeout(function() { Scope.execute(); }, 600)
};

/**
 * Click the step button.  Run the program for one step.
 * @param {!Event} e Mouse or touch event.
 */
Scope.stepButtonClick = function(e) {
    // Prevent double-clicks or double-taps.
    if (BlocklyInterface.eventSpam(e) || Game.stepInProgress) {
        return;
    }

    Scope.addLog('step');

    BlocklyDialogs.hideDialog(false);

    var runButton = document.getElementById('runButton');
    var stepButton = document.getElementById('stepButton');
    var resetButton = document.getElementById('resetButton');
    var gameButtons = document.getElementById('game-buttons');
    // Ensure that Reset button is at least as wide as Run button.
    if (!resetButton.style.minWidth) {
        resetButton.style.minWidth = runButton.offsetWidth + 'px';
    }
    runButton.style.display = 'none';
    // stepButton.style.display = 'none';
    // gameButtons.style.textAlign = 'right';
    resetButton.style.display = 'inline-block';

    Game.stopProgram = false;
    Game.stepAnchor = false;

    // first step of all steps, reset UI and play audio
    if (!Game.currentInterpreter) {
        Game.reset();
        BlocklyInterface.highlight('When_Run');
        Game.play('start', 0.3);
        // start animation after start sound played
        setTimeout(function() { Scope.executeStep(); }, 600)
    } else {
        Scope.executeStep();
    }
};

/**
 * Click the reset button.  Reset the maze.
 * @param {!Event} e Mouse or touch event.
 */
Scope.resetButtonClick = function(e) {
    // Prevent double-clicks or double-taps.
    if (BlocklyInterface.eventSpam(e)) {
        return;
    }

    Scope.addLog('reset');

    // disable animation for a short of period
    UI.stopAnimation = true;

    document.getElementById('runButton').style.display = 'inline-block';
    document.getElementById('stepButton').style.display = 'inline-block';
    document.getElementById('resetButton').style.display = 'none';
    document.getElementById('game-buttons').style.textAlign = 'left';

    Game.reset();

    // enable animation after short of period
    setTimeout(function() {
        Game.reset();
        UI.stopAnimation = false;
    }, 500)
};

/**
 * Inject the Maze API into a JavaScript interpreter.
 * @param {!Object} scope Global scope.
 * @param {!Interpreter} interpreter The JS interpreter.
 */
Scope.initInterpreter = function(interpreter, scope) {
    var commandNames = Object.keys(Game.commands);
    commandNames.map(function(commandName) {
        interpreter.setProperty(scope, commandName, interpreter.createNativeFunction(Game.commands[commandName]));
    });
};

/**
 * Execute the user's code.  Heaven help us...
 */
Scope.execute = function() {

    Game.stopProgram = false;

    if (!('Interpreter' in window)) {
        // Interpreter lazy loads and hasn't arrived yet.  Try again later.
        console.log('lazy load');
        setTimeout(Scope.execute, 250);
        return;
    }

    var code = Blockly.JavaScript.workspaceToCode(BlocklyGames.workspace);
    code = Scope.mergeCodeWithListInit(code, Object.keys(Game.things));

    ///////////////////// TODO: this is hard code for level 13, fix this into somewhere better ////////////////
    code = Scope.specialProcess(code);

    // console.log(code);
    // try {
    // eval(code);
    // } catch (e) {
    // alert(e);
    // }

    var interpreter = new Interpreter(code, Scope.initInterpreter);

    Scope.interpretCode(interpreter, 0);
};

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

/**
 * Special process of code for some levels
 */
Scope.specialProcess = function(code) {
    if (BlocklyGames.LEVEL == 13) {
        code = code + "\n\nfunction checkInfection(animal) {\n\tflag = false;\n\tif (animal == 'bird' || animal == 'piglet') {\n\t\tflag = true;\n\t\trobotSay(String(animal) + String(' 受到感染了！'))\n\t} else {\n\t\trobotSay(String(animal) + String(' 沒有受到感染'))\n\t}\n\treturn flag;\n}";
    }

    if (BlocklyGames.LEVEL == 14 || BlocklyGames.LEVEL == 15) {
        code = code + "\n\nfunction checkInfectionBefore(animal) {\n\tflag = false;\n\tif (animal == 'puppy') {\n\t\tflag = true;\n\t\trobotSay(String(animal) + String(' 曾經受過感染！'))\n\t} else {\n\t\trobotSay(String(animal) + String(' 不曾受過感染'))\n\t}\n\treturn flag;\n}";
    }

    if (BlocklyGames.LEVEL == 17) {
        code = replaceAll(code, 'removeRock', 'counter = counter + 1;\n  removeRock');
        code = replaceAll(code, "'rock'", "'rockTarget'");
        code = "var counter = 0;\n" + code + "\n\nfunction stillHaveRocks() {\n\tchangeRock();\n\tif (counter < 13) {\n\t\trobotSay('迪摩偵測到地圖中還有石頭')\n\t\treturn true;\n\t} else {\n\t\trobotSay('迪摩偵測到場中已經沒有石頭！清除完畢！')\n\t\treturn false;\n\t}\n}";
    }

    if (BlocklyGames.LEVEL == 18) {
        code = replaceAll(code, 'removeGlass', 'counter = counter + 1;\n  removeGlass');
        code = replaceAll(code, "'glass'", "'glassTarget'");
        code = "var counter = 0;\n" + code + "\n\nfunction stillHaveGlass() {\n\tchangeGlass();\n\tif (counter < 21) {\n\t\trobotSay('迪摩偵測到地圖中還有玻璃')\n\t\treturn true;\n\t} else {\n\t\trobotSay('迪摩偵測到場中已經沒有玻璃！掃除完畢！')\n\t\treturn false;\n\t}\n}";
    }
    return code;
}

/**
 * Execute a step of workspace code
 */
Scope.executeStep = function(pass_in_interpreter) {

    // disable step button function until this round finished
    Game.stepInProgress = true;

    if (!('Interpreter' in window)) {
        // Interpreter lazy loads and hasn't arrived yet.  Try again later.
        setTimeout(Scope.executeStep, 250);
        return;
    }

    if (!!pass_in_interpreter) {
        var interpreter = pass_in_interpreter;
    } else if (!Game.currentInterpreter) {

        var code = Blockly.JavaScript.workspaceToCode(BlocklyGames.workspace);
        code = Scope.mergeCodeWithListInit(code, Object.keys(Game.things));

        // delete last line (must be "stepAnchor();\n")
        if (code.lastIndexOf("\n") > 0) {
            code = code.substring(0, code.lastIndexOf("\n"));
            code = code.substring(0, code.lastIndexOf("\n"));
        }

        ///////////////////// TODO: this is hard code for level 13, fix this into somewhere better ////////////////
        code = Scope.specialProcess(code);

        // console.log(code);

        var interpreter = new Interpreter(code, Scope.initInterpreter);
    } else {
        var interpreter = Game.currentInterpreter;
    }

    try {
        if (!Game.stepAnchor && interpreter.step()) {
            setTimeout(function() {
                Scope.executeStep(interpreter);
            }, Scope.STEP_SPEED);
        } else if (!interpreter.step()) {
            // finished all steps
            // clear saved interpreter
            Game.currentInterpreter = undefined;
            $('#stepButton').hide();

            // Check if level is completed
            setTimeout(function() {
                Scope.checkCurrentLevelComplete();
            }, 300);
        } else if (Game.stepAnchor) {
            // Save current interpreter
            Game.currentInterpreter = interpreter;
        }
    } catch (e) {
        console.error(e);
        // Debugamo: setTimeout generate a short period of delay, so dom can update normally
        // levels.js : $($('#goal-list').find('li')[0]).addClass('fail'); -> Set goal <li> to red color
        if (e === Infinity) {
            setTimeout(function() { UI.showFailText('Debugging_msg_errTooManySteps'); }, 10);
        } else if ("" + e === "TypeError: Cannot read property '0' of undefined" || "" + e === "TypeError: Cannot read property 'slice' of undefined")
            setTimeout(function() { UI.showFailText('Debugging_msg_errListNotExist'); }, 10);
        else if ("" + e === "TypeError: Cannot read property '0' of undefined" || "" + e === "TypeError: Cannot read property 'slice' of undefined")
            setTimeout(function() { UI.showFailText('Debugging_msg_errListNotExist'); }, 10);
        else {
            // Syntax error, can't happen.
            setTimeout(function() { UI.showFailText(e); }, 10);
            console.error(e);
        }
    }

    // enable step button function after a short while
    setTimeout(function() {
        Game.stepInProgress = false;
    }, 500);
}

/**
 * Interpret Workspace Code
 */
Scope.interpretCode = function(interpreter, stepCount) {
    try {
        // infinite loop
        if (stepCount > Scope.MAX_STEPS) {
            throw Infinity;
        }
        // next step
        if (!Game.stopProgram && interpreter.step()) {
            setTimeout(function() {
                Scope.interpretCode(interpreter, stepCount + 1);
            }, Scope.STEP_SPEED);
        }
        // click reset/stop button
        else if (Game.stopProgram) {
            Game.stopProgram = false;
            return;
        }
        // when the code is fully executed, check if the user passes the level
        else if (!interpreter.step()) {
            setTimeout(function() {
                Scope.checkCurrentLevelComplete();
            }, 300);
            // else will throw error message
        }
    } catch (e) {
        console.error(e);
        // Debugamo: setTimeout generate a short period of delay, so dom can update normally
        // levels.js : $($('#goal-list').find('li')[0]).addClass('fail'); -> Set goal <li> to red color
        if (e === Infinity) {
            setTimeout(function() { UI.showFailText('Debugging_msg_errTooManySteps'); }, 10);
        } else if ("" + e === "TypeError: Cannot read property '0' of undefined" || "" + e === "TypeError: Cannot read property 'slice' of undefined")
            setTimeout(function() { UI.showFailText('Debugging_msg_errListNotExist'); }, 10);
        else if ("" + e === "TypeError: Cannot read property '0' of undefined" || "" + e === "TypeError: Cannot read property 'slice' of undefined")
            setTimeout(function() { UI.showFailText('Debugging_msg_errListNotExist'); }, 10);
        else {
            // Syntax error, can't happen.
            setTimeout(function() { UI.showFailText(e); }, 10);
            console.error(e);
        }
    }
}

/**
 * Check if this level is completed
 * If yes, show congratz msg; else show fail msg
 */
Scope.checkCurrentLevelComplete = function() {
    // if (Levels[BlocklyGames.LEVEL].isEvaluation) {
    //     var result = Levels[BlocklyGames.LEVEL].checkLevelComplete();
    //     if (result == true) {
    //         Game.things.robot.state = 'happy';
    //         Game.play('success', 0.2);
    //         BlocklyDialogs.showEvaluationAnswer(true);
    //         var done = JSON.parse(localStorage.done);
    //         if (done.indexOf(BlocklyGames.LEVEL) == -1) {
    //             done.push(BlocklyGames.LEVEL);
    //             localStorage.done = JSON.stringify(done);
    //             $('.level_in_progress').addClass('level_done');
    //             if ($('.level_disable')[0] != undefined) {
    //                 $($('.level_disable')[0]).addClass('level_in_progress');
    //                 $($('.level_disable')[0]).removeClass('level_disable');
    //             }
    //         }
    //         BlocklyInterface.highlight(null);
    //     } else {
    //         Game.things.robot.state = 'sad';
    //         Game.play('fail', 0.25);
    //         BlocklyDialogs.showEvaluationAnswer(false, result);
    //         var done = JSON.parse(localStorage.done);
    //         if (done.indexOf(BlocklyGames.LEVEL) == -1) {
    //             done.push(BlocklyGames.LEVEL);
    //             localStorage.done = JSON.stringify(done);
    //             $('.level_in_progress').addClass('level_done');
    //             if ($('.level_disable')[0] != undefined) {
    //                 $($('.level_disable')[0]).addClass('level_in_progress');
    //                 $($('.level_disable')[0]).removeClass('level_disable');
    //             }
    //         }
    //         BlocklyInterface.highlight(null);
    //     }
    //     UI.drawGrid($('#playground')[0], false);
    //     UI.drawThings();
    //     UI.drawTags();
    // } else {
    var result = Levels[BlocklyGames.LEVEL].checkLevelComplete();
    if (result == true) {
        Scope.addLog('checkLevelSuccess');

        Game.things.robot.state = 'happy';
        Game.play('success', 0.2);
        BlocklyInterface.saveToLocalStorage();
        BlocklyDialogs.congratulations();
        var done = JSON.parse(localStorage.done);
        if (done.indexOf(BlocklyGames.LEVEL) == -1) {
            done.push(BlocklyGames.LEVEL);
            localStorage.done = JSON.stringify(done);
            $('.level_in_progress').addClass('level_done');
            if ($('.level_disable')[0] != undefined) {
                $($('.level_disable')[0]).addClass('level_in_progress');
                $($('.level_disable')[0]).removeClass('level_disable');
            }
        }
        BlocklyInterface.highlight(null);
    } else if (typeof(result) == 'number') {
        setTimeout(function() {
            Scope.addLog('checkLevelSuccess');
            Game.things.robot.state = 'happy';
            Game.play('success', 0.2);
            BlocklyInterface.saveToLocalStorage();
            BlocklyDialogs.congratulations();
            var done = JSON.parse(localStorage.done);
            if (done.indexOf(BlocklyGames.LEVEL) == -1) {
                done.push(BlocklyGames.LEVEL);
                localStorage.done = JSON.stringify(done);
                $('.level_in_progress').addClass('level_done');
                if ($('.level_disable')[0] != undefined) {
                    $($('.level_disable')[0]).addClass('level_in_progress');
                    $($('.level_disable')[0]).removeClass('level_disable');
                }
            }
            BlocklyInterface.highlight(null);
        }, result * (UI.drawFrame * UI.drawSpeed + 150) + 150)
    } else {
        Scope.addLog('checkLevelFail');
        Game.things.robot.state = 'sad';
    }
    UI.drawGrid($('#playground')[0], false);
    UI.drawThings();
    UI.drawTags();
    // }
    Game.stopProgram = true;
};

/**
 * Clear LocalStorage
 */
Scope.clearLocalStorageButton = function() {
    localStorage.clear();
    localStorage.setItem('debug', "1");
    localStorage.setItem('newPlayer', "1");
}

/**
 * Show the help pop-up.
 */
Scope.showHelp = function() {
    var help = document.getElementById('help');
    var button = document.getElementById('helpButton');
    var style = {
        width: '50%',
        left: '25%',
        top: '5em'
    };
    BlocklyDialogs.showDialog(help, button, true, true, style,
        BlocklyDialogs.stopDialogKeyDown);
    BlocklyDialogs.startDialogKeyDown();
};

/**
 * hide dialog
 */
Scope.startGame = function() {
    if (BlocklyDialogs.isDialogVisible_) {
        BlocklyDialogs.hideDialog(false);
    }
    localStorage.setItem('newPlayer', '0');

    var user = {
        school: $('#playerSchool').val(),
        grade: $('#playerGrade').val(),
        classNum: $('#playerClass').val(),
        num: $('#playerNumber').val(),
        name: $('#playerName').val()
    }

    // if ($('#playerSchool').val() == 'FG') {
        // localStorage.done = "[1,2,3,4,5,6,7,8,9]";
        // localStorage.maxDoneLevel = "9";
    // }

    localStorage.setItem('user', JSON.stringify(user));

    Scope.startIntro();
    Game.kiboFunction = false;
};

/**
 * Change Debug Mode
 */
Scope.debugModeChange = function() {
    if ($('#debugMode').prop("checked"))
        localStorage.setItem('debug', '1');
    else
        localStorage.removeItem('debug');
};

/**
 * Check answer in evaluation level
 */
Scope.checkAnswer = function(e) {
    // Prevent double-clicks or double-taps.
    if (BlocklyInterface.eventSpam(e)) {
        return;
    }

    // player haven't select any option
    // if (!Levels[BlocklyGames.LEVEL].isMapOptions && !isDef($('input[name="optionRadio"]:checked').val())) {
    //     var fail = document.createElement('div');
    //     fail.className = "failText";
    //     fail.innerHTML = '你還沒選擇任何答案喔！請在左下角選項中選擇一個答案再按送出。<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" style="background-color: #ffa400; border: 1px solid #ffa400" onclick="BlocklyDialogs.hideDialog(true)">' + BlocklyGames.getMsg('Games_dialogOk') + '</button></div>';

    //     var style = {
    //         width: '50%',
    //         left: '25%',
    //         top: '5em'
    //     };
    //     BlocklyDialogs.showDialog(fail, null, false, true, style,
    //         BlocklyDialogs.stopDialogKeyDown);
    //     return;
    //     // player selects an option, run the given program and check if it is the correct one
    // } else if (Levels[BlocklyGames.LEVEL].isMapOptions && Game.selectedGrid == undefined) {
    //     var fail = document.createElement('div');
    //     fail.className = "failText";
    //     fail.innerHTML = '你還沒選擇任何答案喔！請在地圖上點選一個位置再按送出。<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" style="background-color: #ffa400; border: 1px solid #ffa400" onclick="BlocklyDialogs.hideDialog(true)">' + BlocklyGames.getMsg('Games_dialogOk') + '</button></div>';

    //     var style = {
    //         width: '50%',
    //         left: '25%',
    //         top: '5em'
    //     };
    //     BlocklyDialogs.showDialog(fail, null, false, true, style,
    //         BlocklyDialogs.stopDialogKeyDown);
    //     return;
    // } else {
    // BlocklyDialogs.hideDialog(false);
    // Game.reset();
    // BlocklyInterface.highlight('When_Run');
    // Game.play('start', 0.3);

    // // start animation after start sound played
    // setTimeout(function() { Scope.execute(); }, 600)
    // }
}

/**
 * Initialize Blockly and the game.
 */
window.addEventListener('load', Scope.init);