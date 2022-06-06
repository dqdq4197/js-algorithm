const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let input = [];
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];
let result = [];

function initCheck(i, j) {
  if (input[i][j] !== -1) return;
  input[i][j] = 0;
  const queue = [[i, j]];
  let index = 0;

  while (queue.length > index) {
    const [y, x] = queue[index++];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || ny < 0 || nx >= M || ny >= N) continue;
      if (input[ny][nx] !== -1) continue;
      input[ny][nx] = 0;
      queue.push([ny, nx]);
    }
  }
}

function getMeltCnt(i, j, cnt) {
  let meltCnt = 0;
  const queue = [[i, j]];

  let index = 0;
  while (queue.length > index) {
    const [y, x] = queue[index++];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || ny < 0 || nx >= M || ny >= N) continue;
      if (input[ny][nx] === -1) {
        queue.push([ny, nx]);
        input[ny][nx] = cnt;
      }
      if (input[ny][nx] === "c") {
        input[ny][nx] = cnt + 1;
        meltCnt += 1;
      }
    }
  }

  return meltCnt;
}

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
  } else {
    input.push(line.split(" ").map((v) => (v === "1" ? "c" : -1)));

    if (input.length === N) {
      for (let i = 0; i < M; i++) {
        initCheck(0, i);
      }
      for (let i = 1; i < N - 1; i++) {
        initCheck(i, 0);
        initCheck(i, M - 1);
      }
      for (let i = 0; i < M; i++) {
        initCheck(0, i);
      }

      let cnt = 0;
      while (true) {
        let flag = false;
        let totalMeltCnt = 0;
        for (let i = 0; i < N; i++) {
          for (let j = 0; j < M; j++) {
            if (input[i][j] === cnt) {
              const meltCnt = getMeltCnt(i, j, cnt);
              totalMeltCnt += meltCnt;
              if (meltCnt !== 0) flag = true;
            }
          }
        }
        if (!flag) break;
        cnt += 1;
        result = [cnt, totalMeltCnt];
      }

      console.log(result.join("\n"));
      rl.close();
    }
  }
});
