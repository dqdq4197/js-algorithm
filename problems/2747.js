/**
 * 백준 - DP
 * https://www.acmicpc.net/problem/2747
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function solution(n) {
  const numbers = [0, 1];

  for (let i = 2; i <= n; i++) {
    const p1 = numbers[i - 1];
    const p2 = numbers[i - 2];

    numbers.push(p1 + p2);
  }

  return numbers[n];
}

rl.on("line", function (line) {
  const n = +line;

  console.log(solution(n));
  rl.close();
}).on("close", function () {
  process.exit();
});
