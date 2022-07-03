const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let N, K;
let A, P;
let visit = [];
let result = 0;

function search(cnt, hp, next) {
  result = Math.max(result, cnt);

  for (let i = 0; i < N; i++) {
    if (!visit[i]) {
      const nextHP = hp - (next + A[i]);
      if (nextHP < 0) {
        continue;
      }
      visit[i] = true;
      search(cnt + P[i], nextHP, next + A[i]);
      visit[i] = false;
    }
  }
}

rl.on('line', function (line) {
  if (!N) {
    [N, K] = line.split(' ').map(Number);
    visit = Array.from({ length: N }, () => false);
  } else if (!A) {
    A = line.split(' ').map(Number);
  } else if (!P) {
    P = line.split(' ').map(Number);

    rl.close();
  }
})
.on('close', function () {
  search(0, K, 0)
  console.log(result);
  process.exit();
});

