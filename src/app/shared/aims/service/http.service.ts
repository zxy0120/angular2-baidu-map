import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {
    private jsonHeader;
    constructor(
        private http: Http,
        private router: Router,
    ) {
        this.jsonHeader = new Headers({ 'Content-Type': 'application/json' });
    }

    /**
    * 统一http请求服务
    * @param getUrl {string} 如'tbea_be/user/editrolelist'
    * @param getRequestData 如 { username: getUsername, roleList: getRoleList }
    * @param isLoginCheck {boolean} 是否启用已登录检测，默认为false
    * @param getHeader 如 new Headers({ 'Content-Type': 'application/json' })
    */
    public getHttp(getUrl: string, getRequestData: any, isLoginCheck = false, getHeader?: any) {
        getHeader = getHeader? getHeader: new Headers({ 'Content-Type': 'application/json' });
        return this.http
            .post(getUrl, getRequestData, {headers: getHeader})
            .toPromise()
            .then( response => {
                if (isLoginCheck) {
                    this.judgeResponseStatus(response);   
                } else {
                    return Promise.resolve(response.json());
                }
            })
            .then( retMsg => {
                return retMsg;
            })
            .catch( msg => {
                //跳出链式调用
            });
    }

    /**
    * 未登录情况
    */
    private notLoginHandle() {
        alert("请登录！");
        this.router.navigate(['/account/login']);
        return 'notLogin';
    }

    /**
    * 登录被踢出情况
    */
    private reLoginHandle() {
        alert("你的账号已在其他地方登录！");
        this.router.navigate(['/account/login']);
        return 'reLogin';
    }

    /**
    * 处理response响应
    * 1. 重定向 msg:success
    * 2. 权限问题 msg：number
    * @param response 请求响应
    */
    private judgeResponseStatus(response): any {
        //响应有异常，重定向等情况
        if (response.status !== 200) {
            if (response.json().msg === 'success') {
                return Promise.resolve(response.json());
            } else {    
                console.warn('服务器异常！');
                return Promise.reject(response.json());
            }
        }
        if (response.json().msg === '007') {
            this.reLoginHandle();
            return Promise.reject(response.json());
        }
        if (response.json().msg === '008') {
            this.notLoginHandle();
            return Promise.reject(response.json());
        }
        return Promise.resolve(response.json());
    }
}
