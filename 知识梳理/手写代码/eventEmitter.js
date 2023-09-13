// 手写简易版发布订阅
class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(eventName, cb) {
    let events = this.events[eventName] || [];
    events.push(cb);
    this.events[eventName] = events;
  }
  emit(eventName, ...args) {
    // console.log("emit", eventName);
    let events = this.events[eventName] || [];
    if (events.length > 0) {
      events.forEach((fn) => {
        fn(...args);
      });
    } else {
      console.log(eventName, "当前事件未绑定回调");
    }
  }
  off(eventName, cb) {
    let events = this.events[eventName] || [];
    this.events[eventName] = events.filter((e) => e !== cb);
  }
}
// 使用
const ee = new EventEmitter();

// 订阅事件
ee.on("sayHi", () => console.log("on,Hello!"));

// 发布事件
ee.emit("sayHi"); // Hello!

// 取消订阅
const cb = () => console.log("off,Hello!");
ee.on("sayHi1", cb);
ee.off("sayHi1", cb);
ee.emit("sayHi1"); // 没有输出