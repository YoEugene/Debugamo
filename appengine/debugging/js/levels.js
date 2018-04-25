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
        // categoryIds: ['Debugamo'],
        categoryIds: [],
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
        // defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="1G8/0+MAm_[Rv]cv1014">kitten</variable></variables><block type="When_Run" id="When_Run" x="73" y="43" deletable="false" movable="false"><next><block type="Move_Robot" id="Move_Robot" x="108" y="84"><field name="DIRECTION">Right</field><field name="NUM_OF_MOVE">3</field><next><block type="Move_Robot" id="4*RfZgzbkf!]z+hE30eD"><field name="DIRECTION">Down</field><field name="NUM_OF_MOVE">3</field></block></next></block></xml>',
        defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="1G8/0+MAm_[Rv]cv1014">kitten</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="73" y="43"><next><block type="Move_Robot" id="WVA?DwR41du.0H1suCGL"><field name="DIRECTION">Up</field><field name="NUM_OF_MOVE">1</field><next><block type="Move_Robot" id="Move_Robot"><field name="DIRECTION">Right</field><field name="NUM_OF_MOVE">5</field><next><block type="Move_Robot" id="4*RfZgzbkf!]z+hE30eD"><field name="DIRECTION">Down</field><field name="NUM_OF_MOVE">4</field><next><block type="Move_Robot" id="r}xl#{a;=,u0c|w9FcXO"><field name="DIRECTION">Left</field><field name="NUM_OF_MOVE">3</field></block></next></block></next></block></next></block></next></block></xml>',
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
        // categoryIds: ['Debugamo'],
        categoryIds: [],
        blockIds: ["Move_Robot", "Robot_Grab", "Robot_Drop"],
        scale: 1,
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
            "運行看看最初始的程式碼。<br>請幫我修改錯誤的積木，讓我能將<span class='uk-text-primary'>小貓（kitten）移到籃子（basket）裡頭</span>，再把<span class='uk-text-primary'>石頭（rock）移到桶子（bucket）裡頭</span>。"
        ],
        goals: [
            '確保 kitten.位置 == basket.位置',
            '確保 rock.位置 == bucket.位置',
        ],
        // Solution
        // defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="oZb5,BABi:VM}U(uKX7o">basket</variable><variable type="" id="TS6xgC;ZgJg-{Xpa!bW(">bucket</variable><variable type="" id="HWkBG~K8*,s6^-!ieHCj">rock</variable><variable type="" id="TMW@h8I}2xAL#_XFk^S2">kitten</variable></variables><block type="When_Run" id="When_Run" x="73" y="43" deletable="false" movable="false"><next><block type="Robot_Goto" id="Robot_Goto"><value name="GOTO_NAME"><block type="variables_get" id="M/IaJP9EGgY1R*4*Iqx|"><field name="VAR" id="HWkBG~K8*,s6^-!ieHCj" variabletype="">rock</field></block></value><next><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="variables_get" id="B@IOToz?/a}Yu!x9u[9-"><field name="VAR" id="HWkBG~K8*,s6^-!ieHCj" variabletype="">rock</field></block></value><next><block type="Robot_Goto" id="oz+,~UZ(/h=9}I`z0-y,"><value name="GOTO_NAME"><block type="variables_get" id="@Jy2t0#|6tp`]7`NvO|L"><field name="VAR" id="TS6xgC;ZgJg-{Xpa!bW(" variabletype="">bucket</field></block></value><next><block type="Robot_Drop" id="Robot_Drop"><value name="DROP_NAME"><block type="variables_get" id="XaIz$55[b1gu8{YaUaW?"><field name="VAR" id="HWkBG~K8*,s6^-!ieHCj" variabletype="">rock</field></block></value><next><block type="Robot_Goto" id="ygpq3etGTIlv3O)A$OO{"><value name="GOTO_NAME"><block type="variables_get" id="vfXa?p!IdhjHJ5DK9c9~"><field name="VAR" id="oZb5,BABi:VM}U(uKX7o" variabletype="">basket</field></block></value><next><block type="Robot_Grab" id="-RQM(tGz3m}[MY9Kpa=g"><value name="GRAB_NAME"><block type="variables_get" id="/#tY^?Ch2-eKX#v=GSQ("><field name="VAR" id="oZb5,BABi:VM}U(uKX7o" variabletype="">basket</field></block></value><next><block type="Robot_Goto" id="V8^m{+7]CC/f!74Z*J)*"><value name="GOTO_NAME"><block type="variables_get" id="`Yu!N1s+j-Qk!JX}hNc;"><field name="VAR" id="TMW@h8I}2xAL#_XFk^S2" variabletype="">kitten</field></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>',
        defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="oZb5,BABi:VM}U(uKX7o">basket</variable><variable type="" id="TS6xgC;ZgJg-{Xpa!bW(">bucket</variable><variable type="" id="HWkBG~K8*,s6^-!ieHCj">rock</variable><variable type="" id="TMW@h8I}2xAL#_XFk^S2">kitten</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="73" y="43"><next><block type="Move_Robot" id="Move_Robot"><field name="DIRECTION">Left</field><field name="NUM_OF_MOVE">1</field><next><block type="Move_Robot" id="YLS4d]f(3Lxrn~20^t|]"><field name="DIRECTION">Up</field><field name="NUM_OF_MOVE">1</field><next><block type="Robot_Drop" id="Robot_Drop"><value name="DROP_NAME"><block type="variables_get" id="ps:M_4M|ufBd]9~Z`zkc"><field name="VAR" id="HWkBG~K8*,s6^-!ieHCj" variabletype="">rock</field></block></value><next><block type="Move_Robot" id="MPs.A]hsUL79,Di|n8e{"><field name="DIRECTION">Down</field><field name="NUM_OF_MOVE">3</field><next><block type="Move_Robot" id="3H*[V`798i.mx4S~H:aj"><field name="DIRECTION">Left</field><field name="NUM_OF_MOVE">1</field><next><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="variables_get" id="C_!X+9[sAzco15G**o$."><field name="VAR" id="TMW@h8I}2xAL#_XFk^S2" variabletype="">kitten</field></block></value><next><block type="Move_Robot" id="t6oFLBWJZ4ZWK{OoyXY6"><field name="DIRECTION">Left</field><field name="NUM_OF_MOVE">2</field><next><block type="Move_Robot" id="J^pPLfa(d5Cc2l1@9X$u"><field name="DIRECTION">Up</field><field name="NUM_OF_MOVE">3</field><next><block type="Robot_Grab" id="Gq|i:VUSVnI.+`?IJ.Df"><value name="GRAB_NAME"><block type="variables_get" id="1~%cOc5Gxf0@Z,yck{32"><field name="VAR" id="HWkBG~K8*,s6^-!ieHCj" variabletype="">rock</field></block></value><next><block type="Move_Robot" id=".CZBA+SX5_LZ0D;,}9gT"><field name="DIRECTION">Right</field><field name="NUM_OF_MOVE">4</field><next><block type="Robot_Drop" id="e4Mow:30/(b6)iNyzs3v"><value name="DROP_NAME"><block type="variables_get" id="ejOC~jJ{u(pMgK-$TNGJ"><field name="VAR" id="TMW@h8I}2xAL#_XFk^S2" variabletype="">kitten</field></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>',
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
        // categoryIds: ['Debugamo'],
        categoryIds: [],
        blockIds: ["Move_Robot", "Robot_Goto", "Robot_Grab", "Robot_Drop"],
        scale: 0.9,
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
        // Solution
        // defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="IY|8Bjmna/R[M5ju|2Q^">piglet</variable><variable type="" id="C*`JJ[d[-$;6=Yi=VjiB">basket</variable><variable type="" id="WYvoA(@/FzNI#)gd{O$e">rock</variable><variable type="" id="PO3wj]bmjv48M0.QmRcn">kitten</variable><variable type="" id="L)4r,7zHA`h^U.9pzKKI">bucket</variable></variables><block type="When_Run" id="When_Run" x="73" y="43" deletable="false" movable="false"><next><block type="Robot_Goto" id="Robot_Goto" x="101" y="26"><value name="GOTO_NAME"><block type="variables_get" id="8a#7Y/Khl}U[]XyNk]_L"><field name="VAR" id="IY|8Bjmna/R[M5ju|2Q^" variabletype="">piglet</field></block></value><next><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="variables_get" id="!-P+XKsc`f28iSN0JWnK"><field name="VAR" id="IY|8Bjmna/R[M5ju|2Q^" variabletype="">piglet</field></block></value><next><block type="Robot_Goto" id="UQ9va(!/4.HsH^DOI6bd"><value name="GOTO_NAME"><block type="variables_get" id="R.g6,ORTIjA|)h-eRTvo"><field name="VAR" id="C*`JJ[d[-$;6=Yi=VjiB" variabletype="">basket</field></block></value><next><block type="Robot_Grab" id="Gs^FM2AJZ-b$t,Y/LfmF"><value name="GRAB_NAME"><block type="variables_get" id="n~R%h1R6STD2Qe+d1v}I"><field name="VAR" id="C*`JJ[d[-$;6=Yi=VjiB" variabletype="">basket</field></block></value><next><block type="Robot_Goto" id="GS=]2hqz]7$!DwHcpy)z"><value name="GOTO_NAME"><block type="variables_get" id="+3v9%PuoNh3%Bj=z+tS."><field name="VAR" id="PO3wj]bmjv48M0.QmRcn" variabletype="">kitten</field></block></value><next><block type="Robot_Drop" id="Robot_Drop"><value name="DROP_NAME"><block type="variables_get" id=";W4l`3iEM-U.e#Ybq=O;"><field name="VAR" id="C*`JJ[d[-$;6=Yi=VjiB" variabletype="">basket</field></block></value><next><block type="Robot_Drop" id="5Z6B/RyHb$Z_N$YUnD+8"><value name="DROP_NAME"><block type="variables_get" id="}e!o1FIk!d+i:jNK%{}A"><field name="VAR" id="IY|8Bjmna/R[M5ju|2Q^" variabletype="">piglet</field></block></value><next><block type="Robot_Goto" id="U}8v/]58_B^n}-PNi-Uf"><value name="GOTO_NAME"><block type="variables_get" id="y8qTzF/^N0%2O[CYCLPm"><field name="VAR" id="L)4r,7zHA`h^U.9pzKKI" variabletype="">bucket</field></block></value><next><block type="Robot_Grab" id="w{m~p+BS3spi!V%J0{Y("><value name="GRAB_NAME"><block type="variables_get" id="H607l4R}Uf~iEAO+RU/W"><field name="VAR" id="L)4r,7zHA`h^U.9pzKKI" variabletype="">bucket</field></block></value><next><block type="Robot_Goto" id="rF=,bt}~u1Hi~8aV:+B7"><value name="GOTO_NAME"><block type="variables_get" id="k|[~C=!r,hl#+yybO=tc"><field name="VAR" id="WYvoA(@/FzNI#)gd{O$e" variabletype="">rock</field></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>',
        defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="IY|8Bjmna/R[M5ju|2Q^">piglet</variable><variable type="" id="C*`JJ[d[-$;6=Yi=VjiB">basket</variable><variable type="" id="WYvoA(@/FzNI#)gd{O$e">rock</variable><variable type="" id="PO3wj]bmjv48M0.QmRcn">kitten</variable><variable type="" id="L)4r,7zHA`h^U.9pzKKI">bucket</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="73" y="43"><next><block type="Robot_Goto" id="Robot_Goto"><value name="GOTO_NAME"><block type="variables_get" id="7:^qa[Rc!N?+3k-6hyas"><field name="VAR" id="WYvoA(@/FzNI#)gd{O$e" variabletype="">rock</field></block></value><next><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="variables_get" id="X{4gZciS3a8a?lu!TGCV"><field name="VAR" id="WYvoA(@/FzNI#)gd{O$e" variabletype="">rock</field></block></value><next><block type="Move_Robot" id="Move_Robot"><field name="DIRECTION">Left</field><field name="NUM_OF_MOVE">2</field><next><block type="Move_Robot" id="He*(GIbw+`Z@@y/nfaq!"><field name="DIRECTION">Up</field><field name="NUM_OF_MOVE">1</field><next><block type="Robot_Drop" id="|t67QM{1i_.+)hRd!FIf"><value name="DROP_NAME"><block type="variables_get" id="0a4yG:+F)9VX*CM3M6G^"><field name="VAR" id="IY|8Bjmna/R[M5ju|2Q^" variabletype="">piglet</field></block></value><next><block type="Robot_Goto" id="7X8GHVzUwdOox|8r!n%x"><value name="GOTO_NAME"><block type="variables_get" id="!VS*5yroM5pC/W~?G{QY"><field name="VAR" id="C*`JJ[d[-$;6=Yi=VjiB" variabletype="">basket</field></block></value><next><block type="Robot_Drop" id="fIz0V_~8@{Lp^|EKObNU"><value name="DROP_NAME"><block type="variables_get" id="Gc7nu:4aNEkl/:Spvj!3"><field name="VAR" id="IY|8Bjmna/R[M5ju|2Q^" variabletype="">piglet</field></block></value><next><block type="Move_Robot" id="@oGhXgq9Q,ut7Gf?kYvl"><field name="DIRECTION">Down</field><field name="NUM_OF_MOVE">2</field><next><block type="Robot_Drop" id="iml9ldH4872bwMY$s~Xe"><value name="DROP_NAME"><block type="variables_get" id="5,@(O9li]q5/+J_LmaA4"><field name="VAR" id="PO3wj]bmjv48M0.QmRcn" variabletype="">kitten</field></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>',
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
        // categoryIds: ['Debugamo'],
        categoryIds: [],
        blockIds: ["Move_Robot", "Robot_Grab", "Robot_Drop", "Robot_Goto", "lists_getIndex"],
        scale: 0.9,
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
            "為了解決這個問題，我總是會建立一個叫做<span class='uk-text-primary'>「kittens」（小貓們）</span>的<span class='uk-text-primary'>清單</span>，再用「第一筆」與「最後一筆」來分辨他們。",
            "底下有一些範例，試著跑跑看原始的積木，了解清單的用法。<br><br>這關的目標是<span class='uk-text-primary'>讓小貓們都回到籃子之中</span>。"
        ],
        goals: [
            "確保 kittens.位置 == basket.位置"
        ],
        // Solution
        // defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="FL%7`R|ytP8Xmguc/u@L">kittens</variable><variable type="" id="JU4ypmw%}4sDAVhSb*ov">basket</variable></variables><block type="When_Run" id="When_Run" x="73" y="43" deletable="false" movable="false"><next><block type="Robot_Goto" id="Robot_Goto" x="83" y="75"><value name="GOTO_NAME"><block type="lists_getIndex" id="SCiR#i^PqJ7zo2)?XrhJ"><mutation statement="false" at="false"></mutation><field name="MODE">GET</field><field name="WHERE">FIRST</field><value name="VALUE"><block type="variables_get" id="?rW7[xLHO3Y02n,Yl*gQ"><field name="VAR" id="FL%7`R|ytP8Xmguc/u@L" variabletype="">kittens</field></block></value></block></value><next><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="lists_getIndex" id="y;8{LTm]3KFqLxK[f,qa"><mutation statement="false" at="false"></mutation><field name="MODE">GET</field><field name="WHERE">FIRST</field><value name="VALUE"><block type="variables_get" id=")Mt8*MYaMUO0FWk$ubyG"><field name="VAR" id="FL%7`R|ytP8Xmguc/u@L" variabletype="">kittens</field></block></value></block></value><next><block type="Robot_Goto" id="3r=GsNMM{9J*)O8,^y$N"><value name="GOTO_NAME"><block type="lists_getIndex" id="6(lYd0D]Q22BIuxO{J1O"><mutation statement="false" at="false"></mutation><field name="MODE">GET</field><field name="WHERE">LAST</field><value name="VALUE"><block type="variables_get" id="Qs#Sm%lIoh}qv!:_[wep"><field name="VAR" id="FL%7`R|ytP8Xmguc/u@L" variabletype="">kittens</field></block></value></block></value><next><block type="Robot_Grab" id="47*lEXPEq~:,[Lv@e_z~"><value name="GRAB_NAME"><block type="lists_getIndex" id="hWo2jXR/8ju62^h24nil"><mutation statement="false" at="false"></mutation><field name="MODE">GET</field><field name="WHERE">LAST</field><value name="VALUE"><block type="variables_get" id="Jp$!nIYTFB63?r!(@uCp"><field name="VAR" id="FL%7`R|ytP8Xmguc/u@L" variabletype="">kittens</field></block></value></block></value><next><block type="Robot_Goto" id=")OJC#|Uf-_?(ud:y^9_+"><value name="GOTO_NAME"><block type="variables_get" id="W_:;*2I=wQ_@k%bwW7xk"><field name="VAR" id="JU4ypmw%}4sDAVhSb*ov" variabletype="">basket</field></block></value></block></next></block></next></block></next></block></next></block></xml>',
        defaultBlocks: '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="FL%7`R|ytP8Xmguc/u@L">kittens</variable><variable type="" id="JU4ypmw%}4sDAVhSb*ov">basket</variable><variable type="" id="/YS(;RNUqW6WwU;;w|-(">kitten</variable><variable type="" id="!DJ-4OBAF`}[jSDVZpwc">baskets</variable></variables><block type="When_Run" id="When_Run" deletable="false" movable="false" x="73" y="43"><next><block type="Robot_Goto" id="Robot_Goto"><value name="GOTO_NAME"><block type="lists_getIndex" id="SCiR#i^PqJ7zo2)?XrhJ"><mutation statement="false" at="false"></mutation><field name="MODE">GET</field><field name="WHERE">FIRST</field><value name="VALUE"><block type="variables_get" id="?rW7[xLHO3Y02n,Yl*gQ"><field name="VAR" id="FL%7`R|ytP8Xmguc/u@L" variabletype="">kittens</field></block></value></block></value><next><block type="Robot_Grab" id="Robot_Grab"><value name="GRAB_NAME"><block type="lists_getIndex" id="y;8{LTm]3KFqLxK[f,qa"><mutation statement="false" at="false"></mutation><field name="MODE">GET</field><field name="WHERE">FIRST</field><value name="VALUE"><block type="variables_get" id="=?m!hDhc+]T@[S|@Vymn"><field name="VAR" id="/YS(;RNUqW6WwU;;w|-(" variabletype="">kitten</field></block></value></block></value><next><block type="Robot_Goto" id="3r=GsNMM{9J*)O8,^y$N"><value name="GOTO_NAME"><block type="lists_getIndex" id="6(lYd0D]Q22BIuxO{J1O"><mutation statement="false" at="false"></mutation><field name="MODE">GET</field><field name="WHERE">LAST</field><value name="VALUE"><block type="variables_get" id="xeh;p[Gr9%{4P=@O?yP5"><field name="VAR" id="!DJ-4OBAF`}[jSDVZpwc" variabletype="">baskets</field></block></value></block></value><next><block type="Robot_Grab" id="47*lEXPEq~:,[Lv@e_z~"><value name="GRAB_NAME"><block type="lists_getIndex" id="hWo2jXR/8ju62^h24nil"><mutation statement="false" at="false"></mutation><field name="MODE">GET</field><field name="WHERE">LAST</field><value name="VALUE"><block type="variables_get" id="Jp$!nIYTFB63?r!(@uCp"><field name="VAR" id="FL%7`R|ytP8Xmguc/u@L" variabletype="">kittens</field></block></value></block></value><next><block type="Robot_Goto" id=")OJC#|Uf-_?(ud:y^9_+"><value name="GOTO_NAME"><block type="lists_getIndex" id="Y$*w4u9qV?3*KNTcxh-."><mutation statement="false" at="false"></mutation><field name="MODE">GET</field><field name="WHERE">FIRST</field><value name="VALUE"><block type="variables_get" id="*xzru9[Y|b9e9x4bwduH"><field name="VAR" id="!DJ-4OBAF`}[jSDVZpwc" variabletype="">baskets</field></block></value></block></value><next><block type="Robot_Drop" id="Robot_Drop"><value name="DROP_NAME"><block type="variables_get" id="W_:;*2I=wQ_@k%bwW7xk"><field name="VAR" id="JU4ypmw%}4sDAVhSb*ov" variabletype="">basket</field></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>',
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
    //////////////////// LEVEL TEMPLATE ////////////////////
    {
     categoryIds: [],
     blockIds: ["Move_Robot", "Robot_Grab", "Robot_Drop", "Robot_Goto", "lists_getIndex"],
     scale: 0.9,
     ground: "",
     grndColor: "",
     mapSize: 3,
     robot: {position:[], state:""},
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