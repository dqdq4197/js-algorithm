const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let path = [];

function bfs(start, end) {
  let queue = [[start, 0]];
  let index = 0;

  while(queue.length) {
    let [n, time] = queue[index++];

    if(n === end) {
      return time;
    } else {
      [n + 1, n - 1, n * 2].forEach(next => {
        if(path[next] === undefined && next >= 0 && next <= 100000) {
          path[next] = n;
          queue.push([next, time + 1]);
        }
      })
    }
  }
}

rl.on('line', function (line) {
  let [N, K] = line.split(' ').map(n => +n);
  let result = [K];
  let time = bfs(N, K);
  let prevX = path[K];
  for(let i = 0; i < time; i++) {
    result.push(prevX)
    prevX = path[prevX];
  }

  console.log(time);
  console.log(result.reverse().join(' '));
  rl.close();
})