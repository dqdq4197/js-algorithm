/**
 * 백준 - 그리디 / 비트마스킹
 * https://www.acmicpc.net/problem/1052
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  let answer = Infinity;
  const [N, K] = line.split(" ").map(Number);
  const queue = [[N, K, 0]];

  let index = 0;
  while (queue.length > index) {
    const [n, k, buy] = queue[index++];

    if (n === 0) {
      answer = Math.min(buy, answer);
      continue;
    }

    if (k < 1) {
      continue;
    }

    const [maxQuantity, minQuantity] = getMergeQuantity(n);

    if (maxQuantity === n) {
      queue.push([0, k - 1, buy]);
      continue;
    }

    queue.push([maxQuantity, k, buy + maxQuantity - n]);
    queue.push([n - minQuantity, k - 1, buy]);
  }

  console.log(answer);
  rl.close();
});

function getMergeQuantity(n) {
  let num = 1;

  while (num < n) {
    num <<= 1;
  }

  return [num, num >> 1];
}
