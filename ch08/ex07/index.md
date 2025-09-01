# 問題 8.7

https://www.ricoh.co.jp を開き、ロードされている js ファイル中で名前空間としての関数の即時関数実行式を使っている js ファイルを 1 つ以上見つけて URL を記載しなさい。

### init.js

url: 
https://www.ricoh.co.jp/-/Media/Ricoh/Common/cmn_g_header_footer/js/init.js
```
((win, doc) => {
var req = new XMLHttpRequest();
req.open("GET", "/-/Media/Ricoh/Common/cmn_g_header_footer/js/initBase.js", false);
req.send();
eval(req.responseText);
})(window, document);
```

### template.js

url: 
https://www.ricoh.co.jp/-/Media/Ricoh/Common/cmn_g_header_footer/js/template.js
```
((win, doc) => {
var template = document.createElement("script");
template.src = "/-/Media/Ricoh/Common/cmn_g_header_footer/js/templateBase";
template.type = "module";
document.body.appendChild(template);
})(window, document);
```