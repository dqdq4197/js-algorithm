// 최대 공약수 GCD

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % d);
}

// 5와 10의 최대공약수는?
console.log(gcd(5, 10));
