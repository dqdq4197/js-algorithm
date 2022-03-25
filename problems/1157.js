const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (line) {
  const input = line
    .split("")
    .map((v) => v.toLowerCase())
    .join("");
  const result = new Array(26).fill(0);

  for (let i = 0; i < input.length; i++) {
    result[input.charCodeAt(i) - 97]++;
  }

  const max = Math.max(...result);
  const index = result.indexOf(max);

  let flag = false;

  for (let j = 0; j < 26; j++) {
    if (result[j] === max && index != j) {
      flag = true;
      break;
    }
  }

  console.log(flag ? "?" : String.fromCharCode(index + 65));

  rl.close();
});
