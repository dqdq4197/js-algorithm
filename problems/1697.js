const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function minHeap(q) {
  this.queue = q;

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
    if (this.queue.length === 2) return this.queue[1];
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

rl.on("line", function (line) {
  const [N, K] = line.split(" ").map((n) => +n);
  const minQ = new minHeap([null]);
  visit = [];

  minQ.enqueue([N, 0]);
  while (minQ.queue.length > 1) {
    const [n, time] = minQ.dequeue();

    if (visit[n]) continue;
    visit[n] = true;
    if (n === K) {
      console.log(time);
      break;
    }

    if (n - 1 >= 0) minQ.enqueue([n - 1, time + 1]);
    if (n !== 0 && n * 2 <= 100000) minQ.enqueue([n * 2, time + 1]);
    if (n + 1 <= 100000) minQ.enqueue([n + 1, time + 1]);
  }

  rl.close();
});
