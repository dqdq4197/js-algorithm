const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const grid = [];
const visited = new Set();
const move = [-3, 1, 3, -1]; // 상, 우, 하, 조ㅏ

function MinHeap() {
  this.queue = [null];

  this.enqueue = (num) => {
    this.queue.push(num);
    let p = this.queue.length - 1;
    while (p > 1 && this.queue[Math.floor(p / 2)][2] > this.queue[p][2]) {
      let temp = this.queue[Math.floor(p / 2)];
      this.queue[Math.floor(p / 2)] = this.queue[p];
      this.queue[p] = temp;
      p = Math.floor(p / 2);
    }
  };

  this.dequeue = () => {
    if (this.queue.length === 2) return this.queue.pop();
    let removeNum = this.queue[1];
    this.queue[1] = this.queue.pop();
    let p = 1;
    let c = 2;

    while (c < this.queue.length) {
      if (
        c + 1 < this.queue.length &&
        this.queue[c][2] > this.queue[c + 1][2]
      ) {
        c = c + 1;
      }
      if (this.queue[p][2] < this.queue[c][2]) break;
      let temp = this.queue[c];
      this.queue[c] = this.queue[p];
      this.queue[p] = temp;
      p = c;
      c *= 2;
    }

    return removeNum;
  };
}

function gridToString(grid) {
  return grid.map((r) => r.join("")).join("");
}

function checkGrid(str) {
  return str === "123456780";
}

function bfs(str, index) {
  const minHeap = new MinHeap();
  minHeap.enqueue([str, index, 0]);
  visited.add(str);

  while (minHeap.queue.length > 1) {
    const [str, now, cnt] = minHeap.dequeue();
    if (checkGrid(str)) return cnt;

    for (let i = 0; i < 4; i++) {
      const nIndex = now + move[i];
      if ((now % 3 === 0 && i === 3) || ((now + 1) % 3 === 0 && i === 1))
        continue;
      if (nIndex < 0 || nIndex > 8) continue;
      let nStr = str.split("");
      nStr[now] = nStr[nIndex];
      nStr[nIndex] = 0;
      nStr = nStr.join("");
      if (visited.has(nStr)) continue;
      visited.add(nStr);
      minHeap.enqueue([nStr, nIndex, cnt + 1]);
    }
  }
  return -1;
}

rl.on("line", function (line) {
  grid.push(line.split(" ").map(Number));

  if (grid.length === 3) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i][j] === 0) {
          const result = bfs(gridToString(grid), 3 * i + j);
          console.log(result);
          break;
        }
      }
    }

    rl.close();
  }
});
