const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let T;
let N;
let graph = [];
let check = [];

function bfs(num, temp) {
  let target = graph[num];

  while (true) {
    temp.push(target);
    if (check[target] === false) {
      temp.forEach((n) => (check[n] = false));
      return;
    }
    if (num === target) {
      temp.forEach((n) => (check[n] = true));
      return;
    }

    if (target === graph[target]) {
      temp.forEach((n) => (check[n] = false));
      check[target] = true;
      return;
    }
    target = graph[target];
  }
}

rl.on("line", function (line) {
  if (T === undefined) {
    T = +line;
  } else if (N === undefined) {
    N = +line;
    graph = Array.from({ length: N + 1 }, () => 0);
    check = Array.from({ length: N + 1 }, () => undefined);
  } else {
    line.split(" ").forEach((target, i) => (graph[i + 1] = +target));
    for (let i = 1; i <= N; i++) {
      if (check[i] === undefined) {
        bfs(i, [i]);
      }
    }
    const result = check.slice(1).filter((bool) => !bool).length;
    console.log(result);
    T -= 1;
    N = undefined;
    if (T === 0) rl.close();
  }
});
