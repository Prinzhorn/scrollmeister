/*!
 * Scrollmeister v0.0.1 (June 22nd 2018)
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
// Linear partitioning implementation
// Partition seq into k buckets
// Explanation: http://www8.cs.umu.se/kurser/TDBAfl/VT06/algorithms/BOOK/BOOK2/NODE45.HTM

var partition = function(seq, k) {
  if(k === 0) return []
  if(k === 1) return [seq]
  if(k >= seq.length) {
    // return the lists of each single element in sequence, plus empty lists for any extra buckets.
    var repeated =  []
    for(var q = 0; q < k - seq.length; ++q) repeated.push([])
    return seq.map(function(x) {return [x]}).concat(repeated)
  }

  var sequence = seq.slice(0)
  var dividers = []
  var sums = prefixSums(sequence, k)
  var conds = boundaryConditions(sequence, k, sums)

  // evaluate main recurrence
  for(var i = 2; i <= sequence.length; ++i) {
    for(var j = 2; j <= k; ++j) {
      conds[i][j] = undefined
      for(var x = 1; x < i; ++x) {
        var s = Math.max(conds[x][j-1], sums[i] - sums[x])
        dividers[i] = dividers[i] || [] // Initialize a new row in the dividers matrix (unless it's already initialized).
        // Continue to find the cost of the largest range in the optimal partition.
        if(conds[i][j] === undefined || conds[i][j] > s) {
          conds[i][j] = s
          dividers[i][j] = x
        }
      }
    }
  }
  return(reconstructPartition(sequence, dividers, k))
}

// Work our way back up through the dividers, referencing each divider that we
// saved given a value for k and a length of seq, using each divider to make
// the partitions.
var reconstructPartition = function(seq, dividers, k) {
  var partitions = []
  while (k > 1) {
    if(dividers[seq.length]) { 
      var divider = dividers[seq.length][k]
      var part = seq.splice(divider)
      partitions.unshift(part)
    }
    k = k - 1
  }
  partitions.unshift(seq)
  return partitions
}

// Given a list of numbers of length n, loop through it with index 'i'
// Make each element the sum of all the numbers from 0...i
// For example, given [1,2,3,4,5]
// The prefix sums are [1,3,6,10,15]
var prefixSums = function(seq) {
  var sums = [0]
  for(var i = 1; i <= seq.length; ++i) {
    sums[i] = sums[i - 1] + seq[i - 1]
  }
  return sums
}

// This matrix holds the maximum sums over all the ranges given the length of
// seq and the number of buckets (k)
var boundaryConditions = function(seq, k, sums) {
  var conds = []
  for(var i = 1; i <= seq.length; ++i) {
    conds[i] = []
    conds[i][1] = sums[i]
  }
  for(var j = 1; j <= k; ++j) conds[1][j] = seq[0]
  return conds
}

module.exports = partition

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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
},{"_process":5}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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
},{"performance-now":4}],7:[function(require,module,exports){
(function(da,ea){"object"===typeof exports&&"undefined"!==typeof module?module.exports=ea():"function"===typeof define&&define.amd?define(ea):da.createREGL=ea()})(this,function(){function da(a,b){this.id=vb++;this.type=a;this.data=b}function ea(a){if(0===a.length)return[];var b=a.charAt(0),c=a.charAt(a.length-1);if(1<a.length&&b===c&&('"'===b||"'"===b))return['"'+a.substr(1,a.length-2).replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"'];if(b=/\[(false|true|null|\d+|'[^']*'|"[^"]*")\]/.exec(a))return ea(a.substr(0,
b.index)).concat(ea(b[1])).concat(ea(a.substr(b.index+b[0].length)));b=a.split(".");if(1===b.length)return['"'+a.replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"'];a=[];for(c=0;c<b.length;++c)a=a.concat(ea(b[c]));return a}function Wa(a){return"["+ea(a).join("][")+"]"}function wb(){var a={"":0},b=[""];return{id:function(c){var d=a[c];if(d)return d;d=a[c]=b.length;b.push(c);return d},str:function(a){return b[a]}}}function xb(a,b,c){function d(){var b=window.innerWidth,d=window.innerHeight;a!==document.body&&
(d=a.getBoundingClientRect(),b=d.right-d.left,d=d.bottom-d.top);f.width=c*b;f.height=c*d;A(f.style,{width:b+"px",height:d+"px"})}var f=document.createElement("canvas");A(f.style,{border:0,margin:0,padding:0,top:0,left:0});a.appendChild(f);a===document.body&&(f.style.position="absolute",A(a.style,{margin:0,padding:0}));window.addEventListener("resize",d,!1);d();return{canvas:f,onDestroy:function(){window.removeEventListener("resize",d);a.removeChild(f)}}}function yb(a,b){function c(c){try{return a.getContext(c,
b)}catch(f){return null}}return c("webgl")||c("experimental-webgl")||c("webgl-experimental")}function Xa(a){return"string"===typeof a?a.split():a}function Ya(a){return"string"===typeof a?document.querySelector(a):a}function zb(a){var b=a||{},c,d,f,k;a={};var p=[],h=[],g="undefined"===typeof window?1:window.devicePixelRatio,r=!1,v=function(a){},l=function(){};"string"===typeof b?c=document.querySelector(b):"object"===typeof b&&("string"===typeof b.nodeName&&"function"===typeof b.appendChild&&"function"===
typeof b.getBoundingClientRect?c=b:"function"===typeof b.drawArrays||"function"===typeof b.drawElements?(k=b,f=k.canvas):("gl"in b?k=b.gl:"canvas"in b?f=Ya(b.canvas):"container"in b&&(d=Ya(b.container)),"attributes"in b&&(a=b.attributes),"extensions"in b&&(p=Xa(b.extensions)),"optionalExtensions"in b&&(h=Xa(b.optionalExtensions)),"onDone"in b&&(v=b.onDone),"profile"in b&&(r=!!b.profile),"pixelRatio"in b&&(g=+b.pixelRatio)));c&&("canvas"===c.nodeName.toLowerCase()?f=c:d=c);if(!k){if(!f){c=xb(d||document.body,
v,g);if(!c)return null;f=c.canvas;l=c.onDestroy}k=yb(f,a)}return k?{gl:k,canvas:f,container:d,extensions:p,optionalExtensions:h,pixelRatio:g,profile:r,onDone:v,onDestroy:l}:(l(),v("webgl not supported, try upgrading your browser or graphics drivers http://get.webgl.org"),null)}function Ab(a,b){function c(b){b=b.toLowerCase();var c;try{c=d[b]=a.getExtension(b)}catch(g){}return!!c}for(var d={},f=0;f<b.extensions.length;++f){var k=b.extensions[f];if(!c(k))return b.onDestroy(),b.onDone('"'+k+'" extension is not supported by the current WebGL context, try upgrading your system or a different browser'),
null}b.optionalExtensions.forEach(c);return{extensions:d,restore:function(){Object.keys(d).forEach(function(a){if(!c(a))throw Error("(regl): error restoring extension "+a);})}}}function ja(a){return!!a&&"object"===typeof a&&Array.isArray(a.shape)&&Array.isArray(a.stride)&&"number"===typeof a.offset&&a.shape.length===a.stride.length&&(Array.isArray(a.data)||O(a.data))}function J(a,b){for(var c=Array(a),d=0;d<a;++d)c[d]=b(d);return c}function Za(a){var b,c;b=(65535<a)<<4;a>>>=b;c=(255<a)<<3;a>>>=c;
b|=c;c=(15<a)<<2;a>>>=c;b|=c;c=(3<a)<<1;return b|c|a>>>c>>1}function fa(a){a:{for(var b=16;268435456>=b;b*=16)if(a<=b){a=b;break a}a=0}b=$a[Za(a)>>2];return 0<b.length?b.pop():new ArrayBuffer(a)}function ab(a){$a[Za(a.byteLength)>>2].push(a)}function bb(a,b,c,d,f,k){for(var p=0;p<b;++p)for(var h=a[p],g=0;g<c;++g)for(var r=h[g],v=0;v<d;++v)f[k++]=r[v]}function cb(a,b,c,d,f){for(var k=1,p=c+1;p<b.length;++p)k*=b[p];var h=b[c];if(4===b.length-c){var g=b[c+1],r=b[c+2];b=b[c+3];for(p=0;p<h;++p)bb(a[p],
g,r,b,d,f),f+=k}else for(p=0;p<h;++p)cb(a[p],b,c+1,d,f),f+=k}function Ga(a){return Ha[Object.prototype.toString.call(a)]|0}function db(a,b){for(var c=0;c<b.length;++c)a[c]=b[c]}function eb(a,b,c,d,f,k,p){for(var h=0,g=0;g<c;++g)for(var r=0;r<d;++r)a[h++]=b[f*g+k*r+p]}function Bb(a,b,c){function d(b){this.id=h++;this.buffer=a.createBuffer();this.type=b;this.usage=35044;this.byteLength=0;this.dimension=1;this.dtype=5121;this.persistentData=null;c.profile&&(this.stats={size:0})}function f(b,c,d){b.byteLength=
c.byteLength;a.bufferData(b.type,c,d)}function k(a,b,c,d,e,n){a.usage=c;if(Array.isArray(b)){if(a.dtype=d||5126,0<b.length)if(Array.isArray(b[0])){e=fb(b);for(var D=d=1;D<e.length;++D)d*=e[D];a.dimension=d;b=Pa(b,e,a.dtype);f(a,b,c);n?a.persistentData=b:x.freeType(b)}else"number"===typeof b[0]?(a.dimension=e,e=x.allocType(a.dtype,b.length),db(e,b),f(a,e,c),n?a.persistentData=e:x.freeType(e)):O(b[0])&&(a.dimension=b[0].length,a.dtype=d||Ga(b[0])||5126,b=Pa(b,[b.length,b[0].length],a.dtype),f(a,b,c),
n?a.persistentData=b:x.freeType(b))}else if(O(b))a.dtype=d||Ga(b),a.dimension=e,f(a,b,c),n&&(a.persistentData=new Uint8Array(new Uint8Array(b.buffer)));else if(ja(b)){e=b.shape;var g=b.stride,D=b.offset,t=0,k=0,p=0,r=0;1===e.length?(t=e[0],k=1,p=g[0],r=0):2===e.length&&(t=e[0],k=e[1],p=g[0],r=g[1]);a.dtype=d||Ga(b.data)||5126;a.dimension=k;e=x.allocType(a.dtype,t*k);eb(e,b.data,t,k,p,r,D);f(a,e,c);n?a.persistentData=e:x.freeType(e)}}function p(c){b.bufferCount--;a.deleteBuffer(c.buffer);c.buffer=
null;delete g[c.id]}var h=0,g={};d.prototype.bind=function(){a.bindBuffer(this.type,this.buffer)};d.prototype.destroy=function(){p(this)};var r=[];c.profile&&(b.getTotalBufferSize=function(){var a=0;Object.keys(g).forEach(function(b){a+=g[b].stats.size});return a});return{create:function(f,l,u,m){function e(b){var d=35044,g=null,l=0,f=0,u=1;Array.isArray(b)||O(b)||ja(b)?g=b:"number"===typeof b?l=b|0:b&&("data"in b&&(g=b.data),"usage"in b&&(d=hb[b.usage]),"type"in b&&(f=Qa[b.type]),"dimension"in b&&
(u=b.dimension|0),"length"in b&&(l=b.length|0));n.bind();g?k(n,g,d,f,u,m):(a.bufferData(n.type,l,d),n.dtype=f||5121,n.usage=d,n.dimension=u,n.byteLength=l);c.profile&&(n.stats.size=n.byteLength*ga[n.dtype]);return e}b.bufferCount++;var n=new d(l);g[n.id]=n;u||e(f);e._reglType="buffer";e._buffer=n;e.subdata=function(b,c){var d=(c||0)|0,g;n.bind();if(O(b))a.bufferSubData(n.type,d,b);else if(Array.isArray(b)){if(0<b.length)if("number"===typeof b[0]){var l=x.allocType(n.dtype,b.length);db(l,b);a.bufferSubData(n.type,
d,l);x.freeType(l)}else if(Array.isArray(b[0])||O(b[0]))g=fb(b),l=Pa(b,g,n.dtype),a.bufferSubData(n.type,d,l),x.freeType(l)}else if(ja(b)){g=b.shape;var f=b.stride,m=l=0,u=0,k=0;1===g.length?(l=g[0],m=1,u=f[0],k=0):2===g.length&&(l=g[0],m=g[1],u=f[0],k=f[1]);g=Array.isArray(b.data)?n.dtype:Ga(b.data);g=x.allocType(g,l*m);eb(g,b.data,l,m,u,k,b.offset);a.bufferSubData(n.type,d,g);x.freeType(g)}return e};c.profile&&(e.stats=n.stats);e.destroy=function(){p(n)};return e},createStream:function(a,b){var c=
r.pop();c||(c=new d(a));c.bind();k(c,b,35040,0,1,!1);return c},destroyStream:function(a){r.push(a)},clear:function(){H(g).forEach(p);r.forEach(p)},getBuffer:function(a){return a&&a._buffer instanceof d?a._buffer:null},restore:function(){H(g).forEach(function(b){b.buffer=a.createBuffer();a.bindBuffer(b.type,b.buffer);a.bufferData(b.type,b.persistentData||b.byteLength,b.usage)})},_initBuffer:k}}function Cb(a,b,c,d){function f(a){this.id=g++;h[this.id]=this;this.buffer=a;this.primType=4;this.type=this.vertCount=
0}function k(d,g,f,e,n,k,w){d.buffer.bind();if(g){var t=w;w||O(g)&&(!ja(g)||O(g.data))||(t=b.oes_element_index_uint?5125:5123);c._initBuffer(d.buffer,g,f,t,3)}else a.bufferData(34963,k,f),d.buffer.dtype=t||5121,d.buffer.usage=f,d.buffer.dimension=3,d.buffer.byteLength=k;t=w;if(!w){switch(d.buffer.dtype){case 5121:case 5120:t=5121;break;case 5123:case 5122:t=5123;break;case 5125:case 5124:t=5125}d.buffer.dtype=t}d.type=t;g=n;0>g&&(g=d.buffer.byteLength,5123===t?g>>=1:5125===t&&(g>>=2));d.vertCount=
g;g=e;0>e&&(g=4,e=d.buffer.dimension,1===e&&(g=0),2===e&&(g=1),3===e&&(g=4));d.primType=g}function p(a){d.elementsCount--;delete h[a.id];a.buffer.destroy();a.buffer=null}var h={},g=0,r={uint8:5121,uint16:5123};b.oes_element_index_uint&&(r.uint32=5125);f.prototype.bind=function(){this.buffer.bind()};var v=[];return{create:function(a,b){function g(a){if(a)if("number"===typeof a)e(a),n.primType=4,n.vertCount=a|0,n.type=5121;else{var b=null,c=35044,d=-1,f=-1,l=0,p=0;if(Array.isArray(a)||O(a)||ja(a))b=
a;else if("data"in a&&(b=a.data),"usage"in a&&(c=hb[a.usage]),"primitive"in a&&(d=Ra[a.primitive]),"count"in a&&(f=a.count|0),"type"in a&&(p=r[a.type]),"length"in a)l=a.length|0;else if(l=f,5123===p||5122===p)l*=2;else if(5125===p||5124===p)l*=4;k(n,b,c,d,f,l,p)}else e(),n.primType=4,n.vertCount=0,n.type=5121;return g}var e=c.create(null,34963,!0),n=new f(e._buffer);d.elementsCount++;g(a);g._reglType="elements";g._elements=n;g.subdata=function(a,b){e.subdata(a,b);return g};g.destroy=function(){p(n)};
return g},createStream:function(a){var b=v.pop();b||(b=new f(c.create(null,34963,!0,!1)._buffer));k(b,a,35040,-1,-1,0,0);return b},destroyStream:function(a){v.push(a)},getElements:function(a){return"function"===typeof a&&a._elements instanceof f?a._elements:null},clear:function(){H(h).forEach(p)}}}function ib(a){for(var b=x.allocType(5123,a.length),c=0;c<a.length;++c)if(isNaN(a[c]))b[c]=65535;else if(Infinity===a[c])b[c]=31744;else if(-Infinity===a[c])b[c]=64512;else{jb[0]=a[c];var d=Db[0],f=d>>>
31<<15,k=(d<<1>>>24)-127,d=d>>13&1023;b[c]=-24>k?f:-14>k?f+(d+1024>>-14-k):15<k?f+31744:f+(k+15<<10)+d}return b}function na(a){return Array.isArray(a)||O(a)}function kb(a){return Array.isArray(a)&&(0===a.length||"number"===typeof a[0])}function lb(a){return Array.isArray(a)&&0!==a.length&&na(a[0])?!0:!1}function oa(a){return Object.prototype.toString.call(a)}function Sa(a){if(!a)return!1;var b=oa(a);return 0<=Eb.indexOf(b)?!0:kb(a)||lb(a)||ja(a)}function mb(a,b){36193===a.type?(a.data=ib(b),x.freeType(b)):
a.data=b}function Ia(a,b,c,d,f,k){a="undefined"!==typeof C[a]?C[a]:R[a]*za[b];k&&(a*=6);if(f){for(d=0;1<=c;)d+=a*c*c,c/=2;return d}return a*c*d}function Fb(a,b,c,d,f,k,p){function h(){this.format=this.internalformat=6408;this.type=5121;this.flipY=this.premultiplyAlpha=this.compressed=!1;this.unpackAlignment=1;this.colorSpace=37444;this.channels=this.height=this.width=0}function g(a,b){a.internalformat=b.internalformat;a.format=b.format;a.type=b.type;a.compressed=b.compressed;a.premultiplyAlpha=b.premultiplyAlpha;
a.flipY=b.flipY;a.unpackAlignment=b.unpackAlignment;a.colorSpace=b.colorSpace;a.width=b.width;a.height=b.height;a.channels=b.channels}function r(a,b){if("object"===typeof b&&b){"premultiplyAlpha"in b&&(a.premultiplyAlpha=b.premultiplyAlpha);"flipY"in b&&(a.flipY=b.flipY);"alignment"in b&&(a.unpackAlignment=b.alignment);"colorSpace"in b&&(a.colorSpace=ua[b.colorSpace]);"type"in b&&(a.type=E[b.type]);var c=a.width,g=a.height,e=a.channels,d=!1;"shape"in b?(c=b.shape[0],g=b.shape[1],3===b.shape.length&&
(e=b.shape[2],d=!0)):("radius"in b&&(c=g=b.radius),"width"in b&&(c=b.width),"height"in b&&(g=b.height),"channels"in b&&(e=b.channels,d=!0));a.width=c|0;a.height=g|0;a.channels=e|0;c=!1;"format"in b&&(c=b.format,g=a.internalformat=S[c],a.format=Gb[g],c in E&&!("type"in b)&&(a.type=E[c]),c in U&&(a.compressed=!0),c=!0);!d&&c?a.channels=R[a.format]:d&&!c&&a.channels!==Ka[a.format]&&(a.format=a.internalformat=Ka[a.channels])}}function v(b){a.pixelStorei(37440,b.flipY);a.pixelStorei(37441,b.premultiplyAlpha);
a.pixelStorei(37443,b.colorSpace);a.pixelStorei(3317,b.unpackAlignment)}function l(){h.call(this);this.yOffset=this.xOffset=0;this.data=null;this.needsFree=!1;this.element=null;this.needsCopy=!1}function u(a,b){var c=null;Sa(b)?c=b:b&&(r(a,b),"x"in b&&(a.xOffset=b.x|0),"y"in b&&(a.yOffset=b.y|0),Sa(b.data)&&(c=b.data));if(b.copy){var g=f.viewportWidth,e=f.viewportHeight;a.width=a.width||g-a.xOffset;a.height=a.height||e-a.yOffset;a.needsCopy=!0}else if(!c)a.width=a.width||1,a.height=a.height||1,a.channels=
a.channels||4;else if(O(c))a.channels=a.channels||4,a.data=c,"type"in b||5121!==a.type||(a.type=Ha[Object.prototype.toString.call(c)]|0);else if(kb(c)){a.channels=a.channels||4;g=c;e=g.length;switch(a.type){case 5121:case 5123:case 5125:case 5126:e=x.allocType(a.type,e);e.set(g);a.data=e;break;case 36193:a.data=ib(g)}a.alignment=1;a.needsFree=!0}else if(ja(c)){g=c.data;Array.isArray(g)||5121!==a.type||(a.type=Ha[Object.prototype.toString.call(g)]|0);var e=c.shape,d=c.stride,n,l,q,y;3===e.length?(q=
e[2],y=d[2]):y=q=1;n=e[0];l=e[1];e=d[0];d=d[1];a.alignment=1;a.width=n;a.height=l;a.channels=q;a.format=a.internalformat=Ka[q];a.needsFree=!0;n=y;c=c.offset;q=a.width;y=a.height;l=a.channels;for(var K=x.allocType(36193===a.type?5126:a.type,q*y*l),aa=0,va=0;va<y;++va)for(var wa=0;wa<q;++wa)for(var ca=0;ca<l;++ca)K[aa++]=g[e*wa+d*va+n*ca+c];mb(a,K)}else if("[object HTMLCanvasElement]"===oa(c)||"[object CanvasRenderingContext2D]"===oa(c))"[object HTMLCanvasElement]"===oa(c)?a.element=c:a.element=c.canvas,
a.width=a.element.width,a.height=a.element.height,a.channels=4;else if("[object HTMLImageElement]"===oa(c))a.element=c,a.width=c.naturalWidth,a.height=c.naturalHeight,a.channels=4;else if("[object HTMLVideoElement]"===oa(c))a.element=c,a.width=c.videoWidth,a.height=c.videoHeight,a.channels=4;else if(lb(c)){g=a.width||c[0].length;e=a.height||c.length;d=a.channels;d=na(c[0][0])?d||c[0][0].length:d||1;n=La.shape(c);q=1;for(y=0;y<n.length;++y)q*=n[y];q=x.allocType(36193===a.type?5126:a.type,q);La.flatten(c,
n,"",q);mb(a,q);a.alignment=1;a.width=g;a.height=e;a.channels=d;a.format=a.internalformat=Ka[d];a.needsFree=!0}}function m(b,c,g,e,f){var n=b.element,l=b.data,k=b.internalformat,q=b.format,y=b.type,K=b.width,aa=b.height;v(b);n?a.texSubImage2D(c,f,g,e,q,y,n):b.compressed?a.compressedTexSubImage2D(c,f,g,e,k,K,aa,l):b.needsCopy?(d(),a.copyTexSubImage2D(c,f,g,e,b.xOffset,b.yOffset,K,aa)):a.texSubImage2D(c,f,g,e,K,aa,q,y,l)}function e(){return N.pop()||new l}function n(a){a.needsFree&&x.freeType(a.data);
l.call(a);N.push(a)}function D(){h.call(this);this.genMipmaps=!1;this.mipmapHint=4352;this.mipmask=0;this.images=Array(16)}function w(a,b,c){var g=a.images[0]=e();a.mipmask=1;g.width=a.width=b;g.height=a.height=c;g.channels=a.channels=4}function t(a,b){var c=null;if(Sa(b))c=a.images[0]=e(),g(c,a),u(c,b),a.mipmask=1;else if(r(a,b),Array.isArray(b.mipmap))for(var d=b.mipmap,f=0;f<d.length;++f)c=a.images[f]=e(),g(c,a),c.width>>=f,c.height>>=f,u(c,d[f]),a.mipmask|=1<<f;else c=a.images[0]=e(),g(c,a),u(c,
b),a.mipmask=1;g(a,a.images[0])}function Z(b,c){for(var g=b.images,e=0;e<g.length&&g[e];++e){var f=g[e],n=c,l=e,k=f.element,q=f.data,y=f.internalformat,K=f.format,aa=f.type,va=f.width,wa=f.height;v(f);k?a.texImage2D(n,l,K,K,aa,k):f.compressed?a.compressedTexImage2D(n,l,y,va,wa,0,q):f.needsCopy?(d(),a.copyTexImage2D(n,l,K,f.xOffset,f.yOffset,va,wa,0)):a.texImage2D(n,l,K,va,wa,0,K,aa,q)}}function B(){var a=nb.pop()||new D;h.call(a);for(var b=a.mipmask=0;16>b;++b)a.images[b]=null;return a}function gb(a){for(var b=
a.images,c=0;c<b.length;++c)b[c]&&n(b[c]),b[c]=null;nb.push(a)}function C(){this.magFilter=this.minFilter=9728;this.wrapT=this.wrapS=33071;this.anisotropic=1;this.genMipmaps=!1;this.mipmapHint=4352}function M(a,b){"min"in b&&(a.minFilter=Ta[b.min],0<=Hb.indexOf(a.minFilter)&&(a.genMipmaps=!0));"mag"in b&&(a.magFilter=T[b.mag]);var c=a.wrapS,g=a.wrapT;if("wrap"in b){var e=b.wrap;"string"===typeof e?c=g=I[e]:Array.isArray(e)&&(c=I[e[0]],g=I[e[1]])}else"wrapS"in b&&(c=I[b.wrapS]),"wrapT"in b&&(g=I[b.wrapT]);
a.wrapS=c;a.wrapT=g;"anisotropic"in b&&(a.anisotropic=b.anisotropic);if("mipmap"in b){c=!1;switch(typeof b.mipmap){case "string":a.mipmapHint=sa[b.mipmap];c=a.genMipmaps=!0;break;case "boolean":c=a.genMipmaps=b.mipmap;break;case "object":a.genMipmaps=!1,c=!0}!c||"min"in b||(a.minFilter=9984)}}function P(c,g){a.texParameteri(g,10241,c.minFilter);a.texParameteri(g,10240,c.magFilter);a.texParameteri(g,10242,c.wrapS);a.texParameteri(g,10243,c.wrapT);b.ext_texture_filter_anisotropic&&a.texParameteri(g,
34046,c.anisotropic);c.genMipmaps&&(a.hint(33170,c.mipmapHint),a.generateMipmap(g))}function G(b){h.call(this);this.mipmask=0;this.internalformat=6408;this.id=xa++;this.refCount=1;this.target=b;this.texture=a.createTexture();this.unit=-1;this.bindCount=0;this.texInfo=new C;p.profile&&(this.stats={size:0})}function Q(b){a.activeTexture(33984);a.bindTexture(b.target,b.texture)}function Aa(){var b=ka[0];b?a.bindTexture(b.target,b.texture):a.bindTexture(3553,null)}function z(b){var c=b.texture,g=b.unit,
e=b.target;0<=g&&(a.activeTexture(33984+g),a.bindTexture(e,null),ka[g]=null);a.deleteTexture(c);b.texture=null;b.params=null;b.pixels=null;b.refCount=0;delete V[b.id];k.textureCount--}var sa={"don't care":4352,"dont care":4352,nice:4354,fast:4353},I={repeat:10497,clamp:33071,mirror:33648},T={nearest:9728,linear:9729},Ta=A({mipmap:9987,"nearest mipmap nearest":9984,"linear mipmap nearest":9985,"nearest mipmap linear":9986,"linear mipmap linear":9987},T),ua={none:0,browser:37444},E={uint8:5121,rgba4:32819,
rgb565:33635,"rgb5 a1":32820},S={alpha:6406,luminance:6409,"luminance alpha":6410,rgb:6407,rgba:6408,rgba4:32854,"rgb5 a1":32855,rgb565:36194},U={};b.ext_srgb&&(S.srgb=35904,S.srgba=35906);b.oes_texture_float&&(E.float32=E["float"]=5126);b.oes_texture_half_float&&(E.float16=E["half float"]=36193);b.webgl_depth_texture&&(A(S,{depth:6402,"depth stencil":34041}),A(E,{uint16:5123,uint32:5125,"depth stencil":34042}));b.webgl_compressed_texture_s3tc&&A(U,{"rgb s3tc dxt1":33776,"rgba s3tc dxt1":33777,"rgba s3tc dxt3":33778,
"rgba s3tc dxt5":33779});b.webgl_compressed_texture_atc&&A(U,{"rgb atc":35986,"rgba atc explicit alpha":35987,"rgba atc interpolated alpha":34798});b.webgl_compressed_texture_pvrtc&&A(U,{"rgb pvrtc 4bppv1":35840,"rgb pvrtc 2bppv1":35841,"rgba pvrtc 4bppv1":35842,"rgba pvrtc 2bppv1":35843});b.webgl_compressed_texture_etc1&&(U["rgb etc1"]=36196);var Ib=Array.prototype.slice.call(a.getParameter(34467));Object.keys(U).forEach(function(a){var b=U[a];0<=Ib.indexOf(b)&&(S[a]=b)});var ba=Object.keys(S);c.textureFormats=
ba;var J=[];Object.keys(S).forEach(function(a){J[S[a]]=a});var W=[];Object.keys(E).forEach(function(a){W[E[a]]=a});var la=[];Object.keys(T).forEach(function(a){la[T[a]]=a});var ya=[];Object.keys(Ta).forEach(function(a){ya[Ta[a]]=a});var ha=[];Object.keys(I).forEach(function(a){ha[I[a]]=a});var Gb=ba.reduce(function(a,b){var c=S[b];6409===c||6406===c||6409===c||6410===c||6402===c||34041===c?a[c]=c:32855===c||0<=b.indexOf("rgba")?a[c]=6408:a[c]=6407;return a},{}),N=[],nb=[],xa=0,V={},ma=c.maxTextureUnits,
ka=Array(ma).map(function(){return null});A(G.prototype,{bind:function(){this.bindCount+=1;var b=this.unit;if(0>b){for(var c=0;c<ma;++c){var g=ka[c];if(g){if(0<g.bindCount)continue;g.unit=-1}ka[c]=this;b=c;break}p.profile&&k.maxTextureUnits<b+1&&(k.maxTextureUnits=b+1);this.unit=b;a.activeTexture(33984+b);a.bindTexture(this.target,this.texture)}return b},unbind:function(){--this.bindCount},decRef:function(){0>=--this.refCount&&z(this)}});p.profile&&(k.getTotalTextureSize=function(){var a=0;Object.keys(V).forEach(function(b){a+=
V[b].stats.size});return a});return{create2D:function(b,c){function d(a,b){var c=f.texInfo;C.call(c);var e=B();"number"===typeof a?"number"===typeof b?w(e,a|0,b|0):w(e,a|0,a|0):a?(M(c,a),t(e,a)):w(e,1,1);c.genMipmaps&&(e.mipmask=(e.width<<1)-1);f.mipmask=e.mipmask;g(f,e);f.internalformat=e.internalformat;d.width=e.width;d.height=e.height;Q(f);Z(e,3553);P(c,3553);Aa();gb(e);p.profile&&(f.stats.size=Ia(f.internalformat,f.type,e.width,e.height,c.genMipmaps,!1));d.format=J[f.internalformat];d.type=W[f.type];
d.mag=la[c.magFilter];d.min=ya[c.minFilter];d.wrapS=ha[c.wrapS];d.wrapT=ha[c.wrapT];return d}var f=new G(3553);V[f.id]=f;k.textureCount++;d(b,c);d.subimage=function(a,b,c,l){b|=0;c|=0;l|=0;var q=e();g(q,f);q.width=0;q.height=0;u(q,a);q.width=q.width||(f.width>>l)-b;q.height=q.height||(f.height>>l)-c;Q(f);m(q,3553,b,c,l);Aa();n(q);return d};d.resize=function(b,c){var e=b|0,g=c|0||e;if(e===f.width&&g===f.height)return d;d.width=f.width=e;d.height=f.height=g;Q(f);for(var q=0;f.mipmask>>q;++q)a.texImage2D(3553,
q,f.format,e>>q,g>>q,0,f.format,f.type,null);Aa();p.profile&&(f.stats.size=Ia(f.internalformat,f.type,e,g,!1,!1));return d};d._reglType="texture2d";d._texture=f;p.profile&&(d.stats=f.stats);d.destroy=function(){f.decRef()};return d},createCube:function(b,c,d,f,l,sa){function z(a,b,c,e,d,f){var F,X=h.texInfo;C.call(X);for(F=0;6>F;++F)q[F]=B();if("number"===typeof a||!a)for(a=a|0||1,F=0;6>F;++F)w(q[F],a,a);else if("object"===typeof a)if(b)t(q[0],a),t(q[1],b),t(q[2],c),t(q[3],e),t(q[4],d),t(q[5],f);
else if(M(X,a),r(h,a),"faces"in a)for(a=a.faces,F=0;6>F;++F)g(q[F],h),t(q[F],a[F]);else for(F=0;6>F;++F)t(q[F],a);g(h,q[0]);h.mipmask=X.genMipmaps?(q[0].width<<1)-1:q[0].mipmask;h.internalformat=q[0].internalformat;z.width=q[0].width;z.height=q[0].height;Q(h);for(F=0;6>F;++F)Z(q[F],34069+F);P(X,34067);Aa();p.profile&&(h.stats.size=Ia(h.internalformat,h.type,z.width,z.height,X.genMipmaps,!0));z.format=J[h.internalformat];z.type=W[h.type];z.mag=la[X.magFilter];z.min=ya[X.minFilter];z.wrapS=ha[X.wrapS];
z.wrapT=ha[X.wrapT];for(F=0;6>F;++F)gb(q[F]);return z}var h=new G(34067);V[h.id]=h;k.cubeCount++;var q=Array(6);z(b,c,d,f,l,sa);z.subimage=function(a,b,c,q,d){c|=0;q|=0;d|=0;var f=e();g(f,h);f.width=0;f.height=0;u(f,b);f.width=f.width||(h.width>>d)-c;f.height=f.height||(h.height>>d)-q;Q(h);m(f,34069+a,c,q,d);Aa();n(f);return z};z.resize=function(b){b|=0;if(b!==h.width){z.width=h.width=b;z.height=h.height=b;Q(h);for(var c=0;6>c;++c)for(var q=0;h.mipmask>>q;++q)a.texImage2D(34069+c,q,h.format,b>>q,
b>>q,0,h.format,h.type,null);Aa();p.profile&&(h.stats.size=Ia(h.internalformat,h.type,z.width,z.height,!1,!0));return z}};z._reglType="textureCube";z._texture=h;p.profile&&(z.stats=h.stats);z.destroy=function(){h.decRef()};return z},clear:function(){for(var b=0;b<ma;++b)a.activeTexture(33984+b),a.bindTexture(3553,null),ka[b]=null;H(V).forEach(z);k.cubeCount=0;k.textureCount=0},getTexture:function(a){return null},restore:function(){H(V).forEach(function(b){b.texture=a.createTexture();a.bindTexture(b.target,
b.texture);for(var c=0;32>c;++c)if(0!==(b.mipmask&1<<c))if(3553===b.target)a.texImage2D(3553,c,b.internalformat,b.width>>c,b.height>>c,0,b.internalformat,b.type,null);else for(var e=0;6>e;++e)a.texImage2D(34069+e,c,b.internalformat,b.width>>c,b.height>>c,0,b.internalformat,b.type,null);P(b.texInfo,b.target)})}}}function Jb(a,b,c,d,f,k){function p(a,b,c){this.target=a;this.texture=b;this.renderbuffer=c;var e=a=0;b?(a=b.width,e=b.height):c&&(a=c.width,e=c.height);this.width=a;this.height=e}function h(a){a&&
(a.texture&&a.texture._texture.decRef(),a.renderbuffer&&a.renderbuffer._renderbuffer.decRef())}function g(a,b,c){a&&(a.texture?a.texture._texture.refCount+=1:a.renderbuffer._renderbuffer.refCount+=1)}function r(b,c){c&&(c.texture?a.framebufferTexture2D(36160,b,c.target,c.texture._texture.texture,0):a.framebufferRenderbuffer(36160,b,36161,c.renderbuffer._renderbuffer.renderbuffer))}function v(a){var b=3553,c=null,e=null,g=a;"object"===typeof a&&(g=a.data,"target"in a&&(b=a.target|0));a=g._reglType;
"texture2d"===a?c=g:"textureCube"===a?c=g:"renderbuffer"===a&&(e=g,b=36161);return new p(b,c,e)}function l(a,b,c,e,g){if(c)return a=d.create2D({width:a,height:b,format:e,type:g}),a._texture.refCount=0,new p(3553,a,null);a=f.create({width:a,height:b,format:e});a._renderbuffer.refCount=0;return new p(36161,null,a)}function u(a){return a&&(a.texture||a.renderbuffer)}function m(a,b,c){a&&(a.texture?a.texture.resize(b,c):a.renderbuffer&&a.renderbuffer.resize(b,c))}function e(){this.id=M++;P[this.id]=this;
this.framebuffer=a.createFramebuffer();this.height=this.width=0;this.colorAttachments=[];this.depthStencilAttachment=this.stencilAttachment=this.depthAttachment=null}function n(a){a.colorAttachments.forEach(h);h(a.depthAttachment);h(a.stencilAttachment);h(a.depthStencilAttachment)}function D(b){a.deleteFramebuffer(b.framebuffer);b.framebuffer=null;k.framebufferCount--;delete P[b.id]}function w(b){var e;a.bindFramebuffer(36160,b.framebuffer);var g=b.colorAttachments;for(e=0;e<g.length;++e)r(36064+
e,g[e]);for(e=g.length;e<c.maxColorAttachments;++e)a.framebufferTexture2D(36160,36064+e,3553,null,0);a.framebufferTexture2D(36160,33306,3553,null,0);a.framebufferTexture2D(36160,36096,3553,null,0);a.framebufferTexture2D(36160,36128,3553,null,0);r(36096,b.depthAttachment);r(36128,b.stencilAttachment);r(33306,b.depthStencilAttachment);a.checkFramebufferStatus(36160);a.bindFramebuffer(36160,Z.next);Z.cur=Z.next;a.getError()}function t(a,b){function c(a,b){var e,f=0,h=0,k=!0,m=!0;e=null;var p=!0,t="rgba",
r="uint8",D=1,W=null,la=null,Z=null,ha=!1;if("number"===typeof a)f=a|0,h=b|0||f;else if(a){"shape"in a?(h=a.shape,f=h[0],h=h[1]):("radius"in a&&(f=h=a.radius),"width"in a&&(f=a.width),"height"in a&&(h=a.height));if("color"in a||"colors"in a)e=a.color||a.colors,Array.isArray(e);if(!e){"colorCount"in a&&(D=a.colorCount|0);"colorTexture"in a&&(p=!!a.colorTexture,t="rgba4");if("colorType"in a&&(r=a.colorType,!p))if("half float"===r||"float16"===r)t="rgba16f";else if("float"===r||"float32"===r)t="rgba32f";
"colorFormat"in a&&(t=a.colorFormat,0<=B.indexOf(t)?p=!0:0<=C.indexOf(t)&&(p=!1))}if("depthTexture"in a||"depthStencilTexture"in a)ha=!(!a.depthTexture&&!a.depthStencilTexture);"depth"in a&&("boolean"===typeof a.depth?k=a.depth:(W=a.depth,m=!1));"stencil"in a&&("boolean"===typeof a.stencil?m=a.stencil:(la=a.stencil,k=!1));"depthStencil"in a&&("boolean"===typeof a.depthStencil?k=m=a.depthStencil:(Z=a.depthStencil,m=k=!1))}else f=h=1;var G=null,A=null,Q=null,x=null;if(Array.isArray(e))G=e.map(v);else if(e)G=
[v(e)];else for(G=Array(D),e=0;e<D;++e)G[e]=l(f,h,p,t,r);f=f||G[0].width;h=h||G[0].height;W?A=v(W):k&&!m&&(A=l(f,h,ha,"depth","uint32"));la?Q=v(la):m&&!k&&(Q=l(f,h,!1,"stencil","uint8"));Z?x=v(Z):!W&&!la&&m&&k&&(x=l(f,h,ha,"depth stencil","depth stencil"));k=null;for(e=0;e<G.length;++e)g(G[e],f,h),G[e]&&G[e].texture&&(m=ob[G[e].texture._texture.format]*Ma[G[e].texture._texture.type],null===k&&(k=m));g(A,f,h);g(Q,f,h);g(x,f,h);n(d);d.width=f;d.height=h;d.colorAttachments=G;d.depthAttachment=A;d.stencilAttachment=
Q;d.depthStencilAttachment=x;c.color=G.map(u);c.depth=u(A);c.stencil=u(Q);c.depthStencil=u(x);c.width=d.width;c.height=d.height;w(d);return c}var d=new e;k.framebufferCount++;c(a,b);return A(c,{resize:function(a,b){var e=a|0,g=b|0||e;if(e===d.width&&g===d.height)return c;for(var f=d.colorAttachments,h=0;h<f.length;++h)m(f[h],e,g);m(d.depthAttachment,e,g);m(d.stencilAttachment,e,g);m(d.depthStencilAttachment,e,g);d.width=c.width=e;d.height=c.height=g;w(d);return c},_reglType:"framebuffer",_framebuffer:d,
destroy:function(){D(d);n(d)},use:function(a){Z.setFBO({framebuffer:c},a)}})}var Z={cur:null,next:null,dirty:!1,setFBO:null},B=["rgba"],C=["rgba4","rgb565","rgb5 a1"];b.ext_srgb&&C.push("srgba");b.ext_color_buffer_half_float&&C.push("rgba16f","rgb16f");b.webgl_color_buffer_float&&C.push("rgba32f");var x=["uint8"];b.oes_texture_half_float&&x.push("half float","float16");b.oes_texture_float&&x.push("float","float32");var M=0,P={};return A(Z,{getFramebuffer:function(a){return"function"===typeof a&&"framebuffer"===
a._reglType&&(a=a._framebuffer,a instanceof e)?a:null},create:t,createCube:function(a){function b(a){var e,g={color:null},f=0,h=null;e="rgba";var l="uint8",n=1;if("number"===typeof a)f=a|0;else if(a){"shape"in a?f=a.shape[0]:("radius"in a&&(f=a.radius|0),"width"in a?f=a.width|0:"height"in a&&(f=a.height|0));if("color"in a||"colors"in a)h=a.color||a.colors,Array.isArray(h);h||("colorCount"in a&&(n=a.colorCount|0),"colorType"in a&&(l=a.colorType),"colorFormat"in a&&(e=a.colorFormat));"depth"in a&&(g.depth=
a.depth);"stencil"in a&&(g.stencil=a.stencil);"depthStencil"in a&&(g.depthStencil=a.depthStencil)}else f=1;if(h)if(Array.isArray(h))for(a=[],e=0;e<h.length;++e)a[e]=h[e];else a=[h];else for(a=Array(n),h={radius:f,format:e,type:l},e=0;e<n;++e)a[e]=d.createCube(h);g.color=Array(a.length);for(e=0;e<a.length;++e)n=a[e],f=f||n.width,g.color[e]={target:34069,data:a[e]};for(e=0;6>e;++e){for(n=0;n<a.length;++n)g.color[n].target=34069+e;0<e&&(g.depth=c[0].depth,g.stencil=c[0].stencil,g.depthStencil=c[0].depthStencil);
if(c[e])c[e](g);else c[e]=t(g)}return A(b,{width:f,height:f,color:a})}var c=Array(6);b(a);return A(b,{faces:c,resize:function(a){var e=a|0;if(e===b.width)return b;var g=b.color;for(a=0;a<g.length;++a)g[a].resize(e);for(a=0;6>a;++a)c[a].resize(e);b.width=b.height=e;return b},_reglType:"framebufferCube",destroy:function(){c.forEach(function(a){a.destroy()})}})},clear:function(){H(P).forEach(D)},restore:function(){H(P).forEach(function(b){b.framebuffer=a.createFramebuffer();w(b)})}})}function pb(){this.w=
this.z=this.y=this.x=this.state=0;this.buffer=null;this.size=0;this.normalized=!1;this.type=5126;this.divisor=this.stride=this.offset=0}function Kb(a,b,c,d,f){a=c.maxAttributes;b=Array(a);for(c=0;c<a;++c)b[c]=new pb;return{Record:pb,scope:{},state:b}}function Lb(a,b,c,d){function f(a,b,c,g){this.name=a;this.id=b;this.location=c;this.info=g}function k(a,b){for(var c=0;c<a.length;++c)if(a[c].id===b.id){a[c].location=b.location;return}a.push(b)}function p(c,g,d){d=35632===c?r:v;var f=d[g];if(!f){var h=
b.str(g),f=a.createShader(c);a.shaderSource(f,h);a.compileShader(f);d[g]=f}return f}function h(a,b){this.id=m++;this.fragId=a;this.vertId=b;this.program=null;this.uniforms=[];this.attributes=[];d.profile&&(this.stats={uniformsCount:0,attributesCount:0})}function g(c,g){var h,l;h=p(35632,c.fragId);l=p(35633,c.vertId);var m=c.program=a.createProgram();a.attachShader(m,h);a.attachShader(m,l);a.linkProgram(m);var r=a.getProgramParameter(m,35718);d.profile&&(c.stats.uniformsCount=r);var u=c.uniforms;for(h=
0;h<r;++h)if(l=a.getActiveUniform(m,h))if(1<l.size)for(var v=0;v<l.size;++v){var A=l.name.replace("[0]","["+v+"]");k(u,new f(A,b.id(A),a.getUniformLocation(m,A),l))}else k(u,new f(l.name,b.id(l.name),a.getUniformLocation(m,l.name),l));r=a.getProgramParameter(m,35721);d.profile&&(c.stats.attributesCount=r);u=c.attributes;for(h=0;h<r;++h)(l=a.getActiveAttrib(m,h))&&k(u,new f(l.name,b.id(l.name),a.getAttribLocation(m,l.name),l))}var r={},v={},l={},u=[],m=0;d.profile&&(c.getMaxUniformsCount=function(){var a=
0;u.forEach(function(b){b.stats.uniformsCount>a&&(a=b.stats.uniformsCount)});return a},c.getMaxAttributesCount=function(){var a=0;u.forEach(function(b){b.stats.attributesCount>a&&(a=b.stats.attributesCount)});return a});return{clear:function(){var b=a.deleteShader.bind(a);H(r).forEach(b);r={};H(v).forEach(b);v={};u.forEach(function(b){a.deleteProgram(b.program)});u.length=0;l={};c.shaderCount=0},program:function(a,b,f){var d=l[b];d||(d=l[b]={});var m=d[a];m||(m=new h(b,a),c.shaderCount++,g(m,f),d[a]=
m,u.push(m));return m},restore:function(){r={};v={};for(var a=0;a<u.length;++a)g(u[a])},shader:p,frag:-1,vert:-1}}function Mb(a,b,c,d,f,k){function p(g){var f;f=null===b.next?5121:b.next.colorAttachments[0].texture._texture.type;var h=0,l=0,k=d.framebufferWidth,m=d.framebufferHeight,e=null;O(g)?e=g:g&&(h=g.x|0,l=g.y|0,k=(g.width||d.framebufferWidth-h)|0,m=(g.height||d.framebufferHeight-l)|0,e=g.data||null);c();g=k*m*4;e||(5121===f?e=new Uint8Array(g):5126===f&&(e=e||new Float32Array(g)));a.pixelStorei(3333,
4);a.readPixels(h,l,k,m,6408,f,e);return e}function h(a){var c;b.setFBO({framebuffer:a.framebuffer},function(){c=p(a)});return c}return function(a){return a&&"framebuffer"in a?h(a):p(a)}}function Ba(a){return Array.prototype.slice.call(a)}function Ca(a){return Ba(a).join("")}function Nb(){function a(){var a=[],b=[];return A(function(){a.push.apply(a,Ba(arguments))},{def:function(){var f="v"+c++;b.push(f);0<arguments.length&&(a.push(f,"="),a.push.apply(a,Ba(arguments)),a.push(";"));return f},toString:function(){return Ca([0<
b.length?"var "+b+";":"",Ca(a)])}})}function b(){function b(a,d){f(a,d,"=",c.def(a,d),";")}var c=a(),f=a(),d=c.toString,l=f.toString;return A(function(){c.apply(c,Ba(arguments))},{def:c.def,entry:c,exit:f,save:b,set:function(a,f,e){b(a,f);c(a,f,"=",e,";")},toString:function(){return d()+l()}})}var c=0,d=[],f=[],k=a(),p={};return{global:k,link:function(a){for(var b=0;b<f.length;++b)if(f[b]===a)return d[b];b="g"+c++;d.push(b);f.push(a);return b},block:a,proc:function(a,c){function f(){var a="a"+d.length;
d.push(a);return a}var d=[];c=c||0;for(var l=0;l<c;++l)f();var l=b(),k=l.toString;return p[a]=A(l,{arg:f,toString:function(){return Ca(["function(",d.join(),"){",k(),"}"])}})},scope:b,cond:function(){var a=Ca(arguments),c=b(),f=b(),d=c.toString,l=f.toString;return A(c,{then:function(){c.apply(c,Ba(arguments));return this},"else":function(){f.apply(f,Ba(arguments));return this},toString:function(){var b=l();b&&(b="else{"+b+"}");return Ca(["if(",a,"){",d(),"}",b])}})},compile:function(){var a=['"use strict";',
k,"return {"];Object.keys(p).forEach(function(b){a.push('"',b,'":',p[b].toString(),",")});a.push("}");var b=Ca(a).replace(/;/g,";\n").replace(/}/g,"}\n").replace(/{/g,"{\n");return Function.apply(null,d.concat(b)).apply(null,f)}}}function Na(a){return Array.isArray(a)||O(a)||ja(a)}function qb(a){return a.sort(function(a,c){return"viewport"===a?-1:"viewport"===c?1:a<c?-1:1})}function Y(a,b,c,d){this.thisDep=a;this.contextDep=b;this.propDep=c;this.append=d}function ta(a){return a&&!(a.thisDep||a.contextDep||
a.propDep)}function B(a){return new Y(!1,!1,!1,a)}function N(a,b){var c=a.type;return 0===c?(c=a.data.length,new Y(!0,1<=c,2<=c,b)):4===c?(c=a.data,new Y(c.thisDep,c.contextDep,c.propDep,b)):new Y(3===c,2===c,1===c,b)}function Ob(a,b,c,d,f,k,p,h,g,r,v,l,u,m,e){function n(a){return a.replace(".","_")}function D(a,b,c){var e=n(a);Ja.push(a);Ea[e]=pa[e]=!!c;qa[e]=b}function w(a,b,c){var e=n(a);Ja.push(a);Array.isArray(c)?(pa[e]=c.slice(),Ea[e]=c.slice()):pa[e]=Ea[e]=c;ra[e]=b}function t(){var a=Nb(),
c=a.link,e=a.global;a.id=oa++;a.batchId="0";var f=c(ga),d=a.shared={props:"a0"};Object.keys(ga).forEach(function(a){d[a]=e.def(f,".",a)});var g=a.next={},ca=a.current={};Object.keys(ra).forEach(function(a){Array.isArray(pa[a])&&(g[a]=e.def(d.next,".",a),ca[a]=e.def(d.current,".",a))});var F=a.constants={};Object.keys(da).forEach(function(a){F[a]=e.def(JSON.stringify(da[a]))});a.invoke=function(b,e){switch(e.type){case 0:var X=["this",d.context,d.props,a.batchId];return b.def(c(e.data),".call(",X.slice(0,
Math.max(e.data.length+1,4)),")");case 1:return b.def(d.props,e.data);case 2:return b.def(d.context,e.data);case 3:return b.def("this",e.data);case 4:return e.data.append(a,b),e.data.ref}};a.attribCache={};var X={};a.scopeAttrib=function(a){a=b.id(a);if(a in X)return X[a];var e=r.scope[a];e||(e=r.scope[a]=new xa);return X[a]=c(e)};return a}function Z(a){var b=a["static"];a=a.dynamic;var c;if("profile"in b){var e=!!b.profile;c=B(function(a,b){return e});c.enable=e}else if("profile"in a){var f=a.profile;
c=N(f,function(a,b){return a.invoke(b,f)})}return c}function A(a,b){var c=a["static"],e=a.dynamic;if("framebuffer"in c){var f=c.framebuffer;return f?(f=h.getFramebuffer(f),B(function(a,b){var c=a.link(f),e=a.shared;b.set(e.framebuffer,".next",c);e=e.context;b.set(e,".framebufferWidth",c+".width");b.set(e,".framebufferHeight",c+".height");return c})):B(function(a,b){var c=a.shared;b.set(c.framebuffer,".next","null");c=c.context;b.set(c,".framebufferWidth",c+".drawingBufferWidth");b.set(c,".framebufferHeight",
c+".drawingBufferHeight");return"null"})}if("framebuffer"in e){var d=e.framebuffer;return N(d,function(a,b){var c=a.invoke(b,d),e=a.shared,q=e.framebuffer,c=b.def(q,".getFramebuffer(",c,")");b.set(q,".next",c);e=e.context;b.set(e,".framebufferWidth",c+"?"+c+".width:"+e+".drawingBufferWidth");b.set(e,".framebufferHeight",c+"?"+c+".height:"+e+".drawingBufferHeight");return c})}return null}function x(a,b,c){function e(a){if(a in f){var c=f[a];a=!0;var q=c.x|0,g=c.y|0,K,ca;"width"in c?K=c.width|0:a=!1;
"height"in c?ca=c.height|0:a=!1;return new Y(!a&&b&&b.thisDep,!a&&b&&b.contextDep,!a&&b&&b.propDep,function(a,b){var e=a.shared.context,f=K;"width"in c||(f=b.def(e,".","framebufferWidth","-",q));var d=ca;"height"in c||(d=b.def(e,".","framebufferHeight","-",g));return[q,g,f,d]})}if(a in d){var l=d[a];a=N(l,function(a,b){var c=a.invoke(b,l),e=a.shared.context,q=b.def(c,".x|0"),f=b.def(c,".y|0"),d=b.def('"width" in ',c,"?",c,".width|0:","(",e,".","framebufferWidth","-",q,")"),c=b.def('"height" in ',
c,"?",c,".height|0:","(",e,".","framebufferHeight","-",f,")");return[q,f,d,c]});b&&(a.thisDep=a.thisDep||b.thisDep,a.contextDep=a.contextDep||b.contextDep,a.propDep=a.propDep||b.propDep);return a}return b?new Y(b.thisDep,b.contextDep,b.propDep,function(a,b){var c=a.shared.context;return[0,0,b.def(c,".","framebufferWidth"),b.def(c,".","framebufferHeight")]}):null}var f=a["static"],d=a.dynamic;if(a=e("viewport")){var g=a;a=new Y(a.thisDep,a.contextDep,a.propDep,function(a,b){var c=g.append(a,b),e=a.shared.context;
b.set(e,".viewportWidth",c[2]);b.set(e,".viewportHeight",c[3]);return c})}return{viewport:a,scissor_box:e("scissor.box")}}function C(a){function c(a){if(a in e){var d=b.id(e[a]);a=B(function(){return d});a.id=d;return a}if(a in f){var q=f[a];return N(q,function(a,b){var c=a.invoke(b,q);return b.def(a.shared.strings,".id(",c,")")})}return null}var e=a["static"],f=a.dynamic,d=c("frag"),g=c("vert"),ca=null;ta(d)&&ta(g)?(ca=v.program(g.id,d.id),a=B(function(a,b){return a.link(ca)})):a=new Y(d&&d.thisDep||
g&&g.thisDep,d&&d.contextDep||g&&g.contextDep,d&&d.propDep||g&&g.propDep,function(a,b){var c=a.shared.shader,e;e=d?d.append(a,b):b.def(c,".","frag");var f;f=g?g.append(a,b):b.def(c,".","vert");return b.def(c+".program("+f+","+e+")")});return{frag:d,vert:g,progVar:a,program:ca}}function M(a,b){function c(a,b){if(a in e){var q=e[a]|0;return B(function(a,c){b&&(a.OFFSET=q);return q})}if(a in f){var g=f[a];return N(g,function(a,c){var e=a.invoke(c,g);b&&(a.OFFSET=e);return e})}return b&&d?B(function(a,
b){a.OFFSET="0";return 0}):null}var e=a["static"],f=a.dynamic,d=function(){if("elements"in e){var a=e.elements;Na(a)?a=k.getElements(k.create(a,!0)):a&&(a=k.getElements(a));var b=B(function(b,c){if(a){var e=b.link(a);return b.ELEMENTS=e}return b.ELEMENTS=null});b.value=a;return b}if("elements"in f){var c=f.elements;return N(c,function(a,b){var e=a.shared,d=e.isBufferArgs,e=e.elements,f=a.invoke(b,c),q=b.def("null"),d=b.def(d,"(",f,")"),f=a.cond(d).then(q,"=",e,".createStream(",f,");")["else"](q,"=",
e,".getElements(",f,");");b.entry(f);b.exit(a.cond(d).then(e,".destroyStream(",q,");"));return a.ELEMENTS=q})}return null}(),g=c("offset",!0);return{elements:d,primitive:function(){if("primitive"in e){var a=e.primitive;return B(function(b,c){return Ra[a]})}if("primitive"in f){var b=f.primitive;return N(b,function(a,c){var e=a.constants.primTypes,d=a.invoke(c,b);return c.def(e,"[",d,"]")})}return d?ta(d)?d.value?B(function(a,b){return b.def(a.ELEMENTS,".primType")}):B(function(){return 4}):new Y(d.thisDep,
d.contextDep,d.propDep,function(a,b){var c=a.ELEMENTS;return b.def(c,"?",c,".primType:",4)}):null}(),count:function(){if("count"in e){var a=e.count|0;return B(function(){return a})}if("count"in f){var b=f.count;return N(b,function(a,c){return a.invoke(c,b)})}return d?ta(d)?d?g?new Y(g.thisDep,g.contextDep,g.propDep,function(a,b){return b.def(a.ELEMENTS,".vertCount-",a.OFFSET)}):B(function(a,b){return b.def(a.ELEMENTS,".vertCount")}):B(function(){return-1}):new Y(d.thisDep||g.thisDep,d.contextDep||
g.contextDep,d.propDep||g.propDep,function(a,b){var c=a.ELEMENTS;return a.OFFSET?b.def(c,"?",c,".vertCount-",a.OFFSET,":-1"):b.def(c,"?",c,".vertCount:-1")}):null}(),instances:c("instances",!1),offset:g}}function P(a,b){var c=a["static"],e=a.dynamic,d={};Ja.forEach(function(a){function b(q,g){if(a in c){var y=q(c[a]);d[f]=B(function(){return y})}else if(a in e){var l=e[a];d[f]=N(l,function(a,b){return g(a,b,a.invoke(b,l))})}}var f=n(a);switch(a){case "cull.enable":case "blend.enable":case "dither":case "stencil.enable":case "depth.enable":case "scissor.enable":case "polygonOffset.enable":case "sample.alpha":case "sample.enable":case "depth.mask":return b(function(a){return a},
function(a,b,c){return c});case "depth.func":return b(function(a){return Ua[a]},function(a,b,c){return b.def(a.constants.compareFuncs,"[",c,"]")});case "depth.range":return b(function(a){return a},function(a,b,c){a=b.def("+",c,"[0]");b=b.def("+",c,"[1]");return[a,b]});case "blend.func":return b(function(a){return[Fa["srcRGB"in a?a.srcRGB:a.src],Fa["dstRGB"in a?a.dstRGB:a.dst],Fa["srcAlpha"in a?a.srcAlpha:a.src],Fa["dstAlpha"in a?a.dstAlpha:a.dst]]},function(a,b,c){function e(a,d){return b.def('"',
a,d,'" in ',c,"?",c,".",a,d,":",c,".",a)}a=a.constants.blendFuncs;var d=e("src","RGB"),f=e("dst","RGB"),d=b.def(a,"[",d,"]"),q=b.def(a,"[",e("src","Alpha"),"]"),f=b.def(a,"[",f,"]");a=b.def(a,"[",e("dst","Alpha"),"]");return[d,f,q,a]});case "blend.equation":return b(function(a){if("string"===typeof a)return[V[a],V[a]];if("object"===typeof a)return[V[a.rgb],V[a.alpha]]},function(a,b,c){var e=a.constants.blendEquations,d=b.def(),f=b.def();a=a.cond("typeof ",c,'==="string"');a.then(d,"=",f,"=",e,"[",
c,"];");a["else"](d,"=",e,"[",c,".rgb];",f,"=",e,"[",c,".alpha];");b(a);return[d,f]});case "blend.color":return b(function(a){return J(4,function(b){return+a[b]})},function(a,b,c){return J(4,function(a){return b.def("+",c,"[",a,"]")})});case "stencil.mask":return b(function(a){return a|0},function(a,b,c){return b.def(c,"|0")});case "stencil.func":return b(function(a){return[Ua[a.cmp||"keep"],a.ref||0,"mask"in a?a.mask:-1]},function(a,b,c){a=b.def('"cmp" in ',c,"?",a.constants.compareFuncs,"[",c,".cmp]",
":",7680);var e=b.def(c,".ref|0");b=b.def('"mask" in ',c,"?",c,".mask|0:-1");return[a,e,b]});case "stencil.opFront":case "stencil.opBack":return b(function(b){return["stencil.opBack"===a?1029:1028,Oa[b.fail||"keep"],Oa[b.zfail||"keep"],Oa[b.zpass||"keep"]]},function(b,c,e){function d(a){return c.def('"',a,'" in ',e,"?",f,"[",e,".",a,"]:",7680)}var f=b.constants.stencilOps;return["stencil.opBack"===a?1029:1028,d("fail"),d("zfail"),d("zpass")]});case "polygonOffset.offset":return b(function(a){return[a.factor|
0,a.units|0]},function(a,b,c){a=b.def(c,".factor|0");b=b.def(c,".units|0");return[a,b]});case "cull.face":return b(function(a){var b=0;"front"===a?b=1028:"back"===a&&(b=1029);return b},function(a,b,c){return b.def(c,'==="front"?',1028,":",1029)});case "lineWidth":return b(function(a){return a},function(a,b,c){return c});case "frontFace":return b(function(a){return rb[a]},function(a,b,c){return b.def(c+'==="cw"?2304:2305')});case "colorMask":return b(function(a){return a.map(function(a){return!!a})},
function(a,b,c){return J(4,function(a){return"!!"+c+"["+a+"]"})});case "sample.coverage":return b(function(a){return["value"in a?a.value:1,!!a.invert]},function(a,b,c){a=b.def('"value" in ',c,"?+",c,".value:1");b=b.def("!!",c,".invert");return[a,b]})}});return d}function G(a,b){var c=a["static"],e=a.dynamic,d={};Object.keys(c).forEach(function(a){var b=c[a],e;if("number"===typeof b||"boolean"===typeof b)e=B(function(){return b});else if("function"===typeof b){var f=b._reglType;if("texture2d"===f||
"textureCube"===f)e=B(function(a){return a.link(b)});else if("framebuffer"===f||"framebufferCube"===f)e=B(function(a){return a.link(b.color[0])})}else na(b)&&(e=B(function(a){return a.global.def("[",J(b.length,function(a){return b[a]}),"]")}));e.value=b;d[a]=e});Object.keys(e).forEach(function(a){var b=e[a];d[a]=N(b,function(a,c){return a.invoke(c,b)})});return d}function Q(a,c){var e=a["static"],d=a.dynamic,g={};Object.keys(e).forEach(function(a){var c=e[a],d=b.id(a),q=new xa;if(Na(c))q.state=1,
q.buffer=f.getBuffer(f.create(c,34962,!1,!0)),q.type=0;else{var y=f.getBuffer(c);if(y)q.state=1,q.buffer=y,q.type=0;else if(c.constant){var l=c.constant;q.buffer="null";q.state=2;"number"===typeof l?q.x=l:Da.forEach(function(a,b){b<l.length&&(q[a]=l[b])})}else{var y=Na(c.buffer)?f.getBuffer(f.create(c.buffer,34962,!1,!0)):f.getBuffer(c.buffer),h=c.offset|0,k=c.stride|0,m=c.size|0,n=!!c.normalized,aa=0;"type"in c&&(aa=Qa[c.type]);c=c.divisor|0;q.buffer=y;q.state=1;q.size=m;q.normalized=n;q.type=aa||
y.dtype;q.offset=h;q.stride=k;q.divisor=c}}g[a]=B(function(a,b){var c=a.attribCache;if(d in c)return c[d];var e={isStream:!1};Object.keys(q).forEach(function(a){e[a]=q[a]});q.buffer&&(e.buffer=a.link(q.buffer),e.type=e.type||e.buffer+".dtype");return c[d]=e})});Object.keys(d).forEach(function(a){var b=d[a];g[a]=N(b,function(a,c){function e(a){c(y[a],"=",d,".",a,"|0;")}var d=a.invoke(c,b),f=a.shared,q=f.isBufferArgs,g=f.buffer,y={isStream:c.def(!1)},l=new xa;l.state=1;Object.keys(l).forEach(function(a){y[a]=
c.def(""+l[a])});var h=y.buffer,K=y.type;c("if(",q,"(",d,")){",y.isStream,"=true;",h,"=",g,".createStream(",34962,",",d,");",K,"=",h,".dtype;","}else{",h,"=",g,".getBuffer(",d,");","if(",h,"){",K,"=",h,".dtype;",'}else if("constant" in ',d,"){",y.state,"=",2,";","if(typeof "+d+'.constant === "number"){',y[Da[0]],"=",d,".constant;",Da.slice(1).map(function(a){return y[a]}).join("="),"=0;","}else{",Da.map(function(a,b){return y[a]+"="+d+".constant.length>="+b+"?"+d+".constant["+b+"]:0;"}).join(""),
"}}else{","if(",q,"(",d,".buffer)){",h,"=",g,".createStream(",34962,",",d,".buffer);","}else{",h,"=",g,".getBuffer(",d,".buffer);","}",K,'="type" in ',d,"?",f.glTypes,"[",d,".type]:",h,".dtype;",y.normalized,"=!!",d,".normalized;");e("size");e("offset");e("stride");e("divisor");c("}}");c.exit("if(",y.isStream,"){",g,".destroyStream(",h,");","}");return y})});return g}function O(a){var b=a["static"],c=a.dynamic,e={};Object.keys(b).forEach(function(a){var c=b[a];e[a]=B(function(a,b){return"number"===
typeof c||"boolean"===typeof c?""+c:a.link(c)})});Object.keys(c).forEach(function(a){var b=c[a];e[a]=N(b,function(a,c){return a.invoke(c,b)})});return e}function z(a,b,c,e,d){var f=A(a,d),g=x(a,f,d),l=M(a,d),h=P(a,d),k=C(a,d),m=g.viewport;m&&(h.viewport=m);m=n("scissor.box");(g=g[m])&&(h[m]=g);g=0<Object.keys(h).length;f={framebuffer:f,draw:l,shader:k,state:h,dirty:g};f.profile=Z(a,d);f.uniforms=G(c,d);f.attributes=Q(b,d);f.context=O(e,d);return f}function sa(a,b,c){var e=a.shared.context,d=a.scope();
Object.keys(c).forEach(function(f){b.save(e,"."+f);d(e,".",f,"=",c[f].append(a,b),";")});b(d)}function I(a,b,c,e){var d=a.shared,f=d.gl,g=d.framebuffer,l;ka&&(l=b.def(d.extensions,".webgl_draw_buffers"));var h=a.constants,d=h.drawBuffer,h=h.backBuffer;a=c?c.append(a,b):b.def(g,".next");e||b("if(",a,"!==",g,".cur){");b("if(",a,"){",f,".bindFramebuffer(",36160,",",a,".framebuffer);");ka&&b(l,".drawBuffersWEBGL(",d,"[",a,".colorAttachments.length]);");b("}else{",f,".bindFramebuffer(",36160,",null);");
ka&&b(l,".drawBuffersWEBGL(",h,");");b("}",g,".cur=",a,";");e||b("}")}function T(a,b,c){var e=a.shared,d=e.gl,f=a.current,g=a.next,l=e.current,h=e.next,k=a.cond(l,".dirty");Ja.forEach(function(b){b=n(b);if(!(b in c.state)){var e,y;if(b in g){e=g[b];y=f[b];var m=J(pa[b].length,function(a){return k.def(e,"[",a,"]")});k(a.cond(m.map(function(a,b){return a+"!=="+y+"["+b+"]"}).join("||")).then(d,".",ra[b],"(",m,");",m.map(function(a,b){return y+"["+b+"]="+a}).join(";"),";"))}else e=k.def(h,".",b),m=a.cond(e,
"!==",l,".",b),k(m),b in qa?m(a.cond(e).then(d,".enable(",qa[b],");")["else"](d,".disable(",qa[b],");"),l,".",b,"=",e,";"):m(d,".",ra[b],"(",e,");",l,".",b,"=",e,";")}});0===Object.keys(c.state).length&&k(l,".dirty=false;");b(k)}function L(a,b,c,e){var d=a.shared,f=a.current,g=d.current,l=d.gl;qb(Object.keys(c)).forEach(function(d){var h=c[d];if(!e||e(h)){var k=h.append(a,b);if(qa[d]){var m=qa[d];ta(h)?k?b(l,".enable(",m,");"):b(l,".disable(",m,");"):b(a.cond(k).then(l,".enable(",m,");")["else"](l,
".disable(",m,");"));b(g,".",d,"=",k,";")}else if(na(k)){var n=f[d];b(l,".",ra[d],"(",k,");",k.map(function(a,b){return n+"["+b+"]="+a}).join(";"),";")}else b(l,".",ra[d],"(",k,");",g,".",d,"=",k,";")}})}function ua(a,b){ma&&(a.instancing=b.def(a.shared.extensions,".angle_instanced_arrays"))}function E(a,b,c,e,d){function f(){return"undefined"===typeof performance?"Date.now()":"performance.now()"}function g(a){r=b.def();a(r,"=",f(),";");"string"===typeof d?a(n,".count+=",d,";"):a(n,".count++;");m&&
(e?(u=b.def(),a(u,"=",t,".getNumPendingQueries();")):a(t,".beginQuery(",n,");"))}function l(a){a(n,".cpuTime+=",f(),"-",r,";");m&&(e?a(t,".pushScopeStats(",u,",",t,".getNumPendingQueries(),",n,");"):a(t,".endQuery();"))}function h(a){var c=b.def(p,".profile");b(p,".profile=",a,";");b.exit(p,".profile=",c,";")}var k=a.shared,n=a.stats,p=k.current,t=k.timer;c=c.profile;var r,u;if(c){if(ta(c)){c.enable?(g(b),l(b.exit),h("true")):h("false");return}c=c.append(a,b);h(c)}else c=b.def(p,".profile");k=a.block();
g(k);b("if(",c,"){",k,"}");a=a.block();l(a);b.exit("if(",c,"){",a,"}")}function S(a,b,c,e,d){function f(a){switch(a){case 35664:case 35667:case 35671:return 2;case 35665:case 35668:case 35672:return 3;case 35666:case 35669:case 35673:return 4;default:return 1}}function g(c,e,d){function f(){b("if(!",n,".buffer){",k,".enableVertexAttribArray(",m,");}");var c=d.type,g;g=d.size?b.def(d.size,"||",e):e;b("if(",n,".type!==",c,"||",n,".size!==",g,"||",aa.map(function(a){return n+"."+a+"!=="+d[a]}).join("||"),
"){",k,".bindBuffer(",34962,",",K,".buffer);",k,".vertexAttribPointer(",[m,g,c,d.normalized,d.stride,d.offset],");",n,".type=",c,";",n,".size=",g,";",aa.map(function(a){return n+"."+a+"="+d[a]+";"}).join(""),"}");ma&&(c=d.divisor,b("if(",n,".divisor!==",c,"){",a.instancing,".vertexAttribDivisorANGLE(",[m,c],");",n,".divisor=",c,";}"))}function h(){b("if(",n,".buffer){",k,".disableVertexAttribArray(",m,");","}if(",Da.map(function(a,b){return n+"."+a+"!=="+p[b]}).join("||"),"){",k,".vertexAttrib4f(",
m,",",p,");",Da.map(function(a,b){return n+"."+a+"="+p[b]+";"}).join(""),"}")}var k=l.gl,m=b.def(c,".location"),n=b.def(l.attributes,"[",m,"]");c=d.state;var K=d.buffer,p=[d.x,d.y,d.z,d.w],aa=["buffer","normalized","offset","stride"];1===c?f():2===c?h():(b("if(",c,"===",1,"){"),f(),b("}else{"),h(),b("}"))}var l=a.shared;e.forEach(function(e){var l=e.name,h=c.attributes[l],k;if(h){if(!d(h))return;k=h.append(a,b)}else{if(!d(sb))return;var m=a.scopeAttrib(l);k={};Object.keys(new xa).forEach(function(a){k[a]=
b.def(m,".",a)})}g(a.link(e),f(e.info.type),k)})}function U(a,c,e,d,f){for(var g=a.shared,l=g.gl,h,k=0;k<d.length;++k){var m=d[k],n=m.name,p=m.info.type,t=e.uniforms[n],m=a.link(m)+".location",r;if(t){if(!f(t))continue;if(ta(t)){n=t.value;if(35678===p||35680===p)p=a.link(n._texture||n.color[0]._texture),c(l,".uniform1i(",m,",",p+".bind());"),c.exit(p,".unbind();");else if(35674===p||35675===p||35676===p)n=a.global.def("new Float32Array(["+Array.prototype.slice.call(n)+"])"),t=2,35675===p?t=3:35676===
p&&(t=4),c(l,".uniformMatrix",t,"fv(",m,",false,",n,");");else{switch(p){case 5126:h="1f";break;case 35664:h="2f";break;case 35665:h="3f";break;case 35666:h="4f";break;case 35670:h="1i";break;case 5124:h="1i";break;case 35671:h="2i";break;case 35667:h="2i";break;case 35672:h="3i";break;case 35668:h="3i";break;case 35673:h="4i";break;case 35669:h="4i"}c(l,".uniform",h,"(",m,",",na(n)?Array.prototype.slice.call(n):n,");")}continue}else r=t.append(a,c)}else{if(!f(sb))continue;r=c.def(g.uniforms,"[",
b.id(n),"]")}35678===p?c("if(",r,"&&",r,'._reglType==="framebuffer"){',r,"=",r,".color[0];","}"):35680===p&&c("if(",r,"&&",r,'._reglType==="framebufferCube"){',r,"=",r,".color[0];","}");n=1;switch(p){case 35678:case 35680:p=c.def(r,"._texture");c(l,".uniform1i(",m,",",p,".bind());");c.exit(p,".unbind();");continue;case 5124:case 35670:h="1i";break;case 35667:case 35671:h="2i";n=2;break;case 35668:case 35672:h="3i";n=3;break;case 35669:case 35673:h="4i";n=4;break;case 5126:h="1f";break;case 35664:h=
"2f";n=2;break;case 35665:h="3f";n=3;break;case 35666:h="4f";n=4;break;case 35674:h="Matrix2fv";break;case 35675:h="Matrix3fv";break;case 35676:h="Matrix4fv"}c(l,".uniform",h,"(",m,",");if("M"===h.charAt(0)){var m=Math.pow(p-35674+2,2),u=a.global.def("new Float32Array(",m,")");c("false,(Array.isArray(",r,")||",r," instanceof Float32Array)?",r,":(",J(m,function(a){return u+"["+a+"]="+r+"["+a+"]"}),",",u,")")}else 1<n?c(J(n,function(a){return r+"["+a+"]"})):c(r);c(");")}}function H(a,b,c,e){function d(f){var g=
m[f];return g?g.contextDep&&e.contextDynamic||g.propDep?g.append(a,c):g.append(a,b):b.def(k,".",f)}function f(){function a(){c(w,".drawElementsInstancedANGLE(",[p,t,W,r+"<<(("+W+"-5121)>>1)",u],");")}function b(){c(w,".drawArraysInstancedANGLE(",[p,r,t,u],");")}n?v?a():(c("if(",n,"){"),a(),c("}else{"),b(),c("}")):b()}function g(){function a(){c(l+".drawElements("+[p,t,W,r+"<<(("+W+"-5121)>>1)"]+");")}function b(){c(l+".drawArrays("+[p,r,t]+");")}n?v?a():(c("if(",n,"){"),a(),c("}else{"),b(),c("}")):
b()}var h=a.shared,l=h.gl,k=h.draw,m=e.draw,n=function(){var d=m.elements,f=b;if(d){if(d.contextDep&&e.contextDynamic||d.propDep)f=c;d=d.append(a,f)}else d=f.def(k,".","elements");d&&f("if("+d+")"+l+".bindBuffer(34963,"+d+".buffer.buffer);");return d}(),p=d("primitive"),r=d("offset"),t=function(){var d=m.count,f=b;if(d){if(d.contextDep&&e.contextDynamic||d.propDep)f=c;d=d.append(a,f)}else d=f.def(k,".","count");return d}();if("number"===typeof t){if(0===t)return}else c("if(",t,"){"),c.exit("}");var u,
w;ma&&(u=d("instances"),w=a.instancing);var W=n+".type",v=m.elements&&ta(m.elements);ma&&("number"!==typeof u||0<=u)?"string"===typeof u?(c("if(",u,">0){"),f(),c("}else if(",u,"<0){"),g(),c("}")):f():g()}function ba(a,b,c,e,d){b=t();d=b.proc("body",d);ma&&(b.instancing=d.def(b.shared.extensions,".angle_instanced_arrays"));a(b,d,c,e);return b.compile().body}function R(a,b,c,e){ua(a,b);S(a,b,c,e.attributes,function(){return!0});U(a,b,c,e.uniforms,function(){return!0});H(a,b,b,c)}function W(a,b){var c=
a.proc("draw",1);ua(a,c);sa(a,c,b.context);I(a,c,b.framebuffer);T(a,c,b);L(a,c,b.state);E(a,c,b,!1,!0);var e=b.shader.progVar.append(a,c);c(a.shared.gl,".useProgram(",e,".program);");if(b.shader.program)R(a,c,b,b.shader.program);else{var d=a.global.def("{}"),f=c.def(e,".id"),g=c.def(d,"[",f,"]");c(a.cond(g).then(g,".call(this,a0);")["else"](g,"=",d,"[",f,"]=",a.link(function(c){return ba(R,a,b,c,1)}),"(",e,");",g,".call(this,a0);"))}0<Object.keys(b.state).length&&c(a.shared.current,".dirty=true;")}
function la(a,b,c,e){function d(){return!0}a.batchId="a1";ua(a,b);S(a,b,c,e.attributes,d);U(a,b,c,e.uniforms,d);H(a,b,b,c)}function ya(a,b,c,e){function d(a){return a.contextDep&&g||a.propDep}function f(a){return!d(a)}ua(a,b);var g=c.contextDep,h=b.def(),l=b.def();a.shared.props=l;a.batchId=h;var k=a.scope(),m=a.scope();b(k.entry,"for(",h,"=0;",h,"<","a1",";++",h,"){",l,"=","a0","[",h,"];",m,"}",k.exit);c.needsContext&&sa(a,m,c.context);c.needsFramebuffer&&I(a,m,c.framebuffer);L(a,m,c.state,d);c.profile&&
d(c.profile)&&E(a,m,c,!1,!0);e?(S(a,k,c,e.attributes,f),S(a,m,c,e.attributes,d),U(a,k,c,e.uniforms,f),U(a,m,c,e.uniforms,d),H(a,k,m,c)):(b=a.global.def("{}"),e=c.shader.progVar.append(a,m),l=m.def(e,".id"),k=m.def(b,"[",l,"]"),m(a.shared.gl,".useProgram(",e,".program);","if(!",k,"){",k,"=",b,"[",l,"]=",a.link(function(b){return ba(la,a,c,b,2)}),"(",e,");}",k,".call(this,a0[",h,"],",h,");"))}function ha(a,b){function c(a){return a.contextDep&&d||a.propDep}var e=a.proc("batch",2);a.batchId="0";ua(a,
e);var d=!1,f=!0;Object.keys(b.context).forEach(function(a){d=d||b.context[a].propDep});d||(sa(a,e,b.context),f=!1);var g=b.framebuffer,h=!1;g?(g.propDep?d=h=!0:g.contextDep&&d&&(h=!0),h||I(a,e,g)):I(a,e,null);b.state.viewport&&b.state.viewport.propDep&&(d=!0);T(a,e,b);L(a,e,b.state,function(a){return!c(a)});b.profile&&c(b.profile)||E(a,e,b,!1,"a1");b.contextDep=d;b.needsContext=f;b.needsFramebuffer=h;f=b.shader.progVar;if(f.contextDep&&d||f.propDep)ya(a,e,b,null);else if(f=f.append(a,e),e(a.shared.gl,
".useProgram(",f,".program);"),b.shader.program)ya(a,e,b,b.shader.program);else{var g=a.global.def("{}"),h=e.def(f,".id"),l=e.def(g,"[",h,"]");e(a.cond(l).then(l,".call(this,a0,a1);")["else"](l,"=",g,"[",h,"]=",a.link(function(c){return ba(ya,a,b,c,2)}),"(",f,");",l,".call(this,a0,a1);"))}0<Object.keys(b.state).length&&e(a.shared.current,".dirty=true;")}function ea(a,c){function e(b){var g=c.shader[b];g&&d.set(f.shader,"."+b,g.append(a,d))}var d=a.proc("scope",3);a.batchId="a2";var f=a.shared,g=f.current;
sa(a,d,c.context);c.framebuffer&&c.framebuffer.append(a,d);qb(Object.keys(c.state)).forEach(function(b){var e=c.state[b].append(a,d);na(e)?e.forEach(function(c,e){d.set(a.next[b],"["+e+"]",c)}):d.set(f.next,"."+b,e)});E(a,d,c,!0,!0);["elements","offset","count","instances","primitive"].forEach(function(b){var e=c.draw[b];e&&d.set(f.draw,"."+b,""+e.append(a,d))});Object.keys(c.uniforms).forEach(function(e){d.set(f.uniforms,"["+b.id(e)+"]",c.uniforms[e].append(a,d))});Object.keys(c.attributes).forEach(function(b){var e=
c.attributes[b].append(a,d),f=a.scopeAttrib(b);Object.keys(new xa).forEach(function(a){d.set(f,"."+a,e[a])})});e("vert");e("frag");0<Object.keys(c.state).length&&(d(g,".dirty=true;"),d.exit(g,".dirty=true;"));d("a1(",a.shared.context,",a0,",a.batchId,");")}function ja(a){if("object"===typeof a&&!na(a)){for(var b=Object.keys(a),c=0;c<b.length;++c)if(ia.isDynamic(a[b[c]]))return!0;return!1}}function fa(a,b,c){function e(a,b){g.forEach(function(c){var e=d[c];ia.isDynamic(e)&&(e=a.invoke(b,e),b(k,".",
c,"=",e,";"))})}var d=b["static"][c];if(d&&ja(d)){var f=a.global,g=Object.keys(d),h=!1,l=!1,m=!1,k=a.global.def("{}");g.forEach(function(b){var c=d[b];if(ia.isDynamic(c))"function"===typeof c&&(c=d[b]=ia.unbox(c)),b=N(c,null),h=h||b.thisDep,m=m||b.propDep,l=l||b.contextDep;else{f(k,".",b,"=");switch(typeof c){case "number":f(c);break;case "string":f('"',c,'"');break;case "object":Array.isArray(c)&&f("[",c.join(),"]");break;default:f(a.link(c))}f(";")}});b.dynamic[c]=new ia.DynamicVariable(4,{thisDep:h,
contextDep:l,propDep:m,ref:k,append:e});delete b["static"][c]}}var xa=r.Record,V={add:32774,subtract:32778,"reverse subtract":32779};c.ext_blend_minmax&&(V.min=32775,V.max=32776);var ma=c.angle_instanced_arrays,ka=c.webgl_draw_buffers,pa={dirty:!0,profile:e.profile},Ea={},Ja=[],qa={},ra={};D("dither",3024);D("blend.enable",3042);w("blend.color","blendColor",[0,0,0,0]);w("blend.equation","blendEquationSeparate",[32774,32774]);w("blend.func","blendFuncSeparate",[1,0,1,0]);D("depth.enable",2929,!0);
w("depth.func","depthFunc",513);w("depth.range","depthRange",[0,1]);w("depth.mask","depthMask",!0);w("colorMask","colorMask",[!0,!0,!0,!0]);D("cull.enable",2884);w("cull.face","cullFace",1029);w("frontFace","frontFace",2305);w("lineWidth","lineWidth",1);D("polygonOffset.enable",32823);w("polygonOffset.offset","polygonOffset",[0,0]);D("sample.alpha",32926);D("sample.enable",32928);w("sample.coverage","sampleCoverage",[1,!1]);D("stencil.enable",2960);w("stencil.mask","stencilMask",-1);w("stencil.func",
"stencilFunc",[519,0,-1]);w("stencil.opFront","stencilOpSeparate",[1028,7680,7680,7680]);w("stencil.opBack","stencilOpSeparate",[1029,7680,7680,7680]);D("scissor.enable",3089);w("scissor.box","scissor",[0,0,a.drawingBufferWidth,a.drawingBufferHeight]);w("viewport","viewport",[0,0,a.drawingBufferWidth,a.drawingBufferHeight]);var ga={gl:a,context:u,strings:b,next:Ea,current:pa,draw:l,elements:k,buffer:f,shader:v,attributes:r.state,uniforms:g,framebuffer:h,extensions:c,timer:m,isBufferArgs:Na},da={primTypes:Ra,
compareFuncs:Ua,blendFuncs:Fa,blendEquations:V,stencilOps:Oa,glTypes:Qa,orientationType:rb};ka&&(da.backBuffer=[1029],da.drawBuffer=J(d.maxDrawbuffers,function(a){return 0===a?[0]:J(a,function(a){return 36064+a})}));var oa=0;return{next:Ea,current:pa,procs:function(){var b=t(),c=b.proc("poll"),e=b.proc("refresh"),f=b.block();c(f);e(f);var g=b.shared,h=g.gl,l=g.next,m=g.current;f(m,".dirty=false;");I(b,c);I(b,e,null,!0);var k=a.getExtension("angle_instanced_arrays"),n;k&&(n=b.link(k));for(var p=0;p<
d.maxAttributes;++p){var r=e.def(g.attributes,"[",p,"]"),u=b.cond(r,".buffer");u.then(h,".enableVertexAttribArray(",p,");",h,".bindBuffer(",34962,",",r,".buffer.buffer);",h,".vertexAttribPointer(",p,",",r,".size,",r,".type,",r,".normalized,",r,".stride,",r,".offset);")["else"](h,".disableVertexAttribArray(",p,");",h,".vertexAttrib4f(",p,",",r,".x,",r,".y,",r,".z,",r,".w);",r,".buffer=null;");e(u);k&&e(n,".vertexAttribDivisorANGLE(",p,",",r,".divisor);")}Object.keys(qa).forEach(function(a){var d=qa[a],
g=f.def(l,".",a),k=b.block();k("if(",g,"){",h,".enable(",d,")}else{",h,".disable(",d,")}",m,".",a,"=",g,";");e(k);c("if(",g,"!==",m,".",a,"){",k,"}")});Object.keys(ra).forEach(function(a){var d=ra[a],g=pa[a],k,n,p=b.block();p(h,".",d,"(");na(g)?(d=g.length,k=b.global.def(l,".",a),n=b.global.def(m,".",a),p(J(d,function(a){return k+"["+a+"]"}),");",J(d,function(a){return n+"["+a+"]="+k+"["+a+"];"}).join("")),c("if(",J(d,function(a){return k+"["+a+"]!=="+n+"["+a+"]"}).join("||"),"){",p,"}")):(k=f.def(l,
".",a),n=f.def(m,".",a),p(k,");",m,".",a,"=",k,";"),c("if(",k,"!==",n,"){",p,"}"));e(p)});return b.compile()}(),compile:function(a,b,c,e,d){var f=t();f.stats=f.link(d);Object.keys(b["static"]).forEach(function(a){fa(f,b,a)});Pb.forEach(function(b){fa(f,a,b)});c=z(a,b,c,e,f);W(f,c);ea(f,c);ha(f,c);return f.compile()}}}function tb(a,b){for(var c=0;c<a.length;++c)if(a[c]===b)return c;return-1}var A=function(a,b){for(var c=Object.keys(b),d=0;d<c.length;++d)a[c[d]]=b[c[d]];return a},vb=0,ia={DynamicVariable:da,
define:function(a,b){return new da(a,Wa(b+""))},isDynamic:function(a){return"function"===typeof a&&!a._reglType||a instanceof da},unbox:function(a,b){return"function"===typeof a?new da(0,a):a},accessor:Wa},Va={next:"function"===typeof requestAnimationFrame?function(a){return requestAnimationFrame(a)}:function(a){return setTimeout(a,16)},cancel:"function"===typeof cancelAnimationFrame?function(a){return cancelAnimationFrame(a)}:clearTimeout},ub="undefined"!==typeof performance&&performance.now?function(){return performance.now()}:
function(){return+new Date},Qb=function(a,b){var c=1;b.ext_texture_filter_anisotropic&&(c=a.getParameter(34047));var d=1,f=1;b.webgl_draw_buffers&&(d=a.getParameter(34852),f=a.getParameter(36063));return{colorBits:[a.getParameter(3410),a.getParameter(3411),a.getParameter(3412),a.getParameter(3413)],depthBits:a.getParameter(3414),stencilBits:a.getParameter(3415),subpixelBits:a.getParameter(3408),extensions:Object.keys(b).filter(function(a){return!!b[a]}),maxAnisotropic:c,maxDrawbuffers:d,maxColorAttachments:f,
pointSizeDims:a.getParameter(33901),lineWidthDims:a.getParameter(33902),maxViewportDims:a.getParameter(3386),maxCombinedTextureUnits:a.getParameter(35661),maxCubeMapSize:a.getParameter(34076),maxRenderbufferSize:a.getParameter(34024),maxTextureUnits:a.getParameter(34930),maxTextureSize:a.getParameter(3379),maxAttributes:a.getParameter(34921),maxVertexUniforms:a.getParameter(36347),maxVertexTextureUnits:a.getParameter(35660),maxVaryingVectors:a.getParameter(36348),maxFragmentUniforms:a.getParameter(36349),
glsl:a.getParameter(35724),renderer:a.getParameter(7937),vendor:a.getParameter(7936),version:a.getParameter(7938)}},O=function(a){return a instanceof Uint8Array||a instanceof Uint16Array||a instanceof Uint32Array||a instanceof Int8Array||a instanceof Int16Array||a instanceof Int32Array||a instanceof Float32Array||a instanceof Float64Array||a instanceof Uint8ClampedArray},H=function(a){return Object.keys(a).map(function(b){return a[b]})},$a=J(8,function(){return[]}),x={alloc:fa,free:ab,allocType:function(a,
b){var c=null;switch(a){case 5120:c=new Int8Array(fa(b),0,b);break;case 5121:c=new Uint8Array(fa(b),0,b);break;case 5122:c=new Int16Array(fa(2*b),0,b);break;case 5123:c=new Uint16Array(fa(2*b),0,b);break;case 5124:c=new Int32Array(fa(4*b),0,b);break;case 5125:c=new Uint32Array(fa(4*b),0,b);break;case 5126:c=new Float32Array(fa(4*b),0,b);break;default:return null}return c.length!==b?c.subarray(0,b):c},freeType:function(a){ab(a.buffer)}},La={shape:function(a){for(var b=[];a.length;a=a[0])b.push(a.length);
return b},flatten:function(a,b,c,d){var f=1;if(b.length)for(var k=0;k<b.length;++k)f*=b[k];else f=0;c=d||x.allocType(c,f);switch(b.length){case 0:break;case 1:d=b[0];for(b=0;b<d;++b)c[b]=a[b];break;case 2:d=b[0];b=b[1];for(k=f=0;k<d;++k)for(var p=a[k],h=0;h<b;++h)c[f++]=p[h];break;case 3:bb(a,b[0],b[1],b[2],c,0);break;default:cb(a,b,0,c,0)}return c}},Ha={"[object Int8Array]":5120,"[object Int16Array]":5122,"[object Int32Array]":5124,"[object Uint8Array]":5121,"[object Uint8ClampedArray]":5121,"[object Uint16Array]":5123,
"[object Uint32Array]":5125,"[object Float32Array]":5126,"[object Float64Array]":5121,"[object ArrayBuffer]":5121},Qa={int8:5120,int16:5122,int32:5124,uint8:5121,uint16:5123,uint32:5125,"float":5126,float32:5126},hb={dynamic:35048,stream:35040,"static":35044},Pa=La.flatten,fb=La.shape,ga=[];ga[5120]=1;ga[5122]=2;ga[5124]=4;ga[5121]=1;ga[5123]=2;ga[5125]=4;ga[5126]=4;var Ra={points:0,point:0,lines:1,line:1,triangles:4,triangle:4,"line loop":2,"line strip":3,"triangle strip":5,"triangle fan":6},jb=
new Float32Array(1),Db=new Uint32Array(jb.buffer),Hb=[9984,9986,9985,9987],Ka=[0,6409,6410,6407,6408],R={};R[6409]=R[6406]=R[6402]=1;R[34041]=R[6410]=2;R[6407]=R[35904]=3;R[6408]=R[35906]=4;var Eb=Object.keys(Ha).concat(["[object HTMLCanvasElement]","[object CanvasRenderingContext2D]","[object HTMLImageElement]","[object HTMLVideoElement]"]),za=[];za[5121]=1;za[5126]=4;za[36193]=2;za[5123]=2;za[5125]=4;var C=[];C[32854]=2;C[32855]=2;C[36194]=2;C[34041]=4;C[33776]=.5;C[33777]=.5;C[33778]=1;C[33779]=
1;C[35986]=.5;C[35987]=1;C[34798]=1;C[35840]=.5;C[35841]=.25;C[35842]=.5;C[35843]=.25;C[36196]=.5;var L=[];L[32854]=2;L[32855]=2;L[36194]=2;L[33189]=2;L[36168]=1;L[34041]=4;L[35907]=4;L[34836]=16;L[34842]=8;L[34843]=6;var Rb=function(a,b,c,d,f){function k(a){this.id=r++;this.refCount=1;this.renderbuffer=a;this.format=32854;this.height=this.width=0;f.profile&&(this.stats={size:0})}function p(b){var c=b.renderbuffer;a.bindRenderbuffer(36161,null);a.deleteRenderbuffer(c);b.renderbuffer=null;b.refCount=
0;delete v[b.id];d.renderbufferCount--}var h={rgba4:32854,rgb565:36194,"rgb5 a1":32855,depth:33189,stencil:36168,"depth stencil":34041};b.ext_srgb&&(h.srgba=35907);b.ext_color_buffer_half_float&&(h.rgba16f=34842,h.rgb16f=34843);b.webgl_color_buffer_float&&(h.rgba32f=34836);var g=[];Object.keys(h).forEach(function(a){g[h[a]]=a});var r=0,v={};k.prototype.decRef=function(){0>=--this.refCount&&p(this)};f.profile&&(d.getTotalRenderbufferSize=function(){var a=0;Object.keys(v).forEach(function(b){a+=v[b].stats.size});
return a});return{create:function(b,c){function m(b,c){var d=0,l=0,k=32854;"object"===typeof b&&b?("shape"in b?(l=b.shape,d=l[0]|0,l=l[1]|0):("radius"in b&&(d=l=b.radius|0),"width"in b&&(d=b.width|0),"height"in b&&(l=b.height|0)),"format"in b&&(k=h[b.format])):"number"===typeof b?(d=b|0,l="number"===typeof c?c|0:d):b||(d=l=1);if(d!==e.width||l!==e.height||k!==e.format)return m.width=e.width=d,m.height=e.height=l,e.format=k,a.bindRenderbuffer(36161,e.renderbuffer),a.renderbufferStorage(36161,k,d,l),
f.profile&&(e.stats.size=L[e.format]*e.width*e.height),m.format=g[e.format],m}var e=new k(a.createRenderbuffer());v[e.id]=e;d.renderbufferCount++;m(b,c);m.resize=function(b,c){var d=b|0,g=c|0||d;if(d===e.width&&g===e.height)return m;m.width=e.width=d;m.height=e.height=g;a.bindRenderbuffer(36161,e.renderbuffer);a.renderbufferStorage(36161,e.format,d,g);f.profile&&(e.stats.size=L[e.format]*e.width*e.height);return m};m._reglType="renderbuffer";m._renderbuffer=e;f.profile&&(m.stats=e.stats);m.destroy=
function(){e.decRef()};return m},clear:function(){H(v).forEach(p)},restore:function(){H(v).forEach(function(b){b.renderbuffer=a.createRenderbuffer();a.bindRenderbuffer(36161,b.renderbuffer);a.renderbufferStorage(36161,b.format,b.width,b.height)});a.bindRenderbuffer(36161,null)}}},ob=[];ob[6408]=4;var Ma=[];Ma[5121]=1;Ma[5126]=4;Ma[36193]=2;var Da=["x","y","z","w"],Pb="blend.func blend.equation stencil.func stencil.opFront stencil.opBack sample.coverage viewport scissor.box polygonOffset.offset".split(" "),
Fa={0:0,1:1,zero:0,one:1,"src color":768,"one minus src color":769,"src alpha":770,"one minus src alpha":771,"dst color":774,"one minus dst color":775,"dst alpha":772,"one minus dst alpha":773,"constant color":32769,"one minus constant color":32770,"constant alpha":32771,"one minus constant alpha":32772,"src alpha saturate":776},Ua={never:512,less:513,"<":513,equal:514,"=":514,"==":514,"===":514,lequal:515,"<=":515,greater:516,">":516,notequal:517,"!=":517,"!==":517,gequal:518,">=":518,always:519},
Oa={0:0,zero:0,keep:7680,replace:7681,increment:7682,decrement:7683,"increment wrap":34055,"decrement wrap":34056,invert:5386},rb={cw:2304,ccw:2305},sb=new Y(!1,!1,!1,function(){}),Sb=function(a,b){function c(){this.endQueryIndex=this.startQueryIndex=-1;this.sum=0;this.stats=null}function d(a,b,d){var e=h.pop()||new c;e.startQueryIndex=a;e.endQueryIndex=b;e.sum=0;e.stats=d;g.push(e)}var f=b.ext_disjoint_timer_query;if(!f)return null;var k=[],p=[],h=[],g=[],r=[],v=[];return{beginQuery:function(a){var b=
k.pop()||f.createQueryEXT();f.beginQueryEXT(35007,b);p.push(b);d(p.length-1,p.length,a)},endQuery:function(){f.endQueryEXT(35007)},pushScopeStats:d,update:function(){var a,b;a=p.length;if(0!==a){v.length=Math.max(v.length,a+1);r.length=Math.max(r.length,a+1);r[0]=0;var c=v[0]=0;for(b=a=0;b<p.length;++b){var e=p[b];f.getQueryObjectEXT(e,34919)?(c+=f.getQueryObjectEXT(e,34918),k.push(e)):p[a++]=e;r[b+1]=c;v[b+1]=a}p.length=a;for(b=a=0;b<g.length;++b){var c=g[b],d=c.startQueryIndex,e=c.endQueryIndex;
c.sum+=r[e]-r[d];d=v[d];e=v[e];e===d?(c.stats.gpuTime+=c.sum/1E6,h.push(c)):(c.startQueryIndex=d,c.endQueryIndex=e,g[a++]=c)}g.length=a}},getNumPendingQueries:function(){return p.length},clear:function(){k.push.apply(k,p);for(var a=0;a<k.length;a++)f.deleteQueryEXT(k[a]);p.length=0;k.length=0},restore:function(){p.length=0;k.length=0}}};return function(a){function b(){if(0===E.length)x&&x.update(),ba=null;else{ba=Va.next(b);v();for(var a=E.length-1;0<=a;--a){var c=E[a];c&&c(M,null,0)}m.flush();x&&
x.update()}}function c(){!ba&&0<E.length&&(ba=Va.next(b))}function d(){ba&&(Va.cancel(b),ba=null)}function f(a){a.preventDefault();d();S.forEach(function(a){a()})}function k(a){m.getError();n.restore();N.restore();G.restore();z.restore();L.restore();I.restore();x&&x.restore();T.procs.refresh();c();U.forEach(function(a){a()})}function p(a){function b(a){var c={},d={};Object.keys(a).forEach(function(b){var e=a[b];ia.isDynamic(e)?d[b]=ia.unbox(e,b):c[b]=e});return{dynamic:d,"static":c}}function c(a){for(;m.length<
a;)m.push(null);return m}var d=b(a.context||{}),e=b(a.uniforms||{}),f=b(a.attributes||{}),g=b(function(a){function b(a){if(a in c){var d=c[a];delete c[a];Object.keys(d).forEach(function(b){c[a+"."+b]=d[b]})}}var c=A({},a);delete c.uniforms;delete c.attributes;delete c.context;"stencil"in c&&c.stencil.op&&(c.stencil.opBack=c.stencil.opFront=c.stencil.op,delete c.stencil.op);b("blend");b("depth");b("cull");b("stencil");b("polygonOffset");b("scissor");b("sample");return c}(a));a={gpuTime:0,cpuTime:0,
count:0};var d=T.compile(g,f,e,d,a),h=d.draw,k=d.batch,l=d.scope,m=[];return A(function(a,b){var d;if("function"===typeof a)return l.call(this,null,a,0);if("function"===typeof b)if("number"===typeof a)for(d=0;d<a;++d)l.call(this,null,b,d);else if(Array.isArray(a))for(d=0;d<a.length;++d)l.call(this,a[d],b,d);else return l.call(this,a,b,0);else if("number"===typeof a){if(0<a)return k.call(this,c(a|0),a|0)}else if(Array.isArray(a)){if(a.length)return k.call(this,a,a.length)}else return h.call(this,a)},
{stats:a})}function h(a,b){var c=0;T.procs.poll();var d=b.color;d&&(m.clearColor(+d[0]||0,+d[1]||0,+d[2]||0,+d[3]||0),c|=16384);"depth"in b&&(m.clearDepth(+b.depth),c|=256);"stencil"in b&&(m.clearStencil(b.stencil|0),c|=1024);m.clear(c)}function g(a){E.push(a);c();return{cancel:function(){function b(){var a=tb(E,b);E[a]=E[E.length-1];--E.length;0>=E.length&&d()}var c=tb(E,a);E[c]=b}}}function r(){var a=O.viewport,b=O.scissor_box;a[0]=a[1]=b[0]=b[1]=0;M.viewportWidth=M.framebufferWidth=M.drawingBufferWidth=
a[2]=b[2]=m.drawingBufferWidth;M.viewportHeight=M.framebufferHeight=M.drawingBufferHeight=a[3]=b[3]=m.drawingBufferHeight}function v(){M.tick+=1;M.time=u();r();T.procs.poll()}function l(){r();T.procs.refresh();x&&x.update()}function u(){return(ub()-C)/1E3}a=zb(a);if(!a)return null;var m=a.gl,e=m.getContextAttributes();m.isContextLost();var n=Ab(m,a);if(!n)return null;var D=wb(),w={bufferCount:0,elementsCount:0,framebufferCount:0,shaderCount:0,textureCount:0,cubeCount:0,renderbufferCount:0,maxTextureUnits:0},
t=n.extensions,x=Sb(m,t),C=ub(),B=m.drawingBufferWidth,J=m.drawingBufferHeight,M={tick:0,time:0,viewportWidth:B,viewportHeight:J,framebufferWidth:B,framebufferHeight:J,drawingBufferWidth:B,drawingBufferHeight:J,pixelRatio:a.pixelRatio},P=Qb(m,t),G=Bb(m,w,a),Q=Cb(m,t,G,w),B=Kb(m,t,P,G,D),N=Lb(m,D,w,a),z=Fb(m,t,P,function(){T.procs.poll()},M,w,a),L=Rb(m,t,P,w,a),I=Jb(m,t,P,z,L,w),T=Ob(m,D,t,P,G,Q,z,I,{},B,N,{elements:null,primitive:4,count:-1,offset:0,instances:-1},M,x,a),D=Mb(m,I,T.procs.poll,M,e,
t),O=T.next,H=m.canvas,E=[],S=[],U=[],R=[a.onDestroy],ba=null;H&&(H.addEventListener("webglcontextlost",f,!1),H.addEventListener("webglcontextrestored",k,!1));var Y=I.setFBO=p({framebuffer:ia.define.call(null,1,"framebuffer")});l();e=A(p,{clear:function(a){if("framebuffer"in a)if(a.framebuffer&&"framebufferCube"===a.framebuffer_reglType)for(var b=0;6>b;++b)Y(A({framebuffer:a.framebuffer.faces[b]},a),h);else Y(a,h);else h(null,a)},prop:ia.define.bind(null,1),context:ia.define.bind(null,2),"this":ia.define.bind(null,
3),draw:p({}),buffer:function(a){return G.create(a,34962,!1,!1)},elements:function(a){return Q.create(a,!1)},texture:z.create2D,cube:z.createCube,renderbuffer:L.create,framebuffer:I.create,framebufferCube:I.createCube,attributes:e,frame:g,on:function(a,b){var c;switch(a){case "frame":return g(b);case "lost":c=S;break;case "restore":c=U;break;case "destroy":c=R}c.push(b);return{cancel:function(){for(var a=0;a<c.length;++a)if(c[a]===b){c[a]=c[c.length-1];c.pop();break}}}},limits:P,hasExtension:function(a){return 0<=
P.extensions.indexOf(a.toLowerCase())},read:D,destroy:function(){E.length=0;d();H&&(H.removeEventListener("webglcontextlost",f),H.removeEventListener("webglcontextrestored",k));N.clear();I.clear();L.clear();z.clear();Q.clear();G.clear();x&&x.clear();R.forEach(function(a){a()})},_gl:m,_refresh:l,poll:function(){v();x&&x.update()},now:u,stats:w});a.onDone(null,e);return e}});

},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
(function(window) {
	var YouTubeIframeLoader = {
		src: 'https://www.youtube.com/iframe_api',
		loading: false,
		loaded: false,
		listeners: [],

		load: function(callback) {
			var _this = this;
			this.listeners.push(callback);

			if(this.loaded) {
				setTimeout(function() {
					_this.done();
				});
				return;
			}

			if(this.loading) {
				return;
			}

			this.loading = true;

			window.onYouTubeIframeAPIReady = function() {
				_this.loaded = true;
				_this.done();
			};

			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = this.src;
			document.body.appendChild(script);
		},

		done: function() {
			delete window.onYouTubeIframeAPIReady;

			while(this.listeners.length) {
				this.listeners.pop()(window.YT);
			}
		}
	};

	if(typeof module !== 'undefined' && module.exports) {
		module.exports = YouTubeIframeLoader;
	} else {
		window.YouTubeIframeLoader = YouTubeIframeLoader;
	}
}(window));

},{}],12:[function(require,module,exports){
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

var AutoplayBehavior = function (_Behavior) {
	_inherits(AutoplayBehavior, _Behavior);

	function AutoplayBehavior() {
		_classCallCheck(this, AutoplayBehavior);

		return _possibleConstructorReturn(this, (AutoplayBehavior.__proto__ || Object.getPrototypeOf(AutoplayBehavior)).apply(this, arguments));
	}

	_createClass(AutoplayBehavior, [{
		key: 'behaviorDidAttach',
		value: function behaviorDidAttach() {
			var video = this.el.querySelector('video');

			this.listen('layout:viewport:enter', function () {
				video.play();
			});

			this.listen('layout:viewport:leave', function () {
				video.pause();
			});
		}
	}], [{
		key: 'behaviorSchema',
		get: function get() {
			return {};
		}
	}, {
		key: 'behaviorName',
		get: function get() {
			return 'autoplay';
		}
	}, {
		key: 'behaviorDependencies',
		get: function get() {
			return ['layout'];
		}
	}]);

	return AutoplayBehavior;
}(_Behavior3.default);

exports.default = AutoplayBehavior;

},{"behaviors/Behavior.js":13}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _camelCase = require('lib/camelCase.js');

var _camelCase2 = _interopRequireDefault(_camelCase);

var _CustomEvent = require('ponies/CustomEvent.js');

var _CustomEvent2 = _interopRequireDefault(_CustomEvent);

var _cssProps = require('lib/cssProps.js');

var _cssProps2 = _interopRequireDefault(_cssProps);

var _schemaParser = require('lib/schemaParser.js');

var _schemaParser2 = _interopRequireDefault(_schemaParser);

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

	function Behavior(element, contentElement, rawPropertiesList) {
		_classCallCheck(this, Behavior);

		var behaviorName = this.constructor.behaviorName;
		element[behaviorName] = this;
		element[(0, _camelCase2.default)(behaviorName)] = this;
		element.behaviors[behaviorName] = this;

		this.hasNotifiedAtLeastOnce = false;
		this.el = element;

		//contentEl and parentEl only make sense for element-behaviors (not globals).
		this.contentEl = contentElement;
		this.parentEl = element.parentElement;

		this.props = {};

		this._shadowChildren = [];

		this._proxyCSS();
		this._proxyProps();
		this._parseProperties(rawPropertiesList);

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

			if (this._mutationObservers) {
				for (var _i2 = 0; _i2 < this._mutationObservers.length; _i2++) {
					var observer = this._mutationObservers[_i2];
					observer.disconnect();
				}
			}

			if (this._mutationObserverHandle) {
				_raf2.default.cancel(this._mutationObserverHandle);
			}

			this._unproxyCSS();

			this.emit('detach');

			var behaviorName = this.constructor.behaviorName;
			delete this.el[behaviorName];
			delete this.el[(0, _camelCase2.default)(behaviorName)];
			delete this.el.behaviors[behaviorName];
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

				notifyCallback(behavior);

				if (connectedCallback) {
					connectedCallback(behavior);
				}
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
		key: 'observeMutations',
		value: function observeMutations(attributes, callback) {
			var _this2 = this;

			if (arguments.length === 1) {
				callback = attributes;
				attributes = [];
			}

			var debouncedCallback = function debouncedCallback() {
				if (!_this2._mutationObserverHandle) {
					_this2._mutationObserverHandle = (0, _raf2.default)(function () {
						callback();
						delete _this2._mutationObserverHandle;
					});
				}
			};

			if (!window.MutationObserver) {
				this.listen(this.contentEl, 'DOMSubtreeModified', debouncedCallback);
				return;
			}

			var config = {
				attributes: true,
				childList: true,
				subtree: true,
				characterData: true,
				attributeFilter: attributes
			};

			var observer = new MutationObserver(debouncedCallback);

			observer.observe(this.contentEl, config);

			if (!this._mutationObservers) {
				this._mutationObservers = [];
			}

			this._mutationObservers.push(observer);
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

			if (properties instanceof Array) {
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
		key: '_proxyCSS',
		value: function _proxyCSS() {
			var behaviorName = this.constructor.behaviorName;
			var element = this.el;
			var contentEl = this.contentEl;

			var style = this.style = Object.create(null);
			var contentStyle = this.contentStyle = Object.create(null);

			var _loop = function _loop(i) {
				var name = _cssProps2.default[i];

				Object.defineProperty(style, name, {
					set: function set(value) {
						if (value === '') {
							element.resetBehaviorStyle(behaviorName, name);
						} else {
							element.setBehaviorStyle(behaviorName, name, value);
						}
					}
				});

				Object.defineProperty(contentStyle, name, {
					set: function set(value) {
						if (value === '') {
							contentEl.resetBehaviorStyle(behaviorName, name);
						} else {
							contentEl.setBehaviorStyle(behaviorName, name, value);
						}
					}
				});
			};

			for (var i = 0; i < _cssProps2.default.length; i++) {
				_loop(i);
			}
		}
	}, {
		key: '_unproxyCSS',
		value: function _unproxyCSS() {
			var behaviorName = this.constructor.behaviorName;

			this.el.resetBehaviorStyles(behaviorName);

			if (this.contentEl) {
				this.contentEl.resetBehaviorStyles(behaviorName);
			}
		}
	}, {
		key: '_proxyProps',
		value: function _proxyProps() {
			var _this3 = this;

			var schema = this.constructor.behaviorSchema;

			var _loop2 = function _loop2(property) {
				if (schema.hasOwnProperty(property)) {
					Object.defineProperty(_this3, property, {
						get: function get() {
							return _schemaParser2.default.stringifyProperty(this.el, this.props[property], schema[property].type);
						},
						set: function set(value) {
							//TODO: to make this compatible with conditions, push these to an array at the end of the list.
							//This way they get applied after all the met conditions.
							this._updateProperty(property, value);
						}
					});
				}
			};

			for (var property in schema) {
				_loop2(property);
			}
		}
	}, {
		key: '_parseProperties',
		value: function _parseProperties(rawPropertiesList) {
			var schema = this.constructor.behaviorSchema;

			try {
				_schemaParser2.default.parseProperties(this.el, schema, rawPropertiesList, this.props);
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

},{"lib/camelCase.js":47,"lib/cssProps.js":48,"lib/schemaParser.js":53,"object-assign":3,"ponies/CustomEvent.js":54,"raf":6}],14:[function(require,module,exports){
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

var CSSBehavior = function (_Behavior) {
	_inherits(CSSBehavior, _Behavior);

	function CSSBehavior() {
		_classCallCheck(this, CSSBehavior);

		return _possibleConstructorReturn(this, (CSSBehavior.__proto__ || Object.getPrototypeOf(CSSBehavior)).apply(this, arguments));
	}

	_createClass(CSSBehavior, [{
		key: 'addClass',
		value: function addClass(name) {
			if (this.el.classList) {
				this.el.classList.add(name);
			} else {
				this.el.className = this.el.className + ' ' + name;
			}
		}
	}, {
		key: 'removeClass',
		value: function removeClass(name) {
			if (this.el.classList) {
				this.el.classList.remove(name);
			} else {
				this.el.className = this.el.className.replace(new RegExp('(?:^|\\s)' + name + '(?!\\S)'), '');
			}
		}
	}, {
		key: 'onSignal',
		value: function onSignal(signal, data) {
			switch (signal) {
				case 'add':
					this.addClass(data);
					break;
				case 'remove':
					this.removeClass(data);
					break;
				default:
					this.error(new Error('Received an unknown signal "' + signal + '".'));
					break;
			}
		}
	}], [{
		key: 'behaviorSchema',
		get: function get() {
			return {};
		}
	}, {
		key: 'behaviorName',
		get: function get() {
			return 'css';
		}
	}, {
		key: 'behaviorDependencies',
		get: function get() {
			return [];
		}
	}]);

	return CSSBehavior;
}(_Behavior3.default);

exports.default = CSSBehavior;

},{"behaviors/Behavior.js":13}],15:[function(require,module,exports){
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
			this._guidesWrapper.style.cssText = '\n\t\t\tposition: fixed;\n\t\t\tleft: 0;\n\t\t\ttop: 0;\n\t\t\tz-index: 1;\n\t\t\twidth: 100%;\n\t\t\theight: 100%;\n\t\t\tpointer-events: none;\n\t\t';

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

},{"behaviors/Behavior.js":13}],16:[function(require,module,exports){
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
				_this2.style.opacity = 1;
			});
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

},{"behaviors/Behavior.js":13}],17:[function(require,module,exports){
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

var FakeScrollBehavior = function (_Behavior) {
	_inherits(FakeScrollBehavior, _Behavior);

	function FakeScrollBehavior() {
		_classCallCheck(this, FakeScrollBehavior);

		return _possibleConstructorReturn(this, (FakeScrollBehavior.__proto__ || Object.getPrototypeOf(FakeScrollBehavior)).apply(this, arguments));
	}

	_createClass(FakeScrollBehavior, [{
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
				this.style.height = 0;
			} else {
				this.style.height = Math.round(requiredHeight) + 'px';
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
					default: isAppleiOS ? 'true' : 'false'
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

	return FakeScrollBehavior;
}(_Behavior3.default);

exports.default = FakeScrollBehavior;

},{"behaviors/Behavior.js":13,"lib/ScrollState.js":46,"lib/easings.js":49,"lib/fakeClick.js":50,"lib/isTextInput.js":52,"raf":6,"scroll-logic":9}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Behavior2 = require('behaviors/Behavior.js');

var _Behavior3 = _interopRequireDefault(_Behavior2);

var _fontSizeWidthRatio = require('lib/fontSizeWidthRatio.js');

var _fontSizeWidthRatio2 = _interopRequireDefault(_fontSizeWidthRatio);

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

			if (this.contentEl.children.length !== 1) {
				this.error(new Error('The fluidtext behavior expects a single child element. We recommend an <h1>, since the behavior is suited best for headlines.'));
			}

			this.contentStyle.whiteSpace = 'nowrap';

			this.connectTo('layout', this._render.bind(this), function (layoutBehavior) {
				_this2.observeMutations(_this2._render.bind(_this2, layoutBehavior, true));
			});
		}
	}, {
		key: '_render',
		value: function _render(layoutBehavior) {
			var forceUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			if (forceUpdate || !this._fontSizeWidthRatio) {
				this._fontSizeWidthRatio = (0, _fontSizeWidthRatio2.default)(this.contentEl);
			}

			this.contentStyle.fontSize = this._fontSizeWidthRatio * layoutBehavior.layout.width + 'px';

			this.notify();
		}
	}], [{
		key: 'behaviorSchema',
		get: function get() {
			return {};
		}
	}, {
		key: 'behaviorName',
		get: function get() {
			return 'fluid-text';
		}
	}, {
		key: 'behaviorDependencies',
		get: function get() {
			return ['layout'];
		}
	}]);

	return FadeInBehavior;
}(_Behavior3.default);

exports.default = FadeInBehavior;

},{"behaviors/Behavior.js":13,"lib/fontSizeWidthRatio.js":51}],19:[function(require,module,exports){
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

var createRegl = void 0;

try {
	createRegl = require('regl');
} catch (ignore) {
	createRegl = null;
}

var GLEffectBehavior = function (_Behavior) {
	_inherits(GLEffectBehavior, _Behavior);

	function GLEffectBehavior() {
		_classCallCheck(this, GLEffectBehavior);

		return _possibleConstructorReturn(this, (GLEffectBehavior.__proto__ || Object.getPrototypeOf(GLEffectBehavior)).apply(this, arguments));
	}

	_createClass(GLEffectBehavior, [{
		key: 'behaviorDidAttach',
		value: function behaviorDidAttach() {
			var _this2 = this;

			if (!createRegl) {
				return;
			}

			this._sourceElement = this.el.querySelector('img, video');
			this._canvas = this._createCanvas();

			if (!this._initRegl()) {
				this._removeCanvas();
				return;
			}

			this.connectTo('layout', this._resize.bind(this));
			this.connectTo('interpolate', this._render.bind(this), function () {
				//This updates the texture in addition to the render loop.
				//It catches stuff like onload for images and updates videos that are currently playing (even if you're not scrolling).
				_this2._pollTimer = setInterval(_this2._pollSource.bind(_this2, true), 1000 / 30);
			});
		}
	}, {
		key: 'update',
		value: function update() {
			this._initRegl();
		}
	}, {
		key: 'behaviorWillDetach',
		value: function behaviorWillDetach() {
			if (!createRegl) {
				return;
			}

			clearInterval(this._pollTimer);
			this._regl.destroy();
		}
	}, {
		key: '_createCanvas',
		value: function _createCanvas() {
			var canvas = document.createElement('canvas');

			this.appendChild(canvas);

			return canvas;
		}
	}, {
		key: '_removeCanvas',
		value: function _removeCanvas() {
			this.removeChild(this._canvas);
		}
	}, {
		key: '_resize',
		value: function _resize(_ref) {
			var layout = _ref.layout;

			this._canvas.width = layout.width;
			this._canvas.height = layout.height;
			this._canvas.style.cssText = this._sourceElement.style.cssText;
			this._canvas.style.pointerEvents = 'none';
		}
	}, {
		key: '_initRegl',
		value: function _initRegl() {
			var regl = this._regl;

			if (!regl) {
				try {
					regl = createRegl({
						canvas: this._canvas,
						attributes: {
							depth: false
						}
					});
				} catch (ignore) {
					createRegl = null;
					return false;
				}

				this._regl = regl;
			}

			this._draw = regl({
				frag: this.props.shader.template,
				vert: '\n\t\t\t\tprecision mediump float;\n\n\t\t\t\tattribute vec2 position;\n\n\t\t\t\tvarying vec2 uv;\n\n\t\t\t\tvoid main () {\n\t\t\t\t\tuv = vec2(1.0 - position.x, position.y);\n\t\t\t\t\tgl_Position = vec4(1.0 - 2.0 * position, 0, 1);\n\t\t\t\t}\n\t\t\t',

				attributes: {
					position: [-2, 0, 0, -2, 2, 2]
				},

				uniforms: {
					image: regl.prop('image'),
					progress: regl.prop('progress'),
					size: regl.prop('size')
				},

				count: 3
			});

			return true;
		}
	}, {
		key: '_sourceIsReady',
		value: function _sourceIsReady() {
			if (this._sourceElement.tagName === 'IMG') {
				return this._sourceElement.complete && this._sourceElement.naturalWidth > 0;
			}

			if (this._sourceElement.tagName === 'VIDEO') {
				return this._sourceElement.readyState >= 2 && !this._sourceElement.seeking;
			}

			return false;
		}
	}, {
		key: '_getSourceIdentifier',
		value: function _getSourceIdentifier() {
			if (this._sourceElement.tagName === 'IMG') {
				return this._sourceElement.src;
			}

			if (this._sourceElement.tagName === 'VIDEO') {
				return [this._sourceElement.src, this._sourceElement.currentTime].join(';');
			}
		}
	}, {
		key: '_pollSource',
		value: function _pollSource() {
			var render = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

			var sourceIdentifier = this._getSourceIdentifier();

			//The source has changed.
			if (this._sourceIsReady() && sourceIdentifier !== this._sourceIdentifier) {
				this._sourceIdentifier = sourceIdentifier;
				this._updateTexture(render);

				if (render) {
					this._render(this.el.interpolate);
				}
			}
		}
	}, {
		key: '_updateTexture',
		value: function _updateTexture() {
			if (this._texture) {
				this._texture.destroy();
				this._texture = null;
			}

			//This mainly catches IE 11, which does not support <video> textures at all
			//Will also catch cases where CORS is not supported or configured.
			try {
				//TODO: The texture uses the unscaled image which makes swirl effect looks hella unantialiased.
				this._texture = this._regl.texture(this._sourceElement);
			} catch (err) {
				//TODO: should we do something with the error or just let it happen every frame?
				//Maybe only do something when the source changes.
				return;
			}
		}
	}, {
		key: '_render',
		value: function _render(interpolateBehavior) {
			this._pollSource();

			if (!this._texture) {
				return;
			}

			this._regl.poll();

			this._draw({
				image: this._texture,
				progress: interpolateBehavior.values.progress,
				size: [this._canvas.width, this._canvas.height]
			});

			this.notify();
		}
	}], [{
		key: 'behaviorSchema',
		get: function get() {
			return {
				shader: {
					type: 'template',
					default: 'auto'
				}
			};
		}
	}, {
		key: 'behaviorName',
		get: function get() {
			return 'gl-effect';
		}
	}, {
		key: 'behaviorDependencies',
		get: function get() {
			return ['layout', 'interpolate', 'media'];
		}
	}]);

	return GLEffectBehavior;
}(_Behavior3.default);

exports.default = GLEffectBehavior;

},{"behaviors/Behavior.js":13,"regl":7}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _linearPartitioning = require('linear-partitioning');

var _linearPartitioning2 = _interopRequireDefault(_linearPartitioning);

var _Behavior2 = require('behaviors/Behavior.js');

var _Behavior3 = _interopRequireDefault(_Behavior2);

var _LayoutBehavior = require('behaviors/LayoutBehavior.js');

var _LayoutBehavior2 = _interopRequireDefault(_LayoutBehavior);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GalleryBehavior = function (_Behavior) {
	_inherits(GalleryBehavior, _Behavior);

	function GalleryBehavior() {
		_classCallCheck(this, GalleryBehavior);

		return _possibleConstructorReturn(this, (GalleryBehavior.__proto__ || Object.getPrototypeOf(GalleryBehavior)).apply(this, arguments));
	}

	_createClass(GalleryBehavior, [{
		key: 'behaviorDidAttach',
		value: function behaviorDidAttach() {
			var _this2 = this;

			this._collectItems();

			this.connectTo('layout', this._render.bind(this), function (layoutBehavior) {
				_this2.observeMutations(['src', 'width', 'height'], function () {
					_this2._collectItems();
					_this2._render(layoutBehavior);
				});
			});
		}
	}, {
		key: '_collectItems',
		value: function _collectItems() {
			this._items = Array.prototype.slice.call(this.el.querySelectorAll('img[width][height]')).map(function (image) {
				return {
					image: image,
					ratio: image.getAttribute('width') / image.getAttribute('height')
				};
			});
		}

		//TODO: cleanup the img styles when detached

	}, {
		key: '_render',
		value: function _render(layoutBehavior) {
			var layoutEngine = this.parentEl.guidesLayout.engine;
			var viewport = layoutEngine.viewport;

			var spacing = layoutEngine.lengthToPixel(this.props.spacing, 0);
			var height = layoutEngine.lengthToPixel(this.props.height, viewport.height);
			var minHeight = layoutEngine.lengthToPixel(this.props.minHeight, viewport.height);
			var availableWidth = layoutBehavior.layout.width;
			var targetHeight = Math.max(minHeight, height);
			var totalWidth = this._items.reduce(function (sum, _ref) {
				var ratio = _ref.ratio;

				return sum + ratio * targetHeight;
			}, 0);
			var rows = Math.max(1, Math.round(totalWidth / availableWidth));
			var layout = this._balancedLayout(this._items, availableWidth, rows, spacing);

			this.contentStyle.height = layout.requiredHeight + 'px';

			for (var i = 0; i < layout.items.length; i++) {
				var imageLayout = layout.items[i];
				var style = imageLayout.image.style;

				style.position = 'absolute';
				style.left = style.top = '0px';
				//style.transition = 'width 0.3s ease-in-out, height 0.3s ease-in-out, transform 0.3s ease-in-out';
				style.width = imageLayout.width + 'px';
				style.height = imageLayout.height + 'px';
				// $FlowFixMe: WebkitTransform and msTransform are missing in CSSStyleDeclaration
				style.transform = style.WebkitTransform = style.msTransform = 'translate(' + imageLayout.left + 'px, ' + imageLayout.top + 'px)';
			}
		}

		//Inspired by https://medium.com/@jtreitz/the-algorithm-for-a-perfectly-balanced-photo-gallery-914c94a5d8af

	}, {
		key: '_balancedLayout',
		value: function _balancedLayout(items, availableWidth, rows, spacing) {
			var weights = items.map(function (a) {
				return a.ratio;
			});
			var partition = (0, _linearPartitioning2.default)(weights, Math.min(items.length, rows));
			var imageLayouts = [];
			var imageIndexOffset = 0;
			var topOffset = spacing;

			partition.forEach(function (row) {
				var itemsForThisRow = items.slice(imageIndexOffset, imageIndexOffset + row.length);
				var summedRatios = itemsForThisRow.reduce(function (sum, _ref2) {
					var ratio = _ref2.ratio;

					return sum + ratio;
				}, 0);
				var rowHeight = (availableWidth - (row.length + 1) * spacing) / summedRatios;
				var leftOffset = spacing;

				itemsForThisRow.forEach(function (image) {
					var width = rowHeight * image.ratio;

					//TODO: reuse the this._items array and objects.
					imageLayouts.push({
						image: image.image,
						width: Math.round(width),
						height: Math.round(rowHeight),
						left: Math.round(leftOffset),
						top: Math.round(topOffset)
					});

					leftOffset = leftOffset + width + spacing;
				});

				topOffset = topOffset + rowHeight + spacing;

				imageIndexOffset = imageIndexOffset + row.length;
			});

			return {
				requiredHeight: Math.round(topOffset),
				items: imageLayouts
			};
		}
	}], [{
		key: 'behaviorSchema',
		get: function get() {
			return {
				spacing: {
					type: 'csslength',
					default: '1vmin'
				},
				height: {
					type: 'csslength',
					default: '33vh'
				},
				minHeight: {
					type: 'csslength',
					default: '150px'
				}
			};
		}
	}, {
		key: 'behaviorName',
		get: function get() {
			return 'gallery';
		}
	}, {
		key: 'behaviorDependencies',
		get: function get() {
			return ['layout'];
		}
	}]);

	return GalleryBehavior;
}(_Behavior3.default);

exports.default = GalleryBehavior;

},{"behaviors/Behavior.js":13,"behaviors/LayoutBehavior.js":24,"linear-partitioning":2}],21:[function(require,module,exports){
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
				var changed = _this2.engine.updateViewport(viewport);

				if (changed) {
					_this2._scheduleLayout();
				}
			});

			//Whenever a new layout behavior is attached or changed, we need to do layout.
			this.listen('layout:attach layout:detach layout:update layout:heightchange', this._scheduleLayout.bind(this));
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
			if (!this._viewportSizeElement) {
				this._viewportSizeElement = document.createElement('div');
				this._viewportSizeElement.style.cssText = '\n\t\t\t\twidth: 100vw;\n\t\t\t\theight: 100vh;\n\t\t\t\tposition: fixed;\n\t\t\t\tleft: -100vw;\n\t\t\t\ttop: -100vh;\n\t\t\t\tpointer-events: none;\n\t\t\t\tvisibility: hidden;\n\t\t\t\topacity: 0;\n\t\t\t\tz-index: -1;';
				this.appendChild(this._viewportSizeElement);
			}

			var box = this._viewportSizeElement.getBoundingClientRect();
			var outerWidth = box.width;
			var width = outerWidth - this._getScrollbarWidth();
			var height = box.height;
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

			var nodes = Array.prototype.slice.call(this.el.querySelectorAll('[layout]')).filter(function (el) {
				return !!el.behaviors.layout;
			}).map(function (el) {
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

},{"behaviors/Behavior.js":13,"lib/GuidesLayoutEngine.js":45,"raf":6}],22:[function(require,module,exports){
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

var HashNavigationBehavior = function (_Behavior) {
	_inherits(HashNavigationBehavior, _Behavior);

	function HashNavigationBehavior() {
		_classCallCheck(this, HashNavigationBehavior);

		return _possibleConstructorReturn(this, (HashNavigationBehavior.__proto__ || Object.getPrototypeOf(HashNavigationBehavior)).apply(this, arguments));
	}

	_createClass(HashNavigationBehavior, [{
		key: 'behaviorDidAttach',
		value: function behaviorDidAttach() {
			this.listen('click', this._handleClick.bind(this));
		}
	}, {
		key: '_handleClick',
		value: function _handleClick(e) {
			//Only handle left click.
			if (e.which !== 1 && e.button !== 0) {
				return;
			}

			var link = this._findParentLink(e.target);

			//The click did not happen inside a link.
			if (!link) {
				return;
			}

			if (this._handleLink(link)) {
				e.preventDefault();
			}
		}
	}, {
		key: '_findParentLink',
		value: function _findParentLink(element) {
			//We reached the top, no link found.
			if (element === document || !element) {
				return null;
			}

			//Yay, it's a link!
			if (element.tagName.toUpperCase() === 'A') {
				return element;
			}

			//Maybe the parent is a link.
			return this._findParentLink(element.parentElement);
		}
	}, {
		key: '_handleLink',
		value: function _handleLink(link) {
			if (link.hash.length < 2) {
				return false;
			}

			//The link points to something completely different.
			if (link.hostname !== window.location.hostname) {
				return false;
			}

			//The link does not link to the same page/path.
			if (link.pathname !== window.location.pathname) {
				return false;
			}

			var scrollTarget = document.getElementById(link.hash.substr(1));

			//Ignore the click if no target is found.
			if (!scrollTarget) {
				return false;
			}

			//The target needs the layout behavior or else we don't know where it is.
			if (!scrollTarget.hasAttribute('layout') || !scrollTarget.layout) {
				return false;
			}

			var layoutBehavior = scrollTarget.layout;
			var layout = layoutBehavior.layout;
			var engine = this.el.guidesLayout.engine;
			var offset = engine.lengthToPixel(this.props.offset, layout.height);
			var targetTop = engine.calculateAnchorPosition(layoutBehavior, this.props.anchor, -offset);

			this.el.scroll.scrollTo(targetTop, true);

			return true;
		}
	}], [{
		key: 'behaviorSchema',
		get: function get() {
			return {
				anchor: {
					type: 'string',
					enum: ['top', 'center', 'bottom'],
					default: 'top'
				},
				offset: {
					type: 'csslength',
					default: '0'
				}
			};
		}
	}, {
		key: 'behaviorName',
		get: function get() {
			return 'hash-navigation';
		}
	}, {
		key: 'behaviorDependencies',
		get: function get() {
			return ['guides-layout', 'scroll'];
		}
	}]);

	return HashNavigationBehavior;
}(_Behavior3.default);

exports.default = HashNavigationBehavior;

},{"behaviors/Behavior.js":13}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _Behavior2 = require('behaviors/Behavior.js');

var _Behavior3 = _interopRequireDefault(_Behavior2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Parameters are a comma separated list of keyframes.
//A keyframe is defined by a position inside the viewport and a value.
//E.g. "alpha: top 1, bottom 0;" would set the alpha parameter to 1
//when the top is aligned with the top of the viewport and to 0 when the bottoms are aligned.
//The values inbetween are interpolated, hence the name of the behavior.
var keyframesSchema = {
	type: [[{ anchor: 'string' }, { offset: 'csslength' }, { value: 'number' }]],
	expand: function expand(rawProperties) {
		if (rawProperties.length === 1) {
			//Default offset to 0 and value to 1.
			rawProperties.push('0', '1');
			return true;
		} else if (rawProperties.length === 2) {
			//Default offset to 0.
			rawProperties.splice(1, 0, '0');
			return true;
		}

		return false;
	},
	default: ''
};

var InterpolateBehavior = function (_Behavior) {
	_inherits(InterpolateBehavior, _Behavior);

	function InterpolateBehavior() {
		_classCallCheck(this, InterpolateBehavior);

		return _possibleConstructorReturn(this, (InterpolateBehavior.__proto__ || Object.getPrototypeOf(InterpolateBehavior)).apply(this, arguments));
	}

	_createClass(InterpolateBehavior, [{
		key: 'behaviorDidAttach',
		value: function behaviorDidAttach() {
			var _this2 = this;

			this._interpolators = {};

			//Non-zero defaults.
			this._defaultValues = {
				opacity: 1,
				scale: 1
			};

			this.values = {};

			this.connectTo('layout', this._createInterpolators.bind(this), function () {
				_this2.connectTo('^scroll', _this2._interpolate.bind(_this2));
			});
		}
	}, {
		key: '_createInterpolators',
		value: function _createInterpolators() {
			var schema = this.constructor.behaviorSchema;
			var guidesLayoutBehavior = this.parentEl.guidesLayout;

			for (var prop in schema) {
				if (schema.hasOwnProperty(prop)) {
					if (this.props[prop].length > 0) {
						this._interpolators[prop] = this._createInterpolator(guidesLayoutBehavior, this.props[prop]);
					} else {
						delete this._interpolators[prop];
					}
				}
			}

			//Apply the interpolators right away.
			this._interpolate(this.parentEl.scroll);
		}
	}, {
		key: '_createInterpolator',
		value: function _createInterpolator(guidesLayoutBehavior, keyframes) {
			var _this3 = this;

			var layoutEngine = guidesLayoutBehavior.engine;

			//Map the keyframe anchor and offset to scroll positions.
			var mappedKeyframes = keyframes.map(function (keyframe) {
				var pixelOffset = layoutEngine.lengthToPixel(keyframe.offset, _this3.el.layout.layout.height);
				var position = layoutEngine.calculateAnchorPosition(_this3.el.layout, keyframe.anchor, pixelOffset);

				return {
					position: position,
					value: keyframe.value
				};
			});

			//Sort them by scroll position from top to bottom.
			mappedKeyframes = mappedKeyframes.sort(function (a, b) {
				return a.position - b.position;
			});

			var firstKeyframe = mappedKeyframes[0];
			var lastKeyframe = mappedKeyframes[mappedKeyframes.length - 1];

			//Return a function which, given the current scrollPosition, returns the interpolated value.
			return function (scrollPosition) {
				//If the top position is out of bounds, use the edge values.
				if (scrollPosition <= firstKeyframe.position) {
					return firstKeyframe.value;
				}

				if (scrollPosition >= lastKeyframe.position) {
					return lastKeyframe.value;
				}

				//Figure out between which two keyframes we are.
				for (var i = 1; i < mappedKeyframes.length; i++) {
					var rightKeyframe = mappedKeyframes[i];

					//We found the right keyframe!
					if (scrollPosition < rightKeyframe.position) {
						var leftKeyframe = mappedKeyframes[i - 1];

						var _progress = (rightKeyframe.position - scrollPosition) / (rightKeyframe.position - leftKeyframe.position);

						return _progress * (leftKeyframe.value - rightKeyframe.value) + rightKeyframe.value;
					}
				}

				throw new Error('Could not interpolate');
			};
		}
	}, {
		key: '_interpolate',
		value: function _interpolate(scrollBehavior) {
			var schema = this.constructor.behaviorSchema;
			var didChange = false;

			for (var prop in schema) {
				if (schema.hasOwnProperty(prop)) {
					var previousValue = this.values[prop];

					if (this._interpolators.hasOwnProperty(prop)) {
						this.values[prop] = this._interpolators[prop](scrollBehavior.scrollState.position);
					} else {
						this.values[prop] = this._defaultValues.hasOwnProperty(prop) ? this._defaultValues[prop] : 0;
					}

					if (previousValue !== this.values[prop]) {
						didChange = true;
					}
				}
			}

			if (didChange) {
				this.notify();
			}
		}
	}], [{
		key: 'behaviorSchema',
		get: function get() {
			return {
				progress: (0, _objectAssign2.default)({}, keyframesSchema, { default: 'top -100vh 0, bottom 100vh 1' }),
				opacity: keyframesSchema,
				rotate: keyframesSchema,
				scale: keyframesSchema,
				x: keyframesSchema,
				y: keyframesSchema,
				alpha: keyframesSchema,
				beta: keyframesSchema,
				gamma: keyframesSchema,
				delta: keyframesSchema,
				epsilon: keyframesSchema
			};
		}
	}, {
		key: 'behaviorName',
		get: function get() {
			return 'interpolate';
		}
	}, {
		key: 'behaviorDependencies',
		get: function get() {
			return ['^guides-layout', '^scroll', 'layout'];
		}
	}]);

	return InterpolateBehavior;
}(_Behavior3.default);

exports.default = InterpolateBehavior;

},{"behaviors/Behavior.js":13,"object-assign":3}],24:[function(require,module,exports){
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

			this.scrollUpdate = {
				//All others are undefined by default, which causes all of them to return *changed for the first scroll.
				//E.g. wrapperTopChanged will _always_ be true for the very first scroll.
				//But we don't always need CSS transforms on the content element.
				//If the contentTopOffset is always 0 (basically if it's a flow element) then
				//contentTopOffsetChanged will never become true.
				contentTopOffset: 0
			};

			this.layout = {
				hasLayout: false
			};

			this.connectTo('^guides-layout', this._render.bind(this));
			this.connectTo('^scroll', this._scroll.bind(this));

			if (this.props.height === 'auto') {
				this._observeHeight();
			}

			this._observeLayoutDependencies();
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
		}
	}, {
		key: '_observeHeight',
		value: function _observeHeight() {
			var _this2 = this;

			this._resizeObserver = new _resizeObserverPolyfill2.default(function (entries) {
				_this2.intrinsicHeight = entries[0].contentRect.height;
				_this2.emit('heightchange');
			});

			this._resizeObserver.observe(this.contentEl);
		}
	}, {
		key: '_unobserveHeight',
		value: function _unobserveHeight() {
			this._resizeObserver.disconnect();
			this._resizeObserver = null;
		}
	}, {
		key: '_observeLayoutDependencies',
		value: function _observeLayoutDependencies() {
			var _this3 = this;

			//layout:attach and layout:detach are needed when new nodes are added/removed.
			//scrollmeister:connected is mostly needed for reordering of nodes (the layout behavior on the node does not change).
			this.listen(document, 'layout:attach layout:detach scrollmeister:connected', function () {
				//Force update/parsing with the same raw property.
				_this3._updateProperty('dependencies', _this3.dependencies);
			});
		}
	}, {
		key: '_render',
		value: function _render() {
			if (!this.layout.hasLayout) {
				return;
			}

			this._renderWrapper();
			this._renderContent();

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
			var overflow = 'visible';
			var width = this.layout.width;
			var height = this.layout.height;

			if (this.props.clip) {
				overflow = 'hidden';

				if (this.layout.clipRect) {
					height = this.layout.clipRect.height;
				}
			}

			if (this.props.hidden) {
				this.style.left = '500vw';
				this.style.top = '500vh';
				this.style.visibility = 'hidden';
				overflow = 'hidden';
			} else {
				this.style.left = '';
				this.style.top = '';
				this.style.visibility = '';
			}

			this.style.overflow = overflow;
			this.style.width = Math.round(width) + 'px';
			this.style.height = Math.round(height) + 'px';
		}
	}, {
		key: '_renderContent',
		value: function _renderContent() {
			this.contentStyle.position = 'relative';
			this.contentStyle.width = Math.round(this.layout.width) + 'px';

			if (this.props.height === 'auto') {
				this.contentStyle.height = '';
			} else {
				this.contentStyle.height = Math.round(this.layout.height) + 'px';
			}
		}
	}, {
		key: '_scroll',
		value: function _scroll(scrollBehavior) {
			var forceUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			if (!this.layout.hasLayout) {
				return;
			}

			var scrollUpdate = this.scrollUpdate;

			this.parentEl.guidesLayout.engine.doScroll(this.layout, scrollBehavior.scrollState.position, scrollUpdate);

			if (this.props.hidden) {
				this.style.willChange = '';
				this.style.backfaceVisibility = '';
				this.style.perspective = '';
				this.style.transform = '';
			} else {
				if (scrollUpdate.wrapperTopChanged || forceUpdate) {
					var left = Math.round(this.layout.left);
					var top = scrollUpdate.wrapperTop;

					this.style.willChange = 'transform';
					this.style.backfaceVisibility = 'hidden';
					this.style.perspective = '1000';
					this.style.transform = 'translate(' + left + 'px, ' + top + 'px)';
				}

				//The reason we don't blindly apply the CSS transform is that most elements don't need a transform on the content layer at all.
				//This would waste a ton of GPU memory for no reason. The only elements that need it are things like parallax scrolling.
				//Since we default contentTopOffset to 0, this check should be false for all flow elements.
				if (scrollUpdate.contentTopOffsetChanged) {
					this.contentStyle.willChange = 'transform';
					this.contentStyle.backfaceVisibility = 'hidden';
					this.contentStyle.perspective = '1000';
					this.contentStyle.transform = 'translate(0, ' + scrollUpdate.contentTopOffset + 'px)';
				}
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
					type: 'layoutdependencies',
					default: 'inherit'
				},
				hidden: {
					type: 'boolean',
					default: 'false'
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

},{"behaviors/Behavior.js":13,"resize-observer-polyfill":8}],25:[function(require,module,exports){
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

var LazyLoadBehavior = function (_Behavior) {
	_inherits(LazyLoadBehavior, _Behavior);

	function LazyLoadBehavior() {
		_classCallCheck(this, LazyLoadBehavior);

		return _possibleConstructorReturn(this, (LazyLoadBehavior.__proto__ || Object.getPrototypeOf(LazyLoadBehavior)).apply(this, arguments));
	}

	_createClass(LazyLoadBehavior, [{
		key: 'behaviorDidAttach',
		value: function behaviorDidAttach() {
			var _this2 = this;

			//This is the last resort, we definitely need to load the assets once the element is inside the viewport.
			var handleViewportEnter = function handleViewportEnter() {
				lazyLoad();
				unlisten();
			};

			//We try to intelligently load the asset when the element is close to the viewport (extended viewport).
			//We do this inside a scroll pause to minimize jank.
			var handleScrollPause = function handleScrollPause() {
				if (_this2.el.layout.scrollUpdate.inExtendedViewport) {
					lazyLoad();
					unlisten();
				}
			};

			var lazyLoad = function lazyLoad() {
				var elements = _this2.el.querySelectorAll('[data-src]');

				for (var i = 0; i < elements.length; i++) {
					var el = elements[i];

					el.src = el.getAttribute('data-src');
					el.removeAttribute('data-src');
				}

				_this2.notify();
			};

			var unlisten = function unlisten() {
				_this2.unlisten('layout:viewport:enter', handleViewportEnter);
				_this2.unlisten('^scroll:pause', handleScrollPause);
			};

			this.listen('layout:viewport:enter', handleViewportEnter);
			this.listen('^scroll:pause', handleScrollPause);
		}
	}], [{
		key: 'behaviorSchema',
		get: function get() {
			return {};
		}
	}, {
		key: 'behaviorName',
		get: function get() {
			return 'lazy-load';
		}
	}, {
		key: 'behaviorDependencies',
		get: function get() {
			return ['^scroll', 'layout'];
		}
	}]);

	return LazyLoadBehavior;
}(_Behavior3.default);

exports.default = LazyLoadBehavior;

},{"behaviors/Behavior.js":13}],26:[function(require,module,exports){
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
			var img = this.el.querySelector('img, video');
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
			//TODO: warn if there are no img/video
			//TODO: need a wrapper for overflow:hidden
			var layout = this.calculateMediaLayout(layoutBehavior);
			var img = this.el.querySelector('img, video');
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

},{"behaviors/Behavior.js":13}],27:[function(require,module,exports){
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
		key: '_render',
		value: function _render() {
			//TODO: access scrollmode here?
			//TODO: instead of pointer events, add an overlay div to the <shadow-meister>.
			this.style.pointerEvents = 'none';
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

},{"behaviors/Behavior.js":13}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _ScrollState = require('lib/ScrollState.js');

var _ScrollState2 = _interopRequireDefault(_ScrollState);

var _easings = require('lib/easings.js');

var _easings2 = _interopRequireDefault(_easings);

var _Behavior2 = require('behaviors/Behavior.js');

var _Behavior3 = _interopRequireDefault(_Behavior2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollBehavior = function (_Behavior) {
	_inherits(ScrollBehavior, _Behavior);

	function ScrollBehavior() {
		_classCallCheck(this, ScrollBehavior);

		return _possibleConstructorReturn(this, (ScrollBehavior.__proto__ || Object.getPrototypeOf(ScrollBehavior)).apply(this, arguments));
	}

	_createClass(ScrollBehavior, [{
		key: 'behaviorDidAttach',
		value: function behaviorDidAttach() {
			this._scrollAnimation = null;

			this._lastScrollTime = -1;

			this.scrollState = new _ScrollState2.default(this.notify.bind(this), this.emit.bind(this, 'pause', false));

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
				window.scrollTo(0, position);
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
			if (!document.documentElement || !document.body) {
				throw new Error('There is no documentElement or body to get the scroll position from.');
			}

			return document.documentElement.scrollTop || document.body.scrollTop;
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

			this.style.height = Math.round(requiredHeight) + 'px';

			this.scrollState.maxPosition = requiredHeight - layoutEngine.viewport.height;

			//Make sure we don't lose our relative scroll position.
			this.scrollTo(this.scrollState.maxPosition * this.scrollState.progress);
		}
	}], [{
		key: 'behaviorSchema',
		get: function get() {
			return {};
		}
	}, {
		key: 'behaviorName',
		get: function get() {
			return 'real-scroll';
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

},{"behaviors/Behavior.js":13,"lib/ScrollState.js":46,"lib/easings.js":49,"raf":6}],29:[function(require,module,exports){
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

var ScrubBehavior = function (_Behavior) {
	_inherits(ScrubBehavior, _Behavior);

	function ScrubBehavior() {
		_classCallCheck(this, ScrubBehavior);

		return _possibleConstructorReturn(this, (ScrubBehavior.__proto__ || Object.getPrototypeOf(ScrubBehavior)).apply(this, arguments));
	}

	_createClass(ScrubBehavior, [{
		key: 'behaviorDidAttach',
		value: function behaviorDidAttach() {
			var _this2 = this;

			this.videoEl = this.el.querySelector('video');
			this._waitingForSeeked = false;

			this.connectTo('interpolate', this._seek.bind(this));

			//TODO: same problem here and the flag won't help.
			//Even remembering if the event had fired before won't help (it might not be in viewport anymore).
			this.listen('layout:extendedviewport:enter', function () {
				_this2.videoEl.load();
			});
		}
	}, {
		key: '_getProgress',
		value: function _getProgress(interpolateBehavior) {
			var value = interpolateBehavior.values[this.props.parameter];

			//Make sure the value is between 0 and 1.
			//If it is 3.2, this will make it 0.2.
			//This allow looping through the video, e.g. five times.
			//Comparing with > 1 makes sure that +-1.0 does not get converted to 0.0.
			if (Math.abs(value) > 1) {
				value = value % 1;
			}

			//When the value is negative, we count from the end of the video.
			//So -0.2 is the same as a progress of 0.8.
			if (value < 0) {
				value = 1 + value;
			}

			return value;
		}
	}, {
		key: '_seek',
		value: function _seek(interpolateBehavior) {
			var _this3 = this;

			var video = this.videoEl;

			//Video not ready yet.
			if (!isFinite(video.duration)) {
				return;
			}

			//When the browser is still busy with seeking, don't jump to a new time yet.
			//Wait for it to be done and then update it.
			if (video.seeking) {
				if (!this._waitingForSeeked) {
					this._waitingForSeeked = true;

					this.listenOnce(video, 'seeked', function () {
						_this3._waitingForSeeked = false;

						video.currentTime = video.duration * _this3._getProgress(interpolateBehavior);
						video.pause();
						_this3.notify();
					});
				}
			} else {
				video.currentTime = video.duration * this._getProgress(interpolateBehavior);
				video.pause();
				this.notify();
			}
		}
	}], [{
		key: 'behaviorSchema',
		get: function get() {
			return {
				parameter: {
					type: 'string',
					default: 'progress'
				}
			};
		}
	}, {
		key: 'behaviorName',
		get: function get() {
			return 'scrub';
		}
	}, {
		key: 'behaviorDependencies',
		get: function get() {
			return ['interpolate'];
		}
	}]);

	return ScrubBehavior;
}(_Behavior3.default);

exports.default = ScrubBehavior;

},{"behaviors/Behavior.js":13}],30:[function(require,module,exports){
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

var SignalsBehavior = function (_Behavior) {
	_inherits(SignalsBehavior, _Behavior);

	function SignalsBehavior() {
		_classCallCheck(this, SignalsBehavior);

		return _possibleConstructorReturn(this, (SignalsBehavior.__proto__ || Object.getPrototypeOf(SignalsBehavior)).apply(this, arguments));
	}

	_createClass(SignalsBehavior, [{
		key: 'behaviorDidAttach',
		value: function behaviorDidAttach() {
			var _this2 = this;

			var _loop = function _loop(i) {
				var signalConfig = _this2.props.signals[i];

				_this2.listen(signalConfig.eventName, function () {
					//TODO: check if this thing actually has the behavior and if it has onSignal
					_this2.el[signalConfig.targetBehavior].onSignal(signalConfig.signalName, signalConfig.signalData);
				});
			};

			//TODO: this is just some prototype
			for (var i = 0; i < this.props.signals.length; i++) {
				_loop(i);
			}
		}
	}, {
		key: 'update',
		value: function update() {
			//TODO: clean up all the events and set them up new
		}
	}], [{
		key: 'behaviorSchema',
		get: function get() {
			return {
				signals: {
					type: [
					//TODO: add an optional `targetElement` with a (dom)type of `selector`.
					[{ eventName: 'string' }, { targetBehavior: 'string' }, { signalName: 'string' }, { signalData: 'string' }]]
				}
			};
		}
	}, {
		key: 'behaviorName',
		get: function get() {
			return 'signals';
		}
	}, {
		key: 'behaviorDependencies',
		get: function get() {
			return [];
		}
	}]);

	return SignalsBehavior;
}(_Behavior3.default);

exports.default = SignalsBehavior;

},{"behaviors/Behavior.js":13}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Behavior2 = require('behaviors/Behavior.js');

var _Behavior3 = _interopRequireDefault(_Behavior2);

var _InterpolateBehavior = require('behaviors/InterpolateBehavior.js');

var _InterpolateBehavior2 = _interopRequireDefault(_InterpolateBehavior);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TransformBehavior = function (_Behavior) {
	_inherits(TransformBehavior, _Behavior);

	function TransformBehavior() {
		_classCallCheck(this, TransformBehavior);

		return _possibleConstructorReturn(this, (TransformBehavior.__proto__ || Object.getPrototypeOf(TransformBehavior)).apply(this, arguments));
	}

	_createClass(TransformBehavior, [{
		key: 'behaviorDidAttach',
		value: function behaviorDidAttach() {
			this.connectTo('interpolate', this._render.bind(this));
		}
	}, {
		key: '_render',
		value: function _render(interpolateBehavior) {
			var values = interpolateBehavior.values;

			this.contentStyle.willChange = 'transform, opacity';
			this.contentStyle.opacity = values.opacity;

			//TODO: in which order will we apply translate, rotate, scale and skew?
			//I guess translate should always be the first. And scaling the last one.
			//So... translate, skew, rotate, scale?
			//This feels natural. Skewing after rotating is nothing people can imagine in their head.
			//Or just add an order property with a default.
			this.contentStyle.backfaceVisibility = 'hidden';
			this.contentStyle.perspective = '1000';
			this.contentStyle.transform = 'translate(' + values.x + '%, ' + values.y + '%) rotate(' + values.rotate + 'deg) scale(' + values.scale + ')';

			this.notify();
		}
	}], [{
		key: 'behaviorSchema',
		get: function get() {
			return {};
		}
	}, {
		key: 'behaviorName',
		get: function get() {
			return 'transform';
		}
	}, {
		key: 'behaviorDependencies',
		get: function get() {
			return ['interpolate'];
		}
	}]);

	return TransformBehavior;
}(_Behavior3.default);

exports.default = TransformBehavior;

},{"behaviors/Behavior.js":13,"behaviors/InterpolateBehavior.js":23}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _youtubeIframe = require('youtube-iframe');

var _youtubeIframe2 = _interopRequireDefault(_youtubeIframe);

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

			this._playASAP = false;

			var iframe = this.el.querySelector('iframe');

			if (!iframe) {
				this.error(new Error('The youtube behavior expects a YouTube <iframe> as child of the element.'));
			}

			if (iframe.src.indexOf('enablejsapi=1') === -1) {
				this.error(new Error('To use the youtube behavior the YouTube <iframe> src needs the "enablejsapi=1" parameter. The source is "' + iframe.src + '".'));
			}

			_youtubeIframe2.default.load(function (YT) {
				_this2._player = new YT.Player(iframe);

				if (_this2._playASAP) {
					_this2._player.playVideo();
				}
			});
		}
	}, {
		key: 'playVideo',
		value: function playVideo() {
			if (this._player) {
				this._player.playVideo();
			} else {
				this._playASAP = true;
			}
		}
	}, {
		key: 'pauseVideo',
		value: function pauseVideo() {
			if (this._player) {
				this._player.pauseVideo();
			} else {
				this._playASAP = false;
			}
		}
	}], [{
		key: 'behaviorSchema',
		get: function get() {
			return {};
		}
	}, {
		key: 'behaviorName',
		get: function get() {
			return 'youtube';
		}
	}, {
		key: 'behaviorDependencies',
		get: function get() {
			return [];
		}
	}]);

	return FadeInBehavior;
}(_Behavior3.default);

exports.default = FadeInBehavior;

},{"behaviors/Behavior.js":13,"youtube-iframe":11}],33:[function(require,module,exports){
'use strict';

var _scrollmeister = require('scrollmeister.js');

var _scrollmeister2 = _interopRequireDefault(_scrollmeister);

require('./index.js');

var _HashNavigationBehavior = require('behaviors/HashNavigationBehavior.js');

var _HashNavigationBehavior2 = _interopRequireDefault(_HashNavigationBehavior);

var _InterpolateBehavior = require('behaviors/InterpolateBehavior.js');

var _InterpolateBehavior2 = _interopRequireDefault(_InterpolateBehavior);

var _TransformBehavior = require('behaviors/TransformBehavior.js');

var _TransformBehavior2 = _interopRequireDefault(_TransformBehavior);

var _LazyLoadBehavior = require('behaviors/LazyLoadBehavior.js');

var _LazyLoadBehavior2 = _interopRequireDefault(_LazyLoadBehavior);

var _FluidTextBehavior = require('behaviors/FluidTextBehavior.js');

var _FluidTextBehavior2 = _interopRequireDefault(_FluidTextBehavior);

var _ScrubBehavior = require('behaviors/ScrubBehavior.js');

var _ScrubBehavior2 = _interopRequireDefault(_ScrubBehavior);

var _GLEffectBehavior = require('behaviors/GLEffectBehavior.js');

var _GLEffectBehavior2 = _interopRequireDefault(_GLEffectBehavior);

var _GalleryBehavior = require('behaviors/GalleryBehavior.js');

var _GalleryBehavior2 = _interopRequireDefault(_GalleryBehavior);

var _YouTubeBehavior = require('behaviors/YouTubeBehavior.js');

var _YouTubeBehavior2 = _interopRequireDefault(_YouTubeBehavior);

var _CSSBehavior = require('behaviors/CSSBehavior.js');

var _CSSBehavior2 = _interopRequireDefault(_CSSBehavior);

var _SignalsBehavior = require('behaviors/SignalsBehavior.js');

var _SignalsBehavior2 = _interopRequireDefault(_SignalsBehavior);

var _AutoplayBehavior = require('behaviors/AutoplayBehavior.js');

var _AutoplayBehavior2 = _interopRequireDefault(_AutoplayBehavior);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_scrollmeister2.default.registerBehavior(_HashNavigationBehavior2.default);
//import RotatingGradientBehavior from 'behaviors/RotatingGradientBehavior.js';

_scrollmeister2.default.registerBehavior(_InterpolateBehavior2.default);
_scrollmeister2.default.registerBehavior(_TransformBehavior2.default);
_scrollmeister2.default.registerBehavior(_LazyLoadBehavior2.default);
_scrollmeister2.default.registerBehavior(_FluidTextBehavior2.default);
_scrollmeister2.default.registerBehavior(_ScrubBehavior2.default);
_scrollmeister2.default.registerBehavior(_GLEffectBehavior2.default);
//Scrollmeister.registerBehavior(RotatingGradientBehavior);
_scrollmeister2.default.registerBehavior(_GalleryBehavior2.default);
_scrollmeister2.default.registerBehavior(_YouTubeBehavior2.default);
_scrollmeister2.default.registerBehavior(_CSSBehavior2.default);
_scrollmeister2.default.registerBehavior(_SignalsBehavior2.default);
_scrollmeister2.default.registerBehavior(_AutoplayBehavior2.default);

},{"./index.js":34,"behaviors/AutoplayBehavior.js":12,"behaviors/CSSBehavior.js":14,"behaviors/FluidTextBehavior.js":18,"behaviors/GLEffectBehavior.js":19,"behaviors/GalleryBehavior.js":20,"behaviors/HashNavigationBehavior.js":22,"behaviors/InterpolateBehavior.js":23,"behaviors/LazyLoadBehavior.js":25,"behaviors/ScrubBehavior.js":29,"behaviors/SignalsBehavior.js":30,"behaviors/TransformBehavior.js":31,"behaviors/YouTubeBehavior.js":32,"scrollmeister.js":55}],34:[function(require,module,exports){
'use strict';

var _scrollmeister = require('scrollmeister.js');

var _scrollmeister2 = _interopRequireDefault(_scrollmeister);

var _GuidesLayoutBehavior = require('behaviors/GuidesLayoutBehavior.js');

var _GuidesLayoutBehavior2 = _interopRequireDefault(_GuidesLayoutBehavior);

var _ScrollBehavior = require('behaviors/ScrollBehavior.js');

var _ScrollBehavior2 = _interopRequireDefault(_ScrollBehavior);

var _FakeScrollBehavior = require('behaviors/FakeScrollBehavior.js');

var _FakeScrollBehavior2 = _interopRequireDefault(_FakeScrollBehavior);

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

_scrollmeister2.default.registerBehavior(_GuidesLayoutBehavior2.default);
_scrollmeister2.default.registerBehavior(_ScrollBehavior2.default);
_scrollmeister2.default.registerBehavior(_FakeScrollBehavior2.default);
_scrollmeister2.default.registerBehavior(_DebugGuidesBehavior2.default);
_scrollmeister2.default.registerBehavior(_FadeInBehavior2.default);

_scrollmeister2.default.registerBehavior(_LayoutBehavior2.default);
_scrollmeister2.default.registerBehavior(_MediaBehavior2.default);
_scrollmeister2.default.registerBehavior(_MousetrapBehavior2.default);
//Scrollmeister.registerBehavior(FullscreenBehavior);

},{"behaviors/DebugGuidesBehavior.js":15,"behaviors/FadeInBehavior.js":16,"behaviors/FakeScrollBehavior.js":17,"behaviors/GuidesLayoutBehavior.js":21,"behaviors/LayoutBehavior.js":24,"behaviors/MediaBehavior.js":26,"behaviors/MousetrapBehavior.js":27,"behaviors/ScrollBehavior.js":28,"scrollmeister.js":55}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _scrollmeister = require('scrollmeister.js');

var _scrollmeister2 = _interopRequireDefault(_scrollmeister);

var _BehaviorsStyleMerger = require('lib/BehaviorsStyleMerger.js');

var _BehaviorsStyleMerger2 = _interopRequireDefault(_BehaviorsStyleMerger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContentMeisterComponent = function (_HTMLElement) {
	_inherits(ContentMeisterComponent, _HTMLElement);

	// https://github.com/WebReflection/document-register-element/tree/7e2743d38f0bf01806cb9b76ba254f62f8cb24b2#v1-caveat
	// $FlowFixMe: Won't be fixed ;)
	function ContentMeisterComponent(_) {
		var _this, _ret;

		_classCallCheck(this, ContentMeisterComponent);

		// $FlowFixMe: Won't be fixed ;)
		return _ret = ((_ = (_this = _possibleConstructorReturn(this, (ContentMeisterComponent.__proto__ || Object.getPrototypeOf(ContentMeisterComponent)).call(this, _)), _this)).init(), _), _possibleConstructorReturn(_this, _ret); // eslint-disable-line
	}

	_createClass(ContentMeisterComponent, [{
		key: 'init',
		value: function init() {
			this._behaviorsStyleMerger = new _BehaviorsStyleMerger2.default(this, _scrollmeister2.default.getBehaviorOrder());
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
	}]);

	return ContentMeisterComponent;
}(HTMLElement);

exports.default = ContentMeisterComponent;

},{"lib/BehaviorsStyleMerger.js":43,"scrollmeister.js":55}],36:[function(require,module,exports){
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

},{"./MeisterComponent.js":37,"scrollmeister.js":55}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _scrollmeister = require('scrollmeister.js');

var _scrollmeister2 = _interopRequireDefault(_scrollmeister);

var _BehaviorsStyleMerger = require('lib/BehaviorsStyleMerger.js');

var _BehaviorsStyleMerger2 = _interopRequireDefault(_BehaviorsStyleMerger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var invalidMarkupSelectors = [':not(scroll-meister) > element-meister', 'scroll-meister * element-meister', 'scroll-meister scroll-meister', 'element-meister element-meister', 'element-meister scroll-meister'];

var MeisterComponent = function (_HTMLElement) {
	_inherits(MeisterComponent, _HTMLElement);

	_createClass(MeisterComponent, [{
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

	function MeisterComponent(_) {
		var _this, _ret;

		_classCallCheck(this, MeisterComponent);

		// $FlowFixMe: Won't be fixed ;)
		return _ret = ((_ = (_this = _possibleConstructorReturn(this, (MeisterComponent.__proto__ || Object.getPrototypeOf(MeisterComponent)).call(this, _)), _this)).init(), _), _possibleConstructorReturn(_this, _ret); // eslint-disable-line
	}

	_createClass(MeisterComponent, [{
		key: 'init',
		value: function init() {
			this.behaviors = {};

			this._behaviorsStyleMerger = new _BehaviorsStyleMerger2.default(this, _scrollmeister2.default.getBehaviorOrder());

			this._scheduledBatchUpdate = false;
			this._scheduledBehaviors = {};
		}
	}, {
		key: 'connectedCallback',
		value: function connectedCallback() {
			var _this2 = this;

			//This happens when a disconnected element (e.g. document.createElement) gets attributes before being inserted.
			//We will then update the behaviors as soon as it is connected.
			if (this._scheduledBatchUpdate && !this._batchHandle) {
				this._batchHandle = (0, _raf2.default)(this._batchUpdateBehaviors.bind(this));
			}

			_scrollmeister2.default.componentConnected(this);

			if ("development" !== 'production') {
				//Make some sanity checks on the markup for UX.
				(0, _raf2.default)(function () {
					if (document.querySelector(invalidMarkupSelectors.join(','))) {
						_this2.renderError(new Error('You have nested <scroll-meister> and <element-meister> elements in an unsupported way. <element-meister> elements need to always be direct children of <scroll-meister>.'));
					}
				});
			}
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

			this._scheduledBatchUpdate = false;
			_raf2.default.cancel(this._batchHandle);
			delete this._batchHandle;

			_scrollmeister2.default.detachAllBehaviors(this);

			_scrollmeister2.default.componentDisconnected(this);
		}
	}, {
		key: 'attributeChangedCallback',
		value: function attributeChangedCallback(attr) {
			//Get rid of the condition, if any.
			attr = attr.split('_')[0];

			this._scheduledBehaviors[attr] = true;

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
			if ("development" !== 'production') {
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

			_scrollmeister2.default.updateBehaviors(this, this._scheduledBehaviors);
			this._scheduledBehaviors = {};
		}
	}]);

	return MeisterComponent;
}(HTMLElement);

exports.default = MeisterComponent;

},{"lib/BehaviorsStyleMerger.js":43,"raf":6,"scrollmeister.js":55}],38:[function(require,module,exports){
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

},{"./MeisterComponent.js":37,"scrollmeister.js":55}],39:[function(require,module,exports){
'use strict';

require('document-register-element');

var _scrollmeister = require('scrollmeister.js');

var _scrollmeister2 = _interopRequireDefault(_scrollmeister);

var _ScrollMeisterComponent = require('components/ScrollMeisterComponent.js');

var _ScrollMeisterComponent2 = _interopRequireDefault(_ScrollMeisterComponent);

var _ElementMeisterComponent = require('components/ElementMeisterComponent.js');

var _ElementMeisterComponent2 = _interopRequireDefault(_ElementMeisterComponent);

var _ContentMeisterComponent = require('components/ContentMeisterComponent.js');

var _ContentMeisterComponent2 = _interopRequireDefault(_ContentMeisterComponent);

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
	customElements.define('content-meister', _ContentMeisterComponent2.default);
	customElements.define('shadow-meister', function (_HTMLElement) {
		_inherits(_class, _HTMLElement);

		function _class() {
			_classCallCheck(this, _class);

			return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
		}

		return _class;
	}(HTMLElement));
}, { once: true });

},{"components/ContentMeisterComponent.js":35,"components/ElementMeisterComponent.js":36,"components/ScrollMeisterComponent.js":38,"document-register-element":1,"scrollmeister.js":55}],40:[function(require,module,exports){
'use strict';

var _scrollmeister = require('scrollmeister.js');

var _scrollmeister2 = _interopRequireDefault(_scrollmeister);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//TODO: do we want it that way? Should defineCondition return a function to update the condition?
//They should be pure and only rely on their parameters.
//Should it accept parameters?
//let updateXS = Scrollmeister.defineCondition('s', () => window.innerWidth >= 576);
//Or how about: Scrollmeister.updateCondition('m', window)

_scrollmeister2.default.defineCondition('m', function () {
	return window.innerWidth >= 768;
}, function (update) {
	window.addEventListener('resize', update, false);
	update();
});

/*
Scrollmeister.defineCondition('l', win => win.innerWidth >= 992);
Scrollmeister.defineCondition('xl', win => win.innerWidth >= 1200);

Scrollmeister.defineCondition('s-down', win => win.innerWidth < 576);
Scrollmeister.defineCondition('m-down', win => win.innerWidth < 768);
Scrollmeister.defineCondition('l-down', win => win.innerWidth < 992);
Scrollmeister.defineCondition('xl-down', win => win.innerWidth < 1200);

Scrollmeister.defineCondition('portrait', win => win.innerWidth < win.innerHeight);
Scrollmeister.defineCondition('landscape', win => win.innerWidth >= win.innerHeight);
*/

