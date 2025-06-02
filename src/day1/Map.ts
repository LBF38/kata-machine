export default class Map<T extends string | number, V> {
    private buckets: [T, V][][];
    private bucketCount: number;
    private itemCount: number;

    constructor(bucketCount: number = 16) {
        this.bucketCount = bucketCount;
        this.buckets = Array.from({ length: bucketCount }, () => []);
        this.itemCount = 0;
    }

    // Hash function to map keys to bucket indices
    private hash(key: T): number {
        if (typeof key === "number") {
            return key % this.bucketCount;
        }
        let hash = 0;
        if (typeof key === "string") {
            for (const char of key) {
                hash = (hash * 31 + char.charCodeAt(0)) % this.bucketCount;
            }
        }
        return hash;
    }

    // Get the value associated with a key
    get(key: T): V | undefined {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        for (const [k, v] of bucket) {
            if (k === key) {
                return v;
            }
        }
        return undefined; // Key not found
    }

    // Set a key-value pair
    set(key: T, value: V): void {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        for (const pair of bucket) {
            if (pair[0] === key) {
                pair[1] = value; // Update value if key exists
                return;
            }
        }
        bucket.push([key, value]); // Add new key-value pair
        this.itemCount++;
    }

    // Delete a key-value pair
    delete(key: T): V | undefined {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        for (let i = 0; i < bucket.length; i++) {
            const [k, v] = bucket[i];
            if (k === key) {
                bucket.splice(i, 1); // Remove the key-value pair
                this.itemCount--;
                return v; // Return the deleted value
            }
        }
        return undefined; // Key not found
    }

    // Get the number of key-value pairs
    size(): number {
        return this.itemCount;
    }
}
