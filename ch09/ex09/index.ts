// インターフェース分離の原則 (Interface Segregation Principle, ISP)

// 原則を満たさないコード
interface Animal {
    name: string;
    run(): void;
    fly(): void;
}

class Dog implements Animal {
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
interface Animal2 {
    name: string;
}

interface RunningAnimal extends Animal2 {
    run(): void;
}

interface FlyingAnimal extends Animal2 {
    fly(): void;
}

class Dog2 implements RunningAnimal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    run(): void {
        console.log("run");
    }
}