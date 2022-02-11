# actix_chat_web

这是一个基于 Rust actix 后端，petite-vue 前端开发的简易在线聊天室

## 下载

```bash
git clone https://github.com/mowtwo/actix_chat_web
```

> ### 注意
>
> 本项目有依赖到 cargo-watch 实现代码热重启，所以有需要请自行安装，下面运行也是根据 cargo-watch 来编写的运行脚本，若无需求，可以直接使用`cargo run`或者`cargo build`

## 运行环境

- rust@1.6
- tsc@4.4.4
- cargo-watch
- Window

## 运行

由于网页中的 js 实际上是有 TypeScript 编译得来，因此启动前可以先将 ts 代码编译

```bash
./watch_ts.bat
```

然后直接启动后端服务即可

```bash
./watch.bat
```
