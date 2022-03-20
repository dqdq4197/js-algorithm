const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let input = [];

rl.on("line", function (line) {
  if (!N) N = +line;
  else {
    input.push(line.split(" ").map((n) => +n));

    if (input.length === N) rl.close();
  }
}).on("close", function () {
  for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (input[i][k] === 1 && input[k][j] === 1) {
          input[i][j] = 1;
        }
      }
    }
  }

  console.log(input.map((row) => row.join(" ")).join("\n"));

  process.exit();
});
