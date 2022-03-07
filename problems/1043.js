const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let N, M;
let know;
let people = [];
let check = [];
function union(a, b) {
  return new Set([...a, ...b]);
}

function intersectionSize(a, b) {
  return new Set([...a].filter((n) => b.has(n))).size;
}

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map((n) => +n);
  } else if (know === undefined) {
    know = new Set(
      line
        .split(" ")
        .map((n) => +n)
        .slice(1)
    );
  } else {
    people.push(
      new Set(
        line
          .split(" ")
          .map((n) => +n)
          .slice(1)
      )
    );
    if (people.length === M) {
      let flag = true;

      while (flag) {
        flag = false;
        for (let i = 0; i < M; i++) {
          if (intersectionSize(know, people[i]) > 0 && !check[i]) {
            flag = true;
            know = union(know, people[i]);
            check[i] = true;
          }
        }
      }
      console.log(M - check.filter((bool) => !!bool).length);
      rl.close();
    }
  }
});
