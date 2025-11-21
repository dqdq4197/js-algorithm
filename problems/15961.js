/**
 * 백준 - 슬라이딩 윈도우 / 투포인터
 * https://www.acmicpc.net/problem/15961
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, D, K, C;
let belt = [];

rl.on("line", function (line) {
  if (!N) {
    [N, D, K, C] = line.split(" ").map(Number);
  } else {
    belt.push(+line);

    if (belt.length === N) {
      rl.close();
    }
  }
}).on("close", function () {
  const currentBelt = Array(D + 1).fill(0);

  let uniqCount = 0;
  for (let i = 0; i < K; i++) {
    const sushi = belt[i];

    if (currentBelt[sushi] === 0 && sushi !== C) {
      uniqCount += 1;
    }

    currentBelt[sushi] += 1;
  }

  let maxUniqCount = uniqCount;

  let index = 0;
  while (N - 1 > index) {
    const exitSushi = belt[index];
    const enterSushi = belt[(index + K) % N];

    if (currentBelt[exitSushi]-- === 1 && exitSushi !== C) {
      uniqCount -= 1;
    }

    if (currentBelt[enterSushi]++ === 0 && enterSushi !== C) {
      uniqCount += 1;
    }

    maxUniqCount = Math.max(maxUniqCount, uniqCount);

    if (maxUniqCount === K) {
      break;
    }

    index += 1;
  }

  console.log(maxUniqCount + 1);
});
