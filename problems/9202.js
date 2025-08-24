/**
 * 백준 - 트라이 / dfs
 * https://www.acmicpc.net/problem/9202
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let W, B;
let words = [];
let boards = [];
let board = [];
const dc = [0, 1, 1, 1, 0, -1, -1, -1];
const dr = [-1, -1, 0, 1, 1, 1, 0, -1];
const points = {
  1: 0,
  2: 0,
  3: 1,
  4: 1,
  5: 2,
  6: 3,
  7: 5,
  8: 11,
};

function createNode() {
  return {
    end: false,
    child: {},
  };
}

function makeWordTree() {
  const wordTree = createNode();

  for (const word of words) {
    let currentTree = wordTree;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];

      if (currentTree.child[char] === undefined) {
        currentTree.child[char] = createNode();
      }

      if (word.length - 1 === i) {
        currentTree.child[char].end = true;
      }

      currentTree = currentTree.child[char];
    }
  }

  return wordTree;
}

function searchWord(board, wordTree) {
  const searchedWords = new Set();
  const visited = Array.from({ length: 4 }, () => Array(4).fill(false));

  function dfs(r, c, currentTree, charStack) {
    if (currentTree.end) {
      searchedWords.add(charStack);
    }

    for (let i = 0; i < 8; i++) {
      const nc = c + dc[i];
      const nr = r + dr[i];

      if (nc < 0 || nr < 0 || nc >= 4 || nr >= 4) {
        continue;
      }

      if (visited[nr][nc]) {
        continue;
      }

      const char = board[nr][nc];
      if (currentTree.child[char] === undefined) {
        continue;
      }

      visited[nr][nc] = true;
      dfs(nr, nc, currentTree.child[char], charStack + char);
      visited[nr][nc] = false;
    }
  }

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const char = board[r][c];

      if (wordTree.child[char]) {
        visited[r][c] = true;
        dfs(r, c, wordTree.child[char], char);
        visited[r][c] = false;
      }
    }
  }

  return searchedWords;
}

rl.on("line", function (line) {
  if (line === "") {
    return;
  }

  if (!W) {
    W = +line;
  } else if (words.length !== W) {
    words.push(line);
  } else if (!B) {
    B = +line;
  } else {
    board.push(line.split(""));

    if (board.length === 4) {
      boards.push(board);
      board = [];

      if (boards.length === B) {
        rl.close();
      }
    }
  }
}).on("close", function () {
  const wordTree = makeWordTree();

  for (const board of boards) {
    const searchedWords = searchWord(board, wordTree);
    const searchedWordArray = Array.from(searchedWords);

    searchedWordArray.sort((a, b) => {
      if (b.length !== a.length) return b.length - a.length;
      return a.localeCompare(b);
    });

    const wordCount = searchedWords.size;
    const longestWord = searchedWordArray[0];
    const totalPoints = searchedWordArray.reduce(
      (a, b) => a + points[b.length],
      0
    );

    console.log(`${totalPoints} ${longestWord} ${wordCount}`);
  }
});
