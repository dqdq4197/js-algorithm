let V = 5; // 정점 개수
let E = 8; // 간선의 개수
let K = 5; // 시작 정점의 번호

//5에서 1로 가는 dis = 1
let arr = [
    [1,2,2], [1,4,1], [1,3,5], 
    [2,3,3], [2,4,2], [3,2,3],
    [3,6,5], [4,3,3], [4,5,1], 
    [5,6,2], [5,3,1]
  ];
// let arr = [
//   [1,3,6],[1,4,3],[2,1,3],[3,4,2],[4,3,1],[4,2,1],[5,2,4],[5,4,2]
// ]
let inf = 9999999999;
d = new Array(V).fill(inf);
d[K - 1] = 0
let v = new Array(V).fill(false);

function dijkstra(d, v, k) {
  if(v[k - 1]) {
    return;
  }
  console.log(d,v,k)

  let node = arr.filter(num => num[0] === k)
  for(let i = 0; i < node.length; i++) {
    if(d[node[i][1] - 1] > d[k - 1] + node[i][2]) {
      d[node[i][1] - 1] = d[k - 1] + node[i][2]
    }
  }
  v[k - 1] = true;
  node = node.sort((a,b) => a[2] - b[2])
  for(let i = 0; i < node.length; i++) {
    dijkstra(d, v, node[i][1])
  }
}

dijkstra(d, v, K)
console.log(d)