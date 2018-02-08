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
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//property:value; pairs (separated by colons) separated by semicolons.
//TODO: if this isn't the perfect thing to write unit tests for then call me steve.
var propertiesAndValuesRegex = /([^:;]+):([^:;]+)/g;
var whiteSpaceRegex = /\s+/;

var Behavior = function () {
	function Behavior(element, rawProperties) {
		_classCallCheck(this, Behavior);

		this.element = element;
		this.raw = {};
		this.cooked = {};

		this.parseProperties(rawProperties);
		this.attach();
	}

	_createClass(Behavior, [{
		key: 'destructor',
		value: function destructor() {
			if (this.listeners) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this.listeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var listener = _step.value;

						listener.element.removeEventListener(listener.event, listener.callback);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}

			if (this.detach) {
				this.detach();
			}
		}
	}, {
		key: 'listen',
		value: function listen(element, event, callback) {
			element.addEventListener(event, callback);

			if (!this.listeners) {
				this.listeners = [];
			}

			this.listeners.push({ element: element, event: event, callback: callback });
		}
	}, {
		key: 'listenAndInvoke',
		value: function listenAndInvoke(element, event, callback) {
			this.listen(element, event, callback);
			callback();
		}
	}, {
		key: 'emit',
		value: function emit(name, params) {
			var event = new Event(this.constructor.behaviorName + ':' + name);

			this.element.dispatchEvent(event);
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
					debugger;
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
					if (!schema[key].hasOwnProperty('default')) {
						//TODO: this error message does not help people who only write HTML and don't even know what the class is.
						//It should simply be something like "The layout attribute misses the required guides property"
						//Don't get too technical.
						throw new Error('You are missing the "' + key + '" property for the ' + this.constructor.name + ' class, which has no default value.');
					} else {
						//There is a default specified, use it.
						this[key] = this.parseProperty(key, schema[key].default, schema[key].type);
						continue;
					}
				}

				this[key] = this.parseProperty(key, rawPropertiesMap[key], schema[key].type);
			}
		}
	}, {
		key: 'parseProperty',
		value: function parseProperty(property, rawValue, propertyType) {
			var _this = this;

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
							return _this.parseProperty(property, rawValue, propertyType);
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

						map[name] = namedPropertyType[name].parse(_rawValue);
					}

					return map;
				} else {
					throw new Error('You have defined an empty array as schema type for the "' + property + '"" property of the "' + this.constructor.name + '" class.');
				}
			} else {
				//thing: keyword
				//a.thing = 'keyword'
				return propertyType.parse(rawValue);
			}
		}
	}, {
		key: 'attach',
		value: function attach() {
			throw new Error('You need to implement the attach() method for your "' + this.constructor.name + '" class.');
		}
	}]);

	return Behavior;
}();

