const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let R, C;
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];
let input = [];
let visit = [];

let wolf = 0;
let sheep = 0;
let sheepCnt = 0;
let wolfCnt = 0;

function bfs(i, j) {
  const queue = [[i, j]];

  let index = 0;
  while (queue.length > index) {
    const [y, x] = queue[index++];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && ny >= 0 && nx < C && ny < R && !visit[ny][nx]) {
        const next = input[ny][nx];

        if (next !== "#") {
          if (next === "v") {
            wolf += 1;
          }
          if (next === "o") {
            sheep += 1;
          }
          queue.push([ny, nx]);
          visit[ny][nx] = true;
        }
      }
    }
  }
}

rl.on("line", function (line) {
  if (!R) {
    [R, C] = line.split(" ").map((n) => +n);
    visit = Array.from({ length: R }, () => Array(C).fill(false));
  } else {
    input.push(line.split(""));

    if (input.length === R) {
      for (let i = 0; i < R; i++) {
        for (let j = 0; j < C; j++) {
          const now = input[i][j];
          if (!visit[i][j] && now !== "#") {
            wolf = 0;
            sheep = 0;
            if (now === "o") sheep = 1;
            if (now === "v") wolf = 1;
            visit[i][j] = true;
            bfs(i, j);

            if (sheep > wolf) sheepCnt += sheep;
            else wolfCnt += wolf;
          }
        }
      }

      console.log(sheepCnt, wolfCnt);
      rl.close();
    }
  }
});
