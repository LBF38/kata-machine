export default class RingBuffer<T> {
    private buffer: (T | undefined)[];
    private capacity: number;
    private head: number;
    private tail: number;
    public length: number;

    constructor(capacity: number = 10) {
        this.capacity = capacity;
        this.buffer = new Array(capacity).fill(undefined);
        this.head = 0;
        this.tail = 0;
        this.length = 0;
    }

    // Add an item to the buffer
    push(item: T): void {
        this.buffer[this.tail] = item;
        this.tail = (this.tail + 1) % this.capacity;

        if (this.length < this.capacity) {
            this.length++;
        } else {
            // Overwrite the oldest element
            this.head = (this.head + 1) % this.capacity;
        }
    }

    // Get an item at a specific index
    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined; // Out of bounds
        }
        const actualIndex = (this.head + idx) % this.capacity;
        return this.buffer[actualIndex];
    }

    // Remove and return the oldest item
    pop(): T | undefined {
        if (this.length === 0) {
            return undefined; // Buffer is empty
        }
        const item = this.buffer[this.head];
        this.buffer[this.head] = undefined; // Clear the slot
        this.head = (this.head + 1) % this.capacity;
        this.length--;
        return item;
    }
}
