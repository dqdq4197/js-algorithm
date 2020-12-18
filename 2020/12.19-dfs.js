// N개의 주사위 
// 나올 수 있느 주사위 눈의 경우의 수 
let N = 4; // 유동적
let arr = [];
let result = 0;
let con = [];

function dfs(depth) {
  if(depth > N) {
    result++;
    for(let j = 1; j <= N; j++) {
      con.push(arr[j]);
    }
    console.log(con);
    con = [];
    return ;
  }
  for(let i = 1; i <= 6; i++) {
    arr[depth] = i;
    dfs(depth + i);
  }
}



dfs(1)
console.log(result)