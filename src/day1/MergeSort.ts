export default function merge_sort(arr: number[]): void {
    if (arr.length <= 1) {
        return; // Base case: already sorted
    }

    const mid = Math.floor(arr.length / 2);

    // Split the array into two halves
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    // Recursively sort both halves
    merge_sort(left);
    merge_sort(right);

    // Merge the sorted halves back into the original array
    merge(arr, left, right);
}

function merge(arr: number[], left: number[], right: number[]): void {
    let i = 0,
        j = 0,
        k = 0;

    // Merge elements from left and right arrays in sorted order
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            arr[k++] = left[i++];
        } else {
            arr[k++] = right[j++];
        }
    }

    // Copy any remaining elements from the left array
    while (i < left.length) {
        arr[k++] = left[i++];
    }

    // Copy any remaining elements from the right array
    while (j < right.length) {
        arr[k++] = right[j++];
    }
}
