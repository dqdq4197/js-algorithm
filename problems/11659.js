const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input;
let N, M;
let DP = [];
let sections = [];

rl.on("line", function (line) {
  if (!N) [N, M] = line.split(" ").map((n) => +n);
  else if (!input) input = [0, ...line.split(" ").map((n) => +n)];
  else {
    sections.push(line.split(" ").map((n) => +n));
    if (sections.length === M) {
      rl.close();
    }
  }
}).on("close", function () {
  let result = "";

  DP[0] = 0;
  for (let i = 1; i < input.length; i++) {
    DP[i] = DP[i - 1] + input[i];
  }

  for (let i = 0; i < M; i++) {
    const [start, end] = sections[i];

    result += DP[end] - DP[start - 1] + "\n";
  }
  console.log(result);
  process.exit();
});
