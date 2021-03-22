# TS 中使用 ESLint prettier



## 初始化一个项目

```shell
➜  mkdir test-eslint
➜  cd test-eslint
➜  test-eslint npm init -y
Wrote to /Users/Witee/temp/test-eslint/package.json:

{
  "name": "test-eslint",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Witee",
  "license": "ISC"
}

```

创建一些文件

```
➜  test-eslint tree -I 'node_modules'
.
├── build
│   └── test.ts
├── package-lock.json
├── package.json
└── src
    ├── index.ts
    ├── libs
    │   └── add.ts
    ├── test.js
    └── types
        └── global.d.ts

4 directories, 7 files

4 directories, 6 files

➜  test-eslint cat build/test.ts 
console.log('test');            

➜  test-eslint cat src/index.ts 
import { add } from './libs/add';

  console.log('add: ',  add(1, 2));
  
➜  test-eslint cat src/libs/add.ts 
export const add: Add = (a, b) => {
  return a + b;
};

➜  test-eslint cat src/types/global.d.ts 
// 声明分局类型
type Add = (x: number, y: number) => number;

➜  test-eslint cat src/test.js 
  console.log('this is js code');
```



## 安装 ESLint 并使用内建规则

> 为方便使用编辑器中同样需要安装 eslint 插件

```shell
npm i -D eslint
```

eslint 在安装完成后有一些内建的规则, 但并没有进行启用, 可以通过 `rules` 字段进行配置.

> 内建规则列表: https://cn.eslint.org/docs/rules/

项目根目录下创建 ESLint 配置文件, 并启用 `no-console` 规则.

```shell
➜  test-eslint cat .eslintrc.js 
module.exports = {
  rules: {
    'no-console': 'warn',
  },
};
```

配置后, 在 vscode 控制台有如下提示:

![image-20210322145057292](/Users/Witee/Library/Application Support/typora-user-images/image-20210322145057292.png)

注意, 这里只对 `src/test.js` 生效了, 而 `src/index.ts` 却没有, 原因是默认解析器`espree` 只能解析 `js` 文件.

增加 `ts`的解析, 并修改 `.eslintrc.js` 配置, 增加 `parser` 字段

```shell
npm i -D typescript @typescript-eslint/parser

➜  test-eslint cat .eslintrc.js 
module.exports = {
  parser: '@typescript-eslint/parser',
  rules: {
    'no-console': 'warn',
  },
};
```

此时vscode可以看到提示

![image-20210322145018469](/Users/Witee/Library/Application Support/typora-user-images/image-20210322145018469.png)

此时有个问题, 内建规则有很多, 使用上面手工方式一一启用很麻烦, 可以使用 `"extends": "eslint:recommended"` 启用推荐规则.

```shell
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
  ],
  rules: {
    // 'no-console': 'warn', 注释掉手工的配置
  },
};
```

测试结果如下:

![image-20210322150345890](/Users/Witee/Library/Application Support/typora-user-images/image-20210322150345890.png)

![image-20210322150420810](/Users/Witee/Library/Application Support/typora-user-images/image-20210322150420810.png)



