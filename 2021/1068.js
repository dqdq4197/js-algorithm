const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N, rmNode;
let input;
let result = 0;

rl.on('line', function (line) {
  if(!N) {
    N = +line;
  } else if(!input) {
    input = line.split(' ').map(n => +n);
  } else {
    rmNode = +line;
    rl.close();
  }
})

.on('close', function () {
  let nodes = Array.from({ length: N }, () => []);
  let bools = Array.from({ length: N }, () => true);
  bools[rmNode] = false;

  for(let i = 0; i < input.length; i++) {
    const pNode = input[i];

    if(pNode === -1 || i === rmNode) continue;
    nodes[pNode].push(i);
  }
  
  let queue = [rmNode];

  while(queue.length) {
    let node = queue.pop();

    nodes[node].forEach(n => {
      if(bools[n]) {
        bools[n] = false;
        queue.push(n);
      }
    })
  }

  nodes.map((arr, i) => {
    if(arr.length !== 0) {
      bools[i] = false;
    }
  })

  console.log(bools.filter(bool => bool === true).length);
  process.exit();
});