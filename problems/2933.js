/**
 * 백준 - 시뮬레이션 / BFS
 * https://www.acmicpc.net/problem/2933
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dc = [1, 0, -1, 0];
const dr = [0, 1, 0, -1];

let R, C;
let grid = [];
let N;
let heights;

function throwBar(height, isLeft) {
  const row = R - height;

  if (isLeft) {
    for (let col = 0; col < C; col++) {
      if (grid[row][col] === "x") {
        grid[row][col] = ".";
        return [row, col];
      }
    }

    return;
  }

  for (let col = C - 1; col >= 0; col--) {
    if (grid[row][col] === "x") {
      grid[row][col] = ".";
      return [row, col];
    }
  }
}

function findDroppableCluster(startR, startC, visit) {
  const queue = [[startR, startC]];
  let isDroppable = true;

  let index = 0;
  while (queue.length > index) {
    const [r, c] = queue[index++];

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];

      if (nr < 0 || nc < 0 || nc >= C) {
        continue;
      }

      if (nr === R) {
        isDroppable = false;
        continue;
      }

      if (visit[nr][nc] || grid[nr][nc] === ".") {
        continue;
      }

      visit[nr][nc] = true;
      queue.push([nr, nc]);
    }
  }

  if (isDroppable) {
    return queue;
  }
}

function getDropDistance(cluster) {
  let minDistance = Infinity;

  for (const [r, c] of cluster) {
    let distance = 0;

    while (r + distance + 1 < R && grid[r + distance + 1][c] === ".") {
      distance += 1;
    }

    minDistance = Math.min(minDistance, distance);
  }

  return minDistance;
}

function drop(destroyPos) {
  const [destroyR, destroyC] = destroyPos;
  const visit = Array.from({ length: R }, () => Array(C).fill(false));

  for (let i = 0; i < 4; i++) {
    const nr = destroyR + dr[i];
    const nc = destroyC + dc[i];

    if (nr < 0 || nc < 0 || nr >= R || nc >= C) {
      continue;
    }

    if (visit[nr][nc] || grid[nr][nc] === ".") {
      continue;
    }

    visit[nr][nc] = true;
    const cluster = findDroppableCluster(nr, nc, visit);

    if (!cluster) continue;

    for (const [r, c] of cluster) {
      grid[r][c] = ".";
    }

    const dropDistance = getDropDistance(cluster);

    for (const [r, c] of cluster) {
      grid[r + dropDistance][c] = "x";
    }

    if (cluster) continue;
  }
}

rl.on("line", function (line) {
  if (!R) {
    [R, C] = line.split(" ").map(Number);
  } else if (grid.length !== R) {
    grid.push(line.split(""));
  } else if (!N) {
    N = +line;
  } else {
    heights = line.split(" ").map(Number);
    rl.close();
  }
}).on("close", function () {
  for (let i = 0; i < N; i++) {
    const height = heights[i];
    const isLeft = i % 2 === 0;

    const destroyPos = throwBar(height, isLeft);

    if (!destroyPos) continue;

    drop(destroyPos);
  }

  console.log(grid.map((row) => row.join("")).join("\n"));
});
