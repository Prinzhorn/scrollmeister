(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
// For more information about browser field, check out the browser field at https://github.com/substack/browserify-handbook#browser-field.

var styleElementsInsertedAtTop = [];

var insertStyleElement = function(styleElement, options) {
    var head = document.head || document.getElementsByTagName('head')[0];
    var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];

    options = options || {};
    options.insertAt = options.insertAt || 'bottom';

    if (options.insertAt === 'top') {
        if (!lastStyleElementInsertedAtTop) {
            head.insertBefore(styleElement, head.firstChild);
        } else if (lastStyleElementInsertedAtTop.nextSibling) {
            head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
        } else {
            head.appendChild(styleElement);
        }
        styleElementsInsertedAtTop.push(styleElement);
    } else if (options.insertAt === 'bottom') {
        head.appendChild(styleElement);
    } else {
        throw new Error('Invalid value for parameter \'insertAt\'. Must be \'top\' or \'bottom\'.');
    }
};

module.exports = {
    // Create a <link> tag with optional data attributes
    createLink: function(href, attributes) {
        var head = document.head || document.getElementsByTagName('head')[0];
        var link = document.createElement('link');

        link.href = href;
        link.rel = 'stylesheet';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            link.setAttribute('data-' + key, value);
        }

        head.appendChild(link);
    },
    // Create a <style> tag with optional data attributes
    createStyle: function(cssText, attributes, extraOptions) {
        extraOptions = extraOptions || {};

        var style = document.createElement('style');
        style.type = 'text/css';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            style.setAttribute('data-' + key, value);
        }

        if (style.sheet) { // for jsdom and IE9+
            style.innerHTML = cssText;
            style.sheet.cssText = cssText;
            insertStyleElement(style, { insertAt: extraOptions.insertAt });
        } else if (style.styleSheet) { // for IE8 and below
            insertStyleElement(style, { insertAt: extraOptions.insertAt });
            style.styleSheet.cssText = cssText;
        } else { // for Chrome, Firefox, and Safari
            style.appendChild(document.createTextNode(cssText));
            insertStyleElement(style, { insertAt: extraOptions.insertAt });
        }
    }
};

},{}],2:[function(require,module,exports){
/*! (C) Andrea Giammarchi - @WebReflection - Mit Style License */
(function(e,t){"use strict";function Ht(){var e=wt.splice(0,wt.length);Et=0;while(e.length)e.shift().call(null,e.shift())}function Bt(e,t){for(var n=0,r=e.length;n<r;n++)Jt(e[n],t)}function jt(e){for(var t=0,n=e.length,r;t<n;t++)r=e[t],Pt(r,A[It(r)])}function Ft(e){return function(t){ut(t)&&(Jt(t,e),O.length&&Bt(t.querySelectorAll(O),e))}}function It(e){var t=ht.call(e,"is"),n=e.nodeName.toUpperCase(),r=_.call(L,t?N+t.toUpperCase():T+n);return t&&-1<r&&!qt(n,t)?-1:r}function qt(e,t){return-1<O.indexOf(e+'[is="'+t+'"]')}function Rt(e){var t=e.currentTarget,n=e.attrChange,r=e.attrName,i=e.target,s=e[y]||2,o=e[w]||3;kt&&(!i||i===t)&&t[h]&&r!=="style"&&(e.prevValue!==e.newValue||e.newValue===""&&(n===s||n===o))&&t[h](r,n===s?null:e.prevValue,n===o?null:e.newValue)}function Ut(e){var t=Ft(e);return function(e){wt.push(t,e.target),Et&&clearTimeout(Et),Et=setTimeout(Ht,1)}}function zt(e){Ct&&(Ct=!1,e.currentTarget.removeEventListener(S,zt)),O.length&&Bt((e.target||n).querySelectorAll(O),e.detail===l?l:a),st&&Vt()}function Wt(e,t){var n=this;vt.call(n,e,t),Lt.call(n,{target:n})}function Xt(e,t){nt(e,t),Mt?Mt.observe(e,yt):(Nt&&(e.setAttribute=Wt,e[o]=Ot(e),e[u](x,Lt)),e[u](E,Rt)),e[m]&&kt&&(e.created=!0,e[m](),e.created=!1)}function Vt(){for(var e,t=0,n=at.length;t<n;t++)e=at[t],M.contains(e)||(n--,at.splice(t--,1),Jt(e,l))}function $t(e){throw new Error("A "+e+" type is already registered")}function Jt(e,t){var n,r=It(e),i;-1<r&&(Dt(e,A[r]),r=0,t===a&&!e[a]?(e[l]=!1,e[a]=!0,i="connected",r=1,st&&_.call(at,e)<0&&at.push(e)):t===l&&!e[l]&&(e[a]=!1,e[l]=!0,i="disconnected",r=1),r&&(n=e[t+f]||e[i+f])&&n.call(e))}function Kt(){}function Qt(e,t,r){var i=r&&r[c]||"",o=t.prototype,u=tt(o),a=t.observedAttributes||j,f={prototype:u};ot(u,m,{value:function(){if(Q)Q=!1;else if(!this[W]){this[W]=!0,new t(this),o[m]&&o[m].call(this);var e=G[Z.get(t)];(!V||e.create.length>1)&&Zt(this)}}}),ot(u,h,{value:function(e){-1<_.call(a,e)&&o[h].apply(this,arguments)}}),o[d]&&ot(u,p,{value:o[d]}),o[v]&&ot(u,g,{value:o[v]}),i&&(f[c]=i),e=e.toUpperCase(),G[e]={constructor:t,create:i?[i,et(e)]:[e]},Z.set(t,e),n[s](e.toLowerCase(),f),en(e),Y[e].r()}function Gt(e){var t=G[e.toUpperCase()];return t&&t.constructor}function Yt(e){return typeof e=="string"?e:e&&e.is||""}function Zt(e){var t=e[h],n=t?e.attributes:j,r=n.length,i;while(r--)i=n[r],t.call(e,i.name||i.nodeName,null,i.value||i.nodeValue)}function en(e){return e=e.toUpperCase(),e in Y||(Y[e]={},Y[e].p=new K(function(t){Y[e].r=t})),Y[e].p}function tn(){X&&delete e.customElements,B(e,"customElements",{configurable:!0,value:new Kt}),B(e,"CustomElementRegistry",{configurable:!0,value:Kt});for(var t=function(t){var r=e[t];if(r){e[t]=function(t){var i,s;return t||(t=this),t[W]||(Q=!0,i=G[Z.get(t.constructor)],s=V&&i.create.length===1,t=s?Reflect.construct(r,j,i.constructor):n.createElement.apply(n,i.create),t[W]=!0,Q=!1,s||Zt(t)),t},e[t].prototype=r.prototype;try{r.prototype.constructor=e[t]}catch(i){z=!0,B(r,W,{value:e[t]})}}},r=i.get(/^HTML[A-Z]*[a-z]/),o=r.length;o--;t(r[o]));n.createElement=function(e,t){var n=Yt(t);return n?gt.call(this,e,et(n)):gt.call(this,e)},St||(Tt=!0,n[s](""))}var n=e.document,r=e.Object,i=function(e){var t=/^[A-Z]+[a-z]/,n=function(e){var t=[],n;for(n in s)e.test(n)&&t.push(n);return t},i=function(e,t){t=t.toLowerCase(),t in s||(s[e]=(s[e]||[]).concat(t),s[t]=s[t.toUpperCase()]=e)},s=(r.create||r)(null),o={},u,a,f,l;for(a in e)for(l in e[a]){f=e[a][l],s[l]=f;for(u=0;u<f.length;u++)s[f[u].toLowerCase()]=s[f[u].toUpperCase()]=l}return o.get=function(r){return typeof r=="string"?s[r]||(t.test(r)?[]:""):n(r)},o.set=function(n,r){return t.test(n)?i(n,r):i(r,n),o},o}({collections:{HTMLAllCollection:["all"],HTMLCollection:["forms"],HTMLFormControlsCollection:["elements"],HTMLOptionsCollection:["options"]},elements:{Element:["element"],HTMLAnchorElement:["a"],HTMLAppletElement:["applet"],HTMLAreaElement:["area"],HTMLAttachmentElement:["attachment"],HTMLAudioElement:["audio"],HTMLBRElement:["br"],HTMLBaseElement:["base"],HTMLBodyElement:["body"],HTMLButtonElement:["button"],HTMLCanvasElement:["canvas"],HTMLContentElement:["content"],HTMLDListElement:["dl"],HTMLDataElement:["data"],HTMLDataListElement:["datalist"],HTMLDetailsElement:["details"],HTMLDialogElement:["dialog"],HTMLDirectoryElement:["dir"],HTMLDivElement:["div"],HTMLDocument:["document"],HTMLElement:["element","abbr","address","article","aside","b","bdi","bdo","cite","code","command","dd","dfn","dt","em","figcaption","figure","footer","header","i","kbd","mark","nav","noscript","rp","rt","ruby","s","samp","section","small","strong","sub","summary","sup","u","var","wbr"],HTMLEmbedElement:["embed"],HTMLFieldSetElement:["fieldset"],HTMLFontElement:["font"],HTMLFormElement:["form"],HTMLFrameElement:["frame"],HTMLFrameSetElement:["frameset"],HTMLHRElement:["hr"],HTMLHeadElement:["head"],HTMLHeadingElement:["h1","h2","h3","h4","h5","h6"],HTMLHtmlElement:["html"],HTMLIFrameElement:["iframe"],HTMLImageElement:["img"],HTMLInputElement:["input"],HTMLKeygenElement:["keygen"],HTMLLIElement:["li"],HTMLLabelElement:["label"],HTMLLegendElement:["legend"],HTMLLinkElement:["link"],HTMLMapElement:["map"],HTMLMarqueeElement:["marquee"],HTMLMediaElement:["media"],HTMLMenuElement:["menu"],HTMLMenuItemElement:["menuitem"],HTMLMetaElement:["meta"],HTMLMeterElement:["meter"],HTMLModElement:["del","ins"],HTMLOListElement:["ol"],HTMLObjectElement:["object"],HTMLOptGroupElement:["optgroup"],HTMLOptionElement:["option"],HTMLOutputElement:["output"],HTMLParagraphElement:["p"],HTMLParamElement:["param"],HTMLPictureElement:["picture"],HTMLPreElement:["pre"],HTMLProgressElement:["progress"],HTMLQuoteElement:["blockquote","q","quote"],HTMLScriptElement:["script"],HTMLSelectElement:["select"],HTMLShadowElement:["shadow"],HTMLSlotElement:["slot"],HTMLSourceElement:["source"],HTMLSpanElement:["span"],HTMLStyleElement:["style"],HTMLTableCaptionElement:["caption"],HTMLTableCellElement:["td","th"],HTMLTableColElement:["col","colgroup"],HTMLTableElement:["table"],HTMLTableRowElement:["tr"],HTMLTableSectionElement:["thead","tbody","tfoot"],HTMLTemplateElement:["template"],HTMLTextAreaElement:["textarea"],HTMLTimeElement:["time"],HTMLTitleElement:["title"],HTMLTrackElement:["track"],HTMLUListElement:["ul"],HTMLUnknownElement:["unknown","vhgroupv","vkeygen"],HTMLVideoElement:["video"]},nodes:{Attr:["node"],Audio:["audio"],CDATASection:["node"],CharacterData:["node"],Comment:["#comment"],Document:["#document"],DocumentFragment:["#document-fragment"],DocumentType:["node"],HTMLDocument:["#document"],Image:["img"],Option:["option"],ProcessingInstruction:["node"],ShadowRoot:["#shadow-root"],Text:["#text"],XMLDocument:["xml"]}});typeof t!="object"&&(t={type:t||"auto"});var s="registerElement",o="__"+s+(e.Math.random()*1e5>>0),u="addEventListener",a="attached",f="Callback",l="detached",c="extends",h="attributeChanged"+f,p=a+f,d="connected"+f,v="disconnected"+f,m="created"+f,g=l+f,y="ADDITION",b="MODIFICATION",w="REMOVAL",E="DOMAttrModified",S="DOMContentLoaded",x="DOMSubtreeModified",T="<",N="=",C=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,k=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],L=[],A=[],O="",M=n.documentElement,_=L.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},D=r.prototype,P=D.hasOwnProperty,H=D.isPrototypeOf,B=r.defineProperty,j=[],F=r.getOwnPropertyDescriptor,I=r.getOwnPropertyNames,q=r.getPrototypeOf,R=r.setPrototypeOf,U=!!r.__proto__,z=!1,W="__dreCEv1",X=e.customElements,V=!/^force/.test(t.type)&&!!(X&&X.define&&X.get&&X.whenDefined),$=r.create||r,J=e.Map||function(){var t=[],n=[],r;return{get:function(e){return n[_.call(t,e)]},set:function(e,i){r=_.call(t,e),r<0?n[t.push(e)-1]=i:n[r]=i}}},K=e.Promise||function(e){function i(e){n=!0;while(t.length)t.shift()(e)}var t=[],n=!1,r={"catch":function(){return r},then:function(e){return t.push(e),n&&setTimeout(i,1),r}};return e(i),r},Q=!1,G=$(null),Y=$(null),Z=new J,et=function(e){return e.toLowerCase()},tt=r.create||function sn(e){return e?(sn.prototype=e,new sn):this},nt=R||(U?function(e,t){return e.__proto__=t,e}:I&&F?function(){function e(e,t){for(var n,r=I(t),i=0,s=r.length;i<s;i++)n=r[i],P.call(e,n)||B(e,n,F(t,n))}return function(t,n){do e(t,n);while((n=q(n))&&!H.call(n,t));return t}}():function(e,t){for(var n in t)e[n]=t[n];return e}),rt=e.MutationObserver||e.WebKitMutationObserver,it=(e.HTMLElement||e.Element||e.Node).prototype,st=!H.call(it,M),ot=st?function(e,t,n){return e[t]=n.value,e}:B,ut=st?function(e){return e.nodeType===1}:function(e){return H.call(it,e)},at=st&&[],ft=it.attachShadow,lt=it.cloneNode,ct=it.dispatchEvent,ht=it.getAttribute,pt=it.hasAttribute,dt=it.removeAttribute,vt=it.setAttribute,mt=n.createElement,gt=mt,yt=rt&&{attributes:!0,characterData:!0,attributeOldValue:!0},bt=rt||function(e){Nt=!1,M.removeEventListener(E,bt)},wt,Et=0,St=s in n&&!/^force-all/.test(t.type),xt=!0,Tt=!1,Nt=!0,Ct=!0,kt=!0,Lt,At,Ot,Mt,_t,Dt,Pt;St||(R||U?(Dt=function(e,t){H.call(t,e)||Xt(e,t)},Pt=Xt):(Dt=function(e,t){e[o]||(e[o]=r(!0),Xt(e,t))},Pt=Dt),st?(Nt=!1,function(){var e=F(it,u),t=e.value,n=function(e){var t=new CustomEvent(E,{bubbles:!0});t.attrName=e,t.prevValue=ht.call(this,e),t.newValue=null,t[w]=t.attrChange=2,dt.call(this,e),ct.call(this,t)},r=function(e,t){var n=pt.call(this,e),r=n&&ht.call(this,e),i=new CustomEvent(E,{bubbles:!0});vt.call(this,e,t),i.attrName=e,i.prevValue=n?r:null,i.newValue=t,n?i[b]=i.attrChange=1:i[y]=i.attrChange=0,ct.call(this,i)},i=function(e){var t=e.currentTarget,n=t[o],r=e.propertyName,i;n.hasOwnProperty(r)&&(n=n[r],i=new CustomEvent(E,{bubbles:!0}),i.attrName=n.name,i.prevValue=n.value||null,i.newValue=n.value=t[r]||null,i.prevValue==null?i[y]=i.attrChange=0:i[b]=i.attrChange=1,ct.call(t,i))};e.value=function(e,s,u){e===E&&this[h]&&this.setAttribute!==r&&(this[o]={className:{name:"class",value:this.className}},this.setAttribute=r,this.removeAttribute=n,t.call(this,"propertychange",i)),t.call(this,e,s,u)},B(it,u,e)}()):rt||(M[u](E,bt),M.setAttribute(o,1),M.removeAttribute(o),Nt&&(Lt=function(e){var t=this,n,r,i;if(t===e.target){n=t[o],t[o]=r=Ot(t);for(i in r){if(!(i in n))return At(0,t,i,n[i],r[i],y);if(r[i]!==n[i])return At(1,t,i,n[i],r[i],b)}for(i in n)if(!(i in r))return At(2,t,i,n[i],r[i],w)}},At=function(e,t,n,r,i,s){var o={attrChange:e,currentTarget:t,attrName:n,prevValue:r,newValue:i};o[s]=e,Rt(o)},Ot=function(e){for(var t,n,r={},i=e.attributes,s=0,o=i.length;s<o;s++)t=i[s],n=t.name,n!=="setAttribute"&&(r[n]=t.value);return r})),n[s]=function(t,r){p=t.toUpperCase(),xt&&(xt=!1,rt?(Mt=function(e,t){function n(e,t){for(var n=0,r=e.length;n<r;t(e[n++]));}return new rt(function(r){for(var i,s,o,u=0,a=r.length;u<a;u++)i=r[u],i.type==="childList"?(n(i.addedNodes,e),n(i.removedNodes,t)):(s=i.target,kt&&s[h]&&i.attributeName!=="style"&&(o=ht.call(s,i.attributeName),o!==i.oldValue&&s[h](i.attributeName,i.oldValue,o)))})}(Ft(a),Ft(l)),_t=function(e){return Mt.observe(e,{childList:!0,subtree:!0}),e},_t(n),ft&&(it.attachShadow=function(){return _t(ft.apply(this,arguments))})):(wt=[],n[u]("DOMNodeInserted",Ut(a)),n[u]("DOMNodeRemoved",Ut(l))),n[u](S,zt),n[u]("readystatechange",zt),it.cloneNode=function(e){var t=lt.call(this,!!e),n=It(t);return-1<n&&Pt(t,A[n]),e&&O.length&&jt(t.querySelectorAll(O)),t});if(Tt)return Tt=!1;-2<_.call(L,N+p)+_.call(L,T+p)&&$t(t);if(!C.test(p)||-1<_.call(k,p))throw new Error("The type "+t+" is invalid");var i=function(){return o?n.createElement(f,p):n.createElement(f)},s=r||D,o=P.call(s,c),f=o?r[c].toUpperCase():p,p,d;return o&&-1<_.call(L,T+f)&&$t(f),d=L.push((o?N:T)+p)-1,O=O.concat(O.length?",":"",o?f+'[is="'+t.toLowerCase()+'"]':f),i.prototype=A[d]=P.call(s,"prototype")?s.prototype:tt(it),O.length&&Bt(n.querySelectorAll(O),a),i},n.createElement=gt=function(e,t){var r=Yt(t),i=r?mt.call(n,e,et(r)):mt.call(n,e),s=""+e,o=_.call(L,(r?N:T)+(r||s).toUpperCase()),u=-1<o;return r&&(i.setAttribute("is",r=r.toLowerCase()),u&&(u=qt(s.toUpperCase(),r))),kt=!n.createElement.innerHTMLHelper,u&&Pt(i,A[o]),i}),Kt.prototype={constructor:Kt,define:V?function(e,t,n){if(n)Qt(e,t,n);else{var r=e.toUpperCase();G[r]={constructor:t,create:[r]},Z.set(t,r),X.define(e,t)}}:Qt,get:V?function(e){return X.get(e)||Gt(e)}:Gt,whenDefined:V?function(e){return K.race([X.whenDefined(e),en(e)])}:en};if(!X||/^force/.test(t.type))tn();else if(!t.noBuiltIn)try{(function(t,r,i){r[c]="a",t.prototype=tt(HTMLAnchorElement.prototype),t.prototype.constructor=t,e.customElements.define(i,t,r);if(ht.call(n.createElement("a",{is:i}),"is")!==i||V&&ht.call(new t,"is")!==i)throw r})(function on(){return Reflect.construct(HTMLAnchorElement,[],on)},{},"document-register-element-a")}catch(nn){tn()}if(!t.noBuiltIn)try{mt.call(n,"a","a")}catch(rn){et=function(e){return{is:e.toLowerCase()}}}})(window);
},{}],3:[function(require,module,exports){
(function (process){
// Generated by CoffeeScript 1.12.2
(function() {
  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - nodeLoadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    moduleLoadTime = getNanoSeconds();
    upTime = process.uptime() * 1e9;
    nodeLoadTime = moduleLoadTime - upTime;
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);



}).call(this,require('_process'))
},{"_process":4}],4:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],5:[function(require,module,exports){
(function (global){
var now = require('performance-now')
  , root = typeof window === 'undefined' ? global : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = root['request' + suffix]
  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}
module.exports.cancel = function() {
  caf.apply(root, arguments)
}
module.exports.polyfill = function(object) {
  if (!object) {
    object = root;
  }
  object.requestAnimationFrame = raf
  object.cancelAnimationFrame = caf
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"performance-now":3}],6:[function(require,module,exports){
(function (global){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ResizeObserver = factory());
}(this, (function () { 'use strict';

/**
 * A collection of shims that provide minimal functionality of the ES6 collections.
 *
 * These implementations are not meant to be used outside of the ResizeObserver
 * modules as they cover only a limited range of use cases.
 */
/* eslint-disable require-jsdoc, valid-jsdoc */
var MapShim = (function () {
    if (typeof Map !== 'undefined') {
        return Map;
    }

    /**
     * Returns index in provided array that matches the specified key.
     *
     * @param {Array<Array>} arr
     * @param {*} key
     * @returns {number}
     */
    function getIndex(arr, key) {
        var result = -1;

        arr.some(function (entry, index) {
            if (entry[0] === key) {
                result = index;

                return true;
            }

            return false;
        });

        return result;
    }

    return (function () {
        function anonymous() {
            this.__entries__ = [];
        }

        var prototypeAccessors = { size: { configurable: true } };

        /**
         * @returns {boolean}
         */
        prototypeAccessors.size.get = function () {
            return this.__entries__.length;
        };

        /**
         * @param {*} key
         * @returns {*}
         */
        anonymous.prototype.get = function (key) {
            var index = getIndex(this.__entries__, key);
            var entry = this.__entries__[index];

            return entry && entry[1];
        };

        /**
         * @param {*} key
         * @param {*} value
         * @returns {void}
         */
        anonymous.prototype.set = function (key, value) {
            var index = getIndex(this.__entries__, key);

            if (~index) {
                this.__entries__[index][1] = value;
            } else {
                this.__entries__.push([key, value]);
            }
        };

        /**
         * @param {*} key
         * @returns {void}
         */
        anonymous.prototype.delete = function (key) {
            var entries = this.__entries__;
            var index = getIndex(entries, key);

            if (~index) {
                entries.splice(index, 1);
            }
        };

        /**
         * @param {*} key
         * @returns {void}
         */
        anonymous.prototype.has = function (key) {
            return !!~getIndex(this.__entries__, key);
        };

        /**
         * @returns {void}
         */
        anonymous.prototype.clear = function () {
            this.__entries__.splice(0);
        };

        /**
         * @param {Function} callback
         * @param {*} [ctx=null]
         * @returns {void}
         */
        anonymous.prototype.forEach = function (callback, ctx) {
            var this$1 = this;
            if ( ctx === void 0 ) ctx = null;

            for (var i = 0, list = this$1.__entries__; i < list.length; i += 1) {
                var entry = list[i];

                callback.call(ctx, entry[1], entry[0]);
            }
        };

        Object.defineProperties( anonymous.prototype, prototypeAccessors );

        return anonymous;
    }());
})();

/**
 * Detects whether window and document objects are available in current environment.
 */
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

// Returns global object of a current environment.
var global$1 = (function () {
    if (typeof global !== 'undefined' && global.Math === Math) {
        return global;
    }

    if (typeof self !== 'undefined' && self.Math === Math) {
        return self;
    }

    if (typeof window !== 'undefined' && window.Math === Math) {
        return window;
    }

    // eslint-disable-next-line no-new-func
    return Function('return this')();
})();

/**
 * A shim for the requestAnimationFrame which falls back to the setTimeout if
 * first one is not supported.
 *
 * @returns {number} Requests' identifier.
 */
var requestAnimationFrame$1 = (function () {
    if (typeof requestAnimationFrame === 'function') {
        // It's required to use a bounded function because IE sometimes throws
        // an "Invalid calling object" error if rAF is invoked without the global
        // object on the left hand side.
        return requestAnimationFrame.bind(global$1);
    }

    return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
})();

// Defines minimum timeout before adding a trailing call.
var trailingTimeout = 2;

/**
 * Creates a wrapper function which ensures that provided callback will be
 * invoked only once during the specified delay period.
 *
 * @param {Function} callback - Function to be invoked after the delay period.
 * @param {number} delay - Delay after which to invoke callback.
 * @returns {Function}
 */
var throttle = function (callback, delay) {
    var leadingCall = false,
        trailingCall = false,
        lastCallTime = 0;

    /**
     * Invokes the original callback function and schedules new invocation if
     * the "proxy" was called during current request.
     *
     * @returns {void}
     */
    function resolvePending() {
        if (leadingCall) {
            leadingCall = false;

            callback();
        }

        if (trailingCall) {
            proxy();
        }
    }

    /**
     * Callback invoked after the specified delay. It will further postpone
     * invocation of the original function delegating it to the
     * requestAnimationFrame.
     *
     * @returns {void}
     */
    function timeoutCallback() {
        requestAnimationFrame$1(resolvePending);
    }

    /**
     * Schedules invocation of the original function.
     *
     * @returns {void}
     */
    function proxy() {
        var timeStamp = Date.now();

        if (leadingCall) {
            // Reject immediately following calls.
            if (timeStamp - lastCallTime < trailingTimeout) {
                return;
            }

            // Schedule new call to be in invoked when the pending one is resolved.
            // This is important for "transitions" which never actually start
            // immediately so there is a chance that we might miss one if change
            // happens amids the pending invocation.
            trailingCall = true;
        } else {
            leadingCall = true;
            trailingCall = false;

            setTimeout(timeoutCallback, delay);
        }

        lastCallTime = timeStamp;
    }

    return proxy;
};

// Minimum delay before invoking the update of observers.
var REFRESH_DELAY = 20;

// A list of substrings of CSS properties used to find transition events that
// might affect dimensions of observed elements.
var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];

// Check if MutationObserver is available.
var mutationObserverSupported = typeof MutationObserver !== 'undefined';

/**
 * Singleton controller class which handles updates of ResizeObserver instances.
 */
var ResizeObserverController = function() {
    this.connected_ = false;
    this.mutationEventsAdded_ = false;
    this.mutationsObserver_ = null;
    this.observers_ = [];

    this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
    this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
};

/**
 * Adds observer to observers list.
 *
 * @param {ResizeObserverSPI} observer - Observer to be added.
 * @returns {void}
 */


/**
 * Holds reference to the controller's instance.
 *
 * @private {ResizeObserverController}
 */


/**
 * Keeps reference to the instance of MutationObserver.
 *
 * @private {MutationObserver}
 */

/**
 * Indicates whether DOM listeners have been added.
 *
 * @private {boolean}
 */
ResizeObserverController.prototype.addObserver = function (observer) {
    if (!~this.observers_.indexOf(observer)) {
        this.observers_.push(observer);
    }

    // Add listeners if they haven't been added yet.
    if (!this.connected_) {
        this.connect_();
    }
};

/**
 * Removes observer from observers list.
 *
 * @param {ResizeObserverSPI} observer - Observer to be removed.
 * @returns {void}
 */
ResizeObserverController.prototype.removeObserver = function (observer) {
    var observers = this.observers_;
    var index = observers.indexOf(observer);

    // Remove observer if it's present in registry.
    if (~index) {
        observers.splice(index, 1);
    }

    // Remove listeners if controller has no connected observers.
    if (!observers.length && this.connected_) {
        this.disconnect_();
    }
};

/**
 * Invokes the update of observers. It will continue running updates insofar
 * it detects changes.
 *
 * @returns {void}
 */
ResizeObserverController.prototype.refresh = function () {
    var changesDetected = this.updateObservers_();

    // Continue running updates if changes have been detected as there might
    // be future ones caused by CSS transitions.
    if (changesDetected) {
        this.refresh();
    }
};

/**
 * Updates every observer from observers list and notifies them of queued
 * entries.
 *
 * @private
 * @returns {boolean} Returns "true" if any observer has detected changes in
 *  dimensions of it's elements.
 */
ResizeObserverController.prototype.updateObservers_ = function () {
    // Collect observers that have active observations.
    var activeObservers = this.observers_.filter(function (observer) {
        return observer.gatherActive(), observer.hasActive();
    });

    // Deliver notifications in a separate cycle in order to avoid any
    // collisions between observers, e.g. when multiple instances of
    // ResizeObserver are tracking the same element and the callback of one
    // of them changes content dimensions of the observed target. Sometimes
    // this may result in notifications being blocked for the rest of observers.
    activeObservers.forEach(function (observer) { return observer.broadcastActive(); });

    return activeObservers.length > 0;
};

/**
 * Initializes DOM listeners.
 *
 * @private
 * @returns {void}
 */
ResizeObserverController.prototype.connect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already added.
    if (!isBrowser || this.connected_) {
        return;
    }

    // Subscription to the "Transitionend" event is used as a workaround for
    // delayed transitions. This way it's possible to capture at least the
    // final state of an element.
    document.addEventListener('transitionend', this.onTransitionEnd_);

    window.addEventListener('resize', this.refresh);

    if (mutationObserverSupported) {
        this.mutationsObserver_ = new MutationObserver(this.refresh);

        this.mutationsObserver_.observe(document, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
        });
    } else {
        document.addEventListener('DOMSubtreeModified', this.refresh);

        this.mutationEventsAdded_ = true;
    }

    this.connected_ = true;
};

/**
 * Removes DOM listeners.
 *
 * @private
 * @returns {void}
 */
ResizeObserverController.prototype.disconnect_ = function () {
    // Do nothing if running in a non-browser environment or if listeners
    // have been already removed.
    if (!isBrowser || !this.connected_) {
        return;
    }

    document.removeEventListener('transitionend', this.onTransitionEnd_);
    window.removeEventListener('resize', this.refresh);

    if (this.mutationsObserver_) {
        this.mutationsObserver_.disconnect();
    }

    if (this.mutationEventsAdded_) {
        document.removeEventListener('DOMSubtreeModified', this.refresh);
    }

    this.mutationsObserver_ = null;
    this.mutationEventsAdded_ = false;
    this.connected_ = false;
};

/**
 * "Transitionend" event handler.
 *
 * @private
 * @param {TransitionEvent} event
 * @returns {void}
 */
ResizeObserverController.prototype.onTransitionEnd_ = function (ref) {
        var propertyName = ref.propertyName; if ( propertyName === void 0 ) propertyName = '';

    // Detect whether transition may affect dimensions of an element.
    var isReflowProperty = transitionKeys.some(function (key) {
        return !!~propertyName.indexOf(key);
    });

    if (isReflowProperty) {
        this.refresh();
    }
};

/**
 * Returns instance of the ResizeObserverController.
 *
 * @returns {ResizeObserverController}
 */
ResizeObserverController.getInstance = function () {
    if (!this.instance_) {
        this.instance_ = new ResizeObserverController();
    }

    return this.instance_;
};

ResizeObserverController.instance_ = null;

/**
 * Defines non-writable/enumerable properties of the provided target object.
 *
 * @param {Object} target - Object for which to define properties.
 * @param {Object} props - Properties to be defined.
 * @returns {Object} Target object.
 */
var defineConfigurable = (function (target, props) {
    for (var i = 0, list = Object.keys(props); i < list.length; i += 1) {
        var key = list[i];

        Object.defineProperty(target, key, {
            value: props[key],
            enumerable: false,
            writable: false,
            configurable: true
        });
    }

    return target;
});

/**
 * Returns the global object associated with provided element.
 *
 * @param {Object} target
 * @returns {Object}
 */
var getWindowOf = (function (target) {
    // Assume that the element is an instance of Node, which means that it
    // has the "ownerDocument" property from which we can retrieve a
    // corresponding global object.
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;

    // Return the local global object if it's not possible extract one from
    // provided element.
    return ownerGlobal || global$1;
});

// Placeholder of an empty content rectangle.
var emptyRect = createRectInit(0, 0, 0, 0);

/**
 * Converts provided string to a number.
 *
 * @param {number|string} value
 * @returns {number}
 */
function toFloat(value) {
    return parseFloat(value) || 0;
}

/**
 * Extracts borders size from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @param {...string} positions - Borders positions (top, right, ...)
 * @returns {number}
 */
function getBordersSize(styles) {
    var positions = [], len = arguments.length - 1;
    while ( len-- > 0 ) positions[ len ] = arguments[ len + 1 ];

    return positions.reduce(function (size, position) {
        var value = styles['border-' + position + '-width'];

        return size + toFloat(value);
    }, 0);
}

/**
 * Extracts paddings sizes from provided styles.
 *
 * @param {CSSStyleDeclaration} styles
 * @returns {Object} Paddings box.
 */
function getPaddings(styles) {
    var positions = ['top', 'right', 'bottom', 'left'];
    var paddings = {};

    for (var i = 0, list = positions; i < list.length; i += 1) {
        var position = list[i];

        var value = styles['padding-' + position];

        paddings[position] = toFloat(value);
    }

    return paddings;
}

/**
 * Calculates content rectangle of provided SVG element.
 *
 * @param {SVGGraphicsElement} target - Element content rectangle of which needs
 *      to be calculated.
 * @returns {DOMRectInit}
 */
function getSVGContentRect(target) {
    var bbox = target.getBBox();

    return createRectInit(0, 0, bbox.width, bbox.height);
}

/**
 * Calculates content rectangle of provided HTMLElement.
 *
 * @param {HTMLElement} target - Element for which to calculate the content rectangle.
 * @returns {DOMRectInit}
 */
function getHTMLElementContentRect(target) {
    // Client width & height properties can't be
    // used exclusively as they provide rounded values.
    var clientWidth = target.clientWidth;
    var clientHeight = target.clientHeight;

    // By this condition we can catch all non-replaced inline, hidden and
    // detached elements. Though elements with width & height properties less
    // than 0.5 will be discarded as well.
    //
    // Without it we would need to implement separate methods for each of
    // those cases and it's not possible to perform a precise and performance
    // effective test for hidden elements. E.g. even jQuery's ':visible' filter
    // gives wrong results for elements with width & height less than 0.5.
    if (!clientWidth && !clientHeight) {
        return emptyRect;
    }

    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;

    // Computed styles of width & height are being used because they are the
    // only dimensions available to JS that contain non-rounded values. It could
    // be possible to utilize the getBoundingClientRect if only it's data wasn't
    // affected by CSS transformations let alone paddings, borders and scroll bars.
    var width = toFloat(styles.width),
        height = toFloat(styles.height);

    // Width & height include paddings and borders when the 'border-box' box
    // model is applied (except for IE).
    if (styles.boxSizing === 'border-box') {
        // Following conditions are required to handle Internet Explorer which
        // doesn't include paddings and borders to computed CSS dimensions.
        //
        // We can say that if CSS dimensions + paddings are equal to the "client"
        // properties then it's either IE, and thus we don't need to subtract
        // anything, or an element merely doesn't have paddings/borders styles.
        if (Math.round(width + horizPad) !== clientWidth) {
            width -= getBordersSize(styles, 'left', 'right') + horizPad;
        }

        if (Math.round(height + vertPad) !== clientHeight) {
            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
        }
    }

    // Following steps can't be applied to the document's root element as its
    // client[Width/Height] properties represent viewport area of the window.
    // Besides, it's as well not necessary as the <html> itself neither has
    // rendered scroll bars nor it can be clipped.
    if (!isDocumentElement(target)) {
        // In some browsers (only in Firefox, actually) CSS width & height
        // include scroll bars size which can be removed at this step as scroll
        // bars are the only difference between rounded dimensions + paddings
        // and "client" properties, though that is not always true in Chrome.
        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
        var horizScrollbar = Math.round(height + vertPad) - clientHeight;

        // Chrome has a rather weird rounding of "client" properties.
        // E.g. for an element with content width of 314.2px it sometimes gives
        // the client width of 315px and for the width of 314.7px it may give
        // 314px. And it doesn't happen all the time. So just ignore this delta
        // as a non-relevant.
        if (Math.abs(vertScrollbar) !== 1) {
            width -= vertScrollbar;
        }

        if (Math.abs(horizScrollbar) !== 1) {
            height -= horizScrollbar;
        }
    }

    return createRectInit(paddings.left, paddings.top, width, height);
}

/**
 * Checks whether provided element is an instance of the SVGGraphicsElement.
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
var isSVGGraphicsElement = (function () {
    // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
    // interface.
    if (typeof SVGGraphicsElement !== 'undefined') {
        return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
    }

    // If it's so, then check that element is at least an instance of the
    // SVGElement and that it has the "getBBox" method.
    // eslint-disable-next-line no-extra-parens
    return function (target) { return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === 'function'; };
})();

/**
 * Checks whether provided element is a document element (<html>).
 *
 * @param {Element} target - Element to be checked.
 * @returns {boolean}
 */
function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
}

/**
 * Calculates an appropriate content rectangle for provided html or svg element.
 *
 * @param {Element} target - Element content rectangle of which needs to be calculated.
 * @returns {DOMRectInit}
 */
function getContentRect(target) {
    if (!isBrowser) {
        return emptyRect;
    }

    if (isSVGGraphicsElement(target)) {
        return getSVGContentRect(target);
    }

    return getHTMLElementContentRect(target);
}

/**
 * Creates rectangle with an interface of the DOMRectReadOnly.
 * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
 *
 * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
 * @returns {DOMRectReadOnly}
 */
function createReadOnlyRect(ref) {
    var x = ref.x;
    var y = ref.y;
    var width = ref.width;
    var height = ref.height;

    // If DOMRectReadOnly is available use it as a prototype for the rectangle.
    var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);

    // Rectangle's properties are not writable and non-enumerable.
    defineConfigurable(rect, {
        x: x, y: y, width: width, height: height,
        top: y,
        right: x + width,
        bottom: height + y,
        left: x
    });

    return rect;
}

/**
 * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
 * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
 *
 * @param {number} x - X coordinate.
 * @param {number} y - Y coordinate.
 * @param {number} width - Rectangle's width.
 * @param {number} height - Rectangle's height.
 * @returns {DOMRectInit}
 */
function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}

/**
 * Class that is responsible for computations of the content rectangle of
 * provided DOM element and for keeping track of it's changes.
 */
var ResizeObservation = function(target) {
    this.broadcastWidth = 0;
    this.broadcastHeight = 0;
    this.contentRect_ = createRectInit(0, 0, 0, 0);

    this.target = target;
};

/**
 * Updates content rectangle and tells whether it's width or height properties
 * have changed since the last broadcast.
 *
 * @returns {boolean}
 */


/**
 * Reference to the last observed content rectangle.
 *
 * @private {DOMRectInit}
 */


/**
 * Broadcasted width of content rectangle.
 *
 * @type {number}
 */
ResizeObservation.prototype.isActive = function () {
    var rect = getContentRect(this.target);

    this.contentRect_ = rect;

    return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
};

/**
 * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
 * from the corresponding properties of the last observed content rectangle.
 *
 * @returns {DOMRectInit} Last observed content rectangle.
 */
ResizeObservation.prototype.broadcastRect = function () {
    var rect = this.contentRect_;

    this.broadcastWidth = rect.width;
    this.broadcastHeight = rect.height;

    return rect;
};

var ResizeObserverEntry = function(target, rectInit) {
    var contentRect = createReadOnlyRect(rectInit);

    // According to the specification following properties are not writable
    // and are also not enumerable in the native implementation.
    //
    // Property accessors are not being used as they'd require to define a
    // private WeakMap storage which may cause memory leaks in browsers that
    // don't support this type of collections.
    defineConfigurable(this, { target: target, contentRect: contentRect });
};

var ResizeObserverSPI = function(callback, controller, callbackCtx) {
    this.activeObservations_ = [];
    this.observations_ = new MapShim();

    if (typeof callback !== 'function') {
        throw new TypeError('The callback provided as parameter 1 is not a function.');
    }

    this.callback_ = callback;
    this.controller_ = controller;
    this.callbackCtx_ = callbackCtx;
};

/**
 * Starts observing provided element.
 *
 * @param {Element} target - Element to be observed.
 * @returns {void}
 */


/**
 * Registry of the ResizeObservation instances.
 *
 * @private {Map<Element, ResizeObservation>}
 */


/**
 * Public ResizeObserver instance which will be passed to the callback
 * function and used as a value of it's "this" binding.
 *
 * @private {ResizeObserver}
 */

/**
 * Collection of resize observations that have detected changes in dimensions
 * of elements.
 *
 * @private {Array<ResizeObservation>}
 */
ResizeObserverSPI.prototype.observe = function (target) {
    if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
    }

    // Do nothing if current environment doesn't have the Element interface.
    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
        return;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
    }

    var observations = this.observations_;

    // Do nothing if element is already being observed.
    if (observations.has(target)) {
        return;
    }

    observations.set(target, new ResizeObservation(target));

    this.controller_.addObserver(this);

    // Force the update of observations.
    this.controller_.refresh();
};

