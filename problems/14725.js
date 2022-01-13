const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let input = [];
let N = 0;
let rootNode = {
  depth: 0,
  end: false,
  child: {}
}

function sorted(obj) {
  return Object.keys(obj).sort().reduce(
    (newObj,key) => {
      newObj[key] = obj[key];
      return newObj;
    },
    {}
 );
}

function printNode(node) {
  let sortedNode = sorted(node);
  
  for(let key in sortedNode) {
    console.log('--'.repeat(sortedNode[key].depth - 1) + key);
    printNode(sortedNode[key].child);
  }
}

function newNode(depth) {
  return {
    depth,
    end: false,
    child: {}
  }
}

function trie(arr) {
  let currentNode = {...rootNode};

  for(let i = 0; i < arr.length; i++) {
    let currentChar = arr[i];
    if(currentNode.child[currentChar] === undefined) {
      currentNode.child[currentChar] = newNode(currentNode.depth + 1);
    }

    currentNode = currentNode.child[currentChar];
  }

  currentNode.end = true;
} 

rl.on('line', function (line) {
  if(!N) {
    N = +line;
  } else {
    let [n, ...arr] = line.split(' ');
    input.push(arr.join(' '));
  }
  if(N === input.length) {
    rl.close();
  }
})

.on('close', function () {
  input.forEach(arr => {
    trie(arr.split(' '))
  })
  printNode(rootNode.child);
  process.exit();
});