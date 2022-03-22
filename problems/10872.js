const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  let result = 1;
  for (let i = 1; i <= +line; i++) {
    result *= i;
  }
  console.log(result);
  rl.close();
});
