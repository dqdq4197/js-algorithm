const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let T;
let N;
let inDegree = [];
let result = [];

rl.on("line", function (line) {
  if (T === undefined) {
    T = +line;
  } else if (N === undefined) {
    N = +line;
    inDegree = Array.from({ length: N + 1 }, () => 0);
  } else {
    const input = [0, ...line.split(" ").map((n) => +n)];
    let queue = [];
    let cnt = 0;

    input.forEach((num) => {
      inDegree[num] += 1;
    });

    for (let i = 1; i <= N; i++) {
      if (inDegree[i] === 0) {
        queue.push(i);
        inDegree[i] = -1;
      }
    }

    while (queue.length) {
      const num = queue.pop();
      const nextNum = input[num];
      cnt += 1;

      inDegree[nextNum] -= 1;
      if (inDegree[nextNum] === 0) {
        queue.push(nextNum);
        inDegree[nextNum] = -1;
      }
    }
    result.push(cnt);

    if (--T === 0) {
      console.log(result.join("\n"));
      rl.close();
    } else {
      N = undefined;
    }
  }
});
