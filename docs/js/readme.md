<!--
 * @Author: shenjianfei
 * @Date: 2021-03-11 09:48:01
 * @LastEditors: shenjianfei
 * @LastEditTime: 2021-03-22 14:19:16
-->
### js



::: tip
如何判断一个对象是否为空对象？
:::
function checkNullObj(obj) {
  return Object.keys(obj).length === 0;
}

::: tip
使用闭包实现每隔一秒打印 1,2,3,4
:::
```
// 使用闭包实现
for (var i = 0; i < 5; i++) {
  (function(i) {
    setTimeout(function() {
      console.log(i);
    }, i * 1000);
  })(i);
}

// 使用 let 块级作用域

for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, i * 1000);
}
```

::: tip
手写一个 jsonp
:::
```
function jsonp(url, params, callback) {
  // 判断是否含有参数
  let queryString = url.indexOf("?") === "-1" ? "?" : "&";

  // 添加参数
  for (var k in params) {
    if (params.hasOwnProperty(k)) {
      queryString += k + "=" + params[k] + "&";
    }
  }

  // 处理回调函数名
  let random = Math.random()
      .toString()
      .replace(".", ""),
    callbackName = "myJsonp" + random;

  // 添加回调函数
  queryString += "callback=" + callbackName;

  // 构建请求
  let scriptNode = document.createElement("script");
  scriptNode.src = url + queryString;

  window[callbackName] = function() {
    // 调用回调函数
    callback(...arguments);

    // 删除这个引入的脚本
    document.getElementsByTagName("head")[0].removeChild(scriptNode);
  };

  // 发起请求
  document.getElementsByTagName("head")[0].appendChild(scriptNode);
}
```

::: tip
手写一个观察者模式？
:::
```
var events = (function() {
  var topics = {};

  return {
    // 注册监听函数
    subscribe: function(topic, handler) {
      if (!topics.hasOwnProperty(topic)) {
        topics[topic] = [];
      }
      topics[topic].push(handler);
    },

    // 发布事件，触发观察者回调事件
    publish: function(topic, info) {
      if (topics.hasOwnProperty(topic)) {
        topics[topic].forEach(function(handler) {
          handler(info);
        });
      }
    },

    // 移除主题的一个观察者的回调事件
    remove: function(topic, handler) {
      if (!topics.hasOwnProperty(topic)) return;

      var handlerIndex = -1;
      topics[topic].forEach(function(item, index) {
        if (item === handler) {
          handlerIndex = index;
        }
      });

      if (handlerIndex >= 0) {
        topics[topic].splice(handlerIndex, 1);
      }
    },

    // 移除主题的所有观察者的回调事件
    removeAll: function(topic) {
      if (topics.hasOwnProperty(topic)) {
        topics[topic] = [];
      }
    }
  };
})();
```


::: tip
EventEmitter 实现
:::

```
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    let callbacks = this.events[event] || [];
    callbacks.push(callback);
    this.events[event] = callbacks;

    return this;
  }

  off(event, callback) {
    let callbacks = this.events[event];
    this.events[event] = callbacks && callbacks.filter(fn => fn !== callback);

    return this;
  }

  emit(event, ...args) {
    let callbacks = this.events[event];
    callbacks.forEach(fn => {
      fn(...args);
    });

    return this;
  }

  once(event, callback) {
    let wrapFun = function(...args) {
      callback(...args);

      this.off(event, wrapFun);
    };
    this.on(event, wrapFun);

    return this;
  }
}
```

::: tip
面试题运算符优先级
:::
```
function Foo() {
  getName = function() {
    alert(1);
  };
  return this;
}
Foo.getName = function() {
  alert(2);
};
Foo.prototype.getName = function() {
  alert(3);
};
var getName = function() {
  alert(4);
};
function getName() {
  alert(5);
}

//请写出以下输出结果：
Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1
getName(); // 1
new Foo.getName(); // 2
new Foo().getName(); // 3
new new Foo().getName(); // 3
```

