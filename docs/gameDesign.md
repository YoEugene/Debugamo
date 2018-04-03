
## To Decide
* 1-1 要不要用帶容量的fill cup with
*

## Data Format
```js
var cup = {
  class: "cup",
  capacity: 500, // unchangeable
  filled: {
    "black tea": 300,
    "milk": 200,
  },
  filledVolume: 500,
};

cup.filled["black tea"] += 300;
cup.filledVolume += 300;
```