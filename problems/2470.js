/**
 * 백준 - 투포인터
 * https://www.acmicpc.net/problem/2470
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let input;

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    input = line.split(" ").map(Number);
    rl.close();
  }
}).on("close", function () {
  input.sort((a, b) => a - b);

  let result = Infinity;
  let answer;

  let start = 0;
  let end = N - 1;
  while (start < end) {
    const sum = input[start] + input[end];

    if (Math.abs(result) > Math.abs(sum)) {
      result = sum;
      answer = [input[start], input[end]];
    }

    if (sum > 0) {
      end -= 1;
    } else {
      start += 1;
    }
  }

  console.log(answer.join(" "));

  process.exit();
});
