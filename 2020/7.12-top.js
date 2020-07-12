function solution(heights) {//
    var answer = [];
    heights = heights.reverse();
   for(let i=0; i <= heights.length; i++) {
       let check = 0;
       
       for(let v = i+1; v <= heights.length; v++) {
           if(check === 1) {
                break
            } else {
                if(heights[i] <heights[v]) {
                   answer.push(heights.length-v);
                    console.log(heights[i])
                   check=1;
                } else if(v === heights.length) {
                    answer.push(0);
                    check=1;
                }
            }
       }
   }
    return answer.reverse();
}