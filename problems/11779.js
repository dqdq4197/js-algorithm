const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n, m;
let graph = [];
let path = [];
let dist = [];
let visitedPath = "";
let pathCnt = 0;

function daijkstra(start) {
  const queue = [[start, 0]];
  dist[start] = 0;
  let index = 0;

  while (queue.length > index) {
    const [now, d] = queue[index++];

    if (dist[now] < d) continue;

    graph[now].forEach(([next, nextCost]) => {
      const cost = d + nextCost;
      if (dist[next] > cost) {
        dist[next] = cost;
        queue.push([next, cost]);
        path[next] = now;
      }
    });
  }
}

function pathTracking(num) {
  if (!num) return;
  pathTracking(path[num]);
  pathCnt++;
  visitedPath += num + " ";
  return num;
}

rl.on("line", function (line) {
  if (!n) {
    n = +line;
    graph = Array.from({ length: n + 1 }, () => []);
    dist = Array.from({ length: n + 1 }, () => Infinity);
  } else if (m === undefined) {
    m = +line;
  } else if (m !== 0) {
    const [a, b, c] = line.split(" ").map((n) => +n);
    graph[a].push([b, c]);
    m--;
  } else {
    const [start, end] = line.split(" ").map((n) => +n);

    daijkstra(start);

    pathTracking(end);
    result = [dist[end], pathCnt, visitedPath];
    console.log(result.join("\n"));
    rl.close();
  }
});
