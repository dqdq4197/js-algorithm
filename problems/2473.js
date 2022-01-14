const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N;
let input = [];
let min = 3000000000;

function solution() {
  let result = [];

  for(let i = 0; i < N - 2; i++) {
    let l = i + 1;
    let r = N - 1;

    while(l < r) {
      let total = input[i] + input[l] + input[r];

      if(min > Math.abs(total)) {
        min = Math.abs(total);
        result = [input[i], input[l], input[r]];
      }

      if(total > 0) {
        r -= 1;
      } else {
        l += 1;
      }
    }
  }

  return result;
}

rl.on('line', function (line) {
  if(!N) {
    N = +line;
  } else {
    input = line.split(' ').map(n => +n);
    input.sort((a, b) => a - b);
    
    let answer = solution()
    console.log(answer.join(' '));
    rl.close();
  }
})