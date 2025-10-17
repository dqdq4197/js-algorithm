/**
 * leetCode - String
 * https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string
 */

function strStr(haystack: string, needle: string): number {
  let k = 0;

  for (let i = 0; i < haystack.length; i++) {
    const hay = haystack[i];
    const char = needle[k];

    if (hay === char) {
      if (k === needle.length - 1) {
        return i - k;
      }

      k += 1;
    } else {
      i -= k;
      k = 0;
    }
  }

  return -1;
}
