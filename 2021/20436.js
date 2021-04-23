const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let L = '';
let R = '';
let input = [];
let answer = 0;
let consonants = ['q', 'w', 'e', 'r', 't', 'a', 's', 'd', 'f', 'g', 'z', 'x', 'c', 'v'];
let keyboard = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
]

rl.on('line', function (line) {
  if(L === '') {
    [L, R] = line.split(' ');
  } else if(!input.length) {
    input = line.split('');
    rl.close();
  }

})

.on('close', function () {

  function findIdx(key) {
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < keyboard[i].length; j++) {
        if(keyboard[i][j] === key) {
          return [i, j];
        }
      }
    }
  }

  for(let i = 0; i < input.length; i++) {
    let isConsonants = consonants.includes(input[i])
    let nowX = 0;
    let nowY = 0;
    
    if(isConsonants) {
      [nowX, nowY] = findIdx(L);
    } else {
      [nowX, nowY] = findIdx(R);
    }

    let [nextX, nextY] = findIdx(input[i]);
    answer += Math.abs(nowX - nextX) + Math.abs(nowY - nextY) + 1;

    if(isConsonants) {
      L = input[i];
    } else {
      R = input[i];
    }
      
  }
  console.log(answer);
  process.exit();
});