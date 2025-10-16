/**
 * leetCode - Stack
 * https://leetcode.com/problems/valid-parentheses
 */

const brackets = {
  "(": ")",
  "{": "}",
  "[": "]",
};

function isValid(s: string): boolean {
  const temp: (keyof typeof brackets)[] = [];

  for (const char of s) {
    if (char === "(" || char === "{" || char === "[") {
      temp.push(char);
      continue;
    }

    const bracket = temp.pop();

    if (bracket === undefined || brackets[bracket] !== char) {
      return false;
    }
  }

  return temp.length === 0;
}
