// new

function myNew(ctor) {
	// 原型继承
	let res = Object.create(ctor);
	// let res = {};
	// let res.constructor = func;
	// if(func.prototype !==null){
	// 将新对象的 __proto__ 设置为构造函数的 prototype
	//   res.__proto__ = func.prototype;
	// }
	// this 绑定以及属性和方法继承
    let fn = new Symbol("fn");
    let args = arguments ? arguments : undefined;
	res[fn] = this;
	let result = args ? res[fn](res, args) : res[fn]();
	if (
		typeof result === "object" ||
		(typeof result === "function" && result !== null)
	) {
		return result;
	}
	delete res[fn];
	return res;
}
