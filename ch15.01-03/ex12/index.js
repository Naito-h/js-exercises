javascript:(()=>{let id=window.prompt("指定したIDのBacklogを開きます。PBIのIDを入力してください。");const trimmed=id?.trim();if(trimmed){const url=`https://rdbc.backlog.com/view/TSUGUMI-${encodeURIComponent(trimmed)}`;window.open(url,"_blank");}})();

// 見やすく整形したコード
(() => {
    let id = window.prompt("指定したIDのBacklogを開きます。PBIのIDを入力してください。");
    const trimmed = id?.trim();
    if (trimmed) {
        const url = `https://rdbc.backlog.com/view/TSUGUMI-${encodeURIComponent(trimmed)}`;
        window.open(url, "_blank");
    }
})();
