function newNode(value) {
  return {
      value,
      child: {},
      end: false
  }
}

function trie(word, rootNode) {
  let currentNode = {...rootNode};
  
  for(let i = 0; i < word.length; i++) {
      let char = word[i];
      if(!currentNode.child[char]) {
          currentNode.child[char] = newNode(currentNode.value + char)
      }
          
      currentNode = currentNode.child[char];
  }
      
  currentNode.end = true;
}

function search(word, rootNode) {
  let currentNode = {...rootNode};
  let cnt = -1;
  
  for(let i = 0; i < word.length; i++) {
      let char = word[i];
      let len = Object.keys(currentNode.child[char].child).length;
      currentNode = currentNode.child[char];
      if(len < 2) {
          cnt++;
      }
      if((i !== word.length - 1 && currentNode.end) || len > 1) {
          cnt = -1;
      } 
      if(i === word.length - 1 && len >= 1) cnt = -1;
  }
  
  return cnt > 0 ? word.length - cnt : word.length; 
}

function solution(words) {
  var answer = 0;
  let rootNode = {
      value: '',
      end: false,
      child: {}
  }
  
  words.forEach(word => trie(word, rootNode));
  words.forEach(word => answer += search(word, rootNode))
  return answer;
}