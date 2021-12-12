const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N, M, K, X;
let graph = [];
let distance = [];
let queue = [null];

function enqueue(q) {
  queue.push(q);
  let size = queue.length - 1;

  while(size > 1 && queue[Math.floor(size / 2)][1] > queue[size][1]) {
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
    if(c + 1 < queue.length && queue[c + 1][1] < queue[c][1]) {
      c = c + 1;
    }
    if(queue[c][1] > queue[p][1]) break;
    let temp = queue[c];
    queue[c] = queue[p];
    queue[p] = temp;
    p = c;
    c = p * 2;
  }
  return removeItem;
}

function dijkstra(start) {
  enqueue([start, 0]);
  distance[start] = 0;

  while(queue.length > 1) {
    let [now, dist] = dequeue();
    
    if(distance[now] < dist) continue;
    graph[now].forEach(n => {
      let cost = dist + 1;
      if(distance[n] > cost) {
        distance[n] = cost;
        enqueue([n, cost]);
      }
    })
  }
}

rl.on('line', function (line) {
  if(!N) {
    [N, M, K, X] = line.split(' ').map(n => +n);
    graph = Array.from({ length: N + 1 }, () => []);
    distance = Array.from({ length: N + 1 }, () => Infinity);
  } else {
    let [A, B] = line.split(' ').map(n => +n);
    graph[A].push(B);
    if(--M === 0) {
      dijkstra(X);
      let result = [];
      for(let i = 1; i <= N; i++) {
        if(distance[i] === K) {
          result.push(i);
        }
      }

      if(result.length === 0) {
        console.log(-1);
      } else {
        console.log(result.join('\n'));
      }
      rl.close();
    }
  }
})