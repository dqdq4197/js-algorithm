const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let input = [0];
let visit = [];
let check = [];

function dfs(node, target) {
  if (!visit[node]) {
    visit[node] = true;
    return dfs(input[node], target);
  }

  if (node === target) {
    return true;
  }

  return false;
}

rl.on("line", function (line) {
  if (!N) {
    N = +line;
    check = Array.from({ length: N + 1 }, () => false);
  } else {
    input.push(+line);

    if (input.length === N + 1) {
      let result = [];
      for (let i = 1; i <= N; i++) {
        visit = Array.from({ length: N + 1 }, () => false);
        const isCycle = dfs(i, i);

        if (isCycle) {
          for (let j = 1; j <= N; j++) {
            if (visit[j]) {
              check[j] = true;
            }
          }
        }
      }

      for (let i = 1; i < check.length; i++) {
        if (check[i]) result.push(i);
      }
      result.unshift(result.length);
      console.log(result.join("\n"));
      rl.close();
    }
  }
});
