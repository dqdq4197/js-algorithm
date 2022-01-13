const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let chicken = [];
let house = [];
let visit = [];
let targets = [];
let N, M;
let r = 0;
let result = Infinity;

function distance(house, chicken) {
  return Math.abs(house[0] - chicken[0]) + Math.abs(house[1] - chicken[1]);
}

function combi(cnt, idx) {
  if(cnt === M) {
    let allDist = 0; 
    for(let i = 0; i < house.length; i++) {
      let dist = Infinity;
      for(let j = 0; j < targets.length; j++) {
        dist = Math.min(dist, distance(house[i], targets[j]));
      }
      allDist += dist;
    }
    result = Math.min(result, allDist);

    return;
  }

  for(let i = idx; i < chicken.length; i++) {
    if(visit[i]) continue;
    visit[i] = true;
    targets.push(chicken[i]);
    combi(cnt + 1, i);
    visit[i] = false;
    targets.pop();
  }
}

rl.on('line', function (line) {
  if(!N) {
    [N, M] = line.split(' ').map(n => +n);
  } else {
    r++;
    let v = line.split(' ');

    for(let i = 0; i < v.length; i++) {
      if(v[i] === '1') house.push([r, i + 1]);
      if(v[i] === '2') chicken.push([r, i + 1]);
    }
    if(r === N) rl.close();
  }
})

.on('close', function () {
  visit = Array.from({ length: N }, () => false);
  combi(0, 0);
  console.log(result);
  process.exit();
});