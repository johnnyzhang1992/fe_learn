// 两数两加 链表
// [2,3,4]+[1,2,4] = [3,5,8]
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
// [2,4,3] [9,2,7]
var addTwoNumbers = function (l1, l2) {
  let head = null,
    tail = null;
  // head 头 tail 尾
  let carry = 0; // 进位
  while (l1 || l2) {
    // tail null [1,1]
    const n1 = l1 ? l1.val : 0; // 2 4 3
    const n2 = l2 ? l2.val : 0; // 9 2 7
    const sum = n1 + n2 + carry; // 2+9+0 4+4+1 3+7+0
    if (!head) {
      head = tail = new ListNode(sum % 10); // 1
    } else {
      tail.next = new ListNode(sum % 10); //  7 0 1
      tail = tail.next; // 表指针移动 7 0 1
    }
    carry = Math.floor(sum / 10); // 1 0 1
    if (l1) {
      l1 = l1.next;
    }
    if (l2) {
      l2 = l2.next;
    }
  }
  if (carry > 0) {
    tail.next = new ListNode(carry); // tail [1] [1,7] [1,7,0] [1,7,0,1]
  }
  return head;
};

// 移动石子
// 在 X 轴上有一些不同位置的石子。给定一个整数数组 stones 表示石子的位置。

// 如果一个石子在最小或最大的位置，称其为 端点石子。每个回合，你可以将一颗 端点石子 拿起并移动到一个未占用的位置，使得该石子不再是一颗 端点石子。

// 值得注意的是，如果石子像 stones = [1,2,5] 这样，你将 无法 移动位于位置 5 的端点石子，因为无论将它移动到任何位置（例如 0 或 3），该石子都仍然会是端点石子。
// 当你无法进行任何移动时，即，这些石子的位置连续时，游戏结束。

// 以长度为 2 的数组形式返回答案，其中：

// answer[0] 是你可以移动的最小次数
// answer[1] 是你可以移动的最大次数。
 

// 示例 1：

// 输入：[7,4,9]
// 输出：[1,2]
// 解释：
// 我们可以移动一次，4 -> 8，游戏结束。
// 或者，我们可以移动两次 9 -> 5，4 -> 6，游戏结束。
// 示例 2：

// 输入：[6,5,4,3,10]
// 输出：[2,3]
// 解释：
// 我们可以移动 3 -> 8，接着是 10 -> 7，游戏结束。
// 或者，我们可以移动 3 -> 7, 4 -> 8, 5 -> 9，游戏结束。
// 注意，我们无法进行 10 -> 2 这样的移动来结束游戏，因为这是不合要求的移动。
 

// 提示：

// 3 <= stones.length <= 104
// 1 <= stones[i] <= 109
// stones 的值各不相同。

/**
 * @param {number[]} stones
 * @return {number[]}
 */
var numMovesStonesII = function (stones) {
    stones.sort((a, b) => a - b)
    const n = stones.length
    // 移动左端点 stones[n-1] - stones[1] + 1 - (n-1)
    // 移动右端点 stones[n-2] - stones[0] + 1 - (n-1)

    let max = Math.max(stones[n - 1] - stones[1] + 2 - n, stones[n - 2] - stones[0] + 2 - n); // 最大移动次数
    let left = 0, min = n
    for (let right = 0; right < n; right++) {
        // 左右石子之间的格子数量大于石子数量
        // 石子分布太分散，无法通过移动其它石子来填充这些空位（求最小值，为的就是最少得填补空位
        // 收缩窗口
        while (stones[right] - stones[left] + 1 > n) {
            left++
        }
        // 滑动窗口的内石子数量
        const len = right - left + 1

        // 当窗口内石子数量为 n-1，且这些石子刚好占据 n-1 个连续位置时
        if (len == n - 1 && stones[right] - stones[left] + 1 == n - 1) {
            min = Math.min(min, 2)
        } else {
            // 总石子数 - 窗口内石子数
            min = Math.min(min, n - len)
        }

    }
    if (min === 1 && max === n - 1) {
        max = 2
    }
    return [min, max]
};

// ----- 数组求和
const sumArr = (arr) => {
  return arr.reduce((sum, val) => sum + val, 0);
};
console.log(sumArr([1, 2, 3, 4, 5, 6]));

// 最长回文字符串，回文： 正着读和反着读一样
// 两个重复字符中间的字段，偶数一一相对

