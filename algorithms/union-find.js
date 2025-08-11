/**
 * 합집합 찾기 알고리즘 => 응용: 크루스칼
 * 초기 값으로 자기 자신을 부모로 설정
 * 두 개의 노드중 더 작은 노드가 부모로 설정하는것이 원칙.
 */

const N = 8;

/**
 * edges:
 *
 *     1
 *    / \
 *   2---3
 *   |  /|\
 *   | / | \
 *   4---5---6
 *
 *   7---8
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

const unionFind = new UnionFind(N);

for (let i = 0; i < edges.length; i++) {
  const [a, b] = edges[i];

  unionFind.union(a, b);
}

console.log(unionFind.parents);
console.log(
  `1과 4가 연결되어있나요? ${unionFind.connected(1, 4) ? "네" : "아니요"}`
);
console.log(
  `1과 7이 연결되어있나요? ${unionFind.connected(1, 7) ? "네" : "아니요"}`
);
console.log(
  `1과 8이 연결되어있나요? ${unionFind.connected(1, 8) ? "네" : "아니요"}`
);
console.log(
  `7과 8이 연결되어있나요? ${unionFind.connected(7, 8) ? "네" : "아니요"}`
);
unionFind.union(1, 8);
console.log("1과 8 연결 진행.");
console.log(
  `1과 7이 연결되어있나요? ${unionFind.connected(1, 7) ? "네" : "아니요"}`
);
console.log(
  `1과 8이 연결되어있나요? ${unionFind.connected(1, 8) ? "네" : "아니요"}`
);
