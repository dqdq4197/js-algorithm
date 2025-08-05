/**
 * 백준 - 정렬
 * https://www.acmicpc.net/problem/11497
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let T;
let N;

rl.on("line", function (line) {
  if (!T) {
    T = +line;
  } else if (!N) {
    N = +line;
  } else {
    const numbers = line.split(" ").map(Number);
    numbers.sort((a, b) => a - b);

    let max = 0;
    let start = numbers[0];

    for (let i = 2; i < N; i += 2) {
      max = Math.max(max, Math.abs(start - numbers[i]));
      start = numbers[i];
    }

    for (
      let i = N % 2 === 0 ? numbers.length - 1 : numbers.length - 2;
      i >= 0;
      i -= 2
    ) {
      max = Math.max(max, Math.abs(start - numbers[i]));
      start = numbers[i];
    }

    max = Math.max(max, Math.abs(numbers[0] - numbers[1]));

    console.log(max);

    N = undefined;
    if (--T === 0) {
      console.log();
      rl.close();
    }
  }
}).on("close", function () {
  process.exit();
});
