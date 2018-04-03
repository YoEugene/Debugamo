![SVG](https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/SVG_logo.svg/200px-SVG_logo.svg.png)

可縮放向量圖形（英語：Scalable Vector Graphics，SVG）是一種基於可延伸標記式語言（XML），用於描述二維向量圖形的圖形格式。SVG 由 W3C 制定，是一個開放標準。

## Note

* 「SVG 研究之路」(不錯的教學文章，但注意這在 2014 年完成，可能有更新版的實作法): http://www.oxxostudio.tw/list.html

### Viewport(視區) / Viewbox(視盒)

* 閱讀: http://www.oxxostudio.tw/articles/201409/svg-23-viewpoint-viewBox.html
* 重點: 
	* 針對一個 SVG 物件，對其設定 width / height 即是在定義 Viewport 視區大小，也就是圖片的可視區域大小
	* 若沒有指定 Viewbox，則 Viewbox 預設大小與 Viewport 一樣
	* 若指定 Viewbox(min-x, min-y, width, height)，則 Viewbox 將會從 (min-x, min-y) 點向右下方框起 (width, height) 大小的區域，並自動縮放至整個 Viewport 範圍
	* Viewbox 非常適合用來做「縮放」的功能

### Clipping(剪裁) and Masking(遮色片) 

* 閱讀1: http://www.oxxostudio.tw/articles/201406/svg-09-clipping-masking.html
* 閱讀2: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Clipping_and_masking
* 重點:
	* Clipping(剪裁)是「整個蓋掉」，先用 `defs` 定義剪裁圖形，這些圖形以外的都會被剪裁
	* Masking(遮色片)是「部分遮蓋顏色」，一樣用 `defs` 定義遮色片圖形與顏色，這些圖形以內的都會被遮色


## Credit icon(要放credit在網頁上)

* Milk: https://www.flaticon.com/free-icon/milk_135626
* Tea: https://www.flaticon.com/free-icon/water_206349