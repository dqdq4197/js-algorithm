const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let H, A;
let result = 0;

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else if (!H) {
    H = line.split(" ").map(Number);
  } else {
    A = line.split(" ").map(Number);

    const trees = H.map((n, i) => [n, A[i]]);
    trees.sort((a, b) => a[1] - b[1]);

    for (let i = 0; i < N; i++) {
      result += trees[i][0] + trees[i][1] * i;
    }

    console.log(result);
    rl.close();
  }
});
