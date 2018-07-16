## 说明

+ 此项目包括angular2-baidu-map官网例子实现，同时也包括对地图样式和标点样式的设置
+ 此项目在 工厂->广东省->佛山市 下有数据，项目1为三条数据，项目2为一条数据

+ GitHub地址：https://github.com/leftstick/angular2-baidu-map
+ 官网：https://leftstick.github.io/angular2-baidu-map/#/home
+ API：http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a0b0

## 用法：

```bash
# Npm:
npm install angular2-baidu-map --save

# Use angular2-baidu-map module:
import { BaiduMapModule } from 'angular2-baidu-map';
import { DemoComponent } from './demo.component';
@NgModule({
    imports: [
        BrowserModule,
        BaiduMapModule.forRoot({ ak: 'your ak' })
    ],
    declarations: [
        DemoComponent
    ],
    bootstrap: [DemoComponent]
})
export class DemoModule { }

# Use <baidu-map> element:
import { Component } from '@angular/core';
import { MapOptions } from 'angular2-baidu-map';
@Component({
    selector: 'demo',
    template: '<baidu-map [options]="opts"></baidu-map>',
    styles: [`
        baidu-map {
            display: block;
            width: 800px;
            height: 290px;
        }
    `
    ]
})
export class DemoComponent {
    public opts: MapOptions;
    constructor() {
        this.opts = {
            centerAndZoom: {
                lng: 121.506191,
                lat: 31.245554,
                zoom: 15
            }
        };
    }
}
```

## 框架

+ 框架修改自ng-alain, 基于angular 6.0.0 + ng-alain 1.0.8 + ng-zorro-antd 1.0.0

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

## 问题

```bash
# 已解决问题：
<baidu-map [options]="opts" (loaded)="mapLoaded($event)">
    <marker *ngFor="let marker of markers"
            [point]="marker.point"
            [options]="marker.options"
            (clicked)="showWindow($event)" 
            (loaded)="markerLoaded($event)"></marker>
</baidu-map>
# 1、如何写入数字在maker标点中
public markerLoaded(marker: any): void {
        const label = new window.BMap.Label(marker.getTitle());
        label.setStyle({ // 给label设置样式，任意的CSS都是可以的,
            color: '#fff',
            fontSize: '16px',
            border: 'none',
            width: '40px',
            height: '40px',
            textAlign: 'center',
            lineHeight: '40px',
            background: 'transparent',
            cursor: 'pointer',
        });
        marker.setLabel(label);
    }
# 2、如何去掉道路线等样式设置
public mapLoaded(map: any): void {
        map.setMapStyle({
            styleJson: [
                {
                    'featureType': 'highway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                },
                {
                    'featureType': 'railway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }
            ]
        });
    }
```
