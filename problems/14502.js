const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function spreadVirus(graph) {
  let queue = [];
  let sum = 0;
  for(let i = 0; i < N; i++) {
    for(let j = 0; j < M; j++) {
      if(graph[i][j] === 2) {
        queue.push([i, j]);
      }
    }
  }

  while(queue.length) {
    let [r, c] = queue.pop();

    for(let i = 0; i < 4; i++) {
      let nx = r + dx[i];
      let ny = c + dy[i];

      if(nx >= 0 && ny >=0 && nx < N && ny < M) {
        if(graph[nx][ny] === 0) {
          graph[nx][ny] = 2;
          queue.push([nx, ny]);
        }
      }
    }
  }

  for(let i = 0; i < N; i++) {
    for(let j = 0; j < M; j++) {
      if(graph[i][j] === 0) {
        sum += 1;
      }
    }
  }

  if(answer < sum) {
    answer = sum;
  }
}

let graph = []
let N = 0;
let M = 0;
let dx = [1, 0 , -1, 0];
let dy = [0, 1, 0, -1];
let answer = 0;

rl.on('line', function (line) {
  if(!N) {
    [N, M] = line.split(' ').map(num => +num);
  } else if(graph.length !== N) {
    graph.push(line.split(' ').map(num => +num));
    if(graph.length === N) rl.close()
  } 
})

.on('close', function () {
  function selectWall(start, cnt) {
    if(cnt !== 3) {
      for(let i = start; i < N * M; i++) {
        let r = Math.floor(i / M);
        let c = i % M;
        if(graph[r][c] === 0) {
          graph[r][c] = 1;
          selectWall(i, cnt + 1);
          graph[r][c] = 0;
        }
      }
    } else {
      let temp = graph.map(v => v.slice());
      spreadVirus(temp);
    }
  }

  selectWall(0, 0);
  console.log(answer);
  process.exit();
});