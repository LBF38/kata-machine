export default class SinglyLinkedList<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = undefined;
    }

    // Add an item to the beginning of the list
    prepend(item: T): void {
        const node: Node<T> = { value: item, next: this.head };
        this.head = node;
        this.length++;
    }

    // Insert an item at a specific index
    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) {
            throw new Error("Index out of bounds");
        }

        if (idx === 0) {
            this.prepend(item);
            return;
        }

        let current = this.head;
        for (let i = 0; i < idx - 1; i++) {
            if (!current) throw new Error("Index out of bounds");
            current = current.next;
        }

        const node: Node<T> = { value: item, next: current?.next };
        if (current) current.next = node;
        this.length++;
    }

    // Add an item to the end of the list
    append(item: T): void {
        const node: Node<T> = { value: item };

        if (!this.head) {
            this.head = node;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }

        this.length++;
    }

    // Remove an item by value
    remove(item: T): T | undefined {
        if (!this.head) return undefined;

        if (this.head.value === item) {
            const removed = this.head;
            this.head = this.head.next;
            this.length--;
            return removed.value;
        }

        let current = this.head;
        while (current.next && current.next.value !== item) {
            current = current.next;
        }

        if (current.next) {
            const removed = current.next;
            current.next = current.next.next;
            this.length--;
            return removed.value;
        }

        return undefined;
    }

    // Get an item at a specific index
    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined; // Out of bounds
        }

        let current = this.head;
        for (let i = 0; i < idx; i++) {
            if (!current) return undefined;
            current = current.next;
        }

        return current?.value;
    }

    // Remove an item at a specific index
    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined; // Out of bounds
        }

        if (idx === 0 && this.head) {
            const removed = this.head;
            this.head = this.head.next;
            this.length--;
            return removed.value;
        }

        let current = this.head;
        for (let i = 0; i < idx - 1; i++) {
            if (!current) return undefined;
            current = current.next;
        }

        if (current?.next) {
            const removed = current.next;
            current.next = current.next.next;
            this.length--;
            return removed.value;
        }

        return undefined;
    }
}

type Node<T> = {
    value: T;
    next?: Node<T>;
};
