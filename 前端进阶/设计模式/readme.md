# 设计模式

## 什么是设计模式

设计模式是一套被反复使用的、多数人知晓的、经过分类编目的、代码设计经验的总结
设计模式是为了重用代码、让代码更容易被理解、保证代码可靠性。

## 设计模式原则

- 单一职责原则（一个类只负责一个功能领域中的相应职责
- 开闭原则（软件实体应对扩展开放，而对修改关闭
- 里氏代换原则（所有引用基类对象的地方能够透明地使用其子类的对象
- 依赖倒转原则（抽象不应该依赖于细节，细节应该依赖于抽象
- 接口隔离原则（使用多个专门的接口，而不使用单一的总接口
- 迪米特原则（一个软件实体应当尽可能少地与其他实体发生相互作用
- 合成复用原则（尽量使用对象组合，而不是继承来达到复用的目的

## 创建型模式

提供了一种在创建对象的同时隐藏创建逻辑的方式，而不是使用 new 运算符直接实例化对象。
这使得程序在判断针对某个给定实例需要创建哪些对象时更加灵活。

- 1、简单工程模式 Simple Factory （4）重要程度，满分5
- 2、工厂方法模式 Factory Method（5）
- 3、抽象工厂模式 Abstract Factory（5）
- 4、建造者模式 Builder（2）
- 5、原型模式 Prototype（3）
- 6、单例模式 Singleton（4）

## 结构型模式

关注类和对象的组合。继承的概念被用来组合接口和定义组合对象获得新功能的方式。

- 1、适配器模式 Adapter（4）
- 2、桥接模式 Bridge（2）
- 3、组合模式 Composite（4）
- 4、装饰模式 Decorator（3）
- 5、外观模式 Facade（5）
- 6、享元模式 Flyweight（1）
- 7、代理模式 Proxy（4）

## 行为型模式

这些设计模式特别关注对象之间的通信。

- 1、职责链模式 Chain of Responsibility（3）
- 2、命令模式Command（4）
- 3、解释器模式 Interpreter （1）
- 4、迭代器模式 Iterator （5）
- 5、中介者模式 Mediator （2）
- 6、备忘录模式 Memento （2）
- 7、观察者模式 Observer （5）
- 8、状态模式 State （3）
- 9、策略模式 Strategy （4）
- 10、模板方法模式 Template Method （3）
- 11、访问者模式 Visitor （1）

## 前端常见的设计模式

## 创建型

创建型从功能上来说就是创建元素，目标是规范元素创建步骤。

### 1、构造器模式

抽象了对象实例的变与不变（变的是属性值，不变的是属性名）。

```js
// 需求：给公司员工创建线上信息
// 单个员工创建，可以时间使用创建
const obj = {
    name: '张三',
    age: 20,
    department: '人力资源部'
}
// 当员工数量过多时，单个创建不可行，此时可以使用构造器模式
class Person {
    constructor(obj) {
        this.name = obj.name;
        this.age = obj.age;
        this.department = obj.department;
    }
}
const person1 = new Person(obj);
```

### 2、工厂模式

为创建一组相关或相互依赖的对象提供一个接口，且无需指定他们的具体类

**即隐藏创建过程、暴露共同接口。**

```js
// 需求：公司员工创建完信息后需要为每一个员工创建一个信息卡片
class setPerson {
    constructor(obj) {
        this.personObj = obj;
    }
    // 创建信息卡片
    creatCard(obj){
        this.personObj = obj;
        return this.personObj;
    }
    otherFunction(){}
}
class Person {
    constructor(obj) {
        return new setPerson(obj);
    }
}
const person = new Person();
const card = person.creatCard({
    name: '张三',
    age: 20,
    department: '人力资源部'
})
```

### 3、单例模式

全局只有一个实例，避免重复创建对象，优化性能

```js
// 需求：判断一款应用的开闭状态，根据不同状态给出不同提示
class applicationStation {
    constructor() {
        this.state = 'off'
    }
    play() {
        if (this.state === 'on') {
            console.log('已打开')
            return
        }
        this.state = 'on'
    }
    shutdown() {
        if (this.state === 'off') {
            console.log('已关闭')
            return
        }
        this.state = 'off'
    }
}
window.applicationStation = new applicationStation()
applicationStation.instance = undefined
applicationStation.getInstance = function() {
   return function() {
       if (!applicationStation.instance) {  // 如果全局没有实例再创建
           applicationStation.instance = new applicationStation()
       }
       return applicationStation.instance
   }()
}
// application1和application2拥有同一个applicationStation对象
const application1 = window.applicationStation
const application2 = window.applicationStation
```

## 结构型

