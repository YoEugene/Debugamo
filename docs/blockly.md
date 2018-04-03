
## Block Factory
* [fillCupWith](https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#37afv2)

## 在block中預先插入其他block的方法
```xml
<block type="math_arithmetic">
  <value name="A">
    <shadow type="math_number">
      <field name="NUM">500</field>
    </shadow>
  </value>
  <field name="OP">MULTIPLY</field>
  <value name="B">
    <shadow type="math_number">
      <field name="NUM">0.1</field>
    </shadow>
  </value>
</block>
```

## blockly 可調整的參數
```js
BlocklyGames.workspace = Blockly.inject('blockly', {
  'media': 'third-party/blockly/media/',
  'rtl': rtl,
  'toolbox': toolbox,
  'trashcan': true,
  'maxBlocks': Maze.MAX_BLOCKS,
  'zoom': {
    controls: true,
    wheel: true,
    startScale: scale,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2,
  },
  'grid': {
    spacing: 10,
    length: 1,
    colour: '#ccc',
    snap: true
  },
});
```
