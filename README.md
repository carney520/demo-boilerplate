#简介

该模板文件用于传统的前后端开发模式，即前端生成demo，后端套模板。
这里使用coffee+sass+jade来生成demo，最大化地减少代码重复。在开发模式尚落后的公司尤其可用

#特性
+ 使用gulp构建工作流
+ 开发目录与生成目录分离。生成目录是最后交予后端的目录
+ 所以在开发目录可以尽情的使用舒服的前端技术，比如sprite自动生成，模板,开发服务器，sass,autoprefixer等

#安装依赖
```
 $ npm install
```

#构建

```
 $ gulp        #默认任务
 $ gulp watch  #监听文件
 $ gulp start  #启用开发服务器,使用browser-sync
 $ gulp help   #获取帮助
```
