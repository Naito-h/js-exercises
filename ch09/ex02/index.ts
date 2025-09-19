export class C {
    #n = 0;

    get x() {
        return this.#n++;
    }
}