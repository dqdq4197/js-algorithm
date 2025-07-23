/**
 * 백준 - 투포인터
 * https://www.acmicpc.net/problem/1253
 **/

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

  let answer = 0;
  for (let i = 0; i < N; i++) {
    const target = input[i];

    let start = 0;
    let end = N - 1;

    while (start < end) {
      if (start === i) {
        start += 1;
        continue;
      }

      if (end === i) {
        end -= 1;
        continue;
      }

      const sum = input[start] + input[end];

      if (sum === target) {
        answer += 1;
        break;
      }

      if (sum < target) {
        start += 1;
      } else {
        end -= 1;
      }
    }
  }

  console.log(answer);

  process.exit();
});
