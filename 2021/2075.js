const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N;
let cnt = 0;
let queue = [null];

function enqueue(num) {
  queue.push(num);
  let size = queue.length - 1;

  while(size > 1 && queue[Math.floor(size / 2)] > queue[size]) {
    let temp = queue[Math.floor(size / 2)];
    queue[Math.floor(size / 2)] = queue[size];
    queue[size] = temp;
    size = Math.floor(size / 2);
  }
}

function dequeue() {
  if(queue.length === 2) return queue.pop();
  let removeItem = queue[1];
  queue[1] = queue.pop();
  let p = 1;
  let c = 2;
  
  while(c < queue.length) {
    if(c + 1 < queue.length && queue[c + 1] < queue[c]) {
      c = c + 1;
    }

    if(queue[c] > queue[p]) break;
    let temp = queue[c];
    queue[c] = queue[p];
    queue[p] = temp;
    p = c;
    c = p * 2;
  }

  return removeItem;
}

rl.on('line', function (line) {
  if(!N) {
    N = +line;
  } else {
    let input = line.split(' ').map(n => +n);
    input.forEach(n => {
      enqueue(n);
      if(queue.length > N + 1) dequeue();
    });
    if(++cnt === N) {
      console.log(dequeue());
      rl.close();
    }
  }
})