/**
 * Stops observing provided element.
 *
 * @param {Element} target - Element to stop observing.
 * @returns {void}
 */
ResizeObserverSPI.prototype.unobserve = function (target) {
    if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
    }

    // Do nothing if current environment doesn't have the Element interface.
    if (typeof Element === 'undefined' || !(Element instanceof Object)) {
        return;
    }

    if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
    }

    var observations = this.observations_;

    // Do nothing if element is not being observed.
    if (!observations.has(target)) {
        return;
    }

    observations.delete(target);

    if (!observations.size) {
        this.controller_.removeObserver(this);
    }
};

/**
 * Stops observing all elements.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.disconnect = function () {
    this.clearActive();
    this.observations_.clear();
    this.controller_.removeObserver(this);
};

/**
 * Collects observation instances the associated element of which has changed
 * it's content rectangle.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.gatherActive = function () {
        var this$1 = this;

    this.clearActive();

    this.observations_.forEach(function (observation) {
        if (observation.isActive()) {
            this$1.activeObservations_.push(observation);
        }
    });
};

/**
 * Invokes initial callback function with a list of ResizeObserverEntry
 * instances collected from active resize observations.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.broadcastActive = function () {
    // Do nothing if observer doesn't have active observations.
    if (!this.hasActive()) {
        return;
    }

    var ctx = this.callbackCtx_;

    // Create ResizeObserverEntry instance for every active observation.
    var entries = this.activeObservations_.map(function (observation) {
        return new ResizeObserverEntry(observation.target, observation.broadcastRect());
    });

    this.callback_.call(ctx, entries, ctx);
    this.clearActive();
};

/**
 * Clears the collection of active observations.
 *
 * @returns {void}
 */
