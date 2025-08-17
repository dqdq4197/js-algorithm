/**
 * 백준 - 시뮬레이션
 * https://www.acmicpc.net/problem/19237
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M, K;
let direction;
const grid = [];
let priority;
// 상하좌우
const dx = [, 0, 0, -1, 1];
const dy = [, -1, 1, 0, 0];
let priorityCount = 0;

function findNextPos(possiblePos, currentPos, currentDir, shark) {
  const [x, y] = currentPos;
  const dirs = priority[shark][currentDir];

  for (const dir of dirs) {
    const nx = x + dx[dir];
    const ny = y + dy[dir];

    if (nx < 0 || ny < 0 || nx >= N || ny >= N) {
      continue;
    }

    const isPossible = possiblePos.some(([px, py]) => px === nx && py === ny);

    if (isPossible) {
      return [nx, ny, dir];
    }
  }
}

rl.on("line", function (line) {
  if (!N) {
    [N, M, K] = line.split(" ").map(Number);
    priority = Array.from({ length: M + 1 }, () =>
      Array.from({ length: 5 }, () => [])
    );
  } else if (grid.length !== N) {
    grid.push(line.split(" ").map(Number));
  } else if (!direction) {
    direction = [, ...line.split(" ").map(Number)];
  } else {
    const sharkNum = Math.floor(priorityCount / 4) + 1;
    const dirNum = (priorityCount % 4) + 1;
    priority[sharkNum][dirNum] = line.split(" ").map(Number);

    if (++priorityCount === M * 4) {
      rl.close();
    }
  }
}).on("close", function () {
  let sharks = grid.map((row) =>
    row.map((shark) => (shark === 0 ? [0, 0] : [shark, direction[shark]]))
  );
  const smells = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => [0, 0])
  );

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const [shark] = sharks[y][x];
      if (shark !== 0) {
        smells[y][x] = [K, shark];
      }
    }
  }

  let time = 0;
  while (time < 1000) {
    time += 1;
    const nextSharks = Array.from({ length: N }, () =>
      Array.from({ length: N }, () => [0, 0])
    );

    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        const [shark, dir] = sharks[y][x];

        if (shark === 0) continue;

        const noSmells = [];
        const mySmells = [];

        for (let i = 1; i <= 4; i++) {
          const nx = x + dx[i];
          const ny = y + dy[i];

          if (nx < 0 || ny < 0 || nx >= N || ny >= N) {
            continue;
          }

          const [k, smellsOwner] = smells[ny][nx];

          if (k === 0) {
            noSmells.push([nx, ny]);
          }

          if (smellsOwner === shark) {
            mySmells.push([nx, ny]);
          }
        }

        let nextMove = null;
        if (noSmells.length > 0) {
          nextMove = findNextPos(noSmells, [x, y], dir, shark);
        } else if (mySmells.length > 0) {
          nextMove = findNextPos(mySmells, [x, y], dir, shark);
        }
        if (!nextMove) continue;
        const [nx, ny, nextDir] = nextMove;
        const [nextShark] = nextSharks[ny][nx];

        if (nextShark === 0 || nextShark > shark) {
          nextSharks[ny][nx] = [shark, nextDir];
        }
      }
    }

    sharks = nextSharks;

    let sharkCount = 0;
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        if (sharks[y][x][0] > 0) {
          sharkCount += 1;
        }
      }
    }

    if (sharkCount === 1) {
      console.log(time);
      process.exit();
    }

    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        const [k, owner] = smells[y][x];
        if (k > 1) {
          smells[y][x] = [k - 1, owner];
        } else {
          smells[y][x] = [0, 0];
        }

        const [shark] = sharks[y][x];
        if (shark > 0) {
          smells[y][x] = [K, shark];
        }
      }
    }
  }

  console.log(-1);
});
