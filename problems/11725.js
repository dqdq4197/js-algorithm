const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let graph = [];
let result = [];

function bfs(start) {
  let queue = [start];
  let index = 0;

  while (queue.length > index) {
    const now = queue[index++];

    graph[now].forEach((next) => {
      if (!result[next]) {
        result[next] = now;
        queue.push(next);
      }
    });
  }
}

rl.on("line", function (line) {
  if (!N) {
    N = +line;
    graph = Array.from({ length: N + 1 }, () => []);
  } else {
    const [a, b] = line.split(" ").map((n) => +n);
    graph[a].push(b);
    graph[b].push(a);

    if (--N === 1) {
      bfs(1);
      console.log(result.slice(2).join("\n"));
      rl.close();
    }
  }
});
