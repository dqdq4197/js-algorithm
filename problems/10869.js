/**
 * 백준 - 사칙연산
 * https://www.acmicpc.net/problem/10869
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const [A, B] = line.split(" ").map(Number);

  console.log([A + B, A - B, A * B, (A / B) >> 0, A % B].join("\n"));
  rl.close();
});
