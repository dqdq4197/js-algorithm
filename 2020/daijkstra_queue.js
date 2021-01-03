const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];
let V = 0;
let E = 0;
let K = 1;
let inf = 9999999999;

rl.on('line', function (line) {
    input.push(line.split(' ').map(num => Number(num)));
  })
  .on('close', function () {
    V = input[0][0];
    E = input[0][1];
    K = input[1][0];

    let distance = new Array(V + 1).fill(inf);

    let graph = new Array(V + 1).fill([]);

    input.splice(0, 2);
    
    input.forEach((num) => { 
      if(!graph[num[0]][0]) {
        graph[num[0]] = [[num[1], num[2]]]
      } else {
        graph[num[0]].push([num[1], num[2]]);
      }
    })
    // ↑ 입력 끝, 구현 시작
    
    function dijkstra(start) {
      let heapq = [];
    
      distance[start] = 0;
      enqueue(heapq, [start, 0])
    
      while(heapq.length) {
        let [now, dist] = dequeue(heapq);
    
        if(distance[now] < dist) {
          continue;
        }
        graph[now].forEach(q => {
          let cost = dist + q[1];
          if(distance[q[0]] > cost) {
            distance[q[0]] = cost;
            enqueue(heapq, [q[0], cost]);
          }
        })
      }
    }

    dijkstra(K)
    distance.shift();
    distance = distance.map((dist) => dist === inf ? 'INF' : dist);
    distance.forEach(num => {
      console.log(num)
    })
    process.exit();
});

function enqueue(heapq, q) {
  let isContain = false;
  for(let i = 0; i <heapq.length; i++) {
    if(heapq[i][1] < q[1]) {
      heapq.splice(i, 0, q);
      isContain = true;
      return ;
    }
  }
  if(!isContain) {
    heapq.push(q);
  }
}

function dequeue(heapq) {
  if(heapq.length) {
    return heapq.pop();
  }
}

  
  // Input
  // 6 11
  // 1
  // 1 2 2
  // 1 3 5
  // 1 4 1
  // 2 3 3
  // 2 4 2
  // 3 2 3
  // 3 5 6
  // 4 3 3
  // 4 5 1
  // 5 3 1
  // 5 6 2
  // output 
  // [0,2,3,1,2,4]