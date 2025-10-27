/**
 * 백준 - 시뮬레이션
 * https://www.acmicpc.net/problem/3987
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dirs = {
  U: [-1, 0],
  R: [0, 1],
  D: [1, 0],
  L: [0, -1],
};
let R, C;
let grid = [null];
let PR, PC;

rl.on("line", function (line) {
  if (!R) {
    [R, C] = line.split(" ").map(Number);
  } else if (grid.length !== R + 1) {
    grid.push(["x", ...line.split("")]);
  } else {
    [PR, PC] = line.split(" ").map(Number);
    rl.close();
  }
}).on("close", function () {
  let maxDist = 0;
  let direction = null;

  for (const startDir of ["U", "R", "D", "L"]) {
    let dist = 0;
    let [r, c, dir] = [PR, PC, startDir];

    while (true) {
      dist += 1;

      const [dr, dc] = dirs[dir];
      const nr = r + dr;
      const nc = c + dc;

      if (nr <= 0 || nc <= 0 || nr > R || nc > C) {
        break;
      }

      const next = grid[nr][nc];
      if (next === "C") {
        break;
      }

      let nextDir = dir;
      if (dir === "U") {
        if (next === "/") nextDir = "R";
        if (next === "\\") nextDir = "L";
      }
      if (dir === "R") {
        if (next === "/") nextDir = "U";
        if (next === "\\") nextDir = "D";
      }
      if (dir === "D") {
        if (next === "/") nextDir = "L";
        if (next === "\\") nextDir = "R";
      }
      if (dir === "L") {
        if (next === "/") nextDir = "D";
        if (next === "\\") nextDir = "U";
      }

      if (nr === PR && nc === PC && nextDir === startDir) {
        console.log(startDir);
        console.log("Voyager");
        return;
      }

      [r, c, dir] = [nr, nc, nextDir];
    }

    if (maxDist < dist) {
      maxDist = dist;
      direction = startDir;
    }
  }

  console.log([direction, maxDist].join("\n"));
});
