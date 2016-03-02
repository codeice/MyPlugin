// This function creates a new anchor element and uses location
// properties (inherent) to get the desired URL data. Some String
// operations are used (to normalize results across browsers).

/*跨浏览器兼容的事件对象*/
var EventUtil = {
    addHandler: function(element, type, handler) {
            //Firefox、Chrome下使用addEventListener，IE下使用attachEvent
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
                console.log(element.attachEvent);
            } else {
                element["on" + type] = handler;
            }
        },

        removeHandler: function(element, type, handler) {
            //Firefox、Chrome下使用removeEventListerner，IE下使用detachEvent
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent) {
                element.detachEvent("on" + type, handler);
            } else {
                element["on" + type] = null;
            }
        },

        getEvent: function(event) {
            //在IE中event作为window对象的一个属性可以直接使用，但是在Firefox中却使用了W3C的模型，它是通过传参的方法来传播事件的，也就是说你需要为你的函数提供一个事件响应的接口
            return event ? event : window.event;
        },

        getTarget: function(event) {
            //Firefox、Chrome下event对象只有target属性，IE下值只有srcElement属性
            return event.target || event.srcElement;
        },

        preventDefault: function(event) {
            if (event.preventDefault) {
                //Firefox、Chrome有效
                event.preventDefault();
            } else {
                //IE等效preventDefault
                event.returnValue = false;
            }
        },

        stopPropagation: function(event) {
            if (event.stopPropagation) {
                //Firefox、Chrome有效
                event.stopPropagation();
            } else {
                //IE下有效
                event.cancelBubble = true;
            }
        }

    };



    function parseURL(url) {
        var a =  document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':',''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            params: (function(){
                var ret = {},
                seg = a.search.replace(/^\?/,'').split('&'),
                len = seg.length, i = 0, s;
                for (;i<len;i++) {
                    if (!seg[i]) { continue; }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
            hash: a.hash.replace('#',''),
            path: a.pathname.replace(/^([^\/])/,'/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
            segments: a.pathname.replace(/^\//,'').split('/')
        };
    }
