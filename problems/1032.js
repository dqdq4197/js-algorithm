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
  const N = input.shift();
  let answer = [];
  
  for(let i = 0; i < input[0].length; i++) {
    let idx = 0;
    let check = true;
    while(idx < N - 1) {
      if(input[idx][i] === input[idx + 1][i]) {
        idx ++;
      } else {
        check = false;
        break;
      }
    }
    answer[i] = check ? input[0][i] : '?';
  }
  
  console.log(answer.join(''))
  
  process.exit();
});

