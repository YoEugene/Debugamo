![Blockly Games](https://raw.githubusercontent.com/wiki/google/blockly-games/title.png)

Google's Blockly Games is a series of educational games that teach programming.
It is based on the [Blockly](https://developers.google.com/blockly/) library.
All code is free and open source.

**The games are at https://blockly-games.appspot.com/**

**The developer's site is at https://github.com/google/blockly-games/wiki**

# Development

## 基本開發流程
* 官方wiki(務必閱讀Build的部分): https://github.com/google/blockly-games/wiki
* Getting Started
    * 安裝google cloud SDK
    * fork and clone blockly games
    * $ cd blockly-games; make maze-en
        * 這樣會壓縮maze-en的code進到用來serve的compressed.js
    * $ cd appengine; dev_appserver.py app.yaml
        * 這一行是啟動localhost的server
        * 如果出現 `ImportError: No module named 'setup'` ，可能是python版本錯誤的關係，預設的`python`指令必須是 python 2 而不是 python 3
    * go to http://localhost:8080/
* Config
    * 設定 Debug mode (這樣會直接serve uncompressed js file 就不用每改一點就要壓縮一次)
        * go to http://localhost:8080/dubug
        * check "Use slow uncompressed code. (Hackers only.)"
* Deploy to Google Cloud
    * $ cd appengine
    * $ gcloud app deploy

## 被修改的blockly-games的code，最好之後能改回來
* appengine/js/lib-dialogs.js:351
    * Add `* @suppress {checkVars}`
* appengine/js/lib-interface.js:42
    * Add `* @suppress {checkVars}`
* appengine/js/lib-games.js:182
* appengine/genetics/js/blocks.js:405
    * Add `* @suppress {checkVars}`
* appengine/common/boot.js
    * line 64-73: change false to true
    * to make debug mode default
    * Problem: 在非debug mode會讀取compressed.js，在壓縮時會把變數和物件屬性名稱改掉，造成以下bug:
        * `Uncaught Error: Error when registering mutator "controls_if_mutator": missing required property "domToMutation"`
* appengine/third-party/blockly/blocks/text.js
    * line 30: add `goog.require('Blockly');`
    * to fix Uncaught TypeError: Blockly.defineBlocksWithJsonArray is not a function
* appengine/js/lib-games.js:332
    * original:
        ```js
        el.addEventListener('click', func, true);
        el.addEventListener('touchend', func, true);
        ```
    * editted: remove both ", true"
    * reason: change capture to bubble: https://javascript.info/bubbling-and-capturing




## Maze
* 每次進入新關卡時，會透過url傳入level，maze.js裡會根據level拿相應的地圖和設置
* 每一關能用哪些block是在哪裡定義的？
    * appengine/maze/template.soy 的最下面 Toolboxes for each level
* 新增積木的方法
    * 在`block.js`增加 block 的定義，其中message0: BlocklyGames.getMsg('Maze_moveForward'), 的 'Maze_moveForward' 是在 `template.soy` 的 {template .messages} 定義的，而文字是在 `en.json`, `zh-hant.json`, ... 裡面定義的
    * block 的 code對應的function是定義在 maze.js 裡，例如

    ```
    Maze.move = function(direction, id) {
        ...
    };
    ```

    最後還要用以下的code來inject到global scope

    ```
    Maze.initInterpreter = function(interpreter, scope) {
        // API
        var wrapper;
        wrapper = function(id) {
            Maze.move(0, id.toString());
        };
        interpreter.setProperty(scope, 'moveForward',
            interpreter.createNativeFunction(wrapper));
        ...
    }
    ```

* Blockly Games有預設每個課程的關卡上限是10，這是在 `lib-games.js` 裡的 `BlocklyGames.MAX_LEVEL = 10;` 定義的，可修改

## Duplicate 遊戲
* 步驟：
    * 先建立一個空殼 appengine/xxx.html
    * 把空殼中的 <body> 中要用到的files放在 appengine/xxx/yyy （可以複製現有的，例如index, maze, pond）
    * 寫 Makefile
        * Edit USER_APPS, ALL_JSON, ALL_TEMPLATES
        * Add xxx-en (可加可不加，加了可以單獨測試英文版的xxx)
    * 修改 appengine/xxx/template.soy 的 Namespace （例如 Index.soy） 等
    * 修改 appengine/xxx/js/xxx.js

## 創建新遊戲
* **重要** template裡面的註解會作為SoyDoc，一定要加
    ```
    /**
    * Web page structure.
    */
    {template .start}
    ```

## 執行blockly code
* Note: Maze 裡面的 initInterpreter 裡面的wrapper，貌似是把像 moveForward() 這樣原本沒定義的global function 連結到(轉換？) Maze.move(0, id.toString()); 所以當 execute moveForward 的時候就會執行 Maze.move(0, id.toString()) ，但像是if, else, while 就不需要做這層轉換
* https://developers.google.com/blockly/guides/app-integration/running-javascript
* interpreter 似乎不支援window, console


## Template.soy
* 在template.soy的開頭會寫 `{namespace Maze.soy}` 代表建立了 Maze.soy 這個namespace
* 會在 maze.js 裡面用 goog.require('Maze.soy'); 來引入 template.soy的東西
* 似乎是template.soy先轉換成js code再被 maze.js require

## Trivial Notes
* 為了i18n, block的文字不直接定義在js裡，而是用一個key，然後在Template.soy裡面定義key對應到en.json裡的文字

## i18n
* Google Closure Template 的 translation/localization/i18n 的基本運作方式
    * 詳細請參考 https://developers.google.com/closure/templates/docs/translation
    * steps:
        1. 在 .soy file 中把要翻譯的字用{msg}包住，被包住的字應該要是預設語言（例如英文）顯示的文字
            * 例如 `{msg meaning="Maze.moveForward" desc="block text - Imperative or infinitive of a verb for a person moving (walking) in the direction he/she is facing."}move forward{/msg}`
        2. 用 SoyMsgExtractor.jar 將所有 msg 抽取出來成為 extracted_msgs.xlf 檔案
        3. 將 .xlf 翻譯後存成 translated_extracted_msgs.xlf 檔案
        4. 用 SoyToJsSrcCompiler.jar 讀取 translated_extracted_msgs.xlf 及原本的 .soy file，輸出翻譯後的 .js 檔案

* blockly-games 裡的 translation/localization/i18n 的運作方式
    * 基本跟前述的差不多，差別是在這裡我們會把 extracted_msgs.xlf 再轉換成 .json，然後翻譯這個 json file，然後讀取翻譯好的 json file 和 template.soy 輸出成 soy.js。
    * 我們可以跳過 extract msg 的步驟，直接寫翻譯好的 json 然後讀取即可。
    * 可以看看 Makefile 的 shop-zh 怎麼寫
    * 注意 json/en.json 預設是會被覆蓋掉的，因為 template.soy 裡面的 msg 寫的就是英文，所以不必修改 json/en.json
    *
    * steps: (make shop-zh)
        1. 抽取 msg 並輸出成 json/en.json, json/keys.json, json/qqq.json (descriptions)
            ```
            $(SOY_EXTRACTOR) --outputFile extracted_msgs.xlf --srcs $(ALL_TEMPLATES)
	        i18n/xliff_to_json.py --xlf extracted_msgs.xlf --templates $(ALL_TEMPLATES)
            ```
        2. 把 json 轉換回 xlf 並用於 template.soy ，輸出 appengine/shop/generated/zh-hant/msg.js and soy.js
            `i18n/json_to_js.py --path_to_jar third-party --output_dir appengine/$(APP)/generated --template $(TEMPLATE) --key_file json/keys.json json/$(LANG).json`
        3. 壓縮 js
            `python build-app.py $(APP) $(LANG)`

* 自定義的 block 內文字 的 i18n 方法
    * 總之必須靠 template.soy 銜接 blocks.js and en.json (or zh-hant.json)
    * 看原作的template.soy怎麼寫就跟著寫即可
    * steps:
        1. 在 json/<language>.json 定義文字
            例如在 `json/zh-hant.json` 加入 `"DrinkShop.getNewCup": "拿取杯子",`
        2. 在template.soy 開一個 messages 區塊，引入 xx.json 裡的key ，並寫下英文版的正確用語
            例如在 `appengine/shop/template.soy` 加入
            ```
            {template .messages}
                {call BlocklyGames.soy.messages /}
                <div style="display: none">
                    <span id="DrinkShop_getNewCup">{msg meaning="DrinkShop.getNewCup" desc="block text - robot get a cup"}get a cup{/msg}</span>
                    <span id="DrinkShop_fillCup">{msg meaning="DrinkShop.fillCup" desc="block text"}fill the cup{/msg}</span>
                    <span id="DrinkShop_coverCup">{msg meaning="DrinkShop.coverCup" desc="block test"}cover the cup{/msg}</span>
                </div>
            {/template}
            ```
        3. 在blocks.js裡抓取 template.soy 裡面的message 的 span 的 id

* /appengine/third-party/msg/js/xx.js: 通用block內部顯示的文字
    * e.g. ```Blockly.Msg.CONTROLS_REPEAT_TITLE = "repeat %1 times";```
* /appengine/third-party/msg/json/xx.json: 通用block的tooltip
    * e.g.
    ```js
    {
        ...
    	"CONTROLS_REPEAT_HELPURL": "https://en.wikipedia.org/wiki/For_loop",
	    "CONTROLS_REPEAT_TITLE": "repeat %1 times",
        "CONTROLS_REPEAT_TOOLTIP": "Do some statements several times.",
        ...
    }
    ```
## 使用通用blocks
* 以使用loops相關的blocks為例，在我們的 `blocks.js` 裡加入以下兩行
    ```js
    goog.require('Blockly.Blocks.loops');
    goog.require('Blockly.JavaScript.loops');
    ```
    其中， `Blockly.JavaScript.loops` 是 `code generator` 用來把 block 轉換成 JavaScript code。
    定義在 `third-part/blockly/generators/javascript`。

## Toolbox (Blocks)
* 基本結構
    ```
    {template .toolbox}
        <xml id="toolbox" style="display: none;">
            <block type="test_helloWorld"></block>
        </xml>
    {/template}
    ```
* root層級不可同時有category和block

## 進入下一關的方法：
* 正常的關卡進入下一關的方法：
    1. 在 `<game>.js` 裡面呼叫 `BlocklyDialogs.congratulation` (in `lib-dialogs.js`)
    2. 在恭喜畫面按 OK 會呼叫 BlocklyInterface.nextLevel (in `lib-interface.js`)
* Maze 裡面 BlocklyInterface.nextLevel 有被重新定義，為了配合 skin 的指定
* Maze 裡面，執行code時，會把動作 push 進 Maze.log 裡，然後在 Maze.animate 裡根據 log 來做事，包含跳出恭喜畫面。

## 儲存 blocks
* 在過關時執行以下code
    ```js
    BlocklyInterface.saveToLocalStorage();
    ```
* template.soy 裡面必須有
    ```
    {call BlocklyGames.soy.dialog /}
    {call BlocklyGames.soy.doneDialog /}
    {call BlocklyGames.soy.abortDialog /}
    {call BlocklyGames.soy.storageDialog /}
    ```

## 讀取 blocks
* 在關卡 init 時執行以下code
    ```js
    var defaultXml = '';
    BlocklyInterface.loadBlocks(defaultXml, false);
    ```
    可以從local storage拿積木

## js interpreter
* [JS-Interpreter Documentation](https://neil.fraser.name/software/JS-Interpreter/docs.html)
* 將 function 變為 interpreter 內 global 的方法：
    * 直接綁定
        `interpreter.setProperty(scope, 'getNewCup', interpreter.createNativeFunction(Scope.Game.robot.getNewCup));`
    * 包成新function後綁定
        ```
        var wrapper

        wrapper = function(id) {
            Maze.move(0, id.toString());
        };
        interpreter.setProperty(scope, 'moveForward',
            interpreter.createNativeFunction(wrapper));
        ```
## Animation
### Maze的動畫的原理
* 先用 js interpreter 跑過 code，跑的途中把動作及block id記錄下來（push進Maze.log = []）
* 用 SetTimeout 依序讀取 Maze.log ，做出對應的動作，並 highlight block (用積木id)

### realtime的執行及動畫
* 用 setTimeout interpreter.step()

# Debug

* browser console: `Uncaught Error: Error when registering mutator "controls_if_mutator": missing required property "domToMutation"`
    * 只要用dubug mode即可
    * 原因請參考本文件中 `被修改的blockly-games的code` 的部分
* `Uncaught TypeError: Blockly.defineBlocksWithJsonArray is not a function at text.js:43`
    * add `goog.require('Blockly');` in appengine/third-party/blockly/blocks/text.js :line 30
    * make the app again


# Docs
* [JS-Interpreter Documentation](https://neil.fraser.name/software/JS-Interpreter/docs.html)


# Problems to Solve
* 如何讓通用的積木定義一次，就能被各個頁面存取，例如if
* 如何動態載入需要的積木，而不是寫死在template.soy裡
* 如何把generator隔離開，並支援多種語言（執行時還是用JavaScript，但也許能compile成Python讓學生學習）

# TODO
* toolbox的內容寫在 js 裡，不寫在template.soy裡
* 帳號系統
* Code 儲存
* UI animation
* UI.workspace.cup, UI.workspace.cupCap, ...
* UI: serve cup to customer
* 在block tooltip顯示動作的耗時


# Done
* 總之先把各種積木嵌進去，別管code漂不漂亮
* 嘗試讓積木可以寫在一個地方，並被多個關卡或遊戲存取

# Production
* 注意要換回compressed mode (not debug mode)
* 可以直接禁止debug mode
* 目前shop/js 之下的東西都是可以直接 access的，之後換回compressed mode 後要禁止。在app.yaml設定
