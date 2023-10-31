// 测试代码

// 获取任意长度的随机字符串

const strings = "0123456789abcdefghijklmnopqrstuvwxyz";
const getRandomString = (leng) => {
  let result = "";
  for (let i = 0; i < leng; i++) {
    let index = Math.floor(Math.random() * strings.length);
    result += strings[index];
  }
  return result;
};
console.log(getRandomString(10));

// 数组扁平化

const testArr = [1, 2, [3, 4, [5]], 6];
// for 循环，递归
const flat = (arr) => {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      newArr = [...newArr, ...flat(arr[i])];
    } else {
      newArr.push(arr[i]);
    }
  }
  return newArr;
};
// map
const mapFlat = (arr) => {
  return [].concat(
    ...arr.map((item) => (Array.isArray(item) ? mapFlat(item) : [item]))
  );
};
// reduce
const reduceFlat = (arr) => {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? reduceFlat(cur) : cur);
  }, []);
};
console.log(flat(testArr));
console.log(mapFlat(testArr));
console.log(reduceFlat(testArr));

// 去重
// [...new Set([1,2,3,2,3])]
// indexof 查询 === -1 插入，否则跳过；includes; 使用map .has()方法

// 防抖
const deboude = function (fn, wait) {
  let timer = null;
  return function (...args) {
    let context = this;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, wait);
  };
};
// 节流
const throttle = function (fn, wait) {
  let curTime = Date.now();
  return function (...args) {
    let content = this;
    let nowTime = Date.now();
    if (nowTime - curTime >= wait) {
      curTime = Date.now();
      fn.apply(content, args);
    }
  };
};

class Scheduler {
  constructor() {
    this.queue = [];
    this.maxCount = 2;
    this.runCounts = 0;
  }
  add(promiseCreator) {
    this.queue.push(promiseCreator);
  }
  taskStart() {
    for (let i = 0; i < this.maxCount; i++) {
      this.request();
    }
  }
  request() {
    if (!this.queue || !this.queue.length || this.runCounts >= this.maxCount) {
      return;
    }
    this.runCounts++;

    this.queue
      .shift()()
      .then(() => {
        this.runCounts--;
        this.request();
      });
  }
}

const get = (obj, path, defaultValue) => {
  const keys = path.split(".");
  let value = obj;
  for (let i = 0; i < keys.length; i++) {
    value = value[keys[i]]; // 0 {b: {name: 'jake'}}
  }
  return value || defaultValue;
};
console.log(get({ a: { b: { name: "jake" } } }, "a.b.name"), "make");

function add() {
  // 创建空数组来维护所有要 add 的值
  const args = [];
  // curry 函数，存入每次调用传入的参数
  function curried(...nums) {
    if (nums.length === 0) {
      // 长度为0，说明调用结束，返回 args 的 sum
      return args.reduce((pre, cur) => pre + cur, 0);
    } else {
      // 长度不为0，将传入的参数存入 args，返回 curried函数给下一次调用
      args.push(...nums);
      return curried;
    }
  }

  // 一开始给 curried 传递 add 接收到的参数 arguments
  return curried(...Array.from(arguments));
}
