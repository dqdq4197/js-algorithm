/**
 * 병합 정렬
 * 최악, 최선의 경우 시간 복잡도 O(nlog n)
 * left[0] vs right[0] 이 둘을 비교해 작은 값을 새로운 배열에 push 해줍니다.
 * left,right에 요소가 하나도 남지 않을 때까지 반복해 새로운 배열에 push해줍니다.
 * 1. arr=[1] / left=[4] / right=[2,3]
 * 2. arr=[1,2] / left=[4] / right=[3]
 * 3. arr=[1,2,3] / left=[4] / right = []
 * 4. right이 비었기 때문에 left에 남은 모든것을 arr에 추가해줍니다.
 * => return arr=[1,2,3,4]
 */

function merge(left, right) {
  const sortedArr = [];

  while (left.length && right.length) {
    if (left[0] <= right[0]) sortedArr.push(left.shift());
    else sortedArr.push(right.shift());
  }

  return [...sortedArr, ...left, ...right];
}

function mergeSort(arr) {
  if (arr.length === 1) return arr;
  const boundary = Math.floor(arr.length / 2);

  const left = arr.slice(0, boundary);
  const right = arr.slice(boundary);

  return merge(mergeSort(left), mergeSort(right));
}
const arr = [7, 4, 3, 2, 1, 6, 5];
console.log(mergeSort(arr));
