const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
  console.log("document.cookie:", document.cookie);
  
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  fetch("api/tasks")
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error()
      };
    })
    .then((res) => {
      res.items.forEach((item) => {
        appendToDoItem(item);
      });
    })
    .catch((error) => {
      alert("タスクの取得に失敗しました");
    });
});

form.addEventListener("submit", (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  fetch("api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: todo
    })
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error()
      };
    })
    .then((item) => {
      appendToDoItem(item);
    })
    .catch((error) => {
      alert("追加に失敗しました");
    });
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine = task.status === "completed" ? "line-through" : "none";

  const toggle = document.createElement("input");
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed";
  toggle.addEventListener("change", () => {
    fetch(`api/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: toggle.checked ? "completed" : "active"
      })
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error()
        };
      })
      .then((task) => {
        label.style.textDecorationLine = (task.status === "completed") ? "line-through" : "none";
      })
      .catch((error) => {
        alert("更新に失敗しました");
      });
  });


  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.textContent = "❌";
  destroy.addEventListener("click", () => {
    fetch(`api/tasks/${task.id}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (response.ok) {
          elem.remove();
        } else {
          throw new Error();
        };
      })
      .catch((error) => {
        alert("削除に失敗しました");
      });
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
}
