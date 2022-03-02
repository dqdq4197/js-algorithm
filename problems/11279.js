const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let queue = [null];
const result = [];

function enqueue(num) {
  queue.push(num);
  let size = queue.length - 1;

  while (size > 1 && queue[Math.floor(size / 2)] < queue[size]) {
    let temp = queue[Math.floor(size / 2)];
    queue[Math.floor(size / 2)] = queue[size];
    queue[size] = temp;
    size = Math.floor(size / 2);
  }
}

function dequeue() {
  if (queue.length === 2) return queue.pop();
  let removeItem = queue[1];
  queue[1] = queue.pop();

  let p = 1;
  let c = 2;

  while (queue.length > c) {
    if (queue.length > c + 1 && queue[c + 1] > queue[c]) {
      c = c + 1;
    }
    if (queue[c] <= queue[p]) break;

    let temp = queue[c];
    queue[c] = queue[p];
    queue[p] = temp;
    p = c;
    c = p * 2;
  }

  return removeItem;
}

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    if (line === "0") {
      if (queue.length === 1) result.push(0);
      else result.push(dequeue());
    } else {
      enqueue(+line);
    }
  }
}).on("close", function () {
  console.log(result.join("\n"));
  process.exit();
});
