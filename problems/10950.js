// https://www.acmicpc.net/problem/10950
// 백준 - 사칙연산

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let T;

rl.on("line", function (line) {
  if (!T) {
    T = +line;
  } else {
    const [A, B] = line.split(" ").map(Number);
    console.log(A + B);
    if (--T === 0) {
      rl.close();
    }
  }
});
