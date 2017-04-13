# JavaScript

### eatSnake-js-version.html,贪吃蛇 JavaScript 版 
```
由js实现的贪吃蛇游戏,蛇尾一格出队列,蛇头一格入队列,移动效果
直接浏览器打开eatSnake-js-version.html文件即可
ffmpeg -i eatsnake.mov -s 600x600 -pix_fmt rgb24 -r 10 -f gif - | gifsicle --optimize=3 --delay=3 > eatsnake.gif
把mov转成了gif，压缩之后，同时界面也失真了，大致界面效果:
```
![](https://github.com/LockGit/JavaScript/blob/master/img/eatsnake.gif)

### cookieHack, 一款修改当前网站任意cookie的 Chrome 扩展插件
```
源代码在cookieHack文件夹里，cookieHack为一个可以修改当前网站任意cookie的工具。
JavaScript Chrome 扩展程序，因提交至google商店还需要$,所以直接进行了打包。

使用方法：
1，git clone https://github.com/LockGit/JavaScript.git
2，打开Chrome浏览器
3，设置-->扩展程序--->加载已解压的扩展程序--->选中JavaScript中的cookieHack目录即可
```

![](https://github.com/LockGit/JavaScript/blob/master/img/install-01.png)
![](https://github.com/LockGit/JavaScript/blob/master/img/install-02.png)


```
测试：(启用https或者httpOnly需要针对https类型网站）
https://www.baidu.com/
```
![](https://github.com/LockGit/JavaScript/blob/master/img/install-03.png)

