const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let input = [];
let parents = [];
function getParent(num) {
  if (parents[num] === num) return num;
  return (parents[num] = getParent(parents[num]));
}

function unionParent(a, b) {
  const aParent = getParent(a);
  const bParent = getParent(b);
  if (aParent > bParent) parents[aParent] = bParent;
  else parents[bParent] = aParent;
}

function findParent(a, b) {
  const aParent = getParent(a);
  const bParent = getParent(b);

  if (aParent === bParent) return true;
  else return false;
}

function kruskal() {
  let sum = 0;
  let cnt = 0;

  for (let i = 0; i < M; i++) {
    const [a, b, cost] = input[i];
    if (!findParent(a, b)) {
      sum += cost;
      unionParent(a, b);
      cnt += 1;
    }
    if (cnt === N - 2) break;
  }

  return sum;
}

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map((n) => +n);
    parents = Array.from({ length: N + 1 }, (_, i) => i);
  } else {
    input.push(line.split(" ").map((n) => +n));

    if (input.length === M) {
      input.sort((a, b) => a[2] - b[2]);
      const result = kruskal();
      console.log(result);
      rl.close();
    }
  }
});
