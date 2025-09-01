// インターフェース分離の原則 (Interface Segregation Principle, ISP)

// 原則を満たさないコード
interface animal {
    name: string;
    run(): void;
    fly(): void;
}

class Dog implements animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    run(): void {
        console.log("run");
    }
    fly(): void {
        // 何もしない
    }
}


// 原則を満たすコード
interface animal2 {
    name: string;
}

interface runningAnimal extends animal2 {
    run(): void;
}

interface flyingAnimal extends animal2 {
    fly(): void;
}

class Dog2 implements runningAnimal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    run(): void {
        console.log("run");
    }
}