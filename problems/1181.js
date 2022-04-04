const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let input = new Set();

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    input.add(line);
    if (--N === 0) {
      const strs = [...input];
      strs.sort((a, b) => {
        if (a.length !== b.length) {
          return a.length - b.length;
        }
        if (a < b) return -1;
        else return 1;
      });
      console.log(strs.join("\n"));
      rl.close();
    }
  }
});
