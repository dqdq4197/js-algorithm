
const INF = Infinity;
const graph = [
  [0, 3, 6, INF],
  [7, 0, 8, 4],
  [INF, INF, 0, 2],
  [INF, 9, INF, 0]
];


function floydWarshall() {
  const len = graph.length;

  for(let k = 0; k < len; k++) {
    // 노드 k번을 거쳐가는 경우 반복
    for(let i = 0; i < len; i++) {
      // 행
      for(let j = 0; j < len; j++) {
        // 열 
        // i -> j로 갈 때: i -> k (시작노드 i에서 거쳐가는 노드 k) + k -> j (거쳐가는 노드 k에서 도착 노드 j)
        graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
      }
    }
  }
}

floydWarshall(graph);
console.log(graph);