const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, C;

rl.on("line", function (line) {
  if (!N) [N, C] = line.split(" ").map((n) => +n);
  else {
    const input = line.split(" ").map((n) => +n);
    const map = new Map();

    for (let i = 0; i < N; i++) {
      const n = input[i];

      if (map.get(n)) {
        map.set(n, map.get(n) + 1);
      } else {
        map.set(n, 1);
      }
    }
    let array = [...map].sort((a, b) => b[1] - a[1]).map((n) => n[0]);
    let result = [];

    array.forEach((n) => {
      const cnt = map.get(n);
      for (let i = 0; i < cnt; i++) {
        result.push(n);
      }
    });
    console.log(result.join(" "));
    rl.close();
  }
});
