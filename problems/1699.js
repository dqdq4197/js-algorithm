const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on("line", (line) => {
  main(+line);
  rl.close();
}).on("close", () => process.exit());

const main = (line) => {
  const numbers = Array.from({ length: line + 1 }, () => 0);
  const DP = [0, 1];
  for (let i = 1; i < numbers.length; i++) {
    DP[i] = DP[i - 1] + 1;
    for (let j = 1; j <= Math.sqrt(i); j++) {
      DP[i] = Math.min(DP[i - j ** 2] + 1 , DP[i]);
    }
  }
  console.log(DP[numbers.length - 1]);
};