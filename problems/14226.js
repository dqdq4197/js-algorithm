const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let visit = [];
function bfs(S) {
  const queue = [[1, null, 0]];
  let index = 0;
  while (queue.length > index) {
    const [s, copyS, time] = queue[index++];

    if (s === S) return time;
    if (!visit[s][s]) {
      queue.push([s, s, time + 1]);
      visit[s][s] = true;
    }
    let nS = s + copyS;
    if (copyS && nS < 1001 && !visit[nS][copyS]) {
      queue.push([nS, copyS, time + 1]);
      visit[nS][copyS] = true;
    }
    nS = s - 1;
    if (s !== 1 && !visit[nS][copyS]) {
      queue.push([nS, copyS, time + 1]);
      visit[nS][copyS] = true;
    }
  }
}
rl.on("line", function (line) {
  const S = +line;
  visit = Array.from({ length: 1001 }, () => Array(1001).fill(false));
  const result = bfs(S);
  console.log(result);
  rl.close();
});
