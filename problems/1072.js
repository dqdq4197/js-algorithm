/**
 * 백준 - 이분탐색
 * https://www.acmicpc.net/problem/1072
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const MAX = 1_000_000_000;

rl.on("line", function (line) {
  const [X, Y] = line.split(" ").map(Number);
  const Z = Math.floor((Y * 100) / X);

  let l = 1;
  let r = MAX;
  let result = -1;
  while (l <= r) {
    const mid = l + Math.floor((r - l) / 2);
    const newX = X + mid;
    const newY = Y + mid;
    const newZ = Math.floor((newY * 100) / newX);

    if (newZ > Z) {
      result = mid;
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }

  console.log(result);

  rl.close();
});
