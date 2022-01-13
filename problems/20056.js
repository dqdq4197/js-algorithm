const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let input = [];
let board = {};
let N, M, K;
let dx = [0, 1, 1, 1, 0, -1, -1, -1];
let dy = [-1, -1, 0, 1, 1, 1, 0, -1];

function eachMove(r, c, fireBall) {
  let key = r + '' + c;
  if(!board[key]) {
    board[key] = [fireBall];
  } else {
    board[key].push(fireBall);
  }
}

function allMove() {
  let newBoard = JSON.parse(JSON.stringify(board));
  
  for(let key in newBoard) {
    let [row, col] = key.split('').map(n => +n);
    let fireBalls = newBoard[key];

    while(fireBalls.length) {
      let fireBall = fireBalls.shift();
      let [m, s, d] = fireBall;
      if(m === 0) continue;
      let nx = col + dx[d] * (s % N);
      let ny = row + dy[d] * (s % N);

      if(nx > N) nx -= N;
      if(ny > N) ny -= N;
      if(nx < 1) nx += N;
      if(ny < 1) ny += N;
    
      eachMove(ny, nx, fireBall);
      board[key].shift();
    }
    
    if(board[key].length === 0)
      delete board[row + '' + col];
  }
}

function devideFireBall() {
  for(let key in board) {
    let fireBalls = board[key];

    if(fireBalls.length >= 2) {
      let sumM = 0;
      let sumS = 0;
      let allOdd = true;
      let allEven = true;
      for(let i = 0; i < fireBalls.length; i++) {
        let fireBall = fireBalls[i];
        let [m, s, d] = fireBall;

        sumM += m;
        sumS += s;
        if(d % 2 === 0) {
          allOdd = false;
        } else {
          allEven = false;
        }
      }

      let newM = sumM / 5 >> 0;
      let newS = sumS / fireBalls.length >> 0;
      let newD = allOdd || allEven ? [0, 2, 4, 6] : [1, 3, 5, 7];

      if(newM === 0) {
        delete board[key];
      }  else {
        board[key] = newD.map(d => [newM, newS, d]);
      }
    }
  }
}

rl.on('line', function (line) {
  if(!N) {
    [N, M, K] = line.split(' ').map(n => +n);
  } else {
    input.push(line.split(' ').map(n => +n));
    if(input.length === M) rl.close();
  }
})

.on('close', function () {
  let i = 0;
  let result = 0;

  input.forEach(v => {
    eachMove(v[0], v[1], v.slice(2));
  })

  while(i++ < K) {
    allMove()
    devideFireBall();
  }
  
  for(let key in board) {
    let fireBalls = board[key];

    fireBalls.forEach(fireBall => {
      result += fireBall[0];
    })
  }

  console.log(result);

  process.exit();
});