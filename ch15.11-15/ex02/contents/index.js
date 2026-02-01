const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// リクエスト中はロード画面を表示する
let isLoading = false;

// ローディング画面を表示する関数
function showLoading() {
  const loading = document.querySelector(".loading");
  if (!isLoading && loading) {
    loading.removeAttribute("hidden");
    isLoading = true;
  }
}

// ローディング画面を非表示にする関数
function hideLoading() {
  const loading = document.querySelector(".loading");
  if (isLoading && loading) {
    loading.setAttribute("hidden", "");
    isLoading = false;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  showLoading();
  retryWithExponentialBackoff(
    () => fetchWithTimeout("api/tasks")
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error()
        }
      }),
    3,
    (success, data) => {
      hideLoading();
      if (success) {
        data.items.forEach((item) => {
          appendToDoItem(item);
        });
      } else {
        alert("タスクの取得に失敗しました");
      }
    }
  );
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
  showLoading();
  retryWithExponentialBackoff(
    () => fetchWithTimeout("api/tasks", {
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
        }
      }), 3,
    (success, item) => {
      hideLoading();
      if (success) {
        appendToDoItem(item);
      } else {
        alert("追加に失敗しました");
      }
    });
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  toggle.type = "checkbox";
  toggle.addEventListener("change", () => {
    showLoading();
    retryWithExponentialBackoff(
      () => fetchWithTimeout(`api/tasks/${task.id}`, {
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
          }
        }), 3,
      (success, task) => {
        hideLoading();
        if (success) {
          label.style.textDecorationLine = (task.status === "completed") ? "line-through" : "none";
        } else {
          alert("更新に失敗しました");
        }
      });
  });

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.textContent = "❌";
  destroy.addEventListener("click", () => {
    showLoading();
    retryWithExponentialBackoff(
      () => fetchWithTimeout(`api/tasks/${task.id}`, {
        method: "DELETE"
      })
        .then((response) => {
          if (response.ok) {
            return;
          } else {
            throw new Error()
          }
        })
      , 3,
      (success) => {
        hideLoading();
        if (success) {
          elem.remove();
        } else {
          alert("削除に失敗しました");
        }
      });
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
}

function retryWithExponentialBackoff(func, maxRetry, callback) {
  let retryCount = 0; // リトライ回数
  let delay = 1000; // 1000ミリ秒（1秒）

  const attempt = () => {
    // func を実行して成功したら callback を呼んで終了
    func()
      .then((data) => {
        // 成功したらコールバックを呼んで終了
        callback(true, data);
      })
      .catch((error) => {
        // 最大リトライ回数に達したら失敗のコールバックを呼んで終了
        if (retryCount >= maxRetry) {
          callback(false);
          return;
        }

        // 指定した遅延時間後に再試行
        setTimeout(() => {
          retryCount++;
          // delay *= 2; // 次の遅延時間を2倍にする
          attempt();
        }, delay);
      });
  };

  attempt();
}

// 3秒でタイムアウトして、リクエストをキャンセルする fetch 関数
function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  options.signal = controller.signal;
  setTimeout(() => {
    controller.abort();
  }, 3000);

  return fetch(url, options).catch((error) => {
    if (error.name === "AbortError") {
      alert("リクエストがタイムアウトしました");
    }
    throw error;
  });
}