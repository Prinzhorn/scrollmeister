/*!
 * Scrollmeister v0.0.1 (April 16th 2018)
 * Open-source JavaScript framework to declaratively build scrolling experiences
 * 
 * https://www.scrollmeister.com
 * 
 * @author  Alexander Prinzhorn (https://www.prinzhorn.it)
 * @license MIT
 * 
 * This bundle contains the following npm packages: document-register-element, linear-partitioning, object-assign, raf, regl, resize-observer-polyfill, scroll-logic, youtube-iframe
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Scrollmeister = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*! (C) Andrea Giammarchi - @WebReflection - Mit Style License */
(function(window,polyfill){"use strict";var document=window.document,Object=window.Object;var htmlClass=function(info){var catchClass=/^[A-Z]+[a-z]/,filterBy=function(re){var arr=[],tag;for(tag in register){if(re.test(tag))arr.push(tag)}return arr},add=function(Class,tag){tag=tag.toLowerCase();if(!(tag in register)){register[Class]=(register[Class]||[]).concat(tag);register[tag]=register[tag.toUpperCase()]=Class}},register=(Object.create||Object)(null),htmlClass={},i,section,tags,Class;for(section in info){for(Class in info[section]){tags=info[section][Class];register[Class]=tags;for(i=0;i<tags.length;i++){register[tags[i].toLowerCase()]=register[tags[i].toUpperCase()]=Class}}}htmlClass.get=function get(tagOrClass){return typeof tagOrClass==="string"?register[tagOrClass]||(catchClass.test(tagOrClass)?[]:""):filterBy(tagOrClass)};htmlClass.set=function set(tag,Class){return catchClass.test(tag)?add(tag,Class):add(Class,tag),htmlClass};return htmlClass}({collections:{HTMLAllCollection:["all"],HTMLCollection:["forms"],HTMLFormControlsCollection:["elements"],HTMLOptionsCollection:["options"]},elements:{Element:["element"],HTMLAnchorElement:["a"],HTMLAppletElement:["applet"],HTMLAreaElement:["area"],HTMLAttachmentElement:["attachment"],HTMLAudioElement:["audio"],HTMLBRElement:["br"],HTMLBaseElement:["base"],HTMLBodyElement:["body"],HTMLButtonElement:["button"],HTMLCanvasElement:["canvas"],HTMLContentElement:["content"],HTMLDListElement:["dl"],HTMLDataElement:["data"],HTMLDataListElement:["datalist"],HTMLDetailsElement:["details"],HTMLDialogElement:["dialog"],HTMLDirectoryElement:["dir"],HTMLDivElement:["div"],HTMLDocument:["document"],HTMLElement:["element","abbr","address","article","aside","b","bdi","bdo","cite","code","command","dd","dfn","dt","em","figcaption","figure","footer","header","i","kbd","mark","nav","noscript","rp","rt","ruby","s","samp","section","small","strong","sub","summary","sup","u","var","wbr"],HTMLEmbedElement:["embed"],HTMLFieldSetElement:["fieldset"],HTMLFontElement:["font"],HTMLFormElement:["form"],HTMLFrameElement:["frame"],HTMLFrameSetElement:["frameset"],HTMLHRElement:["hr"],HTMLHeadElement:["head"],HTMLHeadingElement:["h1","h2","h3","h4","h5","h6"],HTMLHtmlElement:["html"],HTMLIFrameElement:["iframe"],HTMLImageElement:["img"],HTMLInputElement:["input"],HTMLKeygenElement:["keygen"],HTMLLIElement:["li"],HTMLLabelElement:["label"],HTMLLegendElement:["legend"],HTMLLinkElement:["link"],HTMLMapElement:["map"],HTMLMarqueeElement:["marquee"],HTMLMediaElement:["media"],HTMLMenuElement:["menu"],HTMLMenuItemElement:["menuitem"],HTMLMetaElement:["meta"],HTMLMeterElement:["meter"],HTMLModElement:["del","ins"],HTMLOListElement:["ol"],HTMLObjectElement:["object"],HTMLOptGroupElement:["optgroup"],HTMLOptionElement:["option"],HTMLOutputElement:["output"],HTMLParagraphElement:["p"],HTMLParamElement:["param"],HTMLPictureElement:["picture"],HTMLPreElement:["pre"],HTMLProgressElement:["progress"],HTMLQuoteElement:["blockquote","q","quote"],HTMLScriptElement:["script"],HTMLSelectElement:["select"],HTMLShadowElement:["shadow"],HTMLSlotElement:["slot"],HTMLSourceElement:["source"],HTMLSpanElement:["span"],HTMLStyleElement:["style"],HTMLTableCaptionElement:["caption"],HTMLTableCellElement:["td","th"],HTMLTableColElement:["col","colgroup"],HTMLTableElement:["table"],HTMLTableRowElement:["tr"],HTMLTableSectionElement:["thead","tbody","tfoot"],HTMLTemplateElement:["template"],HTMLTextAreaElement:["textarea"],HTMLTimeElement:["time"],HTMLTitleElement:["title"],HTMLTrackElement:["track"],HTMLUListElement:["ul"],HTMLUnknownElement:["unknown","vhgroupv","vkeygen"],HTMLVideoElement:["video"]},nodes:{Attr:["node"],Audio:["audio"],CDATASection:["node"],CharacterData:["node"],Comment:["#comment"],Document:["#document"],DocumentFragment:["#document-fragment"],DocumentType:["node"],HTMLDocument:["#document"],Image:["img"],Option:["option"],ProcessingInstruction:["node"],ShadowRoot:["#shadow-root"],Text:["#text"],XMLDocument:["xml"]}});if(typeof polyfill!=="object")polyfill={type:polyfill||"auto"};var REGISTER_ELEMENT="registerElement",EXPANDO_UID="__"+REGISTER_ELEMENT+(window.Math.random()*1e5>>0),ADD_EVENT_LISTENER="addEventListener",ATTACHED="attached",CALLBACK="Callback",DETACHED="detached",EXTENDS="extends",ATTRIBUTE_CHANGED_CALLBACK="attributeChanged"+CALLBACK,ATTACHED_CALLBACK=ATTACHED+CALLBACK,CONNECTED_CALLBACK="connected"+CALLBACK,DISCONNECTED_CALLBACK="disconnected"+CALLBACK,CREATED_CALLBACK="created"+CALLBACK,DETACHED_CALLBACK=DETACHED+CALLBACK,ADDITION="ADDITION",MODIFICATION="MODIFICATION",REMOVAL="REMOVAL",DOM_ATTR_MODIFIED="DOMAttrModified",DOM_CONTENT_LOADED="DOMContentLoaded",DOM_SUBTREE_MODIFIED="DOMSubtreeModified",PREFIX_TAG="<",PREFIX_IS="=",validName=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,invalidNames=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],types=[],protos=[],query="",documentElement=document.documentElement,indexOf=types.indexOf||function(v){for(var i=this.length;i--&&this[i]!==v;){}return i},OP=Object.prototype,hOP=OP.hasOwnProperty,iPO=OP.isPrototypeOf,defineProperty=Object.defineProperty,empty=[],gOPD=Object.getOwnPropertyDescriptor,gOPN=Object.getOwnPropertyNames,gPO=Object.getPrototypeOf,sPO=Object.setPrototypeOf,hasProto=!!Object.__proto__,fixGetClass=false,DRECEV1="__dreCEv1",customElements=window.customElements,usableCustomElements=!/^force/.test(polyfill.type)&&!!(customElements&&customElements.define&&customElements.get&&customElements.whenDefined),Dict=Object.create||Object,Map=window.Map||function Map(){var K=[],V=[],i;return{get:function(k){return V[indexOf.call(K,k)]},set:function(k,v){i=indexOf.call(K,k);if(i<0)V[K.push(k)-1]=v;else V[i]=v}}},Promise=window.Promise||function(fn){var notify=[],done=false,p={catch:function(){return p},then:function(cb){notify.push(cb);if(done)setTimeout(resolve,1);return p}};function resolve(value){done=true;while(notify.length)notify.shift()(value)}fn(resolve);return p},justCreated=false,constructors=Dict(null),waitingList=Dict(null),nodeNames=new Map,secondArgument=function(is){return is.toLowerCase()},create=Object.create||function Bridge(proto){return proto?(Bridge.prototype=proto,new Bridge):this},setPrototype=sPO||(hasProto?function(o,p){o.__proto__=p;return o}:gOPN&&gOPD?function(){function setProperties(o,p){for(var key,names=gOPN(p),i=0,length=names.length;i<length;i++){key=names[i];if(!hOP.call(o,key)){defineProperty(o,key,gOPD(p,key))}}}return function(o,p){do{setProperties(o,p)}while((p=gPO(p))&&!iPO.call(p,o));return o}}():function(o,p){for(var key in p){o[key]=p[key]}return o}),MutationObserver=window.MutationObserver||window.WebKitMutationObserver,HTMLElementPrototype=(window.HTMLElement||window.Element||window.Node).prototype,IE8=!iPO.call(HTMLElementPrototype,documentElement),safeProperty=IE8?function(o,k,d){o[k]=d.value;return o}:defineProperty,isValidNode=IE8?function(node){return node.nodeType===1}:function(node){return iPO.call(HTMLElementPrototype,node)},targets=IE8&&[],attachShadow=HTMLElementPrototype.attachShadow,cloneNode=HTMLElementPrototype.cloneNode,dispatchEvent=HTMLElementPrototype.dispatchEvent,getAttribute=HTMLElementPrototype.getAttribute,hasAttribute=HTMLElementPrototype.hasAttribute,removeAttribute=HTMLElementPrototype.removeAttribute,setAttribute=HTMLElementPrototype.setAttribute,createElement=document.createElement,patchedCreateElement=createElement,attributesObserver=MutationObserver&&{attributes:true,characterData:true,attributeOldValue:true},DOMAttrModified=MutationObserver||function(e){doesNotSupportDOMAttrModified=false;documentElement.removeEventListener(DOM_ATTR_MODIFIED,DOMAttrModified)},asapQueue,asapTimer=0,V0=REGISTER_ELEMENT in document&&!/^force-all/.test(polyfill.type),setListener=true,justSetup=false,doesNotSupportDOMAttrModified=true,dropDomContentLoaded=true,notFromInnerHTMLHelper=true,onSubtreeModified,callDOMAttrModified,getAttributesMirror,observer,observe,patchIfNotAlready,patch,tmp;if(MutationObserver){tmp=document.createElement("div");tmp.innerHTML="<div><div></div></div>";new MutationObserver(function(mutations,observer){if(mutations[0]&&mutations[0].type=="childList"&&!mutations[0].removedNodes[0].childNodes.length){tmp=gOPD(HTMLElementPrototype,"innerHTML");var set=tmp&&tmp.set;if(set)defineProperty(HTMLElementPrototype,"innerHTML",{set:function(value){while(this.lastChild)this.removeChild(this.lastChild);set.call(this,value)}})}observer.disconnect();tmp=null}).observe(tmp,{childList:true,subtree:true});tmp.innerHTML=""}if(!V0){if(sPO||hasProto){patchIfNotAlready=function(node,proto){if(!iPO.call(proto,node)){setupNode(node,proto)}};patch=setupNode}else{patchIfNotAlready=function(node,proto){if(!node[EXPANDO_UID]){node[EXPANDO_UID]=Object(true);setupNode(node,proto)}};patch=patchIfNotAlready}if(IE8){doesNotSupportDOMAttrModified=false;(function(){var descriptor=gOPD(HTMLElementPrototype,ADD_EVENT_LISTENER),addEventListener=descriptor.value,patchedRemoveAttribute=function(name){var e=new CustomEvent(DOM_ATTR_MODIFIED,{bubbles:true});e.attrName=name;e.prevValue=getAttribute.call(this,name);e.newValue=null;e[REMOVAL]=e.attrChange=2;removeAttribute.call(this,name);dispatchEvent.call(this,e)},patchedSetAttribute=function(name,value){var had=hasAttribute.call(this,name),old=had&&getAttribute.call(this,name),e=new CustomEvent(DOM_ATTR_MODIFIED,{bubbles:true});setAttribute.call(this,name,value);e.attrName=name;e.prevValue=had?old:null;e.newValue=value;if(had){e[MODIFICATION]=e.attrChange=1}else{e[ADDITION]=e.attrChange=0}dispatchEvent.call(this,e)},onPropertyChange=function(e){var node=e.currentTarget,superSecret=node[EXPANDO_UID],propertyName=e.propertyName,event;if(superSecret.hasOwnProperty(propertyName)){superSecret=superSecret[propertyName];event=new CustomEvent(DOM_ATTR_MODIFIED,{bubbles:true});event.attrName=superSecret.name;event.prevValue=superSecret.value||null;event.newValue=superSecret.value=node[propertyName]||null;if(event.prevValue==null){event[ADDITION]=event.attrChange=0}else{event[MODIFICATION]=event.attrChange=1}dispatchEvent.call(node,event)}};descriptor.value=function(type,handler,capture){if(type===DOM_ATTR_MODIFIED&&this[ATTRIBUTE_CHANGED_CALLBACK]&&this.setAttribute!==patchedSetAttribute){this[EXPANDO_UID]={className:{name:"class",value:this.className}};this.setAttribute=patchedSetAttribute;this.removeAttribute=patchedRemoveAttribute;addEventListener.call(this,"propertychange",onPropertyChange)}addEventListener.call(this,type,handler,capture)};defineProperty(HTMLElementPrototype,ADD_EVENT_LISTENER,descriptor)})()}else if(!MutationObserver){documentElement[ADD_EVENT_LISTENER](DOM_ATTR_MODIFIED,DOMAttrModified);documentElement.setAttribute(EXPANDO_UID,1);documentElement.removeAttribute(EXPANDO_UID);if(doesNotSupportDOMAttrModified){onSubtreeModified=function(e){var node=this,oldAttributes,newAttributes,key;if(node===e.target){oldAttributes=node[EXPANDO_UID];node[EXPANDO_UID]=newAttributes=getAttributesMirror(node);for(key in newAttributes){if(!(key in oldAttributes)){return callDOMAttrModified(0,node,key,oldAttributes[key],newAttributes[key],ADDITION)}else if(newAttributes[key]!==oldAttributes[key]){return callDOMAttrModified(1,node,key,oldAttributes[key],newAttributes[key],MODIFICATION)}}for(key in oldAttributes){if(!(key in newAttributes)){return callDOMAttrModified(2,node,key,oldAttributes[key],newAttributes[key],REMOVAL)}}}};callDOMAttrModified=function(attrChange,currentTarget,attrName,prevValue,newValue,action){var e={attrChange:attrChange,currentTarget:currentTarget,attrName:attrName,prevValue:prevValue,newValue:newValue};e[action]=attrChange;onDOMAttrModified(e)};getAttributesMirror=function(node){for(var attr,name,result={},attributes=node.attributes,i=0,length=attributes.length;i<length;i++){attr=attributes[i];name=attr.name;if(name!=="setAttribute"){result[name]=attr.value}}return result}}}document[REGISTER_ELEMENT]=function registerElement(type,options){upperType=type.toUpperCase();if(setListener){setListener=false;if(MutationObserver){observer=function(attached,detached){function checkEmAll(list,callback){for(var i=0,length=list.length;i<length;callback(list[i++])){}}return new MutationObserver(function(records){for(var current,node,newValue,i=0,length=records.length;i<length;i++){current=records[i];if(current.type==="childList"){checkEmAll(current.addedNodes,attached);checkEmAll(current.removedNodes,detached)}else{node=current.target;if(notFromInnerHTMLHelper&&node[ATTRIBUTE_CHANGED_CALLBACK]&&current.attributeName!=="style"){newValue=getAttribute.call(node,current.attributeName);if(newValue!==current.oldValue){node[ATTRIBUTE_CHANGED_CALLBACK](current.attributeName,current.oldValue,newValue)}}}}})}(executeAction(ATTACHED),executeAction(DETACHED));observe=function(node){observer.observe(node,{childList:true,subtree:true});return node};observe(document);if(attachShadow){HTMLElementPrototype.attachShadow=function(){return observe(attachShadow.apply(this,arguments))}}}else{asapQueue=[];document[ADD_EVENT_LISTENER]("DOMNodeInserted",onDOMNode(ATTACHED));document[ADD_EVENT_LISTENER]("DOMNodeRemoved",onDOMNode(DETACHED))}document[ADD_EVENT_LISTENER](DOM_CONTENT_LOADED,onReadyStateChange);document[ADD_EVENT_LISTENER]("readystatechange",onReadyStateChange);HTMLElementPrototype.cloneNode=function(deep){var node=cloneNode.call(this,!!deep),i=getTypeIndex(node);if(-1<i)patch(node,protos[i]);if(deep&&query.length)loopAndSetup(node.querySelectorAll(query));return node}}if(justSetup)return justSetup=false;if(-2<indexOf.call(types,PREFIX_IS+upperType)+indexOf.call(types,PREFIX_TAG+upperType)){throwTypeError(type)}if(!validName.test(upperType)||-1<indexOf.call(invalidNames,upperType)){throw new Error("The type "+type+" is invalid")}var constructor=function(){return extending?document.createElement(nodeName,upperType):document.createElement(nodeName)},opt=options||OP,extending=hOP.call(opt,EXTENDS),nodeName=extending?options[EXTENDS].toUpperCase():upperType,upperType,i;if(extending&&-1<indexOf.call(types,PREFIX_TAG+nodeName)){throwTypeError(nodeName)}i=types.push((extending?PREFIX_IS:PREFIX_TAG)+upperType)-1;query=query.concat(query.length?",":"",extending?nodeName+'[is="'+type.toLowerCase()+'"]':nodeName);constructor.prototype=protos[i]=hOP.call(opt,"prototype")?opt.prototype:create(HTMLElementPrototype);if(query.length)loopAndVerify(document.querySelectorAll(query),ATTACHED);return constructor};document.createElement=patchedCreateElement=function(localName,typeExtension){var is=getIs(typeExtension),node=is?createElement.call(document,localName,secondArgument(is)):createElement.call(document,localName),name=""+localName,i=indexOf.call(types,(is?PREFIX_IS:PREFIX_TAG)+(is||name).toUpperCase()),setup=-1<i;if(is){node.setAttribute("is",is=is.toLowerCase());if(setup){setup=isInQSA(name.toUpperCase(),is)}}notFromInnerHTMLHelper=!document.createElement.innerHTMLHelper;if(setup)patch(node,protos[i]);return node}}function ASAP(){var queue=asapQueue.splice(0,asapQueue.length);asapTimer=0;while(queue.length){queue.shift().call(null,queue.shift())}}function loopAndVerify(list,action){for(var i=0,length=list.length;i<length;i++){verifyAndSetupAndAction(list[i],action)}}function loopAndSetup(list){for(var i=0,length=list.length,node;i<length;i++){node=list[i];patch(node,protos[getTypeIndex(node)])}}function executeAction(action){return function(node){if(isValidNode(node)){verifyAndSetupAndAction(node,action);if(query.length)loopAndVerify(node.querySelectorAll(query),action)}}}function getTypeIndex(target){var is=getAttribute.call(target,"is"),nodeName=target.nodeName.toUpperCase(),i=indexOf.call(types,is?PREFIX_IS+is.toUpperCase():PREFIX_TAG+nodeName);return is&&-1<i&&!isInQSA(nodeName,is)?-1:i}function isInQSA(name,type){return-1<query.indexOf(name+'[is="'+type+'"]')}function onDOMAttrModified(e){var node=e.currentTarget,attrChange=e.attrChange,attrName=e.attrName,target=e.target,addition=e[ADDITION]||2,removal=e[REMOVAL]||3;if(notFromInnerHTMLHelper&&(!target||target===node)&&node[ATTRIBUTE_CHANGED_CALLBACK]&&attrName!=="style"&&(e.prevValue!==e.newValue||e.newValue===""&&(attrChange===addition||attrChange===removal))){node[ATTRIBUTE_CHANGED_CALLBACK](attrName,attrChange===addition?null:e.prevValue,attrChange===removal?null:e.newValue)}}function onDOMNode(action){var executor=executeAction(action);return function(e){asapQueue.push(executor,e.target);if(asapTimer)clearTimeout(asapTimer);asapTimer=setTimeout(ASAP,1)}}function onReadyStateChange(e){if(dropDomContentLoaded){dropDomContentLoaded=false;e.currentTarget.removeEventListener(DOM_CONTENT_LOADED,onReadyStateChange)}if(query.length)loopAndVerify((e.target||document).querySelectorAll(query),e.detail===DETACHED?DETACHED:ATTACHED);if(IE8)purge()}function patchedSetAttribute(name,value){var self=this;setAttribute.call(self,name,value);onSubtreeModified.call(self,{target:self})}function setupNode(node,proto){setPrototype(node,proto);if(observer){observer.observe(node,attributesObserver)}else{if(doesNotSupportDOMAttrModified){node.setAttribute=patchedSetAttribute;node[EXPANDO_UID]=getAttributesMirror(node);node[ADD_EVENT_LISTENER](DOM_SUBTREE_MODIFIED,onSubtreeModified)}node[ADD_EVENT_LISTENER](DOM_ATTR_MODIFIED,onDOMAttrModified)}if(node[CREATED_CALLBACK]&&notFromInnerHTMLHelper){node.created=true;node[CREATED_CALLBACK]();node.created=false}}function purge(){for(var node,i=0,length=targets.length;i<length;i++){node=targets[i];if(!documentElement.contains(node)){length--;targets.splice(i--,1);verifyAndSetupAndAction(node,DETACHED)}}}function throwTypeError(type){throw new Error("A "+type+" type is already registered")}function verifyAndSetupAndAction(node,action){var fn,i=getTypeIndex(node),counterAction;if(-1<i){patchIfNotAlready(node,protos[i]);i=0;if(action===ATTACHED&&!node[ATTACHED]){node[DETACHED]=false;node[ATTACHED]=true;counterAction="connected";i=1;if(IE8&&indexOf.call(targets,node)<0){targets.push(node)}}else if(action===DETACHED&&!node[DETACHED]){node[ATTACHED]=false;node[DETACHED]=true;counterAction="disconnected";i=1}if(i&&(fn=node[action+CALLBACK]||node[counterAction+CALLBACK]))fn.call(node)}}function CustomElementRegistry(){}CustomElementRegistry.prototype={constructor:CustomElementRegistry,define:usableCustomElements?function(name,Class,options){if(options){CERDefine(name,Class,options)}else{var NAME=name.toUpperCase();constructors[NAME]={constructor:Class,create:[NAME]};nodeNames.set(Class,NAME);customElements.define(name,Class)}}:CERDefine,get:usableCustomElements?function(name){return customElements.get(name)||get(name)}:get,whenDefined:usableCustomElements?function(name){return Promise.race([customElements.whenDefined(name),whenDefined(name)])}:whenDefined};function CERDefine(name,Class,options){var is=options&&options[EXTENDS]||"",CProto=Class.prototype,proto=create(CProto),attributes=Class.observedAttributes||empty,definition={prototype:proto};safeProperty(proto,CREATED_CALLBACK,{value:function(){if(justCreated)justCreated=false;else if(!this[DRECEV1]){this[DRECEV1]=true;new Class(this);if(CProto[CREATED_CALLBACK])CProto[CREATED_CALLBACK].call(this);var info=constructors[nodeNames.get(Class)];if(!usableCustomElements||info.create.length>1){notifyAttributes(this)}}}});safeProperty(proto,ATTRIBUTE_CHANGED_CALLBACK,{value:function(name){if(-1<indexOf.call(attributes,name))CProto[ATTRIBUTE_CHANGED_CALLBACK].apply(this,arguments)}});if(CProto[CONNECTED_CALLBACK]){safeProperty(proto,ATTACHED_CALLBACK,{value:CProto[CONNECTED_CALLBACK]})}if(CProto[DISCONNECTED_CALLBACK]){safeProperty(proto,DETACHED_CALLBACK,{value:CProto[DISCONNECTED_CALLBACK]})}if(is)definition[EXTENDS]=is;name=name.toUpperCase();constructors[name]={constructor:Class,create:is?[is,secondArgument(name)]:[name]};nodeNames.set(Class,name);document[REGISTER_ELEMENT](name.toLowerCase(),definition);whenDefined(name);waitingList[name].r()}function get(name){var info=constructors[name.toUpperCase()];return info&&info.constructor}function getIs(options){return typeof options==="string"?options:options&&options.is||""}function notifyAttributes(self){var callback=self[ATTRIBUTE_CHANGED_CALLBACK],attributes=callback?self.attributes:empty,i=attributes.length,attribute;while(i--){attribute=attributes[i];callback.call(self,attribute.name||attribute.nodeName,null,attribute.value||attribute.nodeValue)}}function whenDefined(name){name=name.toUpperCase();if(!(name in waitingList)){waitingList[name]={};waitingList[name].p=new Promise(function(resolve){waitingList[name].r=resolve})}return waitingList[name].p}function polyfillV1(){if(customElements)delete window.customElements;defineProperty(window,"customElements",{configurable:true,value:new CustomElementRegistry});defineProperty(window,"CustomElementRegistry",{configurable:true,value:CustomElementRegistry});for(var patchClass=function(name){var Class=window[name];if(Class){window[name]=function CustomElementsV1(self){var info,isNative;if(!self)self=this;if(!self[DRECEV1]){justCreated=true;info=constructors[nodeNames.get(self.constructor)];isNative=usableCustomElements&&info.create.length===1;self=isNative?Reflect.construct(Class,empty,info.constructor):document.createElement.apply(document,info.create);self[DRECEV1]=true;justCreated=false;if(!isNative)notifyAttributes(self)}return self};window[name].prototype=Class.prototype;try{Class.prototype.constructor=window[name]}catch(WebKit){fixGetClass=true;defineProperty(Class,DRECEV1,{value:window[name]})}}},Classes=htmlClass.get(/^HTML[A-Z]*[a-z]/),i=Classes.length;i--;patchClass(Classes[i])){}document.createElement=function(name,options){var is=getIs(options);return is?patchedCreateElement.call(this,name,secondArgument(is)):patchedCreateElement.call(this,name)};if(!V0){justSetup=true;document[REGISTER_ELEMENT]("")}}if(!customElements||/^force/.test(polyfill.type))polyfillV1();else if(!polyfill.noBuiltIn){try{(function(DRE,options,name){options[EXTENDS]="a";DRE.prototype=create(HTMLAnchorElement.prototype);DRE.prototype.constructor=DRE;window.customElements.define(name,DRE,options);if(getAttribute.call(document.createElement("a",{is:name}),"is")!==name||usableCustomElements&&getAttribute.call(new DRE,"is")!==name){throw options}})(function DRE(){return Reflect.construct(HTMLAnchorElement,[],DRE)},{},"document-register-element-a")}catch(o_O){polyfillV1()}}if(!polyfill.noBuiltIn){try{createElement.call(document,"a","a")}catch(FireFox){secondArgument=function(is){return{is:is.toLowerCase()}}}}})(window);

},{}],2:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

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
'use strict'
/*eslint-env browser */

