// 测试代码

// 获取任意长度的随机字符串

const strings = '0123456789abcdefghijklmnopqrstuvwxyz';
const getRandomString = (leng) => { 
    let result = '';
    for (let i = 0; i < leng; i++) { 
        let index = Math.floor(Math.random() * strings.length)
        result += strings[index];
    }
    return result;
}
console.log(getRandomString(10))