const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function dijkstra(start, graph, end) {
  let distance = new Array(1001).fill(1000000000);
  let queue = [];
  distance[start] = 0;
  queue.push([start, 0]);

  while(queue.length) {
    let [now, dist] = queue.shift();

    if(distance[now] < dist) {
      continue;
    }

    graph[now].forEach(([city, cost]) => {
      let nextCost = dist + cost;
      if(nextCost < distance[city]) {
        distance[city] = nextCost;
        queue.push([city, nextCost]);
      }
    })
  }
  console.log(distance[end]);
}

let N = 0;
let M = 0;
let graph = [];
let start = 0;
let end = 0;
let cnt = 0;

rl.on('line', function (line) {
  if(N === 0) {
    N = +line;
  } else if(M === 0) {
    M = +line;
    graph = Array.from({length: 1001}, () => []);
  } else if(cnt !== M) {
    let [s, e, cost] = line.split(' ').map(num => +num);
    graph[s].push([e, cost]);
    cnt ++;
  } else {
    [start, end] = line.split(' ').map(num => +num);
    rl.close();
  }
})

.on('close', function () {
  dijkstra(start, graph, end)

  process.exit();
});