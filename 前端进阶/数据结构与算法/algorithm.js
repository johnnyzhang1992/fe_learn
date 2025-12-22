// 算法
// 排序相关算法
/**
 * 冒泡排序算法
 * 两层 for 循环，每次和右侧比对，按要求看是否左右替换
 * @param {*} arr
 * @param {string} type increase reduction 增 减
 * @returns
 */
const bubbleSort = (arr = [], type = "increase") => {
  const length = arr.length;
  if (length < 2) {
    return arr;
  }
  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      const right = arr[j + 1];
      const left = arr[j];
      // 增
      if (type === "increase") {
        if (left > right) {
          arr[j] = right;
          arr[j + 1] = left;
        }
      } else {
        // 减
        if (left < right) {
          arr[j] = right;
          arr[j + 1] = left;
        }
      }
    }
  }
  return arr;
};
console.log(bubbleSort([3, 1, 2, 5, 9, 4], "redu"));

/**
 * 插入排序
 * @param {Array} arr
 * @param {*} type
 * @returns
 */
const insertSort = (arr = [], type = "increase") => {
  const length = arr.length;
  if (length < 2) {
    return arr;
  }
  let cur, temp;
  for (let i = 1; i < length; i++) {
    cur = i;
    for (let j = i - 1; j >= 0; j--) {
      console.log(cur, temp, "cur", "tmp");
      // 和前面的数比对，若前面的小，则交换，且cur指向当前的数，然后继续和前面的数比对
      // 保证 j前面的数是排好序的
      if (type === "increase") {
        if (arr[j] > arr[cur]) {
          temp = arr[cur];
          arr[cur] = arr[j];
          arr[j] = temp;
          cur = j;
          console.log(i, j, arr[i], arr[j], "in");
        } else {
          break;
        }
        // i=1 j=0 temp=1 cur=1 chane 132594
        //
        console.log(arr);
      } else {
        if (arr[j] < arr[cur]) {
          temp = arr[cur];
          arr[cur] = arr[j];
          arr[j] = temp;
          cur = j;
        } else {
          break;
        }
      }
    }
  }
  return arr;
};
console.log(insertSort([3, 1, 7, 2, 5, 9, 4], "increase"));

// 选择排序
// 每轮选出最新的一个数，放到最前面
const selectSort = (arr = []) => {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    // 当前数不是最小，则和最小数交换
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
};

console.log(selectSort([3, 1, 7, 2, 5, 9, 4]));

// 快速排序
const quickSort = (arr = []) => {
  if (arr.length <= 1) return arr; // 基线：0或1个元素
  const pivot = arr[Math.floor(arr.length / 2)]; // 中间元素作基准
  const left = [],
    right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else if (arr[i] > pivot) right.push(arr[i]);
    // 等于 pivot 的均匀分到两边（避免全等退化）
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
};
console.log(quickSort([3, 1, 7, 2, 5, 9, 4]));