module.exports = {
  /**
   * Create a <style>...</style> tag and add it to the document head
   * @param {string} cssText
   * @param {object?} options
   * @return {Element}
   */
  createStyle: function (cssText, options) {
    var container = document.head || document.getElementsByTagName('head')[0]
    var style = document.createElement('style')
    options = options || {}
    style.type = 'text/css'
    if (options.href) {
      style.setAttribute('data-href', options.href)
    }
    if (style.sheet) { // for jsdom and IE9+
      style.innerHTML = cssText
      style.sheet.cssText = cssText
    }
    else if (style.styleSheet) { // for IE8 and below
      style.styleSheet.cssText = cssText
    }
    else { // for Chrome, Firefox, and Safari
      style.appendChild(document.createTextNode(cssText))
    }
    if (options.prepend) {
      container.insertBefore(style, container.childNodes[0]);
    } else {
      container.appendChild(style);
    }
    return style
  }
}

},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _CustomEvent = require('ponies/CustomEvent.js');

var _CustomEvent2 = _interopRequireDefault(_CustomEvent);

var _schemaParser = require('lib/schemaParser.js');

var _schemaParser2 = _interopRequireDefault(_schemaParser);

var _types = require('types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

function normalizeEventsArguments(element, eventName, callback) {
	//The first parameter can be ommitted and defaults to the element that the behavior is attached to.
	if (arguments.length === 2) {
		callback = eventName;
		eventName = element;

		if (eventName.charAt(0) === '^') {
			eventName = eventName.slice(1);
			element = this.parentEl;
		} else {
			element = this.el;
		}
	}

	return {
		element: element,
		eventName: eventName,
		callback: callback
	};
}

var Behavior = function () {
	_createClass(Behavior, null, [{
		key: 'behaviorSchema',
		get: function get() {
			throw new Error('Your behavior class "' + this.constructor.name + '" needs to implement the static "behaviorSchema" getter.');
		}
	}, {
		key: 'behaviorName',
		get: function get() {
			throw new Error('Your behavior class "' + this.constructor.name + '" needs to implement the static "behaviorName" getter.');
		}
	}, {
		key: 'behaviorDependencies',
		get: function get() {
			throw new Error('Your behavior class "' + this.constructor.name + '" needs to implement the static "behaviorDependencies" getter.');
		}
	}]);

	function Behavior(element, rawProperties) {
		_classCallCheck(this, Behavior);

		this.hasNotifiedAtLeastOnce = false;
		this.el = element;
		this.parentEl = element.parentElement;
		this.props = {};

		this._shadowChildren = [];

		this._observeDOMTypes();
		this._proxyCSS();
		this._proxyProps();
		this._parseProperties(rawProperties);

		if (this.behaviorDidAttach) {
			this.behaviorDidAttach();
		}

		this.emit('attach');
	}

	_createClass(Behavior, [{
		key: 'destructor',
		value: function destructor() {
			if (this.behaviorWillDetach) {
				this.behaviorWillDetach();
			}

			//Clean up all event listeners added using listen/listenAndInvoke.
			if (this.listeners) {
				for (var i = 0; i < this.listeners.length; i++) {
					var listener = this.listeners[i];

					this.unlisten(listener.element, listener.eventName, listener.callback);
				}
			}

			//Clean up all element appended to shadow-meister.
			var shadowEl = this._findShadowMeister();

			if (shadowEl) {
				for (var _i = 0; _i < this._shadowChildren.length; _i++) {
					shadowEl.removeChild(this._shadowChildren[_i]);
				}

				this._shadowChildren.length = 0;
			}

			this._unproxyCSS();

			this.emit('detach');
		}
	}, {
		key: 'error',
		value: function error(_error) {
			this.el.renderError(_error);

			throw _error;
		}
	}, {
		key: 'notify',
		value: function notify() {
			this.hasNotifiedAtLeastOnce = true;
			this.emit('change');
		}
	}, {
		key: 'connectTo',
		value: function connectTo(dependencyName, notifyCallback, connectedCallback) {
			if (this.constructor.behaviorDependencies.indexOf(dependencyName) === -1) {
				throw new Error('You are trying to connect the "' + this.constructor.behaviorName + '" behavior to the "' + dependencyName + '" behavior, which is not listed as dependency.');
			}

			var element = this.el;

			if (dependencyName.charAt(0) === '^') {
				dependencyName = dependencyName.slice(1);
				element = this.parentEl;
			}

			var behavior = element[dependencyName];
			var _callback = function callback() {
				//Overwrite the callback so it only ever gets called a single time.
				//After the first time we call the notifyCallback directly.
				_callback = notifyCallback;

				if (connectedCallback) {
					connectedCallback(behavior);
				}

				notifyCallback(behavior);
			};

			//For the most part this is what "connecting" is about.
			//We just listen to the change event of the other behavior.
			this.listen(element, dependencyName + ':change', function () {
				_callback(behavior);
			});

			//This is up for debate. Do we need to update the connection every time
			//this behavior gets new props?
			this.listen(this.constructor.behaviorName + ':update', function () {
				if (behavior.hasNotifiedAtLeastOnce) {
					_callback(behavior);
				}
			});

			//This catches the edge case where the current behavior is attached lazy
			//and the dependency already had a change event. We want to update the behavior immediately.
			if (behavior.hasNotifiedAtLeastOnce) {
				_callback(behavior);
			}
		}
	}, {
		key: 'listen',
		value: function listen(element, eventName, callback) {
			var _this = this;

			//Space separated list of event names for the same element and callback.
			var _normalizeEventsArgum = normalizeEventsArguments.apply(this, arguments);

			element = _normalizeEventsArgum.element;
			eventName = _normalizeEventsArgum.eventName;
			callback = _normalizeEventsArgum.callback;
			if (eventName.indexOf(' ') !== -1) {
				eventName.split(' ').map(function (s) {
					return s.trim();
				}).forEach(function (s) {
					_this.listen(element, s, callback);
				});

				return;
			}

			element.addEventListener(eventName, callback, thirdEventListenerArgument);

			if (!this.listeners) {
				this.listeners = [];
			}

			this.listeners.push({ element: element, eventName: eventName, callback: callback });
		}
	}, {
		key: 'listenOnce',
		value: function listenOnce(element, eventName, callback) {
			var _normalizeEventsArgum2 = normalizeEventsArguments.apply(this, arguments);

			element = _normalizeEventsArgum2.element;
			eventName = _normalizeEventsArgum2.eventName;
			callback = _normalizeEventsArgum2.callback;


			var self = this;

			function oneCallback() {
				self.unlisten(element, eventName, oneCallback);
				callback.apply(this, arguments);
			}

			//I was too lazy to implement it more cleanly. At least we throw instead of having unpredictable behavior.
			//This is needed because below we store a reference to the actual listener as _once property.
			//If you use the same callback for two events they would overwrite each other and we
			//could never unlisten() the first one.
			if (typeof callback._once === 'function') {
				throw new Error('You cannot use the same listener for multiple events with listenOnce');
			}

			callback._once = oneCallback;
			this.listen(element, eventName, oneCallback);
		}
	}, {
		key: 'listenAndInvoke',
		value: function listenAndInvoke(element, eventName, callback) {
			var _normalizeEventsArgum3 = normalizeEventsArguments.apply(this, arguments);

			element = _normalizeEventsArgum3.element;
			eventName = _normalizeEventsArgum3.eventName;
			callback = _normalizeEventsArgum3.callback;


			this.listen(element, eventName, callback);
			callback();
		}
	}, {
		key: 'unlisten',
		value: function unlisten(element, eventName, callback) {

			//This is a hack to make listenOnce work.
			//We store a reference to the original listener as _once property.
			var _normalizeEventsArgum4 = normalizeEventsArguments.apply(this, arguments);

			element = _normalizeEventsArgum4.element;
			eventName = _normalizeEventsArgum4.eventName;
			callback = _normalizeEventsArgum4.callback;
			if (typeof callback._once === 'function') {
				callback = callback._once;
				delete callback._once;
			}

			element.removeEventListener(eventName, callback, thirdEventListenerArgument);
		}
	}, {
		key: 'emit',
		value: function emit(name) {
			var bubbles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

			//Namespace the event to the name of the behavior.
			name = this.constructor.behaviorName + ':' + name;

			var event = new _CustomEvent2.default(name, {
				bubbles: bubbles,
				cancelable: false,
				detail: this
			});

			this.el.dispatchEvent(event);
		}
	}, {
		key: '_findShadowMeister',
		value: function _findShadowMeister() {
			for (var i = this.el.children.length - 1; i > 0; i--) {
				var child = this.el.children[i];
				if (child.tagName.toUpperCase() === 'SHADOW-MEISTER') {
					return child;
				}
			}

			return null;
		}
	}, {
		key: 'appendChild',
		value: function appendChild(element) {
			var shadowEl = this._findShadowMeister();

			if (!shadowEl) {
				shadowEl = document.createElement('shadow-meister');
				this.el.appendChild(shadowEl);
			}

			shadowEl.appendChild(element);
			this._shadowChildren.push(element);
		}
	}, {
		key: 'removeChild',
		value: function removeChild(element) {
			var shadowEl = this._findShadowMeister();

			if (!shadowEl) {
				throw new Error('You have called removeChild, but there is no shadow-meister. Did you append the element using Behavior.appendChild?');
			}

			var index = this._shadowChildren.indexOf(element);

			if (index !== -1) {
				shadowEl.removeChild(element);
				this._shadowChildren.splice(index, 1);
			}
		}
	}, {
		key: 'updateProperties',
		value: function updateProperties(properties) {
			var prevProps = (0, _objectAssign2.default)({}, this.props);

			if (typeof properties === 'string') {
				this._parseProperties(properties);
			} else {
				for (var name in properties) {
					if (properties.hasOwnProperty(name)) {
						this._parseProperty(name, properties[name]);
					}
				}
			}

			if (this.update) {
				this.update(prevProps);
			}

			this.emit('update');
		}
	}, {
		key: '_updateProperty',
		value: function _updateProperty(name, rawValue) {
			var prevProps = (0, _objectAssign2.default)({}, this.props);

			this._parseProperty(name, rawValue);

			if (this.update) {
				this.update(prevProps);
			}

			this.emit('update');
		}
	}, {
		key: '_observeDOMTypes',
		value: function _observeDOMTypes() {
			var _this2 = this;

			var propertiesWithDOMTypes = [];
			var schema = this.constructor.behaviorSchema;

			for (var property in schema) {
				if (!schema.hasOwnProperty(property)) {
					continue;
				}

				if (_types.domtypes.indexOf(schema[property].type) !== -1) {
					propertiesWithDOMTypes.push(property);
				}
			}

			if (propertiesWithDOMTypes.length > 0) {
				//If this behavior has DOM types, we need to update it every time the DOM changes.
				//E.g. if a new component is inserted between existing ones, layout needs to be updated.
				this.listen(document, 'scrollmeister:connected scrollmeister:disconnected', function () {
					var properties = {};

					for (var i = 0; i < propertiesWithDOMTypes.length; i++) {
						var name = propertiesWithDOMTypes[i];
						properties[name] = _this2[name];
					}

					//Force update/parsing with the same properties.
					_this2.updateProperties(properties);
				});
			}
		}
	}, {
		key: '_proxyCSS',
		value: function _proxyCSS() {
			var behaviorName = this.constructor.behaviorName;
			var element = this.el;

			this.style = {
				set transform(value) {
					if (value === '') {
						element.resetBehaviorStyle(behaviorName, 'transform');
					} else {
						element.setBehaviorStyle(behaviorName, 'transform', value);
					}
				},
				set opacity(value) {
					if (value === '') {
						element.resetBehaviorStyle(behaviorName, 'opacity');
					} else {
						element.setBehaviorStyle(behaviorName, 'opacity', value);
					}
				}
			};
		}
	}, {
		key: '_unproxyCSS',
		value: function _unproxyCSS() {
			var behaviorName = this.constructor.behaviorName;

			this.el.resetBehaviorStyles(behaviorName);
		}
	}, {
		key: '_proxyProps',
		value: function _proxyProps() {
			var _this3 = this;

			var schema = this.constructor.behaviorSchema;

			var _loop = function _loop(property) {
				if (schema.hasOwnProperty(property)) {
					Object.defineProperty(_this3, property, {
						get: function get() {
							return _schemaParser2.default.stringifyProperty(this.el, this.props[property], schema[property].type);
						},
						set: function set(value) {
							this._updateProperty(property, value);
						}
					});
				}
			};

			for (var property in schema) {
				_loop(property);
			}
		}
	}, {
		key: '_parseProperties',
		value: function _parseProperties(rawProperties) {
			var schema = this.constructor.behaviorSchema;

			try {
				_schemaParser2.default.parseProperties(this.el, schema, rawProperties, this.props);
			} catch (err) {
				this.error(err);
			}
		}
	}, {
		key: '_parseProperty',
		value: function _parseProperty(property, rawValue) {
			rawValue = rawValue.trim();

			var schema = this.constructor.behaviorSchema[property];
			var propertyType = schema.type;
			var valueExpander = schema.expand;

			//Setting the empty string resets the property to the default value.
			if (rawValue === '') {
				if (!schema.hasOwnProperty('default')) {
					throw new Error('The "' + property + '" property does not have a default value. It cannot be unset using an empty string.');
				}

				rawValue = schema.default;
			}

			//TODO: does not validate against .enum
			this.props[property] = _schemaParser2.default.parseProperty(this.el, property, rawValue, propertyType, valueExpander);
		}
	}]);

	return Behavior;
}();

exports.default = Behavior;

},{"lib/schemaParser.js":33,"object-assign":2,"ponies/CustomEvent.js":34,"types":45}],10:[function(require,module,exports){
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
		key: 'behaviorDidAttach',
		value: function behaviorDidAttach() {
			this._createElement();

			this.connectTo('guides-layout', this._render.bind(this));
		}
	}, {
		key: '_createElement',
		value: function _createElement() {
			this._guidesWrapper = document.createElement('div');
			this._guidesWrapper.style.cssText = '\n\t\t\tposition: fixed;\n\t\t\tleft: 0;\n\t\t\ttop: 0;\n\t\t\twidth: 100%;\n\t\t\theight: 100%;\n\t\t\tpointer-events: none;\n\t\t';

			this.appendChild(this._guidesWrapper);
		}
	}, {
		key: '_render',
		value: function _render(guidesLayoutBehavior) {
			var _this2 = this;

			var guides = guidesLayoutBehavior.engine.guides;

			var html = guides.map(function (guide) {
				var width = guide.width;
				var opacity = 0.2;

				if (guide.width === 0) {
					width = 1;
					opacity = 1;
				}

				return '\n\t\t\t\t<div title="' + guide.name + '" style="position: absolute; top: 0; bottom: 0; background:' + _this2.props.color + '; left: ' + guide.rightPosition + 'px; opacity: ' + opacity + '; px; width: ' + width + 'px;"></div>\n\t\t\t';
			});

			this._guidesWrapper.innerHTML = html.join('');

			this.notify();
		}
	}], [{
		key: 'behaviorSchema',
		get: function get() {
			return {
				color: {
					type: 'string',
					default: '#0cf'
				}
			};
		}
	}, {
		key: 'behaviorName',
		get: function get() {
			return 'debug-guides';
		}
	}, {
		key: 'behaviorDependencies',
		get: function get() {
			return ['guides-layout'];
		}
	}]);

	return DebugGuidesBehavior;
}(_Behavior3.default);