ResizeObserverSPI.prototype.clearActive = function () {
    this.activeObservations_.splice(0);
};

/**
 * Tells whether observer has active observations.
 *
 * @returns {boolean}
 */
ResizeObserverSPI.prototype.hasActive = function () {
    return this.activeObservations_.length > 0;
};

// Registry of internal observers. If WeakMap is not available use current shim
// for the Map collection as it has all required methods and because WeakMap
// can't be fully polyfilled anyway.
var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();

/**
 * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
 * exposing only those methods and properties that are defined in the spec.
 */
var ResizeObserver = function(callback) {
    if (!(this instanceof ResizeObserver)) {
        throw new TypeError('Cannot call a class as a function.');
    }
    if (!arguments.length) {
        throw new TypeError('1 argument required, but only 0 present.');
    }

    var controller = ResizeObserverController.getInstance();
    var observer = new ResizeObserverSPI(callback, controller, this);

    observers.set(this, observer);
};

// Expose public methods of ResizeObserver.
['observe', 'unobserve', 'disconnect'].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
        return (ref = observers.get(this))[method].apply(ref, arguments);
        var ref;
    };
});

var index = (function () {
    // Export existing implementation if available.
    if (typeof global$1.ResizeObserver !== 'undefined') {
        return global$1.ResizeObserver;
    }

    return ResizeObserver;
})();

return index;

})));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
/*
 * scroll-logic
 * http://github.com/prinzhorn/scroll-logic
 *
 * Copyright 2011, Zynga Inc.
 * Modifications by Alexander Prinzhorn (@Prinzhorn)
 * Licensed under the MIT License.
 * https://github.com/Prinzhorn/scroll-logic/blob/master/LICENSE.txt
 *
 * Based on the work of: Unify Project (unify-project.org)
 * http://unify-project.org
 * Copyright 2011, Deutsche Telekom AG
 * License: MIT + Apache (V2)
 */

