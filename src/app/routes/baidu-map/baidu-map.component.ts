import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
declare var $: any;
declare var addressInit: any;

import { 
    MapOptions, MapTypeEnum, MarkerClustererOptions, Marker, BMarkerClusterer, TileLayerOptions, getTilesUrlFunc, BTileLayer, TrafficLayerOptions, BTrafficLayer,
    NavigationControlOptions, OverviewMapControlOptions, ScaleControlOptions, MapTypeControlOptions, ControlAnchor, NavigationControlType, MapTypeControlType, BNavigationControl,
    MarkerOptions, Point } from 'angular2-baidu-map';

@Component({
    selector: 'app-baidu-map',
    templateUrl: './baidu-map.component.html',
    styleUrls: ['./baidu-map.component.css'],
})
export class BaiduMapV1Component implements OnInit, AfterViewInit, OnDestroy {

    // 地图实例实现
    public opts: MapOptions;
    public markers: Array<{ point: Point; options?: MarkerOptions }>;
    private headers = new Headers({ 'Content-Type': 'application/json '});
    private timer01;
    constructor(
        private http: Http,
    ) {
        this.opts = {
            centerAndZoom: {     // 设置中心点和缩放级别
                lng: 105.059014,   // 经度
                lat: 36.812474,    // 纬度
                zoom: 5           // 缩放级别
            },
            minZoom: 4,  // 最小缩放级别的地图
            maxZoom: 13, // 最大缩放级别的地图
            disableDragging: false, // 是否禁用地图拖动功能
            enableScrollWheelZoom: true, // 是否启用滚轮进行缩放功能
        };
    }
    ngOnInit() {}
    ngAfterViewInit() {
        addressInit('map_choose_select1', 'map_choose_select2', '全部省', '全部市');

        // 更新地图
        const tag01 = () => {
            this.getData();
        };
        this.timer01 = setInterval(() => {
                tag01(); // 初始化地图
                const selectName = ['.map_choose_select1', '.map_choose_select2', '.map_choose_select3', '.map_choose_select4'];
                for (let i = 0; i < selectName.length; i ++) {
                    $(selectName[i]).change(function() {
                        tag01();
                    });
                }
                clearInterval(this.timer01);
        }, 50);
    }
    // 地图筛选功能获取数据
    private getData(): void {
        let selectValue01;
        let selectValue02;
        let selectValue03;
        let selectValue04;
        if ($('.map_choose_select1').children('option:selected').val() === '全部省') {
            selectValue01 = null;
        } else {
            selectValue01 = $('.map_choose_select1').children('option:selected').val();
        }
        if ($('.map_choose_select2').children('option:selected').val() === '全部市') {
            selectValue02 = null;
        } else {
            selectValue02 = $('.map_choose_select2').children('option:selected').val();
        }
        if ($('.map_choose_select3').children('option:selected').val() === '全部场景') {
            selectValue03 = null;
        } else {
            selectValue03 = $('.map_choose_select3').children('option:selected').val();
        }
        if ($('.map_choose_select4').children('option:selected').val() === '全部项目') {
            selectValue04 = 'all';
        } else if ($('.map_choose_select4').children('option:selected').val() === '项目1') {
            selectValue04 = 1;
        } else if ($('.map_choose_select4').children('option:selected').val() === '项目2') {
            selectValue04 = 2;
        }
        if ((selectValue03 === null || selectValue03 === '工厂') && ((selectValue01 === null && selectValue02 === null) || (selectValue01 === '广东省' && selectValue02 === null) || (selectValue01 === '广东省' && selectValue02 === '佛山市'))) {
            if (selectValue04 == 1) {
                this.showMap(3);
            } else if (selectValue04 == 2)  {
                this.showMap(1);
            } else if (selectValue04 == 'all')  {
                this.showMap(4);
            }
        } else {
            this.showMap(0);
        }
    }
    // 显示地图
    private showMap(num) {
        const markers = [];
        let selectValue01 = 0;
        let selectValue02 = 0;
        if ($('.map_choose_select1').children('option:selected').val() === '全部省') {
            selectValue01 = 0;
        } else {
            selectValue01 = 1;
        }
        if ($('.map_choose_select2').children('option:selected').val() === '全部市') {
            selectValue02 = 0;
        } else {
            selectValue02 = 2;
        }
        if (selectValue01 === 0 && selectValue02 === 0) {
            this.opts = {
                centerAndZoom: {     // 设置中心点和缩放级别
                    lng: 105.059014,   // 经度
                    lat: 36.812474,    // 纬度
                    zoom: 5           // 缩放级别
                }
            };
        } else if (selectValue01 === 1 && selectValue02 === 0) {
            if (num !== 0) {
                this.opts = {
                    centerAndZoom: {     // 设置中心点和缩放级别
                        lng: 113.11,   // 经度
                        lat: 23.05,    // 纬度
                        zoom: 6           // 缩放级别
                    }
                };
            } else {
                this.opts = {
                    centerAndZoom: {     // 设置中心点和缩放级别
                        lng: 105.059014,   // 经度
                        lat: 36.812474,    // 纬度
                        zoom: 5           // 缩放级别
                    }
                };
            }
        } else if (selectValue01 === 1 && selectValue02 === 2) {
            if (num !== 0) {
                this.opts = {
                    centerAndZoom: {     // 设置中心点和缩放级别
                        lng: 113.11,   // 经度
                        lat: 23.05,    // 纬度
                        zoom: 7           // 缩放级别
                    }
                };
            } else {
                this.opts = {
                    centerAndZoom: {     // 设置中心点和缩放级别
                        lng: 105.059014,   // 经度
                        lat: 36.812474,    // 纬度
                        zoom: 5           // 缩放级别
                    }
                };
            }
        } else {
            this.opts = {
                centerAndZoom: {     // 设置中心点和缩放级别
                    lng: 105.059014,   // 经度
                    lat: 36.812474,    // 纬度
                    zoom: 5           // 缩放级别
                }
            };
        }
        if (num !== 0) {
            const latitude = 23.05;
            const longitude = 113.11;
            this.markers = [
              {
                options: {
                    icon: {
                        imageUrl: '../../assets/images/bg_labelRegular_normal.png',
                        size: {
                            height: 40,
                            width: 40
                        }
                    },
                    title: num
                },
                point: {
                    lat: latitude,
                    lng: longitude
                }
              }
            ];
        } else {
            this.markers = [];
        }
    }
    public showWindow({ e, marker, map }: any): void {
        map.openInfoWindow(
            new window.BMap.InfoWindow('地址：浦东南路360号', {
                offset: new window.BMap.Size(0, -10),
                title: '个数：' + marker.getTitle()
            }),
            marker.getPosition()
        );
    }
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
        marker.addEventListener('mouseover', function() {
            label.setStyle({ // 给label设置样式，任意的CSS都是可以的,
                color: '#fff',
                fontSize: '16px',
                border: 'none',
                width: '40px',
                height: '40px',
                textAlign: 'center',
                lineHeight: '40px',
                background: 'url(../../../../assets/images/bg_labelRegular_click.png) no-repeat',
                cursor: 'pointer',
            });
        });
        marker.addEventListener('mouseout', function() {
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
        });
    }
    ngOnDestroy(): void {
        if (this.timer01) {
            clearInterval(this.timer01);
        }
    }
    
    // // baidu-map
    // public opts: MapOptions
    // constructor() {
    //     this.opts = {
    //         centerAndZoom: {
    //             lat: 39.920116,
    //             lng: 116.403703,
    //             zoom: 16
    //         },
    //         enableKeyboard: true,
    //         mapType: MapTypeEnum.BMAP_SATELLITE_MAP
    //     }
    // }
    // public mapClick(e: any) {
    //     alert(`The coordinate you chose is: ${e.point.lng} : ${e.point.lat}`)
    // }

    // // marker
    // public opts: MapOptions;
    // public markers: Array<{ point: any; options?: any }>;
    // constructor() {
    //   this.opts = {
    //     centerAndZoom: {
    //       lat: 31.244604,
    //       lng: 121.51606,
    //       zoom: 16
    //     }
    //   };
    //   this.markers = [
    //     {
    //       options: {
    //         icon: {
    //           imageUrl: '/assets/markericon.png',
    //           size: {
    //             height: 35,
    //             width: 25
    //           },
    //           imageSize: {
    //             height: 35,
    //             width: 25
    //           }
    //         }
    //       },
    //       point: {
    //         lat: 31.244604,
    //         lng: 121.51606
    //       }
    //     },
    //     {
    //       point: {
    //         lat: 31.246124,
    //         lng: 121.51232
    //       }
    //     }
    //   ]
    // }
    // public showWindow({ e, marker, map }: any): void {
    //   map.openInfoWindow(
    //     new window.BMap.InfoWindow('地址：浦东南路360号', {
    //       offset: new window.BMap.Size(0, -30),
    //       title: '新上海国际大厦'
    //     }),
    //     marker.getPosition()
    //   )
    // }

    // // polyline
    // public opts: MapOptions;
    // public points: Array<any>;
    // public polylineOptions: any;
    // constructor() {
    //   this.opts = {
    //     centerAndZoom: {
    //       lat: 39.915,
    //       lng: 116.404,
    //       zoom: 14
    //     }
    //   };
    //   this.points = [
    //     {
    //       lat: 39.910,
    //       lng: 116.399
    //     }, {
    //       lat: 39.920,
    //       lng: 116.405
    //     }, {
    //       lat: 39.900,
    //       lng: 116.425
    //     }
    //   ];
    //   this.polylineOptions = {
    //     strokeColor: 'blue',
    //     strokeWeight: 2
    //   };
    // }
    // public polylineLoaded(polyline: any): void {
    //   console.log('polyline loaded', polyline);
    // }

    // // circle
    // public opts: MapOptions;
    // public center: any;
    // public circleOptions: any;
    // constructor() {
    //   this.opts = {
    //     centerAndZoom: {
    //       lng: 116.404,
    //       lat: 39.915,
    //       zoom: 14
    //     }
    //   };
    //   this.center = {
    //     lng: 116.404,
    //     lat: 39.915
    //   };
    //   this.circleOptions = {
    //     strokeColor: 'blue',
    //     strokeWeight: 2
    //   };
    // }
    // public circleLoaded(circle: any): void {
    //   console.log('circle loaded', circle);
    // }

    // // polygon
    // public opts: MapOptions;
    // public points: Array<any>;
    // public polygonOptions: any;
    // constructor() {
    //   this.opts = {
    //     centerAndZoom: {
    //       lat: 39.915,
    //       lng: 116.404,
    //       zoom: 14
    //     }
    //   };
    //   this.points = [{
    //       lng: 116.387112,
    //       lat: 39.920977
    //   }, {
    //       lng: 116.385243,
    //       lat: 39.913063
    //   }, {
    //       lng: 116.394226,
    //       lat: 39.917988
    //   }, {
    //       lng: 116.401772,
    //       lat: 39.921364
    //   }, {
    //       lng: 116.41248,
    //       lat: 39.927893
    //   }];
    //   this.polygonOptions = {
    //     strokeColor: 'blue',
    //     strokeWeight: 2
    //   };
    // }
    // public polygonLoaded(polygon: any): void {
    //   console.log('polygon loaded', polygon);
    // }

    // // heatmap
    // public opts: MapOptions;
    // public data: any;
    // public heatmapOptions: any;
    // constructor() {
    //   this.opts = {
    //     centerAndZoom: {
    //       lat: 39.915,
    //       lng: 116.404,
    //       zoom: 14
    //     }
    //   };
    //   this.data = [{
    //       lng: 116.387112,
    //       lat: 39.920977
    //   }, {
    //       lng: 116.385243,
    //       lat: 39.913063
    //   }, {
    //       lng: 116.394226,
    //       lat: 39.917988
    //   }, {
    //       lng: 116.401772,
    //       lat: 39.921364
    //   }, {
    //       lng: 116.41248,
    //       lat: 39.927893
    //   }];
    //   this.heatmapOptions = {
    //     visible: true
    //   };
    // }
    // public heatmapLoaded(heatmap: any): void {
    //   console.log('heatmap loaded', heatmap);
    // }

    // // marker-clusterer
    // public opts: MapOptions;
    // public clustererOptions: MarkerClustererOptions;
    // constructor() {
    //   this.opts = {
    //     centerAndZoom: {
    //       lat: 39.915,
    //       lng: 116.404,
    //       zoom: 5
    //     },
    //     enableScrollWheelZoom: true, // 是否启用滚轮进行缩放功能
    //   };
    //   this.clustererOptions = {
    //     markers: this.getRandomMarkers()
    //   };
    // }
    // private getRandomMarkers() {
    //   const markers: Array<Marker> = [];
    //   for (let i = 0; i < 20; i++) {
    //     markers.push({
    //       point: {
    //         lng: Math.random() * 40 + 85,
    //         lat: Math.random() * 30 + 21
    //       }
    //     });
    //   }
    //   return markers;
    // }
    // public markerClustererLoaded(clusterer: BMarkerClusterer): void {
    //   console.log('clusterer loaded', clusterer);
    // }

    // // tilelayer
    // public opts: MapOptions;
    // public tilelayerOptions: TileLayerOptions;
    // public getTilesUrl: getTilesUrlFunc;
    // constructor() {
    //   this.opts = {
    //     centerAndZoom: {
    //       lat: 40.007978,
    //       lng: 116.332782,
    //       zoom: 16
    //     },
    //     enableScrollWheelZoom: true, // 是否启用滚轮进行缩放功能
    //   };
    //   this.tilelayerOptions = {
    //     transparentPng: true
    //   };
    //   this.getTilesUrl = function(tileCoord, zoom) {
    //     const { x, y } = tileCoord;
    //     return `https://lbsyun.baidu.com/jsdemo/demo/tiles/${zoom}/tile${x}_${y}.png`;
    //   };
    // }
    // public tilelayerLoaded(tilelayer: BTileLayer): void {
    //   console.log('tilelayer loaded', tilelayer);
    // }

    // // trafficlayer 交通流量图层
    // public opts: MapOptions;
    // public trafficlayerOptions: TrafficLayerOptions;
    // constructor() {
    //   this.opts = {
    //     centerAndZoom: {
    //       lat: 39.915,
    //       lng: 116.404,
    //       zoom: 12
    //     },
    //     enableScrollWheelZoom: true, // 是否启用滚轮进行缩放功能
    //   };
    //   this.trafficlayerOptions = {
    //     predictDate: {
    //       weekday: 3
    //     }
    //   };
    // }
    // public trafficlayerLoaded(trafficlayer: BTrafficLayer): void {
    //   console.log('trafficlayer loaded', trafficlayer);
    // }

    // // control
    // public opts: MapOptions;
    // public controlOpts: NavigationControlOptions;
    // public overviewmapOpts: OverviewMapControlOptions;
    // public scaleOpts: ScaleControlOptions;
    // public mapTypeOpts: MapTypeControlOptions;
    // constructor() {
    //   this.opts = {
    //     centerAndZoom: {
    //       lat: 31.244604,
    //       lng: 121.51606,
    //       zoom: 16
    //     },
    //     enableScrollWheelZoom: true, // 是否启用滚轮进行缩放功能
    //   };
    //   this.controlOpts = {
    //     anchor: ControlAnchor.BMAP_ANCHOR_TOP_LEFT,
    //     type: NavigationControlType.BMAP_NAVIGATION_CONTROL_LARGE
    //   };
    //   this.overviewmapOpts = {
    //     anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_RIGHT,
    //     isOpen: true
    //   };
    //   this.scaleOpts = {
    //     anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_LEFT
    //   };
    //   this.mapTypeOpts = {
    //     type: MapTypeControlType.BMAP_MAPTYPE_CONTROL_HORIZONTAL
    //   };

    // }
    // public controlLoaded(control: BNavigationControl): void {
    //   console.log('control loaded', control);
    // }
}
