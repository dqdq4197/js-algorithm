/**
 * 최소 스패닝 트리 (크루스칼 알고리즘)
 * 모든 정점들을 연결하는 부분 그래프 중에서 그 가중치 합이 최소인 트리
 *
 * 무방향 그래프에서 싸이클이 발생하지 않는 것을 원칙으로 한다.
 * 따라서 싸이클을 감지하기 위해 union-find 알고리즘이 함께 사용된다.
 * @see union-find.js
 *
 * 결과는 반드시 노드의 개수 - 1개의 간선으로 이루어진다.
 */

const N = 6;
/**
 * (1) -- 5 -- (2)
 *    \        / |
 *     4      2  |
 *       \   /   |
 *        (3)    7
 *       /   \   |
 *     11     6  |
 *    /         \|
 *  (5) -- 3 -- (4) -- 8 -- (6)
 *   └─--------- 8 ----------┘
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

class UnionFind {
  constructor(n) {
    this.parents = Array.from({ length: n + 1 }, (_, i) => i);
  }

  find(node) {
    if (this.parents[node] === node) return node;
    return (this.parents[node] = this.find(this.parents[node]));
  }

  union(a, b) {
    const aParent = this.find(a);
    const bParent = this.find(b);

    if (aParent === bParent) {
      return false;
    }

    if (aParent > bParent) {
      this.parents[aParent] = bParent;
    } else {
      this.parents[bParent] = aParent;
    }

    return true;
  }

  connected(a, b) {
    return this.find(a) === this.find(b);
  }
}

function kruskal() {
  edges.sort((a, b) => a[2] - b[2]);

  let totalCost = 0;
  let connectedEdgeCount = 0;
  const mst = [];
  const unionFind = new UnionFind(N);

  for (let i = 0; i < edges.length; i++) {
    const [a, b, cost] = edges[i];

    if (unionFind.union(a, b)) {
      totalCost += cost;
      connectedEdgeCount += 1;
      mst.push([a, b]);
    }

    if (connectedEdgeCount === N - 1) {
      break;
    }
  }

  return [totalCost, mst];
}

console.log(kruskal());
