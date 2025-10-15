/**
 * leetCode - Two Pointers
 * https://leetcode.com/problems/remove-duplicates-from-sorted-array
 */

function removeDuplicates(nums: number[]): number {
  let k = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[k - 1] !== nums[i]) {
      nums[k] = nums[i];
      k += 1;
    }
  }

  return k;
}
