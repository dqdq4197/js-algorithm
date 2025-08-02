/**
 * 크루스칼 알고리즘 => union-find 알고리즘 포함
 * 모든 노드를 연결할 떄 최소비용
 * 결과는 반드시 노드의 갯수 - 1개의 간선으로 이루어진다.
 * @see union-find.js
 */
const edges = [
  [1, 2, 5],
  [1, 3, 4],
  [2, 3, 2],
  [2, 4, 7],
  [3, 4, 6],
  [3, 5, 11],
  [4, 5, 3],
  [4, 6, 8],
  [5, 6, 8],
];
const nodeCnt = 6;
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

function kruskal() {
  edges.sort((a, b) => a[2] - b[2]);
  let sum = 0;
  let cnt = 0;
  for (let i = 0; i < edges.length; i++) {
    const [a, b, cost] = edges[i];

    if (!findParent(a, b)) {
      sum += cost;
      unionParent(a, b);
      cnt += 1;
    }
    // 노드의 갯수보다 -1개로 이루어지기 때문에 종료
    if (cnt === nodeCnt - 1) return sum;
  }
}

console.log(kruskal());
