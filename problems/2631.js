const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let input = [];
let dp = [];
let max = 1;

function LIS(n) {
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (input[i] > input[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
        max = Math.max(max, dp[i]);
      }
    }
  }
}

rl.on("line", function (line) {
  if (!N) N = +line;
  else {
    input.push(+line);

    if (input.length === N) {
      dp = Array.from({ length: N }, () => 1);
      LIS(N);
      console.log(N - max);
      rl.close();
    }
  }
});
