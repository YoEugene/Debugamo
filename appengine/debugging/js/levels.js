/**
 * 遊戲每一關 UI 設定區
 */

// 每一關的地圖、物件等設定 (UI相關)

goog.provide('Debugging.Levels');

Debugging.Levels = [
    // Chap.1 - Level 1: LearnMove
    {
        ground: "grass",

        grndColor: "#e2ffef",

        mapSize: 5,

        specialGrndInd: [ [3,0], [4,1],[0,4]],
        
        specialGrndName: ['dirt', 'dirt', 'infecteddirt']
        
    }
]