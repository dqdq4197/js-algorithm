/**
 * 백준 - 그리디
 * https://www.acmicpc.net/problem/1083
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, S;
let numbers;

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else if (!numbers) {
    numbers = line.split(" ").map(Number);
  } else {
    S = +line;
    rl.close();
  }
}).on("close", function () {
  for (let i = 0; i < N && S > 0; i++) {
    let target = i;

    for (let n = i + 1; n <= Math.min(i + S, N); n++) {
      if (numbers[n] > numbers[target]) {
        target = n;
      }
    }

    while (target > i) {
      [numbers[target - 1], numbers[target]] = [
        numbers[target],
        numbers[target - 1],
      ];

      target -= 1;
      S -= 1;
    }
  }

  console.log(numbers.join(" "));
  process.exit();
});
