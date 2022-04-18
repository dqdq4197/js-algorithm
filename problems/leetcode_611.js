/**
 * leetcode 611. Valid Triangle Number
 * O(n^2) two pointer
 * @param {number[]} nums
 * @return {number}
 */
var triangleNumber = function (nums) {
  nums.sort((a, b) => a - b);
  let result = 0;
  for (let hi = 2; hi < nums.length; hi++) {
    let lo = 0;
    let mid = hi - 1;

    while (lo < mid) {
      if (nums[lo] + nums[mid] > nums[hi]) {
        result += mid - lo;
        mid -= 1;
      } else lo += 1;
    }
  }

  return result;
};
