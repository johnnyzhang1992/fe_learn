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

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const print = function (i) {
  setTimeout(function () {
    console.log(Date.now(), i);
  }, 1000);
};
// new Promise((resolve, reject) => {
//   for (var i = 0; i < 5; i++) {
//     //   print(i);
//     (function (i) {
//       setTimeout(function () {
//         console.log(Date.now(), i);
//         if (i === 4) {
//           resolve(5);
//         }
//       }, 1000);
//     })(i);
//   }
// }).then((i) => {
//   console.log(Date.now(), i);
// });

const asyncPrint = (i) => {
  return new Promise((resolve) => {
    setTimeout(function () {
      console.log(Date.now(), i);
      resolve(i);
    }, 1000);
  });
};
const printAll = async () => {
  for (var i = 0; i < 5; i++) {
    await asyncPrint(i);
  }
  console.log(Date.now(), i);
};
printAll();
const get = (obj, path, defaultValue) => {
  const keys = path.split(".");
  let value = obj;
  for (let i = 0; i < keys.length; i++) {
    value = value[keys[i]]; // 0 {b: {name: 'jake'}}
  }
  return value || defaultValue;
};
console.log(get({ a: { b: { name: "jake" } } }, "a.b.name"), "make");
