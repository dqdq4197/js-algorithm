const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let input = [];
let result = 10000;

function check(mid) {
  let min = input[0];
  let max = input[0];
  let devideCnt = 1;

  for (let i = 0; i < N; i++) {
    min = Math.min(min, input[i]);
    max = Math.max(max, input[i]);

    if (max - min > mid) {
      devideCnt += 1;
      min = input[i];
      max = input[i];
    }
  }
  return devideCnt <= M;
}

function binarySearch() {
  let l = 0;
  let r = Math.max(...input);

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);

    if (check(mid)) {
      r = mid - 1;
      result = Math.min(result, mid);
    } else {
      l = mid + 1;
    }
  }
}

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map((n) => +n);
  } else {
    input = line.split(" ").map((n) => +n);
    binarySearch();
    console.log(result);
    rl.close();
  }
});
