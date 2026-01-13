/**
 * 백준 - 우선순위큐
 * https://www.acmicpc.net/problem/21939
 */

class PriorityQueue {
  constructor(compare = (a, b) => a - b) {
    this.compare = compare;
    this.queue = [null];
  }

  size() {
    return this.queue.length - 1;
  }

  peek() {
    return this.queue[1];
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

let N, M;
let problems = [];
let commands = [];

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else if (problems.length !== N) {
    problems.push(line.split(" ").map(Number));
  } else if (!M) {
    M = +line;
  } else {
    const [command, ...nums] = line.split(" ");
    commands.push([command, ...nums.map(Number)]);

    if (commands.length === M) {
      rl.close();
    }
  }
}).on("close", function () {
  const result = [];
  const minHeap = new PriorityQueue((a, b) =>
    a[1] === b[1] ? a[0] - b[0] : a[1] - b[1]
  );
  const maxHeap = new PriorityQueue((a, b) =>
    a[1] === b[1] ? b[0] - a[0] : b[1] - a[1]
  );

  const problemList = new Map();

  function addProblem(problem) {
    minHeap.enqueue(problem);
    maxHeap.enqueue(problem);
    problemList.set(...problem);
  }

  for (const problem of problems) {
    addProblem(problem);
  }

  for (const [command, ...n] of commands) {
    if (command === "add") {
      addProblem(n);
    }

    if (command === "recommend") {
      if (n[0] === 1) {
        while (problemList.get(maxHeap.peek()[0]) !== maxHeap.peek()[1]) {
          maxHeap.dequeue();
        }

        result.push(maxHeap.peek()[0]);
      }

      if (n[0] === -1) {
        while (problemList.get(minHeap.peek()[0]) !== minHeap.peek()[1]) {
          minHeap.dequeue();
        }

        result.push(minHeap.peek()[0]);
      }
    }

    if (command === "solved") {
      problemList.delete(n[0]);
    }
  }

  console.log(result.join("\n"));
  process.exit();
});
