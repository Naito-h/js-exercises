"use strict";

const button = document.querySelector("#send-button");
const messageContainer = document.getElementById("message-container");
button.addEventListener("click", (e) => {
  e.preventDefault();
  getMessageFromServer();
});
async function getMessageFromServer() {
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.textContent = "";
  messageContainer.appendChild(messageElement);

  // TODO: ここにサーバーとのやり取り等を実装しなさい
  // ボタンを無効化
  button.disabled = true;

  // EventSource を使ってサーバーからのイベントを受け取れるようにする
  const chat = new EventSource("http://localhost:3000/message");

  // サーバーからのメッセージを受け取ったときの処理
  chat.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    messageElement.textContent += data.value; // メッセージを追加

    // 最後のメッセージを受け取ったら接続を閉じる
    if (data.done) {
      chat.close(); // 接続を閉じる
      button.disabled = false;  // ボタンを再度有効化
      return;
    }
  });
}
