const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let inputs = [];
let t = 0;
let cnt = 0;

function newNode(value) {
  return {
    value,
    end: false,
    child: {}
  }
}

function insert(rootNode, str) {
  let isContain = false;
  let currentNode = {
    ...rootNode
  }

  for(let i = 0; i < str.length; i++) {
    const currentChar = str[i];

    if(str.length - 1 === i && currentNode.child[currentChar]) {
      isContain = true;
    } 

    if(!currentNode.child[currentChar]) {
      currentNode.child[currentChar] = newNode(currentNode.value + currentChar);
    }

    currentNode = currentNode.child[currentChar];
  }

  currentNode.end = true;
  return isContain;
}

function trie(arr) {
  arr.sort((a, b) => b.length - a.length);
  let rootNode = {
    value: "",
    end: false,
    child: {}
  }

  for(let i = 0; i < arr.length; i++) {
    let isContain = insert(rootNode, arr[i]);

    if(isContain) {
      console.log("NO");
      return;
    }
  }
  console.log("YES")
}

rl.on('line', function (line) {
  if(!t) {
    t = +line;
  } else {
    if(!inputs[cnt]) {
      inputs[cnt] = +line;
      inputs[cnt + 1] = [];
    } else {
      if(inputs[cnt + 1].length !== inputs[cnt]) {
        inputs[cnt + 1].push(line);
      }

      if(inputs[cnt + 1].length === inputs[cnt]) cnt += 2;
    }
  
    if(t === cnt / 2) rl.close();
  }
})
.on('close', function () {
  
  for(let i = 1; i < inputs.length; i += 2) {
    trie(inputs[i]);
  }

  process.exit();
});