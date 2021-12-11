const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let S;
let visit = [];
let result = [];

function recur(l, r) {
  let char = 'a'; 
  let idx = -1;
  for(let i = l; i < r; i++) {
    if(!visit[i] && S[i] < char) {
      char = S[i];
      idx = i;
    } 
  }

  if(idx === -1) return;
  
  result[idx] = char;
  console.log(result.join(''));
  visit[idx] = true;
  recur(idx + 1, r);
  recur(l, idx);
}

rl.on('line', function (line) {
  S = line;
  visit = Array.from({ length: S.length }, () => false);
  recur(0, S.length);
  rl.close();
})