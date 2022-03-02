const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let graph = [];
let inDegree = [];
let queue = [];
let result = [];

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map((n) => +n);
    graph = Array.from({ length: N + 1 }, () => []);
    inDegree = Array.from({ length: N + 1 }, () => 0);
  } else {
    let input = line.split(" ").map((n) => +n);

    for (let i = 2; i < input.length; i++) {
      graph[input[i - 1]].push(input[i]);
      inDegree[input[i]] += 1;
    }
  }
}).on("close", function () {
  for (let i = 1; i < N + 1; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
      inDegree[i] = -1;
    }
  }

  while (queue.length) {
    let num = queue.shift();
    result.push(num);

    graph[num].forEach((n) => {
      inDegree[n] -= 1;
      if (inDegree[n] === 0) {
        queue.push(n);
        inDegree[n] = -1;
      }
    });
  }
  if (result.length !== N) console.log(0);
  else console.log(result.join("\n"));
  process.exit();
});
