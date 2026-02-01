const file = document.querySelector("#file");
const token = document.querySelector("#token");
const uploadButton = document.querySelector("#upload");

const folderName = "js研修"; // OneDrive のフォルダ名を指定

uploadButton.onclick = async () => {
  // ファイルが選択されているか確認
  if (file.files.length === 0) {
    alert("ファイルを選択してください");
    return;
  }

  // トークンが入力されているか確認
  if (!token.value) {
    alert("アクセストークンを入力してください");
    return;
  }

  // ファイルをアップロード
  try {
    const res = await fetch(`https://graph.microsoft.com/v1.0/me/drive/root:/${folderName}/${file.files[0].name}:/content`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token.value}` },
      body: file.files[0],
    });

    // 失敗した場合はエラーを投げる
    if (!res.ok) { throw new Error(res.statusText); }

    alert("アップロード成功");
  } catch (e) {
    alert("アップロード失敗: " + e.message);
  }
};
