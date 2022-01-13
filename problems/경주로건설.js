function solution(board) {
  const N = board.length;
  let costs = Array.from({ length: N }, () => Array(N).fill(Infinity));
  let dx = [0, 0, 1, -1];
  let dy = [1, -1, 0, 0];
  
  // -1 => init, 0 => 수직, 1 => 수평
  function bfs(start) {
    let queue = [[...start, -1, 0]];
    costs[0][0] = 0;
    
    while(queue.length) {
      let [y, x, dir, dist] = queue.pop()
      
      for(let i = 0; i < 4; i++) {
        let nx = x + dx[i];
        let ny = y + dy[i];
        
        if(nx >= 0 && ny >= 0 && nx < N && ny < N && board[ny][nx] === 0) {
          let nDir = i >= 2 ? 1 : 0;
          let cost = dist + (dir !== -1 && dir !== nDir ? 600 : 100);

          if(costs[ny][nx] >= cost) {
            costs[ny][nx] = cost;
            queue.push([ny, nx, nDir, cost]);
          }
        } 
      }
    }
  }
  
  bfs([0, 0]);
  return costs[N - 1][N - 1];
}

// solution([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
solution([[0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,1,0,0,0],[0,0,0,1,0,0,0,1],[0,0,1,0,0,0,1,0],[0,1,0,0,0,1,0,0],[1,0,0,0,0,0,0,0]])
// solution([[0,0,1,0],[0,0,0,0],[0,1,0,1],[1,0,0,0]])
// solution([[0,0,0,0,0,0],[0,1,1,1,1,0],[0,0,1,0,0,0],[1,0,0,1,0,1],[0,1,0,0,0,1],[0,0,0,0,0,0]])