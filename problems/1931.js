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
  times = input.map(v => v.split(' ').map(x => +x))
  times.sort((a,b) => {
    if(a[1] === b[1]) {
      return a[0] - b[0];
    } else {
      return a[1] - b[1];
    }
  });

  let idx = 0;
  let answer = 0;
  while(idx < N) {
    let temp = times[idx++][1]
    answer ++;
    while(idx < N) {
      if(times[idx][0] < temp) {
        idx++;
      } else {
        break;
      }
    }
  }
  console.log(answer)

  process.exit();
});

