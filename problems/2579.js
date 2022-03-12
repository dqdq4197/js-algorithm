const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let input = [];
let DP = [];

rl.on("line", function (line) {
  if (!N) N = +line;
  else {
    input.push(+line);
    if (input.length === N) {
      DP = Array.from({ length: N }, () => Array(2));

      DP[0] = [input[0], input[0]];
      DP[1] = [input[1], input[0] + input[1]];

      for (let i = 2; i < N; i++) {
        DP[i][0] = Math.max(DP[i - 2][0], DP[i - 2][1]) + input[i];
        DP[i][1] = DP[i - 1][0] + input[i];
      }

      console.log(Math.max(...DP[N - 1]));
      rl.close();
    }
  }
});
