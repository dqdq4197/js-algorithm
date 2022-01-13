const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function (line) {
  let len = line.length; 
  let max = 0;
  
  for(let i = 0; i < len; i++) {
    getPi(line.slice(i));
  }

  function getPi(str) {
    const n = str.length;
    let j = 0;
    let pi = Array.from({ length: n }, () => 0);
    for(let i = 1; i < n; i++) {
      while(j > 0 && str[i] !== str[j]) j = pi[j - 1];
      if(str[i] === str[j]) {
        pi[i] = ++j;
        max = Math.max(max, j);
      }
    }
  }
  
  console.log(max);
  rl.close();
})