//TODO: let's see what Modernizr, feature.js and has.js offer to get some inspiration.
//Scrollmeister.defineCondition('webgl', () => true);

//TODO: do we allow element-queries? They can potentially end in infinite loops.

//TODO: Allow composing conditions from existing
//let update = Scrollmeister.defineCondition('wat', ['xl', 'portrait'], (xl, portrait, more, extra) => xl && portrait);
//update('foo', 'bar') will set "more" and "extra" to these.
//Scrollmeister.defineCondition('wat', ['xl', 'portrait'], (xl, portrait) => xl && portrait);

//TODO: Condition changes propagate synchrnously. But Scrollmeister will batch them and schedule an update just like detach/attach

},{"scrollmeister.js":55}],41:[function(require,module,exports){
'use strict';

var _scrollmeister = require('scrollmeister.js');

var _scrollmeister2 = _interopRequireDefault(_scrollmeister);

require('./scrollmeister.sass');

require('./conditions');

require('./behaviors/extras.js');

require('./components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//This makes browserify --standalone work and exports Scrollmeister as an UMD module.
module.exports = _scrollmeister2.default; //eslint-disable-line no-undef

},{"./behaviors/extras.js":33,"./components":39,"./conditions":40,"./scrollmeister.sass":56,"scrollmeister.js":55}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var translate2dRegex = /translate\(([^)]+)\)/g;

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

				transforms = transforms.join(' ');

				if (transforms.length > 0) {
					this.el.style.transform = this.el.style.WebkitTransform = transforms.replace(translate2dRegex, 'translate3d($1, 0)');
					this.el.style.msTransform = transforms;
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
				//TODO: handle transition prefixes and merge them
				//TODO: handle backfaceVisibility / WebkitBackfaceVisibility prefix

				var hasProperty = false;

				for (var _behaviorName2 in this._styles[property]) {
					if (this._styles[property].hasOwnProperty(_behaviorName2)) {
						this.el.style[property] = this._styles[property][_behaviorName2];

						if (hasProperty && "development" !== 'production') {
							//eslint-disable-next-line no-console
							console.error('The "' + property + '" property was set by multiple behaviors (' + Object.keys(this._styles[property]).join(', ') + ') but it cannot be merged.');
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

},{}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var lowerCaseAndDashRegex = /^[a-z-]+$/;

var ConditionsRegistry = function () {
	function ConditionsRegistry(changeCallback) {
		_classCallCheck(this, ConditionsRegistry);

		this._conditions = {};
		this._values = {};
		this._order = [];
		this._changeCallback = changeCallback;
	}

	_createClass(ConditionsRegistry, [{
		key: "add",
		value: function add(name, valueFn, updaterFn) {
			var _this = this;

			if (this._conditions.hasOwnProperty(name)) {
				throw new Error("You are trying to redefine the \"" + name + "\" condition.");
			}

			if (!lowerCaseAndDashRegex.test(name)) {
				throw new Error("The condition \"" + name + "\" you are trying to define uses invalid characters. Conditions can only use lower case characters and dashes.");
			}

			updaterFn(function () {
				var newValue = valueFn.apply(undefined, arguments);

				if (newValue !== _this._values[name]) {
					_this._values[name] = newValue;
					_this._changeCallback(name, newValue);
				}
			});

			this._conditions[name] = valueFn;

			this._order.push(name);
		}
	}, {
		key: "is",
		value: function is(name) {
			return this._values[name];
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
	}, {
		key: "getOrder",
		value: function getOrder() {
			return this._order.slice();
		}
	}]);

	return ConditionsRegistry;
}();

exports.default = ConditionsRegistry;

},{}],45:[function(require,module,exports){
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
		this.viewport = {
			width: 0,
			height: 0,
			outerWidth: 0,
			outerHeight: 0
		};
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
			if (viewport.height === this.viewport.height && viewport.width === this.viewport.width && viewport.outerWidth === this.viewport.outerWidth && viewport.outerHeight === this.viewport.outerHeight) {
				return false;
			}

			this.viewport = viewport;
			this.fullscreenLayout = {
				left: 0,
				top: 0,
				width: viewport.outerWidth,
				height: viewport.outerHeight
			};

			return true;
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

			return Math.round(position + offset);
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
					_node.layout.hasLayout = true;
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
			var prevContentTopOffset = scrollUpdate.contentTopOffset;
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
			scrollUpdate.contentTopOffsetChanged = scrollUpdate.contentTopOffset !== prevContentTopOffset;
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

			layout.spacingTop = this.lengthToPixel(props.spacing.top, layout.height);
			layout.spacingBottom = this.lengthToPixel(props.spacing.bottom, layout.height);

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

},{}],46:[function(require,module,exports){
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

},{}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (input) {
	return input.replace(/-([a-z])/g, function (match) {
		return match[1].toUpperCase();
	});
};

},{}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
//Feel free to extend this list if a behavior needs more styles.
var cssProps = ['display', 'overflow', 'contain', 'transform', 'backfaceVisibility', 'willChange', 'opacity', 'position', 'left', 'top', 'right', 'bottom', 'width', 'height', 'maxWidth', 'minWidth', 'maxHeight', 'minHeight', 'transition', 'whiteSpace', 'fontSize', 'cursor', 'pointerEvents', 'background', 'backgroundImage', 'backgroundColor', 'backgroundSize', 'visibility'];

exports.default = cssProps;

},{}],49:[function(require,module,exports){
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

},{}],50:[function(require,module,exports){
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
		if (distance2 < 49) {
			//It was a tap, click the element.
			if (element.tagName === 'A') {
				var clickEvent = document.createEvent('MouseEvents');
				clickEvent.initMouseEvent('click', true, true, e.view, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null);
				element.dispatchEvent(clickEvent);
			}

			element.focus();
		}
	}
};

},{}],51:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (node) {
	var line = node.cloneNode(true);
	container.appendChild(line);

	//Force a single line of text.
	line.style.display = 'inline-block';
	line.style.whiteSpace = 'nowrap';

	//We set the font size to 100 to get our baseline width calculation.
	//This means we then know the width of the text when the font size is 100.
	line.style.fontSize = '100px';
	line.style.width = 'auto';

	node.parentElement.appendChild(container);
	var ratio = 100 / line.clientWidth;
	node.parentElement.removeChild(container);
	container.removeChild(line);

	return ratio;
};

