const messageBox = document.querySelector("#message");
const submitButton = document.querySelector("#submit");
const content = document.querySelector("#content");

submitButton.onclick = async ()=> {
  // メッセージボックスを空にする
  const message = messageBox.value;
  messageBox.value = "";
  content.innerHTML = "";

  // ユーザーメッセージを表示
  const myMessageElem = document.createElement("p");
  myMessageElem.className = "my-message";
  myMessageElem.textContent = message;
  content.appendChild(myMessageElem);
  
  // チャットAPIにリクエストを送信
  const res = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gemma:2b",
      messages: [{ role: "user", content: message }],
      stream: true,
    })
  });
  
  // ボットのメッセージ用の要素を作成
  const botMessageElem = document.createElement("p");
  botMessageElem.className = "bot-message";
  content.appendChild(botMessageElem);

  // ストリームを処理
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let body = "";

  // 無限ループでデータを読み取る
  while (true) {
    let { done, value } = await reader.read();
    
    // デコードして body に追加
    body += decoder.decode(value, { stream: true });
    const lines = body.split('\n'); // 改行で分割
    body = lines.pop();
    
    // 各行を処理
    for (const line of lines) {
      if (line.trim()) {
        const data = JSON.parse(line); // JSON データに変換
        if (data.message?.content) {
          // ボットのメッセージを更新
          botMessageElem.textContent += data.message.content;
        }
      }
    }

    // 最後のチャンクならループを抜ける
    if (done) {
      break;
    }
  }
}