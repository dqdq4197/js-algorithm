const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let input = [];
let dp = [];

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map((n) => +n);
  } else {
    input.push(line.split(" ").map((n) => +n));
    if (input.length === N) {
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
          if (i === 0 && j === 0) continue;
          if (i === 0) {
            input[i][j] += input[i][j - 1];
            continue;
          }
          if (j === 0) {
            input[i][j] += input[i - 1][j];
            continue;
          }
          input[i][j] += Math.max(
            input[i - 1][j],
            input[i][j - 1],
            input[i - 1][j - 1]
          );
        }
      }
      console.log(input[N - 1][M - 1]);
      rl.close();
    }
  }
});
