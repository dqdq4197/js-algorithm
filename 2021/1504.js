const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let initDist;
let graph = [];
let input = [];
let N, E;
let edge = [];
let i = 0;

function dijkstra(start) {
  let dist = initDist.slice();
  dist[start] = 0;
  let queue = [[start, 0]];

  while(queue.length) {
    let [now, distance] = queue.pop();

    if(dist[now] < distance) continue;
 
    graph[now].forEach(v => {
      let cost = distance + v[1];

      if(cost < dist[v[0]]) {
        dist[v[0]] = cost;
        queue.push([v[0], cost])
      }
    })
  }

  return dist;
}

rl.on('line', function (line) {
  if(!N) {
    [N, E] = line.split(' ').map(n => +n);
  } else {
    if(i++ !== E) {
      input.push(line.split(' ').map(n => +n));
    } else {
      edge = line.split(' ').map(n => +n);
      rl.close();
    }
  }
})

.on('close', function () {
  graph = Array.from({ length: N + 1}, () => []);

  input.forEach(v => {
    graph[v[0]].push([v[1], v[2]]);
    graph[v[1]].push([v[0], v[2]]);
  })

  initDist = Array.from({ length: N + 1 }, () => Infinity);
  let v = dijkstra(1);

  let [v1, v2] = [v[edge[0]], v[edge[1]]];

  let d = dijkstra(edge[0]);

  let [d1, r] = [d[N], d[edge[1]]];

  let d2 = dijkstra(edge[1])[N];

  let result = Math.min(v1 + d2, v2 + d1) + r;

  if(result < Infinity) {
    console.log(result);
  } else {
    console.log(-1);
  }
  process.exit();
});