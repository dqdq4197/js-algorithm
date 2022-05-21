const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const coins = [500, 100, 50, 10, 5, 1];
rl.on("line", function (line) {
  let N = 1000 - +line;
  let result = 0;

  for (let i = 0; i < coins.length; i++) {
    const coin = coins[i];

    if (coin <= N) {
      const cnt = Math.floor(N / coin);
      N -= cnt * coin;
      result += cnt;
    }
  }

  console.log(result);
  rl.close();
});
