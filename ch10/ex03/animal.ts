class Animal2 {
    #name: string;
    constructor(name: string) {
        this.#name = name;
    }
    getName(): string {
        return this.#name;
    }
    walk(): void {
        console.log(`${this.#name}が歩いています`);
    }
}

module.exports = { Animal: Animal2 };
