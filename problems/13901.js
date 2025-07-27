/**
 * 백준 - 시뮬레이션
 * https://www.acmicpc.net/problem/
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let R, C, K;
let startPos;
let commands;
let visit;
const dirMap = {
  1: [-1, 0],
  2: [1, 0],
  3: [0, -1],
  4: [0, 1],
};

rl.on("line", function (line) {
  if (!R) {
    [R, C] = line.split(" ").map(Number);
    visit = Array.from({ length: R }, () => Array(C).fill(false));
  } else if (K === undefined) {
    K = +line;
  } else if (K !== 0) {
    const [br, bc] = line.split(" ").map(Number);
    visit[br][bc] = true;
    K -= 1;
  } else if (!startPos) {
    startPos = line.split(" ").map(Number);
  } else {
    commands = line.split(" ").map((command) => Number(command));
    rl.close();
  }
}).on("close", function () {
  const [sr, sc] = startPos;

  let r = sr;
  let c = sc;
  visit[r][c] = true;

  let dirIndex = 0;
  outer: while (true) {
    for (let i = 0; i < 4; i++) {
      const command = commands[dirIndex % 4];
      const [dr, dc] = dirMap[command];
      const nr = r + dr;
      const nc = c + dc;

      if (nr < 0 || nc < 0 || nr >= R || nc >= C || visit[nr][nc]) {
        if (i === 3) {
          break outer;
        }
        dirIndex += 1;
        continue;
      }

      visit[nr][nc] = true;
      [r, c] = [nr, nc];
      break;
    }
  }

  console.log(`${r} ${c}`);

  process.exit();
});
