const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
let N;
let visit1, visit2;
let dx = [0, 1, 0, -1];
let dy = [1, 0, -1, 0];
let result = [0, 0];

function normal(x, y) {
  let queue = [[x, y]];
  
  visit1[y][x] = true;

  while(queue.length) {
    let [x, y] = queue.shift();
    
    for(let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if(nx >= 0 && ny >= 0 && nx < N && ny < N && !visit1[ny][nx]) {
        if(input[y][x] === input[ny][nx]) {
          queue.push([nx, ny]);
          visit1[ny][nx] = true;
        }
      }
    }
  }
}

function special(x, y) {
  let queue = [[x, y]];
  
  visit2[y][x] = true;

  while(queue.length) {
    let [x, y] = queue.shift();
    
    for(let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if(nx >= 0 && ny >= 0 && nx < N && ny < N && !visit2[ny][nx]) {
        if(input[y][x] === 'B') {
          if(input[ny][nx] === 'B') {
            queue.push([nx, ny]);
            visit2[ny][nx] = true;
          }
        } else {
          if(input[ny][nx] === 'R' || input[ny][nx] === 'G') {
            queue.push([nx, ny]);
            visit2[ny][nx] = true;
          }
        }
      }
    }
  }
}

rl.on('line', function (line) {
  if(!N) {
    N = +line;
  } else {
    input.push(line.split(''));
  }
  if(input.length === N) rl.close();
})

.on('close', function () {
  visit1 = Array.from({ length: N }, () => Array(N).fill(false));
  visit2 = Array.from({ length: N }, () => Array(N).fill(false));
  
  for(let i = 0; i < N; i++) {
    for(let j = 0; j < N; j++) {
      if(!visit1[i][j]) {
        result[0] += 1;
        normal(j, i);
      }

      if(!visit2[i][j]) {
        result[1] += 1;
        special(j, i);
      }
    } 
  }

  console.log(result.join(' '));
  process.exit();
});