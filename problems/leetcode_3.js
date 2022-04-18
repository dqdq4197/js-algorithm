// /**
//  * Longest Substring Without Repeating Characters문제
//  * DP
//  * @param {string} s
//  * @return {number}
//  */
// var lengthOfLongestSubstring = function (s) {
//   if (s.length === 0) return 0;

//   const DP = Array.from({ length: s.length }, () => 1);
//   let result = 1;

//   for (let i = 1; i < s.length; i++) {
//     for (let j = i - DP[i - 1]; j < i; j++) {
//       if (s[i] === s[j]) {
//         DP[i] = i - j;
//         result = Math.max(result, DP[i]);
//         break;
//       }

//       if (j === i - 1) {
//         DP[i] = DP[i - 1] + 1;
//         result = Math.max(result, DP[i]);
//       }
//     }
//   }

//   return result;
// };

/**
 * Map함수를 이용한 투 포인터
 * 시간 복잡도  O(n)
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  if (s.length === 0) return 0;

  const map = new Map();
  let max = 0;
  let j = 0;
  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      j = Math.max(j, map.get(s[i]) + 1);
    }

    map.set(s[i], i);
    max = Math.max(max, i - j + 1);
  }

  return max;
};
