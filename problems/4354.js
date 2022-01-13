const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function (line) {
  if(line === '.') process.exit();
  
  let j = 0;
  let len = line.length;
  let pi = Array.from({ length: len }, () => 0);
  for(let i = 1; i < len; i++) {
    while(j > 0 && line[i] !== line[j]) {
      j = pi[j - 1];
    }  
    if(line[i] === line[j]) pi[i] = ++j;
  }
  
  console.log(len % (len - pi[len - 1]) ? 1 : len / (len - pi[len - 1]));
})