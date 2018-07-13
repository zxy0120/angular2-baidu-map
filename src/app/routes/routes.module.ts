import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { SharedModule } from '@shared/shared.module';
import { RouteRoutingModule } from './routes-routing.module';
import { BaiduMapModule } from 'angular2-baidu-map';

import { BaiduMapV1Component } from './baidu-map/baidu-map.component';

const COMPONENTS = [
  BaiduMapV1Component,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, RouteRoutingModule, HttpModule, HttpClientModule, BaiduMapModule.forRoot({ ak: 'qG26ooW4cD3g7A9zlrkFzhyXQO8upKq2' })],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT
})
export class RoutesModule {}
