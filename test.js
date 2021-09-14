// 消消乐
// 'asBssBd' 大小写敏感，若字符串相邻两个字段相同则消除，只到不能消除为止，返回最后字符串长度

// 递归操作

function cancelSameWord(str) {
    let strArr = str ? str.split("") : [];
    console.log(strArr);
	let isEnd = false;
	let res = [];
	let execTimes = 0;
	let strLength = strArr.length;
	for (let i = 0; i < strLength; i++) {
		execTimes++;
		if (strArr[i] === strArr[i + 1]) {
			i++;
		} else {
			res.push(strArr[i]);
			if (i === strLength) {
                if (execTimes === strLength) {
                    isEnd = true;
                    return res;
                } else {
                    cancelSameWord(res.join(''));
                }
			}
		}
    }
    // console.log('res' + res.join(''));
    // return res;
}

console.log(cancelSameWord('asBssBd'))