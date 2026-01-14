/**
 * 백준 - 투포인터
 * https://www.acmicpc.net/problem/17609
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let T;
const answers = [];

rl.on("line", function (line) {
  if (!T) {
    T = +line;
  } else {
    answers.push(solution(line));

    if (--T === 0) {
      console.log(answers.join("\n"));
      rl.close();
    }
  }
});

function checkPalindrome(left, right, str) {
  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }

    left += 1;
    right -= 1;
  }

  return true;
}

function solution(str) {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] === str[right]) {
      left += 1;
      right -= 1;
    } else {
      const isPalindrome1 = checkPalindrome(left + 1, right, str);
      const isPalindrome2 = checkPalindrome(left, right - 1, str);

      if (isPalindrome1 || isPalindrome2) {
        return 1;
      }

      return 2;
    }
  }

  return 0;
}
