## 说明



## 框架

+ 框架修改自ng-alain, 基于angular 6.0.0 + ng-alain 1.0.8 + ng-zorro-antd 1.0.0
+ 该框架适用于后端管理类，不适用于大屏展示类
+ 框架集成了auth用户认证，ACL权限控制，angular优化配置等部分
+ 由于是集成框架，轻量化有待提高，但对工业后台管理级别的项目影响不大

[Angular](https://angular.cn/guide/quickstart) angular framework
[Ng-zorro-antd](https://github.com/NG-ZORRO/ng-zorro-antd) admin panel front-end framework.
[ng-alain](https://cipchk.github.io/ng-alain/) ag-alain framework


## 配置

+ 初始装包时，使用npm install，不要使用cnpm install，确保获取匹配的@delon包相关资源
+ 框架信息来自ng-alain，业务相关内容自行修改


## 修改内容

2018.07.13
1. 初始测试angualr2-baidu-map


## 注意

1. 目前本框架所有环境均使用 @delon/mock 获取数据，若生产环境不想使用mock数据，将delon.module.ts文件   
const MOCKMODULE = [DelonMockModule.forRoot({ data: MOCKDATA })];  修改为   
const MOCKMODULE = !environment.production ? [DelonMockModule.forRoot({ data: MOCKDATA })] : [];即可
2. 若编译时出现 error TS2307: Cannot find module 'rxjs-compat'错误，执行npm install rxjs@6 rxjs-compat@6 --save 或 ng update，然后重新编译即可
3. 原 angular-cli.json 替换为 angular.json 具体配置规则见 https://github.com/angular/angular-cli/wiki/angular-workspace


## 关于更新

框架部分会根据项目情况维护更新，更新内容主要涉及依赖库版本与配置信息
