const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let R, C;
let lake = [];
let lakeVisited = [];
let swanVisited = [];
const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];
let swanPos = [];

let lakeQueue = [];

function minHeap(Q) {
  this.queue = Q;

  this.enqueue = (arr) => {
    this.queue.push(arr);
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

function meltIce() {
  let index = 0;

  while (lakeQueue.length > index) {
    const [y, x] = lakeQueue[index++];

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && ny >= 0 && nx < C && ny < R && !lakeVisited[ny][nx]) {
        if (lake[ny][nx] === "X") {
          if (lake[y][x] === "." || lake[y][x] === "L") {
            lake[ny][nx] = 1;
          } else {
            lake[ny][nx] = lake[y][x] + 1;
          }
        }
        lakeVisited[ny][nx] = true;
        lakeQueue.push([ny, nx]);
      }
    }
  }
}

function swansMeet() {
  const minQ = new minHeap([null]);
  minQ.enqueue([...swanPos, 0]);
  const [initY, initX] = swanPos;
  swanVisited[initY][initX] = true;

  while (minQ.queue.length > 1) {
    const [y, x, days] = minQ.dequeue();

    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && ny >= 0 && nx < C && ny < R && !swanVisited[ny][nx]) {
        if (lake[ny][nx] === "L") {
          return days;
        }
        if (lake[ny][nx] === ".") {
          minQ.enqueue([ny, nx, days]);
        } else {
          minQ.enqueue([ny, nx, Math.max(days, lake[ny][nx])]);
        }
        swanVisited[ny][nx] = true;
      }
    }
  }
}

rl.on("line", function (line) {
  if (!R) {
    [R, C] = line.split(" ").map((n) => +n);
    lakeVisited = Array.from({ length: R }, () => Array(C).fill(false));
    swanVisited = Array.from({ length: R }, () => Array(C).fill(false));
  } else {
    lake.push(line.split(""));
    if (lake.length === R) rl.close();
  }
}).on("close", function () {
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (lake[i][j] === "." || lake[i][j] === "L") {
        lakeQueue.push([i, j]);
      }

      if (lake[i][j] === "L") {
        swanPos = [i, j];
      }
    }
  }

  meltIce();
  const result = swansMeet();
  console.log(result);

  process.exit();
});
