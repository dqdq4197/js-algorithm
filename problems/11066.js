const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let T, K;

rl.on("line", function (line) {
  if (!T) {
    T = +line;
  } else if (K === undefined) {
    K = +line;
  } else {
    const numbers = line.split(" ").map(Number);
    const dp = Array.from({ length: K }, () => Array(K).fill(0));
    const sum = Array(K).fill(0);

    for (let i = 0; i < K; i++) {
      sum[i + 1] = sum[i] + numbers[i];
    }

    for (let len = 1; len < K; len++) {
      for (let i = 0; i + len < K; i++) {
        const j = i + len;
        dp[i][j] = Infinity;

        for (let k = i; k < j; k++) {
          dp[i][j] = Math.min(
            dp[i][j],
            dp[i][k] + dp[k + 1][j] + sum[j + 1] - sum[i]
          );
        }
      }
    }

    console.log(dp[0][K - 1]);
    if (--T === 0) {
      rl.close();
    }
    K = undefined;
  }
});
