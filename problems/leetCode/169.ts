/**
 * leetCode - Hash Table
 * https://leetcode.com/problems/majority-element
 */

function majorityElement(nums: number[]): number {
  const count = Math.floor(nums.length / 2);
  let result = 0;

  if (1 > count) {
    return nums[0];
  }

  const dict = new Map();

  for (const num of nums) {
    if (dict.has(num)) {
      const numCount = dict.get(num) + 1;

      if (numCount > count) {
        result = num;
        break;
      }

      dict.set(num, numCount);
    } else {
      dict.set(num, 1);
    }
  }

  return result;
}
