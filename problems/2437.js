/**
 * 백준 - 그리디 / 정렬
 * https://www.acmicpc.net/problem/2437
 */
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let numbers;

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    numbers = line.split(" ").map(Number);
    rl.close();
  }
}).on("close", function () {
  numbers.sort((a, b) => a - b);

  let target = 0;

  for (let i = 0; i < N; i++) {
    if (numbers[i] > target + 1) {
      break;
    }

    target += numbers[i];
  }

  console.log(target + 1);
  process.exit();
});
