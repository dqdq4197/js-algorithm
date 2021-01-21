const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let input = [];

rl.on('line', function (line) {
  input.push(line);
})

.on('close', function () {
  let n = Number(input.shift());
  let m = Number(input.shift());
  let graph = Array.from({length: n + 1}, () => []);
  input = input.map(v => v.split(' ').map(x => Number(x)));
  for(let i = 0; i < m; i++) {
    graph[input[i][0]].push(input[i][1]);
    graph[input[i][1]].push(input[i][0])
  }

  let v = Array.from({length: n + 1}, () => false);
  let answer = 0;
  function dfs(cur) {
    if(!v[cur]) {
      v[cur] = true;
      if(cur !== 1) {
        answer ++;
      }
    } else {
      return ;
    }

    for(let i = 0; i < graph[cur].length; i++) {
      dfs(graph[cur][i]);
    }
  }

  dfs(1);
  console.log(answer);
  process.exit();
});
