// 循环中的async 和 await

// for 循环
// 数组的常用方法 foeEach map filtre reduce

// 水果篮子，有水果若干
const fruitBasket = {
  apple: 27,
  grape: 0,
  pear: 14,
};
// 获取某种品类水果的数量
const getNumFruit = (fruit) => {
  return fruitBasket[fruit] || 0;
};

const numApples = getNumFruit("apple");
console.log(numApples); //27

// 现在若从服务器上获取，我们用promise 和 setTimeout 模拟
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const asyncGetNumFruit = async (fruit) => {
  const v = await sleep(1000);
  return fruitBasket[fruit];
};

// asyncGetNumFruit("apple").then((num) => console.log(num)); // 27

const control = async (_) => {
  console.log("Start");

  const numApples = await asyncGetNumFruit("apple");
  console.log(numApples);

  const numGrapes = await asyncGetNumFruit("grape");
  console.log(numGrapes);

  const numPears = await asyncGetNumFruit("pear");
  console.log(numPears);

  console.log("End");
};
// control(); // start 27 0 14 end 按顺序执行

// for  循环中使用 await
// 先定义一个放水果的数组

const fruitToGet = ["apple", "grape", "pear"];

const forLoopGetFruit = async () => {
  console.log("start--loop");
  for (let i = 0; i < fruitToGet.length; i++) {
    const num = await asyncGetNumFruit(fruitToGet[i]);
    console.log(fruitToGet[i], num);
  }
  console.log("end--loop");
};
// 当使用await时，希望JavaScript暂停执行，直到等待 promise 返回处理结果。
// 这意味着for循环中的await 应该按顺序执行。
// forLoopGetFruit();
// start--loop
// apple 27
// grape 0
// pear 14
// end--loop

const forEachGetFruit = () => {
  console.log("start--forEach");
  fruitToGet.forEach(async (item) => {
    const num = await asyncGetNumFruit(item);
    console.log(item, num, "forEach");
  });
  console.log("end--forEach");
};
// forEachGetFruit();
// 没有堵塞js 的执行，JavaScript 中的 forEach不支持 promise 感知
// start--forEach
// end--forEach
// apple 27 forEach
// grape 0 forEach
// pear 14 forEach

const mapGetFruit = () => {
  console.log("start--map");
  const nums = fruitToGet.map(async (item) => {
    const num = await asyncGetNumFruit(item);
    console.log(item, num, "map");
    return num;
  });
  console.log(nums, "nums");
  console.log("end--map");
};
// mapGetFruit();
// map 返回值是三个 promise 且状态都为peding
// 如果在map中使用await, map 始终返回promise数组，这是因为异步函数总是返回promise

// start--forEach
// [ Promise { <pending> }, Promise { <pending> }, Promise { <pending> } ] nums
// end--forEach
// apple 27 forEach
// grape 0 forEach
// pear 14 forEach

const mapGetFruit1 = async () => {
  console.log("start--map");
  // map 返回promise 数组
  const promises = fruitToGet.map(async (item) => {
    const num = await asyncGetNumFruit(item);
    console.log(item, num, "map");
    return num;
  });
  // 使用promise.all 拿到结果
  const numFruits = await Promise.all(promises);
  console.log(numFruits);
  console.log("end--map");
};

// mapGetFruit1();
// start--map
// apple 27 forEach
// grape 0 forEach
// pear 14 forEach
// [ 27, 0, 14 ]
// end--map

const mapGetFruit2 = async () => {
  console.log("start--map");
  // map 返回promise 数组
  const promises = fruitToGet.map(async (item) => {
    const num = await asyncGetNumFruit(item);
    console.log(item, num, "map");
    return num + 100;
  });
  console.log(promises);
  // 使用promise.all 拿到结果
  // 此处 await 会堵塞 js 执行
  const numFruits = await Promise.all(promises);
  console.log(numFruits);
  console.log("end--map");
};

// mapGetFruit2();
// start--map
// [ Promise { <pending> }, Promise { <pending> }, Promise { <pending> } ]
// apple 27 map
// grape 0 map
// pear 14 map
// [ 127, 100, 114 ]
// end--map

const filterGetFruit = async () => {
  console.log("start--filter");
  // 预期结果：filter 返回大于20的水果种类
  const moreThan20 = fruitToGet.filter(async (item) => {
    const num = await asyncGetNumFruit(item);
    console.log(item, num, "map");
    return num > 20;
  });
  console.log(moreThan20, 'moreThan20');
  console.log("end--filter");
};
// filterGetFruit();
// -- 实际与结果不符，没有起到筛选作用
// start--filter
// [ 'apple', 'grape', 'pear' ] moreThan20
// end--filter
// apple 27 map
// grape 0 map
// pear 14 map

// 为什么会发生这种情况?

// 当在filter 回调中使用await时，回调总是一个 promise 。由于promise 总是真的，数组中的所有项都通过filter 。在filter 使用 await类以下这段代码

// const filtered = array.filter(true);

// 在filter使用 await 正确的三个步骤

// 使用map返回一个promise 数组
// 使用 await 等待处理结果
// 使用 filter 对返回的结果进行处理

const filterLoop = async _ => {
  console.log('Start');

  const promises = fruitToGet.map(fruit => getNumFruit(fruit));
 
  // 拿到结果前，后面的代码不会执行
  const numFruits = await Promise.all(promises);

  const moreThan20 = fruitToGet.filter((fruit, index) => {
    const numFruit = numFruits[index];
    return numFruit > 20;
  })

  console.log(moreThan20);
  console.log('End')
} 
filterLoop();
// Start
// [ 'apple' ]
// End