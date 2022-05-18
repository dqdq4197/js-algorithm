const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, K;
let input = [];

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else if (!K) {
    K = +line;
  } else {
    input = line.split(" ").map(Number);

    rl.close();
  }
}).on("close", function () {
  let result = 0;
  input.sort((a, b) => a - b);

  let D = [];
  for (let i = 1; i < N; i++) {
    const gap = input[i] - input[i - 1];
    D.push([i - 1, gap]);
  }
  S = [...D]
    .sort((a, b) => b[1] - a[1])
    .slice(0, K - 1)
    .sort((a, b) => a[0] - b[0]);
  S.push([N - 1, 0]);

  let index = 0;
  let start = 0;
  while (index < S.length) {
    const [end, _] = S[index++];
    for (let i = start; i < end; i++) {
      result += D[i][1];
    }
    start = end + 1;
  }

  console.log(result);
  process.exit();
});
