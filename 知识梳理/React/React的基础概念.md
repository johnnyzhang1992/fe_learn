# React 基础概念

## #1: React皆组件

React按照可复用组件的概念来设计的。定义一个个的小组件，然后组装成大组件。

所有的组件不论大小都是可复用的，即使跨项目也一样。

一个组件，从形式上看就是一个普通的JS函数：

```jsx
// 例1
// https://jscomplete.com/repl?j=Sy3QAdKHW
function Button (props) {
  // Returns a DOM element here. For example:
  return <button type="submit">{props.label}</button>;
}
// To render the Button component to the browser
ReactDOM.render(<Button label="Save" />, mountNode)
```

关于Button里面的花括号，还有ReactDOM会在后面介绍。这里只是一个热身例子。

ReactDOM.render 的第二个参数是React会覆盖和监控的目标元素。

关于 例1 的个要点:

- 为了和HTML标签区别开来，组件的名字首字母大写。小写是为HTML元素预留的，事实上如果你把该组件命名为'button'，ReactDOM将会忽略此函数直接渲染一个正常的空的HTML button。
- 和HTML元素一样每个组件也会接收一个属性列表，在React里面这个列表叫Props。由于是一个函数组件你可以随便定义属性。
- 在Button函数组件上，我们写出了一个类HTML的输出。这种输出既不JS也不是HTML或者React.js。但它是这么的受欢迎以至于变成了React的默认写法。她叫做JSX，一个JS的扩展。JSX也是一种折衷的方案。自己动手试试吧，比如试试让她返回一个input元素。

## #2: JSX的 “flux” 是多少?

上面的例子例1可以用纯react.js实现,而不用jsx:

```jsx
// 例2 -  React component without JSX
// https://jscomplete.com/repl?j=HyiEwoYB-
function Button (props) {
  return React.createElement(
    "button",
    { type: "submit" },
    props.label
  );
}
// To use Button, you would do something like
ReactDOM.render(
  React.createElement(Button, { label: "Save" }),
  mountNode
);
```

createElement函数是React顶级API的主要函数。也是7大API中所需要学习的一个。这也说明了ReactAPI很小。

就类似DOM有自己的document.createElement 函数来创建特定标签名的元素。React的createElement函数是一个高级函数能做到document.createElement能做的事，他也能创建代表React组件的元素。我们在上面的例子2中做过后者。

不一样的还有，React的createElement函数接受一个可变的多个参数做为第二个参数后面的参数来代表创建的元素的子元素。所以CreatElement实际是创建了一个树

举个例子

```jsx
// 例3 -  React’s createElement API
// https://jscomplete.com/repl?j=r1GNoiFBb
const InputForm = React.createElement(
  "form",
  { target: "_blank", action: "https://google.com/search" },
  React.createElement("div", null, "Enter input and click Search"),
  React.createElement("input", { className: "big-input" }),
  React.createElement(Button, { label: "Search" })
);
// InputForm uses the Button component, so we need that too:
function Button (props) {
  return React.createElement(
    "button",
    { type: "submit" },
    props.label
  );
}
// Then we can use InputForm directly with .render
ReactDOM.render(InputForm, mountNode);
```

从上面列子需要知道：

1. 因为InputForm不是React组件，只是React元素。所以我们直接用ReactDOM.render来调用InputForm，而不是（注意和例1的对比）。
2. React.createElement 函数在前两个参数后面接收了多个参数. 他从第三个起的参数列表 由一个该组件的子组件构成的列表.
3. 由于 React.createElement 都是 javaScript所以我们可以嵌套调用.当该元素没有属性或者Props的时候，该函数的第二个参数可以是null或者是一个空的对象.
4. 我们可以将HTML元素和React组件一起混用，你就把HTML想象为React的内置组件就可以了.
5. React 的API设计会尽可能的河DOM API接近，这也是为什么在 Input 元素中我们要用className而不是class的原因. 私下里,我们都希望React API可以变成DOM API的一部分，那就太好了.

