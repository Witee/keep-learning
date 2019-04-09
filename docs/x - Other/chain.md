# 链式调用

好处：多次调用同一对象不同方法时简化操作

原理：处理完成后返回对象的引用，给下次使用

examples: `./src/codes/x - Other/chain.js`

```
// example1:
const plugins = [];

const rest = {};
rest.plugin = (value) => {
  plugins.push(value);
  return rest; // 返回对象的引用
};


rest.plugin('a').plugin('b');

console.log('plugins: ', plugins); // plugins:  [ 'a', 'b' ]

```

```
// example2:
const persion = {
  set: (age) => {
    this.age = age;
    return persion;
  },
  get: () => this.age,
};

console.log('age: ', persion.set(10).get()); // age:  10
```
