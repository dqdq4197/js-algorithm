/**
 * 백준 - 다익스트라
 * https://www.acmicpc.net/problem/12763
 */

class PriorityQueue {
  constructor(compare = (a, b) => a - b) {
    this.compare = compare;
    this.queue = [null];
  }

  peek() {
    return this.queue[1];
  }

  size() {
    return this.queue.length - 1;
  }

  enqueue(item) {
    this.queue.push(item);
    let size = this.queue.length - 1;

    while (
      size > 1 &&
      this.compare(this.queue[size], this.queue[Math.floor(size / 2)]) < 0
    ) {
      [this.queue[size], this.queue[Math.floor(size / 2)]] = [
        this.queue[Math.floor(size / 2)],
        this.queue[size],
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
        this.compare(this.queue[c], this.queue[c + 1]) > 0
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

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let T, M;
let L;
let visit;
let graph = [];

rl.on("line", function (line) {
  if (!N) {
    N = +line;
    graph = Array.from({ length: N + 1 }, () => []);
  } else if (!T) {
    [T, M] = line.split(" ").map(Number);
    visit = Array.from({ length: N + 1 }, () => Array(10_001).fill(Infinity));
  } else if (!L) {
    L = +line;
  } else {
    const [from, to, time, cost] = line.split(" ").map(Number);
    graph[from].push([to, time, cost]);
    graph[to].push([from, time, cost]);

    if (--L === 0) {
      rl.close();
    }
  }
}).on("close", function () {
  const minHeap = new PriorityQueue((a, b) => a[2] - b[2]);

  minHeap.enqueue([1, 0, 0]);
  visit[1][0] = 0;

  while (minHeap.size()) {
    const [start, time, cost] = minHeap.dequeue();

    if (start === N) {
      console.log(cost);
      return;
    }

    for (const [next, nTime, nCost] of graph[start]) {
      const nextTime = time + nTime;
      const nextCost = cost + nCost;

      if (nextTime > T || nextCost > M) {
        continue;
      }

      if (visit[next][nextTime] <= nextCost) {
        continue;
      }

      visit[next][nextTime] = nextCost;
      minHeap.enqueue([next, nextTime, nextCost]);
    }
  }

  console.log(-1);
});