上面的代码当引入了React库后浏览器是可以理解的，浏览器不能直接解析JSX. 然而我们开发者喜欢跟HMTL打交道而不是createElment（想象一下，整个页面用document.createElement来创建的情景，辣眼睛）. 这就是JSX存在的意义，以其用React.createElement来构建页面，我们更愿意使用一种和HTML更相近的语法:

```jsx
// 例4 - JSX (compare with 例3)
// https://jscomplete.com/repl?j=SJWy3otHW
const InputForm =
  <form target="_blank" action="https://google.com/search">
    <div>Enter input and click Search</div>
    <input className="big-input" name="q" />
    <Button label="Search" />
  </form>;
// InputForm "still" uses the Button component, so we need that too.
// Either JSX or normal form would do
function Button (props) {
  // Returns a DOM element here. For example:
  return <button type="submit">{props.label}</button>;
}
// Then we can use InputForm directly with .render
ReactDOM.render(InputForm, mountNode);
```

上面例子你需要知道：

- 它们不是HTML，你可以看到我们还在用className而不是class.
- 我们一直认为这种类HTML的语法是一种JS，所以可以看到我们在最后加了分号。

上面的代码（例4）就是JSX了。到目前为止，我们呈现给浏览器的是（例3）版本编译后的代码。为了达到被浏览器理解的目的，我们需要使用与处理器来讲JSX版本（例4）的代码转换成为React.createElement（例3）版本。

这就是JSX，它是为了让我们能够用一种更接近HTML语法来写React组件的一种折衷的办法，也是一个不错的方案。

> 开头说的“Flux”这个单词，其实只是为了押韵所以用了这个词。Flux同时也是一个Facebook推出的非常受欢迎的应用框架的名字。其中最出名的实现是Redux。Flux非常适用于React的reactive特性.

另外，JSX也不是非得和React搭配用的，他也可以独立使用.

## #3: 你可以在 JSX任何位置使用JS表达式

在JSX里面，你可以使用带有花括号的JS表达式：

```jsx
// 例5 -  Using javaScript expressions in JSX
// https://jscomplete.com/repl?j=SkNN3oYSW
const RandomValue = () => 
  <div>
    { Math.floor(Math.random() * 100) }
  </div>;
// To use it:
ReactDOM.render(<RandomValue />, mountNode);
```

任何JS表达式都可以放到花括号里面，这有点像[JS字符串模版](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/en-US/docs/Web/javaScript/Reference/Template_literals)里面的${} 插值语法.

唯一的约束是：只能是JS表达式，比如：if 语句不能使用了，但是你可以用三元表达式来代替.

JS变量是表达式，所以当组件接收到Props列表（除了随机数外，props是可选的）时，我们可以将其使用到花括号里面。我们在(例1)里面的Button组件使用过。

JS对象也同样是表达式。有时候我们在花括号里面使用JS对象，从表现上来看是一个双括号，但这实际上就是一个放在花括号里面的对象而已。比如，我们可以在React的特殊样式属性中传入一个CSS样式对象:

```jsx
// 例6 - An object passed to the special React style prop
// https://jscomplete.com/repl?j=S1Kw2sFHb
const ErrorDisplay = ({message}) =>
  <div style={ { color: 'red', backgroundColor: 'yellow' } }>
    {message}
  </div>;
// Use it:
ReactDOM.render(
  <ErrorDisplay 
    message="These aren't the droids you're looking for" 
  />,
  mountNode
);
```

注意这里我是怎么构props里面的message参数的，再次证明它是JS。另外注意看一下style属性的特殊性（它不是HTML，它只是接近DOM API）。我们使用一个对象作为style属性。这样的定义样式就像在写js一样，当然我们就是在写JS。

由于React元素也是一个表达式，所以同样我们可以在JSX中使用。别忘了React元素其实就是一个函数调用:

```html
// 例7 - Using a React element within {}
// https://jscomplete.com/repl?j=SkTLpjYr-
const MaybeError = ({errorMessage}) =>
  <div>
    {errorMessage && <ErrorDisplay message={errorMessage} />}
  </div>;
  
// The MaybeError component uses the ErrorDisplay component:
const ErrorDisplay = ({message}) =>
  <div style={ { color: 'red', backgroundColor: 'yellow' } }>
    {message}
  </div>;
// Now we can use the MaybeError component:
ReactDOM.render(
  <MaybeError
    errorMessage={Math.random() > 0.5 ? 'Not good' : ''}
  />,
  mountNode
);
```

上面的 MaybeError 组件，如果有errorMessage传入将展示ErrorDisplay组件. React 会将 {true}, {false}, {undefined}, 和 {null} 视为有效的子元素,只不过不显示出来罢了.

你还可以在JSX里使用函数式集合方法（map, reduce, filter, concat等等），因为它们返回的也是一个表达式：

```text
// 例8 - Using an array map inside {}
// https://jscomplete.com/repl?j=SJ29aiYH-
const Doubler = ({value=[1, 2, 3]}) =>
  <div>
    {value.map(e => e * 2)}
  </div>;
// Use it
ReactDOM.render(<Doubler />, mountNode);
```

上面的例子，我给了属性一个默认值，同样还在div里面输出了一个数组表达式。React接受这种操作，他将把每一个乘以二后的数字用text node 展示出来.

## #4: 你可以用JS class 来写React组件

