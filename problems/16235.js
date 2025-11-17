/**
 * 백준 - 16235번 (구현 / 스택)
 * https://www.acmicpc.net/problem/16235
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dx = [0, 1, 1, 1, 0, -1, -1, -1];
const dy = [-1, -1, 0, 1, 1, 1, 0, -1];
let N, M, K;
let foods;
const originFoods = [];
let garden;

rl.on("line", function (line) {
  if (!N) {
    [N, M, K] = line.split(" ").map(Number);
    garden = Array.from({ length: N }, () =>
      Array.from({ length: N }, () => [])
    );
    foods = Array.from({ length: N }, () => Array(N).fill(5));
  } else if (originFoods.length !== N) {
    originFoods.push(line.split(" ").map(Number));
  } else {
    const [x, y, age] = line.split(" ").map(Number);
    garden[x - 1][y - 1].push(age);

    if (--M === 0) {
      rl.close();
    }
  }
}).on("close", function () {
  while (K--) {
    oneYear();
  }

  let treeCount = 0;
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      treeCount += garden[y][x].length;
    }
  }

  console.log(treeCount);
});

function oneYear() {
  // [봄 - 여름]
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const trees = garden[y][x];

      const aliveTrees = [];
      let deadFood = 0;

      for (const treeAge of trees) {
        // 양분 먹고, 나이 1 추가.
        if (foods[y][x] >= treeAge) {
          foods[y][x] -= treeAge;
          aliveTrees.push(treeAge + 1);
          continue;
        }

        deadFood += Math.floor(treeAge / 2);
      }

      // 죽은 나무, 양분으로 변환
      foods[y][x] += deadFood;
      garden[y][x] = aliveTrees;
    }
  }

  const newTree = Array.from({ length: N }, () => Array(N).fill(0));

  // [가을] - 번식
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      for (const treeAge of garden[y][x]) {
        if (treeAge % 5 !== 0) continue;

        for (let i = 0; i < 8; i++) {
          const nx = x + dx[i];
          const ny = y + dy[i];

          if (ny < 0 || nx < 0 || ny >= N || nx >= N) {
            continue;
          }
          newTree[ny][nx] += 1;
        }
      }
    }
  }

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const newTreeCount = newTree[y][x];

      garden[y][x] = Array(newTreeCount).fill(1).concat(garden[y][x]);
    }
  }

  // [겨울] - 양분 추가
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      foods[y][x] += originFoods[y][x];
    }
  }
}
