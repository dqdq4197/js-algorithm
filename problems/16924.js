/**
 * 백준 - 시뮬레이션 / 브루트포스
 * https://www.acmicpc.net/problem/16924
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let R, C;
let flags;
let input = [];
const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

function solution(answer) {
  if (answer.length === 0) {
    return -1;
  }

  for (let y = 0; y < R; y++) {
    for (let x = 0; x < C; x++) {
      if (input[y][x] === "*" && !flags[y][x]) {
        return -1;
      }
    }
  }

  answer.unshift([answer.length]);
  return answer.map((row) => row.join(" ")).join("\n");
}

rl.on("line", function (line) {
  if (!R) {
    [R, C] = line.split(" ").map(Number);
    flags = Array.from({ length: R }, () => Array(C).fill(false));
  } else {
    input.push(line.split(""));

    if (R === input.length) {
      rl.close();
    }
  }
}).on("close", function () {
  const answer = [];

  for (let y = 0; y < R; y++) {
    for (let x = 0; x < C; x++) {
      if (input[y][x] === ".") {
        continue;
      }

      let depth = 0;
      outer: while (true) {
        depth += 1;

        const temp = [];
        for (let i = 0; i < 4; i++) {
          const nx = x + depth * dx[i];
          const ny = y + depth * dy[i];

          if (nx < 0 || ny < 0 || nx >= C || ny >= R) {
            break outer;
          }

          if (input[ny][nx] !== "*") {
            break outer;
          }

          temp.push([nx, ny]);

          if (i === 3) {
            for (const [x, y] of temp) {
              flags[y][x] = true;
            }
          }
        }

        flags[y][x] = true;

        answer.push([y + 1, x + 1, depth]);
      }
    }
  }

  console.log(solution(answer));

  process.exit();
});
