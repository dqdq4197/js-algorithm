// 5. Longest Palindromic Substring
// O(nlogn)
function check(left, right, s) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left -= 1;
    right += 1;
  }

  return [right - (left + 1), s.substring(left + 1, right)];
}

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let result = "";

  for (let i = 0; i < s.length; i++) {
    const [oddLen, oddString] = check(i, i, s);
    const [evenLen, evenString] = check(i, i + 1, s);

    if (result.length < oddLen) result = oddString;
    if (result.length < evenLen) result = evenString;
  }

  return result;
};
