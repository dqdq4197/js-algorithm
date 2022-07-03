const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let table = [];
let startNum = 0;

function getCount(table) {
  let cnt = 0;

  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 7; j++) {
      if (table[i][j] !== 0) {
        cnt += 1;
      }
    }
  }

  return cnt;
}
function removeBall(table) {
  let pos = [];

  // 가로 방향 그룹 제거 대상 파악하기.
  for (let i = 6; i >= 0; i--) {
    let temp = [];
    for (let j = 0; j < 7; j++) {
      if (table[i][j] !== 0) {
        temp.push([i, j, table[i][j]]);
      } 
      if (table[i][j] === 0 || j === 6) {
        const x = temp.length;
        temp.forEach(n => {
          if (n[2] === x) {
            pos.push([n[0], n[1]]);
          }
        })
        temp = [];
      }
    }
  }

  // 세로 방향 그룹 제거 대상 파악하기.
  for (let i = 0; i < 7; i++) {
    let temp = [];
    for (let j = 6; j >= 0; j--) {
      if (table[j][i] !== 0) {
        temp.push([j, i, table[j][i]]);
      }

      if (table[j][i] === 0 || j === 0) {
        const x = temp.length;
        temp.forEach(n => {
          if (n[2] === x) {
            pos.push([n[0], n[1]]);
          }
        })
        temp = [];
      }
    }
  }

  // 제거 대상 제거하기 & 제거 대상 열 파악하기.
  let cols = new Set();
  pos.forEach(([row, col]) => {
    cols.add(col);
    table[row][col] = 0;
  });

  if (cols.size === 0) {
    return getCount(table);
  }

  const newTable = drop([...cols], table);
  return newTable;
}

function drop(cols, table) {
  cols.forEach(col => {
    for (let i = 5; i >= 0; i--) {
      if (table[i][col] !== 0) {
        let row = i;
        while (row < 6 && table[row + 1][col] === 0) {
          table[row + 1][col] = table[row][col];
          table[row][col] = 0;
          row += 1;
        }
      }
    }
  })

  return table;
}

rl.on('line', function (line) {
  if (table.length !== 7) {
    table.push(line.split(' ').map(Number));
  } else {
    startNum = +line;
    rl.close();
  }
})
.on('close', function () {
  let result = getCount(table) + 1;
  // 각 열에 시작 공 떨어뜨리기 
  for (let i = 0; i < 7; i++) {
    let newTable = table.map(row => row.slice()).slice();

    newTable[0][i] = startNum;
    newTable = drop([i], newTable);

    while (true) {
      newTable = removeBall(newTable);

      if (typeof newTable === 'number') {
        result = Math.min(result, newTable);
        break;
      }
    }
  }

  console.log(result);
  process.exit();
});

