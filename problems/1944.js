/**
 * 백준 - bfs / 크루스칼
 * https://www.acmicpc.net/problem/1944
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let map = [];
const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

class UnionFind {
  constructor(n) {
    this.parents = Array.from({ length: n + 1 }, (_, i) => i);
  }

  find(node) {
    if (this.parents[node] === node) return node;
    else return (this.parents[node] = this.find(this.parents[node]));
  }

  union(a, b) {
    const aParent = this.find(a);
    const bParent = this.find(b);

    if (aParent === bParent) {
      return false;
    }

    if (aParent > bParent) {
      this.parents[aParent] = bParent;
    } else {
      this.parents[bParent] = aParent;
    }

    return true;
  }
}

function bfs(sx, sy) {
  const edges = [];
  const visit = Array.from({ length: N }, () => Array(N).fill(false));

  visit[sy][sx] = true;
  const queue = [[sx, sy, 0]];

  let index = 0;
  while (queue.length > index) {
    const [x, y, cost] = queue[index++];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx < 0 || ny < 0 || nx >= N || ny >= N) {
        continue;
      }

      if (visit[ny][nx] || map[ny][nx] === "1") {
        continue;
      }

      const nCost = cost + 1;

      visit[ny][nx] = true;
      queue.push([nx, ny, nCost]);

      if (typeof map[ny][nx] === "number") {
        edges.push([map[sy][sx], map[ny][nx], nCost]);
      }
    }
  }

  return edges;
}

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
  } else {
    map.push(line.split(""));

    if (map.length === N) {
      rl.close();
    }
  }
}).on("close", function () {
  let n = 0;

  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (map[y][x] === "S" || map[y][x] === "K") {
        map[y][x] = ++n;
      }
    }
  }

  const edges = [];
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (typeof map[y][x] === "number") {
        edges.push(...bfs(x, y));
      }
    }
  }

  const unionFind = new UnionFind(n);
  edges.sort((a, b) => a[2] - b[2]);

  let totalCost = 0;
  let connectedEdgeCount = 0;
  for (let i = 0; i < edges.length; i++) {
    const [a, b, cost] = edges[i];

    if (unionFind.union(a, b)) {
      totalCost += cost;
      connectedEdgeCount += 1;
    }

    if (connectedEdgeCount === n - 1) {
      break;
    }
  }

  console.log(connectedEdgeCount === n - 1 ? totalCost : -1);
});
