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
  let [str, M, ...commands] = input;
  let front = str.split('');
  let back = [];

  for(let i = 0; i < M; i++) {
    switch(commands[i][0]) {
      case 'L':
        if(front.length) {
          back.push(front.pop());
        }
        break;
      case 'D':
        if(back.length) {
          front.push(back.pop());
        }
        break;
      case 'B':
        if(front.length) {
          front.pop();
        }
        break;
      case 'P':
        let char = commands[i][2];
        front.push(char);
        break; 
    }
  }
  
  console.log(front.join('') + back.reverse().join(''));
  process.exit();
});