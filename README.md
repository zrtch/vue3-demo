## Vue3 入门与实战

## 目录

1. [第 1 章 Vue 语法初探](#jump1)
2. [第 2 章 Vue 基础语法](#jump2)
3. [第 3 章 探索组件的理念](#jump3)
4. [第 4 章 Vue 中的动画](#jump4)
5. [第 5 章 Vue 中的高级语法](#jump5)
6. [第 6 章 Composition API](#jump6)

### <span id="jump1">第 1 章 Vue 语法初探</span>

更多的 API 特性；体积更小 速度更快；解决遗留问题；更加强壮。
之前是面向 DOM 编程，Vue 是面向数据编程。

###

### <span id="jump2">第 2 章 Vue 基础语法</span>

#### 2-1 Vue 中应用和组件的基础概念

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script>
      // createApp 表示创建一个Vue应用，存储到 app 变量中
      // 传入的参数表示，这个应用最外层的组件，应该如何展示
      // mvvm设计模式， m -> model 数据， v -> view 视图, vm -> viewModel 视图数据连接层
      const app = Vue.createApp({
        data() {
          return {
            message: 'hello',
          }
        },
        template: `<div>{{ message }}</div>`,
      })
      // vm 代表的就是vue应用的根组件
      const vm = app.mount('#root')
    </script>
  </body>
</html>
```

#### 2-2 理解 Vue 中的生命周期函数

生命周期函数：在某一时刻会自动执行的函数

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const app = Vue.createApp({
        data() {
          return {
            message: 'hello',
          }
        },
        // 实例生成之前会自动执行的函数
        beforeCreate() {
          console.log('beforeCreate')
        },
        // 实例生成之后会自动执行的函数，对你的事件，生命周期函数，依赖注入都分析结束了。
        created() {
          console.log('created')
        },
        // 在组件内容被渲染到页面之前自动执行的函数
        beforeMount() {
          console.log(
            document.getElementById('root').innerHTML,
            '-> beforeMount'
          )
        },
        // 在组件内容被渲染到页面之后自动执行的函数
        mounted() {
          console.log(document.getElementById('root').innerHTML, '-> mounted')
        },
        // 当数据发生变化时会立即自动执行的函数；通过在控制台改变数据 vm.$data.message = '111'
        beforeUpdate() {
          console.log('beforeUpdate')
        },
        // 当数据发生变化，页面重新渲染后，会自动执行的函数
        updated() {
          console.log('updated')
        },
        // 当Vue应用失效时，自动执行的函数；通过在控制台调用 app.unmount() 方法执行
        beforeUnmount() {
          console.log('beforeUnmount')
        },
        // 当Vue应用失效时，且dom完全销毁之后，自动执行的函数
        unmounted() {
          console.log('unmounted')
        },
        template: `<div>{{ message }}</div>`,
      })
      const vm = app.mount('#root')
    </script>
  </body>
</html>
```

#### 2-5 常用模版语法讲解

- v-bind ：绑定对应的变量
- v-once：后面数据发生改变，它也不会改变；可以降低无用的渲染
- v-on：模板事件绑定
- v-html：通过 html 方式展示这个变量
- v-if：通过变量 true 或 false 来进行展示
- @click.prevent：绑定了一个事件，这个事件会阻止当前的默认行为；可以帮助简化常用代码的编写。

```html
<body>
  <div id="root"></div>
  <script>
    const app = Vue.createApp({
      data() {
        return {
          message: '<b>hello</b>',
          show: true,
          disabled: false,
          event: 'click', // 动态参数的写法
        }
      },
      methods: {
        handleClick() {
          console.log('事件绑定')
        },
        handlePrevent() {
          console.log('阻止默认行为')
        },
      },
      template: `
        <input v-bind:disabled="disabled"/>
        <div>{{ Math.max(1,2) }}</div>
        <div v-html="message"></div>
        <div v-once>{{ message }}</div>
        <div v-if="show">{{ message }}</div>
        <div v-on:click="handleClick">click</div>
        <div @[event]="handleClick">click2</div>
        <form action="https:www.baidu.com" @click.prevent="handlePrevent">
          <button type="submit">提交</button>
        </form>
        `,
    })
    const vm = app.mount('#root')
  </script>
</body>
```

#### 2-8 数据，方法，计算属性和侦听器

computed：当计算属性依赖的内容发生变更时，才会重新执行计算。

```javascript
data(){
	return{
		count:5,
		price:2,
	}
},
computed: {
	// 定义计算属性 total; 这个数据是由其他的几个数据算出来的，当其他数据变化的时候，它也会跟着变
	total() {
		return  this.count * this.price
	}
},
```

watch：  侦听器，通过 watch 可以监听变量的改变，然后去做一些异步的操作

```javascript
data(){
		return{
			count:5,
			price:2,
			newTotal:10
		}
},
watch:{
  // count 发生变化时，函数会执行
	count(current,prev){
		this.newTotal = current * this.price
	},
}
```

- computed 和 method 都能实现的一个功能，建议使用 computed，因为有缓存
- computed 和 watcher 都能实现的功能，建议使用 computed 因为更加简洁。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const app = Vue.createApp({
        data() {
          return {
            message: 'hello',
            count: 5,
            price: 2,
            newTotal: 10,
          }
        },
        // 侦听器；通过watch可以监听变量的改变，然后去做一些异步的操作
        watch: {
          price() {
            setTimeout(() => {
              console.log('price changed')
            }, 3000)
          },
          // count 发生变化时，函数会执行
          count(current, prev) {
            this.newTotal = current * this.price
          },
        },
        computed: {
          // 当计算属性依赖的内容发生变更时，才会重新执行计算
          // 定义计算属性 total; 这个数据是由其他的几个数据算出来的，当其他数据变化的时候，我也会跟着变
          total() {
            return Date.now()
            // return  this.count * this.price
          },
        },
        methods: {
          handleClick() {
            console.log('click', this.message)
          },
          // 可以在插值表达式里面使用
          formString(string) {
            return string.toUpperCase()
          },
          // 只要页面重新渲染，才会重新计算
          getTotal() {
            return Date.now()
            // return  this.count * this.price
          },
        },
        template: `
      <div @click="handleClick">{{ formString(message) }}</div>
      <div>{{ total }}</div>
      <div>{{ getTotal() }}</div>
      <div>{{ newTotal }}</div>
      `,
      })
      const vm = app.mount('#root')
    </script>
  </body>
</html>
```

#### 2-10 样式绑定语法

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <style>
      .red {
        color: red;
      }
      .green {
        color: green;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const app = Vue.createApp({
        data() {
          return {
            classString: 'red',
            classObject: { red: true, green: true }, // 通过对象的方式来判断你到点要不要展示这个类
            classArray: ['red', 'green', { brown: true }],
            styleObject: { color: 'orange' }, // 行内样式使用对象的形式
          }
        },
        template: `
          <div :class="classString">hello world</div>
          <div :class="classObject">hello world</div>
          <div :class="classArray">hello world
            <demo class="red" />
          </div>
          <div :style="styleObject">orange</div>
        `,
      })

      app.component('demo', {
        template: `
        <div :class="$attrs.class">one</div>
        <div>two</div>
      `,
      })

      const vm = app.mount('#root')
    </script>
  </body>
</html>
```

#### 2-11 条件渲染

- 只有 show 这个变量为 true 的时候 div 标签才会显示；v-if 通过控制这个元素在 dom 上存在与否来控制展示隐藏
- v-show 是通过样式来控制
- 如果频繁改变 dom 展示与否的话，使用 v-show,因为它不会频繁销毁 dom，对性能好点

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const app = Vue.createApp({
        data() {
          return {
            show: false,
            conditionOne: false,
            conditionTwo: true,
          }
        },

        template: `
        <div v-if="show">hello world</div>

        <div v-if="conditionOne">if</div>
        <div v-else-if="conditionTwo">else if</div>
        <div v-else>else</div>

        <div v-show="show">hello world</div>
      `,
      })
      const vm = app.mount('#root')
    </script>
  </body>
</html>
```

#### 2-12 列表循环渲染

- 做数据循环的时候可以使用 v-for 指令；循环的每一项尽量给个 key 值，就会有效提升 vue 的性能
- 如果循环的时候做一些判断的时候，v-for 和 v-if 在一个标签是有问题的，v-for 优先级会更高，如果必须要做判断，在里面再包一层。
- 包的这层可以使用占位符 template ，省得多出一个 div

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const app = Vue.createApp({
        data() {
          return {
            listArray: ['hello', 'world', 'haha'],
            listObject: { firstName: 'dell', lastName: 'lee' },
          }
        },
        methods: {
          hanldeAddArray() {
            // 1.使用数组的变更函数push, pop, shift, unshift, splice, sort, reverse
            this.listArray.push('hello')
            // this.listArray.pop()
            // this.listArray.shift()
            // this.listArray.unshift('heihei')
            // this.listArray.reverse()

            // 2.直接替换数组
            // this.listArray = ['bye', 'world']
            // this.listArray = ['bye','world'].filter(()=> item => item === 'bye')

            // 3.直接更新数组的内容
            // this.listArray[1] = 'hello'
          },
          hanldeAddObj() {
            // 直接添加对象的内容，也可以自动的展示出来
            this.listObject.age = 100
            this.listObject.sex = 'male'
          },
        },

        template: `
        <div>
          <div v-for="(item,index) in listArray" :key="index">
            {{item}} -- {{index}}  
          </div>
          <button @click="hanldeAddArray">数组新增</button>
          
          <template v-for="(value,key,index) in listObject">
            <div v-if="key !== 'lastName'">
              {{ value }} -- {{key}} -- {{index}}
            </div>
          </template>
          <button @click="hanldeAddObj">对象新增</button>
        </div>
      `,
      })
      const vm = app.mount('#root')
    </script>
  </body>
</html>
```

#### 2-15 事件绑定

- 事件修饰符
  - @click.stop，停止向外做这个事件的冒泡
  - @click.self，self 表示这个事件的触发必须是我自己这个 dom 标签的触发才会执行。
  - @click.prevent，阻止默认行为
  - @click.capture，在事件的捕获阶段触发父级元素的事件
  - @click.once，事件只执行一次
- 按键修饰符
  - @keydown.enter，当你按回车的时候的才会执行
  - 还有 tab, delete, esc, up, down；通过这些修饰符来修饰按键事件的绑定
- 鼠标修饰符
  - @click.left， @click.right，@click.middle
- 精确修饰符 exact：当你按住 ctrl 这个键才会触发
  - @click.ctrl.exact

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script>
      const app = Vue.createApp({
        data() {
          return {
            counter: 0,
          }
        },
        methods: {
          handleClick(num, event) {
            // 要把原生的事件 $event 传入
            console.log('🤩  handleClick  event', event)
            this.counter += num
          },
          handleClick1() {
            console.log(1)
          },
          handleClick2() {
            console.log(2)
          },
          handleDivClick() {
            console.log('div click')
          },
          handleBtnClick() {
            console.log('禁止冒泡')
          },
          handleKeyDown() {
            console.log('keydown')
          },
          handleExact() {
            console.log('handleExact')
          },
        },
        template: `<div>
          {{counter}}
          <button @click="handleClick(2,$event)">button</button>

          <button @click="handleClick1(), handleClick2()">多个函数</button>

          <div @click="handleDivClick">
            <button @click.stop="handleBtnClick">禁止冒泡</button>
          </div>

          <input @keydown.enter="handleKeyDown" />

          <button @click.ctrl.exact="handleExact">精确修饰符</button>
        </div>`,
      })
      const vm = app.mount('#root')
    </script>
  </body>
</html>
```

#### 2-16 表单中双向绑定指令的使用

```html
<!DOCTYPE html>
<html lang="en">
   
  <head>
       
    <meta charset="UTF-8" />
       
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       
    <title>Document</title>
       
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
     
  </head>
   
  <body>
       
    <div id="root"></div>
       
    <script>
      const app = Vue.createApp({
        data() {
          return {
            message: 'hello',
            ischeck: [],
            isradio: '',
            options: [
              {
                text: 'a',
                value: { value: 'a' },
              },
              {
                text: 'b',
                value: { value: 'b' },
              },
              {
                text: 'c',
                value: { value: 'c' },
              },
            ],
            selectValue: [],
            value: '11',
            num: 11,
          }
        }, // lazy修饰符：不让数据快速变化，失去焦点再去变化 // number修饰符：进行数字的转换 // trim修饰符：把前后输入的空格去掉
        template: `<div>
          <div>
            {{message}}
            <input v-model="message" />
            <textarea v-model="message"/>  
          </div>
          <div>
            {{ischeck}}--->
            dell <input type="checkbox" v-model="ischeck" value="dell"/>
            lee <input type="checkbox" v-model="ischeck" value="lee"/>
            hello <input type="checkbox" v-model="ischeck" value="hello"/>
          </div>
          <div>
            {{isradio}}--->
            dell <input type="radio" v-model="isradio" value="dell"/>  
            lee <input type="radio" v-model="isradio" value="lee"/>  
          </div>
          <div>
            {{selectValue}}--->
            <select v-model="selectValue" multiple>
              <option v-for="item in options" :value="item.value"> {{item.text}} </option>  
            </select>  
          </div>
          <div>
            修饰符：{{value}}
            <input v-model.lazy="value"/>
            <input v-model.number="num" type="number">
            <input v-model.trim="value">
          </div>
        </div>`,
      })
      const vm = app.mount('#root')
    </script>
     
  </body>
</html>
```

### <span id="jump3">第 3 章 探索组件的理念</span>

#### 3-1 组件的定义及复用性，局部组件和全局组件

理念：把一个复杂的网页拆成很多小的部分来进行维护。
组件具备复用性，组件里面的数据是被当前这个组件所独享的，而不会和其他组件共享。
局部组件：定义一个常量，要注册之后才能使用，声明之后再模板就可以直接用了，建议大写字母开头，驼峰命名
全局组件，只要定义了，处处可以使用，性能不高，但是使用起来简单。建议小写字母单词，中间横线间隔。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script>
      // 局部组件：定义一个常量，要注册之后才能使用，声明之后再模板就可以直接用了
      const CounterLocal = {
        template: `<div>局部组件</div>`,
      }
      const app = Vue.createApp({
        components: { CounterLocal },
        template: `
        <div> 
          <CounterLocal /> 
          <counter-parent />
          <counter />
        </div>
      `,
      })

      // 全局组件，只要定义了，处处可以使用，性能不高，但是使用起来简单
      app.component('counter-parent', {
        template: `<counter />`,
      })
      app.component('counter', {
        data() {
          return {
            count: 1,
          }
        },
        template: `<div @click="count += 1">{{count}}</div>`,
      })
      const vm = app.mount('#root')
    </script>
  </body>
</html>
```

#### 3-4 组件间传值及传值校验

- type: String, Boolean, Number, Object, Array, Symbol, Funciton
- required 必填选项
- default 默认值
- validator 深度校验

```javascript
<script>
  const app = Vue.createApp({
  data(){
    return {
      num: 2000
    }
  },  
  template: `<div><test :content="num" /></div>`
})

app.component('test',{
  // props做类型校验
  props:{
    content: {
      type: Number,
      default:22,
      required: true,
      validator: function(value){
        return value < 1000
      }
    }
  },
  template:`<div>{{content}}</div>`
})

const vm = app.mount('#root')
  </script>
```

#### 3-5 单向数据流的理解

单项数据流：子组件可以使用父组件传递过来的数据，但是绝对不能修改传递过来的数据。
属性传的时候，使用 content-abc 这种命名，接的时候，使用 contentAbc 命名。
多个值时候可以使用 v-bind="params"

```javascript
const app = Vue.createApp({
  data() {
    return {
      params: {
        content: 2000,
        a: 111,
        b: 222,
        c: 333,
      },
      content: 'abc',
    }
  },
  template: `<div>
          <test v-bind="params" :content-abc="content"/>
          <counter :count="params.a"/>
        </div>`,
})
// 单项数据流
app.component('counter', {
  props: ['count'],
  data() {
    return {
      myCount: this.count,
    }
  },
  template: `
        <div @click="myCount += 1">单向数据流：{{myCount}}<button>增加</button></div>
      `,
})

app.component('test', {
  props: {
    contentAbc: String,
    content: Number,
    a: Number,
    b: Number,
    c: Number,
  },
  template: `<div>
    <div>{{contentAbc}}</div>
    {{ content }}--{{a}}--{{b}}--{{c}}
  </div>`,
})
const vm = app.mount('#root')
```

#### 3-6 Non-Props 属性是什么

Non-Props 属性:父组件给子组件传递内容的是时候， 子组件不通过 props 来接收；一般用作样式修饰

```javascript
<script>
	const app = Vue.createApp({
		template: `<div>
		<nonProps msg="hello" msg1="hello2"/>
	</div>`
	})
	app.component('nonProps', {
		inheritAttrs: false, // 不继承父组件传递过来的 Non-Props 属性
		template: `
		<div>Non-Props---11</div>
		<div :msg="$attrs.msg">Non-Props---11</div>
	`
	})
	const vm = app.mount('#root')
</script>
```

#### 3-7 父子组件间如何通过事件进行通信

```javascript
const app = Vue.createApp({
  data() {
    return {
      count: 1,
      count2: 2,
    }
  },
  methods: {
    handleAddOne(param1, param2) {
      console.log('监听addOne事件', param2)
      this.count += param2
    },
  },
  template: `<div>
          <test :count="count" @add="handleAddOne"/>
          <counter v-model="count2"/>
        </div>`,
})

app.component('test', {
  props: ['count'],
  emits: {
    // 通过emtis向外触发的参数做一些校验
    add: (count) => {
      if (count > 0) {
        return true
      }
      return false
    },
  },
  methods: {
    handleClick() {
      // 向父组件触发一个 addOne 的事件
      this.$emit('add', 2, 4)
    },
  },
  template: `<div @click="handleClick">{{count}}</div>`,
})

// 直接在父组件使用v-model
app.component('counter', {
  props: ['modelValue'], // 固定写法
  methods: {
    handleClick() {
      this.$emit('update:modelValue', this.modelValue + 3)
    },
  },
  template: `<div @click="handleClick">{{modelValue}}</div>`,
})

const vm = app.mount('#root')
```

#### 3-9 组件间双向绑定高级内容

```javascript
const app = Vue.createApp({
  data() {
    return {
      count: 1,
      count1: 1,
    }
  },
  template: `<counter v-model:count="count" v-model:count1="count1"/>`,
})

app.component('counter', {
  props: ['count', 'count1'],
  methods: {
    handleClick() {
      this.$emit('update:count', this.count + 1)
    },
    handleClick1() {
      this.$emit('update:count1', this.count1 + 2)
    },
  },
  template: `
        <div @click="handleClick">{{count}}</div>
        <div @click="handleClick1">{{count1}}</div>
      `,
})

const vm = app.mount('#root')
```

Vue 自定义修饰符：[https://www.cnblogs.com/-LemonWater-/p/16617043.html](https://www.cnblogs.com/-LemonWater-/p/16617043.html)

```javascript
// 父组件传值时添加修饰器
<my-component v-model.capitalize="myText" />

// 子组件接收修饰器并定义功能
props: {
    modelValue: String,
    // 接收v-model的修饰器
    modelModifiers: {
        default: () => ({})
    }
},
created() {
    // 打印v-model挂载的修饰器
    console.log(this.modelModifiers) // { capitalize: true }
},
methods:{
    emitValue(e) {
        let value = e.target.value
        // 如果v-model 挂载了 `capitalize`
        if (this.modelModifiers.capitalize) {
            // 把首位大写并拼接除首位的剩余字符串
            value = value.charAt(0).toUpperCase() + value.slice(1)
            console.log(value)
        }
        // 把处理后的字符串赋给 modelValue
        this.$emit('update:modelValue', value)
    }
}
```

#### 3-10 使用插槽和具名插槽解决组件内容传递问题

slot 插槽，通过<slot></slot>去调用传递进来的内容即可；用于 dom 或者标签的传递。
slot 中使用的数据，作用域的问题。父模版里调用的数据属性,使用的都是父模版里的数据；子模版里调用的数据属性,使用的都是子模版里的数据。
slot 默认值设定：<slot>default value</slot>；如果没传插槽，就会使用默认值 default value。

```javascript
// slot中使用的数据，作用域的问题。父模版里调用的数据属性,使用的都是父模版里的数据；子模版里调用的数据属性,使用的都是子模版里的数据
// slot默认值设定：<slot>default value</slot>；如果没传插槽，就会使用默认值 default value
const app = Vue.createApp({
  data() {
    return {
      text: '提交',
    }
  },
  template: `
			<myForm>
				<div>div{{text}}</div>
			</myForm>
			<myForm>
				<button>button{{text}}</button>
			</myForm>
			<myForm>
				<button>button{{text}}</button>
			</myForm>
		`,
})
app.component('myForm', {
  methods: {
    handleClick() {
      console.log(222)
    },
  },
  template: `
			<div>
				<input />
				<span @click="handleClick">
					<slot>default value</slot>
				</span>
			</div>`,
})

const vm = app.mount('#root')
```

具名插槽：要把插槽拆成几个部分，然后在下面分开的调用，通过 name 去做区分。
插槽简写：v-slot:header -> #header

```javascript
const app = Vue.createApp({
  template: `
			<layout>
				<template v-slot:header>
					<div>header</div>
				</template>
				<template v-slot:footer>
					<div>footer</div>
				</template>
			</layout>
		`,
})

app.component('layout', {
  template: `
			<div>
				<slot name="header"></slot>
				<div>content</div>
				<slot name="footer"></slot>
			</div>
		`,
})
const vm = app.mount('#root')
```

#### 3-12 作用域插槽

作用域插槽：当子组件渲染的内容要由父组件决定的时候，父组件可以调用子组件里面的数据。
调用 slot 的时候把数据传给 slot，然后 slot 通过 v-slot="{item}" 进行接收

```javascript
<script>
	const app = Vue.createApp({
		template: `
			<list v-slot="{item}">
					<span>{{item}}</span>
			</list>
		`
	})
	app.component('list',{
		data(){
			return{
				list:['1','2','3']
			}
		},
		template:`
			<div>
				<slot v-for="item in list" :item="item"/>
			</div>
		`
	})

	const vm = app.mount('#root')
</script>
```

#### 3-13 动态组件和异步组件

动态组件：根据数据的变化，结合 compoent 这个标签，来随时动态切换组件的显示。
`<component :is="currentItem" />`
keep-alive:当我这个组件第一次渲染的时候，会把里面输入的状态都记录下来，再用时会把缓存的数据拿过来用。两者搭配使用

```javascript
<script>
	const app = Vue.createApp({
		data(){
			return{
				currentItem:'input-item'
			}
		},
		methods:{
			handleClick(){
				if(this.currentItem == 'input-item'){
					this.currentItem = 'common-item'
				}else{
					this.currentItem = 'input-item'
				}
			}
		},
		template: `
			<keep-alive>
				<component :is="currentItem" />
			</keep-alive>
			<button @click="handleClick">切换</button>
		`
	})

	app.component('input-item',{
		template:`<input />`
	})

	app.component('common-item',{
		template:`<div>hello world</div>`
	})

	const vm = app.mount('#root')
</script>
```

异步组件：可以通过异步的方式动态加载一些其他的组件，带来的好处就是可以把大型的项目拆分成很多小的 js 文件，然后在需要用到这些小的 js 文件，再去引入这些 js 文件进行使用。

#### 3-14 基础语法知识点查缺补漏

v-once: 标签只被渲染一次，后面数据发生变化也不要在渲染。
ref：实际上是获取 Dom 节点/组件引用的一个语法。

```javascript
const app = Vue.createApp({
  data() {
    return {
      num: 1,
    }
  },
  mounted() {
    // 获取dom
    console.log(this.$refs.count)
    // 也可以通过引用来调用子组件方法
    this.$refs.common.sayHello()
  },
  template: `<div @click="num += 1" v-once>
          <div ref="count">{{num}}</div>
          <common-item ref="common"/>
        </div>`,
})

app.component('common-item', {
  methods: {
    sayHello() {
      console.log('hello')
    },
  },
  template: `hello`,
})

const vm = app.mount('#root')
```

provide / inject：多层组件传值，provide 提供数据，inject 直接使用。

```javascript
const app = Vue.createApp({
  data() {
    return {
      num: 1,
    }
  },
  provide() {
    return {
      count: this.num,
    }
  },
  template: `<div><child/></div>`,
})

// 子组件
app.component('child', {
  template: `<child-child />`,
})
// 孙子组件
app.component('child-child', {
  inject: ['count'], // 直接使用
  template: `<div>{{count}}</div>`,
})
```

### <span id="jump4">第 4 章 Vue 中的动画</span>

#### 4-1 使用 Vue 实现基础的 CSS 过渡与动画效果

过渡：从一个状态变成另一个状态，比如颜色。
动画：一个元素运动的情况。

```html
<style>
  /* 动画 */
  @keyframes leftToRight {
    0% {
      transform: translateX(0px);
    }
    50% {
      transform: translateX(100px);
    }
    100% {
      transform: translateX(0px);
    }
  }
  .animation {
    animation: leftToRight 3s;
  }
  /* 过渡 */
  .transition {
    transition: 3s background-color ease;
  }
  .blue {
    background-color: blue;
  }
  .green {
    background-color: green;
  }
</style>
<script>
  const app = Vue.createApp({
    data() {
      return {
        animate: {
          animation: false,
        },
        styleObj: {
          background: 'blue',
        },
      }
    },
    methods: {
      handleClick() {
        this.animate.animation = !this.animate.animation
      },
      handleTran() {
        if (this.styleObj.background === 'blue') {
          this.styleObj.background = 'green'
        } else {
          this.styleObj.background = 'blue'
        }
      },
    },
    template: `
    <div>
      <div :class="animate">这是动画</div>
      <button @click="handleClick">切换</button>  
      <div class="transition" :style="styleObj">这是过渡</div> 
      <button @click="handleTran">切换</button>  
    </div>`,
  })

  const vm = app.mount('#root')
</script>
```

#### 4-2 使用 transition 标签实现单元素组件的过渡和动画效果

单元素/单组件的入场出场动画。
enter-active-class：自定义的 class 名字可以帮助我们很方便的和第三方库 css 动画库相结合。
<transition :duration="1000"> 通过 duration 控制动画时长。

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
/>
<style>
  @keyframes shake {
    0% {
      transform: translateX(-100px);
    }

    50% {
      transform: translateX(-50px);
    }

    100% {
      transform: translateX(50px);
    }
  }

  /* 不写name就以 v 开头 */
  .v-enter-from {
    /* 出场动画 */
    color: red;
  }

  .v-enter-to {
    /* 入场动画 */
  }

  /* 整个动画过程中要怎么执行这个动画 */
  .v-enter-active {
    animation: shake 2s;
    transition: color 2s ease-in;
  }

  .v-leave-active {
    color: red;
    animation: shake 2s;
    transition: all 2s ease-in;
  }
</style>
<script>
  const app = Vue.createApp({
    data() {
      return {
        show: false,
      }
    },
    methods: {
      handleClick() {
        this.show = !this.show
      },
      handleBeforeEnter(el) {
        el.style.color = 'red'
      },
      // js执行动画效果
      handleEnterAcitve(el, done) {
        const animation = setInterval(() => {
          const color = el.style.color
          if (color === 'red') {
            el.style.color = 'green'
          } else {
            el.style.color = 'red'
          }
        }, 1000)

        setTimeout(() => {
          clearInterval(animation) // 清楚动画
          done()
        }, 3000)
      },
      handleEnterEnd() {
        alert('js动画效果')
      },
    },
    template: `
  <div>
    <transition :duration="{enter:1000, leave:5000}">
      <div v-if="show">单元素</div>
    </transition>

    <transition  
      enter-active-class="animate__animated animate__tada"
      leave-active-class="animate__animated animate__tada"
    >
      <div v-if="show">animate 样式</div>
    </transition>

    <transition 
      :css="false" 
      @before-enter="handleBeforeEnter"
      @enter="handleEnterAcitve"
      @after-enter="handleEnterEnd"
    >
        <div v-if="show">js动画</div>
    </transition>

    <p>
      <button @click="handleClick">切换</button>  
    </p>
  </div>`,
  })

  const vm = app.mount('#root')
</script>
```

#### 4-5 组件和元素切换动画的实现

#### 4-7 列表动画

列表动画使用 transition-group 包裹，然后进行 css 动画编写。.v-move 也可以对其他数字进行动画效果。

```html
<style>
  .v-enter-from {
    opacity: 0;
    transform: translateY(30px);
  }
  .v-enter-active {
    transition: all 1s ease-in;
  }
  .v-enter-to {
    opacity: 1;
    transform: translateY(0px);
  }
  .v-move {
    transition: all 1s ease-in;
  }
  .list-item {
    display: inline-block;
    margin-right: 20px;
  }
</style>

<script>
  const app = Vue.createApp({
    data() {
      return {
        list: ['1', '2', '3'],
      }
    },
    methods: {
      handleClick() {
        this.list.unshift(this.list.length + 1)
      },
    },
    template: `
  <div>
    <transition-group>
      <span class="list-item" v-for="item in list" :key="item">{{item}}</span>
    </transition-group>
    <p>
      <button @click="handleClick">增加</button>  
    </p>
  </div>`,
  })

  const vm = app.mount('#root')
</script>
```

#### 4-8 状态动画

状态动画，如果做一些 svg 这种可以通过数据描述图片效果的时候，就可以在数据里面控制一些变量，svg 里面的坐标根据这些数据进行变化。

```html
<script>
  const app = Vue.createApp({
    data() {
      return {
        number: 1,
        animateNumber: 1,
      }
    },
    methods: {
      handleClick() {
        this.number = 10
        if (this.animateNumber < this.number) {
          const animation = setInterval(() => {
            this.animateNumber += 1
            if (this.animateNumber === 10) {
              clearInterval(animation)
            }
          }, 100)
        }
      },
    },
    template: `
  <div>
      <span>{{animateNumber}}</span>
    <p>
      <button @click="handleClick">增加</button>  
    </p>
  </div>`,
  })

  const vm = app.mount('#root')
</script>
```

### <span id="jump5">第 5 章 Vue 中的高级语法</span>

#### 5-1 Mixin 混入的基础语法

mixin 混入：就是把一个对象混入到组件里。

- 组件 data ，methods 优先级高于 mixin data 优先级。 当你组件没有当前数据的时候，就会使用混入进来的数据。
- 生命周期函数，先执行 mixin 里面的，再执行组件里面的
- 自定义的属性，组件种的属性优先级高于 mixin 属性的优先级

```html
<script>
  const myMixin = {
    // 局部mixin
    data() {
      return { number: 2, count: 1 }
    },
    created() {
      console.log('先执行 mixin')
    },
  }
  const app = Vue.createApp({
    data() {
      return { number: 1 }
    },
    mixins: [myMixin],
    created() {
      console.log('后执行组件')
    },
    methods: {
      handleClick() {
        console.log('handleClick')
      },
    },
    template: `
      <div>
        <div>{{number}}</div>
        <child />
        <all />
        <button @click="handleClick">增加</button>
      </div>
    `,
  })

  app.component('child', {
    mixins: [myMixin], //必须得在子组件再去用一下
    template: `<div>{{count}}</div>`,
  })

  // 全局mixin：它会默认注入到每个组件，直接可以用。不推荐大家使用
  app.mixin({
    data() {
      return { number: '全局mixin', count: 1 }
    },
  })

  app.component('all', {
    template: `<div>{{number}}</div>`,
  })

  const vm = app.mount('#root')
</script>
```

#### 5-3 开发实现 Vue 中的自定义指令

自定义指令 directive。定义了一个 pos 的自定义指令，使用它前面加个 v-就行。

```html
<script>
  // 局部的focus自定义指令
  const directives = {
    focus: {
      mounted(el) {
        el.focus()
      },
    },
  }
  const app = Vue.createApp({
    data() {
      return {
        distance: 100,
      }
    },
    directives: directives,
    template: `
        <div>
          <input v-focus />
          <div v-pos:left="distance" class="header">postion</div>
        </div>
      `,
  })

  // 定义了一个全局pos的自定义指令，使用它前面加个v-就行
  app.directive('pos', {
    mounted(el, binding) {
      el.style[binding.arg] = binding.value + 'px'
    },
    updated(el, binding) {
      el.style[binding.arg] = binding.value + 'px'
    },
  })

  // 使用一个函数对包含了mounted和updated 进行简写
  app.directive('pos1', (el, binding) => {
    el.style[binding.arg] = binding.value + 'px'
  })

  const vm = app.mount('#root')
</script>
```

#### 5-5 Teleport 传送门功能

teleport 传送门：比如做一些模态框，就可以把你的 dom 元素放到另一个元素。

```html
<style>
  .area {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 300px;
    background: green;
  }
  .mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #000;
    opacity: 0.5;
    color: #fff;
    font-size: 100px;
  }
</style>
<script>
  const app = Vue.createApp({
    data() {
      return {
        show: false,
      }
    },
    methods: {
      handleBtn() {
        this.show = !this.show
      },
    },
    // 不渲染在area这个标签上，而是传送到body标签上去
    template: `
    <div class="area">
      <button @click="handleBtn">按钮</button>  
      <teleport to="body">
        <div class="mask" v-show="show">hello</div>
      </teleport>
    </div>
  `,
  })

  const vm = app.mount('#root')
</script>
```

#### 5-7 插件的定义和使用

plugin 插件，也是把通用性的功能封装起来。

- app：就是 Vue 的实例。
- options：额外的参数会放到 options 里。
- app.use(myPlugin, {name:'dell'}) // 使用 myPlugin 这个插件

```javascript
const myPlugin = {
  install(app, options) {
    // app：就是Vue的实例
    // options：额外的参数会放到options里
    app.provide('name', 'dell lee') // 在app里扩展了这个名字
    app.directive('focus', {
      // 扩展自定义指令
      mounted(el) {
        el.focus()
      },
    })
    app.mixin({
      // 扩展mixin
      mounted() {
        console.log('mixin')
      },
    })
  },
}

const app = Vue.createApp({
  template: `<div><test /></div>`,
})
app.component('test', {
  inject: ['name'],
  template: `
      <div>{{name}}</div>
      <input v-focus />
    `,
})

app.use(myPlugin, { name: 'dell' }) // 使用myPlugin这个插件

const vm = app.mount('#root')
```

#### 5-9 数据校验插件开发实例

对数据做检验的插件，扩展 vue 的语法想做一些自定义的时候，完全可以通过 plugin 来做。

```javascript
const app = Vue.createApp({
  data() {
    return {
      name: 'dell',
      age: 11,
    }
  },
  rules: {
    age: {
      validate: (age) => {
        return age > 25
      },
      message: '太年轻了',
    },
  },
  template: `<div>name:{{name}}, age:{{age}}</div>`,
})

// 对数据做检验的插件,扩展vue的语法想做一些自定义的时候，完全可以通过plugin来做。
const validatePlugin = (app, options) => {
  app.mixin({
    created() {
      for (let key in this.$options.rules) {
        const item = this.$options.rules[key]
        this.$watch(key, (value) => {
          const result = item.validate(value)
          if (!result) console.log(item.message)
        })
      }
    },
  })
}

app.use(validatePlugin)

const vm = app.mount('#root')
```

### <span id="jump6">第 6 章 Composition API</span>

#### 6-1 Setup 函数的使用

setup 函数是在 created 实例被完全初始化之前执行的函数。

```javascript
const app = Vue.createApp({
  template: `
        <div @click="handleClick">{{name}}</div>
      `,

  setup() {
    return {
      name: 'dell',
      handleClick: () => {
        console.log(2)
      },
    }
  },
})

const vm = app.mount('#root')
```

#### 6-2 ref，reactive 响应式引用的用法和原理

原理：通过 proxy 对数据进行封装，当数据变化时，触发模版等内容的更新

- ref 处理基础类型的数据
- reactive 处理非基础类型的数据，比如对象数组
- readonly 对响应式的内容做一个限制，不可修改
- toRefs:把一个 reactive 返回的对象转化成 ref 一种方式；创建一个 reactive 的对象你直接解构的话再模板是不能使用的，不具备响应式，如果想具备响应式，就调用 toRefs 转换就可以解构，再模板就可以具备响应式。

```javascript
const app = Vue.createApp({
  template: `
        <div>{{name}}---{{nameObj.age}}</div>
      `,
  setup() {
    // proxy , 'dell’变成proxy({value: 'dell'})这样的一个响应式引用
    // const { ref } = Vue
    // let name = ref('dell')
    // setTimeout(() => {
    //   name.value = 'lee'
    // })
    // return {
    //   name,
    // }

    // proxy, { age: 11 }变成proxy({ age: 11}）这样的一个响应式引用
    const { reactive, readonly } = Vue
    const nameObj = reactive({ age: 11 })
    const copynameObj = readonly(nameObj)
    setTimeout(() => {
      nameObj.age = 22
      copynameObj.age = 33
    }, 1000)
    return {
      nameObj,
      copynameObj,
    }
  },
})

const vm = app.mount('#root')
```

#### 6-4 toRef 以及 context 参数

toRef：可能出现对象里面没有对应的属性值的时候，又想让值具备响应式的时候

```javascript
// const app = Vue.createApp({
//   template: `
//   <div>{{data.name}}--{{data.age}}</div>
// `,
//   setup(props, context) {
//     const { reactive, toRef } = Vue
//     const data = reactive({ name: 'dell' })
//     const age = toRef(data, 'age')
//     setTimeout(() => {
//       data.age = 11
//     }, 1000)
//     return {
//       data,
//     }
//   },
// })

const app = Vue.createApp({
  methods: {
    handleChange() {
      console.log('context的emit数据')
    },
  },
  template: `
        <child @change="handleChange">parent</child>
      `,
})

app.component('child', {
  template: `
          <div @click="handleClick">child</div>
        `,
  setup(props, context) {
    const { attrs, slots, emit } = context
    console.log(attrs) // 指的是父组件传递过来的 None - Props属性

    console.log(slots.default()) // 插槽内容可以直接通过slots来获取
    // const { h } = Vue
    // return () => h('div', {}, slots.default())

    function handleClick() {
      emit('change') // 可以实现传统的this.$emit向上触发事件的功能
    }
    return {
      handleClick,
    }
  },
})
const vm = app.mount('#root')
```

#### 6-6 使用 Composition API 开发 TodoList

可以把数据和一些数据的操作摘出来，封装成小的函数进行维护

```javascript
// 可以把数据和一些数据的操作摘出来，封装成小的函数进行维护
// 关于list操作的内容进行了封装
const listRelativeEffect = () => {
  const { reactive } = Vue
  const list = reactive([])
  const addItemToList = (item) => {
    list.push(item)
  }
  return {
    list,
    addItemToList,
  }
}
// 关于inputValue 操作的内容进行了封装
const inputRelativeEffect = () => {
  const { ref } = Vue
  const inputValue = ref('')
  const handleInputChange = (e) => {
    inputValue.value = e.target.value
  }
  return {
    inputValue,
    handleInputChange,
  }
}

const app = Vue.createApp({
  setup() {
    // 流程调度中转，知道我要操作list,inputValue，所以从不同的地方找到
    const { list, addItemToList } = listRelativeEffect()
    const { inputValue, handleInputChange } = inputRelativeEffect()
    return {
      list,
      inputValue,
      addItemToList,
      handleInputChange,
    }
  },
  template: `
          <div>
            <div>
              <input :value="inputValue" @input="handleInputChange"/>
              <div>{{inputValue}}</div>
              <button @click="()=> addItemToList(inputValue)">提交</button>
            </div>
          </div>
          <ul>
            <li v-for="item in list" :key="item">{{item}}</li>
          </ul>
      `,
})

const vm = app.mount('#root')
```

#### 6-8 computed 方法生成计算属性

computed 计算属性：调用 computed 方法，里面接收一个回调函数，去返回一个通过去其他属性计算出来的新值

- get 方法就是读取他的内容
- set 方法对他做一些赋值

```javascript
const app = Vue.createApp({
  setup() {
    const { ref, computed } = Vue
    const count = ref(0)
    const handleAdd = () => {
      count.value += 1
    }
    //调用computed方法，里面接收一个回调函数，去返回一个通过去其他属性计算出来的新值
    // const countFive = computed(() => {
    //   return count.value + 5
    // })

    let countFive = computed({
      // get方法就是读取他的内容
      get: () => {
        return count.value + 5
      },
      // set方法对他做一些赋值
      set: (param) => {
        count.value = param - 5
      },
    })
    setTimeout(() => {
      countFive.value = 50
    }, 2000)

    return {
      count,
      countFive,
      handleAdd,
    }
  },
  template: `
          <div @click="handleAdd">
            {{count}} --- {{countFive}}
          </div>
      `,
})

const vm = app.mount('#root')
```

#### 6-9 watch 和 watchEffect 的使用和差异性

- watch 侦听器
  - 参数可以拿到原始和当前值，也可以侦听多个数据的变化，用一个侦听器承载
  - 具备一定的惰性 lazy
- watchEffect
  - 立即执行 没有惰性 immediate；比如一些异步的操作放这里
  - 加上{immediate:true}就会让他立即执行，就没有惰性
  - 不需要传递你要侦听的内容，自动会感知代码依赖，不需要传递很多参数，只要传递一个回调函数
  - 不能获取之前数据的值

```javascript
const app = Vue.createApp({
  setup() {
    const { reactive, toRefs, watch, watchEffect } = Vue
    const nameObj = reactive({ name: 'dell', englishName: 'lee' })

    // watch(
    //   // 可以侦听多个数据的变化，用一个侦听器承载
    //   [() => nameObj.name, () => nameObj.englishName],
    //   ([curName, curEng], [prevName, prevEng]) => {
    //     console.log(curName, prevName, '---', curEng, prevEng)
    //   },
    //   { immediate: true }
    // )

    // 立即执行 没有惰性 immediate；比如一些异步的操作放这里
    // 不需要传递你要侦听的内容，自动会感知代码依赖，不需要传递很多参数，只要传递一个回调函数
    // 不能获取之前数据的值
    const stop = watchEffect(() => {
      console.log(nameObj.name)
      setTimeout(() => {
        stop() // 五秒后侦听器失效
      }, 5000)
    })
    const { name, englishName } = toRefs(nameObj)
    return {
      name,
      englishName,
    }
  },
  template: `
          <div>
            <div>
              name：<input v-model="name"/>
              name：{{name}}
            </div>
            <div>
              Englishname：<input v-model="englishName"/>
              Englishname：{{englishName}}
            </div>
          </div>
      `,
})

const vm = app.mount('#root')
```

#### 6-11 生命周期函数的新写法

- beforeMount => onBeforeMount
- mounted => onMounted
- beforeUpdate =>onBeforeUpdated
- beforeUnmount => onBeforeUnmount
- unmouted => onUnmounted
- onRenderTracked：每次渲染后重新收集响应式依赖
- onRenderTriggered：每次触发页面重新渲染时自动执行
- 没有 beforeCreate 和 created 是因为这两个函数在 setup 函数之间，所以就没提供

```javascript
const app = Vue.createApp({
  setup() {
    const {
      ref,
      onBeforeMount,
      onMounted,
      onBeforeUpdate,
      onUpdated,
      onRenderTracked,
      onRenderTriggered,
    } = Vue
    const name = ref('dell')
    onBeforeMount(() => {
      console.log('onBeforeMount')
    })
    onMounted(() => {
      console.log('onMounted')
    })
    onBeforeUpdate(() => {
      console.log('onBeforeUpdate')
    })
    onUpdated(() => {
      console.log('onUpdated')
    })
    onRenderTracked(() => {
      console.log('onRenderTracked')
    })
    onRenderTriggered(() => {
      console.log('onRenderTriggered')
    })
    const handleClick = () => {
      name.value = 'lee'
    }
    return {
      name,
      handleClick,
    }
  },

  template: `
        <div @click="handleClick">{{name}}</div>
      `,
})

const vm = app.mount('#root')
```

#### 6-12 Provide, Inject, 模版 Ref 的用法

```javascript
const app = Vue.createApp({
  setup() {
    const { provide, ref, readonly } = Vue
    const name = ref('dell')
    provide('name', readonly(name))
    provide('changeName', (value) => {
      name.value = value
    })
    return {}
  },

  template: `
        <div><child /></div>
      `,
})

app.component('child', {
  setup() {
    const { inject } = Vue
    const name = inject('name')
    const changeName = inject('changeName')
    const handleClick = () => {
      // 调用父组件传递过来的这个方法去改
      // name.value = '11' // 在子组件直接改就会报错，约束单项数据流
      changeName('lee')
    }
    return { name, handleClick }
  },
  template: `
        <div @click="handleClick">{{name}}</div>
      `,
})

const vm = app.mount('#root')
```

### 第 7 章 Vue 项目开发配套工具讲解

#### 7-1 VueCLI 的使用和单文件组件

```lua
-- 安装nrm然后运行
npm install nrm -g
-- 就可以查看国内镜像源
nrm ls
-- 使用taobao镜像源
nrm use taobao
-- 全局安装脚手架工具
npm i -g @vue/cli
-- 通过脚手架安装vu项目
vue create first-demo
```

单文件组件：.vue 文件就代表了一个组件。

- template：代表组件的模板
- style：代表组件的样式
- script：代表组件的逻辑

#### 7-5 Vue-Router 路由的理解和使用

首先安装 vue-router，然后在 router 文件夹里面新建 index.js 进行路由配置。

- 同步加载路由：进入项目就会去加载页面对应的代码。
- 异步加载路由：只有访问 about 页面才会加载 about 页面的代码；可以让访问页面更快。

```javascript
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/Home.vue'
const routes = [
  // 不同的路径展示不同的组件
  {
    path: '/',
    name: 'Home',
    component: Home, // 同步加载
  },
  {
    path: '/about',
    name: 'About', // 异步加载路由：只有访问about页面才会加载about页面的代码；可以让访问页面更快
    component: () => import('../components/About.vue'),
  },
  {
    path: '/vuex',
    name: 'Vuex',
    component: () => import('../components/CompositionVuex.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
```

- router-link： 是跳转路由的标签
- router-view：负责展示当前路由对应的组件内容

```javascript
<template>
  <div>
    <!-- router-link是跳转路由的标签 -->
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/vuex">Vuex</router-link>
  </div>
    // router-view负责展示当前路由对应的组件内容
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
}
</script>
```

#### 7-8 VueX 的语法详解

首先安装 vuex，然后在 store 文件夹下新建 index.js
Vuex 数据管理框架；VueX 创建了一个全局唯一的仓库，用来存放全局的数据。

- mutation 里面只允许写同步代码，不允许写异步代码。commit 和 mutation 做关联
- action 里面可以做异步操作，dispatch 和 actions 做关联

1. dispatch 方法，派发一个 action，名字叫做 change。
2. 感知到 change 这个 action，执行 store 中 actions 下面的 change 方法。
3. commit 提交一个叫做 change 的数据改变。
4. mutation 感知到提交的 change 改变，执行 change 方法改变数据。

```javascript
<template>
  <div @click="handleClick">this is an about page</div>
  <div>{{ myName }}</div>
</template>

<script>
export default {
  name: 'About',
  computed: {
    myName() {
      return this.$store.state.name
    },
  },
  methods: {
    handleClick() {
      // 第一步，想改变数据，vuex要求第一步，必须派发一个change的action,
      this.$store.dispatch('change', 'hello world') // 如果只是修改数据 也可以直接使用commit // this.$store.commit('change')
    },
  },
}
</script>
```

```javascript
import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    name: 'dell',
    vuexName: '111',
  }, // mutation里面只允许写同步代码，不允许写异步代码 // commit和mutation做关联
  mutations: {
    // 第四步，对应的mutation被执行
    change(state, str) {
      // 第五步，在mutation里面修改数据
      state.name = str
    },
    changeVuexName(state, str) {
      state.vuexName = str
    },
  }, // action里面可以做异步操作 // dispatch和actions做关联
  actions: {
    // 第二步, store感知到你出发了一个叫做change的action，执行change方法
    change(store, str) {
      //第三步，提交一个commit 触发一个 mutation
      setTimeout(() => {
        store.commit('change', str)
      }, 1000)
    },
    changeVuex(store, str) {
      // 通过axios发送请求获取请求
      axios
        .get(
          'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd/api/shop/hot-list'
        )
        .then((res) => {
          const data = res.data.message
          store.commit('changeVuexName', data)
        })
    },
  },
  modules: {},
})
```

#### 7-11 CompositionAPI 中如何使用 VueX 及使用 axios

通过 `import { useStore } from 'vuex' `来使用。

```javascript
<template>
    <button @click="handleClick">改变vuex数据</button>  
  <div>{{ vuexName }}</div>
</template>

<script>
import { useStore } from 'vuex'
import { toRefs } from 'vue'
export default {
  setup() {
    const store = useStore()
    const { vuexName } = toRefs(store.state)
    const handleClick = () => {
      store.dispatch('changeVuex', 'compoisiton vuex')
    }
    return { vuexName, handleClick }
  },
}
</script>
```

```javascript
import { createStore } from 'vuex'
import axios from 'axios'
export default createStore({
  state: { name: 'dell', vuexName: '111' },
  mutations: {
    changeVuexName(state, str) {
      state.vuexName = str
    },
  },
  actions: {
    changeVuex(store, str) {
      // 通过axios发送请求获取请求
      axios
        .get(
          'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd/api/shop/hot-list'
        )
        .then((res) => {
          const data = res.data.message
          store.commit('changeVuexName', data)
        })
    },
  },
  modules: {},
})
```

### 第 8 章 “京东到家”项目首页开发

工程目录代码简介：

1. node_modules：依赖包，存储的一些第三方模块
2. public：存放的 html 模板
3. src ：源代码目录
4. .editorconfig：配置编辑器默认配置
5. babel.config.js：用的 babel 的配置
6. package.json：项目的依赖包 以及 npm script
7. .browserslistrc：打包编译过程中支持浏览器的问题

#### 基础样式集成

为了让我们写的样式再说有浏览器上保持一致，需要安装 normalize `yarn add normalize.css --save`
1rem = html fontsize 的大小：

```less
html {
  font-size: 20px; // 1rem = 20px
}
```

BEM CSS 命名规范：block_element--Modifier，element 要做一个状态修饰，就用--Modifier 语法。

```less
// &符号等于 .docker
.docker {
  &_item {
  } // 等价于 .docker_item{ }
}
```

把通用的 css 样式摘离出去，放到变量里面去管理

```html
<!-- 新建通过样式 viriables.scss $content-fontcolor:#333  -->
<!-- 使用如下 使用这个变量即可 -->
<style lang="scss">
  @import './style/viriables.scss';
  .positon {
    color: $content-fontcolor;
  }
</style>
```

mixins 管理通用 css 样式

```html
<!-- 文字省略效果 @mixin ellipsis{ overflow: hidden; white-space: nowrap; text-overflow: ellipsis; } -->
<style lang="scss">
  @import './style/mixins.scss';
  .positon {
    @include ellipsis; // 这样就有文字省略效果
  }
</style>
```

网速慢引起图片的抖动效果，使用 padding-bottom 撑开图片，避免抖动。

```html
<div class="banner">
  <img
    class="banner_img"
    src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
    alt=""
  />
</div>
<style>
  .banner {
    height: 0;
    overflow: hidden;
    padding-bottom: 25.4%; //图片的的25.4%
    &_img {
      width: 100%;
    }
  }
</style>
```

父级元素使用左右 padding 就会导致子元素左右留白

```html
<!-- 子元素使用margin即可解决 margin: 0 -0.18rem; -->
```

一个组件的样式只能作用于组件内部，不应该影响到外部的组件，只需要在我们的 css 标签上加上 scoped 属性，
表示我的这个样式只对我这个组件有效；可以避免不同组件样式之间的影响。

```html
<style lang="scss" scoped></style>
```

### 第 9 章 登陆功能开发

#### 1. 路由守卫实现基础登陆校验功能

- beforeEnter：这个函数会在你进入到路由之前执行，每个路由都有这个方法。
- beforeEach：在路由每次做切换的时候执行。

```javascript
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/Home'
import Login from '../views/login/Login'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login, // beforeEnter这个函数会在你进入到路由之前执行
    beforeEnter(to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'Home' }) : next()
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// beforeEach：在路由每次做切换的时候执行
// to：你要跳转到那个页面的信息
// from：你从哪里跳过来的信息
router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage
  if (isLogin || to.name === 'Login') {
    next() // 调用next让你正常往下执行
  } else {
    next({ name: 'Login' })
  }
})

export default router
```

```javascript
// 登录组件
<script>
import { useRouter } from "vue-router";
export default {
  name: "Login",
  setup() {
    const router = useRouter(); // 获取路由实例
    const handleLogin = () => {
      localStorage.isLogin = true;
      router.push({ name: "Home" });
    };
    return {
      handleLogin,
    };
  },
};
</script>
```

#### 2. 请求函数的封装

```javascript
import axios from 'axios'

// 创建一个promise对象，发送一个ajax请求
export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, {
        baseURL:
          'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
        headers: {
          //可以修改content-type类型
          'Content-Type': 'application/json',
        },
      })
      .then(
        (response) => {
          resolve(response.data)
        },
        (err) => {
          reject(err)
        }
      )
  })
}
```

```javascript
import { useRouter } from 'vue-router'
import { post } from '../../utils/request' // 引入对应的post方法

