
let pattern = 'abababcdcdcdab';
let n = pattern.length;
let pi = Array.from({ length: n }, () => 0);

function getPi() {
  let j = 0;
  for(let i = 1; i < pattern.length; i++) {
    while(j > 0 && pattern.charAt(i) !== pattern.charAt(j)) {
      j = pi[j - 1];
    }

    if(pattern.charAt(j) === pattern.charAt(i)) {
      pi[i] = ++j;
    }
  }
}

getPi();

if(pi[n - 1] == 0) {
  console.log(1);
} else {
  console.log(n % (n - pi[n - 1]));
}