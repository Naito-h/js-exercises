// 50 x 50の盤面
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

// セレクタで要素を取得
const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

// キャンバスのサイズ（500 x 500）
canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

// サウンドを再生するためのAudioオブジェクトを作成
const sound = new Audio("/ch15.11-15/ex09/decision1.mp3");

const socket = new WebSocket("ws://localhost:3003/");

socket.onopen = () => {
  console.log("WebSocket connection established");
};

// キャンバスがクリックされたら、その位置のセルを反転させるメッセージをサーバーに送信
canvas.onclick = (evt) => {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  // クリック位置から行と列を計算
  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);

  // セルをクリックしたときのサウンドを再生
  sound.cloneNode().play();

  // サーバーにtoggleメッセージを送信
  socket.send(JSON.stringify({ type: "toggle", row: row, col: col }));
};

// Startボタンがクリックされたらサーバーにstartメッセージを送信
startButton.onclick = () => {
  socket.send(JSON.stringify({ type: "start" }));
};

// Pauseボタンがクリックされたらサーバーにpauseメッセージを送信
pauseButton.onclick = () => {
  socket.send(JSON.stringify({ type: "pause" }));
};

// サーバーからメッセージを受信したらグリッドを描画する
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const grid = data.grid;

  // update以外のtypeは無視する
  if (data.type !== "update") {
    return;
  }

  // グリッドを描画する
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? "black" : "white";
      ctx.fill();
      ctx.stroke();
    }
  }
};