/**
 * 백준 - 그리디
 * https://www.acmicpc.net/problem/13164
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, K;

rl.on("line", function (line) {
  if (!N) {
    [N, K] = line.split(" ").map(Number);
  } else {
    const students = line.split(" ").map(Number);
    const gaps = [];

    for (let i = 1; i < N; i++) {
      gaps.push(students[i] - students[i - 1]);
    }
    gaps.sort((a, b) => b - a);

    const result = gaps.slice(K - 1).reduce((sum, current) => sum + current, 0);
    console.log(result);

    rl.close();
  }
});
