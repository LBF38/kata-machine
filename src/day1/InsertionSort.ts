export default function insertion_sort(arr: number[]): void {
    for (let i = 1; i < arr.length; i++) {
        const current = arr[i];
        let j = i - 1;

        // Shift elements of the sorted portion to the right
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }

        // Insert the current element into its correct position
        arr[j + 1] = current;
    }
}