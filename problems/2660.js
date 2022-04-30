const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const INF = Infinity;
let N;
let input = [];

rl.on("line", function (line) {
  if (!N) {
    N = +line;
    input = Array.from({ length: N + 1 }, () => Array(N + 1).fill(INF));
  } else {
    const [a, b] = line.split(" ").map(Number);
    if (a === -1 && b === -1) {
      for (let i = 1; i <= N; i++) {
        input[i][i] = 0;
      }

      for (let k = 1; k <= N; k++) {
        for (let i = 1; i <= N; i++) {
          for (let j = 0; j <= N; j++) {
            input[i][j] = Math.min(input[i][j], input[i][k] + input[k][j]);
          }
        }
      }

      const points = [null];
      for (let i = 1; i <= N; i++) {
        let max = 0;
        for (let j = 1; j <= N; j++) {
          const num = input[i][j];
          if (num !== INF && max < num) {
            max = num;
          }
        }

        points.push(max);
      }

      const minPoint = Math.min(...points.slice(1));
      const result = [];

      for (let i = 1; i <= N; i++) {
        if (minPoint === points[i]) {
          result.push(i);
        }
      }

      console.log(minPoint, result.length);
      console.log(result.join(" "));
      rl.close();
    } else {
      input[a][b] = 1;
      input[b][a] = 1;
    }
  }
});
