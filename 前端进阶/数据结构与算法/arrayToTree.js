// 数组转树
var data = [
  { name: "a", id: 1, pid: 0 },
  { name: "b", id: 2, pid: 1 },
  { name: "c", id: 3, pid: 1 },
  { name: "d", id: 4, pid: 2 },
  { name: "f", id: 5, pid: 3 },
  { name: "g", id: 6, pid: 0 },
];

// 写函数将上面data转换成如下
// data = [
//   {
//     name: "a",
//     id: 1,
//     pid: 0,
//     children: [
//       {
//         name: "b",
//         id: 2,
//         pid: 1,
//         children: [{ name: "d", id: 4, pid: 2, children: [] }],
//       },
//       { name: "c", id: 3, pid: 1, children: [] },
//     ],
//   },
// ];
// pid 相同的数据放到 相同ID下的children数组内
const arrToTree = (data = []) => {
  // 用map 对引用类型做缓存
  const map = new Map();
  const obj = [];
  data.forEach((item) => {
    const tempObj = {
      ...item,
      children: [],
    };
    // 将每个对象都缓存下来
    map.set(item.id, tempObj);
    // 找到缓存的对象，操作children，这样就不用逐级查找了
    const mapObj = map.get(item.pid);
    if (map.has(item.pid)) {
      // 修改目标对象修改children即可
      mapObj.children.push(tempObj);
    } else {
      obj.push(tempObj);
    }
  });
  return obj;
};
console.log(JSON.stringify(arrToTree(data)));
