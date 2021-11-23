const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let input = [];
let N;
let result = 0;

function up(board) {
  for(let j = 0; j < N; j++) {
    let temp = 0;
    let nums = [];
    for(let k = 0; k < N; k++) {
      let num = board[k][j];
      if(num !== 0) { 
        if(temp === 0) {
          temp = num;
        } else if(temp === num) {
          nums.push(temp * 2);
          temp = 0;
        } else {
          nums.push(temp);
          temp = num;
        }
      }
      
      if(k === N - 1 && temp !== 0) {
        nums.push(temp); 
      }     
    }

    for(let k = 0; k < N; k++) {
      board[k][j] = nums[k] || 0;
    }
  }

  return board;
}

function down(board) {
  for(let j = 0; j < N; j++) {
    let temp = 0;
    let nums = [];
    for(let k = N - 1; k >= 0; k--) {
      let num = board[k][j];
      if(num !== 0) { 
        if(temp === 0) {
          temp = num;
        } else if(temp === num) {
          nums.unshift(temp * 2);
          temp = 0;
        } else {
          nums.unshift(temp);
          temp = num;
        }
      }
      
      if(k === 0 && temp !== 0) {
        nums.unshift(temp); 
      }     
    }

    let n = N - nums.length;
    while(n--) {
      nums.unshift(0);
    }
    
    for(let k = N - 1; k >= 0; k--) {
      board[k][j] = nums[k];
    }
  }

  return board;
}

function right(board) {
  for(let j = 0; j < N; j++) {
    let temp = 0;
    let nums = [];
    for(let k = N - 1; k >= 0; k--) {
      let num = board[j][k];
      if(num !== 0) { 
        if(temp === 0) {
          temp = num;
        } else if(temp === num) {
          nums.unshift(temp * 2);
          temp = 0;
        } else {
          nums.unshift(temp);
          temp = num;
        }
      }
      
      if(k === 0 && temp !== 0) {
        nums.unshift(temp); 
      }     
    }
    let n = N - nums.length;
    while(n--) {
      nums.unshift(0);
    }
    
    for(let k = N - 1; k >= 0; k--) {
      board[j][k] = nums[k];
    }
  }

  return board;
}

function left(board) {
  for(let j = 0; j < N; j++) {
    let temp = 0;
    let nums = [];
    for(let k = 0; k < N; k++) {
      let num = board[j][k];
      if(num !== 0) { 
        if(temp === 0) {
          temp = num;
        } else if(temp === num) {
          nums.push(temp * 2);
          temp = 0;
        } else {
          nums.push(temp);
          temp = num;
        }
      }
      
      if(k === N - 1 && temp !== 0) {
        nums.push(temp); 
      }     
    }
    
    let n = N - nums.length;
    while(n--) {
      nums.push(0);
    }
    for(let k = 0; k < N; k++) {
      board[j][k] = nums[k];
    }
  }

  return board;
}

function recur(board, cnt) {
  if(cnt === 5) {
    for(let i = 0; i < N; i++) {
      for(let j = 0; j < N; j++) {
        result = Math.max(board[i][j], result);
      }
    }
    return ;
  }
  for(let i = 0; i < 4; i++) {
    let copyBoard = board.slice().map(row => row.slice());
    switch(i) {
      case 0:
        // 위
        recur(up(copyBoard), cnt + 1);
        break;
      case 1:
        // 우
        recur(right(copyBoard), cnt + 1);
        break;
      case 2:
        // 아래
        recur(down(copyBoard), cnt + 1);
        break;
      case 3:
        // 좌
        recur(left(copyBoard), cnt + 1);
        break;
    }
  }
}

rl.on('line', function (line) {
  if(!N) {
    N = +line;
  } else {
    input.push(line.split(' ').map(n => +n));
    if(input.length === N) rl.close();
  }
})

.on('close', function () {
  recur(input, 0);
  console.log(result);
  process.exit();
});