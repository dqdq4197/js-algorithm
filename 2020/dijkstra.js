const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
let V = 0;
let E = 0;
let K = 1;
let edge = [];
let inf = 9999999999;

rl.on('line', function (line) {
    input.push(line.split(' ').map(num => Number(num)));
  })
  .on('close', function () {
    V = input[0][0];
    E = input[0][1];
    K = input[1][0];
    let visit = new Array(V).fill(false);
    let distance = new Array(V).fill(inf);

    for(let i = 2; i < input.length; i++) {
      edge.push(input[i])
    }

    function dijkstra(start) {
      distance[start - 1] = 0;
      for(let i = 0; i < V; i++) {
        let index = getMinDistanceIndex()
        let node = edge.filter(num => num[0] === index + 1);
        for(let j = 0; j < node.length; j++) {
          if(distance[node[j][1] - 1] > node[j][2] + distance[index]) {
            distance[node[j][1] -1] = node[j][2] + distance[index]
          }
        }
      }
    }
    
    function getMinDistanceIndex() {
      let index = 0;
      for(let j = 0; j < V; j++) {
        let min = inf;
        if(min > distance[j] && !visit[j]) {
          min = distance[j];
          index = j;
        }
      }
      visit[index] = true;
      return index
    }
    
    dijkstra(K)
    distance = distance.map(dis => dis === inf ? 'INF' : dis);
    console.log(distance)

    process.exit();
});

// let V = 6; // 정점 개수
// let E = 11; // 간선의 개수
// let K = 1; // 시작 정점의 번호
// let inf = 99999999999;

// let edge = [
//     [1,2,2], [1,4,1], [1,3,5], 
//     [2,3,3], [2,4,2], [3,2,3],
//     [3,6,5], [4,3,3], [4,5,1], 
//     [5,6,2], [5,3,1]
//   ];

  

  