(function() {
	// How much velocity is required to start the deceleration.
	// This keeps the scroller from animating if the user is just slowly scrolling through.
	var MIN_VELOCITY_FOR_DECELERATION = 1;

	// The minimum distance before we start dragging.
	// This keeps small taps from moving the scroller.
	var MIN_DRAG_DISTANCE = 5;

	// The minimum velocity (in pixels per frame) after which we terminate the deceleration.
	var MIN_VELOCITY_BEFORE_TERMINATING = 0.1;

	// ScrollLogic doesn't care about fps, but this contant makes some of the math easier to understand.
	var FPS = 60;

	// The velocity changes by this amount every frame.
	var FRICTION_PER_FRAME = 0.95;

	// This means overscrolling is twice as hard than normal scrolling.
	var EDGE_RESISTANCE = 3;

	/**
	 * A pure logic 'component' for 'virtual' scrolling.
	 */
	var ScrollLogic = function(options) {
		this.options = {

			/** Enable animations for deceleration, snap back and scrolling */
			animating: true,

			/** duration for animations triggered by scrollTo */
			animationDuration: 250,

			/** Enable bouncing (content can be slowly moved outside and jumps back after releasing) */
			bouncing: true

		};

		for (var key in options) {
			this.options[key] = options[key];
		}
	};


	// Easing Equations (c) 2003 Robert Penner, all rights reserved.
	// Open source under the BSD License.
	// Optimized and refactored by @Prinzhorn. Also I don't think you can apply a license to such a tiny bit of math.

	var easeOutCubic = function(pos) {
		pos = pos - 1;

		return pos * pos * pos + 1;
	};

	var easeInOutCubic = function(pos) {
		if (pos < 0.5) {
			return 4 * pos * pos * pos;
		}

		//The >= 0.5 case is the same as easeOutCubic, but I'm not interested in a function call here.
		//It would simply be return easeOutCubic(p); if you want to.
		pos = pos - 1;

		return 4 * pos * pos * pos + 1;
	};

	var easeOutExpo = function(p) {
		//Make sure to map 1.0 to 1.0, because the formula below doesn't exactly yield 1.0 but 0.999023
		if(p === 1) {
			return 1;
		}

		return 1 - Math.pow(2, -10 * p);
	};

	var easeOutBack = function(pos) {
		var s = EDGE_RESISTANCE;

		pos = pos - 1;

		return (pos * pos * ((s + 1) * pos + s) + 1);
	};


	var members = {

		/*
		---------------------------------------------------------------------------
			INTERNAL FIELDS :: STATUS
		---------------------------------------------------------------------------
		*/

		// Whether a touch event sequence is in progress.
		__isInteracting: false,

		// Whether the user has moved by such a distance that we have enabled dragging mode.
		__isDragging: false,

		// Contains the animation configuration, if one is running.
		__animation: null,


		/*
		---------------------------------------------------------------------------
			INTERNAL FIELDS :: DIMENSIONS
		---------------------------------------------------------------------------
		*/

		/** {Integer} Available container length */
		__containerLength: 0,

		/** {Integer} Outer length of content */
		__contentLength: 0,

		/** {Number} Scroll position */
		__scrollOffset: 0,

		/** {Integer} Maximum allowed scroll position */
		__maxScrollOffset: 0,


		/*
		---------------------------------------------------------------------------
			INTERNAL FIELDS :: LAST POSITIONS
		---------------------------------------------------------------------------
		*/

		/** {Number} Position of finger at start */
		__lastTouchOffset: null,

		/** {Date} Timestamp of last move of finger. Used to limit tracking range for deceleration speed. */
		__lastTouchMove: null,

		/** {Array} List of positions, uses two indexes for each state: offset and timestamp */
		__positions: null,


		/*
		---------------------------------------------------------------------------
			PUBLIC API
		---------------------------------------------------------------------------
		*/

		/**
		 * Configures the dimensions of the client (outer) and content (inner) elements.
		 * Requires the available space for the outer element and the outer size of the inner element.
		 * All values which are falsy (null or zero etc.) are ignored and the old value is kept.
		 *
		 * @param containerLength {Integer ? null} Inner width of outer element
		 * @param contentLength {Integer ? null} Outer width of inner element
		 */
		setLengths: function(containerLength, contentLength) {

			var self = this;

			containerLength = Math.round(containerLength);
			contentLength = Math.round(contentLength);

			// Do nothing when the lengths are the same
			if(containerLength === self.__containerLength && contentLength === self.__contentLength) {
				return;
			}

			self.__containerLength = containerLength;
			self.__contentLength = contentLength;

			// Refresh maximums
			self.__maxScrollOffset = Math.max(contentLength - containerLength, 0);

			// Refresh scroll position
			self.scrollTo(self.__scrollOffset, true);

		},

		setContainerLength: function(containerLength) {

			var self = this;
			self.setLengths(containerLength, self.__contentLength);

		},

		setContentLength: function(contentLength) {

			var self = this;
			self.setLengths(self.__containerLength, contentLength);

		},


		/**
		 * Calculates and returns the current scroll position.
		 */
		getOffset: function() {
			var animation = this.__animation;
			var now;
			var percentage;
			var newOffset;

			if(animation) {
				//An animation is currently running, this is the trickier part.
				//Based on the current time, the start/end time of the animation and the easing function,
				//we can calculate the desired offset.
				now = Date.now();
				percentage = (now - animation.start) / animation.duration;

				//The animation is finished by now, clear the animation and use the animation's target offset.
				if(percentage >= 1) {
					this.__scrollOffset = animation.from + animation.distance;
					this.__animation = null;
				}
				//The animation is still running, calculate the current position.
				else {
					percentage = animation.easing(percentage);

					newOffset = animation.from + (animation.distance * percentage);

					//Without bouncing we need to prevent overscrolling and make a hard cut.
					if(!this.options.bouncing) {
						if(newOffset < 0) {
							this.__animation = null;
							newOffset = 0;
						} else if(newOffset > this.__maxScrollOffset) {
							this.__animation = null;
							newOffset = this.__maxScrollOffset;
						}
					}

					//We only want integer offsets, anything else does not make sense.
					this.__scrollOffset = (newOffset + 0.5) | 0;
				}
			}

			return this.__scrollOffset;
		},


		/**
		 * Returns the maximum scroll values
		 */
		getScrollMax: function() {
			return this.__maxScrollOffset;
		},


		/**
		 * Is scroll-logic currently doing anything?
		 */
		isResting: function() {
			return !this.__isInteracting && !this.__animation;
		},


		/**
		 * Scrolls to the given position. Respects bounds automatically.
		 */
		scrollTo: function(offset, animate) {

			var self = this;

			// Stop deceleration
			if (self.__animation) {
				self.__animation = null;
			}

			// Limit for allowed ranges
			offset = Math.max(Math.min(self.__maxScrollOffset, offset), 0);

			// Don't animate when no change detected, still call publish to make sure
			// that rendered position is really in-sync with internal data
			if (offset === self.__scrollOffset) {
				animate = false;
			}

			// Publish new values
			self.__publish(offset, animate);

		},


		/**
		 * Begin a new interaction with the scroller.
		 */
		beginInteraction: function(offset, timeStamp) {
			var self = this;

			// Stop animation
			if (self.__animation) {
				self.__animation = null;
			}

			// Store initial positions
			self.__initialTouchOffset = offset;

			// Store initial touch positions
			self.__lastTouchOffset = offset;

			// Store initial move time stamp
			self.__lastTouchMove = timeStamp;

			// Reset tracking flag
			self.__isInteracting = true;

			// Dragging starts lazy with an offset
			self.__isDragging = false;

			// Clearing data structure
			self.__positions = [];
		},


		/**
		 * A new user interaction with the scroller
		 */
		interact: function(offset, timeStamp) {

			var self = this;

			// Ignore event when tracking is not enabled (event might be outside of element)
			if (!self.__isInteracting) {
				return;
			}

			var positions = self.__positions;
			var currentOffset = self.__scrollOffset;

			// Are we already is dragging mode?
			if (self.__isDragging) {

				// Compute move distance
				var distance = offset - self.__lastTouchOffset;

				// Update the position
				var newOffset = currentOffset - distance;

				// Scrolling past one of the edges.
				if (newOffset < 0 || newOffset > self.__maxScrollOffset) {

					// Slow down on the edges
					if (self.options.bouncing) {

						// While overscrolling, apply the EDGE_RESISTANCE to make it move slower.
						newOffset = currentOffset - (distance / EDGE_RESISTANCE);

					}
					// Bouncing is disabled, prevent overscrolling.
					else {
						if (newOffset < 0) {

							newOffset = 0;

						} else {

							newOffset = self.__maxScrollOffset;

						}
					}
				}

				// Keep list from growing infinitely (holding min 10, max 20 measure points)
				if (positions.length > 60) {
					positions.splice(0, 30);
				}

				// Make sure this is an integer
				newOffset = (newOffset + 0.5) | 0;

				// Track scroll movement for deceleration
				positions.push(newOffset, timeStamp);

				// Sync scroll position
				self.__publish(newOffset);

			// Otherwise figure out whether we are switching into dragging mode now.
			} else {
				var completeDistance = Math.abs(offset - self.__initialTouchOffset);

				positions.push(currentOffset, timeStamp);

				self.__isDragging = (completeDistance >= MIN_DRAG_DISTANCE);
			}

			// Update last touch positions and time stamp for next event
			self.__lastTouchOffset = offset;
			self.__lastTouchMove = timeStamp;

		},


		/**
		 * Stop the user interaction
		 */
		endInteraction: function(timeStamp) {

			var self = this;

			if (!self.__isInteracting || !self.__isDragging) {
				return;
			}

			self.__isInteracting = false;
			self.__isDragging = false;

			var scrollOffset = self.__scrollOffset;

			// If the user dragged past the bounds, just snap back.
			if(scrollOffset < 0 || scrollOffset > self.__maxScrollOffset) {
				return self.scrollTo(scrollOffset, true);
			}

			if (self.options.animating) {

				var lastTouchMove = self.__lastTouchMove;

				// Start deceleration
				// Verify that the last move detected was in some relevant time frame
				//TODO: remove magic number 100
				if(timeStamp - lastTouchMove <= 100) {

					// Then figure out what the scroll position was about 100ms ago
					var positions = self.__positions;
					var positionsIndexEnd = positions.length - 1;
					var positionsIndexStart = positionsIndexEnd;
					var positionsIndex = positionsIndexEnd;

					// Move pointer to position measured 100ms ago
					// The positions array contains alternating offset/timeStamp pairs.
					for (; positionsIndex > 0; positionsIndex = positionsIndex - 2) {
						// Did we go back far enough and found the position 100ms ago?
						if(positions[positionsIndex] <= (lastTouchMove - 100)) {
							break;
						}

						positionsIndexStart = positionsIndex;
					}

					// If start and stop position is identical in a 100ms timeframe,
					// we cannot compute any useful deceleration.
					if (positionsIndexStart !== positionsIndexEnd) {

						// Compute relative movement between these two points
						var timeOffset = positions[positionsIndexEnd] - positions[positionsIndexStart];
						var movedOffset = scrollOffset - positions[positionsIndexStart - 1];

						// Based on 50ms compute the movement to apply for each render step
						var velocity = movedOffset / timeOffset * (1000 / 60);

						// Verify that we have enough velocity to start deceleration
						if (Math.abs(velocity) > MIN_VELOCITY_FOR_DECELERATION) {
							self.__startDeceleration(velocity);
						}
					}
				}
			}

			// Fully cleanup list
			self.__positions.length = 0;

		},



		/*
		---------------------------------------------------------------------------
			PRIVATE API
		---------------------------------------------------------------------------
		*/

		/**
		 * Applies the scroll position to the content element
		 *
		 * @param left {Number} Left scroll position
		 * @param top {Number} Top scroll position
		 * @param animate {Boolean?false} Whether animation should be used to move to the new coordinates
		 */
		__publish: function(newOffset, animate) {

			var self = this;

			// Remember whether we had an animation, then we try to continue based on the current "drive" of the animation
			var wasAnimating = !!self.__animation;

			if (wasAnimating) {
				self.__animation = null;
			}

			if (animate && self.options.animating) {

				var oldOffset = self.__scrollOffset;
				var distance = newOffset - oldOffset;

				self.__animation = {
					start: Date.now(),
					duration: self.options.animationDuration,
					// When continuing based on previous animation we choose an ease-out animation instead of ease-in-out
					easing: wasAnimating ? easeOutCubic : easeInOutCubic,
					from: oldOffset,
					distance: distance
				};

			} else {

				self.__scrollOffset = newOffset;

			}
		},


		/*
		---------------------------------------------------------------------------
			ANIMATION (DECELERATION) SUPPORT
		---------------------------------------------------------------------------
		*/

		/**
		 * Called when a touch sequence end and the speed of the finger was high enough
		 * to switch into deceleration mode.
		 */
		__startDeceleration: function(velocity) {

			var self = this;

			// Calculate the duration for the deceleration animation, which is a function of the start velocity.
			// This formula simply means we apply FRICTION_PER_FRAME to the velocity every frame, until it is lower than MIN_VELOCITY_BEFORE_TERMINATING.
			var durationInFrames = (Math.log(MIN_VELOCITY_BEFORE_TERMINATING) - Math.log(Math.abs(velocity))) / Math.log(FRICTION_PER_FRAME);
			var duration = (durationInFrames / FPS) * 1000;

			// Calculate the distance that the scroller will move during this duration.
			// http://en.wikipedia.org/wiki/Geometric_series#Formula where N is the number of frames,
			// because we terminate the series when the velocity drop below a minimum.
			// This formula simply means that we add up the decelarating velocity (or the distance) every frame until we reach MIN_VELOCITY_BEFORE_TERMINATING.
			var distance = velocity * ((1 - Math.pow(FRICTION_PER_FRAME, durationInFrames)) / (1 - FRICTION_PER_FRAME));

			var offset = self.__scrollOffset;
			var newOffset = offset + distance;
			var distanceFromBounds;

			var animation = self.__animation = {
				start: Date.now(),
				duration: duration,
				easing: easeOutExpo,
				from: self.__scrollOffset,
				distance: (distance + 0.5) | 0
			};

			var overscrolled = (newOffset < 0 || newOffset > self.__maxScrollOffset);

			if(self.options.bouncing && overscrolled) {
				if(newOffset < 0) {
					animation.distance = -offset;
				} else {
					animation.distance = self.__maxScrollOffset - offset;
				}

				animation.easing = easeOutBack;
				animation.duration = animation.duration / EDGE_RESISTANCE;
			}
		}
	};

	// Copy over members to prototype.
	for(var key in members) {
		ScrollLogic.prototype[key] = members[key];
	}

	if(typeof exports !== 'undefined') {
		if(typeof module !== 'undefined' && module.exports) {
			exports = module.exports = ScrollLogic;
		}
	} else {
		window.ScrollLogic = ScrollLogic;
	}
})();

},{}],8:[function(require,module,exports){
function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ObjectAssign = require('ponies/Object.assign.js');

var _ObjectAssign2 = _interopRequireDefault(_ObjectAssign);

var _CustomEvent = require('ponies/CustomEvent.js');

var _CustomEvent2 = _interopRequireDefault(_CustomEvent);

var _scrollStatus = require('lib/scrollStatus.js');

var _scrollStatus2 = _interopRequireDefault(_scrollStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//property:value; pairs (separated by colons) separated by semicolons.
//TODO: if this isn't the perfect thing to write unit tests for then call me steve.
//TODO: a-frame allows stuff like "databaseURL: https://aframe-firebase-component.firebaseio.com;". So the left part should not be greedy to only search for the first colon.
//However, the right part should allow colons bruh. This also solves the issue with selectors like "target: .foo:not(bar)". The only reserved character is the semicolon.
//                               /([^:]+):([^;]+)/g;
var propertiesAndValuesRegex = /([^:;]+):([^:;]+)/g;
var whiteSpaceRegex = /\s+/;

var supportsPassiveEvents = function () {
	var passiveSupported = void 0;

	try {
		var options = Object.defineProperty({}, 'passive', {
			get: function get() {
				passiveSupported = true;
			}
		});

		window.addEventListener('test', options, options);
		window.removeEventListener('test', options, options);
	} catch (ignore) {
		passiveSupported = false;
	}

	return passiveSupported;
}();

//Chrome makes touchmove passive by default. We don't want none of that.
var thirdEventListenerArgument = supportsPassiveEvents ? { passive: false } : false;

var Behavior = function () {
	_createClass(Behavior, [{
		key: 'attach',
		value: function attach() {
			throw new Error('Your behavior class "' + this.constructor.name + '" needs to implement the attach() method.');
		}
	}], [{
		key: 'schema',
		get: function get() {
			throw new Error('Your behavior class "' + this.constructor.name + '" needs to implement the static "schema" getter.');
		}
	}, {
		key: 'dependencies',
		get: function get() {
			throw new Error('Your behavior class "' + this.constructor.name + '" needs to implement the static "dependencies" getter.');
		}
	}, {
		key: 'behaviorName',
		get: function get() {
			throw new Error('Your behavior class "' + this.constructor.name + '" needs to implement the static "behaviorName" getter.');
		}
	}]);

	function Behavior(element, rawProperties) {
		_classCallCheck(this, Behavior);

		this.el = element;
		this.props = {};
		this.state = {};

		this.parseProperties(rawProperties);

		if (this.scroll) {
			this.listen(_scrollStatus2.default, 'scroll', this.scroll.bind(this));
		}

		this.attach();
		this.emit('attach');
	}

	_createClass(Behavior, [{
		key: 'destructor',
		value: function destructor() {
			//Clean up all event listeners added using listen/listenAndInvoke.
			if (this.listeners) {
				for (var i = 0; i < this.listeners.length; i++) {
					var listener = this.listeners[i];

					//listen works for both DOM elements and event emitters using on/off.
					if (typeof listener.element.removeEventListener === 'function') {
						listener.element.removeEventListener(listener.event, listener.callback);
					} else {
						listener.element.off(listener.event, listener.callback);
					}
				}
			}

			if (this.detach) {
				this.detach();
			}

			this.emit('detach');
		}
	}, {
		key: 'setState',
		value: function setState(newState) {
			var prevState = (0, _ObjectAssign2.default)({}, this.state);

			(0, _ObjectAssign2.default)(this.state, newState);

			if (this.update) {
				this.update(this.props, prevState);
			}

			this.emit('update');
		}
	}, {
		key: 'listen',
		value: function listen(element, eventName, callback) {
			var _this = this;

			//Space separated list of event names for the same element and callback.
			if (eventName.indexOf(' ') !== -1) {
				eventName.split(' ').map(function (s) {
					return s.trim();
				}).forEach(function (s) {
					_this.listen(element, s, callback);
				});

				return;
			}

			//listen works for both DOM elements and event emitters using on/off.
			if (typeof element.addEventListener === 'function') {
				element.addEventListener(eventName, callback, thirdEventListenerArgument);
			} else {
				element.on(eventName, callback);
			}

			if (!this.listeners) {
				this.listeners = [];
			}

			this.listeners.push({ element: element, eventName: eventName, callback: callback });
		}
	}, {
		key: 'listenAndInvoke',
		value: function listenAndInvoke(element, eventName, callback) {
			this.listen(element, eventName, callback);
			callback();
		}
	}, {
		key: 'emit',
		value: function emit(name, params) {
			//Namespace the event to the name of the behavior.
			name = this.constructor.behaviorName + ':' + name;

			var event = new _CustomEvent2.default(name, {
				bubbles: true,
				cancelable: false,
				details: params
			});

			this.el.dispatchEvent(event);
		}
	}, {
		key: 'updateProperties',
		value: function updateProperties(rawProperties) {
			var prevProps = (0, _ObjectAssign2.default)({}, this.props);

			this.parseProperties(rawProperties);

			if (this.update) {
				this.update(prevProps, this.state);
			}

			this.emit('update');
		}

		//TODO: This might not belong to the behavior itself but to the schemas/types folder, which can then be tested much easier

	}, {
		key: 'parseProperties',
		value: function parseProperties(rawProperties) {
			var schema = this.constructor.schema;
			var rawPropertiesMap = {};
			var match = void 0;

			propertiesAndValuesRegex.lastIndex = 0;

			while ((match = propertiesAndValuesRegex.exec(rawProperties)) !== null) {
				var property = match[1].trim();
				var rawValue = match[2];

				if (!schema.hasOwnProperty(property)) {
					throw new Error('You have defined a property "' + property + '" in your HTML that "' + this.constructor.name + '" is not expecting. The value was "' + rawValue + '".');
				}

				rawPropertiesMap[property] = rawValue;
			}

			for (var key in schema) {
				if (!schema.hasOwnProperty(key)) {
					continue;
				}

				if (!rawPropertiesMap.hasOwnProperty(key)) {
					//The schema specifies a property that is currently not defined and no default was specified.
					//TODO: does that imply they are all required? What if falsy properties are OK?
					//So far I'm leaning towards yes, they're ALL required. Keywords like "none" or "0" work well as defaults.
					//This makes parts of the code much easier and consistent. KISS.
					if (!schema[key].hasOwnProperty('default')) {
						//TODO: this error message does not help people who only write HTML and don't even know what the class is.
						//It should simply be something like "The layout attribute misses the required guides property"
						//Don't get too technical.
						throw new Error('You are missing the "' + key + '" property for the ' + this.constructor.name + ' class, which has no default value.');
					} else {
						//There is a default specified, use it.
						this.props[key] = this.parseProperty(key, schema[key].default, schema[key].type);
						continue;
					}
				}

				this.props[key] = this.parseProperty(key, rawPropertiesMap[key], schema[key].type);
			}
		}
	}, {
		key: 'parseProperty',
		value: function parseProperty(property, rawValue, propertyType) {
			var _this2 = this;

			if (propertyType instanceof Array) {
				//thing: keyword, anotherone, and, more
				//a.thing = ['keyword', 'anotherone', 'and', 'more']
				//or
				//thing: keyword 30px 30px, anotherone 100px 8px
				//a.thing = [['keyword', {length: 30, unit: 'px'}, {length: 30, unit: 'px'}], [...]];
				if (propertyType.length === 1) {
					propertyType = propertyType[0];

					if (propertyType instanceof Array) {
						//thing: keyword 30px 30px, anotherone 100px 8px
						//a.thing = [['keyword', {length: 30, unit: 'px'}, {length: 30, unit: 'px'}], [...]];
						var rawValuesList = rawValue.split(',');

						return rawValuesList.map(function (rawValue, index) {
							return _this2.parseProperty(property, rawValue, propertyType);
						});
					} else {
						//thing: keyword, anotherone, and, more
						//a.thing = ['keyword', 'anotherone', 'and', 'more']
						var _rawValuesList = rawValue.split(',');

						return _rawValuesList.map(function (rawValue) {
							return propertyType.parse(rawValue);
						});
					}
				} else if (propertyType.length > 1) {
					//thing: keyword 100px
					//a.thing = ['keyword', {length: 100, unit: 'px'}]
					var _rawValuesList2 = rawValue.trim().split(whiteSpaceRegex);

					if (_rawValuesList2.length !== propertyType.length) {
						throw new Error('The schema for the "' + property + '" property of the "' + this.constructor.name + '" class expects ' + propertyType.length + ' values. Got ' + _rawValuesList2.length + ', namely "' + _rawValuesList2.join(' ') + '".');
					}

					var map = {};

					for (var rawValueIndex = 0; rawValueIndex < _rawValuesList2.length; rawValueIndex++) {
						var namedPropertyType = propertyType[rawValueIndex];
						var keys = Object.keys(namedPropertyType);

						if (keys.length !== 1) {
							throw new Error('A nested schema should have exactly one key (the name) which maps to the type.');
						}

						var name = keys[0];
						var _rawValue = _rawValuesList2[rawValueIndex];

						map[name] = namedPropertyType[name].parse(_rawValue, this.el);
					}

					return map;
				} else {
					throw new Error('You have defined an empty array as schema type for the "' + property + '"" property of the "' + this.constructor.name + '" class.');
				}
			} else {
				//thing: keyword
				//a.thing = 'keyword'
				return propertyType.parse(rawValue, this.el);
			}
		}
	}]);

	return Behavior;
}();

exports.default = Behavior;

},{"lib/scrollStatus.js":23,"ponies/CustomEvent.js":24,"ponies/Object.assign.js":25}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _StringType = require('types/StringType.js');

var _StringType2 = _interopRequireDefault(_StringType);

var _Behavior2 = require('behaviors/Behavior.js');

var _Behavior3 = _interopRequireDefault(_Behavior2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DebugGuidesBehavior = function (_Behavior) {
	_inherits(DebugGuidesBehavior, _Behavior);

	function DebugGuidesBehavior() {
		_classCallCheck(this, DebugGuidesBehavior);

		return _possibleConstructorReturn(this, (DebugGuidesBehavior.__proto__ || Object.getPrototypeOf(DebugGuidesBehavior)).apply(this, arguments));
	}

	_createClass(DebugGuidesBehavior, [{
		key: 'attach',
		value: function attach() {
			var _this2 = this;

			this._createElement();

			//Whenever the guide layout updates, render the guides.
			this.listenAndInvoke(this.el, 'guidelayout:layout', function () {
				_this2._renderGuides();
			});
		}
	}, {
		key: 'detach',
		value: function detach() {
			this._removeElement();
		}
	}, {
		key: '_createElement',
		value: function _createElement() {
			this._guidesWrapper = document.createElement('div');
			this._guidesWrapper.style.cssText = '\n\t\t\tposition: fixed;\n\t\t\tleft: 0;\n\t\t\ttop: 0;\n\t\t\twidth: 100%;\n\t\t\theight: 100%;\n\t\t\tpointer-events: none;\n\t\t';

			if (document.body) {
				document.body.appendChild(this._guidesWrapper);
			}
		}
	}, {
		key: '_removeElement',
		value: function _removeElement() {
			if (document.body) {
				document.body.removeChild(this._guidesWrapper);
			}
		}
	}, {
		key: '_renderGuides',
		value: function _renderGuides() {
			var _this3 = this;

			var guides = this.el.guidelayout.engine.guides;
			var html = guides.map(function (guide) {
				var width = guide.width;
				var opacity = 0.2;

				if (guide.width === 0) {
					width = 1;
					opacity = 1;
				}

				return '\n\t\t\t\t<div title="' + guide.name + '" style="position: absolute; top: 0; bottom: 0; background:' + _this3.props.color + '; left: ' + guide.rightPosition + 'px; opacity: ' + opacity + '; px; width: ' + width + 'px;"></div>\n\t\t\t';
			});

			this._guidesWrapper.innerHTML = html.join('');
		}
	}], [{
		key: 'schema',
		get: function get() {
			return {
				color: {
					type: _StringType2.default,
					default: '#0cf'
				}
			};
		}
	}, {
		key: 'dependencies',
		get: function get() {
			return ['guidelayout'];
		}
	}, {
		key: 'behaviorName',
		get: function get() {
			return 'debugguides';
		}
	}]);

	return DebugGuidesBehavior;
}(_Behavior3.default);

exports.default = DebugGuidesBehavior;

},{"behaviors/Behavior.js":9,"types/StringType.js":35}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Behavior2 = require('behaviors/Behavior.js');

var _Behavior3 = _interopRequireDefault(_Behavior2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DebugGuidesBehavior = function (_Behavior) {
	_inherits(DebugGuidesBehavior, _Behavior);

	function DebugGuidesBehavior() {
		_classCallCheck(this, DebugGuidesBehavior);

		return _possibleConstructorReturn(this, (DebugGuidesBehavior.__proto__ || Object.getPrototypeOf(DebugGuidesBehavior)).apply(this, arguments));
	}

	_createClass(DebugGuidesBehavior, [{
		key: 'attach',
		value: function attach() {
			this.el.style.opacity = 1;
		}
	}, {
		key: 'detach',
		value: function detach() {
			this.el.style.opacity = '';
		}
	}], [{
		key: 'schema',
		get: function get() {
			return {};
		}
	}, {
		key: 'dependencies',
		get: function get() {
			return [];
		}
	}, {
		key: 'behaviorName',
		get: function get() {
			return 'fadein';
		}
	}]);

	return DebugGuidesBehavior;
}(_Behavior3.default);

exports.default = DebugGuidesBehavior;

},{"behaviors/Behavior.js":9}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _scrollLogic = require('scroll-logic');

var _scrollLogic2 = _interopRequireDefault(_scrollLogic);

var _scrollStatus = require('lib/scrollStatus.js');

var _scrollStatus2 = _interopRequireDefault(_scrollStatus);

var _fakeClick = require('lib/fakeClick.js');

var _fakeClick2 = _interopRequireDefault(_fakeClick);

var _isTextInput = require('lib/isTextInput.js');

var _isTextInput2 = _interopRequireDefault(_isTextInput);

var _GuideLayoutEngine = require('lib/GuideLayoutEngine.js');

var _GuideLayoutEngine2 = _interopRequireDefault(_GuideLayoutEngine);

var _GuideDefinitionType = require('types/GuideDefinitionType.js');

var _GuideDefinitionType2 = _interopRequireDefault(_GuideDefinitionType);

var _CSSLengthType = require('types/CSSLengthType.js');

var _CSSLengthType2 = _interopRequireDefault(_CSSLengthType);

var _Behavior2 = require('behaviors/Behavior.js');

var _Behavior3 = _interopRequireDefault(_Behavior2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isAndroidFirefox = /Android; (?:Mobile|Tablet); .+ Firefox/i.test(navigator.userAgent);
var isBadAndroid = /Android /.test(navigator.userAgent) && !/Chrome\/\d/.test(navigator.userAgent);
var isAppleiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

var LayoutBehavior = function (_Behavior) {
	_inherits(LayoutBehavior, _Behavior);

	function LayoutBehavior() {
		_classCallCheck(this, LayoutBehavior);

		return _possibleConstructorReturn(this, (LayoutBehavior.__proto__ || Object.getPrototypeOf(LayoutBehavior)).apply(this, arguments));
	}

	_createClass(LayoutBehavior, [{
		key: 'attach',
		value: function attach() {
			this.state = {
				scrollMode: 'touch'
			};

			this._layoutScheduled = false;
			this._lastRenderTime = -1;

			this._setupScrolling();
			this._initLayoutEngine();
			(0, _raf2.default)(this._scrollLoop.bind(this));
		}
	}, {
		key: 'detach',
		value: function detach() {}
	}, {
		key: 'update',
		value: function update() {
			this._updateScrollHeight();
		}
	}, {
		key: '_setupScrolling',
		value: function _setupScrolling() {
			this._setupMobileScrolling();
			this._handleScrollModes();
		}
	}, {
		key: '_setupMobileScrolling',
		value: function _setupMobileScrolling() {
			var _this2 = this;

			this._scrollLogic = new _scrollLogic2.default({
				bouncing: true
			});

			this.listen(document, 'touchstart', function (e) {
				//For caret positioning on mobile.
				//On "bad" Android (stock browser) preventing touchstart will cause touchmove to not fire.
				if (!(0, _isTextInput2.default)(e.target) && !isBadAndroid) {
					e.preventDefault();
					_fakeClick2.default.start(e);
				}

				_this2._mousemoveCounter = 0;
				_this2._scrollLogic.beginInteraction(e.changedTouches[0].pageY, e.timeStamp);
			});

			this.listen(document, 'touchmove', function (e) {
				e.preventDefault();

				_this2._mousemoveCounter = 0;
				_this2._scrollLogic.interact(e.changedTouches[0].pageY, e.timeStamp);
			});

			this.listen(document, 'touchend touchcancel', function (e) {
				//For caret positioning on mobile.
				if (!(0, _isTextInput2.default)(e.target) && !isBadAndroid) {
					e.preventDefault();
					_fakeClick2.default.end(e);
				}

				_this2._mousemoveCounter = 0;
				_this2._scrollLogic.endInteraction(e.timeStamp);
			});
		}

		//This thing intelligently switches between fake and native scrolling.
		//It does not do any sniffing and instead relies on scroll, mousemove and touchstart events.
		//It also preserves scroll position when switching.

	}, {
		key: '_handleScrollModes',
		value: function _handleScrollModes() {
			var _this3 = this;

			var waitForNativeAction = function waitForNativeAction() {
				var oneNative = function oneNative(e) {
					window.removeEventListener('mousemove', threeMousemove, false);
					window.removeEventListener('scroll', oneNative, false);

					//Move the scroll offset over from fake to native scrolling.
					var scrollPosition = _this3._scrollLogic.getOffset();

					//This compensates the amount scrolling that JUST happened.
					//Imagine using pageup/down keys, we would lose the first jump otherwise.
					var delta = _this3._getNativeScrollPosition() - _this3._lastNativeScrollPosition;

					window.scrollTo(0, scrollPosition + delta);

					_this3.setState({
						scrollMode: 'native'
					});

					waitForFakeAction();
				};

				var threeMousemove = function threeMousemove(e) {
					//Cheez. Some mobile browsers (*cough* Android *cough*) trigger mousemove before ANYTHING else.
					//Even before touchstart. But they will only trigger a single mousemove for any touch sequence.
					//To make sure we only get real mousemoves, we wait for three consecutive events.
					//We reset this counter every time we receive a touch event.
					//Note: it was 2 before, now 3. Because Android Firefox does weird things inside a textarea.
					_this3._mousemoveCounter++;

					if (_this3._mousemoveCounter !== 3) {
						return;
					}

					_this3._mousemoveCounter = 0;

					oneNative(e);
				};

				//A "mousemove" event is a strong indicator that we're on a desktop device.
				//"mousemove" makes sure that we switch to native scrolling even if we haven't scrolled yet.
				//In reality this means stuff like iframes are immediately accessible on desktop.
				window.addEventListener('mousemove', threeMousemove, false);

				//We should never get a scroll event on mobile because we prevent it.
				//So that's the strongest desktop indicator you can get.
				window.addEventListener('scroll', oneNative, false);
			};

			var waitForFakeAction = function waitForFakeAction() {
				var oneTouchStart = function oneTouchStart() {
					document.removeEventListener('touchstart', oneTouchStart, false);

					//Move the scroll offset over from native to fake scrolling.
					var scrollPosition = Math.round(_this3._getNativeScrollPosition());
					_this3._scrollLogic.scrollTo(scrollPosition);

					_this3._mousemoveCounter = 0;

					_this3.setState({
						scrollMode: 'touch'
					});

					waitForNativeAction();
				};

				document.addEventListener('touchstart', oneTouchStart, false);
			};

			//By default we assume we're in fake scrolling mode.
			//This makes sure the user can scroll on iframes if this happens to be the first thing she touches.
			this._mousemoveCounter = 0;
			waitForNativeAction();
		}
	}, {
		key: '_getNativeScrollPosition',
		value: function _getNativeScrollPosition() {
			return document.documentElement.scrollTop || document.body.scrollTop;
		}
	}, {
		key: 'scrollTo',
		value: function scrollTo(position) {
			position = Math.round(position);

			if (this.state.scrollMode === 'native') {
				window.scrollTo(0, position);
			} else {
				this._scrollLogic.scrollTo(position);
			}
		}
	}, {
		key: '_initLayoutEngine',
		value: function _initLayoutEngine() {
			var _this4 = this;

			this.engine = new _GuideLayoutEngine2.default();

			this.listenAndInvoke(window, 'resize', function () {
				var viewport = _this4._getViewport();
				_this4.engine.updateViewport(viewport);
				_this4._scheduleLayout();
			});

			//Whenever a new layout behavior is attached or changed, we need to do layout.
			this.listen(document, 'layout:attach layout:update', this._scheduleLayout.bind(this));
		}
	}, {
		key: '_scrollLoop',
		value: function _scrollLoop(now) {
			//The very first frame doesn't have a previous one.
			if (this._lastRenderTime === -1) {
				this._lastRenderTime = now;
			}

			this._pollScrollPosition(now, this._lastRenderTime);

			this._lastRenderTime = now;
			(0, _raf2.default)(this._scrollLoop.bind(this));
		}
	}, {
		key: '_pollScrollPosition',
		value: function _pollScrollPosition(now, lastRenderTime) {
			var currentScrollPosition = void 0;

			if (this._scrollAnimation) {
				currentScrollPosition = this._getScrollPositionFromAnimation();
			} else {
				if (this.state.scrollMode === 'touch') {
					currentScrollPosition = this._scrollLogic.getOffset();
				} else {
					currentScrollPosition = this._lastNativeScrollPosition = Math.round(this._getNativeScrollPosition());
				}
			}

			_scrollStatus2.default.tick(now, currentScrollPosition, this.engine);
		}
	}, {
		key: '_getViewport',
		value: function _getViewport() {
			var documentElement = document.documentElement;

			if (!documentElement) {
				throw new Error('There is no documentElement to get the size of.');
			}

			var originalOverflow = documentElement.style.overflowY;

			//Force a scrollbar to get the inner dimensions.
			documentElement.style.overflowY = 'scroll';

			var width = documentElement.clientWidth;
			var height = documentElement.clientHeight;

			//Force NO scrollbar to get the outer dimensions.
			documentElement.style.overflowY = 'hidden';

			var outerWidth = documentElement.clientWidth;
			var outerHeight = documentElement.clientHeight;

			//Restore overflow.
			documentElement.style.overflowY = originalOverflow;

			return {
				width: width,
				height: height,
				outerWidth: outerWidth,
				outerHeight: outerHeight
			};
		}
	}, {
		key: '_scheduleLayout',
		value: function _scheduleLayout() {
			if (!this._layoutScheduled) {
				(0, _raf2.default)(this._doLayout.bind(this));
				this._layoutScheduled = true;
			}
		}

		//TODO: do we also need to clean up here if the dimensions/position behavior is removed?
		//Or do the behaviors handle this (they should)? Do they listen to the layout event on this node?

	}, {
		key: '_doLayout',
		value: function _doLayout() {
			this._layoutScheduled = false;

			var elements = this.el.querySelectorAll('[layout]');

			this.engine.doLayout(elements, this.props.guides, this.props.width);

			this._updateScrollHeight();

			this.emit('layout');
		}
	}, {
		key: '_updateScrollHeight',
		value: function _updateScrollHeight() {
			var requiredHeight = this.engine.requiredHeight;
			var documentElement = document.documentElement;

			if (!documentElement) {
				throw new Error('There is no documentElement to get the size of.');
			}

			//Firefox on Android will scroll natively to remove the addressbar.
			//This can not be prevented, even with preventDefault on the touch events.
			//Since moving the addressbar causes doLayout calls, it performs bad.
			//http://stackoverflow.com/questions/28129663/firefox-on-android-prevent-adressbar-from-disappearing
			//It's also causing trouble on Android stock browser with scrollMode detection.
			//We also recently added this for iOS because it was the only thing breaking iframe embeds.
			//On iOS the iframe will scale to the height of its content, but we query the window height.
			//So basically it was growing ENDLESSLY (100vh kept getting larger)!
			if (isAndroidFirefox || isBadAndroid || isAppleiOS) {
				documentElement.style.overflow = 'visible';
				this.el.style.height = 0;
			} else {
				this.el.style.height = Math.round(requiredHeight) + 'px';
			}

			this._scrollLogic.setContainerLength(this.engine.viewport.height);
			this._scrollLogic.setContentLength(requiredHeight);

			_scrollStatus2.default.maxPosition = requiredHeight - this.engine.viewport.height;

			//Make sure we don't lose our relative scroll position.
			this.scrollTo(_scrollStatus2.default.maxPosition * _scrollStatus2.default.progress);
		}
	}], [{
		key: 'schema',
		get: function get() {
			return {
				guides: {
					type: [_GuideDefinitionType2.default]
					//TODO: can we default to an empty array here by using an empty string?
				},
				width: {
					type: _CSSLengthType2.default,
					default: '1280px'
				}
			};
		}
	}, {
		key: 'dependencies',
		get: function get() {
			return [];
		}
	}, {
		key: 'behaviorName',
		get: function get() {
			return 'guidelayout';
		}
	}]);

	return LayoutBehavior;
}(_Behavior3.default);

exports.default = LayoutBehavior;

},{"behaviors/Behavior.js":9,"lib/GuideLayoutEngine.js":20,"lib/fakeClick.js":21,"lib/isTextInput.js":22,"lib/scrollStatus.js":23,"raf":5,"scroll-logic":7,"types/CSSLengthType.js":29,"types/GuideDefinitionType.js":31}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _resizeObserverPolyfill = require('resize-observer-polyfill');

var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

var _BooleanType = require('types/BooleanType.js');

var _BooleanType2 = _interopRequireDefault(_BooleanType);

var _StringType = require('types/StringType.js');

var _StringType2 = _interopRequireDefault(_StringType);

var _LayoutDependencyType = require('types/LayoutDependencyType.js');

var _LayoutDependencyType2 = _interopRequireDefault(_LayoutDependencyType);

var _HeightType = require('types/HeightType.js');

var _HeightType2 = _interopRequireDefault(_HeightType);

var _FollowerModeType = require('types/FollowerModeType.js');

var _FollowerModeType2 = _interopRequireDefault(_FollowerModeType);

var _CSSLengthType = require('types/CSSLengthType.js');

var _CSSLengthType2 = _interopRequireDefault(_CSSLengthType);

var _Behavior2 = require('behaviors/Behavior.js');

var _Behavior3 = _interopRequireDefault(_Behavior2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DimensionsBehavior = function (_Behavior) {
	_inherits(DimensionsBehavior, _Behavior);

	function DimensionsBehavior() {
		_classCallCheck(this, DimensionsBehavior);

		return _possibleConstructorReturn(this, (DimensionsBehavior.__proto__ || Object.getPrototypeOf(DimensionsBehavior)).apply(this, arguments));
	}

	_createClass(DimensionsBehavior, [{
		key: 'attach',
		value: function attach() {
			var _this2 = this;

			this.state = {
				height: 0
			};

			this._scrollUpdate = {};

			this._wrapContents();

			//Listen to the layout event of the layout behavior.
			//TODO: is gut? We can always refactor, but does this make sense though?
			//This means possibly hundreds of DimensionsBehaviors will react to this event.
			//We could instead reverse the responsibility and have the layout behavior
			//Call a method on each of the children.
			//Maybe we should just merge Dimensions+PositionBehavior because they belong together anyway.
			//this.parentEl instead of document
			this.listen(document, 'guidelayout:layout', function () {
				_this2._render();
			});

			if (this.props.height === 'auto') {
				this._observeHeight();
			}
		}
	}, {
		key: 'update',
		value: function update(prevProps) {
			if (this.props.height !== prevProps.height) {
				if (this.props.height === 'auto') {
					this._observeHeight();
				} else if (prevProps.height === 'auto') {
					this._unobserveHeight();
				}
			}
		}
	}, {
		key: 'detach',
		value: function detach() {
			this._unobserveHeight();
			this._unwrapContents();
		}
	}, {
		key: 'scroll',
		value: function scroll(status, engine) {
			var scrollUpdate = this._scrollUpdate;
			var didMove = engine.doScroll(this, status.position, scrollUpdate);

			if (didMove) {
				var _left = Math.round(this.left);
				var _top = scrollUpdate.wrapperTop;
				var style = this.el.style;

				style.msTransform = 'translate(' + _left + 'px, ' + _top + 'px)';
				style.transform = style.WebkitTransform = 'translate3d(' + _left + 'px, ' + _top + 'px, 0)';

				//We force the tile to be visible (loaded into GPU) when it is inside the viewport.
				//But we do not do the opposite here. This is just the last resort.
				//Under normal circumstances an async process (handleScrollPause) toggles display block/none intelligently.
				if (scrollUpdate.inViewport) {
					style.display = 'block';
				}

				//The reason we don't blindly apply the CSS transform is that most elements don't need a transform on the content layer at all.
				//This would waste a ton of GPU memory for no reason. The only elements that need it are things like parallax scrolling
				//or elements with appear effects using scaling/rotation.
				var innerStyle = this.innerEl.style;
				innerStyle.msTransform = 'translate(0, ' + scrollUpdate.contentTopOffset + 'px)';
				innerStyle.transform = innerStyle.WebkitTransform = 'translate3d(0px, ' + scrollUpdate.contentTopOffset + 'px, 0)';

				//TODO: I was here trying to implement clipping, e.g. scrollupdate.wrapperTop and wrapperHeight
			}

			//TODO: we need to combine _render and scroll and make sure they're consistently called (need access to the engine tho).
		}

		//Some of the layout rendering (e.g. clipping with parallax) requires a single child element.

	}, {
		key: '_wrapContents',
		value: function _wrapContents() {
			//Includes elements and also text nodes.
			var childNodes = this.el.childNodes;
			var childElements = this.el.children;

			//There is just a single element, maybe we don't need to wrap anything (*fingers crossed*).
			if (childElements.length === 1) {
				//There are no text nodes, just this one element. #winning
				if (childNodes.length === 1) {
					this.innerEl = childElements[0];
					return;
				}

				//There is a single element as child, but there might also be whitespace (text nodes) around it.
				//Check if there is nothing but "empty" text nodes, which we can ignore.
				//This catches cases such as the following, where the whitespace (nl, tab) around the <img> is irrelevant.
				//<el-meister>
				//	<img>
				//</el-meister>
				var onlyEmptyTextNodes = true;

				for (var i = 0; i < childNodes.length; i++) {
					var child = childNodes[i];

					if (child.textContent.trim() !== '') {
						onlyEmptyTextNodes = false;
						break;
					}
				}

				if (onlyEmptyTextNodes) {
					this.innerEl = childElements[0];
					return;
				}
			}

			console.log('Wrapped ' + childNodes.length + ' children in a <div>');

			this._wrappedContents = true;

			var fragment = document.createDocumentFragment();
			this.innerEl = document.createElement('div');

			//childNodes is a live list.
			while (childNodes.length > 0) {
				fragment.appendChild(childNodes[0]);
			}

			this.innerEl.appendChild(fragment);
			this.el.appendChild(this.innerEl);
		}
	}, {
		key: '_unwrapContents',
		value: function _unwrapContents() {
			if (this._wrappedContents) {
				var childNodes = this.innerEl.childNodes;
				var fragment = document.createDocumentFragment();

				//childNodes is a live list.
				while (childNodes.length > 0) {
					fragment.appendChild(childNodes[0]);
				}

				this.el.removeChild(this.innerEl);
				this.el.appendChild(fragment);
			}
		}
	}, {
		key: '_observeHeight',
		value: function _observeHeight() {
			var _this3 = this;

			this._resizeObserver = new _resizeObserverPolyfill2.default(function (entries) {
				_this3.setState({
					height: entries[0].contentRect.height
				});
			});

			this._resizeObserver.observe(this.innerEl);
		}
	}, {
		key: '_unobserveHeight',
		value: function _unobserveHeight() {
			if (this._resizeObserver) {
				this._resizeObserver.disconnect();
				this._resizeObserver = null;
			}
		}
	}, {
		key: '_render',
		value: function _render() {
			this._renderWrapper();
			this._renderInner();
		}
	}, {
		key: '_canSafelyBeUnloadedFromGPU',
		value: function _canSafelyBeUnloadedFromGPU() {
			//It's not safe to hide tiles with auto-height because we query the DOM for their height.
			return this.props.height !== 'auto';
		}
	}, {
		key: '_renderWrapper',
		value: function _renderWrapper() {
			var style = this.el.style;
			var display = this._canSafelyBeUnloadedFromGPU() ? 'none' : 'block';
			var overflow = 'visible';
			var width = this.width;
			var height = this.height;

			//TODO: the layout engine shouldn't directly add values to the behavior, but scope them like props and state.
			if (this.props.clip) {
				height = this.clipRect.height;
				overflow = 'hidden';
			}

			style.display = display;
			style.overflow = overflow;
			style.width = Math.round(width) + 'px';
			style.height = Math.round(height) + 'px';
			style.msTransform = 'translate(0, 0)';
			style.transform = style.WebkitTransform = 'translate3d(0, 0, 0.00001)';
		}
	}, {
		key: '_renderInner',
		value: function _renderInner() {
			var style = this.innerEl.style;
			var width = this.width;
			var height = this.props.height === 'auto' ? 'auto' : this.height;

			style.width = Math.round(width) + 'px';
			style.height = Math.round(height) + 'px';

			if (this.props.clip) {
				style.backfaceVisibility = style.WebkitBackfaceVisibility = 'hidden';
			}
		}
	}], [{
		key: 'schema',

		//TODO: instead of StringType or LayoutDependencyType we need to give them names such as "string" and "layout-dependency".
		//Otherwise you cannot just create a custom behavior in a <script> tag without importing the types.
		get: function get() {
			return {
				guides: {
					type: [{ left: _StringType2.default }, { right: _StringType2.default }]
				},
				height: {
					type: _HeightType2.default,
					default: 'auto'
				},
				mode: {
					type: _StringType2.default.createEnum('mode', ['flow', 'follow']),
					default: 'flow'
				},
				followerMode: {
					type: _StringType2.default.createEnum('followerMode', ['parallax', 'pin']),
					default: 'parallax'
				},
				clip: {
					type: _BooleanType2.default,
					default: 'false'
				},
				pinAnchor: {
					type: _StringType2.default.createEnum('pinAnchor', ['top', 'center', 'bottom']),
					default: 'center'
				},
				pinOffset: {
					type: _CSSLengthType2.default,
					default: '0'
				},
				dependencies: {
					type: _LayoutDependencyType2.default,
					default: 'inherit'
				},
				spacing: {
					type: [{ top: _CSSLengthType2.default }, { bottom: _CSSLengthType2.default }],
					//TODO: in cases like this we might want to accept "100vh" and automatically expand it to "100vh 100vh" (for arity 2 and 4).
					//When arity is 2, expand 100vh to 100vh 100vh. If it is 4, do the CSS dance.
					//E.g. 100vh 40vh expands to 100vh 40vh 100vh 40vh
					//and 100vh 30vh 40vh to 100vh 30vh 40vh 30vh
					//expand: true,
					//For now KISS
					default: '0 0'
				}
			};
		}
	}, {
		key: 'behaviorName',
		get: function get() {
			return 'layout';
		}
	}, {
		key: 'dependencies',
		get: function get() {
			return [];
		}
	}]);

	return DimensionsBehavior;
}(_Behavior3.default);

exports.default = DimensionsBehavior;

},{"behaviors/Behavior.js":9,"resize-observer-polyfill":6,"types/BooleanType.js":28,"types/CSSLengthType.js":29,"types/FollowerModeType.js":30,"types/HeightType.js":32,"types/LayoutDependencyType.js":33,"types/StringType.js":35}],14:[function(require,module,exports){
'use strict';

var _scrollmeister = require('scrollmeister.js');

var _scrollmeister2 = _interopRequireDefault(_scrollmeister);

var _GuideLayoutBehavior = require('behaviors/GuideLayoutBehavior.js');

var _GuideLayoutBehavior2 = _interopRequireDefault(_GuideLayoutBehavior);

var _DebugGuidesBehavior = require('behaviors/DebugGuidesBehavior.js');

var _DebugGuidesBehavior2 = _interopRequireDefault(_DebugGuidesBehavior);

var _FadeInBehavior = require('behaviors/FadeInBehavior.js');

var _FadeInBehavior2 = _interopRequireDefault(_FadeInBehavior);

var _LayoutBehavior = require('behaviors/LayoutBehavior.js');

var _LayoutBehavior2 = _interopRequireDefault(_LayoutBehavior);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_scrollmeister2.default.defineBehavior(_GuideLayoutBehavior2.default);
_scrollmeister2.default.defineBehavior(_DebugGuidesBehavior2.default);
_scrollmeister2.default.defineBehavior(_FadeInBehavior2.default);

_scrollmeister2.default.defineBehavior(_LayoutBehavior2.default);

},{"behaviors/DebugGuidesBehavior.js":10,"behaviors/FadeInBehavior.js":11,"behaviors/GuideLayoutBehavior.js":12,"behaviors/LayoutBehavior.js":13,"scrollmeister.js":27}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _scrollmeister = require('scrollmeister.js');

var _scrollmeister2 = _interopRequireDefault(_scrollmeister);

var _MeisterComponent2 = require('./MeisterComponent.js');

var _MeisterComponent3 = _interopRequireDefault(_MeisterComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ElementMeisterComponent = function (_MeisterComponent) {
	_inherits(ElementMeisterComponent, _MeisterComponent);

	function ElementMeisterComponent() {
		_classCallCheck(this, ElementMeisterComponent);

		return _possibleConstructorReturn(this, (ElementMeisterComponent.__proto__ || Object.getPrototypeOf(ElementMeisterComponent)).apply(this, arguments));
	}

	_createClass(ElementMeisterComponent, null, [{
		key: 'observedAttributes',
		get: function get() {
			return _scrollmeister2.default.getDefinedBehaviorNames();
		}
	}]);

	return ElementMeisterComponent;
}(_MeisterComponent3.default);

exports.default = ElementMeisterComponent;

},{"./MeisterComponent.js":16,"scrollmeister.js":27}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _scrollmeister = require('scrollmeister.js');

var _scrollmeister2 = _interopRequireDefault(_scrollmeister);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollMeisterComponent = function (_HTMLElement) {
	_inherits(ScrollMeisterComponent, _HTMLElement);

	// Note: if you feel clever and think you can just define
	// the static `observedAttributes` getter on the super class: IE 9/10.

	// https://github.com/WebReflection/document-register-element/tree/7e2743d38f0bf01806cb9b76ba254f62f8cb24b2#v1-caveat
	// $FlowFixMe: Won't be fixed ;)
	function ScrollMeisterComponent(_) {
		var _this, _ret;

		_classCallCheck(this, ScrollMeisterComponent);

		// $FlowFixMe: Won't be fixed ;)
		return _ret = ((_ = (_this = _possibleConstructorReturn(this, (ScrollMeisterComponent.__proto__ || Object.getPrototypeOf(ScrollMeisterComponent)).call(this, _)), _this)).init(), _), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(ScrollMeisterComponent, [{
		key: 'init',
		value: function init() {
			this._scrollBehaviors = [];
			this._scheduledBatchUpdate = false;
			this._scheduledBehaviors = {
				attach: {},
				detach: {}
			};
		}
	}, {
		key: 'connectedCallback',
		value: function connectedCallback() {}
	}, {
		key: 'disconnectedCallback',
		value: function disconnectedCallback() {
			_raf2.default.cancel(this._batchHandle);

			// $FlowFixMe: We expect this static property on the subclass. Nobody will ever create an instance of just MeisterComponent.
			var observedAttributes = this.constructor.observedAttributes;

			//Remove all attached behaviors so they can be garbage collected.
			for (var i = 0; i < observedAttributes.length; i++) {
				var attr = observedAttributes[i];

				_scrollmeister2.default.detachBehavior(this, attr);
			}
		}
	}, {
		key: 'attributeChangedCallback',
		value: function attributeChangedCallback(attr, oldValue, newValue) {
			if (!this._scheduledBatchUpdate) {
				this._scheduledBatchUpdate = true;
				this._batchHandle = (0, _raf2.default)(this._batchUpdateBehaviors.bind(this));
			}

			if (newValue === null) {
				this._scheduledBehaviors.detach[attr] = true;
				delete this._scheduledBehaviors.attach[attr];
			} else {
				this._scheduledBehaviors.attach[attr] = newValue;
				delete this._scheduledBehaviors.detach[attr];
			}
		}
	}, {
		key: '_batchUpdateBehaviors',
		value: function _batchUpdateBehaviors() {
			this._scheduledBatchUpdate = false;

			for (var key in this._scheduledBehaviors.detach) {
				if (this._scheduledBehaviors.detach.hasOwnProperty(key)) {
					_scrollmeister2.default.detachBehavior(this, key);
					delete this._scheduledBehaviors.detach[key];
				}
			}

			for (var _key in this._scheduledBehaviors.attach) {
				if (this._scheduledBehaviors.attach.hasOwnProperty(_key)) {
					_scrollmeister2.default.attachBehavior(this, _key, this._scheduledBehaviors.attach[_key]);
					delete this._scheduledBehaviors.attach[_key];
				}
			}
		}
	}]);

	return ScrollMeisterComponent;
}(HTMLElement);

exports.default = ScrollMeisterComponent;

},{"raf":5,"scrollmeister.js":27}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _scrollmeister = require('scrollmeister.js');

var _scrollmeister2 = _interopRequireDefault(_scrollmeister);

var _MeisterComponent2 = require('./MeisterComponent.js');

var _MeisterComponent3 = _interopRequireDefault(_MeisterComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollMeisterComponent = function (_MeisterComponent) {
	_inherits(ScrollMeisterComponent, _MeisterComponent);

	function ScrollMeisterComponent() {
		_classCallCheck(this, ScrollMeisterComponent);

		return _possibleConstructorReturn(this, (ScrollMeisterComponent.__proto__ || Object.getPrototypeOf(ScrollMeisterComponent)).apply(this, arguments));
	}

	_createClass(ScrollMeisterComponent, null, [{
		key: 'observedAttributes',
		get: function get() {
			return _scrollmeister2.default.getDefinedBehaviorNames();
		}
	}]);

	return ScrollMeisterComponent;
}(_MeisterComponent3.default);

exports.default = ScrollMeisterComponent;

},{"./MeisterComponent.js":16,"scrollmeister.js":27}],18:[function(require,module,exports){
'use strict';

require('document-register-element');

var _ScrollMeisterComponent = require('components/ScrollMeisterComponent.js');

var _ScrollMeisterComponent2 = _interopRequireDefault(_ScrollMeisterComponent);

var _ElementMeisterComponent = require('components/ElementMeisterComponent.js');

var _ElementMeisterComponent2 = _interopRequireDefault(_ElementMeisterComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

customElements.define('scroll-meister', _ScrollMeisterComponent2.default);
customElements.define('el-meister', _ElementMeisterComponent2.default);

},{"components/ElementMeisterComponent.js":15,"components/ScrollMeisterComponent.js":17,"document-register-element":2}],19:[function(require,module,exports){
'use strict';

require('./scrollmeister.css');

require('./scrollmeister.js');

require('./behaviors');

require('./components');

},{"./behaviors":14,"./components":18,"./scrollmeister.css":26,"./scrollmeister.js":27}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GuideLayoutEngine = function () {
	function GuideLayoutEngine() {
		_classCallCheck(this, GuideLayoutEngine);

		this.guides = [];
		this.requiredHeight = 0;
	}

	_createClass(GuideLayoutEngine, [{
		key: 'updateViewport',
		value: function updateViewport(viewport) {
			this.viewport = viewport;
		}
	}, {
		key: 'lengthToPixel',
		value: function lengthToPixel(value, percentageReference) {
			switch (value.unit) {
				case 'px':
					return value.length;
				case 'vw':
					return value.length / 100 * this.viewport.width;
				case 'vh':
					return value.length / 100 * this.viewport.height;
				case 'vmin':
					return value.length / 100 * Math.min(this.viewport.width, this.viewport.height);
				case 'vmax':
					return value.length / 100 * Math.max(this.viewport.width, this.viewport.height);
				case '%':
					if (percentageReference == null) {
						throw new Error('To convert percentages to pixels a reference value needs to be specified.');
					}

					return percentageReference * (value.length / 100);
				default:
					throw new Error('Unknown unit "' + value.unit + '" of length "' + value.length + '"');
			}
		}
	}, {
		key: 'doLayout',
		value: function doLayout(nodes, rawGuides, contentWidth) {
			this._computeGuides(rawGuides, contentWidth);

			//First we invalidate all existing layout for each node so we know which ones we touched.
			//We need to know this to figure out if the dependencies of a given node have been updated yet.
			for (var i = 0; i < nodes.length; i++) {
				var node = nodes[i];

				node.layout.dirty = true;
			}

			this.requiredHeight = 0;

			var skippedNode = void 0;

			//We could do some fancy acyclic directed graph thing (our layout is not a tree) and use topological sorting.
			//But this is fast enough and easy to follow. We simply loop until all nodes have been updated, eventually resolving all dependencies.
			do {
				skippedNode = false;

				var didANewLayout = false;

				//I felt like using labels instead of moving stuff to a function ¯\_(ツ)_/¯.
				outer: for (var _i = 0; _i < nodes.length; _i++) {
					var _node = nodes[_i];

					//We already computed layout for this node.
					if (!_node.layout.dirty) {
						continue;
					}

					var dependencies = _node.layout.props.dependencies;

					//Check if any of the dependencies is still dirty.
					for (var j = 0; j < dependencies.length; j++) {
						var otherNode = dependencies[j];

						if (otherNode.layout.dirty) {
							skippedNode = true;

							//We encountered a dirty dependency, there is no need to find a second one.
							//Just continue with the outer loop.
							continue outer;
						}
					}

					this._doNodeLayout(_node, dependencies);

					//We found a layout we can compute, yay!
					_node.layout.dirty = false;
					didANewLayout = true;

					//This node requires more height than the previous ones we've enountered.
					if (_node.layout.requiredHeight > this.requiredHeight) {
						this.requiredHeight = _node.layout.requiredHeight;
					}
				}

				if (nodes.length > 0 && !didANewLayout) {
					throw new Error('The layout engine did a whole loop of just skipping. It seems like some dependencies cannot be resolved.');
				}
			} while (skippedNode);
		}

		//Does not return anything other than a flag. Instead we pass it an object that it fills.
		//This minimizes the amount of garbage we create on the hot path, we reuse this object.

	}, {
		key: 'doScroll',
		value: function doScroll(layout, scrollPosition, ret) {
			var verticalCenter = this.viewport.height / 2;
			var prevWrapperTop = ret.wrapperTop;

			ret.contentHeight = layout.height;

			if (layout.transformTopPosition) {
				ret.contentTop = layout.transformTopPosition(scrollPosition);
			} else {
				ret.contentTop = layout.top - scrollPosition;
			}

			if (layout.clipRect) {
				ret.wrapperTop = layout.clipRect.top - scrollPosition;
				ret.wrapperHeight = layout.clipRect.height;
			} else {
				ret.wrapperTop = ret.contentTop;
				ret.wrapperHeight = ret.contentHeight;
			}

			ret.wrapperBottom = Math.round(ret.wrapperTop + ret.wrapperHeight);
			ret.contentBottom = Math.round(ret.contentTop + ret.contentHeight);

			//We round this here and not earlier because other calculations,
			//like wrapper/contentBottom need to be as accurate as possible.
			ret.wrapperTop = Math.round(ret.wrapperTop);
			ret.contentTop = Math.round(ret.contentTop);

			ret.contentTopOffset = ret.contentTop - ret.wrapperTop;

			//Does the center of the viewport intersect with the element?
			ret.inCenter = ret.wrapperTop < verticalCenter && ret.wrapperBottom > verticalCenter;

			//The extended viewport has three times the height of the normal viewport (+1 at the top and bottom).
			//It's used for lazy loading etc. before something enters the viewport.
			ret.inExtendedViewport = ret.wrapperTop < 2 * this.viewport.height && ret.wrapperBottom > -this.viewport.height;

			//Optimization: there's no need to translate the item beyond the viewport.
			//"Park" it exactly at the edge.
			//This makes the difference between touching ~5 (visible) and ~100s (all) DOM items.
			//But we also return the absolute top position before parking it.

			ret.absoluteWrapperTop = ret.wrapperTop;
			ret.absoluteContentTop = ret.contentTop;

			//Top of the element below the viewport?
			if (ret.wrapperTop >= this.viewport.height) {
				ret.wrapperTop = this.viewport.height;
				ret.contentTop = ret.wrapperTop + ret.contentTopOffset;
				ret.inViewport = false;
			} else if (ret.wrapperBottom <= 0) {
				//Bottom of the element above the viewport?
				ret.wrapperTop = -Math.round(ret.wrapperHeight);
				ret.contentTop = ret.wrapperTop + ret.contentTopOffset;
				ret.inViewport = false;
			} else {
				ret.inViewport = true;
			}

			return ret.wrapperTop !== prevWrapperTop;
		}

		//This will attach the layout info directly to each dom node. No need for a lookup map.

	}, {
		key: '_doNodeLayout',
		value: function _doNodeLayout(node, dependencies) {
			var layout = node.layout;
			var props = layout.props;
			var state = layout.state;
			var layoutMode = props.mode;

			layout.spacingTop = this.lengthToPixel(props.spacing.top);
			layout.spacingBottom = this.lengthToPixel(props.spacing.bottom);

			if (layoutMode === 'follow') {
				//A follower can have one or more leaders.
				//Here we normalize it to always have two, the top and bottom most.
				//These are the only two that are relevant for the follower.
				var topDependency = dependencies[0];
				var bottomDependency = dependencies[0];

				//We could use Array.reduce and create something like a minBy/maxBy.
				//But this gives us the min and max element with a simple single loop.
				for (var i = 0; i < dependencies.length; i++) {
					var otherNode = dependencies[i];

					//Found a new top node which is even higher than the current.
					if (otherNode.layout.top < topDependency.layout.top) {
						topDependency = otherNode;
					}

					//Found a new bottom node which is even lower than the current.
					if (otherNode.layout.bottom > bottomDependency.layout.bottom) {
						bottomDependency = otherNode;
					}
				}

				dependencies = [topDependency, bottomDependency];

				layout.leaderHeight = bottomDependency.layout.bottom - topDependency.layout.top;
			}

			//
			//left
			//

			if (props.guides.left === 'viewport') {
				layout.left = 0;
			} else {
				layout.left = this._getGuideByName(props.guides.left).leftPosition;
			}

			//
			//right + width
			//

			if (props.guides.right === 'viewport') {
				layout.right = this.viewport.width;
			} else {
				layout.right = this._getGuideByName(props.guides.right).rightPosition;
			}

			layout.width = layout.right - layout.left;

			//
			//height
			//

			if (props.height === 'auto') {
				layout.height = state.height;
			} else {
				layout.height = this.lengthToPixel(props.height, layout.width);
			}

			layout.outerHeight = layout.height + layout.spacingTop + layout.spacingBottom;

			/*
   if (heightMode === 'ratio') {
   	layout.set('height', layout.get('width') / item.get('heightRatio'));
   } else if (heightMode === 'length') {
   	layout.set('height', this.lengthToPixel(item.get('heightLength')));
   } else if (heightMode === 'inherit') {
   	layout.set('height', dependencies.last().get('outerBottom') - dependencies.get(0).get('outerTop'));
   } else if (heightMode === 'auto') {
   	//"auto" means we query the DOM for the height.
   	//This is something a normal "layout engine" wouldn't do, but we delegate some stuff do the browser.
   	//In order for this to work we get a list of heights passed to this method.
   	layout.set('height', intrinsicHeights.get(item.get('id'), this.viewportHeight));
   } else {
   	throw new Error('Unknown height mode "' + heightMode + '"');
   }
   	layout.set('outerHeight', layout.get('height') + layout.get('spacingTop') + layout.get('spacingBottom'));
   */

			//
			//top
			//

			if (layoutMode === 'flow') {
				var predecessorBottom = 0;

				//Yes, we could Math.max.apply(Math, ) but what's wrong with this simple loop?
				for (var _i2 = 0; _i2 < dependencies.length; _i2++) {
					var _otherNode = dependencies[_i2];

					if (_otherNode.layout.outerBottom > predecessorBottom) {
						predecessorBottom = _otherNode.layout.outerBottom;
					}
				}

				layout.top = predecessorBottom + layout.spacingTop;
			} else if (layoutMode === 'follow') {
				//When the follower is larger than the leader it follows the bottom of its leader, not the top.
				if (props.followerMode === 'pin' && layout.outerHeight > layout.leaderHeight) {
					layout.top = dependencies[1].layout.bottom - layout.height - layout.spacingBottom;
				} else {
					layout.top = dependencies[0].layout.top + layout.spacingTop;
				}
			}

			layout.outerTop = layout.top + layout.spacingTop;

			/* else if (layoutMode === 'follow') {
   	//When the follower is larger than the leader it follows the bottom of its leader, not the top.
   	if (item.get('followerMode') === 'pin' && layout.get('outerHeight') > layout.get('leaderHeight')) {
   		layout.set('top', dependencies.get(1).get('bottom') - layout.get('height') - layout.get('spacingBottom'));
   	} else {
   		layout.set('top', dependencies.get(0).get('top') + layout.get('spacingTop'));
   	}
   } else if (layoutMode === 'attachment') {
   	switch (item.get('attachmentAnchor')) {
   		case 'top':
   			layout.set('top', dependencies.get(0).get('top') + layout.get('spacingTop'));
   			break;
   		case 'center':
   			layout.set(
   				'top',
   				(dependencies.get(0).get('top') + dependencies.get(0).get('bottom') - layout.get('height')) / 2 +
   					layout.get('spacingTop') -
   					layout.get('spacingBottom')
   			);
   			break;
   		case 'bottom':
   			layout.set('top', dependencies.get(0).get('bottom') - layout.get('height') - layout.get('spacingBottom'));
   			break;
   		default:
   			throw new Error('Unknown attachment anchor "' + item.get('attachmentAnchor') + '"');
   	}
   }
   	layout.set('outerTop', layout.get('top') - layout.get('spacingTop'));
   */

			//
			//bottom (for the sake of simpler to follow computations at later points)
			//

			layout.bottom = layout.height + layout.top;
			layout.outerBottom = layout.bottom + layout.spacingBottom;

			//
			//required height
			//

			if (layoutMode === 'flow') {
				layout.requiredHeight = layout.outerBottom;
			} else {
				layout.requiredHeight = 0;
			}

			//
			//transform the scroll position
			//

			if (layoutMode === 'follow') {
				layout.transformTopPosition = this._createFollowerTopPositionTransformer(layout, props);
			}
			/*
   	var progressAnchors = this.calculateProgressAnchors(item, layout, dependencies);
   		layout
   		.set('progressScrollStart', progressAnchors.progressScrollStart)
   		.set('progressScrollDuration', progressAnchors.progressScrollDuration);
   		layout.set('calculateScrollProgress', this.createFollowerScrollProgressCalculator(layout));
   	*7
   }
   	/*
   if (layoutMode === 'follow') {
   	layout.set('transformTopPosition', this.createFollowerTopPositionTransformer(item, layout, dependencies));
   		var progressAnchors = this.calculateProgressAnchors(item, layout, dependencies);
   		layout
   		.set('progressScrollStart', progressAnchors.progressScrollStart)
   		.set('progressScrollDuration', progressAnchors.progressScrollDuration);
   		layout.set('calculateScrollProgress', this.createFollowerScrollProgressCalculator(layout));
   } else if (layoutMode === 'attachment') {
   	if (dependencies.get(0).has('transformTopPosition')) {
   		layout.set('transformTopPosition', this.createNestedTopPositionTransformer(layout, dependencies.get(0)));
   	}
   		//If the parent is clipped, clip the attachment as well.
   	if (dependencies.get(0).has('clipRect')) {
   		layout.set('clipRect', dependencies.get(0).get('clipRect'));
   	}
   }
   */

			//
			//clipping
			//

			if (props.clip && layoutMode === 'follow') {
				//Reuse the object.
				if (!layout.clipRect) {
					layout.clipRect = {};
				}

				layout.clipRect.top = dependencies[0].layout.top;
				layout.clipRect.bottom = dependencies[1].layout.bottom;
				layout.clipRect.height = layout.leaderHeight;
			} else {
				delete layout.clipRect;
			}

			/*
   if (item.get('appear') && item.get('appear').size > 0) {
   	layout.set('calculateAppear', this.createAppearCalculator(item, dependencies, layout));
   }
   */
		}

		//Parallax and pinning is achieved by simply transforming the top position for those (follower-) elements.

	}, {
		key: '_createFollowerTopPositionTransformer',
		value: function _createFollowerTopPositionTransformer(layout, props) {
			var _this = this;

			if (props.followerMode === 'pin') {
				var pinTopPosition = void 0;

				//Calculate the spacing from top of the viewport (where the pinned element will be positioned).
				switch (props.pinAnchor) {
					case 'top':
						pinTopPosition = 0;
						break;
					case 'center':
						pinTopPosition = (this.viewport.height - layout.height) / 2;
						break;
					case 'bottom':
						pinTopPosition = this.viewport.height - layout.height;
						break;
				}

				//The scroll position at which the element starts being pinned and does not move anymore.
				var pinStartScroll = layout.top - pinTopPosition;

				var pinDuration = Math.abs(layout.leaderHeight - layout.outerHeight);
				var pinStopScroll = pinStartScroll + pinDuration;

				return function (scrollPosition) {
					var transformedTop = void 0;

					//Pinning hasn't started, scroll normally.
					if (scrollPosition < pinStartScroll) {
						transformedTop = layout.top - scrollPosition;
					} else if (scrollPosition < pinStopScroll) {
						//Pinning is currently happening.
						transformedTop = pinTopPosition;
					} else {
						//Pinning is finished, scroll normally plus the amount it was pinned.
						transformedTop = layout.top - scrollPosition + pinDuration;
					}

					return Math.round(transformedTop);
				};
			} else if (props.followerMode === 'parallax') {
				//The distance the leader and the follower need to travel inside the viewport
				//from top-bottom to bottom-top.
				var leaderScrollDistance = this.viewport.height + layout.leaderHeight;
				var scrollDistance = this.viewport.height + layout.outerHeight;

				//The follower needs to move a little slower/faster than 1.0
				//to travel the viewport in the same time the leader does.
				var speedFactor = scrollDistance / leaderScrollDistance;

				//This is the scroll position where the outer top spacing of the
				//follower enters the viewport. It's not necessarily visible then
				//as you need to scroll for a bit (spacingTop) before it actually enters.
				var enterScroll = layout.outerTop - this.viewport.height;

				return function (scrollPosition) {
					//The distance the follower would have travelled from the bottom of the viewport
					//at a speed of 1.0.
					var distanceTravelled = scrollPosition - enterScroll;

					return _this.viewport.height + layout.spacingTop - distanceTravelled * speedFactor;
				};
			}
		}
	}, {
		key: '_computeGuides',
		value: function _computeGuides(rawGuides, contentWidth) {
			var pixelWidth = this.lengthToPixel(contentWidth, this.viewport.width);

			//If the wrapper element does not have enough room, make it full width fluid.
			if (pixelWidth > this.viewport.width) {
				pixelWidth = this.viewport.width;
			}

			//This causes the content to be centered by shifting it to the right by half of the margin.
			var contentMargin = (this.viewport.width - pixelWidth) / 2;

			//Expand or collapse the guides array to the correct length.
			//This will eliminate the need for push() calls.
			this.guides.length = rawGuides.length;

			for (var guideIndex = 0; guideIndex < rawGuides.length; guideIndex++) {
				var rawGuide = rawGuides[guideIndex];

				//Reuse an existing guide object to make gc happy.
				//It doesn't matter if it was the same one, we will overwrite the properties anyway.
				var guide = this.guides[guideIndex];

				if (!guide) {
					guide = this.guides[guideIndex] = {};
				}

				guide.name = rawGuide.name;

				guide.width = this.lengthToPixel(rawGuide.width, pixelWidth);

				//The guide position is always expressed in percentages of the content width.
				//This is actually the CENTER position of the guide.
				guide.position = contentMargin + pixelWidth * rawGuide.position;

				//TODO: if the guide position is negative, it should calculate the offset from the right instead of the left.

				//The RIGHT edge, but the position where the LEFT guide would snap to.
				guide.leftPosition = guide.position + guide.width / 2;

				//The LEFT edge, but the position where the RIGHT guide would snap to.
				guide.rightPosition = guide.position - guide.width / 2;

				//This makes sure that guides very close to the edges don't get cut off with small viewports.
				//It's basically for the 0% and 100% guide
				//which otherwise would only use 50% of their width on small viewports
				//because the center of the guide would be aligned with the edge.
				if (guide.rightPosition < 0) {
					guide.rightPosition = 0;
					guide.leftPosition = guide.width;
					guide.position = guide.width / 2;
				} else if (guide.leftPosition > this.viewport.width) {
					guide.leftPosition = this.viewport.width;
					guide.rightPosition = guide.leftPosition - guide.width;
					guide.position = guide.leftPosition - guide.width / 2;
				}
			}
		}
	}, {
		key: '_getGuideByName',
		value: function _getGuideByName(name) {
			for (var i = 0; i < this.guides.length; i++) {
				var guide = this.guides[i];

				if (guide.name === name) {
					return guide;
				}
			}

			throw new Error('Looks like you\'ve used a guide called "' + name + '" without defining it.');
		}
	}]);

	return GuideLayoutEngine;
}();

exports.default = GuideLayoutEngine;

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var initialTouchX = void 0;
var initialTouchY = void 0;
var initialTouchElement = void 0;

exports.default = {
	start: function start(e) {
		var touch = e.changedTouches[0];
		initialTouchX = touch.clientX;
		initialTouchY = touch.clientY;
		initialTouchElement = e.target;

		//We don't want text nodes.
		while (initialTouchElement.nodeType === Node.TEXT_NODE) {
			initialTouchElement = initialTouchElement.parentNode;
		}
	},

	end: function end(e) {
		var touch = e.changedTouches[0];
		var currentTouchX = touch.clientX;
		var currentTouchY = touch.clientY;
		var distanceX = initialTouchX - currentTouchX;
		var distanceY = initialTouchY - currentTouchY;
		var distance2 = distanceX * distanceX + distanceY * distanceY;
		var element = initialTouchElement;

		//Check if it was more like a tap (moved less than 7px).
		if (distance2 < 49 && element.tagName === 'A') {
			//It was a tap, click the element.
			var clickEvent = document.createEvent('MouseEvents');
			clickEvent.initMouseEvent('click', true, true, e.view, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null);
			element.dispatchEvent(clickEvent);
			element.focus();
		}
	}
};

},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (node) {
	if (node.tagName === 'TEXTAREA') {
		return true;
	}

	if (node.tagName === 'INPUT' && node.type === 'text') {
		return true;
	}

	return false;
};

},{}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
//TODO: this has not been migrated to classes yet.

var Emitter = require('tiny-emitter');

var PAUSE_DELAY = 300; //ms
var MAX_HISTORY_LENGTH = 30;
var MAX_HISTORY_AGE = 300; //ms

var ScrollStatus = function ScrollStatus() {
	this.position = 0;
	this.maxPosition = 0;
	this.velocity = 0;
	this.progress = 0;
	this.direction = 'down';
	this.history = [];
};

ScrollStatus.prototype = new Emitter();

ScrollStatus.prototype.tick = function (now, newPosition, layoutEngine) {
	var direction;

	//We keep track of the position and time for calculating an accurate velocity in later frames.
	this.history.push(this.position, now);

	//Keep the history short, but don't splice() at every frame (only when it's twice as large as the max).
	if (this.history.length > MAX_HISTORY_LENGTH * 2) {
		this.history.splice(0, MAX_HISTORY_LENGTH);
	}

	this.velocity = this._calculateScrollVelocity(now);

	if (this.position !== newPosition) {
		direction = newPosition > this.position ? 'down' : 'up';

		this.position = newPosition;
		this.progress = newPosition / this.maxPosition;

		//When the direction changed, we clear the history.
		//This way we get better scroll velocity calculations
		//when the users moves up/down very fast (e.g. touch display scratching).
		if (this.direction !== direction) {
			this.direction = direction;
			this.history.length = 0;
		}

		if (this.pauseTimer) {
			clearTimeout(this.pauseTimer);
			this.pauseTimer = null;
		}

		this.emit('scroll', this, layoutEngine);
	} else {
		if (!this.pauseTimer) {
			this.pauseTimer = setTimeout(this.emit.bind(this, 'pause', this), PAUSE_DELAY);
		}
	}
};

ScrollStatus.prototype._calculateScrollVelocity = function (now) {
	//Figure out what the scroll position was about MAX_HISTORY_AGE ago.
	//We do this because using just the past two frames for calculating the veloctiy
	//gives very jumpy results.
	var positions = this.history;
	var positionsIndexEnd = positions.length - 1;
	var positionsIndexStart = positionsIndexEnd;
	var positionsIndex = positionsIndexEnd;
	var timeOffset;
	var movedOffset;

	//Move pointer to position measured MAX_HISTORY_AGE ago
	//The positions array contains alternating offset/timeStamp pairs.
	for (; positionsIndex > 0; positionsIndex = positionsIndex - 2) {
		//Did we go back far enough and found the position MAX_HISTORY_AGE ago?
		if (positions[positionsIndex] <= now - MAX_HISTORY_AGE) {
			break;
		}

		positionsIndexStart = positionsIndex;
	}

	//Compute relative movement between these two points.
	timeOffset = positions[positionsIndexEnd] - positions[positionsIndexStart];
	movedOffset = positions[positionsIndexEnd - 1] - positions[positionsIndexStart - 1];

	if (timeOffset > 0 && Math.abs(movedOffset) > 0) {
		return movedOffset / timeOffset;
	} else {
		return 0;
	}
};

exports.default = new ScrollStatus();

},{"tiny-emitter":8}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var CustomEvent = window.CustomEvent;

