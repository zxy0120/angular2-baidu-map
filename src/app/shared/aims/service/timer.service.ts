import { Injectable } from '@angular/core';

/**
* 自定义time格式部分，补充原本time设定的转换功能
* ng2 对ie等浏览器在Date管道上需启用polyfill
*/
@Injectable()
export class TimerService {

    constructor() { }

    /**
	* 指定时间戳情况下，初始化时间戳为当天0点
	* @param timeStamp 时间戳，带毫秒
	* @return 返回的时间戳
	*/
    getInitialTimeStamp(timeStamp: number): number {
        let newDate = new Date(timeStamp);
        let now;
        let y, m, d, h, minute;
        let browserInfo: string = this.getBrowserInfo();		
        if ( browserInfo === "ie" || browserInfo === "edge" ) {
            y = newDate.getFullYear();
            m = m < 10 ? ('0' + m) : m;	
            m = newDate.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            d = newDate.getDate();
            d = d < 10 ? ('0' + d) : d;
            now = y + '/' + m + '/' + d + ' 00:00:00'; //ie浏览器下必须用 yy/MM ,不能为 yy-MM
        } else {
            now = newDate.toLocaleDateString();  //ie浏览器下是 xxxx年xx月xx日
            now = now + ' 00:00:00';			
        }
        let initialTimeStamp = Date.parse(now);
        return initialTimeStamp;
    }

    /**
	* 指定时间戳情况下，返回该时间的格式化字符串
	* 未指定时间戳情况下，返回当前时间的格式化字符串
	* 对ng2的Date管道不适用等情况写在自定义管道format-pipe中
	* @param mode 返回的字符串格式
	* @param timeStamp 时间戳，带毫秒
	* @return 返回的字符串
	*/
    getFormatTime(mode: string, stamp?: number): string {
        let newDate = stamp? new Date(stamp): new Date();
        let y, m, d, h, minute, s;
        y = newDate.getFullYear();		
        m = newDate.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        d = newDate.getDate();
        d = d < 10 ? ('0' + d) : d;
        h = newDate.getHours();
        h = h < 10 ? ('0' + h) : h;  
        minute = newDate.getMinutes();  
        minute = minute < 10 ? ('0' + minute) : minute;
        s = newDate.getSeconds();
        s = s < 10 ? ('0' + s) : s; 
        switch (mode) {
            case "yyMMdd HHmmss":
                return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + s; 
            case "yyMMdd HHmm":
                return y + '-' + m + '-' + d + ' ' + h + ':' + minute; 
            case "yyMMdd HH0000":
                return y + '-' + m + '-' + d + ' ' + h + ':00:00';
            case "yyMMdd":
                return y + '-' + m + '-' + d;
            case "MMdd":
                return m + '-' + d;            
            case "HHmm":
                return h + ':' + minute;
            case "HHmmss":
                return h + ':' + minute + ':' + s; 		
            default:
                return m + '-' + d + ' ' + h + ':' + minute;        		
        }
    }

    /**
	* 浏览器兼容性检测
	* chrome:	"mozilla/5.0 (windows nt 10.0; win64; x64) applewebkit/537.36 (khtml, like gecko) chrome/59.0.3071.109 safari/537.36"
	* firefox:	"mozilla/5.0 (windows nt 10.0; wow64; rv:54.0) gecko/20100101 firefox/54.0"
	* opera:	"mozilla/5.0 (windows nt 10.0; wow64) applewebkit/537.36 (khtml, like gecko) chrome/58.0.3029.110 safari/537.36 opr/45.0.2552.898"
	* safari:	
	* edge:		"mozilla/5.0 (windows nt 10.0; win64; x64) applewebkit/537.36 (khtml, like gecko) chrome/51.0.2704.79 safari/537.36 edge/14.14393"
	* ie11:		"mozilla/5.0 (windows nt 10.0; wow64; trident/7.0; .net4.0c; .net4.0e; .net clr 2.0.50727; .net clr 3.0.30729; .net clr 3.5.30729; rv:11.0) like gecko"
	* ie10以下:	"mozilla/5.0 (compatible; msie 9.0; windows nt 10.0; wow64; trident/7.0; .net4.0c; .net4.0e; .net clr 2.0.50727; .net clr 3.0.30729; .net clr 3.5.30729)"	
	* @return 浏览器主名称
	*/
    private getBrowserInfo() {
        try {			
            var userAgent = navigator.userAgent.toLowerCase(); 
            var isOpera = userAgent.indexOf("opera") > -1; 
            var isMaxthon = userAgent.indexOf("maxthon") > -1; 
            var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("msie") > -1 && !isOpera;   //ie10以下            
            var isFF = userAgent.indexOf("firefox") > -1; 
            var isSafari = userAgent.indexOf("safari") > -1 && userAgent.indexOf("chrome") < 1 ; 
            var isEdge = userAgent.indexOf("edge") > -1;
            var isChrome = userAgent.indexOf("chrome") > -1 && userAgent.indexOf("edge") < 1;
            isIE = userAgent.indexOf(".net") > -1 || isIE;
            //var isIE5 = isIE55 = isIE6 = isIE7 = isIE8 = false;
            
            console.log("userAgent:", userAgent);
            if (isFF)		{console.log("当前浏览器是  Firefox");  		return "firefox"; }
            if (isMaxthon)	{console.log("当前浏览器是 傲游(webkit核心)"); 	return "maxthon"; }
            if (isOpera)	{console.log("当前浏览器是  Opera");			return "opera"; }
            if (isSafari)	{console.log("当前浏览器是  Safari");			return "safari"; }
            if (isChrome)	{console.log("当前浏览器是  Chrome");			return "chrome"; }
            if (isIE)		{console.log("当前浏览器是  IE");				return "ie"; }
            if (isEdge)		{console.log("当前浏览器是  Edge");				return "edge"; }
            return null;
        } catch (e) {
            console.error('[error]:', e);
            return null;
        }
    }
}
