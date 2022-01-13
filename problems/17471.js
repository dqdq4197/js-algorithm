const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N
let M = 0;
let graph = [];
let inDegree = [];
let result = 1001;
let total = 0;

function check(visit) {
  let v = visit.slice();
  let queue = [];
  for(let i = 0; i < v.length; i++) {
    if(!v[i]) {
      queue.push(i);
      break;
    }
  }

  while(queue.length) {
    let now = queue.shift();

    graph[now].forEach(n => {
      if(!v[n]) {
        v[n] = true;
        queue.push(n);
      }
    })
  }
  
  return v.findIndex(b => b === false) === -1 ? true : false;
}

rl.on('line', function (line) {
  if(!N) {
    N = +line;
    graph = Array.from({ length: N + 1 }, () => []);
  } else if(inDegree.length === 0){
    inDegree = line.split(' ').map(n => +n);
    total = inDegree.reduce((a, b) => a + b);
  } else {
    M++;
    let [cnt, ...nums] = line.split(' ').map(n => +n);
    nums.forEach(num => graph[num].push(M));
    if(N === M) rl.close();
  }
})

.on('close', function() {
  for(let i = 1; i <= N; i++) {
    let visit = Array.from({ length: N + 1 }, () => false);
    visit[0] = true;
    visit[i] = true;

    function dfs(now, v) {
      if(v.filter(b => b === false).length <= 1) return;
      graph[now].forEach(n => {
        if(!v[n]) {
          v[n] = true;
          dfs(n, v);
          const isPossible = check(v);
          if(isPossible) {
            let sum = 0;
            for(let j = 1; j <= N; j++) {
              if(v[j]) sum += inDegree[j - 1];
            }
            result = Math.min(result, Math.abs(total - 2 * sum));
          }
          v[n] = false;
        }
      })
    }
    dfs(i, visit);
  }

  console.log(result === 1001 ? -1 : result);
  process.exit;
});