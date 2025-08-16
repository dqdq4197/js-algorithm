/**
 * 백준 - 시뮬레이션 / 백트래킹
 * https://www.acmicpc.net/problem/15683
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let map = [];
const cctvs = [];
let minCount = Infinity;

// 우, 하, 좌, 상
const dx = [
  [],
  [[1], [0], [-1], [0]],
  [
    [1, -1],
    [0, 0],
    [1, -1],
    [0, 0],
  ],
  [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ],
  [
    [-1, 0, 1],
    [0, 1, 0],
    [1, 0, -1],
    [0, -1, 0],
  ],
  [
    [0, 1, 0, -1],
    [0, 1, 0, -1],
    [0, 1, 0, -1],
    [0, 1, 0, -1],
  ],
];
const dy = [
  [],
  [[0], [1], [0], [-1]],
  [
    [0, 0],
    [1, -1],
    [0, 0],
    [1, -1],
  ],
  [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ],
  [
    [0, -1, 0],
    [-1, 0, 1],
    [0, 1, 0],
    [1, 0, -1],
  ],
  [
    [-1, 0, 1, 0],
    [-1, 0, 1, 0],
    [-1, 0, 1, 0],
    [-1, 0, 1, 0],
  ],
];

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
  } else {
    map.push(line.split(" ").map(Number));

    if (map.length === N) {
      rl.close();
    }
  }
}).on("close", function () {
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      const cctv = map[y][x];

      if (cctv >= 1 && cctv <= 5) {
        cctvs.push([x, y, cctv]);
      }
    }
  }

  recur(0, map);

  console.log(minCount);

  process.exit();
});

function recur(currentIndex, map) {
  if (currentIndex === cctvs.length) {
    minCount = Math.min(minCount, counting(map));
    return map;
  }

  const nextIndex = currentIndex + 1;

  for (let direction = 0; direction < 4; direction++) {
    const newMap = fill(currentIndex, direction, map);

    recur(nextIndex, newMap);
    const [_, __, cctv] = cctvs[currentIndex];

    if (cctv === 5) {
      return;
    }

    if (cctv === 2 && direction > 2) {
      return;
    }
  }
}

function fill(currentIndex, direction, map) {
  const newMap = map.map((row) => row.slice());

  const [x, y, cctv] = cctvs[currentIndex];

  const dxArray = dx[cctv][direction];
  const dyArray = dy[cctv][direction];

  for (let i = 0; i < dxArray.length; i++) {
    const dx = dxArray[i];
    const dy = dyArray[i];

    let range = 1;
    while (true) {
      const nx = x + dx * range;
      const ny = y + dy * range;

      if (nx < 0 || ny < 0 || nx >= M || ny >= N) {
        break;
      }

      if (newMap[ny][nx] === 6) {
        break;
      }

      newMap[ny][nx] = "#";
      range += 1;
    }
  }

  return newMap;
}

function counting(map) {
  let count = 0;

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < M; x++) {
      if (map[y][x] === 0) {
        count += 1;
      }
    }
  }

  return count;
}
