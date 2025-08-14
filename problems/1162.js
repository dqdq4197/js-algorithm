/**
 * 백준 - 다익스트라
 * https://www.acmicpc.net/problem/1162
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class PriorityQueue {
  constructor(compare = (a, b) => a - b) {
    this.compare = compare;
    this.queue = [null];
  }

  size() {
    return this.queue.length - 1;
  }

  enqueue(item) {
    this.queue.push(item);
    let size = this.size();

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
    if (this.size() === 0) return null;
    if (this.size() === 1) return this.queue.pop();
    const removeItem = this.queue[1];
    this.queue[1] = this.queue.pop();
    let p = 1;
    let c = 2;

    while (this.queue.length > c) {
      if (
        this.queue.length > c + 1 &&
        this.compare(this.queue[c + 1], this.queue[c]) < 0
      ) {
        c += 1;
      }

      if (this.compare(this.queue[p], this.queue[c]) <= 0) {
        break;
      }

      [this.queue[p], this.queue[c]] = [this.queue[c], this.queue[p]];
      p = c;
      c *= 2;
    }

    return removeItem;
  }
}

let N, M, K;
let graph;
let dp;

rl.on("line", function (line) {
  if (!N) {
    [N, M, K] = line.split(" ").map(Number);
    graph = Array.from({ length: N + 1 }, () => []);
    dp = Array.from({ length: N + 1 }, () => Array(K + 1).fill(Infinity));
  } else {
    const [u, v, cost] = line.split(" ").map(Number);

    graph[u].push([v, cost]);
    graph[v].push([u, cost]);

    if (--M === 0) {
      rl.close();
    }
  }
}).on("close", function () {
  const minHeap = new PriorityQueue((a, b) => a[2] - b[2]);

  dp[1][0] = 0;
  // 출발 노드 / 포장한 횟수 / 거리
  minHeap.enqueue([1, 0, 0]);

  while (minHeap.size()) {
    const [cur, k, totalCost] = minHeap.dequeue();

    if (dp[cur][k] < totalCost) {
      continue;
    }

    for (const [next, cost] of graph[cur]) {
      const nextCost = totalCost + cost;

      if (dp[next][k] > nextCost) {
        dp[next][k] = nextCost;
        minHeap.enqueue([next, k, nextCost]);
      }

      const nextK = k + 1;

      if (nextK <= K && dp[next][nextK] > totalCost) {
        dp[next][nextK] = totalCost;
        minHeap.enqueue([next, nextK, totalCost]);
      }
    }
  }

  console.log(Math.min(...dp[N]));
  process.exit();
});
