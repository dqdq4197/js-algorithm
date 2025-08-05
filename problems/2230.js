/**
 * 백준 - 정렬 / 투포인터
 * https://www.acmicpc.net/problem/2230
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let numbers = [];

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
  } else {
    numbers.push(+line);

    if (numbers.length === N) {
      rl.close();
    }
  }
}).on("close", function () {
  numbers.sort((a, b) => a - b);

  let min = Infinity;
  let l = 0;
  let r = 0;
  while (l <= r && N > r) {
    const sub = numbers[r] - numbers[l];

    if (sub >= M) {
      min = Math.min(min, sub);
      l += 1;
    } else {
      r += 1;
    }
  }

  console.log(min);
  process.exit();
});
