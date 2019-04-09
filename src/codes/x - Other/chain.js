// example1
const plugins = [];

const rest = {};
rest.plugin = (value) => {
  plugins.push(value);
  return rest; // 返回对象的引用
};

rest.plugin('a').plugin('b');

console.log('plugins: ', plugins); // plugins:  [ 'a', 'b' ]

// example2
const persion = {
  set: (age) => {
    this.age = age;
    return persion;
  },
  get: () => this.age,
};

console.log('age: ', persion.set(10).get());
