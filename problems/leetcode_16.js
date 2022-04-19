/**
 * 16. 3Sum Closest
 * O(n^2) 시간 복잡도 Tow Pointer 알고리즘
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  nums.sort((a, b) => a - b);

  let result = Infinity;

  for (let i = 0; i < nums.length; i++) {
    let lo = i + 1;
    let hi = nums.length - 1;

    while (lo < hi) {
      const sum = nums[i] + nums[lo] + nums[hi];
      const diff = Math.abs(target - sum);

      if (diff === 0) return sum;
      else if (Math.abs(target - result) > diff) {
        result = sum;
      }

      if (target > sum) lo += 1;
      else hi -= 1;
    }
  }

  return result;
};
