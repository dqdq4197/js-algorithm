const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function reversedStrs(strs, start, end) {
  return strs
    .slice(start, end)
    .split(" ")
    .map((str) => str.split("").reverse().join(""))
    .join(" ");
}

rl.on("line", function (line) {
  const regex = new RegExp(/\<(.*?)\>/, "g");
  let result = "";

  let now = 0;
  let word;
  while ((word = regex.exec(line)) !== null) {
    const { index } = word;

    target = reversedStrs(line, now, index);
    result += target + word[0];
    now = index + word[0].length;
  }
  console.log(result);
  result += reversedStrs(line, now, line.length);

  rl.close();
});
