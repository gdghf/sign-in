# sign-in
A simple sign-in application, based on PWA



# Documents  
[Requirements](/documents/Requirements.md)

# 目录结构
```
documents                           相关文档
src                                 源代码
    server                          服务端
        config/                      配置
        models/                      模型
        routes/                      路由
        app.js                       main 
        package.json                 node package
```
# 快速开始

1. 下载代码  
`git clone git@github.com:gdghf/sign-in.git`  
**or**  
`git clone https://github.com/gdghf/sign-in.git`
2. 安装依赖
`cd your/project/path/sign-in/src/server && cnpm install `  
ps: [cnpm 相关](https://npm.taobao.org/)
3. 运行程序  
`npm run dev` 你会看到
```

> sign-in@0.0.1 dev /your/project/path/sign-in/src/server
> supervisor app.js


Running node-supervisor with
  program 'app.js'
  --watch '.'
  --extensions 'node,js'
  --exec 'node'

Starting child process with 'node app.js'
Watching directory '/Users/xiabin/WebstormProjects/sign-in/src/server' for changes.
Press rs for restarting the process.
```


# todo
- [x] 梳理需求
- [x] 框架搭建
- [ ] UI设计
- [ ] 服务端开发
- [ ] 移动端开发
- [ ] web端开发




