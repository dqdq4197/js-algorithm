const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let input = [];
let T;

rl.on('line', function (line) {
  if(!T) {
    T = +line;
  } else {
    input.push(line);
    if(input.length === T * 3) rl.close();
  }
})

.on('close', function () {
  for(let i = 0; i < T; i++) {
    let status = 0; // 1 -> 뒤집기 상태
    let front = 1;
    let back = 1;
    let p = input[i * 3];
    let n = +input[i * 3 + 1] + 2;
    let arr = input[i * 3 + 2].split(/\[|\]|\,/);
    
    for(let j = 0; j < p.length; j++) {
      if(p[j] === 'R') {
        status = status === 0 ? 1 : 0;
      } else {
        if(status === 0) {
          front++;
        } else {
          back++;
        }
      }
    }
    
    if(front + back > n) {
      console.log('error');
    } else {
      let newArr = arr.slice(front, n - back).map(n => +n);
      if(status === 1) newArr = newArr.reverse();
      console.log("[" + newArr.join(",") + "]");
    }
  }

  process.exit();
});