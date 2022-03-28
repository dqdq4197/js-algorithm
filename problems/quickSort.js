/**
 * 퀵 정렬
 * 시간복잡도 최악의 경우 O(n^2) 최선의 경우 (nlog n)
 * unstable(불안정 정렬)
 * pivot을 중간에 두고 값이 pivot보다 작거나 같으면 왼쪽 배열에, 값이 크면 오른쪽 배열에
 * 재귀적인 분할 정복 방법으로 정렬합니다.
 */
function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }

  const leftSorted = quickSort(left);
  const rightSorted = quickSort(right);
  return [...leftSorted, pivot, ...rightSorted];
}

console.log(quickSort([3, 45, 26, 1, 4, -3, 0]));
