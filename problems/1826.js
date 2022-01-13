const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
let N;
let L,P;
let queue = [0];
let result = 0;
let isDone = false;

function enqueue(num) {
  queue.push(num);
  size = queue.length - 1;

  while(size > 1 && queue[Math.floor(size / 2)] < queue[size]) {
    let temp = queue[Math.floor(size / 2)];
    queue[Math.floor(size / 2)] = queue[size];
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
    if(c + 1 < queue.length && queue[c + 1] > queue[c]) {
      c = c + 1;
    }

    if(queue[c] < queue[p]) break;
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
  } else if(input.length !== N) {
    input.push(line.split(' ').map(n => +n));
  } else {
    [L, P] = line.split(' ').map(n => +n);
    input.push([L, P]);
    rl.close();
  }
})

.on('close', function () {
  input.sort((a, b) => a[0] - b[0]);

  for(let i = 0; i < input.length; i++) {
    let [a, b] = input[i];

    if(P >= L) {
      console.log(result);
      break;
    }
    
    while(a > P) {
      let fuel = dequeue();
      if(fuel === undefined) {
        result = -1;
        isDone = true;
        break;
      } else {
        P += fuel;
        result++;
        if(P >= L) {
          isDone = true;
          break;
        }
      }
    }

    if(isDone) {
      console.log(result);
      break;
    }

    if(a <= P) {
      enqueue(b);
    }
  }
  
  process.exit();
});