function solution(n) {
  let dp = [1, 1];

  for(let i = 2; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % 1234567;
  }

  return dp[n];
}

solution(1);
solution(2);
solution(3);
solution(4);
solution(5);
solution(6);
solution(7);
solution(8);

