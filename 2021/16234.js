const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let answer = 0;
let N = 0;
let L = 0;
let R = 0;
let graph = [];
let dx = [-1, 0 , 1, 0];
let dy = [0, -1, 0, 1];

function check(num) {
  return L <= Math.abs(num) && R >= Math.abs(num)
}

function dfs(row, col, visit) {
  if(visit[row * N + col]) {
    return ;
  } else {
    visit[row * N + col] = true;
  }
  let queue = [];
  let total = 0;
  queue.push([row, col]);
  total += graph[row][col]
  let cnt = 1;
  let visited = [[row, col]];

  while(queue.length) {
    let [r, c] = queue.pop();


    for(let i = 0; i < 4; i++) {
      let nx = r + dx[i];
      let ny = c + dy[i];
      if(0 <= nx && nx < N && 0 <= ny && ny < N && !visit[nx * N + ny]) {
        if(check(graph[r][c] - graph[nx][ny])) {
          queue.push([nx, ny]);
          visit[nx * N + ny] = true;
          total += graph[nx][ny];
          cnt++;
          visited.push([nx, ny]);
        }
      }
    }
  }

  if(cnt > 1) {
    let avg = Math.floor(total / cnt);
    return [visited, avg];
  }
}

rl.on('line', function (line) {
  if(!N) {
    [N, L, R] = line.split(' ').map(num => +num);
  } else if(graph.length < N) {
    graph.push(line.split(' ').map(num => +num));
    if(graph.length === N) {
      rl.close();
    }
  }
})

.on('close', function () {
  while(true) {
    let visit = new Array(N * N).fill(false);
    let temp = [];
    for(let i = 0; i < N; i++) {
      for(let j = 0; j < N; j++) {
        let result = dfs(i, j, visit);
        if(result) {
          temp.push(result);
        }
      }
    }

    if(temp.length) {
      answer ++;
      temp.forEach(([visited, avg]) => {
        visited.forEach(v => {
          graph[v[0]][v[1]] = avg;
        })
      })
    } else {
      break;
    }
  }
  
  console.log(answer);
  process.exit();
});