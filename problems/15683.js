const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N, M;
let map = [];
let result = Infinity;
const cctvPos = [];

const dx = [
  [[1], [0], [-1], [0]],
  [
    [1, -1],
    [0, 0],
    [1, -1],
    [0, 0],
  ],
  [[1], [1], [-1], [-1]],
  [[1, -1], [1], [1, -1], [-1]],
  [
    [1, -1],
    [1, -1],
    [1, -1],
    [1, -1],
  ],
];
const dy = [
  [[0], [1], [0], [-1]],
  [
    [0, 0],
    [1, -1],
    [0, 1],
    [1, -1],
  ],
  [[-1], [1], [1], [-1]],
  [[-1], [1, -1], [1], [1, -1]],
  [
    [1, -1],
    [1, -1],
    [1, -1],
    [1, -1],
  ],
];

function search() {
  const queue = [map];

  for (let i = 0; i < cctvPos.length; i++) {
    const [cctvNum, pos] = cctvPos[i];
  }
}

rl.on("line", function (line) {
  if (!N) {
    [N, M] = line.split(" ").map((n) => +n);
  } else {
    map.push(line.split(" ").map((n) => +n));

    if (map.length === N) rl.close();
  }
}).on("close", function () {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (map[i][j] !== 6 && map[i][j] !== 0) {
        cctvPos.push([map[i][j]], [i, j]);
      }
    }
  }

  process.exit();
});
