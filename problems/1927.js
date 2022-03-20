const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function minHeap(Q) {
  this.queue = Q;

  this.enqueue = (num) => {
    this.queue.push(num);
    let p = this.queue.length - 1;
    while (p > 1 && this.queue[Math.floor(p / 2)] > this.queue[p]) {
      let temp = this.queue[Math.floor(p / 2)];
      this.queue[Math.floor(p / 2)] = this.queue[p];
      this.queue[p] = temp;
      p = Math.floor(p / 2);
    }
  };

  this.dequeue = () => {
    if (this.queue.length === 1) return 0;
    if (this.queue.length === 2) return this.queue.pop();
    let removeNum = this.queue[1];
    this.queue[1] = this.queue.pop();
    let p = 1;
    let c = 2;

    while (c < this.queue.length) {
      if (c + 1 < this.queue.length && this.queue[c] > this.queue[c + 1]) {
        c = c + 1;
      }
      if (this.queue[p] < this.queue[c]) break;
      let temp = this.queue[c];
      this.queue[c] = this.queue[p];
      this.queue[p] = temp;
      p = c;
      c *= 2;
    }

    return removeNum;
  };
}

let N;
let minQ;
let result = [];

rl.on("line", function (line) {
  if (!N) {
    N = +line;
    minQ = new minHeap([null]);
  } else {
    if (+line === 0) {
      result.push(minQ.dequeue());
    } else {
      minQ.enqueue(+line);
    }
    if (--N === 0) {
      console.log(result.join("\n"));
      rl.close();
    }
  }
});