var longestPalindrome = function (s) {
  if (s.length < 2) {
    return s;
  }
  let res = "";
  for (let i = 0; i < s.length; i++) {
    // 回文子串长度是奇数
    helper(i, i);
    // 回文子串长度是偶数
    helper(i, i + 1);
  }

  function helper(m, n) {
    while (m >= 0 && n < s.length && s[m] == s[n]) {
      m--;
      n++;
    }
    // 注意此处m,n的值循环完后  是恰好不满足循环条件的时刻
    // 此时m到n的距离为n-m+1，但是mn两个边界不能取 所以应该取m+1到n-1的区间  长度是n-m-1
    if (n - m - 1 > res.length) {
      // slice也要取[m+1,n-1]这个区间
      res = s.slice(m + 1, n);
    }
  }
  return res;
};

// var longestPalindrome = function (s) {
//   if (s.length < 2) {
//     return s;
//   }
//   let l = 0;
//   let r = 0;
//   for (let i = 0; i < s.length; i++) {
//     // 回文子串长度是奇数
//     helper(i, i);
//     // 回文子串长度是偶数
//     helper(i, i + 1);
//   }

//   function helper(m, n) {
//     while (m >= 0 && n < s.length && s[m] == s[n]) {
//       m--;
//       n++;
//     }
//     // 注意此处m,n的值循环完后  是恰好不满足循环条件的时刻 如果此轮询得到回文串长度大于之前记录， 记录此轮循边界
//     if (n - m - 1 > r - l - 1) {
//       r = n;
//       l = m;
//     }
//   }
//   return s.slice(l + 1, r);
// };

console.log(longestPalindrome("babad"));
console.log(longestPalindrome("cbbd"));
console.log(longestPalindrome("bb"));
// 5 12345 15 24 3

/**
 * Z字形变换 | 暴力破解，先列出，再取值
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  const res = new Array(numRows).fill("");
  let current_row = 0; // 行
  let current_col = 0; // 列
  if (s.length == 1 || numRows >= s.length) {
    return s;
  }
  // numRows 为1的情况

  // 根据当前行数，列，以及numRows 计算存数的位置
  for (let i = 0; i < s.length; i++) {
    if (!Array.isArray(res[current_col])) {
      res[current_row] += s[i];
    }

    // z字满行的列
    if (current_col % (numRows - 1) == 0 && current_row <= numRows) {
      res[current_col][current_row] = s[i];

      current_row++;
      //z字中间列
    } else {
      // --- 计算命中行
      const idx =
        numRows == 1 ? 0 : numRows - 1 - (current_col % (numRows - 1));
      res[idx] += s[i];

      current_row = numRows;
    }
    if (current_row === numRows) {
      current_col++;
      current_row = 0;
    }
  }

  return res.join("");
};

// ----- Z字形转换 - 优化版本
// 原版本问题：复杂的二维数组操作，内存开销大，逻辑复杂

// 优化版本1：按行构建（推荐）
var convert = function (s, numRows) {
  // 边界条件处理
  if (numRows <= 1 || numRows >= s.length) {
    return s;
  }

  // 创建行数组，每行是一个字符串
  const rows = new Array(Math.min(numRows, s.length)).fill("");
  let currentRow = 0;
  let goingDown = false;

  // 遍历字符串，按照Z字形规律分配到各行
  for (const char of s) {
    rows[currentRow] += char;

    // 在第一行或最后一行时改变方向
    if (currentRow === 0 || currentRow === numRows - 1) {
      goingDown = !goingDown;
    }

    currentRow += goingDown ? 1 : -1;
  }

  // 合并所有行
  return rows.join("");
};

// 优化版本2：数学计算法（最高效）
function convert(s, numRows) {
  if (numRows === 1 || s.length <= numRows) return s;

  const rows = new Array(numRows).fill("");
  let currentRow = 0;
  let goingDown = false;

  for (let char of s) {
    rows[currentRow] += char;

    // 当到达第一行或最后一行时，改变方向
    if (currentRow === 0 || currentRow === numRows - 1) {
      goingDown = !goingDown;
    }

    currentRow += goingDown ? 1 : -1;
  }

  return rows.join("");
}

// 测试用例
const testStr = "PAYPALISHIRING";
const numRows = 3;

console.log(`原字符串: ${testStr}`);
console.log(`行数: ${numRows}`);
console.log(`优化版本1结果: ${convert(testStr, numRows)}`);
console.log(`优化版本2结果: ${convertOptimal(testStr, numRows)}`);
console.log(`期望结果: PAHNAPLSIIGYIR`);