var container = document.createElement('div');

//Offscreen container.
container.style.cssText = '\n\twidth: 0;\n\theight: 0;\n\toverflow: hidden;\n\tposition: fixed;\n\tbottom: -100px;\n\tright: -100px;\n\topacity:0;\n\tpointer-events:none;\n';

},{}],52:[function(require,module,exports){
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

},{}],53:[function(require,module,exports){
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
	parseProperties: function parseProperties(element, schema, rawPropertiesList, props) {
		//TODO: instead of parsing them and putting them immediately on the behavior
		//I want to return an array which also knows about conditions.
		//This way we only need to parse the props once and as soon as the condition changes
		//we can do assign(props, propsM, propsXL, ...)
		//So basically it is something different if the attributes on the elemrnt change (rare)
		//or if the a condition changes (expected).
		for (var i = 0; i < rawPropertiesList.length; i++) {
			var rawProperties = rawPropertiesList[i];
			this._parseProperties(element, schema, rawProperties, props);
		}
	},

	_parseProperties: function _parseProperties(element, schema, rawProperties, props) {
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

},{"types":65}],54:[function(require,module,exports){
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

},{}],55:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _raf = require('raf');

var _raf2 = _interopRequireDefault(_raf);

var _CustomEvent = require('ponies/CustomEvent.js');

var _CustomEvent2 = _interopRequireDefault(_CustomEvent);

var _BehaviorsRegistry = require('lib/BehaviorsRegistry.js');

var _BehaviorsRegistry2 = _interopRequireDefault(_BehaviorsRegistry);

var _ConditionsRegistry = require('lib/ConditionsRegistry.js');

var _ConditionsRegistry2 = _interopRequireDefault(_ConditionsRegistry);

var _Behavior2 = require('behaviors/Behavior.js');

var _Behavior3 = _interopRequireDefault(_Behavior2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scrollmeister = function () {
	function Scrollmeister() {
		var _this = this;

		_classCallCheck(this, Scrollmeister);

		this.version = "0.0.1";
		//This is exposed for user-land custom behaviors to extend Scrollmeister.Behavior
		this.Behavior = _Behavior3.default;
		this.behaviorsRegistry = new _BehaviorsRegistry2.default();

		this._elements = [];

		this._scheduledConditionUpdate = false;

		this.batchUpdateConditions = this.batchUpdateConditions.bind(this);

		this.conditionsRegistry = new _ConditionsRegistry2.default(function () {
			if (!_this._scheduledConditionUpdate) {
				_this._scheduledConditionUpdate = true;
				(0, _raf2.default)(_this.batchUpdateConditions);
			}
		});
	}

	_createClass(Scrollmeister, [{
		key: 'getDefinedBehaviorNames',
		value: function getDefinedBehaviorNames() {
			return this.behaviorsRegistry.getNames();
		}
	}, {
		key: 'getBehaviorOrder',
		value: function getBehaviorOrder() {
			return this.behaviorsRegistry.getOrder();
		}
	}, {
		key: 'getConditionsOrder',
		value: function getConditionsOrder() {
			return this.conditionsRegistry.getOrder();
		}
	}, {
		key: 'registerBehavior',
		value: function registerBehavior(classDefinition) {
			this.behaviorsRegistry.add(classDefinition);
		}
	}, {
		key: 'updateBehaviors',
		value: function updateBehaviors(element, behaviorMap) {
			var behaviorOrder = this.getBehaviorOrder();
			var conditionsOrder = this.getConditionsOrder();
			var behaviorsToDetach = [];

			for (var i = 0; i < behaviorOrder.length; i++) {
				var behaviorName = behaviorOrder[i];

				//We iterate over all registered behaviors, but we only need to update those in the map.
				if (!behaviorMap.hasOwnProperty(behaviorName)) {
					continue;
				}

				var rawPropertiesList = [];
				var attr = behaviorName;

				if (element.hasAttribute(attr)) {
					rawPropertiesList.push(element.getAttribute(attr));
				}

				for (var j = 0; j < conditionsOrder.length; j++) {
					var conditionName = conditionsOrder[j];

					attr = behaviorName + '_' + conditionName;

					if (element.hasAttribute(attr)) {
						if (this.conditionsRegistry.is(conditionName)) {
							rawPropertiesList.push(element.getAttribute(attr));
						}
					}
				}

				if (rawPropertiesList.length > 0) {
					var missingDependencies = this._checkBehaviorDependencies(element, behaviorName);

					if (missingDependencies.length > 0) {
						var error = new Error('The "' + behaviorName + '" behavior requires the "' + missingDependencies.join('", "') + '" behavior(s). Make sure you add the attribute to the element.');

						element.renderError(error);

						throw error;
					}

					this.attachOrUpdateBehavior(element, behaviorName, rawPropertiesList);
				} else {
					//We need to detach them in reverse order, that's why we need to collect them first.
					//Because we're iterating in regular order for attaching.
					behaviorsToDetach.unshift(behaviorName);
				}
			}

			for (var _i = 0; _i < behaviorsToDetach.length; _i++) {
				var name = behaviorsToDetach[_i];
				this.detachBehavior(element, name);
			}
		}
	}, {
		key: 'attachOrUpdateBehavior',
		value: function attachOrUpdateBehavior(element, name, rawPropertiesList) {
			if (!this.behaviorsRegistry.has(name)) {
				throw new Error('Tried to attach an unknown behavior "' + name + '". This should never happen since we only track attributes that correspond to defined behaviors.');
			}

			//The behavior is already attached, update it.
			if (element.hasOwnProperty(name)) {
				element[name].updateProperties(rawPropertiesList);
			} else {
				//Make the behavior available as a property on the DOM node.
				var _Behavior = this.behaviorsRegistry.get(name);
				var contentElement = this.wrapContents(element);

				new _Behavior(element, contentElement, rawPropertiesList);
			}
		}
	}, {
		key: 'detachBehavior',
		value: function detachBehavior(element, name) {
			if (element.hasOwnProperty(name)) {
				element[name].destructor();
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
		}
	}, {
		key: 'detachAllBehaviors',
		value: function detachAllBehaviors(element) {
			//Detach in reverse order to not crash because of dependencies.
			var reverseBehaviorOrder = this.getBehaviorOrder().slice().reverse();

			for (var i = 0; i < reverseBehaviorOrder.length; i++) {
				var behaviorName = reverseBehaviorOrder[i];

				if (element.hasOwnProperty(behaviorName)) {
					element[behaviorName].destructor();
				}
			}
		}
	}, {
		key: 'batchUpdateConditions',
		value: function batchUpdateConditions() {
			//TODO: this might have a race condition with updateBehaviors
			//If a condition changes in the same frame that an attribute is added/removed/updated
			//we're doing unnecessary work and additionally if this loop right here runs before updateBehaviors
			//then the behavior might not exist yet.

			var behaviorOrder = this.getBehaviorOrder();
			var conditionsOrder = this.getConditionsOrder();

			for (var i = 0; i < this._elements.length; i++) {
				var element = this._elements[i];

				for (var j = 0; j < behaviorOrder.length; j++) {
					var behaviorName = behaviorOrder[j];
					var attr = behaviorName;
					var rawPropertiesList = [];

					if (element.hasAttribute(attr)) {
						rawPropertiesList.push(element.getAttribute(attr));
					}

					for (var k = 0; k < conditionsOrder.length; k++) {
						var conditionName = conditionsOrder[k];

						attr = behaviorName + '_' + conditionName;

						if (element.hasAttribute(attr)) {
							if (this.conditionsRegistry.is(conditionName)) {
								rawPropertiesList.push(element.getAttribute(attr));
							}
						}
					}

					if (rawPropertiesList.length > 0) {
						this.attachOrUpdateBehavior(element, behaviorName, rawPropertiesList);
					}
				}
			}

			this._scheduledConditionUpdate = false;
		}
	}, {
		key: '_checkBehaviorDependencies',
		value: function _checkBehaviorDependencies(element, name) {
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
		}
	}, {
		key: 'defineCondition',
		value: function defineCondition(name, valueFn, updaterFn) {
			this.conditionsRegistry.add(name, valueFn, updaterFn);
		}
	}, {
		key: 'getDefinedConditionNames',
		value: function getDefinedConditionNames() {
			return this.conditionsRegistry.getNames();
		}
	}, {
		key: 'componentConnected',
		value: function componentConnected(element) {
			this._elements.push(element);

			var event = new _CustomEvent2.default('scrollmeister:connected', {
				bubbles: false,
				cancelable: false,
				detail: element
			});

			document.dispatchEvent(event);
		}
	}, {
		key: 'componentDisconnected',
		value: function componentDisconnected(element) {
			var index = this._elements.indexOf(element);
			this._elements.splice(index, 1);

			var event = new _CustomEvent2.default('scrollmeister:disconnected', {
				bubbles: false,
				cancelable: false,
				detail: element
			});

			document.dispatchEvent(event);
		}
	}, {
		key: 'wrapContents',
		value: function wrapContents(element) {
			if (element.tagName.toLowerCase() !== 'element-meister') {
				return null;
			}

			var contentEl = element.querySelector('content-meister');

			if (contentEl) {
				return contentEl;
			}

			contentEl = document.createElement('content-meister');

			var childNodes = element.childNodes;
			var fragment = document.createDocumentFragment();

			//childNodes is a live list, so length gets smaller.
			while (childNodes.length > 0) {
				fragment.appendChild(childNodes[0]);
			}

			contentEl.appendChild(fragment);
			element.appendChild(contentEl);

			return contentEl;
		}
	}]);

	return Scrollmeister;
}();

exports.default = new Scrollmeister();

},{"behaviors/Behavior.js":13,"lib/BehaviorsRegistry.js":42,"lib/ConditionsRegistry.js":44,"ponies/CustomEvent.js":54,"raf":6}],56:[function(require,module,exports){
var css = "html{overflow-x:hidden;overflow-y:scroll}body{margin:0}scroll-meister{display:block;position:static;width:100%;overflow:hidden}element-meister{display:block;position:fixed;left:0;top:0;opacity:1}content-meister{display:block;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box}shadow-meister{position:static !important;display:block;display:contents}\n\n/*# sourceMappingURL=scrollmeister.sass.map */"
module.exports = require('scssify').createStyle(css, {})
},{"scssify":10}],57:[function(require,module,exports){
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

},{}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
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

},{"types/CSSLengthType.js":58}],60:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var skipRegex = /skip\s+(\d+)/;
var consumeRegex = /consume\s+(\d+)/;

