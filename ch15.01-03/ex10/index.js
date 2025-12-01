const editorFront = document.querySelector("#editor-front");
const editorBack = document.querySelector("#editor-back");

// 1. div 要素をクリックすると input 要素が focus される
editorFront.addEventListener("click", () => {
    editorBack.focus();
});

// 2. div 要素は通常白色で input 要素に focus されると灰色 (silver)になる (input 要素から focus が外れると白色に戻る)
editorFront.style.backgroundColor = "white";
editorBack.addEventListener("focus", () => {
    editorFront.style.backgroundColor = "silver";
});
editorBack.addEventListener("blur", () => {
    editorFront.style.backgroundColor = "white";
});

// 3. input 要素に入力された text は div 要素にも表示される
editorBack.addEventListener("input", () => {
    editorFront.textContent = editorBack.value;
});