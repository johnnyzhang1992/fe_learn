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
      if (type === "increase") {
        if (arr[j] > arr[cur]) {
          temp = arr[cur];
          arr[cur] = arr[j];
          arr[j] = temp;
          cur = j;
        } else {
          break;
        }
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
console.log(insertSort([3, 1, 2, 5, 9, 4],'aa'));
