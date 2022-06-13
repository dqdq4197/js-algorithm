const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let input = [];
let visit = [];
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

function bfs(i, j) {
  const queue = [[i, j]];
  let area = 1;

  let index = 0;
  while (queue.length > index) {
    const [y, x] = queue[index++];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || ny < 0 || nx >= M || ny >= N) continue;
      if (visit[ny][nx] || input[ny][nx] === 0) continue;
      visit[ny][nx] = true;
      area += 1;
      queue.push([ny, nx]);
    }
  }

  return area;
}
rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
    visit = Array.from({ length: N }, () => Array(M).fill(false));
  } else {
    input.push(line.split(" ").map(Number));

    if (input.length === N) {
      let cnt = 0;
      let max = 0;
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
          if (!visit[i][j] && input[i][j] === 1) {
            visit[i][j] = true;
            const result = bfs(i, j);
            max = Math.max(result, max);
            cnt += 1;
          }
        }
      }
      console.log([cnt, max].join("\n"));
      rl.close();
    }
  }
});
