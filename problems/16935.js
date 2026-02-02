/**
 * 백준 - 구현
 * https://www.acmicpc.net/problem/16935
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M, A;
let grid = [];
let commands = [];

rl.on("line", function (line) {
  if (!N) {
    [N, M, A] = line.split(" ").map(Number);
  } else if (grid.length !== N) {
    grid.push(line.split(" ").map(Number));
  } else {
    commands = line.split(" ").map(Number);

    rl.close();
  }
}).on("close", function () {
  for (const command of commands) {
    switch (command) {
      case 1:
        one();
        break;
      case 2:
        two();
        break;
      case 3:
        three();
        break;
      case 4:
        four();
        break;
      case 5:
        five();
        break;
      case 6:
        six();
        break;
    }
  }

  console.log(format(grid));
});

function one() {
  grid.reverse();
}

function two() {
  for (let r = 0; r < grid.length; r++) {
    const row = grid[r];

    row.reverse();
  }
}

function three() {
  const newGrid = Array.from({ length: grid[0].length }, () =>
    Array(grid.length).fill(0),
  );

  for (let r = 0; r < grid.length; r++) {
    const row = grid[r];

    for (let c = 0; c < row.length; c++) {
      const cell = row[c];
      const movedR = c;
      const movedC = grid.length - r - 1;

      newGrid[movedR][movedC] = cell;
    }
  }

  grid = newGrid;
}

function four() {
  const newGrid = Array.from({ length: grid[0].length }, () =>
    Array(grid.length).fill(0),
  );

  for (let r = 0; r < grid.length; r++) {
    const row = grid[r];

    for (let c = 0; c < row.length; c++) {
      const cell = row[c];
      const movedR = row.length - c - 1;
      const movedC = r;

      newGrid[movedR][movedC] = cell;
    }
  }

  grid = newGrid;
}

function five() {
  const newGrid = Array.from({ length: grid.length }, () =>
    Array(grid[0].length).fill(0),
  );

  const halfR = grid.length / 2;
  const halfC = grid[0].length / 2;

  for (let r = 0; r < grid.length; r++) {
    const row = grid[r];

    for (let c = 0; c < row.length; c++) {
      const cell = row[c];

      if (r < halfR && c < halfC) {
        const movedR = r;
        const movedC = c + halfC;

        newGrid[movedR][movedC] = cell;
      }

      if (r < halfR && c >= halfC) {
        const movedR = r + halfR;
        const movedC = c;

        newGrid[movedR][movedC] = cell;
      }

      if (r >= halfR && c >= halfC) {
        const movedR = r;
        const movedC = c - halfC;

        newGrid[movedR][movedC] = cell;
      }

      if (r >= halfR && c < halfC) {
        const movedR = r - halfR;
        const movedC = c;

        newGrid[movedR][movedC] = cell;
      }
    }
  }

  grid = newGrid;
}

function six() {
  const newGrid = Array.from({ length: grid.length }, () =>
    Array(grid[0].length).fill(0),
  );

  const halfR = grid.length / 2;
  const halfC = grid[0].length / 2;

  for (let r = 0; r < grid.length; r++) {
    const row = grid[r];

    for (let c = 0; c < row.length; c++) {
      const cell = row[c];

      if (r < halfR && c < halfC) {
        const movedR = r + halfR;
        const movedC = c;

        newGrid[movedR][movedC] = cell;
      }

      if (r < halfR && c >= halfC) {
        const movedR = r;
        const movedC = c - halfC;

        newGrid[movedR][movedC] = cell;
      }

      if (r >= halfR && c >= halfC) {
        const movedR = r - halfR;
        const movedC = c;

        newGrid[movedR][movedC] = cell;
      }

      if (r >= halfR && c < halfC) {
        const movedR = r;
        const movedC = c + halfC;

        newGrid[movedR][movedC] = cell;
      }
    }
  }

  grid = newGrid;
}

function format(grid) {
  return grid.map((row) => row.join(" ")).join("\n");
}