exports.default = Behavior;

},{}],4:[function(require,module,exports){
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

			this.listenAndInvoke(this.element, 'layout:layout', function () {
				_this2._renderGuides();
			});
		}
	}, {
		key: 'detach',
		value: function detach() {
			this._removeElement();
		}
	}, {
		key: 'scroll',
		value: function scroll() {}
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
			var guides = this.element.layout.engine.guides;
			var html = guides.map(function (guide) {
				if (guide.width === 0) {
					return '\n\t\t\t\t\t<div title="' + guide.name + '" style="position: absolute; top: 0; bottom: 0; background: rgba(0, 0, 255, 1); left: ' + guide.rightPosition + 'px; width: 1px;"></div>\n\t\t\t\t';
				} else {
					return '\n\t\t\t\t\t<div title="' + guide.name + '" style="position: absolute; top: 0; bottom: 0; background: rgba(0, 255, 255, 0.5); left: ' + guide.rightPosition + 'px; width: ' + guide.width + 'px;"></div>\n\t\t\t\t';
				}
			});

			this._guidesWrapper.innerHTML = html.join('');
		}
	}], [{
		key: 'schema',
		get: function get() {
			return {
				/*
    color: {
    	type: StringType
    }
    */
			};
		}
	}, {
		key: 'dependencies',
		get: function get() {
			return ['layout'];
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

},{"behaviors/Behavior.js":3,"types/StringType.js":20}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GuideDefinitionType = require('types/GuideDefinitionType.js');

var _GuideDefinitionType2 = _interopRequireDefault(_GuideDefinitionType);

var _CSSLengthType = require('types/CSSLengthType.js');

var _CSSLengthType2 = _interopRequireDefault(_CSSLengthType);

var _Behavior2 = require('behaviors/Behavior.js');

var _Behavior3 = _interopRequireDefault(_Behavior2);

var _GuideLayoutEngine = require('lib/GuideLayoutEngine.js');

var _GuideLayoutEngine2 = _interopRequireDefault(_GuideLayoutEngine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LayoutBehavior = function (_Behavior) {
	_inherits(LayoutBehavior, _Behavior);

	function LayoutBehavior() {
		_classCallCheck(this, LayoutBehavior);

		return _possibleConstructorReturn(this, (LayoutBehavior.__proto__ || Object.getPrototypeOf(LayoutBehavior)).apply(this, arguments));
	}

	_createClass(LayoutBehavior, [{
		key: 'attach',
		value: function attach() {
			var _this2 = this;

			this.engine = new _GuideLayoutEngine2.default();

			this.listenAndInvoke(window, 'resize', function () {
				var viewport = _this2._getViewport();
				_this2.engine.updateViewport(viewport);
				_this2.engine.doLayout(_this2.guides, _this2.width);
				_this2.emit('layout');
			});

			this.element.title = 'behavior did this 1';
		}
	}, {
		key: 'detach',
		value: function detach() {
			this.element.title = 'clean af';
		}
	}, {
		key: 'scroll',
		value: function scroll() {}
	}, {
		key: 'bam',
		value: function bam() {
			console.log('in yop face');
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
	}], [{
		key: 'schema',
		get: function get() {
			return {
				guides: {
					type: [_GuideDefinitionType2.default]
				},
				width: {
					type: _CSSLengthType2.default,
					default: '1400px'
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
			return 'layout';
		}
	}]);

	return LayoutBehavior;
}(_Behavior3.default);

/*
class IndexedExampleSchemaBehavior extends Behavior {
	static get schema() {
		return {
			thing: {
				//thing: keyword
				//a.thing = 'keyword'
				type: StringType,
				type: {
					parse: function() {}
				},

				//thing: keyword, anotherone, and, more
				//a.thing = ['keyword', 'anotherone', 'and', 'more']
				type: [StringType],

				//thing: keyword 100px
				//a.thing = ['keyword', {length: 100, unit: 'px'}]
				type: [StringType, CSSLengthType],

				//thing: keyword 30px 30px, anotherone 100px 8px
				//a.thing = [['keyword', {length: 30, unit: 'px'}, {length: 30, unit: 'px'}], [...]];
				type: [GuideDefinitionType],
				type: [[StringType, CSSLengthType, CSSLengthType]]
			}
		};
	}
}

class NamedExampleSchemaBehavior extends Behavior {
	static get schema() {
		return {
			thing: {
				//thing: keyword
				//a.thing = 'keyword'
				type: StringType,
				type: {
					parse: function() {}
				},

				//thing: keyword, anotherone, and, more
				//a.thing = ['keyword', 'anotherone', 'and', 'more']
				type: [StringType],
				type: [
					{
						parse: function() {}
					}
				],

				//thing: keyword 100px
				//a.thing = {first: 'keyword', second: '100px'}
				type: [{ first: StringType }, { second: CSSLengthType }],
				type: [
					{
						first: { parse: function() {} }
					},
					{
						second: { parse: function() {} }
					}
				],

				//thing: keyword 30px 30px, anotherone 100px 8px
				type: [GuideDefinitionType],
				type: [
					{
						type: [
							{
								first: StringType
							},
							{
								second: CSSLengthType
							},
							{
								third: CSSLengthType
							}
						]
					}
				]
			}
		};
	}
}
*/


exports.default = LayoutBehavior;

},{"behaviors/Behavior.js":3,"lib/GuideLayoutEngine.js":14,"types/CSSLengthType.js":17,"types/GuideDefinitionType.js":18}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BetterPositionBehavior = function () {
	_createClass(BetterPositionBehavior, null, [{
		key: 'schema',
		get: function get() {
			return {};
		}
	}, {
		key: 'dependencies',
		get: function get() {
			return ['position'];
		}
	}, {
		key: 'behaviorName',
		get: function get() {
			return 'betterposition';
		}
	}]);

	function BetterPositionBehavior(element) {
		_classCallCheck(this, BetterPositionBehavior);

		this.element = element;
		this.element.position.wup();
		this.element.style.background = 'red';
	}

	_createClass(BetterPositionBehavior, [{
		key: 'detach',
		value: function detach() {
			this.element.style.background = '';
			this.element.style.transform = '';
		}
	}, {
		key: 'scroll',
		value: function scroll() {
			this.element.style.transform = 'rotate(' + (Date.now() - 1517925133289) / 100 + 'deg)';
		}
	}]);

	return BetterPositionBehavior;
}();

exports.default = BetterPositionBehavior;

},{}],7:[function(require,module,exports){
'use strict';

var _scrollmeister = require('scrollmeister.js');

var _scrollmeister2 = _interopRequireDefault(_scrollmeister);

var _LayoutBehavior = require('behaviors/LayoutBehavior.js');

var _LayoutBehavior2 = _interopRequireDefault(_LayoutBehavior);

var _DebugGuidesBehavior = require('behaviors/DebugGuidesBehavior.js');

var _DebugGuidesBehavior2 = _interopRequireDefault(_DebugGuidesBehavior);

var _position = require('behaviors/position.js');

var _position2 = _interopRequireDefault(_position);

var _betterposition = require('behaviors/betterposition.js');

var _betterposition2 = _interopRequireDefault(_betterposition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_scrollmeister2.default.defineBehavior(_LayoutBehavior2.default);
_scrollmeister2.default.defineBehavior(_DebugGuidesBehavior2.default);

_scrollmeister2.default.defineBehavior(_position2.default);
_scrollmeister2.default.defineBehavior(_betterposition2.default);

},{"behaviors/DebugGuidesBehavior.js":4,"behaviors/LayoutBehavior.js":5,"behaviors/betterposition.js":6,"behaviors/position.js":8,"scrollmeister.js":16}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PositionBehavior = function () {
	_createClass(PositionBehavior, null, [{
		key: 'schema',
		get: function get() {
			return {};
		}
	}, {
		key: 'dependencies',
		get: function get() {
			return ['layout'];
		}
	}, {
		key: 'behaviorName',
		get: function get() {
			return 'position';
		}
	}]);

	function PositionBehavior(element) {
		_classCallCheck(this, PositionBehavior);

		this.element = element;
		this.element.layout.bam();
	}

	_createClass(PositionBehavior, [{
		key: 'detach',
		value: function detach() {}
	}, {
		key: 'scroll',
		value: function scroll() {}
	}, {
		key: 'wup',
		value: function wup() {
			console.log('dup');
		}
	}]);

	return PositionBehavior;
}();

exports.default = PositionBehavior;

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MeisterComponent2 = require("./MeisterComponent.js");

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

  return ElementMeisterComponent;
}(_MeisterComponent3.default);

exports.default = ElementMeisterComponent;

},{"./MeisterComponent.js":10}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _scrollmeister = require('scrollmeister.js');

var _scrollmeister2 = _interopRequireDefault(_scrollmeister);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollMeisterComponent = function (_HTMLElement) {
	_inherits(ScrollMeisterComponent, _HTMLElement);

	_createClass(ScrollMeisterComponent, null, [{
		key: 'observedAttributes',
		get: function get() {
			return _scrollmeister2.default.getDefinedBehaviorNames();
		}

		//https://github.com/WebReflection/document-register-element#v1-caveat

	}]);

	function ScrollMeisterComponent(_) {
		var _this, _ret;

		_classCallCheck(this, ScrollMeisterComponent);

		return _ret = ((_ = (_this = _possibleConstructorReturn(this, (ScrollMeisterComponent.__proto__ || Object.getPrototypeOf(ScrollMeisterComponent)).call(this, _)), _this)).init(), _), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(ScrollMeisterComponent, [{
		key: 'init',
		value: function init() {
			this._scrollBehaviors = [];
		}
	}, {
		key: 'connectedCallback',
		value: function connectedCallback() {
			this.raf = requestAnimationFrame(this.tick.bind(this));
		}
	}, {
		key: 'disconnectedCallback',
		value: function disconnectedCallback() {
			cancelAnimationFrame(this.raf);

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = ScrollMeisterComponent.observedAttributes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var attr = _step.value;

					console.log('detach all the things');
					_scrollmeister2.default.detachBehavior(this, attr);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}, {
		key: 'attributeChangedCallback',
		value: function attributeChangedCallback(attr, oldValue, newValue) {
			if (newValue === null) {
				_scrollmeister2.default.detachBehavior(this, attr);
			} else {
				_scrollmeister2.default.attachBehavior(this, attr, newValue);
			}
		}
	}, {
		key: 'behaviorsUpdated',
		value: function behaviorsUpdated() {
			//Clear the array.
			this._scrollBehaviors.length = 0;

			//We keep a list of behaviors that implement the scroll interface so we can loop over it faster.
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = ScrollMeisterComponent.observedAttributes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var attr = _step2.value;

					if (this.hasOwnProperty(attr) && this[attr].scroll) {
						this._scrollBehaviors.push(this[attr]);
					}
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		}
	}, {
		key: 'tick',
		value: function tick() {
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = this._scrollBehaviors[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var behavior = _step3.value;

					behavior.scroll();
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}

			requestAnimationFrame(this.tick.bind(this));
		}
	}]);

	return ScrollMeisterComponent;
}(HTMLElement);

exports.default = ScrollMeisterComponent;

},{"scrollmeister.js":16}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MeisterComponent2 = require("./MeisterComponent.js");

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

  return ScrollMeisterComponent;
}(_MeisterComponent3.default);

exports.default = ScrollMeisterComponent;

},{"./MeisterComponent.js":10}],12:[function(require,module,exports){
'use strict';

require('document-register-element');

var _ScrollMeisterComponent = require('components/ScrollMeisterComponent.js');

var _ScrollMeisterComponent2 = _interopRequireDefault(_ScrollMeisterComponent);

var _ElementMeisterComponent = require('components/ElementMeisterComponent.js');

var _ElementMeisterComponent2 = _interopRequireDefault(_ElementMeisterComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

customElements.define('scroll-meister', _ScrollMeisterComponent2.default);
customElements.define('el-meister', _ElementMeisterComponent2.default);

},{"components/ElementMeisterComponent.js":9,"components/ScrollMeisterComponent.js":11,"document-register-element":2}],13:[function(require,module,exports){
'use strict';

require('./scrollmeister.css');

require('./scrollmeister.js');

require('./behaviors');

require('./components');

},{"./behaviors":7,"./components":12,"./scrollmeister.css":15,"./scrollmeister.js":16}],14:[function(require,module,exports){
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
		value: function doLayout(rawGuides, contentWidth) {
			console.log('did the layout');
			this._computeGuides(rawGuides, contentWidth);
		}

		//This will attach the layout info directly to each dom node. No need for a lookup map.

	}, {
		key: '_doItemLayout',
		value: function _doItemLayout() {}
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
	}]);

	return GuideLayoutEngine;
}();

