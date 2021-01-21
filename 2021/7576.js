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
  //입력 받기
  let [M, N] = input.shift().split(' ');
  let graph = [];
  let queue = [];
  for(let i = 0; i < N; i++) {
    graph.push(input[i].split(' ').map(v => Number(v)));
    let j = graph[i].indexOf(1);
    if(j !== -1 )
      queue.push(i,j);
  }  
  let dx = [1, -1, 0, 0];
  let dy = [0, 0, 1, -1];
  let answer = -1;
  
  function bfs(q) {
    let newQ = [];
    while(q.length / 2) {
      let y = q.pop();
      let x = q.pop();
      graph[x][y] = 1;
      for(let i = 0; i < 4; i ++) {
        let nx = x + dx[i];
        let ny = y + dy[i];
        if(nx >= 0 && nx < N && ny >= 0 && ny < M) {
          if(graph[nx][ny] === 0) {
            newQ.push(nx, ny);
          }
        }
      }
    }

    answer ++;
    if(newQ.length) {
      bfs(newQ)
    }
  }
  bfs(queue)
  for(let i = 0; i < N; i++) {
    for(let j = 0; j < M; j++) {
      if(graph[i][j] === 0) {
        answer = -1;
        break;
      }
    }
  }
  console.log(answer)

  process.exit();
});