if (typeof CustomEvent !== 'function') {
	CustomEvent = function CustomEvent(name) {
		var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { bubbles: false, cancelable: false };

		var event = document.createEvent('CustomEvent');
		event.initCustomEvent(name, params.bubbles, params.cancelable, params.detail);

		return event;
	};

	CustomEvent.prototype = window.Event.prototype;
}

exports.default = CustomEvent;

},{}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var assign = Object.assign;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (typeof assign !== 'function') {
	assign = function assign(target) {
		if (target == null) {
			// TypeError if undefined or null
			throw new TypeError('Cannot convert undefined or null to object');
		}

		var to = Object(target);

		for (var index = 1; index < arguments.length; index++) {
			var nextSource = arguments[index];

			if (nextSource != null) {
				// Skip over if undefined or null
				for (var nextKey in nextSource) {
					// Avoid bugs when hasOwnProperty is shadowed
					if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
						to[nextKey] = nextSource[nextKey];
					}
				}
			}
		}

		return to;
	};
}

exports.default = assign;

},{}],26:[function(require,module,exports){
var css = "html{overflow-x:hidden}body{margin:0}scroll-meister{display:block;position:static;width:100%;overflow:hidden;will-change:opacity}el-meister{display:block;position:fixed;left:0;top:0;opacity:1;backface-visibility:hidden;will-change:transform}"; (require("browserify-css").createStyle(css, {}, { "insertAt": undefined })); module.exports = css;
},{"browserify-css":1}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var lowerCaseAndDashRegex = /^[a-z-]+$/;

var Scrollmeister = {
	behaviors: {},
	behaviorsWaitingForDependencies: [],

	getDefinedBehaviorNames: function getDefinedBehaviorNames() {
		return Object.keys(this.behaviors);
	},

	defineBehavior: function defineBehavior(classDefinition) {
		var name = classDefinition.behaviorName;

		if (this.behaviors.hasOwnProperty(name)) {
			throw new Error("You are trying to redefine the \"" + name + "\" behavior.");
		}

		if (!lowerCaseAndDashRegex.test(name)) {
			throw new Error("The behavior \"" + name + "\" you are trying to define uses invalid characters. Behaviors can only use lower case characters and dashes.");
		}

		this.behaviors[name] = classDefinition;
	},

	attachBehavior: function attachBehavior(element, name, rawProperties) {
		if (!this.behaviors.hasOwnProperty(name)) {
			throw new Error("Tried to attach an unknown behavior \"" + name + "\". This should never happen since we only track attributes which correspond to defined behaviors.");
		}

		var Behavior = this.behaviors[name];

		//The behavior is already attached, update it.
		if (element.hasOwnProperty(name)) {
			element[name].updateProperties(rawProperties);
		} else {
			if (this._checkBehaviorDependencies(element, name)) {
				//Make the behavior available as a property on the DOM node.
				//TODO: What if people assign a plain rawProperties to the property?
				//Maybe this should not be allowed at all, but instead always use the attribute?
				//BUT: if we can make it work then it should work for UX reasons.
				//See also comments in _renderGuides of DebugGuidesBehavior. Läuft.
				element[name] = new Behavior(element, rawProperties);

				this._updateWaitingBehaviors(element);
			} else {
				this.behaviorsWaitingForDependencies.push({ name: name, rawProperties: rawProperties });
			}
		}
	},

	detachBehavior: function detachBehavior(element, name) {
		if (element.hasOwnProperty(name)) {
			element[name].destructor();
			delete element[name];
		}
	},

	_checkBehaviorDependencies: function _checkBehaviorDependencies(element, name) {
		var Behavior = this.behaviors[name];

		for (var dependencyIndex = 0; dependencyIndex < Behavior.dependencies.length; dependencyIndex++) {
			var dependency = Behavior.dependencies[dependencyIndex];

			if (!element.hasOwnProperty(dependency)) {
				return false;
			}
		}

		return true;
	},

	_updateWaitingBehaviors: function _updateWaitingBehaviors(element) {
		var stillWaiting = [];
		var finallyResolved = [];

		//Check if any of the waiting behaviors can now be resolved.
		for (var behaviorIndex = 0; behaviorIndex < this.behaviorsWaitingForDependencies.length; behaviorIndex++) {
			var waitingBehavior = this.behaviorsWaitingForDependencies[behaviorIndex];

			if (this._checkBehaviorDependencies(element, waitingBehavior.name)) {
				finallyResolved.push(waitingBehavior);
			} else {
				stillWaiting.push(waitingBehavior);
			}
		}

		this.behaviorsWaitingForDependencies = stillWaiting;

		for (var _behaviorIndex = 0; _behaviorIndex < finallyResolved.length; _behaviorIndex++) {
			var _waitingBehavior = finallyResolved[_behaviorIndex];

			this.attachBehavior(element, _waitingBehavior.name, _waitingBehavior.rawProperties);
		}
	}
};

exports.default = Scrollmeister;

},{}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	parse: function parse(value) {
		return value.trim() === 'true';
	},
	stringify: function stringify(value) {
		return '' + value;
	}
};

},{}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var units = ['px', 'vw', 'vh', 'vmin', 'vmax', '%'];
var unitRegex = new RegExp('[\\d.](' + units.join('|') + ')$');