function isFlowElement(element) {
	return element.behaviors && element.behaviors.layout && element.layout.props.mode === 'flow';
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

	if (value.indexOf('skip') !== -1 || value.indexOf('consume') !== -1) {
		var numberOfSkips = skipRegex.test(value) ? parseInt(value.match(skipRegex)[1], 10) : 0;
		var numberOfConsumes = consumeRegex.test(value) ? parseInt(value.match(consumeRegex)[1], 10) : 1;

		//Same as inherit
		if (numberOfSkips === 0 && numberOfConsumes === 1) {
			return findDependencies('inherit', context);
		}

		if (numberOfSkips < 0) {
			throw new Error('You\'ve specified a non-positive number of skips (' + numberOfSkips + ') for the layout dependencies.');
		}

		if (numberOfConsumes < 1) {
			throw new Error('You have specified less than 1 (' + numberOfConsumes + ') for "consume" for the layout dependencies..');
		}

		var _element = context;

		//skip
		do {
			_element = findPreviousFlowElement(_element);
		} while (_element && numberOfSkips--);

		if (!_element) {
			//TODO: throw? We could not find the deps, too many skips.
			return [];
		}

		//consume
		var _dependencies = [];

		do {
			_dependencies.push(_element.layout);
			_element = findPreviousFlowElement(_element);
		} while (_element && --numberOfConsumes);

		return _dependencies;
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

},{}],61:[function(require,module,exports){
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

},{}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var plainNumberRegex = /^[\d.]+$/;
var ratioRegex = /^(\d+)\s*\/\s*(\d+)$/;

exports.default = {
	parse: function parse(value) {
		value = value.trim();

		var match = value.match(ratioRegex);
		var num = void 0;

		if (match) {
			num = parseInt(match[1], 10) / parseInt(match[2], 10);
			value = match[1] + " / " + match[2];
		} else {
			num = parseFloat(value);

			if (isNaN(num) || !plainNumberRegex.test(value)) {
				throw new Error("The value \"" + value + " does not look like a ratio. The syntax is \"width / height\", e.g. \"1920 / 1080\" or a number like \"1.5\".");
			}
		}

		return {
			num: num,
			value: value
		};
	},
	stringify: function stringify(value) {
		return value.value;
	}
};

},{}],63:[function(require,module,exports){
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

},{}],64:[function(require,module,exports){
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

},{}],65:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _BooleanType = require('types/BooleanType.js');

var _BooleanType2 = _interopRequireDefault(_BooleanType);

var _CSSLengthType = require('types/CSSLengthType.js');

var _CSSLengthType2 = _interopRequireDefault(_CSSLengthType);

var _RatioType = require('types/RatioType.js');

var _RatioType2 = _interopRequireDefault(_RatioType);

var _HeightType = require('types/HeightType.js');

var _HeightType2 = _interopRequireDefault(_HeightType);

var _LayoutDependenciesType = require('types/LayoutDependenciesType.js');

var _LayoutDependenciesType2 = _interopRequireDefault(_LayoutDependenciesType);

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
	layoutdependencies: _LayoutDependenciesType2.default,
	number: _NumberType2.default,
	string: _StringType2.default,
	template: _TemplateType2.default
};

},{"types/BooleanType.js":57,"types/CSSLengthType.js":58,"types/HeightType.js":59,"types/LayoutDependenciesType.js":60,"types/NumberType.js":61,"types/RatioType.js":62,"types/StringType.js":63,"types/TemplateType.js":64}]},{},[41])(41)
});