exports.default = DebugGuidesBehavior;

},{"behaviors/Behavior.js":9}],11:[function(require,module,exports){
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

var FadeInBehavior = function (_Behavior) {
	_inherits(FadeInBehavior, _Behavior);

	function FadeInBehavior() {
		_classCallCheck(this, FadeInBehavior);

		return _possibleConstructorReturn(this, (FadeInBehavior.__proto__ || Object.getPrototypeOf(FadeInBehavior)).apply(this, arguments));
	}

	_createClass(FadeInBehavior, [{
		key: 'behaviorDidAttach',
		value: function behaviorDidAttach() {
			var _this2 = this;

			//Make sure the very first render took place and everything is updated.
			this.listenOnce('guides-layout:change', function () {
				_this2.el.style.opacity = 1;
			});
		}
	}, {
		key: 'behaviorWillDetach',
		value: function behaviorWillDetach() {
			this.el.style.opacity = '';
		}
	}], [{
		key: 'behaviorSchema',
		get: function get() {
			return {};
		}
	}, {
		key: 'behaviorName',
		get: function get() {
			return 'fadein';
		}
	}, {
		key: 'behaviorDependencies',
		get: function get() {
			return ['guides-layout'];
		}
	}]);

	return FadeInBehavior;
}(_Behavior3.default);

exports.default = FadeInBehavior;

},{"behaviors/Behavior.js":9}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _GuidesLayoutEngine = require('lib/GuidesLayoutEngine.js');

var _GuidesLayoutEngine2 = _interopRequireDefault(_GuidesLayoutEngine);

var _Behavior2 = require('behaviors/Behavior.js');

var _Behavior3 = _interopRequireDefault(_Behavior2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GuidesLayoutBehavior = function (_Behavior) {
	_inherits(GuidesLayoutBehavior, _Behavior);

	function GuidesLayoutBehavior() {
		_classCallCheck(this, GuidesLayoutBehavior);

		return _possibleConstructorReturn(this, (GuidesLayoutBehavior.__proto__ || Object.getPrototypeOf(GuidesLayoutBehavior)).apply(this, arguments));
	}

	_createClass(GuidesLayoutBehavior, [{
		key: 'behaviorDidAttach',
		value: function behaviorDidAttach() {
			this._layoutScheduled = false;

			this._initLayoutEngine();
		}
	}, {
		key: 'update',
		value: function update() {
			this._scheduleLayout();
		}
	}, {
		key: '_initLayoutEngine',
		value: function _initLayoutEngine() {
			var _this2 = this;

			this.engine = new _GuidesLayoutEngine2.default();

			this.listenAndInvoke(window, 'resize', function () {
				var viewport = _this2._getViewport();
				_this2.engine.updateViewport(viewport);
				_this2._scheduleLayout();
			});

			//Whenever a new layout behavior is attached or changed, we need to do layout.
			this.listen('layout:attach layout:update layout:heightchange', this._scheduleLayout.bind(this));
		}
	}, {
		key: '_getScrollbarWidth',
		value: function _getScrollbarWidth() {
			//Sue me.
			//Forcing the whole document to reflow three times (by forcing overflow scroll/hidden) is insanely costly.
			//It took about 2.5ms. Compared to the 0.7ms that doLayout takes in total, this was the bottleneck by far.
			//Note: I don't like the yellow stuff in my Performance tab.
			if (this._getScrollbarWidth.hasOwnProperty('_cache')) {
				return this._getScrollbarWidth._cache;
			}

			var documentElement = document.documentElement;

			if (!documentElement) {
				throw new Error('There is no documentElement to get the scrollbar width of.');
			}

			var originalOverflow = documentElement.style.overflowY;

			//Force a scrollbar to get the inner dimensions.
			documentElement.style.overflowY = 'scroll';

			var innerWidth = documentElement.clientWidth;

			//Force NO scrollbar to get the outer dimensions.
			documentElement.style.overflowY = 'hidden';

			var outerWidth = documentElement.clientWidth;

			//Restore overflow.
			documentElement.style.overflowY = originalOverflow;

			var scrollbarWidth = this._getScrollbarWidth._cache = outerWidth - innerWidth;

			return scrollbarWidth;
		}
	}, {
		key: '_getViewport',
		value: function _getViewport() {
			var documentElement = document.documentElement;

			if (!documentElement) {
				throw new Error('There is no documentElement to get the size of.');
			}

			var width = documentElement.clientWidth;
			var outerWidth = width + this._getScrollbarWidth();
			var height = documentElement.clientHeight;
			var outerHeight = height;

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
	}, {
		key: '_doLayout',
		value: function _doLayout() {
			this._layoutScheduled = false;

			var nodes = Array.prototype.slice.call(this.el.querySelectorAll('[layout]')).map(function (el) {
				return el.layout;
			});

			this.engine.doLayout(nodes, this.props.guides, this.props.width);

			this.notify();
		}
	}], [{
		key: 'behaviorSchema',
		get: function get() {
			return {
				guides: {
					type: [[{ name: 'string' }, { position: 'csslength' }, { width: 'csslength' }]],
					expand: function expand(rawProperties) {
						//The width is optional and defaults to 0.
						if (rawProperties.length === 2) {
							rawProperties.push('0');
							return true;
						}

						return false;
					},
					default: ''
				},
				width: {
					type: 'csslength',
					default: '1280px'
				}
			};
		}
	}, {
		key: 'behaviorName',
		get: function get() {
			return 'guides-layout';
		}
	}, {
		key: 'behaviorDependencies',
		get: function get() {
			return [];
		}
	}]);

	return GuidesLayoutBehavior;
}(_Behavior3.default);

exports.default = GuidesLayoutBehavior;

},{"behaviors/Behavior.js":9,"lib/GuidesLayoutEngine.js":27,"raf":5}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _resizeObserverPolyfill = require('resize-observer-polyfill');

var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

var _Behavior2 = require('behaviors/Behavior.js');

var _Behavior3 = _interopRequireDefault(_Behavior2);

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
		key: 'behaviorDidAttach',
		value: function behaviorDidAttach() {
			this.intrinsicHeight = 0;

			this.scrollUpdate = {};
			this.layout = {};

			//TODO: only wrap if needed? In most cases we don't need innerEl at all. Only for specific cases, e.g. followers with clipping.
			//But still always define innerEl, even if it is === el
			this._wrapContents();

			this.connectTo('^guides-layout', this._render.bind(this));
			this.connectTo('^scroll', this._scroll.bind(this));

			this.listen('^scroll:pause', this._scrollPause.bind(this));

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
		key: 'behaviorWillDetach',
		value: function behaviorWillDetach() {
			if (this.props.height === 'auto') {
				this._unobserveHeight();
			}

			this._unwrapContents();
			//TODO: remove styles
		}

		//Some of the layout rendering (e.g. clipping with parallax) requires a single child element.

	}, {
		key: '_wrapContents',
		value: function _wrapContents() {
			//TODO: use a custom element instead of a div, so we can use .css. and not worry about clean up.
			//But need be innerCSS? Ugh.

			//Includes elements and also text nodes.
			var childNodes = this.el.childNodes;
			var childElements = this.el.children;

			//There is just a single element, maybe we don't need to wrap anything (*fingers crossed*).
			if (childElements.length === 1) {
				//There are no text nodes, just this one element. #winning
				if (childNodes.length === 1) {
					this.innerEl = childElements[0];
					this.contentEl = this.el;
					return;
				}

				//There is a single element as child, but there might also be whitespace (text nodes) around it.
				//Check if there is nothing but "empty" text nodes, which we can ignore.
				//This catches cases such as the following, where the whitespace (nl, tab) around the <img> is irrelevant.
				//<element-meister>
				//	<img>
				//</element-meister>
				var onlyEmptyTextNodes = true;

				for (var i = 0; i < childNodes.length; i++) {
					var child = childNodes[i];

					if (child.nodeType === Node.TEXT_NODE && child.textContent.trim() !== '') {
						onlyEmptyTextNodes = false;
						break;
					}
				}

				if (onlyEmptyTextNodes) {
					this.innerEl = childElements[0];
					this.contentEl = this.el;
					return;
				}
			}

			//TODO: event if childElements.length is > 1, we might still not need to wrap if length - 1 are just <script> tags.

			console.log('Wrapped ' + childNodes.length + ' children in a <div>'); // eslint-disable-line

			var fragment = document.createDocumentFragment();
			this.innerEl = document.createElement('div');

			//childNodes is a live list, so length gets smaller.
			while (childNodes.length > 0) {
				fragment.appendChild(childNodes[0]);
			}

			this.innerEl.appendChild(fragment);
			this.el.appendChild(this.innerEl);
			this.contentEl = this.innerEl;
		}
	}, {
		key: '_unwrapContents',
		value: function _unwrapContents() {
			if (this.innerEl === this.contentEl) {
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
			var _this2 = this;

			this._resizeObserver = new _resizeObserverPolyfill2.default(function (entries) {
				_this2.intrinsicHeight = entries[0].contentRect.height;
				_this2.emit('heightchange');
			});

			this._resizeObserver.observe(this.innerEl);
		}
	}, {
		key: '_unobserveHeight',
		value: function _unobserveHeight() {
			this._resizeObserver.disconnect();
			this._resizeObserver = null;
		}
	}, {
		key: '_render',
		value: function _render() {
			this._renderWrapper();
			this._renderInner();

			//Force a scroll update.
			this._scroll(this.parentEl.scroll, true);

			this.notify();
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
			var width = this.layout.width;
			var height = this.layout.height;
			var contain = 'strict';

			if (this.props.clip) {
				height = this.layout.clipRect.height;
				overflow = 'hidden';
			}

			style.display = display;
			style.overflow = overflow;
			style.width = Math.round(width) + 'px';
			style.height = Math.round(height) + 'px';
			style.contain = contain;
		}
	}, {
		key: '_renderInner',
		value: function _renderInner() {
			var style = this.innerEl.style;
			var width = this.layout.width;

			style.position = 'relative';
			style.width = Math.round(width) + 'px';

			if (this.props.height === 'auto') {
				style.height = 'auto';
			} else {
				style.height = Math.round(this.layout.height) + 'px';
			}

			if (this.props.clip) {
				style.backfaceVisibility = style.WebkitBackfaceVisibility = 'hidden';
			}
		}
	}, {
		key: '_scroll',
		value: function _scroll(scrollBehavior) {
			var forceUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			var scrollUpdate = this.scrollUpdate;

			var style = this.el.style;
			var innerStyle = this.innerEl.style;

			this.parentEl.guidesLayout.engine.doScroll(this.layout, scrollBehavior.scrollState.position, scrollUpdate);

			if (scrollUpdate.wrapperTopChanged || forceUpdate) {
				var left = Math.round(this.layout.left);
				var top = scrollUpdate.wrapperTop;

				//We force the tile to be visible (loaded into GPU) when it is inside the viewport.
				//But we do not do the opposite here. This is just the last resort.
				//Under normal circumstances an async process (_scrollPause) toggles display block/none intelligently.
				if (scrollUpdate.inViewport) {
					style.display = 'block';
					style.willChange = 'transform';
				}

				this.style.transform = 'translate(' + left + 'px, ' + top + 'px)';

				//The reason we don't blindly apply the CSS transform is that most elements don't need a transform on the content layer at all.
				//This would waste a ton of GPU memory for no reason. The only elements that need it are things like parallax scrolling
				//or elements with appear effects using scaling/rotation.
				innerStyle.msTransform = 'translate(0, ' + scrollUpdate.contentTopOffset + 'px)';
				innerStyle.transform = innerStyle.WebkitTransform = 'translate3d(0px, ' + scrollUpdate.contentTopOffset + 'px, 0)';

				//TODO: only needed when the inner element is actually translated, e.g. parallax / pinning.
				//style.willChange = scrollUpdate.inExtendedViewport ? 'transform' : 'auto';

				//TODO: I was here trying to implement clipping, e.g. scrollupdate.wrapperTop and wrapperHeight
			}

			if (scrollUpdate.inExtendedViewportChanged) {
				if (scrollUpdate.inExtendedViewportChanged) {
					this.emit('extendedviewport:enter');
				} else {
					this.emit('extendedviewport:leave');
				}
			}

			if (scrollUpdate.inViewportChanged) {
				if (scrollUpdate.inViewport) {
					this.emit('viewport:enter');
				} else {
					this.emit('viewport:leave');
				}
			}

			if (scrollUpdate.inCenterChanged) {
				if (scrollUpdate.inCenter) {
					this.emit('center:enter');
				} else {
					this.emit('center:leave');
				}
			}
		}
	}, {
		key: '_scrollPause',
		value: function _scrollPause() {
			var scrollUpdate = this.scrollUpdate;
			var style = this.el.style;

			if (scrollUpdate.inExtendedViewport) {
				style.display = 'block';
				style.willChange = 'transform';
			} else {
				if (this._canSafelyBeUnloadedFromGPU()) {
					style.display = 'none';
				} else {
					//This reduces gpu memory a ton and also hides text at the edge of the viewport.
					//Otherwise those elements would be visible behind the adress bar in iOS.
					//There's no inverse operation to that because once it is inside the viewport again
					//the translation will overwrite the scale transform.
					style.transform = style.WebkitTransform = style.msTransform = 'scale(0)';
				}

				style.willChange = 'auto';
			}
		}
	}], [{
		key: 'behaviorSchema',
		get: function get() {
			return {
				guides: {
					type: [{ left: 'string' }, { right: 'string' }],
					default: 'viewport',
					expand: function expand(rawProperties) {
						//We only expand a single "viewport".
						if (rawProperties.length === 1 && rawProperties[0] === 'viewport') {
							rawProperties.push('viewport');
							return true;
						}

						return false;
					}
				},
				height: {
					type: 'height',
					default: 'auto'
				},
				spacing: {
					type: [{ top: 'csslength' }, { bottom: 'csslength' }],
					expand: function expand(rawProperties) {
						//Allow a single spacing and use it for both top and bottom.
						if (rawProperties.length === 1) {
							rawProperties.push(rawProperties[0]);
							return true;
						}

						return false;
					},
					default: '0 0'
				},
				mode: {
					type: 'string',
					enum: ['flow', 'follow'],
					default: 'flow'
				},
				followerMode: {
					type: 'string',
					enum: ['parallax', 'pin'],
					default: 'parallax'
				},
				pinAnchor: {
					type: 'string',
					enum: ['top', 'center', 'bottom'],
					default: 'center'
				},
				pinOffset: {
					type: 'csslength',
					default: '0'
				},
				clip: {
					type: 'boolean',
					default: 'false'
				},
				dependencies: {
					type: 'layoutdependency',
					default: 'inherit'
				}
			};
		}
	}, {
		key: 'behaviorName',
		get: function get() {
			return 'layout';
		}
	}, {
		key: 'behaviorDependencies',
		get: function get() {
			return ['^guides-layout', '^scroll'];
		}
	}]);

	return LayoutBehavior;
}(_Behavior3.default);

