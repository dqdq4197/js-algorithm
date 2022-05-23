const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let S, D;
let graph = [];
let reverseGraph = [];
let visit = [];
const INF = Infinity;

function MinHeap() {
  this.queue = [null];

  this.size = () => this.queue.length - 1;
  this.enqueue = (arr) => {
    this.queue.push(arr);
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
        c + 1 < this.queue.length &&
        this.queue[c + 1][1] < this.queue[c][1]
      ) {
        c = c + 1;
      }
      if (this.queue[p][1] < this.queue[c][1]) break;
      const temp = this.queue[p];
      this.queue[p] = this.queue[c];
      this.queue[c] = temp;
      p = c;
      c *= 2;
    }
    return removeItem;
  };
}

function dijkstra(start) {
  const distance = Array.from({ length: N }, () => INF);
  const minHeap = new MinHeap();
  minHeap.enqueue([start, 0]);
  distance[start] = 0;

  while (minHeap.size()) {
    const [now, dist] = minHeap.dequeue();

    graph[now].forEach(([n, cost]) => {
      const nDist = dist + cost;
      if (nDist < distance[n] && !visit[now][n]) {
        distance[n] = nDist;
        minHeap.enqueue([n, nDist]);
      }
    });
  }

  return distance;
}

function bfs(end, dist) {
  const queue = [end];
  let index = 0;

  while (queue.length > index) {
    const node = queue[index++];

    reverseGraph[node].forEach(([nNode, cost]) => {
      if (cost + dist[nNode] === dist[node] && !visit[nNode][node]) {
        queue.push(nNode);
        visit[nNode][node] = true;
      }
    });
  }
}

rl.on("line", function (line) {
  if (line === "0 0") {
    rl.close();
  } else if (N === undefined) {
    [N, M] = line.split(" ").map(Number);
    graph = Array.from({ length: N }, () => []);
    reverseGraph = Array.from({ length: N }, () => []);
    visit = Array.from({ length: N }, () => Array(N).fill(false));
  } else if (S === undefined) {
    [S, D] = line.split(" ").map(Number);
  } else {
    const [U, V, P] = line.split(" ").map(Number);
    graph[U].push([V, P]);
    reverseGraph[V].push([U, P]);

    if (--M === 0) {
      // solution
      const shortestDistance = dijkstra(S);
      bfs(D, shortestDistance);
      const almostShortestDistance = dijkstra(S);
      const result = almostShortestDistance[D];
      console.log(result === INF ? -1 : result);

      //초기화
      N = undefined;
      M = undefined;
      S = undefined;
      D = undefined;
    }
  }
});
