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
  const N = +input.shift();
  let num = [];
  for(let i = 0; i < N; i++) {
    num[i] = +input[i]
  }

  let temp = [];
  let answer = '';
  let i = 1;
  let idx = 0;

  while(i <= N) {
    temp.push(i)
    answer += '+\n'
    while(idx < N && temp[temp.length - 1] === num[idx]) {
      temp.pop()
      answer += '-\n'
      idx ++;
    }
    i++;
  }

  if(temp.length === 0) {
    console.log(answer)
  } else {
    console.log('NO');
  }
  process.exit();
});