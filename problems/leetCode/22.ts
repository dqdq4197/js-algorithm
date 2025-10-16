/**
 * leetCode - backtracking
 * https://leetcode.com/problems/generate-parentheses
 */

function generateParenthesis(n: number): string[] {
  const result: string[] = [];

  function combi(output: string, open: number, close: number) {
    if (open + close === n * 2) {
      result.push(output);
      return;
    }

    if (open < n) {
      combi(output + "(", open + 1, close);
    }

    if (close < n && open > close) {
      combi(output + ")", open, close + 1);
    }
  }

  combi("", 0, 0);

  return result;
}
