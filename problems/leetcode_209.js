/**
 * leetcode 209. Minimum Size Subarray Sum
 * O(n) two pointer
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  const INF = Infinity;
  let result = INF;
  let lo = 0;
  let hi = 0;

  let sum = nums[0];
  while (lo <= hi && hi < nums.length) {
    if (sum >= target) {
      result = Math.min(result, hi - lo + 1);
    }

    if (sum > target) sum -= nums[lo++];
    else sum += nums[++hi];
  }

  if (result === INF) return 0;
  else return result;
};
