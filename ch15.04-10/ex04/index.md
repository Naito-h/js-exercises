# TOC.js の実行と改良

## TOC.jsの実行結果
TOC.jsの中身を実行した結果：
![TOC.jsの実行結果]({C6F2C127-1879-4FAB-BD12-19E17108E85D}.png)

---

## スムーズスクロールの実装
目次を選択したときにスムーズに遷移するように変更

### 実装コード
```js
link.addEventListener("click", (e) => {
  e.preventDefault();
  const target = document.querySelector(`a[name="${fragmentName}"]`);
  if (!target) {
    return;
  }
  window.scrollTo({
    left: 0,         // ページ左端に合わせる
    top: target.offsetTop,  // ページ上端がtargetの位置に来るようにする
    behavior: "smooth",     // スムーズにスクロールする
  });
});
```