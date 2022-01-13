function solution(game_board, table) {
  const N = table.length;
  let answer = 0;
  let dx = [1, 0, -1, 0];
  let dy = [0, 1, 0, -1];
  let tablePieces = [];
  let gameBoardPieces = [];
  
  function findPiece(i, j, board, pieceNum) {
    let result = {
      cools: [],
      yRange: [i, i],
      xRange: [j, j]
    };
    let queue = [[i, j]];
    let index = 0;
    
    while(queue.length > index) {
      let [y, x] = queue[index++];
      board[y][x] = -1;
      result = {
        cools: [...result.cools, [y, x]],
        yRange: [Math.min(y, result.yRange[0]), Math.max(y, result.yRange[1])],
        xRange: [Math.min(x, result.xRange[0]), Math.max(x, result.xRange[1])],
      } 
      
      for(let i = 0; i < 4; i++) {
        let nx = x + dx[i];
        let ny = y + dy[i];
        
        if(nx >= 0 && ny >= 0 && nx < N && ny < N) {
          if(board[ny][nx] === pieceNum) queue.push([ny, nx])
        }
      }
    }
    
    return result;
  }
  
  function comparePiece(piece1, piece2) {
    let isSame = true;
    
    for(let r = 0; r < piece1.length; r++) {
      for(let c = 0; c < piece1[0].length; c++) {
        if(piece1[r][c] !== piece2[r][c]) {
          isSame = false;
          break;
        }
      }
    }

    return isSame;
  }

  function turnLeftPiece(piece) {
    let newPiece = Array.from({ length: piece[0].length }, () => []);
    
    for(let i = 0; i < piece.length; i++) {
      for(let j = 0; j < piece[0].length; j++) {
        newPiece[piece[0].length - 1 - j][i] = piece[i][j];
      }
    }

    return newPiece;
  }

  for(let i = 0; i < table.length; i++) {
    for(let j = 0; j < table.length; j++) {
      if(table[i][j] === 1) {
        const { cools, yRange, xRange } = findPiece(i, j, table, 1);
        const yLen = yRange[1] - yRange[0] + 1;
        const xLen = xRange[1] - xRange[0] + 1;
        const newPiece = Array.from({ length: yLen }, () => Array(xLen).fill(1));
        
        for(let k = 0; k < cools.length; k++) {
          const cool = cools[k];
          newPiece[cool[0] - yRange[0]][cool[1] - xRange[0]] = 0;
        }
        
        tablePieces.push(newPiece);
      }
      
      if(game_board[i][j] === 0) {
        const { cools, yRange, xRange } = findPiece(i, j, game_board, 0);
        const yLen = yRange[1] - yRange[0] + 1;
        const xLen = xRange[1] - xRange[0] + 1;
        const newPiece = Array.from({ length: yLen }, () => Array(xLen).fill(1));
        
        for(let k = 0; k < cools.length; k++) {
          const cool = cools[k];
          newPiece[cool[0] - yRange[0]][cool[1] - xRange[0]] = 0;
        }
        
        gameBoardPieces.push(newPiece);
      }
    } 
  }
  
  let visit = Array.from({ length: tablePieces.length }, () => false);

  for(let i = 0; i < gameBoardPieces.length; i++) {
    for(let j = 0; j < tablePieces.length; j++) {
      if(visit[j]) continue;
      const gameBoardPiece = gameBoardPieces[i];
      let tablePiece = tablePieces[j];
      let cnt = 4;
      let isSame = false;

      while(cnt-- > 0) {
        if(gameBoardPiece.length === tablePiece.length && gameBoardPiece[0].length === tablePiece[0].length) {
          if(comparePiece(tablePiece, gameBoardPiece)) {
            isSame = true;
            break;
          }
        } 

        if(cnt > 0) tablePiece = turnLeftPiece(tablePiece);
      }

      if(isSame) {
        visit[j] = true;
        answer += gameBoardPieces[i].flat().filter(v => v === 0).length;
        break;
      }
    }
  }
  console.log(answer);
  return answer;
}

solution(
  [[1,1,0,0,1,0],[0,0,1,0,1,0],[0,1,1,0,0,1],[1,1,0,1,1,1],[1,0,0,0,1,0],[0,1,1,1,0,0]],
  [[1,0,0,1,1,0],[1,0,1,0,1,0],[0,1,1,0,1,1],[0,0,1,0,0,0],[1,1,0,1,1,0],[0,1,0,0,0,0]]
)

solution(
  [[0,0,0],[1,1,0],[1,1,1]],
  [[1,1,1],[1,0,0],[0,0,0]]
)