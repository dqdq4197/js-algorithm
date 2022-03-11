const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
input = [];
let visit = [];

function bfs(start) {
  const queue = [[start, 0]];
  visit[start] = true;
  let index = 0;
  while (queue.length > index) {
    const [now, cost] = queue[index++];

    if (now === 100) {
      console.log(cost);
      break;
    }

    for (let i = 1; i <= 6; i++) {
      let next = now + i;
      if (next > 100) break;
      if (visit[next]) continue;
      if (input[next]) next = input[next];
      visit[next] = true;
      queue.push([next, cost + 1]);
    }
  }
}

rl.on("line", function (line) {
  if (!N) {
    let [a, b] = line.split(" ").map((n) => +n);
    N = a + b;
    costs = Array.from({ length: 101 }, () => Infinity);
  } else {
    const [from, to] = line.split(" ").map((n) => +n);
    input[from] = to;

    if (--N === 0) {
      bfs(1);
      rl.close();
    }
  }
});
