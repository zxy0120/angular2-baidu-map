import { Injectable } from '@angular/core';

/**
* 几种不同的logger模式，建议console.log的输出都使用logger.service
* 开发环境中，设置 isDebug 为 true
* 上线发布环境中，设置 isDebug 为 false
* 使用方式：
* 1. ts中import LoggerService, 
		 providers添加LoggerService，
		 constructor添加private loggerService: LoggerService
* 2. ts中使用this.loggerService中方法调用
*/
@Injectable()
export class LoggerService {
    private isDebug: boolean;

    constructor() {
        this.isDebug = true;
    }
        
    log(...message) {
        this.showLog('LOG', console.log, ...message);
    }   

    debug(...message) {
        if (this.isDebug) {
            this.showLog('DEBUG', console.log, ...message);
        }
    }

    warn(...message) {
        if (this.isDebug) {
            this.showLog('WARN', console.warn, ...message);
        }
    }

    error(...message) {
        if (this.isDebug) {
            this.showLog('ERROR', console.error, ...message);
        }
    }

    /**
    * @param getType 日志类型
    * @param callback 回调函数
    * @param message 内容传参，支持多项
    */
    showLog(getType: string, callback: Function, ...message) {
        message.length === 1? callback(`[${getType}]:`, ...message): callback(`[${getType}]:`, message);
    }
  
}
