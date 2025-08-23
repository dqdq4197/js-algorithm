/**
 * 백준 - 트라이
 * https://www.acmicpc.net/problem/2179
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let N;
let words = [];

function createNode(value, index) {
  return {
    value,
    index,
    child: {},
  };
}

rl.on("line", function (line) {
  if (!N) {
    N = +line;
  } else {
    words.push(line);

    if (words.length === N) {
      rl.close();
    }
  }
}).on("close", function () {
  const rootNode = createNode("", -1);
  let similarWord = { value: "", index: -1 };

  let index = 0;
  for (const word of words) {
    let currentNode = rootNode;
    let similarDetails = { count: 0, index: -1 };

    for (let i = 0; i < word.length; i++) {
      const char = word[i];

      if (currentNode.child[char] === undefined) {
        currentNode.child[char] = createNode(char, index);
      } else {
        similarDetails = { count: i + 1, index: currentNode.child[char].index };
      }

      currentNode = currentNode.child[char];
    }

    const { count, index: wordIndex } = similarDetails;

    index += 1;

    if (similarWord.value.length > count) {
      continue;
    }

    if (similarWord.value.length === count && wordIndex >= similarWord.index) {
      continue;
    }

    similarWord = { value: word.slice(0, count), index: wordIndex };
  }

  const similarWords = [];
  const regex = new RegExp(`^${similarWord.value}`);
  for (const word of words) {
    if (regex.test(word)) {
      similarWords.push(word);
    }

    if (similarWords.length === 2) {
      break;
    }
  }

  console.log(similarWords.join("\n"));
  process.exit();
});
