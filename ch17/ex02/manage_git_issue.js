// https://docs.github.com/en/rest/issues/issues?apiVersion=2022-11-28

const token = process.env.GITHUB_TOKEN;
const repo = "js-exercises";
const owner = "Naito-h";

// Issueを作成する関数
export function createIssue(owner, repo, title, body) {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `token ${token}`,
  };
  const data = { title: title, body: body };
  
  return fetch(url, {
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
    return data;  // テストのためにデータを返す
  })
  .catch(error => {
    console.error("Error creating issue:", error);
  });
}

// Issueをクローズする関数
export function closeIssue(owner, repo, issueNumber) {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `token ${token}`,
  };
  const data = { state: "closed" };
  return fetch(url, {
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
    return data;  // テストのためにデータを返す
  })
  .catch(error => {
    console.error("Error closing issue:", error);
  });
}

// Issueを一覧表示する関数
export function listIssues(owner, repo) {
  const url = `https://api.github.com/repos/${owner}/${repo}/issues`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `token ${token}`,
  };
  return fetch (url, {
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
    return issues;  // テストのためにデータを返す
  })
  .catch(error => {
    console.error("Error listing issues:", error);
  });
}
