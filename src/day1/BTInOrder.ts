export default function in_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}

function walk(current: BinaryNode<number> | null, path: number[]): number[] {
    if (!current) return path;

    // recurse steps
    // pre

    // recurse
    walk(current.left, path);
    path.push(current.value);
    walk(current.right, path);

    // post
    return path;
}
