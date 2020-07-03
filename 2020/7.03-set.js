function solution (arr) {
    let set = new Set([]);
    let answer = [];

    function cnt(num) {
        let count =0;
        arr.forEach(el => {
            if(el === num) 
                count ++; 
        });
        return count;
    }

    arr.forEach(element => {
        if(set.has(element)) return;
        set.add(element);
        let count = cnt(element)
        if(count > 1) answer.push(count);
    });
    return answer;

}

console.log(solution([1,2,3,3,3,3,4,4]))
console.log(solution([3,2,4,4,2,5,2,5,5]))
console.log(solution([3,3,2,2,2]))