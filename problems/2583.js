const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let M, N, K;
let map = [];
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

function bfs(i, j) {
  const queue = [[i, j]];
  let cnt = 0;
  let index = 0;

  while (queue.length > index) {
    const [y, x] = queue[index++];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && ny >= 0 && nx < N && ny < M && !map[ny][nx]) {
        map[ny][nx] = true;
        queue.push([ny, nx]);
        cnt += 1;
      }
    }
  }

  return cnt;
}

rl.on("line", function (line) {
  if (!M) {
    [M, N, K] = line.split(" ").map((n) => +n);
    map = Array.from({ length: M }, () => Array(N).fill(false));
  } else {
    const [x1, y1, x2, y2] = line.split(" ").map((n) => +n);

    for (let i = y1; i < y2; i++) {
      for (let j = x1; j < x2; j++) {
        map[i][j] = true;
      }
    }

    if (--K === 0) {
      rl.close();
    }
  }
}).on("close", function () {
  let count = 0;
  let result = [];

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      if (!map[i][j]) {
        map[i][j] = true;
        const cnt = bfs(i, j);
        result.push(cnt + 1);
        count += 1;
      }
    }
  }

  result.sort((a, b) => a - b);
  console.log(count);
  console.log(result.join(" "));
});
