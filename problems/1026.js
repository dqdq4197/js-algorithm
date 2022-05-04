const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let A, B;

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else if (!A) {
    A = line
      .split(" ")
      .map(Number)
      .sort((a, b) => a - b);
  } else {
    B = line
      .split(" ")
      .map(Number)
      .sort((a, b) => b - a);
    console.log(A.reduce((a, b, i) => a + b * B[i], 0));

    rl.close();
  }
});
