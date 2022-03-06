const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let crains = [];
let boxes = [];
let check = [];
let pos = [];

function solution() {
  crains.sort((a, b) => b - a);
  boxes.sort((a, b) => b - a);
  check = Array.from({ length: M }, () => false);
  pos = Array.from({ length: N }, () => 0);

  if (crains[0] < boxes[0]) return -1;

  let result = 0;
  let count = 0;

  while (true) {
    if (count === M) break;

    for (let i = 0; i < N; i++) {
      while (pos[i] < M) {
        if (!check[pos[i]] && crains[i] >= boxes[pos[i]]) {
          check[pos[i]] = true;
          pos[i] += 1;
          count += 1;
          break;
        }
        pos[i] += 1;
      }
    }
    result += 1;
  }

  return result;
}

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else if (crains.length !== N) {
    crains = line.split(" ").map((n) => +n);
  } else if (!M) {
    M = +line;
  } else {
    boxes = line.split(" ").map((n) => +n);
    rl.close();
  }
}).on("close", function () {
  const result = solution();
  console.log(result);
  process.exit();
});