exports.default = {
	parse: function parse(value) {
		value = value.trim();

		//Special unit-less value.
		if (value === '0') {
			return {
				length: 0,
				unit: 'px'
			};
		}

		var unitMatch = value.match(unitRegex);
		var length = parseFloat(value);

		if (!unitMatch) {
			throw new Error('The value "' + value + '" uses a unit that is not supported by Scrollmeister. Supported units are ' + units.join(', ') + '.');
		}

		if (isNaN(length)) {
			throw new Error('Could not parse "' + value + '" as a number.');
		}

		return {
			length: length,
			unit: unitMatch[1]
		};
	},
	stringify: function stringify(value) {
		return '' + value.length + value.unit;
	}
};

},{}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	parse: function parse(value) {
		return value.trim();
	},
	stringify: function stringify(value) {
		return value;
	}
};

},{}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _StringType = require('types/StringType.js');

var _StringType2 = _interopRequireDefault(_StringType);

var _NumberType = require('types/NumberType.js');

var _NumberType2 = _interopRequireDefault(_NumberType);

var _CSSLengthType = require('types/CSSLengthType.js');

var _CSSLengthType2 = _interopRequireDefault(_CSSLengthType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//TODO: named nested properties. Just arrays so far.
//But let's see how far we get.
exports.default = [{ name: _StringType2.default }, { position: _NumberType2.default }, { width: _CSSLengthType2.default }];

},{"types/CSSLengthType.js":29,"types/NumberType.js":34,"types/StringType.js":35}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _CSSLengthType = require('types/CSSLengthType.js');

