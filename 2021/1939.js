const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N, M;
let graph = [];
let isLands = [];
let costs = [];
let queue = [null];

function enqueue(q) {
  queue.push(q);
  let size = queue.length - 1;

  while(size > 1 && queue[Math.floor(size / 2)][1] < queue[size][1]) {
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
    if(c + 1 < queue.length && queue[c + 1][1] > queue[c][1]) {
      c = c + 1;
    }
    if(queue[c][1] <= queue[p][1]) break;
    let temp = queue[c];
    queue[c] = queue[p];
    queue[p] = temp;
    p = c;
    c = p * 2;
  }

  return removeItem;
}

function bfs([start, end]) {
  enqueue([start, Infinity]);
  costs[start] = Infinity;

  while(queue.length) {
    let [now, cost] = dequeue();

    if(now === end) {
      console.log(cost);
      return;
    }

    graph[now].forEach(([n, c]) => {
      let minW = Math.min(cost, c);
      if(costs[n] < minW) {
        costs[n] = minW;
        enqueue([n, minW]);
      }
    })
  }
}

rl.on('line', function (line) {
  if(!N) {
    [N, M] = line.split(' ').map(n => +n);
    graph = Array.from({ length: N  + 1 }, () => []);
    costs = Array.from({ length: N + 1 }, () => -1);
  } else if(M-- > 0){
    let [A, B, C] = line.split(' ').map(n => +n);
    graph[A].push([B, C]);
    graph[B].push([A, C]);
  } else {
    isLands = line.split(' ').map(n => +n);
    bfs(isLands);
    rl.close();
  }
})