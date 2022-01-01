const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N;
let input = [];
let map = {};

rl.on('line', function (line) {
  if(!N) {
    N = +line;
  } else {
    let str = line.split('');
    input.push(str);

    for(let i = 1; i <= str.length; i++) {
      let char = str[i - 1];
      
      if(!map[char]) {
        map[char] = Math.pow(10, str.length + 1 - i)
      } else {
        map[char] += Math.pow(10, str.length + 1 - i)
      }
    }

    if(--N === 0) {
      let arr = Object.entries(map).sort((a, b) => b[1] - a[1]);
      arr = arr.map(([k, v], i) => [k, 9 - i + '']);
      const dict = Object.fromEntries(arr);

      input = input.map(str => {
        let numStr = '';
        str.forEach(char => numStr += dict[char]);
        
        return numStr;
      })

      console.log(input.reduce((a, b) => +a + +b, 0) );
      rl.close();
    }
  }
})