//프로그래머스 3Level 보석 쇼핑
function solution(gems) {
    var answer = [1, gems.length];
    let gemSet = new Map();
    gemSet.set(gems[0], 1);
    let uniqGems = new Set([...gems]).size
    let left = 0;
    let right = 0;

    while(left < gems.length) {
        if(uniqGems === gemSet.size) {
            if(right - left < answer[1] - answer[0]) {
                answer = [left + 1, right + 1];
            }
            let stack = gemSet.get(gems[left])
            stack > 1 ? gemSet.set(gems[left++], stack - 1) : gemSet.delete(gems[left++])
        } else if(right === gems.length - 1) {
            break;
        }
        if(uniqGems > gemSet.size && right !== gems.length - 1) {
            let stack = gemSet.get(gems[++right])
            stack ? gemSet.set(gems[right], stack + 1) : gemSet.set(gems[right], 1)
        }
        if(left >= right && right !== 0) {
            break;
        }
    }

    return answer;
}