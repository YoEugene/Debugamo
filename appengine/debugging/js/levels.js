/**
 * 遊戲每一關 UI 設定區
 */

// 每一關的地圖、物件等設定 (UI相關)

goog.provide('Debugging.Levels');

var Levels = Debugging.Levels;

Levels = [
    // skip 0 index for better level comprehension  (e.g. Levels[1] = config for level 1)
    undefined,
    // Chap.1 - Level 1: LearnMove
    {   
        categoryIds: ['Debugamo'],
        blockIds: ['Move_Robot'],
        scale: 1.3,
        ground: "wood",
        grndColor: "rgb(255, 184, 148)",
        mapSize: 5,
        robot: {
            position: [1, 1],
            state: 'default',
            grab: []
        },
        specialGrndInd: [
            [3, 0],
            [4, 1],
            [0, 4]
        ],
        specialGrndName: ['wood.crack', 'wood.crack', 'crack2'],
        thingsInd: [
            [4, 4]
        ],
        thingsName: ['kitten'],
        missionGuideDescription: [
            'OK，讓我們開始吧！在每一關右下方的區域，我會提供你一些開頭的程式積木，但是由於我的程式晶片有一部分損壞了，我會需要你幫我找出並修改錯誤的程式積木。',
            '你可以自由修改、新增、刪除等一下看到的程式積木～過程中應該會有一些線索協助你學會怎麼使用它們！',
            '請確保你在每一關的開始都有閱讀左下角的「關卡目標」，並且用「運行」按鈕執行看看最初的程式，理解它們如何運作，以及找出出錯的地方。',
            '看起來這關的目標是要<span class="uk-text-primary">將我移動到小貓（kitten）的位置</span>，請點左方的「運行」按鈕看看結果如何，再點選右邊的積木區開始編輯！'
        ],
        goals: [
            '確保 robot.位置 == kitten.位置',
        ],
        // Solution
        // defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="Move_Robot" id="Move_Robot" x="148" y="71"><field name="DIRECTION">Right</field><field name="NUM_OF_MOVE">4</field><next><block type="Move_Robot" id="-12TWtq26}36_UOl}F_o"><field name="DIRECTION">Down</field><field name="NUM_OF_MOVE">3</field></block></next></block></xml>',
        defaultBlocks: '',
        checkLevelComplete: function() {
            var robotPos = Debugging.Game.getThingPos('robot');
            if (robotPos[0] !== 4 || robotPos[1] !== 4) {
                $($('#goal-list').find('li')[0]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoal');
                return false;
            }
            $($('#goal-list').find('li')[0]).addClass('success');
            return true;
        },
    // Chap.1 - Level 2: LearnGrab/Drop
    }, {
        categoryIds: ['Debugamo'],
        blockIds: ["Move_Robot", "Robot_Grab", "Robot_Drop"],
        scale: 1.1,
        ground: "wood",
        grndColor: "rgb(255, 184, 148)",
        // grndColor: "#e2ffef",
        mapSize: 5,
        robot: { position: [4, 2], state: 'default', grab: [] },
        specialGrndInd: [
            [3, 0],
            [2, 1],
            [3, 1]
        ],
        specialGrndName: ['wood.crack', 'wood.crack', 'wood.crack'],
        thingsInd: [
            [4, 4],
            [0, 1],
            [3, 1],
            [1, 3]
        ],
        thingsName: ['basket', 'bucket','rock', 'kitten'],
        missionGuideDescription: [
            "Ok, 看來這裡需要清理一下，把東西放到該放的位置。", 
            "透過「拿起」積木我可以將地上的東西拿起，移動到另一個地方，再用「放下」積木來放下那個東西。", 
            "呼叫主人～<br>請幫我修改錯誤的積木，讓我能將<span class='uk-text-primary'>小貓（kitten）移到籃子（basket）裡頭</span>，再把<span class='uk-text-primary'>石頭（rock）移到桶子（bucket）裡頭</span>。"
        ],
        goals: [
            '確保 kitten.位置 == basket.位置',
            '確保 rock.位置 == bucket.位置',
        ],
        // Solution
        // defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="Move_Robot" id="Move_Robot" x="104" y="61"><field name="DIRECTION">Left</field><field name="NUM_OF_MOVE">1</field><next><block type="Move_Robot" id="=e]0@mA:a{G2HG(aRi|}"><field name="DIRECTION">Up</field><field name="NUM_OF_MOVE">1</field><next><block type="Robot_Grab" id="Robot_Grab"><field name="GRAB_NAME">rock</field><next><block type="Move_Robot" id="r-,XAc81^%tDy_mAvdeB"><field name="DIRECTION">Left</field><field name="NUM_OF_MOVE">3</field><next><block type="Robot_Drop" id="Robot_Drop"><field name="DROP_NAME">rock</field><next><block type="Move_Robot" id="%@,_ky_D*N.x!.lgY]5/"><field name="DIRECTION">Down</field><field name="NUM_OF_MOVE">2</field><next><block type="Move_Robot" id="@Rvm_z=7^QSy^wdu^tRV"><field name="DIRECTION">Right</field><field name="NUM_OF_MOVE">1</field><next><block type="Robot_Grab" id="e#lIQpaM_p*1,6aTlGOz"><field name="GRAB_NAME">kitten</field><next><block type="Move_Robot" id="~@^7eLqM$W$)?omul;)K"><field name="DIRECTION">Right</field><field name="NUM_OF_MOVE">3</field><next><block type="Move_Robot" id="/(mS~e,PcXvp3XWMzgUe"><field name="DIRECTION">Down</field><field name="NUM_OF_MOVE">1</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>',
        defaultBlocks: '',
        checkLevelComplete: function() {
            var robotPos = Debugging.Game.getThingPos('robot');
            var bucketPos = Debugging.Game.getThingPos('bucket');
            var rockPos = Debugging.Game.getThingPos('rock');
            var kittenPos = Debugging.Game.getThingPos('kitten');
            var basketPos = Debugging.Game.getThingPos('basket');

            if (kittenPos[0] !== basketPos[0] || kittenPos[1] !== basketPos[1]) {
                $($('#goal-list').find('li')[0]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalKitten');
                return false;
            }
            $($('#goal-list').find('li')[0]).addClass('success');

            if (rockPos[0] !== bucketPos[0] || rockPos[1] !== bucketPos[1]) {
                $($('#goal-list').find('li')[1]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalRock');
                return false;
            }
            $($('#goal-list').find('li')[1]).addClass('success');

            return true;
        }
    // Chap.2 - Level 3: LearnGoto
    }, {
        categoryIds: ['Debugamo'],
        blockIds: ["Move_Robot", "Robot_Grab", "Robot_Drop", "Robot_Goto"],
        scale: 1.1,
        ground: "wood",
        grndColor: "rgb(255, 184, 148)",
        mapSize: 5,
        robot: {position:[2,0], state: 'default', grab: []},
        specialGrndInd: [[0,1],[3,1],[4,1],[0,2],[3,2],[4,2],[0,3],[0,4],[1,4]],
        specialGrndName: ['wood.crack','wood.crack','crack2','wood.crack','crack2','crack2','crack','wood.crack','crack2'],
        thingsInd: [[1,1],[2,2],[3,2],[2,4],[4,4]],
        thingsName: ['piglet','basket','rock','kitten','bucket'],
        missionGuideDescription: [
            "糟糕了！落下的石頭（rock）開始擋住去路，我應該快點將石頭移開，並拯救出小動物。",
            "我剛想起來，我可以使用<span class='uk-text-primary'>前往積木</span>，讓我更有效率的移動到物件旁邊。",
            "試著跑跑看原始的程式積木，這關的目標是<span class='uk-text-primary'>把所有東西放到應該在的位置</span>。"
        ],
        goals: [
            '確保 kitten.位置 == basket.位置',
            '確保 piglet.位置 == basket.位置',
            '確保 rock.位置 == bucket.位置',
        ],
        defaultBlocks: '',
        checkLevelComplete: function(){
            var robotPos = Debugging.Game.getThingPos('robot');
            var bucketPos = Debugging.Game.getThingPos('bucket');
            var rockPos = Debugging.Game.getThingPos('rock');
            var kittenPos = Debugging.Game.getThingPos('kitten');
            var pigletPos = Debugging.Game.getThingPos('piglet');
            var basketPos = Debugging.Game.getThingPos('basket');

            if (kittenPos[0] !== basketPos[0] || kittenPos[1] !== basketPos[1]) {
                $($('#goal-list').find('li')[0]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalKitten');
                return false;
            }
            $($('#goal-list').find('li')[0]).addClass('success');

            if (pigletPos[0] !== basketPos[0] || pigletPos[1] !== basketPos[1]) {
                $($('#goal-list').find('li')[1]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalPiglet');
                return false;
            }
            $($('#goal-list').find('li')[1]).addClass('success');

            if (rockPos[0] !== bucketPos[0] || rockPos[1] !== bucketPos[1]) {
                $($('#goal-list').find('li')[2]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalRock');
                return false;
            }
            $($('#goal-list').find('li')[2]).addClass('success');

            return true;
        }
    // Chap.2 - Level 4: LearnList
    }, {
        categoryIds: ['Debugamo'],
        blockIds: ["Move_Robot", "Robot_Grab", "Robot_Drop", "Robot_Goto"],
        scale: 1.1,
        ground: "wood",
        grndColor: "rgb(255, 184, 148)",
        mapSize: 4,
        robot: {position:[0,0], state: 'default', grab: []},
        specialGrndInd: [[0,0],[2,0],[0,1],[1,1],[2,2],[3,2],[0,3],[2,3],[3,3]],
        specialGrndName: ['dirt','wood.crack','dirt','brick','dirt','dirt','wood.crack','dirt','brick'],
        thingsInd: [[1,1],[2,3],[3,3]],
        thingsName: ['kitten1','basket','kitten2'],
        missionGuideDescription: [
            "哦！這關有兩隻<span class='uk-text-primary'>小貓們（kittens）</span>！，每次面對有相同<span class='uk-text-primary'>名稱</span>的物件，我總是感到相當困惑。",
            "為了解決這個問題，我總是會建立一個清單叫做「kittens」（小貓們）積木，再用「第一個」與「最後一個」來分辨他們。",
            "試著跑跑看原始的積木，了解清單的用法。這關的目標是<span class='uk-text-primary'>讓小貓們都回到籃子之中</span>。"
        ],
        goals: [
            "確保 kittens.位置 == basket.位置"
        ],
        defaultBlocks: "",
        checkLevelComplete: function(){
            var robotPos = Debugging.Game.getThingPos('robot');
            var kitten1Pos = Debugging.Game.getThingPos('kitten1');
            var kitten2Pos = Debugging.Game.getThingPos('kitten2');
            var basketPos = Debugging.Game.getThingPos('basket');

            if (!(Game.isSamePosition(kitten1Pos, basketPos) && Game.isSamePosition(kitten2Pos, basketPos))) {
                $($('#goal-list').find('li')[0]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalKitten');
                return false;
            }
            $($('#goal-list').find('li')[0]).addClass('success');

            return true;
        }
    },
    // //////////////////// LEVEL TEMPLATE ////////////////////
    // {
    //  categoryIds: [],
    //  blockIds: [""],
    //  scale: 0.9,
    //  ground: "",
    //  grndColor: "",
    //  mapSize: 3,
    //  robot: {position:[], state:""},
    //  specialGrndInd: [],
    //  specialGrndName: [],
    //  thingsInd: [],
    //  thingsName: [],
    //  missionGuideDescription: [],
    //  goals: [],
    //  defaultBlocks: "",
    //  checkLevelComplete: function(){}
    // }
]