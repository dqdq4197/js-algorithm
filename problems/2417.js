/**
 * 백준 - 이분탐색
 * https://www.acmicpc.net/problem/2417
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const num = BigInt(line);
  let left = 0n;
  let right = num;
  let answer = num;

  while (left <= right) {
    const mid = (left + right) / 2n;
    const sq = mid * mid;

    if (sq === num) {
      answer = mid;
      break;
    }

    if (sq > num) {
      right = mid - 1n;
      answer = mid;
    } else {
      left = mid + 1n;
    }
  }

  console.log(answer.toString());
  rl.close();
});
