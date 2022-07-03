const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N;
let A, B;
let visit = new Set();

function bfs() {
  const queue = [[0, 0, A[0], B[0]]];
  let cnt = 0;
  
  while (queue.length) {
    const [l, r, sumA, sumB] = queue.pop();
    if (sumA === sumB) {
      cnt += 1;
    }

    let key = `${l},${r + 1}`;
    if (r < B.length - 1 && !visit.has(key)) {
      visit.add(key);
      queue.push([l, r + 1, sumA + A[r + 1], sumB + B[r + 1]]);
    }
    key = `${l + 1},${r}`;
    if (l < r && !visit.has(key)) {
      visit.add(key);
      queue.push([l + 1, r, sumA - A[l], sumB - B[l]]);
    }
  }

  return cnt;
}

rl.on('line', function (line) {
  if (!N) {
    N = +line;
  } else if (!A) {
    A = line.split(' ').map(Number);
  } else if (!B) {
    B = line.split(' ').map(Number);

    rl.close();
  }
})
.on('close', function () {
  const result = bfs();
  console.log(result);
  process.exit();
});

