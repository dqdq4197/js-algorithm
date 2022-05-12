/**
 * 시간 복잡도 O(n^3)
 * three sum 문제 기반으로 함.
 * two pointer + 이중 for문
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  const result = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 3; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    for (let j = i + 1; j < nums.length - 2; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;

      let left = j + 1;
      let right = nums.length - 1;

      while (left < right) {
        const sum = nums[i] + nums[j] + nums[left] + nums[right];

        if (sum === target) {
          result.push([nums[i], nums[j], nums[left], nums[right]]);
          do {
            left += 1;
          } while (left < right && nums[left] === nums[left - 1]);
          do {
            right -= 1;
          } while (left < right && nums[right] === nums[right + 1]);
        } else if (sum > target) {
          right -= 1;
        } else {
          left += 1;
        }
      }
    }
  }

  return result;
};
