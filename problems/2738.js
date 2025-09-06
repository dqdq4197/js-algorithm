const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
const A = [];
const B = [];

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map(Number);
  } else if (A.length !== N) {
    A.push(line.split(" ").map(Number));
  } else {
    B.push(line.split(" ").map(Number));

    if (B.length === N) {
      rl.close();
    }
  }
}).on("close", function () {
  const result = A.map((row, rowIndex) =>
    row.map((col, colIndex) => col + B[rowIndex][colIndex]).join(" ")
  ).join("\n");

  console.log(result);
  process.exit();
});
