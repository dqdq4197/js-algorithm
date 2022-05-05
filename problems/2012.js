const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let input = [];

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    input.push(+line);

    if (input.length === N) {
      let result = 0;

      input
        .sort((a, b) => a - b)
        .forEach((n, i) => (result += Math.abs(i + 1 - input[i])));
      console.log(result);
      rl.close();
    }
  }
});
