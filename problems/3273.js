const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, X;
let input;

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else if (!input) {
    input = line.split(" ").map(Number);
  } else if (!X) {
    X = +line;

    const dicts = new Set();
    let result = 0;
    for (let i = 0; i < N; i++) {
      const num = input[i];
      if (dicts.has(X - num)) {
        result += 1;
      } else {
        dicts.add(num);
      }
    }

    console.log(result);
    rl.close();
  }
});
