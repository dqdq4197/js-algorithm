const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let result = [];
let queue = [null];

function abs(num) {
  return Math.abs(num);
}

function enqueue(num) {
  queue.push(num);
  let size = queue.length - 1;

  while (size > 1) {
    let p = queue[Math.floor(size / 2)];
    let c = queue[size];
    if (abs(p) < abs(c)) break;
    if (abs(p) === abs(c) && p < c) break;

    let temp = queue[size];
    queue[size] = queue[Math.floor(size / 2)];
    queue[Math.floor(size / 2)] = temp;
    size = Math.floor(size / 2);
  }
}

function dequeue() {
  if (queue.length === 1) return 0;
  if (queue.length === 2) return queue.pop();
  let removeItem = queue[1];
  queue[1] = queue.pop();

  let p = 1;
  let c = 2;

  while (queue.length > c) {
    if (queue.length > c + 1) {
      if (
        abs(queue[c + 1]) < abs(queue[c]) ||
        (abs(queue[c + 1]) === abs(queue[c]) && queue[c + 1] < queue[c])
      )
        c = c + 1;
    }
    if (abs(queue[c]) > abs(queue[p])) break;
    if (abs(queue[c]) === abs(queue[p]) && queue[c] > queue[p]) break;
    let temp = queue[c];
    queue[c] = queue[p];
    queue[p] = temp;

    p = c;
    c *= 2;
  }

  return removeItem;
}

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    if (line === "0") result.push(dequeue());
    else enqueue(+line);
  }
}).on("close", function () {
  console.log(result.join("\n"));
  process.exit();
});
