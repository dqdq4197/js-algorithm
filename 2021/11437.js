const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N, M;
let graph = [];
let parents = [];
let depth = [];
let maxLevel = 0;

function makeParents(root, rootParent) {
  let stack = [[root, rootParent]];

  while(stack.length) {
    let [now, parent] = stack.pop();

    parents[now][0] = parent;
    depth[now] = depth[parent] + 1; 

    for(let k = 1; k <= Math.floor(Math.log2(depth[now])); k++) {
      parents[now][k] = parents[parents[now][k - 1]][k - 1];
    }

    graph[now].forEach(n => {
      if(n !== parent) {
        stack.push([n, now]);
      }
    })
  }
}

rl.on('line', function (line) {
  if(N === undefined) {
    N = +line;
    maxLevel = Math.floor(Math.log2(N));
    graph = Array.from({ length: N + 1 }, () => []);
    parents = Array.from({ length: N + 1 }, () => Array(maxLevel + 1).fill(0));  
    depth = Array.from({ length: N + 1 }, () => 0);
  } else if(--N > 0) {
    let [A, B] = line.split(' ').map(n => +n);
    graph[A].push(B);
    graph[B].push(A);
  } else if(!M) {
    M = +line;
    depth[1] = 1;
    makeParents(1, 0)
  } else {
    let result = 0;
    let [A, B] = line.split(' ').map(n => +n);
    
    if(depth[A] !== depth[B]) {
      if(depth[A] < depth[B]) {
        temp = A;
        A = B;
        B = temp;
      }
      
      for(let i = Math.floor(Math.log2(depth[A])); i >= 0; i--) {
        let ac = parents[A][i];
        if(depth[ac] >= depth[B]) {
          A = ac;
        } 
      }
    }

    if(A !== B) {
      for(let i = Math.floor(Math.log2(depth[A])); i >= 0; i--) {
        if(parents[A][i] !== parents[B][i]) {
          A = parents[A][i];
          B = parents[B][i];
        } else {
          result = parents[A][i];
        }
      }
    } else {
      result = A;
    }

    console.log(result)

    if(--M === 0) rl.close();
  }
})