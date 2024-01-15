[English](README.md) | 简体中文

# ToolKit

TooKit 是一款跨平台的多功能工具集软件，集成了办公、软件开发、区块链和人工智能等多个领域的必备工具。该软件支持用户自定义配置，使用户能够根据个人需求灵活调整工具设置。无论您是需要提高办公效率、进行软件开发、深入研究区块链，还是涉足人工智能领域，TooKit都为您提供了一体化的解决方案。简单易用的界面设计让用户能够轻松上手，体验高效而便捷的工作和创新过程, 尽享多领域工具集的便利与灵活性。

# 路线图

- 基础功能
    - [ ] 整个软件的 UI 框架

- Web3
    - [ ] 查看钱包签名
    - [ ] 地址格式化
    - [ ] ERC 721 基础方法调用
    - [ ] ERC 1155 基础方法调用
    - [ ] ERC 20 基础方法调用
    - [ ] 智能合约快速部署工具
    - [ ] ...
- 开发工具
    - [ ] 随机数生成器
    - [ ] 时间工具（时区选择、时间戳转换、当前时间）
    - [ ] 进制转换（十六进制、十进制、二进制以及任意进制）
    - [ ] Base64 编码解码
    - [ ] JWT 编码解码
    - [ ] ...

# 开发

You can configure the project by editing `wails.json`. More information about the project settings can be found
here: https://wails.io/docs/reference/project-config

## Live Development

To run in live development mode, run `wails dev` in the project directory. This will run a Vite development
server that will provide very fast hot reload of your frontend changes. If you want to develop in a browser
and have access to your Go methods, there is also a dev server that runs on http://localhost:34115. Connect
to this in your browser, and you can call your Go code from devtools.

## Building

To build a redistributable, production mode package, use `wails build`.