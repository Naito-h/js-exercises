import { useState } from 'react'
import './App.css'

function App() {
  // TODOアイテムの配列を管理するための状態を定義
  const [items, setItems] = useState([]);

  // フォームの送信イベントを処理する関数
  const handleSubmit = (event) => {
    event.preventDefault(); // リロードを防止

    // 入力フィールドから値を取得
    const input = document.querySelector("#new-todo");
    const value = input.value.trim();
    if (value === "") {
      return;
    }

    // 新しいTODOを既存の配列に追加
    const todo = { name: value, completed: false };
    setItems([...items, todo]);

    input.value = ""; // 入力フィールドを空にする
  };

  return (
    <>
      <div id="header">
        <h1>TODOリスト</h1>
      </div>
      <div id="main">
        {/* TODOアイテムを追加するためのフォーム */}
        <form id="new-todo-form" onSubmit={handleSubmit}>
          <input type="text" id="new-todo" placeholder="What needs to be done?" />
          <button>Add</button>
        </form>
        {/* TODOアイテムのリストを表示 */}
        <ul id="todo-list">
          {items.map((item, index) => (
            <li key={index}>
              {/* チェックボックス */}
              <input
                type="checkbox"
                id={`toggle-${index}`}
                checked={item.completed}
                onChange={(event) => {
                  const newItems = [...items];
                  newItems[index].completed = event.target.checked;
                  setItems(newItems);
                }}
              />
              {/* TODOアイテムの名前 */}
              <label
                id={`label-${index}`}
                style={{ textDecorationLine: item.completed ? "line-through" : "none" }}
              >
                {item.name}
              </label>
              {/* 削除ボタン */}
              <button onClick={() => {
                const newItems = [...items];
                newItems.splice(index, 1);
                setItems(newItems);
              }}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App