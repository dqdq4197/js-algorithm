/**
 * 백준 - 이분탐색
 * https://www.acmicpc.net/problem/19637
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let titles = [];
let powers = [];

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
  } else if (titles.length !== N) {
    const [title, power] = line.split(" ");
    titles.push([title, +power]);
  } else {
    powers.push(+line);

    if (powers.length === M) {
      rl.close();
    }
  }
}).on("close", function () {
  const result = [];

  for (const power of powers) {
    let left = 0;
    let right = N - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (power <= titles[mid][1]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    result.push(titles[left][0]);
  }

  console.log(result.join("\n"));
});
