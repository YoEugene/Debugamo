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
        scale: 0.9,
        ground: "grass.default",
        grndColor: "#e2ffef",
        mapSize: 5,
        robot: {
            position: [1, 1],
            img: 'robot2',
            grab: []
        },
        specialGrndInd: [
            [3, 0],
            [4, 1],
            [0, 4]
        ],
        specialGrndName: ['dirt.default', 'dirt.default', 'cobblestone.default'],
        thingsInd: [
            [4, 4]
        ],
        thingsName: ['kitten.default'],
        missionGuideDescription: [
            'OK，讓我們開始吧！在每一關右下方的區域，我會提供你一些開頭的程式積木，但是由於我的程式晶片有一部分損壞了，我會需要你幫我找出並修改錯誤的程式積木。',
            '你可以自由修改、新增、刪除等一下看到的程式積木～過程中應該會有一些線索協助你學會怎麼使用它們！',
            '請確保你在每一關的開始都有閱讀左下角的「關卡目標」，並且用「運行」按鈕執行看看最初的程式，理解它們如何運作，以及找出出錯的地方。',
            '看起來這關的目標是要<span class="uk-text-primary">將我移動到小貓的位置</span>，請點左方的「運行」按鈕看看結果如何，再點選右邊的積木區開始編輯！'
        ],
        goals: [
            '確保 DeMo.位置 == Kitten.位置',
        ],
        // Solution
        // defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="Move_Robot" id="Move_Robot" x="148" y="71"><field name="DIRECTION">Right</field><field name="NUM_OF_MOVE">4</field><next><block type="Move_Robot" id="-12TWtq26}36_UOl}F_o"><field name="DIRECTION">Down</field><field name="NUM_OF_MOVE">3</field></block></next></block></xml>',
        defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="KH9.+kbWIVR]2ZDfSwgp">kitten.default</variable></variables><block type="Move_Robot" id="Move_Robot" x="215" y="99"><field name="DIRECTION">Up</field><field name="NUM_OF_MOVE">1</field><next><block type="Move_Robot" id="79oj:O7Es6w8P,H#jE]V"><field name="DIRECTION">Right</field><field name="NUM_OF_MOVE">5</field><next><block type="Move_Robot" id="D)#Tr3t+DgiM0}|(1=E4"><field name="DIRECTION">Down</field><field name="NUM_OF_MOVE">4</field><next><block type="Move_Robot" id="k8ZdWbFXIEvh$o^nV}Ih"><field name="DIRECTION">Left</field><field name="NUM_OF_MOVE">3</field></block></next></block></next></block></next></block></xml>',
        checkLevelComplete: function() {
            var robotPos = Debugging.Game.getThingPos('robot');
            if (robotPos[0] !== 4 || robotPos[1] !== 4) {
                $($('#goal-list').find('li')[0]).addClass('fail');
                throw Game.levelFailedMessage('Debugging_msg_noGoal');
            }
            $($('#goal-list').find('li')[0]).addClass('success');
            return true;
        },
    }, {
        categoryIds: ['Debugamo'],
        blockIds: ["Move_Robot", "Robot_Grab", "Robot_Drop"],
        scale: 1,
        ground: "grass.default",
        grndColor: "#e2ffef",
        mapSize: 5,
        robot: { position: [4, 2], img: "robot2", grab: [] },
        specialGrndInd: [
            [3, 0],
            [2, 1],
            [3, 1]
        ],
        specialGrndName: ['dirt.default', 'dirt.default', 'dirt.default'],
        thingsInd: [
            [4, 4],
            [0, 1],
            [3, 1],
            [1, 3]
        ],
        thingsName: ['basket.default', 'bucket.default','goop.default', 'puppy.default'],
        missionGuideDescription: [
            "Ok, 看來這裡需要清理一下，把東西放到該放的位置。", 
            "透過「拿起」積木我可以將地上的東西拿起，移動到另一個地方，再用「放下」積木來放下那個東西。", 
            "呼叫主人～<br>請幫我修改錯誤的積木，讓我能將<span class='uk-text-primary'>小狗移到籃子裡頭</span>，再把<span class='uk-text-primary'>黏液移到桶子裡頭</span>。"
        ],
        goals: [
            '確保 小狗.位置 == 籃子.位置',
            '確保 黏液.位置 == 桶子.位置',
        ],
        // Solution
        // defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="Move_Robot" id="Move_Robot" x="104" y="61"><field name="DIRECTION">Left</field><field name="NUM_OF_MOVE">1</field><next><block type="Move_Robot" id="=e]0@mA:a{G2HG(aRi|}"><field name="DIRECTION">Up</field><field name="NUM_OF_MOVE">1</field><next><block type="Robot_Grab" id="Robot_Grab"><field name="GRAB_NAME">goop.default</field><next><block type="Move_Robot" id="r-,XAc81^%tDy_mAvdeB"><field name="DIRECTION">Left</field><field name="NUM_OF_MOVE">3</field><next><block type="Robot_Drop" id="Robot_Drop"><field name="DROP_NAME">goop.default</field><next><block type="Move_Robot" id="%@,_ky_D*N.x!.lgY]5/"><field name="DIRECTION">Down</field><field name="NUM_OF_MOVE">2</field><next><block type="Move_Robot" id="@Rvm_z=7^QSy^wdu^tRV"><field name="DIRECTION">Right</field><field name="NUM_OF_MOVE">1</field><next><block type="Robot_Grab" id="e#lIQpaM_p*1,6aTlGOz"><field name="GRAB_NAME">puppy.default</field><next><block type="Move_Robot" id="~@^7eLqM$W$)?omul;)K"><field name="DIRECTION">Right</field><field name="NUM_OF_MOVE">3</field><next><block type="Move_Robot" id="/(mS~e,PcXvp3XWMzgUe"><field name="DIRECTION">Down</field><field name="NUM_OF_MOVE">1</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>',
        defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="wo.K=RW/{|4|09+)i}lk">goop.default</variable><variable type="" id="O#uJ/I3vC?f.j]oz-G,p">puppy.default</variable><variable type="" id="g.cR8^x+-Brn*gz@/YZA">basket.default</variable><variable type="" id="Z#ZMAjk(+ycIbS8Z+7i|">bucket.default</variable><variable type="" id="MOxXv]9o|H!_bBelAvH6">物件名稱</variable></variables><block type="Move_Robot" id="Move_Robot" x="121" y="59"><field name="DIRECTION">Left</field><field name="NUM_OF_MOVE">1</field><next><block type="Move_Robot" id="w15uYCuF|}KDO~mK_~e5"><field name="DIRECTION">Up</field><field name="NUM_OF_MOVE">1</field><next><block type="Robot_Drop" id="Robot_Drop"><field name="DROP_NAME" id="wo.K=RW/{|4|09+)i}lk" variabletype="">goop.default</field><next><block type="Move_Robot" id=")}z8?yDk[97?|?AS9`?["><field name="DIRECTION">Down</field><field name="NUM_OF_MOVE">3</field><next><block type="Move_Robot" id="X%hjA$lErio$o?F09d}."><field name="DIRECTION">Left</field><field name="NUM_OF_MOVE">1</field><next><block type="Robot_Grab" id="Robot_Grab"><field name="GRAB_NAME" id="O#uJ/I3vC?f.j]oz-G,p" variabletype="">puppy.default</field><next><block type="Move_Robot" id="sh=l(;6d.T!)qrXrR@6a"><field name="DIRECTION">Left</field><field name="NUM_OF_MOVE">2</field><next><block type="Move_Robot" id="r6^M~UT5)BB6YFm1b?jR"><field name="DIRECTION">Up</field><field name="NUM_OF_MOVE">3</field><next><block type="Robot_Grab" id="ciTFJI7gOqUH^wgxP1xE"><field name="GRAB_NAME" id="wo.K=RW/{|4|09+)i}lk" variabletype="">goop.default</field><next><block type="Move_Robot" id="YJUNF^b5|eA]7xEFLPX)"><field name="DIRECTION">Right</field><field name="NUM_OF_MOVE">4</field><next><block type="Robot_Drop" id="]fI[F[O2r$qYXrMX`00d"><field name="DROP_NAME" id="O#uJ/I3vC?f.j]oz-G,p" variabletype="">puppy.default</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>',
        checkLevelComplete: function() {
            var robotPos = Debugging.Game.getThingPos('robot');
            var bucketPos = Debugging.Game.getThingPos('bucket.default');
            var goopPos = Debugging.Game.getThingPos('goop.default');
            var puppyPos = Debugging.Game.getThingPos('puppy.default');
            var basketPos = Debugging.Game.getThingPos('basket.default');

            if (puppyPos[0] !== basketPos[0] || puppyPos[1] !== basketPos[1]) {
                $($('#goal-list').find('li')[0]).addClass('fail');
                throw Game.levelFailedMessage('Debugging_msg_noGoal');
            }
            $($('#goal-list').find('li')[0]).addClass('success');

            if (goopPos[0] !== bucketPos[0] || goopPos[1] !== bucketPos[1]) {
                $($('#goal-list').find('li')[1]).addClass('fail');
                throw Game.levelFailedMessage('Debugging_msg_noGoal');
            }
            $($('#goal-list').find('li')[1]).addClass('success');

            return true;
        }
    }, {
        categoryIds: [],
        blockIds: ["Move_Robot", "Robot_Grab", "Robot_Drop"],
        scale: 0.9,
        ground: "grass.default",
        grndColor: "#e2ffef",
        mapSize: 9,
        robot: {position:[3,3],img:"robot1"},
        specialGrndInd: [],
        specialGrndName: [],
        thingsInd: [],
        thingsName: [],
        missionGuideDescription: [],
        goals: [],
        defaultBlocks: "",
        checkLevelComplete: function(){}
    },
    // //////////////////// LEVEL TEMPLATE ////////////////////
    // {
    //  categoryIds: [],
    //  blockIds: [""],
    //  scale: 0.9,
    //  ground: "",
    //  grndColor: "",
    //  mapSize: 3,
    //  robot: {position:[],img:""},
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