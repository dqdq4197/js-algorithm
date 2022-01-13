const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N, M;
let inDegree = [];
let graph = [];
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
    [N, M] = line.split(' ').map(n => +n);
    graph = Array.from({ length: N + 1 }, () => []);
    inDegree = Array.from({ length: N + 1 }, () => 0);
  } else {
    M--;
    let [A, B] = line.split(' ').map(n => +n);
    graph[A].push(B);
    inDegree[B]++;
    if(M === 0) rl.close();
  }
})

.on('close', function () {
  let result = [];
  for(let i = 1; i <= N; i++) {
    if(inDegree[i] === 0) {
      enqueue(i);
      inDegree[i] = -1;
    }
  }
  
  while(queue.length > 1) {
    let num = dequeue();
    result.push(num);

    graph[num].forEach(n => {
      inDegree[n]--;
      if(inDegree[n] === 0) {
        enqueue(n);
        inDegree[n] = -1;
      }
    })
  }

  console.log(result.join(' '));
  process.exit();
});