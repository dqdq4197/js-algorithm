const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let M = 0;
let graph = [];
let inDegree = [];
let total = 0;
let visit = [];

function check() {
  const cp_visit = [...visit];
  console.log(cp_visit);
  const queue = [];
  for (let i = 1; i <= N; i++) {
    if (!cp_visit[i]) {
      queue.push(i);
      cp_visit[i] = true;
      break;
    }
  }

  let index = 0;
  while (queue.length > index) {
    const now = queue[index++];

    graph[now].forEach((next) => {
      if (!cp_visit[next]) {
        queue.push(next);
        cp_visit[next] = true;
      }
    });
  }
  // console.log(cp_visit);

  return cp_visit.slice(1).indexOf(false) === -1;
}

function dfs(start, cnt) {
  // console.log("cc", cnt);
  if (!check()) return;
  else {
    console.log(cnt);
  }

  graph[start].forEach((next) => {
    if (!visit[next]) {
      visit[next] = true;
      dfs(next, cnt + inDegree[next]);
      visit[next] = false;
    }
  });
}

rl.on("line", function (line) {
  if (!N) {
    N = +line;
    graph = Array.from({ length: N + 1 }, () => []);
  } else if (inDegree.length === 0) {
    inDegree = [0, ...line.split(" ").map((n) => +n)];
    total = inDegree.reduce((a, b) => a + b);
  } else {
    M++;
    let [_, ...nums] = line.split(" ").map((n) => +n);
    nums.forEach((num) => graph[num].push(M));
    if (N === M) rl.close();
  }
}).on("close", function () {
  for (let i = 4; i <= 4; i++) {
    visit = Array.from({ length: N + 1 }, () => false);
    visit[i] = true;
    dfs(i, inDegree[i]);
  }
  console.log(graph);
  process.exit;
});
