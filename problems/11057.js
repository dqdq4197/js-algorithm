const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const MOD = 10007;
rl.on("line", function (line) {
  const N = +line;
  const dp = Array.from({ length: N + 1 }, () => []);
  dp[1] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  for (let i = 2; i <= N; i++) {
    dp[i][0] = 1;
    for (let j = 1; j < 10; j++) {
      dp[i][j] = (dp[i][j - 1] + dp[i - 1][j]) % MOD;
    }
  }

  console.log(dp[N].reduce((a, b) => a + b) % MOD);
  rl.close();
});
