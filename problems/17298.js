const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N;

rl.on('line', function (line) {
  if(!N) {
    N = +line;
  } else {
    let nums = line.split(' ');
    let answer = Array.from({ length: N }, () => -1);
    let stack = [];

    for(let i = 0; i < N; i++) {
      let num = +nums[i];

      while(stack.length && nums[stack[stack.length - 1]] < num) {
        answer[stack.pop()] = num; 
      }
      stack.push(i);
    }
    console.log(answer.join(' '));
    rl.close();
  }
})