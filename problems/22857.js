const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, K;
let input = [];
let DP = [];
let result = 0;

rl.on("line", function (line) {
  if (!N) {
    [N, K] = line.split(" ").map(Number);
    DP = Array.from({ length: N }, () => []);
  } else {
    input = line.split(" ").map(Number);

    if (input[0] % 2 === 0) {
      DP[0][0] = 1;
      result = 1;
    } else {
      DP[0][0] = 0;
    }

    for (let i = 1; i < N; i++) {
      for (let j = 0; j < DP[i - 1].length; j++) {
        const cnt = DP[i - 1][j];
        if (input[i] % 2 === 0) {
          const nCnt = cnt === undefined ? 1 : cnt + 1;
          DP[i][j] = nCnt;
          result = Math.max(nCnt, result);
        } else {
          if (j === K) continue;
          DP[i][j + 1] = cnt;
        }
      }
    }

    console.log(result);
    rl.close();
  }
});
