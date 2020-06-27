function solution(n, s) {
    var answer = [];
    let avg = parseInt(s/n);
    let alpha = s%n;
    
    if(avg === 0) {
        return [-1]
    }
    for(let i=0; i<n; i++) {
        answer.push(avg);        
    }
    let leng = answer.length-1;
    while(alpha >0) {
        if(leng < 0) {
            leng = answer.length-1;
        }
        answer[leng] +=1
        leng--;
        alpha--;
    }
    return answer;
}