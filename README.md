# Vue SSR demo

> TODO: 完成 README，添加更多的 demo，包括错误的用法和正确的用法


## createRenderer, createBundleRenderer

renderToString, renderToStream


## createBundleRenderer

- 在 script 块中引入的 style 文件不会像 style 块一样被自动导入 html 文件，并且在运行时会报错
- context.styles 的内容自动生成的，传入的内容会被覆盖
