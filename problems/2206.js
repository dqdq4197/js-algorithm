const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let map = [];
let visit = [];
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];

function bfs(i, j) {
  const queue = [[i, j, 1, 1]];
  visit[i][j][1] = true;
  let index = 0;

  while (queue.length > index) {
    const [y, x, available, dist] = queue[index++];
    if (y === N - 1 && x === M - 1) return dist;

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && ny >= 0 && nx < M && ny < N && !visit[ny][nx][available]) {
        if (map[ny][nx] === 1) {
          if (available) {
            queue.push([ny, nx, 0, dist + 1]);
            visit[ny][nx][0] = true;
          }
        } else {
          visit[ny][nx][available] = true;
          queue.push([ny, nx, available, dist + 1]);
        }
      }
    }
  }

  return -1;
}

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map((n) => +n);
    visit = Array.from({ length: N }, () =>
      Array.from({ length: M }, () => Array(2).fill(false))
    );
  } else {
    map.push(line.split("").map((n) => +n));
    if (map.length === N) {
      const result = bfs(0, 0);
      console.log(result);
      rl.close();
    }
  }
});
