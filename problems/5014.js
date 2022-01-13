const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', function (line) {
  let [F, S, G, U, D] = line.split(' ').map(n => +n);
  let history = [];
  history[S] = 0;
  
  let queue = [[S, 0]];
  let index = 0;
  while(queue.length > index) {
    let [now, cnt] = queue[index++];
    
    if(now === G) {
      break;
    }

    [now + U, now - D].forEach(next => {
      if(history[next] === undefined && next > 0 && next <= F) {
        history[next] = cnt + 1;
        queue.push([next, cnt + 1]);
      }
    })
  }

  if(history[G] === undefined) {
    console.log("use the stairs");
  } else {
    console.log(history[G]);
  }
  rl.close();
});