exports.default = LayoutBehavior;

},{"behaviors/Behavior.js":9,"resize-observer-polyfill":6}],14:[function(require,module,exports){
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

var MediaBehavior = function (_Behavior) {
	_inherits(MediaBehavior, _Behavior);

	function MediaBehavior() {
		_classCallCheck(this, MediaBehavior);

		return _possibleConstructorReturn(this, (MediaBehavior.__proto__ || Object.getPrototypeOf(MediaBehavior)).apply(this, arguments));
	}

	_createClass(MediaBehavior, [{
		key: 'behaviorDidAttach',
		value: function behaviorDidAttach() {
			this.connectTo('layout', this._render.bind(this));
		}
	}, {
		key: 'behaviorWillDetach',
		value: function behaviorWillDetach() {
			var img = this.el.querySelector('img');
			var style = img.style;

			style.display = '';
			style.position = '';
			style.left = style.top = '';
			style.maxWidth = style.maxHeight = '';
			style.width = '';
			style.height = '';
			style.transform = '';
		}
	}, {
		key: '_render',
		value: function _render(layoutBehavior) {
			//TODO: need a wrapper for overflow:hidden
			var layout = this.calculateMediaLayout(layoutBehavior);
			var img = this.el.querySelector('img');
			var style = img.style;

			style.display = 'block';
			style.position = 'absolute';
			style.left = style.top = 0;
			style.maxWidth = style.maxHeight = 'none';
			style.width = Math.round(layout.width) + 'px';
			style.height = Math.round(layout.height) + 'px';
			style.transform = 'translate(' + Math.round(layout.left) + 'px, ' + Math.round(layout.top) + 'px)';

			this.notify();
		}
	}, {
		key: '_calculateMediaSize',
		value: function _calculateMediaSize(layoutBehavior) {
			var ratio = this.props.ratio.num;
			var fit = this.props.fit;
			var _layoutBehavior$layou = layoutBehavior.layout,
			    width = _layoutBehavior$layou.width,
			    height = _layoutBehavior$layou.height;

			var containerRatio = width / height;

			if (fit !== 'fill') {
				if (fit === 'contain' && containerRatio > ratio || fit === 'cover' && containerRatio < ratio) {
					width = height * ratio;
				} else {
					height = width / ratio;
				}
			}

			return {
				width: width,
				height: height
			};
		}
	}, {
		key: 'calculateMediaLayout',
		value: function calculateMediaLayout(layoutBehavior) {
			var layoutEngine = this.parentEl.guidesLayout.engine;
			var size = this._calculateMediaSize(layoutBehavior);
			var fit = this.props.fit;
			var _layoutBehavior$layou2 = layoutBehavior.layout,
			    width = _layoutBehavior$layou2.width,
			    height = _layoutBehavior$layou2.height;
			var _props$position = this.props.position,
			    x = _props$position.x,
			    y = _props$position.y;

			var focalPointX = layoutEngine.lengthToPixel(x, size.width);
			var focalPointY = layoutEngine.lengthToPixel(y, size.height);

			var left = void 0;
			var top = void 0;

			if (fit === 'cover') {
				//Center the focal point inside the container.
				left = width / 2 - focalPointX;
				top = height / 2 - focalPointY;

				//Make sure the media is still aligned with the edge of the container.
				//This means we move the focal point as close to the center as possible
				//without exposing the container behind it.
				left = Math.min(0, Math.max(width - size.width, left));
				top = Math.min(0, Math.max(height - size.height, top));
			} else {
				//TODO: position is relevant for contain as well.
				//For contain/stretch fit we center the media inside its container.
				left = width / 2 - size.width / 2;
				top = height / 2 - size.height / 2;
			}

			return {
				width: size.width,
				height: size.height,
				left: left,
				top: top
			};
		}
	}], [{
		key: 'behaviorSchema',
		get: function get() {
			return {
				ratio: {
					type: 'ratio'
				},
				fit: {
					type: 'string',
					enum: ['fill', 'cover', 'contain'],
					default: 'cover'
				},
				position: {
					type: [{ x: 'csslength' }, { y: 'csslength' }],
					expand: function expand(rawProperties) {
						//Allow a single position and use it for both x and y.
						if (rawProperties.length === 1) {
							rawProperties.push(rawProperties[0]);
							return true;
						}

						return false;
					},
					default: '50% 50%'
				}
			};
		}
	}, {
		key: 'behaviorName',
		get: function get() {
			return 'media';
		}
	}, {
		key: 'behaviorDependencies',
		get: function get() {
			return ['^guides-layout', 'layout'];
		}
	}]);

	return MediaBehavior;
}(_Behavior3.default);

exports.default = MediaBehavior;

},{"behaviors/Behavior.js":9}],15:[function(require,module,exports){
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

var MousetrapBehavior = function (_Behavior) {
	_inherits(MousetrapBehavior, _Behavior);

	function MousetrapBehavior() {
		_classCallCheck(this, MousetrapBehavior);

		return _possibleConstructorReturn(this, (MousetrapBehavior.__proto__ || Object.getPrototypeOf(MousetrapBehavior)).apply(this, arguments));
	}

	_createClass(MousetrapBehavior, [{
		key: 'behaviorDidAttach',
		value: function behaviorDidAttach() {
			this._render();
		}
	}, {
		key: 'update',
		value: function update() {
			this._render();
		}
	}, {
		key: 'behaviorWillDetach',
		value: function behaviorWillDetach() {
			this.el.style.pointerEvents = '';
		}
	}, {
		key: '_render',
		value: function _render() {
			//TODO: access scrollmode here?
			//TODO: instead of pointer events, add an overlay div to the <shadow-meister>.
			this.el.style.pointerEvents = 'none';
		}
	}], [{
		key: 'behaviorSchema',
		get: function get() {
			return {
				native: {
					type: 'string',
					enum: ['always', 'fullscreen', 'never'],
					default: 'fullscreen'
				},
				touch: {
					type: 'string',
					enum: ['always', 'fullscreen', 'never'],
					default: 'fullscreen'
				}
			};
		}
	}, {
		key: 'behaviorName',
		get: function get() {
			return 'mousetrap';
		}
	}, {
		key: 'behaviorDependencies',
		get: function get() {
			return ['^guides-layout'];
		}
	}]);

	return MousetrapBehavior;
}(_Behavior3.default);

exports.default = MousetrapBehavior;

},{"behaviors/Behavior.js":9}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _scrollLogic = require('scroll-logic');

var _scrollLogic2 = _interopRequireDefault(_scrollLogic);

var _ScrollState = require('lib/ScrollState.js');

var _ScrollState2 = _interopRequireDefault(_ScrollState);

var _fakeClick = require('lib/fakeClick.js');

var _fakeClick2 = _interopRequireDefault(_fakeClick);

var _isTextInput = require('lib/isTextInput.js');

var _isTextInput2 = _interopRequireDefault(_isTextInput);

var _easings = require('lib/easings.js');

var _easings2 = _interopRequireDefault(_easings);

var _Behavior2 = require('behaviors/Behavior.js');

var _Behavior3 = _interopRequireDefault(_Behavior2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isAndroidFirefox = /Android; (?:Mobile|Tablet); .+ Firefox/i.test(navigator.userAgent);
var isBadAndroid = /Android /.test(navigator.userAgent) && !/Chrome\/\d/.test(navigator.userAgent);
var isAppleiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

var ScrollBehavior = function (_Behavior) {
	_inherits(ScrollBehavior, _Behavior);

	function ScrollBehavior() {
		_classCallCheck(this, ScrollBehavior);

		return _possibleConstructorReturn(this, (ScrollBehavior.__proto__ || Object.getPrototypeOf(ScrollBehavior)).apply(this, arguments));
	}

	_createClass(ScrollBehavior, [{
		key: 'behaviorDidAttach',
		value: function behaviorDidAttach() {
			this.scrollMode = 'touch';

			this._scrollAnimation = null;

			this._lastScrollTime = -1;

			this._setupScrolling();

			this.connectTo('guides-layout', this._updateScrollHeight.bind(this));

			//It is important that the _scrollLoop is scheduled after initLayoutEngine (which schedules layout).
			//This guarantees that the very first `scroll` event will be emited AFTER the very first `layout` event.
			(0, _raf2.default)(this._scrollLoop.bind(this));
		}
	}, {
		key: 'behaviorWillDetach',
		value: function behaviorWillDetach() {
			this.scrollState.destroy();
		}
	}, {
		key: 'update',
		value: function update(prevProps) {
			if (prevProps.overscroll !== this.props.overscroll) {
				this._scrollLogic.options.bouncing = this.props.overscroll;
			}
		}
	}, {
		key: '_setupScrolling',
		value: function _setupScrolling() {
			this.scrollState = new _ScrollState2.default(this.notify.bind(this), this.emit.bind(this, 'pause', false));

			this._setupMobileScrolling();
			this._handleScrollModes();
		}
	}, {
		key: '_setupMobileScrolling',
		value: function _setupMobileScrolling() {
			var _this2 = this;

			this._scrollLogic = new _scrollLogic2.default({
				bouncing: this.props.overscroll
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
				var oneNative = function oneNative() {
					window.removeEventListener('mousemove', threeMousemove, false);
					window.removeEventListener('scroll', oneNative, false);

					//Move the scroll offset over from fake to native scrolling.
					var scrollPosition = _this3._scrollLogic.getOffset();

					//This compensates the amount scrolling that JUST happened.
					//Imagine using pageup/down keys, we would lose the first jump otherwise.
					var delta = _this3._getNativeScrollPosition() - _this3._lastNativeScrollPosition;

					window.scrollTo(0, scrollPosition + delta);

					_this3.scrollMode = 'native';

					waitForFakeAction();
				};

				var threeMousemove = function threeMousemove() {
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

					oneNative();
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

					_this3.scrollMode = 'touch';

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
			if (!document.documentElement || !document.body) {
				throw new Error('There is no documentElement or body to get the scroll position from.');
			}

			return document.documentElement.scrollTop || document.body.scrollTop;
		}
	}, {
		key: '_updateScrollAnimation',
		value: function _updateScrollAnimation(now) {
			var animation = this._scrollAnimation;

			if (!animation.hasOwnProperty('startTime')) {
				animation.startTime = now;
				animation.endTime = now + Math.abs(animation.targetPosition - animation.startPosition) / 3;
			}

			var currentScrollPosition = void 0;

			if (now > animation.endTime) {
				currentScrollPosition = animation.targetPosition;
				this._scrollAnimation = null;
			} else {
				var progress = void 0;

				progress = 1 - (animation.endTime - now) / (animation.endTime - animation.startTime);
				progress = _easings2.default.outCubic(progress);

				currentScrollPosition = animation.startPosition + (animation.targetPosition - animation.startPosition) * progress;
			}

			this.scrollTo(currentScrollPosition);
		}
	}, {
		key: 'scrollTo',
		value: function scrollTo(position) {
			var animate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			position = Math.round(position);

			if (animate) {
				var currentPosition = this.getPosition();

				this._scrollAnimation = {
					startPosition: currentPosition,
					targetPosition: position
				};
			} else {
				if (this.scrollMode === 'native') {
					window.scrollTo(0, position);
				} else {
					this._scrollLogic.scrollTo(position);
				}
			}
		}
	}, {
		key: '_scrollLoop',
		value: function _scrollLoop(now) {
			//The very first frame doesn't have a previous one.
			if (this._lastScrollTime === -1) {
				this._lastScrollTime = now;
			}

			this._pollScrollPosition(now);

			this._lastScrollTime = now;
			(0, _raf2.default)(this._scrollLoop.bind(this));
		}
	}, {
		key: 'getPosition',
		value: function getPosition() {
			var currentScrollPosition = void 0;

			if (this.scrollMode === 'touch') {
				currentScrollPosition = this._scrollLogic.getOffset();
			} else {
				currentScrollPosition = this._lastNativeScrollPosition = Math.round(this._getNativeScrollPosition());
			}

			return currentScrollPosition;
		}
	}, {
		key: '_pollScrollPosition',
		value: function _pollScrollPosition(now) {
			if (this._scrollAnimation) {
				this._updateScrollAnimation(now);
			}

			this.scrollState.tick(now, this.getPosition());
		}
	}, {
		key: '_updateScrollHeight',
		value: function _updateScrollHeight(guidesLayoutBehavior) {
			var layoutEngine = guidesLayoutBehavior.engine;
			var requiredHeight = layoutEngine.requiredHeight;

			//Firefox on Android will scroll natively to remove the addressbar.
			//This can not be prevented, even with preventDefault on the touch events.
			//Since moving the addressbar causes doLayout calls, it performs bad.
			//http://stackoverflow.com/questions/28129663/firefox-on-android-prevent-adressbar-from-disappearing
			//It's also causing trouble on Android stock browser with scrollMode detection.
			//We also recently added this for iOS because it was the only thing breaking iframe embeds.
			//On iOS the iframe will scale to the height of its content, but we query the window height.
			//So basically it was growing ENDLESSLY (100vh kept getting larger)!
			if (isAndroidFirefox || isBadAndroid || isAppleiOS) {
				if (!document.documentElement) {
					throw new Error('There is no documentElement to style.');
				}

				document.documentElement.style.overflow = 'visible';
				this.el.style.height = 0;
			} else {
				this.el.style.height = Math.round(requiredHeight) + 'px';
			}

			this._scrollLogic.setContainerLength(layoutEngine.viewport.height);
			this._scrollLogic.setContentLength(requiredHeight);

			this.scrollState.maxPosition = requiredHeight - layoutEngine.viewport.height;

			//Make sure we don't lose our relative scroll position.
			this.scrollTo(this.scrollState.maxPosition * this.scrollState.progress);
		}
	}], [{
		key: 'behaviorSchema',
		get: function get() {
			return {
				overscroll: {
					type: 'boolean',
					default: 'true'
				}
			};
		}
	}, {
		key: 'behaviorName',
		get: function get() {
			return 'scroll';
		}
	}, {
		key: 'behaviorDependencies',
		get: function get() {
			return ['guides-layout'];
		}
	}]);

	return ScrollBehavior;
}(_Behavior3.default);

exports.default = ScrollBehavior;

},{"behaviors/Behavior.js":9,"lib/ScrollState.js":28,"lib/easings.js":30,"lib/fakeClick.js":31,"lib/isTextInput.js":32,"raf":5,"scroll-logic":7}],17:[function(require,module,exports){
'use strict';

var _scrollmeister = require('scrollmeister.js');

var _scrollmeister2 = _interopRequireDefault(_scrollmeister);

var _GuidesLayoutBehavior = require('behaviors/GuidesLayoutBehavior.js');

var _GuidesLayoutBehavior2 = _interopRequireDefault(_GuidesLayoutBehavior);

var _ScrollBehavior = require('behaviors/ScrollBehavior.js');

var _ScrollBehavior2 = _interopRequireDefault(_ScrollBehavior);

var _DebugGuidesBehavior = require('behaviors/DebugGuidesBehavior.js');

var _DebugGuidesBehavior2 = _interopRequireDefault(_DebugGuidesBehavior);

var _FadeInBehavior = require('behaviors/FadeInBehavior.js');

var _FadeInBehavior2 = _interopRequireDefault(_FadeInBehavior);

var _LayoutBehavior = require('behaviors/LayoutBehavior.js');

var _LayoutBehavior2 = _interopRequireDefault(_LayoutBehavior);

var _MediaBehavior = require('behaviors/MediaBehavior.js');

var _MediaBehavior2 = _interopRequireDefault(_MediaBehavior);

var _MousetrapBehavior = require('behaviors/MousetrapBehavior.js');

var _MousetrapBehavior2 = _interopRequireDefault(_MousetrapBehavior);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import FullscreenBehavior from 'behaviors/FullscreenBehavior.js';

_scrollmeister2.default.defineBehavior(_GuidesLayoutBehavior2.default);
_scrollmeister2.default.defineBehavior(_ScrollBehavior2.default);
_scrollmeister2.default.defineBehavior(_DebugGuidesBehavior2.default);
_scrollmeister2.default.defineBehavior(_FadeInBehavior2.default);

_scrollmeister2.default.defineBehavior(_LayoutBehavior2.default);
_scrollmeister2.default.defineBehavior(_MediaBehavior2.default);
_scrollmeister2.default.defineBehavior(_MousetrapBehavior2.default);
//Scrollmeister.defineBehavior(FullscreenBehavior);

},{"behaviors/DebugGuidesBehavior.js":10,"behaviors/FadeInBehavior.js":11,"behaviors/GuidesLayoutBehavior.js":12,"behaviors/LayoutBehavior.js":13,"behaviors/MediaBehavior.js":14,"behaviors/MousetrapBehavior.js":15,"behaviors/ScrollBehavior.js":16,"scrollmeister.js":35}],18:[function(require,module,exports){
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

		// Note: if you feel clever and think you can just define
		// the static `observedAttributes` getter on the super class: IE 9/10.
		get: function get() {
			var behaviorNames = _scrollmeister2.default.getDefinedBehaviorNames();
			var conditionNames = _scrollmeister2.default.getDefinedConditionNames();

			//First of all we observe all attributes that correspond to a behavior.
			var observedAttributes = behaviorNames.slice();

			//Additionally we need to observe each behavior for each condition as well.
			//They're separated by an underscore.
			for (var i = 0; i < behaviorNames.length; i++) {
				var behavior = behaviorNames[i];

				for (var j = 0; j < conditionNames.length; j++) {
					var condition = conditionNames[j];

					observedAttributes.push(behavior + '_' + condition);
				}
			}

			return observedAttributes;
		}
	}]);

	return ElementMeisterComponent;
}(_MeisterComponent3.default);

exports.default = ElementMeisterComponent;

},{"./MeisterComponent.js":19,"scrollmeister.js":35}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _BehaviorsStyleMerger = require('lib/BehaviorsStyleMerger.js');

