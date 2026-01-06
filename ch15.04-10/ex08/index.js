(function updateClock() {
    let now = new Date();
    let sec = now.getSeconds();
    let min = now.getMinutes() + sec / 60;
    let hour = (now.getHours() % 12) + min / 60; 
    let minangle = min * 6;
    let hourangle = hour * 30;

    let minhand = document.querySelector("#clock .minutehand");
    let hourhand = document.querySelector("#clock .hourhand");

    minhand.setAttribute("transform", `rotate(${minangle} 50 50)`);
    hourhand.setAttribute("transform", `rotate(${hourangle} 50 50)`);

    // アナログ時計に秒針を追加する
    let secangle = sec * 6; // 秒針の角度を計算 (360度/60秒 = 6度/秒)
    let sechand = document.querySelector("#clock .sechand"); // .sechand 要素を取得

    // .sechand 要素が存在しない場合は作成して追加
    if (!sechand) {
        sechand = document.createElementNS("http://www.w3.org/2000/svg", "line"); // SVG の line 要素を作成
        sechand.setAttribute("class", "sechand"); // クラス名を設定
        sechand.setAttribute("x1", "50");
        sechand.setAttribute("y1", "50");
        sechand.setAttribute("x2", "50");
        sechand.setAttribute("y2", "15");
        sechand.setAttribute("stroke", "red"); // 秒針の色を赤に設定
        sechand.setAttribute("stroke-width", "1"); // 秒針の太さを設定

        // 秒針を追加
        let hands = document.querySelector("#clock .hands");
        hands.appendChild(sechand);
    }

    sechand.setAttribute("transform", `rotate(${secangle} 50 50)`);

    // 1秒ごとに更新
    setTimeout(updateClock, 1000);
})();