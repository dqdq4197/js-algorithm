const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n, m, r;
let items;
let graph = [];
const INF = Infinity;

function bfs(start) {
  const dist = Array.from({ length: n + 1 }, () => INF);
  const queue = [[start, 0]];
  dist[start] = 0;
  let sum = 0;

  let index = 0;
  while (queue.length > index) {
    const [now, cost] = queue[index++];

    graph[now].forEach(([next, d]) => {
      if (cost + d <= m && dist[next] > cost + d) {
        queue.push([next, cost + d]);
        dist[next] = cost + d;
      }
    });
  }

  dist.forEach((d, i) => {
    if (d !== INF) sum += items[i];
  });
  return sum;
}

rl.on("line", function (line) {
  if (!n) {
    [n, m, r] = line.split(" ").map((n) => +n);
    graph = Array.from({ length: n + 1 }, () => []);
  } else if (!items) {
    items = [0, ...line.split(" ").map((n) => +n)];
  } else {
    const [a, b, l] = line.split(" ").map((n) => +n);

    graph[a].push([b, l]);
    graph[b].push([a, l]);

    if (--r === 0) {
      let result = 0;

      for (let i = 1; i <= n; i++) {
        const sum = bfs(i);
        result = Math.max(sum, result);
      }

      console.log(result);
      rl.close();
    }
  }
});
