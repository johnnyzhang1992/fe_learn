const quickSort = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }
  const middle = Math.ceil(arr.length / 2);
  const pivot = arr[middle];
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length; i++) {
    if (i === middle) {
      continue;
    }
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
};

console.log(quickSort([3, 1, 7, 2, 5, 9, 4]));

const inserSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let cur = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[cur]) {
        cur = j;
      }
    }
    if (cur !== i) {
      [arr[i], arr[cur]] = [arr[cur], arr[i]];
    }
  }
  return arr;
};
console.log(inserSort([3, 1, 7, 2, 5, 9, 4]));

// "abcabcbb"

var lengthOfLongestSubstring = function (s) {
  const map = new Map();
  let max = 0;
  let left = 0;
  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right])) {
      left = Math.max(left, map.get(s[right]) + 1);
    }
    map.set(s[right], right);
    max = Math.max(max, right - left + 1);
  }
    console.log(map)
  return max;
};


console.log(lengthOfLongestSubstring("abcffabcbb"));

// 取两个有序数组合并后的中位数
var findMedianSortedArrays = function (nums1, nums2) { 
    const arr = [...nums1, ...nums2].sort((a, b) => a - b);
    const middle = Math.floor(arr.length / 2);
    if (arr.length % 2 === 0) {
        return (arr[middle - 1] + arr[middle]) / 2;
    } else {
        return arr[middle];
    }
}
