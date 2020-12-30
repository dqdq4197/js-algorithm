const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
let V = 0;
let E = 0;
let K = 1;
let graph = [];
let inf = 9999999999;

rl.on('line', function (line) {
    input.push(line.split(' ').map(num => Number(num)));
  })
  .on('close', function () {
    V = input[0][0];
    E = input[0][1];
    K = input[1][0];

    let visit = new Array(V + 1).fill(false);
    let distance = new Array(V + 1).fill(inf);

    graph = new Array(V + 1).fill([]);
    input.splice(0, 2);
    input.forEach((num) => {
      if(!graph[num[0]][0]) {
        graph[num[0]] = [[num[1], num[2]]]
      } else {
        graph[num[0]].push([num[1], num[2]]);
      }
    })

    function dijkstra(start) {
      distance[start] = 0;

      for(let i = 0; i < V; i++) {
        let index = minDistanceIndex();
        graph[index].forEach((num) => {
          let cost = distance[index] + num[1]
          if(distance[num[0]] > cost)  {
            distance[num[0]] = cost;
          }
        })
      }
    }

    function minDistanceIndex() {
      let index = 1;
      let min = inf;
      for(let i = 1; i <= V; i++) {
        if(distance[i] < min && !visit[i]) {
          min = distance[i];
          index = i;
        }
      }
      visit[index] = true;
      return index;
    }

    dijkstra(K)
    distance.shift();
    distance = distance.map((dis) => dis === inf ? 'INF' : dis);
    distance.forEach(dis => { 
      console.log(dis)
    })
    process.exit();
});
