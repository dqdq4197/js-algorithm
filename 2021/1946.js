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
  const T = +input.shift();
  let cnt = 0;
  for(let i = 0; i < T; i++) {
    let N = +input[cnt];
    let num = [];
    cnt++;
    for(let j = cnt; j < N + cnt; j++) {
      num[j - cnt] = input[j].split(' ').map(v => +v);
    }

    num.sort((a,b) => a[0] - b[0]);
    let temp = num[0][1];
    let answer = 1;
    for(let a = 1; a < N; a++) {
      if(temp > num[a][1]) {
        temp = num[a][1];
        answer ++;
      }
    }
    console.log(answer);
    cnt += N;
  }
  process.exit();
});