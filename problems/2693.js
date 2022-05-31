const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let T;
let result = [];

rl.on("line", function (line) {
  if (!T) {
    T = +line;
  } else {
    const nums = line.split(" ").map(Number);
    nums.sort((a, b) => b - a);
    result.push(nums[2]);

    if (--T === 0) {
      console.log(result.join("\n"));
      rl.close();
    }
  }
}).on("close", function () {
  process.exit();
});
