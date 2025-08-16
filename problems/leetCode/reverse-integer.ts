/**
 * leetCode - Math
 * https://leetcode.com/problems/reverse-integer/description/
 */

const min = -Math.pow(2, 31);
const max = -min - 1;

function reverse(x: number): number {
  const isNegative = x < 0;
  const reversed = Number(Math.abs(x).toString().split("").reverse().join(""));

  if (reversed < min || reversed > max) {
    return 0;
  }

  return isNegative ? -reversed : reversed;
}
