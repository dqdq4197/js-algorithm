/**
 * 백준 - 투포인터/누적합
 * https://www.acmicpc.net/problem/1806
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, S;

rl.on("line", function (line) {
  if (!N) {
    [N, S] = line.split(" ").map(Number);
  } else {
    const numbers = line.split(" ").map(Number);

    let min = Infinity;
    let sum = 0;
    let left = 0;

    for (let right = 0; right < N; right++) {
      sum += numbers[right];

      while (sum >= S) {
        min = Math.min(min, right - left + 1);
        sum -= numbers[left];
        left += 1;
      }
    }

    console.log(min === Infinity ? 0 : min);
    rl.close();
  }
});
