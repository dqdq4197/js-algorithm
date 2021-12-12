const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
//LIS 문제 
let N;
rl.on('line', function (line) {
  if(!N) {
    N = +line;
  } else {
    arr = line.split(' ').map(n => +n).reverse();
    let DP = Array.from({ length: N }, () => 1);

    for(let i = 1; i < N; i++) {
      for(let j = 0; j < i; j++) {
        if(arr[j] < arr[i]) {
          DP[i] = Math.max(DP[i], DP[j] +  1);
        }
      }
    }
    console.log(N - Math.max(...DP));
    rl.close();
  }
})