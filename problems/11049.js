const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let input = [];

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    input.push(line.split(" ").map(Number));

    if (input.length === N) {
      rl.close();
    }
  }
}).on("close", function () {
  const dp = Array.from({ length: N }, () => Array(N).fill(0));

  for (let len = 1; len < N; len++) {
    for (let i = 0; i + len < N; i++) {
      const j = i + len;
      dp[i][j] = Infinity;

      for (let k = i; k < j; k++) {
        dp[i][j] = Math.min(
          dp[i][j],
          dp[i][k] + dp[k + 1][j] + input[i][0] * input[k][1] * input[j][1]
        );
      }
    }
  }

  console.log(dp[0][N - 1]);
});
