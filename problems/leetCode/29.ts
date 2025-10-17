/**
 * leetCode - Math
 * https://leetcode.com/problems/divide-two-integers
 */

const MAX = Math.pow(2, 31) - 1;

function divide(dividend: number, divisor: number): number {
  const divided = dividend / divisor;

  if (divided >= 0 && divided < MAX) {
    return Math.floor(divided);
  }

  if (divided < 0) {
    return Math.ceil(divided);
  }

  return MAX;
}
