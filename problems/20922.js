/**
 * 백준 - 투포인터/슬라이딩윈도우
 * https://www.acmicpc.net/problem/20922
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
    const numbers = line.split(" ").map(Number);
    const counts = Array(100_001).fill(0);
    let max = 0;
    let left = 0;

    for (let right = 0; right < N; right++) {
      const rightNumber = numbers[right];
      counts[rightNumber] += 1;

      while (counts[rightNumber] > K) {
        const leftNumber = numbers[left];
        counts[leftNumber] -= 1;
        left += 1;
      }

      max = Math.max(max, right - left + 1);
    }

    console.log(max);

    rl.close();
  }
});
