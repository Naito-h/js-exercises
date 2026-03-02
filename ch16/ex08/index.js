// https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28

const token = process.env.GITHUB_TOKEN;
const repo = "js-exercises";
const owner = "Naito-h";

// verboseモードの検出
const verbose = process.argv.includes("-v") || process.argv.includes("--verbose");

// HTTPログを出力するfetchのラッパー関数
async function verboseFetch(url, options = {}) {
  // HTTPリクエストのログを出力
  if (verbose) {
    console.log(`[HTTP] ${options.method || "GET"} ${url}`);
    if (options.headers) {
      console.log("[HTTP] Request Headers:", options.headers);
    }
    if (options.body) {
      console.log("[HTTP] Request Body:", options.body);
    }
  }

  const response = await fetch(url, options);

  // HTTPレスポンスのログを出力
  if (verbose) {
    console.log(`[HTTP] Response Status: ${response.status} ${response.statusText}`);
    const responseHeaders = {};
    response.headers.forEach((value, key) => { responseHeaders[key] = value; });
    console.log("[HTTP] Response Headers:", responseHeaders);
  }

  return response;
}

// Issueを作成する関数
function createIssue(owner, repo, title, body) {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `token ${token}`,
  };
  const data = { title: title, body: body };
  
  return verboseFetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(`Issue created\nid: ${data.id}, number: ${data.number}, title: ${data.title}, body: ${data.body}`);
  })
  .catch(error => {
    console.error("Error creating issue:", error);
  });
}

// Issueをクローズする関数
function closeIssue(owner, repo, issueNumber) {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `token ${token}`,
  };
  const data = { state: "closed" };
  return verboseFetch(url, {
    method: "PATCH",
    headers,
    body: JSON.stringify(data),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(`Issue closed\nid: ${data.id}, number: ${data.number}, title: ${data.title}`);
  })
  .catch(error => {
    console.error("Error closing issue:", error);
  });
}

// Issueを一覧表示する関数
function listIssues(owner, repo) {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `token ${token}`,
  };
  return verboseFetch(url, {
    method: "GET",
    headers,
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    } 
    return response.json();
  })
  .then(data => {
    const issues = [];
    data.forEach(issue => {
      issues.push({
        id: issue.id,
        number: issue.number,
        title: issue.title,
      });
    });
    
    console.log("Issues:", issues);
  })
  .catch(error => {
    console.error("Error listing issues:", error);
  });
}


// -v/--verbose を除いたコマンド引数を取得
const args = process.argv.slice(2).filter(arg => arg !== "-v" && arg !== "--verbose");

// コマンドライン引数を処理
if (args.length < 1) {
  console.log("操作を入力してください: create, close, list");
  console.log("ヘルプは -h または --help で確認できます");
} else if (args[0] === "create") {
  createIssue(owner, repo, args[1], args[2]);
} else if (args[0] === "close") {
  closeIssue(owner, repo, args[1]);
} else if (args[0] === "list") {
  listIssues(owner, repo);
} else if (args[0] === "-h" || args[0] === "--help") {
  console.log("使用方法:");
  console.log("  node index.js create <title> <body>  - 新しいIssueを作成");
  console.log("  node index.js close <issueNumber>    - 指定したIssueをクローズ");
  console.log("  node index.js list                   - オープンなIssueの一覧を表示");
  console.log("");
  console.log("オプション:");
  console.log("  -h, --help     使い方を表示");
  console.log("  -v, --verbose  HTTPログを出力");
  console.log("");
  console.log("例:");
  console.log("  node index.js -v list");
  console.log("  node index.js create \"バグ報告\" \"詳細な説明\"");
} else {
  console.log(`不明なコマンド: ${args[0]}`);
  console.log("ヘルプは -h または --help で確認できます");
}