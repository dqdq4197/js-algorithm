const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, F;

rl.on("line", function (line) {
  if (!N) {
    N = line;
  } else {
    F = +line;
    rl.close();
  }
}).on("close", function () {
  N = N.slice(0, -2) + "00";
  let num = +N;
  while (num % F !== 0) {
    num++;
  }

  console.log((num % 100).toString().padStart(2, "0"));
});
