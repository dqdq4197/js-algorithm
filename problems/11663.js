/**
 * 백준 - 이분탐색
 * https://www.acmicpc.net/problem/11663
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let dots = [];
let lines = [];

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
  } else if (dots.length !== N) {
    dots = line.split(" ").map(Number);
    dots.sort((a, b) => a - b);
  } else {
    lines.push(line.split(" ").map(Number));

    if (lines.length === M) {
      rl.close();
    }
  }
}).on("close", function () {
  const result = [];

  for (const [start, end] of lines) {
    const [startIndex] = findIndex(start);
    const [_, endIndex] = findIndex(end);

    if (startIndex > endIndex) {
      result.push(0);
    } else {
      result.push(endIndex - startIndex + 1);
    }
  }

  console.log(result.join("\n"));
});

function findIndex(target) {
  let left = 0;
  let right = N - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (target === dots[mid]) {
      return [mid, mid];
    }

    if (target > dots[mid]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return [left, right];
}
