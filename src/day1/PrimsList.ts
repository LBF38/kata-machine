export default function prims(list: WeightedAdjacencyList): WeightedAdjacencyList | null {
    const numNodes = list.length;
    if (numNodes === 0) return null;

    const mst: WeightedAdjacencyList = Array.from({ length: numNodes }, () => []);
    const visited: boolean[] = new Array(numNodes).fill(false);
    const minHeap: { to: number; from: number; weight: number }[] = [];

    // Start from node 0
    visited[0] = true;
    for (const edge of list[0]) {
        minHeap.push({ to: edge.to, from: 0, weight: edge.weight });
    }

    // Sort the heap by weight (min-heap behavior)
    minHeap.sort((a, b) => a.weight - b.weight);

    while (minHeap.length > 0) {
        // Extract the edge with the smallest weight
        const { to, from, weight } = minHeap.shift()!;

        // Skip if the destination node is already visited
        if (visited[to]) continue;

        // Mark the node as visited
        visited[to] = true;

        // Add the edge to the MST
        mst[from].push({ to, weight });
        mst[to].push({ to: from, weight }); // Add the reverse edge for undirected graph

        // Add all edges from the newly visited node to the heap
        for (const edge of list[to]) {
            if (!visited[edge.to]) {
                minHeap.push({ to: edge.to, from: to, weight: edge.weight });
            }
        }

        // Re-sort the heap by weight
        minHeap.sort((a, b) => a.weight - b.weight);
    }

    // Check if all nodes are visited (graph is connected)
    if (visited.some((v) => !v)) {
        return null; // Graph is not connected, MST cannot be formed
    }

    return mst;
}