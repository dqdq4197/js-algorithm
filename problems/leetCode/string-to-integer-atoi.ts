/**
 * leetCode - 문자열
 * https://leetcode.com/problems/string-to-integer-atoi/description/
 */

function myAtoi(s: string): number {
  const min = -Math.pow(2, 31);
  const max = -min - 1;
  const numbers: string[] = [];
  let isNegative;

  let index = 0;
  while (s.length > index) {
    if (isNegative === undefined && s[index] === "-") {
      isNegative = true;
      index += 1;
      continue;
    }

    if (isNegative === undefined && s[index] === "+") {
      isNegative = false;
      index += 1;
      continue;
    }

    if (isNegative === undefined && s[index] === " ") {
      index += 1;
      continue;
    }

    if (/[0-9]/.test(s[index])) {
      if (isNegative === undefined) {
        isNegative = false;
      }

      numbers.push(s[index]);
      index += 1;
      continue;
    }

    break;
  }

  const num = (isNegative ? -1 : 1) * Number(numbers.join(""));

  if (num < min) {
    return min;
  }

  if (num > max) {
    return max;
  }

  return num;
}
