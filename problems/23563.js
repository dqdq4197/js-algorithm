/**
 * 백준 - 다익스트라
 * https://www.acmicpc.net/problem/23563
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
    return this.queue[1];
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

let H, W;
let grid = [];
const dr = [1, -1, 0, 0];
const dc = [0, 0, -1, 1];

rl.on("line", function (line) {
  if (!H) {
    [H, W] = line.split(" ").map(Number);
  } else {
    grid.push(line.split(""));

    if (grid.length === H) {
      rl.close();
    }
  }
}).on("close", function () {
  const nearWall = Array.from({ length: H }, () => Array(W).fill(false));
  const costs = Array.from({ length: H }, () => Array(W).fill(Infinity));
  let start = [];
  let end = [];

  for (let r = 0; r < H; r++) {
    for (let c = 0; c < W; c++) {
      const cell = grid[r][c];

      if (cell === "S") {
        start = [r, c];
        costs[r][c] = 0;
      }

      if (cell === "E") {
        end = [r, c];
      }

      if (cell === "#") {
        continue;
      }

      for (let i = 0; i < 4; i++) {
        const nr = r + dr[i];
        const nc = c + dc[i];

        if (nr < 0 || nc < 0 || nr >= H || nc >= W) {
          continue;
        }

        const nextCell = grid[nr][nc];

        if (nextCell === "#") {
          nearWall[r][c] = true;
          break;
        }
      }
    }
  }

  const minHeap = new PriorityQueue((a, b) => a[2] - b[2]);
  minHeap.enqueue([...start, 0]);

  while (minHeap.size()) {
    const [r, c, cost] = minHeap.dequeue();

    if (r === end[0] && c === end[1]) {
      break;
    }

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];

      if (nr < 0 || nc < 0 || nr >= H || nc >= W) {
        continue;
      }

      if (grid[nr][nc] === "#") {
        continue;
      }

      const nextCost = nearWall[r][c] && nearWall[nr][nc] ? cost : cost + 1;

      if (costs[nr][nc] <= nextCost) {
        continue;
      }

      costs[nr][nc] = nextCost;
      minHeap.enqueue([nr, nc, nextCost]);
    }
  }

  const [endR, endC] = end;
  console.log(costs[endR][endC]);
});
