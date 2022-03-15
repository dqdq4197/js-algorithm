// DP 문제
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let T;
let n;
let input = [];
const result = [];

function dynamicPG(n) {
  let dp = Array.from({ length: n + 1 }, () => Array(2));
  dp[0] = [0, 0];

  for (let i = 1; i <= n; i++) {
    dp[i] = [
      Math.max(dp[i - 1][0], dp[i - 1][1] + input[0][i - 1]),
      Math.max(dp[i - 1][1], dp[i - 1][0] + input[1][i - 1]),
    ];
  }

  return Math.max(...dp[n]);
}

rl.on("line", function (line) {
  if (!T) {
    T = +line;
  } else if (!n) {
    n = +line;
  } else {
    input.push(line.split(" ").map((n) => +n));
    if (input.length === 2) {
      const max = dynamicPG(n);
      result.push(max);
      //reset
      input = [];
      n = 0;
      if (--T === 0) {
        console.log(result.join("\n"));
        rl.close();
      }
    }
  }
});
