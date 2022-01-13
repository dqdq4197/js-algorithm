const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N, M;
let inDegree = [];
let idx = 0;
let bGraph = [];
let fgraph = [];
let result = 0;

function backwardSearch(start, visit) {
  let queue = [start];
  let qIdx = 0;

  while(qIdx < queue.length) {
    let num = queue[qIdx++];

    bGraph[num].forEach(n => {
      if(!visit[n]) {
        visit[n] = true;
        queue.push(n);
        inDegree[start]++;
      }
    })
  }
}

function forwardSearch(start, visit) {
  let queue = [start];
  let qIdx = 0;

  while(qIdx < queue.length) {
    let num = queue[qIdx++];

    fgraph[num].forEach(n => {
      if(!visit[n]) {
        visit[n] = true;
        queue.push(n);
        inDegree[start]++;
      }
    })
  }
}

rl.on('line', function (line) {
  if(!N) {
    [N, M] = line.split(' ').map(n => +n);
    inDegree = Array.from({ length: N + 1 }, () => 0);
    bGraph = Array.from({ length: N + 1 }, () => []);
    fgraph = Array.from({ length: N + 1 }, () => []);
  } else {
    idx++;
    let [a, b] = line.split(' ').map(n => +n);
    bGraph[a].push(b);
    fgraph[b].push(a);
    if(idx === M) rl.close();
  }
})

.on('close', function () {
  for(let i = 1; i <= N; i++) {
    visit = Array.from({ length: N + 1 }, () => false);
    visit[i] = true;
    inDegree[i]++;
    backwardSearch(i, visit);
    forwardSearch(i, visit);

    if(inDegree[i] === N) result++;
  }

  console.log(result);
  process.exit();
});