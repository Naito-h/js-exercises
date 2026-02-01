const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// ToDo リストの要素を作成する関数
function createToDoElement(todo) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = todo.name;
  label.style.textDecorationLine = todo.completed ? "line-through" : "none";

  // toggle が変化 (change) した際に label.style.textDecorationLine を変更する
  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.checked = todo.completed;
  toggle.onchange = () => {
    // ローカルストレージの ToDo を更新する
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const todoItem = todos.find((t) => t.id === todo.id);
    if (todoItem) {
      todoItem.completed = toggle.checked;
      localStorage.setItem("todos", JSON.stringify(todos));
    }

    // label の取り消し線を更新する
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
  };

  // destroy がクリック (click) された場合に elem を削除する
  const destroy = document.createElement("button");
  destroy.textContent = "❌";
  destroy.onclick = () => {
    // ローカルストレージから ToDo を削除する
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const updatedTodos = todos.filter((t) => t.id !== todo.id);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    // elem を削除する
    elem.remove();
  };

  // elem 内に toggle, label, destroy を追加し、さらにそれを #todo-list の先頭に追加する
  elem.append(toggle, label, destroy);
  return elem;
}

// DOMContentLoaded イベントが発生した際の処理
document.addEventListener("DOMContentLoaded", async () => {
  // ローカルストレージから ToDo を取得
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  // ToDo リストの要素として追加する
  todos.forEach((todo) => {
    const todoElem = createToDoElement(todo);
    list.appendChild(todoElem);
  });
});

// new-todo-form が送信 (submit) された際の処理
form.addEventListener("submit", (e) => {
  // ページのリロードを防ぐためにイベントをキャンセルする
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  // new-todo の中身は空にする
  input.value = "";

  // Todo オブジェクトを作成
  const newTodo = { id: Date.now(), name: todo, completed: false };

  // ローカルストレージに ToDo を保存する
  const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  storedTodos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(storedTodos));

  // ToDo リストの要素として追加する
  const todoElem = createToDoElement(newTodo);
  list.appendChild(todoElem);
});
