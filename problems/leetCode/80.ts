/**
 * leetCode - Two Pointers
 * https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii
 */

function removeDuplicates2(nums: number[]): number {
  let k = 0;

  for (let i = 0; i < nums.length; i++) {
    if (k < 2 || nums[k - 2] !== nums[i]) {
      nums[k] = nums[i];
      k += 1;

      continue;
    }
  }

  return k;
}
