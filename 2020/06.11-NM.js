function solution(n,m) {
    let arr =[];
    let visited =[];
    let word='';
    function recursive(len) {
        console.log(len)
        if(len === m) {
            for(let i=0; i<m; i++) {
                word += arr[i] +" ";
            }
            console.log(word);
            word='';
            return ;
        }
        
        for( let i=1; i<=n; i++) {
            if(!visited[i]) {
                arr[len] = i ;
                visited[i] =true;
                recursive(len+1);
                visited[i] = false;
            }
            
        }
        
    }
    recursive(0);
}


solution(4,2)
solution(4,4)