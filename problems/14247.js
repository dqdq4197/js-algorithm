const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let H = [];
let A = [];
let result = 0;

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else if (H.length === 0) {
    H = line.split(" ").map((n) => +n);
  } else {
    A = line.split(" ").map((n) => +n);

    const sortedA = A.slice().sort((a, b) => a - b);
    const trees = [];

    for (let i = 0; i < sortedA.length; i++) {
      const index = A.indexOf(sortedA[i]);
      trees.push(H[index]);
    }

    for (let i = 0; i < trees.length; i++) {
      result += trees[i] + sortedA[i] * i;
    }

    console.log(result);
    rl.close();
  }
});
