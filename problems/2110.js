const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let input = [];

function getBuiltCnt(dist) {
  let prev = 0;
  let cnt = 0;

  for (let i = 0; i < N; i++) {
    const now = input[i];

    if (prev === 0) {
      prev = now;
      cnt += 1;
    } else if (now - prev >= dist) {
      prev = now;
      cnt += 1;
    }
  }

  return cnt;
}

function binarySearch(l, r) {
  let max = 0;

  let cnt = 4;
  while (l <= r) {
    const mid = l + Math.floor((r - l) / 2);
    const cnt = getBuiltCnt(mid);

    if (cnt >= M) {
      max = mid;
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  return max;
}

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
  } else {
    input.push(+line);

    if (input.length === N) {
      input.sort((a, b) => a - b);
      const result = binarySearch(1, input.slice(-1)[0]);
      console.log(result);
      rl.close();
    }
  }
});
