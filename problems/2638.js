const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let input = [];
let N, M;
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

function bfs(row, col, cnt) {
  let queue = [[row, col]];
  let index = 0;

  while (queue.length > index) {
    const [y, x] = queue[index++];
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && ny >= 0 && nx < M && ny < N) {
        if (
          input[ny][nx] === 0 &&
          (visit[ny][nx] === 0 || visit[ny][nx] === cnt)
        ) {
          visit[ny][nx] = -1;
          queue.push([ny, nx]);
        }

        if (input[ny][nx] !== 0) {
          input[ny][nx] -= 1;
          visit[ny][nx] = cnt + 1;
        }
      }
    }
  }
}

function solution() {
  visit = Array.from({ length: N }, () => Array(M).fill(0));
  let cnt = -1;
  let flag = true;

  while (flag) {
    flag = false;
    cnt += 1;
    bfs(0, 0, cnt);
    if (cnt === 0) {
      bfs(0, 0, cnt);
      flag = true;
    } else {
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
          if (input[i][j] === 0 && visit[i][j] === cnt) {
            visit[i][j] = -1;
            bfs(i, j, cnt);
            flag = true;
          }
        }
      }
    }
  }
  return cnt - 1;
}

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map((n) => +n);
  } else {
    input.push(line.split(" ").map((n) => (n === "1" ? 2 : +n)));
    if (input.length === N) {
      const result = solution();
      console.log(result);
      rl.close();
    }
  }
});
