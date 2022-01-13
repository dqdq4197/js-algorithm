const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N;
let input = [];
let queue = [0];
let result = 0;

function enqueue(num) {
  queue.push(num);
  let size = queue.length - 1;
  while(size > 1 && queue[Math.floor(size / 2)] > queue[size]) {
    let temp = queue[Math.floor(size / 2)];
    queue[Math.floor(size /2)] = queue[size];
    queue[size] = temp;
    size = Math.floor(size / 2);
  }
}

function dequeue() {
  if(queue.length === 1) return undefined;
  if(queue.length === 2) return queue.pop();
  let removeItem = queue[1];
  queue[1] = queue.pop();
  let p = 1;
  let c = 2;

  while(c < queue.length) {
    if(c + 1 < queue.length && queue[c + 1] < queue[c]) {
      c = c + 1;
    }
    if(queue[p] < queue[c]) break;
    let temp = queue[p];
    queue[p] = queue[c];
    queue[c] = temp;
    p = c;
    c *= 2;
  }

  return removeItem;
}

rl.on('line', function (line) {
  if(!N) {
    N = +line;
  } else {
    input.push(line.split(' ').map(n => +n));
    if(input.length === N) rl.close();
  }
})

.on('close', function () {
  input.sort((a, b) => a[0] - b[0]);

  for(let i = 0 ; i < input.length; i++) {
    let [s, t] = input[i];
    let item = dequeue();
    if(item === undefined) {
      result++;
      enqueue(t);
      continue;
    }

    if(item > s) {
      enqueue(t);
      enqueue(item);
      result++;
    } else {
      enqueue(t);
    }
  }

  console.log(result);
  process.exit();
});