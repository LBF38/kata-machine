export default class Trie {
    private head: TrieNode<string>;

    constructor() {
        this.head = this.createNode();
    }

    insert(item: string): void {
        var current = this.head;
        for (const c of item) {
            const idx = this.idx(c);
            const child = current.children[idx];
            if (child) {
                current = child;
            } else {
                const node = this.createNode();
                current.children[idx] = node;
                current = node;
            }
        }
        current.isWord = true;
    }

    delete(item: string): void {
        this.cleanup(this.head, 0, item);
    }

    private cleanup(
        node: TrieNode<string>,
        depth: number,
        item: string,
    ): boolean {
        if (!node) {
            return false;
        }

        // Base case: If we've reached the end of the word
        if (depth === item.length) {
            if (!node.isWord) {
                return false; // Word doesn't exist
            }
            node.isWord = false; // Unmark the end of the word

            // If the node has no children, it can be deleted
            return node.children.every((child) => child === null);
        }

        // Recursive case: Traverse to the next character
        const idx = this.idx(item[depth]);
        const child = node.children[idx];
        if (!child) {
            return false; // Word doesn't exist
        }

        const shouldDeleteChild = this.cleanup(child, depth + 1, item);

        // If the child node should be deleted, remove it
        if (shouldDeleteChild) {
            node.children[idx] = null;

            // Return true if the current node can also be deleted
            return (
                !node.isWord && node.children.every((child) => child === null)
            );
        }

        return false;
    }

    find(partial: string): string[] {
        var current = this.head;

        // find the subtrie
        for (const c of partial) {
            const idx = this.idx(c);
            const child = current.children[idx];
            if (!child) {
                return [];
            }
            current = child;
        }

        // traverse subtrie and collect all words using DFS
        return this.dfs(current, partial, []);
    }

    private createNode(isWord: boolean = false): TrieNode<string> {
        return {
            isWord: isWord,
            children: Array(26).fill(null),
        };
    }

    private idx(c: string): number {
        return c.charCodeAt(0) - "a".charCodeAt(0);
    }

    private char(idx: number): string {
        return String.fromCharCode(idx + "a".charCodeAt(0));
    }

    private dfs(
        node: TrieNode<string>,
        path: string,
        words: string[],
    ): string[] {
        if (node.isWord) {
            words.push(path);
        }
        for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i];
            if (child) {
                this.dfs(child, path + this.char(i), words);
            }
        }
        return words;
    }
}

type TrieNode<T> = {
    // Indicates whether the node ends a word or not.
    isWord: boolean;
    // All the children nodes of the current node
    children: (TrieNode<T> | null)[];
};
