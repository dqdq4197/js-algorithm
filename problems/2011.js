const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const MOD = 1000000;
const MAX = 26;

rl.on("line", function (line) {
  const input = "0" + line;
  const len = input.length;

  const dp = [1, 1];

  for (let i = 2; i < len; i++) {
    dp[i] = 0;
    const cur = +input[i];
    const tensPlace = +(input[i - 1] + input[i]);

    if (cur !== 0) dp[i] += dp[i - 1];
    if (tensPlace >= 10 && tensPlace <= MAX) dp[i] += dp[i - 2];
    dp[i] %= MOD;
  }

  if (input[1] === "0") {
    console.log(0);
  } else {
    console.log(dp[len - 1]);
  }

  rl.close();
});
