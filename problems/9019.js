const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let T;
let input = [];
let commands = ['D', 'S', 'L', 'R'];

function search([A, B]) {
  let queue = [[A, '']];
  let visit = Array.from({ length: 10001 }, () => false);
  visit[A] = true;

  while(queue.length) {
    let [n, c] = queue.shift();

    for(let i = 0; i < commands.length; i++) {
      let newN = n;
      switch(commands[i]) {
        case 'D':
          newN = n * 2 % 10000;
          break;
        case 'S':
          newN -= 1;
          if(newN === 0) newN = 9999;
          break;
        case 'L':
          newN = newN % 1000 * 10  + Math.floor(newN / 1000);
          break;
        case 'R':
          newN = newN % 10 * 1000 + Math.floor(newN / 10);
          break;
      }

      if(newN === B) {
        return c + commands[i];
      } else if(!visit[newN]) {
        visit[newN] = true; 
        queue.push([newN, c + commands[i]]);
      }
    }
  }
}

rl.on('line', function (line) {
  if(!T) {
    T = +line;
  } else {
    input.push(line.split(' ').map(n => +n));
    if(input.length === T) rl.close();
  }
})

.on('close', function () {
  for(let i = 0; i < T; i++) {
    console.log(search(input[i]));
  }

  process.exit();
});