export default {
  name: 'Login',
  setup() {
    const data = reactive({
      password: '',
      username: '',
    })
    const router = useRouter() // 获取路由实例
    const handleLogin = async () => {
      try {
        const result = await post('/api/user/login', {
          username: data.username,
          password: data.password,
        })
        if (result?.errno === 0) {
          localStorage.isLogin = true
          router.push({ name: 'Home' })
        } else {
          alert('登录失败')
        }
        console.log(result)
      } catch (e) {
        alert('请求失败')
      }
    }

    return {
      data,
      handleLogin,
    }
  },
}
```

#### 3. 弹窗组件开发

```javascript
<template>
  <div class="toast">{{ message }}</div>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'Toast',
  props: ['message'],
}

// 管理弹窗的逻辑都封装到此处
export const useToastEffect = () => {
  const toastData = reactive({
    showToast: false,
    toastMsg: '',
  })
  const showToast = (message) => {
    toastData.showToast = true
    toastData.toastMsg = message
    setTimeout(() => {
      toastData.showToast = false
      toastData.toastMsg = message
    }, 2000)
  }
  return { toastData, showToast }
}
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%);
  padding: 0.1rem;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 0.05rem;
  color: #fff;
}
</style>
```

```javascript
<Toast v-if="toastData.showToast" :message="toastData.toastMsg" />

