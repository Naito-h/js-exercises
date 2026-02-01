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
    withDB((db) => {
      let transaction = db.transaction("todos", "readwrite");
      let store = transaction.objectStore("todos");

      // indexedDB を更新
      store.put({ id: todo.id, name: todo.name, completed: toggle.checked });

      transaction.oncomplete = () => {
        console.log(`indexedDB の ${todo.name} を更新しました`);

        // label の取り消し線を更新する
        label.style.textDecorationLine = toggle.checked ? "line-through" : "none";

        // indexedDB の内容が変更されたことを他のタブに通知する
        localStorage.setItem("todoChanged", Date.now().toString());
      };
    });
  };

  // destroy がクリック (click) された場合に elem を削除する
  const destroy = document.createElement("button");
  destroy.textContent = "❌";
  destroy.onclick = () => {
    withDB((db) => {
      let transaction = db.transaction("todos", "readwrite");
      let store = transaction.objectStore("todos");

      // indexedDB から削除
      store.delete(todo.id);

      transaction.oncomplete = () => {
        console.log(`indexedDB から ${todo.name} を削除しました`);

        // elem を削除する
        elem.remove();

        // indexedDB の内容が変更されたことを他のタブに通知する
        localStorage.setItem("todoChanged", Date.now().toString());
      };
    });
  };

  // elem 内に toggle, label, destroy を追加し、さらにそれを #todo-list の先頭に追加する
  elem.append(toggle, label, destroy);
  return elem;
}

// DOMContentLoaded イベントが発生した際の処理
document.addEventListener("DOMContentLoaded", async () => {
  withDB((db) => {
    let transaction = db.transaction("todos", "readonly");
    let store = transaction.objectStore("todos");

    // indexedDB から全ての ToDo を取得
    let request = store.getAll();

    request.onsuccess = () => {
      const todos = request.result;

      // ToDo リストの要素として追加する
      todos.forEach((todo) => {
        const todoElem = createToDoElement(todo);
        list.appendChild(todoElem);
      });
    }
  })
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

  withDB((db) => {
    let transaction = db.transaction("todos", "readwrite");
    let store = transaction.objectStore("todos");

    // indexedDB に ToDo を保存する
    let request = store.add(newTodo);

    request.onsuccess = () => {
      console.log(`indexedDB に ${newTodo.name} を追加しました`);

      // ToDo リストの要素として追加する
      const todoElem = createToDoElement(newTodo);
      list.appendChild(todoElem);

      // indexedDB の内容が変更されたことを他のタブに通知する
      localStorage.setItem("todoChanged", Date.now().toString());
    }
  });
});

// indexedDB を開き、db オブジェクトを取得する関数
function withDB(callback) {
  let request = indexedDB.open("todoDB", 1);
  request.onerror = console.error;
  request.onsuccess = () => {
    let db = request.result;
    callback(db);
  };

  request.onupgradeneeded = () => {
    initdb(request.result, callback);
  };
}

// indexedDB を初期化する関数
function initdb(db, callback) {
  let store = db.createObjectStore("todos", { keyPath: "id" });

  store.createIndex("by_name", "name");
  store.createIndex("by_completed", "completed");

  fetch("todos.json")
    .then((response) => response.json())
    .then((todos) => {
      let transaction = db.transaction("todos", "readwrite");
      transaction.onerror = console.error;

      let store = transaction.objectStore("todos");

      todos.forEach((todo) => { store.put(todo); });

      transaction.oncomplete = () => {
        console.log("indexedDB を初期化しました");
        callback(db);
      };
    });
}

// 他のタブで indexedDB の内容が変更された場合に ToDo リストを更新する
window.addEventListener("storage", () => {
  console.log("indexedDB の内容が変更されました。ToDo リストを更新します。");

  // 既存の ToDo リストをクリアする
  list.innerHTML = "";

  // indexedDB から全ての ToDo を再取得する
  withDB((db) => {
    let transaction = db.transaction("todos", "readonly");
    let store = transaction.objectStore("todos");

    let request = store.getAll();

    request.onsuccess = () => {
      const todos = request.result;

      // ToDo リストの要素として追加する
      todos.forEach((todo) => {
        const todoElem = createToDoElement(todo);
        list.appendChild(todoElem);
      });
    }
  });
});