const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let dp = [];
let max = 1;

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    const input = line.split(" ").map((n) => +n);
    dp = Array.from({ length: N }, () => 1);

    for (let i = 1; i < N; i++) {
      for (let j = 0; j < i; j++) {
        if (input[i] > input[j]) {
          dp[i] = Math.max(dp[i], dp[j] + 1);
          max = Math.max(max, dp[i]);
        }
      }
    }

    console.log(max);
    rl.close();
  }
});
