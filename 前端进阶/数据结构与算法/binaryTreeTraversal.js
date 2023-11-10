// 二叉树遍历
const tree = {
  val: "A",
  left: {
    val: "B",
    left: {
      val: "D",
      left: {
        val: "G",
        left: null,
        right: null,
      },
      right: null,
    },
    right: {
      val: "E",
      left: {
        val: "H",
        left: {
          left: {
            val: "I",
            left: null,
            right: null,
          },
          right: null,
        },
        right: null,
      },
      right: null,
    },
  },
  right: {
    val: "C",
    left: null,
    right: {
      val: "F",
      left: null,
      right: null,
    },
  },
};

// 深度优先遍历
const deepBt = (root) => {
  if (!root) return;
  console.log(root.val);
  root.left && deepBt(root.left);
  root.right && deepBt(root.right);
};
deepBt(tree);
console.log("--广度优先遍历");
// // 广度优先遍历
const bfs = (root) => {
  if (!root) return;
  let arr = [root];
  while (arr.length) {
    const node = arr.shift();
    console.log(node.val);
    node.left && arr.push(node.left);
    node.right && arr.push(node.right);
  }
};
// const bfs = (root) => {
//   if (!root) return;
//   // 上一层二叉树节点
//   let arr = [root];
//   // 最新一层二叉树节点
//   let newArr = [];
//   const loop = () => {
//     if (arr.length > 0) {
//       for (let item in arr) {
//         const node = arr[item];
//         if (node) {
//           console.log(node.val);
//           node.left && newArr.push(node.left);
//           node.right && newArr.push(node.right);
//         }
//       }
//       if (newArr.length > 0) {
//         arr = [...newArr];
//         newArr = [];
//         loop();
//       }
//     }
//   };
//   loop();
// };
bfs(tree);
