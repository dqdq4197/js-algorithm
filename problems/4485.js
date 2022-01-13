const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N = null;
let T = 0;
let input = [];
let dx = [1, 0, -1, 0];
let dy = [0, 1, 0, -1];
let queue = [null];

function enqueue(q) {
  queue.push(q);
  let size = queue.length - 1;

  while(size > 1 && queue[Math.floor(size / 2)][2] > queue[size][2]) {
    let temp = queue[Math.floor(size/ 2)];
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
    if(c + 1 < queue.length && queue[c + 1][2] < queue[c][2]) {
      c = c + 1;
    }
    
    if(queue[c][2] > queue[p][2]) break;
    let temp = queue[c];
    queue[c] = queue[p];
    queue[p] = temp;
    p = c;
    c = p * 2;
  }

  return removeItem;
}

function bfs(input, N) {
  let distance = Array.from({ length: N }, () => Array(N).fill(Infinity));
  distance[0][0] = 0;
  enqueue([0, 0, input[0][0]])
  
  while(queue.length > 1) {
    let [x, y, dist] = dequeue();

    if(x === N - 1 && y === N - 1) break;

    for(let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if(nx >= 0 && ny >= 0 && nx < N && ny < N) {
        let cost = dist + input[nx][ny];
        if(cost < distance[nx][ny]) {
          distance[nx][ny] = cost;
          enqueue([nx, ny, cost]);
        }
      }
    }
  }
  
  return distance[N - 1][N - 1];
}

rl.on('line', function (line) {
  if(line === '0') {
    rl.close();
  } else if(N === null) {
    N = +line;
  } else {
    input.push(line.split(' ').map(n => +n));
    if(input.length === N) {
      console.log(`Problem ${ ++T }: ${ bfs(input, N)}`);
      queue = [null];
      input = [];
      N = null;
    }
  }
})