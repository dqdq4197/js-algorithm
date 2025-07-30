/**
 * 백준 - 시뮬레이션 / 그래프
 * https://www.acmicpc.net/problem/18500
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let R, C, N;
let map = [];
let heights;
const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

function drop() {
  const visited = Array.from({ length: R }, () => Array(C).fill(false));

  for (let c = 0; c < C; c++) {
    if (map[R - 1][c] === "x" && !visited[R - 1][c]) {
      const queue = [[R - 1, c]];
      visited[R - 1][c] = true;

      let index = 0;
      while (queue.length > index) {
        const [y, x] = queue[index++];

        for (let d = 0; d < 4; d++) {
          const ny = y + dy[d];
          const nx = x + dx[d];

          if (
            ny >= 0 &&
            ny < R &&
            nx >= 0 &&
            nx < C &&
            map[ny][nx] === "x" &&
            !visited[ny][nx]
          ) {
            visited[ny][nx] = true;
            queue.push([ny, nx]);
          }
        }
      }
    }
  }

  for (let y = 0; y < R; y++) {
    for (let x = 0; x < C; x++) {
      if (map[y][x] === "x" && !visited[y][x]) {
        const cluster = [[y, x]];
        visited[y][x] = true;

        let index = 0;
        while (cluster.length > index) {
          const [cy, cx] = cluster[index++];

          for (let i = 0; i < 4; i++) {
            const ny = cy + dy[i];
            const nx = cx + dx[i];

            if (
              ny >= 0 &&
              ny < R &&
              nx >= 0 &&
              nx < C &&
              map[ny][nx] === "x" &&
              !visited[ny][nx]
            ) {
              visited[ny][nx] = true;
              cluster.push([ny, nx]);
            }
          }
        }

        for (const [cy, cx] of cluster) {
          map[cy][cx] = ".";
        }

        let minDrop = R;
        for (const [cy, cx] of cluster) {
          let dropCnt = 0;

          while (cy + dropCnt + 1 < R && map[cy + dropCnt + 1][cx] === ".") {
            dropCnt += 1;
          }
          minDrop = Math.min(minDrop, dropCnt);
        }

        for (const [cy, cx] of cluster) {
          map[cy + minDrop][cx] = "x";
        }

        return;
      }
    }
  }
}

rl.on("line", function (line) {
  if (!R) {
    [R, C] = line.split(" ").map(Number);
  } else if (map.length !== R) {
    map.push(line.split(""));
  } else if (!N) {
    N = +line;
  } else {
    heights = line.split(" ").map(Number);
    rl.close();
  }
}).on("close", function () {
  for (let i = 0; i < N; i++) {
    const height = heights[i];
    const r = R - height;

    if (i % 2 === 0) {
      for (let c = 0; c < C; c++) {
        if (map[r][c] === "x") {
          map[r][c] = ".";
          break;
        }
      }
    } else {
      for (let c = C - 1; c >= 0; c--) {
        if (map[r][c] === "x") {
          map[r][c] = ".";
          break;
        }
      }
    }

    drop();
  }

  console.log(map.map((row) => row.join("")).join("\n"));

  process.exit();
});