<script>
import Toast, { useToastEffect } from '../../components/Toast'

export default {
  name: 'Login',
  components: { Toast },
  setup() {
    const router = useRouter() // 获取路由实例
    const data = reactive({ password: '', username: '' })
    const { toastData, showToast } = useToastEffect() // 使用弹窗方法

    const handleLogin = async () => {
      try {
        const result = await post('/api/user/login', {
          username: data.username,
          password: data.password,
        })
        if (result?.errno === 0) {
          localStorage.isLogin = true
          router.push({ name: 'Home' })
        } else {
          showToast('登录失败')
        }
        console.log(result)
      } catch (e) {
        showToast('请求失败')
      }
    }
    const handleRegisterClick = () => {
      router.push({ name: 'Register' })
    }
    return {
      data,
      toastData,
      handleLogin,
      handleRegisterClick,
    }
  },
}
</script>
```

#### 4. Setup 函数的职责

把这些逻辑放在不同的函数里面去管理，setup 函数做一个代码流程控制的函数。

```javascript
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'

// 登录函数封装
const useLoginEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({ password: '', username: '' })

  const handleLogin = async () => {
    try {
      const result = await post('/api/user/login', {
        username: data.username,
        password: data.password,
      })
      if (result?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        showToast('登录失败')
      }
      console.log(result)
    } catch (e) {
      showToast('请求失败')
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handleLogin }
}

// 注册函数封装
const useRegisterEffect = () => {
  const router = useRouter() // 获取路由实例
  const handleRegisterClick = () => {
    router.push({ name: 'Register' })
  }
  return { handleRegisterClick }
}

export default {
  name: 'Login',
  components: { Toast }, // 职责就是告诉你，代码执行一个流程
  setup() {
    const { toastData, showToast } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(showToast)
    const { handleRegisterClick } = useRegisterEffect()

    return {
      username,
      password,
      toastData,
      handleLogin,
      handleRegisterClick,
    }
  },
}
```

**第 10 章 商家展示功能开发（上）**

**第 11 章 商家展示功能开发（下）**

**第 12 章 核心购物链路开发**
**代码地址：**[https://github.com/zrtch/vue3-demo/tree/master/jingdong](https://github.com/zrtch/vue3-demo/tree/master/jingdong)
