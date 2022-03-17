const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let input = [];
let result = 0;

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map((n) => +n);
  } else {
    input.push(
      line.split("").map((n) => {
        if (n === "1") result = 1;
        return +n;
      })
    );

    if (input.length === N) {
      for (let i = 1; i < N; i++) {
        for (let j = 1; j < M; j++) {
          if (input[i][j] === 0) continue;
          if (
            input[i][j - 1] === 0 ||
            input[i - 1][j - 1] === 0 ||
            input[i - 1][j] === 0
          )
            continue;
          input[i][j] =
            Math.min(input[i][j - 1], input[i - 1][j - 1], input[i - 1][j]) + 1;
          result = Math.max(result, input[i][j]);
        }
      }
      console.log(Math.pow(result, 2));
      rl.close();
    }
  }
});
