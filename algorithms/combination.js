/**
 * [ 1, 2, 3, 4 ]
 * [ 1, 2, 4, 3 ]
 * [ 1, 3, 2, 4 ]
 * [ 1, 3, 4, 2 ]
 * [ 1, 4, 2, 3 ]
 * [ 1, 4, 3, 2 ]
 * [ 2, 1, 3, 4 ]
 * [ 2, 1, 4, 3 ]
 * [ 2, 3, 1, 4 ]
 * [ 2, 3, 4, 1 ]
 * [ 2, 4, 1, 3 ]
 * [ 2, 4, 3, 1 ]
 * [ 3, 1, 2, 4 ]
 * [ 3, 1, 4, 2 ]
 * [ 3, 2, 1, 4 ]
 * [ 3, 2, 4, 1 ]
 * [ 3, 4, 1, 2 ]
 * [ 3, 4, 2, 1 ]
 * [ 4, 1, 2, 3 ]
 * [ 4, 1, 3, 2 ]
 * [ 4, 2, 1, 3 ]
 * [ 4, 2, 3, 1 ]
 * [ 4, 3, 1, 2 ]
 * [ 4, 3, 2, 1 ]
 */
const visit = Array.from({ length: 5 }, () => false);

function combination1(nums) {
  if (nums.length === 4) {
    console.log(nums);
  }

  for (let i = 1; i <= 4; i++) {
    if (!visit[i]) {
      nums.push(i);
      visit[i] = true;
      combination1(nums);
      visit[i] = false;
      nums.pop();
    }
  }
}

combination1([]);
