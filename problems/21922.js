/**
 * 백준 - 시뮬레이션, bfs
 * https://www.acmicpc.net/problem/21922
 */
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let lab = [];
let visited;
//          상, 하, 좌, 우
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

function getNewDirection(item, direction) {
  switch (item) {
    case 1: // |
      return direction === 2 || direction === 3 ? -1 : direction;
    case 2: // -
      return direction === 0 || direction === 1 ? -1 : direction;
    case 3: // ↗
      return [3, 2, 1, 0][direction];
    case 4: // ↖
      return [2, 3, 0, 1][direction];
    default:
      return direction;
  }
}

function simulateWind(startX, startY, direction) {
  let x = startX;
  let y = startY;
  let dir = direction;

  while (true) {
    if (x < 0 || x >= N || y < 0 || y >= M) {
      break;
    }

    if (visited[x][y][dir]) {
      break;
    }

    visited[x][y][dir] = true;

    const nDir = getNewDirection(lab[x][y], dir);
    if (nDir === -1) {
      break;
    }

    dir = nDir;
    x += dx[dir];
    y += dy[dir];
  }
}

rl.on("line", (line) => {
  if (!N) {
    [N, M] = line.split(" ").map(Number);

    visited = Array.from({ length: N }, () =>
      Array.from({ length: M }, () => Array(4).fill(false))
    );
  } else {
    lab.push(line.split(" ").map(Number));

    if (lab.length === N) {
      rl.close();
    }
  }
});

rl.on("close", () => {
  const aircons = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (lab[i][j] === 9) {
        visited[i][j] = Array(4).fill(true);
        aircons.push([i, j]);
      }
    }
  }

  for (const [x, y] of aircons) {
    for (let dir = 0; dir < 4; dir++) {
      const nx = x + dx[dir];
      const ny = y + dy[dir];
      simulateWind(nx, ny, dir);
    }
  }

  let count = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (visited[i][j].some(Boolean)) {
        count++;
      }
    }
  }

  console.log(count);
});
