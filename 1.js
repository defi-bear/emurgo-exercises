/**
 * 1. Permutations
Input: a string of unknown length that can contain only three characters: 0, 1, or *. For example: "101*011*1”
Output: an array of strings where each string is a permutation of the input string with the * character replaced by a 0 or a 1. For example: for
input "*1" the result array is ["01", "11"]
Tasks: Implement the function/program that will give correct output for all possible inputs within given restrictions. Write a documenting comment
explaining the algorithmic complexity of the program.
 */

let non_permArr = [];

function non_recursive(strs) {
    for (let i = 0; i < strs.length; i++) { // O(strs.length)
        const tmpArr = non_permArr;
        if (i === 0) {
            if (strs[i] === '*') {
                non_permArr = ['0', '1'];
            } else {
                non_permArr = [strs[i]];
            }
        } else {
            if (strs[i] === '*') { // 2 ^ n as maximum in case the string is made by only *
                const firstTerm = tmpArr.join('0,').split(',');
                firstTerm[firstTerm.length - 1] = firstTerm[firstTerm.length - 1] + '0';
                non_permArr = [...firstTerm, ...tmpArr.join('1,').split(',')];
                non_permArr[non_permArr.length - 1] = non_permArr[non_permArr.length - 1] + '1';
            } else {
                non_permArr = tmpArr.join(strs[i] + ',').split(',');
                non_permArr[non_permArr.length - 1] = non_permArr[non_permArr.length - 1] + strs[i];
            }
        }
    }
}

function main() {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    readline.question('Only input 0, 1, *?\n', strs => {
        let cnt = 0;
        for (let i = 0; i < strs.length; i++) {
            if (strs[i] === '0' || strs[i] === '1' || strs[i] === '*') {
                cnt++;
            }
        }

        if (cnt !== strs.length) {
            console.log('Please type a correct string!');
            readline.close();
        } else {
            non_recursive(strs); // total difficulty is O(n * 2 ^ n) 
            console.log(non_permArr);
            readline.close();
        }
    });
      
}

main();