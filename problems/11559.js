/**
 * 백준 - 시뮬레이션 / 그래프
 * https://www.acmicpc.net/problem/11559
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const R = 12;
const C = 6;
const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];
let fields = [];

function drop() {
  for (let c = 0; c < C; c++) {
    let down = R - 1;
    let top = R - 2;

    while (down > 0 && top >= 0) {
      if (down === top) {
        top -= 1;
        continue;
      }

      if (fields[down][c] !== ".") {
        down -= 1;
        continue;
      }

      if (fields[top][c] === ".") {
        top -= 1;
        continue;
      }

      fields[down][c] = fields[top][c];
      fields[top][c] = ".";

      down -= 1;
      top -= 1;
    }
  }
}

rl.on("line", function (line) {
  fields.push(line.split(""));

  if (fields.length === 12) {
    rl.close();
  }
}).on("close", function () {
  let count = 0;

  while (true) {
    let isDestroyed = false;
    const visited = Array.from({ length: R }, () => Array(C).fill(false));

    function destroy(r, c, color) {
      visited[r][c] = true;

      const queue = [[r, c]];

      let index = 0;
      while (queue.length > index) {
        const [y, x] = queue[index++];

        for (let i = 0; i < 4; i++) {
          const ny = y + dy[i];
          const nx = x + dx[i];

          if (ny < 0 || nx < 0 || ny >= R || nx >= C) {
            continue;
          }

          if (visited[ny][nx]) {
            continue;
          }

          if (fields[ny][nx] !== color) {
            continue;
          }

          visited[ny][nx] = true;
          queue.push([ny, nx]);
        }
      }

      return queue.length >= 4 ? queue : [];
    }

    for (let r = 0; r < R; r++) {
      for (let c = 0; c < C; c++) {
        const cell = fields[r][c];

        if (cell === "." || visited[r][c]) {
          continue;
        }

        const destroyedBlocks = destroy(r, c, cell);

        if (destroyedBlocks.length === 0) {
          continue;
        }

        isDestroyed = true;
        for (const [y, x] of destroyedBlocks) {
          fields[y][x] = ".";
        }
      }
    }

    if (!isDestroyed) {
      break;
    }

    count += 1;

    drop();
  }

  console.log(count);

  process.exit();
});
