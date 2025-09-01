export class LinkedList {
    #head: any = null;
    #tail: any = null;

    constructor() {
        this.#head = null;
        this.#tail = null;
    }

    push(value: any): void {
        const newNode = { value, next: null };
        if (!this.#head) {
            this.#head = newNode;
            this.#tail = newNode;
        } else {
            this.#tail.next = newNode;
            this.#tail = newNode;
        }
    }

    pushAll(...items: any[]): void {
        items.forEach(item => this.push(item));
    }

    toString(): string {
        let current = this.#head;
        const values = [];
        while (current) {
            values.push(current.value);
            current = current.next;
        }
        return "[" + values.join(" -> ") + "]";
    }
}

export class InstrumentedLinkedList {
    #list: LinkedList;
    #pushCount: number;
    
    constructor() {
        this.#list = new LinkedList();
        this.#pushCount = 0;
    }

    get pushCount() {
        return this.#pushCount;
    }

    push(item: any): void {
        this.#list.push(item);
        this.#pushCount++;
    }
    
    pushAll(...items: any[]): void {
        this.#list.pushAll(...items);
        this.#pushCount += items.length;
    }
}
