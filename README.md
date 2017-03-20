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
`npm start` 你会看到

```

> sign-in@0.0.1 start E:\Workbench\nodejs\sign-in\src\server
> nodemon ./bin/www --ignore ./public

[nodemon] 1.11.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node ./bin/www`

```

# todo
- [x] 梳理需求
- [x] 框架搭建
- [X] UI设计
- [ ] 服务端开发
- [ ] 移动端开发
- [ ] web端开发
- [ ] 代码规范(前端后端)
- [ ] 单元测试
- [ ] 构建的钩子travis 
- [ ] google form 接口调研
- [ ] 服务日志收集


# Schedule 
[Schedule](/documents/Schedule.md)

# 生成接口说明文档

```

cd your/project/path/sign-in/src/server && cnpm install apidoc -g 
npm run-script gen-doc

```

然后在目录下会生成doc文件夹，打开index.html即可看到说明文档