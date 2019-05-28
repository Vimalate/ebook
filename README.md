# my-ebook

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

##树状结构变一维数组
flatten(arr) {
  return [].concat(...arr.map(item=>[].concat(item,...flatten(item.subitems))))
}
##ellipsis 指定宽度

##vue移动端禁止页面整体下拉
#app {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    background: #7d8188;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
  }