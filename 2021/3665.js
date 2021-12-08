const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let T;
let N = null;
let M = null;
let board = [];
let input = [];
let inDegree = [];

function solution() {
  let queue = [];
  let result = [];
  
  for(let i = 1; i <= N; i++) {
    if(inDegree[i] === 0) {
      queue.push(i);
      inDegree[i] = -1;
    }
  }

  while(queue.length) {
    let num = queue.shift();
    result.unshift(num);

    for(let i = 1; i <= N; i++) {
      if(board[i][num]) {
        inDegree[i]--;
        if(inDegree[i] === 0) {
          queue.push(i);
          inDegree[i] = -1;
        }
      }
    }
  }

  if(result.length !== N) {
    return "IMPOSSIBLE";
  }

  return result.join(' ');
}

rl.on('line', function (line) {
  if(!T) {
    T = +line;
  } else if(N === null) {
    N = +line;
  } else if(input.length === 0) {
    input = line.split(' ').map(n => +n);
    board = Array.from({ length: N + 1 }, () => Array(N + 1).fill(false));
    inDegree = Array.from({ length: N + 1 }, () => 0);
    for(let i = 0; i < N; i++) {
      for(let j = i + 1; j < N; j++) {
        board[input[i]][input[j]] = true;
        inDegree[input[i]]++;
      }
    }
  } else if(M === null) {
    if(line === '0') {
      console.log(input.join(' '));
      N = null;
      input = [];
      T--;
    } else {
      M = +line;
    }
  } else {
    M--;
    let [A, B] = line.split(' ').map(n => +n)
    let temp = board[A][B];
    board[A][B] = board[B][A];
    board[B][A] = temp;
    if(!temp) {
      inDegree[A]++;
      inDegree[B]--;
    } else {
      inDegree[B]++;
      inDegree[A]--;
    }
    if(M === 0) {
      console.log(solution());
      N = null;
      M = null;
      input = [];
      if(--T === 0) rl.close();
    }
  }
})

.on('close', function () {
  process.exit();
});

