const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
let L, C;
let vowels = ['a', 'e', 'i', 'o', 'u'];

rl.on('line', function (line) {
  if(!L) {
    [L, C] = line.split(' ').map(n => +n);
  } else {
    input = line.split(' ').sort();
    rl.close();
  }
})

.on('close', function () {
  let queue = [['', 0, 0, 0]];
  while(queue.length) {
    let [code, idx, vCnt, cCnt] = queue.shift();
    if(code.length === L && vCnt >= 1 && cCnt >= 2) {
      console.log(code);
      continue;
    }
    if(code.length === L) continue;

    for(let i = idx; i < input.length; i++) {
      if(vowels.indexOf(input[i]) === -1) {
        if(C - i >= L - code.length) 
          queue.push([code + input[i], i + 1, vCnt, cCnt + 1]);
      } else {
        if(C - i >= L - code.length)
          queue.push([code + input[i], i + 1, vCnt + 1, cCnt]);
      }
    }
  }

  process.exit();
});