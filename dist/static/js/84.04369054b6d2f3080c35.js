webpackJsonp([84],{1027:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("transition",{attrs:{name:"move"}},[e("div",{staticClass:"userContainer"},[e("div",{staticClass:"userContainerBox"},[e("scroll",{staticClass:"scrollBox"},[e("div",{staticClass:"helpCenter"},[e("div",{staticClass:"infoBox"},[e("p",{staticClass:"info"},[t._v("常见问题")])]),t._v(" "),e("div",{staticClass:"questionContainer"},t._l(t.questions,function(i,o){return e("div",{key:o,staticClass:"questionBox"},[e("div",{staticClass:"left  border-right-1px",on:{click:function(i){t.goInfo(o)}}},[e("span",{staticClass:"icon iconfont"}),t._v(" "),e("span",{staticClass:"text"},[t._v(t._s(i.text))])]),t._v(" "),e("div",{staticClass:"right"},t._l(i.list,function(i,n){return e("div",{key:n,staticClass:"rightLine border-bottom-1px",on:{click:function(i){t.goInfo(o,n)}}},[t._v("\n                  "+t._s(i.name)+"\n                ")])}))])})),t._v(" "),e("div",{staticClass:"infoBox"},[e("p",{staticClass:"info"},[t._v("客服QQ：1098237458")])])])])],1)])])},staticRenderFns:[]}},254:function(t,i,e){e(903);var o=e(2)(e(653),e(1027),"data-v-ab65d10c",null);t.exports=o.exports},280:function(t,i,e){var o=e(2)(e(282),e(283),null,null);t.exports=o.exports},281:function(t,i,e){/*!
 * better-normal-scroll v1.3.0
 * (c) 2016-2017 ustbhuangyi
 * Released under the MIT License.
 */
!function(i,e){t.exports=e()}(0,function(){"use strict";function t(t){return!1!==C&&("standard"===C?t:C+t.charAt(0).toUpperCase()+t.substr(1))}function i(t,i,e,o){t.addEventListener(i,e,{passive:!1,capture:!!o})}function e(t,i,e,o){t.removeEventListener(i,e,{passive:!1,capture:!!o})}function o(t){for(var i=0,e=0;t;)i-=t.offsetLeft,e-=t.offsetTop,t=t.offsetParent;return{left:i,top:e}}function n(t){if(t instanceof window.SVGElement){var i=t.getBoundingClientRect();return{top:i.top,left:i.left,width:i.width,height:i.height}}return{top:t.offsetTop,left:t.offsetLeft,width:t.offsetWidth,height:t.offsetHeight}}function s(t,i){for(var e in i)if(i[e].test(t[e]))return!0;return!1}function r(t,i){var e=document.createEvent("Event");e.initEvent(i,!0,!0),e.pageX=t.pageX,e.pageY=t.pageY,t.target.dispatchEvent(e)}function a(t){var i=t.target;if(!/(SELECT|INPUT|TEXTAREA)/i.test(i.tagName)){var e=document.createEvent(window.MouseEvent?"MouseEvents":"Event");e.initEvent("click",!0,!1),e._constructed=!0,i.dispatchEvent(e)}}function h(t,i){i.firstChild?l(t,i.firstChild):i.appendChild(t)}function l(t,i){i.parentNode.insertBefore(t,i)}function c(){return window.performance&&window.performance.now?window.performance.now()+window.performance.timing.navigationStart:+new Date}function p(t){for(var i=arguments.length,e=Array(i>1?i-1:0),o=1;o<i;o++)e[o-1]=arguments[o];for(var n=0;n<e.length;n++){var s=e[n];for(var r in s)t[r]=s[r]}return t}function d(t,i,e,o,n,s){var r=t-i,a=Math.abs(r)/e,h=s.deceleration,l=s.itemHeight,c=s.swipeBounceTime,p=s.wheel,d=s.swipeTime,u=d,f=p?4:15,m=t+a/h*(r<0?-1:1);return p&&l&&(m=Math.round(m/l)*l),m<o?(m=n?o-n/f*a:o,u=c):m>0&&(m=n?n/f*a:0,u=c),{destination:Math.round(m),duration:u}}function u(t){var i=document.createElement("div"),e=document.createElement("div");return i.style.cssText="position:absolute;z-index:9999;pointerEvents:none",e.style.cssText="box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px;",e.className="bscroll-indicator","horizontal"===t?(i.style.cssText+=";height:7px;left:2px;right:2px;bottom:0",e.style.height="100%",i.className="bscroll-horizontal-scrollbar"):(i.style.cssText+=";width:7px;bottom:2px;top:2px;right:1px",e.style.width="100%",i.className="bscroll-vertical-scrollbar"),i.style.cssText+=";overflow:hidden",i.appendChild(e),i}function f(t,i){this.wrapper=i.el,this.wrapperStyle=this.wrapper.style,this.indicator=this.wrapper.children[0],this.indicatorStyle=this.indicator.style,this.scroller=t,this.direction=i.direction,i.fade?(this.visible=0,this.wrapperStyle.opacity="0"):this.visible=1}function m(t){console.error("[BScroll warn]: "+t)}function g(t,i){this.wrapper="string"==typeof t?document.querySelector(t):t,this.wrapper||m("can not resolve the wrapper dom"),this.scroller=this.wrapper.children[0],this.scroller||m("the wrapper need at least one child element to be scroller"),this.scrollerStyle=this.scroller.style,this._init(t,i)}var A=function(){function t(t,i){var e=[],o=!0,n=!1,s=void 0;try{for(var r,a=t[Symbol.iterator]();!(o=(r=a.next()).done)&&(e.push(r.value),!i||e.length!==i);o=!0);}catch(t){n=!0,s=t}finally{try{!o&&a.return&&a.return()}finally{if(n)throw s}}return e}return function(i,e){if(Array.isArray(i))return i;if(Symbol.iterator in Object(i))return t(i,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),v=function(t){if(Array.isArray(t)){for(var i=0,e=Array(t.length);i<t.length;i++)e[i]=t[i];return e}return Array.from(t)},x=document.createElement("div").style,C=function(){var t={webkit:"webkitTransform",Moz:"MozTransform",O:"OTransform",ms:"msTransform",standard:"transform"};for(var i in t)if(void 0!==x[t[i]])return i;return!1}(),b=t("transform"),y=t("perspective")in x,w="ontouchstart"in window,B=!1!==b,T=t("transition")in x,S={transform:b,transitionTimingFunction:t("transitionTimingFunction"),transitionDuration:t("transitionDuration"),transitionDelay:t("transitionDelay"),transformOrigin:t("transformOrigin"),transitionEnd:t("transitionEnd")},k=1,E={touchstart:k,touchmove:k,touchend:k,mousedown:2,mousemove:2,mouseup:2},_={startX:0,startY:0,scrollX:!1,scrollY:!0,freeScroll:!1,directionLockThreshold:5,eventPassthrough:"",click:!1,tap:!1,bounce:!0,bounceTime:700,momentum:!0,momentumLimitTime:300,momentumLimitDistance:15,swipeTime:2500,swipeBounceTime:500,deceleration:.001,flickLimitTime:200,flickLimitDistance:100,resizePolling:60,probeType:0,preventDefault:!0,preventDefaultException:{tagName:/^(INPUT|TEXTAREA|BUTTON|SELECT)$/},HWCompositing:!0,useTransition:!0,useTransform:!0,bindToWrapper:!1,disableMouse:w,disableTouch:!w,wheel:!1,snap:!1,scrollbar:!1,pullDownRefresh:!1,pullUpLoad:!1},Y={swipe:{style:"cubic-bezier(0.23, 1, 0.32, 1)",fn:function(t){return 1+--t*t*t*t*t}},swipeBounce:{style:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",fn:function(t){return t*(2-t)}},bounce:{style:"cubic-bezier(0.165, 0.84, 0.44, 1)",fn:function(t){return 1- --t*t*t*t}}},X=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||function(t){return window.setTimeout(t,(t.interval||100/60)/2)}}(),P=function(){return window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||function(t){window.clearTimeout(t)}}();return f.prototype.refresh=function(){this.transitionTime(),this._calculate(),this.updatePosition()},f.prototype.fade=function(t,i){var e=this;if(!i||this.visible){var o=t?250:500;t=t?"1":"0",this.wrapperStyle[S.transitionDuration]=o+"ms",clearTimeout(this.fadeTimeout),this.fadeTimeout=setTimeout(function(){e.wrapperStyle.opacity=t,e.visible=+t},0)}},f.prototype.updatePosition=function(){if("vertical"===this.direction){var t=Math.round(this.sizeRatioY*this.scroller.y);if(t<0){this.transitionTime(500);var i=Math.max(this.indicatorHeight+3*t,8);this.indicatorStyle.height=i+"px",t=0}else if(t>this.maxPosY){this.transitionTime(500);var e=Math.max(this.indicatorHeight-3*(t-this.maxPosY),8);this.indicatorStyle.height=e+"px",t=this.maxPosY+this.indicatorHeight-e}else this.indicatorStyle.height=this.indicatorHeight+"px";this.y=t,this.scroller.options.useTransform?this.indicatorStyle[S.transform]="translateY("+t+"px)"+this.scroller.translateZ:this.indicatorStyle.top=t+"px"}else{var o=Math.round(this.sizeRatioX*this.scroller.x);if(o<0){this.transitionTime(500);var n=Math.max(this.indicatorWidth+3*o,8);this.indicatorStyle.width=n+"px",o=0}else if(o>this.maxPosX){this.transitionTime(500);var s=Math.max(this.indicatorWidth-3*(o-this.maxPosX),8);this.indicatorStyle.width=s+"px",o=this.maxPosX+this.indicatorWidth-s}else this.indicatorStyle.width=this.indicatorWidth+"px";this.x=o,this.scroller.options.useTransform?this.indicatorStyle[S.transform]="translateX("+o+"px)"+this.scroller.translateZ:this.indicatorStyle.left=o+"px"}},f.prototype.transitionTime=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.indicatorStyle[S.transitionDuration]=t+"ms"},f.prototype.transitionTimingFunction=function(t){this.indicatorStyle[S.transitionTimingFunction]=t},f.prototype.remove=function(){this.wrapper.parentNode.removeChild(this.wrapper)},f.prototype._calculate=function(){if("vertical"===this.direction){var t=this.wrapper.clientHeight;this.indicatorHeight=Math.max(Math.round(t*t/(this.scroller.scrollerHeight||t||1)),8),this.indicatorStyle.height=this.indicatorHeight+"px",this.maxPosY=t-this.indicatorHeight,this.sizeRatioY=this.maxPosY/this.scroller.maxScrollY}else{var i=this.wrapper.clientWidth;this.indicatorWidth=Math.max(Math.round(i*i/(this.scroller.scrollerWidth||i||1)),8),this.indicatorStyle.width=this.indicatorWidth+"px",this.maxPosX=i-this.indicatorWidth,this.sizeRatioX=this.maxPosX/this.scroller.maxScrollX}},function(t){t.prototype._init=function(t,i){this._handleOptions(i),this._events={},this.x=0,this.y=0,this.directionX=0,this.directionY=0,this._addDOMEvents(),this._initExtFeatures(),this.refresh(),this.options.snap||this.scrollTo(this.options.startX,this.options.startY),this.enable()},t.prototype._handleOptions=function(t){this.options=p({},_,t),this.translateZ=this.options.HWCompositing&&y?" translateZ(0)":"",this.options.useTransition=this.options.useTransition&&T,this.options.useTransform=this.options.useTransform&&B,this.options.preventDefault=!this.options.eventPassthrough&&this.options.preventDefault,this.options.scrollX="horizontal"!==this.options.eventPassthrough&&this.options.scrollX,this.options.scrollY="vertical"!==this.options.eventPassthrough&&this.options.scrollY,this.options.freeScroll=this.options.freeScroll&&!this.options.eventPassthrough,this.options.directionLockThreshold=this.options.eventPassthrough?0:this.options.directionLockThreshold,!0===this.options.tap&&(this.options.tap="tap")},t.prototype._addDOMEvents=function(){var t=i;this._handleDOMEvents(t)},t.prototype._removeDOMEvents=function(){var t=e;this._handleDOMEvents(t)},t.prototype._handleDOMEvents=function(t){var i=this.options.bindToWrapper?this.wrapper:window;t(window,"orientationchange",this),t(window,"resize",this),this.options.click&&t(this.wrapper,"click",this,!0),this.options.disableMouse||(t(this.wrapper,"mousedown",this),t(i,"mousemove",this),t(i,"mousecancel",this),t(i,"mouseup",this)),w&&!this.options.disableTouch&&(t(this.wrapper,"touchstart",this),t(i,"touchmove",this),t(i,"touchcancel",this),t(i,"touchend",this)),t(this.scroller,S.transitionEnd,this)},t.prototype._initExtFeatures=function(){this.options.snap&&this._initSnap(),this.options.scrollbar&&this._initScrollbar(),this.options.pullUpLoad&&this._initPullUp()},t.prototype.handleEvent=function(t){switch(t.type){case"touchstart":case"mousedown":this._start(t);break;case"touchmove":case"mousemove":this._move(t);break;case"touchend":case"mouseup":case"touchcancel":case"mousecancel":this._end(t);break;case"orientationchange":case"resize":this._resize();break;case"transitionend":case"webkitTransitionEnd":case"oTransitionEnd":case"MSTransitionEnd":this._transitionEnd(t);break;case"click":this.enabled&&!t._constructed&&(t.preventDefault(),t.stopPropagation())}},t.prototype.refresh=function(){var t=n(this.wrapper);this.wrapperWidth=t.width,this.wrapperHeight=t.height;var i=n(this.scroller);this.scrollerWidth=i.width,this.scrollerHeight=i.height;var e=this.options.wheel;e?(this.items=this.scroller.children,this.options.itemHeight=this.itemHeight=this.items.length?this.scrollerHeight/this.items.length:0,void 0===this.selectedIndex&&(this.selectedIndex=e.selectedIndex),this.options.startY=-this.selectedIndex*this.itemHeight,this.maxScrollX=0,this.maxScrollY=-this.itemHeight*(this.items.length-1)):(this.maxScrollX=this.wrapperWidth-this.scrollerWidth,this.maxScrollY=this.wrapperHeight-this.scrollerHeight),this.hasHorizontalScroll=this.options.scrollX&&this.maxScrollX<0,this.hasVerticalScroll=this.options.scrollY&&this.maxScrollY<0,this.hasHorizontalScroll||(this.maxScrollX=0,this.scrollerWidth=this.wrapperWidth),this.hasVerticalScroll||(this.maxScrollY=0,this.scrollerHeight=this.wrapperHeight),this.endTime=0,this.directionX=0,this.directionY=0,this.wrapperOffset=o(this.wrapper),this.trigger("refresh"),this.resetPosition()},t.prototype.enable=function(){this.enabled=!0},t.prototype.disable=function(){this.enabled=!1}}(g),function(t){t.prototype._start=function(t){var i=E[t.type];if((i===k||0===t.button)&&!(!this.enabled||this.destroyed||this.initiated&&this.initiated!==i)){this.initiated=i,this.options.preventDefault&&!s(t.target,this.options.preventDefaultException)&&t.preventDefault(),this.moved=!1,this.distX=0,this.distY=0,this.directionX=0,this.directionY=0,this.movingDirectionX=0,this.movingDirectionY=0,this.directionLocked=0,this._transitionTime(),this.startTime=c(),this.options.wheel&&(this.target=t.target),this.stop();var e=t.touches?t.touches[0]:t;this.startX=this.x,this.startY=this.y,this.absStartX=this.x,this.absStartY=this.y,this.pointX=e.pageX,this.pointY=e.pageY,this.trigger("beforeScrollStart")}},t.prototype._move=function(t){if(this.enabled&&!this.destroyed&&E[t.type]===this.initiated){this.options.preventDefault&&t.preventDefault();var i=t.touches?t.touches[0]:t,e=i.pageX-this.pointX,o=i.pageY-this.pointY;this.pointX=i.pageX,this.pointY=i.pageY,this.distX+=e,this.distY+=o;var n=Math.abs(this.distX),s=Math.abs(this.distY),r=c();if(!(r-this.endTime>this.options.momentumLimitTime&&s<this.options.momentumLimitDistance&&n<this.options.momentumLimitDistance)){if(this.directionLocked||this.options.freeScroll||(n>s+this.options.directionLockThreshold?this.directionLocked="h":s>=n+this.options.directionLockThreshold?this.directionLocked="v":this.directionLocked="n"),"h"===this.directionLocked){if("vertical"===this.options.eventPassthrough)t.preventDefault();else if("horizontal"===this.options.eventPassthrough)return void(this.initiated=!1);o=0}else if("v"===this.directionLocked){if("horizontal"===this.options.eventPassthrough)t.preventDefault();else if("vertical"===this.options.eventPassthrough)return void(this.initiated=!1);e=0}e=this.hasHorizontalScroll?e:0,o=this.hasVerticalScroll?o:0,this.movingDirectionX=e>0?-1:e<0?1:0,this.movingDirectionY=o>0?-1:o<0?1:0;var a=this.x+e,h=this.y+o;(a>0||a<this.maxScrollX)&&(a=this.options.bounce?this.x+e/3:a>0?0:this.maxScrollX),(h>0||h<this.maxScrollY)&&(h=this.options.bounce?this.y+o/3:h>0?0:this.maxScrollY),this.moved||(this.moved=!0,this.trigger("scrollStart")),this._translate(a,h),r-this.startTime>this.options.momentumLimitTime&&(this.startTime=r,this.startX=this.x,this.startY=this.y,1===this.options.probeType&&this.trigger("scroll",{x:this.x,y:this.y})),this.options.probeType>1&&this.trigger("scroll",{x:this.x,y:this.y});var l=document.documentElement.scrollLeft||window.pageXOffset||document.body.scrollLeft,p=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop,d=this.pointX-l,u=this.pointY-p;(d>document.documentElement.clientWidth-this.options.momentumLimitDistance||d<this.options.momentumLimitDistance||u<this.options.momentumLimitDistance||u>document.documentElement.clientHeight-this.options.momentumLimitDistance)&&this._end(t)}}},t.prototype._end=function(t){if(this.enabled&&!this.destroyed&&E[t.type]===this.initiated&&(this.initiated=!1,this.options.preventDefault&&!s(t.target,this.options.preventDefaultException)&&t.preventDefault(),this.trigger("touchEnd",{x:this.x,y:this.y}),!(this.options.pullDownRefresh&&this._checkPullDown()||this.resetPosition(this.options.bounceTime,Y.bounce)))){this.isInTransition=!1;var i=Math.round(this.x),e=Math.round(this.y);if(!this.moved){if(this.options.wheel){if(this.target&&"wheel-scroll"===this.target.className){var n=Math.abs(Math.round(e/this.itemHeight)),h=Math.round((this.pointY+o(this.target).top-this.itemHeight/2)/this.itemHeight);this.target=this.items[n+h]}this.scrollToElement(this.target,this.options.wheel.adjustTime||400,!0,!0,Y.swipe)}else this.options.tap&&r(t,this.options.tap),this.options.click&&a(t);return void this.trigger("scrollCancel")}this.scrollTo(i,e);var l=i-this.absStartX,p=e-this.absStartY;this.directionX=l>0?-1:l<0?1:0,this.directionY=p>0?-1:p<0?1:0,this.endTime=c();var u=this.endTime-this.startTime,f=Math.abs(i-this.startX),m=Math.abs(e-this.startY);if(this._events.flick&&u<this.options.flickLimitTime&&f<this.options.flickLimitDistance&&m<this.options.flickLimitDistance)return void this.trigger("flick");var g=0;if(this.options.momentum&&u<this.options.momentumLimitTime&&(m>this.options.momentumLimitDistance||f>this.options.momentumLimitDistance)){var A=this.hasHorizontalScroll?d(this.x,this.startX,u,this.maxScrollX,this.options.bounce?this.wrapperWidth:0,this.options):{destination:i,duration:0},v=this.hasVerticalScroll?d(this.y,this.startY,u,this.maxScrollY,this.options.bounce?this.wrapperHeight:0,this.options):{destination:e,duration:0};i=A.destination,e=v.destination,g=Math.max(A.duration,v.duration),this.isInTransition=1}else this.options.wheel&&(e=Math.round(e/this.itemHeight)*this.itemHeight,g=this.options.wheel.adjustTime||400);var x=Y.swipe;if(this.options.snap){var C=this._nearestSnap(i,e);this.currentPage=C,g=this.options.snapSpeed||Math.max(Math.max(Math.min(Math.abs(i-C.x),1e3),Math.min(Math.abs(e-C.y),1e3)),300),i=C.x,e=C.y,this.directionX=0,this.directionY=0,x=Y.bounce}if(i!==this.x||e!==this.y)return(i>0||i<this.maxScrollX||e>0||e<this.maxScrollY)&&(x=Y.swipeBounce),void this.scrollTo(i,e,g,x);this.options.wheel&&(this.selectedIndex=0|Math.abs(this.y/this.itemHeight)),this.trigger("scrollEnd",{x:this.x,y:this.y})}},t.prototype._resize=function(){var t=this;this.enabled&&(clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(function(){t.refresh()},this.options.resizePolling))},t.prototype._startProbe=function(){function t(){if(i.isInTransition){var e=i.getComputedPosition();i.trigger("scroll",e),i.probeTimer=X(t)}}P(this.probeTimer),this.probeTimer=X(t);var i=this},t.prototype._transitionTime=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;if(this.scrollerStyle[S.transitionDuration]=t+"ms",this.options.wheel)for(var i=0;i<this.items.length;i++)this.items[i].style[S.transitionDuration]=t+"ms";if(this.indicators)for(var e=0;e<this.indicators.length;e++)this.indicators[e].transitionTime(t)},t.prototype._transitionTimingFunction=function(t){if(this.scrollerStyle[S.transitionTimingFunction]=t,this.options.wheel)for(var i=0;i<this.items.length;i++)this.items[i].style[S.transitionTimingFunction]=t;if(this.indicators)for(var e=0;e<this.indicators.length;e++)this.indicators[e].transitionTimingFunction(t)},t.prototype._transitionEnd=function(t){t.target===this.scroller&&this.isInTransition&&(this._transitionTime(),this.pulling||this.resetPosition(this.options.bounceTime,Y.bounce)||(this.isInTransition=!1,this.trigger("scrollEnd",{x:this.x,y:this.y})))},t.prototype._translate=function(t,i){if(this.options.useTransform?this.scrollerStyle[S.transform]="translate("+t+"px,"+i+"px)"+this.translateZ:(t=Math.round(t),i=Math.round(i),this.scrollerStyle.left=t+"px",this.scrollerStyle.top=i+"px"),this.options.wheel)for(var e=this.options.wheel.rotate,o=void 0===e?25:e,n=0;n<this.items.length;n++){var s=o*(i/this.itemHeight+n);this.items[n].style[S.transform]="rotateX("+s+"deg)"}if(this.x=t,this.y=i,this.indicators)for(var r=0;r<this.indicators.length;r++)this.indicators[r].updatePosition()},t.prototype._animate=function(t,i,e,o){function n(){var p=c();if(p>=l)return s.isAnimating=!1,s._translate(t,i),void(s.pulling||s.resetPosition(s.options.bounceTime)||s.trigger("scrollEnd",{x:s.x,y:s.y}));p=(p-h)/e;var d=o(p),u=(t-r)*d+r,f=(i-a)*d+a;s._translate(u,f),s.isAnimating&&(s.animateTimer=X(n)),3===s.options.probeType&&s.trigger("scroll",{x:this.x,y:this.y})}var s=this,r=this.x,a=this.y,h=c(),l=h+e;this.isAnimating=!0,P(this.animateTimer),n()},t.prototype.scrollBy=function(t,i){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:Y.bounce;t=this.x+t,i=this.y+i,this.scrollTo(t,i,e,o)},t.prototype.scrollTo=function(t,i){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:Y.bounce;this.isInTransition=this.options.useTransition&&e>0&&(t!==this.x||i!==this.y),!e||this.options.useTransition?(this._transitionTimingFunction(o.style),this._transitionTime(e),this._translate(t,i),e&&3===this.options.probeType&&this._startProbe(),this.options.wheel&&(i>0?this.selectedIndex=0:i<this.maxScrollY?this.selectedIndex=this.items.length-1:this.selectedIndex=0|Math.abs(i/this.itemHeight))):this._animate(t,i,e,o.fn)},t.prototype.scrollToElement=function(t,i,e,n,s){if(t&&(t=t.nodeType?t:this.scroller.querySelector(t),!this.options.wheel||"wheel-item"===t.className)){var r=o(t);r.left-=this.wrapperOffset.left,r.top-=this.wrapperOffset.top,!0===e&&(e=Math.round(t.offsetWidth/2-this.wrapper.offsetWidth/2)),!0===n&&(n=Math.round(t.offsetHeight/2-this.wrapper.offsetHeight/2)),r.left-=e||0,r.top-=n||0,r.left=r.left>0?0:r.left<this.maxScrollX?this.maxScrollX:r.left,r.top=r.top>0?0:r.top<this.maxScrollY?this.maxScrollY:r.top,this.options.wheel&&(r.top=Math.round(r.top/this.itemHeight)*this.itemHeight),this.scrollTo(r.left,r.top,i,s)}},t.prototype.resetPosition=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Y.bounce,e=this.x;!this.hasHorizontalScroll||e>0?e=0:e<this.maxScrollX&&(e=this.maxScrollX);var o=this.y;return!this.hasVerticalScroll||o>0?o=0:o<this.maxScrollY&&(o=this.maxScrollY),(e!==this.x||o!==this.y)&&(this.scrollTo(e,o,t,i),!0)},t.prototype.getComputedPosition=function(){var t=window.getComputedStyle(this.scroller,null),i=void 0,e=void 0;return this.options.useTransform?(t=t[S.transform].split(")")[0].split(", "),i=+(t[12]||t[4]),e=+(t[13]||t[5])):(i=+t.left.replace(/[^-\d.]/g,""),e=+t.top.replace(/[^-\d.]/g,"")),{x:i,y:e}},t.prototype.stop=function(){if(this.options.useTransition&&this.isInTransition){this.isInTransition=!1;var t=this.getComputedPosition();this._translate(t.x,t.y),this.options.wheel?this.target=this.items[Math.round(-t.y/this.itemHeight)]:this.trigger("scrollEnd",{x:this.x,y:this.y})}else!this.options.useTransition&&this.isAnimating&&(this.isAnimating=!1,this.trigger("scrollEnd",{x:this.x,y:this.y}))},t.prototype.destroy=function(){this._removeDOMEvents(),this.options.scrollbar&&this._removeScrollBars(),this.destroyed=!0,this.trigger("destroy")}}(g),function(t){t.prototype.on=function(t,i){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this;this._events[t]||(this._events[t]=[]),this._events[t].push([i,e])},t.prototype.once=function(t,i){function e(){this.off(t,e),n||(n=!0,i.apply(o,arguments))}var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this,n=!1;this.on(t,e)},t.prototype.off=function(t,i){var e=this._events[t];if(e)for(var o=e.length;o--;)e[o][0]===i&&(e[o][0]=void 0)},t.prototype.trigger=function(t){var i=this._events[t];if(i)for(var e=i.length,o=[].concat(v(i)),n=0;n<e;n++){var s=o[n],r=A(s,2),a=r[0],h=r[1];a&&a.apply(h,[].slice.call(arguments,1))}}}(g),function(t){t.prototype._initSnap=function(){var t=this;this.currentPage={};var i=this.options.snap;if(i.loop){var e=this.scroller.children;e.length>0&&(h(e[e.length-1].cloneNode(!0),this.scroller),this.scroller.appendChild(e[1].cloneNode(!0)))}var o=i.el;"string"==typeof o&&(o=this.scroller.querySelectorAll(o)),this.on("refresh",function(){if(t.pages=[],t.wrapperWidth&&t.wrapperHeight&&t.scrollerWidth&&t.scrollerHeight){var e=i.stepX||t.wrapperWidth,s=i.stepY||t.wrapperHeight,r=0,a=void 0,h=void 0,l=void 0,c=0,p=void 0,d=0,u=void 0,f=void 0;if(o)for(p=o.length,u=-1;c<p;c++)f=n(o[c]),(0===c||f.left<=n(o[c-1]).left)&&(d=0,u++),t.pages[d]||(t.pages[d]=[]),r=Math.max(-f.left,t.maxScrollX),a=Math.max(-f.top,t.maxScrollY),h=r-Math.round(f.width/2),l=a-Math.round(f.height/2),t.pages[d][u]={x:r,y:a,width:f.width,height:f.height,cx:h,cy:l},r>t.maxScrollX&&d++;else for(h=Math.round(e/2),l=Math.round(s/2);r>-t.scrollerWidth;){for(t.pages[c]=[],p=0,a=0;a>-t.scrollerHeight;)t.pages[c][p]={x:Math.max(r,t.maxScrollX),y:Math.max(a,t.maxScrollY),width:e,height:s,cx:r-h,cy:a-l},a-=s,p++;r-=e,c++}var m=i.loop?1:0;t.goToPage(t.currentPage.pageX||m,t.currentPage.pageY||0,0);var g=i.threshold;g%1==0?(t.snapThresholdX=g,t.snapThresholdY=g):(t.snapThresholdX=Math.round(t.pages[t.currentPage.pageX][t.currentPage.pageY].width*g),t.snapThresholdY=Math.round(t.pages[t.currentPage.pageX][t.currentPage.pageY].height*g))}}),this.on("scrollEnd",function(){i.loop&&(0===t.currentPage.pageX&&t.goToPage(t.pages.length-2,t.currentPage.pageY,0),t.currentPage.pageX===t.pages.length-1&&t.goToPage(1,t.currentPage.pageY,0))}),!1!==i.listenFlick&&this.on("flick",function(){var e=i.speed||Math.max(Math.max(Math.min(Math.abs(t.x-t.startX),1e3),Math.min(Math.abs(t.y-t.startY),1e3)),300);t.goToPage(t.currentPage.pageX+t.directionX,t.currentPage.pageY+t.directionY,e)})},t.prototype._nearestSnap=function(t,i){if(!this.pages.length)return{x:0,y:0,pageX:0,pageY:0};var e=0;if(Math.abs(t-this.absStartX)<=this.snapThresholdX&&Math.abs(i-this.absStartY)<=this.snapThresholdY)return this.currentPage;t>0?t=0:t<this.maxScrollX&&(t=this.maxScrollX),i>0?i=0:i<this.maxScrollY&&(i=this.maxScrollY);for(var o=this.pages.length;e<o;e++)if(t>=this.pages[e][0].cx){t=this.pages[e][0].x;break}o=this.pages[e].length;for(var n=0;n<o;n++)if(i>=this.pages[0][n].cy){i=this.pages[0][n].y;break}return e===this.currentPage.pageX&&(e+=this.directionX,e<0?e=0:e>=this.pages.length&&(e=this.pages.length-1),t=this.pages[e][0].x),n===this.currentPage.pageY&&(n+=this.directionY,n<0?n=0:n>=this.pages[0].length&&(n=this.pages[0].length-1),i=this.pages[0][n].y),{x:t,y:i,pageX:e,pageY:n}},t.prototype.goToPage=function(t,i,e){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:Y.bounce,n=this.options.snap;t>=this.pages.length?t=this.pages.length-1:t<0&&(t=0),i>=this.pages[t].length?i=this.pages[t].length-1:i<0&&(i=0);var s=this.pages[t][i].x,r=this.pages[t][i].y;e=void 0===e?n.speed||Math.max(Math.max(Math.min(Math.abs(s-this.x),1e3),Math.min(Math.abs(r-this.y),1e3)),300):e,this.currentPage={x:s,y:r,pageX:t,pageY:i},this.scrollTo(s,r,e,o)},t.prototype.next=function(t,i){var e=this.currentPage.pageX,o=this.currentPage.pageY;e++,e>=this.pages.length&&this.hasVerticalScroll&&(e=0,o++),this.goToPage(e,o,t,i)},t.prototype.prev=function(t,i){var e=this.currentPage.pageX,o=this.currentPage.pageY;e--,e<0&&this.hasVerticalScroll&&(e=0,o--),this.goToPage(e,o,t,i)},t.prototype.getCurrentPage=function(){return this.options.snap&&this.currentPage}}(g),function(t){t.prototype.wheelTo=function(t){this.options.wheel&&(this.y=-t*this.itemHeight,this.scrollTo(0,this.y))},t.prototype.getSelectedIndex=function(){return this.options.wheel&&this.selectedIndex}}(g),function(t){t.prototype._initScrollbar=function(){var t=this,i=this.options.scrollbar.fade,e=void 0===i||i;this.indicators=[];var o=void 0;this.options.scrollX&&(o={el:u("horizontal"),direction:"horizontal",fade:e},this._insertScrollBar(o.el),this.indicators.push(new f(this,o))),this.options.scrollY&&(o={el:u("vertical"),direction:"vertical",fade:e},this._insertScrollBar(o.el),this.indicators.push(new f(this,o))),this.on("refresh",function(){for(var i=0;i<t.indicators.length;i++)t.indicators[i].refresh()}),e&&(this.on("scrollEnd",function(){for(var i=0;i<t.indicators.length;i++)t.indicators[i].fade()}),this.on("scrollCancel",function(){for(var i=0;i<t.indicators.length;i++)t.indicators[i].fade()}),this.on("scrollStart",function(){for(var i=0;i<t.indicators.length;i++)t.indicators[i].fade(!0)}),this.on("beforeScrollStart",function(){for(var i=0;i<t.indicators.length;i++)t.indicators[i].fade(!0,!0)}))},t.prototype._insertScrollBar=function(t){this.wrapper.appendChild(t)},t.prototype._removeScrollBars=function(){for(var t=0;t<this.indicators.length;t++)this.indicators[t].remove()}}(g),function(t){t.prototype._checkPullDown=function(){var t=this.options.pullDownRefresh,i=t.threshold,e=void 0===i?90:i,o=t.stop,n=void 0===o?40:o;return this.y>e&&!this.pulling&&(this.pulling=!0,this.trigger("pullingDown"),this.scrollTo(this.x,n,this.options.bounceTime,Y.bounce)),this.pulling},t.prototype.finishPullDown=function(){this.pulling=!1,this.resetPosition(this.options.bounceTime,Y.bounce)}}(g),function(t){t.prototype._initPullUp=function(){this.options.probeType=3,this.pullupWatching=!1,this._watchPullUp()},t.prototype._watchPullUp=function(){function t(i){1===this.movingDirectionY&&i.y<=this.maxScrollY+e&&(this.trigger("pullingUp"),this.pullupWatching=!1,this.off("scroll",t))}if(!this.pullupWatching){this.pullupWatching=!0;var i=this.options.pullUpLoad.threshold,e=void 0===i?0:i;this.on("scroll",t)}},t.prototype.finishPullUp=function(){var t=this;this.isInTransition?this.once("scrollEnd",function(){t._watchPullUp()}):this._watchPullUp()}}(g),g.Version="1.3.0",g})},282:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=e(281),n=e.n(o);i.default={props:{probeType:{type:Number,default:1},scrollX:{type:Boolean,default:!1},click:{type:Boolean,default:!0},tap:{type:Boolean,default:!0},listenScroll:{type:Boolean,default:!1},data:{type:Array,default:null},pullup:{type:Boolean,default:!1},beforeScroll:{type:Boolean,default:!1},refreshDelay:{type:Number,default:20},preventDefaultException:{type:Object,default:function(){return{tagName:/^(INPUT|TEXTAREA|BUTTON|SELECT)$/}}}},mounted:function(){var t=this;setTimeout(function(){t._initScroll()},50)},methods:{_initScroll:function(){var t=this;if(this.$refs.wrapper){if(this.scroll=new n.a(this.$refs.wrapper,{probeType:this.probeType,click:this.click,tap:this.tap,scrollX:this.scrollX,scrollY:!this.scrollX,preventDefaultException:this.preventDefaultException}),this.listenScroll){var i=this;this.scroll.on("scroll",function(t){i.$emit("scroll",t)})}this.pullup&&this.scroll.on("scrollEnd",function(){t.scroll.y<=t.scroll.maxScrollY+50&&t.$emit("scrollToEnd",t.scroll)}),this.beforeScroll&&this.scroll.on("beforeScrollStart",function(){t.$emit("beforeScroll")})}},disable:function(){this.scroll&&this.scroll.disable()},stop:function(){this.scroll&&this.scroll.stop()},enable:function(){this.scroll&&this.scroll.enable()},refresh:function(){this.scroll&&this.scroll.refresh()},scrollTo:function(){this.scroll&&this.scroll.scrollTo.apply(this.scroll,arguments)},scrollToElement:function(){this.scroll&&this.scroll.scrollToElement.apply(this.scroll,arguments)},pullingDown:function(){this.scroll&&this.scroll.pullingDown()}},watch:{data:function(){var t=this;setTimeout(function(){t.refresh()},this.refreshDelay)}}}},283:function(t,i){t.exports={render:function(){var t=this,i=t.$createElement;return(t._self._c||i)("div",{ref:"wrapper"},[t._t("default")],2)},staticRenderFns:[]}},653:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=e(280),n=e.n(o);i.default={name:"buyCoin",components:{Scroll:n.a},data:function(){return{questions:[{icon:"",text:"新手问题",list:[{name:"申请需要什么条件?"},{name:"申请需要交钱吗？"}]},{icon:"",text:"试用申请",list:[{name:"如何申请商品？"},{name:"每天最多可以得到几个商品呢？"}]},{icon:"",text:"下单领取",list:[{name:"中奖商品有下单时间限制要求吗？",link:""},{name:"下单时可以使用信用卡付款吗？",link:""}]},{icon:"",text:"收货评价",list:[{name:"商品对评价有什么要求吗？",link:""},{name:"图文好评任务评价时需要注意些什么呢？",link:""}]},{icon:"",text:"返款/提现",list:[{name:"银行卡不小心绑定错误了怎么办？",link:""},{name:"任务完成后什么时候返款？",link:""}]}]}},methods:{goInfo:function(t,i){this.$router.push({name:"helpInfo",query:{index:t,chooseIndex:i}})}}}},793:function(t,i,e){i=t.exports=e(190)(),i.push([t.i,".userContainer[data-v-ab65d10c]{position:fixed;width:100%;height:100%;left:0;top:0;bottom:0;z-index:9999;background:#eff0f2}.userContainer.move-enter-active[data-v-ab65d10c],.userContainer .move-leave-active[data-v-ab65d10c]{-webkit-transition:all .2s linear;transition:all .2s linear;-webkit-transform:translateZ(0);transform:translateZ(0)}.userContainer.move-enter[data-v-ab65d10c],.userContainer .move-leave[data-v-ab65d10c]{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}.userContainer .userContainerBox[data-v-ab65d10c]{background:#eff0f2;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;height:100%}.userContainer .userContainerBox .scrollBox[data-v-ab65d10c]{height:100%}.userContainer .userContainerBox .helpCenter .infoBox[data-v-ab65d10c]{width:100%;box-sizing:border-box;padding:1.2rem 1.6rem}.userContainer .userContainerBox .helpCenter .infoBox .info[data-v-ab65d10c]{font-size:1.2rem;color:#75787f;line-height:1.2rem;padding-bottom:.8rem}.userContainer .userContainerBox .helpCenter .infoBox .info[data-v-ab65d10c]:last-child{padding-bottom:0}.userContainer .userContainerBox .helpCenter .questionContainer .questionBox[data-v-ab65d10c]{background:#fff;margin-bottom:1.2rem;display:-webkit-box;display:-webkit-flex;display:flex}.userContainer .userContainerBox .helpCenter .questionContainer .questionBox[data-v-ab65d10c]:last-child{margin-bottom:0}.userContainer .userContainerBox .helpCenter .questionContainer .questionBox .left[data-v-ab65d10c]{-webkit-box-flex:0;-webkit-flex:0 0 10rem;flex:0 0 10rem;font-size:0;text-align:center;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;height:10rem;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.userContainer .userContainerBox .helpCenter .questionContainer .questionBox .left[data-v-ab65d10c]:after{border-right:1px solid #b7b9bf}.userContainer .userContainerBox .helpCenter .questionContainer .questionBox .left .icon[data-v-ab65d10c]{color:#08090a;font-size:2rem}.userContainer .userContainerBox .helpCenter .questionContainer .questionBox .left .text[data-v-ab65d10c]{font-size:1.4rem;color:#08090a}.userContainer .userContainerBox .helpCenter .questionContainer .questionBox .right[data-v-ab65d10c]{-webkit-box-flex:1;-webkit-flex:1;flex:1;overflow:hidden}.userContainer .userContainerBox .helpCenter .questionContainer .questionBox .right .rightLine[data-v-ab65d10c]{height:5rem;line-height:5rem;font-size:1.4rem;color:#75787f;box-sizing:border-box;width:100%;padding:0 1.2rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.userContainer .userContainerBox .helpCenter .questionContainer .questionBox .right .rightLine[data-v-ab65d10c]:first-child:after{border-bottom:1px solid #b7b9bf}","",{version:3,sources:["C:/Users/Administrator/Desktop/mobile/src/components/user/helpCenter/helpCenter.vue"],names:[],mappings:"AACA,gCAEE,eAAgB,AAChB,WAAY,AACZ,YAAa,AACb,OAAQ,AACR,MAAO,AACP,SAAU,AACV,aAAc,AACd,kBAAoB,CACrB,AACD,qGAEE,kCAAoC,AACpC,0BAA4B,AAC5B,gCAAwC,AACxC,uBAAgC,CACjC,AACD,uFAEE,wCAA2C,AAC3C,+BAAmC,CACpC,AACD,kDACE,mBAAoB,AACpB,oBAAqB,AACrB,qBAAsB,AACtB,aAAc,AACd,4BAA6B,AAC7B,6BAA8B,AAC9B,8BAA+B,AACvB,sBAAuB,AAC/B,WAAa,CACd,AACD,6DACE,WAAa,CACd,AACD,uEACE,WAAY,AACZ,sBAAuB,AACvB,qBAAuB,CACxB,AACD,6EACE,iBAAkB,AAClB,cAAe,AACf,mBAAoB,AACpB,oBAAuB,CACxB,AACD,wFACE,gBAAkB,CACnB,AACD,8FACE,gBAAiB,AACjB,qBAAsB,AACtB,oBAAqB,AACrB,qBAAsB,AACtB,YAAc,CACf,AACD,yGACE,eAAiB,CAClB,AACD,oGACE,mBAAoB,AACpB,uBAAwB,AAChB,eAAgB,AACxB,YAAa,AACb,kBAAmB,AACnB,oBAAqB,AACrB,qBAAsB,AACtB,aAAc,AACd,4BAA6B,AAC7B,6BAA8B,AAC9B,8BAA+B,AACvB,sBAAuB,AAC/B,aAAc,AACd,wBAAyB,AACzB,+BAAgC,AACxB,sBAAwB,CACjC,AACD,0GACE,8BAAgC,CACjC,AACD,0GACE,cAAe,AACf,cAAgB,CACjB,AACD,0GACE,iBAAkB,AAClB,aAAe,CAChB,AACD,qGACE,mBAAoB,AACpB,eAAgB,AACR,OAAQ,AAChB,eAAiB,CAClB,AACD,gHACE,YAAa,AACb,iBAAkB,AAClB,iBAAkB,AAClB,cAAe,AACf,sBAAuB,AACvB,WAAY,AACZ,iBAAkB,AAClB,gBAAiB,AACjB,uBAAwB,AACxB,kBAAoB,CACrB,AACD,kIACE,+BAAiC,CAClC",file:"helpCenter.vue",sourcesContent:["\n.userContainer[data-v-ab65d10c] {\n  height: 100%;\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  z-index: 9999;\n  background: #eff0f2;\n}\n.userContainer.move-enter-active[data-v-ab65d10c],\n.userContainer .move-leave-active[data-v-ab65d10c] {\n  -webkit-transition: all 0.2s linear;\n  transition: all 0.2s linear;\n  -webkit-transform: translate3d(0, 0, 0);\n  transform: translate3d(0, 0, 0);\n}\n.userContainer.move-enter[data-v-ab65d10c],\n.userContainer .move-leave[data-v-ab65d10c] {\n  -webkit-transform: translate3d(100%, 0, 0);\n  transform: translate3d(100%, 0, 0);\n}\n.userContainer .userContainerBox[data-v-ab65d10c] {\n  background: #eff0f2;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  height: 100%;\n}\n.userContainer .userContainerBox .scrollBox[data-v-ab65d10c] {\n  height: 100%;\n}\n.userContainer .userContainerBox .helpCenter .infoBox[data-v-ab65d10c] {\n  width: 100%;\n  box-sizing: border-box;\n  padding: 1.2rem 1.6rem;\n}\n.userContainer .userContainerBox .helpCenter .infoBox .info[data-v-ab65d10c] {\n  font-size: 1.2rem;\n  color: #75787f;\n  line-height: 1.2rem;\n  padding-bottom: 0.8rem;\n}\n.userContainer .userContainerBox .helpCenter .infoBox .info[data-v-ab65d10c]:last-child {\n  padding-bottom: 0;\n}\n.userContainer .userContainerBox .helpCenter .questionContainer .questionBox[data-v-ab65d10c] {\n  background: #fff;\n  margin-bottom: 1.2rem;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n}\n.userContainer .userContainerBox .helpCenter .questionContainer .questionBox[data-v-ab65d10c]:last-child {\n  margin-bottom: 0;\n}\n.userContainer .userContainerBox .helpCenter .questionContainer .questionBox .left[data-v-ab65d10c] {\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 0 10rem;\n          flex: 0 0 10rem;\n  font-size: 0;\n  text-align: center;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  height: 10rem;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n}\n.userContainer .userContainerBox .helpCenter .questionContainer .questionBox .left[data-v-ab65d10c]:after {\n  border-right: 1px solid #b7b9bf;\n}\n.userContainer .userContainerBox .helpCenter .questionContainer .questionBox .left .icon[data-v-ab65d10c] {\n  color: #08090a;\n  font-size: 2rem;\n}\n.userContainer .userContainerBox .helpCenter .questionContainer .questionBox .left .text[data-v-ab65d10c] {\n  font-size: 1.4rem;\n  color: #08090a;\n}\n.userContainer .userContainerBox .helpCenter .questionContainer .questionBox .right[data-v-ab65d10c] {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n          flex: 1;\n  overflow: hidden;\n}\n.userContainer .userContainerBox .helpCenter .questionContainer .questionBox .right .rightLine[data-v-ab65d10c] {\n  height: 5rem;\n  line-height: 5rem;\n  font-size: 1.4rem;\n  color: #75787f;\n  box-sizing: border-box;\n  width: 100%;\n  padding: 0 1.2rem;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.userContainer .userContainerBox .helpCenter .questionContainer .questionBox .right .rightLine[data-v-ab65d10c]:first-child:after {\n  border-bottom: 1px solid #b7b9bf;\n}"],sourceRoot:""}])},903:function(t,i,e){var o=e(793);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);e(191)("3c609030",o,!0)}});
//# sourceMappingURL=84.04369054b6d2f3080c35.js.map