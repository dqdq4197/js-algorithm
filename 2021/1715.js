// 최소 힙 // 우선순위 큐 
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N;
let queue = [0];
let result = 0;

function enqueue(num) {
  queue.push(num);
  let p = queue.length - 1;
  while(queue[Math.floor(p / 2)] > queue[p] && p > 1) {
    let temp = queue[Math.floor(p / 2)];
    queue[Math.floor(p / 2)] = queue[p];
    queue[p] = temp; 
    p = Math.floor(p / 2);
  }
}

function dequeue() {
  if(queue.length === 2) return queue.pop(); 
  let removeNum = queue[1];
  queue[1] = queue.pop();
  let p = 1;
  let c = 2;
  
  while(c < queue.length) {
    if(c + 1 < queue.length && queue[c] > queue[c + 1]) {
      c = c + 1;
    }
    if(queue[p] < queue[c]) break;
    let temp = queue[c];
    queue[c] = queue[p];
    queue[p] = temp;
    p = c;
    c *= 2;
  }
  
  return removeNum;
}


rl.on('line', function (line) {
  if(!N) {
    N = +line;
  } else {
    enqueue(+line);
    if(N + 1 === queue.length) rl.close();
  }
})

.on('close', function () {
  for(let i = 1; i < N; i++) {
    let num1 = dequeue();
    let num2 = dequeue();
    let sum = num1 + num2;

    result += sum;
    enqueue(sum);
  }

  console.log(result);
  process.exit();
});