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

let task = (number) => {
	return new Promise((resolve, reject) => {
		console.log(number);
		resolve(number);
	});
};

let promiseArr = (count, n) => {
	console.log('count:' + count)
	let tasks = [];
	let start = n;
	for (let i = 1; i <= n; i++) {
		// tasks.push(task(i));
		task(i).then(() => {
			start= start+1;
			if (start + 1 <= count) {
				task(start);
			}
		});
	}
};

promiseArr(20, 10);

// 定时器
let sleep = (time) => {
	return new Promise((resolve) => {
		let timer = setTimeout(() => {
			console.log('---sleep--ms:' + time);
			clearTimeout(timer);
			resolve()
		},time)
	})
}

let main = async() => {
	let start = new Date().getTime();
	console.log(1);
	await sleep(1000);
	console.log(2);
}
// main();

