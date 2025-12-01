// HTMLのElementを取得
const userInfoElement = document.querySelector("#user-info");

// 登録日を表示
const dateElement = document.createElement("dt");
dateElement.textContent = "ご登録日";
userInfoElement.appendChild(dateElement);
const dateValueElement = document.createElement("dd");
const date = new Date();
dateValueElement.textContent = date.toLocaleDateString();
userInfoElement.appendChild(dateValueElement);

// ブラウザ情報を収集して表示
const n = navigator;
const info = {
    userAgent: n.userAgent,
    platform: n.platform,
    vendor: n.vendor,
    language: n.language,
    onLine: n.onLine,
    cookieEnabled: n.cookieEnabled,
    hardwareConcurrency: n.hardwareConcurrency,
    deviceMemory: n.deviceMemory ?? 'unknown',
    maxTouchPoints: n.maxTouchPoints,
    product: n.product,
    appName: n.appName,
    appVersion: n.appVersion
};

for (const key in info) {
    const dt = document.createElement("dt");
    dt.textContent = key;
    userInfoElement.appendChild(dt);
    const dd = document.createElement("dd");
    dd.textContent = info[key];
    userInfoElement.appendChild(dd);
}