结构型从功能上来说就是给元素添加行为的，目标是优化结构的实现方式。

### 1、适配器模式

适配独立模块，保证模块间的独立解耦且连接兼容。

```js
// 需求：一个港行PS，需要适配插座国标
class HkDevice {
    getPlug() {
        return '港行双圆柱插头'
    }
}
class Target {
    constructor (){
        this.plug = new HkDevice();
    }
    getPlug() {
        return this.plug.getPlug() +'+港行双圆柱转换器'
    }
}
const target = new Target();
target.getPlug();
```

### 2、装饰器模式

动态将责任附加到对象之上。（React 的高阶函数）

```js
// 说回之前的为公司员工创建名片需求，现在追加需求，要为不同工龄的员工，创建不同的类型名片样式。
// 由于工厂方法还有其它各种方法，不好直接改动原工厂函数，这时候可以使用装饰器模式来实现
class setPerson {
    constructor(obj) {
        this.personObj = obj;
    }
    // 创建信息卡片
    creatCard(obj){
        this.personObj = obj;
        return this.personObj;
    }
    otherFunction(){}
}
class updatePerson {
    constructor(obj){
        this.personObj = obj;
    }
    careatCard() {
        this.personObj.creatCard();
        // 判断工龄
        if(this.personObj.seniorityNum<1){
            this.update(this.personObj)
        }
    }
    update(personObj) {
        // 追加处理
    }
}
// const person = new setPerson();
// 将实例作为参数传入新的类中，对就得实例做功能拓展
const newPerson = new updatePerson(new setPerson({
    name: '张三',
    age: 20,
    depaerment: '人力资源',
    seniorityNnum: 2,
}))
newPerson.creatCard();
```

### 3、代理模式

使用代理人来替代原始对象处理更专业的事情。

```js
// 需求：在单例模式中，我们实现了应用状态的判断，现在，我们需要控制这个应用要在登录注册的情况下才可以使用，可以通过代理模式，将这个需求代理给专门拦截的对象进行判断。
class applicationStation {
    init() {
        return 'hello'
    }
}
class User {
    constructor(loginStatus) {
        this.loginStatus = loginStatus;
    }
}
class applicationStationProxy {
    constructor(user) {
        this.user = user;
    }
    init() {
        return this.loginStatus ? new applicationStation.init() : 'please login!'
    }
}
const user = new User(true);
const userProxy = new applicationStationProxy(user);
userProxy.init();
```

## 行为型

不同对象直接责任的花费和算法的抽象画

### 1、观察者模式

当一个属性发送变化时，观察者会连续引发所有的相关状态的变更

```js
// 需求：通过智能家居中心一键控制系统
class MediaCenter {
    constructor() {
        this.state = '';
        this.observers = [];
    }
    attach(observers) {
        this.observers.push(observers);
    }
    getState() {
        return this.stata;
    }
    setState(state) {
        this.state = state;
        this.notifyAllObserversers();
    }
    notifyAllObservers() {
        this.observers.forEach(ob=> {
            ob.update();
        })
    }
}
class Observers {
    constructor(name, center) {
        this.name = name;
        this.center = center;
        this.center.attach(this);
    }
    update() {
        // 更新状态
        this.center.getState();
    }
}
const mediaCenter = new MediaCenter();
const observers = new Observers('watch', mediaCenter);
mediaCenter.setState('set');
```

### 2、模版模式

在模版中，定义好每个方法的执行步骤。方法本事关注于自己的事情。

```js
// 需求：新员工入职，按照规定流程，进行相关培训和办理好员工相关资料
class EntryPath {
    constructor(obj) {
       // some code
    }
    init() {
        // 初始化员工信息
    }
    creatCard() {
        // 创建员工名片
    }
    inductionTraining() {
        // 入职培训
    }
    trainingExamination() {
        // 训后测试
    }
    personEntry() {
        this.init()
        this.creatCard()
        this.inductionTraining()
        this.trainingExamination()
    }
}
const personEntryPath = new EnterPath({});
personEntryPath.personEntry();
```

### 3、命令模式

请求以指令的形式包裹在对象中，并传给调用对象

```js
// 需求:游戏角色的控制
// 接受者
class Receiver {
    execute() {
        // 奔跑
    }
}
// 操控者
class Operator {
    constructor(command) {
        this.command = command
    }
    run() {
        this.command.execute()
    }
}
// 指令器
class command {
    constructor(receiver) {
        this.receiver = receiver
    }
    execute() {
        // 逻辑
        this.receiver.execute()
    }
}
const soldier = new Receiver()
const order = new command(soldier)
const player = new Operator(order)
player.run()
```