var _BehaviorsStyleMerger2 = _interopRequireDefault(_BehaviorsStyleMerger);

var _scrollmeister = require('scrollmeister.js');

var _scrollmeister2 = _interopRequireDefault(_scrollmeister);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var invalidMarkupSelectors = [':not(scroll-meister) > element-meister', 'scroll-meister * element-meister', 'scroll-meister scroll-meister', 'element-meister element-meister', 'element-meister scroll-meister'];

var ScrollMeisterComponent = function (_HTMLElement) {
	_inherits(ScrollMeisterComponent, _HTMLElement);

	_createClass(ScrollMeisterComponent, [{
		key: 'isConnected',


		//Polyfill (modern browsers have this).
		get: function get() {
			if (!document.body) {
				return false;
			}

			return document.body.contains(this);
		}

		// Note: if you feel clever and think you can just define
		// the static `observedAttributes` getter on the super class: IE 9/10.

		// https://github.com/WebReflection/document-register-element/tree/7e2743d38f0bf01806cb9b76ba254f62f8cb24b2#v1-caveat
		// $FlowFixMe: Won't be fixed ;)

	}]);

	function ScrollMeisterComponent(_) {
		var _this, _ret;

		_classCallCheck(this, ScrollMeisterComponent);

		// $FlowFixMe: Won't be fixed ;)
		return _ret = ((_ = (_this = _possibleConstructorReturn(this, (ScrollMeisterComponent.__proto__ || Object.getPrototypeOf(ScrollMeisterComponent)).call(this, _)), _this)).init(), _), _possibleConstructorReturn(_this, _ret); // eslint-disable-line
	}

	_createClass(ScrollMeisterComponent, [{
		key: 'init',
		value: function init() {
			this.behaviors = {};

			this._behaviorsStyleMerger = new _BehaviorsStyleMerger2.default(this, _scrollmeister2.default.getBehaviorOrder());

			this._scheduledBatchUpdate = false;
			this._scheduledBehaviors = {
				attach: {},
				detach: {}
			};
		}
	}, {
		key: 'connectedCallback',
		value: function connectedCallback() {
			var _this2 = this;

			//This happens when a disconnected element (e.g. document.createElement) gets attributes before being inserted.
			//We will then update the behaviors as soon as it is connected.
			if (this._scheduledBatchUpdate) {
				this._batchUpdateBehaviors();
			}

			_scrollmeister2.default.componentConnected(this);

			//Make some sanity checks on the markup for UX.
			(0, _raf2.default)(function () {
				if (document.querySelector(invalidMarkupSelectors.join(','))) {
					_this2.renderError(new Error('You have nested <scroll-meister> and <element-meister> elements in an unsupported way. <element-meister> elements need to always be direct children of <scroll-meister>.'));
				}
			});
		}
	}, {
		key: 'disconnectedCallback',
		value: function disconnectedCallback() {
			//This happens when the element is moved inside the DOM using sth. like insertBefore.
			//In this case we will just ignore the disconnectedCallback, because the Node is not actually disconnected.
			//It is safe to leave the behaviors attached, because stuff like nextSibling and parentElement are defined.
			//A connectedCallback will follow right away.
			//https://twitter.com/WebReflection/status/984400317801476097
			if (this.isConnected) {
				return;
			}

			_raf2.default.cancel(this._batchHandle);

			//Remove all attached behaviors so they can be garbage collected.
			_scrollmeister2.default.detachBehaviors(this, this.behaviors, true);

			_scrollmeister2.default.componentDisconnected(this);
		}
	}, {
		key: 'attributeChangedCallback',
		value: function attributeChangedCallback(attr, oldValue, newValue) {
			if (newValue === null) {
				this._scheduledBehaviors.detach[attr] = true;
				delete this._scheduledBehaviors.attach[attr];
			} else {
				this._scheduledBehaviors.attach[attr] = newValue;
				delete this._scheduledBehaviors.detach[attr];
			}

			if (!this._scheduledBatchUpdate) {
				this._scheduledBatchUpdate = true;

				//Only update the behaviors if the element is actually connected.
				//Otherwise we'll do it in connectedCallback.
				if (this.isConnected) {
					this._batchHandle = (0, _raf2.default)(this._batchUpdateBehaviors.bind(this));
				}
			}
		}
	}, {
		key: 'setBehaviorStyle',
		value: function setBehaviorStyle(behaviorName, property, value) {
			this._behaviorsStyleMerger.setBehaviorStyle(behaviorName, property, value);
		}
	}, {
		key: 'resetBehaviorStyle',
		value: function resetBehaviorStyle(behaviorName, property) {
			this._behaviorsStyleMerger.resetBehaviorStyle(behaviorName, property);
		}
	}, {
		key: 'resetBehaviorStyles',
		value: function resetBehaviorStyles(behaviorName) {
			this._behaviorsStyleMerger.resetBehaviorStyles(behaviorName);
		}
	}, {
		key: 'renderError',
		value: function renderError(error) {
			if ("development" === 'development') {
				var el = this;
				var outerHTML = el.outerHTML;

				el.style.height = 'auto';
				el.style.position = 'static';

				//TODO: other behaviors might prevent the message from be seen, we need to completely halt Scrollmeister.
				//Maybe block all events (using process.env.NODE_ENV of course).
				el.innerHTML = '\n\t\t\t\t<div style="color: #721c24; background: #f8d7da; border: 1px solid #f5c6cb; margin: 10px; padding: 20px; border-radius: 5px;">\n\t\t\t\t\t<h1 style="color: inherit; font-size: 30px; padding: 0 0 20px 0; margin: 0;"></h1>\n\t\t\t\t\t<p style="color: inherit; font-size: 20px; padding: 0 0 20px 0; margin: 0;">\n\t\t\t\t\t\t<strong></strong>\n\t\t\t\t\t</p>\n\t\t\t\t\t<pre style="background: #eee; padding: 20px;"></pre>\n\t\t\t\t</div>\n\t\t\t';

				// $FlowFixMe: Thank's flow, but I know these selectors will exist because of the line above.
				el.querySelector('h1').textContent = this.constructor.behaviorName;
				// $FlowFixMe: Thank's flow, but I know these selectors will exist because of the line above.
				el.querySelector('strong').textContent = error.message;
				// $FlowFixMe: Thank's flow, but I know these selectors will exist because of the line above.
				el.querySelector('pre').textContent = outerHTML;
			}
		}
	}, {
		key: '_batchUpdateBehaviors',
		value: function _batchUpdateBehaviors() {
			this._scheduledBatchUpdate = false;

			_scrollmeister2.default.attachBehaviors(this, this._scheduledBehaviors.attach);
			this._scheduledBehaviors.attach = {};

			_scrollmeister2.default.detachBehaviors(this, this._scheduledBehaviors.detach);
			this._scheduledBehaviors.detach = {};
		}
	}]);

	return ScrollMeisterComponent;
}(HTMLElement);

