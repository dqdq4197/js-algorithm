/**
 * 백준 - 다익스트라
 * https://www.acmicpc.net/problem/1800
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

let N, P, K;

rl.on("line", function (line) {
  if (!N) {
    [N, P, K] = line.split(" ").map(Number);
    graph = Array.from({ length: N + 1 }, () => []);
  } else {
    const [a, b, price] = line.split(" ").map(Number);
    graph[a].push([b, price]);
    graph[b].push([a, price]);

    if (--P === 0) {
      rl.close();
    }
  }
}).on("close", function () {
  const dist = Array.from({ length: N + 1 }, () => Array(K + 1).fill(Infinity));
  const minHeap = new PriorityQueue((a, b) => a[1] - b[1]);

  dist[1][0] = 0;
  minHeap.enqueue([1, 0, 0]);

  while (minHeap.size()) {
    const [now, totalCost, free] = minHeap.dequeue();

    for (const [next, cost] of graph[now]) {
      if (K >= free + 1 && dist[next][free + 1] > totalCost) {
        dist[next][free + 1] = totalCost;
        minHeap.enqueue([next, totalCost, free + 1]);
      }

      const nCost = totalCost === 0 ? cost : Math.max(totalCost, cost);

      if (dist[next][free] > nCost) {
        dist[next][free] = nCost;
        minHeap.enqueue([next, nCost, free]);
      }
    }
  }

  const result = Math.min(...dist[N]);
  console.log(result === Infinity ? -1 : result);
  process.exit();
});
