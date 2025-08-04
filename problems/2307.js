/**
 * 백준 - 다익스트라 / 역추적
 * https://www.acmicpc.net/problem/2307
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class PriorityQueue {
  constructor(compare = (a, b) => a - b) {
    this.queue = [null];
    this.compare = compare;
  }

  size() {
    return this.queue.length - 1;
  }

  peek() {
    return this.queue[1] ?? null;
  }

  enqueue(item) {
    this.queue.push(item);
    let size = this.queue.length - 1;

    while (
      size > 1 &&
      this.compare(this.queue[Math.floor(size / 2)], this.queue[size]) > 0
    ) {
      [this.queue[Math.floor(size / 2)], this.queue[size]] = [
        this.queue[size],
        this.queue[Math.floor(size / 2)],
      ];
      size = Math.floor(size / 2);
    }
  }

  dequeue() {
    if (this.queue.length === 1) return null;
    if (this.queue.length === 2) return this.queue.pop();
    const removeItem = this.queue[1];
    this.queue[1] = this.queue.pop();
    let p = 1;
    let c = 2;

    while (this.queue.length > c) {
      if (
        this.queue.length > c + 1 &&
        this.compare(this.queue[c + 1], this.queue[c]) < 0
      ) {
        c = c + 1;
      }

      if (this.compare(this.queue[p], this.queue[c]) < 0) {
        break;
      }

      [this.queue[p], this.queue[c]] = [this.queue[c], this.queue[p]];
      p = c;
      c *= 2;
    }

    return removeItem;
  }
}

function getMinDistance(ignoreEdge = []) {
  const path = Array.from({ length: N + 1 }, () => []);
  const dist = Array(N + 1).fill(Infinity);
  const minHeap = new PriorityQueue((a, b) => a[1] - b[1]);

  dist[1] = 0;
  minHeap.enqueue([1, 0]);

  while (minHeap.size()) {
    const [now, totalCost] = minHeap.dequeue();

    if (dist[now] < totalCost) {
      continue;
    }

    for (const [next, cost] of graph[now]) {
      const [u, v] = ignoreEdge;

      if ((now === u && next === v) || (now === v && next === u)) {
        continue;
      }

      const nCost = totalCost + cost;

      if (dist[next] > nCost) {
        dist[next] = nCost;
        path[next] = [now];
        minHeap.enqueue([next, nCost]);
      } else if (dist[next] === nCost) {
        path[next].push(now);
      }
    }
  }

  return [dist[N], path];
}

let N, M;
let graph;

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
    graph = Array.from({ length: N + 1 }, () => []);
  } else {
    const [u, v, cost] = line.split(" ").map(Number);
    graph[u].push([v, cost]);
    graph[v].push([u, cost]);

    if (--M === 0) {
      rl.close();
    }
  }
}).on("close", function () {
  const [originDist, path] = getMinDistance();

  if (originDist === Infinity) {
    console.log(-1);
    return;
  }
  let maxDist = originDist;

  function trace(v) {
    for (const u of path[v]) {
      const [dist] = getMinDistance([u, v]);

      maxDist = Math.max(maxDist, dist);

      if (maxDist === Infinity) {
        console.log(-1);
        process.exit();
      }

      trace(u);
    }
  }

  trace(N);

  console.log(maxDist - originDist);
});