exports.default = ScrollMeisterComponent;

},{"lib/BehaviorsStyleMerger.js":25,"raf":5,"scrollmeister.js":35}],20:[function(require,module,exports){
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

		// Note: if you feel clever and think you can just define
		// the static `observedAttributes` getter on the super class: IE 9/10.
		get: function get() {
			var behaviorNames = _scrollmeister2.default.getDefinedBehaviorNames();
			var conditionNames = _scrollmeister2.default.getDefinedConditionNames();

			//First of all we observe all attributes that correspond to a behavior.
			var observedAttributes = behaviorNames.slice();

			//Additionally we need to observe each behavior for each condition as well.
			//They're separated by an underscore.
			for (var i = 0; i < behaviorNames.length; i++) {
				var behavior = behaviorNames[i];

				for (var j = 0; j < conditionNames.length; j++) {
					var condition = conditionNames[j];

					observedAttributes.push(behavior + '_' + condition);
				}
			}

			return observedAttributes;
		}
	}]);

	return ScrollMeisterComponent;
}(_MeisterComponent3.default);

exports.default = ScrollMeisterComponent;

},{"./MeisterComponent.js":19,"scrollmeister.js":35}],21:[function(require,module,exports){
'use strict';

require('document-register-element');

var _scrollmeister = require('scrollmeister.js');

var _scrollmeister2 = _interopRequireDefault(_scrollmeister);

var _ScrollMeisterComponent = require('components/ScrollMeisterComponent.js');

var _ScrollMeisterComponent2 = _interopRequireDefault(_ScrollMeisterComponent);

var _ElementMeisterComponent = require('components/ElementMeisterComponent.js');

var _ElementMeisterComponent2 = _interopRequireDefault(_ElementMeisterComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//https://twitter.com/WebReflection/status/973932114621161473
//https://github.com/WebReflection/ready
//We need to defer the define() calls, because the static observedAttributes getter is evaluated immediately.
//However, we need to know about all defined behaviors to observe the correct attributes.
//If we would define() synchronously, then behavior authors would need to define their behavior _before_ that.
document.addEventListener('DOMContentLoaded', function () {
	_scrollmeister2.default.behaviorsRegistry.close();
	customElements.define('scroll-meister', _ScrollMeisterComponent2.default);
	customElements.define('element-meister', _ElementMeisterComponent2.default);
	customElements.define('shadow-meister', function (_HTMLElement) {
		_inherits(_class, _HTMLElement);

		function _class() {
			_classCallCheck(this, _class);

			return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
		}

		return _class;
	}(HTMLElement));
}, { once: true });

},{"components/ElementMeisterComponent.js":18,"components/ScrollMeisterComponent.js":20,"document-register-element":1,"scrollmeister.js":35}],22:[function(require,module,exports){
'use strict';

var _scrollmeister = require('scrollmeister.js');

var _scrollmeister2 = _interopRequireDefault(_scrollmeister);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//TODO: do we want it that way? Should defineCondition return a function to update the condition?
//They should be pure and only rely on their parameters.
//Should it accept parameters?
//let updateXS = Scrollmeister.defineCondition('s', () => window.innerWidth >= 576);
//Or how about: Scrollmeister.updateCondition('m', window)

_scrollmeister2.default.defineCondition('m', function (win) {
	return win.innerWidth >= 768;
}, function (update) {
	window.addEventListener('resize', function () {
		update();
	}, false);

	update();
});
_scrollmeister2.default.defineCondition('l', function (win) {
	return win.innerWidth >= 992;
});
_scrollmeister2.default.defineCondition('xl', function (win) {
	return win.innerWidth >= 1200;
});

_scrollmeister2.default.defineCondition('s-down', function (win) {
	return win.innerWidth < 576;
});
_scrollmeister2.default.defineCondition('m-down', function (win) {
	return win.innerWidth < 768;
});
_scrollmeister2.default.defineCondition('l-down', function (win) {
	return win.innerWidth < 992;
});
_scrollmeister2.default.defineCondition('xl-down', function (win) {
	return win.innerWidth < 1200;
});

_scrollmeister2.default.defineCondition('portrait', function (win) {
	return win.innerWidth < win.innerHeight;
});
_scrollmeister2.default.defineCondition('landscape', function (win) {
	return win.innerWidth >= win.innerHeight;
});

//TODO: let's see what Modernizr, feature.js and has.js offer to get some inspiration.
_scrollmeister2.default.defineCondition('webgl', function () {
	return true;
});

//TODO: function is optional, a condition can also be constant
_scrollmeister2.default.defineCondition('websockets', function () {
	return typeof WebSocket === 'function';
});

//TODO: do we allow element-queries? They can potentially end in infinite loops.

//TODO: Allow composing conditions from existing
//let update = Scrollmeister.defineCondition('wat', ['xl', 'portrait'], (xl, portrait, more, extra) => xl && portrait);
//update('foo', 'bar') will set "more" and "extra" to these.
_scrollmeister2.default.defineCondition('wat', ['xl', 'portrait'], function (xl, portrait) {
	return xl && portrait;
});

//TODO: Condition changes propagate synchrnously. But Scrollmeister will batch them and schedule an update just like detach/attach

//window.addEventListener('resize', ....)

},{"scrollmeister.js":35}],23:[function(require,module,exports){
'use strict';

var _scrollmeister = require('scrollmeister.js');

var _scrollmeister2 = _interopRequireDefault(_scrollmeister);

require('./scrollmeister.sass');

require('./conditions');

require('./behaviors');

require('./components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//This makes browserify --standalone work and exports Scrollmeister as an UMD module.
module.exports = _scrollmeister2.default; //eslint-disable-line no-undef

},{"./behaviors":17,"./components":21,"./conditions":22,"./scrollmeister.sass":36,"scrollmeister.js":35}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var lowerCaseAndDashRegex = /^[a-z-]+$/;

var BehaviorsRegistry = function () {
	function BehaviorsRegistry() {
		_classCallCheck(this, BehaviorsRegistry);

		this._closed = false;
		this._behaviors = {};
		this._order = [];
	}

	_createClass(BehaviorsRegistry, [{
		key: 'add',
		value: function add(classDefinition) {
			var name = classDefinition.behaviorName;

			if (this._behaviors.hasOwnProperty(name)) {
				throw new Error('You are trying to redefine the "' + name + '" behavior.');
			}

			if (!lowerCaseAndDashRegex.test(name)) {
				throw new Error('The behavior "' + name + '" you are trying to define uses invalid characters. Behaviors can only use lower case characters and dashes.');
			}

			if (this._closed) {
				throw new Error('You are trying to define the "' + name + '" behavior too late. You need to define behaviors before DOMContentLoaded."');
			}

			var dependencies = classDefinition.behaviorDependencies;

			for (var i = 0; i < dependencies.length; i++) {
				var dependency = dependencies[i];

				if (dependency.charAt(0) === '^') {
					dependency = dependency.slice(1);
				}

				if (!this._behaviors.hasOwnProperty(dependency)) {
					throw new Error('You are trying to define a "' + name + '" behavior that depends on "' + dependency + '", which is not defined. Make sure to define behaviors in the correct order.');
				}
			}

			this._behaviors[name] = classDefinition;

			//This is an insanely clever "hack".
			//Every behavior can have dependencies, so behaviors are like a graph.
			//We could sort/linearize this graph to initialize behaviors in the correct order.
			//However, we simply assume they are _defined_ in the correct order and track this here.
			//This totally makes sense and we even throw when defining a behavior that declares
			//a dependency that does not exist (yet). So the order is guaranteed to be correct.
			this._order.push(name);
		}
	}, {
		key: 'has',
		value: function has(name) {
			return this._behaviors.hasOwnProperty(name);
		}
	}, {
		key: 'get',
		value: function get(name) {
			return this._behaviors[name];
		}
	}, {
		key: 'getNames',
		value: function getNames() {
			return Object.keys(this._behaviors);
		}
	}, {
		key: 'getOrder',
		value: function getOrder() {
			return this._order.slice();
		}
	}, {
		key: 'close',
		value: function close() {
			this._closed = true;
		}
	}]);

	return BehaviorsRegistry;
}();

exports.default = BehaviorsRegistry;

},{}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BehaviorsStyleMerger = function () {
	function BehaviorsStyleMerger(element, order) {
		_classCallCheck(this, BehaviorsStyleMerger);

		this.el = element;
		this.order = order;

		this._styles = {};
	}

	_createClass(BehaviorsStyleMerger, [{
		key: 'setBehaviorStyle',
		value: function setBehaviorStyle(behaviorName, property, value) {
			if (!this._styles.hasOwnProperty(property)) {
				this._styles[property] = {};
			}

			//Remember that the given behavior just set this style.
			this._styles[property][behaviorName] = value;

			this._applyBehaviorStyle(property);
		}
	}, {
		key: 'resetBehaviorStyle',
		value: function resetBehaviorStyle(behaviorName, property) {
			if (this._styles.hasOwnProperty(property) && this._styles[property].hasOwnProperty(behaviorName)) {
				delete this._styles[property][behaviorName];
				this._applyBehaviorStyle(property);
			}
		}
	}, {
		key: 'resetBehaviorStyles',
		value: function resetBehaviorStyles(behaviorName) {
			for (var property in this._styles) {
				this.resetBehaviorStyle(behaviorName, property);
			}
		}
	}, {
		key: '_applyBehaviorStyle',
		value: function _applyBehaviorStyle(property) {
			if (property === 'transform') {
				var transforms = [];

				//Collect all transforms across all behaviors.
				for (var i = 0; i < this.order.length; i++) {
					var behaviorName = this.order[i];
					if (this._styles.transform.hasOwnProperty(behaviorName)) {
						transforms.push(this._styles.transform[behaviorName]);
					}
				}

				if (transforms.length > 0) {
					this.el.style.transform = this.el.style.WebkitTransform = this.el.style.msTransform = transforms.join(' ');
				} else {
					this.el.style.transform = '';
				}

				return;
			} else if (property === 'opacity') {
				var combinedOpacity = 1;

				//Multiply all opacity across all behaviors.
				for (var _behaviorName in this._styles.opacity) {
					if (this._styles.opacity.hasOwnProperty(_behaviorName)) {
						combinedOpacity *= this._styles.opacity[_behaviorName];
					}
				}

				this.el.style.opacity = combinedOpacity;
			} else {
				var hasProperty = false;

				for (var _behaviorName2 in this._styles[property]) {
					if (this._styles[property].hasOwnProperty(_behaviorName2)) {
						this.el.style[property] = this._styles[property][_behaviorName2];

						if (hasProperty) {
							throw new Error('The "' + property + '" property was set by multiple behaviors (' + Object.keys(this._styles[property]).join(', ') + ') but it cannot be merged.');
						}

						hasProperty = true;
					}
				}

				//No behavior had a style for this property. Reset it completely.
				if (!hasProperty) {
					this.el.style[property] = '';
				}
			}
		}
	}]);

	return BehaviorsStyleMerger;
}();

exports.default = BehaviorsStyleMerger;

},{}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var lowerCaseAndDashRegex = /^[a-z-]+$/;

var ConditionsRegistry = function () {
	function ConditionsRegistry() {
		_classCallCheck(this, ConditionsRegistry);

		this._conditions = {};
	}

	_createClass(ConditionsRegistry, [{
		key: "add",
		value: function add(name, valueFn) {
			if (this._conditions.hasOwnProperty(name)) {
				throw new Error("You are trying to redefine the \"" + name + "\" condition.");
			}

			if (!lowerCaseAndDashRegex.test(name)) {
				throw new Error("The condition \"" + name + "\" you are trying to define uses invalid characters. Conditions can only use lower case characters and dashes.");
			}

			this._conditions[name] = valueFn;
		}
	}, {
		key: "has",
		value: function has(name) {
			return this._conditions.hasOwnProperty(name);
		}
	}, {
		key: "get",
		value: function get(name) {
			return this._conditions[name];
		}
	}, {
		key: "getNames",
		value: function getNames() {
			return Object.keys(this._conditions);
		}
	}]);

	return ConditionsRegistry;
}();

exports.default = ConditionsRegistry;

},{}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GuidesLayoutEngine = function () {
	function GuidesLayoutEngine() {
		_classCallCheck(this, GuidesLayoutEngine);

		this.guides = [];
		this.requiredHeight = 0;
		this.fullscreenLayout = {
			left: 0,
			top: 0,
			width: 0,
			height: 0
		};
	}

	_createClass(GuidesLayoutEngine, [{
		key: 'updateViewport',
		value: function updateViewport(viewport) {
			this.viewport = viewport;
			this.fullscreenLayout = {
				left: 0,
				top: 0,
				width: viewport.outerWidth,
				height: viewport.outerHeight
			};
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

		//E.g. calculate the scroll position when the element's anchor is at the anchor of the viewport.

	}, {
		key: 'calculateAnchorPosition',
		value: function calculateAnchorPosition(node, anchor, offset) {
			var layout = node.layout,
			    props = node.props;

			var position = void 0;
			var height = void 0;

			//TODO: for pin/parallax we basically need the reverse operation of transformTop()
			//Basically a function which, given a top position returns the scroll position when it is achieved.
			if (props.mode === 'follow') {
				position = layout.leaderTop;
				height = layout.leaderHeight;
			} else {
				position = layout.top;
				height = layout.height;
			}

			if (anchor === 'bottom') {
				position = position - this.viewport.height + height;
			} else if (anchor === 'center') {
				position = position - this.viewport.height / 2 + height / 2;
			}

			return position + offset;
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

					var _dependencies = _node.props.dependencies.nodes;

					//Check if any of the dependencies is still dirty.
					for (var j = 0; j < _dependencies.length; j++) {
						var otherNode = _dependencies[j];

						if (otherNode.layout.dirty) {
							skippedNode = true;

							//We encountered a dirty dependency, there is no need to find a second one.
							//Just continue with the outer loop.
							continue outer;
						}
					}

					this._doNodeLayout(_node, _dependencies);

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

		//Does not return anything, instead we pass it an object that it fills.
		//This minimizes the amount of garbage we create on the hot path, we reuse this object.
		//This also has the nice side effect that we can make optimization by comparing to the previous scroll data.

	}, {
		key: 'doScroll',
		value: function doScroll(layout, scrollPosition, scrollUpdate) {
			var verticalCenter = this.viewport.height / 2;
			var contentHeight = layout.height;
			var prevWrapperTop = scrollUpdate.wrapperTop;
			var prevInCenter = scrollUpdate.inCenter;
			var prevInViewport = scrollUpdate.inViewport;
			var prevInExtendedViewport = scrollUpdate.inExtendedViewport;

			if (layout.transformTopPosition) {
				scrollUpdate.contentTop = layout.transformTopPosition(scrollPosition);
			} else {
				scrollUpdate.contentTop = layout.top - scrollPosition;
			}

			if (layout.clipRect) {
				scrollUpdate.wrapperTop = layout.clipRect.top - scrollPosition;
				scrollUpdate.wrapperHeight = layout.clipRect.height;
			} else {
				scrollUpdate.wrapperTop = scrollUpdate.contentTop;
				scrollUpdate.wrapperHeight = contentHeight;
			}

			scrollUpdate.wrapperBottom = Math.round(scrollUpdate.wrapperTop + scrollUpdate.wrapperHeight);
			scrollUpdate.contentBottom = Math.round(scrollUpdate.contentTop + contentHeight);

			//We round this here and not earlier because other calculations,
			//like wrapper/contentBottom need to be as accurate as possible.
			scrollUpdate.wrapperTop = Math.round(scrollUpdate.wrapperTop);
			scrollUpdate.contentTop = Math.round(scrollUpdate.contentTop);

			scrollUpdate.contentTopOffset = scrollUpdate.contentTop - scrollUpdate.wrapperTop;

			//Does the center of the viewport intersect with the element?
			scrollUpdate.inCenter = scrollUpdate.wrapperTop < verticalCenter && scrollUpdate.wrapperBottom > verticalCenter;

			//The extended viewport has three times the height of the normal viewport (+1 at the top and bottom).
			//It's used for lazy loading etc. before something enters the viewport.
			scrollUpdate.inExtendedViewport = scrollUpdate.wrapperTop < 2 * this.viewport.height && scrollUpdate.wrapperBottom > -this.viewport.height;

			//Optimization: there's no need to translate the item beyond the viewport.
			//"Park" it exactly at the edge.
			//This makes the difference between touching ~5 (visible) and ~100s (all) DOM items.
			//But we also return the absolute top position before parking it.

			scrollUpdate.absoluteWrapperTop = scrollUpdate.wrapperTop;
			scrollUpdate.absoluteContentTop = scrollUpdate.contentTop;

			//Top of the element below the viewport?
			if (scrollUpdate.wrapperTop >= this.viewport.height) {
				scrollUpdate.wrapperTop = this.viewport.height;
				scrollUpdate.contentTop = scrollUpdate.wrapperTop + scrollUpdate.contentTopOffset;
				scrollUpdate.inViewport = false;
			} else if (scrollUpdate.wrapperBottom <= 0) {
				//Bottom of the element above the viewport?
				scrollUpdate.wrapperTop = -Math.round(scrollUpdate.wrapperHeight);
				scrollUpdate.contentTop = scrollUpdate.wrapperTop + scrollUpdate.contentTopOffset;
				scrollUpdate.inViewport = false;
			} else {
				scrollUpdate.inViewport = true;
			}

			scrollUpdate.wrapperTopChanged = scrollUpdate.wrapperTop !== prevWrapperTop;
			scrollUpdate.inCenterChanged = scrollUpdate.inCenter !== prevInCenter;
			scrollUpdate.inViewportChanged = scrollUpdate.inViewport !== prevInViewport;
			scrollUpdate.inExtendedViewportChanged = scrollUpdate.inExtendedViewport !== prevInExtendedViewport;
		}

		//This will attach the layout info directly to each dom node. No need for a lookup map.

	}, {
		key: '_doNodeLayout',
		value: function _doNodeLayout(node, dependencies) {
			var layout = node.layout,
			    props = node.props,
			    intrinsicHeight = node.intrinsicHeight;

			var layoutMode = props.mode;

			layout.spacingTop = this.lengthToPixel(props.spacing.top);
			layout.spacingBottom = this.lengthToPixel(props.spacing.bottom);

			if (layoutMode === 'follow') {
				//A follower can have one or more leaders.
				//Here we normalize it to always have two, the top and bottom most.
				//These are the only two that are relevant for the follower.
				var topDependency = dependencies[0];
				var bottomDependency = topDependency;

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

				layout.leaderTop = topDependency.layout.top;
				layout.leaderHeight = bottomDependency.layout.bottom - topDependency.layout.top;
			}

			//
			//left
			//

			if (props.guides.left === 'viewport') {
				layout.left = 0;
			} else {
				//TODO: sort the guides. E.g. it shouldn't matter if you're using "left right" or "right left"
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
				layout.height = intrinsicHeight;
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
   	let progressAnchors = this.calculateProgressAnchors(item, layout, dependencies);
   		layout
   		.set('progressScrollStart', progressAnchors.progressScrollStart)
   		.set('progressScrollDuration', progressAnchors.progressScrollDuration);
   		layout.set('calculateScrollProgress', this.createFollowerScrollProgressCalculator(layout));
   	*7
   }
   	/*
   if (layoutMode === 'follow') {
   	layout.set('transformTopPosition', this.createFollowerTopPositionTransformer(item, layout, dependencies));
   		let progressAnchors = this.calculateProgressAnchors(item, layout, dependencies);
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
					layout.clipRect = {
						top: 0,
						bottom: 0,
						height: 0
					};
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
					default:
						throw new Error('Unknown pinAnchor "' + props.pinAnchor + '".');
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

				var _position = this.lengthToPixel(rawGuide.position, pixelWidth);

				//The position can be negative, which simply means it is rtl (similar to how a negative slice() index works).
				if (_position >= 0) {
					guide.position = contentMargin + _position;
				} else {
					guide.position = contentMargin + pixelWidth + _position;
				}

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

	return GuidesLayoutEngine;
}();

exports.default = GuidesLayoutEngine;

},{}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PAUSE_DELAY = 300; //ms
var MAX_HISTORY_LENGTH = 30;
var MAX_HISTORY_AGE = 300; //ms

var ScrollState = function () {
	function ScrollState(onScroll, onPause) {
		_classCallCheck(this, ScrollState);

		this.onScroll = onScroll;
		this.onPause = onPause;

		this.position = 0;
		this.maxPosition = 0;
		this.velocity = 0;
		this.progress = 0;
		this.direction = 'down';
		this.history = [];
	}

	_createClass(ScrollState, [{
		key: 'tick',
		value: function tick(now, newPosition) {
			var direction = void 0;

			//We keep track of the position and time for calculating an accurate velocity in later frames.
			this.history.push(this.position, now);

			//Keep the history short, but don't splice() at every frame (only when it's twice as large as the max).
			//TODO: a ring buffer would make this much nicer. But meh.
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

				if (this._pauseTimer) {
					clearTimeout(this._pauseTimer);
					delete this._pauseTimer;
				}

				this.onScroll();
			} else {
				if (!this._pauseTimer) {
					this._pauseTimer = setTimeout(this.onPause, PAUSE_DELAY);
				}
			}
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			clearTimeout(this._pauseTimer);
		}
	}, {
		key: '_calculateScrollVelocity',
		value: function _calculateScrollVelocity(now) {
			//Figure out what the scroll position was about MAX_HISTORY_AGE ago.
			//We do this because using just the past two frames for calculating the veloctiy
			//gives very jumpy results.
			var positions = this.history;
			var positionsIndexEnd = positions.length - 1;
			var positionsIndexStart = positionsIndexEnd;
			var positionsIndex = positionsIndexEnd;
			var timeOffset = void 0;
			var movedOffset = void 0;

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
		}
	}]);

	return ScrollState;
}();

exports.default = ScrollState;

},{}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (input) {
	return input.replace(/-([a-z])/g, function (match) {
		return match[1].toUpperCase();
	});
};

},{}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	linear: function linear(p) {
		return p;
	},
	quad: function quad(p) {
		return p * p;
	},
	cubic: function cubic(p) {
		return p * p * p;
	},
	swing: function swing(p) {
		return -Math.cos(p * Math.PI) / 2 + 0.5;
	},
	sqrt: function sqrt(p) {
		return Math.sqrt(p);
	},
	outCubic: function outCubic(p) {
		return Math.pow(p - 1, 3) + 1;
	},
	natural: function natural(p) {
		if (p === 0) {
			return 0;
		}

		return Math.exp(4 * (p - 1));
	},
	//see https://www.desmos.com/calculator/tbr20s8vd2 for how I did this
	bounce: function bounce(p) {
		var a;

		if (p <= 0.5083) {
			a = 3;
		} else if (p <= 0.8489) {
			a = 9;
		} else if (p <= 0.96208) {
			a = 27;
		} else if (p <= 0.99981) {
			a = 91;
		} else {
			return 1;
		}

		return 1 - Math.abs(3 * Math.cos(p * a * 1.028) / a);
	}
};

},{}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _types = require('types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//property:value; pairs (separated by colons) separated by semicolons.
var propertiesAndValuesRegex = /([^:;]+):([^;]+)/g;
var whiteSpaceRegex = /\s+/;

exports.default = {
	parseProperties: function parseProperties(element, schema, rawProperties, props) {
		var rawPropertiesMap = {};
		var match = void 0;

		propertiesAndValuesRegex.lastIndex = 0;

		//Collect all "key:value;" pairs.
		while ((match = propertiesAndValuesRegex.exec(rawProperties)) !== null) {
			var property = match[1].trim();
			var rawValue = match[2];

			if (!schema.hasOwnProperty(property)) {
				throw new Error('You have defined a property "' + property + '" in your attribute that is not expected. The value was "' + rawValue + '".');
			}

			rawPropertiesMap[property] = rawValue;
		}

		for (var key in schema) {
			if (!schema.hasOwnProperty(key)) {
				continue;
			}

			var _rawValue = void 0;

			if (rawPropertiesMap.hasOwnProperty(key)) {
				_rawValue = rawPropertiesMap[key];
			} else {
				//The schema specifies a property that is currently not defined and no default was specified.
				//That implies that all properties are required. Keywords like "none" or "0" work well as defaults.
				if (!schema[key].hasOwnProperty('default')) {
					//TODO: this error message does not help people who only write HTML and don't even know what the class is.
					//It should simply be something like "The layout attribute misses the required guides property"
					//Don't get too technical.
					throw new Error('You are missing the "' + key + '" property, which has no default value.');
				} else {
					//There is a default specified, use it.
					_rawValue = schema[key].default;
				}
			}

			var value = this.parseProperty(element, key, _rawValue, schema[key].type, schema[key].expand);
			var enumValues = schema[key].enum;

			if (enumValues instanceof Array && enumValues.indexOf(value) === -1) {
				throw new Error('Got "' + value + '" as value for property "' + key + '". Expected one of "' + enumValues.join('", "') + '".');
			}

			props[key] = value;
		}
	},

	parseProperty: function parseProperty(element, property, rawValue, propertyType, valueExpander) {
		var _this = this;

		rawValue = rawValue.trim();

		if (propertyType instanceof Array) {
			//thing: keyword, anotherone, and, more
			//a.thing = ['keyword', 'anotherone', 'and', 'more']
			//or
			//thing: keyword 30px 30px, anotherone 100px 8px
			//a.thing = [['keyword', {length: 30, unit: 'px'}, {length: 30, unit: 'px'}], [...]];
			if (propertyType.length === 1) {
				propertyType = propertyType[0];

				if (propertyType instanceof Array) {
					if (rawValue === '') {
						return [];
					}

					//thing: keyword 30px 30px, anotherone 100px 8px
					//a.thing = [['keyword', {length: 30, unit: 'px'}, {length: 30, unit: 'px'}], [...]];
					var rawValuesList = rawValue.split(',');

					return rawValuesList.map(function (rawValue) {
						return _this.parseProperty(element, property, rawValue, propertyType, valueExpander);
					});
				} else {
					if (rawValue === '') {
						return [];
					}

					//thing: keyword, anotherone, and, more
					//a.thing = ['keyword', 'anotherone', 'and', 'more']
					var _rawValuesList = rawValue.split(',');

					return _rawValuesList.map(function (rawValue) {
						return _types2.default[propertyType].parse(rawValue, element);
					});
				}
			} else if (propertyType.length > 1) {
				//thing: keyword 100px
				//a.thing = ['keyword', {length: 100, unit: 'px'}]

				if (rawValue === '') {
					return [];
				}

				var _rawValuesList2 = rawValue.split(whiteSpaceRegex);

				if (_rawValuesList2.length !== propertyType.length) {
					if (!valueExpander || !valueExpander(_rawValuesList2)) {
						throw new Error('The schema for the "' + property + '" property expects ' + propertyType.length + ' values. Got ' + _rawValuesList2.length + ', namely "' + _rawValuesList2.join(' ') + '".');
					}
				}

				var map = {};

				for (var rawValueIndex = 0; rawValueIndex < _rawValuesList2.length; rawValueIndex++) {
					var namedPropertyType = propertyType[rawValueIndex];
					var keys = Object.keys(namedPropertyType);

					if (keys.length !== 1) {
						throw new Error('A nested schema should have exactly one key (the name) which maps to the type.');
					}

					var name = keys[0];
					var _rawValue2 = _rawValuesList2[rawValueIndex];

					map[name] = _types2.default[namedPropertyType[name]].parse(_rawValue2, element);
				}

				return map;
			} else {
				//TODO: add a validateSchema method and remove the mix of validation and parsing all over this place.
				throw new Error('You have defined an empty array as schema type for the "' + property + '" property.');
			}
		} else {
			//thing: keyword
			//a.thing = 'keyword'
			return _types2.default[propertyType].parse(rawValue, element);
		}
	},

	stringifyProperties: function stringifyProperties(element, schema, properties) {
		var stringifiedProps = [];

		for (var property in properties) {
			var value = properties[property];
			var propertyType = schema[property].type;
			var stringValue = this.stringifyProperty(element, value, propertyType);

			stringifiedProps.push(property + ': ' + stringValue);
		}

		return stringifiedProps.join('; ') + ';';
	},
	stringifyProperty: function stringifyProperty(element, value, propertyType) {
		var _this2 = this;

		if (propertyType instanceof Array) {
			if (propertyType.length === 1) {
				var nestedPropertyType = propertyType[0];

				if (nestedPropertyType instanceof Array) {
					return value.map(function (value) {
						return _this2.stringifyProperty(element, value, nestedPropertyType);
					}).join(', ');
				} else {
					return value.map(function (value) {
						return _types2.default[nestedPropertyType].stringify(value, element);
					}).join(', ');
				}
			} else if (propertyType.length > 1) {
				return propertyType.map(function (type) {
					var key = Object.keys(type)[0];
					var typeName = type[key];
					return _types2.default[typeName].stringify(value[key]);
				}).join(' ');
			}
		} else {
			return _types2.default[propertyType].stringify(value, element);
		}
	}
};

},{"types":45}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _CustomEvent = require('ponies/CustomEvent.js');

var _CustomEvent2 = _interopRequireDefault(_CustomEvent);

var _camelCase = require('lib/camelCase.js');

var _camelCase2 = _interopRequireDefault(_camelCase);

var _BehaviorsRegistry = require('lib/BehaviorsRegistry.js');

var _BehaviorsRegistry2 = _interopRequireDefault(_BehaviorsRegistry);

var _ConditionsRegistry = require('lib/ConditionsRegistry.js');

var _ConditionsRegistry2 = _interopRequireDefault(_ConditionsRegistry);

var _Behavior2 = require('behaviors/Behavior.js');

var _Behavior3 = _interopRequireDefault(_Behavior2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Scrollmeister = {
	Behavior: _Behavior3.default,

	behaviorsRegistry: new _BehaviorsRegistry2.default(),
	conditionsRegistry: new _ConditionsRegistry2.default(),

	version: "0.0.1",

	getDefinedBehaviorNames: function getDefinedBehaviorNames() {
		return this.behaviorsRegistry.getNames();
	},

	getBehaviorOrder: function getBehaviorOrder() {
		return this.behaviorsRegistry.getOrder();
	},

	defineBehavior: function defineBehavior(classDefinition) {
		this.behaviorsRegistry.add(classDefinition);
	},

	attachBehaviors: function attachBehaviors(element, behaviorPropertiesMap) {
		var behaviorOrder = this.getBehaviorOrder();

		for (var i = 0; i < behaviorOrder.length; i++) {
			var behaviorName = behaviorOrder[i];

			if (!behaviorPropertiesMap.hasOwnProperty(behaviorName)) {
				continue;
			}

			var missingDependencies = this._checkBehaviorDependencies(element, behaviorName);

			if (missingDependencies.length > 0) {
				throw new Error(
				//TODO: render this error inline as well (behaviors have this.error, maybe MeisterComponent.error() method?)
				'The "' + behaviorName + '" behavior requires the "' + missingDependencies.join('", "') + '" behavior(s) for. Make sure you add the attribute to the element.');
			}

			this.attachBehavior(element, behaviorName, behaviorPropertiesMap[behaviorName]);
		}
	},

	attachBehavior: function attachBehavior(element, name, rawProperties) {
		if (!this.behaviorsRegistry.has(name)) {
			throw new Error('Tried to attach an unknown behavior "' + name + '". This should never happen since we only track attributes that correspond to defined behaviors.');
		}

		//The behavior is already attached, update it.
		if (element.hasOwnProperty(name)) {
			element[name].updateProperties(rawProperties);
		} else {
			//Make the behavior available as a property on the DOM node.
			var _Behavior = this.behaviorsRegistry.get(name);
			element[name] = new _Behavior(element, rawProperties);
			element[(0, _camelCase2.default)(name)] = element[name];
			element.behaviors[name] = element[name];
		}
	},

	detachBehaviors: function detachBehaviors(element, behaviorPropertiesMap) {
		var skipDependencies = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

		//Remove the behaviors in reverse order to make sure their dependencies still exist for cleanup.
		var reverseBehaviorOrder = this.getBehaviorOrder().slice().reverse();

		for (var i = 0; i < reverseBehaviorOrder.length; i++) {
			var behaviorName = reverseBehaviorOrder[i];

			if (behaviorPropertiesMap.hasOwnProperty(behaviorName)) {
				this.detachBehavior(element, behaviorName, skipDependencies);
			}
		}
	},

	detachBehavior: function detachBehavior(element, name) {
		var skipDependencies = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

		if (element.hasOwnProperty(name)) {
			element[name].destructor();
			delete element[name];
			delete element[(0, _camelCase2.default)(name)];
			delete element.behaviors[name];
		}

		if (skipDependencies) {
			return;
		}

		//Check if all dependencies are still resolved.
		//TODO: this check missed dependencies of children.
		//E.g. removing "guides-layout" when there are children with "layout".
		for (var otherName in element.behaviors) {
			if (!element.behaviors.hasOwnProperty(otherName)) {
				continue;
			}

			if (this._checkBehaviorDependencies(element, otherName).length > 0) {
				throw new Error('You just removed the "' + name + '" behavior, which "' + otherName + '" requires.');
			}
		}
	},

	_checkBehaviorDependencies: function _checkBehaviorDependencies(element, name) {
		var Behavior = this.behaviorsRegistry.get(name);
		var missingDependencies = [];

		for (var dependencyIndex = 0; dependencyIndex < Behavior.behaviorDependencies.length; dependencyIndex++) {
			var dependency = Behavior.behaviorDependencies[dependencyIndex];

			if (dependency.charAt(0) === '^') {
				var parentDependency = dependency.slice(1);

				if (!element.parentElement.hasOwnProperty(parentDependency)) {
					missingDependencies.push(dependency);
				}
			} else {
				if (!element.hasOwnProperty(dependency)) {
					missingDependencies.push(dependency);
				}
			}
		}

		return missingDependencies;
	},

	defineCondition: function defineCondition(name, valueFn) {
		this.conditionsRegistry.add(name, valueFn);
	},

	getDefinedConditionNames: function getDefinedConditionNames() {
		return this.conditionsRegistry.getNames();
	},

	componentConnected: function componentConnected(element) {
		var event = new _CustomEvent2.default('scrollmeister:connected', {
			bubbles: false,
			cancelable: false,
			detail: element
		});

		document.dispatchEvent(event);
	},

	componentDisconnected: function componentDisconnected(element) {
		var event = new _CustomEvent2.default('scrollmeister:disconnected', {
			bubbles: false,
			cancelable: false,
			detail: element
		});

		document.dispatchEvent(event);
	}
};

exports.default = Scrollmeister;

},{"behaviors/Behavior.js":9,"lib/BehaviorsRegistry.js":24,"lib/ConditionsRegistry.js":26,"lib/camelCase.js":29,"ponies/CustomEvent.js":34}],36:[function(require,module,exports){
var css = "html{overflow-x:hidden;overflow-y:scroll}body{margin:0}scroll-meister{display:block;position:static;width:100%;overflow:hidden}element-meister{display:block;position:fixed;left:0;top:0;opacity:1;-webkit-backface-visibility:hidden;backface-visibility:hidden}shadow-meister{position:static !important;display:block;display:contents}\n\n/*# sourceMappingURL=scrollmeister.sass.map */"
module.exports = require('scssify').createStyle(css, {})
},{"scssify":8}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	parse: function parse(value) {
		value = value.trim();

		return value === 'true' || value === 'on' || value === 'yes' || value === '1';
	},
	stringify: function stringify(value) {
		return String(value);
	}
};

},{}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
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

},{"types/CSSLengthType.js":38}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
function isFlowElement(element) {
	return element.hasAttribute('layout') && element.layout.props.mode === 'flow';
}

function findPreviousFlowElement(context) {
	var element = context;

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

function findDependencies(value, context) {
	if (value === 'none') {
		return [];
	}

	//"inherit" mimics a regular document flow by rendering the element behind the previous one.
	if (value === 'inherit') {
		var element = findPreviousFlowElement(context);

		if (element) {
			return [element.layout];
		} else {
			return [];
		}
	}

	if (value.indexOf('skip') === 0) {
		var numberOfSkips = parseInt(value.slice('skip'.length).trim(), 10);

		if (numberOfSkips < 0) {
			throw new Error('You\'ve specified a negative number of skips (' + numberOfSkips + ') for the layout dependencies.');
		}

		var _element = void 0;

		do {
			_element = findPreviousFlowElement(context);
		} while (_element && numberOfSkips--);

		if (_element) {
			return [_element.layout];
		} else {
			return [];
		}
	}

	//TODO: nope, this should do sth. like "prevSiblings()"
	//Double nope: we can get into circular-dependencies here (which the layout engine would catch though)
	//Maybe allow negative skips to reverse the order like flexbox?
	//I need to put some thought into this. KISS.
	var dependencies = Array.prototype.slice.call(document.querySelectorAll(value)).filter(isFlowElement);

	if (dependencies.length === 0) {
		throw new Error('Couldn\'t resolve the layout dependency "' + value + '". No flow elements found matching this selector.');
	}

	return dependencies.map(function (el) {
		return el.layout;
	});
}

//TODO: I believe SelectorType needs to be reavaluated (live) all the time!
//https://stackoverflow.com/questions/30578673/is-it-possible-to-make-queryselectorall-live-like-getelementsbytagname
//We could return an array from here which we manipulate transparently. However, we need to know when it is not needed aylonger
exports.default = {
	parse: function parse(value, context) {
		value = value.trim();

		var dependencies = findDependencies(value, context);

		return {
			nodes: dependencies,
			value: value
		};
	},
	stringify: function stringify(value) {
		return value.value;
	}
};

},{}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var ratioRegex = /^(\d+)\s*\/\s*(\d+)$/;

exports.default = {
	parse: function parse(value) {
		value = value.trim();

		var match = value.match(ratioRegex);

		if (!match) {
			throw new Error("The value \"" + value + " does not look like a ratio. The syntax is \"width / height\", e.g. \"1920 / 1080\".");
		}

		return {
			num: parseInt(match[1], 10) / parseInt(match[2], 10),
			value: value
		};
	},
	stringify: function stringify(value) {
		return value.value;
	}
};

},{}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	parse: function parse(value, context) {
		value = value.trim();

		var script = void 0;

		if (value === 'auto') {
			script = context.getElementsByTagName('script')[0];
		} else {
			var element = document.getElementById(value);

			if (element instanceof HTMLScriptElement) {
				script = element;
			} else {
				throw new Error('The shader "' + value + '" is not the ID of a <script> element.');
			}
		}

		if (!script) {
			throw new Error('Could not find shader "' + value + '".');
		}

		return {
			template: script.text,
			value: value
		};
	},
	stringify: function stringify(value) {
		return value.value;
	}
};

},{}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.domtypes = undefined;

