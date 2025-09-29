/**
 * 백준 - 다익스트라
 * https://www.acmicpc.net/problem/13424
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

function dijkstra(start) {
  const distance = Array.from({ length: N + 1 }, () => Infinity);
  const minHeap = new PriorityQueue((a, b) => a[1] - b[1]);
  distance[start] = 0;
  minHeap.enqueue([start, 0]);

  while (minHeap.size()) {
    const [n, dist] = minHeap.dequeue();

    for (const [v, c] of graph[n]) {
      if (distance[v] < dist + c) {
        continue;
      }

      distance[v] = dist + c;
      minHeap.enqueue([v, dist + c]);
    }
  }

  return distance;
}

let T;
let N, M;
let F;
let graph;
let friends;

rl.on("line", function (line) {
  if (!T) {
    T = +line;
  } else if (N === undefined) {
    [N, M] = line.split(" ").map(Number);
    graph = Array.from({ length: N + 1 }, () => []);
  } else if (M > 0) {
    const [u, v, c] = line.split(" ").map(Number);

    graph[u].push([v, c]);
    graph[v].push([u, c]);
    M--;
  } else if (F === undefined) {
    F = +line;
    friends = [];
  } else {
    friends = line.split(" ").map(Number);
    const distanceList = friends.map(dijkstra);

    let minDist = Infinity;
    let room = 0;
    for (let i = 1; i <= N; i++) {
      const min = distanceList.reduce((result, current) => {
        result += current[i];
        return result;
      }, 0);

      if (minDist > min) {
        room = i;
        minDist = min;
      }
    }

    console.log(room);
    N = M = F = undefined;

    if (--T === 0) {
      rl.close();
    }
  }
});
