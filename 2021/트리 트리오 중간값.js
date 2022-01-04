function solution(n, edges) {
  let graph = Array.from({ length: n + 1 }, () => []);
  let answer = 0;
  let maxV = 0;
  
  edges.forEach(([a, b]) => {
      graph[a].push(b);
      graph[b].push(a);
  })
  
  function dijkstra(start) {
      let queue = [[start, 0]];
      let distance = Array.from({ length: n + 1 }, () => Infinity);
      distance[start] = 0;
      let index = 0;
      
      while(queue.length > index) {
          const [now, dist] = queue[index++];
          
          graph[now].forEach(next => {
              let cost = dist + 1;
              if(cost < distance[next]) {
                  distance[next] = cost;
                  queue.push([next, cost]);
              }
          })
      }
      
      return distance;
  }
  
  let dist = dijkstra(1);
  let cnt = 0;
  let start = 1;
  
  for(let i = 1; i < n + 1; i++) {
      if(dist[start] < dist[i]) start = i;
  }
  dist = dijkstra(start);
  
  for(let i = 1; i < n + 1; i++) {
      let cost = dist[i];
      
      if(cost === dist[start]) {
          cnt++;
          continue;
      }
      
      if(cost > dist[start]) {
          start = i;
          cnt = 1;
      }
  }
  if(cnt >= 2) return dist[start];
  cnt = 0;
  
  dist = dijkstra(start);
  for(let i = 1; i < n + 1; i++) {
      let cost = dist[i];
      
      if(cost === dist[start]) {
          cnt++;
          continue;
      }
      
      if(cost > dist[start]) {
          start = i;
          cnt = 1;
      }
  }
  if(cnt >= 2) return dist[start];
  else return dist[start] - 1;
}