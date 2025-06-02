export default function bfs(graph: WeightedAdjacencyList, source: number, needle: number): number[] | null {
    const queue: number[] = [source];
    const visited: boolean[] = new Array(graph.length).fill(false);
    const prev: (number | null)[] = new Array(graph.length).fill(null);

    visited[source] = true;

    while (queue.length > 0) {
        const current = queue.shift()!;

        // If we find the target node, reconstruct the path
        if (current === needle) {
            return reconstructPath(prev, source, needle);
        }

        // Explore neighbors
        for (const neighbor of graph[current]) {
            if (!visited[neighbor.to]) {
                visited[neighbor.to] = true;
                prev[neighbor.to] = current;
                queue.push(neighbor.to);
            }
        }
    }

    // If we exhaust the queue without finding the needle, return null
    return null;
}

function reconstructPath(prev: (number | null)[], source: number, needle: number): number[] {
    const path: number[] = [];
    let at: number | null = needle;

    while (at !== null) {
        path.push(at);
        at = prev[at];
    }

    path.reverse();

    // If the path doesn't start with the source, it means there's no valid path
    if (path[0] !== source) {
        return [];
    }

    return path;
}