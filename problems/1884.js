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
        c += 1;
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

let K, N, R;
let graph;
let distance;

rl.on("line", function (line) {
  if (K === undefined) {
    K = +line;
  } else if (!N) {
    N = +line;
  } else if (!R) {
    R = +line;
    graph = Array.from({ length: N + 1 }, () => []);
    distance = Array.from({ length: N + 1 }, () => Array(K + 1).fill(Infinity));
  } else {
    const [s, d, l, t] = line.split(" ").map(Number);

    graph[s].push([d, l, t]);

    if (--R === 0) {
      rl.close();
    }
  }
}).on("close", function () {
  const minHeap = new PriorityQueue((a, b) => a[1] - b[1]);

  distance[1][0] = 0;
  minHeap.enqueue([1, 0, 0]);

  while (minHeap.size()) {
    const [cur, len, dist] = minHeap.dequeue();
    for (const [next, l, t] of graph[cur]) {
      const nextDist = dist + t;
      const nextLen = len + l;

      if (nextDist > K) {
        continue;
      }

      if (distance[next][nextDist] <= nextLen) {
        continue;
      }

      distance[next][nextDist] = nextLen;
      minHeap.enqueue([next, nextLen, nextDist]);
    }
  }

  const result = Math.min(...distance[N]);
  console.log(result === Infinity ? -1 : result);
});
