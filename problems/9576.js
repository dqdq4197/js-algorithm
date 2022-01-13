const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let C;
let input = [];

rl.on('line', function (line) {
  if(!C) {
    C = +line;
  } else {
    input.push(line.split(' ').map(n => +n));
  }
})

.on('close', function () {
  
  for(let i = 0; i < input.length; i++) {
    let [N, M] = input[i];
    let visit = Array.from({ length: N + 1 }, () => false);
    let result = 0;

    let arr = input.slice(i + 1, i + 1 + M);
    arr.sort((a, b) => {
      if(a[1] === b[1]) {
        return a[0] - b[0];
      } else {
        return a[1] - b[1];
      }
    })

    arr.forEach(([a, b]) => {
      for(let j = a; j < b + 1; j++) {
        if(!visit[j] && j <= N) {
          visit[j] = true;
          result++;
          break;
        }
      }
    })

    console.log(result);
    i += M;
  }
  process.exit();
});
