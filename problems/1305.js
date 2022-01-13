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
    let j = 0;
    let pi = Array.from({ length: N }, () => 0);
    for(let i = 1; i < N; i++) {
      while(j > 0 && line.charAt(i) !== line.charAt(j)) {
        j = pi[j - 1];
      }

      if(line[i] === line[j]) pi[i] = ++j;
    }

    console.log(N - pi[N - 1]);
    rl.close();
  }
})