简单函数组件只能满足简单需求，但实际开发中我们需要更复杂的组件。 React 支持通过[class语法](http://link.zhihu.com/?target=https%3A//developer.mozilla.org/en-US/docs/Web/javaScript/Reference/Classes)来写组件. 这里给出上面的Button例子的改写:

```jsx
// 例9 - Creating components using javaScript classes
// https://jscomplete.com/repl?j=ryjk0iKHb
class Button extends React.Component {
  render() {
    return <button>{this.props.label}</button>;
  }
}
// Use it (same syntax)
ReactDOM.render(<Button label="Save" />, mountNode);
```

class语法很简答. 定义一个继承自React.Component（另一个顶级React API）的class. 这个 class 定义了一个单例函数 render(), 该函数返回一个 virtual DOM 对象. 当我们使用这个class-based 的 Button组件的时候 (例如, <Button ... />), React 将从这个 class-based 组件实例化一个对象并将该对象放入 DOM 树中.

这就是为什么我们要在render函数里的JSX上使用this.props.label. 当组件初始化的时候每一个组件实例都会有一个专有的实例属性props传给组件实例.

既然我们有一个和单一组件使用有关的实例，那么我们可以按照意愿修改该实例。例如：

```jsx
// 例10 -  Customizing a component instance
// https://jscomplete.com/repl?j=rko7RsKS-
class Button extends React.Component {
  constructor(props) {
    super(props);
    this.id = Date.now();
  }
  render() {
    return <button id={this.id}>{this.props.label}</button>;
  }
}
// Use it
ReactDOM.render(<Button label="Save" />, mountNode);
```

我们也可以自定义属性方法并在组件任何地方使用它:

```jsx
// 例11 — Using class properties
// https://jscomplete.com/repl?j=H1YDCoFSb
class Button extends React.Component {
  clickCounter = 0;
handleClick = () => {
    console.log(`Clicked: ${++this.clickCounter}`);
  };
  
  render() {
    return (
      <button id={this.id} onClick={this.handleClick}>
        {this.props.label}
      </button>
    );
  }
}
// Use it
ReactDOM.render(<Button label="Save" />, mountNode);
```

在上面的例子里:

- handleClick 函数 使用的是新的类域语法. 它还处在 stage-2阶段,但是这是最好的使用组件实例的方式（感谢尖头函数的出现）.但是，你需要用Babel这样的编译器，来让浏览器认识这些新语法. 网上有babel相关的资料大家可以看看.
- 我们也同样用了类域语法定义了clickCounter变量，这让我们省略了类构造函数的使用。
- 当我们指定handleClick函数作为React专有属性onClick的属性值，我们没有调用该函数，我们只是传了一个该函数的引用. 在那个级别调用方法是写React一个常犯的错误.

```text
// Wrong:
onClick={this.handleClick()}
// Right:
onClick={this.handleClick}
```

## #5: React的事件: 两大不同

在遇到React事件的时候，我们需要知道两个不同于DOM API的点:

- 所有的react元素属性都适用驼峰命名而不是小写. 如：onClick非onclick.
- 我们传递的是函数的应用作为事件的处理器而不是字符串。如：onClick={handleClick}, 非onClick="handleClick".

React 把DOM的事件对象包装到了自己的对象里面，并对事件处理的性能做了优化。但是在事件处理器里面我们同样可以使用DOM事件对象里面的所有可用方法。每一次事件调用React都会将该包装后的事件对象传递过去. 例如，禁用form表单的默认提交事件可以这么做:

```text
// 例12 - Working with wrapped events
// https://jscomplete.com/repl?j=HkIhRoKBb
class Form extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted');
  };
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    );
  }
}
// Use it
ReactDOM.render(<Form />, mountNode);
```

## #6: 每个组件都有一个生命周期

下面几点仅适用于class-based组件(继承自 React.Component). function-based的组件稍有不同.

1. 定义一个让React创建元素的模版.
2. 然后, 我们委托React来使用它。比如，ReactDOM.render里，或者别的组件的render方法里。
3. 接着，React实例化一个元素并传入一个props集合，这个集合我们可以通过this.props来访问. 这些props实际上是通过上面第二步传入的.
4. 由于都是JS，其构造函数将会被调用（如果定义了的话）. 这也是我们所说的第一个组件生命周期函数.
5. React会计算出render函数输出的结果 ( virtual DOM 节点).
6. 这个时候React开始渲染元素, React 将会和浏览器通信 (对于我们来说就是开始使用DOM API) 将元素展示到浏览器里. 这个过程被叫做 mounting.
7. 接着React开始启用另一个生命周期方法 componentDidMount. 我们可以利用这个方法，例如，可以在这里操作DOM. 早于这个方法的DOM都是虚拟DOM.
8. 有些组件生命到这里就结束了.其他的组建将会由于各种各样的原因收到浏览器DOM的unmounted状态 . 如果后者发生，此时React 将启用componentWillUnmount.
9. 装在后的元素的状态可能发生改变. 父元素也可能重新渲染.同时，装在后的element也可以接受到一个不同的props.React的神奇就在这里! 这也是我们为什么需要React的原因.
10. 组件生命继续,在此之前我们先来理解一下什么是state.

## #7: 每个组件都有一个私有状态state

下面的内容也仅适用于class-based组件。

State 类域在React class组件都是特有的。React监视这个每一个组件的state的改变。为了高效的实现这个机制，我们需要通过另外一个顶级的React API来修改state，那就是this.setState:

```text
// 例13 -  the setState API
// https://jscomplete.com/repl?j=H1fek2KH-
class CounterButton extends React.Component {
  state = {
    clickCounter: 0,
    currentTimestamp: new Date(),
  };
  
  handleClick = () => {
    this.setState((prevState) => {
     return { clickCounter: prevState.clickCounter + 1 };
    });
  };
  
  componentDidMount() {
   setInterval(() => {
     this.setState({ currentTimestamp: new Date() })
    }, 1000);
  }
  
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click</button>
        <p>Clicked: {this.state.clickCounter}</p>
        <p>Time: {this.state.currentTimestamp.toLocaleString()}</p>
      </div>
    );
  }
}
// Use it
ReactDOM.render(<CounterButton />, mountNode);
```

这是一个需要理解的很重要的例子。这将完善你的React的知识。理解了这个例子后，你只需要在学习一点JS技巧方面的知识就可以入门了。

从class域开始让我们回顾一下例13，有两个类域。

- 第一个是私有state，它包含两个属性clickCounter和currentTimestamp.
- 另一个是handleClick函数，该函数的引用被传给button的onClick 事件属性。它会通过setState来改变组件的状态。

另外我们还在componentDidMount方法里面调用一个定时轮询来改变状态，每秒调用一下this.setState，在render函数里我们就使用了一下这两个属性，没别的特殊API。

不知道你注意到了没有？我们使用了两种不同的方法来更新state。

1. 通过传递返回对象的函数.
2. 直接传递一个普通的对象.

两种方式都可行，但第一种适用于当你需要同时读和写state的时候（就像我们这样）。在定时器函数里面，我们只需要对state进行写操作不用读。当你实在分不清楚的时候那你就用函数作为参数的用法。在竞态条件（译者注：*当两个线程竞争同一资源时，如果对资源的访问顺序敏感，就称存在竞态条件*）下更加安全，因为setState实际上是一个异步方法。

那么我们怎么更新state的呢？我们在函数里返回一个我们需要更新的新对象。还有一点，可以看到我们在更新state的时候仅仅只用传递state的一个属性就好了，而不用都传递。这完全可行的，因为setState实际上对传入的新值是一个merge操作。所以没有传的那部分值说明我们不希望它改变而不是把它删掉。

## #8: React 将会响应你的变化

React 之所以叫React 是基于他会响应state的变化（即使不响应也在响应的路上）。还有一种说法是React应该起名叫Schedule。

然而，当任何组件的状态更新时，我们用肉眼看到的是React对该更新做出反应，并自动反映浏览器DOM中的更新（如果需要更新到DOM）.

这里思考render函数的两种输入：

- 通过父组件传入的props
- 可以随时更新的内部状态state

当render函数的输入改变时，它的输出可能也会发生改变。

React保留了渲染历史的记录，当它看到一个渲染与前一个渲染不同时，它将计算它们之间的差异，并有效地将其转换为在DOM中执行的实际DOM操作。

## #9: React是你的代理人

您可以将React视为我们聘请的与浏览器通信的代理。以上面的显示当前时间戳为例。我们不是去手动的用DOM API来操作p#timestamp让其每秒更换一下时间戳，而是更组件状态的属性值，然后让React代表我们去和浏览器沟通. 我相信着就是react为什么这么受欢迎的原因. 我们讨厌和浏览器先生（还说着各种带有口音的DOM方言）打交道，React志愿为我们做这些事情，还是免费的～

## #10: 组件周期 ( 2)

现在我们已经知道了一个组件的状态，当它改变的时候会有神奇的事情发生。接下来让我们继续把后面的生命周期里的概念给理解清楚吧。

1. 当一个组件的state或者其父组件传递的props发生改变的时候组件就会重新渲染.
2. 如果是后者即props发生改变时 React 会调用另外一个周期函数componentWillReceiveProps.
3. 如果两者都发生改变，React会做一个重要决策，该组件是否需要在浏览器里被更新？这也是为什么会调用另外一个周期函数shouldComponentUpdate的原因. 这个方法实际上也是在问一个问题，所以如果你想自定义或者优化你的渲染过程，你就需要通过返回一个true或者false来回答这个问题。
4. 如果没有手动指定shouldComponentUpdate, React 会默认作出聪明的决策，多数情况下也是足够良好的.
5. 首先, 这时候React会调用componentWillUpdate方法. 然后计算新的渲染产出把它和上一次的渲染产出进行比较.
6. 如果没什么改变，那么就什么也不做.
7. 如果有改变则把差异反应到浏览器上.
8. 无论什么情况，尽管更新会发生在任何地方（甚至计算出来的产出是相同的）,React 最终都会调用另一个周期方法componentDidUpdate.

生命周期函数实际上就是一个逃逸舱口。如果你不做什么特别的事情，你可以不用他们也可以创建一个完整的应用。它们会非常方便地分析应用程序中发生的情况，并进一步优化了React更新的性能。
