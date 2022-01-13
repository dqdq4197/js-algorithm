const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let graph = [];
let N;

rl.on('line', function (line) {
  if(!N) {
    N = +line;
    graph = Array.from({ length: N + 1 }, () => []);
  } else {
    const input = line.split(' ').map(n => +n);
    const curVertex = input[0];
    
    for(let i = 1; i < input.length; i += 2) {
      graph[curVertex].push([input[i], input[i + 1]]);
    }

    if(curVertex === N) {
      console.log(graph);
      rl.close();
    }
  }
})

.on('close', function () {

  process.exit();
});