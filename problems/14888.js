const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
let operators = [];
let N;
let result = [-Infinity, Infinity];

function recur(idx, num) {
  if(idx === N) {
    result = [Math.max(result[0], num), Math.min(result[1], num)];
    return ;
  }

  for(let i = 0; i < 4; i++) {
    if(operators[i] === 0) continue;
    operators[i]--;

    switch(i) {
      case 0:
        recur(idx + 1, num + input[idx]);
        break;
      case 1:
        recur(idx + 1, num - input[idx]);
        break;
      case 2:
        recur(idx + 1, num * input[idx]);
        break;
      case 3:
        recur(idx + 1, num / input[idx] >> 0);
        break;
    }
    operators[i]++;
  }
}

rl.on('line', function (line) {
  if(!N) {
    N = +line;
  } else if(!input.length) {
    input = line.split(' ').map(n => +n);
  } else {
    operators = line.split(' ').map(n => +n);
    rl.close();
  }
})

.on('close', function () {
  recur(1, input[0]);
  console.log(result.join('\n'));

  process.exit();
});