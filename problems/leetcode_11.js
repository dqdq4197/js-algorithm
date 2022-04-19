/**
 * 시간 복잡도 O(n)
 * Two Pointer 방식
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let left = 0;
  let right = height.length - 1;

  let maxArea = 0;

  while (left < right) {
    maxArea = Math.max(
      maxArea,
      Math.min(height[left], height[right]) * (right - left)
    );

    if (height[left] > height[right]) {
      right -= 1;
    } else {
      left += 1;
    }
  }

  return maxArea;
};

/**
 * O(n^2) 시간 복잡도 완전 탐색
 * 시간 초과
 * @param {number[]} height
 * @return {number}
 */
// var maxArea = function (height) {
//   let maxArea = 0;

//   for (let i = 0; i < height.length - 1; i++) {
//     for (let j = i + 1; j < height.length; j++) {
//       const left = height[i];
//       const right = height[j];

//       const area = (j - i) * Math.min(right, left);
//       maxArea = Math.max(maxArea, area);
//     }
//   }

//   return maxArea;
// };
