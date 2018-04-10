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
        blockIds: ['Move_Robot'],
        scale: 1.3,
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
            '迪摩：遠方傳來「喵～喵～喵～」的聲音......原來是一隻小貓！',
            '迪摩：我應該可以透過我的「移動積木」，移動到牠的位置，拯救這隻小貓。',
            '迪摩：呼叫主人，請協助我修改下方錯誤的程式積木，讓我能<span class="uk-text-primary">移動到小貓的位置</span>。<br>錯誤積木數： 1個'
        ],
        defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="Move_Robot" id="Move_Robot" x="148" y="71"><field name="DIRECTION">RIGHT</field><field name="NUM_OF_MOVE">4</field><next><block type="Move_Robot" id="-12TWtq26}36_UOl}F_o"><field name="DIRECTION">UP</field><field name="NUM_OF_MOVE">1</field></block></next></block></xml>',
        checkLevelComplete: function() {
            var robotPos = Debugging.Game.getThingPos('robot');
            if (robotPos[0] !== 4 || robotPos[1] !== 4) {
                throw Game.levelFailedMessage('Debugging_msg_noGoal');
            }
            return true;
        },
    }, {
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
        missionGuideDescription: ["迪摩：Ok, 看來這裡需要清理一下，把東西放到該放的位置。", "迪摩：透過「拿起」積木我可以將地上的東西拿起，移動到另一個地方，再用「放下」積木來放下那個東西。", "迪摩：呼叫主人～<br>請幫我修改錯誤的積木，讓我能將<span class='uk-text-primary'>小狗移到籃子裡頭</span>，再把<span class='uk-text-primary'>黏液移到桶子裡頭</span>。"],
        defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="Move_Robot" id="Move_Robot" x="104" y="61"><field name="DIRECTION">LEFT</field><field name="NUM_OF_MOVE">1</field><next><block type="Move_Robot" id="=e]0@mA:a{G2HG(aRi|}"><field name="DIRECTION">UP</field><field name="NUM_OF_MOVE">1</field><next><block type="Robot_Grab" id="Robot_Grab"><field name="GRAB_NAME">goop.default</field><next><block type="Move_Robot" id="r-,XAc81^%tDy_mAvdeB"><field name="DIRECTION">LEFT</field><field name="NUM_OF_MOVE">3</field><next><block type="Robot_Drop" id="Robot_Drop"><field name="DROP_NAME">goop.default</field><next><block type="Move_Robot" id="%@,_ky_D*N.x!.lgY]5/"><field name="DIRECTION">DOWN</field><field name="NUM_OF_MOVE">2</field><next><block type="Move_Robot" id="@Rvm_z=7^QSy^wdu^tRV"><field name="DIRECTION">RIGHT</field><field name="NUM_OF_MOVE">1</field><next><block type="Robot_Grab" id="e#lIQpaM_p*1,6aTlGOz"><field name="GRAB_NAME">puppy.default</field><next><block type="Move_Robot" id="~@^7eLqM$W$)?omul;)K"><field name="DIRECTION">RIGHT</field><field name="NUM_OF_MOVE">3</field><next><block type="Move_Robot" id="/(mS~e,PcXvp3XWMzgUe"><field name="DIRECTION">DOWN</field><field name="NUM_OF_MOVE">1</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>',
        checkLevelComplete: function() {
            var robotPos = Debugging.Game.getThingPos('robot');
            var bucketPos = Debugging.Game.getThingPos('bucket.default');
            var goopPos = Debugging.Game.getThingPos('goop.default');
            var puppyPos = Debugging.Game.getThingPos('puppy.default');
            var basketPos = Debugging.Game.getThingPos('basket.default');
            if (puppyPos[0] !== basketPos[0] || puppyPos[1] !== basketPos[1] || goopPos[0] !== bucketPos[0] || goopPos[1] !== bucketPos[1]) {
                throw Game.levelFailedMessage('Debugging_msg_noGoal');
            }
            return true;
        }
    }, {
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
        defaultBlocks: "",
        checkLevelComplete: function(){}
    },
    // //////////////////// LEVEL TEMPLATE ////////////////////
    // {
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
    //  defaultBlocks: "",
    //  checkLevelComplete: function(){}
    // }
]