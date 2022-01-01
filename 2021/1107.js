const fs = require('fs');
const input = fs.readFileSync("./dev/stdin").toString().trim().split("\n")
const target = +input[0]
const N = +input[1]
let buttons = [];

if(N > 0) {
  buttons = input[2].split(' ').map(n=> +n);
}

function check(num){
  while(true){
    if(buttons.includes(num % 10)) return false;
    else num = Math.floor(num / 10)
    
    if(num==0) break;
  }

  return true;
}

let result = Math.abs(target-100);

for(let i = 0; i<=999999; i++){
  if(check(i)){
    result = Math.min(result, i.toString().length + Math.abs(target-i))
  }
}

console.log(result);