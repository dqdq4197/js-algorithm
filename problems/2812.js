/**
 * 백준 - 그리디 / 스택
 * https://www.acmicpc.net/problem/2812
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, K;
let numbers;

rl.on("line", function (line) {
  if (!N) {
    [N, K] = line.split(" ").map(Number);
  } else {
    numbers = line.split("").map(Number);
    rl.close();
  }
}).on("close", function () {
  const stack = [];

  for (let i = 0; i < N; i++) {
    const number = numbers[i];

    while (K > 0 && stack.length) {
      const peek = stack[stack.length - 1];

      if (peek >= number) {
        break;
      }

      stack.pop();
      K -= 1;
    }

    stack.push(number);
  }

  console.log(stack.slice(0, stack.length - K).join(""));
  process.exit();
});