::: tip
数组降维
:::
```
/**
 * 数组降维
 * @param { Array } arr 
 * @returns { Array } 返回一个处理完成的数组
 */
function arrReduction(arr) {
  return arrReductionRecursive(arr, []); // {1}
}

/**
 * 数组降维递归调用
 * @param { Array } arr 
 */
function arrReductionRecursive(arr, result=[]) { // {2}
  arr.forEach(item => { // {3}
    item instanceof Array ?
      arrReductionRecursive(item, result) // {4}
    : 
      result.push(item); // {5}
  })

  return result; // {6}
}

// 测试
const arr = [[0, 1], [2, [4, [6, 7]]]];
console.log('arrReduction: ', arrReduction(arr)); // [ 0, 1, 2, 4, 6, 7 ]
```

::: tip
数组/对象数组去重
:::
```
let arr = [1, 2, 2, 3, '3', 4];
[...new Set(arr)] // [ 1, 2, 3, '3', 4 ]
```

::: tip
深拷贝
:::
```
/**
 * 深拷贝
 * @param { Object|Array|Function } elements
 * @returns { Object|Array|Function } newElements
 */
function deepClone(elements) {
  if (!typeCheck(elements, 'Object')) { // {1}
    throw new Error('必须为一个对象')
  }

  return deepCloneRecursive(elements); // {2}
}

/**
 * 深度拷贝递归调用
 * @param { Object|Array|Function } elements
 */
function deepCloneRecursive(elements) {
  const newElements = typeCheck(elements, 'Array') ? [] : {}; // {3}

  for (let k in elements) { // {4}
    // {5}
    if (typeCheck(elements[k], 'Object') || typeCheck(elements[k], 'Array')) {
      newElements[k] = deepCloneRecursive(elements[k]);
    } else {
      newElements[k] = elements[k];
    }
  }

  return newElements; // {6}
}

/**
 * 类似检测 | 辅助函数
 * @param {*} val 值
 * @param { String } type 类型
 * @returns { Boolean } true|false
 */
function typeCheck(val, type) {
    return Object.prototype.toString.call(val).slice(8, -1) === type;
}

// 测试
const obj = { a: 1, b: { c: [], d: function() {} }};
const obj2 = deepClone(obj);

obj.b.c.push('a');
obj.b.d = [];

console.log(obj); // { a: 1, b: { c: [ 'a' ], d: [] } }
console.log(obj2); // { a: 1, b: { c: [], d: [Function: d] } }
```

::: tip
实现一个 sleep 函数
:::
正确写法推荐以下代码，通过 setTimeout 来控制延迟执行。
```
/**
 * 延迟函数
 * @param { Number } seconds 单位秒
 */
function sleep(seconds) {
  return new Promise(resolve => {
    setTimeout(function() {
      resolve(true);
    }, seconds)
  })
}

async function test() {
  console.log('hello');
  await sleep(5000);
  console.log('world! 5 秒后输出');
}

test();
```

::: tip
柯里化函数
:::

```
/**
 * add 函数
 * @param { Number } a 
 * @param { Number } b 
 * @param { Number } c 
 */
function addFn(a, b, c) { // {1}
  return a + b + c;
}

/**
 * 柯里化函数
 * @param { Function } fn 
 * @param { ...any } args 记录参数
 */
function curry(fn, ...args) { // {2}
  if (args.length < fn.length) { // {3}
    return function() { // {4}
      let _args = Array.prototype.slice.call(arguments); // {5}
      return curry(fn, ...args, ..._args); // {6} 上面得到的结果为数组，进行解构 
    }
  }

  return fn.apply(null, args); // {7}
}

// curry 函数简写如下，上面写法可能更易理解
// const curry = (fn, ...args) => args.length < fn.length ?
// 	(..._args) => curry(fn, ...args, ..._args)
// 	:
// 	fn.call(null, ...args);

// 柯里化 add 函数
const add = curry(addFn); // {8}

console.log(add(1)(2)(3)); // 6
console.log(add(1, 2)(3)); // 6
console.log(add(1)(2, 3)); // 6
```