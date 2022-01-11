function binarySearch(arr, num) {
  let l = 0;
  let r = arr.length - 1;
  
  while(l <= r) {
      let mid = Math.floor((l + r) / 2);
      
      if(arr[mid] >= num) {
          r = mid - 1;
      } else {
          l = mid + 1;
      }
  }
  
  return l
}

function solution(info, query) {
  let answer = [];
  let rootNode = {
      child: {}
  }
  
  info.sort((a, b) => +a.split(' ')[4] - +b.split(' ')[4]);
  
  info.forEach(v => {
      let s = v.split(' ');
      let currentNode = {...rootNode};
      
      for(let i = 0; i < s.length; i++) {
          let key = s[i];
          if(i === s.length - 1) {
              if(Array.isArray(currentNode.child)) {
                  currentNode.child = [...currentNode.child, +key];
              } else {
                  currentNode.child = [+key];
              }
              break;
          }
          
          if(!currentNode.child[key]) {
              currentNode.child[key] = { child: {} };
          } 
          
          currentNode = currentNode.child[key];
      }
  })
  
  query.forEach(q => {
      let s = q.split(' and ');
      s = [...s.slice(0, 3), ...s[3].split(' ')];
      let nodes = [{...rootNode}];
      let result = 0;
      
      for(let i = 0; i < s.length; i++) {
          let key = s[i];
          let stack = [...nodes];
          if(i === s.length - 1) {
              while(nodes.length) {
                  let node = nodes.pop();
                  
                  result += node.child.length - binarySearch(node.child, +key);
              }
              break;
          }
          nodes = [];
          while(stack.length) {
              let node = stack.pop();
              
              if(node.child[key]) {
                  nodes.push(node.child[key]);    
              }
              
              if(key === '-') {
                  for(let k in node.child) {
                      nodes.push(node.child[k]);
                  }
              }
          }
      }
      
      answer.push(result);
  })
  console.log(answer);
  return answer;
}

solution(["java backend junior pizza 150","python frontend senior chicken 210","python frontend senior chicken 150","cpp backend senior pizza 260","java backend junior chicken 80","python backend senior chicken 50"],["java and backend and junior and pizza 100","python and frontend and senior and chicken 200","cpp and - and senior and pizza 250","- and backend and senior and - 150","- and - and - and chicken 100","- and - and - and - 150"])