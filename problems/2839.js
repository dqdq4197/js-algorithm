const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = 0;

let answer = 0;
rl.on('line', function (line) {
    input = line;
    
    while(true) {
      if(input % 3 === 1 && input !== 2 && input % 2 !== 0) {
        input -= 1;
        answer ++;
        input /= 3;
      } else if(input % 3 === 0) {
        input /= 3;
      } else if(input % 2 === 0) {
        input /= 2;
      } else {
        input -= 1;
      }
      answer ++;
      if(input === 1) {
        break;
      }
    }
  })
  .on('close', function () {
    console.log(answer)
    process.exit();
});

  // 17 -> 16 -> 8 -> 4 -> 2 -> 1