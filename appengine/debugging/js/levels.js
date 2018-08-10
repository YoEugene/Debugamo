/**
 * 遊戲每一關 UI 設定區
 */

// 每一關的地圖、物件等設定 (UI相關)

goog.provide('Levels');

Levels = [
    // skip 0 index for better level comprehension  (e.g. Levels[1] = config for level 1)
    undefined,
    // Chap.1 - Level 1: LearnMove
    {   
        categoryIds: [],
        blockIds: ['Move_Robot'],
        scale: 1.3,
        ground: "wood",
        grndColor: "#fff",
        mapSize: 5,
        robot: { position: [1,1], state: 'default', grab: [] },
        specialGrndInd: [ [3,0], [4,1], [0,4]],
        specialGrndName: ['dirt', 'dirt', 'dirt'],
        thingsInd: [ [4,4] ],
        thingsName: ['kitten'],
        missionGuideDescription: [
            '主人你/妳好，讓我們開始吧！每一關開始時，下方會有一些<span class="uk-text-primary">開頭的程式積木</span>，但是由於我的程式晶片<span class="uk-text-primary">有一部分損壞了</span>，我需要你幫我<span class="uk-text-primary">找出並修改錯誤的程式積木</span>。',
            '你可以自由<span class="uk-text-primary">修改、新增、刪除</span>等一下看到的程式積木～過程中應該會有一些線索協助你學會怎麼使用它們！',
            '請確保你在每一關的開始都有閱讀左下角的<span class="uk-text-primary">「關卡目標」</span>，並且用<span class="uk-text-primary">「運行」</span>按鈕執行看看最初的程式，理解它們如何運作，以及找出出錯的地方。',
            '看起來這關的目標是要<span class="uk-text-primary">將我移動到小貓（kitten）的位置</span>，請點左方的「運行」按鈕看看結果如何，再點選右邊的積木區開始編輯！'
        ],
        goals: [
            '確保 robot.位置 == kitten.位置',
        ],
        // Solution blocks
        solutionBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="1G8/0+MAm_[Rv]cv1014">kitten</variable></variables><block type="When_Run" id="When_Run" x="73" y="43" deletable="false" movable="false"><next><block type="Move_Robot" id="Move_Robot" x="108" y="84"><field name="DIRECTION">Right</field><field name="NUM_OF_MOVE">3</field><next><block type="Move_Robot" id="4*RfZgzbkf!]z+hE30eD"><field name="DIRECTION">Down</field><field name="NUM_OF_MOVE">3</field></block></next></block></xml>',
        defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="1G8/0+MAm_[Rv]cv1014">kitten</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="73" y="43"><next><block type="Move_Robot" id="Move_Robot"><field name="DIRECTION">Right</field><field name="NUM_OF_MOVE">3</field><next><block type="Move_Robot" id="4*RfZgzbkf!]z+hE30eD"><field name="DIRECTION">Up</field><field name="NUM_OF_MOVE">3</field></block></next></block></next></block></xml>',
        checkLevelComplete: function() {
            var robotPos = Debugging.Game.getThingPos('robot');
            var kittenPos = Debugging.Game.getThingPos('kitten');
            if (!Game.isSamePosition(robotPos, kittenPos)) {
                $($('#goal-list').find('li')[0]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoal');
                return false;
            }
            $($('#goal-list').find('li')[0]).addClass('success');
            return true;
        },
    }, 
    // Chap.1 - Level 2: LearnGrab/Drop
    {
        // categoryIds: ['Debugamo'],
        categoryIds: [],
        blockIds: ["Move_Robot", "Robot_Grab", "Robot_Drop"],
        scale: 1.2,
        ground: "wood",
        grndColor: "#fff",
        // grndColor: "#e2ffef",
        mapSize: 5,
        robot: { position: [4, 2], state: 'default', grab: [] },
        specialGrndInd: [
            [3, 0],
            [2, 1],
            [3, 1]
        ],
        specialGrndName: ['dirt', 'dirt', 'dirt'],
        thingsInd: [
            // [4, 4],
            [0, 1],
            [3, 1],
            // [1, 3]
        ],
        thingsName: ['bucket','rock'],
        // thingsName: ['basket', 'bucket','rock', 'kitten'],
        missionGuideDescription: [
            "主人主人，看來這裡需要清理一下，把東西放到該放的位置。", 
            "透過<span class='uk-text-primary'>「拿起」積木</span>我可以將地上的東西拿起，移動到另一個地方，再用<span class='uk-text-primary'>「放下」積木</span>來放下那個東西。", 
            // "運行看看最初始的程式碼。<br>請幫我修改錯誤的積木，讓我能將<span class='uk-text-primary'>小貓（kitten）移到籃子（basket）裡頭</span>，再把<span class='uk-text-primary'>石頭（rock）移到桶子（bucket）裡頭</span>。"
            "運行看看最初始的程式碼。<br>請幫我修改錯誤的積木，讓我能將掉落的<span class='uk-text-primary'>石頭（rock）放到桶子（bucket）裡頭</span>。"
        ],
        goals: [
            // '確保 kitten.位置 == basket.位置',
            '確保 rock.位置 == bucket.位置',
        ],
        // Solution
        solutionBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="md3s/$}WcB@YRta,^rdb">bucket</variable><variable type="" id="Gf8N;5DP*VIJ~cF|YNLV">rock</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="110" y="74"><next><block type="Move_Robot" id="Move_Robot"><field name="DIRECTION">Left</field><field name="NUM_OF_MOVE">1</field><next><block type="Move_Robot" id=";%{Zp*TiWuZ)$P7_T~f{"><field name="DIRECTION">Up</field><field name="NUM_OF_MOVE">1</field><next><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="variables_get" id="8U,`}Asnojq}k$n4yGaD"><field name="VAR" id="Gf8N;5DP*VIJ~cF|YNLV" variabletype="">rock</field></block></value><next><block type="Move_Robot" id="~4/zlLR%#9!r45%p=*Sh"><field name="DIRECTION">Left</field><field name="NUM_OF_MOVE">3</field><next><block type="Robot_Drop" id="Robot_Drop"><value name="DROP_NAME"><block type="variables_get" id="h@wA-4xoGj,(,RJw}b8#"><field name="VAR" id="Gf8N;5DP*VIJ~cF|YNLV" variabletype="">rock</field></block></value></block></next></block></next></block></next></block></next></block></next></block></xml>',
        defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="md3s/$}WcB@YRta,^rdb">bucket</variable><variable type="" id="Gf8N;5DP*VIJ~cF|YNLV">rock</variable></variables><block type="When_Run" id="When_Run"  deletable="false" movable="false" x="110" y="74"><next><block type="Move_Robot" id="Move_Robot"><field name="DIRECTION">Left</field><field name="NUM_OF_MOVE">1</field><next><block type="Move_Robot" id=";%{Zp*TiWuZ)$P7_T~f{"><field name="DIRECTION">Up</field><field name="NUM_OF_MOVE">1</field><next><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="variables_get" id="8U,`}Asnojq}k$n4yGaD"><field name="VAR" id="Gf8N;5DP*VIJ~cF|YNLV" variabletype="">rock</field></block></value><next><block type="Move_Robot" id="~4/zlLR%#9!r45%p=*Sh"><field name="DIRECTION">Left</field><field name="NUM_OF_MOVE">2</field><next><block type="Robot_Drop" id="Robot_Drop"><value name="DROP_NAME"><block type="variables_get" id="h@wA-4xoGj,(,RJw}b8#"><field name="VAR" id="Gf8N;5DP*VIJ~cF|YNLV" variabletype="">rock</field></block></value></block></next></block></next></block></next></block></next></block></next></block></xml>',
        checkLevelComplete: function() {
            var robotPos = Debugging.Game.getThingPos('robot');
            var bucketPos = Debugging.Game.getThingPos('bucket');
            var rockPos = Debugging.Game.getThingPos('rock');
            // var kittenPos = Debugging.Game.getThingPos('kitten');
            // var basketPos = Debugging.Game.getThingPos('basket');

            // if (!Game.isSamePosition(kittenPos, basketPos)) {
                // $($('#goal-list').find('li')[0]).addClass('fail');
                // UI.showFailText('Debugging_msg_noGoalKitten');
                // return false;
            // }
            // $($('#goal-list').find('li')[0]).addClass('success');

            if (!Game.isSamePosition(rockPos, bucketPos)) {
                $($('#goal-list').find('li')[0]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalRock');
                return false;
            }
            $($('#goal-list').find('li')[0]).addClass('success');

            return true;
        }
    }, 
    // Chap.1 - Level 3: Evaluation
    {
        isEvaluation: true,
        categoryIds: [],
        // categoryIds: ['debugamo'],
        blockIds: ["Move_Robot", "Robot_Grab", "Robot_Drop"],
        scale: 1,
        ground: "wood",
        grndColor: "#fff",
        mapSize: 5,
        robot: {position:[4,2], state:"default", grab:[]},
        specialGrndInd: [[0,0], [1,0], [0,1], [1,1], [0,2]],
        specialGrndName: ['dirt','dirt','dirt','dirt','dirt'],
        thingsInd: [[0,1],[3,1],[1,3],[4,4]],
        thingsName: ['rock','bucket','basket','bird'],
        missionGuideDescription: [
            "主人主人，這一關是測驗關卡，<span class='uk-text-primary'>底下的積木無法直接編輯</span><br>底下<span class='uk-text-primary'>只有一個</span>錯誤的積木。</span>請你幫我找出錯誤的積木，<span class='uk-text-primary'>點擊它按送出</span>，我們才能開始編輯積木。",
            "我想要把<span class='uk-text-primary'>石頭放進桶子</span>，<span class='uk-text-primary'>小鳥放進籃子</span>，<span class='uk-text-primary'>迪摩自己走到 [1,2] 的位置</span>(滑鼠移到地圖上可以看位置)</span><br>你可以幫我找找，<span class='uk-text-primary'>改了哪一個積木我就可以完成任務呢</span>？"
        ],
        goals: [
            '確保 rock.位置 == bucket.位置',
            '確保 bird.位置 == basket.位置',
            '確保 robot.位置 == [1,2]'
        ],
        // put parent block latter
        answer: ["mY5]/PwK`kXYQ]gysXRr"],
        solutionBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="!3vkJYRVCkA?XP7^jCLU">rock</variable><variable type="" id="a=+p;Kh|0dx1mvMlTSzH">bucket</variable><variable type="" id="j`@Sg}.,+2Y/ehdOA@n_">basket</variable><variable type="" id="Enb?AR)55p,qg?nBPPvY">bird</variable><variable type="" id="4JY261WU,`~b!kqq:{)6">kitten</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="100" y="60"><next><block type="Move_Robot" id="Move_Robot"><field name="DIRECTION">Down</field><field name="NUM_OF_MOVE">2</field><next><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="variables_get" id="V%~i1Eh:X.vd-fqTuw6+"><field name="VAR" id="Enb?AR)55p,qg?nBPPvY" variabletype="">bird</field></block></value><next><block type="Move_Robot" id="J%}byH7tsGm[.EI5@Fn7"><field name="DIRECTION">Left</field><field name="NUM_OF_MOVE">4</field><next><block type="Move_Robot" id="}]tW2w8J|kGL$D0@P7ax"><field name="DIRECTION">Up</field><field name="NUM_OF_MOVE">3</field><next><block type="Robot_Grab" id="nH3tL|h8i`Rmd%rda`WA"><value name="GRAB_NAME"><block type="variables_get" id="Ef$:=,N1-U{#GN|s}J9R"><field name="VAR" id="!3vkJYRVCkA?XP7^jCLU" variabletype="">rock</field></block></value><next><block type="Move_Robot" id="rlUS:DK+tN|+7ITBr-#A"><field name="DIRECTION">Right</field><field name="NUM_OF_MOVE">3</field><next><block type="Robot_Drop" id="Robot_Drop"><value name="DROP_NAME"><block type="variables_get" id="?;D2I8q5XOoil(l3-btE"><field name="VAR" id="!3vkJYRVCkA?XP7^jCLU" variabletype="">rock</field></block></value><next><block type="Move_Robot" id=";/2I6rhQ$Jjdbg:1bmnx"><field name="DIRECTION">Down</field><field name="NUM_OF_MOVE">2</field><next><block type="Move_Robot" id="mY5]/PwK`kXYQ]gysXRr"><field name="DIRECTION">Left</field><field name="NUM_OF_MOVE">2</field><next><block type="Robot_Drop" id="R!$Fl.6T3]Dj}8oDRYyw"><value name="DROP_NAME"><block type="variables_get" id="6/2rhhMRS@Ga}p6$V+/c"><field name="VAR" id="Enb?AR)55p,qg?nBPPvY" variabletype="">bird</field></block></value><next><block type="Move_Robot" id="20E0ynGUm0(JW:ItoOh?"><field name="DIRECTION">Up</field><field name="NUM_OF_MOVE">1</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>',
        defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="!3vkJYRVCkA?XP7^jCLU">rock</variable><variable type="" id="a=+p;Kh|0dx1mvMlTSzH">bucket</variable><variable type="" id="j`@Sg}.,+2Y/ehdOA@n_">basket</variable><variable type="" id="Enb?AR)55p,qg?nBPPvY">bird</variable><variable type="" id="4JY261WU,`~b!kqq:{)6">kitten</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="100" y="60"><next><block type="Move_Robot" id="Move_Robot"><field name="DIRECTION">Down</field><field name="NUM_OF_MOVE">2</field><next><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="variables_get" id="V%~i1Eh:X.vd-fqTuw6+"><field name="VAR" id="Enb?AR)55p,qg?nBPPvY" variabletype="">bird</field></block></value><next><block type="Move_Robot" id="J%}byH7tsGm[.EI5@Fn7"><field name="DIRECTION">Left</field><field name="NUM_OF_MOVE">4</field><next><block type="Move_Robot" id="}]tW2w8J|kGL$D0@P7ax"><field name="DIRECTION">Up</field><field name="NUM_OF_MOVE">3</field><next><block type="Robot_Grab" id="nH3tL|h8i`Rmd%rda`WA"><value name="GRAB_NAME"><block type="variables_get" id="Ef$:=,N1-U{#GN|s}J9R"><field name="VAR" id="!3vkJYRVCkA?XP7^jCLU" variabletype="">rock</field></block></value><next><block type="Move_Robot" id="rlUS:DK+tN|+7ITBr-#A"><field name="DIRECTION">Right</field><field name="NUM_OF_MOVE">3</field><next><block type="Robot_Drop" id="Robot_Drop"><value name="DROP_NAME"><block type="variables_get" id="?;D2I8q5XOoil(l3-btE"><field name="VAR" id="!3vkJYRVCkA?XP7^jCLU" variabletype="">rock</field></block></value><next><block type="Move_Robot" id=";/2I6rhQ$Jjdbg:1bmnx"><field name="DIRECTION">Down</field><field name="NUM_OF_MOVE">2</field><next><block type="Move_Robot" id="mY5]/PwK`kXYQ]gysXRr"><field name="DIRECTION">Left</field><field name="NUM_OF_MOVE">1</field><next><block type="Robot_Drop" id="R!$Fl.6T3]Dj}8oDRYyw"><value name="DROP_NAME"><block type="variables_get" id="6/2rhhMRS@Ga}p6$V+/c"><field name="VAR" id="Enb?AR)55p,qg?nBPPvY" variabletype="">bird</field></block></value><next><block type="Move_Robot" id="20E0ynGUm0(JW:ItoOh?"><field name="DIRECTION">Up</field><field name="NUM_OF_MOVE">1</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>',
        checkLevelComplete: function(){
            var robotPos = Debugging.Game.getThingPos('robot');
            var bucketPos = Debugging.Game.getThingPos('bucket');
            var rockPos = Debugging.Game.getThingPos('rock');
            var basketPos = Debugging.Game.getThingPos('basket');
            var birdPos = Debugging.Game.getThingPos('bird');

            if (!Game.isSamePosition(rockPos, bucketPos)) {
                $($('#goal-list').find('li')[0]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalRock');
                return false;
            }
            $($('#goal-list').find('li')[0]).addClass('success');

            if (!Game.isSamePosition(birdPos, basketPos)) {
                $($('#goal-list').find('li')[1]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalBird');
                return false;
            }
            $($('#goal-list').find('li')[1]).addClass('success');

            if (!Game.isSamePosition(robotPos, [1,2])) {
                $($('#goal-list').find('li')[2]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoal');
                return false;
            }
            $($('#goal-list').find('li')[2]).addClass('success');

            return true;
        }
    }, 
    // Chap.2 - Level 4: LearnGoto
    {
        categoryIds: [],
        // categoryIds: [],
        blockIds: ["Move_Robot", "Robot_Goto", "Robot_Grab", "Robot_Drop"],
        scale: 1,
        ground: "wood",
        grndColor: "#fff",
        mapSize: 5,
        robot: {position:[2,0], state: 'default', grab: []},
        specialGrndInd: [[0,1],[3,1],[4,1],[0,2],[3,2],[4,2],[0,3],[0,4],[1,4],[2,4]],
        specialGrndName: ['dirt','dirt','dirt','cobblestone','dirt','dirt','dirt','cobblestone','dirt', 'cobblestone'],
        // thingsInd: [[1,1],[2,2],[3,2],[2,4],[4,4]],
        thingsInd: [[2,2],[3,2],[2,4],[4,4]],
        // thingsName: ['piglet','basket','rock','kitten','bucket'],
        thingsName: ['basket','rock','kitten','bucket'],
        missionGuideDescription: [
            "主人主人，糟糕了！落下的石頭（rock）開始擋住去路，我應該快點<span class='uk-text-primary'>將石頭移開</span>，並將<span class='uk-text-primary'>小動物移到安全的位置</span>。",
            "我剛想起來，我可以使用<span class='uk-text-primary'>前往積木</span>，讓我更有效率的移動到物件旁邊。",
            "試著跑跑看原始的程式積木，這關的目標是<span class='uk-text-primary'>讓所有東西回到應該在的位置(看左下關卡目標)</span>。"
        ],
        goals: [
            '確保 kitten.位置 == basket.位置',
            // '確保 piglet.位置 == basket.位置',
            '確保 rock.位置 == bucket.位置',
            '確保 robot.位置 == [2, 0]',
        ],
        // Solution
        solutionBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="IY|8Bjmna/R[M5ju|2Q^">piglet</variable><variable type="" id="C*`JJ[d[-$;6=Yi=VjiB">basket</variable><variable type="" id="WYvoA(@/FzNI#)gd{O$e">rock</variable><variable type="" id="PO3wj]bmjv48M0.QmRcn">kitten</variable><variable type="" id="L)4r,7zHA`h^U.9pzKKI">bucket</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="73" y="43"><next><block type="Robot_Goto" id="Robot_Goto"><value name="GOTO_NAME"><block type="variables_get" id="7:^qa[Rc!N?+3k-6hyas"><field name="VAR" id="WYvoA(@/FzNI#)gd{O$e" variabletype="">rock</field></block></value><next><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="variables_get" id="X{4gZciS3a8a?lu!TGCV"><field name="VAR" id="WYvoA(@/FzNI#)gd{O$e" variabletype="">rock</field></block></value><next><block type="Robot_Goto" id="wp7aJjd(-jUZ{_Kd1?IQ"><value name="GOTO_NAME"><block type="variables_get" id="((HYXB-?BeL!~MF;F6!#"><field name="VAR" id="L)4r,7zHA`h^U.9pzKKI" variabletype="">bucket</field></block></value><next><block type="Robot_Drop" id="Robot_Drop"><value name="DROP_NAME"><block type="variables_get" id="h]fcD`qLx#*s-H`h7hW/"><field name="VAR" id="WYvoA(@/FzNI#)gd{O$e" variabletype="">rock</field></block></value><next><block type="Robot_Goto" id="#DN05|-W+NT,Us;#69b="><value name="GOTO_NAME"><block type="variables_get" id="9,s45O*Q^|LdGz2V[R8;"><field name="VAR" id="PO3wj]bmjv48M0.QmRcn" variabletype="">kitten</field></block></value><next><block type="Robot_Grab" id="VP7!dMnicZIk_89gN)Kc"><value name="GRAB_NAME"><block type="variables_get" id="jK}HtrFGRmI-HdyrB|gO"><field name="VAR" id="PO3wj]bmjv48M0.QmRcn" variabletype="">kitten</field></block></value><next><block type="Robot_Goto" id="a;;~Hwa|pl?ozhAPKcWK"><value name="GOTO_NAME"><block type="variables_get" id="t!MRY;O+hT1$qqG$qqRa"><field name="VAR" id="C*`JJ[d[-$;6=Yi=VjiB" variabletype="">basket</field></block></value><next><block type="Robot_Drop" id="MDT^ZXvf%HsJ{nfZ,;MB"><value name="DROP_NAME"><block type="variables_get" id="#:`t,Wd|ll4mX(qx6o@n"><field name="VAR" id="PO3wj]bmjv48M0.QmRcn" variabletype="">kitten</field></block></value><next><block type="Move_Robot" id="Move_Robot"><field name="DIRECTION">Up</field><field name="NUM_OF_MOVE">2</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>',
        defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="IY|8Bjmna/R[M5ju|2Q^">piglet</variable><variable type="" id="C*`JJ[d[-$;6=Yi=VjiB">basket</variable><variable type="" id="WYvoA(@/FzNI#)gd{O$e">rock</variable><variable type="" id="PO3wj]bmjv48M0.QmRcn">kitten</variable><variable type="" id="L)4r,7zHA`h^U.9pzKKI">bucket</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="73" y="43"><next><block type="Robot_Goto" id="Robot_Goto"><value name="GOTO_NAME"><block type="variables_get" id="7:^qa[Rc!N?+3k-6hyas"><field name="VAR" id="WYvoA(@/FzNI#)gd{O$e" variabletype="">rock</field></block></value><next><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="variables_get" id="X{4gZciS3a8a?lu!TGCV"><field name="VAR" id="WYvoA(@/FzNI#)gd{O$e" variabletype="">rock</field></block></value><next><block type="Robot_Goto" id="wp7aJjd(-jUZ{_Kd1?IQ"><value name="GOTO_NAME"><block type="variables_get" id="((HYXB-?BeL!~MF;F6!#"><field name="VAR" id="L)4r,7zHA`h^U.9pzKKI" variabletype="">bucket</field></block></value><next><block type="Robot_Drop" id="Robot_Drop"><value name="DROP_NAME"><block type="variables_get" id="h]fcD`qLx#*s-H`h7hW/"><field name="VAR" id="WYvoA(@/FzNI#)gd{O$e" variabletype="">rock</field></block></value><next><block type="Robot_Goto" id="#DN05|-W+NT,Us;#69b="><value name="GOTO_NAME"><block type="variables_get" id="9,s45O*Q^|LdGz2V[R8;"><field name="VAR" id="PO3wj]bmjv48M0.QmRcn" variabletype="">kitten</field></block></value><next><block type="Robot_Grab" id="VP7!dMnicZIk_89gN)Kc"><value name="GRAB_NAME"><block type="variables_get" id="jK}HtrFGRmI-HdyrB|gO"><field name="VAR" id="PO3wj]bmjv48M0.QmRcn" variabletype="">kitten</field></block></value><next><block type="Robot_Goto" id="a;;~Hwa|pl?ozhAPKcWK"><value name="GOTO_NAME"><block type="variables_get" id="t!MRY;O+hT1$qqG$qqRa"><field name="VAR" id="C*`JJ[d[-$;6=Yi=VjiB" variabletype="">basket</field></block></value><next><block type="Robot_Drop" id="MDT^ZXvf%HsJ{nfZ,;MB"><value name="DROP_NAME"><block type="variables_get" id="#:`t,Wd|ll4mX(qx6o@n"><field name="VAR" id="C*`JJ[d[-$;6=Yi=VjiB" variabletype="">basket</field></block></value><next><block type="Move_Robot" id="Move_Robot"><field name="DIRECTION">Up</field><field name="NUM_OF_MOVE">2</field></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>',
        checkLevelComplete: function(){
            var robotPos = Debugging.Game.getThingPos('robot');
            var bucketPos = Debugging.Game.getThingPos('bucket');
            var rockPos = Debugging.Game.getThingPos('rock');
            var kittenPos = Debugging.Game.getThingPos('kitten');
            // var pigletPos = Debugging.Game.getThingPos('piglet');
            var basketPos = Debugging.Game.getThingPos('basket');

            if (!Game.isSamePosition(kittenPos, basketPos)) {
                $($('#goal-list').find('li')[0]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalKitten');
                return false;
            }
            $($('#goal-list').find('li')[0]).addClass('success');

            // if (!Game.isSamePosition(pigletPos, basketPos)) {
            //     $($('#goal-list').find('li')[1]).addClass('fail');
            //     UI.showFailText('Debugging_msg_noGoalPiglet');
            //     return false;
            // }
            // $($('#goal-list').find('li')[1]).addClass('success');

            if (!Game.isSamePosition(rockPos, bucketPos)) {
                $($('#goal-list').find('li')[1]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalRock');
                return false;
            }
            $($('#goal-list').find('li')[1]).addClass('success');

            if (!Game.isSamePosition(robotPos, [2,0])) {
                $($('#goal-list').find('li')[2]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoal');
                return false;
            }
            $($('#goal-list').find('li')[2]).addClass('success');

            return true;
        }
    }, 
    // Chap.2 - Level 5: LearnList
    {
        categoryIds: [],
        // categoryIds: [],
        blockIds: ["Move_Robot", "Robot_Grab", "Robot_Drop", "Robot_Goto", "lists_getIndexSimple"],
        scale: 0.9,
        ground: "wood",
        grndColor: "#fff",
        mapSize: 4,
        robot: {position:[0,0], state: 'default', grab: []},
        specialGrndInd: [[0,0],[2,0],[0,1],[1,1],[2,2],[3,2],[0,3],[2,3],[3,3]],
        specialGrndName: ['dirt','cobblestone','dirt','brick','dirt','dirt','dirt','dirt','brick'],
        thingsInd: [[1,1],[2,3],[3,3]],
        thingsName: ['kitten1','basket','kitten2'],
        missionGuideDescription: [
            "主人主人，這關有兩隻<span class='uk-text-primary'>小貓們（kittens）</span>！，每次面對有相同<span class='uk-text-primary'>名稱</span>的物件，我總是感到相當困惑。",
            "為了解決這個問題，我總是會先在腦袋裡建立一個叫做<span class='uk-text-primary'>「kittens」（小貓們）</span>的<span class='uk-text-primary'>清單</span>，再用<span class='uk-text-primary'>「第一筆」</span>與<span class='uk-text-primary'>「最後一筆」</span>來分辨他們。",
            "底下有一些範例，試著跑跑看原始的積木，了解清單的用法。<br><br>這關的目標是<span class='uk-text-primary'>讓小貓們都回到籃子之中</span>。"
        ],
        goals: [
            "確保 kittens.位置 == basket.位置"
        ],
        // Solution
        solutionBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="FL%7`R|ytP8Xmguc/u@L">kittens</variable><variable type="" id="JU4ypmw%}4sDAVhSb*ov">basket</variable><variable type="" id="-W?%hQNX1-4x~T=%D}AP">變數</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="73" y="43"><next><block type="Robot_Goto" id="Robot_Goto"><value name="GOTO_NAME"><block type="lists_getIndexSimple" id="SCiR#i^PqJ7zo2)?XrhJ"><mutation statement="false" at="false"></mutation><field name="WHERE">FIRST</field><value name="VALUE"><block type="variables_get" id="?rW7[xLHO3Y02n,Yl*gQ"><field name="VAR" id="FL%7`R|ytP8Xmguc/u@L" variabletype="">kittens</field></block></value></block></value><next><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="lists_getIndexSimple" id="y;8{LTm]3KFqLxK[f,qa"><mutation statement="false" at="false"></mutation><field name="WHERE">FIRST</field><value name="VALUE"><block type="variables_get" id=")Mt8*MYaMUO0FWk$ubyG"><field name="VAR" id="FL%7`R|ytP8Xmguc/u@L" variabletype="">kittens</field></block></value></block></value><next><block type="Robot_Goto" id="3r=GsNMM{9J*)O8,^y$N"><value name="GOTO_NAME"><block type="lists_getIndexSimple" id="6(lYd0D]Q22BIuxO{J1O"><mutation statement="false" at="false"></mutation><field name="WHERE">LAST</field><value name="VALUE"><block type="variables_get" id="Qs#Sm%lIoh}qv!:_[wep"><field name="VAR" id="FL%7`R|ytP8Xmguc/u@L" variabletype="">kittens</field></block></value></block></value><next><block type="Robot_Grab" id="47*lEXPEq~:,[Lv@e_z~"><value name="GRAB_NAME"><block type="lists_getIndexSimple" id="hWo2jXR/8ju62^h24nil"><mutation statement="false" at="false"></mutation><field name="WHERE">LAST</field><value name="VALUE"><block type="variables_get" id="Jp$!nIYTFB63?r!(@uCp"><field name="VAR" id="FL%7`R|ytP8Xmguc/u@L" variabletype="">kittens</field></block></value></block></value><next><block type="Robot_Goto" id=")OJC#|Uf-_?(ud:y^9_+"><value name="GOTO_NAME"><block type="variables_get" id="W_:;*2I=wQ_@k%bwW7xk"><field name="VAR" id="JU4ypmw%}4sDAVhSb*ov" variabletype="">basket</field></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>',
        defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="FL%7`R|ytP8Xmguc/u@L">kittens</variable><variable type="" id="JU4ypmw%}4sDAVhSb*ov">basket</variable><variable type="" id="-W?%hQNX1-4x~T=%D}AP">變數</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="73" y="43"><next><block type="Robot_Goto" id="Robot_Goto"><value name="GOTO_NAME"><block type="lists_getIndexSimple" id="SCiR#i^PqJ7zo2)?XrhJ"><mutation statement="false" at="false"></mutation><field name="WHERE">FIRST</field><value name="VALUE"><block type="variables_get" id="?rW7[xLHO3Y02n,Yl*gQ"><field name="VAR" id="FL%7`R|ytP8Xmguc/u@L" variabletype="">kittens</field></block></value></block></value><next><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="lists_getIndexSimple" id="y;8{LTm]3KFqLxK[f,qa"><mutation statement="false" at="false"></mutation><field name="WHERE">FIRST</field><value name="VALUE"><block type="variables_get" id=")Mt8*MYaMUO0FWk$ubyG"><field name="VAR" id="FL%7`R|ytP8Xmguc/u@L" variabletype="">kittens</field></block></value></block></value><next><block type="Robot_Goto" id="3r=GsNMM{9J*)O8,^y$N"><value name="GOTO_NAME"><block type="lists_getIndexSimple" id="6(lYd0D]Q22BIuxO{J1O"><mutation statement="false" at="false"></mutation><field name="WHERE">LAST</field><value name="VALUE"><block type="variables_get" id="Qs#Sm%lIoh}qv!:_[wep"><field name="VAR" id="FL%7`R|ytP8Xmguc/u@L" variabletype="">kittens</field></block></value></block></value><next><block type="Robot_Grab" id="47*lEXPEq~:,[Lv@e_z~"><value name="GRAB_NAME"><block type="lists_getIndexSimple" id="hWo2jXR/8ju62^h24nil"><mutation statement="false" at="false"></mutation><field name="WHERE">LAST</field><value name="VALUE"><block type="variables_get" id="Jp$!nIYTFB63?r!(@uCp"><field name="VAR" id="JU4ypmw%}4sDAVhSb*ov" variabletype="">basket</field></block></value></block></value><next><block type="Robot_Goto" id=")OJC#|Uf-_?(ud:y^9_+"><value name="GOTO_NAME"><block type="variables_get" id="W_:;*2I=wQ_@k%bwW7xk"><field name="VAR" id="JU4ypmw%}4sDAVhSb*ov" variabletype="">basket</field></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>',
        checkLevelComplete: function(){
            var robotPos = Debugging.Game.getThingPos('robot');
            var kitten1Pos = Debugging.Game.getThingPos('kitten1');
            var kitten2Pos = Debugging.Game.getThingPos('kitten2');
            var basketPos = Debugging.Game.getThingPos('basket');

            if (!(Game.isSamePosition(kitten1Pos, basketPos) && Game.isSamePosition(kitten2Pos, basketPos))) {
                $($('#goal-list').find('li')[0]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalKittens');
                return false;
            }
            $($('#goal-list').find('li')[0]).addClass('success');

            return true;
        }
    }, 
    // Chap.2 - Level 6: Evaluation
    {
        isEvaluation: true,
        categoryIds: [],
        blockIds: ["Move_Robot", "Robot_Grab", "Robot_Drop", "Robot_Goto", "lists_getIndexSimple"],
        scale: 0.85,
        ground: "dirt.grass",
        grndColor: "#fff",
        mapSize: 5,
        robot: {position:[4,2], state:"default", grab:[]},
        specialGrndInd: [[2,1],[3,3],[0,1],[0,2],[1,2],[2,2],[0,3],[1,3],[2,3],[0,4],[1,4],[2,4],[3,4],[5,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[4,4],[4,0]],
        specialGrndName: ["grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","cobblestone"],
        thingsInd: [[3,3],[1,3],[0,4],[2,3],[4,4],[4,1],[0,0]],
        thingsName: ['basket','puppy1','puppy2','bird1','bird2','rock1','rock2',],
        missionGuideDescription: [
            "主人你看，原來這棟建築裡還有個溫室！",
            "不過還有<span class='uk-text-primary'>落石</span>代表這個地方還不是太安全。先把小動物都放到那安全的<span class='uk-text-primary'>籃子</span>裡面好了。",
            "由於這一關是<span class='uk-text-primary'>測驗關卡</span>，只有一個錯誤的積木，主人請幫幫我<span class='uk-text-primary'>找出並修正那唯一的錯誤</span>，我們就能繼續往下一關前進了！(先按運行看看結果)",
        ],
        goals: [
            '確保 birds.位置 == basket.位置',
            '確保 puppys.位置 == basket.位置'
        ],
        answer: ['1Oj*VTb`_nlc-?+$?dqW', '~rrxYHZ;DQ1#)Q]yS9BT', 'Robot_Drop'],
        solutionBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="zX*P71glh;v11!qeF+nc">basket</variable><variable type="" id="UF;C$eMyUKbEM]6GRuK-">rocks</variable><variable type="" id="DPHchdI2A*fr.(BM]Ide">birds</variable><variable type="" id="mY{;%$U]vteEQH1!Hj8@">puppys</variable><variable type="" id="okiWMPzU8wz1sK8j+@Kz">kitten</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="50" y="50"><next><block type="Robot_Goto" id="a0WIwJqku}xuSoQPWt-r"><value name="GOTO_NAME"><block type="lists_getIndexSimple" id="lists_getIndexSimple"><mutation statement="false" at="false"></mutation><field name="WHERE">FIRST</field><value name="VALUE"><block type="variables_get" id="=*;ll0`jjFGqk:|9-=*Q"><field name="VAR" id="DPHchdI2A*fr.(BM]Ide" variabletype="">birds</field></block></value></block></value><next><block type="Robot_Grab" id="1-_=OsX.(^3J-!Y-4bbi"><value name="GRAB_NAME"><block type="lists_getIndexSimple" id="Ve@D@m`mJrbqie@PZ*p?"><mutation statement="false" at="false"></mutation><field name="WHERE">FIRST</field><value name="VALUE"><block type="variables_get" id="F?`lwmo@z4JmnVlet}!8"><field name="VAR" id="DPHchdI2A*fr.(BM]Ide" variabletype="">birds</field></block></value></block></value><next><block type="Robot_Goto" id="SfL7biYC#Ud(%2L/N_}["><value name="GOTO_NAME"><block type="lists_getIndexSimple" id="fbh;V~tVkOm:vl=.2t/]"><mutation statement="false" at="false"></mutation><field name="WHERE">LAST</field><value name="VALUE"><block type="variables_get" id="B^e/8!4w|l~ofx,iz!nY"><field name="VAR" id="DPHchdI2A*fr.(BM]Ide" variabletype="">birds</field></block></value></block></value><next><block type="Robot_Grab" id="I}l+cGG;r*^RFFZlyL.:"><value name="GRAB_NAME"><block type="lists_getIndexSimple" id="VusJI;-e/Mc*c=V:x}Zr"><mutation statement="false" at="false"></mutation><field name="WHERE">LAST</field><value name="VALUE"><block type="variables_get" id="$bjEouYy9o%c~M`ln9?4"><field name="VAR" id="DPHchdI2A*fr.(BM]Ide" variabletype="">birds</field></block></value></block></value><next><block type="Robot_Goto" id="lF@Ow@S{aF`9;?`Jnh/9"><value name="GOTO_NAME"><block type="lists_getIndexSimple" id="-EWx2.B!Dxmb,#]c3MUo"><mutation statement="false" at="false"></mutation><field name="WHERE">FIRST</field><value name="VALUE"><block type="variables_get" id="(cC9*}Pc)OK(L;rj{xxT"><field name="VAR" id="mY{;%$U]vteEQH1!Hj8@" variabletype="">puppys</field></block></value></block></value><next><block type="Robot_Grab" id="Z-Al5:ionKJY$0G3REVU"><value name="GRAB_NAME"><block type="lists_getIndexSimple" id="QiI]vTnWIS1We;Ch,UOg"><mutation statement="false" at="false"></mutation><field name="WHERE">FIRST</field><value name="VALUE"><block type="variables_get" id="lQWm2*e%OXaK]Wmn///a"><field name="VAR" id="mY{;%$U]vteEQH1!Hj8@" variabletype="">puppys</field></block></value></block></value><next><block type="Robot_Goto" id=".y8W,Sio(Vo.S,oC)c|8"><value name="GOTO_NAME"><block type="lists_getIndexSimple" id="v_y+D:[{=m{#W+oN@@l,"><mutation statement="false" at="false"></mutation><field name="WHERE">LAST</field><value name="VALUE"><block type="variables_get" id="BlN}evKc-%5atO:zX,Xr"><field name="VAR" id="mY{;%$U]vteEQH1!Hj8@" variabletype="">puppys</field></block></value></block></value><next><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="lists_getIndexSimple" id="~rrxYHZ;DQ1#)Q]yS9BT"><mutation statement="false" at="false"></mutation><field name="WHERE">LAST</field><value name="VALUE"><block type="variables_get" id="1Oj*VTb`_nlc-?+$?dqW"><field name="VAR" id="mY{;%$U]vteEQH1!Hj8@" variabletype="">puppys</field></block></value></block></value><next><block type="Robot_Goto" id="ISVZ3qH63mFD1.DJOVna"><value name="GOTO_NAME"><block type="variables_get" id="bCUuC)4S.i=BR-EGwgng"><field name="VAR" id="zX*P71glh;v11!qeF+nc" variabletype="">basket</field></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>',
        defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="zX*P71glh;v11!qeF+nc">basket</variable><variable type="" id="UF;C$eMyUKbEM]6GRuK-">rocks</variable><variable type="" id="DPHchdI2A*fr.(BM]Ide">birds</variable><variable type="" id="mY{;%$U]vteEQH1!Hj8@">puppys</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="50" y="50"><next><block type="Robot_Goto" id="a0WIwJqku}xuSoQPWt-r"><value name="GOTO_NAME"><block type="lists_getIndexSimple" id="lists_getIndexSimple"><mutation statement="false" at="false"></mutation><field name="WHERE">FIRST</field><value name="VALUE"><block type="variables_get" id="=*;ll0`jjFGqk:|9-=*Q"><field name="VAR" id="DPHchdI2A*fr.(BM]Ide" variabletype="">birds</field></block></value></block></value><next><block type="Robot_Grab" id="1-_=OsX.(^3J-!Y-4bbi"><value name="GRAB_NAME"><block type="lists_getIndexSimple" id="Ve@D@m`mJrbqie@PZ*p?"><mutation statement="false" at="false"></mutation><field name="WHERE">FIRST</field><value name="VALUE"><block type="variables_get" id="F?`lwmo@z4JmnVlet}!8"><field name="VAR" id="DPHchdI2A*fr.(BM]Ide" variabletype="">birds</field></block></value></block></value><next><block type="Robot_Goto" id="SfL7biYC#Ud(%2L/N_}["><value name="GOTO_NAME"><block type="lists_getIndexSimple" id="fbh;V~tVkOm:vl=.2t/]"><mutation statement="false" at="false"></mutation><field name="WHERE">LAST</field><value name="VALUE"><block type="variables_get" id="B^e/8!4w|l~ofx,iz!nY"><field name="VAR" id="DPHchdI2A*fr.(BM]Ide" variabletype="">birds</field></block></value></block></value><next><block type="Robot_Grab" id="I}l+cGG;r*^RFFZlyL.:"><value name="GRAB_NAME"><block type="lists_getIndexSimple" id="VusJI;-e/Mc*c=V:x}Zr"><mutation statement="false" at="false"></mutation><field name="WHERE">LAST</field><value name="VALUE"><block type="variables_get" id="$bjEouYy9o%c~M`ln9?4"><field name="VAR" id="DPHchdI2A*fr.(BM]Ide" variabletype="">birds</field></block></value></block></value><next><block type="Robot_Goto" id="lF@Ow@S{aF`9;?`Jnh/9"><value name="GOTO_NAME"><block type="lists_getIndexSimple" id="-EWx2.B!Dxmb,#]c3MUo"><mutation statement="false" at="false"></mutation><field name="WHERE">FIRST</field><value name="VALUE"><block type="variables_get" id="(cC9*}Pc)OK(L;rj{xxT"><field name="VAR" id="mY{;%$U]vteEQH1!Hj8@" variabletype="">puppys</field></block></value></block></value><next><block type="Robot_Grab" id="Z-Al5:ionKJY$0G3REVU"><value name="GRAB_NAME"><block type="lists_getIndexSimple" id="QiI]vTnWIS1We;Ch,UOg"><mutation statement="false" at="false"></mutation><field name="WHERE">FIRST</field><value name="VALUE"><block type="variables_get" id="lQWm2*e%OXaK]Wmn///a"><field name="VAR" id="mY{;%$U]vteEQH1!Hj8@" variabletype="">puppys</field></block></value></block></value><next><block type="Robot_Goto" id=".y8W,Sio(Vo.S,oC)c|8"><value name="GOTO_NAME"><block type="lists_getIndexSimple" id="v_y+D:[{=m{#W+oN@@l,"><mutation statement="false" at="false"></mutation><field name="WHERE">LAST</field><value name="VALUE"><block type="variables_get" id="BlN}evKc-%5atO:zX,Xr"><field name="VAR" id="mY{;%$U]vteEQH1!Hj8@" variabletype="">puppys</field></block></value></block></value><next><block type="Robot_Drop" id="Robot_Drop"><value name="DROP_NAME"><block type="lists_getIndexSimple" id="~rrxYHZ;DQ1#)Q]yS9BT"><mutation statement="false" at="false"></mutation><field name="WHERE">FIRST</field><value name="VALUE"><block type="variables_get" id="1Oj*VTb`_nlc-?+$?dqW"><field name="VAR" id="mY{;%$U]vteEQH1!Hj8@" variabletype="">puppys</field></block></value></block></value><next><block type="Robot_Goto" id="ISVZ3qH63mFD1.DJOVna"><value name="GOTO_NAME"><block type="variables_get" id="bCUuC)4S.i=BR-EGwgng"><field name="VAR" id="zX*P71glh;v11!qeF+nc" variabletype="">basket</field></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>',
        checkLevelComplete: function(){
            var robotPos = Debugging.Game.getThingPos('robot');
            var bird1Pos = Debugging.Game.getThingPos('bird1');
            var bird2Pos = Debugging.Game.getThingPos('bird2');
            var puppy1Pos = Debugging.Game.getThingPos('puppy1');
            var puppy2Pos = Debugging.Game.getThingPos('puppy2');
            var basketPos = Debugging.Game.getThingPos('basket');

            if (!(Game.isSamePosition(bird1Pos, basketPos) && Game.isSamePosition(bird2Pos, basketPos))) {
                $($('#goal-list').find('li')[0]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalBirds');
                return false;
            }
            $($('#goal-list').find('li')[0]).addClass('success');

            if (!(Game.isSamePosition(puppy1Pos, basketPos) && Game.isSamePosition(puppy2Pos, basketPos))) {
                $($('#goal-list').find('li')[1]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalPuppys');
                return false;
            }
            $($('#goal-list').find('li')[1]).addClass('success');

            return true;
        }
    }, 
    // Chap.3 - Level 7: LearnList
    {
        categoryIds: [],
        blockIds: ["Move_Robot", "Robot_Grab", "Robot_Drop", "Robot_Goto", "variables_set", "Robot_Say"],
        scale: 1.1,
        ground: "wood",
        grndColor: "#fff",
        mapSize: 6,
        robot: {position:[0,0], state:"default", grab:[]},
        specialGrndInd: [[0,0],[1,0],[1,1],[2,1],[4,1],[5,2],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[0,5],[1,5],[2,5],[3,5],[4,5],[5,5]],
        specialGrndName: ["dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt","dirt.grass","dirt.grass","dirt.grass","dirt.grass","dirt.grass","dirt.grass"],
        thingsInd: [[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[1,5],[2,5],[5,5],[0,5]],
        thingsName: ['boulder1','boulder2','boulder3','boulder4','boulder5','boulder6','basket','rock','bucket','dog'],
        missionGuideDescription: [
            "主人主人，小狗被巨石山擋住了！看來我已經離震災中央越來越近，但是我無法跨過巨石，所以我沒辦法幫小狗移走石頭。",
            "看起來我的任務之一就是請小狗幫忙。<br>我記得我的資料庫之中存著一句狗狗聽得懂的話，或許我可以使用一個<span class='uk-text-primary'>變數</span>來儲存這句話，就把這個變數叫做<span class='uk-text-primary'> sayThis </span>好了！使用<span class='uk-text-primary'>賦值</span>積木可以<span class='uk-text-primary'>設定變數的內容</span>",
            "接著再用<span class='uk-text-primary'>迪摩說</span>積木接上 sayThis 變數積木來對小狗，就能說出這句話。記得要靠近小狗一些小狗才聽得到喔！<br>注意左下角的關卡任務，並試著運行看看原本的積木。",
        ],
        goals: [
            '確保 robot.位置 == [0, 3]',
            '確保 變數 sayThis == "狗狗請幫幫我！"',
            '確保 rock.位置 == bucket.位置',
            '確保 dog.位置 == basket.位置',
        ],
        solutionBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="KXQ`c4P{O@q~O=Vun}B@">dog</variable><variable type="" id="5M9sTLDV5=C_ehsIGZ-6">basket</variable><variable type="" id="RHs_KWbp$:Vk$Xh]Y-oI">rock</variable><variable type="" id="e=ARfkv.{%*ielDWvIra">bucket</variable><variable type="" id="9or7U{k.h?8]1hV8cEPX">saythat</variable><variable type="" id="5732We9Fx4}kQ@eRN%r(">sayThis</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="80" y="70"><next><block type="Robot_Goto" id="Robot_Goto"><value name="GOTO_NAME"><block type="variables_get" id="fK-$B0*ZBS!.Dalqy_.5"><field name="VAR" id="KXQ`c4P{O@q~O=Vun}B@" variabletype="">dog</field></block></value><next><block type="variables_set" id="5qN%B+mf+bpOu:;6?!Ux"><field name="VAR" id="5732We9Fx4}kQ@eRN%r(" variabletype="">sayThis</field><value name="VALUE"><block type="text" id="_DHi5/(;ZR(8b%-s/S*/"><field name="TEXT">狗狗請幫幫我！</field></block></value><next><block type="Robot_Say" id="48]0*8TA7i0I%?3zY#~f"><value name="SAY_TEXT"><shadow type="text" id="N702wdK`v|*Rjx5mQ#}3"><field name="TEXT">說些什麼呢？</field></shadow><block type="variables_get" id="b*6Be-6Lgu.$Prnb[@[P"><field name="VAR" id="5732We9Fx4}kQ@eRN%r(" variabletype="">sayThis</field></block></value></block></next></block></next></block></next></block></xml>',
        defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="KXQ`c4P{O@q~O=Vun}B@">dog</variable><variable type="" id="5M9sTLDV5=C_ehsIGZ-6">basket</variable><variable type="" id="RHs_KWbp$:Vk$Xh]Y-oI">rock</variable><variable type="" id="e=ARfkv.{%*ielDWvIra">bucket</variable><variable type="" id="9or7U{k.h?8]1hV8cEPX">saythat</variable><variable type="" id="5732We9Fx4}kQ@eRN%r(">sayThis</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="80" y="70"><next><block type="Robot_Goto" id="Robot_Goto"><value name="GOTO_NAME"><block type="variables_get" id="fK-$B0*ZBS!.Dalqy_.5"><field name="VAR" id="KXQ`c4P{O@q~O=Vun}B@" variabletype="">dog</field></block></value><next><block type="variables_set" id="5qN%B+mf+bpOu:;6?!Ux"><field name="VAR" id="9or7U{k.h?8]1hV8cEPX" variabletype="">saythat</field><value name="VALUE"><block type="text" id="_DHi5/(;ZR(8b%-s/S*/"><field name="TEXT">狗勾請邦幫我</field></block></value><next><block type="Robot_Say" id="48]0*8TA7i0I%?3zY#~f"><value name="SAY_TEXT"><shadow type="text" id="N702wdK`v|*Rjx5mQ#}3"><field name="TEXT">說些什麼呢？</field></shadow><block type="variables_get" id="b*6Be-6Lgu.$Prnb[@[P"><field name="VAR" id="5732We9Fx4}kQ@eRN%r(" variabletype="">sayThis</field></block></value></block></next></block></next></block></next></block></xml>',
        checkLevelComplete: function(){
            var robotPos = Debugging.Game.getThingPos('robot');
            var rockPos = Debugging.Game.getThingPos('rock');
            var dogPos = Debugging.Game.getThingPos('dog');
            var basketPos = Debugging.Game.getThingPos('basket');
            var bucketPos = Debugging.Game.getThingPos('bucket');

            if (!(Game.isSamePosition(robotPos, [0, 3]))) {
                $($('#goal-list').find('li')[0]).addClass('fail');
                UI.showFailText('Debugging_msg_noCloseEnough');
                return false;
            }
            $($('#goal-list').find('li')[0]).addClass('success');

            // search all blocks if player really set this "sayThis" variable to goal sentence
            var block, flag = false;
            for (ind in BlocklyGames.workspace.getAllBlocks()) {
                block = BlocklyGames.workspace.getAllBlocks()[ind];
                if (block.type == 'variables_set') {
                    try {
                        if ((block.getFieldValue('VAR') == 'sayThis') && (block.getInputTargetBlock('VALUE').getFieldValue('TEXT') == '狗狗請幫幫我！')) {
                            $($('#goal-list').find('li')[1]).addClass('success');
                            flag = true;
                        }
                    } catch (e) {
                    }
                }
            }
            if (!flag) {
                $($('#goal-list').find('li')[1]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalWrongVariable');
                return false;
            }

            // search all blocks if Robot really said this "sayThis" variable
            flag = false;
            for (ind in BlocklyGames.workspace.getAllBlocks()) {
                block = BlocklyGames.workspace.getAllBlocks()[ind];
                if (block.type == 'Robot_Say') {
                    try {
                        if (block.getInputTargetBlock('SAY_TEXT').getFieldValue('VAR') == 'sayThis') {
                            flag = true;
                        }
                    } catch (e) {
                    }
                }
            }
            if (!flag) {
                $($('#goal-list').find('li')[1]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalrobotDidntSayGoalSentence');
                return false;
            }

            alert('狗狗：『汪汪！收到了～我來幫你！』');

            Game.commands.moveThing('r', 2, 'dog', Debugging.STEP_SPEED);

            setTimeout(function(){
                Game.play('grab');
                Game.things['dog'].grab.push('rock');
                Game.commands.moveThing('r', 3, 'dog');
            }, 3 * (UI.drawFrame * UI.drawSpeed + 60) + 60)

            setTimeout(function(){
                Game.play('drop', 0.5);
                Game.things['dog'].grab = [];
                Game.commands.moveThing('l', 4, 'dog');
            }, 7 * (UI.drawFrame * UI.drawSpeed + 90) + 90)

            setTimeout(function(){
                if (!(Game.isSamePosition(rockPos, bucketPos))) {
                    $($('#goal-list').find('li')[2]).addClass('fail');
                    UI.showFailText('Debugging_msg_noGoalRock');
                    return false;
                }
                $($('#goal-list').find('li')[2]).addClass('success');

                if (!(Game.isSamePosition(dogPos, basketPos))) {
                    $($('#goal-list').find('li')[3]).addClass('fail');
                    UI.showFailText('Debugging_msg_noGoalDog');
                    return false;
                }
                $($('#goal-list').find('li')[3]).addClass('success');
            }, 12 * (UI.drawFrame * UI.drawSpeed + 120) + 120)

            // delay level success message for 13-step time frame
            return 13;
        }
    }, 
    // Chap.3 - Level 8: LearnList
    {
        categoryIds: [],
        blockIds: ["Move_Robot", "Robot_Grab", "Robot_Drop", "Robot_Goto", "lists_getIndexSimple", "lists_split_simple", "Robot_Say"],
        scale: 0.9,
        ground: "wood",
        grndColor: "#fff",
        mapSize: 7,
        robot: {position:[2,1], state:"default", grab:[]},
        specialGrndInd: [[3,0],[2,2],[0,4],[1,5]],
        specialGrndName: ["dirt","dirt","dirt","dirt"],
        thingsInd: [[0,3],[1,3],[2,3],[3,3],[4,2],[4,1],[5,1],[6,0],[5,4],[6,1],[1,6]],
        thingsName: ['boulder1','boulder2','rat','boulder3','boulder4','note','boulder5','boulder6','dog1','dog2','basket'],
        missionGuideDescription: [
            "主人哦不！那隻老鼠擋住我的路了，看來沒有正確的<span class='uk-text-primary'>通關密語</span>，他不會讓我過去的。",
            "我記得有一種特別的變數叫做<span class='uk-text-primary'>清單</span>，用<span class='uk-text-primary'>中括號 [ ]</span> 來表示，清單裡頭可以儲存許多個東西(可能是數字，或者是文字)。清單裡每個東西之間用<span class='uk-text-primary'>逗點 ,</span> 來分隔 。",
            "舉個例子，我的<span class='uk-text-primary'>位置</span>(滑鼠移到地圖上會顯示的)也是一個清單，<span class='uk-text-primary'>是一個用中括號包起來的兩個數字</span>，前者是 x 座標，後者是 y 座標，而我最一開始的位置是<span class='uk-text-primary'> [2,1]</span>。",
            '清單除了儲存數字，也可以儲存文字，像是 <span class="uk-text-primary">[ "我是", "通關", "密語" ]</span>，就是一個清單，存放了三段文字。注意在程式之中，想要表示「文字」一定要用<span class="uk-text-primary">引號 " </span>前後包圍起來喔！',
            "好像說太多了，讓我們開始吧。<br>我很確定底下的積木程式大部分都是正確了，除了通關密語的清單內容好像有點問題。或許右方的<span class='uk-text-primary'>筆記(note)</span>上面會告訴我什麼。",
        ],
        goals: [
            '確保 dogs.位置 == basket.位置',
        ],
        solutionBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="5M9sTLDV5=C_ehsIGZ-6">basket</variable><variable type="" id="tMF6+pW.,RyW=9[$#2,z">rat</variable><variable type="" id="^zGMU:xt(PH90AeEZ/*;">note</variable><variable type="" id="4lcOeM`dp|*HTfNde!pD">通關密語</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="70" y="93"><next><block type="Move_Robot" id="mtJ`^ngN`G#,|CTE,s~]"><field name="DIRECTION">Down</field><field name="NUM_OF_MOVE">1</field><next><block type="lists_split_simple" id="u~q2?*WItnr:0vev-3Cs"><field name="VAR" id="4lcOeM`dp|*HTfNde!pD" variabletype="">通關密語</field><value name="LIST_TEXT"><shadow type="text_list" id=",(/;:UF5C]MZ-t!XyWU?"><field name="TEXT"></field></shadow><block type="text_list" id="G%,[AFl9R)=#|XV=@=~v"><field name="TEXT">"dog1", "safe", "dog2"</field></block></value><next><block type="Robot_Say" id="Xt8C0B@oQ~MOIeWWT(Mg"><value name="SAY_TEXT"><shadow type="text" id="Yu9]~UGf418U#JNx/7W;"><field name="TEXT">說些什麼呢？</field></shadow><block type="variables_get" id="lqPANQ1`IwM17TBjw^_{"><field name="VAR" id="4lcOeM`dp|*HTfNde!pD" variabletype="">通關密語</field></block></value><next><block type="Robot_Goto" id="Robot_Goto"><value name="GOTO_NAME"><block type="lists_getIndexSimple" id="lists_getIndexSimple"><mutation statement="false" at="false"></mutation><field name="WHERE">FIRST</field><value name="VALUE"><block type="variables_get" id="4hq@~z/:Oe[G;@M;Q)kl"><field name="VAR" id="4lcOeM`dp|*HTfNde!pD" variabletype="">通關密語</field></block></value></block></value><next><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="lists_getIndexSimple" id="H$7rt+@5qqU23hbP;BMx"><mutation statement="false" at="false"></mutation><field name="WHERE">FIRST</field><value name="VALUE"><block type="variables_get" id="ekCUZ2,f!p@862=G3%WS"><field name="VAR" id="4lcOeM`dp|*HTfNde!pD" variabletype="">通關密語</field></block></value></block></value><next><block type="Move_Robot" id="Move_Robot"><field name="DIRECTION">Right</field><field name="NUM_OF_MOVE">1</field><next><block type="Robot_Goto" id="R#7*AWjrGKFCn/_.EPtF"><value name="GOTO_NAME"><block type="lists_getIndexSimple" id="LVCa_cIXsM)%)iS[cPM+"><mutation statement="false" at="false"></mutation><field name="WHERE">LAST</field><value name="VALUE"><block type="variables_get" id="xxK1oqJgRTHXeJI:,VvU"><field name="VAR" id="4lcOeM`dp|*HTfNde!pD" variabletype="">通關密語</field></block></value></block></value><next><block type="Robot_Grab" id="q=M3FCb-/ZIt%u;D#YxU"><value name="GRAB_NAME"><block type="lists_getIndexSimple" id=";-8GOb]AX#il8ze9Yqyr"><mutation statement="false" at="false"></mutation><field name="WHERE">LAST</field><value name="VALUE"><block type="variables_get" id="Ngu^q?VoINA+LEbnNDod"><field name="VAR" id="4lcOeM`dp|*HTfNde!pD" variabletype="">通關密語</field></block></value></block></value><next><block type="Robot_Goto" id="F2EDZdGiANie^:)7$KDy"><value name="GOTO_NAME"><block type="variables_get" id="9j]8)-G)Ay~pk25?!#gI"><field name="VAR" id="5M9sTLDV5=C_ehsIGZ-6" variabletype="">basket</field></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>',
        defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="5M9sTLDV5=C_ehsIGZ-6">basket</variable><variable type="" id="tMF6+pW.,RyW=9[$#2,z">rat</variable><variable type="" id="^zGMU:xt(PH90AeEZ/*;">note</variable><variable type="" id="4lcOeM`dp|*HTfNde!pD">通關密語</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="70" y="93"><next><block type="Move_Robot" id="mtJ`^ngN`G#,|CTE,s~]"><field name="DIRECTION">Down</field><field name="NUM_OF_MOVE">1</field><next><block type="lists_split_simple" id="u~q2?*WItnr:0vev-3Cs"><field name="VAR" id="4lcOeM`dp|*HTfNde!pD" variabletype="">通關密語</field><value name="LIST_TEXT"><shadow type="text_list" id=",(/;:UF5C]MZ-t!XyWU?"><field name="TEXT"></field></shadow><block type="text_list" id="G%,[AFl9R)=#|XV=@=~v"><field name="TEXT">"dogA", "danger", "dogB"</field></block></value><next><block type="Robot_Say" id="Xt8C0B@oQ~MOIeWWT(Mg"><value name="SAY_TEXT"><shadow type="text" id="Yu9]~UGf418U#JNx/7W;"><field name="TEXT">說些什麼呢？</field></shadow><block type="variables_get" id="lqPANQ1`IwM17TBjw^_{"><field name="VAR" id="4lcOeM`dp|*HTfNde!pD" variabletype="">通關密語</field></block></value><next><block type="Robot_Goto" id="Robot_Goto"><value name="GOTO_NAME"><block type="lists_getIndexSimple" id="lists_getIndexSimple"><mutation statement="false" at="false"></mutation><field name="WHERE">FIRST</field><value name="VALUE"><block type="variables_get" id="4hq@~z/:Oe[G;@M;Q)kl"><field name="VAR" id="4lcOeM`dp|*HTfNde!pD" variabletype="">通關密語</field></block></value></block></value><next><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="lists_getIndexSimple" id="H$7rt+@5qqU23hbP;BMx"><mutation statement="false" at="false"></mutation><field name="WHERE">FIRST</field><value name="VALUE"><block type="variables_get" id="ekCUZ2,f!p@862=G3%WS"><field name="VAR" id="4lcOeM`dp|*HTfNde!pD" variabletype="">通關密語</field></block></value></block></value><next><block type="Move_Robot" id="Move_Robot"><field name="DIRECTION">Right</field><field name="NUM_OF_MOVE">1</field><next><block type="Robot_Goto" id="R#7*AWjrGKFCn/_.EPtF"><value name="GOTO_NAME"><block type="lists_getIndexSimple" id="LVCa_cIXsM)%)iS[cPM+"><mutation statement="false" at="false"></mutation><field name="WHERE">LAST</field><value name="VALUE"><block type="variables_get" id="xxK1oqJgRTHXeJI:,VvU"><field name="VAR" id="4lcOeM`dp|*HTfNde!pD" variabletype="">通關密語</field></block></value></block></value><next><block type="Robot_Grab" id="q=M3FCb-/ZIt%u;D#YxU"><value name="GRAB_NAME"><block type="lists_getIndexSimple" id=";-8GOb]AX#il8ze9Yqyr"><mutation statement="false" at="false"></mutation><field name="WHERE">LAST</field><value name="VALUE"><block type="variables_get" id="Ngu^q?VoINA+LEbnNDod"><field name="VAR" id="4lcOeM`dp|*HTfNde!pD" variabletype="">通關密語</field></block></value></block></value><next><block type="Robot_Goto" id="F2EDZdGiANie^:)7$KDy"><value name="GOTO_NAME"><block type="variables_get" id="9j]8)-G)Ay~pk25?!#gI"><field name="VAR" id="5M9sTLDV5=C_ehsIGZ-6" variabletype="">basket</field></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>',
        checkLevelComplete: function(){
            var robotPos = Debugging.Game.getThingPos('robot');
            var dog1Pos = Debugging.Game.getThingPos('dog1');
            var dog2Pos = Debugging.Game.getThingPos('dog2');
            var basketPos = Debugging.Game.getThingPos('basket');

            if (!(Game.isSamePosition(dog1Pos, basketPos)) || !(Game.isSamePosition(dog2Pos, basketPos))) {
                $($('#goal-list').find('li')[0]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalDogs');
                return false;
            }
            $($('#goal-list').find('li')[0]).addClass('success');

            return true;
        }
    },
    // Chap.3 - Level 9: Evaluation
    {
        isEvaluation: true,
        categoryIds: [],
        blockIds: ["Move_Robot", "Robot_Grab", "Robot_Drop", "Robot_Goto", "lists_getIndex", "lists_split_simple", "Robot_Say"],
        scale: 0.85,
        ground: "dirt.grass",
        grndColor: "#fff",
        mapSize: 5,
        robot: {position:[4,2], state:"default", grab:[]},
        specialGrndInd: [[0,1],[1,1],[2,1],[3,1],[4,1],[2,2],[0,2],[0,3],[1,3],[2,3],[3,3],[0,4],[1,4],[2,4]],
        specialGrndName: ["grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass"],
        thingsInd: [[0,1],[3,1],[1,3],[2,4],[3,3]],
        thingsName: ['piglet','kitten','puppy','basket','rock'],
        missionGuideDescription: [
            "主人主人，看來又是一個溫室～",
            "我打算一次記著<span class='uk-text-primary'>三隻動物的名字，並放在一個清單中</span>。再一一前往帶他們回到<span class='uk-text-primary'>籃子</span>裡面。",
            "由於這一關是<span class='uk-text-primary'>測驗關卡</span>，只有一個錯誤的積木，主人請幫幫我<span class='uk-text-primary'>找出並修正那唯一的錯誤</span>，我們就能繼續往下一關前進了！(先按運行看看結果)",
        ],
        goals: [
            '確保 kitten.位置 == basket.位置',
            '確保 piglet.位置 == basket.位置',
            '確保 puppy.位置 == basket.位置'
        ],
        answer: ['text_list', 'lists_split_simple'],
        solutionBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="zX*P71glh;v11!qeF+nc">basket</variable><variable type="" id="^=9cqXb0Dq;YuA1s=I^U">kitten</variable><variable type="" id="DsvdCx4f{POlh6J.sshj">記憶中的名稱</variable><variable type="" id="/{c0(AYGeb#H1p3%3Nd!">piglet</variable><variable type="" id=".llF5VySUIcJ.`~1sNrz">puppy</variable><variable type="" id="gHIMPSnWxwx3Iknn;Piy">rock</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="50" y="50"><next><block type="lists_split_simple" id="lists_split_simple"><field name="VAR" id="DsvdCx4f{POlh6J.sshj" variabletype="">記憶中的名稱</field><value name="LIST_TEXT"><shadow type="text_list" id="3+XmaCVplnE2?z%c6^=%"><field name="TEXT">"cat", "dog"</field></shadow><block type="text_list" id="text_list"><field name="TEXT">"kitten", "piglet", "puppy"</field></block></value><next><block type="Robot_Goto" id="Robot_Goto"><value name="GOTO_NAME"><block type="lists_getIndex" id="lists_getIndex"><mutation statement="false" at="true"></mutation><field name="MODE">GET</field><field name="WHERE">FROM_START</field><value name="VALUE"><block type="variables_get" id=";|fX)sOdV-I;pW8Z$P+5"><field name="VAR" id="DsvdCx4f{POlh6J.sshj" variabletype="">記憶中的名稱</field></block></value><value name="AT"><block type="math_number" id="math_number"><field name="NUM">1</field></block></value></block></value><next><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="lists_getIndex" id="]R:P]^t1q.fS8wV|Iu%V"><mutation statement="false" at="true"></mutation><field name="MODE">GET</field><field name="WHERE">FROM_START</field><value name="VALUE"><block type="variables_get" id="m:=|~2eEJ=;.R0wROz_]"><field name="VAR" id="DsvdCx4f{POlh6J.sshj" variabletype="">記憶中的名稱</field></block></value><value name="AT"><block type="math_number" id="aoxoDE)_kcq$cqpc%KgS"><field name="NUM">1</field></block></value></block></value><next><block type="Robot_Goto" id="qBG_-!,sW)9Q(_Zi~wbE"><value name="GOTO_NAME"><block type="lists_getIndex" id="fO-jM`A`Ysh86~9Ac$n;"><mutation statement="false" at="true"></mutation><field name="MODE">GET</field><field name="WHERE">FROM_START</field><value name="VALUE"><block type="variables_get" id="1zsVmr/)LIl:h7R8YIrf"><field name="VAR" id="DsvdCx4f{POlh6J.sshj" variabletype="">記憶中的名稱</field></block></value><value name="AT"><block type="math_number" id="qmByw=p?|5*V*r?A#m#y"><field name="NUM">2</field></block></value></block></value><next><block type="Robot_Grab" id="[6dHiVARjS.DV+eDMDL["><value name="GRAB_NAME"><block type="lists_getIndex" id="WOFEam54q/ozk~8|-j1c"><mutation statement="false" at="true"></mutation><field name="MODE">GET</field><field name="WHERE">FROM_START</field><value name="VALUE"><block type="variables_get" id="Kp!(!1-?$|~dNN:PJ|2M"><field name="VAR" id="DsvdCx4f{POlh6J.sshj" variabletype="">記憶中的名稱</field></block></value><value name="AT"><block type="math_number" id="+?:6naCg,iXt@~_^:h_l"><field name="NUM">2</field></block></value></block></value><next><block type="Robot_Goto" id="tVmme#}^P}]?7,IQ*eI/"><value name="GOTO_NAME"><block type="lists_getIndex" id="X3bB|t5{?i=kgn_KZJ0X"><mutation statement="false" at="true"></mutation><field name="MODE">GET</field><field name="WHERE">FROM_START</field><value name="VALUE"><block type="variables_get" id="`%,4i@(GdNoPesbYgmZ-"><field name="VAR" id="DsvdCx4f{POlh6J.sshj" variabletype="">記憶中的名稱</field></block></value><value name="AT"><block type="math_number" id=":w(*0ewkKALE)ub)reRk"><field name="NUM">3</field></block></value></block></value><next><block type="Robot_Grab" id="YJB1_$($ubg4D,!QP_nu"><value name="GRAB_NAME"><block type="lists_getIndex" id=",=9[e3_LYu9u3u|}3P0@"><mutation statement="false" at="true"></mutation><field name="MODE">GET</field><field name="WHERE">FROM_START</field><value name="VALUE"><block type="variables_get" id="wN:pYj20qC09sF*)1I$U"><field name="VAR" id="DsvdCx4f{POlh6J.sshj" variabletype="">記憶中的名稱</field></block></value><value name="AT"><block type="math_number" id="zfFU(R)EE_~!sS=~uM)u"><field name="NUM">3</field></block></value></block></value><next><block type="Robot_Goto" id="S`fT6S=@t)zYDm?U~-a("><value name="GOTO_NAME"><block type="variables_get" id="21sMxTU|tyLXm0Q+@dh*"><field name="VAR" id="zX*P71glh;v11!qeF+nc" variabletype="">basket</field></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>',
        defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="zX*P71glh;v11!qeF+nc">basket</variable><variable type="" id="^=9cqXb0Dq;YuA1s=I^U">kitten</variable><variable type="" id="DsvdCx4f{POlh6J.sshj">記憶中的名稱</variable><variable type="" id="/{c0(AYGeb#H1p3%3Nd!">piglet</variable><variable type="" id=".llF5VySUIcJ.`~1sNrz">puppy</variable><variable type="" id="gHIMPSnWxwx3Iknn;Piy">rock</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="50" y="50"><next><block type="lists_split_simple" id="lists_split_simple"><field name="VAR" id="DsvdCx4f{POlh6J.sshj" variabletype="">記憶中的名稱</field><value name="LIST_TEXT"><shadow type="text_list" id="3+XmaCVplnE2?z%c6^=%"><field name="TEXT">"cat", "dog"</field></shadow><block type="text_list" id="text_list"><field name="TEXT">"kitten", "rock", "puppy"</field></block></value><next><block type="Robot_Goto" id="Robot_Goto"><value name="GOTO_NAME"><block type="lists_getIndex" id="lists_getIndex"><mutation statement="false" at="true"></mutation><field name="MODE">GET</field><field name="WHERE">FROM_START</field><value name="VALUE"><block type="variables_get" id=";|fX)sOdV-I;pW8Z$P+5"><field name="VAR" id="DsvdCx4f{POlh6J.sshj" variabletype="">記憶中的名稱</field></block></value><value name="AT"><block type="math_number" id="math_number"><field name="NUM">1</field></block></value></block></value><next><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="lists_getIndex" id="]R:P]^t1q.fS8wV|Iu%V"><mutation statement="false" at="true"></mutation><field name="MODE">GET</field><field name="WHERE">FROM_START</field><value name="VALUE"><block type="variables_get" id="m:=|~2eEJ=;.R0wROz_]"><field name="VAR" id="DsvdCx4f{POlh6J.sshj" variabletype="">記憶中的名稱</field></block></value><value name="AT"><block type="math_number" id="aoxoDE)_kcq$cqpc%KgS"><field name="NUM">1</field></block></value></block></value><next><block type="Robot_Goto" id="qBG_-!,sW)9Q(_Zi~wbE"><value name="GOTO_NAME"><block type="lists_getIndex" id="fO-jM`A`Ysh86~9Ac$n;"><mutation statement="false" at="true"></mutation><field name="MODE">GET</field><field name="WHERE">FROM_START</field><value name="VALUE"><block type="variables_get" id="1zsVmr/)LIl:h7R8YIrf"><field name="VAR" id="DsvdCx4f{POlh6J.sshj" variabletype="">記憶中的名稱</field></block></value><value name="AT"><block type="math_number" id="qmByw=p?|5*V*r?A#m#y"><field name="NUM">2</field></block></value></block></value><next><block type="Robot_Grab" id="[6dHiVARjS.DV+eDMDL["><value name="GRAB_NAME"><block type="lists_getIndex" id="WOFEam54q/ozk~8|-j1c"><mutation statement="false" at="true"></mutation><field name="MODE">GET</field><field name="WHERE">FROM_START</field><value name="VALUE"><block type="variables_get" id="Kp!(!1-?$|~dNN:PJ|2M"><field name="VAR" id="DsvdCx4f{POlh6J.sshj" variabletype="">記憶中的名稱</field></block></value><value name="AT"><block type="math_number" id="+?:6naCg,iXt@~_^:h_l"><field name="NUM">2</field></block></value></block></value><next><block type="Robot_Goto" id="tVmme#}^P}]?7,IQ*eI/"><value name="GOTO_NAME"><block type="lists_getIndex" id="X3bB|t5{?i=kgn_KZJ0X"><mutation statement="false" at="true"></mutation><field name="MODE">GET</field><field name="WHERE">FROM_START</field><value name="VALUE"><block type="variables_get" id="`%,4i@(GdNoPesbYgmZ-"><field name="VAR" id="DsvdCx4f{POlh6J.sshj" variabletype="">記憶中的名稱</field></block></value><value name="AT"><block type="math_number" id=":w(*0ewkKALE)ub)reRk"><field name="NUM">3</field></block></value></block></value><next><block type="Robot_Grab" id="YJB1_$($ubg4D,!QP_nu"><value name="GRAB_NAME"><block type="lists_getIndex" id=",=9[e3_LYu9u3u|}3P0@"><mutation statement="false" at="true"></mutation><field name="MODE">GET</field><field name="WHERE">FROM_START</field><value name="VALUE"><block type="variables_get" id="wN:pYj20qC09sF*)1I$U"><field name="VAR" id="DsvdCx4f{POlh6J.sshj" variabletype="">記憶中的名稱</field></block></value><value name="AT"><block type="math_number" id="zfFU(R)EE_~!sS=~uM)u"><field name="NUM">3</field></block></value></block></value><next><block type="Robot_Goto" id="S`fT6S=@t)zYDm?U~-a("><value name="GOTO_NAME"><block type="variables_get" id="21sMxTU|tyLXm0Q+@dh*"><field name="VAR" id="zX*P71glh;v11!qeF+nc" variabletype="">basket</field></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>',
        checkLevelComplete: function(){
            var robotPos = Debugging.Game.getThingPos('robot');
            var kittenPos = Debugging.Game.getThingPos('kitten');
            var pigletPos = Debugging.Game.getThingPos('piglet');
            var puppyPos = Debugging.Game.getThingPos('puppy');
            var basketPos = Debugging.Game.getThingPos('basket');
            var rockPos = Debugging.Game.getThingPos('rock');

            if (!Game.isSamePosition(kittenPos, basketPos)) {
                $($('#goal-list').find('li')[0]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalKitten');
                return false;
            }
            $($('#goal-list').find('li')[0]).addClass('success');

            if (!Game.isSamePosition(pigletPos, basketPos)) {
                $($('#goal-list').find('li')[1]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalPiglet');
                return false;
            }
            $($('#goal-list').find('li')[1]).addClass('success');

            if (!Game.isSamePosition(puppyPos, basketPos)) {
                $($('#goal-list').find('li')[2]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalPuppy');
                return false;
            }
            $($('#goal-list').find('li')[2]).addClass('success');

            return true;
        }
    }, 
    // Chap.4 - Level 10: LearnFunction
    {
        categoryIds: [],
        blockIds: ["Move_Robot", "Robot_Goto"],
        scale: 1.1,
        ground: "wood",
        grndColor: "#fff",
        mapSize: 8,
        robot: {position:[0,0], state:"default", grab:[]},
        specialGrndInd: [],
        specialGrndName: [],
        thingsInd: [[0,1],[1,1],[1,2],[1,3],[2,3],[3,3],[3,4],[3,5],[4,5],[5,5],[5,6],[3,0],[3,1],[4,1],[5,1],[5,2],[5,3],[6,3],[7,3],[7,4],[5,7],[7,5],[7,6],[7,7],[6,6]],
        thingsName: ['boulder1','boulder2','boulder3','boulder4','boulder5','boulder6','boulder7','boulder8','boulder9','boulderA','boulderB','boulderC','boulderD','boulderE','boulderF','boulderG','boulderH','boulderI','boulderJ','boulderK','boulderL','boulderM','boulderN','boulderO','kitten'],
        missionGuideDescription: [
            "主人主人，這裡有好多的落石。還好還有一條路可以到達那隻小貓的位置，但是<span class='uk-text-primary'>中間太多轉彎了</span>！我的<span class='uk-text-primary'>前往積木</span>無法到達小貓的位置，而且這一關我的<span class='uk-text-primary'>記憶體不足，放不下更多的積木了</span>。。。",
            "我想起來有一種叫做<span class='uk-text-primary'>函式</span>的積木，可以預先寫好一些程式在函式積木中，並且<span class='uk-text-primary'>重複使用這個函式</span>。函式就像是一個可以自由定義的積木，讓我們寫程式時變得更有彈性！",
            "我已經寫好了一些程式積木以及一個「函式」叫做「向右走再向下走」，運行看看效果如何。你可以幫我找出<span class='uk-text-primary'>為什麼我無法順利到達小貓的位置</span>，並且修復這個錯誤嗎？(<span class='uk-text-primary'>當運行時</span>後面最多接三個積木)",
        ],
        goals: [
            '確保 robot.位置 == kitten.位置',
        ],
        solutionBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="#jE=#a,$[,@;[O5V=w]|">kitten</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="70" y="50"><next><block type="procedures_callnoreturn" id=")AhbX8|-i]9JhRvQX#gO"><mutation name="向右走再向下走"></mutation><next><block type="procedures_callnoreturn" id="-UEm41gps:AjL^(,8Jvn"><mutation name="向右走再向下走"></mutation><next><block type="procedures_callnoreturn" id="0OK90XzhqrfGlMF3t/59"><mutation name="向右走再向下走"></mutation></block></next></block></next></block></next></block><block type="procedures_defnoreturn" id="{a!Z3c-xu-oj2OEs{W49" x="75" y="210"><field name="NAME">向右走再向下走</field><statement name="STACK"><block type="Move_Robot" id="Move_Robot"><field name="DIRECTION">Right</field><field name="NUM_OF_MOVE">2</field><next><block type="Move_Robot" id="%@}$R}73R$60/|[QPSg("><field name="DIRECTION">Down</field><field name="NUM_OF_MOVE">2</field></block></next></block></statement></block></xml>',
        defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="#jE=#a,$[,@;[O5V=w]|">kitten</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="70" y="50"><next><block type="procedures_callnoreturn" id=")AhbX8|-i]9JhRvQX#gO"><mutation name="向右走再向下走"></mutation><next><block type="procedures_callnoreturn" id="-UEm41gps:AjL^(,8Jvn"><mutation name="向右走再向下走"></mutation><next><block type="procedures_callnoreturn" id="0OK90XzhqrfGlMF3t/59"><mutation name="向右走再向下走"></mutation></block></next></block></next></block></next></block><block type="procedures_defnoreturn" id="{a!Z3c-xu-oj2OEs{W49" x="75" y="210"><field name="NAME">向右走再向下走</field><statement name="STACK"><block type="Move_Robot" id="Move_Robot"><field name="DIRECTION">Right</field><field name="NUM_OF_MOVE">2</field><next><block type="Move_Robot" id="%@}$R}73R$60/|[QPSg("><field name="DIRECTION">Down</field><field name="NUM_OF_MOVE">3</field></block></next></block></statement></block></xml>',
        checkLevelComplete: function(){
            var robotPos = Debugging.Game.getThingPos('robot');
            var kittenPos = Debugging.Game.getThingPos('kitten');

            if (!Game.isSamePosition(robotPos, kittenPos)) {
                $($('#goal-list').find('li')[0]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoal');
                return false;
            }
            $($('#goal-list').find('li')[0]).addClass('success');

            return true;
        }
    },
    // Chap.4 - Level 11: LearnFunction2
    {
        categoryIds: [],
        blockIds: ["Move_Robot", "Robot_Grab", "Robot_Drop", "Robot_Goto", "Robot_Say", "text_join"],
        scale: 0.9,
        ground: "wood",
        grndColor: "#fff",
        mapSize: 5,
        robot: {position:[4,2], state:"default", grab:[]},
        specialGrndInd: [[0,0], [1,0], [0,1], [1,1], [0,2]],
        specialGrndName: ['dirt','dirt','dirt','dirt','dirt'],
        thingsInd: [[0,1],[3,1],[1,3],[2,3],[4,4]],
        thingsName: ['piglet','bucket','basket','bird','puppy'],
        missionGuideDescription: [
            "函式積木好用的地方除了可以節省力氣，還可以<span class='uk-text-primary'>輸入變數進入函式積木</span>，讓函式積木每次執行都有一點不一樣！(更符合我們想做的事)",
            "比如說底下我已經寫好了一個<span class='uk-text-primary'>拯救小動物</span>函式，這個函式可以輸入一個動物名稱，讓函式裡頭所有<span class='uk-text-primary'>動物</span>變數變成是我們指定的名稱，這樣我們就能前往這個<span class='uk-text-primary'>指定的小動物</span>，並放回<span class='uk-text-primary'>籃子</span>之中。",
            "主人主人，你可以運行看看我的積木，幫我找出這個<span class='uk-text-primary'>拯救小動物</span>函式的問題在哪裡嗎？",
        ],
        goals: [
            '確保 puppy.位置 == basket.位置',
            '確保 bird.位置 == basket.位置',
            '確保 piglet.位置 == basket.位置',
        ],
        solutionBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="5M9sTLDV5=C_ehsIGZ-6">basket</variable><variable type="" id="tF+r0CmS6Z#y95KN5m3Z">動物名稱</variable><variable type="" id="{PZ_9ZUwtUwVHi:1T87R">bucket</variable><variable type="" id="3]mCb1y9i)gVd*#fC:Ry">puppy</variable><variable type="" id="7L@,,_LYi:^Yq{tC|xV*">bird</variable><variable type="" id="{Z,X[?sx$yWVl++#(bom">piglet</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="90" y="50"><next><block type="procedures_callnoreturn" id="KJm`[pY.LdoXFe,u-jl!"><mutation name="拯救小動物"><arg name="動物名稱"></arg></mutation><value name="ARG0"><block type="text" id="=Y+Vx@68l9Phyiwo?RO-"><field name="TEXT">puppy</field></block></value><next><block type="procedures_callnoreturn" id="mt%I]W%?]{I,Zx3nL5a4"><mutation name="拯救小動物"><arg name="動物名稱"></arg></mutation><value name="ARG0"><block type="text" id="0|_(s-L7}]QtD?SG1$:Y"><field name="TEXT">bird</field></block></value><next><block type="procedures_callnoreturn" id="+(!*;tt0F_rc0hD@Dz3O"><mutation name="拯救小動物"><arg name="動物名稱"></arg></mutation><value name="ARG0"><block type="text" id="mM$H1n-=KeZ,ibo]_)z9"><field name="TEXT">piglet</field></block></value></block></next></block></next></block></next></block><block type="procedures_defnoreturn" id="sY@TdTMQtv908vjJ+lFo" x="95" y="270"><mutation><arg name="動物名稱"></arg></mutation><field name="NAME">拯救小動物</field><statement name="STACK"><block type="Robot_Say" id="Robot_Say"><value name="SAY_TEXT"><shadow type="text" id="~dMhFK.P{Dho(=Jtl3e,"><field name="TEXT">說些什麼呢？</field></shadow><block type="text_join" id="0W{Hb4tQJMyR]0Q;Rx?U"><mutation items="2"></mutation><value name="ADD0"><block type="text" id="~:Bse|3^U[K$3Xd#ykuM"><field name="TEXT">拯救 </field></block></value><value name="ADD1"><block type="variables_get" id="+3X0:C=dONL.:UgouYJ@"><field name="VAR" id="tF+r0CmS6Z#y95KN5m3Z" variabletype="">動物名稱</field></block></value></block></value><next><block type="Robot_Goto" id="Robot_Goto"><value name="GOTO_NAME"><block type="variables_get" id="FJrY(t+9eRvY^nBz%?CG"><field name="VAR" id="tF+r0CmS6Z#y95KN5m3Z" variabletype="">動物名稱</field></block></value><next><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="variables_get" id="eTAMjF4cd/@#9+[5+nUB"><field name="VAR" id="tF+r0CmS6Z#y95KN5m3Z" variabletype="">動物名稱</field></block></value><next><block type="Robot_Goto" id="Ql;bC@[)dJ6K:[%:[]GB"><value name="GOTO_NAME"><block type="variables_get" id="U#WK0X3U=srj%;Gc)=H."><field name="VAR" id="5M9sTLDV5=C_ehsIGZ-6" variabletype="">basket</field></block></value><next><block type="Robot_Drop" id="Robot_Drop"><value name="DROP_NAME"><block type="variables_get" id=",du.Bb7]Wwx{h`pc/vNL"><field name="VAR" id="tF+r0CmS6Z#y95KN5m3Z" variabletype="">動物名稱</field></block></value></block></next></block></next></block></next></block></next></block></statement></block></xml>',
        defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="5M9sTLDV5=C_ehsIGZ-6">basket</variable><variable type="" id="tF+r0CmS6Z#y95KN5m3Z">動物名稱</variable><variable type="" id="{PZ_9ZUwtUwVHi:1T87R">bucket</variable><variable type="" id="3]mCb1y9i)gVd*#fC:Ry">puppy</variable><variable type="" id="7L@,,_LYi:^Yq{tC|xV*">bird</variable><variable type="" id="{Z,X[?sx$yWVl++#(bom">piglet</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="90" y="50"><next><block type="procedures_callnoreturn" id="KJm`[pY.LdoXFe,u-jl!"><mutation name="拯救小動物"><arg name="動物名稱"></arg></mutation><value name="ARG0"><block type="text" id="=Y+Vx@68l9Phyiwo?RO-"><field name="TEXT">puppy</field></block></value><next><block type="procedures_callnoreturn" id="mt%I]W%?]{I,Zx3nL5a4"><mutation name="拯救小動物"><arg name="動物名稱"></arg></mutation><value name="ARG0"><block type="text" id="0|_(s-L7}]QtD?SG1$:Y"><field name="TEXT">bird</field></block></value><next><block type="procedures_callnoreturn" id="+(!*;tt0F_rc0hD@Dz3O"><mutation name="拯救小動物"><arg name="動物名稱"></arg></mutation><value name="ARG0"><block type="text" id="mM$H1n-=KeZ,ibo]_)z9"><field name="TEXT">piglet</field></block></value></block></next></block></next></block></next></block><block type="procedures_defnoreturn" id="sY@TdTMQtv908vjJ+lFo" x="95" y="270"><mutation><arg name="動物名稱"></arg></mutation><field name="NAME">拯救小動物</field><statement name="STACK"><block type="Robot_Say" id="Robot_Say"><value name="SAY_TEXT"><shadow type="text" id="~dMhFK.P{Dho(=Jtl3e,"><field name="TEXT">說些什麼呢？</field></shadow><block type="text_join" id="0W{Hb4tQJMyR]0Q;Rx?U"><mutation items="2"></mutation><value name="ADD0"><block type="text" id="~:Bse|3^U[K$3Xd#ykuM"><field name="TEXT">拯救 </field></block></value><value name="ADD1"><block type="variables_get" id="+3X0:C=dONL.:UgouYJ@"><field name="VAR" id="tF+r0CmS6Z#y95KN5m3Z" variabletype="">動物名稱</field></block></value></block></value><next><block type="Robot_Goto" id="Robot_Goto"><value name="GOTO_NAME"><block type="variables_get" id="FJrY(t+9eRvY^nBz%?CG"><field name="VAR" id="tF+r0CmS6Z#y95KN5m3Z" variabletype="">動物名稱</field></block></value><next><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="variables_get" id="eTAMjF4cd/@#9+[5+nUB"><field name="VAR" id="tF+r0CmS6Z#y95KN5m3Z" variabletype="">動物名稱</field></block></value><next><block type="Robot_Goto" id="Ql;bC@[)dJ6K:[%:[]GB"><value name="GOTO_NAME"><block type="variables_get" id="U#WK0X3U=srj%;Gc)=H."><field name="VAR" id="{PZ_9ZUwtUwVHi:1T87R" variabletype="">bucket</field></block></value><next><block type="Robot_Drop" id="Robot_Drop"><value name="DROP_NAME"><block type="variables_get" id=",du.Bb7]Wwx{h`pc/vNL"><field name="VAR" id="tF+r0CmS6Z#y95KN5m3Z" variabletype="">動物名稱</field></block></value></block></next></block></next></block></next></block></next></block></statement></block></xml>',
        checkLevelComplete: function(){
            var robotPos = Debugging.Game.getThingPos('robot');
            var puppyPos = Debugging.Game.getThingPos('puppy');
            var birdPos = Debugging.Game.getThingPos('bird');
            var pigletPos = Debugging.Game.getThingPos('piglet');
            var basketPos = Debugging.Game.getThingPos('basket');
            var bucketPos = Debugging.Game.getThingPos('bucket');

            if (!Game.isSamePosition(puppyPos, basketPos)) {
                $($('#goal-list').find('li')[0]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalPuppy');
                return false;
            }
            $($('#goal-list').find('li')[0]).addClass('success');

            if (!Game.isSamePosition(birdPos, basketPos)) {
                $($('#goal-list').find('li')[1]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalBird');
                return false;
            }
            $($('#goal-list').find('li')[1]).addClass('success');

            if (!Game.isSamePosition(pigletPos, basketPos)) {
                $($('#goal-list').find('li')[2]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalPiglet');
                return false;
            }
            $($('#goal-list').find('li')[2]).addClass('success');

            return true;
        }
    },
    // Chap.4 - Level 12: Evaluation
    {
        isEvaluation: true,
        categoryIds: [],
        blockIds: ["Move_Robot", "Robot_Grab", "Robot_Drop", "Robot_Goto", "Robot_Say", "lists_getIndex"],
        scale: 0.9,
        ground: "wood",
        grndColor: "#fff",
        mapSize: 5,
        robot: {position:[4,2], state:"default", grab:[]},
        specialGrndInd: [[2,2], [1,0], [3,2], [1,1], [0,2]],
        specialGrndName: ['dirt','dirt','dirt','dirt','dirt'],
        thingsInd: [[0,1],[3,1],[1,3],[2,3],[4,4]],
        thingsName: ['rock1','bucket','rock2','rock3','basket'],
        missionGuideDescription: [
            "這一關又是測驗關卡～延續剛剛<span class='uk-text-primary'>函示</span>以及可以<span class='uk-text-primary'>輸入變數進入函式</span>的主題，這次我們來用函式清除石頭。",
            "底下的程式積木絕大多數都是正確的了，但是不知為什麼石頭還是無法清除，請你幫我找找問題出在哪裡。",
            "請點選<span class='uk-text-primary'>出問題的積木</span>並送出。這一關我希望能把石頭都放進桶子裡！",
        ],
        goals: [
            '確保 rocks.位置 == bucket.位置',
        ],
        answer: [',fOu9i.|^Wfrn`EJUci3','Robot_Drop'],
        solutionBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="5M9sTLDV5=C_ehsIGZ-6">basket</variable><variable type="" id="{PZ_9ZUwtUwVHi:1T87R">bucket</variable><variable type="" id="~zpv(5UZ@U[}7*by#flg">目標石頭</variable><variable type="" id="eNFvC4y6V{6}R1WNe_hb">rocks</variable><variable type="" id="^(g[{+rSW;I,%~A1D]RR">目標岩石</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="60" y="50"><next><block type="procedures_callnoreturn" id="KJm`[pY.LdoXFe,u-jl!"><mutation name="清理石頭"><arg name="目標石頭"></arg></mutation><value name="ARG0"><block type="lists_getIndex" id="lists_getIndex"><mutation statement="false" at="true"></mutation><field name="MODE">GET</field><field name="WHERE">FROM_START</field><value name="VALUE"><block type="variables_get" id="HqU!-n1[SGqOMgBy+j*b"><field name="VAR" id="eNFvC4y6V{6}R1WNe_hb" variabletype="">rocks</field></block></value><value name="AT"><block type="math_number" id="math_number"><field name="NUM">1</field></block></value></block></value><next><block type="procedures_callnoreturn" id="mt%I]W%?]{I,Zx3nL5a4"><mutation name="清理石頭"><arg name="目標石頭"></arg></mutation><value name="ARG0"><block type="lists_getIndex" id="UoSQd6!om2._6K;kTL(a"><mutation statement="false" at="true"></mutation><field name="MODE">GET</field><field name="WHERE">FROM_START</field><value name="VALUE"><block type="variables_get" id="iIaj6/eU9Cw/}mMTSO*y"><field name="VAR" id="eNFvC4y6V{6}R1WNe_hb" variabletype="">rocks</field></block></value><value name="AT"><block type="math_number" id="sCK5wrd49!tSjWQHD2FK"><field name="NUM">2</field></block></value></block></value><next><block type="procedures_callnoreturn" id="+(!*;tt0F_rc0hD@Dz3O"><mutation name="清理石頭"><arg name="目標石頭"></arg></mutation><value name="ARG0"><block type="lists_getIndex" id="[]@.s#if-Wg`kutq^Twt"><mutation statement="false" at="true"></mutation><field name="MODE">GET</field><field name="WHERE">FROM_START</field><value name="VALUE"><block type="variables_get" id="^Sk`EKc}O=dlSav,s[/v"><field name="VAR" id="eNFvC4y6V{6}R1WNe_hb" variabletype="">rocks</field></block></value><value name="AT"><block type="math_number" id="FN-Qh#ni-lr;kES71^xM"><field name="NUM">3</field></block></value></block></value></block></next></block></next></block></next></block><block type="procedures_defnoreturn" id="sY@TdTMQtv908vjJ+lFo" x="97" y="294"><mutation><arg name="目標石頭"></arg></mutation><field name="NAME">清理石頭</field><statement name="STACK"><block type="Robot_Goto" id="Robot_Goto"><value name="GOTO_NAME"><block type="variables_get" id="eTAMjF4cd/@#9+[5+nUB"><field name="VAR" id="~zpv(5UZ@U[}7*by#flg" variabletype="">目標石頭</field></block></value><next><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="variables_get" id="axE,UigKHnje.=7=pS]2"><field name="VAR" id="~zpv(5UZ@U[}7*by#flg" variabletype="">目標石頭</field></block></value><next><block type="Robot_Goto" id="Ql;bC@[)dJ6K:[%:[]GB"><value name="GOTO_NAME"><block type="variables_get" id="U#WK0X3U=srj%;Gc)=H."><field name="VAR" id="{PZ_9ZUwtUwVHi:1T87R" variabletype="">bucket</field></block></value><next><block type="Robot_Drop" id="Robot_Drop"><value name="DROP_NAME"><block type="variables_get" id=",fOu9i.|^Wfrn`EJUci3"><field name="VAR" id="~zpv(5UZ@U[}7*by#flg" variabletype="">目標石頭</field></block></value></block></next></block></next></block></next></block></statement></block></xml>',
        defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="5M9sTLDV5=C_ehsIGZ-6">basket</variable><variable type="" id="{PZ_9ZUwtUwVHi:1T87R">bucket</variable><variable type="" id="~zpv(5UZ@U[}7*by#flg">目標石頭</variable><variable type="" id="eNFvC4y6V{6}R1WNe_hb">rocks</variable><variable type="" id="^(g[{+rSW;I,%~A1D]RR">目標岩石</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="60" y="50"><next><block type="procedures_callnoreturn" id="KJm`[pY.LdoXFe,u-jl!"><mutation name="清理石頭"><arg name="目標石頭"></arg></mutation><value name="ARG0"><block type="lists_getIndex" id="lists_getIndex"><mutation statement="false" at="true"></mutation><field name="MODE">GET</field><field name="WHERE">FROM_START</field><value name="VALUE"><block type="variables_get" id="HqU!-n1[SGqOMgBy+j*b"><field name="VAR" id="eNFvC4y6V{6}R1WNe_hb" variabletype="">rocks</field></block></value><value name="AT"><block type="math_number" id="math_number"><field name="NUM">1</field></block></value></block></value><next><block type="procedures_callnoreturn" id="mt%I]W%?]{I,Zx3nL5a4"><mutation name="清理石頭"><arg name="目標石頭"></arg></mutation><value name="ARG0"><block type="lists_getIndex" id="UoSQd6!om2._6K;kTL(a"><mutation statement="false" at="true"></mutation><field name="MODE">GET</field><field name="WHERE">FROM_START</field><value name="VALUE"><block type="variables_get" id="iIaj6/eU9Cw/}mMTSO*y"><field name="VAR" id="eNFvC4y6V{6}R1WNe_hb" variabletype="">rocks</field></block></value><value name="AT"><block type="math_number" id="sCK5wrd49!tSjWQHD2FK"><field name="NUM">2</field></block></value></block></value><next><block type="procedures_callnoreturn" id="+(!*;tt0F_rc0hD@Dz3O"><mutation name="清理石頭"><arg name="目標石頭"></arg></mutation><value name="ARG0"><block type="lists_getIndex" id="[]@.s#if-Wg`kutq^Twt"><mutation statement="false" at="true"></mutation><field name="MODE">GET</field><field name="WHERE">FROM_START</field><value name="VALUE"><block type="variables_get" id="^Sk`EKc}O=dlSav,s[/v"><field name="VAR" id="eNFvC4y6V{6}R1WNe_hb" variabletype="">rocks</field></block></value><value name="AT"><block type="math_number" id="FN-Qh#ni-lr;kES71^xM"><field name="NUM">3</field></block></value></block></value></block></next></block></next></block></next></block><block type="procedures_defnoreturn" id="sY@TdTMQtv908vjJ+lFo" x="97" y="294"><mutation><arg name="目標石頭"></arg></mutation><field name="NAME">清理石頭</field><statement name="STACK"><block type="Robot_Goto" id="Robot_Goto"><value name="GOTO_NAME"><block type="variables_get" id="eTAMjF4cd/@#9+[5+nUB"><field name="VAR" id="~zpv(5UZ@U[}7*by#flg" variabletype="">目標石頭</field></block></value><next><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="variables_get" id="axE,UigKHnje.=7=pS]2"><field name="VAR" id="~zpv(5UZ@U[}7*by#flg" variabletype="">目標石頭</field></block></value><next><block type="Robot_Goto" id="Ql;bC@[)dJ6K:[%:[]GB"><value name="GOTO_NAME"><block type="variables_get" id="U#WK0X3U=srj%;Gc)=H."><field name="VAR" id="{PZ_9ZUwtUwVHi:1T87R" variabletype="">bucket</field></block></value><next><block type="Robot_Drop" id="Robot_Drop"><value name="DROP_NAME"><block type="variables_get" id=",fOu9i.|^Wfrn`EJUci3"><field name="VAR" id="^(g[{+rSW;I,%~A1D]RR" variabletype="">目標岩石</field></block></value></block></next></block></next></block></next></block></statement></block></xml>',
        checkLevelComplete: function(){
            var robotPos = Debugging.Game.getThingPos('robot');
            var rock1Pos = Debugging.Game.getThingPos('rock1');
            var rock2Pos = Debugging.Game.getThingPos('rock2');
            var rock3Pos = Debugging.Game.getThingPos('rock3');
            var bucketPos = Debugging.Game.getThingPos('bucket');

            if (!Game.isSamePosition(rock1Pos, bucketPos) || !Game.isSamePosition(rock2Pos, bucketPos) || !Game.isSamePosition(rock3Pos, bucketPos)) {
                $($('#goal-list').find('li')[0]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalRocks');
                return false;
            }
            $($('#goal-list').find('li')[0]).addClass('success');

            return true;
        }
    },
    // Chap.5 - Level 13: LearnBoolean (If-Then)
    {
        categoryIds: [],
        blockIds: ["Move_Robot", "Robot_Grab", "Robot_Drop", "Robot_Goto", "Check_Infection", "controls_if", "logic_compare", "logic_boolean"],
        scale: 0.9,
        ground: "dirt.grass",
        grndColor: "#fff",
        mapSize: 5,
        robot: {position:[1,1], state:"default", grab:[]},
        specialGrndInd: [[2,0],[2,1],[2,2],[2,3],[1,2],[3,3]],
        specialGrndName: ['infecteddirt','infecteddirt','infecteddirt','infecteddirt','infecteddirt','infecteddirt'],
        thingsInd: [[0, 1],[3, 1],[1, 3],[4, 4]],
        thingsName: ['kitten','bird','piglet','medicine'],
        // thingsName: ['glass','rock','boulder','container'],
        missionGuideDescription: [
            "主人主人，我們來到了大樓的地下室！地震導致污水漏出，看來有些小動物已經<span class='uk-text-primary'>受感染</span>了。",
            "要分辨哪些小動物有受感染哪些沒有，我可以用<span class='uk-text-primary'>檢查___是否受感染</span>積木，來判斷這隻小動物有沒有受感染，如果有感染，這個積木的答案會是<span class='uk-text-primary'>「真(true)」</span>，沒有感染則是<span class='uk-text-primary'>「否(false)」</span>。",
            "再搭配判斷式<span class='uk-text-primary'>如果 X 則執行 Y </span>積木，這個積木會先檢查 X 情況是否為真，如果為真(true)時，迪摩就會執行 Y 的動作。",
            "我已經寫了一些程式，這一關的任務是先<span class='uk-text-primary'>一一檢查小動物</span>，再把<span class='uk-text-primary'>受感染的小動物</span>都放在<span class='uk-text-primary'>藥物(medicine)</span>上面進行治療。<br>運行看看我的程式，你會比較了解函式與輸入是怎麼運作的。",
        ],
        goals: [
            '確保 受感染小動物.位置 == medicine.位置',
        ],
        solutionBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="mmG3jUQ!T7hkfNR|nP!z">bird</variable><variable type="" id="DtH3|HfjTUNDCh8H%v{p">piglet</variable><variable type="" id="xzX04*?:cw(fg@!laA-)">動物</variable><variable type="" id="3zw)..NQUOlZ2$|xJsfp">kitten</variable><variable type="" id="|55pL$tFu,lim(IxK.+;">medicine</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="66" y="29"><next><block type="procedures_callnoreturn" id="Jc;@ByJ+a^u%izl,l.MQ"><mutation name="前往檢查並放藥物上"><arg name="動物"></arg></mutation><value name="ARG0"><block type="text" id="g$Q{4^n@}@+-klw}2^;:"><field name="TEXT">kitten</field></block></value><next><block type="procedures_callnoreturn" id="mxGzj_o!K(57k1:1eE2o"><mutation name="前往檢查並放藥物上"><arg name="動物"></arg></mutation><value name="ARG0"><block type="text" id="r0hTqZeS5H`JrNO3mtuw"><field name="TEXT">bird</field></block></value><next><block type="procedures_callnoreturn" id="kfO3PsgD8Cl9s0lPQt)W"><mutation name="前往檢查並放藥物上"><arg name="動物"></arg></mutation><value name="ARG0"><block type="text" id="D%gCl{2r4t5/IK3#|kjd"><field name="TEXT">piglet</field></block></value></block></next></block></next></block></next></block><block type="procedures_defnoreturn" id="p)vQ?dju.(uDB%u}-Uzz" x="71" y="246"><mutation><arg name="動物"></arg></mutation><field name="NAME">前往檢查並放藥物上</field><statement name="STACK"><block type="Robot_Goto" id="Robot_Goto"><value name="GOTO_NAME"><block type="variables_get" id=",RM=ZYV;Fu$r:.LiCHLn"><field name="VAR" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value><next><block type="controls_if" id="t~FKH2PX2@6Nw.JuLLK`"><value name="IF0"><block type="logic_compare" id="%yDDN4O]mI0%.p_LvNai"><field name="OP">EQ</field><value name="A"><block type="Check_Infection" id="Check_Infection"><field name="ANIMAL" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value><value name="B"><block type="logic_boolean" id="gE}ygneX9^0m{o=l:lfJ"><field name="BOOL">TRUE</field></block></value></block></value><statement name="DO0"><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="variables_get" id="I9h)}NigP3w$^IrhHa,N"><field name="VAR" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value><next><block type="Robot_Goto" id="DfyE9:d(CDa{*xpsoYC]"><value name="GOTO_NAME"><block type="variables_get" id="zU;PSfj+HL6{`t`-M4@z"><field name="VAR" id="|55pL$tFu,lim(IxK.+;" variabletype="">medicine</field></block></value><next><block type="Robot_Drop" id="Robot_Drop"><value name="DROP_NAME"><block type="variables_get" id="(NS-5v2}_;FYNEv9sMqU"><field name="VAR" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value></block></next></block></next></block></statement></block></next></block></statement></block></xml>',
        defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="mmG3jUQ!T7hkfNR|nP!z">bird</variable><variable type="" id="DtH3|HfjTUNDCh8H%v{p">piglet</variable><variable type="" id="xzX04*?:cw(fg@!laA-)">動物</variable><variable type="" id="3zw)..NQUOlZ2$|xJsfp">kitten</variable><variable type="" id="|55pL$tFu,lim(IxK.+;">medicine</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="66" y="29"><next><block type="procedures_callnoreturn" id="Jc;@ByJ+a^u%izl,l.MQ"><mutation name="前往檢查並放藥物上"><arg name="動物"></arg></mutation><value name="ARG0"><block type="text" id="g$Q{4^n@}@+-klw}2^;:"><field name="TEXT">kitten</field></block></value><next><block type="procedures_callnoreturn" id="mxGzj_o!K(57k1:1eE2o"><mutation name="前往檢查並放藥物上"><arg name="動物"></arg></mutation><value name="ARG0"><block type="text" id="r0hTqZeS5H`JrNO3mtuw"><field name="TEXT">bird</field></block></value><next><block type="procedures_callnoreturn" id="kfO3PsgD8Cl9s0lPQt)W"><mutation name="前往檢查並放藥物上"><arg name="動物"></arg></mutation><value name="ARG0"><block type="text" id="D%gCl{2r4t5/IK3#|kjd"><field name="TEXT">piglet</field></block></value></block></next></block></next></block></next></block><block type="procedures_defnoreturn" id="p)vQ?dju.(uDB%u}-Uzz" x="71" y="246"><mutation><arg name="動物"></arg></mutation><field name="NAME">前往檢查並放藥物上</field><statement name="STACK"><block type="Robot_Goto" id="Robot_Goto"><value name="GOTO_NAME"><block type="variables_get" id=",RM=ZYV;Fu$r:.LiCHLn"><field name="VAR" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value><next><block type="controls_if" id="t~FKH2PX2@6Nw.JuLLK`"><value name="IF0"><block type="logic_compare" id="%yDDN4O]mI0%.p_LvNai"><field name="OP">EQ</field><value name="A"><block type="Check_Infection" id="Check_Infection"><field name="ANIMAL" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value><value name="B"><block type="logic_boolean" id="gE}ygneX9^0m{o=l:lfJ"><field name="BOOL">TRUE</field></block></value></block></value><statement name="DO0"><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="variables_get" id="I9h)}NigP3w$^IrhHa,N"><field name="VAR" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value><next><block type="Robot_Goto" id="DfyE9:d(CDa{*xpsoYC]"><value name="GOTO_NAME"><block type="variables_get" id="zU;PSfj+HL6{`t`-M4@z"><field name="VAR" id="|55pL$tFu,lim(IxK.+;" variabletype="">medicine</field></block></value><next><block type="Move_Robot" id="Move_Robot"><field name="DIRECTION">Left</field><field name="NUM_OF_MOVE">1</field><next><block type="Robot_Drop" id="Robot_Drop"><value name="DROP_NAME"><block type="variables_get" id="(NS-5v2}_;FYNEv9sMqU"><field name="VAR" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value></block></next></block></next></block></next></block></statement></block></next></block></statement></block></xml>',
        checkLevelComplete: function(){
            var robotPos = Debugging.Game.getThingPos('robot');
            var kittenPos = Debugging.Game.getThingPos('kitten');
            var birdPos = Debugging.Game.getThingPos('bird');
            var pigletPos = Debugging.Game.getThingPos('piglet');
            var medicinePos = Debugging.Game.getThingPos('medicine');

            if (!Game.isSamePosition(birdPos, medicinePos) || !Game.isSamePosition(pigletPos, medicinePos)) {
                $($('#goal-list').find('li')[0]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalInfection');
                return false;
            }
            $($('#goal-list').find('li')[0]).addClass('success');

            return true;
        }
    },
    // Chap.5 - Level 14: LearnBoolean (If-Then-Else)
    {
        categoryIds: [],
        blockIds: ["Robot_Grab", "Robot_Drop", "Robot_Goto", "Check_Infection_Before", "controls_if", "logic_compare", "logic_boolean", "variables_get"],
        scale: 0.84,
        ground: "dirt.grass",
        grndColor: "#fff",
        mapSize: 6,
        robot: {position:[1,1], state:"default", grab:[]},
        specialGrndInd: [[2,0],[2,1],[2,2],[2,3],[1,2],[3,3]],
        specialGrndName: ['infecteddirt','infecteddirt','infecteddirt','infecteddirt','infecteddirt','infecteddirt'],
        thingsInd: [[0, 1],[4, 3],[3, 2],[1, 5]],
        thingsName: ['box','basket','puppy','dog'],
        missionGuideDescription: [
            "主人主人，還好我們上一關有用判斷式<span class='uk-text-primary'>如果 X 則執行 Y </span>幫動物上藥，大部份受感染過的動物都痊癒了。",
            "但是為了避免再次傳染，我們要把<span class='uk-text-primary'>曾經感染過</span>的小動物，與<span class='uk-text-primary'>不曾感染過</span>的小動物分開放置。",
            "現在我們可以用判斷式<span class='uk-text-primary'>如果 X 執行 Y 否則 Z</span>積木，這個積木會先檢查 X 情況是否為真，如果為真(true)時迪摩就執行 Y 的動作，否則就執行 Z 的動作。",
            "受過感染的小動物要放進<span class='uk-text-primary'>箱子(box)</span>之中，沒有受過感染的則放進<span class='uk-text-primary'>籃子(basket)</span>之中。我已經寫好了一個<span class='uk-text-primary'>前往檢查並分開放置</span>函式，主人請運行看看我原有的程式積木，幫我找找問題在哪裡。",
        ],
        goals: [
            '確保 曾感染小動物.位置 == box.位置',
            '確保 不曾感染小動物.位置 == basket.位置',
        ],
        solutionBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="xzX04*?:cw(fg@!laA-)">動物</variable><variable type="" id="ZIOyn(?j/7$dGQ~D,]@i">box</variable><variable type="" id="BTwZ/@5OzEhPsKpu+wNG">basket</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="66" y="29"><next><block type="procedures_callnoreturn" id="Jc;@ByJ+a^u%izl,l.MQ"><mutation name="前往檢查並分開放置"><arg name="動物"></arg></mutation><value name="ARG0"><block type="text" id="g$Q{4^n@}@+-klw}2^;:"><field name="TEXT">dog</field></block></value><next><block type="procedures_callnoreturn" id="mxGzj_o!K(57k1:1eE2o"><mutation name="前往檢查並分開放置"><arg name="動物"></arg></mutation><value name="ARG0"><block type="text" id="r0hTqZeS5H`JrNO3mtuw"><field name="TEXT">puppy</field></block></value></block></next></block></next></block><block type="procedures_defnoreturn" id="p)vQ?dju.(uDB%u}-Uzz" x="69" y="186"><mutation><arg name="動物"></arg></mutation><field name="NAME">前往檢查並分開放置</field><statement name="STACK"><block type="Robot_Goto" id="Robot_Goto"><value name="GOTO_NAME"><block type="variables_get" id=",RM=ZYV;Fu$r:.LiCHLn"><field name="VAR" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value><next><block type="controls_if" id="t~FKH2PX2@6Nw.JuLLK`"><mutation else="1"></mutation><value name="IF0"><block type="logic_compare" id="%yDDN4O]mI0%.p_LvNai"><field name="OP">EQ</field><value name="A"><block type="Check_Infection_Before" id="Check_Infection_Before"><field name="ANIMAL" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value><value name="B"><block type="logic_boolean" id="gE}ygneX9^0m{o=l:lfJ"><field name="BOOL">TRUE</field></block></value></block></value><statement name="DO0"><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="variables_get" id="I9h)}NigP3w$^IrhHa,N"><field name="VAR" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value><next><block type="Robot_Goto" id="DfyE9:d(CDa{*xpsoYC]"><value name="GOTO_NAME"><block type="variables_get" id="zU;PSfj+HL6{`t`-M4@z"><field name="VAR" id="ZIOyn(?j/7$dGQ~D,]@i" variabletype="">box</field></block></value><next><block type="Robot_Drop" id="6oJ3WT#hM%5*y)4gCVSH"><value name="DROP_NAME"><block type="variables_get" id="GMK5nf]$}yl}Sh]6f!Z+"><field name="VAR" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value></block></next></block></next></block></statement><statement name="ELSE"><block type="Robot_Grab" id="z5O05sbn1nGioAG3,r{-"><value name="GRAB_NAME"><block type="variables_get" id="{XlH3rC5#zq:2(UyP!fO"><field name="VAR" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value><next><block type="Robot_Goto" id="4*{D]c`Z}yymrRczUF}w"><value name="GOTO_NAME"><block type="variables_get" id="^6+U-yN/2CK6a*0_nre8"><field name="VAR" id="BTwZ/@5OzEhPsKpu+wNG" variabletype="">basket</field></block></value><next><block type="Robot_Drop" id="^{[5lcqG]bRSIekW(G1q"><value name="DROP_NAME"><block type="variables_get" id="=}S%tZ[VK;.31Ls6K}NP"><field name="VAR" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value></block></next></block></next></block></statement></block></next></block></statement></block></xml>',
        defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="xzX04*?:cw(fg@!laA-)">動物</variable><variable type="" id="ZIOyn(?j/7$dGQ~D,]@i">box</variable><variable type="" id="BTwZ/@5OzEhPsKpu+wNG">basket</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="66" y="29"><next><block type="procedures_callnoreturn" id="Jc;@ByJ+a^u%izl,l.MQ"><mutation name="前往檢查並分開放置"><arg name="動物"></arg></mutation><value name="ARG0"><block type="text" id="g$Q{4^n@}@+-klw}2^;:"><field name="TEXT">dog</field></block></value><next><block type="procedures_callnoreturn" id="mxGzj_o!K(57k1:1eE2o"><mutation name="前往檢查並分開放置"><arg name="動物"></arg></mutation><value name="ARG0"><block type="text" id="r0hTqZeS5H`JrNO3mtuw"><field name="TEXT">puppy</field></block></value></block></next></block></next></block><block type="procedures_defnoreturn" id="p)vQ?dju.(uDB%u}-Uzz" x="69" y="186"><mutation><arg name="動物"></arg></mutation><field name="NAME">前往檢查並分開放置</field><statement name="STACK"><block type="Robot_Goto" id="Robot_Goto"><value name="GOTO_NAME"><block type="variables_get" id=",RM=ZYV;Fu$r:.LiCHLn"><field name="VAR" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value><next><block type="controls_if" id="t~FKH2PX2@6Nw.JuLLK`"><mutation else="1"></mutation><value name="IF0"><block type="logic_compare" id="%yDDN4O]mI0%.p_LvNai"><field name="OP">EQ</field><value name="A"><block type="Check_Infection_Before" id="Check_Infection_Before"><field name="ANIMAL" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value><value name="B"><block type="logic_boolean" id="gE}ygneX9^0m{o=l:lfJ"><field name="BOOL">TRUE</field></block></value></block></value><statement name="DO0"><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="variables_get" id="I9h)}NigP3w$^IrhHa,N"><field name="VAR" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value><next><block type="Robot_Goto" id="DfyE9:d(CDa{*xpsoYC]"><value name="GOTO_NAME"><block type="variables_get" id="zU;PSfj+HL6{`t`-M4@z"><field name="VAR" id="ZIOyn(?j/7$dGQ~D,]@i" variabletype="">box</field></block></value><next><block type="Robot_Drop" id="6oJ3WT#hM%5*y)4gCVSH"><value name="DROP_NAME"><block type="variables_get" id="GMK5nf]$}yl}Sh]6f!Z+"><field name="VAR" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value></block></next></block></next></block></statement><statement name="ELSE"><block type="Robot_Grab" id="z5O05sbn1nGioAG3,r{-"><value name="GRAB_NAME"><block type="variables_get" id="{XlH3rC5#zq:2(UyP!fO"><field name="VAR" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value><next><block type="Robot_Goto" id="4*{D]c`Z}yymrRczUF}w"><value name="GOTO_NAME"><block type="variables_get" id="^6+U-yN/2CK6a*0_nre8"><field name="VAR" id="BTwZ/@5OzEhPsKpu+wNG" variabletype="">basket</field></block></value></block></next></block></statement></block></next></block></statement></block></xml>',
        checkLevelComplete: function(){
            var robotPos = Debugging.Game.getThingPos('robot');
            var puppyPos = Debugging.Game.getThingPos('puppy');
            var dogPos = Debugging.Game.getThingPos('dog');
            var basketPos = Debugging.Game.getThingPos('basket');
            var boxPos = Debugging.Game.getThingPos('box');

            if (!Game.isSamePosition(puppyPos, boxPos)) {
                $($('#goal-list').find('li')[0]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalPuppy');
                return false;
            }
            $($('#goal-list').find('li')[0]).addClass('success');

            if (!Game.isSamePosition(dogPos, basketPos)) {
                $($('#goal-list').find('li')[1]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalDog');
                return false;
            }
            $($('#goal-list').find('li')[1]).addClass('success');

            return true;
        }
    },
    // Chap.5 - Level 15: Evaluation
    {
        isEvaluation: true,
        categoryIds: [],
        blockIds: ["Robot_Grab", "Robot_Drop", "Robot_Goto", "Check_Infection_Before", "controls_if", "logic_compare", "logic_boolean", "variables_get"],
        scale: 0.84,
        ground: "dirt.grass",
        grndColor: "#fff",
        mapSize: 5,
        robot: {position:[1,1], state:"default", grab:[]},
        specialGrndInd: [[2,0],[2,1],[2,2],[2,3],[3,2],[1,3],[1,4]],
        specialGrndName: ['infecteddirt','infecteddirt','infecteddirt','infecteddirt','infecteddirt','infecteddirt','infecteddirt'],
        thingsInd: [[1, 3],[4, 3],[2, 2],[0, 1]],
        thingsName: ['box','basket','puppy','dog'],
        missionGuideDescription: [
            "主人主人，這一關看起來跟上一關非常相似！",
            "然而這一關是<span class='uk-text-primary'>測驗關卡</span>，所以我們必須找出錯誤的積木，才能進行編輯修正。",
            "看起來我們一樣要將<span class='uk-text-primary'>感染的動物放進箱子（box）</span>，再把<span class='uk-text-primary'>未曾感染的動物放進籃子（basket）</span>。",
            "請主人<span class='uk-text-primary'>先運行看看程式碼</span>，讓我們來找出錯誤的地方在哪裡吧～",
        ],
        goals: [
            '確保 曾感染小動物.位置 == box.位置',
            '確保 不曾感染小動物.位置 == basket.位置',
        ],
        answer: ['gE}ygneX9^0m{o=l:lfJ', '%yDDN4O]mI0%.p_LvNai'],
        solutionBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="xzX04*?:cw(fg@!laA-)">動物</variable><variable type="" id="ZIOyn(?j/7$dGQ~D,]@i">box</variable><variable type="" id="BTwZ/@5OzEhPsKpu+wNG">basket</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="66" y="29"><next><block type="procedures_callnoreturn" id="Jc;@ByJ+a^u%izl,l.MQ"><mutation name="前往檢查並分開放置"><arg name="動物"></arg></mutation><value name="ARG0"><block type="text" id="g$Q{4^n@}@+-klw}2^;:"><field name="TEXT">dog</field></block></value><next><block type="procedures_callnoreturn" id="mxGzj_o!K(57k1:1eE2o"><mutation name="前往檢查並分開放置"><arg name="動物"></arg></mutation><value name="ARG0"><block type="text" id="r0hTqZeS5H`JrNO3mtuw"><field name="TEXT">puppy</field></block></value></block></next></block></next></block><block type="procedures_defnoreturn" id="p)vQ?dju.(uDB%u}-Uzz" x="69" y="186"><mutation><arg name="動物"></arg></mutation><field name="NAME">前往檢查並分開放置</field><statement name="STACK"><block type="Robot_Goto" id="Robot_Goto"><value name="GOTO_NAME"><block type="variables_get" id=",RM=ZYV;Fu$r:.LiCHLn"><field name="VAR" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value><next><block type="controls_if" id="t~FKH2PX2@6Nw.JuLLK`"><mutation else="1"></mutation><value name="IF0"><block type="logic_compare" id="%yDDN4O]mI0%.p_LvNai"><field name="OP">EQ</field><value name="A"><block type="Check_Infection_Before" id="Check_Infection_Before"><field name="ANIMAL" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value><value name="B"><block type="logic_boolean" id="gE}ygneX9^0m{o=l:lfJ"><field name="BOOL">TRUE</field></block></value></block></value><statement name="DO0"><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="variables_get" id="I9h)}NigP3w$^IrhHa,N"><field name="VAR" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value><next><block type="Robot_Goto" id="DfyE9:d(CDa{*xpsoYC]"><value name="GOTO_NAME"><block type="variables_get" id="zU;PSfj+HL6{`t`-M4@z"><field name="VAR" id="ZIOyn(?j/7$dGQ~D,]@i" variabletype="">box</field></block></value><next><block type="Robot_Drop" id="6oJ3WT#hM%5*y)4gCVSH"><value name="DROP_NAME"><block type="variables_get" id="GMK5nf]$}yl}Sh]6f!Z+"><field name="VAR" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value></block></next></block></next></block></statement><statement name="ELSE"><block type="Robot_Grab" id="z5O05sbn1nGioAG3,r{-"><value name="GRAB_NAME"><block type="variables_get" id="{XlH3rC5#zq:2(UyP!fO"><field name="VAR" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value><next><block type="Robot_Goto" id="4*{D]c`Z}yymrRczUF}w"><value name="GOTO_NAME"><block type="variables_get" id="^6+U-yN/2CK6a*0_nre8"><field name="VAR" id="BTwZ/@5OzEhPsKpu+wNG" variabletype="">basket</field></block></value><next><block type="Robot_Drop" id="U@-Q_s}FQYM_ZE2zFgd|"><value name="DROP_NAME"><block type="variables_get" id="PRgzq#0.DZ-Zq!0GJG%,"><field name="VAR" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value></block></next></block></next></block></statement></block></next></block></statement></block></xml>',
        defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="xzX04*?:cw(fg@!laA-)">動物</variable><variable type="" id="ZIOyn(?j/7$dGQ~D,]@i">box</variable><variable type="" id="BTwZ/@5OzEhPsKpu+wNG">basket</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="66" y="29"><next><block type="procedures_callnoreturn" id="Jc;@ByJ+a^u%izl,l.MQ"><mutation name="前往檢查並分開放置"><arg name="動物"></arg></mutation><value name="ARG0"><block type="text" id="g$Q{4^n@}@+-klw}2^;:"><field name="TEXT">dog</field></block></value><next><block type="procedures_callnoreturn" id="mxGzj_o!K(57k1:1eE2o"><mutation name="前往檢查並分開放置"><arg name="動物"></arg></mutation><value name="ARG0"><block type="text" id="r0hTqZeS5H`JrNO3mtuw"><field name="TEXT">puppy</field></block></value></block></next></block></next></block><block type="procedures_defnoreturn" id="p)vQ?dju.(uDB%u}-Uzz" x="69" y="186"><mutation><arg name="動物"></arg></mutation><field name="NAME">前往檢查並分開放置</field><statement name="STACK"><block type="Robot_Goto" id="Robot_Goto"><value name="GOTO_NAME"><block type="variables_get" id=",RM=ZYV;Fu$r:.LiCHLn"><field name="VAR" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value><next><block type="controls_if" id="t~FKH2PX2@6Nw.JuLLK`"><mutation else="1"></mutation><value name="IF0"><block type="logic_compare" id="%yDDN4O]mI0%.p_LvNai"><field name="OP">EQ</field><value name="A"><block type="Check_Infection_Before" id="Check_Infection_Before"><field name="ANIMAL" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value><value name="B"><block type="logic_boolean" id="gE}ygneX9^0m{o=l:lfJ"><field name="BOOL">FALSE</field></block></value></block></value><statement name="DO0"><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="variables_get" id="I9h)}NigP3w$^IrhHa,N"><field name="VAR" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value><next><block type="Robot_Goto" id="DfyE9:d(CDa{*xpsoYC]"><value name="GOTO_NAME"><block type="variables_get" id="zU;PSfj+HL6{`t`-M4@z"><field name="VAR" id="ZIOyn(?j/7$dGQ~D,]@i" variabletype="">box</field></block></value><next><block type="Robot_Drop" id="6oJ3WT#hM%5*y)4gCVSH"><value name="DROP_NAME"><block type="variables_get" id="GMK5nf]$}yl}Sh]6f!Z+"><field name="VAR" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value></block></next></block></next></block></statement><statement name="ELSE"><block type="Robot_Grab" id="z5O05sbn1nGioAG3,r{-"><value name="GRAB_NAME"><block type="variables_get" id="{XlH3rC5#zq:2(UyP!fO"><field name="VAR" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value><next><block type="Robot_Goto" id="4*{D]c`Z}yymrRczUF}w"><value name="GOTO_NAME"><block type="variables_get" id="^6+U-yN/2CK6a*0_nre8"><field name="VAR" id="BTwZ/@5OzEhPsKpu+wNG" variabletype="">basket</field></block></value><next><block type="Robot_Drop" id="U@-Q_s}FQYM_ZE2zFgd|"><value name="DROP_NAME"><block type="variables_get" id="PRgzq#0.DZ-Zq!0GJG%,"><field name="VAR" id="xzX04*?:cw(fg@!laA-)" variabletype="">動物</field></block></value></block></next></block></next></block></statement></block></next></block></statement></block></xml>',
        checkLevelComplete: function(){
            var robotPos = Debugging.Game.getThingPos('robot');
            var puppyPos = Debugging.Game.getThingPos('puppy');
            var dogPos = Debugging.Game.getThingPos('dog');
            var basketPos = Debugging.Game.getThingPos('basket');
            var boxPos = Debugging.Game.getThingPos('box');

            if (!Game.isSamePosition(puppyPos, boxPos)) {
                $($('#goal-list').find('li')[0]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalPuppy');
                return false;
            }
            $($('#goal-list').find('li')[0]).addClass('success');

            if (!Game.isSamePosition(dogPos, basketPos)) {
                $($('#goal-list').find('li')[1]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalDog');
                return false;
            }
            $($('#goal-list').find('li')[1]).addClass('success');

            return true;
        }
    }, 
    // Chap.6 - Level 16: LearnLoop (For)
    {
        categoryIds: [],
        blockIds: ["Move_Robot", "Robot_Goto", "controls_repeat_ext"],
        scale: 1.1,
        ground: "wood",
        grndColor: "#fff",
        mapSize: 9,
        robot: {position:[0,0], state:"default", grab:[]},
        specialGrndInd: [],
        specialGrndName: [],
        thingsInd: [[0,1],[1,1],[1,2],[1,3],[2,3],[3,3],[3,4],[3,5],[4,5],[5,5],[5,6],[3,0],[3,1],[4,1],[5,1],[5,2],[5,3],[6,3],[7,3],[7,4],[5,7],[7,5],[8,5],[6,7],[7,7],[7,8],[8,8]],
        thingsName: ['boulder1','boulder2','boulder3','boulder4','boulder5','boulder6','boulder7','boulder8','boulder9','boulderA','boulderB','boulderC','boulderD','boulderE','boulderF','boulderG','boulderH','boulderI','boulderJ','boulderK','boulderL','boulderM','boulderN','boulderO','boulderP','boulderQ','kitten'],
        missionGuideDescription: [
            "主人主人，這一關看起來很熟悉！這裡也有好多的落石，但是比之前那一關<span class='uk-text-primary'>有更多的轉彎</span>！但是我這部分晶片的<span class='uk-text-primary'>記憶體不足，已經不能再加任何積木</span>。。。",
            "阿！我想起來有一種<span class='uk-text-primary'>迴圈</span>的積木，可以<span class='uk-text-primary'>重複執行一段程式好多次</span>，這樣就不用堆好多積木了。迴圈就像是一段頭尾相連的程式積木，可以一直循環執行直到指定的次數完成才結束！太方便了！",
            "我跟之前一樣寫好了一個<span class='uk-text-primary'>「函式」叫做「向右走再向下走」</span>，放在粉紅色的<span class='uk-text-primary'>迴圈</span>積木之中。主人請幫我看看運行效果如何，好像距離小貓還差一點點。",
        ],
        goals: [
            '確保 robot.位置 == kitten.位置',
        ],
        solutionBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="#jE=#a,$[,@;[O5V=w]|">kitten</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="70" y="50"><next><block type="controls_repeat_ext" id="OC5lho7Y7!!R,Q[h0UuB"><value name="TIMES"><shadow type="math_number" id="IO=Q+E0mLcrsJHH!Z?fs"><field name="NUM">10</field></shadow><block type="math_number" id="5NUVz2-w5C)3Ks7Y9R8."><field name="NUM">4</field></block></value><statement name="DO"><block type="procedures_callnoreturn" id=")AhbX8|-i]9JhRvQX#gO"><mutation name="向右走再向下走"></mutation></block></statement></block></next></block><block type="procedures_defnoreturn" id="{a!Z3c-xu-oj2OEs{W49" x="75" y="208"><field name="NAME">向右走再向下走</field><statement name="STACK"><block type="Move_Robot" id="Move_Robot"><field name="DIRECTION">Right</field><field name="NUM_OF_MOVE">2</field><next><block type="Move_Robot" id="%@}$R}73R$60/|[QPSg("><field name="DIRECTION">Down</field><field name="NUM_OF_MOVE">2</field></block></next></block></statement></block></xml>',
        defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="#jE=#a,$[,@;[O5V=w]|">kitten</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="70" y="50"><next><block type="controls_repeat_ext" id="OC5lho7Y7!!R,Q[h0UuB"><value name="TIMES"><shadow type="math_number" id="IO=Q+E0mLcrsJHH!Z?fs"><field name="NUM">10</field></shadow><block type="math_number" id="5NUVz2-w5C)3Ks7Y9R8."><field name="NUM">3</field></block></value><statement name="DO"><block type="procedures_callnoreturn" id=")AhbX8|-i]9JhRvQX#gO"><mutation name="向右走再向下走"></mutation></block></statement></block></next></block><block type="procedures_defnoreturn" id="{a!Z3c-xu-oj2OEs{W49" x="75" y="208"><field name="NAME">向右走再向下走</field><statement name="STACK"><block type="Move_Robot" id="Move_Robot"><field name="DIRECTION">Right</field><field name="NUM_OF_MOVE">2</field><next><block type="Move_Robot" id="%@}$R}73R$60/|[QPSg("><field name="DIRECTION">Down</field><field name="NUM_OF_MOVE">2</field></block></next></block></statement></block></xml>',
        checkLevelComplete: function(){
            var robotPos = Debugging.Game.getThingPos('robot');
            var kittenPos = Debugging.Game.getThingPos('kitten');

            if (!Game.isSamePosition(robotPos, kittenPos)) {
                $($('#goal-list').find('li')[0]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoal');
                return false;
            }
            $($('#goal-list').find('li')[0]).addClass('success');

            return true;
        }
    },
    // Chap.6 - Level 17: LearnLoop (While)
    {   
        // categoryIds: ['Debugamo'],
        categoryIds: [],
        blockIds: ['Move_Robot', 'Robot_Goto', 'Robot_Grab', 'Robot_Remove_Rock', 'There_Is_Rock', 'controls_whileUntil', 'Robot_Say', 'text'],
        scale: 1,
        ground: "tilelight",
        grndColor: "#fff",
        mapSize: 5,
        robot: {
            position: [0, 2],
            state: 'default',
            grab: []
        },
        specialGrndInd: [[0,1],[0,3],[1,0],[1,2],[1,4],[2,1],[2,3],[3,0],[3,2],[3,4],[4,1],[4,3]],
        specialGrndName: ['tiledark','tiledark','tiledark','tiledark','tiledark','tiledark','tiledark','tiledark','tiledark','tiledark','tiledark','tiledark'],
        thingsInd: [[3,0],[4,0],[2,1],[2,0],[4,1],[1,2],[2,2],[3,2],[2,3],[3,3],[4,3],[0,4],[4,4],[4,2]],
        thingsName: ['rockA','rockB','rockC','rockD','rockE','rockF','rockG','rockH','rockI','rockJ','rockK','rockL','rockM','human'],
        missionGuideDescription: [
            '主人主人！我們來到震災的<span class="uk-text-primary">中心</span>了！這裡一片狼藉，有好多的落石。。。還有一個人！',
            '多虧你剛剛幫我修復晶片，我想起來我有一個「<span class="uk-text-primary">迪摩碎大石</span>」的技能可以使用！或許現在可以派上用場。<span class="uk-text-primary">當我與石頭位在同一個位置時，可以直接把石頭清除掉。</span>',
            '但是這裡石頭太多了，如果用清單一個一個去清除，一定很花時間。我可以用<span class="uk-text-primary">當 X 重複執行 Y </span>積木，來檢查「當(地圖內還有石頭)，就執行(前往清除石頭)」的功能，這樣應該會更有效率許多～',
            '主人請你試著運行看看原本的程式，我有點久沒使用這個功能，或許犯了什麼錯誤。:p'
        ],
        goals: [
            '確保 human.位置 == [0,2]',
            '確保地圖中 rock.數量 == 0',
        ],
        // Solution
        solutionBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="g:2*j^y84PH?kE(/di5(">rock</variable><variable type="" id="zCb1F18{clj8[Fk0BD2/">human</variable><variable type="" id="NZ%Zs{WVbgm:!]s!tc/N">kitten</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="60" y="40"><next><block type="controls_whileUntil" id="controls_whileUntil"><field name="MODE">WHILE</field><value name="BOOL"><block type="There_Is_Rock" id="There_Is_Rock"></block></value><statement name="DO"><block type="Robot_Goto" id="Robot_Goto"><value name="GOTO_NAME"><block type="variables_get" id="k(OAtYVFeT2Fq,5787;:"><field name="VAR" id="g:2*j^y84PH?kE(/di5(" variabletype="">rock</field></block></value><next><block type="Robot_Say" id="Robot_Say"><value name="SAY_TEXT"><shadow type="text" id="#9%Y3aGeibT)8eg5kTut"><field name="TEXT">我在石頭的位置！</field></shadow><block type="text" id="w4lf$I#g!j{%x0usUZcf"><field name="TEXT">我在石頭的位置！</field></block></value><next><block type="Robot_Remove_Rock" id="Robot_Remove_Rock"></block></next></block></next></block></statement><next><block type="Robot_Goto" id="Sh;fRj]0Oj3fQwA^*)7t"><value name="GOTO_NAME"><block type="variables_get" id="1$KRRvzWr2mCSb?-V#,x"><field name="VAR" id="zCb1F18{clj8[Fk0BD2/" variabletype="">human</field></block></value><next><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="variables_get" id="$C])(*Y_O0:OS{K*xqD7"><field name="VAR" id="zCb1F18{clj8[Fk0BD2/" variabletype="">human</field></block></value><next><block type="Move_Robot" id="](p*PSlD5TPDLycy4KQk"><field name="DIRECTION">Left</field><field name="NUM_OF_MOVE">4</field></block></next></block></next></block></next></block></next></block></xml>',
        defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="g:2*j^y84PH?kE(/di5(">rock</variable><variable type="" id="zCb1F18{clj8[Fk0BD2/">human</variable><variable type="" id="NZ%Zs{WVbgm:!]s!tc/N">kitten</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="60" y="40"><next><block type="controls_whileUntil" id="controls_whileUntil"><field name="MODE">WHILE</field><value name="BOOL"><block type="There_Is_Rock" id="There_Is_Rock"></block></value><statement name="DO"><block type="Robot_Goto" id="Robot_Goto"><value name="GOTO_NAME"><block type="variables_get" id="k(OAtYVFeT2Fq,5787;:"><field name="VAR" id="g:2*j^y84PH?kE(/di5(" variabletype="">rock</field></block></value><next><block type="Move_Robot" id="Move_Robot"><field name="DIRECTION">Up</field><field name="NUM_OF_MOVE">1</field><next><block type="Robot_Say" id="Robot_Say"><value name="SAY_TEXT"><shadow type="text" id="#9%Y3aGeibT)8eg5kTut"><field name="TEXT">我在石頭的位置！</field></shadow><block type="text" id="w4lf$I#g!j{%x0usUZcf"><field name="TEXT">我在石頭的位置！</field></block></value><next><block type="Robot_Remove_Rock" id="Robot_Remove_Rock"></block></next></block></next></block></next></block></statement><next><block type="Robot_Goto" id="Sh;fRj]0Oj3fQwA^*)7t"><value name="GOTO_NAME"><block type="variables_get" id="1$KRRvzWr2mCSb?-V#,x"><field name="VAR" id="zCb1F18{clj8[Fk0BD2/" variabletype="">human</field></block></value><next><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="variables_get" id="$C])(*Y_O0:OS{K*xqD7"><field name="VAR" id="zCb1F18{clj8[Fk0BD2/" variabletype="">human</field></block></value><next><block type="Move_Robot" id="](p*PSlD5TPDLycy4KQk"><field name="DIRECTION">Left</field><field name="NUM_OF_MOVE">4</field></block></next></block></next></block></next></block></next></block></xml>',
        checkLevelComplete: function() {
            var robotPos = Debugging.Game.getThingPos('robot');
            var humanPos = Debugging.Game.getThingPos('human');
            if (!Game.isSamePosition(humanPos, [0,2])) {
                $($('#goal-list').find('li')[0]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalHuman');
                return false;
            }
            $($('#goal-list').find('li')[0]).addClass('success');

            var flag = true;

            for (thing in Game.things) {
                if (thing.indexOf('rock') != -1) {
                    flag = false;
                }
            }

            if (!flag) {
                $($('#goal-list').find('li')[1]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalThereIsStillRock');
                return false;
            }
            $($('#goal-list').find('li')[1]).addClass('success');
            return true;
        },
    }, 
    // Chap.6 - Level 18: Evaluation
    {   
        // categoryIds: ['Debugamo'],
        isEvaluation: true,
        categoryIds: [],
        blockIds: ['Move_Robot', 'Robot_Goto', 'Robot_Grab', 'Robot_Remove_Glass', 'There_Is_Glass', 'controls_whileUntil', "controls_repeat_ext"],
        scale: 1,
        ground: "tilelight",
        grndColor: "#fff",
        mapSize: 6,
        robot: {
            position: [0, 2],
            state: 'default',
            grab: []
        },
        specialGrndInd: [[0,1],[0,3],[1,0],[1,2],[1,4],[2,1],[2,3],[0,5],[3,2],[2,5],[4,3],[3,0],[4,0],[5,0],[3,1],[4,1],[5,1],[3,4],[4,4],[5,4],[3,5],[4,5],[5,5],[5,2],[5,3]],
        specialGrndName: ['tiledark','tiledark','tiledark','tiledark','tiledark','tiledark','tiledark','tiledark','tiledark','tiledark','tiledark','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass','grass'],
        thingsInd: [[3,2],[0,0],[2,1],[5,4],[1,2],[3,3],[1,5],[0,2]],
        thingsName: ['glassA','glassB','glassC','glassD','glassE','glassF','glassG','human'],
        missionGuideDescription: [
            '終於來到大門口了～只是怎麼<span class="uk-text-primary">有這麼多的碎玻璃？</span>',
            '可能是整棟建築的窗框受到外力擠壓，導致一整排窗戶的玻璃(glass)都破碎掉到外頭了。。。我們必須把<span class="uk-text-primary">玻璃清除掉，才能讓這個受傷的人安全離開</span>。',
            '我可以用剛剛用過的<span class="uk-text-primary">當 X 重複執行 Y </span>積木，來檢查「當(地圖內還有玻璃)，就執行(前往清除玻璃)」的功能',
            '但是玻璃的清除方式比石頭複雜，需要<span class="uk-text-primary">連續使用「迪摩掃玻璃」積木三次</span>，才可以成功把玻璃清除掉。',
            '主人請你試著運行看看原本的程式，幫我找找問題出在哪裡。注意這一關是測驗關卡，需要<span class="uk-text-primary">先找到錯誤的積木送出，才能開始編輯哦</span>。加油！最後一關！'
        ],
        goals: [
            '確保 human.位置 == [5,2]',
            '確保地圖中 glass.數量 == 0',
        ],
        answer: ['3KMc*y:AWe506f+aeD/`', 'controls_repeat_ext'],
        // Solution
        solutionBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="zCb1F18{clj8[Fk0BD2/">human</variable><variable type="" id="7k$J.WLdWl9B|YEh2Klh">glass</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="60" y="40"><next><block type="controls_whileUntil" id="controls_whileUntil"><field name="MODE">WHILE</field><value name="BOOL"><block type="There_Is_Glass" id="There_Is_Glass"></block></value><statement name="DO"><block type="Robot_Goto" id="Robot_Goto"><value name="GOTO_NAME"><block type="variables_get" id="k(OAtYVFeT2Fq,5787;:"><field name="VAR" id="7k$J.WLdWl9B|YEh2Klh" variabletype="">glass</field></block></value><next><block type="Robot_Say" id="Robot_Say"><value name="SAY_TEXT"><shadow type="text" id="#9%Y3aGeibT)8eg5kTut"><field name="TEXT">我在石頭的位置！</field></shadow><block type="text" id="w4lf$I#g!j{%x0usUZcf"><field name="TEXT">我在玻璃的位置</field></block></value><next><block type="controls_repeat_ext" id="controls_repeat_ext"><value name="TIMES"><block type="math_number" id="3KMc*y:AWe506f+aeD/`"><field name="NUM">3</field></block></value><statement name="DO"><block type="Robot_Remove_Glass" id="Robot_Remove_Glass"></block></statement></block></next></block></next></block></statement><next><block type="Robot_Goto" id="Sh;fRj]0Oj3fQwA^*)7t"><value name="GOTO_NAME"><block type="variables_get" id="1$KRRvzWr2mCSb?-V#,x"><field name="VAR" id="zCb1F18{clj8[Fk0BD2/" variabletype="">human</field></block></value><next><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="variables_get" id="$C])(*Y_O0:OS{K*xqD7"><field name="VAR" id="zCb1F18{clj8[Fk0BD2/" variabletype="">human</field></block></value><next><block type="Move_Robot" id="](p*PSlD5TPDLycy4KQk"><field name="DIRECTION">Right</field><field name="NUM_OF_MOVE">5</field></block></next></block></next></block></next></block></next></block></xml>',
        defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="zCb1F18{clj8[Fk0BD2/">human</variable><variable type="" id="7k$J.WLdWl9B|YEh2Klh">glass</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="60" y="40"><next><block type="controls_whileUntil" id="controls_whileUntil"><field name="MODE">WHILE</field><value name="BOOL"><block type="There_Is_Glass" id="There_Is_Glass"></block></value><statement name="DO"><block type="Robot_Goto" id="Robot_Goto"><value name="GOTO_NAME"><block type="variables_get" id="k(OAtYVFeT2Fq,5787;:"><field name="VAR" id="7k$J.WLdWl9B|YEh2Klh" variabletype="">glass</field></block></value><next><block type="Robot_Say" id="Robot_Say"><value name="SAY_TEXT"><shadow type="text" id="#9%Y3aGeibT)8eg5kTut"><field name="TEXT">我在石頭的位置！</field></shadow><block type="text" id="w4lf$I#g!j{%x0usUZcf"><field name="TEXT">我在玻璃的位置</field></block></value><next><block type="controls_repeat_ext" id="controls_repeat_ext"><value name="TIMES"><block type="math_number" id="3KMc*y:AWe506f+aeD/`"><field name="NUM">6</field></block></value><statement name="DO"><block type="Robot_Remove_Glass" id="Robot_Remove_Glass"></block></statement></block></next></block></next></block></statement><next><block type="Robot_Goto" id="Sh;fRj]0Oj3fQwA^*)7t"><value name="GOTO_NAME"><block type="variables_get" id="1$KRRvzWr2mCSb?-V#,x"><field name="VAR" id="zCb1F18{clj8[Fk0BD2/" variabletype="">human</field></block></value><next><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="variables_get" id="$C])(*Y_O0:OS{K*xqD7"><field name="VAR" id="zCb1F18{clj8[Fk0BD2/" variabletype="">human</field></block></value><next><block type="Move_Robot" id="](p*PSlD5TPDLycy4KQk"><field name="DIRECTION">Right</field><field name="NUM_OF_MOVE">5</field></block></next></block></next></block></next></block></next></block></xml>',
        checkLevelComplete: function() {
            var robotPos = Debugging.Game.getThingPos('robot');
            var humanPos = Debugging.Game.getThingPos('human');
            if (!Game.isSamePosition(humanPos, [5,2])) {
                $($('#goal-list').find('li')[0]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalHuman');
                return false;
            }
            $($('#goal-list').find('li')[0]).addClass('success');

            var flag = true;

            for (thing in Game.things) {
                if (thing.indexOf('glass') != -1) {
                    flag = false;
                }
            }

            if (!flag) {
                $($('#goal-list').find('li')[1]).addClass('fail');
                UI.showFailText('Debugging_msg_noGoalThereIsStillRock');
                return false;
            }
            $($('#goal-list').find('li')[1]).addClass('success');
            return true;
        },
    },
    //////////////////// LEVEL TEMPLATE ////////////////////
    // {
    //     categoryIds: ["Debugamo"],
    //     blockIds: ["Move_Robot", "Robot_Grab", "Robot_Drop", "Robot_Goto", "lists_getIndexSimple"],
    //     scale: 0.9,
    //     ground: "wood",
    //     grndColor: "#fff",
    //     mapSize: 6,
    //     robot: {position:[], state:"", grab:[]},
    //     specialGrndInd: [],
    //     specialGrndName: [],
    //     thingsInd: [],
    //     thingsName: [],
    //     missionGuideDescription: [],
    //     goals: [],
    //     solutionBlocks: '',
    //     defaultBlocks: '',
    //     checkLevelComplete: function(){

    //     }
    // },
    // //////////////////// LEVEL TEMPLATE ////////////////////
    // {
    //  categoryIds: ["Debugamo"],
    //  blockIds: ["Move_Robot", "Robot_Grab", "Robot_Drop", "Robot_Goto", "lists_getIndexSimple"],
    //  scale: 0.9,
    //  ground: "wood",
    //  grndColor: "#fff",
    //  mapSize: 3,
    //  robot: {position:[], state:"", grab:[]},
    //  specialGrndInd: [],
    //  specialGrndName: [],
    //  thingsInd: [],
    //  thingsName: [],
    //  missionGuideDescription: [],
    //  goals: [],
    //  solutionBlocks: '',
    //  defaultBlocks: '',
    //  checkLevelComplete: function(){}
    // }
]