`no-console` 规则并没有在推荐规则中, 查看列表发现 [no-debugger](https://cn.eslint.org/docs/rules/no-debugger) 在列表中, 另外此时 `console`报的错误是推荐规则中 `no-undef`触发的.

总结一下:

- eslint 安装完成后内建规则都是禁用的
- 可以通过 `rules` 字段手工启用
- `extends` 字段可以批量启用规则

## 扩展规则

当内建规则无法满足时, 可以使用第三方插件. 如 ts 项目一般会使用 `@typescript-eslint/eslint-plugin` 插件.

### 安装插件

```shell
npm i -D @typescript-eslint/eslint-plugin
```

### 加载插件

```shell
➜  test-eslint cat .eslintrc.js 
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',  // 加载插件
  ],
  extends: [],
};
```

此时并没有启用任何规则.



### airbnb 扩展

 [airbnb扩展](https://github.com/airbnb/javascript) 中定义了大量规则的最佳实践, 在 `packages` 目录是可用的两个扩展:

- `eslint-config-airbnb-base`:
    This package provides Airbnb's base JS .eslintrc (without React plugins) as an extensible shared config.
    该软件包提供了Airbnb的基础JS .eslintrc（不带React插件）作为可扩展的共享配置。

- `eslint-config-airbnb`: 同样, 此包是包含 React 插件的, 所以前端项目需要安装此包.

### 安装 eslint-config-airbnb-base 扩展

注意: 需要正确安装依赖版本.

文档: https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base

```shell
➜  test-eslint npm info "eslint-config-airbnb-base@latest" peerDependencies  // 查看依赖版本
 
{
  eslint: '^5.16.0 || ^6.8.0 || ^7.2.0',
  'eslint-plugin-import': '^2.22.1'
}

➜  test-eslint npx install-peerdeps --dev eslint-config-airbnb-base  // 安装依赖版本
install-peerdeps v3.0.3
Installing peerdeps for eslint-config-airbnb-base@latest.
npm install eslint-config-airbnb-base@14.2.1 eslint@^7.2.0 eslint-plugin-import@^2.22.1 --save-dev

SUCCESS eslint-config-airbnb-base
  and its peerDeps were installed successfully.
```

### 配置 eslint-config-airbnb-base

.eslintrc.js 中启用规则,  `"extends": "airbnb-base"`

```shell
➜  test-eslint cat .eslintrc.js 
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-base',  // 这里不再需要 'eslint:recommended' 扩展
  ],
};
```

此时可以显示出很多提示了:

![image-20210322160336873](/Users/Witee/Library/Application Support/typora-user-images/image-20210322160336873.png)



eslint 提供了命令行可以批量修复

```shell
eslint SOME_FILE --fix
```



还可以使用 `rules` 字段覆盖扩展中的规则设置.

## 与  prettier 配合


现在还有两个问题需要解决

1. eslint 侧重于代码质量的检测, 并不擅长代码可读性相关检验.
2. 批量修复不方便

以上两个可以通过与 prettier 配合解决.



### 安装 prettier 及扩展

> 为方便使用编辑器中同样需要安装 prettier 插件

```shell
npm i -D prettier eslint-config-prettier
```

`eslint-config-prettier`: 解决ESLint中的样式规范和prettier中样式规范的冲突，以prettier的样式规范为准，使ESLint中的样式规范自动失效。



### 配置 prettier

在项目根目录下增加配置文件

```shell
➜  test-eslint cat .prettierrc.js 
module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  useTabs: false,
};
```



在 `extends` 列表中后一条增加 `prettier`

```shell
➜  test-eslint cat .eslintrc.js 
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-base',
    'prettier'  // 要放在最后
  ],
};
```

### 配置 vscode 保存时修复样式

在 vscode 配置文件中增加如下代码:

```json
"[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
```

配置完成后, 编辑器将在保存时自动修复问题.

## eslint 其它配置

更多配置查询官网: https://cn.eslint.org/docs/user-guide/configuring

- env:  { node: true, es6: true }  支持新的全局变量,  如果需要在浏览器中运行, 则需要添加  browser: true

    更多配置: https://cn.eslint.org/docs/user-guide/configuring#specifying-environments

    

- ignorePatterns: ['node_modules', 'build', 'coverage', 'dist'],  忽略指定的文件或目录



## 常见问题

1. Unable to resolve path to module './libs/add'.eslint (import/no-unresolved)

   需要在 .eslintrc.js 中增加配置

   ```js
   {
     "settings": {
       "import/resolver": {
         "node": {
           "extensions": [".js", ".jsx", ".ts", ".tsx"]
         }
       }
     },
     ...
   }
   ```

2. Missing file extension "ts" for "./libs/add"eslint(import/extensions)

   在 rules 中添加配置

   ```js
   rules: {
   		...
       'import/extensions': [
         'error',
         'ignorePackages',
         {
           js: 'never',
           jsx: 'never',
           ts: 'never',
           tsx: 'never',
         },
       ],
       ...
     },
   ```

3. 'x' is defined but never used.eslint(no-unused-vars)
    在 rules 中添加配置
    ```js
    rules: {
        ...
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
      },
    ```

4. Cannot find name 'console'

   安装 node 声明文件

   ```shell
   npm i -D @types/node
   ```

5. 'Add' is not defined.eslint(no-undef) 声明类型提示 no-undef
	`rules` 增加 `'no-undef': 'off'` 并在 tsconfig.json 中 设置 `noUnusedLocals: true`  `noUnusedParameters: true`

