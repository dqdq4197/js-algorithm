const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
  } else {
    let result = 0;
    const input = line.split(" ").map(Number);

    let positive = [];
    let negative = [];

    input.forEach((n) => {
      if (n > 0) {
        positive.push(n);
      } else {
        negative.push(Math.abs(n));
      }
    });

    positive.sort((a, b) => b - a);
    negative.sort((a, b) => b - a);

    if (positive.length === 0 || positive[0] < negative[0]) {
      result += negative[0];
      negative = negative.slice(M);
    } else {
      result += positive[0];
      positive = positive.slice(M);
    }

    let index = 0;
    while (index < negative.length) {
      result += negative[index] * 2;
      index += M;
    }
    index = 0;
    while (index < positive.length) {
      result += positive[index] * 2;
      index += M;
    }
    console.log(result);
    rl.close();
  }
});
