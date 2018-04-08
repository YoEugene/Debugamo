/**
 * 遊戲每一關 UI 設定區
 */

// 每一關的地圖、物件等設定 (UI相關)

goog.provide('Debugging.Levels');

Debugging.Levels = [
    // Chap.1 - Level 1: LearnMove
    {
        ground: "grass.default",

        grndColor: "#e2ffef",

        mapSize: 5,

        specialGrndInd: [
            [3, 0],
            [4, 1],
            [0, 4]
        ],

        specialGrndName: ['dirt.default', 'dirt.default', 'crack.default'],

        robot: {
            position: [0, 2],
            img: 'robot2'
        },

        thingsInd: [
            [4, 4]
        ],

        thingsName: ['kitten.default'],

        missionGuideDescription: [
            '遠方傳來「喵～喵～喵～」的聲音...原來是一隻小貓！',
            '我應該可以透過我的積木邏輯，移動到牠的位置，拯救這隻小貓。',
            '請協助迪摩，修改下方錯誤的積木程式，幫助他<span class="uk-text-warning">移動到小貓的位置</span>。'
        ]

    }
]