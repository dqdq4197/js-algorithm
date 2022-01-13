const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
let visit = new Set();

function bfs() {
  let queue = [input];
  visit.add(input.sort((a, b) => a - b).join(' '));
  if(input[0] === input[1] && input[1] === input[2]) return 1;
  let qIdx = 0;

  while(qIdx < queue.length) {
    let arr = queue[qIdx++];
    
    for(let i = 0; i < 3; i++) {
      for(let j = i + 1; j < 3; j++) {
        let min = Math.min(arr[i], arr[j]);
        let max = Math.max(arr[i], arr[j]);
        let nMin = min * 2;
        let nMax = max - min;
        let idx = 3 - i - j;
        let q = [nMin, nMax, arr[idx]];
        let joinNum = q.slice().sort((a, b) => a - b).join(' ');

        if(nMin === nMax && nMax === arr[idx]) return 1;
        
        if(!visit.has(joinNum)) {
          queue.push(q);
          visit.add(joinNum);
        }
      }
    }
  }
  
  return 0;
}

rl.on('line', function (line) {
  input = line.split(' ').map(n => +n);
  console.log(bfs());
  rl.close();
})