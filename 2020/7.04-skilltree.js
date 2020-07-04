//프로그래머스 스킬트리

function solution(skill, skill_trees) {
    var answer = 0;
    
    let findSkill = skill_trees.map(char => 
        char.split('')
        .filter(value => skill.split('').indexOf(value) >=0 )
        .join(''))
    console.log(findSkill);
    for(let i =0; i<skill_trees.length; i++ ){
        if( skill.substring(0,findSkill[i].length) === findSkill[i] )
            answer ++;
    }
    
    return answer;
};