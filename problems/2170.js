/**
 * 백준 - 정렬
 * https://www.acmicpc.net/problem/2170
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
const input = [];

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    input.push(line.split(" ").map(Number));

    if (input.length === N) {
      rl.close();
    }
  }
}).on("close", function () {
  input.sort(([s1], [s2]) => s1 - s2);

  let [start, end] = input[0];

  let sum = 0;
  let index = 1;

  while (input.length > index) {
    const [x, y] = input[index++];

    if (x <= end) {
      end = Math.max(end, y);
    } else {
      sum += end - start;
      [start, end] = [x, y];
    }
  }

  sum += end - start;
  console.log(sum);

  process.exit();
});
