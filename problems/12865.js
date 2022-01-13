const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N, K;
let input = [[]];

rl.on('line', function (line) {
  if(!N) {
    [N, K] = line.split(' ').map(n => +n);
  } else {
    let NS = Array.from({ length: K + 1 }, () => 0);
    input.push(line.split(' ').map(n => +n));

    if(input.length === N + 1) {
      input.forEach(([w, v]) => {
        for(let j = K; j >= w; j--) {
          NS[j] = Math.max(NS[j - w] + v, NS[j]);
        }
      })
      console.log(NS[K]);
      rl.close();
    }
  }
})