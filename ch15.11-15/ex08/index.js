const payload1 = document.querySelector("#payload1");
const payload2 = document.querySelector("#payload2");
const payload3 = document.querySelector("#payload3");
const response1 = document.querySelector("#response1");
const response2 = document.querySelector("#response2");
const response3 = document.querySelector("#response3");
const button = document.querySelector("#send");

let socket = new WebSocket("ws://localhost:3003/");

let requestIdCounter = 1;

// 各リクエストの状態を管理するマップ
const state = new Map();

// リクエストIDを保持する変数
let requestId1, requestId2, requestId3;

// 送信ボタンがクリックされたらリクエストを送信する
button.onclick = (e) => {
    // ページのリロードを防止
    e.preventDefault();

    // リクエスト1を送信
    requestId1 = requestIdCounter++;
    socket.send(JSON.stringify({ "requestId": requestId1, "type": "request", "payload": payload1.value }));
    response1.textContent = "Loading...";
    state.set(requestId1, "pending"); // 状態を pending に設定

    // 3秒後に状態が pending のままだったらタイムアウトとする
    setTimeout(() => {
        if (state.get(requestId1) === "pending") {
            const timeoutResponse = { requestId: requestId1, type: "error", payload: "Response timed out" };
            setResponseText(timeoutResponse);
            state.set(requestId1, "timeout"); // 状態を timeout に設定
        }
    }, 3000);

    // リクエスト2を送信
    requestId2 = requestIdCounter++;
    socket.send(JSON.stringify({ "requestId": requestId2, "type": "request", "payload": payload2.value }));
    response2.textContent = "Loading...";
    state.set(requestId2, "pending"); // 状態を pending に設定

    // 3秒後に状態が pending のままだったらタイムアウトとする
    setTimeout(() => {
        if (state.get(requestId2) === "pending") {
            const timeoutResponse = { requestId: requestId2, type: "error", payload: "Response timed out" };
            setResponseText(timeoutResponse);
            state.set(requestId2, "timeout"); // 状態を timeout に設定
        }
    }, 3000);

    // リクエスト3を送信
    requestId3 = requestIdCounter++;
    socket.send(JSON.stringify({ "requestId": requestId3, "type": "request", "payload": payload3.value }));
    response3.textContent = "Loading...";
    state.set(requestId3, "pending"); // 状態を pending に設定

    // 3秒後に状態が pending のままだったらタイムアウトとする
    setTimeout(() => {
        if (state.get(requestId3) === "pending") {
            const timeoutResponse = { requestId: requestId3, type: "error", payload: "Response timed out" };
            setResponseText(timeoutResponse);
            state.set(requestId3, "timeout"); // 状態を timeout に設定
        }
    }, 3000);

    // 動作確認用：2秒後に接続を閉じる
    // setTimeout(() => {
    //     socket.close();
    // }, 2000);
}

// サーバーからメッセージを受信したらレスポンスの内容を表示する
socket.onmessage = (event) => {
    // サーバーからのメッセージを取得
    const response = JSON.parse(event.data);

    // レスポンスのメッセージを表示
    setResponseText(response)

    // 状態を completed に設定
    state.set(response.requestId, "completed");
}

// 接続が閉じられたら全ての未完了リクエストを closed に設定する
socket.onclose = (event) => {
    // pending 状態のものだけを closed に設定
    state.forEach((value, key) => {
        if (value === "pending") {
            const response = { requestId: key, type: "error", payload: "Connection closed" };
            setResponseText(response);
            state.set(key, "closed"); // 状態を closed に設定
        }
    });
}

// レスポンスの内容を表示する関数
function setResponseText(response) {
    // 状態が pending 以外の場合は無視する
    if (state.get(response.requestId) !== "pending") {
        return;
    }

    // エラーレスポンスの場合は先頭にError: を追加
    if (response.type !== "response") {
        response.payload = `Error: ${response.payload}`;
    }

    // id に応じて表示する要素を切り替え
    if (response.requestId === requestId1) {
        response1.textContent = response.payload;
    } else if (response.requestId === requestId2) {
        response2.textContent = response.payload;
    } else if (response.requestId === requestId3) {
        response3.textContent = response.payload;
    }
}
