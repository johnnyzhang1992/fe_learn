// 作用域问题
var i = 4;
var arr1 = [];
var arr2 = [];
var foo = () => {
	for (var i = 0; i < 3; i++) {
		arr1[i] = () => {
			console.log(i);
		};
	}
	for (let i = 0; i < 3; i++) {
		arr2[i] = () => {
			console.log(i);
		};
	}
};
foo();
for (let j = 0; j < 3; j++) {
	arr1[j](); // 3 3 3
}
for (let j = 0; j < 3; j++) {
	arr2[j](); //0 1 2
}

// this 问题
var count = 2;
var obj = {
	count: 1,
	// 此时 this 默认指向 obj
	sayCount: function () {
		console.log(this.count);
	},
	// 若转为箭头函数,
	say1: () => {
		console.log(this);
		console.log(this.count);
	},
};
obj.sayCount(); //1
var say = obj.sayCount;
say(); //2
say.call(obj); //1
obj.sayCount.call(); //2
say.bind(obj); // nothings

// 箭头函数 this 指向 window
obj.say1(); //2
var say1 = obj.say1;
say1(); //2
say1.call(obj); //2
obj.say1.call(); //2
