# 理解 vue3 的 hooks

## mixin

### mixin 是什么？

mixin, 翻译过来就是混入，不仅仅在 vue 框架中存在 mixin，确切的说 mixin 是一种思想，一种混入的思想。混入的内容就是可以在被混入的地方使用，他会自动的将混入的东西准确的分配到指定的组件中。在 vue 中，mixin 相当于指定混入的变量&函数放入他不混入时候该放的地方。可以认为，vue 中的 mixin 就是相当于组件中的组件。

举个例子：现在组件 A 中的 watch 中需要处理的逻辑是 hanldleParams, 在组件 B 中的 watch 中同样需要这样的逻辑-hanldleParams。那么我们应该如何将这两块相同的逻辑抽象出来复用呢？

那么有两种方法：（这两种方法的区别就代表了 mixin 和 utils 的区别）

1.抽函数：第一种方法就是将 hanldleParams 以函数的形式抽出来，然后在 watch 中调用 hanldleParams；
2.mixin：上一种抽函数方法虽然可以解决一定的复用问题，但是我们还是需要在组件中写 watch，毕竟两个组件都是在 watch 这个钩子中调用。如果每个组件都写 watch，那么 watch 也是重复的东西，因此 mixin 就是将 watch 钩子都可以抽出来的组件，也就是说，mixin 抽出来不仅仅是纯函数逻辑，还可以将 vue 组件特有的钩子等逻辑也可以抽出来，达到进一步复用，这就是 mixin 的作用。那么组件 A\B 通过 mixin 共用一个 watch，导入即可，不需要开发人将其放置在指定位置。

特点：Mixin 中的数据和方法都是独立的，组件之间使用后是互相不影响的

### mixin 解决了啥问题？

mixin 解决了两种复用：

- 逻辑函数的复用
- vue 组件配置复用

### 使用场景 & 使用方法

关键：在 vue 中，mixin 定义的就是一个对象，对象中放置的 vue 组件相应的选项式 API 和对应的生命周期钩子。

```js
export const mixins = {
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
```

记住：mixin 中一般都是存在 vue 组件中的选项 API 和组件生命周期钩子，因为函数的抽象也是要放在组件中特定的 API 或者钩子中，因此 mixin 考虑了这一点，直接配置好了所有的 API，只要在函数中放置即可。

也就是说，mixin 中除了不能把组件中的 template 模版抽出来，其他任何 options-API 都可以抽出来放在 mixin 中(vue2 中的所有逻辑无非就是放在 data、methods、computed、watch 中，这些都可以原封不动放在 mixin 中)

```js
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <button @click="clickMe">点击我</button>
  </div>
</template>

<script>
import { mixins } from "./mixin/index";
export default {
  name: "App",
  mixins: [mixins], // 注册mixin，这样mixin中所有的钩子函数等同于组件中钩子
  components: {},
  created(){
    console.log("组件调用minxi数据",this.msg);
  },
  mounted(){
    console.log("我是组件的mounted生命周期函数")
  }
};
</script>
```

注意：组件内的方法和数据会覆盖掉，mixin 返回对象内的变量或者方法。（两个对象的合并，生命周期：两者内逻辑都保留）

注意：mixin 中和 vue 组件中相同的钩子的优先级：

- mixin 中的生命周期函数会和组件的生命周期函数一起合并执行。
- mixin 中的 data 数据在组件中也可以使用。
- mixin 中的方法在组件内部可以直接调用。
- 生命周期函数合并后执行顺序：先执行 mixin 中的，后执行组件的。

### 存在的缺点

优点：组件中钩子函数的注册复用

缺点：

- 相同钩子中注册的函数名相同会发生冲突（vue 中冲突的解决方案是本组件中优先级高于 mixin）
- 定位错误需要花费时间
- 滥用会造成维护问题

## hooks

### hooks 是什么

一般来说，我们开发中会自动抽象出逻辑函数放在 utils 中，utils 中放的纯逻辑，不存在属于组件的东西。例如 methods 中定义的纯函数等。
而 hooks 就是在 utils 的基础上再包一层组件级别的东西(钩子函数等)。例如：我们每次点击 button 都会弹出一个弹窗，自动显示当前日期。但是我将函数放在 util 中，每次复用都需要 click=handleClick 函数放入日期函数，通过 handleClick 函数管理 utils，那么我不如直接将 handleClick 也封装起来，下次直接调用，复用了 methods 注册的环节

**hooks 和 utils 的区别**：

hooks 中如果涉及到 ref,reactive,computed 这些 api 的数据，那这些数据是具有响应式的，而 utils 只是单纯提取公共方法就不具备响应式，因此可以把 hook 理解为加入 vue3 api 的共通方法

### 为什么会出现 hooks

那么 hooks 相当于组件级别的逻辑封装，这种逻辑封装在 vue2 中的 mixin 也可以实现，为什么还要使用 hooks 呢？

**hooks 与 mixin 的区别**：

mixin 是 options API 的体现，一个是 composition API 的体现。

关于 mixin:

- 在 vue2 中有一个东西：Mixins 可以实现这个功能
- mixins 就是将这些多个相同的逻辑抽离出来，各个组件只需要引入 mixins，就能实现代码复用
- 弊端一： 会涉及到覆盖的问题
- 组件的 data、methods、filters 会覆盖 mixins 里的同名 data、methods、filters
- 弊端二：隐式传入，变量来源不明确，不利于阅读，使代码变得难以维护
- 弊端三：mixin 无法传入灵活的传入参数，

关于 hooks 的使用：

```js
import {ref} from 'vue'
// 导出1个 name_hooks.ts文件
// hooks中不用写在setup中
export const name_hooks = function(value: string) {
   const name = ref('')
   const setName = (value: string) => {
       name.value = value
   }
   return {
      name, setName
   }
}
// 引入hooks文件
<template>
    <div>{{ name }}</div>
    <select @change="setName"></select>
    {/* <!-- 这里select组件的change事件会自动传value值
     然后value值作为传参传递给setName --> */}
</template>
import { name_hooks } from './name_hooks'
export default defineComponent({
    setup() {
       const { name, setName } = name_hooks() // 注意： 通常需要通过解构赋值将需要的属性方法添加进组件中
       return {
          name, setName
       }
    }
})

<script setup>
 const { name, setName } = name_hooks();
// 注意： 通常需要通过解构赋值将需要的属性方法添加进组件中
</script>
```

以上 hooks 使用方法，常见的操作：

1.导出的 hooks 是一个函数，函数中可以使用 ref，reactive，这样 hooks 定义的变量和方法如同在组件中一样

2.hooks 函数通常返回一个对象，对象中是双向绑定的变量，在 vue 中间引用的时候第一件事就是解构（vue3 中的解构需要注意坑最好复习一下）
export

2.hooks：

- Vue3 中我们可以： 自定义 Hook
- Vue3 的 hook 函数 相当于 vue2 的 mixin, 但是： hooks 是函数
- Vue3 的 hook 函数 可以帮助我们提高代码的复用性, 让我们能在不同的组件中都利用 hooks 函数

### 定义hooks满足的规范

- 1、将可复用功能抽离为外部js文件
- 2、函数名、文件名以use 开头，形如：useXX
- 3、引用时将响应式变量或者方法显式解构暴露出来，如： const {nameRef, Fn} = useXX() (在setup函数解构处自定义hooks的变量和方法)

> 作者：会飞的特洛伊
> 链接：<https://juejin.cn/post/7208111879150993464>
> 来源：稀土掘金
