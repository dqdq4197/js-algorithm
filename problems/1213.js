const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const strs = new Map();

rl.on("line", function (line) {
  line.split("").forEach((s) => {
    if (strs.has(s)) {
      strs.set(s, strs.get(s) + 1);
    } else {
      strs.set(s, 1);
    }
  });

  const sortedStrs = [...strs].sort((a, b) => {
    if (a[0] > b[0]) return -1;
    if (a[0] < b[0]) return 1;
    if (a[0] === b[0]) return 0;
    else return -1;
  });

  let result = "";

  for (let i = 0; i < sortedStrs.length; i++) {
    const [s, cnt] = sortedStrs[i];

    if (cnt % 2 === 1) {
      sortedStrs[i] = [s, cnt - 1];
      result += s;
      break;
    }
  }

  for (let i = 0; i < sortedStrs.length; i++) {
    const [s, cnt] = sortedStrs[i];
    if (cnt % 2 !== 0) {
      result = "I'm Sorry Hansoo";
      break;
    } else {
      const appendS = s.repeat(cnt / 2);
      result = appendS + result + appendS;
    }
  }

  console.log(result);
  rl.close();
});
