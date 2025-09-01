class Resource {
    doA() {
        console.log("doA");
    }
    doB() {
        console.log("doB");
    }
    close() {
        console.log("close");
    }
}

export const withResource = (resource: any, callback: (resource: Resource) => void) => {
    try {
        callback(resource);
    } finally {
        resource.close();
    }
};

withResource(new Resource(), resource => {
  resource.doA();
  resource.doB();
}); // 終了時に resource.close が自動で呼ばれる
