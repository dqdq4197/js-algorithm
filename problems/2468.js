const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N = 0;
let input = [];
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];
let result = 0;
let min = 100;
let max = 1;
let visit = [];

function bfs(y, x) {
  const queue = [[y, x]];
  let index = 0;

  while (queue.length > index) {
    const [row, col] = queue[index++];

    for (let i = 0; i < 4; i++) {
      const nx = col + dx[i];
      const ny = row + dy[i];

      if (nx >= 0 && ny >= 0 && nx < N && ny < N && !visit[ny][nx]) {
        visit[ny][nx] = true;
        queue.push([ny, nx]);
      }
    }
  }
}

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    input.push(
      line.split(" ").map((n) => {
        min = Math.min(+n, min);
        max = Math.max(+n, max);
        return +n;
      })
    );
    if (input.length === N) {
      for (let i = 0; i <= max; i++) {
        visit = input.map((arr) => arr.map((v) => v <= i));
        let cnt = 0;
        for (let j = 0; j < N; j++) {
          for (let k = 0; k < N; k++) {
            if (input[j][k] > i && !visit[j][k]) {
              visit[j][k] = true;
              bfs(j, k);
              cnt++;
            }
          }
        }
        result = Math.max(result, cnt);
      }
      console.log(result);
      rl.close();
    }
  }
});
