/**
 * 백준 - 구현 / 브루트포스
 * https://www.acmicpc.net/problem/18111
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M, B;
let temp = [];
let map = [];

function measureTime(height) {
  let blockCount = B;
  let time = 0;

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      const h = height - map[y][x];

      if (h > 0) {
        if (blockCount < h) {
          return -1;
        }

        blockCount -= h;
        time += h;
      } else {
        blockCount += Math.abs(h);
        time += Math.abs(h) * 2;
      }
    }
  }

  return time;
}

rl.on("line", function (line) {
  if (!N) {
    [N, M, B] = line.split(" ").map(Number);
  } else {
    temp.push(...line.split(" ").map(Number));

    if (N * M === temp.length) {
      rl.close();
    }
  }
}).on("close", function () {
  temp.sort((a, b) => b - a);

  for (let i = 0; i < N; i++) {
    const start = i * M;
    const end = start + M;

    map.push(temp.slice(start, end));
  }

  let min = Infinity;
  let max = 0;

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      min = Math.min(min, map[y][x]);
      max = Math.max(max, map[y][x]);
    }
  }

  let minTime = Infinity;
  let maxHeight = 0;

  for (let height = min; height <= max; height++) {
    const time = measureTime(height);

    if (time === -1) {
      continue;
    }

    if (minTime === time) {
      maxHeight = Math.max(maxHeight, height);
    } else if (minTime > time) {
      minTime = time;
      maxHeight = height;
    }
  }

  console.log(minTime, maxHeight);

  process.exit();
});
