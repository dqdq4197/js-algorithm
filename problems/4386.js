const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let input = [];

function unionFind(N) {
  this.parents = Array.from({ length: N }, (_, i) => i);

  this.getParent = (num) => {
    if (this.parents[num] === num) return num;
    return (this.parents[num] = this.getParent(this.parents[num]));
  };

  this.unionParent = (a, b) => {
    const aParent = this.getParent(a);
    const bParent = this.getParent(b);

    if (aParent > bParent) this.parents[aParent] = bParent;
    else this.parents[bParent] = aParent;
  };

  this.find = (a, b) => {
    const aParent = this.getParent(a);
    const bParent = this.getParent(b);

    return aParent === bParent;
  };
}

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    input.push(line.split(" ").map((num) => +num));

    if (input.length === N) rl.close();
  }
}).on("close", function () {
  const uf = new unionFind(N);
  let queue = [];

  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const a = input[i];
      const b = input[j];

      const dist = +Math.sqrt((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2).toFixed(
        2
      );
      queue.push([i, j, dist]);
    }
  }

  let result = 0;
  let cnt = 0;
  let index = 0;
  queue.sort((a, b) => a[2] - b[2]);
  while (true) {
    const [a, b, dist] = queue[index++];

    if (!uf.find(a, b)) {
      result += dist;
      uf.unionParent(a, b);
      cnt += 1;
    }
    if (cnt === N - 1) break;
  }

  console.log(result);
  process.exit();
});