exports.default = GuideLayoutEngine;

},{}],15:[function(require,module,exports){
var css = "html{overflow-x:hidden}body{margin:0}scroll-meister{display:block;width:100%;height:2000px;overflow:visible}el-meister{display:block;position:fixed;left:50%;top:50%;backface-visibility:hidden;will-change:transform}"; (require("browserify-css").createStyle(css, {}, { "insertAt": undefined })); module.exports = css;
},{"browserify-css":1}],16:[function(require,module,exports){
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

	attachBehavior: function attachBehavior(element, name, config) {
		if (!this.behaviors.hasOwnProperty(name)) {
			throw new Error("Tried to attach an unknown behavior \"" + name + "\". This should never happen since we only track attributes which correspond to defined behaviors.");
		}

		var Behavior = this.behaviors[name];

		console.log(name);

		//The behavior is already attached, update it.
		if (element.hasOwnProperty(name)) {
			element[name].doTheThing();
			element.behaviorsUpdated();
		} else {
			if (this._checkBehaviorDependencies(element, name)) {
				//Make the behavior available as a property on the DOM node.
				//TODO: What if people assign a plain config to the property?
				//Maybe this should not be allowed at all, but instead always use the attribute?
				//BUT: if we can make it work then it should work for UX reasons.
				//See also comments in _renderGuides of DebugGuidesBehavior. Läuft.
				element[name] = new Behavior(element, config);

				this._updateWaitingBehaviors(element);

				element.behaviorsUpdated();
			} else {
				this.behaviorsWaitingForDependencies.push({ name: name, config: config });
			}
		}
	},

	detachBehavior: function detachBehavior(element, name) {
		element[name].destructor();
		delete element[name];
		element.behaviorsUpdated();
	},

	_checkBehaviorDependencies: function _checkBehaviorDependencies(element, name) {
		var Behavior = this.behaviors[name];

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = Behavior.dependencies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var dependency = _step.value;

				if (!element.hasOwnProperty(dependency)) {
					return false;
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return true;
	},

	_updateWaitingBehaviors: function _updateWaitingBehaviors(element) {
		var stillWaiting = [];
		var finallyResolved = [];

		//Check if any of the waiting behaviors can now be resolved.
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = this.behaviorsWaitingForDependencies[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var waitingBehavior = _step2.value;

				if (this._checkBehaviorDependencies(element, waitingBehavior.name)) {
					finallyResolved.push(waitingBehavior);
				} else {
					stillWaiting.push(waitingBehavior);
				}
			}
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}

		this.behaviorsWaitingForDependencies = stillWaiting;

		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = finallyResolved[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var _waitingBehavior = _step3.value;

				this.attachBehavior(element, _waitingBehavior.name, _waitingBehavior.config);
			}
		} catch (err) {
			_didIteratorError3 = true;
			_iteratorError3 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion3 && _iterator3.return) {
					_iterator3.return();
				}
			} finally {
				if (_didIteratorError3) {
					throw _iteratorError3;
				}
			}
		}
	}
};

exports.default = Scrollmeister;

},{}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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

},{"types/CSSLengthType.js":17,"types/NumberType.js":19,"types/StringType.js":20}],19:[function(require,module,exports){
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

},{}],20:[function(require,module,exports){
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

},{}]},{},[13]);
