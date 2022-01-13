const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let S, T;

function search(A, B) {
  let queue = [[B, false]];
  let ALen = A.length;
  let reversedA = A.split('').reverse().join('');

  while(queue.length) {
    let [str, isReversed] = queue.pop();
    
    if(str.length === ALen) {
      let temp = isReversed ? reversedA : A;
      if(str === temp) return 1;
      continue;
    }

    let front = isReversed ? str[str.length - 1] : str[0];
    let back = isReversed ? str[0] : str[str.length - 1];
    let fstStr = isReversed ? str.substring(1) : str.substring(0, str.length - 1);
    let scdStr = isReversed ? str.substring(0, str.length - 1) : str.substring(1);

    if(front === 'A' && back === 'A') {
      queue.push([fstStr, isReversed]);
    }
    if(front === 'B' && back === 'A') {
      queue.push([fstStr, isReversed]);
      queue.push([scdStr, !isReversed]);
    }
    if(front === 'B' && back === 'B') {
      queue.push([scdStr, !isReversed]);
    }
  }

  return 0;
}

rl.on('line', function (line) {
  if(!S) {
    S = line;
  } else {
    T = line;
    console.log(search(S, T));
    rl.close();
  }
})