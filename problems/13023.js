const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let graph = [];
let result = 0;

function dfs(num, cnt) {
  visit[num] = true;
  if (result) return;
  if (cnt === 4) {
    result = 1;
    return;
  }
  graph[num].forEach((n) => {
    if (!visit[n]) {
      dfs(n, cnt + 1);
    }
  });
  visit[num] = false;
}

rl.on("line", function (line) {
  if (N === undefined) {
    [N, M] = line.split(" ").map((n) => +n);
    graph = Array.from({ length: N }, () => []);
    visit = Array.from({ length: N }, () => false);
  } else {
    const [from, to] = line.split(" ").map((n) => +n);
    graph[from].push(to);
    graph[to].push(from);
    if (--M === 0) {
      for (let i = 0; i < N; i++) {
        dfs(i, 0);
        if (result) break;
      }
      console.log(result);
      rl.close();
    }
  }
});
