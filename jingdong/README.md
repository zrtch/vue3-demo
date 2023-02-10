# jingdong

## Project setup

```
yarn install
```

## 新增 script 脚本

> 新增"preinstall": "npx only-allow npm"一行代码，意思就是只允许使用 npm 管理器。

```
"scripts": {
    "preinstall": "npx only-allow npm" // 新增
  },
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
