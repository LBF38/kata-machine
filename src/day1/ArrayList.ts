export default class ArrayList<T> {
    private data: (T | undefined)[];
    public length: number;

    constructor(initialCapacity: number = 10) {
        this.data = new Array(initialCapacity).fill(undefined);
        this.length = 0;
    }

    // Add an item to the beginning of the list
    prepend(item: T): void {
        this.resizeIfNeeded();
        for (let i = this.length; i > 0; i--) {
            this.data[i] = this.data[i - 1];
        }
        this.data[0] = item;
        this.length++;
    }

    // Insert an item at a specific index
    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) {
            throw new Error("Index out of bounds");
        }
        this.resizeIfNeeded();
        for (let i = this.length; i > idx; i--) {
            this.data[i] = this.data[i - 1];
        }
        this.data[idx] = item;
        this.length++;
    }

    // Add an item to the end of the list
    append(item: T): void {
        this.resizeIfNeeded();
        this.data[this.length] = item;
        this.length++;
    }

    // Remove an item by value
    remove(item: T): T | undefined {
        for (let i = 0; i < this.length; i++) {
            if (this.data[i] === item) {
                return this.removeAt(i);
            }
        }
        return undefined;
    }

    // Get an item at a specific index
    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined; // Out of bounds
        }
        return this.data[idx];
    }

    // Remove an item at a specific index
    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined; // Out of bounds
        }
        const item = this.data[idx];
        for (let i = idx; i < this.length - 1; i++) {
            this.data[i] = this.data[i + 1];
        }
        this.data[this.length - 1] = undefined; // Clear the last slot
        this.length--;
        return item;
    }

    // Resize the array if it's full
    private resizeIfNeeded(): void {
        if (this.length === this.data.length) {
            const newCapacity = this.data.length * 2;
            const newData = new Array(newCapacity).fill(undefined);
            for (let i = 0; i < this.data.length; i++) {
                newData[i] = this.data[i];
            }
            this.data = newData;
        }
    }
}
