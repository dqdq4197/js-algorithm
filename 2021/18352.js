const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function dijkstra(start, graph, K) {
  let distance = new Array(N + 1).fill(-1);
  let isContain = false;
  let queue = [];
  distance[start] = 0;
  queue.push(start);

  while(queue.length) {
    let now = queue.shift();

    graph[now].forEach(v => {
      if(distance[v] === -1) {
        distance[v] = distance[now] + 1; 
        queue.push(v);
      }
    })
  }
  
  distance.forEach((dist, i) => {
    if(dist === K) {
      isContain = true;
      console.log(i);
    }
  })

  if(!isContain) 
    console.log(-1);
}

let N = 0;
let M = 0;
let K = 0;
let X = 0;
let cnt = 0;
let graph = [];

rl.on('line', function (line) {
  if(N === 0) {
    [N, M, K, X] = line.split(' ').map(n => +n);
    graph = Array.from({length: N + 1}, () => []);
  } else if(cnt !== M) {
    let [a, b] = line.split(' ').map(n => +n);
    graph[a].push(b);
    cnt++;
  }
  if(cnt === M) {
    rl.close();
  }
})

.on('close', function () {
  dijkstra(X, graph, K)

  process.exit();
});