var _CSSLengthType2 = _interopRequireDefault(_CSSLengthType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ratioRegex = /^(\d+)\s*\/\s*(\d+)$/;

exports.default = {
	parse: function parse(value) {
		value = value.trim();

		if (value === 'auto') {
			return value;
		} else {
			var match = value.match(ratioRegex);

			if (match) {
				//E.g. "16/9" is the same as "56.25%". Just some sugar.
				return {
					length: 100 * (parseInt(match[2], 10) / parseInt(match[1], 10)),
					unit: '%'
				};
			} else {
				return _CSSLengthType2.default.parse(value);
			}
		}
	},
	stringify: function stringify(value) {
		if (value === 'auto') {
			return value;
		} else {
			//Parsing turns ratios into percentages. We do not try to do the opposite.
			//Finding nominator/denominator for arbitrary floats is no fun.
			return _CSSLengthType2.default.stringify(value);
		}
	}
};

},{"types/CSSLengthType.js":29}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
function isFlowElement(element) {
	return element.hasAttribute('layout') && element.layout.props.mode === 'flow';
}

function findPreviousFlowElement(element) {
	while (element.previousSibling) {
		element = element.previousSibling;

		if (element.nodeType !== Node.ELEMENT_NODE) {
			continue;
		}

		if (isFlowElement(element)) {
			return element;
		}
	}

	return null;
}

