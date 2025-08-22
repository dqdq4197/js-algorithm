/**
 * 백준 - 수학
 * https://www.acmicpc.net/problem/2588
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let input = [];

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    M = line.split("").map(Number);

    for (let i = 2; i >= 0; i--) {
      console.log(N * M[i]);
    }

    console.log(N * +M.join(""));
    rl.close();
  }
});
