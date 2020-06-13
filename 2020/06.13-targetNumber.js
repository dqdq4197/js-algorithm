function solution(numbers, target) {
    var answer = 0;
    
    
    function recur(idx, sum){
        if( idx === numbers.length){
            if(sum ===target ){
                answer+=1;
            }
            return;
        }
        
        recur(idx+1, sum+numbers[idx]);
        recur(idx+1, sum-numbers[idx]);
    }
    
    recur(0, 0);
    
    return answer;
}