//TODO: do we need stringify at all?
//Also I believe SelectorType needs to be reavaluated all the time!
//https://stackoverflow.com/questions/30578673/is-it-possible-to-make-queryselectorall-live-like-getelementsbytagname
//We could return an array from here which we manipulate transparently. However, we need to know when it is not needed aylonger
exports.default = {
	parse: function parse(value, element) {
		value = value.trim();

		if (value === 'none') {
			return [];
		}

		//"inherit" mimics a regular document flow by rendering the element behind the previous one.
		if (value === 'inherit') {
			element = findPreviousFlowElement(element);

			if (element) {
				return [element];
			} else {
				return [];
			}
		}

		if (value.indexOf('skip') === 0) {
			var numberOfSkips = parseInt(value.slice('skip'.length).trim(), 10);

			if (numberOfSkips < 0) {
				throw new Error('You\'ve specified a negative number of skips (' + numberOfSkips + ') for the layout dependencies.');
			}

			do {
				element = findPreviousFlowElement(element);
			} while (element && numberOfSkips--);

			if (element) {
				return [element];
			} else {
				return [];
			}
		}

		var dependencies = Array.prototype.slice.call(document.querySelectorAll(value)).filter(isFlowElement);

		if (dependencies.length === 0) {
			throw new Error('Couldn\'t resolve the layout dependency "' + value + '". No flow elements found matching this selector.');
		}
	},
	stringify: function stringify(value) {
		return value;
	}
};

},{}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var looksLikeANumberRegex = /^-?[\d.+]+$/;

exports.default = {
	parse: function parse(value) {
		value = value.trim();

		if (!looksLikeANumberRegex.test(value)) {
			throw new Error('The value "' + value + '" does not look like a number.');
		}

		var number = parseFloat(value);

		if (isNaN(number)) {
			throw new Error('Could not parse "' + value + '" as a number.');
		}

		return number;
	},
	stringify: function stringify(value) {
		return '' + value;
	}
};

},{}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var _parse = function _parse(value) {
	return value.trim();
};

var stringify = function stringify(value) {
	return value;
};

exports.default = {
	parse: _parse,
	stringify: stringify,
	createEnum: function createEnum(propertyName, values) {
		return {
			parse: function parse(value) {
				value = _parse(value);

				if (values.indexOf(value) === -1) {
					throw new Error('Got "' + value + '" as value for property "' + propertyName + '". Expected one of "' + values.join('", "') + '".');
				}

				return value;
			},
			stringify: stringify
		};
	}
};

},{}]},{},[19]);
