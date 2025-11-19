/**
 * 백준 - 우선순위큐
 * https://www.acmicpc.net/problem/12764
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

let N;
let times = [];

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    times.push(line.split(" ").map(Number));

    if (times.length === N) {
      rl.close();
    }
  }
}).on("close", function () {
  times.sort((a, b) => a[0] - b[0]);

  const usageCount = Array(N).fill(0);
  let maxComputerCount = 0;

  const visitor = new PriorityQueue((a, b) => a[0] - b[0]);
  const idleComputers = new PriorityQueue();

  for (let i = 0; i < N; i++) {
    const [start, end] = times[i];

    while (visitor.size() && visitor.peek()[0] <= start) {
      const [_, useIndex] = visitor.dequeue();

      idleComputers.enqueue(useIndex);
    }

    const idleComputer = idleComputers.dequeue();

    if (idleComputer === null) {
      // 빈자리 없음, 새로운 차리 추가.
      visitor.enqueue([end, maxComputerCount]);
      usageCount[maxComputerCount] += 1;
      maxComputerCount += 1;
    } else {
      visitor.enqueue([end, idleComputer]);
      usageCount[idleComputer] += 1;
    }
  }

  console.log(maxComputerCount);
  console.log(usageCount.slice(0, maxComputerCount).join(" "));
});
