const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let str;

rl.on("line", function (line) {
  if (!str) str = line;
  else {
    let stack = [];
    const len = line.length;

    for (let i = 0; i < str.length; i++) {
      if (str[i] === line[len - 1]) {
        let flag = true;
        for (let j = 1; j < len; j++) {
          if (stack[stack.length - j] === line[len - j - 1]) continue;
          else {
            flag = false;
            break;
          }
        }

        if (flag) {
          for (let i = 0; i < len - 1; i++) stack.pop();
        } else {
          stack.push(str[i]);
        }
      } else {
        stack.push(str[i]);
      }
    }

    if (stack.length) console.log(stack.join(""));
    else console.log("FRULA");
    rl.close();
  }
});