var _BooleanType = require('types/BooleanType.js');

var _BooleanType2 = _interopRequireDefault(_BooleanType);

var _CSSLengthType = require('types/CSSLengthType.js');

var _CSSLengthType2 = _interopRequireDefault(_CSSLengthType);

var _RatioType = require('types/RatioType.js');

var _RatioType2 = _interopRequireDefault(_RatioType);

var _HeightType = require('types/HeightType.js');

var _HeightType2 = _interopRequireDefault(_HeightType);

var _LayoutDependencyType = require('types/LayoutDependencyType.js');

var _LayoutDependencyType2 = _interopRequireDefault(_LayoutDependencyType);

var _NumberType = require('types/NumberType.js');

var _NumberType2 = _interopRequireDefault(_NumberType);

var _StringType = require('types/StringType.js');

var _StringType2 = _interopRequireDefault(_StringType);

var _TemplateType = require('types/TemplateType.js');

var _TemplateType2 = _interopRequireDefault(_TemplateType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	boolean: _BooleanType2.default,
	csslength: _CSSLengthType2.default,
	height: _HeightType2.default,
	ratio: _RatioType2.default,
	layoutdependency: _LayoutDependencyType2.default,
	number: _NumberType2.default,
	string: _StringType2.default,
	template: _TemplateType2.default
};
var domtypes = exports.domtypes = ['layoutdependency'];

},{"types/BooleanType.js":37,"types/CSSLengthType.js":38,"types/HeightType.js":39,"types/LayoutDependencyType.js":40,"types/NumberType.js":41,"types/RatioType.js":42,"types/StringType.js":43,"types/TemplateType.js":44}]},{},[23])(23)
});