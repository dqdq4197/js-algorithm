const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let backGraph = [];
let frontGraph = [];
let N, M, X;

function minHeap(Q) {
  this.queue = Q;

  this.size = () => this.queue.length - 1;
  this.enqueue = (q) => {
    this.queue.push(q);
    let size = this.queue.length - 1;

    while (
      size > 1 &&
      this.queue[Math.floor(size / 2)][1] > this.queue[size][1]
    ) {
      const temp = this.queue[Math.floor(size / 2)];
      this.queue[Math.floor(size / 2)] = this.queue[size];
      this.queue[size] = temp;
      size = Math.floor(size / 2);
    }
  };

  this.dequeue = () => {
    if (this.queue.length === 2) return this.queue.pop();
    const removeItem = this.queue[1];
    this.queue[1] = this.queue.pop();
    let p = 1;
    let c = 2;

    while (this.queue.length > c) {
      if (
        this.queue.length > c + 1 &&
        this.queue[c + 1][1] < this.queue[c][1]
      ) {
        c = c + 1;
      }
      if (this.queue[c][1] > this.queue[p][1]) break;
      const temp = this.queue[c];
      this.queue[c] = this.queue[p];
      this.queue[p] = temp;
      p = c;
      c *= 2;
    }

    return removeItem;
  };
}

function dijkstra(graph, start) {
  const minQ = new minHeap([null, [start, 0]]);
  const distance = Array.from({ length: N + 1 }, () => Infinity);
  distance[start] = 0;

  while (minQ.size()) {
    const [now, cost] = minQ.dequeue();

    graph[now].forEach(([next, c]) => {
      const nextCost = cost + c;
      if (distance[next] > nextCost) {
        distance[next] = nextCost;
        minQ.enqueue([next, nextCost]);
      }
    });
  }

  return distance;
}

rl.on("line", function (line) {
  if (!N) {
    [N, M, X] = line.split(" ").map((n) => +n);
    frontGraph = Array.from({ length: N + 1 }, () => []);
    backGraph = Array.from({ length: N + 1 }, () => []);
  } else {
    const [a, b, cost] = line.split(" ").map((n) => +n);

    frontGraph[a].push([b, cost]);
    backGraph[b].push([a, cost]);

    if (--M === 0) {
      const frontDist = dijkstra(frontGraph, X);
      const backDist = dijkstra(backGraph, X);

      let result = 0;
      for (let i = 1; i <= N; i++) {
        result = Math.max(result, frontDist[i] + backDist[i]);
      }
      console.log(result);
      rl.close();
    }
  }
}).on("close", function () {
  process.exit();
});
