const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let graph = [];
let costs = [];
let N;
let cnt = 0;
let result = 0;

rl.on('line', function (line) {
  if(!N) {
    N = +line;
    graph = Array.from({ length: N + 1 }, () => []);
    costs = Array.from({ length: N + 1 }, () => []);
  } else {
    let [a, b, c] = line.split(' ').map(n => +n);
    graph[a].push([b, c]);
    cnt++;
    if(cnt === N - 1) rl.close();
  }
})

.on('close', function () {
  for(let i = N; i > 0; i--) {
    for(let j = 0; j < graph[i].length; j++) {
      const [vertex, weight] = graph[i][j];
      
      if(costs[vertex].length === 0) {
        costs[i].push(weight)
      } else {
        costs[i].push(Math.max(...costs[vertex]) + weight);
      }
    }
    
    let max1 = 0; 
    let max2 = 0;
    for(let j = 0; j < costs[i].length; j++) {
      const cost = costs[i][j];
      if(max1 < cost) {
        if(max2 < max1) {
          max2 = max1;
        }
        max1 = cost;
        continue;
      }
      if(max2 < cost) {
        max2 = cost;
      }
    }
    
    result = Math.max(result, max1 + max2);
  }

  console.log(result);
  process.exit();
});