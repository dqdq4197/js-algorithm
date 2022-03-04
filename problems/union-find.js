/**
 * 합집합 찾기 알고리즘 => 응용: 크루스칼
 * 초기 값으로 자기 자신을 부모로 설정
 * 두 개의 노드중 더 작은 노드가 부모로 설정하는것이 원칙.
 */
const edges = [
  [1, 2],
  [1, 3],
  [2, 3],
  [2, 4],
  [3, 4],
  [3, 5],
  [4, 5],
  [4, 6],
  [5, 6],
  [8, 7],
];
const nodeCnt = 8;
let parents = Array.from({ length: nodeCnt + 1 }, (_, i) => i);

function getParent(num) {
  if (parents[num] === num) return num;
  return (parents[num] = getParent(parents[num]));
}

function unionParent(a, b) {
  const aParent = getParent(a);
  const bParent = getParent(b);
  if (aParent > bParent) parents[aParent] = bParent;
  else parents[bParent] = aParent;
}

function findParent(a, b) {
  const aParent = getParent(a);
  const bParent = getParent(b);

  if (aParent === bParent) return true;
  else return false;
}

for (let i = 0; i < edges.length; i++) {
  const [a, b] = edges[i];
  if (findParent(a, b)) console.log(a, b);
  if (!findParent(a, b)) {
    unionParent(a, b);
  }
}

console.log(parents);
console.log(`1과 4가 연결되어있나요? ${findParent(1, 4) ? "네" : "아니요"}`);
console.log(`1과 7이 연결되어있나요? ${findParent(1, 7) ? "네" : "아니요"}`);
console.log(`1과 8이 연결되어있나요? ${findParent(1, 8) ? "네" : "아니요"}`);
console.log(`7과 8이 연결되어있나요? ${findParent(7, 8) ? "네" : "아니요"}`);
unionParent(1, 8);
console.log(`1과 7이 연결되어있나요? ${findParent(1, 7) ? "네" : "아니요"}`);
console.log(`1과 8이 연결되어있나요? ${findParent(1, 8) ? "네" : "아니요"}`);
