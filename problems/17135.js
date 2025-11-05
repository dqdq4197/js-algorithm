/**
 * 백준 - 구현 / 조합 / 브루트포스
 * https://www.acmicpc.net/problem/17135
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dx = [-1, 0, 1];
const dy = [0, -1, 0];

let N, M, D;
let grid = [];

rl.on("line", function (line) {
  if (!N) {
    [N, M, D] = line.split(" ").map(Number);
  } else {
    grid.push(line.split(" ").map(Number));

    if (grid.length === N) {
      rl.close();
    }
  }
}).on("close", function () {
  const visit = Array.from({ length: M }, () => false);
  const archerPos = [];
  let maxKilled = 0;

  function archerCombination(start) {
    if (archerPos.length === 3) {
      let killed = 0;
      const cpGrid = grid.map((row) => row.slice());

      while (true) {
        const attackedPositions = [];

        for (const archerX of archerPos) {
          const attacked = attack(archerX, cpGrid);

          if (!attacked) continue;

          const isExist = attackedPositions.some(
            ([x, y]) => x === attacked[0] && y === attacked[1]
          );
          if (isExist) continue;

          attackedPositions.push(attacked);
        }

        for (const [x, y] of attackedPositions) {
          cpGrid[y][x] = 0;
          killed += 1;
        }

        maxKilled = Math.max(maxKilled, killed);
        cpGrid.pop();
        cpGrid.unshift(Array.from({ length: M }, () => 0));

        if (!isExistEnemy(cpGrid)) {
          break;
        }
      }

      return;
    }

    for (let i = start; i < M; i++) {
      visit[i] = true;
      archerPos.push(i);
      archerCombination(i + 1);
      visit[i] = false;
      archerPos.pop();
    }
  }

  archerCombination(0);

  function attack(archerX, cpGrid) {
    const arrows = [[archerX, N - 1, 1]];

    let index = 0;
    while (arrows.length > index) {
      const [arrowX, arrowY, dist] = arrows[index++];

      if (cpGrid[arrowY][arrowX] === 1) {
        return [arrowX, arrowY];
      }

      if (dist === D) {
        continue;
      }

      for (let i = 0; i < 3; i++) {
        const nx = arrowX + dx[i];
        const ny = arrowY + dy[i];

        if (nx < 0 || nx >= M || ny < 0) {
          continue;
        }

        arrows.push([nx, ny, dist + 1]);
      }
    }
  }

  function isExistEnemy(cpGrid) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (cpGrid[i][j] === 1) {
          return true;
        }
      }
    }

    return false;
  }

  console.log(maxKilled);
});
