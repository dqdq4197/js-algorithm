const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let inputs = [];
let n = 0;
let index = 0;

function newNode(value) {
  return {
    value,
    end: false,
    child: {}
  }
}

function trie(string, rootNode) {
  let currentNode = {...rootNode};

  for(let i = 0; i < string.length; i++) {
    let currentChar = string[i];

    if(!currentNode.child[currentChar]) {
      currentNode.child[currentChar] = newNode(currentNode.value + currentChar);
    }

    currentNode = currentNode.child[currentChar];
  }

  currentNode.end = true;
}

function search(string, rootNode) {
  let currentNode = {...rootNode};
  let autoComplete = 0;
  for(let i = 0; i < string.length; i++) {
    let currentChar = string[i];
    let childLen = Object.keys(currentNode.child[currentChar].child).length;
    let isEnd = currentNode.child[currentChar].end;

    if(childLen === 1 && !isEnd) autoComplete++;

    currentNode = currentNode.child[currentChar];
  }

  return string.length - autoComplete;
}

function tryTestCase(input) {
  let cnt = 0;
  let rootNode = {
    value: "",
    end: false,
    child: {}
  };

  input.forEach(str => trie(str, rootNode));
  input.forEach(str => cnt += search(str, rootNode));
  console.log((cnt / input.length).toFixed(2));
}

rl.on('line', function (line) {
  if(!n) {
    n = +line;
    inputs[index] = [];
  } else {
    inputs[index].push(line);
    if(inputs[index].length === n) {
      n = 0;
      index++;
    }
  }
})

.on('close', function () {
  inputs.forEach(input => {
    tryTestCase(input);
  })
  process.exit();
});