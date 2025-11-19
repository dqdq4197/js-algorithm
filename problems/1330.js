/**
 * 백준 - 구현
 * https://www.acmicpc.net/problem/1330
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const [A, B] = line.split(" ").map(Number);

  if (A > B) {
    console.log(">");
  }

  if (A < B) {
    console.log("<");
  }

  if (A === B) {
    console.log("==");
  }

  rl.close();
});
