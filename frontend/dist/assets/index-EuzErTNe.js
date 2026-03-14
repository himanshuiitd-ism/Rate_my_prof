var ym=Object.defineProperty;var vm=(e,t,n)=>t in e?ym(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var ri=(e,t,n)=>vm(e,typeof t!="symbol"?t+"":t,n);function wm(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const o in r)if(o!=="default"&&!(o in e)){const l=Object.getOwnPropertyDescriptor(r,o);l&&Object.defineProperty(e,o,l.get?l:{enumerable:!0,get:()=>r[o]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const i of l.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(o){if(o.ep)return;o.ep=!0;const l=n(o);fetch(o.href,l)}})();function xm(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ef={exports:{}},I={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Br=Symbol.for("react.element"),Em=Symbol.for("react.portal"),Sm=Symbol.for("react.fragment"),km=Symbol.for("react.strict_mode"),Cm=Symbol.for("react.profiler"),_m=Symbol.for("react.provider"),Rm=Symbol.for("react.context"),Nm=Symbol.for("react.forward_ref"),Pm=Symbol.for("react.suspense"),Tm=Symbol.for("react.memo"),bm=Symbol.for("react.lazy"),tu=Symbol.iterator;function Om(e){return e===null||typeof e!="object"?null:(e=tu&&e[tu]||e["@@iterator"],typeof e=="function"?e:null)}var tf={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},nf=Object.assign,rf={};function Wn(e,t,n){this.props=e,this.context=t,this.refs=rf,this.updater=n||tf}Wn.prototype.isReactComponent={};Wn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Wn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function of(){}of.prototype=Wn.prototype;function Xs(e,t,n){this.props=e,this.context=t,this.refs=rf,this.updater=n||tf}var Js=Xs.prototype=new of;Js.constructor=Xs;nf(Js,Wn.prototype);Js.isPureReactComponent=!0;var nu=Array.isArray,lf=Object.prototype.hasOwnProperty,qs={current:null},sf={key:!0,ref:!0,__self:!0,__source:!0};function af(e,t,n){var r,o={},l=null,i=null;if(t!=null)for(r in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(l=""+t.key),t)lf.call(t,r)&&!sf.hasOwnProperty(r)&&(o[r]=t[r]);var s=arguments.length-2;if(s===1)o.children=n;else if(1<s){for(var a=Array(s),u=0;u<s;u++)a[u]=arguments[u+2];o.children=a}if(e&&e.defaultProps)for(r in s=e.defaultProps,s)o[r]===void 0&&(o[r]=s[r]);return{$$typeof:Br,type:e,key:l,ref:i,props:o,_owner:qs.current}}function Lm(e,t){return{$$typeof:Br,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Gs(e){return typeof e=="object"&&e!==null&&e.$$typeof===Br}function zm(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var ru=/\/+/g;function oi(e,t){return typeof e=="object"&&e!==null&&e.key!=null?zm(""+e.key):t.toString(36)}function Ro(e,t,n,r,o){var l=typeof e;(l==="undefined"||l==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(l){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case Br:case Em:i=!0}}if(i)return i=e,o=o(i),e=r===""?"."+oi(i,0):r,nu(o)?(n="",e!=null&&(n=e.replace(ru,"$&/")+"/"),Ro(o,t,n,"",function(u){return u})):o!=null&&(Gs(o)&&(o=Lm(o,n+(!o.key||i&&i.key===o.key?"":(""+o.key).replace(ru,"$&/")+"/")+e)),t.push(o)),1;if(i=0,r=r===""?".":r+":",nu(e))for(var s=0;s<e.length;s++){l=e[s];var a=r+oi(l,s);i+=Ro(l,t,n,a,o)}else if(a=Om(e),typeof a=="function")for(e=a.call(e),s=0;!(l=e.next()).done;)l=l.value,a=r+oi(l,s++),i+=Ro(l,t,n,a,o);else if(l==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function oo(e,t,n){if(e==null)return e;var r=[],o=0;return Ro(e,r,"","",function(l){return t.call(n,l,o++)}),r}function Am(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ge={current:null},No={transition:null},Mm={ReactCurrentDispatcher:ge,ReactCurrentBatchConfig:No,ReactCurrentOwner:qs};function uf(){throw Error("act(...) is not supported in production builds of React.")}I.Children={map:oo,forEach:function(e,t,n){oo(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return oo(e,function(){t++}),t},toArray:function(e){return oo(e,function(t){return t})||[]},only:function(e){if(!Gs(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};I.Component=Wn;I.Fragment=Sm;I.Profiler=Cm;I.PureComponent=Xs;I.StrictMode=km;I.Suspense=Pm;I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Mm;I.act=uf;I.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=nf({},e.props),o=e.key,l=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(l=t.ref,i=qs.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(a in t)lf.call(t,a)&&!sf.hasOwnProperty(a)&&(r[a]=t[a]===void 0&&s!==void 0?s[a]:t[a])}var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){s=Array(a);for(var u=0;u<a;u++)s[u]=arguments[u+2];r.children=s}return{$$typeof:Br,type:e.type,key:o,ref:l,props:r,_owner:i}};I.createContext=function(e){return e={$$typeof:Rm,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:_m,_context:e},e.Consumer=e};I.createElement=af;I.createFactory=function(e){var t=af.bind(null,e);return t.type=e,t};I.createRef=function(){return{current:null}};I.forwardRef=function(e){return{$$typeof:Nm,render:e}};I.isValidElement=Gs;I.lazy=function(e){return{$$typeof:bm,_payload:{_status:-1,_result:e},_init:Am}};I.memo=function(e,t){return{$$typeof:Tm,type:e,compare:t===void 0?null:t}};I.startTransition=function(e){var t=No.transition;No.transition={};try{e()}finally{No.transition=t}};I.unstable_act=uf;I.useCallback=function(e,t){return ge.current.useCallback(e,t)};I.useContext=function(e){return ge.current.useContext(e)};I.useDebugValue=function(){};I.useDeferredValue=function(e){return ge.current.useDeferredValue(e)};I.useEffect=function(e,t){return ge.current.useEffect(e,t)};I.useId=function(){return ge.current.useId()};I.useImperativeHandle=function(e,t,n){return ge.current.useImperativeHandle(e,t,n)};I.useInsertionEffect=function(e,t){return ge.current.useInsertionEffect(e,t)};I.useLayoutEffect=function(e,t){return ge.current.useLayoutEffect(e,t)};I.useMemo=function(e,t){return ge.current.useMemo(e,t)};I.useReducer=function(e,t,n){return ge.current.useReducer(e,t,n)};I.useRef=function(e){return ge.current.useRef(e)};I.useState=function(e){return ge.current.useState(e)};I.useSyncExternalStore=function(e,t,n){return ge.current.useSyncExternalStore(e,t,n)};I.useTransition=function(){return ge.current.useTransition()};I.version="18.3.1";ef.exports=I;var R=ef.exports;const d=xm(R),Im=wm({__proto__:null,default:d},[R]);var cf={exports:{}},Le={},ff={exports:{}},df={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(b,A){var M=b.length;b.push(A);e:for(;0<M;){var F=M-1>>>1,$=b[F];if(0<o($,A))b[F]=A,b[M]=$,M=F;else break e}}function n(b){return b.length===0?null:b[0]}function r(b){if(b.length===0)return null;var A=b[0],M=b.pop();if(M!==A){b[0]=M;e:for(var F=0,$=b.length,vt=$>>>1;F<vt;){var Ae=2*(F+1)-1,dn=b[Ae],Vt=Ae+1,ro=b[Vt];if(0>o(dn,M))Vt<$&&0>o(ro,dn)?(b[F]=ro,b[Vt]=M,F=Vt):(b[F]=dn,b[Ae]=M,F=Ae);else if(Vt<$&&0>o(ro,M))b[F]=ro,b[Vt]=M,F=Vt;else break e}}return A}function o(b,A){var M=b.sortIndex-A.sortIndex;return M!==0?M:b.id-A.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;e.unstable_now=function(){return l.now()}}else{var i=Date,s=i.now();e.unstable_now=function(){return i.now()-s}}var a=[],u=[],c=1,f=null,m=3,w=!1,g=!1,v=!1,x=typeof setTimeout=="function"?setTimeout:null,h=typeof clearTimeout=="function"?clearTimeout:null,p=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function y(b){for(var A=n(u);A!==null;){if(A.callback===null)r(u);else if(A.startTime<=b)r(u),A.sortIndex=A.expirationTime,t(a,A);else break;A=n(u)}}function E(b){if(v=!1,y(b),!g)if(n(a)!==null)g=!0,we(k);else{var A=n(u);A!==null&&fn(E,A.startTime-b)}}function k(b,A){g=!1,v&&(v=!1,h(P),P=-1),w=!0;var M=m;try{for(y(A),f=n(a);f!==null&&(!(f.expirationTime>A)||b&&!B());){var F=f.callback;if(typeof F=="function"){f.callback=null,m=f.priorityLevel;var $=F(f.expirationTime<=A);A=e.unstable_now(),typeof $=="function"?f.callback=$:f===n(a)&&r(a),y(A)}else r(a);f=n(a)}if(f!==null)var vt=!0;else{var Ae=n(u);Ae!==null&&fn(E,Ae.startTime-A),vt=!1}return vt}finally{f=null,m=M,w=!1}}var C=!1,_=null,P=-1,L=5,T=-1;function B(){return!(e.unstable_now()-T<L)}function ve(){if(_!==null){var b=e.unstable_now();T=b;var A=!0;try{A=_(!0,b)}finally{A?Be():(C=!1,_=null)}}else C=!1}var Be;if(typeof p=="function")Be=function(){p(ve)};else if(typeof MessageChannel<"u"){var Ge=new MessageChannel,no=Ge.port2;Ge.port1.onmessage=ve,Be=function(){no.postMessage(null)}}else Be=function(){x(ve,0)};function we(b){_=b,C||(C=!0,Be())}function fn(b,A){P=x(function(){b(e.unstable_now())},A)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(b){b.callback=null},e.unstable_continueExecution=function(){g||w||(g=!0,we(k))},e.unstable_forceFrameRate=function(b){0>b||125<b?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):L=0<b?Math.floor(1e3/b):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return n(a)},e.unstable_next=function(b){switch(m){case 1:case 2:case 3:var A=3;break;default:A=m}var M=m;m=A;try{return b()}finally{m=M}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(b,A){switch(b){case 1:case 2:case 3:case 4:case 5:break;default:b=3}var M=m;m=b;try{return A()}finally{m=M}},e.unstable_scheduleCallback=function(b,A,M){var F=e.unstable_now();switch(typeof M=="object"&&M!==null?(M=M.delay,M=typeof M=="number"&&0<M?F+M:F):M=F,b){case 1:var $=-1;break;case 2:$=250;break;case 5:$=1073741823;break;case 4:$=1e4;break;default:$=5e3}return $=M+$,b={id:c++,callback:A,priorityLevel:b,startTime:M,expirationTime:$,sortIndex:-1},M>F?(b.sortIndex=M,t(u,b),n(a)===null&&b===n(u)&&(v?(h(P),P=-1):v=!0,fn(E,M-F))):(b.sortIndex=$,t(a,b),g||w||(g=!0,we(k))),b},e.unstable_shouldYield=B,e.unstable_wrapCallback=function(b){var A=m;return function(){var M=m;m=A;try{return b.apply(this,arguments)}finally{m=M}}}})(df);ff.exports=df;var Dm=ff.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Fm=R,Oe=Dm;function N(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var pf=new Set,vr={};function an(e,t){An(e,t),An(e+"Capture",t)}function An(e,t){for(vr[e]=t,e=0;e<t.length;e++)pf.add(t[e])}var dt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Bi=Object.prototype.hasOwnProperty,Um=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ou={},lu={};function jm(e){return Bi.call(lu,e)?!0:Bi.call(ou,e)?!1:Um.test(e)?lu[e]=!0:(ou[e]=!0,!1)}function Bm(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function $m(e,t,n,r){if(t===null||typeof t>"u"||Bm(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function ye(e,t,n,r,o,l,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=l,this.removeEmptyString=i}var se={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){se[e]=new ye(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];se[t]=new ye(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){se[e]=new ye(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){se[e]=new ye(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){se[e]=new ye(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){se[e]=new ye(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){se[e]=new ye(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){se[e]=new ye(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){se[e]=new ye(e,5,!1,e.toLowerCase(),null,!1,!1)});var Zs=/[\-:]([a-z])/g;function ea(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Zs,ea);se[t]=new ye(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Zs,ea);se[t]=new ye(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Zs,ea);se[t]=new ye(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){se[e]=new ye(e,1,!1,e.toLowerCase(),null,!1,!1)});se.xlinkHref=new ye("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){se[e]=new ye(e,1,!1,e.toLowerCase(),null,!0,!0)});function ta(e,t,n,r){var o=se.hasOwnProperty(t)?se[t]:null;(o!==null?o.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&($m(t,n,o,r)&&(n=null),r||o===null?jm(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):o.mustUseProperty?e[o.propertyName]=n===null?o.type===3?!1:"":n:(t=o.attributeName,r=o.attributeNamespace,n===null?e.removeAttribute(t):(o=o.type,n=o===3||o===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var yt=Fm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,lo=Symbol.for("react.element"),hn=Symbol.for("react.portal"),gn=Symbol.for("react.fragment"),na=Symbol.for("react.strict_mode"),$i=Symbol.for("react.profiler"),mf=Symbol.for("react.provider"),hf=Symbol.for("react.context"),ra=Symbol.for("react.forward_ref"),Wi=Symbol.for("react.suspense"),Vi=Symbol.for("react.suspense_list"),oa=Symbol.for("react.memo"),xt=Symbol.for("react.lazy"),gf=Symbol.for("react.offscreen"),iu=Symbol.iterator;function Yn(e){return e===null||typeof e!="object"?null:(e=iu&&e[iu]||e["@@iterator"],typeof e=="function"?e:null)}var Y=Object.assign,li;function rr(e){if(li===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);li=t&&t[1]||""}return`
`+li+e}var ii=!1;function si(e,t){if(!e||ii)return"";ii=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var o=u.stack.split(`
`),l=r.stack.split(`
`),i=o.length-1,s=l.length-1;1<=i&&0<=s&&o[i]!==l[s];)s--;for(;1<=i&&0<=s;i--,s--)if(o[i]!==l[s]){if(i!==1||s!==1)do if(i--,s--,0>s||o[i]!==l[s]){var a=`
`+o[i].replace(" at new "," at ");return e.displayName&&a.includes("<anonymous>")&&(a=a.replace("<anonymous>",e.displayName)),a}while(1<=i&&0<=s);break}}}finally{ii=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?rr(e):""}function Wm(e){switch(e.tag){case 5:return rr(e.type);case 16:return rr("Lazy");case 13:return rr("Suspense");case 19:return rr("SuspenseList");case 0:case 2:case 15:return e=si(e.type,!1),e;case 11:return e=si(e.type.render,!1),e;case 1:return e=si(e.type,!0),e;default:return""}}function Hi(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case gn:return"Fragment";case hn:return"Portal";case $i:return"Profiler";case na:return"StrictMode";case Wi:return"Suspense";case Vi:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case hf:return(e.displayName||"Context")+".Consumer";case mf:return(e._context.displayName||"Context")+".Provider";case ra:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case oa:return t=e.displayName||null,t!==null?t:Hi(e.type)||"Memo";case xt:t=e._payload,e=e._init;try{return Hi(e(t))}catch{}}return null}function Vm(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Hi(t);case 8:return t===na?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Dt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function yf(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Hm(e){var t=yf(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var o=n.get,l=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(i){r=""+i,l.call(this,i)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(i){r=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function io(e){e._valueTracker||(e._valueTracker=Hm(e))}function vf(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=yf(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Ko(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Qi(e,t){var n=t.checked;return Y({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function su(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Dt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function wf(e,t){t=t.checked,t!=null&&ta(e,"checked",t,!1)}function Ki(e,t){wf(e,t);var n=Dt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Yi(e,t.type,n):t.hasOwnProperty("defaultValue")&&Yi(e,t.type,Dt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function au(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Yi(e,t,n){(t!=="number"||Ko(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var or=Array.isArray;function Nn(e,t,n,r){if(e=e.options,t){t={};for(var o=0;o<n.length;o++)t["$"+n[o]]=!0;for(n=0;n<e.length;n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Dt(n),t=null,o=0;o<e.length;o++){if(e[o].value===n){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function Xi(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(N(91));return Y({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function uu(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(N(92));if(or(n)){if(1<n.length)throw Error(N(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Dt(n)}}function xf(e,t){var n=Dt(t.value),r=Dt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function cu(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Ef(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ji(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Ef(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var so,Sf=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,o){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,o)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(so=so||document.createElement("div"),so.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=so.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function wr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var ar={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Qm=["Webkit","ms","Moz","O"];Object.keys(ar).forEach(function(e){Qm.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),ar[t]=ar[e]})});function kf(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||ar.hasOwnProperty(e)&&ar[e]?(""+t).trim():t+"px"}function Cf(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,o=kf(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,o):e[n]=o}}var Km=Y({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function qi(e,t){if(t){if(Km[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(N(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(N(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(N(61))}if(t.style!=null&&typeof t.style!="object")throw Error(N(62))}}function Gi(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Zi=null;function la(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var es=null,Pn=null,Tn=null;function fu(e){if(e=Vr(e)){if(typeof es!="function")throw Error(N(280));var t=e.stateNode;t&&(t=Ol(t),es(e.stateNode,e.type,t))}}function _f(e){Pn?Tn?Tn.push(e):Tn=[e]:Pn=e}function Rf(){if(Pn){var e=Pn,t=Tn;if(Tn=Pn=null,fu(e),t)for(e=0;e<t.length;e++)fu(t[e])}}function Nf(e,t){return e(t)}function Pf(){}var ai=!1;function Tf(e,t,n){if(ai)return e(t,n);ai=!0;try{return Nf(e,t,n)}finally{ai=!1,(Pn!==null||Tn!==null)&&(Pf(),Rf())}}function xr(e,t){var n=e.stateNode;if(n===null)return null;var r=Ol(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(N(231,t,typeof n));return n}var ts=!1;if(dt)try{var Xn={};Object.defineProperty(Xn,"passive",{get:function(){ts=!0}}),window.addEventListener("test",Xn,Xn),window.removeEventListener("test",Xn,Xn)}catch{ts=!1}function Ym(e,t,n,r,o,l,i,s,a){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(c){this.onError(c)}}var ur=!1,Yo=null,Xo=!1,ns=null,Xm={onError:function(e){ur=!0,Yo=e}};function Jm(e,t,n,r,o,l,i,s,a){ur=!1,Yo=null,Ym.apply(Xm,arguments)}function qm(e,t,n,r,o,l,i,s,a){if(Jm.apply(this,arguments),ur){if(ur){var u=Yo;ur=!1,Yo=null}else throw Error(N(198));Xo||(Xo=!0,ns=u)}}function un(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function bf(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function du(e){if(un(e)!==e)throw Error(N(188))}function Gm(e){var t=e.alternate;if(!t){if(t=un(e),t===null)throw Error(N(188));return t!==e?null:e}for(var n=e,r=t;;){var o=n.return;if(o===null)break;var l=o.alternate;if(l===null){if(r=o.return,r!==null){n=r;continue}break}if(o.child===l.child){for(l=o.child;l;){if(l===n)return du(o),e;if(l===r)return du(o),t;l=l.sibling}throw Error(N(188))}if(n.return!==r.return)n=o,r=l;else{for(var i=!1,s=o.child;s;){if(s===n){i=!0,n=o,r=l;break}if(s===r){i=!0,r=o,n=l;break}s=s.sibling}if(!i){for(s=l.child;s;){if(s===n){i=!0,n=l,r=o;break}if(s===r){i=!0,r=l,n=o;break}s=s.sibling}if(!i)throw Error(N(189))}}if(n.alternate!==r)throw Error(N(190))}if(n.tag!==3)throw Error(N(188));return n.stateNode.current===n?e:t}function Of(e){return e=Gm(e),e!==null?Lf(e):null}function Lf(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Lf(e);if(t!==null)return t;e=e.sibling}return null}var zf=Oe.unstable_scheduleCallback,pu=Oe.unstable_cancelCallback,Zm=Oe.unstable_shouldYield,eh=Oe.unstable_requestPaint,J=Oe.unstable_now,th=Oe.unstable_getCurrentPriorityLevel,ia=Oe.unstable_ImmediatePriority,Af=Oe.unstable_UserBlockingPriority,Jo=Oe.unstable_NormalPriority,nh=Oe.unstable_LowPriority,Mf=Oe.unstable_IdlePriority,Nl=null,rt=null;function rh(e){if(rt&&typeof rt.onCommitFiberRoot=="function")try{rt.onCommitFiberRoot(Nl,e,void 0,(e.current.flags&128)===128)}catch{}}var Ke=Math.clz32?Math.clz32:ih,oh=Math.log,lh=Math.LN2;function ih(e){return e>>>=0,e===0?32:31-(oh(e)/lh|0)|0}var ao=64,uo=4194304;function lr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function qo(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,o=e.suspendedLanes,l=e.pingedLanes,i=n&268435455;if(i!==0){var s=i&~o;s!==0?r=lr(s):(l&=i,l!==0&&(r=lr(l)))}else i=n&~o,i!==0?r=lr(i):l!==0&&(r=lr(l));if(r===0)return 0;if(t!==0&&t!==r&&!(t&o)&&(o=r&-r,l=t&-t,o>=l||o===16&&(l&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Ke(t),o=1<<n,r|=e[n],t&=~o;return r}function sh(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ah(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,l=e.pendingLanes;0<l;){var i=31-Ke(l),s=1<<i,a=o[i];a===-1?(!(s&n)||s&r)&&(o[i]=sh(s,t)):a<=t&&(e.expiredLanes|=s),l&=~s}}function rs(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function If(){var e=ao;return ao<<=1,!(ao&4194240)&&(ao=64),e}function ui(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function $r(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Ke(t),e[t]=n}function uh(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var o=31-Ke(n),l=1<<o;t[o]=0,r[o]=-1,e[o]=-1,n&=~l}}function sa(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Ke(n),o=1<<r;o&t|e[r]&t&&(e[r]|=t),n&=~o}}var U=0;function Df(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Ff,aa,Uf,jf,Bf,os=!1,co=[],Pt=null,Tt=null,bt=null,Er=new Map,Sr=new Map,St=[],ch="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function mu(e,t){switch(e){case"focusin":case"focusout":Pt=null;break;case"dragenter":case"dragleave":Tt=null;break;case"mouseover":case"mouseout":bt=null;break;case"pointerover":case"pointerout":Er.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Sr.delete(t.pointerId)}}function Jn(e,t,n,r,o,l){return e===null||e.nativeEvent!==l?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:l,targetContainers:[o]},t!==null&&(t=Vr(t),t!==null&&aa(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function fh(e,t,n,r,o){switch(t){case"focusin":return Pt=Jn(Pt,e,t,n,r,o),!0;case"dragenter":return Tt=Jn(Tt,e,t,n,r,o),!0;case"mouseover":return bt=Jn(bt,e,t,n,r,o),!0;case"pointerover":var l=o.pointerId;return Er.set(l,Jn(Er.get(l)||null,e,t,n,r,o)),!0;case"gotpointercapture":return l=o.pointerId,Sr.set(l,Jn(Sr.get(l)||null,e,t,n,r,o)),!0}return!1}function $f(e){var t=Kt(e.target);if(t!==null){var n=un(t);if(n!==null){if(t=n.tag,t===13){if(t=bf(n),t!==null){e.blockedOn=t,Bf(e.priority,function(){Uf(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Po(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=ls(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Zi=r,n.target.dispatchEvent(r),Zi=null}else return t=Vr(n),t!==null&&aa(t),e.blockedOn=n,!1;t.shift()}return!0}function hu(e,t,n){Po(e)&&n.delete(t)}function dh(){os=!1,Pt!==null&&Po(Pt)&&(Pt=null),Tt!==null&&Po(Tt)&&(Tt=null),bt!==null&&Po(bt)&&(bt=null),Er.forEach(hu),Sr.forEach(hu)}function qn(e,t){e.blockedOn===t&&(e.blockedOn=null,os||(os=!0,Oe.unstable_scheduleCallback(Oe.unstable_NormalPriority,dh)))}function kr(e){function t(o){return qn(o,e)}if(0<co.length){qn(co[0],e);for(var n=1;n<co.length;n++){var r=co[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Pt!==null&&qn(Pt,e),Tt!==null&&qn(Tt,e),bt!==null&&qn(bt,e),Er.forEach(t),Sr.forEach(t),n=0;n<St.length;n++)r=St[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<St.length&&(n=St[0],n.blockedOn===null);)$f(n),n.blockedOn===null&&St.shift()}var bn=yt.ReactCurrentBatchConfig,Go=!0;function ph(e,t,n,r){var o=U,l=bn.transition;bn.transition=null;try{U=1,ua(e,t,n,r)}finally{U=o,bn.transition=l}}function mh(e,t,n,r){var o=U,l=bn.transition;bn.transition=null;try{U=4,ua(e,t,n,r)}finally{U=o,bn.transition=l}}function ua(e,t,n,r){if(Go){var o=ls(e,t,n,r);if(o===null)wi(e,t,r,Zo,n),mu(e,r);else if(fh(o,e,t,n,r))r.stopPropagation();else if(mu(e,r),t&4&&-1<ch.indexOf(e)){for(;o!==null;){var l=Vr(o);if(l!==null&&Ff(l),l=ls(e,t,n,r),l===null&&wi(e,t,r,Zo,n),l===o)break;o=l}o!==null&&r.stopPropagation()}else wi(e,t,r,null,n)}}var Zo=null;function ls(e,t,n,r){if(Zo=null,e=la(r),e=Kt(e),e!==null)if(t=un(e),t===null)e=null;else if(n=t.tag,n===13){if(e=bf(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Zo=e,null}function Wf(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(th()){case ia:return 1;case Af:return 4;case Jo:case nh:return 16;case Mf:return 536870912;default:return 16}default:return 16}}var Ct=null,ca=null,To=null;function Vf(){if(To)return To;var e,t=ca,n=t.length,r,o="value"in Ct?Ct.value:Ct.textContent,l=o.length;for(e=0;e<n&&t[e]===o[e];e++);var i=n-e;for(r=1;r<=i&&t[n-r]===o[l-r];r++);return To=o.slice(e,1<r?1-r:void 0)}function bo(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function fo(){return!0}function gu(){return!1}function ze(e){function t(n,r,o,l,i){this._reactName=n,this._targetInst=o,this.type=r,this.nativeEvent=l,this.target=i,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(n=e[s],this[s]=n?n(l):l[s]);return this.isDefaultPrevented=(l.defaultPrevented!=null?l.defaultPrevented:l.returnValue===!1)?fo:gu,this.isPropagationStopped=gu,this}return Y(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=fo)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=fo)},persist:function(){},isPersistent:fo}),t}var Vn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},fa=ze(Vn),Wr=Y({},Vn,{view:0,detail:0}),hh=ze(Wr),ci,fi,Gn,Pl=Y({},Wr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:da,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Gn&&(Gn&&e.type==="mousemove"?(ci=e.screenX-Gn.screenX,fi=e.screenY-Gn.screenY):fi=ci=0,Gn=e),ci)},movementY:function(e){return"movementY"in e?e.movementY:fi}}),yu=ze(Pl),gh=Y({},Pl,{dataTransfer:0}),yh=ze(gh),vh=Y({},Wr,{relatedTarget:0}),di=ze(vh),wh=Y({},Vn,{animationName:0,elapsedTime:0,pseudoElement:0}),xh=ze(wh),Eh=Y({},Vn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Sh=ze(Eh),kh=Y({},Vn,{data:0}),vu=ze(kh),Ch={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},_h={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Rh={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Nh(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Rh[e])?!!t[e]:!1}function da(){return Nh}var Ph=Y({},Wr,{key:function(e){if(e.key){var t=Ch[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=bo(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?_h[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:da,charCode:function(e){return e.type==="keypress"?bo(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?bo(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Th=ze(Ph),bh=Y({},Pl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),wu=ze(bh),Oh=Y({},Wr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:da}),Lh=ze(Oh),zh=Y({},Vn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Ah=ze(zh),Mh=Y({},Pl,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Ih=ze(Mh),Dh=[9,13,27,32],pa=dt&&"CompositionEvent"in window,cr=null;dt&&"documentMode"in document&&(cr=document.documentMode);var Fh=dt&&"TextEvent"in window&&!cr,Hf=dt&&(!pa||cr&&8<cr&&11>=cr),xu=" ",Eu=!1;function Qf(e,t){switch(e){case"keyup":return Dh.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Kf(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var yn=!1;function Uh(e,t){switch(e){case"compositionend":return Kf(t);case"keypress":return t.which!==32?null:(Eu=!0,xu);case"textInput":return e=t.data,e===xu&&Eu?null:e;default:return null}}function jh(e,t){if(yn)return e==="compositionend"||!pa&&Qf(e,t)?(e=Vf(),To=ca=Ct=null,yn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Hf&&t.locale!=="ko"?null:t.data;default:return null}}var Bh={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Su(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Bh[e.type]:t==="textarea"}function Yf(e,t,n,r){_f(r),t=el(t,"onChange"),0<t.length&&(n=new fa("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var fr=null,Cr=null;function $h(e){ld(e,0)}function Tl(e){var t=xn(e);if(vf(t))return e}function Wh(e,t){if(e==="change")return t}var Xf=!1;if(dt){var pi;if(dt){var mi="oninput"in document;if(!mi){var ku=document.createElement("div");ku.setAttribute("oninput","return;"),mi=typeof ku.oninput=="function"}pi=mi}else pi=!1;Xf=pi&&(!document.documentMode||9<document.documentMode)}function Cu(){fr&&(fr.detachEvent("onpropertychange",Jf),Cr=fr=null)}function Jf(e){if(e.propertyName==="value"&&Tl(Cr)){var t=[];Yf(t,Cr,e,la(e)),Tf($h,t)}}function Vh(e,t,n){e==="focusin"?(Cu(),fr=t,Cr=n,fr.attachEvent("onpropertychange",Jf)):e==="focusout"&&Cu()}function Hh(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Tl(Cr)}function Qh(e,t){if(e==="click")return Tl(t)}function Kh(e,t){if(e==="input"||e==="change")return Tl(t)}function Yh(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Xe=typeof Object.is=="function"?Object.is:Yh;function _r(e,t){if(Xe(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var o=n[r];if(!Bi.call(t,o)||!Xe(e[o],t[o]))return!1}return!0}function _u(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Ru(e,t){var n=_u(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=_u(n)}}function qf(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?qf(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Gf(){for(var e=window,t=Ko();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ko(e.document)}return t}function ma(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Xh(e){var t=Gf(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&qf(n.ownerDocument.documentElement,n)){if(r!==null&&ma(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=n.textContent.length,l=Math.min(r.start,o);r=r.end===void 0?l:Math.min(r.end,o),!e.extend&&l>r&&(o=r,r=l,l=o),o=Ru(n,l);var i=Ru(n,r);o&&i&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),l>r?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Jh=dt&&"documentMode"in document&&11>=document.documentMode,vn=null,is=null,dr=null,ss=!1;function Nu(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ss||vn==null||vn!==Ko(r)||(r=vn,"selectionStart"in r&&ma(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),dr&&_r(dr,r)||(dr=r,r=el(is,"onSelect"),0<r.length&&(t=new fa("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=vn)))}function po(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var wn={animationend:po("Animation","AnimationEnd"),animationiteration:po("Animation","AnimationIteration"),animationstart:po("Animation","AnimationStart"),transitionend:po("Transition","TransitionEnd")},hi={},Zf={};dt&&(Zf=document.createElement("div").style,"AnimationEvent"in window||(delete wn.animationend.animation,delete wn.animationiteration.animation,delete wn.animationstart.animation),"TransitionEvent"in window||delete wn.transitionend.transition);function bl(e){if(hi[e])return hi[e];if(!wn[e])return e;var t=wn[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Zf)return hi[e]=t[n];return e}var ed=bl("animationend"),td=bl("animationiteration"),nd=bl("animationstart"),rd=bl("transitionend"),od=new Map,Pu="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function jt(e,t){od.set(e,t),an(t,[e])}for(var gi=0;gi<Pu.length;gi++){var yi=Pu[gi],qh=yi.toLowerCase(),Gh=yi[0].toUpperCase()+yi.slice(1);jt(qh,"on"+Gh)}jt(ed,"onAnimationEnd");jt(td,"onAnimationIteration");jt(nd,"onAnimationStart");jt("dblclick","onDoubleClick");jt("focusin","onFocus");jt("focusout","onBlur");jt(rd,"onTransitionEnd");An("onMouseEnter",["mouseout","mouseover"]);An("onMouseLeave",["mouseout","mouseover"]);An("onPointerEnter",["pointerout","pointerover"]);An("onPointerLeave",["pointerout","pointerover"]);an("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));an("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));an("onBeforeInput",["compositionend","keypress","textInput","paste"]);an("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));an("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));an("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ir="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Zh=new Set("cancel close invalid load scroll toggle".split(" ").concat(ir));function Tu(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,qm(r,t,void 0,e),e.currentTarget=null}function ld(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],o=r.event;r=r.listeners;e:{var l=void 0;if(t)for(var i=r.length-1;0<=i;i--){var s=r[i],a=s.instance,u=s.currentTarget;if(s=s.listener,a!==l&&o.isPropagationStopped())break e;Tu(o,s,u),l=a}else for(i=0;i<r.length;i++){if(s=r[i],a=s.instance,u=s.currentTarget,s=s.listener,a!==l&&o.isPropagationStopped())break e;Tu(o,s,u),l=a}}}if(Xo)throw e=ns,Xo=!1,ns=null,e}function W(e,t){var n=t[ds];n===void 0&&(n=t[ds]=new Set);var r=e+"__bubble";n.has(r)||(id(t,e,2,!1),n.add(r))}function vi(e,t,n){var r=0;t&&(r|=4),id(n,e,r,t)}var mo="_reactListening"+Math.random().toString(36).slice(2);function Rr(e){if(!e[mo]){e[mo]=!0,pf.forEach(function(n){n!=="selectionchange"&&(Zh.has(n)||vi(n,!1,e),vi(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[mo]||(t[mo]=!0,vi("selectionchange",!1,t))}}function id(e,t,n,r){switch(Wf(t)){case 1:var o=ph;break;case 4:o=mh;break;default:o=ua}n=o.bind(null,t,n,e),o=void 0,!ts||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(t,n,{capture:!0,passive:o}):e.addEventListener(t,n,!0):o!==void 0?e.addEventListener(t,n,{passive:o}):e.addEventListener(t,n,!1)}function wi(e,t,n,r,o){var l=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var i=r.tag;if(i===3||i===4){var s=r.stateNode.containerInfo;if(s===o||s.nodeType===8&&s.parentNode===o)break;if(i===4)for(i=r.return;i!==null;){var a=i.tag;if((a===3||a===4)&&(a=i.stateNode.containerInfo,a===o||a.nodeType===8&&a.parentNode===o))return;i=i.return}for(;s!==null;){if(i=Kt(s),i===null)return;if(a=i.tag,a===5||a===6){r=l=i;continue e}s=s.parentNode}}r=r.return}Tf(function(){var u=l,c=la(n),f=[];e:{var m=od.get(e);if(m!==void 0){var w=fa,g=e;switch(e){case"keypress":if(bo(n)===0)break e;case"keydown":case"keyup":w=Th;break;case"focusin":g="focus",w=di;break;case"focusout":g="blur",w=di;break;case"beforeblur":case"afterblur":w=di;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":w=yu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":w=yh;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":w=Lh;break;case ed:case td:case nd:w=xh;break;case rd:w=Ah;break;case"scroll":w=hh;break;case"wheel":w=Ih;break;case"copy":case"cut":case"paste":w=Sh;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":w=wu}var v=(t&4)!==0,x=!v&&e==="scroll",h=v?m!==null?m+"Capture":null:m;v=[];for(var p=u,y;p!==null;){y=p;var E=y.stateNode;if(y.tag===5&&E!==null&&(y=E,h!==null&&(E=xr(p,h),E!=null&&v.push(Nr(p,E,y)))),x)break;p=p.return}0<v.length&&(m=new w(m,g,null,n,c),f.push({event:m,listeners:v}))}}if(!(t&7)){e:{if(m=e==="mouseover"||e==="pointerover",w=e==="mouseout"||e==="pointerout",m&&n!==Zi&&(g=n.relatedTarget||n.fromElement)&&(Kt(g)||g[pt]))break e;if((w||m)&&(m=c.window===c?c:(m=c.ownerDocument)?m.defaultView||m.parentWindow:window,w?(g=n.relatedTarget||n.toElement,w=u,g=g?Kt(g):null,g!==null&&(x=un(g),g!==x||g.tag!==5&&g.tag!==6)&&(g=null)):(w=null,g=u),w!==g)){if(v=yu,E="onMouseLeave",h="onMouseEnter",p="mouse",(e==="pointerout"||e==="pointerover")&&(v=wu,E="onPointerLeave",h="onPointerEnter",p="pointer"),x=w==null?m:xn(w),y=g==null?m:xn(g),m=new v(E,p+"leave",w,n,c),m.target=x,m.relatedTarget=y,E=null,Kt(c)===u&&(v=new v(h,p+"enter",g,n,c),v.target=y,v.relatedTarget=x,E=v),x=E,w&&g)t:{for(v=w,h=g,p=0,y=v;y;y=pn(y))p++;for(y=0,E=h;E;E=pn(E))y++;for(;0<p-y;)v=pn(v),p--;for(;0<y-p;)h=pn(h),y--;for(;p--;){if(v===h||h!==null&&v===h.alternate)break t;v=pn(v),h=pn(h)}v=null}else v=null;w!==null&&bu(f,m,w,v,!1),g!==null&&x!==null&&bu(f,x,g,v,!0)}}e:{if(m=u?xn(u):window,w=m.nodeName&&m.nodeName.toLowerCase(),w==="select"||w==="input"&&m.type==="file")var k=Wh;else if(Su(m))if(Xf)k=Kh;else{k=Hh;var C=Vh}else(w=m.nodeName)&&w.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(k=Qh);if(k&&(k=k(e,u))){Yf(f,k,n,c);break e}C&&C(e,m,u),e==="focusout"&&(C=m._wrapperState)&&C.controlled&&m.type==="number"&&Yi(m,"number",m.value)}switch(C=u?xn(u):window,e){case"focusin":(Su(C)||C.contentEditable==="true")&&(vn=C,is=u,dr=null);break;case"focusout":dr=is=vn=null;break;case"mousedown":ss=!0;break;case"contextmenu":case"mouseup":case"dragend":ss=!1,Nu(f,n,c);break;case"selectionchange":if(Jh)break;case"keydown":case"keyup":Nu(f,n,c)}var _;if(pa)e:{switch(e){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else yn?Qf(e,n)&&(P="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(P="onCompositionStart");P&&(Hf&&n.locale!=="ko"&&(yn||P!=="onCompositionStart"?P==="onCompositionEnd"&&yn&&(_=Vf()):(Ct=c,ca="value"in Ct?Ct.value:Ct.textContent,yn=!0)),C=el(u,P),0<C.length&&(P=new vu(P,e,null,n,c),f.push({event:P,listeners:C}),_?P.data=_:(_=Kf(n),_!==null&&(P.data=_)))),(_=Fh?Uh(e,n):jh(e,n))&&(u=el(u,"onBeforeInput"),0<u.length&&(c=new vu("onBeforeInput","beforeinput",null,n,c),f.push({event:c,listeners:u}),c.data=_))}ld(f,t)})}function Nr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function el(e,t){for(var n=t+"Capture",r=[];e!==null;){var o=e,l=o.stateNode;o.tag===5&&l!==null&&(o=l,l=xr(e,n),l!=null&&r.unshift(Nr(e,l,o)),l=xr(e,t),l!=null&&r.push(Nr(e,l,o))),e=e.return}return r}function pn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function bu(e,t,n,r,o){for(var l=t._reactName,i=[];n!==null&&n!==r;){var s=n,a=s.alternate,u=s.stateNode;if(a!==null&&a===r)break;s.tag===5&&u!==null&&(s=u,o?(a=xr(n,l),a!=null&&i.unshift(Nr(n,a,s))):o||(a=xr(n,l),a!=null&&i.push(Nr(n,a,s)))),n=n.return}i.length!==0&&e.push({event:t,listeners:i})}var eg=/\r\n?/g,tg=/\u0000|\uFFFD/g;function Ou(e){return(typeof e=="string"?e:""+e).replace(eg,`
`).replace(tg,"")}function ho(e,t,n){if(t=Ou(t),Ou(e)!==t&&n)throw Error(N(425))}function tl(){}var as=null,us=null;function cs(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var fs=typeof setTimeout=="function"?setTimeout:void 0,ng=typeof clearTimeout=="function"?clearTimeout:void 0,Lu=typeof Promise=="function"?Promise:void 0,rg=typeof queueMicrotask=="function"?queueMicrotask:typeof Lu<"u"?function(e){return Lu.resolve(null).then(e).catch(og)}:fs;function og(e){setTimeout(function(){throw e})}function xi(e,t){var n=t,r=0;do{var o=n.nextSibling;if(e.removeChild(n),o&&o.nodeType===8)if(n=o.data,n==="/$"){if(r===0){e.removeChild(o),kr(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=o}while(n);kr(t)}function Ot(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function zu(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Hn=Math.random().toString(36).slice(2),nt="__reactFiber$"+Hn,Pr="__reactProps$"+Hn,pt="__reactContainer$"+Hn,ds="__reactEvents$"+Hn,lg="__reactListeners$"+Hn,ig="__reactHandles$"+Hn;function Kt(e){var t=e[nt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[pt]||n[nt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=zu(e);e!==null;){if(n=e[nt])return n;e=zu(e)}return t}e=n,n=e.parentNode}return null}function Vr(e){return e=e[nt]||e[pt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function xn(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(N(33))}function Ol(e){return e[Pr]||null}var ps=[],En=-1;function Bt(e){return{current:e}}function V(e){0>En||(e.current=ps[En],ps[En]=null,En--)}function j(e,t){En++,ps[En]=e.current,e.current=t}var Ft={},de=Bt(Ft),Se=Bt(!1),en=Ft;function Mn(e,t){var n=e.type.contextTypes;if(!n)return Ft;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var o={},l;for(l in n)o[l]=t[l];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function ke(e){return e=e.childContextTypes,e!=null}function nl(){V(Se),V(de)}function Au(e,t,n){if(de.current!==Ft)throw Error(N(168));j(de,t),j(Se,n)}function sd(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var o in r)if(!(o in t))throw Error(N(108,Vm(e)||"Unknown",o));return Y({},n,r)}function rl(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Ft,en=de.current,j(de,e),j(Se,Se.current),!0}function Mu(e,t,n){var r=e.stateNode;if(!r)throw Error(N(169));n?(e=sd(e,t,en),r.__reactInternalMemoizedMergedChildContext=e,V(Se),V(de),j(de,e)):V(Se),j(Se,n)}var it=null,Ll=!1,Ei=!1;function ad(e){it===null?it=[e]:it.push(e)}function sg(e){Ll=!0,ad(e)}function $t(){if(!Ei&&it!==null){Ei=!0;var e=0,t=U;try{var n=it;for(U=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}it=null,Ll=!1}catch(o){throw it!==null&&(it=it.slice(e+1)),zf(ia,$t),o}finally{U=t,Ei=!1}}return null}var Sn=[],kn=0,ol=null,ll=0,Me=[],Ie=0,tn=null,at=1,ut="";function Ht(e,t){Sn[kn++]=ll,Sn[kn++]=ol,ol=e,ll=t}function ud(e,t,n){Me[Ie++]=at,Me[Ie++]=ut,Me[Ie++]=tn,tn=e;var r=at;e=ut;var o=32-Ke(r)-1;r&=~(1<<o),n+=1;var l=32-Ke(t)+o;if(30<l){var i=o-o%5;l=(r&(1<<i)-1).toString(32),r>>=i,o-=i,at=1<<32-Ke(t)+o|n<<o|r,ut=l+e}else at=1<<l|n<<o|r,ut=e}function ha(e){e.return!==null&&(Ht(e,1),ud(e,1,0))}function ga(e){for(;e===ol;)ol=Sn[--kn],Sn[kn]=null,ll=Sn[--kn],Sn[kn]=null;for(;e===tn;)tn=Me[--Ie],Me[Ie]=null,ut=Me[--Ie],Me[Ie]=null,at=Me[--Ie],Me[Ie]=null}var be=null,Pe=null,H=!1,He=null;function cd(e,t){var n=De(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Iu(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,be=e,Pe=Ot(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,be=e,Pe=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=tn!==null?{id:at,overflow:ut}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=De(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,be=e,Pe=null,!0):!1;default:return!1}}function ms(e){return(e.mode&1)!==0&&(e.flags&128)===0}function hs(e){if(H){var t=Pe;if(t){var n=t;if(!Iu(e,t)){if(ms(e))throw Error(N(418));t=Ot(n.nextSibling);var r=be;t&&Iu(e,t)?cd(r,n):(e.flags=e.flags&-4097|2,H=!1,be=e)}}else{if(ms(e))throw Error(N(418));e.flags=e.flags&-4097|2,H=!1,be=e}}}function Du(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;be=e}function go(e){if(e!==be)return!1;if(!H)return Du(e),H=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!cs(e.type,e.memoizedProps)),t&&(t=Pe)){if(ms(e))throw fd(),Error(N(418));for(;t;)cd(e,t),t=Ot(t.nextSibling)}if(Du(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(N(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Pe=Ot(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Pe=null}}else Pe=be?Ot(e.stateNode.nextSibling):null;return!0}function fd(){for(var e=Pe;e;)e=Ot(e.nextSibling)}function In(){Pe=be=null,H=!1}function ya(e){He===null?He=[e]:He.push(e)}var ag=yt.ReactCurrentBatchConfig;function Zn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(N(309));var r=n.stateNode}if(!r)throw Error(N(147,e));var o=r,l=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===l?t.ref:(t=function(i){var s=o.refs;i===null?delete s[l]:s[l]=i},t._stringRef=l,t)}if(typeof e!="string")throw Error(N(284));if(!n._owner)throw Error(N(290,e))}return e}function yo(e,t){throw e=Object.prototype.toString.call(t),Error(N(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Fu(e){var t=e._init;return t(e._payload)}function dd(e){function t(h,p){if(e){var y=h.deletions;y===null?(h.deletions=[p],h.flags|=16):y.push(p)}}function n(h,p){if(!e)return null;for(;p!==null;)t(h,p),p=p.sibling;return null}function r(h,p){for(h=new Map;p!==null;)p.key!==null?h.set(p.key,p):h.set(p.index,p),p=p.sibling;return h}function o(h,p){return h=Mt(h,p),h.index=0,h.sibling=null,h}function l(h,p,y){return h.index=y,e?(y=h.alternate,y!==null?(y=y.index,y<p?(h.flags|=2,p):y):(h.flags|=2,p)):(h.flags|=1048576,p)}function i(h){return e&&h.alternate===null&&(h.flags|=2),h}function s(h,p,y,E){return p===null||p.tag!==6?(p=Pi(y,h.mode,E),p.return=h,p):(p=o(p,y),p.return=h,p)}function a(h,p,y,E){var k=y.type;return k===gn?c(h,p,y.props.children,E,y.key):p!==null&&(p.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===xt&&Fu(k)===p.type)?(E=o(p,y.props),E.ref=Zn(h,p,y),E.return=h,E):(E=Do(y.type,y.key,y.props,null,h.mode,E),E.ref=Zn(h,p,y),E.return=h,E)}function u(h,p,y,E){return p===null||p.tag!==4||p.stateNode.containerInfo!==y.containerInfo||p.stateNode.implementation!==y.implementation?(p=Ti(y,h.mode,E),p.return=h,p):(p=o(p,y.children||[]),p.return=h,p)}function c(h,p,y,E,k){return p===null||p.tag!==7?(p=Gt(y,h.mode,E,k),p.return=h,p):(p=o(p,y),p.return=h,p)}function f(h,p,y){if(typeof p=="string"&&p!==""||typeof p=="number")return p=Pi(""+p,h.mode,y),p.return=h,p;if(typeof p=="object"&&p!==null){switch(p.$$typeof){case lo:return y=Do(p.type,p.key,p.props,null,h.mode,y),y.ref=Zn(h,null,p),y.return=h,y;case hn:return p=Ti(p,h.mode,y),p.return=h,p;case xt:var E=p._init;return f(h,E(p._payload),y)}if(or(p)||Yn(p))return p=Gt(p,h.mode,y,null),p.return=h,p;yo(h,p)}return null}function m(h,p,y,E){var k=p!==null?p.key:null;if(typeof y=="string"&&y!==""||typeof y=="number")return k!==null?null:s(h,p,""+y,E);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case lo:return y.key===k?a(h,p,y,E):null;case hn:return y.key===k?u(h,p,y,E):null;case xt:return k=y._init,m(h,p,k(y._payload),E)}if(or(y)||Yn(y))return k!==null?null:c(h,p,y,E,null);yo(h,y)}return null}function w(h,p,y,E,k){if(typeof E=="string"&&E!==""||typeof E=="number")return h=h.get(y)||null,s(p,h,""+E,k);if(typeof E=="object"&&E!==null){switch(E.$$typeof){case lo:return h=h.get(E.key===null?y:E.key)||null,a(p,h,E,k);case hn:return h=h.get(E.key===null?y:E.key)||null,u(p,h,E,k);case xt:var C=E._init;return w(h,p,y,C(E._payload),k)}if(or(E)||Yn(E))return h=h.get(y)||null,c(p,h,E,k,null);yo(p,E)}return null}function g(h,p,y,E){for(var k=null,C=null,_=p,P=p=0,L=null;_!==null&&P<y.length;P++){_.index>P?(L=_,_=null):L=_.sibling;var T=m(h,_,y[P],E);if(T===null){_===null&&(_=L);break}e&&_&&T.alternate===null&&t(h,_),p=l(T,p,P),C===null?k=T:C.sibling=T,C=T,_=L}if(P===y.length)return n(h,_),H&&Ht(h,P),k;if(_===null){for(;P<y.length;P++)_=f(h,y[P],E),_!==null&&(p=l(_,p,P),C===null?k=_:C.sibling=_,C=_);return H&&Ht(h,P),k}for(_=r(h,_);P<y.length;P++)L=w(_,h,P,y[P],E),L!==null&&(e&&L.alternate!==null&&_.delete(L.key===null?P:L.key),p=l(L,p,P),C===null?k=L:C.sibling=L,C=L);return e&&_.forEach(function(B){return t(h,B)}),H&&Ht(h,P),k}function v(h,p,y,E){var k=Yn(y);if(typeof k!="function")throw Error(N(150));if(y=k.call(y),y==null)throw Error(N(151));for(var C=k=null,_=p,P=p=0,L=null,T=y.next();_!==null&&!T.done;P++,T=y.next()){_.index>P?(L=_,_=null):L=_.sibling;var B=m(h,_,T.value,E);if(B===null){_===null&&(_=L);break}e&&_&&B.alternate===null&&t(h,_),p=l(B,p,P),C===null?k=B:C.sibling=B,C=B,_=L}if(T.done)return n(h,_),H&&Ht(h,P),k;if(_===null){for(;!T.done;P++,T=y.next())T=f(h,T.value,E),T!==null&&(p=l(T,p,P),C===null?k=T:C.sibling=T,C=T);return H&&Ht(h,P),k}for(_=r(h,_);!T.done;P++,T=y.next())T=w(_,h,P,T.value,E),T!==null&&(e&&T.alternate!==null&&_.delete(T.key===null?P:T.key),p=l(T,p,P),C===null?k=T:C.sibling=T,C=T);return e&&_.forEach(function(ve){return t(h,ve)}),H&&Ht(h,P),k}function x(h,p,y,E){if(typeof y=="object"&&y!==null&&y.type===gn&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case lo:e:{for(var k=y.key,C=p;C!==null;){if(C.key===k){if(k=y.type,k===gn){if(C.tag===7){n(h,C.sibling),p=o(C,y.props.children),p.return=h,h=p;break e}}else if(C.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===xt&&Fu(k)===C.type){n(h,C.sibling),p=o(C,y.props),p.ref=Zn(h,C,y),p.return=h,h=p;break e}n(h,C);break}else t(h,C);C=C.sibling}y.type===gn?(p=Gt(y.props.children,h.mode,E,y.key),p.return=h,h=p):(E=Do(y.type,y.key,y.props,null,h.mode,E),E.ref=Zn(h,p,y),E.return=h,h=E)}return i(h);case hn:e:{for(C=y.key;p!==null;){if(p.key===C)if(p.tag===4&&p.stateNode.containerInfo===y.containerInfo&&p.stateNode.implementation===y.implementation){n(h,p.sibling),p=o(p,y.children||[]),p.return=h,h=p;break e}else{n(h,p);break}else t(h,p);p=p.sibling}p=Ti(y,h.mode,E),p.return=h,h=p}return i(h);case xt:return C=y._init,x(h,p,C(y._payload),E)}if(or(y))return g(h,p,y,E);if(Yn(y))return v(h,p,y,E);yo(h,y)}return typeof y=="string"&&y!==""||typeof y=="number"?(y=""+y,p!==null&&p.tag===6?(n(h,p.sibling),p=o(p,y),p.return=h,h=p):(n(h,p),p=Pi(y,h.mode,E),p.return=h,h=p),i(h)):n(h,p)}return x}var Dn=dd(!0),pd=dd(!1),il=Bt(null),sl=null,Cn=null,va=null;function wa(){va=Cn=sl=null}function xa(e){var t=il.current;V(il),e._currentValue=t}function gs(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function On(e,t){sl=e,va=Cn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Ee=!0),e.firstContext=null)}function Ue(e){var t=e._currentValue;if(va!==e)if(e={context:e,memoizedValue:t,next:null},Cn===null){if(sl===null)throw Error(N(308));Cn=e,sl.dependencies={lanes:0,firstContext:e}}else Cn=Cn.next=e;return t}var Yt=null;function Ea(e){Yt===null?Yt=[e]:Yt.push(e)}function md(e,t,n,r){var o=t.interleaved;return o===null?(n.next=n,Ea(t)):(n.next=o.next,o.next=n),t.interleaved=n,mt(e,r)}function mt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Et=!1;function Sa(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function hd(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function ct(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Lt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,D&2){var o=r.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),r.pending=t,mt(e,n)}return o=r.interleaved,o===null?(t.next=t,Ea(r)):(t.next=o.next,o.next=t),r.interleaved=t,mt(e,n)}function Oo(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,sa(e,n)}}function Uu(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var o=null,l=null;if(n=n.firstBaseUpdate,n!==null){do{var i={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};l===null?o=l=i:l=l.next=i,n=n.next}while(n!==null);l===null?o=l=t:l=l.next=t}else o=l=t;n={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:l,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function al(e,t,n,r){var o=e.updateQueue;Et=!1;var l=o.firstBaseUpdate,i=o.lastBaseUpdate,s=o.shared.pending;if(s!==null){o.shared.pending=null;var a=s,u=a.next;a.next=null,i===null?l=u:i.next=u,i=a;var c=e.alternate;c!==null&&(c=c.updateQueue,s=c.lastBaseUpdate,s!==i&&(s===null?c.firstBaseUpdate=u:s.next=u,c.lastBaseUpdate=a))}if(l!==null){var f=o.baseState;i=0,c=u=a=null,s=l;do{var m=s.lane,w=s.eventTime;if((r&m)===m){c!==null&&(c=c.next={eventTime:w,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var g=e,v=s;switch(m=t,w=n,v.tag){case 1:if(g=v.payload,typeof g=="function"){f=g.call(w,f,m);break e}f=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=v.payload,m=typeof g=="function"?g.call(w,f,m):g,m==null)break e;f=Y({},f,m);break e;case 2:Et=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,m=o.effects,m===null?o.effects=[s]:m.push(s))}else w={eventTime:w,lane:m,tag:s.tag,payload:s.payload,callback:s.callback,next:null},c===null?(u=c=w,a=f):c=c.next=w,i|=m;if(s=s.next,s===null){if(s=o.shared.pending,s===null)break;m=s,s=m.next,m.next=null,o.lastBaseUpdate=m,o.shared.pending=null}}while(!0);if(c===null&&(a=f),o.baseState=a,o.firstBaseUpdate=u,o.lastBaseUpdate=c,t=o.shared.interleaved,t!==null){o=t;do i|=o.lane,o=o.next;while(o!==t)}else l===null&&(o.shared.lanes=0);rn|=i,e.lanes=i,e.memoizedState=f}}function ju(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],o=r.callback;if(o!==null){if(r.callback=null,r=n,typeof o!="function")throw Error(N(191,o));o.call(r)}}}var Hr={},ot=Bt(Hr),Tr=Bt(Hr),br=Bt(Hr);function Xt(e){if(e===Hr)throw Error(N(174));return e}function ka(e,t){switch(j(br,t),j(Tr,e),j(ot,Hr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Ji(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Ji(t,e)}V(ot),j(ot,t)}function Fn(){V(ot),V(Tr),V(br)}function gd(e){Xt(br.current);var t=Xt(ot.current),n=Ji(t,e.type);t!==n&&(j(Tr,e),j(ot,n))}function Ca(e){Tr.current===e&&(V(ot),V(Tr))}var Q=Bt(0);function ul(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Si=[];function _a(){for(var e=0;e<Si.length;e++)Si[e]._workInProgressVersionPrimary=null;Si.length=0}var Lo=yt.ReactCurrentDispatcher,ki=yt.ReactCurrentBatchConfig,nn=0,K=null,ee=null,ne=null,cl=!1,pr=!1,Or=0,ug=0;function ae(){throw Error(N(321))}function Ra(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Xe(e[n],t[n]))return!1;return!0}function Na(e,t,n,r,o,l){if(nn=l,K=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Lo.current=e===null||e.memoizedState===null?pg:mg,e=n(r,o),pr){l=0;do{if(pr=!1,Or=0,25<=l)throw Error(N(301));l+=1,ne=ee=null,t.updateQueue=null,Lo.current=hg,e=n(r,o)}while(pr)}if(Lo.current=fl,t=ee!==null&&ee.next!==null,nn=0,ne=ee=K=null,cl=!1,t)throw Error(N(300));return e}function Pa(){var e=Or!==0;return Or=0,e}function tt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ne===null?K.memoizedState=ne=e:ne=ne.next=e,ne}function je(){if(ee===null){var e=K.alternate;e=e!==null?e.memoizedState:null}else e=ee.next;var t=ne===null?K.memoizedState:ne.next;if(t!==null)ne=t,ee=e;else{if(e===null)throw Error(N(310));ee=e,e={memoizedState:ee.memoizedState,baseState:ee.baseState,baseQueue:ee.baseQueue,queue:ee.queue,next:null},ne===null?K.memoizedState=ne=e:ne=ne.next=e}return ne}function Lr(e,t){return typeof t=="function"?t(e):t}function Ci(e){var t=je(),n=t.queue;if(n===null)throw Error(N(311));n.lastRenderedReducer=e;var r=ee,o=r.baseQueue,l=n.pending;if(l!==null){if(o!==null){var i=o.next;o.next=l.next,l.next=i}r.baseQueue=o=l,n.pending=null}if(o!==null){l=o.next,r=r.baseState;var s=i=null,a=null,u=l;do{var c=u.lane;if((nn&c)===c)a!==null&&(a=a.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var f={lane:c,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};a===null?(s=a=f,i=r):a=a.next=f,K.lanes|=c,rn|=c}u=u.next}while(u!==null&&u!==l);a===null?i=r:a.next=s,Xe(r,t.memoizedState)||(Ee=!0),t.memoizedState=r,t.baseState=i,t.baseQueue=a,n.lastRenderedState=r}if(e=n.interleaved,e!==null){o=e;do l=o.lane,K.lanes|=l,rn|=l,o=o.next;while(o!==e)}else o===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function _i(e){var t=je(),n=t.queue;if(n===null)throw Error(N(311));n.lastRenderedReducer=e;var r=n.dispatch,o=n.pending,l=t.memoizedState;if(o!==null){n.pending=null;var i=o=o.next;do l=e(l,i.action),i=i.next;while(i!==o);Xe(l,t.memoizedState)||(Ee=!0),t.memoizedState=l,t.baseQueue===null&&(t.baseState=l),n.lastRenderedState=l}return[l,r]}function yd(){}function vd(e,t){var n=K,r=je(),o=t(),l=!Xe(r.memoizedState,o);if(l&&(r.memoizedState=o,Ee=!0),r=r.queue,Ta(Ed.bind(null,n,r,e),[e]),r.getSnapshot!==t||l||ne!==null&&ne.memoizedState.tag&1){if(n.flags|=2048,zr(9,xd.bind(null,n,r,o,t),void 0,null),re===null)throw Error(N(349));nn&30||wd(n,t,o)}return o}function wd(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=K.updateQueue,t===null?(t={lastEffect:null,stores:null},K.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function xd(e,t,n,r){t.value=n,t.getSnapshot=r,Sd(t)&&kd(e)}function Ed(e,t,n){return n(function(){Sd(t)&&kd(e)})}function Sd(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Xe(e,n)}catch{return!0}}function kd(e){var t=mt(e,1);t!==null&&Ye(t,e,1,-1)}function Bu(e){var t=tt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Lr,lastRenderedState:e},t.queue=e,e=e.dispatch=dg.bind(null,K,e),[t.memoizedState,e]}function zr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=K.updateQueue,t===null?(t={lastEffect:null,stores:null},K.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Cd(){return je().memoizedState}function zo(e,t,n,r){var o=tt();K.flags|=e,o.memoizedState=zr(1|t,n,void 0,r===void 0?null:r)}function zl(e,t,n,r){var o=je();r=r===void 0?null:r;var l=void 0;if(ee!==null){var i=ee.memoizedState;if(l=i.destroy,r!==null&&Ra(r,i.deps)){o.memoizedState=zr(t,n,l,r);return}}K.flags|=e,o.memoizedState=zr(1|t,n,l,r)}function $u(e,t){return zo(8390656,8,e,t)}function Ta(e,t){return zl(2048,8,e,t)}function _d(e,t){return zl(4,2,e,t)}function Rd(e,t){return zl(4,4,e,t)}function Nd(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Pd(e,t,n){return n=n!=null?n.concat([e]):null,zl(4,4,Nd.bind(null,t,e),n)}function ba(){}function Td(e,t){var n=je();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ra(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function bd(e,t){var n=je();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ra(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Od(e,t,n){return nn&21?(Xe(n,t)||(n=If(),K.lanes|=n,rn|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Ee=!0),e.memoizedState=n)}function cg(e,t){var n=U;U=n!==0&&4>n?n:4,e(!0);var r=ki.transition;ki.transition={};try{e(!1),t()}finally{U=n,ki.transition=r}}function Ld(){return je().memoizedState}function fg(e,t,n){var r=At(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},zd(e))Ad(t,n);else if(n=md(e,t,n,r),n!==null){var o=me();Ye(n,e,r,o),Md(n,t,r)}}function dg(e,t,n){var r=At(e),o={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(zd(e))Ad(t,o);else{var l=e.alternate;if(e.lanes===0&&(l===null||l.lanes===0)&&(l=t.lastRenderedReducer,l!==null))try{var i=t.lastRenderedState,s=l(i,n);if(o.hasEagerState=!0,o.eagerState=s,Xe(s,i)){var a=t.interleaved;a===null?(o.next=o,Ea(t)):(o.next=a.next,a.next=o),t.interleaved=o;return}}catch{}finally{}n=md(e,t,o,r),n!==null&&(o=me(),Ye(n,e,r,o),Md(n,t,r))}}function zd(e){var t=e.alternate;return e===K||t!==null&&t===K}function Ad(e,t){pr=cl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Md(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,sa(e,n)}}var fl={readContext:Ue,useCallback:ae,useContext:ae,useEffect:ae,useImperativeHandle:ae,useInsertionEffect:ae,useLayoutEffect:ae,useMemo:ae,useReducer:ae,useRef:ae,useState:ae,useDebugValue:ae,useDeferredValue:ae,useTransition:ae,useMutableSource:ae,useSyncExternalStore:ae,useId:ae,unstable_isNewReconciler:!1},pg={readContext:Ue,useCallback:function(e,t){return tt().memoizedState=[e,t===void 0?null:t],e},useContext:Ue,useEffect:$u,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,zo(4194308,4,Nd.bind(null,t,e),n)},useLayoutEffect:function(e,t){return zo(4194308,4,e,t)},useInsertionEffect:function(e,t){return zo(4,2,e,t)},useMemo:function(e,t){var n=tt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=tt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=fg.bind(null,K,e),[r.memoizedState,e]},useRef:function(e){var t=tt();return e={current:e},t.memoizedState=e},useState:Bu,useDebugValue:ba,useDeferredValue:function(e){return tt().memoizedState=e},useTransition:function(){var e=Bu(!1),t=e[0];return e=cg.bind(null,e[1]),tt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=K,o=tt();if(H){if(n===void 0)throw Error(N(407));n=n()}else{if(n=t(),re===null)throw Error(N(349));nn&30||wd(r,t,n)}o.memoizedState=n;var l={value:n,getSnapshot:t};return o.queue=l,$u(Ed.bind(null,r,l,e),[e]),r.flags|=2048,zr(9,xd.bind(null,r,l,n,t),void 0,null),n},useId:function(){var e=tt(),t=re.identifierPrefix;if(H){var n=ut,r=at;n=(r&~(1<<32-Ke(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Or++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=ug++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},mg={readContext:Ue,useCallback:Td,useContext:Ue,useEffect:Ta,useImperativeHandle:Pd,useInsertionEffect:_d,useLayoutEffect:Rd,useMemo:bd,useReducer:Ci,useRef:Cd,useState:function(){return Ci(Lr)},useDebugValue:ba,useDeferredValue:function(e){var t=je();return Od(t,ee.memoizedState,e)},useTransition:function(){var e=Ci(Lr)[0],t=je().memoizedState;return[e,t]},useMutableSource:yd,useSyncExternalStore:vd,useId:Ld,unstable_isNewReconciler:!1},hg={readContext:Ue,useCallback:Td,useContext:Ue,useEffect:Ta,useImperativeHandle:Pd,useInsertionEffect:_d,useLayoutEffect:Rd,useMemo:bd,useReducer:_i,useRef:Cd,useState:function(){return _i(Lr)},useDebugValue:ba,useDeferredValue:function(e){var t=je();return ee===null?t.memoizedState=e:Od(t,ee.memoizedState,e)},useTransition:function(){var e=_i(Lr)[0],t=je().memoizedState;return[e,t]},useMutableSource:yd,useSyncExternalStore:vd,useId:Ld,unstable_isNewReconciler:!1};function We(e,t){if(e&&e.defaultProps){t=Y({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function ys(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:Y({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Al={isMounted:function(e){return(e=e._reactInternals)?un(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=me(),o=At(e),l=ct(r,o);l.payload=t,n!=null&&(l.callback=n),t=Lt(e,l,o),t!==null&&(Ye(t,e,o,r),Oo(t,e,o))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=me(),o=At(e),l=ct(r,o);l.tag=1,l.payload=t,n!=null&&(l.callback=n),t=Lt(e,l,o),t!==null&&(Ye(t,e,o,r),Oo(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=me(),r=At(e),o=ct(n,r);o.tag=2,t!=null&&(o.callback=t),t=Lt(e,o,r),t!==null&&(Ye(t,e,r,n),Oo(t,e,r))}};function Wu(e,t,n,r,o,l,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,l,i):t.prototype&&t.prototype.isPureReactComponent?!_r(n,r)||!_r(o,l):!0}function Id(e,t,n){var r=!1,o=Ft,l=t.contextType;return typeof l=="object"&&l!==null?l=Ue(l):(o=ke(t)?en:de.current,r=t.contextTypes,l=(r=r!=null)?Mn(e,o):Ft),t=new t(n,l),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Al,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=l),t}function Vu(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Al.enqueueReplaceState(t,t.state,null)}function vs(e,t,n,r){var o=e.stateNode;o.props=n,o.state=e.memoizedState,o.refs={},Sa(e);var l=t.contextType;typeof l=="object"&&l!==null?o.context=Ue(l):(l=ke(t)?en:de.current,o.context=Mn(e,l)),o.state=e.memoizedState,l=t.getDerivedStateFromProps,typeof l=="function"&&(ys(e,t,l,n),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&Al.enqueueReplaceState(o,o.state,null),al(e,n,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function Un(e,t){try{var n="",r=t;do n+=Wm(r),r=r.return;while(r);var o=n}catch(l){o=`
Error generating stack: `+l.message+`
`+l.stack}return{value:e,source:t,stack:o,digest:null}}function Ri(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function ws(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var gg=typeof WeakMap=="function"?WeakMap:Map;function Dd(e,t,n){n=ct(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){pl||(pl=!0,Ts=r),ws(e,t)},n}function Fd(e,t,n){n=ct(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=t.value;n.payload=function(){return r(o)},n.callback=function(){ws(e,t)}}var l=e.stateNode;return l!==null&&typeof l.componentDidCatch=="function"&&(n.callback=function(){ws(e,t),typeof r!="function"&&(zt===null?zt=new Set([this]):zt.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),n}function Hu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new gg;var o=new Set;r.set(t,o)}else o=r.get(t),o===void 0&&(o=new Set,r.set(t,o));o.has(n)||(o.add(n),e=bg.bind(null,e,t,n),t.then(e,e))}function Qu(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Ku(e,t,n,r,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=ct(-1,1),t.tag=2,Lt(n,t,1))),n.lanes|=1),e)}var yg=yt.ReactCurrentOwner,Ee=!1;function pe(e,t,n,r){t.child=e===null?pd(t,null,n,r):Dn(t,e.child,n,r)}function Yu(e,t,n,r,o){n=n.render;var l=t.ref;return On(t,o),r=Na(e,t,n,r,l,o),n=Pa(),e!==null&&!Ee?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,ht(e,t,o)):(H&&n&&ha(t),t.flags|=1,pe(e,t,r,o),t.child)}function Xu(e,t,n,r,o){if(e===null){var l=n.type;return typeof l=="function"&&!Fa(l)&&l.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=l,Ud(e,t,l,r,o)):(e=Do(n.type,null,r,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(l=e.child,!(e.lanes&o)){var i=l.memoizedProps;if(n=n.compare,n=n!==null?n:_r,n(i,r)&&e.ref===t.ref)return ht(e,t,o)}return t.flags|=1,e=Mt(l,r),e.ref=t.ref,e.return=t,t.child=e}function Ud(e,t,n,r,o){if(e!==null){var l=e.memoizedProps;if(_r(l,r)&&e.ref===t.ref)if(Ee=!1,t.pendingProps=r=l,(e.lanes&o)!==0)e.flags&131072&&(Ee=!0);else return t.lanes=e.lanes,ht(e,t,o)}return xs(e,t,n,r,o)}function jd(e,t,n){var r=t.pendingProps,o=r.children,l=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},j(Rn,Ne),Ne|=n;else{if(!(n&1073741824))return e=l!==null?l.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,j(Rn,Ne),Ne|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=l!==null?l.baseLanes:n,j(Rn,Ne),Ne|=r}else l!==null?(r=l.baseLanes|n,t.memoizedState=null):r=n,j(Rn,Ne),Ne|=r;return pe(e,t,o,n),t.child}function Bd(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function xs(e,t,n,r,o){var l=ke(n)?en:de.current;return l=Mn(t,l),On(t,o),n=Na(e,t,n,r,l,o),r=Pa(),e!==null&&!Ee?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,ht(e,t,o)):(H&&r&&ha(t),t.flags|=1,pe(e,t,n,o),t.child)}function Ju(e,t,n,r,o){if(ke(n)){var l=!0;rl(t)}else l=!1;if(On(t,o),t.stateNode===null)Ao(e,t),Id(t,n,r),vs(t,n,r,o),r=!0;else if(e===null){var i=t.stateNode,s=t.memoizedProps;i.props=s;var a=i.context,u=n.contextType;typeof u=="object"&&u!==null?u=Ue(u):(u=ke(n)?en:de.current,u=Mn(t,u));var c=n.getDerivedStateFromProps,f=typeof c=="function"||typeof i.getSnapshotBeforeUpdate=="function";f||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s!==r||a!==u)&&Vu(t,i,r,u),Et=!1;var m=t.memoizedState;i.state=m,al(t,r,i,o),a=t.memoizedState,s!==r||m!==a||Se.current||Et?(typeof c=="function"&&(ys(t,n,c,r),a=t.memoizedState),(s=Et||Wu(t,n,s,r,m,a,u))?(f||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=a),i.props=r,i.state=a,i.context=u,r=s):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{i=t.stateNode,hd(e,t),s=t.memoizedProps,u=t.type===t.elementType?s:We(t.type,s),i.props=u,f=t.pendingProps,m=i.context,a=n.contextType,typeof a=="object"&&a!==null?a=Ue(a):(a=ke(n)?en:de.current,a=Mn(t,a));var w=n.getDerivedStateFromProps;(c=typeof w=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(s!==f||m!==a)&&Vu(t,i,r,a),Et=!1,m=t.memoizedState,i.state=m,al(t,r,i,o);var g=t.memoizedState;s!==f||m!==g||Se.current||Et?(typeof w=="function"&&(ys(t,n,w,r),g=t.memoizedState),(u=Et||Wu(t,n,u,r,m,g,a)||!1)?(c||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(r,g,a),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(r,g,a)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=g),i.props=r,i.state=g,i.context=a,r=u):(typeof i.componentDidUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),r=!1)}return Es(e,t,n,r,l,o)}function Es(e,t,n,r,o,l){Bd(e,t);var i=(t.flags&128)!==0;if(!r&&!i)return o&&Mu(t,n,!1),ht(e,t,l);r=t.stateNode,yg.current=t;var s=i&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&i?(t.child=Dn(t,e.child,null,l),t.child=Dn(t,null,s,l)):pe(e,t,s,l),t.memoizedState=r.state,o&&Mu(t,n,!0),t.child}function $d(e){var t=e.stateNode;t.pendingContext?Au(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Au(e,t.context,!1),ka(e,t.containerInfo)}function qu(e,t,n,r,o){return In(),ya(o),t.flags|=256,pe(e,t,n,r),t.child}var Ss={dehydrated:null,treeContext:null,retryLane:0};function ks(e){return{baseLanes:e,cachePool:null,transitions:null}}function Wd(e,t,n){var r=t.pendingProps,o=Q.current,l=!1,i=(t.flags&128)!==0,s;if((s=i)||(s=e!==null&&e.memoizedState===null?!1:(o&2)!==0),s?(l=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),j(Q,o&1),e===null)return hs(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(i=r.children,e=r.fallback,l?(r=t.mode,l=t.child,i={mode:"hidden",children:i},!(r&1)&&l!==null?(l.childLanes=0,l.pendingProps=i):l=Dl(i,r,0,null),e=Gt(e,r,n,null),l.return=t,e.return=t,l.sibling=e,t.child=l,t.child.memoizedState=ks(n),t.memoizedState=Ss,e):Oa(t,i));if(o=e.memoizedState,o!==null&&(s=o.dehydrated,s!==null))return vg(e,t,i,r,s,o,n);if(l){l=r.fallback,i=t.mode,o=e.child,s=o.sibling;var a={mode:"hidden",children:r.children};return!(i&1)&&t.child!==o?(r=t.child,r.childLanes=0,r.pendingProps=a,t.deletions=null):(r=Mt(o,a),r.subtreeFlags=o.subtreeFlags&14680064),s!==null?l=Mt(s,l):(l=Gt(l,i,n,null),l.flags|=2),l.return=t,r.return=t,r.sibling=l,t.child=r,r=l,l=t.child,i=e.child.memoizedState,i=i===null?ks(n):{baseLanes:i.baseLanes|n,cachePool:null,transitions:i.transitions},l.memoizedState=i,l.childLanes=e.childLanes&~n,t.memoizedState=Ss,r}return l=e.child,e=l.sibling,r=Mt(l,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Oa(e,t){return t=Dl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function vo(e,t,n,r){return r!==null&&ya(r),Dn(t,e.child,null,n),e=Oa(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function vg(e,t,n,r,o,l,i){if(n)return t.flags&256?(t.flags&=-257,r=Ri(Error(N(422))),vo(e,t,i,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(l=r.fallback,o=t.mode,r=Dl({mode:"visible",children:r.children},o,0,null),l=Gt(l,o,i,null),l.flags|=2,r.return=t,l.return=t,r.sibling=l,t.child=r,t.mode&1&&Dn(t,e.child,null,i),t.child.memoizedState=ks(i),t.memoizedState=Ss,l);if(!(t.mode&1))return vo(e,t,i,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var s=r.dgst;return r=s,l=Error(N(419)),r=Ri(l,r,void 0),vo(e,t,i,r)}if(s=(i&e.childLanes)!==0,Ee||s){if(r=re,r!==null){switch(i&-i){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(r.suspendedLanes|i)?0:o,o!==0&&o!==l.retryLane&&(l.retryLane=o,mt(e,o),Ye(r,e,o,-1))}return Da(),r=Ri(Error(N(421))),vo(e,t,i,r)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=Og.bind(null,e),o._reactRetry=t,null):(e=l.treeContext,Pe=Ot(o.nextSibling),be=t,H=!0,He=null,e!==null&&(Me[Ie++]=at,Me[Ie++]=ut,Me[Ie++]=tn,at=e.id,ut=e.overflow,tn=t),t=Oa(t,r.children),t.flags|=4096,t)}function Gu(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),gs(e.return,t,n)}function Ni(e,t,n,r,o){var l=e.memoizedState;l===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o}:(l.isBackwards=t,l.rendering=null,l.renderingStartTime=0,l.last=r,l.tail=n,l.tailMode=o)}function Vd(e,t,n){var r=t.pendingProps,o=r.revealOrder,l=r.tail;if(pe(e,t,r.children,n),r=Q.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Gu(e,n,t);else if(e.tag===19)Gu(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(j(Q,r),!(t.mode&1))t.memoizedState=null;else switch(o){case"forwards":for(n=t.child,o=null;n!==null;)e=n.alternate,e!==null&&ul(e)===null&&(o=n),n=n.sibling;n=o,n===null?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),Ni(t,!1,o,n,l);break;case"backwards":for(n=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&ul(e)===null){t.child=o;break}e=o.sibling,o.sibling=n,n=o,o=e}Ni(t,!0,n,null,l);break;case"together":Ni(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Ao(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function ht(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),rn|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(N(153));if(t.child!==null){for(e=t.child,n=Mt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Mt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function wg(e,t,n){switch(t.tag){case 3:$d(t),In();break;case 5:gd(t);break;case 1:ke(t.type)&&rl(t);break;case 4:ka(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,o=t.memoizedProps.value;j(il,r._currentValue),r._currentValue=o;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(j(Q,Q.current&1),t.flags|=128,null):n&t.child.childLanes?Wd(e,t,n):(j(Q,Q.current&1),e=ht(e,t,n),e!==null?e.sibling:null);j(Q,Q.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Vd(e,t,n);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),j(Q,Q.current),r)break;return null;case 22:case 23:return t.lanes=0,jd(e,t,n)}return ht(e,t,n)}var Hd,Cs,Qd,Kd;Hd=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Cs=function(){};Qd=function(e,t,n,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,Xt(ot.current);var l=null;switch(n){case"input":o=Qi(e,o),r=Qi(e,r),l=[];break;case"select":o=Y({},o,{value:void 0}),r=Y({},r,{value:void 0}),l=[];break;case"textarea":o=Xi(e,o),r=Xi(e,r),l=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=tl)}qi(n,r);var i;n=null;for(u in o)if(!r.hasOwnProperty(u)&&o.hasOwnProperty(u)&&o[u]!=null)if(u==="style"){var s=o[u];for(i in s)s.hasOwnProperty(i)&&(n||(n={}),n[i]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(vr.hasOwnProperty(u)?l||(l=[]):(l=l||[]).push(u,null));for(u in r){var a=r[u];if(s=o!=null?o[u]:void 0,r.hasOwnProperty(u)&&a!==s&&(a!=null||s!=null))if(u==="style")if(s){for(i in s)!s.hasOwnProperty(i)||a&&a.hasOwnProperty(i)||(n||(n={}),n[i]="");for(i in a)a.hasOwnProperty(i)&&s[i]!==a[i]&&(n||(n={}),n[i]=a[i])}else n||(l||(l=[]),l.push(u,n)),n=a;else u==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,s=s?s.__html:void 0,a!=null&&s!==a&&(l=l||[]).push(u,a)):u==="children"?typeof a!="string"&&typeof a!="number"||(l=l||[]).push(u,""+a):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(vr.hasOwnProperty(u)?(a!=null&&u==="onScroll"&&W("scroll",e),l||s===a||(l=[])):(l=l||[]).push(u,a))}n&&(l=l||[]).push("style",n);var u=l;(t.updateQueue=u)&&(t.flags|=4)}};Kd=function(e,t,n,r){n!==r&&(t.flags|=4)};function er(e,t){if(!H)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function ue(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function xg(e,t,n){var r=t.pendingProps;switch(ga(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ue(t),null;case 1:return ke(t.type)&&nl(),ue(t),null;case 3:return r=t.stateNode,Fn(),V(Se),V(de),_a(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(go(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,He!==null&&(Ls(He),He=null))),Cs(e,t),ue(t),null;case 5:Ca(t);var o=Xt(br.current);if(n=t.type,e!==null&&t.stateNode!=null)Qd(e,t,n,r,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(N(166));return ue(t),null}if(e=Xt(ot.current),go(t)){r=t.stateNode,n=t.type;var l=t.memoizedProps;switch(r[nt]=t,r[Pr]=l,e=(t.mode&1)!==0,n){case"dialog":W("cancel",r),W("close",r);break;case"iframe":case"object":case"embed":W("load",r);break;case"video":case"audio":for(o=0;o<ir.length;o++)W(ir[o],r);break;case"source":W("error",r);break;case"img":case"image":case"link":W("error",r),W("load",r);break;case"details":W("toggle",r);break;case"input":su(r,l),W("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!l.multiple},W("invalid",r);break;case"textarea":uu(r,l),W("invalid",r)}qi(n,l),o=null;for(var i in l)if(l.hasOwnProperty(i)){var s=l[i];i==="children"?typeof s=="string"?r.textContent!==s&&(l.suppressHydrationWarning!==!0&&ho(r.textContent,s,e),o=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(l.suppressHydrationWarning!==!0&&ho(r.textContent,s,e),o=["children",""+s]):vr.hasOwnProperty(i)&&s!=null&&i==="onScroll"&&W("scroll",r)}switch(n){case"input":io(r),au(r,l,!0);break;case"textarea":io(r),cu(r);break;case"select":case"option":break;default:typeof l.onClick=="function"&&(r.onclick=tl)}r=o,t.updateQueue=r,r!==null&&(t.flags|=4)}else{i=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Ef(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=i.createElement(n,{is:r.is}):(e=i.createElement(n),n==="select"&&(i=e,r.multiple?i.multiple=!0:r.size&&(i.size=r.size))):e=i.createElementNS(e,n),e[nt]=t,e[Pr]=r,Hd(e,t,!1,!1),t.stateNode=e;e:{switch(i=Gi(n,r),n){case"dialog":W("cancel",e),W("close",e),o=r;break;case"iframe":case"object":case"embed":W("load",e),o=r;break;case"video":case"audio":for(o=0;o<ir.length;o++)W(ir[o],e);o=r;break;case"source":W("error",e),o=r;break;case"img":case"image":case"link":W("error",e),W("load",e),o=r;break;case"details":W("toggle",e),o=r;break;case"input":su(e,r),o=Qi(e,r),W("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=Y({},r,{value:void 0}),W("invalid",e);break;case"textarea":uu(e,r),o=Xi(e,r),W("invalid",e);break;default:o=r}qi(n,o),s=o;for(l in s)if(s.hasOwnProperty(l)){var a=s[l];l==="style"?Cf(e,a):l==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,a!=null&&Sf(e,a)):l==="children"?typeof a=="string"?(n!=="textarea"||a!=="")&&wr(e,a):typeof a=="number"&&wr(e,""+a):l!=="suppressContentEditableWarning"&&l!=="suppressHydrationWarning"&&l!=="autoFocus"&&(vr.hasOwnProperty(l)?a!=null&&l==="onScroll"&&W("scroll",e):a!=null&&ta(e,l,a,i))}switch(n){case"input":io(e),au(e,r,!1);break;case"textarea":io(e),cu(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Dt(r.value));break;case"select":e.multiple=!!r.multiple,l=r.value,l!=null?Nn(e,!!r.multiple,l,!1):r.defaultValue!=null&&Nn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=tl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return ue(t),null;case 6:if(e&&t.stateNode!=null)Kd(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(N(166));if(n=Xt(br.current),Xt(ot.current),go(t)){if(r=t.stateNode,n=t.memoizedProps,r[nt]=t,(l=r.nodeValue!==n)&&(e=be,e!==null))switch(e.tag){case 3:ho(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&ho(r.nodeValue,n,(e.mode&1)!==0)}l&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[nt]=t,t.stateNode=r}return ue(t),null;case 13:if(V(Q),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(H&&Pe!==null&&t.mode&1&&!(t.flags&128))fd(),In(),t.flags|=98560,l=!1;else if(l=go(t),r!==null&&r.dehydrated!==null){if(e===null){if(!l)throw Error(N(318));if(l=t.memoizedState,l=l!==null?l.dehydrated:null,!l)throw Error(N(317));l[nt]=t}else In(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;ue(t),l=!1}else He!==null&&(Ls(He),He=null),l=!0;if(!l)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||Q.current&1?te===0&&(te=3):Da())),t.updateQueue!==null&&(t.flags|=4),ue(t),null);case 4:return Fn(),Cs(e,t),e===null&&Rr(t.stateNode.containerInfo),ue(t),null;case 10:return xa(t.type._context),ue(t),null;case 17:return ke(t.type)&&nl(),ue(t),null;case 19:if(V(Q),l=t.memoizedState,l===null)return ue(t),null;if(r=(t.flags&128)!==0,i=l.rendering,i===null)if(r)er(l,!1);else{if(te!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(i=ul(e),i!==null){for(t.flags|=128,er(l,!1),r=i.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)l=n,e=r,l.flags&=14680066,i=l.alternate,i===null?(l.childLanes=0,l.lanes=e,l.child=null,l.subtreeFlags=0,l.memoizedProps=null,l.memoizedState=null,l.updateQueue=null,l.dependencies=null,l.stateNode=null):(l.childLanes=i.childLanes,l.lanes=i.lanes,l.child=i.child,l.subtreeFlags=0,l.deletions=null,l.memoizedProps=i.memoizedProps,l.memoizedState=i.memoizedState,l.updateQueue=i.updateQueue,l.type=i.type,e=i.dependencies,l.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return j(Q,Q.current&1|2),t.child}e=e.sibling}l.tail!==null&&J()>jn&&(t.flags|=128,r=!0,er(l,!1),t.lanes=4194304)}else{if(!r)if(e=ul(i),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),er(l,!0),l.tail===null&&l.tailMode==="hidden"&&!i.alternate&&!H)return ue(t),null}else 2*J()-l.renderingStartTime>jn&&n!==1073741824&&(t.flags|=128,r=!0,er(l,!1),t.lanes=4194304);l.isBackwards?(i.sibling=t.child,t.child=i):(n=l.last,n!==null?n.sibling=i:t.child=i,l.last=i)}return l.tail!==null?(t=l.tail,l.rendering=t,l.tail=t.sibling,l.renderingStartTime=J(),t.sibling=null,n=Q.current,j(Q,r?n&1|2:n&1),t):(ue(t),null);case 22:case 23:return Ia(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?Ne&1073741824&&(ue(t),t.subtreeFlags&6&&(t.flags|=8192)):ue(t),null;case 24:return null;case 25:return null}throw Error(N(156,t.tag))}function Eg(e,t){switch(ga(t),t.tag){case 1:return ke(t.type)&&nl(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Fn(),V(Se),V(de),_a(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Ca(t),null;case 13:if(V(Q),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(N(340));In()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return V(Q),null;case 4:return Fn(),null;case 10:return xa(t.type._context),null;case 22:case 23:return Ia(),null;case 24:return null;default:return null}}var wo=!1,ce=!1,Sg=typeof WeakSet=="function"?WeakSet:Set,O=null;function _n(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){X(e,t,r)}else n.current=null}function _s(e,t,n){try{n()}catch(r){X(e,t,r)}}var Zu=!1;function kg(e,t){if(as=Go,e=Gf(),ma(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var o=r.anchorOffset,l=r.focusNode;r=r.focusOffset;try{n.nodeType,l.nodeType}catch{n=null;break e}var i=0,s=-1,a=-1,u=0,c=0,f=e,m=null;t:for(;;){for(var w;f!==n||o!==0&&f.nodeType!==3||(s=i+o),f!==l||r!==0&&f.nodeType!==3||(a=i+r),f.nodeType===3&&(i+=f.nodeValue.length),(w=f.firstChild)!==null;)m=f,f=w;for(;;){if(f===e)break t;if(m===n&&++u===o&&(s=i),m===l&&++c===r&&(a=i),(w=f.nextSibling)!==null)break;f=m,m=f.parentNode}f=w}n=s===-1||a===-1?null:{start:s,end:a}}else n=null}n=n||{start:0,end:0}}else n=null;for(us={focusedElem:e,selectionRange:n},Go=!1,O=t;O!==null;)if(t=O,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,O=e;else for(;O!==null;){t=O;try{var g=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(g!==null){var v=g.memoizedProps,x=g.memoizedState,h=t.stateNode,p=h.getSnapshotBeforeUpdate(t.elementType===t.type?v:We(t.type,v),x);h.__reactInternalSnapshotBeforeUpdate=p}break;case 3:var y=t.stateNode.containerInfo;y.nodeType===1?y.textContent="":y.nodeType===9&&y.documentElement&&y.removeChild(y.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(N(163))}}catch(E){X(t,t.return,E)}if(e=t.sibling,e!==null){e.return=t.return,O=e;break}O=t.return}return g=Zu,Zu=!1,g}function mr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var l=o.destroy;o.destroy=void 0,l!==void 0&&_s(t,n,l)}o=o.next}while(o!==r)}}function Ml(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Rs(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Yd(e){var t=e.alternate;t!==null&&(e.alternate=null,Yd(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[nt],delete t[Pr],delete t[ds],delete t[lg],delete t[ig])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Xd(e){return e.tag===5||e.tag===3||e.tag===4}function ec(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Xd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ns(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=tl));else if(r!==4&&(e=e.child,e!==null))for(Ns(e,t,n),e=e.sibling;e!==null;)Ns(e,t,n),e=e.sibling}function Ps(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Ps(e,t,n),e=e.sibling;e!==null;)Ps(e,t,n),e=e.sibling}var le=null,Ve=!1;function wt(e,t,n){for(n=n.child;n!==null;)Jd(e,t,n),n=n.sibling}function Jd(e,t,n){if(rt&&typeof rt.onCommitFiberUnmount=="function")try{rt.onCommitFiberUnmount(Nl,n)}catch{}switch(n.tag){case 5:ce||_n(n,t);case 6:var r=le,o=Ve;le=null,wt(e,t,n),le=r,Ve=o,le!==null&&(Ve?(e=le,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):le.removeChild(n.stateNode));break;case 18:le!==null&&(Ve?(e=le,n=n.stateNode,e.nodeType===8?xi(e.parentNode,n):e.nodeType===1&&xi(e,n),kr(e)):xi(le,n.stateNode));break;case 4:r=le,o=Ve,le=n.stateNode.containerInfo,Ve=!0,wt(e,t,n),le=r,Ve=o;break;case 0:case 11:case 14:case 15:if(!ce&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var l=o,i=l.destroy;l=l.tag,i!==void 0&&(l&2||l&4)&&_s(n,t,i),o=o.next}while(o!==r)}wt(e,t,n);break;case 1:if(!ce&&(_n(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){X(n,t,s)}wt(e,t,n);break;case 21:wt(e,t,n);break;case 22:n.mode&1?(ce=(r=ce)||n.memoizedState!==null,wt(e,t,n),ce=r):wt(e,t,n);break;default:wt(e,t,n)}}function tc(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Sg),t.forEach(function(r){var o=Lg.bind(null,e,r);n.has(r)||(n.add(r),r.then(o,o))})}}function $e(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var o=n[r];try{var l=e,i=t,s=i;e:for(;s!==null;){switch(s.tag){case 5:le=s.stateNode,Ve=!1;break e;case 3:le=s.stateNode.containerInfo,Ve=!0;break e;case 4:le=s.stateNode.containerInfo,Ve=!0;break e}s=s.return}if(le===null)throw Error(N(160));Jd(l,i,o),le=null,Ve=!1;var a=o.alternate;a!==null&&(a.return=null),o.return=null}catch(u){X(o,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)qd(t,e),t=t.sibling}function qd(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if($e(t,e),Ze(e),r&4){try{mr(3,e,e.return),Ml(3,e)}catch(v){X(e,e.return,v)}try{mr(5,e,e.return)}catch(v){X(e,e.return,v)}}break;case 1:$e(t,e),Ze(e),r&512&&n!==null&&_n(n,n.return);break;case 5:if($e(t,e),Ze(e),r&512&&n!==null&&_n(n,n.return),e.flags&32){var o=e.stateNode;try{wr(o,"")}catch(v){X(e,e.return,v)}}if(r&4&&(o=e.stateNode,o!=null)){var l=e.memoizedProps,i=n!==null?n.memoizedProps:l,s=e.type,a=e.updateQueue;if(e.updateQueue=null,a!==null)try{s==="input"&&l.type==="radio"&&l.name!=null&&wf(o,l),Gi(s,i);var u=Gi(s,l);for(i=0;i<a.length;i+=2){var c=a[i],f=a[i+1];c==="style"?Cf(o,f):c==="dangerouslySetInnerHTML"?Sf(o,f):c==="children"?wr(o,f):ta(o,c,f,u)}switch(s){case"input":Ki(o,l);break;case"textarea":xf(o,l);break;case"select":var m=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!l.multiple;var w=l.value;w!=null?Nn(o,!!l.multiple,w,!1):m!==!!l.multiple&&(l.defaultValue!=null?Nn(o,!!l.multiple,l.defaultValue,!0):Nn(o,!!l.multiple,l.multiple?[]:"",!1))}o[Pr]=l}catch(v){X(e,e.return,v)}}break;case 6:if($e(t,e),Ze(e),r&4){if(e.stateNode===null)throw Error(N(162));o=e.stateNode,l=e.memoizedProps;try{o.nodeValue=l}catch(v){X(e,e.return,v)}}break;case 3:if($e(t,e),Ze(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{kr(t.containerInfo)}catch(v){X(e,e.return,v)}break;case 4:$e(t,e),Ze(e);break;case 13:$e(t,e),Ze(e),o=e.child,o.flags&8192&&(l=o.memoizedState!==null,o.stateNode.isHidden=l,!l||o.alternate!==null&&o.alternate.memoizedState!==null||(Aa=J())),r&4&&tc(e);break;case 22:if(c=n!==null&&n.memoizedState!==null,e.mode&1?(ce=(u=ce)||c,$e(t,e),ce=u):$e(t,e),Ze(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!c&&e.mode&1)for(O=e,c=e.child;c!==null;){for(f=O=c;O!==null;){switch(m=O,w=m.child,m.tag){case 0:case 11:case 14:case 15:mr(4,m,m.return);break;case 1:_n(m,m.return);var g=m.stateNode;if(typeof g.componentWillUnmount=="function"){r=m,n=m.return;try{t=r,g.props=t.memoizedProps,g.state=t.memoizedState,g.componentWillUnmount()}catch(v){X(r,n,v)}}break;case 5:_n(m,m.return);break;case 22:if(m.memoizedState!==null){rc(f);continue}}w!==null?(w.return=m,O=w):rc(f)}c=c.sibling}e:for(c=null,f=e;;){if(f.tag===5){if(c===null){c=f;try{o=f.stateNode,u?(l=o.style,typeof l.setProperty=="function"?l.setProperty("display","none","important"):l.display="none"):(s=f.stateNode,a=f.memoizedProps.style,i=a!=null&&a.hasOwnProperty("display")?a.display:null,s.style.display=kf("display",i))}catch(v){X(e,e.return,v)}}}else if(f.tag===6){if(c===null)try{f.stateNode.nodeValue=u?"":f.memoizedProps}catch(v){X(e,e.return,v)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===e)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===e)break e;for(;f.sibling===null;){if(f.return===null||f.return===e)break e;c===f&&(c=null),f=f.return}c===f&&(c=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:$e(t,e),Ze(e),r&4&&tc(e);break;case 21:break;default:$e(t,e),Ze(e)}}function Ze(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Xd(n)){var r=n;break e}n=n.return}throw Error(N(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(wr(o,""),r.flags&=-33);var l=ec(e);Ps(e,l,o);break;case 3:case 4:var i=r.stateNode.containerInfo,s=ec(e);Ns(e,s,i);break;default:throw Error(N(161))}}catch(a){X(e,e.return,a)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Cg(e,t,n){O=e,Gd(e)}function Gd(e,t,n){for(var r=(e.mode&1)!==0;O!==null;){var o=O,l=o.child;if(o.tag===22&&r){var i=o.memoizedState!==null||wo;if(!i){var s=o.alternate,a=s!==null&&s.memoizedState!==null||ce;s=wo;var u=ce;if(wo=i,(ce=a)&&!u)for(O=o;O!==null;)i=O,a=i.child,i.tag===22&&i.memoizedState!==null?oc(o):a!==null?(a.return=i,O=a):oc(o);for(;l!==null;)O=l,Gd(l),l=l.sibling;O=o,wo=s,ce=u}nc(e)}else o.subtreeFlags&8772&&l!==null?(l.return=o,O=l):nc(e)}}function nc(e){for(;O!==null;){var t=O;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:ce||Ml(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!ce)if(n===null)r.componentDidMount();else{var o=t.elementType===t.type?n.memoizedProps:We(t.type,n.memoizedProps);r.componentDidUpdate(o,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var l=t.updateQueue;l!==null&&ju(t,l,r);break;case 3:var i=t.updateQueue;if(i!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}ju(t,i,n)}break;case 5:var s=t.stateNode;if(n===null&&t.flags&4){n=s;var a=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":a.autoFocus&&n.focus();break;case"img":a.src&&(n.src=a.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var c=u.memoizedState;if(c!==null){var f=c.dehydrated;f!==null&&kr(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(N(163))}ce||t.flags&512&&Rs(t)}catch(m){X(t,t.return,m)}}if(t===e){O=null;break}if(n=t.sibling,n!==null){n.return=t.return,O=n;break}O=t.return}}function rc(e){for(;O!==null;){var t=O;if(t===e){O=null;break}var n=t.sibling;if(n!==null){n.return=t.return,O=n;break}O=t.return}}function oc(e){for(;O!==null;){var t=O;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Ml(4,t)}catch(a){X(t,n,a)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var o=t.return;try{r.componentDidMount()}catch(a){X(t,o,a)}}var l=t.return;try{Rs(t)}catch(a){X(t,l,a)}break;case 5:var i=t.return;try{Rs(t)}catch(a){X(t,i,a)}}}catch(a){X(t,t.return,a)}if(t===e){O=null;break}var s=t.sibling;if(s!==null){s.return=t.return,O=s;break}O=t.return}}var _g=Math.ceil,dl=yt.ReactCurrentDispatcher,La=yt.ReactCurrentOwner,Fe=yt.ReactCurrentBatchConfig,D=0,re=null,G=null,ie=0,Ne=0,Rn=Bt(0),te=0,Ar=null,rn=0,Il=0,za=0,hr=null,xe=null,Aa=0,jn=1/0,lt=null,pl=!1,Ts=null,zt=null,xo=!1,_t=null,ml=0,gr=0,bs=null,Mo=-1,Io=0;function me(){return D&6?J():Mo!==-1?Mo:Mo=J()}function At(e){return e.mode&1?D&2&&ie!==0?ie&-ie:ag.transition!==null?(Io===0&&(Io=If()),Io):(e=U,e!==0||(e=window.event,e=e===void 0?16:Wf(e.type)),e):1}function Ye(e,t,n,r){if(50<gr)throw gr=0,bs=null,Error(N(185));$r(e,n,r),(!(D&2)||e!==re)&&(e===re&&(!(D&2)&&(Il|=n),te===4&&kt(e,ie)),Ce(e,r),n===1&&D===0&&!(t.mode&1)&&(jn=J()+500,Ll&&$t()))}function Ce(e,t){var n=e.callbackNode;ah(e,t);var r=qo(e,e===re?ie:0);if(r===0)n!==null&&pu(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&pu(n),t===1)e.tag===0?sg(lc.bind(null,e)):ad(lc.bind(null,e)),rg(function(){!(D&6)&&$t()}),n=null;else{switch(Df(r)){case 1:n=ia;break;case 4:n=Af;break;case 16:n=Jo;break;case 536870912:n=Mf;break;default:n=Jo}n=ip(n,Zd.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Zd(e,t){if(Mo=-1,Io=0,D&6)throw Error(N(327));var n=e.callbackNode;if(Ln()&&e.callbackNode!==n)return null;var r=qo(e,e===re?ie:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=hl(e,r);else{t=r;var o=D;D|=2;var l=tp();(re!==e||ie!==t)&&(lt=null,jn=J()+500,qt(e,t));do try{Pg();break}catch(s){ep(e,s)}while(!0);wa(),dl.current=l,D=o,G!==null?t=0:(re=null,ie=0,t=te)}if(t!==0){if(t===2&&(o=rs(e),o!==0&&(r=o,t=Os(e,o))),t===1)throw n=Ar,qt(e,0),kt(e,r),Ce(e,J()),n;if(t===6)kt(e,r);else{if(o=e.current.alternate,!(r&30)&&!Rg(o)&&(t=hl(e,r),t===2&&(l=rs(e),l!==0&&(r=l,t=Os(e,l))),t===1))throw n=Ar,qt(e,0),kt(e,r),Ce(e,J()),n;switch(e.finishedWork=o,e.finishedLanes=r,t){case 0:case 1:throw Error(N(345));case 2:Qt(e,xe,lt);break;case 3:if(kt(e,r),(r&130023424)===r&&(t=Aa+500-J(),10<t)){if(qo(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){me(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=fs(Qt.bind(null,e,xe,lt),t);break}Qt(e,xe,lt);break;case 4:if(kt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,o=-1;0<r;){var i=31-Ke(r);l=1<<i,i=t[i],i>o&&(o=i),r&=~l}if(r=o,r=J()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*_g(r/1960))-r,10<r){e.timeoutHandle=fs(Qt.bind(null,e,xe,lt),r);break}Qt(e,xe,lt);break;case 5:Qt(e,xe,lt);break;default:throw Error(N(329))}}}return Ce(e,J()),e.callbackNode===n?Zd.bind(null,e):null}function Os(e,t){var n=hr;return e.current.memoizedState.isDehydrated&&(qt(e,t).flags|=256),e=hl(e,t),e!==2&&(t=xe,xe=n,t!==null&&Ls(t)),e}function Ls(e){xe===null?xe=e:xe.push.apply(xe,e)}function Rg(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var o=n[r],l=o.getSnapshot;o=o.value;try{if(!Xe(l(),o))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function kt(e,t){for(t&=~za,t&=~Il,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Ke(t),r=1<<n;e[n]=-1,t&=~r}}function lc(e){if(D&6)throw Error(N(327));Ln();var t=qo(e,0);if(!(t&1))return Ce(e,J()),null;var n=hl(e,t);if(e.tag!==0&&n===2){var r=rs(e);r!==0&&(t=r,n=Os(e,r))}if(n===1)throw n=Ar,qt(e,0),kt(e,t),Ce(e,J()),n;if(n===6)throw Error(N(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Qt(e,xe,lt),Ce(e,J()),null}function Ma(e,t){var n=D;D|=1;try{return e(t)}finally{D=n,D===0&&(jn=J()+500,Ll&&$t())}}function on(e){_t!==null&&_t.tag===0&&!(D&6)&&Ln();var t=D;D|=1;var n=Fe.transition,r=U;try{if(Fe.transition=null,U=1,e)return e()}finally{U=r,Fe.transition=n,D=t,!(D&6)&&$t()}}function Ia(){Ne=Rn.current,V(Rn)}function qt(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,ng(n)),G!==null)for(n=G.return;n!==null;){var r=n;switch(ga(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&nl();break;case 3:Fn(),V(Se),V(de),_a();break;case 5:Ca(r);break;case 4:Fn();break;case 13:V(Q);break;case 19:V(Q);break;case 10:xa(r.type._context);break;case 22:case 23:Ia()}n=n.return}if(re=e,G=e=Mt(e.current,null),ie=Ne=t,te=0,Ar=null,za=Il=rn=0,xe=hr=null,Yt!==null){for(t=0;t<Yt.length;t++)if(n=Yt[t],r=n.interleaved,r!==null){n.interleaved=null;var o=r.next,l=n.pending;if(l!==null){var i=l.next;l.next=o,r.next=i}n.pending=r}Yt=null}return e}function ep(e,t){do{var n=G;try{if(wa(),Lo.current=fl,cl){for(var r=K.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}cl=!1}if(nn=0,ne=ee=K=null,pr=!1,Or=0,La.current=null,n===null||n.return===null){te=1,Ar=t,G=null;break}e:{var l=e,i=n.return,s=n,a=t;if(t=ie,s.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){var u=a,c=s,f=c.tag;if(!(c.mode&1)&&(f===0||f===11||f===15)){var m=c.alternate;m?(c.updateQueue=m.updateQueue,c.memoizedState=m.memoizedState,c.lanes=m.lanes):(c.updateQueue=null,c.memoizedState=null)}var w=Qu(i);if(w!==null){w.flags&=-257,Ku(w,i,s,l,t),w.mode&1&&Hu(l,u,t),t=w,a=u;var g=t.updateQueue;if(g===null){var v=new Set;v.add(a),t.updateQueue=v}else g.add(a);break e}else{if(!(t&1)){Hu(l,u,t),Da();break e}a=Error(N(426))}}else if(H&&s.mode&1){var x=Qu(i);if(x!==null){!(x.flags&65536)&&(x.flags|=256),Ku(x,i,s,l,t),ya(Un(a,s));break e}}l=a=Un(a,s),te!==4&&(te=2),hr===null?hr=[l]:hr.push(l),l=i;do{switch(l.tag){case 3:l.flags|=65536,t&=-t,l.lanes|=t;var h=Dd(l,a,t);Uu(l,h);break e;case 1:s=a;var p=l.type,y=l.stateNode;if(!(l.flags&128)&&(typeof p.getDerivedStateFromError=="function"||y!==null&&typeof y.componentDidCatch=="function"&&(zt===null||!zt.has(y)))){l.flags|=65536,t&=-t,l.lanes|=t;var E=Fd(l,s,t);Uu(l,E);break e}}l=l.return}while(l!==null)}rp(n)}catch(k){t=k,G===n&&n!==null&&(G=n=n.return);continue}break}while(!0)}function tp(){var e=dl.current;return dl.current=fl,e===null?fl:e}function Da(){(te===0||te===3||te===2)&&(te=4),re===null||!(rn&268435455)&&!(Il&268435455)||kt(re,ie)}function hl(e,t){var n=D;D|=2;var r=tp();(re!==e||ie!==t)&&(lt=null,qt(e,t));do try{Ng();break}catch(o){ep(e,o)}while(!0);if(wa(),D=n,dl.current=r,G!==null)throw Error(N(261));return re=null,ie=0,te}function Ng(){for(;G!==null;)np(G)}function Pg(){for(;G!==null&&!Zm();)np(G)}function np(e){var t=lp(e.alternate,e,Ne);e.memoizedProps=e.pendingProps,t===null?rp(e):G=t,La.current=null}function rp(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Eg(n,t),n!==null){n.flags&=32767,G=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{te=6,G=null;return}}else if(n=xg(n,t,Ne),n!==null){G=n;return}if(t=t.sibling,t!==null){G=t;return}G=t=e}while(t!==null);te===0&&(te=5)}function Qt(e,t,n){var r=U,o=Fe.transition;try{Fe.transition=null,U=1,Tg(e,t,n,r)}finally{Fe.transition=o,U=r}return null}function Tg(e,t,n,r){do Ln();while(_t!==null);if(D&6)throw Error(N(327));n=e.finishedWork;var o=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(N(177));e.callbackNode=null,e.callbackPriority=0;var l=n.lanes|n.childLanes;if(uh(e,l),e===re&&(G=re=null,ie=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||xo||(xo=!0,ip(Jo,function(){return Ln(),null})),l=(n.flags&15990)!==0,n.subtreeFlags&15990||l){l=Fe.transition,Fe.transition=null;var i=U;U=1;var s=D;D|=4,La.current=null,kg(e,n),qd(n,e),Xh(us),Go=!!as,us=as=null,e.current=n,Cg(n),eh(),D=s,U=i,Fe.transition=l}else e.current=n;if(xo&&(xo=!1,_t=e,ml=o),l=e.pendingLanes,l===0&&(zt=null),rh(n.stateNode),Ce(e,J()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)o=t[n],r(o.value,{componentStack:o.stack,digest:o.digest});if(pl)throw pl=!1,e=Ts,Ts=null,e;return ml&1&&e.tag!==0&&Ln(),l=e.pendingLanes,l&1?e===bs?gr++:(gr=0,bs=e):gr=0,$t(),null}function Ln(){if(_t!==null){var e=Df(ml),t=Fe.transition,n=U;try{if(Fe.transition=null,U=16>e?16:e,_t===null)var r=!1;else{if(e=_t,_t=null,ml=0,D&6)throw Error(N(331));var o=D;for(D|=4,O=e.current;O!==null;){var l=O,i=l.child;if(O.flags&16){var s=l.deletions;if(s!==null){for(var a=0;a<s.length;a++){var u=s[a];for(O=u;O!==null;){var c=O;switch(c.tag){case 0:case 11:case 15:mr(8,c,l)}var f=c.child;if(f!==null)f.return=c,O=f;else for(;O!==null;){c=O;var m=c.sibling,w=c.return;if(Yd(c),c===u){O=null;break}if(m!==null){m.return=w,O=m;break}O=w}}}var g=l.alternate;if(g!==null){var v=g.child;if(v!==null){g.child=null;do{var x=v.sibling;v.sibling=null,v=x}while(v!==null)}}O=l}}if(l.subtreeFlags&2064&&i!==null)i.return=l,O=i;else e:for(;O!==null;){if(l=O,l.flags&2048)switch(l.tag){case 0:case 11:case 15:mr(9,l,l.return)}var h=l.sibling;if(h!==null){h.return=l.return,O=h;break e}O=l.return}}var p=e.current;for(O=p;O!==null;){i=O;var y=i.child;if(i.subtreeFlags&2064&&y!==null)y.return=i,O=y;else e:for(i=p;O!==null;){if(s=O,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:Ml(9,s)}}catch(k){X(s,s.return,k)}if(s===i){O=null;break e}var E=s.sibling;if(E!==null){E.return=s.return,O=E;break e}O=s.return}}if(D=o,$t(),rt&&typeof rt.onPostCommitFiberRoot=="function")try{rt.onPostCommitFiberRoot(Nl,e)}catch{}r=!0}return r}finally{U=n,Fe.transition=t}}return!1}function ic(e,t,n){t=Un(n,t),t=Dd(e,t,1),e=Lt(e,t,1),t=me(),e!==null&&($r(e,1,t),Ce(e,t))}function X(e,t,n){if(e.tag===3)ic(e,e,n);else for(;t!==null;){if(t.tag===3){ic(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(zt===null||!zt.has(r))){e=Un(n,e),e=Fd(t,e,1),t=Lt(t,e,1),e=me(),t!==null&&($r(t,1,e),Ce(t,e));break}}t=t.return}}function bg(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=me(),e.pingedLanes|=e.suspendedLanes&n,re===e&&(ie&n)===n&&(te===4||te===3&&(ie&130023424)===ie&&500>J()-Aa?qt(e,0):za|=n),Ce(e,t)}function op(e,t){t===0&&(e.mode&1?(t=uo,uo<<=1,!(uo&130023424)&&(uo=4194304)):t=1);var n=me();e=mt(e,t),e!==null&&($r(e,t,n),Ce(e,n))}function Og(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),op(e,n)}function Lg(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(n=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(N(314))}r!==null&&r.delete(t),op(e,n)}var lp;lp=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Se.current)Ee=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return Ee=!1,wg(e,t,n);Ee=!!(e.flags&131072)}else Ee=!1,H&&t.flags&1048576&&ud(t,ll,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Ao(e,t),e=t.pendingProps;var o=Mn(t,de.current);On(t,n),o=Na(null,t,r,e,o,n);var l=Pa();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ke(r)?(l=!0,rl(t)):l=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,Sa(t),o.updater=Al,t.stateNode=o,o._reactInternals=t,vs(t,r,e,n),t=Es(null,t,r,!0,l,n)):(t.tag=0,H&&l&&ha(t),pe(null,t,o,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Ao(e,t),e=t.pendingProps,o=r._init,r=o(r._payload),t.type=r,o=t.tag=Ag(r),e=We(r,e),o){case 0:t=xs(null,t,r,e,n);break e;case 1:t=Ju(null,t,r,e,n);break e;case 11:t=Yu(null,t,r,e,n);break e;case 14:t=Xu(null,t,r,We(r.type,e),n);break e}throw Error(N(306,r,""))}return t;case 0:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:We(r,o),xs(e,t,r,o,n);case 1:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:We(r,o),Ju(e,t,r,o,n);case 3:e:{if($d(t),e===null)throw Error(N(387));r=t.pendingProps,l=t.memoizedState,o=l.element,hd(e,t),al(t,r,null,n);var i=t.memoizedState;if(r=i.element,l.isDehydrated)if(l={element:r,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=l,t.memoizedState=l,t.flags&256){o=Un(Error(N(423)),t),t=qu(e,t,r,n,o);break e}else if(r!==o){o=Un(Error(N(424)),t),t=qu(e,t,r,n,o);break e}else for(Pe=Ot(t.stateNode.containerInfo.firstChild),be=t,H=!0,He=null,n=pd(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(In(),r===o){t=ht(e,t,n);break e}pe(e,t,r,n)}t=t.child}return t;case 5:return gd(t),e===null&&hs(t),r=t.type,o=t.pendingProps,l=e!==null?e.memoizedProps:null,i=o.children,cs(r,o)?i=null:l!==null&&cs(r,l)&&(t.flags|=32),Bd(e,t),pe(e,t,i,n),t.child;case 6:return e===null&&hs(t),null;case 13:return Wd(e,t,n);case 4:return ka(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Dn(t,null,r,n):pe(e,t,r,n),t.child;case 11:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:We(r,o),Yu(e,t,r,o,n);case 7:return pe(e,t,t.pendingProps,n),t.child;case 8:return pe(e,t,t.pendingProps.children,n),t.child;case 12:return pe(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,o=t.pendingProps,l=t.memoizedProps,i=o.value,j(il,r._currentValue),r._currentValue=i,l!==null)if(Xe(l.value,i)){if(l.children===o.children&&!Se.current){t=ht(e,t,n);break e}}else for(l=t.child,l!==null&&(l.return=t);l!==null;){var s=l.dependencies;if(s!==null){i=l.child;for(var a=s.firstContext;a!==null;){if(a.context===r){if(l.tag===1){a=ct(-1,n&-n),a.tag=2;var u=l.updateQueue;if(u!==null){u=u.shared;var c=u.pending;c===null?a.next=a:(a.next=c.next,c.next=a),u.pending=a}}l.lanes|=n,a=l.alternate,a!==null&&(a.lanes|=n),gs(l.return,n,t),s.lanes|=n;break}a=a.next}}else if(l.tag===10)i=l.type===t.type?null:l.child;else if(l.tag===18){if(i=l.return,i===null)throw Error(N(341));i.lanes|=n,s=i.alternate,s!==null&&(s.lanes|=n),gs(i,n,t),i=l.sibling}else i=l.child;if(i!==null)i.return=l;else for(i=l;i!==null;){if(i===t){i=null;break}if(l=i.sibling,l!==null){l.return=i.return,i=l;break}i=i.return}l=i}pe(e,t,o.children,n),t=t.child}return t;case 9:return o=t.type,r=t.pendingProps.children,On(t,n),o=Ue(o),r=r(o),t.flags|=1,pe(e,t,r,n),t.child;case 14:return r=t.type,o=We(r,t.pendingProps),o=We(r.type,o),Xu(e,t,r,o,n);case 15:return Ud(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:We(r,o),Ao(e,t),t.tag=1,ke(r)?(e=!0,rl(t)):e=!1,On(t,n),Id(t,r,o),vs(t,r,o,n),Es(null,t,r,!0,e,n);case 19:return Vd(e,t,n);case 22:return jd(e,t,n)}throw Error(N(156,t.tag))};function ip(e,t){return zf(e,t)}function zg(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function De(e,t,n,r){return new zg(e,t,n,r)}function Fa(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ag(e){if(typeof e=="function")return Fa(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ra)return 11;if(e===oa)return 14}return 2}function Mt(e,t){var n=e.alternate;return n===null?(n=De(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Do(e,t,n,r,o,l){var i=2;if(r=e,typeof e=="function")Fa(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case gn:return Gt(n.children,o,l,t);case na:i=8,o|=8;break;case $i:return e=De(12,n,t,o|2),e.elementType=$i,e.lanes=l,e;case Wi:return e=De(13,n,t,o),e.elementType=Wi,e.lanes=l,e;case Vi:return e=De(19,n,t,o),e.elementType=Vi,e.lanes=l,e;case gf:return Dl(n,o,l,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case mf:i=10;break e;case hf:i=9;break e;case ra:i=11;break e;case oa:i=14;break e;case xt:i=16,r=null;break e}throw Error(N(130,e==null?e:typeof e,""))}return t=De(i,n,t,o),t.elementType=e,t.type=r,t.lanes=l,t}function Gt(e,t,n,r){return e=De(7,e,r,t),e.lanes=n,e}function Dl(e,t,n,r){return e=De(22,e,r,t),e.elementType=gf,e.lanes=n,e.stateNode={isHidden:!1},e}function Pi(e,t,n){return e=De(6,e,null,t),e.lanes=n,e}function Ti(e,t,n){return t=De(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Mg(e,t,n,r,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ui(0),this.expirationTimes=ui(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ui(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function Ua(e,t,n,r,o,l,i,s,a){return e=new Mg(e,t,n,s,a),t===1?(t=1,l===!0&&(t|=8)):t=0,l=De(3,null,null,t),e.current=l,l.stateNode=e,l.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Sa(l),e}function Ig(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:hn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function sp(e){if(!e)return Ft;e=e._reactInternals;e:{if(un(e)!==e||e.tag!==1)throw Error(N(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(ke(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(N(171))}if(e.tag===1){var n=e.type;if(ke(n))return sd(e,n,t)}return t}function ap(e,t,n,r,o,l,i,s,a){return e=Ua(n,r,!0,e,o,l,i,s,a),e.context=sp(null),n=e.current,r=me(),o=At(n),l=ct(r,o),l.callback=t??null,Lt(n,l,o),e.current.lanes=o,$r(e,o,r),Ce(e,r),e}function Fl(e,t,n,r){var o=t.current,l=me(),i=At(o);return n=sp(n),t.context===null?t.context=n:t.pendingContext=n,t=ct(l,i),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Lt(o,t,i),e!==null&&(Ye(e,o,i,l),Oo(e,o,i)),i}function gl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function sc(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ja(e,t){sc(e,t),(e=e.alternate)&&sc(e,t)}function Dg(){return null}var up=typeof reportError=="function"?reportError:function(e){console.error(e)};function Ba(e){this._internalRoot=e}Ul.prototype.render=Ba.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(N(409));Fl(e,t,null,null)};Ul.prototype.unmount=Ba.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;on(function(){Fl(null,e,null,null)}),t[pt]=null}};function Ul(e){this._internalRoot=e}Ul.prototype.unstable_scheduleHydration=function(e){if(e){var t=jf();e={blockedOn:null,target:e,priority:t};for(var n=0;n<St.length&&t!==0&&t<St[n].priority;n++);St.splice(n,0,e),n===0&&$f(e)}};function $a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function jl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function ac(){}function Fg(e,t,n,r,o){if(o){if(typeof r=="function"){var l=r;r=function(){var u=gl(i);l.call(u)}}var i=ap(t,r,e,0,null,!1,!1,"",ac);return e._reactRootContainer=i,e[pt]=i.current,Rr(e.nodeType===8?e.parentNode:e),on(),i}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var s=r;r=function(){var u=gl(a);s.call(u)}}var a=Ua(e,0,!1,null,null,!1,!1,"",ac);return e._reactRootContainer=a,e[pt]=a.current,Rr(e.nodeType===8?e.parentNode:e),on(function(){Fl(t,a,n,r)}),a}function Bl(e,t,n,r,o){var l=n._reactRootContainer;if(l){var i=l;if(typeof o=="function"){var s=o;o=function(){var a=gl(i);s.call(a)}}Fl(t,i,e,o)}else i=Fg(n,t,e,o,r);return gl(i)}Ff=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=lr(t.pendingLanes);n!==0&&(sa(t,n|1),Ce(t,J()),!(D&6)&&(jn=J()+500,$t()))}break;case 13:on(function(){var r=mt(e,1);if(r!==null){var o=me();Ye(r,e,1,o)}}),ja(e,1)}};aa=function(e){if(e.tag===13){var t=mt(e,134217728);if(t!==null){var n=me();Ye(t,e,134217728,n)}ja(e,134217728)}};Uf=function(e){if(e.tag===13){var t=At(e),n=mt(e,t);if(n!==null){var r=me();Ye(n,e,t,r)}ja(e,t)}};jf=function(){return U};Bf=function(e,t){var n=U;try{return U=e,t()}finally{U=n}};es=function(e,t,n){switch(t){case"input":if(Ki(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var o=Ol(r);if(!o)throw Error(N(90));vf(r),Ki(r,o)}}}break;case"textarea":xf(e,n);break;case"select":t=n.value,t!=null&&Nn(e,!!n.multiple,t,!1)}};Nf=Ma;Pf=on;var Ug={usingClientEntryPoint:!1,Events:[Vr,xn,Ol,_f,Rf,Ma]},tr={findFiberByHostInstance:Kt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},jg={bundleType:tr.bundleType,version:tr.version,rendererPackageName:tr.rendererPackageName,rendererConfig:tr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:yt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Of(e),e===null?null:e.stateNode},findFiberByHostInstance:tr.findFiberByHostInstance||Dg,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Eo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Eo.isDisabled&&Eo.supportsFiber)try{Nl=Eo.inject(jg),rt=Eo}catch{}}Le.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ug;Le.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!$a(t))throw Error(N(200));return Ig(e,t,null,n)};Le.createRoot=function(e,t){if(!$a(e))throw Error(N(299));var n=!1,r="",o=up;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=Ua(e,1,!1,null,null,n,!1,r,o),e[pt]=t.current,Rr(e.nodeType===8?e.parentNode:e),new Ba(t)};Le.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(N(188)):(e=Object.keys(e).join(","),Error(N(268,e)));return e=Of(t),e=e===null?null:e.stateNode,e};Le.flushSync=function(e){return on(e)};Le.hydrate=function(e,t,n){if(!jl(t))throw Error(N(200));return Bl(null,e,t,!0,n)};Le.hydrateRoot=function(e,t,n){if(!$a(e))throw Error(N(405));var r=n!=null&&n.hydratedSources||null,o=!1,l="",i=up;if(n!=null&&(n.unstable_strictMode===!0&&(o=!0),n.identifierPrefix!==void 0&&(l=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),t=ap(t,null,e,1,n??null,o,!1,l,i),e[pt]=t.current,Rr(e),r)for(e=0;e<r.length;e++)n=r[e],o=n._getVersion,o=o(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,o]:t.mutableSourceEagerHydrationData.push(n,o);return new Ul(t)};Le.render=function(e,t,n){if(!jl(t))throw Error(N(200));return Bl(null,e,t,!1,n)};Le.unmountComponentAtNode=function(e){if(!jl(e))throw Error(N(40));return e._reactRootContainer?(on(function(){Bl(null,null,e,!1,function(){e._reactRootContainer=null,e[pt]=null})}),!0):!1};Le.unstable_batchedUpdates=Ma;Le.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!jl(n))throw Error(N(200));if(e==null||e._reactInternals===void 0)throw Error(N(38));return Bl(e,t,n,!1,r)};Le.version="18.3.1-next-f1338f8080-20240426";function cp(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(cp)}catch(e){console.error(e)}}cp(),cf.exports=Le;var Bg=cf.exports,fp,uc=Bg;fp=uc.createRoot,uc.hydrateRoot;var dp={exports:{}},pp={};/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qr=R;function $g(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Wg=typeof Object.is=="function"?Object.is:$g,Vg=Qr.useSyncExternalStore,Hg=Qr.useRef,Qg=Qr.useEffect,Kg=Qr.useMemo,Yg=Qr.useDebugValue;pp.useSyncExternalStoreWithSelector=function(e,t,n,r,o){var l=Hg(null);if(l.current===null){var i={hasValue:!1,value:null};l.current=i}else i=l.current;l=Kg(function(){function a(w){if(!u){if(u=!0,c=w,w=r(w),o!==void 0&&i.hasValue){var g=i.value;if(o(g,w))return f=g}return f=w}if(g=f,Wg(c,w))return g;var v=r(w);return o!==void 0&&o(g,v)?(c=w,g):(c=w,f=v)}var u=!1,c,f,m=n===void 0?null:n;return[function(){return a(t())},m===null?void 0:function(){return a(m())}]},[t,n,r,o]);var s=Vg(e,l[0],l[1]);return Qg(function(){i.hasValue=!0,i.value=s},[s]),Yg(s),s};dp.exports=pp;var Xg=dp.exports;function Jg(e){e()}function qg(){let e=null,t=null;return{clear(){e=null,t=null},notify(){Jg(()=>{let n=e;for(;n;)n.callback(),n=n.next})},get(){const n=[];let r=e;for(;r;)n.push(r),r=r.next;return n},subscribe(n){let r=!0;const o=t={callback:n,next:null,prev:t};return o.prev?o.prev.next=o:e=o,function(){!r||e===null||(r=!1,o.next?o.next.prev=o.prev:t=o.prev,o.prev?o.prev.next=o.next:e=o.next)}}}}var cc={notify(){},get:()=>[]};function Gg(e,t){let n,r=cc,o=0,l=!1;function i(v){c();const x=r.subscribe(v);let h=!1;return()=>{h||(h=!0,x(),f())}}function s(){r.notify()}function a(){g.onStateChange&&g.onStateChange()}function u(){return l}function c(){o++,n||(n=e.subscribe(a),r=qg())}function f(){o--,n&&o===0&&(n(),n=void 0,r.clear(),r=cc)}function m(){l||(l=!0,c())}function w(){l&&(l=!1,f())}const g={addNestedSub:i,notifyNestedSubs:s,handleChangeWrapper:a,isSubscribed:u,trySubscribe:m,tryUnsubscribe:w,getListeners:()=>r};return g}var Zg=()=>typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",e0=Zg(),t0=()=>typeof navigator<"u"&&navigator.product==="ReactNative",n0=t0(),r0=()=>e0||n0?R.useLayoutEffect:R.useEffect,o0=r0(),bi=Symbol.for("react-redux-context"),Oi=typeof globalThis<"u"?globalThis:{};function l0(){if(!R.createContext)return{};const e=Oi[bi]??(Oi[bi]=new Map);let t=e.get(R.createContext);return t||(t=R.createContext(null),e.set(R.createContext,t)),t}var Ut=l0();function i0(e){const{children:t,context:n,serverState:r,store:o}=e,l=R.useMemo(()=>{const a=Gg(o);return{store:o,subscription:a,getServerState:r?()=>r:void 0}},[o,r]),i=R.useMemo(()=>o.getState(),[o]);o0(()=>{const{subscription:a}=l;return a.onStateChange=a.notifyNestedSubs,a.trySubscribe(),i!==o.getState()&&a.notifyNestedSubs(),()=>{a.tryUnsubscribe(),a.onStateChange=void 0}},[l,i]);const s=n||Ut;return R.createElement(s.Provider,{value:l},t)}var s0=i0;function Wa(e=Ut){return function(){return R.useContext(e)}}var mp=Wa();function hp(e=Ut){const t=e===Ut?mp:Wa(e),n=()=>{const{store:r}=t();return r};return Object.assign(n,{withTypes:()=>n}),n}var a0=hp();function u0(e=Ut){const t=e===Ut?a0:hp(e),n=()=>t().dispatch;return Object.assign(n,{withTypes:()=>n}),n}var gp=u0(),c0=(e,t)=>e===t;function f0(e=Ut){const t=e===Ut?mp:Wa(e),n=(r,o={})=>{const{equalityFn:l=c0}=typeof o=="function"?{equalityFn:o}:o,i=t(),{store:s,subscription:a,getServerState:u}=i;R.useRef(!0);const c=R.useCallback({[r.name](m){return r(m)}}[r.name],[r]),f=Xg.useSyncExternalStoreWithSelector(a.addNestedSub,s.getState,u||s.getState,c,l);return R.useDebugValue(f),f};return Object.assign(n,{withTypes:()=>n}),n}var Mr=f0();/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ir(){return Ir=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ir.apply(this,arguments)}var Rt;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(Rt||(Rt={}));const fc="popstate";function d0(e){e===void 0&&(e={});function t(r,o){let{pathname:l,search:i,hash:s}=r.location;return zs("",{pathname:l,search:i,hash:s},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function n(r,o){return typeof o=="string"?o:yl(o)}return m0(t,n,null,e)}function Z(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function Va(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function p0(){return Math.random().toString(36).substr(2,8)}function dc(e,t){return{usr:e.state,key:e.key,idx:t}}function zs(e,t,n,r){return n===void 0&&(n=null),Ir({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?Qn(t):t,{state:n,key:t&&t.key||r||p0()})}function yl(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function Qn(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function m0(e,t,n,r){r===void 0&&(r={});let{window:o=document.defaultView,v5Compat:l=!1}=r,i=o.history,s=Rt.Pop,a=null,u=c();u==null&&(u=0,i.replaceState(Ir({},i.state,{idx:u}),""));function c(){return(i.state||{idx:null}).idx}function f(){s=Rt.Pop;let x=c(),h=x==null?null:x-u;u=x,a&&a({action:s,location:v.location,delta:h})}function m(x,h){s=Rt.Push;let p=zs(v.location,x,h);u=c()+1;let y=dc(p,u),E=v.createHref(p);try{i.pushState(y,"",E)}catch(k){if(k instanceof DOMException&&k.name==="DataCloneError")throw k;o.location.assign(E)}l&&a&&a({action:s,location:v.location,delta:1})}function w(x,h){s=Rt.Replace;let p=zs(v.location,x,h);u=c();let y=dc(p,u),E=v.createHref(p);i.replaceState(y,"",E),l&&a&&a({action:s,location:v.location,delta:0})}function g(x){let h=o.location.origin!=="null"?o.location.origin:o.location.href,p=typeof x=="string"?x:yl(x);return p=p.replace(/ $/,"%20"),Z(h,"No window.location.(origin|href) available to create URL for href: "+p),new URL(p,h)}let v={get action(){return s},get location(){return e(o,i)},listen(x){if(a)throw new Error("A history only accepts one active listener");return o.addEventListener(fc,f),a=x,()=>{o.removeEventListener(fc,f),a=null}},createHref(x){return t(o,x)},createURL:g,encodeLocation(x){let h=g(x);return{pathname:h.pathname,search:h.search,hash:h.hash}},push:m,replace:w,go(x){return i.go(x)}};return v}var pc;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(pc||(pc={}));function h0(e,t,n){return n===void 0&&(n="/"),g0(e,t,n)}function g0(e,t,n,r){let o=typeof t=="string"?Qn(t):t,l=Ha(o.pathname||"/",n);if(l==null)return null;let i=yp(e);y0(i);let s=null;for(let a=0;s==null&&a<i.length;++a){let u=T0(l);s=R0(i[a],u)}return s}function yp(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let o=(l,i,s)=>{let a={relativePath:s===void 0?l.path||"":s,caseSensitive:l.caseSensitive===!0,childrenIndex:i,route:l};a.relativePath.startsWith("/")&&(Z(a.relativePath.startsWith(r),'Absolute route path "'+a.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),a.relativePath=a.relativePath.slice(r.length));let u=It([r,a.relativePath]),c=n.concat(a);l.children&&l.children.length>0&&(Z(l.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+u+'".')),yp(l.children,t,c,u)),!(l.path==null&&!l.index)&&t.push({path:u,score:C0(u,l.index),routesMeta:c})};return e.forEach((l,i)=>{var s;if(l.path===""||!((s=l.path)!=null&&s.includes("?")))o(l,i);else for(let a of vp(l.path))o(l,i,a)}),t}function vp(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,o=n.endsWith("?"),l=n.replace(/\?$/,"");if(r.length===0)return o?[l,""]:[l];let i=vp(r.join("/")),s=[];return s.push(...i.map(a=>a===""?l:[l,a].join("/"))),o&&s.push(...i),s.map(a=>e.startsWith("/")&&a===""?"/":a)}function y0(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:_0(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const v0=/^:[\w-]+$/,w0=3,x0=2,E0=1,S0=10,k0=-2,mc=e=>e==="*";function C0(e,t){let n=e.split("/"),r=n.length;return n.some(mc)&&(r+=k0),t&&(r+=x0),n.filter(o=>!mc(o)).reduce((o,l)=>o+(v0.test(l)?w0:l===""?E0:S0),r)}function _0(e,t){return e.length===t.length&&e.slice(0,-1).every((r,o)=>r===t[o])?e[e.length-1]-t[t.length-1]:0}function R0(e,t,n){let{routesMeta:r}=e,o={},l="/",i=[];for(let s=0;s<r.length;++s){let a=r[s],u=s===r.length-1,c=l==="/"?t:t.slice(l.length)||"/",f=N0({path:a.relativePath,caseSensitive:a.caseSensitive,end:u},c),m=a.route;if(!f)return null;Object.assign(o,f.params),i.push({params:o,pathname:It([l,f.pathname]),pathnameBase:A0(It([l,f.pathnameBase])),route:m}),f.pathnameBase!=="/"&&(l=It([l,f.pathnameBase]))}return i}function N0(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=P0(e.path,e.caseSensitive,e.end),o=t.match(n);if(!o)return null;let l=o[0],i=l.replace(/(.)\/+$/,"$1"),s=o.slice(1);return{params:r.reduce((u,c,f)=>{let{paramName:m,isOptional:w}=c;if(m==="*"){let v=s[f]||"";i=l.slice(0,l.length-v.length).replace(/(.)\/+$/,"$1")}const g=s[f];return w&&!g?u[m]=void 0:u[m]=(g||"").replace(/%2F/g,"/"),u},{}),pathname:l,pathnameBase:i,pattern:e}}function P0(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),Va(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(i,s,a)=>(r.push({paramName:s,isOptional:a!=null}),a?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(r.push({paramName:"*"}),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),r]}function T0(e){try{return e.split("/").map(t=>decodeURIComponent(t).replace(/\//g,"%2F")).join("/")}catch(t){return Va(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function Ha(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}const b0=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,O0=e=>b0.test(e);function L0(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:o=""}=typeof e=="string"?Qn(e):e,l;if(n)if(O0(n))l=n;else{if(n.includes("//")){let i=n;n=n.replace(/\/\/+/g,"/"),Va(!1,"Pathnames cannot have embedded double slashes - normalizing "+(i+" -> "+n))}n.startsWith("/")?l=hc(n.substring(1),"/"):l=hc(n,t)}else l=t;return{pathname:l,search:M0(r),hash:I0(o)}}function hc(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?n.length>1&&n.pop():o!=="."&&n.push(o)}),n.length>1?n.join("/"):"/"}function Li(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function z0(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function wp(e,t){let n=z0(e);return t?n.map((r,o)=>o===n.length-1?r.pathname:r.pathnameBase):n.map(r=>r.pathnameBase)}function xp(e,t,n,r){r===void 0&&(r=!1);let o;typeof e=="string"?o=Qn(e):(o=Ir({},e),Z(!o.pathname||!o.pathname.includes("?"),Li("?","pathname","search",o)),Z(!o.pathname||!o.pathname.includes("#"),Li("#","pathname","hash",o)),Z(!o.search||!o.search.includes("#"),Li("#","search","hash",o)));let l=e===""||o.pathname==="",i=l?"/":o.pathname,s;if(i==null)s=n;else{let f=t.length-1;if(!r&&i.startsWith("..")){let m=i.split("/");for(;m[0]==="..";)m.shift(),f-=1;o.pathname=m.join("/")}s=f>=0?t[f]:"/"}let a=L0(o,s),u=i&&i!=="/"&&i.endsWith("/"),c=(l||i===".")&&n.endsWith("/");return!a.pathname.endsWith("/")&&(u||c)&&(a.pathname+="/"),a}const It=e=>e.join("/").replace(/\/\/+/g,"/"),A0=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),M0=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,I0=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function D0(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const Ep=["post","put","patch","delete"];new Set(Ep);const F0=["get",...Ep];new Set(F0);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Dr(){return Dr=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Dr.apply(this,arguments)}const Qa=R.createContext(null),U0=R.createContext(null),cn=R.createContext(null),$l=R.createContext(null),Wt=R.createContext({outlet:null,matches:[],isDataRoute:!1}),Sp=R.createContext(null);function j0(e,t){let{relative:n}=t===void 0?{}:t;Kr()||Z(!1);let{basename:r,navigator:o}=R.useContext(cn),{hash:l,pathname:i,search:s}=Cp(e,{relative:n}),a=i;return r!=="/"&&(a=i==="/"?r:It([r,i])),o.createHref({pathname:a,search:s,hash:l})}function Kr(){return R.useContext($l)!=null}function Yr(){return Kr()||Z(!1),R.useContext($l).location}function kp(e){R.useContext(cn).static||R.useLayoutEffect(e)}function Xr(){let{isDataRoute:e}=R.useContext(Wt);return e?ey():B0()}function B0(){Kr()||Z(!1);let e=R.useContext(Qa),{basename:t,future:n,navigator:r}=R.useContext(cn),{matches:o}=R.useContext(Wt),{pathname:l}=Yr(),i=JSON.stringify(wp(o,n.v7_relativeSplatPath)),s=R.useRef(!1);return kp(()=>{s.current=!0}),R.useCallback(function(u,c){if(c===void 0&&(c={}),!s.current)return;if(typeof u=="number"){r.go(u);return}let f=xp(u,JSON.parse(i),l,c.relative==="path");e==null&&t!=="/"&&(f.pathname=f.pathname==="/"?t:It([t,f.pathname])),(c.replace?r.replace:r.push)(f,c.state,c)},[t,r,i,l,e])}function $0(){let{matches:e}=R.useContext(Wt),t=e[e.length-1];return t?t.params:{}}function Cp(e,t){let{relative:n}=t===void 0?{}:t,{future:r}=R.useContext(cn),{matches:o}=R.useContext(Wt),{pathname:l}=Yr(),i=JSON.stringify(wp(o,r.v7_relativeSplatPath));return R.useMemo(()=>xp(e,JSON.parse(i),l,n==="path"),[e,i,l,n])}function W0(e,t){return V0(e,t)}function V0(e,t,n,r){Kr()||Z(!1);let{navigator:o}=R.useContext(cn),{matches:l}=R.useContext(Wt),i=l[l.length-1],s=i?i.params:{};i&&i.pathname;let a=i?i.pathnameBase:"/";i&&i.route;let u=Yr(),c;if(t){var f;let x=typeof t=="string"?Qn(t):t;a==="/"||(f=x.pathname)!=null&&f.startsWith(a)||Z(!1),c=x}else c=u;let m=c.pathname||"/",w=m;if(a!=="/"){let x=a.replace(/^\//,"").split("/");w="/"+m.replace(/^\//,"").split("/").slice(x.length).join("/")}let g=h0(e,{pathname:w}),v=X0(g&&g.map(x=>Object.assign({},x,{params:Object.assign({},s,x.params),pathname:It([a,o.encodeLocation?o.encodeLocation(x.pathname).pathname:x.pathname]),pathnameBase:x.pathnameBase==="/"?a:It([a,o.encodeLocation?o.encodeLocation(x.pathnameBase).pathname:x.pathnameBase])})),l,n,r);return t&&v?R.createElement($l.Provider,{value:{location:Dr({pathname:"/",search:"",hash:"",state:null,key:"default"},c),navigationType:Rt.Pop}},v):v}function H0(){let e=Z0(),t=D0(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,o={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return R.createElement(R.Fragment,null,R.createElement("h2",null,"Unexpected Application Error!"),R.createElement("h3",{style:{fontStyle:"italic"}},t),n?R.createElement("pre",{style:o},n):null,null)}const Q0=R.createElement(H0,null);class K0 extends R.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error!==void 0?t.error:n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error!==void 0?R.createElement(Wt.Provider,{value:this.props.routeContext},R.createElement(Sp.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function Y0(e){let{routeContext:t,match:n,children:r}=e,o=R.useContext(Qa);return o&&o.static&&o.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(o.staticContext._deepestRenderedBoundaryId=n.route.id),R.createElement(Wt.Provider,{value:t},r)}function X0(e,t,n,r){var o;if(t===void 0&&(t=[]),n===void 0&&(n=null),r===void 0&&(r=null),e==null){var l;if(!n)return null;if(n.errors)e=n.matches;else if((l=r)!=null&&l.v7_partialHydration&&t.length===0&&!n.initialized&&n.matches.length>0)e=n.matches;else return null}let i=e,s=(o=n)==null?void 0:o.errors;if(s!=null){let c=i.findIndex(f=>f.route.id&&(s==null?void 0:s[f.route.id])!==void 0);c>=0||Z(!1),i=i.slice(0,Math.min(i.length,c+1))}let a=!1,u=-1;if(n&&r&&r.v7_partialHydration)for(let c=0;c<i.length;c++){let f=i[c];if((f.route.HydrateFallback||f.route.hydrateFallbackElement)&&(u=c),f.route.id){let{loaderData:m,errors:w}=n,g=f.route.loader&&m[f.route.id]===void 0&&(!w||w[f.route.id]===void 0);if(f.route.lazy||g){a=!0,u>=0?i=i.slice(0,u+1):i=[i[0]];break}}}return i.reduceRight((c,f,m)=>{let w,g=!1,v=null,x=null;n&&(w=s&&f.route.id?s[f.route.id]:void 0,v=f.route.errorElement||Q0,a&&(u<0&&m===0?(ty("route-fallback"),g=!0,x=null):u===m&&(g=!0,x=f.route.hydrateFallbackElement||null)));let h=t.concat(i.slice(0,m+1)),p=()=>{let y;return w?y=v:g?y=x:f.route.Component?y=R.createElement(f.route.Component,null):f.route.element?y=f.route.element:y=c,R.createElement(Y0,{match:f,routeContext:{outlet:c,matches:h,isDataRoute:n!=null},children:y})};return n&&(f.route.ErrorBoundary||f.route.errorElement||m===0)?R.createElement(K0,{location:n.location,revalidation:n.revalidation,component:v,error:w,children:p(),routeContext:{outlet:null,matches:h,isDataRoute:!0}}):p()},null)}var _p=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(_p||{}),Rp=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(Rp||{});function J0(e){let t=R.useContext(Qa);return t||Z(!1),t}function q0(e){let t=R.useContext(U0);return t||Z(!1),t}function G0(e){let t=R.useContext(Wt);return t||Z(!1),t}function Np(e){let t=G0(),n=t.matches[t.matches.length-1];return n.route.id||Z(!1),n.route.id}function Z0(){var e;let t=R.useContext(Sp),n=q0(),r=Np();return t!==void 0?t:(e=n.errors)==null?void 0:e[r]}function ey(){let{router:e}=J0(_p.UseNavigateStable),t=Np(Rp.UseNavigateStable),n=R.useRef(!1);return kp(()=>{n.current=!0}),R.useCallback(function(o,l){l===void 0&&(l={}),n.current&&(typeof o=="number"?e.navigate(o):e.navigate(o,Dr({fromRouteId:t},l)))},[e,t])}const gc={};function ty(e,t,n){gc[e]||(gc[e]=!0)}function ny(e,t){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function Fo(e){Z(!1)}function ry(e){let{basename:t="/",children:n=null,location:r,navigationType:o=Rt.Pop,navigator:l,static:i=!1,future:s}=e;Kr()&&Z(!1);let a=t.replace(/^\/*/,"/"),u=R.useMemo(()=>({basename:a,navigator:l,static:i,future:Dr({v7_relativeSplatPath:!1},s)}),[a,s,l,i]);typeof r=="string"&&(r=Qn(r));let{pathname:c="/",search:f="",hash:m="",state:w=null,key:g="default"}=r,v=R.useMemo(()=>{let x=Ha(c,a);return x==null?null:{location:{pathname:x,search:f,hash:m,state:w,key:g},navigationType:o}},[a,c,f,m,w,g,o]);return v==null?null:R.createElement(cn.Provider,{value:u},R.createElement($l.Provider,{children:n,value:v}))}function oy(e){let{children:t,location:n}=e;return W0(As(t),n)}new Promise(()=>{});function As(e,t){t===void 0&&(t=[]);let n=[];return R.Children.forEach(e,(r,o)=>{if(!R.isValidElement(r))return;let l=[...t,o];if(r.type===R.Fragment){n.push.apply(n,As(r.props.children,l));return}r.type!==Fo&&Z(!1),!r.props.index||!r.props.children||Z(!1);let i={id:r.props.id||l.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(i.children=As(r.props.children,l)),n.push(i)}),n}/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Ms(){return Ms=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},Ms.apply(this,arguments)}function ly(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,l;for(l=0;l<r.length;l++)o=r[l],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function iy(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function sy(e,t){return e.button===0&&(!t||t==="_self")&&!iy(e)}const ay=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],uy="6";try{window.__reactRouterVersion=uy}catch{}const cy="startTransition",yc=Im[cy];function fy(e){let{basename:t,children:n,future:r,window:o}=e,l=R.useRef();l.current==null&&(l.current=d0({window:o,v5Compat:!0}));let i=l.current,[s,a]=R.useState({action:i.action,location:i.location}),{v7_startTransition:u}=r||{},c=R.useCallback(f=>{u&&yc?yc(()=>a(f)):a(f)},[a,u]);return R.useLayoutEffect(()=>i.listen(c),[i,c]),R.useEffect(()=>ny(r),[r]),R.createElement(ry,{basename:t,children:n,location:s.location,navigationType:s.action,navigator:i,future:r})}const dy=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",py=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,my=R.forwardRef(function(t,n){let{onClick:r,relative:o,reloadDocument:l,replace:i,state:s,target:a,to:u,preventScrollReset:c,viewTransition:f}=t,m=ly(t,ay),{basename:w}=R.useContext(cn),g,v=!1;if(typeof u=="string"&&py.test(u)&&(g=u,dy))try{let y=new URL(window.location.href),E=u.startsWith("//")?new URL(y.protocol+u):new URL(u),k=Ha(E.pathname,w);E.origin===y.origin&&k!=null?u=k+E.search+E.hash:v=!0}catch{}let x=j0(u,{relative:o}),h=hy(u,{replace:i,state:s,target:a,preventScrollReset:c,relative:o,viewTransition:f});function p(y){r&&r(y),y.defaultPrevented||h(y)}return R.createElement("a",Ms({},m,{href:g||x,onClick:v||l?r:p,ref:n,target:a}))});var vc;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(vc||(vc={}));var wc;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(wc||(wc={}));function hy(e,t){let{target:n,replace:r,state:o,preventScrollReset:l,relative:i,viewTransition:s}=t===void 0?{}:t,a=Xr(),u=Yr(),c=Cp(e,{relative:i});return R.useCallback(f=>{if(sy(f,n)){f.preventDefault();let m=r!==void 0?r:yl(u)===yl(c);a(e,{replace:m,state:o,preventScrollReset:l,relative:i,viewTransition:s})}},[u,a,c,r,o,n,e,l,i,s])}function oe(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var gy=typeof Symbol=="function"&&Symbol.observable||"@@observable",xc=gy,zi=()=>Math.random().toString(36).substring(7).split("").join("."),yy={INIT:`@@redux/INIT${zi()}`,REPLACE:`@@redux/REPLACE${zi()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${zi()}`},vl=yy;function Ka(e){if(typeof e!="object"||e===null)return!1;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null}function Pp(e,t,n){if(typeof e!="function")throw new Error(oe(2));if(typeof t=="function"&&typeof n=="function"||typeof n=="function"&&typeof arguments[3]=="function")throw new Error(oe(0));if(typeof t=="function"&&typeof n>"u"&&(n=t,t=void 0),typeof n<"u"){if(typeof n!="function")throw new Error(oe(1));return n(Pp)(e,t)}let r=e,o=t,l=new Map,i=l,s=0,a=!1;function u(){i===l&&(i=new Map,l.forEach((x,h)=>{i.set(h,x)}))}function c(){if(a)throw new Error(oe(3));return o}function f(x){if(typeof x!="function")throw new Error(oe(4));if(a)throw new Error(oe(5));let h=!0;u();const p=s++;return i.set(p,x),function(){if(h){if(a)throw new Error(oe(6));h=!1,u(),i.delete(p),l=null}}}function m(x){if(!Ka(x))throw new Error(oe(7));if(typeof x.type>"u")throw new Error(oe(8));if(typeof x.type!="string")throw new Error(oe(17));if(a)throw new Error(oe(9));try{a=!0,o=r(o,x)}finally{a=!1}return(l=i).forEach(p=>{p()}),x}function w(x){if(typeof x!="function")throw new Error(oe(10));r=x,m({type:vl.REPLACE})}function g(){const x=f;return{subscribe(h){if(typeof h!="object"||h===null)throw new Error(oe(11));function p(){const E=h;E.next&&E.next(c())}return p(),{unsubscribe:x(p)}},[xc](){return this}}}return m({type:vl.INIT}),{dispatch:m,subscribe:f,getState:c,replaceReducer:w,[xc]:g}}function vy(e){Object.keys(e).forEach(t=>{const n=e[t];if(typeof n(void 0,{type:vl.INIT})>"u")throw new Error(oe(12));if(typeof n(void 0,{type:vl.PROBE_UNKNOWN_ACTION()})>"u")throw new Error(oe(13))})}function wy(e){const t=Object.keys(e),n={};for(let l=0;l<t.length;l++){const i=t[l];typeof e[i]=="function"&&(n[i]=e[i])}const r=Object.keys(n);let o;try{vy(n)}catch(l){o=l}return function(i={},s){if(o)throw o;let a=!1;const u={};for(let c=0;c<r.length;c++){const f=r[c],m=n[f],w=i[f],g=m(w,s);if(typeof g>"u")throw s&&s.type,new Error(oe(14));u[f]=g,a=a||g!==w}return a=a||r.length!==Object.keys(i).length,a?u:i}}function wl(...e){return e.length===0?t=>t:e.length===1?e[0]:e.reduce((t,n)=>(...r)=>t(n(...r)))}function xy(...e){return t=>(n,r)=>{const o=t(n,r);let l=()=>{throw new Error(oe(15))};const i={getState:o.getState,dispatch:(a,...u)=>l(a,...u)},s=e.map(a=>a(i));return l=wl(...s)(o.dispatch),{...o,dispatch:l}}}function Ey(e){return Ka(e)&&"type"in e&&typeof e.type=="string"}var Tp=Symbol.for("immer-nothing"),Ec=Symbol.for("immer-draftable"),he=Symbol.for("immer-state");function Qe(e,...t){throw new Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var Te=Object,Bn=Te.getPrototypeOf,xl="constructor",Wl="prototype",Is="configurable",El="enumerable",Uo="writable",Fr="value",gt=e=>!!e&&!!e[he];function Je(e){var t;return e?bp(e)||Hl(e)||!!e[Ec]||!!((t=e[xl])!=null&&t[Ec])||Ql(e)||Kl(e):!1}var Sy=Te[Wl][xl].toString(),Sc=new WeakMap;function bp(e){if(!e||!Ya(e))return!1;const t=Bn(e);if(t===null||t===Te[Wl])return!0;const n=Te.hasOwnProperty.call(t,xl)&&t[xl];if(n===Object)return!0;if(!mn(n))return!1;let r=Sc.get(n);return r===void 0&&(r=Function.toString.call(n),Sc.set(n,r)),r===Sy}function Vl(e,t,n=!0){Jr(e)===0?(n?Reflect.ownKeys(e):Te.keys(e)).forEach(o=>{t(o,e[o],e)}):e.forEach((r,o)=>t(o,r,e))}function Jr(e){const t=e[he];return t?t.type_:Hl(e)?1:Ql(e)?2:Kl(e)?3:0}var kc=(e,t,n=Jr(e))=>n===2?e.has(t):Te[Wl].hasOwnProperty.call(e,t),Ds=(e,t,n=Jr(e))=>n===2?e.get(t):e[t],Sl=(e,t,n,r=Jr(e))=>{r===2?e.set(t,n):r===3?e.add(n):e[t]=n};function ky(e,t){return e===t?e!==0||1/e===1/t:e!==e&&t!==t}var Hl=Array.isArray,Ql=e=>e instanceof Map,Kl=e=>e instanceof Set,Ya=e=>typeof e=="object",mn=e=>typeof e=="function",Ai=e=>typeof e=="boolean";function Cy(e){const t=+e;return Number.isInteger(t)&&String(t)===e}var st=e=>e.copy_||e.base_,Xa=e=>e.modified_?e.copy_:e.base_;function Fs(e,t){if(Ql(e))return new Map(e);if(Kl(e))return new Set(e);if(Hl(e))return Array[Wl].slice.call(e);const n=bp(e);if(t===!0||t==="class_only"&&!n){const r=Te.getOwnPropertyDescriptors(e);delete r[he];let o=Reflect.ownKeys(r);for(let l=0;l<o.length;l++){const i=o[l],s=r[i];s[Uo]===!1&&(s[Uo]=!0,s[Is]=!0),(s.get||s.set)&&(r[i]={[Is]:!0,[Uo]:!0,[El]:s[El],[Fr]:e[i]})}return Te.create(Bn(e),r)}else{const r=Bn(e);if(r!==null&&n)return{...e};const o=Te.create(r);return Te.assign(o,e)}}function Ja(e,t=!1){return Yl(e)||gt(e)||!Je(e)||(Jr(e)>1&&Te.defineProperties(e,{set:So,add:So,clear:So,delete:So}),Te.freeze(e),t&&Vl(e,(n,r)=>{Ja(r,!0)},!1)),e}function _y(){Qe(2)}var So={[Fr]:_y};function Yl(e){return e===null||!Ya(e)?!0:Te.isFrozen(e)}var kl="MapSet",Us="Patches",Cc="ArrayMethods",Op={};function ln(e){const t=Op[e];return t||Qe(0,e),t}var _c=e=>!!Op[e],Ur,Lp=()=>Ur,Ry=(e,t)=>({drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0,handledSet_:new Set,processedForPatches_:new Set,mapSetPlugin_:_c(kl)?ln(kl):void 0,arrayMethodsPlugin_:_c(Cc)?ln(Cc):void 0});function Rc(e,t){t&&(e.patchPlugin_=ln(Us),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function js(e){Bs(e),e.drafts_.forEach(Ny),e.drafts_=null}function Bs(e){e===Ur&&(Ur=e.parent_)}var Nc=e=>Ur=Ry(Ur,e);function Ny(e){const t=e[he];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function Pc(e,t){t.unfinalizedDrafts_=t.drafts_.length;const n=t.drafts_[0];if(e!==void 0&&e!==n){n[he].modified_&&(js(t),Qe(4)),Je(e)&&(e=Tc(t,e));const{patchPlugin_:o}=t;o&&o.generateReplacementPatches_(n[he].base_,e,t)}else e=Tc(t,n);return Py(t,e,!0),js(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e!==Tp?e:void 0}function Tc(e,t){if(Yl(t))return t;const n=t[he];if(!n)return Cl(t,e.handledSet_,e);if(!Xl(n,e))return t;if(!n.modified_)return n.base_;if(!n.finalized_){const{callbacks_:r}=n;if(r)for(;r.length>0;)r.pop()(e);Mp(n,e)}return n.copy_}function Py(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&Ja(t,n)}function zp(e){e.finalized_=!0,e.scope_.unfinalizedDrafts_--}var Xl=(e,t)=>e.scope_===t,Ty=[];function Ap(e,t,n,r){const o=st(e),l=e.type_;if(r!==void 0&&Ds(o,r,l)===t){Sl(o,r,n,l);return}if(!e.draftLocations_){const s=e.draftLocations_=new Map;Vl(o,(a,u)=>{if(gt(u)){const c=s.get(u)||[];c.push(a),s.set(u,c)}})}const i=e.draftLocations_.get(t)??Ty;for(const s of i)Sl(o,s,n,l)}function by(e,t,n){e.callbacks_.push(function(o){var s;const l=t;if(!l||!Xl(l,o))return;(s=o.mapSetPlugin_)==null||s.fixSetContents(l);const i=Xa(l);Ap(e,l.draft_??l,i,n),Mp(l,o)})}function Mp(e,t){var r;if(e.modified_&&!e.finalized_&&(e.type_===3||e.type_===1&&e.allIndicesReassigned_||(((r=e.assigned_)==null?void 0:r.size)??0)>0)){const{patchPlugin_:o}=t;if(o){const l=o.getPath(e);l&&o.generatePatches_(e,l,t)}zp(e)}}function Oy(e,t,n){const{scope_:r}=e;if(gt(n)){const o=n[he];Xl(o,r)&&o.callbacks_.push(function(){jo(e);const i=Xa(o);Ap(e,n,i,t)})}else Je(n)&&e.callbacks_.push(function(){const l=st(e);e.type_===3?l.has(n)&&Cl(n,r.handledSet_,r):Ds(l,t,e.type_)===n&&r.drafts_.length>1&&(e.assigned_.get(t)??!1)===!0&&e.copy_&&Cl(Ds(e.copy_,t,e.type_),r.handledSet_,r)})}function Cl(e,t,n){return!n.immer_.autoFreeze_&&n.unfinalizedDrafts_<1||gt(e)||t.has(e)||!Je(e)||Yl(e)||(t.add(e),Vl(e,(r,o)=>{if(gt(o)){const l=o[he];if(Xl(l,n)){const i=Xa(l);Sl(e,r,i,e.type_),zp(l)}}else Je(o)&&Cl(o,t,n)})),e}function Ly(e,t){const n=Hl(e),r={type_:n?1:0,scope_:t?t.scope_:Lp(),modified_:!1,finalized_:!1,assigned_:void 0,parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1,callbacks_:void 0};let o=r,l=_l;n&&(o=[r],l=jr);const{revoke:i,proxy:s}=Proxy.revocable(o,l);return r.draft_=s,r.revoke_=i,[s,r]}var _l={get(e,t){if(t===he)return e;let n=e.scope_.arrayMethodsPlugin_;const r=e.type_===1&&typeof t=="string";if(r&&n!=null&&n.isArrayOperationMethod(t))return n.createMethodInterceptor(e,t);const o=st(e);if(!kc(o,t,e.type_))return zy(e,o,t);const l=o[t];if(e.finalized_||!Je(l)||r&&e.operationMethod&&(n!=null&&n.isMutatingArrayMethod(e.operationMethod))&&Cy(t))return l;if(l===Mi(e.base_,t)){jo(e);const i=e.type_===1?+t:t,s=Ws(e.scope_,l,e,i);return e.copy_[i]=s}return l},has(e,t){return t in st(e)},ownKeys(e){return Reflect.ownKeys(st(e))},set(e,t,n){const r=Ip(st(e),t);if(r!=null&&r.set)return r.set.call(e.draft_,n),!0;if(!e.modified_){const o=Mi(st(e),t),l=o==null?void 0:o[he];if(l&&l.base_===n)return e.copy_[t]=n,e.assigned_.set(t,!1),!0;if(ky(n,o)&&(n!==void 0||kc(e.base_,t,e.type_)))return!0;jo(e),$s(e)}return e.copy_[t]===n&&(n!==void 0||t in e.copy_)||Number.isNaN(n)&&Number.isNaN(e.copy_[t])||(e.copy_[t]=n,e.assigned_.set(t,!0),Oy(e,t,n)),!0},deleteProperty(e,t){return jo(e),Mi(e.base_,t)!==void 0||t in e.base_?(e.assigned_.set(t,!1),$s(e)):e.assigned_.delete(t),e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){const n=st(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r&&{[Uo]:!0,[Is]:e.type_!==1||t!=="length",[El]:r[El],[Fr]:n[t]}},defineProperty(){Qe(11)},getPrototypeOf(e){return Bn(e.base_)},setPrototypeOf(){Qe(12)}},jr={};for(let e in _l){let t=_l[e];jr[e]=function(){const n=arguments;return n[0]=n[0][0],t.apply(this,n)}}jr.deleteProperty=function(e,t){return jr.set.call(this,e,t,void 0)};jr.set=function(e,t,n){return _l.set.call(this,e[0],t,n,e[0])};function Mi(e,t){const n=e[he];return(n?st(n):e)[t]}function zy(e,t,n){var o;const r=Ip(t,n);return r?Fr in r?r[Fr]:(o=r.get)==null?void 0:o.call(e.draft_):void 0}function Ip(e,t){if(!(t in e))return;let n=Bn(e);for(;n;){const r=Object.getOwnPropertyDescriptor(n,t);if(r)return r;n=Bn(n)}}function $s(e){e.modified_||(e.modified_=!0,e.parent_&&$s(e.parent_))}function jo(e){e.copy_||(e.assigned_=new Map,e.copy_=Fs(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var Ay=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!1,this.produce=(t,n,r)=>{if(mn(t)&&!mn(n)){const l=n;n=t;const i=this;return function(a=l,...u){return i.produce(a,c=>n.call(this,c,...u))}}mn(n)||Qe(6),r!==void 0&&!mn(r)&&Qe(7);let o;if(Je(t)){const l=Nc(this),i=Ws(l,t,void 0);let s=!0;try{o=n(i),s=!1}finally{s?js(l):Bs(l)}return Rc(l,r),Pc(o,l)}else if(!t||!Ya(t)){if(o=n(t),o===void 0&&(o=t),o===Tp&&(o=void 0),this.autoFreeze_&&Ja(o,!0),r){const l=[],i=[];ln(Us).generateReplacementPatches_(t,o,{patches_:l,inversePatches_:i}),r(l,i)}return o}else Qe(1,t)},this.produceWithPatches=(t,n)=>{if(mn(t))return(i,...s)=>this.produceWithPatches(i,a=>t(a,...s));let r,o;return[this.produce(t,n,(i,s)=>{r=i,o=s}),r,o]},Ai(e==null?void 0:e.autoFreeze)&&this.setAutoFreeze(e.autoFreeze),Ai(e==null?void 0:e.useStrictShallowCopy)&&this.setUseStrictShallowCopy(e.useStrictShallowCopy),Ai(e==null?void 0:e.useStrictIteration)&&this.setUseStrictIteration(e.useStrictIteration)}createDraft(e){Je(e)||Qe(8),gt(e)&&(e=My(e));const t=Nc(this),n=Ws(t,e,void 0);return n[he].isManual_=!0,Bs(t),n}finishDraft(e,t){const n=e&&e[he];(!n||!n.isManual_)&&Qe(9);const{scope_:r}=n;return Rc(r,t),Pc(void 0,r)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}setUseStrictIteration(e){this.useStrictIteration_=e}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){const o=t[n];if(o.path.length===0&&o.op==="replace"){e=o.value;break}}n>-1&&(t=t.slice(n+1));const r=ln(Us).applyPatches_;return gt(e)?r(e,t):this.produce(e,o=>r(o,t))}};function Ws(e,t,n,r){const[o,l]=Ql(t)?ln(kl).proxyMap_(t,n):Kl(t)?ln(kl).proxySet_(t,n):Ly(t,n);return((n==null?void 0:n.scope_)??Lp()).drafts_.push(o),l.callbacks_=(n==null?void 0:n.callbacks_)??[],l.key_=r,n&&r!==void 0?by(n,l,r):l.callbacks_.push(function(a){var c;(c=a.mapSetPlugin_)==null||c.fixSetContents(l);const{patchPlugin_:u}=a;l.modified_&&u&&u.generatePatches_(l,[],a)}),o}function My(e){return gt(e)||Qe(10,e),Dp(e)}function Dp(e){if(!Je(e)||Yl(e))return e;const t=e[he];let n,r=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=Fs(e,t.scope_.immer_.useStrictShallowCopy_),r=t.scope_.immer_.shouldUseStrictIteration()}else n=Fs(e,!0);return Vl(n,(o,l)=>{Sl(n,o,Dp(l))},r),t&&(t.finalized_=!1),n}var Iy=new Ay,Fp=Iy.produce;function Up(e){return({dispatch:n,getState:r})=>o=>l=>typeof l=="function"?l(n,r,e):o(l)}var Dy=Up(),Fy=Up,Uy=typeof window<"u"&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]=="object"?wl:wl.apply(null,arguments)},jy=e=>e&&typeof e.match=="function";function yr(e,t){function n(...r){if(t){let o=t(...r);if(!o)throw new Error(ft(0));return{type:e,payload:o.payload,..."meta"in o&&{meta:o.meta},..."error"in o&&{error:o.error}}}return{type:e,payload:r[0]}}return n.toString=()=>`${e}`,n.type=e,n.match=r=>Ey(r)&&r.type===e,n}var jp=class sr extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,sr.prototype)}static get[Symbol.species](){return sr}concat(...t){return super.concat.apply(this,t)}prepend(...t){return t.length===1&&Array.isArray(t[0])?new sr(...t[0].concat(this)):new sr(...t.concat(this))}};function bc(e){return Je(e)?Fp(e,()=>{}):e}function ko(e,t,n){return e.has(t)?e.get(t):e.set(t,n(t)).get(t)}function By(e){return typeof e=="boolean"}var $y=()=>function(t){const{thunk:n=!0,immutableCheck:r=!0,serializableCheck:o=!0,actionCreatorCheck:l=!0}=t??{};let i=new jp;return n&&(By(n)?i.push(Dy):i.push(Fy(n.extraArgument))),i},Wy="RTK_autoBatch",Oc=e=>t=>{setTimeout(t,e)},Vy=(e={type:"raf"})=>t=>(...n)=>{const r=t(...n);let o=!0,l=!1,i=!1;const s=new Set,a=e.type==="tick"?queueMicrotask:e.type==="raf"?typeof window<"u"&&window.requestAnimationFrame?window.requestAnimationFrame:Oc(10):e.type==="callback"?e.queueNotification:Oc(e.timeout),u=()=>{i=!1,l&&(l=!1,s.forEach(c=>c()))};return Object.assign({},r,{subscribe(c){const f=()=>o&&c(),m=r.subscribe(f);return s.add(c),()=>{m(),s.delete(c)}},dispatch(c){var f;try{return o=!((f=c==null?void 0:c.meta)!=null&&f[Wy]),l=!o,l&&(i||(i=!0,a(u))),r.dispatch(c)}finally{o=!0}}})},Hy=e=>function(n){const{autoBatch:r=!0}=n??{};let o=new jp(e);return r&&o.push(Vy(typeof r=="object"?r:void 0)),o};function Qy(e){const t=$y(),{reducer:n=void 0,middleware:r,devTools:o=!0,preloadedState:l=void 0,enhancers:i=void 0}=e||{};let s;if(typeof n=="function")s=n;else if(Ka(n))s=wy(n);else throw new Error(ft(1));let a;typeof r=="function"?a=r(t):a=t();let u=wl;o&&(u=Uy({trace:!1,...typeof o=="object"&&o}));const c=xy(...a),f=Hy(c);let m=typeof i=="function"?i(f):f();const w=u(...m);return Pp(s,l,w)}function Bp(e){const t={},n=[];let r;const o={addCase(l,i){const s=typeof l=="string"?l:l.type;if(!s)throw new Error(ft(28));if(s in t)throw new Error(ft(29));return t[s]=i,o},addAsyncThunk(l,i){return i.pending&&(t[l.pending.type]=i.pending),i.rejected&&(t[l.rejected.type]=i.rejected),i.fulfilled&&(t[l.fulfilled.type]=i.fulfilled),i.settled&&n.push({matcher:l.settled,reducer:i.settled}),o},addMatcher(l,i){return n.push({matcher:l,reducer:i}),o},addDefaultCase(l){return r=l,o}};return e(o),[t,n,r]}function Ky(e){return typeof e=="function"}function Yy(e,t){let[n,r,o]=Bp(t),l;if(Ky(e))l=()=>bc(e());else{const s=bc(e);l=()=>s}function i(s=l(),a){let u=[n[a.type],...r.filter(({matcher:c})=>c(a)).map(({reducer:c})=>c)];return u.filter(c=>!!c).length===0&&(u=[o]),u.reduce((c,f)=>{if(f)if(gt(c)){const w=f(c,a);return w===void 0?c:w}else{if(Je(c))return Fp(c,m=>f(m,a));{const m=f(c,a);if(m===void 0){if(c===null)return c;throw Error("A case reducer on a non-draftable value must not return undefined")}return m}}return c},s)}return i.getInitialState=l,i}var Xy=(e,t)=>jy(e)?e.match(t):e(t);function Jy(...e){return t=>e.some(n=>Xy(n,t))}var qy="ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW",Gy=(e=21)=>{let t="",n=e;for(;n--;)t+=qy[Math.random()*64|0];return t},Zy=["name","message","stack","code"],Ii=class{constructor(e,t){ri(this,"_type");this.payload=e,this.meta=t}},Lc=class{constructor(e,t){ri(this,"_type");this.payload=e,this.meta=t}},ev=e=>{if(typeof e=="object"&&e!==null){const t={};for(const n of Zy)typeof e[n]=="string"&&(t[n]=e[n]);return t}return{message:String(e)}},zc="External signal was aborted",Jl=(()=>{function e(t,n,r){const o=yr(t+"/fulfilled",(a,u,c,f)=>({payload:a,meta:{...f||{},arg:c,requestId:u,requestStatus:"fulfilled"}})),l=yr(t+"/pending",(a,u,c)=>({payload:void 0,meta:{...c||{},arg:u,requestId:a,requestStatus:"pending"}})),i=yr(t+"/rejected",(a,u,c,f,m)=>({payload:f,error:(r&&r.serializeError||ev)(a||"Rejected"),meta:{...m||{},arg:c,requestId:u,rejectedWithValue:!!f,requestStatus:"rejected",aborted:(a==null?void 0:a.name)==="AbortError",condition:(a==null?void 0:a.name)==="ConditionError"}}));function s(a,{signal:u}={}){return(c,f,m)=>{const w=r!=null&&r.idGenerator?r.idGenerator(a):Gy(),g=new AbortController;let v,x;function h(y){x=y,g.abort()}u&&(u.aborted?h(zc):u.addEventListener("abort",()=>h(zc),{once:!0}));const p=async function(){var k,C;let y;try{let _=(k=r==null?void 0:r.condition)==null?void 0:k.call(r,a,{getState:f,extra:m});if(nv(_)&&(_=await _),_===!1||g.signal.aborted)throw{name:"ConditionError",message:"Aborted due to condition callback returning false."};const P=new Promise((L,T)=>{v=()=>{T({name:"AbortError",message:x||"Aborted"})},g.signal.addEventListener("abort",v,{once:!0})});c(l(w,a,(C=r==null?void 0:r.getPendingMeta)==null?void 0:C.call(r,{requestId:w,arg:a},{getState:f,extra:m}))),y=await Promise.race([P,Promise.resolve(n(a,{dispatch:c,getState:f,extra:m,requestId:w,signal:g.signal,abort:h,rejectWithValue:(L,T)=>new Ii(L,T),fulfillWithValue:(L,T)=>new Lc(L,T)})).then(L=>{if(L instanceof Ii)throw L;return L instanceof Lc?o(L.payload,w,a,L.meta):o(L,w,a)})])}catch(_){y=_ instanceof Ii?i(null,w,a,_.payload,_.meta):i(_,w,a)}finally{v&&g.signal.removeEventListener("abort",v)}return r&&!r.dispatchConditionRejection&&i.match(y)&&y.meta.condition||c(y),y}();return Object.assign(p,{abort:h,requestId:w,arg:a,unwrap(){return p.then(tv)}})}}return Object.assign(s,{pending:l,rejected:i,fulfilled:o,settled:Jy(i,o),typePrefix:t})}return e.withTypes=()=>e,e})();function tv(e){if(e.meta&&e.meta.rejectedWithValue)throw e.payload;if(e.error)throw e.error;return e.payload}function nv(e){return e!==null&&typeof e=="object"&&typeof e.then=="function"}var rv=Symbol.for("rtk-slice-createasyncthunk");function ov(e,t){return`${e}/${t}`}function lv({creators:e}={}){var n;const t=(n=e==null?void 0:e.asyncThunk)==null?void 0:n[rv];return function(o){const{name:l,reducerPath:i=l}=o;if(!l)throw new Error(ft(11));const s=(typeof o.reducers=="function"?o.reducers(sv()):o.reducers)||{},a=Object.keys(s),u={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},c={addCase(E,k){const C=typeof E=="string"?E:E.type;if(!C)throw new Error(ft(12));if(C in u.sliceCaseReducersByType)throw new Error(ft(13));return u.sliceCaseReducersByType[C]=k,c},addMatcher(E,k){return u.sliceMatchers.push({matcher:E,reducer:k}),c},exposeAction(E,k){return u.actionCreators[E]=k,c},exposeCaseReducer(E,k){return u.sliceCaseReducersByName[E]=k,c}};a.forEach(E=>{const k=s[E],C={reducerName:E,type:ov(l,E),createNotation:typeof o.reducers=="function"};uv(k)?fv(C,k,c,t):av(C,k,c)});function f(){const[E={},k=[],C=void 0]=typeof o.extraReducers=="function"?Bp(o.extraReducers):[o.extraReducers],_={...E,...u.sliceCaseReducersByType};return Yy(o.initialState,P=>{for(let L in _)P.addCase(L,_[L]);for(let L of u.sliceMatchers)P.addMatcher(L.matcher,L.reducer);for(let L of k)P.addMatcher(L.matcher,L.reducer);C&&P.addDefaultCase(C)})}const m=E=>E,w=new Map,g=new WeakMap;let v;function x(E,k){return v||(v=f()),v(E,k)}function h(){return v||(v=f()),v.getInitialState()}function p(E,k=!1){function C(P){let L=P[E];return typeof L>"u"&&k&&(L=ko(g,C,h)),L}function _(P=m){const L=ko(w,k,()=>new WeakMap);return ko(L,P,()=>{const T={};for(const[B,ve]of Object.entries(o.selectors??{}))T[B]=iv(ve,P,()=>ko(g,P,h),k);return T})}return{reducerPath:E,getSelectors:_,get selectors(){return _(C)},selectSlice:C}}const y={name:l,reducer:x,actions:u.actionCreators,caseReducers:u.sliceCaseReducersByName,getInitialState:h,...p(i),injectInto(E,{reducerPath:k,...C}={}){const _=k??i;return E.inject({reducerPath:_,reducer:x},C),{...y,...p(_,!0)}}};return y}}function iv(e,t,n,r){function o(l,...i){let s=t(l);return typeof s>"u"&&r&&(s=n()),e(s,...i)}return o.unwrapped=e,o}var $p=lv();function sv(){function e(t,n){return{_reducerDefinitionType:"asyncThunk",payloadCreator:t,...n}}return e.withTypes=()=>e,{reducer(t){return Object.assign({[t.name](...n){return t(...n)}}[t.name],{_reducerDefinitionType:"reducer"})},preparedReducer(t,n){return{_reducerDefinitionType:"reducerWithPrepare",prepare:t,reducer:n}},asyncThunk:e}}function av({type:e,reducerName:t,createNotation:n},r,o){let l,i;if("reducer"in r){if(n&&!cv(r))throw new Error(ft(17));l=r.reducer,i=r.prepare}else l=r;o.addCase(e,l).exposeCaseReducer(t,l).exposeAction(t,i?yr(e,i):yr(e))}function uv(e){return e._reducerDefinitionType==="asyncThunk"}function cv(e){return e._reducerDefinitionType==="reducerWithPrepare"}function fv({type:e,reducerName:t},n,r,o){if(!o)throw new Error(ft(18));const{payloadCreator:l,fulfilled:i,pending:s,rejected:a,settled:u,options:c}=n,f=o(e,l,c);r.exposeAction(t,f),i&&r.addCase(f.fulfilled,i),s&&r.addCase(f.pending,s),a&&r.addCase(f.rejected,a),u&&r.addMatcher(f.settled,u),r.exposeCaseReducer(t,{fulfilled:i||Co,pending:s||Co,rejected:a||Co,settled:u||Co})}function Co(){}function ft(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}function Wp(e,t){return function(){return e.apply(t,arguments)}}const{toString:dv}=Object.prototype,{getPrototypeOf:qa}=Object,{iterator:ql,toStringTag:Vp}=Symbol,Gl=(e=>t=>{const n=dv.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),qe=e=>(e=e.toLowerCase(),t=>Gl(t)===e),Zl=e=>t=>typeof t===e,{isArray:Kn}=Array,$n=Zl("undefined");function qr(e){return e!==null&&!$n(e)&&e.constructor!==null&&!$n(e.constructor)&&_e(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const Hp=qe("ArrayBuffer");function pv(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&Hp(e.buffer),t}const mv=Zl("string"),_e=Zl("function"),Qp=Zl("number"),Gr=e=>e!==null&&typeof e=="object",hv=e=>e===!0||e===!1,Bo=e=>{if(Gl(e)!=="object")return!1;const t=qa(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Vp in e)&&!(ql in e)},gv=e=>{if(!Gr(e)||qr(e))return!1;try{return Object.keys(e).length===0&&Object.getPrototypeOf(e)===Object.prototype}catch{return!1}},yv=qe("Date"),vv=qe("File"),wv=qe("Blob"),xv=qe("FileList"),Ev=e=>Gr(e)&&_e(e.pipe),Sv=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||_e(e.append)&&((t=Gl(e))==="formdata"||t==="object"&&_e(e.toString)&&e.toString()==="[object FormData]"))},kv=qe("URLSearchParams"),[Cv,_v,Rv,Nv]=["ReadableStream","Request","Response","Headers"].map(qe),Pv=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function Zr(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let r,o;if(typeof e!="object"&&(e=[e]),Kn(e))for(r=0,o=e.length;r<o;r++)t.call(null,e[r],r,e);else{if(qr(e))return;const l=n?Object.getOwnPropertyNames(e):Object.keys(e),i=l.length;let s;for(r=0;r<i;r++)s=l[r],t.call(null,e[s],s,e)}}function Kp(e,t){if(qr(e))return null;t=t.toLowerCase();const n=Object.keys(e);let r=n.length,o;for(;r-- >0;)if(o=n[r],t===o.toLowerCase())return o;return null}const Jt=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,Yp=e=>!$n(e)&&e!==Jt;function Vs(){const{caseless:e,skipUndefined:t}=Yp(this)&&this||{},n={},r=(o,l)=>{const i=e&&Kp(n,l)||l;Bo(n[i])&&Bo(o)?n[i]=Vs(n[i],o):Bo(o)?n[i]=Vs({},o):Kn(o)?n[i]=o.slice():(!t||!$n(o))&&(n[i]=o)};for(let o=0,l=arguments.length;o<l;o++)arguments[o]&&Zr(arguments[o],r);return n}const Tv=(e,t,n,{allOwnKeys:r}={})=>(Zr(t,(o,l)=>{n&&_e(o)?Object.defineProperty(e,l,{value:Wp(o,n),writable:!0,enumerable:!0,configurable:!0}):Object.defineProperty(e,l,{value:o,writable:!0,enumerable:!0,configurable:!0})},{allOwnKeys:r}),e),bv=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),Ov=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),Object.defineProperty(e.prototype,"constructor",{value:e,writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},Lv=(e,t,n,r)=>{let o,l,i;const s={};if(t=t||{},e==null)return t;do{for(o=Object.getOwnPropertyNames(e),l=o.length;l-- >0;)i=o[l],(!r||r(i,e,t))&&!s[i]&&(t[i]=e[i],s[i]=!0);e=n!==!1&&qa(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},zv=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return r!==-1&&r===n},Av=e=>{if(!e)return null;if(Kn(e))return e;let t=e.length;if(!Qp(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},Mv=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&qa(Uint8Array)),Iv=(e,t)=>{const r=(e&&e[ql]).call(e);let o;for(;(o=r.next())&&!o.done;){const l=o.value;t.call(e,l[0],l[1])}},Dv=(e,t)=>{let n;const r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},Fv=qe("HTMLFormElement"),Uv=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,o){return r.toUpperCase()+o}),Ac=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),jv=qe("RegExp"),Xp=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};Zr(n,(o,l)=>{let i;(i=t(o,l,e))!==!1&&(r[l]=i||o)}),Object.defineProperties(e,r)},Bv=e=>{Xp(e,(t,n)=>{if(_e(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const r=e[n];if(_e(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},$v=(e,t)=>{const n={},r=o=>{o.forEach(l=>{n[l]=!0})};return Kn(e)?r(e):r(String(e).split(t)),n},Wv=()=>{},Vv=(e,t)=>e!=null&&Number.isFinite(e=+e)?e:t;function Hv(e){return!!(e&&_e(e.append)&&e[Vp]==="FormData"&&e[ql])}const Qv=e=>{const t=new Array(10),n=(r,o)=>{if(Gr(r)){if(t.indexOf(r)>=0)return;if(qr(r))return r;if(!("toJSON"in r)){t[o]=r;const l=Kn(r)?[]:{};return Zr(r,(i,s)=>{const a=n(i,o+1);!$n(a)&&(l[s]=a)}),t[o]=void 0,l}}return r};return n(e,0)},Kv=qe("AsyncFunction"),Yv=e=>e&&(Gr(e)||_e(e))&&_e(e.then)&&_e(e.catch),Jp=((e,t)=>e?setImmediate:t?((n,r)=>(Jt.addEventListener("message",({source:o,data:l})=>{o===Jt&&l===n&&r.length&&r.shift()()},!1),o=>{r.push(o),Jt.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",_e(Jt.postMessage)),Xv=typeof queueMicrotask<"u"?queueMicrotask.bind(Jt):typeof process<"u"&&process.nextTick||Jp,Jv=e=>e!=null&&_e(e[ql]),S={isArray:Kn,isArrayBuffer:Hp,isBuffer:qr,isFormData:Sv,isArrayBufferView:pv,isString:mv,isNumber:Qp,isBoolean:hv,isObject:Gr,isPlainObject:Bo,isEmptyObject:gv,isReadableStream:Cv,isRequest:_v,isResponse:Rv,isHeaders:Nv,isUndefined:$n,isDate:yv,isFile:vv,isBlob:wv,isRegExp:jv,isFunction:_e,isStream:Ev,isURLSearchParams:kv,isTypedArray:Mv,isFileList:xv,forEach:Zr,merge:Vs,extend:Tv,trim:Pv,stripBOM:bv,inherits:Ov,toFlatObject:Lv,kindOf:Gl,kindOfTest:qe,endsWith:zv,toArray:Av,forEachEntry:Iv,matchAll:Dv,isHTMLForm:Fv,hasOwnProperty:Ac,hasOwnProp:Ac,reduceDescriptors:Xp,freezeMethods:Bv,toObjectSet:$v,toCamelCase:Uv,noop:Wv,toFiniteNumber:Vv,findKey:Kp,global:Jt,isContextDefined:Yp,isSpecCompliantForm:Hv,toJSONObject:Qv,isAsyncFn:Kv,isThenable:Yv,setImmediate:Jp,asap:Xv,isIterable:Jv};let z=class qp extends Error{static from(t,n,r,o,l,i){const s=new qp(t.message,n||t.code,r,o,l);return s.cause=t,s.name=t.name,i&&Object.assign(s,i),s}constructor(t,n,r,o,l){super(t),this.name="AxiosError",this.isAxiosError=!0,n&&(this.code=n),r&&(this.config=r),o&&(this.request=o),l&&(this.response=l,this.status=l.status)}toJSON(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:S.toJSONObject(this.config),code:this.code,status:this.status}}};z.ERR_BAD_OPTION_VALUE="ERR_BAD_OPTION_VALUE";z.ERR_BAD_OPTION="ERR_BAD_OPTION";z.ECONNABORTED="ECONNABORTED";z.ETIMEDOUT="ETIMEDOUT";z.ERR_NETWORK="ERR_NETWORK";z.ERR_FR_TOO_MANY_REDIRECTS="ERR_FR_TOO_MANY_REDIRECTS";z.ERR_DEPRECATED="ERR_DEPRECATED";z.ERR_BAD_RESPONSE="ERR_BAD_RESPONSE";z.ERR_BAD_REQUEST="ERR_BAD_REQUEST";z.ERR_CANCELED="ERR_CANCELED";z.ERR_NOT_SUPPORT="ERR_NOT_SUPPORT";z.ERR_INVALID_URL="ERR_INVALID_URL";const qv=null;function Hs(e){return S.isPlainObject(e)||S.isArray(e)}function Gp(e){return S.endsWith(e,"[]")?e.slice(0,-2):e}function Mc(e,t,n){return e?e.concat(t).map(function(o,l){return o=Gp(o),!n&&l?"["+o+"]":o}).join(n?".":""):t}function Gv(e){return S.isArray(e)&&!e.some(Hs)}const Zv=S.toFlatObject(S,{},null,function(t){return/^is[A-Z]/.test(t)});function ei(e,t,n){if(!S.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=S.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(v,x){return!S.isUndefined(x[v])});const r=n.metaTokens,o=n.visitor||c,l=n.dots,i=n.indexes,a=(n.Blob||typeof Blob<"u"&&Blob)&&S.isSpecCompliantForm(t);if(!S.isFunction(o))throw new TypeError("visitor must be a function");function u(g){if(g===null)return"";if(S.isDate(g))return g.toISOString();if(S.isBoolean(g))return g.toString();if(!a&&S.isBlob(g))throw new z("Blob is not supported. Use a Buffer instead.");return S.isArrayBuffer(g)||S.isTypedArray(g)?a&&typeof Blob=="function"?new Blob([g]):Buffer.from(g):g}function c(g,v,x){let h=g;if(g&&!x&&typeof g=="object"){if(S.endsWith(v,"{}"))v=r?v:v.slice(0,-2),g=JSON.stringify(g);else if(S.isArray(g)&&Gv(g)||(S.isFileList(g)||S.endsWith(v,"[]"))&&(h=S.toArray(g)))return v=Gp(v),h.forEach(function(y,E){!(S.isUndefined(y)||y===null)&&t.append(i===!0?Mc([v],E,l):i===null?v:v+"[]",u(y))}),!1}return Hs(g)?!0:(t.append(Mc(x,v,l),u(g)),!1)}const f=[],m=Object.assign(Zv,{defaultVisitor:c,convertValue:u,isVisitable:Hs});function w(g,v){if(!S.isUndefined(g)){if(f.indexOf(g)!==-1)throw Error("Circular reference detected in "+v.join("."));f.push(g),S.forEach(g,function(h,p){(!(S.isUndefined(h)||h===null)&&o.call(t,h,S.isString(p)?p.trim():p,v,m))===!0&&w(h,v?v.concat(p):[p])}),f.pop()}}if(!S.isObject(e))throw new TypeError("data must be an object");return w(e),t}function Ic(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(r){return t[r]})}function Ga(e,t){this._pairs=[],e&&ei(e,this,t)}const Zp=Ga.prototype;Zp.append=function(t,n){this._pairs.push([t,n])};Zp.toString=function(t){const n=t?function(r){return t.call(this,r,Ic)}:Ic;return this._pairs.map(function(o){return n(o[0])+"="+n(o[1])},"").join("&")};function e1(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+")}function em(e,t,n){if(!t)return e;const r=n&&n.encode||e1,o=S.isFunction(n)?{serialize:n}:n,l=o&&o.serialize;let i;if(l?i=l(t,o):i=S.isURLSearchParams(t)?t.toString():new Ga(t,o).toString(r),i){const s=e.indexOf("#");s!==-1&&(e=e.slice(0,s)),e+=(e.indexOf("?")===-1?"?":"&")+i}return e}class Dc{constructor(){this.handlers=[]}use(t,n,r){return this.handlers.push({fulfilled:t,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){S.forEach(this.handlers,function(r){r!==null&&t(r)})}}const tm={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},t1=typeof URLSearchParams<"u"?URLSearchParams:Ga,n1=typeof FormData<"u"?FormData:null,r1=typeof Blob<"u"?Blob:null,o1={isBrowser:!0,classes:{URLSearchParams:t1,FormData:n1,Blob:r1},protocols:["http","https","file","blob","url","data"]},Za=typeof window<"u"&&typeof document<"u",Qs=typeof navigator=="object"&&navigator||void 0,l1=Za&&(!Qs||["ReactNative","NativeScript","NS"].indexOf(Qs.product)<0),i1=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",s1=Za&&window.location.href||"http://localhost",a1=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Za,hasStandardBrowserEnv:l1,hasStandardBrowserWebWorkerEnv:i1,navigator:Qs,origin:s1},Symbol.toStringTag,{value:"Module"})),fe={...a1,...o1};function u1(e,t){return ei(e,new fe.classes.URLSearchParams,{visitor:function(n,r,o,l){return fe.isNode&&S.isBuffer(n)?(this.append(r,n.toString("base64")),!1):l.defaultVisitor.apply(this,arguments)},...t})}function c1(e){return S.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function f1(e){const t={},n=Object.keys(e);let r;const o=n.length;let l;for(r=0;r<o;r++)l=n[r],t[l]=e[l];return t}function nm(e){function t(n,r,o,l){let i=n[l++];if(i==="__proto__")return!0;const s=Number.isFinite(+i),a=l>=n.length;return i=!i&&S.isArray(o)?o.length:i,a?(S.hasOwnProp(o,i)?o[i]=[o[i],r]:o[i]=r,!s):((!o[i]||!S.isObject(o[i]))&&(o[i]=[]),t(n,r,o[i],l)&&S.isArray(o[i])&&(o[i]=f1(o[i])),!s)}if(S.isFormData(e)&&S.isFunction(e.entries)){const n={};return S.forEachEntry(e,(r,o)=>{t(c1(r),o,n,0)}),n}return null}function d1(e,t,n){if(S.isString(e))try{return(t||JSON.parse)(e),S.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(e)}const eo={transitional:tm,adapter:["xhr","http","fetch"],transformRequest:[function(t,n){const r=n.getContentType()||"",o=r.indexOf("application/json")>-1,l=S.isObject(t);if(l&&S.isHTMLForm(t)&&(t=new FormData(t)),S.isFormData(t))return o?JSON.stringify(nm(t)):t;if(S.isArrayBuffer(t)||S.isBuffer(t)||S.isStream(t)||S.isFile(t)||S.isBlob(t)||S.isReadableStream(t))return t;if(S.isArrayBufferView(t))return t.buffer;if(S.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let s;if(l){if(r.indexOf("application/x-www-form-urlencoded")>-1)return u1(t,this.formSerializer).toString();if((s=S.isFileList(t))||r.indexOf("multipart/form-data")>-1){const a=this.env&&this.env.FormData;return ei(s?{"files[]":t}:t,a&&new a,this.formSerializer)}}return l||o?(n.setContentType("application/json",!1),d1(t)):t}],transformResponse:[function(t){const n=this.transitional||eo.transitional,r=n&&n.forcedJSONParsing,o=this.responseType==="json";if(S.isResponse(t)||S.isReadableStream(t))return t;if(t&&S.isString(t)&&(r&&!this.responseType||o)){const i=!(n&&n.silentJSONParsing)&&o;try{return JSON.parse(t,this.parseReviver)}catch(s){if(i)throw s.name==="SyntaxError"?z.from(s,z.ERR_BAD_RESPONSE,this,null,this.response):s}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:fe.classes.FormData,Blob:fe.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};S.forEach(["delete","get","head","post","put","patch"],e=>{eo.headers[e]={}});const p1=S.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),m1=e=>{const t={};let n,r,o;return e&&e.split(`
`).forEach(function(i){o=i.indexOf(":"),n=i.substring(0,o).trim().toLowerCase(),r=i.substring(o+1).trim(),!(!n||t[n]&&p1[n])&&(n==="set-cookie"?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)}),t},Fc=Symbol("internals");function nr(e){return e&&String(e).trim().toLowerCase()}function $o(e){return e===!1||e==null?e:S.isArray(e)?e.map($o):String(e)}function h1(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}const g1=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function Di(e,t,n,r,o){if(S.isFunction(r))return r.call(this,t,n);if(o&&(t=n),!!S.isString(t)){if(S.isString(r))return t.indexOf(r)!==-1;if(S.isRegExp(r))return r.test(t)}}function y1(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,r)=>n.toUpperCase()+r)}function v1(e,t){const n=S.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{value:function(o,l,i){return this[r].call(this,t,o,l,i)},configurable:!0})})}let Re=class{constructor(t){t&&this.set(t)}set(t,n,r){const o=this;function l(s,a,u){const c=nr(a);if(!c)throw new Error("header name must be a non-empty string");const f=S.findKey(o,c);(!f||o[f]===void 0||u===!0||u===void 0&&o[f]!==!1)&&(o[f||a]=$o(s))}const i=(s,a)=>S.forEach(s,(u,c)=>l(u,c,a));if(S.isPlainObject(t)||t instanceof this.constructor)i(t,n);else if(S.isString(t)&&(t=t.trim())&&!g1(t))i(m1(t),n);else if(S.isObject(t)&&S.isIterable(t)){let s={},a,u;for(const c of t){if(!S.isArray(c))throw TypeError("Object iterator must return a key-value pair");s[u=c[0]]=(a=s[u])?S.isArray(a)?[...a,c[1]]:[a,c[1]]:c[1]}i(s,n)}else t!=null&&l(n,t,r);return this}get(t,n){if(t=nr(t),t){const r=S.findKey(this,t);if(r){const o=this[r];if(!n)return o;if(n===!0)return h1(o);if(S.isFunction(n))return n.call(this,o,r);if(S.isRegExp(n))return n.exec(o);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=nr(t),t){const r=S.findKey(this,t);return!!(r&&this[r]!==void 0&&(!n||Di(this,this[r],r,n)))}return!1}delete(t,n){const r=this;let o=!1;function l(i){if(i=nr(i),i){const s=S.findKey(r,i);s&&(!n||Di(r,r[s],s,n))&&(delete r[s],o=!0)}}return S.isArray(t)?t.forEach(l):l(t),o}clear(t){const n=Object.keys(this);let r=n.length,o=!1;for(;r--;){const l=n[r];(!t||Di(this,this[l],l,t,!0))&&(delete this[l],o=!0)}return o}normalize(t){const n=this,r={};return S.forEach(this,(o,l)=>{const i=S.findKey(r,l);if(i){n[i]=$o(o),delete n[l];return}const s=t?y1(l):String(l).trim();s!==l&&delete n[l],n[s]=$o(o),r[s]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return S.forEach(this,(r,o)=>{r!=null&&r!==!1&&(n[o]=t&&S.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const r=new this(t);return n.forEach(o=>r.set(o)),r}static accessor(t){const r=(this[Fc]=this[Fc]={accessors:{}}).accessors,o=this.prototype;function l(i){const s=nr(i);r[s]||(v1(o,i),r[s]=!0)}return S.isArray(t)?t.forEach(l):l(t),this}};Re.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);S.reduceDescriptors(Re.prototype,({value:e},t)=>{let n=t[0].toUpperCase()+t.slice(1);return{get:()=>e,set(r){this[n]=r}}});S.freezeMethods(Re);function Fi(e,t){const n=this||eo,r=t||n,o=Re.from(r.headers);let l=r.data;return S.forEach(e,function(s){l=s.call(n,l,o.normalize(),t?t.status:void 0)}),o.normalize(),l}function rm(e){return!!(e&&e.__CANCEL__)}let to=class extends z{constructor(t,n,r){super(t??"canceled",z.ERR_CANCELED,n,r),this.name="CanceledError",this.__CANCEL__=!0}};function om(e,t,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new z("Request failed with status code "+n.status,[z.ERR_BAD_REQUEST,z.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function w1(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function x1(e,t){e=e||10;const n=new Array(e),r=new Array(e);let o=0,l=0,i;return t=t!==void 0?t:1e3,function(a){const u=Date.now(),c=r[l];i||(i=u),n[o]=a,r[o]=u;let f=l,m=0;for(;f!==o;)m+=n[f++],f=f%e;if(o=(o+1)%e,o===l&&(l=(l+1)%e),u-i<t)return;const w=c&&u-c;return w?Math.round(m*1e3/w):void 0}}function E1(e,t){let n=0,r=1e3/t,o,l;const i=(u,c=Date.now())=>{n=c,o=null,l&&(clearTimeout(l),l=null),e(...u)};return[(...u)=>{const c=Date.now(),f=c-n;f>=r?i(u,c):(o=u,l||(l=setTimeout(()=>{l=null,i(o)},r-f)))},()=>o&&i(o)]}const Rl=(e,t,n=3)=>{let r=0;const o=x1(50,250);return E1(l=>{const i=l.loaded,s=l.lengthComputable?l.total:void 0,a=i-r,u=o(a),c=i<=s;r=i;const f={loaded:i,total:s,progress:s?i/s:void 0,bytes:a,rate:u||void 0,estimated:u&&s&&c?(s-i)/u:void 0,event:l,lengthComputable:s!=null,[t?"download":"upload"]:!0};e(f)},n)},Uc=(e,t)=>{const n=e!=null;return[r=>t[0]({lengthComputable:n,total:e,loaded:r}),t[1]]},jc=e=>(...t)=>S.asap(()=>e(...t)),S1=fe.hasStandardBrowserEnv?((e,t)=>n=>(n=new URL(n,fe.origin),e.protocol===n.protocol&&e.host===n.host&&(t||e.port===n.port)))(new URL(fe.origin),fe.navigator&&/(msie|trident)/i.test(fe.navigator.userAgent)):()=>!0,k1=fe.hasStandardBrowserEnv?{write(e,t,n,r,o,l,i){if(typeof document>"u")return;const s=[`${e}=${encodeURIComponent(t)}`];S.isNumber(n)&&s.push(`expires=${new Date(n).toUTCString()}`),S.isString(r)&&s.push(`path=${r}`),S.isString(o)&&s.push(`domain=${o}`),l===!0&&s.push("secure"),S.isString(i)&&s.push(`SameSite=${i}`),document.cookie=s.join("; ")},read(e){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(?:^|; )"+e+"=([^;]*)"));return t?decodeURIComponent(t[1]):null},remove(e){this.write(e,"",Date.now()-864e5,"/")}}:{write(){},read(){return null},remove(){}};function C1(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function _1(e,t){return t?e.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):e}function lm(e,t,n){let r=!C1(t);return e&&(r||n==!1)?_1(e,t):t}const Bc=e=>e instanceof Re?{...e}:e;function sn(e,t){t=t||{};const n={};function r(u,c,f,m){return S.isPlainObject(u)&&S.isPlainObject(c)?S.merge.call({caseless:m},u,c):S.isPlainObject(c)?S.merge({},c):S.isArray(c)?c.slice():c}function o(u,c,f,m){if(S.isUndefined(c)){if(!S.isUndefined(u))return r(void 0,u,f,m)}else return r(u,c,f,m)}function l(u,c){if(!S.isUndefined(c))return r(void 0,c)}function i(u,c){if(S.isUndefined(c)){if(!S.isUndefined(u))return r(void 0,u)}else return r(void 0,c)}function s(u,c,f){if(f in t)return r(u,c);if(f in e)return r(void 0,u)}const a={url:l,method:l,data:l,baseURL:i,transformRequest:i,transformResponse:i,paramsSerializer:i,timeout:i,timeoutMessage:i,withCredentials:i,withXSRFToken:i,adapter:i,responseType:i,xsrfCookieName:i,xsrfHeaderName:i,onUploadProgress:i,onDownloadProgress:i,decompress:i,maxContentLength:i,maxBodyLength:i,beforeRedirect:i,transport:i,httpAgent:i,httpsAgent:i,cancelToken:i,socketPath:i,responseEncoding:i,validateStatus:s,headers:(u,c,f)=>o(Bc(u),Bc(c),f,!0)};return S.forEach(Object.keys({...e,...t}),function(c){const f=a[c]||o,m=f(e[c],t[c],c);S.isUndefined(m)&&f!==s||(n[c]=m)}),n}const im=e=>{const t=sn({},e);let{data:n,withXSRFToken:r,xsrfHeaderName:o,xsrfCookieName:l,headers:i,auth:s}=t;if(t.headers=i=Re.from(i),t.url=em(lm(t.baseURL,t.url,t.allowAbsoluteUrls),e.params,e.paramsSerializer),s&&i.set("Authorization","Basic "+btoa((s.username||"")+":"+(s.password?unescape(encodeURIComponent(s.password)):""))),S.isFormData(n)){if(fe.hasStandardBrowserEnv||fe.hasStandardBrowserWebWorkerEnv)i.setContentType(void 0);else if(S.isFunction(n.getHeaders)){const a=n.getHeaders(),u=["content-type","content-length"];Object.entries(a).forEach(([c,f])=>{u.includes(c.toLowerCase())&&i.set(c,f)})}}if(fe.hasStandardBrowserEnv&&(r&&S.isFunction(r)&&(r=r(t)),r||r!==!1&&S1(t.url))){const a=o&&l&&k1.read(l);a&&i.set(o,a)}return t},R1=typeof XMLHttpRequest<"u",N1=R1&&function(e){return new Promise(function(n,r){const o=im(e);let l=o.data;const i=Re.from(o.headers).normalize();let{responseType:s,onUploadProgress:a,onDownloadProgress:u}=o,c,f,m,w,g;function v(){w&&w(),g&&g(),o.cancelToken&&o.cancelToken.unsubscribe(c),o.signal&&o.signal.removeEventListener("abort",c)}let x=new XMLHttpRequest;x.open(o.method.toUpperCase(),o.url,!0),x.timeout=o.timeout;function h(){if(!x)return;const y=Re.from("getAllResponseHeaders"in x&&x.getAllResponseHeaders()),k={data:!s||s==="text"||s==="json"?x.responseText:x.response,status:x.status,statusText:x.statusText,headers:y,config:e,request:x};om(function(_){n(_),v()},function(_){r(_),v()},k),x=null}"onloadend"in x?x.onloadend=h:x.onreadystatechange=function(){!x||x.readyState!==4||x.status===0&&!(x.responseURL&&x.responseURL.indexOf("file:")===0)||setTimeout(h)},x.onabort=function(){x&&(r(new z("Request aborted",z.ECONNABORTED,e,x)),x=null)},x.onerror=function(E){const k=E&&E.message?E.message:"Network Error",C=new z(k,z.ERR_NETWORK,e,x);C.event=E||null,r(C),x=null},x.ontimeout=function(){let E=o.timeout?"timeout of "+o.timeout+"ms exceeded":"timeout exceeded";const k=o.transitional||tm;o.timeoutErrorMessage&&(E=o.timeoutErrorMessage),r(new z(E,k.clarifyTimeoutError?z.ETIMEDOUT:z.ECONNABORTED,e,x)),x=null},l===void 0&&i.setContentType(null),"setRequestHeader"in x&&S.forEach(i.toJSON(),function(E,k){x.setRequestHeader(k,E)}),S.isUndefined(o.withCredentials)||(x.withCredentials=!!o.withCredentials),s&&s!=="json"&&(x.responseType=o.responseType),u&&([m,g]=Rl(u,!0),x.addEventListener("progress",m)),a&&x.upload&&([f,w]=Rl(a),x.upload.addEventListener("progress",f),x.upload.addEventListener("loadend",w)),(o.cancelToken||o.signal)&&(c=y=>{x&&(r(!y||y.type?new to(null,e,x):y),x.abort(),x=null)},o.cancelToken&&o.cancelToken.subscribe(c),o.signal&&(o.signal.aborted?c():o.signal.addEventListener("abort",c)));const p=w1(o.url);if(p&&fe.protocols.indexOf(p)===-1){r(new z("Unsupported protocol "+p+":",z.ERR_BAD_REQUEST,e));return}x.send(l||null)})},P1=(e,t)=>{const{length:n}=e=e?e.filter(Boolean):[];if(t||n){let r=new AbortController,o;const l=function(u){if(!o){o=!0,s();const c=u instanceof Error?u:this.reason;r.abort(c instanceof z?c:new to(c instanceof Error?c.message:c))}};let i=t&&setTimeout(()=>{i=null,l(new z(`timeout of ${t}ms exceeded`,z.ETIMEDOUT))},t);const s=()=>{e&&(i&&clearTimeout(i),i=null,e.forEach(u=>{u.unsubscribe?u.unsubscribe(l):u.removeEventListener("abort",l)}),e=null)};e.forEach(u=>u.addEventListener("abort",l));const{signal:a}=r;return a.unsubscribe=()=>S.asap(s),a}},T1=function*(e,t){let n=e.byteLength;if(n<t){yield e;return}let r=0,o;for(;r<n;)o=r+t,yield e.slice(r,o),r=o},b1=async function*(e,t){for await(const n of O1(e))yield*T1(n,t)},O1=async function*(e){if(e[Symbol.asyncIterator]){yield*e;return}const t=e.getReader();try{for(;;){const{done:n,value:r}=await t.read();if(n)break;yield r}}finally{await t.cancel()}},$c=(e,t,n,r)=>{const o=b1(e,t);let l=0,i,s=a=>{i||(i=!0,r&&r(a))};return new ReadableStream({async pull(a){try{const{done:u,value:c}=await o.next();if(u){s(),a.close();return}let f=c.byteLength;if(n){let m=l+=f;n(m)}a.enqueue(new Uint8Array(c))}catch(u){throw s(u),u}},cancel(a){return s(a),o.return()}},{highWaterMark:2})},Wc=64*1024,{isFunction:_o}=S,L1=(({Request:e,Response:t})=>({Request:e,Response:t}))(S.global),{ReadableStream:Vc,TextEncoder:Hc}=S.global,Qc=(e,...t)=>{try{return!!e(...t)}catch{return!1}},z1=e=>{e=S.merge.call({skipUndefined:!0},L1,e);const{fetch:t,Request:n,Response:r}=e,o=t?_o(t):typeof fetch=="function",l=_o(n),i=_o(r);if(!o)return!1;const s=o&&_o(Vc),a=o&&(typeof Hc=="function"?(g=>v=>g.encode(v))(new Hc):async g=>new Uint8Array(await new n(g).arrayBuffer())),u=l&&s&&Qc(()=>{let g=!1;const v=new n(fe.origin,{body:new Vc,method:"POST",get duplex(){return g=!0,"half"}}).headers.has("Content-Type");return g&&!v}),c=i&&s&&Qc(()=>S.isReadableStream(new r("").body)),f={stream:c&&(g=>g.body)};o&&["text","arrayBuffer","blob","formData","stream"].forEach(g=>{!f[g]&&(f[g]=(v,x)=>{let h=v&&v[g];if(h)return h.call(v);throw new z(`Response type '${g}' is not supported`,z.ERR_NOT_SUPPORT,x)})});const m=async g=>{if(g==null)return 0;if(S.isBlob(g))return g.size;if(S.isSpecCompliantForm(g))return(await new n(fe.origin,{method:"POST",body:g}).arrayBuffer()).byteLength;if(S.isArrayBufferView(g)||S.isArrayBuffer(g))return g.byteLength;if(S.isURLSearchParams(g)&&(g=g+""),S.isString(g))return(await a(g)).byteLength},w=async(g,v)=>{const x=S.toFiniteNumber(g.getContentLength());return x??m(v)};return async g=>{let{url:v,method:x,data:h,signal:p,cancelToken:y,timeout:E,onDownloadProgress:k,onUploadProgress:C,responseType:_,headers:P,withCredentials:L="same-origin",fetchOptions:T}=im(g),B=t||fetch;_=_?(_+"").toLowerCase():"text";let ve=P1([p,y&&y.toAbortSignal()],E),Be=null;const Ge=ve&&ve.unsubscribe&&(()=>{ve.unsubscribe()});let no;try{if(C&&u&&x!=="get"&&x!=="head"&&(no=await w(P,h))!==0){let F=new n(v,{method:"POST",body:h,duplex:"half"}),$;if(S.isFormData(h)&&($=F.headers.get("content-type"))&&P.setContentType($),F.body){const[vt,Ae]=Uc(no,Rl(jc(C)));h=$c(F.body,Wc,vt,Ae)}}S.isString(L)||(L=L?"include":"omit");const we=l&&"credentials"in n.prototype,fn={...T,signal:ve,method:x.toUpperCase(),headers:P.normalize().toJSON(),body:h,duplex:"half",credentials:we?L:void 0};Be=l&&new n(v,fn);let b=await(l?B(Be,T):B(v,fn));const A=c&&(_==="stream"||_==="response");if(c&&(k||A&&Ge)){const F={};["status","statusText","headers"].forEach(dn=>{F[dn]=b[dn]});const $=S.toFiniteNumber(b.headers.get("content-length")),[vt,Ae]=k&&Uc($,Rl(jc(k),!0))||[];b=new r($c(b.body,Wc,vt,()=>{Ae&&Ae(),Ge&&Ge()}),F)}_=_||"text";let M=await f[S.findKey(f,_)||"text"](b,g);return!A&&Ge&&Ge(),await new Promise((F,$)=>{om(F,$,{data:M,headers:Re.from(b.headers),status:b.status,statusText:b.statusText,config:g,request:Be})})}catch(we){throw Ge&&Ge(),we&&we.name==="TypeError"&&/Load failed|fetch/i.test(we.message)?Object.assign(new z("Network Error",z.ERR_NETWORK,g,Be),{cause:we.cause||we}):z.from(we,we&&we.code,g,Be)}}},A1=new Map,sm=e=>{let t=e&&e.env||{};const{fetch:n,Request:r,Response:o}=t,l=[r,o,n];let i=l.length,s=i,a,u,c=A1;for(;s--;)a=l[s],u=c.get(a),u===void 0&&c.set(a,u=s?new Map:z1(t)),c=u;return u};sm();const eu={http:qv,xhr:N1,fetch:{get:sm}};S.forEach(eu,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const Kc=e=>`- ${e}`,M1=e=>S.isFunction(e)||e===null||e===!1;function I1(e,t){e=S.isArray(e)?e:[e];const{length:n}=e;let r,o;const l={};for(let i=0;i<n;i++){r=e[i];let s;if(o=r,!M1(r)&&(o=eu[(s=String(r)).toLowerCase()],o===void 0))throw new z(`Unknown adapter '${s}'`);if(o&&(S.isFunction(o)||(o=o.get(t))))break;l[s||"#"+i]=o}if(!o){const i=Object.entries(l).map(([a,u])=>`adapter ${a} `+(u===!1?"is not supported by the environment":"is not available in the build"));let s=n?i.length>1?`since :
`+i.map(Kc).join(`
`):" "+Kc(i[0]):"as no adapter specified";throw new z("There is no suitable adapter to dispatch the request "+s,"ERR_NOT_SUPPORT")}return o}const am={getAdapter:I1,adapters:eu};function Ui(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new to(null,e)}function Yc(e){return Ui(e),e.headers=Re.from(e.headers),e.data=Fi.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),am.getAdapter(e.adapter||eo.adapter,e)(e).then(function(r){return Ui(e),r.data=Fi.call(e,e.transformResponse,r),r.headers=Re.from(r.headers),r},function(r){return rm(r)||(Ui(e),r&&r.response&&(r.response.data=Fi.call(e,e.transformResponse,r.response),r.response.headers=Re.from(r.response.headers))),Promise.reject(r)})}const um="1.13.4",ti={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{ti[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const Xc={};ti.transitional=function(t,n,r){function o(l,i){return"[Axios v"+um+"] Transitional option '"+l+"'"+i+(r?". "+r:"")}return(l,i,s)=>{if(t===!1)throw new z(o(i," has been removed"+(n?" in "+n:"")),z.ERR_DEPRECATED);return n&&!Xc[i]&&(Xc[i]=!0,console.warn(o(i," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(l,i,s):!0}};ti.spelling=function(t){return(n,r)=>(console.warn(`${r} is likely a misspelling of ${t}`),!0)};function D1(e,t,n){if(typeof e!="object")throw new z("options must be an object",z.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let o=r.length;for(;o-- >0;){const l=r[o],i=t[l];if(i){const s=e[l],a=s===void 0||i(s,l,e);if(a!==!0)throw new z("option "+l+" must be "+a,z.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new z("Unknown option "+l,z.ERR_BAD_OPTION)}}const Wo={assertOptions:D1,validators:ti},et=Wo.validators;let Zt=class{constructor(t){this.defaults=t||{},this.interceptors={request:new Dc,response:new Dc}}async request(t,n){try{return await this._request(t,n)}catch(r){if(r instanceof Error){let o={};Error.captureStackTrace?Error.captureStackTrace(o):o=new Error;const l=o.stack?o.stack.replace(/^.+\n/,""):"";try{r.stack?l&&!String(r.stack).endsWith(l.replace(/^.+\n.+\n/,""))&&(r.stack+=`
`+l):r.stack=l}catch{}}throw r}}_request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=sn(this.defaults,n);const{transitional:r,paramsSerializer:o,headers:l}=n;r!==void 0&&Wo.assertOptions(r,{silentJSONParsing:et.transitional(et.boolean),forcedJSONParsing:et.transitional(et.boolean),clarifyTimeoutError:et.transitional(et.boolean)},!1),o!=null&&(S.isFunction(o)?n.paramsSerializer={serialize:o}:Wo.assertOptions(o,{encode:et.function,serialize:et.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),Wo.assertOptions(n,{baseUrl:et.spelling("baseURL"),withXsrfToken:et.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let i=l&&S.merge(l.common,l[n.method]);l&&S.forEach(["delete","get","head","post","put","patch","common"],g=>{delete l[g]}),n.headers=Re.concat(i,l);const s=[];let a=!0;this.interceptors.request.forEach(function(v){typeof v.runWhen=="function"&&v.runWhen(n)===!1||(a=a&&v.synchronous,s.unshift(v.fulfilled,v.rejected))});const u=[];this.interceptors.response.forEach(function(v){u.push(v.fulfilled,v.rejected)});let c,f=0,m;if(!a){const g=[Yc.bind(this),void 0];for(g.unshift(...s),g.push(...u),m=g.length,c=Promise.resolve(n);f<m;)c=c.then(g[f++],g[f++]);return c}m=s.length;let w=n;for(;f<m;){const g=s[f++],v=s[f++];try{w=g(w)}catch(x){v.call(this,x);break}}try{c=Yc.call(this,w)}catch(g){return Promise.reject(g)}for(f=0,m=u.length;f<m;)c=c.then(u[f++],u[f++]);return c}getUri(t){t=sn(this.defaults,t);const n=lm(t.baseURL,t.url,t.allowAbsoluteUrls);return em(n,t.params,t.paramsSerializer)}};S.forEach(["delete","get","head","options"],function(t){Zt.prototype[t]=function(n,r){return this.request(sn(r||{},{method:t,url:n,data:(r||{}).data}))}});S.forEach(["post","put","patch"],function(t){function n(r){return function(l,i,s){return this.request(sn(s||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:l,data:i}))}}Zt.prototype[t]=n(),Zt.prototype[t+"Form"]=n(!0)});let F1=class cm{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(l){n=l});const r=this;this.promise.then(o=>{if(!r._listeners)return;let l=r._listeners.length;for(;l-- >0;)r._listeners[l](o);r._listeners=null}),this.promise.then=o=>{let l;const i=new Promise(s=>{r.subscribe(s),l=s}).then(o);return i.cancel=function(){r.unsubscribe(l)},i},t(function(l,i,s){r.reason||(r.reason=new to(l,i,s),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const t=new AbortController,n=r=>{t.abort(r)};return this.subscribe(n),t.signal.unsubscribe=()=>this.unsubscribe(n),t.signal}static source(){let t;return{token:new cm(function(o){t=o}),cancel:t}}};function U1(e){return function(n){return e.apply(null,n)}}function j1(e){return S.isObject(e)&&e.isAxiosError===!0}const Ks={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511,WebServerIsDown:521,ConnectionTimedOut:522,OriginIsUnreachable:523,TimeoutOccurred:524,SslHandshakeFailed:525,InvalidSslCertificate:526};Object.entries(Ks).forEach(([e,t])=>{Ks[t]=e});function fm(e){const t=new Zt(e),n=Wp(Zt.prototype.request,t);return S.extend(n,Zt.prototype,t,{allOwnKeys:!0}),S.extend(n,t,null,{allOwnKeys:!0}),n.create=function(o){return fm(sn(e,o))},n}const q=fm(eo);q.Axios=Zt;q.CanceledError=to;q.CancelToken=F1;q.isCancel=rm;q.VERSION=um;q.toFormData=ei;q.AxiosError=z;q.Cancel=q.CanceledError;q.all=function(t){return Promise.all(t)};q.spread=U1;q.isAxiosError=j1;q.mergeConfig=sn;q.AxiosHeaders=Re;q.formToJSON=e=>nm(S.isHTMLForm(e)?new FormData(e):e);q.getAdapter=am.getAdapter;q.HttpStatusCode=Ks;q.default=q;const{Axios:uw,AxiosError:cw,CanceledError:fw,isCancel:dw,CancelToken:pw,VERSION:mw,all:hw,Cancel:gw,isAxiosError:yw,spread:vw,toFormData:ww,AxiosHeaders:xw,HttpStatusCode:Ew,formToJSON:Sw,getAdapter:kw,mergeConfig:Cw}=q,ni=q.create({baseURL:"https://rate-my-prof.onrender.com/api"});async function dm(e){const t=e?{college:e}:{};return(await ni.get("/professors",{params:t})).data}async function pm(e){return(await ni.get(`/professors/${e}`)).data}async function B1(e,t){return(await ni.post(`/professors/${e}/rate`,t)).data}async function $1(e,t){return(await ni.post(`/professors/${e}/message`,{message:t})).data}const Vo=Jl("professors/loadAll",async(e,{rejectWithValue:t})=>{try{const n=await dm(e);return Array.isArray(n)?n:n.professors||[]}catch(n){return t(n.message)}}),zn=Jl("professors/loadOne",async(e,{rejectWithValue:t})=>{try{const n=await pm(e);return{professor:n.prof||n,messages:n.messages||[]}}catch(n){return t(n.message)}}),Ho=Jl("professors/submitRating",async({id:e,rating:t},{rejectWithValue:n})=>{try{await B1(e,{categories:{score:t},comment:""});const r=await pm(e);return{professor:r.prof||r,messages:r.messages||[]}}catch(r){return n(r.message)}}),mm=$p({name:"professors",initialState:{list:[],currentProfessor:null,currentMessages:[],loading:!1,professorLoading:!1,submittingRating:!1,error:null,scrollPosition:0,listLoaded:!1},reducers:{setScrollPosition:(e,t)=>{e.scrollPosition=t.payload},clearCurrentProfessor:e=>{e.currentProfessor=null,e.currentMessages=[],e.professorLoading=!0},updateProfessorOptimistically:(e,t)=>{var i;const{id:n,avgRating:r,ratingCount:o}=t.payload,l=e.list.findIndex(s=>s._id===n);l!==-1&&(e.list[l].avgRating=r,e.list[l].ratingCount=o),((i=e.currentProfessor)==null?void 0:i._id)===n&&(e.currentProfessor.avgRating=r,e.currentProfessor.ratingCount=o)}},extraReducers:e=>{e.addCase(Vo.pending,t=>{t.listLoaded||(t.loading=!0),t.error=null}).addCase(Vo.fulfilled,(t,n)=>{t.loading=!1,t.list=n.payload,t.listLoaded=!0}).addCase(Vo.rejected,(t,n)=>{t.loading=!1,t.error=n.payload}).addCase(zn.pending,t=>{t.professorLoading=!0,t.error=null}).addCase(zn.fulfilled,(t,n)=>{t.professorLoading=!1,t.currentProfessor=n.payload.professor,t.currentMessages=n.payload.messages;const r=t.list.findIndex(o=>o._id===n.payload.professor._id);r!==-1&&(t.list[r]={...t.list[r],...n.payload.professor})}).addCase(zn.rejected,(t,n)=>{t.professorLoading=!1,t.error=n.payload}).addCase(Ho.pending,t=>{t.submittingRating=!0,t.error=null}).addCase(Ho.fulfilled,(t,n)=>{t.submittingRating=!1,t.currentProfessor=n.payload.professor,t.currentMessages=n.payload.messages;const r=t.list.findIndex(o=>o._id===n.payload.professor._id);r!==-1&&(t.list[r]={...t.list[r],...n.payload.professor})}).addCase(Ho.rejected,(t,n)=>{t.submittingRating=!1,t.error=n.payload})}}),{setScrollPosition:W1,clearCurrentProfessor:V1,updateProfessorOptimistically:H1}=mm.actions,Q1=mm.reducer,Qo=Jl("leaderboard/load",async(e,{rejectWithValue:t})=>{try{const n=await dm(),r=Array.isArray(n)?n:n.professors||[];console.log("Leaderboard - Total professors:",r.length),r.length>0&&console.log("Sample professor data:",{name:r[0].name,avgRating:r[0].avgRating,ratingCount:r[0].ratingCount,commentCount:r[0].commentCount});const o=[...r].filter(s=>s.avgRating!=null&&s.avgRating>0).sort((s,a)=>a.avgRating-s.avgRating).slice(0,10),l=[...r].filter(s=>(s.ratingCount||0)>0).sort((s,a)=>(a.ratingCount||0)-(s.ratingCount||0)).slice(0,10),i=[...r].filter(s=>(s.commentCount||0)>0).sort((s,a)=>(a.commentCount||0)-(s.commentCount||0)).slice(0,10);if(console.log("Leaderboard - By Avg Rating:",o.length,"professors"),console.log("Leaderboard - By Total Ratings:",l.length,"professors"),console.log("Leaderboard - By Comments:",i.length,"professors"),i.length>0)console.log("Top commented professor:",{name:i[0].name,commentCount:i[0].commentCount});else{console.log("No professors with comments found!");const s=r.filter(a=>a.commentCount>0);console.log("Professors with commentCount > 0:",s.length),s.length>0&&console.log("First professor with comments:",s[0])}return{byAvgRating:o,byTotalRatings:l,byComments:i}}catch(n){return console.error("Leaderboard load error:",n),t(n.message)}}),hm=$p({name:"leaderboard",initialState:{byAvgRating:[],byTotalRatings:[],byComments:[],loading:!1,error:null,previousByAvgRating:[],previousByTotalRatings:[],previousByComments:[]},reducers:{updateLeaderboardFromProfessors:(e,t)=>{const n=t.payload;console.log("Updating leaderboard from professors:",n.length),e.previousByAvgRating=e.byAvgRating,e.previousByTotalRatings=e.byTotalRatings,e.previousByComments=e.byComments,e.byAvgRating=[...n].filter(r=>r.avgRating!=null&&r.avgRating>0).sort((r,o)=>o.avgRating-r.avgRating).slice(0,10),e.byTotalRatings=[...n].filter(r=>(r.ratingCount||0)>0).sort((r,o)=>(o.ratingCount||0)-(r.ratingCount||0)).slice(0,10),e.byComments=[...n].filter(r=>(r.commentCount||0)>0).sort((r,o)=>(o.commentCount||0)-(r.commentCount||0)).slice(0,10),console.log("Updated byComments:",e.byComments.length,"professors")}},extraReducers:e=>{e.addCase(Qo.pending,t=>{t.loading=!0,t.error=null}).addCase(Qo.fulfilled,(t,n)=>{t.loading=!1,t.byAvgRating=n.payload.byAvgRating,t.byTotalRatings=n.payload.byTotalRatings,t.byComments=n.payload.byComments,console.log("Leaderboard loaded - byComments:",t.byComments.length)}).addCase(Qo.rejected,(t,n)=>{t.loading=!1,t.error=n.payload,console.error("Leaderboard loading failed:",n.payload)})}}),{updateLeaderboardFromProfessors:gm}=hm.actions,K1=hm.reducer,Y1=["😭","😠","😟","😕","😐","🙂","😊","😄","😁","🤩"],X1=`
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  .leaderboard-container {
    padding: 30px 20px 40px;
    max-width: 1400px;
    margin: 0 auto;
  }

  @media (min-width: 768px) {
    .leaderboard-container {
      padding: 40px 40px 60px;
    }
  }

  .leaderboard-header {
    text-align: center;
    margin-bottom: 40px;
  }

  .leaderboard-title {
    font-size: 32px;
    font-weight: 800;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 12px;
    letter-spacing: -1px;
  }

  @media (min-width: 768px) {
    .leaderboard-title {
      font-size: 48px;
    }
  }

  .leaderboard-subtitle {
    font-size: 14px;
    color: #6b7280;
    font-weight: 600;
  }

  @media (min-width: 768px) {
    .leaderboard-subtitle {
      font-size: 16px;
    }
  }

  .leaderboard-tabs {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 32px;
  }

  .tab-btn {
    background: #ffffff;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    padding: 12px 24px;
    font-size: 14px;
    font-weight: 700;
    color: #374151;
    cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: all 0.3s;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  @media (min-width: 768px) {
    .tab-btn {
      padding: 14px 32px;
      font-size: 15px;
    }
  }

  .tab-btn:hover {
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.2);
  }

  .tab-btn.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-color: #667eea;
    color: #ffffff;
    box-shadow: 0 6px 24px rgba(102, 126, 234, 0.4);
  }

  .leaderboard-list {
    background: #ffffff;
    border: 2px solid #e5e7eb;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  }

  @media (min-width: 768px) {
    .leaderboard-list {
      border-radius: 24px;
    }
  }

  .leaderboard-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 20px;
    border-bottom: 2px solid #f3f4f6;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    background: #ffffff;
  }

  @media (min-width: 768px) {
    .leaderboard-item {
      gap: 24px;
      padding: 20px 32px;
    }
  }

  .leaderboard-item:last-child {
    border-bottom: none;
  }

  .leaderboard-item:hover {
    background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
    transform: translateX(8px);
  }

  .leaderboard-item.moving-up {
    animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .leaderboard-item.moving-down {
    animation: slideDown 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .leaderboard-item.new-entry {
    animation: fadeInSlide 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @keyframes slideUp {
    0% {
      transform: translateY(50px);
      opacity: 0.5;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideDown {
    0% {
      transform: translateY(-50px);
      opacity: 0.5;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fadeInSlide {
    0% {
      transform: translateX(-50px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .rank-badge {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 800;
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  @media (min-width: 768px) {
    .rank-badge {
      width: 48px;
      height: 48px;
      font-size: 18px;
    }
  }

  .rank-badge.rank-1 {
    background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
    box-shadow: 0 4px 20px rgba(251, 191, 36, 0.5);
  }

  .rank-badge.rank-2 {
    background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
    box-shadow: 0 4px 20px rgba(148, 163, 184, 0.5);
  }

  .rank-badge.rank-3 {
    background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
    box-shadow: 0 4px 20px rgba(217, 119, 6, 0.5);
  }

  .rank-badge.rank-other {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .prof-avatar {
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    border-radius: 12px;
    overflow: hidden;
    background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
    border: 2px solid #e5e7eb;
  }

  @media (min-width: 768px) {
    .prof-avatar {
      width: 60px;
      height: 60px;
    }
  }

  .prof-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .prof-avatar-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .prof-avatar-placeholder svg {
    width: 24px;
    height: 24px;
    color: #667eea;
    opacity: 0.4;
  }

  @media (min-width: 768px) {
    .prof-avatar-placeholder svg {
      width: 28px;
      height: 28px;
    }
  }

  .prof-info {
    flex: 1;
    min-width: 0;
  }

  .prof-name {
    font-size: 15px;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (min-width: 768px) {
    .prof-name {
      font-size: 17px;
    }
  }

  .prof-dept {
    font-size: 12px;
    color: #6b7280;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (min-width: 768px) {
    .prof-dept {
      font-size: 13px;
    }
  }

  .stat-display {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
  }

  .stat-value {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 18px;
    font-weight: 800;
    color: #667eea;
  }

  @media (min-width: 768px) {
    .stat-value {
      font-size: 22px;
    }
  }

  .stat-value .mood {
    font-size: 20px;
  }

  @media (min-width: 768px) {
    .stat-value .mood {
      font-size: 24px;
    }
  }

  .stat-label {
    font-size: 10px;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 700;
  }

  @media (min-width: 768px) {
    .stat-label {
      font-size: 11px;
    }
  }

  .empty-state {
    text-align: center;
    padding: 60px 20px;
    color: #6b7280;
  }

  @media (min-width: 768px) {
    .empty-state {
      padding: 80px 40px;
    }
  }

  .empty-state h3 {
    font-size: 18px;
    color: #374151;
    margin-bottom: 8px;
    font-weight: 700;
  }

  @media (min-width: 768px) {
    .empty-state h3 {
      font-size: 20px;
    }
  }

  .empty-state p {
    font-size: 13px;
    color: #6b7280;
  }

  @media (min-width: 768px) {
    .empty-state p {
      font-size: 14px;
    }
  }

  .movement-indicator {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    animation: bounce 1s ease-in-out infinite;
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(-50%);
    }
    50% {
      transform: translateY(-60%);
    }
  }
`;function J1(){const e=Xr(),[t,n]=R.useState("avgRating"),[r,o]=R.useState({}),l=Mr(f=>f.leaderboard);Mr(f=>f.professors.list);const i=()=>{switch(t){case"avgRating":return l.byAvgRating;case"totalRatings":return l.byTotalRatings;case"comments":return l.byComments;default:return[]}},s=()=>{switch(t){case"avgRating":return l.previousByAvgRating;case"totalRatings":return l.previousByTotalRatings;case"comments":return l.previousByComments;default:return[]}};R.useEffect(()=>{const f=i(),m=s();if(f.length===0||m.length===0)return;const w={};f.forEach((v,x)=>{const h=m.findIndex(p=>p._id===v._id);h===-1?w[v._id]="new-entry":h>x?w[v._id]="moving-up":h<x&&(w[v._id]="moving-down")}),o(w);const g=setTimeout(()=>{o({})},600);return()=>clearTimeout(g)},[l,t]);const a=f=>{e(`/prof/${f}`)},u=f=>{var m;switch(t){case"avgRating":const w=f.avgRating?Y1[Math.round(f.avgRating)-1]:null;return d.createElement("div",{className:"stat-display"},d.createElement("div",{className:"stat-value"},((m=f.avgRating)==null?void 0:m.toFixed(1))||"—",w&&d.createElement("span",{className:"mood"},w)),d.createElement("div",{className:"stat-label"},"Avg Rating"));case"totalRatings":return d.createElement("div",{className:"stat-display"},d.createElement("div",{className:"stat-value"},f.ratingCount||0),d.createElement("div",{className:"stat-label"},"Total Ratings"));case"comments":return d.createElement("div",{className:"stat-display"},d.createElement("div",{className:"stat-value"},f.commentCount||0),d.createElement("div",{className:"stat-label"},"Comments"));default:return null}},c=i();return d.createElement("div",{className:"leaderboard-container"},d.createElement("style",null,X1),d.createElement("div",{className:"leaderboard-header"},d.createElement("h2",{className:"leaderboard-title"},"🏆 Leaderboard"),d.createElement("p",{className:"leaderboard-subtitle"},"Top professors ranked by ratings and engagement")),d.createElement("div",{className:"leaderboard-tabs"},d.createElement("button",{className:`tab-btn ${t==="avgRating"?"active":""}`,onClick:()=>n("avgRating")},"⭐ Highest Rated"),d.createElement("button",{className:`tab-btn ${t==="totalRatings"?"active":""}`,onClick:()=>n("totalRatings")},"📊 Most Ratings"),d.createElement("button",{className:`tab-btn ${t==="comments"?"active":""}`,onClick:()=>n("comments")},"💬 Most Discussed")),d.createElement("div",{className:"leaderboard-list"},c.length===0?d.createElement("div",{className:"empty-state"},d.createElement("h3",null,"No data yet"),d.createElement("p",null,"Be the first to rate professors!")):c.map((f,m)=>{const w=m===0?"rank-1":m===1?"rank-2":m===2?"rank-3":"rank-other",g=r[f._id]||"";return d.createElement("div",{key:f._id,className:`leaderboard-item ${g}`,onClick:()=>a(f._id)},d.createElement("div",{className:`rank-badge ${w}`},m===0?"🥇":m===1?"🥈":m===2?"🥉":m+1),d.createElement("div",{className:"prof-avatar"},f.photoUrl?d.createElement("img",{src:f.photoUrl,alt:f.name}):d.createElement("div",{className:"prof-avatar-placeholder"},d.createElement("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5"},d.createElement("circle",{cx:"12",cy:"8",r:"4"}),d.createElement("path",{d:"M4 20c0-4 4-6 8-6s8 2 8 6"})))),d.createElement("div",{className:"prof-info"},d.createElement("div",{className:"prof-name"},f.name),f.department&&d.createElement("div",{className:"prof-dept"},f.department)),u(f))})))}const Jc={home:[{_id:"1",title:"Chargeback.io",description:"Prevent chargebacks on autopilot",linkUrl:"https://www.chargeback.io/",position:"left",bgColor:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",logoUrl:"https://via.placeholder.com/40x40?text=C"},{_id:"2",title:"Devbox",description:"Instant dev environments with open source",linkUrl:"https://devbox.gg/ui/",position:"left",bgColor:"linear-gradient(135deg, #065f46 0%, #064e3b 100%)",logoUrl:"https://via.placeholder.com/40x40?text=D"},{_id:"3",title:"ZeroLeaks",description:"Red-team your AI agents for prompt injection",linkUrl:"https://zeroleaks.ai/",position:"right",bgColor:"linear-gradient(135deg, #1f2937 0%, #111827 100%)",logoUrl:"https://via.placeholder.com/40x40?text=Z"}],"IIT ISM Dhanbad":[{_id:"4",title:"Chargeback.io",description:"Prevent chargebacks on autopilot",linkUrl:"https://www.chargeback.io/",position:"left",bgColor:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",logoUrl:"https://via.placeholder.com/40x40?text=C"},{_id:"5",title:"ZeroLeaks",description:"Red-team your AI agents for prompt injection",linkUrl:"https://zeroleaks.ai/",position:"right",bgColor:"linear-gradient(135deg, #1f2937 0%, #111827 100%)",logoUrl:"https://via.placeholder.com/40x40?text=Z"}],"IIT Madras":[{_id:"6",title:"GetLate.dev",description:"Find warm leads and book sales calls automatically",linkUrl:"https://getlate.dev/",position:"left",bgColor:"linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",logoUrl:"https://via.placeholder.com/40x40?text=G"},{_id:"7",title:"Devbox",description:"Instant dev environments with open source",linkUrl:"https://devbox.gg/ui/",position:"right",bgColor:"linear-gradient(135deg, #065f46 0%, #064e3b 100%)",logoUrl:"https://via.placeholder.com/40x40?text=D"}]};function qc({ad:e,isPlaceholder:t=!1,placeholderColor:n="#ccc",isHorizontal:r=!1}){const o={display:"flex",flexDirection:r?"row":"column",alignItems:"center",justifyContent:"center",padding:r?"0.25rem 0.5rem":"0.5rem",borderRadius:r?"999px":"0.5rem",textDecoration:"none",minHeight:r?"32px":"120px",width:r?"120px":"140px",flex:r?"0 0 auto":"none",color:"#fff",transition:"transform 0.15s ease",boxShadow:r?"0 3px 8px rgba(0,0,0,0.15)":"0 10px 15px rgba(0, 0, 0, 0.1)",border:t?`2px dashed ${n}`:"none",background:t?"rgba(0, 0, 0, 0.5)":e.bgColor||"rgba(0,0,0,0.05)",position:"relative",scrollSnapAlign:r?"start":"auto"};return t?d.createElement("div",{style:o},d.createElement("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.5)",borderRadius:"0.5rem"}}),d.createElement("div",{style:{position:"relative",zIndex:1,textAlign:"center"}},d.createElement("div",{style:{fontSize:"0.875rem",fontWeight:"bold",marginBottom:"0.25rem",color:"#fff"}},"Your ad goes here"))):d.createElement("a",{href:e.linkUrl||"#",target:e.linkUrl&&e.linkUrl!=="#"?"_blank":"_self",rel:"noopener noreferrer",style:o},e.logoUrl?d.createElement("img",{src:e.logoUrl,alt:e.title,style:{width:r?"24px":"30px",height:r?"24px":"30px",borderRadius:"6px",marginRight:r?"0.5rem":"0",marginBottom:r?"0":"0.5rem"}}):d.createElement("div",{style:{width:r?"24px":"30px",height:r?"24px":"30px",borderRadius:"6px",marginRight:r?"0.5rem":"0",marginBottom:r?"0":"0.5rem",background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:r?"13px":"15px",fontWeight:"bold",color:"#fff"}},e.title.charAt(0).toUpperCase()),d.createElement("div",{style:{textAlign:r?"left":"center"}},d.createElement("div",{style:{fontSize:r?"0.75rem":"0.875rem",fontWeight:"bold",marginBottom:r?"0":"0.25rem",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}},e.title),!r&&d.createElement("div",{style:{fontSize:"0.75rem",opacity:.9}},e.description)))}function Gc({children:e,style:t,className:n}){const r=d.useRef(null),o=d.useRef(!1),l=d.useRef();return d.useEffect(()=>{const i=r.current;if(!i)return;const s=()=>i.scrollWidth/2;let a=0,u=performance.now();const c=m=>{const w=m-u;if(u=m,!o.current){i.scrollLeft+=w*.04;const v=s();i.scrollLeft>=v&&(i.scrollLeft-=v)}a=requestAnimationFrame(c)},f=()=>{o.current=!0,window.clearTimeout(l.current),l.current=window.setTimeout(()=>{o.current=!1},1200)};return i.addEventListener("scroll",f,{passive:!0}),a=requestAnimationFrame(c),()=>{cancelAnimationFrame(a),i.removeEventListener("scroll",f),window.clearTimeout(l.current)}},[]),d.createElement("div",{ref:r,className:n,style:{...t,overflowX:"auto",overflowY:"hidden",scrollBehavior:"smooth"}},e)}function Nt({page:e="home",position:t="left",horizontal:n=!1}){const o=(Jc[e]||Jc.home||[]).filter(f=>f.position===t),l=5,i=["#ff6b6b","#4ecdc4","#45b7d1","#f9ca24","#f0932b"],s=[];for(let f=0;f<l;f++)f<o.length?s.push(d.createElement(qc,{key:o[f]._id,ad:o[f],isHorizontal:n})):s.push(d.createElement(qc,{key:`placeholder-${f}`,isPlaceholder:!0,placeholderColor:i[f-o.length],isHorizontal:n}));const a=[];n?a.push(...s):a.push(...s);const u=t==="left",c={position:"fixed",zIndex:9999,display:"flex",gap:"0.75rem",padding:"0.5rem",maxWidth:"100%",...n?{bottom:0,left:0,right:0,flexDirection:"row",overflowX:"auto"}:{top:"50%",transform:"translateY(-50%)",flexDirection:"column",left:u?"20px":"auto",right:u?"auto":"20px"}};if(n){const f={display:"flex",alignItems:"center",gap:"10px",padding:"0 10px",width:"max-content",whiteSpace:"nowrap"},m={position:"fixed",left:0,right:0,zIndex:9999,background:"rgba(15, 23, 42, 0.75)",backdropFilter:"blur(12px)",padding:"6px 0",overflow:"hidden",border:"1px solid rgba(255, 255, 255, 0.25)",borderRadius:"999px"},w=[...a,...a];return d.createElement(d.Fragment,null,d.createElement("aside",{style:{...m,top:0}},d.createElement(Gc,{className:"ad-scroll",style:f},w)),d.createElement("aside",{style:{...m,bottom:0}},d.createElement(Gc,{className:"ad-scroll",style:f},w)))}return d.createElement("aside",{style:c,className:"bg-transparent"},d.createElement("div",{className:"text-xs uppercase tracking-wider text-gray-200 mb-2 whitespace-nowrap",style:{color:"rgba(203, 213, 225, 0.9)"}},"Sponsored"),a)}const q1=R.memo(({p:e})=>{const t=e;console.log(`Professor ${e.name} has average rating:`,t);const n=t>=8?"#22c55e":t>=5?"#f59e0b":t>0?"#ef4444":null;return d.createElement(my,{to:`/prof/${e._id}`,className:"prof-card"},d.createElement("div",{className:"card-img-wrap"},e.photoUrl?d.createElement("img",{src:e.photoUrl,alt:e.name,loading:"lazy"}):d.createElement("div",{className:"card-placeholder"},d.createElement("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5"},d.createElement("circle",{cx:"12",cy:"8",r:"4"}),d.createElement("path",{d:"M4 20c0-4 4-6 8-6s8 2 8 6"}))),d.createElement("div",{className:"rating-badge",style:n?{background:n+"22",borderColor:n+"55"}:{}},t!=null&&t>0?d.createElement(d.Fragment,null,d.createElement("span",{className:"star",style:n?{color:n}:{}},"★"),d.createElement("span",{style:n?{color:n}:{}},t.toFixed(1)),d.createElement("span",{style:{fontSize:11,color:"#9ca3af",fontWeight:600}},"/10")):d.createElement("span",{className:"no-rating"},"No ratings"))),d.createElement("div",{className:"card-body"},d.createElement("div",{className:"card-name"},e.name),e.department&&d.createElement("div",{className:"card-dept"},e.department)))});function G1(){var E,k;const e=gp(),t=Yr(),n=Xr(),r=((E=t.state)==null?void 0:E.collegeName)||localStorage.getItem("selectedCollegeName")||"IIT ISM Dhanbad",o=((k=t.state)==null?void 0:k.collegeId)||localStorage.getItem("selectedCollegeId")||"iit-ism";d.useEffect(()=>{localStorage.setItem("selectedCollegeId",o),localStorage.setItem("selectedCollegeName",r)},[o,r]);const{list:l,loading:i,error:s,scrollPosition:a}=Mr(C=>C.professors),[u,c]=R.useState(""),[f,m]=R.useState("All"),[w,g]=R.useState(40),v=R.useRef(null);R.useEffect(()=>{e(Vo(r)),e(Qo())},[e,r]),R.useEffect(()=>{l.length>0&&e(gm(l))},[l,e]),R.useEffect(()=>{a&&v.current&&setTimeout(()=>window.scrollTo(0,a),0)},[a]),R.useEffect(()=>{const C=()=>e(W1(window.scrollY));return window.addEventListener("scroll",C),()=>window.removeEventListener("scroll",C)},[e]);const x=R.useMemo(()=>{const C=new Set(l.map(_=>_.department).filter(Boolean));return["All",...Array.from(C).sort()]},[l]),h=R.useMemo(()=>{const C=u.toLowerCase().trim();return l.filter(_=>{const P=!C||_.name.toLowerCase().includes(C),L=f==="All"||_.department===f,T=_.college===r;return P&&L&&T})},[l,u,f,r]),p=R.useMemo(()=>{if(f!=="All")return[{dept:f,profs:h.slice(0,w)}];const C={};return h.forEach(_=>{const P=_.department||"Other";C[P]||(C[P]=[]),C[P].push(_)}),Object.keys(C).sort().map(_=>({dept:_,profs:C[_]}))},[h,f,w]),y=p.reduce((C,_)=>C+_.profs.length,0);return d.createElement("div",{className:"prof-list-root",ref:v},d.createElement("div",{className:"mobile-ads-top"},d.createElement(Nt,{page:r,position:"left",horizontal:!0})),d.createElement("div",{className:"prof-list-layout"},d.createElement("div",{className:"prof-sidebar prof-sidebar--left"},d.createElement(Nt,{page:r,position:"left"})),d.createElement("div",{className:"prof-main"},d.createElement("div",{className:"hero"},d.createElement("div",{className:"hero-content"},d.createElement("button",{className:"back-link",onClick:()=>n("/")},d.createElement("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5"},d.createElement("path",{d:"M19 12H5M12 19l-7-7 7-7"})),"Change College"),d.createElement("div",{className:"hero-title-row"},d.createElement("h1",{className:"hero-title"},"Rate My Prof"),d.createElement("span",{className:"college-badge"},r)),d.createElement("p",{className:"hero-sub"},"Anonymous ratings & reviews for ",r," faculty"),d.createElement("div",{className:"search-wrap"},d.createElement("svg",{className:"search-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round"},d.createElement("circle",{cx:"11",cy:"11",r:"8"}),d.createElement("line",{x1:"21",y1:"21",x2:"16.65",y2:"16.65"})),d.createElement("input",{className:"search-input",type:"text",placeholder:"Search professors by name…",value:u,onChange:C=>{c(C.target.value),g(40)}})),d.createElement("div",{className:"count-badge"},"Showing ",d.createElement("span",null,y)," of"," ",d.createElement("span",null,h.length)," professors"))),x.length>1&&d.createElement("div",{className:"dept-filter-wrap"},d.createElement("div",{className:"dept-filter"},x.map(C=>d.createElement("button",{key:C,className:`dept-pill${f===C?" dept-pill--active":""}`,onClick:()=>{m(C),g(40)}},C)))),d.createElement("div",{className:"promo-banner"},d.createElement("p",{className:"promo-text"},"Planning trips with friends? We built TripiiTrip to split expenses, plan routes & travel together 👀"," ",d.createElement("a",{href:"https://tripii-trip-psi.vercel.app/",target:"_blank",rel:"noopener noreferrer",className:"promo-link"},"tripiitrip.com →"))),d.createElement(J1,null),i?d.createElement("div",{className:"loading-state"},d.createElement("div",{className:"loader"}),d.createElement("div",{className:"loading-text"},"Loading professors…")):s?d.createElement("div",{className:"empty-state"},d.createElement("h3",null,"Error"),d.createElement("p",null,s)):h.length===0?d.createElement("div",{className:"empty-state"},d.createElement("h3",null,l.length===0?"No professors loaded":"No results found"),d.createElement("p",null,l.length===0?"Run the scraper first.":`No professor matching "${u}"`)):d.createElement(d.Fragment,null,p.map(({dept:C,profs:_})=>d.createElement("div",{key:C,className:"dept-section"},d.createElement("div",{className:"dept-heading"},d.createElement("span",{className:"dept-name"},C),d.createElement("span",{className:"dept-count"},_.length," prof",_.length!==1?"s":"")),d.createElement("div",{className:"prof-grid"},_.map(P=>d.createElement(q1,{key:P._id,p:P}))))),f==="All"&&y<h.length&&d.createElement("div",{className:"load-more-wrap"},d.createElement("button",{className:"load-more-btn",onClick:()=>g(C=>C+40)},"Load More Professors")))),d.createElement("div",{className:"prof-sidebar prof-sidebar--right"},d.createElement(Nt,{page:r,position:"right"}))),d.createElement("div",{className:"mobile-ads-bottom"},d.createElement(Nt,{page:r,position:"right",horizontal:!0})))}const ji=["😭","😠","😟","😕","😐","🙂","😊","😄","😁","🤩"],Zc=`
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body {
    background: #f5f7fa;
    color: #1a1a2e;
    font-family: 'Plus Jakarta Sans', sans-serif;
    min-height: 100vh;
  }

  .prof-page {
    min-height: 100vh;
    background: #f5f7fa;
  }

  /* Top nav */
  .top-nav {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.2);
  }
  
  @media (min-width: 768px) {
    .top-nav {
      gap: 16px;
      padding: 20px 40px;
    }
  }
  
  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    padding: 8px 16px;
    border-radius: 12px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: all 0.3s;
    backdrop-filter: blur(10px);
  }
  
  @media (min-width: 768px) {
    .back-btn {
      gap: 8px;
      font-size: 15px;
      padding: 10px 20px;
    }
  }
  
  .back-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateX(-4px);
  }
  
  .back-btn svg {
    width: 16px;
    height: 16px;
  }
  
  @media (min-width: 768px) {
    .back-btn svg {
      width: 18px;
      height: 18px;
    }
  }

  /* Profile hero */
  .profile-hero {
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: flex-start;
    padding: 40px 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
    overflow: hidden;
  }
  
  @media (min-width: 768px) {
    .profile-hero {
      flex-direction: row;
      gap: 40px;
      padding: 60px 40px;
    }
  }
  
  .profile-hero::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 400px;
    height: 400px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    animation: float 8s ease-in-out infinite;
  }
  
  @media (min-width: 768px) {
    .profile-hero::before {
      width: 600px;
      height: 600px;
    }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-30px) rotate(10deg); }
  }
  
  .prof-photo-wrap {
    position: relative;
    flex-shrink: 0;
    width: 160px;
    height: 160px;
    border-radius: 24px;
    overflow: hidden;
    background: #ffffff;
    border: 4px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    z-index: 1;
    align-self: center;
  }
  
  @media (min-width: 768px) {
    .prof-photo-wrap {
      width: 220px;
      height: 220px;
      border-radius: 28px;
      align-self: flex-start;
    }
  }
  
  .prof-photo-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .prof-photo-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .prof-photo-placeholder svg {
    width: 60px;
    height: 60px;
    color: #667eea;
    opacity: 0.4;
  }
  
  @media (min-width: 768px) {
    .prof-photo-placeholder svg {
      width: 80px;
      height: 80px;
    }
  }

  .profile-info {
    flex: 1;
    position: relative;
    z-index: 1;
  }
  
  .profile-name {
    font-size: 32px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -1px;
    line-height: 1.2;
    margin-bottom: 8px;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  @media (min-width: 768px) {
    .profile-name {
      font-size: 44px;
    }
  }
  
  .profile-meta {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 24px;
  }

  @media (min-width: 768px) {
    .profile-meta {
      flex-direction: row;
      align-items: center;
      gap: 16px;
      margin-bottom: 28px;
    }
  }

  .profile-college, .profile-dept {
    font-size: 13px;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(255, 255, 255, 0.1);
    padding: 6px 12px;
    border-radius: 8px;
  }
  
  @media (min-width: 768px) {
    .profile-college, .profile-dept {
      font-size: 15px;
      padding: 8px 14px;
      border-radius: 10px;
    }
  }

  .profile-college svg, .profile-dept svg {
    width: 16px;
    height: 16px;
    opacity: 0.8;
  }

  /* Average rating display */
  .avg-rating-row {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }
  
  @media (min-width: 768px) {
    .avg-rating-row {
      gap: 24px;
    }
  }
  
  .avg-box {
    background: rgba(255, 255, 255, 0.95);
    border: 3px solid rgba(255, 255, 255, 0.5);
    border-radius: 18px;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(10px);
  }
  
  @media (min-width: 768px) {
    .avg-box {
      border-radius: 20px;
      padding: 20px 28px;
      gap: 20px;
    }
  }
  
  .avg-number-wrap {
    text-align: center;
  }
  
  .avg-number {
    font-size: 36px;
    font-weight: 800;
    color: #667eea;
    line-height: 1;
  }
  
  @media (min-width: 768px) {
    .avg-number {
      font-size: 48px;
    }
  }
  
  .avg-label {
    font-size: 10px;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 6px;
    font-weight: 700;
  }
  
  @media (min-width: 768px) {
    .avg-label {
      font-size: 11px;
    }
  }
  
  .avg-stars-wrap {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .avg-stars {
    display: flex;
    gap: 3px;
  }
  
  @media (min-width: 768px) {
    .avg-stars {
      gap: 4px;
    }
  }
  
  .avg-stars span {
    font-size: 18px;
    transition: transform 0.2s;
  }
  
  @media (min-width: 768px) {
    .avg-stars span {
      font-size: 22px;
    }
  }
  
  .avg-stars span:hover {
    transform: scale(1.2);
  }
  
  .avg-count {
    font-size: 11px;
    color: #6b7280;
    text-align: center;
    font-weight: 600;
  }
  
  @media (min-width: 768px) {
    .avg-count {
      font-size: 12px;
    }
  }
  
  .avg-mood {
    font-size: 28px;
  }
  
  @media (min-width: 768px) {
    .avg-mood {
      font-size: 36px;
    }
  }

  /* Content sections */
  .content-wrap {
    padding: 30px 20px 40px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  @media (min-width: 1024px) {
    .content-wrap {
      flex-direction: row;
      padding: 40px 40px 60px;
      gap: 40px;
    }
  }
  
  .col-main {
    flex: 1;
    min-width: 0;
  }
  
  .col-side {
    width: 100%;
    flex-shrink: 0;
  }
  
  @media (min-width: 1024px) {
    .col-side {
      width: 420px;
    }
  }

  /* Section headers */
  .section-head {
    font-size: 13px;
    font-weight: 700;
    color: #374151;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  @media (min-width: 768px) {
    .section-head {
      font-size: 14px;
      margin-bottom: 20px;
      gap: 12px;
    }
  }
  
  .section-head .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    box-shadow: 0 0 16px rgba(102, 126, 234, 0.6);
    animation: pulse-dot 2s ease-in-out infinite;
  }
  
  @media (min-width: 768px) {
    .section-head .dot {
      width: 10px;
      height: 10px;
    }
  }
  
  @keyframes pulse-dot {
    0%, 100% {
      box-shadow: 0 0 16px rgba(102, 126, 234, 0.6);
    }
    50% {
      box-shadow: 0 0 24px rgba(102, 126, 234, 1);
    }
  }

  /* Chat */
  .chat-box {
    background: #ffffff;
    border: 2px solid #e5e7eb;
    border-radius: 18px;
    overflow: hidden;
    height: 400px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  }
  
  @media (min-width: 768px) {
    .chat-box {
      border-radius: 20px;
      height: 450px;
    }
  }
  
  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  @media (min-width: 768px) {
    .chat-messages {
      padding: 24px;
      gap: 14px;
    }
  }
  
  .chat-msg {
    background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    padding: 12px 16px;
    transition: all 0.3s;
  }
  
  @media (min-width: 768px) {
    .chat-msg {
      border-radius: 14px;
      padding: 14px 18px;
    }
  }
  
  .chat-msg:hover {
    background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
    border-color: #c7d2fe;
    transform: translateX(4px);
  }
  
  .chat-msg-time {
    font-size: 10px;
    color: #9ca3af;
    margin-bottom: 6px;
    font-weight: 600;
  }
  
  @media (min-width: 768px) {
    .chat-msg-time {
      font-size: 11px;
    }
  }
  
  .chat-msg-text {
    font-size: 13px;
    color: #374151;
    line-height: 1.6;
    font-weight: 500;
  }
  
  @media (min-width: 768px) {
    .chat-msg-text {
      font-size: 14px;
    }
  }
  
  .chat-empty {
    color: #9ca3af;
    font-size: 14px;
    text-align: center;
    padding: 60px 20px;
    font-weight: 600;
  }
  
  @media (min-width: 768px) {
    .chat-empty {
      font-size: 15px;
      padding: 80px 24px;
    }
  }

  .chat-input-row {
    display: flex;
    gap: 10px;
    padding: 16px;
    border-top: 2px solid #e5e7eb;
    background: #f9fafb;
  }
  
  @media (min-width: 768px) {
    .chat-input-row {
      gap: 12px;
      padding: 20px;
    }
  }
  
  .chat-input {
    flex: 1;
    background: #ffffff;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    padding: 12px 16px;
    color: #1a1a2e;
    font-size: 13px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 500;
    outline: none;
    transition: all 0.3s;
  }
  
  @media (min-width: 768px) {
    .chat-input {
      border-radius: 14px;
      padding: 14px 18px;
      font-size: 14px;
    }
  }
  
  .chat-input::placeholder {
    color: #9ca3af;
  }
  
  .chat-input:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  }
  
  .send-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 12px;
    padding: 12px 20px;
    color: #ffffff;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: all 0.3s;
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
  }
  
  @media (min-width: 768px) {
    .send-btn {
      border-radius: 14px;
      padding: 14px 28px;
      font-size: 14px;
    }
  }
  
  .send-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(102, 126, 234, 0.5);
  }
  
  .send-btn:active {
    transform: translateY(0);
  }

  /* Rating panel */
  .rating-panel {
    background: #ffffff;
    border: 2px solid #e5e7eb;
    border-radius: 18px;
    padding: 24px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  }
  
  @media (min-width: 768px) {
    .rating-panel {
      border-radius: 20px;
      padding: 32px;
    }
  }

  /* Star selector */
  .star-selector {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    justify-content: center;
    margin: 16px 0 10px;
  }
  
  @media (min-width: 768px) {
    .star-selector {
      gap: 8px;
      margin: 18px 0 10px;
    }
  }
  
  .star-btn {
    max-width: 50px;
    aspect-ratio: 1;
    border-radius: 10px;
    border: 2px solid #e5e7eb;
    background: #f9fafb;
    color: #374151;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  
  @media (min-width: 768px) {
    .star-btn {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      font-size: 16px;
    }
  }
  
  .star-btn:hover:not(:disabled) {
    border-color: #667eea;
    background: #ede9fe;
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
  }
  
  .star-btn:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  .star-btn.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-color: #667eea;
    color: #ffffff;
    box-shadow: 0 6px 24px rgba(102, 126, 234, 0.5);
    transform: scale(1.1);
  }
  
  .star-label-row {
    display: flex;
    justify-content: space-between;
    padding: 0 6px;
  }
  
  .star-label {
    font-size: 10px;
    color: #9ca3af;
    font-weight: 700;
  }
  
  @media (min-width: 768px) {
    .star-label {
      font-size: 11px;
    }
  }

  /* Mood display */
  .mood-display {
    text-align: center;
    margin: 16px 0 12px;
    font-size: 48px;
    transition: transform 0.3s;
  }
  
  @media (min-width: 768px) {
    .mood-display {
      margin: 20px 0 12px;
      font-size: 56px;
    }
  }
  
  .mood-label {
    text-align: center;
    font-size: 13px;
    color: #6b7280;
    margin-bottom: 8px;
    font-weight: 600;
  }
  
  @media (min-width: 768px) {
    .mood-label {
      font-size: 14px;
    }
  }
  
  .selected-score {
    text-align: center;
    font-size: 13px;
    color: #6b7280;
    margin-top: 8px;
    font-weight: 600;
  }
  
  @media (min-width: 768px) {
    .selected-score {
      font-size: 14px;
    }
  }
  
  .selected-score span {
    color: #667eea;
    font-weight: 800;
  }

  /* Submit button */
  .submit-btn {
    width: 100%;
    margin-top: 24px;
    padding: 14px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 12px;
    color: #ffffff;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
    transition: all 0.3s;
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
    position: relative;
  }
  
  @media (min-width: 768px) {
    .submit-btn {
      margin-top: 28px;
      padding: 16px;
      border-radius: 14px;
      font-size: 16px;
    }
  }
  
  .submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(102, 126, 234, 0.5);
  }
  
  .submit-btn:active:not(:disabled) {
    transform: translateY(0);
  }
  
  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .submit-btn.loading {
    cursor: wait;
  }

  .btn-spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-left: 8px;
    vertical-align: middle;
  }

  /* Toast */
  .toast {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(0);
    background: #ffffff;
    border: 2px solid #667eea;
    color: #1a1a2e;
    padding: 14px 24px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 700;
    z-index: 100;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s;
    opacity: 1;
    box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
  }
  
  @media (min-width: 768px) {
    .toast {
      bottom: 40px;
      padding: 16px 32px;
      border-radius: 14px;
      font-size: 15px;
    }
  }
  
  .toast.hidden {
    transform: translateX(-50%) translateY(100px);
    opacity: 0;
  }

  /* Loading */
  .loading-screen {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    background: #f5f7fa;
  }
  
  .loader {
    width: 48px;
    height: 48px;
    border: 4px solid #e5e7eb;
    border-top-color: #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .loading-text {
    font-size: 14px;
    color: #6b7280;
    font-weight: 600;
  }
  
  @media (min-width: 768px) {
    .loading-text {
      font-size: 16px;
    }
  }

  .promo-banner {
    background: linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%);
    border: 2px solid #fb923c;
    border-radius: 16px;
    padding: 16px 20px;
    margin: 0 20px 20px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(251, 146, 60, 0.2);
  }

  @media (min-width: 768px) {
    .promo-banner {
      padding: 20px 40px;
      margin: 0 40px 30px;
    }
  }

  .promo-text {
    font-size: 14px;
    color: #1a1a2e;
    font-weight: 600;
    margin: 0;
  }

  @media (min-width: 768px) {
    .promo-text {
      font-size: 16px;
    }
  }

  .promo-link {
    color: #dc2626;
    text-decoration: none;
    font-weight: 800;
    font-size: 24px;
    transition: all 0.3s;
    display: inline-block;
  }

  @media (min-width: 768px) {
    .promo-link {
      font-size: 32px;
    }
  }

  .promo-link:hover {
    transform: scale(1.05);
    text-shadow: 0 2px 8px rgba(220, 38, 38, 0.3);
  }

  /* Sidebar Layout */
  .prof-layout-wrapper {
    display: flex;
    gap: 20px;
    padding: 20px;
    max-width: 1400px;
    margin: 0 auto;
  }

  @media (min-width: 768px) {
    .prof-layout-wrapper {
      gap: 30px;
      padding: 30px 40px;
    }
  }

  .prof-sidebar {
    display: none;
  }

  @media (min-width: 1024px) {
    .prof-sidebar {
      display: flex;
    }

    .prof-sidebar--left,
    .prof-sidebar--right {
      width: 180px;
      flex-shrink: 0;
    }
  }

  .content-wrap {
    flex: 1;
    min-width: 0;
  }
`;function Z1(){const{id:e}=$0(),t=Xr(),n=gp(),{currentProfessor:r,currentMessages:o,professorLoading:l,submittingRating:i}=Mr(T=>T.professors),s=Mr(T=>T.professors.list),[a,u]=R.useState([]),[c,f]=R.useState(""),[m,w]=R.useState(0),[g,v]=R.useState(!1),[x,h]=R.useState(!1);R.useEffect(()=>{o&&o.length>0?u(o):u([])},[o]),R.useEffect(()=>{e&&(n(V1()),u([]),w(0),v(!1),f(""),n(zn(e)))},[e,n]);const p=async()=>{if(c.trim())try{console.log("Submitting message:",c.trim());const T=await $1(e,c.trim());f(""),T.success&&console.log("Message submitted successfully"),T.error&&(console.error("Message submission error:",T.error),alert("Failed to send message: "+T.error)),n(zn(e))}catch(T){console.error("Failed to post message",T),alert("Failed to send message: "+(T.message||T))}},y=T=>{T.key==="Enter"&&!T.shiftKey&&(T.preventDefault(),p())},E=async()=>{if(!m||i)return;const T=r.avgRating?(r.avgRating*(r.ratingCount||0)+m)/((r.ratingCount||0)+1):m,B=(r.ratingCount||0)+1;n(H1({id:e,avgRating:T,ratingCount:B}));try{await n(Ho({id:e,rating:m})).unwrap(),v(!0),h(!0),setTimeout(()=>h(!1),3e3),n(gm(s))}catch(ve){console.error("Rating submission failed:",ve),n(zn(e))}};if(l||!r)return d.createElement("div",{className:"loading-screen"},d.createElement("style",null,Zc),d.createElement("div",{className:"loader"}),d.createElement("div",{className:"loading-text"},"Loading professor..."));const k=r.avgRating,C=r.ratingCount||0,_=m?ji[m-1]:"🤔",P=k?ji[Math.round(k)-1]:null,L=k?Math.round(k/2):0;return d.createElement("div",{className:"prof-page"},d.createElement("style",null,Zc),d.createElement("div",{className:`toast ${x?"":"hidden"}`},"✓ Thanks for your rating!"),d.createElement("div",{className:"top-nav"},d.createElement("button",{className:"back-btn",onClick:()=>{const T=localStorage.getItem("selectedCollegeId"),B=localStorage.getItem("selectedCollegeName");t("/profs",{state:{collegeId:T||"iit-ism",collegeName:B||"IIT ISM Dhanbad"}})}},d.createElement("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round"},d.createElement("line",{x1:"19",y1:"12",x2:"5",y2:"12"}),d.createElement("polyline",{points:"12 19 5 12 12 5"})),"Back to Professors")),d.createElement("div",{className:"profile-hero"},d.createElement("div",{className:"prof-photo-wrap"},r.photoUrl?d.createElement("img",{src:r.photoUrl,alt:r.name}):d.createElement("div",{className:"prof-photo-placeholder"},d.createElement("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5"},d.createElement("circle",{cx:"12",cy:"8",r:"4"}),d.createElement("path",{d:"M4 20c0-4 4-6 8-6s8 2 8 6"})))),d.createElement("div",{className:"profile-info"},d.createElement("h1",{className:"profile-name"},r.name),d.createElement("div",{className:"profile-meta"},r.college&&d.createElement("div",{className:"profile-college"},d.createElement("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5"},d.createElement("path",{d:"M22 10v6M2 10l10-5 10 5-10 5z"}),d.createElement("path",{d:"M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"})),r.college),r.department&&d.createElement("div",{className:"profile-dept"},d.createElement("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5"},d.createElement("path",{d:"M12 11h.01M12 7h.01M12 15h.01M12 19h.01M8 11h.01M8 7h.01M8 15h.01M8 19h.01M16 11h.01M16 7h.01M16 15h.01M16 19h.01M3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2z"})),r.department)),d.createElement("div",{className:"avg-rating-row"},d.createElement("div",{className:"avg-box"},d.createElement("div",{className:"avg-number-wrap"},d.createElement("div",{className:"avg-number"},k!=null?k.toFixed(1):"—"),d.createElement("div",{className:"avg-label"},"Average Rating")),d.createElement("div",{className:"avg-stars-wrap"},d.createElement("div",{className:"avg-stars"},[...Array(5)].map((T,B)=>d.createElement("span",{key:B,style:{color:B<L?"#fbbf24":"#e5e7eb"}},"★"))),d.createElement("div",{className:"avg-count"},C," rating",C!==1?"s":"")),P&&d.createElement("div",{className:"avg-mood"},P))))),d.createElement("div",{className:"promo-banner"},d.createElement("p",{className:"promo-text"},"Planning trips with friends? We built TripiiTrip to split expenses, plan routes & travel together 👀 Click 👉"," ",d.createElement("a",{href:"https://tripii-trip-psi.vercel.app/",target:"_blank",rel:"noopener noreferrer",className:"promo-link"},"Tripiitrip"))),d.createElement("div",{className:"prof-layout-wrapper"},d.createElement("div",{className:"content-wrap"},d.createElement("div",{className:"col-main"},d.createElement("div",{className:"section-head"},d.createElement("span",{className:"dot"}),"Anonymous Chat"),d.createElement("div",{className:"chat-box"},d.createElement("div",{className:"chat-messages"},a.length===0?d.createElement("div",{className:"chat-empty"},"No messages yet. Be the first to chat!"):a.map((T,B)=>d.createElement("div",{className:"chat-msg",key:B},d.createElement("div",{className:"chat-msg-time"},new Date(T.createdAt).toLocaleTimeString()),d.createElement("div",{className:"chat-msg-text"},T.message)))),d.createElement("div",{className:"chat-input-row"},d.createElement("input",{className:"chat-input",value:c,onChange:T=>f(T.target.value),onKeyDown:y,placeholder:"Message anonymously... (Enter to send)"}),d.createElement("button",{className:"send-btn",onClick:p},"Send")))),d.createElement("div",{className:"col-side"},d.createElement("div",{className:"section-head"},d.createElement("span",{className:"dot"}),"Rate This Professor"),d.createElement("div",{className:"rating-panel"},d.createElement("div",{className:"mood-label"},"How do you feel about this professor?"),d.createElement("div",{className:"mood-display",style:{transform:m?"scale(1.15)":"scale(1)"}},_),d.createElement("div",{className:"star-selector"},[1,2,3,4,5,6,7,8,9,10].map(T=>d.createElement("button",{key:T,className:`star-btn ${m===T?"active":""}`,onClick:()=>{g||w(T)},disabled:g},T))),d.createElement("div",{className:"star-label-row"},d.createElement("span",{className:"star-label"},"😭 Awful"),d.createElement("span",{className:"star-label"},"🤩 Amazing")),m>0&&d.createElement("div",{className:"selected-score"},"You selected: ",d.createElement("span",null,m,"/10")," — ",ji[m-1]),d.createElement("button",{className:`submit-btn ${i?"loading":""}`,onClick:E,disabled:!m||g||i},i?d.createElement(d.Fragment,null,"Submitting",d.createElement("span",{className:"btn-spinner"})):g?"Rating Submitted ✓":"Submit Rating"),g&&d.createElement("div",{style:{textAlign:"center",marginTop:16,fontSize:13,color:"#6b7280",fontWeight:600}},"You've already rated this professor"))))))}const ew=[{id:"iit-ism",name:"IIT (ISM) Dhanbad"},{id:"iit-madras",name:"IIT Madras"}],tw={"iit-ism":"IIT ISM Dhanbad","iit-madras":"IIT Madras"};function nw(){const[e,t]=R.useState(""),n=Xr(),r=o=>{o.preventDefault(),e&&n("/profs",{state:{collegeId:e,collegeName:tw[e]}})};return d.createElement("div",{className:"landing-root"},d.createElement("div",{className:"mobile-ads-top"},d.createElement(Nt,{page:"home",position:"left",horizontal:!0})),d.createElement("div",{className:"landing-layout"},d.createElement("div",{className:"landing-sidebar landing-sidebar--left"},d.createElement(Nt,{page:"home",position:"left"})),d.createElement("div",{className:"landing-content"},d.createElement("div",{className:"logo-icon"},d.createElement("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},d.createElement("path",{d:"M22 10v6M2 10l10-5 10 5-10 5z"}),d.createElement("path",{d:"M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"}))),d.createElement("h1",null,"Rate My Prof"),d.createElement("p",{className:"subtitle"},"Real-time anonymous ratings, chat & reviews for India's top colleges."),d.createElement("form",{className:"selection-box",onSubmit:r},d.createElement("label",{htmlFor:"college-select"},"Choose your institution"),d.createElement("div",{className:"select-wrapper"},d.createElement("select",{id:"college-select",className:"college-select",value:e,onChange:o=>t(o.target.value),required:!0},d.createElement("option",{value:"",disabled:!0},"Select a college..."),ew.map(o=>d.createElement("option",{key:o.id,value:o.id},o.name))),d.createElement("svg",{className:"select-arrow",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2"},d.createElement("path",{d:"M6 9l6 6 6-6"}))),d.createElement("button",{type:"submit",className:"enter-btn",disabled:!e},"Enter Campus",d.createElement("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5"},d.createElement("path",{d:"M5 12h14M12 5l7 7-7 7"})))),d.createElement("div",{className:"stats"},d.createElement("div",{className:"stat-item"},d.createElement("span",{className:"stat-value"},"500+"),d.createElement("span",{className:"stat-label"},"Faculty")),d.createElement("div",{className:"stat-item"},d.createElement("span",{className:"stat-value"},"10k+"),d.createElement("span",{className:"stat-label"},"Ratings")),d.createElement("div",{className:"stat-item"},d.createElement("span",{className:"stat-value"},"50+"),d.createElement("span",{className:"stat-label"},"Colleges")))),d.createElement("div",{className:"landing-sidebar landing-sidebar--right"},d.createElement(Nt,{page:"home",position:"right"}))),d.createElement("div",{className:"mobile-ads-bottom"},d.createElement(Nt,{page:"home",position:"right",horizontal:!0})))}const rw=e=>{try{const t=JSON.stringify({professors:{list:e.professors.list,listLoaded:e.professors.listLoaded},collegeContext:{collegeId:localStorage.getItem("selectedCollegeId"),collegeName:localStorage.getItem("selectedCollegeName")}});localStorage.setItem("reduxState",t)}catch(t){console.error("Failed to save state:",t)}},Ys=Qy({reducer:{professors:Q1,leaderboard:K1}});Ys.subscribe(()=>{rw(Ys.getState())});function ow(){return d.createElement(s0,{store:Ys},d.createElement(fy,null,d.createElement(oy,null,d.createElement(Fo,{path:"/",element:d.createElement(nw,null)}),d.createElement(Fo,{path:"/profs",element:d.createElement(G1,null)}),d.createElement(Fo,{path:"/prof/:id",element:d.createElement(Z1,null)}))))}fp(document.getElementById("root")).render(d.createElement(ow,null));
