var et=Object.defineProperty;var tt=Object.getOwnPropertyDescriptor;var b=(r,e,t,n)=>{for(var i=n>1?void 0:n?tt(e,t):e,s=r.length-1,a;s>=0;s--)(a=r[s])&&(i=(n?a(e,t,i):a(i))||i);return n&&i&&et(e,t,i),i};var K=window,W=K.ShadowRoot&&(K.ShadyCSS===void 0||K.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,se=Symbol(),$e=new WeakMap,O=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==se)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(W&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=$e.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&$e.set(t,e))}return e}toString(){return this.cssText}},Se=r=>new O(typeof r=="string"?r:r+"",void 0,se),j=(r,...e)=>{let t=r.length===1?r[0]:e.reduce(((n,i,s)=>n+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[s+1]),r[0]);return new O(t,r,se)},re=(r,e)=>{W?r.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((t=>{let n=document.createElement("style"),i=K.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=t.cssText,r.appendChild(n)}))},V=W?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(let n of e.cssRules)t+=n.cssText;return Se(t)})(r):r;var ae,J=window,Ee=J.trustedTypes,nt=Ee?Ee.emptyScript:"",Ae=J.reactiveElementPolyfillSupport,le={toAttribute(r,e){switch(e){case Boolean:r=r?nt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},Ce=(r,e)=>e!==r&&(e==e||r==r),oe={attribute:!0,type:String,converter:le,reflect:!1,hasChanged:Ce},ce="finalized",w=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();let e=[];return this.elementProperties.forEach(((t,n)=>{let i=this._$Ep(n,t);i!==void 0&&(this._$Ev.set(i,n),e.push(i))})),e}static createProperty(e,t=oe){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){let n=typeof e=="symbol"?Symbol():"__"+e,i=this.getPropertyDescriptor(e,n,t);i!==void 0&&Object.defineProperty(this.prototype,e,i)}}static getPropertyDescriptor(e,t,n){return{get(){return this[t]},set(i){let s=this[e];this[t]=i,this.requestUpdate(e,s,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||oe}static finalize(){if(this.hasOwnProperty(ce))return!1;this[ce]=!0;let e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){let t=this.properties,n=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(let i of n)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let i of n)t.unshift(V(i))}else e!==void 0&&t.push(V(e));return t}static _$Ep(e,t){let n=t.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach((t=>t(this)))}addController(e){var t,n;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((n=e.hostConnected)===null||n===void 0||n.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;let t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return re(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach((t=>{var n;return(n=t.hostConnected)===null||n===void 0?void 0:n.call(t)}))}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach((t=>{var n;return(n=t.hostDisconnected)===null||n===void 0?void 0:n.call(t)}))}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$EO(e,t,n=oe){var i;let s=this.constructor._$Ep(e,n);if(s!==void 0&&n.reflect===!0){let a=(((i=n.converter)===null||i===void 0?void 0:i.toAttribute)!==void 0?n.converter:le).toAttribute(t,n.type);this._$El=e,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._$El=null}}_$AK(e,t){var n;let i=this.constructor,s=i._$Ev.get(e);if(s!==void 0&&this._$El!==s){let a=i.getPropertyOptions(s),l=typeof a.converter=="function"?{fromAttribute:a.converter}:((n=a.converter)===null||n===void 0?void 0:n.fromAttribute)!==void 0?a.converter:le;this._$El=s,this[s]=l.fromAttribute(t,a.type),this._$El=null}}requestUpdate(e,t,n){let i=!0;e!==void 0&&(((n=n||this.constructor.getPropertyOptions(e)).hasChanged||Ce)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),n.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,n))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((i,s)=>this[s]=i)),this._$Ei=void 0);let t=!1,n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),(e=this._$ES)===null||e===void 0||e.forEach((i=>{var s;return(s=i.hostUpdate)===null||s===void 0?void 0:s.call(i)})),this.update(n)):this._$Ek()}catch(i){throw t=!1,this._$Ek(),i}t&&this._$AE(n)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach((n=>{var i;return(i=n.hostUpdated)===null||i===void 0?void 0:i.call(n)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach(((t,n)=>this._$EO(n,this[n],t))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};w[ce]=!0,w.elementProperties=new Map,w.elementStyles=[],w.shadowRootOptions={mode:"open"},Ae?.({ReactiveElement:w}),((ae=J.reactiveElementVersions)!==null&&ae!==void 0?ae:J.reactiveElementVersions=[]).push("1.6.3");var de,X=window,M=X.trustedTypes,Te=M?M.createPolicy("lit-html",{createHTML:r=>r}):void 0,_e="$lit$",x=`lit$${(Math.random()+"").slice(9)}$`,je="?"+x,it=`<${je}>`,A=document,U=()=>A.createComment(""),B=r=>r===null||typeof r!="object"&&typeof r!="function",Ne=Array.isArray,st=r=>Ne(r)||typeof r?.[Symbol.iterator]=="function",he=`[ 	
\f\r]`,N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ke=/-->/g,Me=/>/g,S=RegExp(`>|${he}(?:([^\\s"'>=/]+)(${he}*=${he}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Pe=/'/g,He=/"/g,Ue=/^(?:script|style|textarea|title)$/i,Be=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),g=Be(1),ft=Be(2),C=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),Re=new WeakMap,E=A.createTreeWalker(A,129,null,!1);function De(r,e){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Te!==void 0?Te.createHTML(e):e}var rt=(r,e)=>{let t=r.length-1,n=[],i,s=e===2?"<svg>":"",a=N;for(let l=0;l<t;l++){let o=r[l],c,d,h=-1,p=0;for(;p<o.length&&(a.lastIndex=p,d=a.exec(o),d!==null);)p=a.lastIndex,a===N?d[1]==="!--"?a=ke:d[1]!==void 0?a=Me:d[2]!==void 0?(Ue.test(d[2])&&(i=RegExp("</"+d[2],"g")),a=S):d[3]!==void 0&&(a=S):a===S?d[0]===">"?(a=i??N,h=-1):d[1]===void 0?h=-2:(h=a.lastIndex-d[2].length,c=d[1],a=d[3]===void 0?S:d[3]==='"'?He:Pe):a===He||a===Pe?a=S:a===ke||a===Me?a=N:(a=S,i=void 0);let u=a===S&&r[l+1].startsWith("/>")?" ":"";s+=a===N?o+it:h>=0?(n.push(c),o.slice(0,h)+_e+o.slice(h)+x+u):o+x+(h===-2?(n.push(void 0),l):u)}return[De(r,s+(r[t]||"<?>")+(e===2?"</svg>":"")),n]},D=class r{constructor({strings:e,_$litType$:t},n){let i;this.parts=[];let s=0,a=0,l=e.length-1,o=this.parts,[c,d]=rt(e,t);if(this.el=r.createElement(c,n),E.currentNode=this.el.content,t===2){let h=this.el.content,p=h.firstChild;p.remove(),h.append(...p.childNodes)}for(;(i=E.nextNode())!==null&&o.length<l;){if(i.nodeType===1){if(i.hasAttributes()){let h=[];for(let p of i.getAttributeNames())if(p.endsWith(_e)||p.startsWith(x)){let u=d[a++];if(h.push(p),u!==void 0){let y=i.getAttribute(u.toLowerCase()+_e).split(x),$=/([.?@])?(.*)/.exec(u);o.push({type:1,index:s,name:$[2],strings:y,ctor:$[1]==="."?ge:$[1]==="?"?ue:$[1]==="@"?be:H})}else o.push({type:6,index:s})}for(let p of h)i.removeAttribute(p)}if(Ue.test(i.tagName)){let h=i.textContent.split(x),p=h.length-1;if(p>0){i.textContent=M?M.emptyScript:"";for(let u=0;u<p;u++)i.append(h[u],U()),E.nextNode(),o.push({type:2,index:++s});i.append(h[p],U())}}}else if(i.nodeType===8)if(i.data===je)o.push({type:2,index:s});else{let h=-1;for(;(h=i.data.indexOf(x,h+1))!==-1;)o.push({type:7,index:s}),h+=x.length-1}s++}}static createElement(e,t){let n=A.createElement("template");return n.innerHTML=e,n}};function P(r,e,t=r,n){var i,s,a,l;if(e===C)return e;let o=n!==void 0?(i=t._$Co)===null||i===void 0?void 0:i[n]:t._$Cl,c=B(e)?void 0:e._$litDirective$;return o?.constructor!==c&&((s=o?._$AO)===null||s===void 0||s.call(o,!1),c===void 0?o=void 0:(o=new c(r),o._$AT(r,t,n)),n!==void 0?((a=(l=t)._$Co)!==null&&a!==void 0?a:l._$Co=[])[n]=o:t._$Cl=o),o!==void 0&&(e=P(r,o._$AS(r,e.values),o,n)),e}var pe=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;let{el:{content:n},parts:i}=this._$AD,s=((t=e?.creationScope)!==null&&t!==void 0?t:A).importNode(n,!0);E.currentNode=s;let a=E.nextNode(),l=0,o=0,c=i[0];for(;c!==void 0;){if(l===c.index){let d;c.type===2?d=new z(a,a.nextSibling,this,e):c.type===1?d=new c.ctor(a,c.name,c.strings,this,e):c.type===6&&(d=new fe(a,this,e)),this._$AV.push(d),c=i[++o]}l!==c?.index&&(a=E.nextNode(),l++)}return E.currentNode=A,s}v(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}},z=class r{constructor(e,t,n,i){var s;this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=i,this._$Cp=(s=i?.isConnected)===null||s===void 0||s}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=P(this,e,t),B(e)?e===_||e==null||e===""?(this._$AH!==_&&this._$AR(),this._$AH=_):e!==this._$AH&&e!==C&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):st(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==_&&B(this._$AH)?this._$AA.nextSibling.data=e:this.$(A.createTextNode(e)),this._$AH=e}g(e){var t;let{values:n,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=D.createElement(De(i.h,i.h[0]),this.options)),i);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===s)this._$AH.v(n);else{let a=new pe(s,this),l=a.u(this.options);a.v(n),this.$(l),this._$AH=a}}_$AC(e){let t=Re.get(e.strings);return t===void 0&&Re.set(e.strings,t=new D(e)),t}T(e){Ne(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,n,i=0;for(let s of e)i===t.length?t.push(n=new r(this.k(U()),this.k(U()),this,this.options)):n=t[i],n._$AI(s),i++;i<t.length&&(this._$AR(n&&n._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var n;for((n=this._$AP)===null||n===void 0||n.call(this,!1,!0,t);e&&e!==this._$AB;){let i=e.nextSibling;e.remove(),e=i}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}},H=class{constructor(e,t,n,i,s){this.type=1,this._$AH=_,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=s,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=_}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,n,i){let s=this.strings,a=!1;if(s===void 0)e=P(this,e,t,0),a=!B(e)||e!==this._$AH&&e!==C,a&&(this._$AH=e);else{let l=e,o,c;for(e=s[0],o=0;o<s.length-1;o++)c=P(this,l[n+o],t,o),c===C&&(c=this._$AH[o]),a||(a=!B(c)||c!==this._$AH[o]),c===_?e=_:e!==_&&(e+=(c??"")+s[o+1]),this._$AH[o]=c}a&&!i&&this.j(e)}j(e){e===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},ge=class extends H{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===_?void 0:e}},at=M?M.emptyScript:"",ue=class extends H{constructor(){super(...arguments),this.type=4}j(e){e&&e!==_?this.element.setAttribute(this.name,at):this.element.removeAttribute(this.name)}},be=class extends H{constructor(e,t,n,i,s){super(e,t,n,i,s),this.type=5}_$AI(e,t=this){var n;if((e=(n=P(this,e,t,0))!==null&&n!==void 0?n:_)===C)return;let i=this._$AH,s=e===_&&i!==_||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,a=e!==_&&(i===_||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,n;typeof this._$AH=="function"?this._$AH.call((n=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&n!==void 0?n:this.element,e):this._$AH.handleEvent(e)}},fe=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){P(this,e)}};var Oe=X.litHtmlPolyfillSupport;Oe?.(D,z),((de=X.litHtmlVersions)!==null&&de!==void 0?de:X.litHtmlVersions=[]).push("2.8.0");var ze=(r,e,t)=>{var n,i;let s=(n=t?.renderBefore)!==null&&n!==void 0?n:e,a=s._$litPart$;if(a===void 0){let l=(i=t?.renderBefore)!==null&&i!==void 0?i:null;s._$litPart$=a=new z(e.insertBefore(U(),l),l,void 0,t??{})}return a._$AI(r),a};var ve,me;var m=class extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;let n=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=n.firstChild),n}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ze(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return C}};m.finalized=!0,m._$litElement$=!0,(ve=globalThis.litElementHydrateSupport)===null||ve===void 0||ve.call(globalThis,{LitElement:m});var Ie=globalThis.litElementPolyfillSupport;Ie?.({LitElement:m});((me=globalThis.litElementVersions)!==null&&me!==void 0?me:globalThis.litElementVersions=[]).push("3.3.3");var Y=r=>e=>typeof e=="function"?((t,n)=>(customElements.define(t,n),n))(r,e):((t,n)=>{let{kind:i,elements:s}=n;return{kind:i,elements:s,finisher(a){customElements.define(t,a)}}})(r,e);var ot=(r,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,r)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,r)}},lt=(r,e,t)=>{e.constructor.createProperty(t,r)};function R(r){return(e,t)=>t!==void 0?lt(r,e,t):ot(r,e)}function v(r){return R({...r,state:!0})}var T=({finisher:r,descriptor:e})=>(t,n)=>{var i;if(n===void 0){let s=(i=t.originalKey)!==null&&i!==void 0?i:t.key,a=e!=null?{kind:"method",placement:"prototype",key:s,descriptor:e(t.key)}:{...t,key:s};return r!=null&&(a.finisher=function(l){r(l,s)}),a}{let s=t.constructor;e!==void 0&&Object.defineProperty(t,n,e(n)),r?.(s,n)}};function G(r,e){return T({descriptor:t=>{let n={get(){var i,s;return(s=(i=this.renderRoot)===null||i===void 0?void 0:i.querySelector(r))!==null&&s!==void 0?s:null},enumerable:!0,configurable:!0};if(e){let i=typeof t=="symbol"?Symbol():"__"+t;n.get=function(){var s,a;return this[i]===void 0&&(this[i]=(a=(s=this.renderRoot)===null||s===void 0?void 0:s.querySelector(r))!==null&&a!==void 0?a:null),this[i]}}return n}})}var ye,Lt=((ye=window.HTMLSlotElement)===null||ye===void 0?void 0:ye.prototype.assignedElements)!=null?(r,e)=>r.assignedElements(e):(r,e)=>r.assignedNodes(e).filter((t=>t.nodeType===Node.ELEMENT_NODE));var qe=j`
  :host {
    --govee-accent: #22d3ee;
    --govee-accent-2: #14b8a6;
    --govee-glass-bg: rgba(20, 30, 38, 0.55);
    --govee-glass-border: rgba(148, 211, 224, 0.18);
    --govee-glass-highlight: rgba(255, 255, 255, 0.06);
    --govee-radius: 22px;
    --govee-text: #eaf6f8;
    --govee-text-dim: rgba(234, 246, 248, 0.6);
    display: block;
  }

  ha-card {
    position: relative;
    overflow: hidden;
    border-radius: var(--govee-radius);
    background: var(--govee-current-tint, var(--govee-glass-bg));
    border: 1px solid var(--govee-glass-border);
    backdrop-filter: blur(18px) saturate(140%);
    -webkit-backdrop-filter: blur(18px) saturate(140%);
    color: var(--govee-text);
    padding: 18px 18px 14px;
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.35),
      inset 0 1px 0 var(--govee-glass-highlight);
    transition: background 0.6s ease;
  }

  /* While actively dragging the color wheel or brightness bar, the tint is
     updated on every animation frame — a lingering CSS transition on the
     background would replay through each intermediate value, producing a
     laggy rainbow "trail" behind the pointer. Cut the transition for the
     duration of the drag; it resumes for state changes that come from
     elsewhere (an automation, another card, a scene). */
  ha-card.no-transition {
    transition: none;
  }

  ha-card.is-off {
    --govee-current-tint: rgba(20, 26, 32, 0.6);
    padding: 12px 18px;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
  }

  ha-card.is-off .header {
    margin-bottom: 0;
  }

  .header .icon-wrap {
    width: 40px;
    height: 40px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid var(--govee-glass-border);
    flex-shrink: 0;
    transition: background 0.3s ease, color 0.3s ease;
  }

  .header .icon-wrap ha-icon {
    color: var(--govee-icon-color, var(--govee-text-dim));
    --mdc-icon-size: 22px;
  }

  .header .titles {
    flex: 1;
    min-width: 0;
  }

  .header .name {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header .state {
    font-size: 12.5px;
    color: var(--govee-text-dim);
    margin-top: 2px;
  }

  ha-switch {
    --mdc-theme-secondary: var(--govee-accent);
    flex-shrink: 0;
  }

  .brightness-row {
    margin: 4px 0 16px;
  }

  .slider {
    position: relative;
    height: 30px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid var(--govee-glass-border);
    overflow: hidden;
    cursor: pointer;
    touch-action: none;
  }

  .slider .fill {
    position: absolute;
    inset: 0;
    width: 40%;
    background: var(--govee-slider-fill, linear-gradient(90deg, var(--govee-accent-2), var(--govee-accent)));
    opacity: 0.85;
    transition: width 0.08s linear, background 0.3s ease;
  }

  .slider .label {
    position: relative;
    z-index: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 14px;
    font-size: 11.5px;
    font-weight: 600;
    pointer-events: none;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }

  .slider.disabled {
    opacity: 0.4;
    pointer-events: none;
  }

  .tabs {
    display: flex;
    gap: 4px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--govee-glass-border);
    border-radius: 14px;
    padding: 4px;
    margin-bottom: 14px;
  }

  .tabs button {
    flex: 1;
    min-width: 0;
    border: none;
    background: transparent;
    color: var(--govee-text-dim);
    font-size: 11px;
    font-weight: 600;
    padding: 8px 4px;
    border-radius: 10px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: background 0.2s ease, color 0.2s ease;
    font-family: inherit;
  }

  .tabs button.active {
    background: linear-gradient(135deg, var(--govee-accent-2), var(--govee-accent));
    color: #06232a;
  }

  .tabs button:disabled {
    opacity: 0.35;
    cursor: default;
  }

  .panel {
    min-height: 150px;
  }

  /* --- color wheel --- */
  .wheel-wrap {
    display: flex;
    justify-content: center;
    padding: 6px 0 4px;
  }

  .wheel {
    position: relative;
    width: 170px;
    height: 170px;
    border-radius: 50%;
    touch-action: none;
    cursor: pointer;
    box-shadow: inset 0 0 0 1px var(--govee-glass-border), 0 6px 18px rgba(0, 0, 0, 0.3);
  }

  .wheel .thumb {
    position: absolute;
    width: 22px;
    height: 22px;
    margin: -11px 0 0 -11px;
    border-radius: 50%;
    background: var(--govee-thumb-color, #fff);
    border: 3px solid rgba(255, 255, 255, 0.9);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
    pointer-events: none;
  }

  /* --- temperature slider --- */
  .temp-slider {
    position: relative;
    height: 46px;
    border-radius: 16px;
    margin-top: 16px;
    background: linear-gradient(90deg, #ff9a4d, #fff3d6 50%, #a9d4ff);
    border: 1px solid var(--govee-glass-border);
    touch-action: none;
    cursor: pointer;
  }

  .temp-slider .thumb {
    position: absolute;
    top: 50%;
    width: 8px;
    height: 58px;
    margin-top: -29px;
    margin-left: -4px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
    pointer-events: none;
  }

  .kelvin-label {
    text-align: center;
    font-size: 12.5px;
    color: var(--govee-text-dim);
    margin-top: 8px;
  }

  /* --- scenes --- */
  .scene-subtabs {
    display: flex;
    gap: 6px;
    margin-bottom: 10px;
  }

  .scene-subtabs button {
    border: none;
    background: rgba(255, 255, 255, 0.05);
    color: var(--govee-text-dim);
    font-size: 11.5px;
    font-weight: 600;
    padding: 5px 12px;
    border-radius: 20px;
    cursor: pointer;
    font-family: inherit;
  }

  .scene-subtabs button.active {
    background: rgba(34, 211, 238, 0.22);
    color: var(--govee-accent);
  }

  .scene-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(84px, 1fr));
    gap: 10px;
    max-height: 260px;
    overflow-y: auto;
    padding-right: 2px;
  }

  .scene-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    border: none;
    background: transparent;
    padding: 0;
    font-family: inherit;
  }

  .scene-tile .thumb {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 16px;
    background-size: cover;
    background-position: center;
    border: 2px solid transparent;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    transition: transform 0.15s ease, border-color 0.15s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .scene-tile:active .thumb {
    transform: scale(0.94);
  }

  .scene-tile.selected .thumb {
    border-color: var(--govee-accent);
  }

  .scene-tile .thumb ha-icon {
    --mdc-icon-size: 26px;
    color: rgba(255, 255, 255, 0.85);
  }

  .scene-tile .scene-name {
    font-size: 10.5px;
    color: var(--govee-text-dim);
    text-align: center;
    line-height: 1.2;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .scene-tile.selected .scene-name {
    color: var(--govee-text);
  }

  .empty-hint {
    color: var(--govee-text-dim);
    font-size: 13px;
    text-align: center;
    padding: 24px 8px;
  }

  /* --- music mode --- */
  .music-toggle-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--govee-glass-border);
    border-radius: 14px;
    padding: 10px 14px;
    margin-bottom: 14px;
  }

  .music-toggle-row .label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 600;
  }

  .music-toggle-row ha-icon {
    --mdc-icon-size: 20px;
    color: var(--govee-accent);
  }

  .mode-section-label {
    font-size: 11.5px;
    font-weight: 600;
    color: var(--govee-text-dim);
    margin: 2px 0 8px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .mode-chip-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
  }

  .mode-chip {
    display: flex;
    align-items: center;
    gap: 6px;
    border: 1px solid var(--govee-glass-border);
    background: rgba(255, 255, 255, 0.05);
    color: var(--govee-text-dim);
    font-size: 12px;
    font-weight: 600;
    padding: 7px 12px;
    border-radius: 20px;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  }

  .mode-chip ha-icon {
    --mdc-icon-size: 16px;
  }

  .mode-chip.selected {
    background: linear-gradient(135deg, var(--govee-accent-2), var(--govee-accent));
    border-color: transparent;
    color: #06232a;
  }

  .sensitivity-row {
    margin-top: 2px;
  }
`;function Q(r,e,t){let n=t*e,i=n*(1-Math.abs(r/60%2-1)),s=t-n,a=0,l=0,o=0;return r<60?[a,l,o]=[n,i,0]:r<120?[a,l,o]=[i,n,0]:r<180?[a,l,o]=[0,n,i]:r<240?[a,l,o]=[0,i,n]:r<300?[a,l,o]=[i,0,n]:[a,l,o]=[n,0,i],[Math.round((a+s)*255),Math.round((l+s)*255),Math.round((o+s)*255)]}function Fe(r,e,t){r/=255,e/=255,t/=255;let n=Math.max(r,e,t),i=Math.min(r,e,t),s=n-i,a=0;s!==0&&(n===r?a=(e-t)/s%6:n===e?a=(t-r)/s+2:a=(r-e)/s+4,a*=60,a<0&&(a+=360));let l=n===0?0:s/n;return[a,l,n]}function Z([r,e,t]){return`rgb(${r}, ${e}, ${t})`}function ct(r){let e=0;for(let t=0;t<r.length;t++)e=(e<<5)-e+r.charCodeAt(t),e|=0;return Math.abs(e)}var dt=[[/christmas|noel|santa/i,"mdi:pine-tree"],[/halloween|ghost|pumpkin|fright|witch/i,"mdi:ghost"],[/valentine|romantic|love/i,"mdi:heart"],[/easter/i,"mdi:egg-easter"],[/birthday|party|carnival|dance|disco/i,"mdi:party-popper"],[/sunset|sunrise|sun|sunny|sunshine/i,"mdi:weather-sunny"],[/rain|storm|thunder|cloud/i,"mdi:weather-lightning-rainy"],[/snow|winter|glacier|ice/i,"mdi:snowflake"],[/ocean|sea|wave|beach|lake/i,"mdi:waves"],[/forest|tree|leaf|jungle|garden/i,"mdi:pine-tree"],[/fire|bonfire|flame/i,"mdi:fire"],[/star|meteor|galaxy|nebula|milky/i,"mdi:star-four-points"],[/mercury|venus|earth|mars|jupiter|saturn|uranus|neptune|planet/i,"mdi:orbit"],[/sleep|rest|calm|meditat|healing|soothing|quiet|leisure/i,"mdi:weather-night"],[/work|reading|focus/i,"mdi:book-open-page-variant"],[/game|sport/i,"mdi:controller-classic"],[/music|piano|song/i,"mdi:music"],[/candy|sweet/i,"mdi:candy"],[/rainbow|colorful|vivid/i,"mdi:palette"]];function Le(r){for(let[e,t]of dt)if(e.test(r))return t;return"mdi:auto-fix"}function Ke(r){let t=ct(r)%360,n=(t+46)%360;return`linear-gradient(135deg, hsl(${t}, 70%, 42%), hsl(${n}, 80%, 30%))`}var We={Ghost:"869b11becb7940a0b3f132c31c2660df-E9ACBCE9AD82_press.png",Siren:"313af9b4f6adccb3df9532fdefd6fcff-new_light_btn_scenes_alarm_press403x.png","A&M":"fd9d830dcf362b1b8f288fc7376982de-new_light_btn_scenes_am.png","White Light":"a4528d316c9a5f814ef0bf11a6ab3f10-new_light_btn_scenes_baiguang_press.png",Birthday:"61ea786e489bb29a4056ee0eb3637cfe-new_light_btn_scenes_birthday_press403x.png",Bonfire:"8a00dfcab8ebe66338a713551007e029-new_light_btn_scenes_bonfire_press.png",Candlelight:"c18ed5192dbf86cb67aa83dd165cadb1-new_light_btn_scenes_candle_press403x.png",Care:"7a1cef6a4943d5a2a65ff46beb103a14-new_light_btn_scenes_care_press403x.png",Carnival:"cffe683801570c4fd98fc325b7d21add-new_light_btn_scenes_carnival_press403x.png",Christmas:"1b39f49fcf816d4fedd5009ddb223960-new_light_btn_scenes_christmas_press403x.png","Christmas-A":"1b39f49fcf816d4fedd5009ddb223960-new_light_btn_scenes_christmas_press403x.png",Cornfield:"e07b01a769700d32fa5528b806ff569f-new_light_btn_scenes_cornfield_press403x.png",Dancing:"7ed0b9678d23ec4a1cd6f3225726ee60-new_light_btn_scenes_dance_wave_press403x.png",Desert:"1391f99fd4140976565c986446d8e5e4-new_light_btn_scenes_desert_press403x.png",Earth:"681eeb2b6742380b30d891b0de0a38ed-new_light_btn_scenes_diqiu_press.png",Dreamland:"2e0aba09ffe4eb031c3b4b003f7f4326-new_light_btn_scenes_dreamland_press403x.png",Fight:"3964a401728018405fabd5b35456e0ac-new_light_btn_scenes_duikang_press.png",Cloudy:"b05167bb0c8b6f4e860ff5b303b180df-new_light_btn_scenes_duoyun_press.png",Easter:"cc3208fd22a812e02895b7c5292af70b-new_light_btn_scenes_easter_press.png","Children's Day":"dfa93db594ef32efcd01f4d4eb5c02b5-new_light_btn_scenes_ertongjie_press.png",Excited:"3d8c6c9f7e99851fdb86b0e75b9a124d-new_light_btn_scenes_excited_press403x.png",Fall:"bbdd0096b29a8b5d5439d912e4962450-new_light_btn_scenes_fall_press403x.png",Dreamlike:"948aca8c0ac48e5267d14e7e825d5dfd-new_light_btn_scenes_fantasy_press.png","Father's Day":"24111abfe34bd6f6c8488390ea64e42f-new_light_btn_scenes_fathers_press403x.png",Crazy:"eca2bb5df5012eef6e28dcd94ac6022d-new_light_btn_scenes_fengkuang_press.png",Fireworks:"e09ce9e9f996911d497fdbe2df6d6608-new_light_btn_scenes_fireworks_press403x.png","The Piano":"191ba94a8bcca3160a437fa277cfb5f5-new_light_btn_scenes_gangqinjian_press.png",Glacier:"f12669c3f805fe8ccb8e33190f82f042-new_light_btn_scenes_glacier_press403x.png",Grassland:"f15a8793396294fb0e185c72394fd173-new_light_btn_scenes_grassland_press403x.png",Forest:"942511433fb7ed20cde18ee557d1eb2a-new_light_btn_scenes_green_forest_press403x.png","Candy Cane":"287e942e8a2215bd08a6fcb3546a4e17-new_light_btn_scenes_guaizhangtang_press.png",Neptune:"781cf7f2787e4a61dc58f1b066b51cf0-new_light_btn_scenes_haiwangxing_press.png",Halloween:"76b6f8b7bb34cea5f9497620dd0da49f-new_light_btn_scenes_halloween_press403x.png","Flower Field":"b180d6641badbe961bdbdcdb90cd374b-new_light_btn_scenes_huahai_press403x.png",Joyful:"e4af51bd8f0736975722fc2c4fb96968-new_light_btn_scenes_huanle_press.png",Mars:"87c29f5be70fda80b74d941d178c4ff0-new_light_btn_scenes_huoxing_press.png",Venus:"c54aa5aa40b123ea1482b41ac7eb1f0a-new_light_btn_scenes_jinxing_press.png","Dine Together":"f8606c28bf0259bd1dca45fdb7a84fff-new_light_btn_scenes_jucan_press.png","Karst Cave":"6409e4614e680f44fa9266daeca4c9d5-new_light_btn_scenes_karst_press403x.png",Fright:"71f9aeeba5341874f33884f7d1dc0274-new_light_btn_scenes_kongbu_press.png","Dashing Sleigh":"47fb72b41500c393548312666b29637d-new_light_btn_scenes_laxueqiao_press.png",Thunderstorm:"f0e2a43e3b770fa7ab3dbce1bc992ed8-new_light_btn_scenes_leiyu_press.png","Christmas Gift":"c1c279e7b9c677d167ef6b85938211c9-new_light_btn_scenes_liwu_press.png","Cherry blossoms":"c61b6282c37b88eba132124af5f4545a-new_light_btn_scenes_luoying_press.png",Meditation:"f4dd5a45696f4696978a3108a61fcd76-new_light_btn_scenes_meditation_press403x.png","Meditation (1)":"f4dd5a45696f4696978a3108a61fcd76-new_light_btn_scenes_meditation_press403x.png",Sunrise:"e485c606078415fd1d044d380786f244-new_light_btn_scenes_morning_press403x.png","Mother's Day":"fffa33f839df5234ed8145bc6fe616ef-new_light_btn_scenes_mothers_press403x.png",Jupiter:"dea88b77afba2c0e025c340e68badf7e-new_light_btn_scenes_muxing_press.png",Mysterious:"4687c3d680d0fd5675957fefdcf390e0-new_light_btn_scenes_mysterious_press403x.png","Jack-o'-lantern":"58a44f437a3718ae1fbdd86eb6c2600b-new_light_btn_scenes_nanguadeng_press.png","Neon City":"f277ea266cc3af4b99136a3e0918e272-new_light_btn_scenes_nihongchengshi_press.png",Aurora:"fb10d7e26a71b57f1e03736e123c2494-new_light_btn_scenes_northern_light_press403x.png","Party-A":"fa36d11000d0913769d14990163ee75d-new_light_btn_scenes_party_press403x.png","Party-B":"fa36d11000d0913769d14990163ee75d-new_light_btn_scenes_party_press403x.png",Enthusiastic:"357447e16b66908ed5514d11067e7270-new_light_btn_scenes_passionate_press403x.png","Dance Party":"5c8b4e697adbd0a3b65f6f70f1457cae-new_light_btn_scenes_prom_press403x.png",Light:"01bcfecfaf93f1c1a5e8433e427d40d7-new_light_btn_scenes_qingkuai_press.png",Sunny:"d940e21c4e9ab91b878e96cc4e6656ed-new_light_btn_scenes_qingtian_press.png",Refreshing:"f2044fd2fb9905229a252e9ed3674e24-new_light_btn_scenes_qingxin_press.png",Quiet:"d6cbf0cd40f5939f4cb17d7f32e51583-new_light_btn_scenes_quiet_press403x.png",Reading:"599fe425cd03417881c8b99b1548f53b-new_light_btn_scenes_reading_press403x.png",Release:"c51e1d38c634f3bac852cc8cf1ad3d3b-new_light_btn_scenes_release_press403x.png",Leisure:"e4a0a56ffde980e090dc956389bb1655-new_light_btn_scenes_rest_press403x.png",Romantic:"ff9294eb079dd33e1ac00c07bf0dee4d-new_light_btn_scenes_romantic_press403x.png",Mild:"c271faf0d058acc013d44a69d9e2d0c0-new_light_btn_scenes_rouhe_press.png",Sleep:"debfaa2cbd63ca8d3d5fc623a6a4d64c-new_light_btn_scenes_rumian_press.png",Wave:"6046fe2de59ff1d382aaa25f3b7ae5b6-new_light_btn_scenes_sea_wave_press403x.png","Mountain Forest":"ae6b4ee07793b111ff18e0e50ad7db06-new_light_btn_scenes_shanlin_press403x.png","Christmas Tree":"c7c7226a1b9d2e43d9ca2378015d94cc-new_light_btn_scenes_shegndanshu_press.png","Christmas Decor":"09443f04b0dd80393921cb25b7ba54b8-new_light_btn_scenes_shengdanzhuangshi_press403x.png",Blossom:"916acb32b189c83be0383b2ce8cc0704-new_light_btn_scenes_shengkai_press.png","Saint Patrick's Day":"71d8178dc047f4c5869d721e78fbcda7-new_light_btn_scenes_shengpatelikejie_press.png",Soothing:"f0512cb3c767c591f5495c70a667a4c4-new_light_btn_scenes_shuhuan_press.png",Mercury:"48cb94abc8b61414873ea6b95de132d6-new_light_btn_scenes_shuixing_press.png",Sports:"916c991aaf34e111e97e81a7801cf250-new_light_btn_scenes_sport_press403x.png",Spring:"2eca57558d8bcd1a6cba8a4fb7d923b5-new_light_btn_scenes_spring_press403x.png",Meteor:"208bc1caa42e3f0535826e4589b39f38-new_light_btn_scenes_star_meteor_press403x.png","Starry Sky":"7ee06dc3d64857db675a427d58d2bfc8-new_light_btn_scenes_star_sky_press403x.png",Summer:"597856282239cb176467801e1802c0ff-new_light_btn_scenes_summer_press403x.png",Sunset:"fc453d944fd5e97edfaa6a426f35438a-new_light_btn_scenes_sunset_press403x.png","Sunset Glow":"eaff6809cd6e7e9bad90359c70152099-new_light_btn_scenes_sunset_glow_press403x.png",Swing:"4ac3f02da69f1c4ddcab70b7386b20da-new_light_btn_scenes_swing_press403x.png",Candy:"58a549ca82db129c9054d3021a98c933-new_light_btn_scenes_tangguo_press.png",Fascination:"276fa9be893cc876f32562e38e67d281-new_light_btn_scenes_taozui_press.png",Tension:"810ea4cd552e872e01dbdbb31c05469a-new_light_btn_scenes_tension_press403x.png",Thanksgiving:"7d5682af58f3e8c4f53f78e42dfc7e76-new_light_btn_scenes_thanks_giving_press403x.png",Uranus:"6982ab5f1a5934b2d2654fbb7c8c0e18-new_light_btn_scenes_tianwangxing_press.png",Saturn:"00021f1a7874dc3687c7b5ac2da70486-new_light_btn_scenes_tuxing_press.png","Valentine's Day":"1f2315b496393e7b9158e336eb44f20e-new_light_btn_scenes_valentines_press403x.png",Game:"66b1289a9554b40e5ad6f5dc3103cc1d-new_light_btn_video_game_press403x.png",Colorful:"1c11a305964105448a7841dd2835a847-new_light_btn_scenes_vivid_press403x.png","Halloween Night":"578ab9c1032a65d1676ff920ba99e3f6-new_light_btn_scenes_wanchengye_press.png",Warm:"27cdbdec24b8f8056ae4afbbe954e7a8-new_light_btn_scenes_warm_hot_press403x.png","Warm B":"27cdbdec24b8f8056ae4afbbe954e7a8-new_light_btn_scenes_warm_hot_press403x.png",Breeze:"300a4caa18cb7170260030ff1eec9aef-new_light_btn_scenes_weifeng_press.png",Winter:"26cb78042ef30bd64a2ef74de1a9be07-new_light_btn_scenes_winter_press403x.png",Work:"bef75806198dfb950fb3a6ff91e91a51-new_light_btn_scenes_work_press403x.png",Nebula:"5c0b888be6134cc0494109c2de75c7c5-new_light_btn_scenes_xingyun_press.png",Spin:"f38cdf3e558025bade406e8cbdcc3ca4-new_light_btn_scenes_xuanzhuan_press.png",Sunshine:"ceb8db30933436b294b586a70133793f-new_light_btn_scenes_yangguang_press.png",Firefly:"f1d79404c17ef9d61e2f79e365609e52-new_light_btn_scenes_yinghuo_press.png","Milky Way":"d0de824dee543fe8bb64f32deeb26c7c-new_light_btn_scenes_yinhe_press.png",Healing:"ac2d876105e2422f6dcd5fe4b8174208-new_light_btn_scenes_zhiyu_press.png","Beer Festival":"96b372c327f8f1dc23c1af7af0d22180-new_light_btn_scenes_pijiujie_press.png",Beer:"96b372c327f8f1dc23c1af7af0d22180-new_light_btn_scenes_pijiujie_press.png"};var k=class extends m{setConfig(e){this._config=e}render(){return this._config?g`
      <div class="row">
        <label>Entité lumière Govee *</label>
        <ha-selector
          .hass=${this.hass}
          .selector=${{entity:{domain:"light"}}}
          .value=${this._config.entity??""}
          @value-changed=${e=>this._valueChanged("entity",e.detail.value)}
        ></ha-selector>
      </div>

      <div class="row">
        <label>Sélecteur de scènes (officielles)</label>
        <ha-selector
          .hass=${this.hass}
          .selector=${{entity:{domain:"select"}}}
          .value=${this._config.scene_entity??""}
          @value-changed=${e=>this._valueChanged("scene_entity",e.detail.value)}
        ></ha-selector>
      </div>

      <div class="row">
        <label>Sélecteur de scènes DIY</label>
        <ha-selector
          .hass=${this.hass}
          .selector=${{entity:{domain:"select"}}}
          .value=${this._config.diy_scene_entity??""}
          @value-changed=${e=>this._valueChanged("diy_scene_entity",e.detail.value)}
        ></ha-selector>
      </div>

      <div class="row">
        <label>Mode musique (interrupteur)</label>
        <ha-selector
          .hass=${this.hass}
          .selector=${{entity:{domain:"switch"}}}
          .value=${this._config.music_switch_entity??""}
          @value-changed=${e=>this._valueChanged("music_switch_entity",e.detail.value)}
        ></ha-selector>
      </div>

      <div class="row">
        <label>Type d'ambiance musicale</label>
        <ha-selector
          .hass=${this.hass}
          .selector=${{entity:{domain:"select"}}}
          .value=${this._config.music_mode_entity??""}
          @value-changed=${e=>this._valueChanged("music_mode_entity",e.detail.value)}
        ></ha-selector>
      </div>

      <div class="row">
        <label>Sensibilité micro</label>
        <ha-selector
          .hass=${this.hass}
          .selector=${{entity:{domain:"number"}}}
          .value=${this._config.music_sensitivity_entity??""}
          @value-changed=${e=>this._valueChanged("music_sensitivity_entity",e.detail.value)}
        ></ha-selector>
      </div>

      <div class="row">
        <label>Nom affiché</label>
        <ha-selector
          .hass=${this.hass}
          .selector=${{text:{}}}
          .value=${this._config.name??""}
          @value-changed=${e=>this._valueChanged("name",e.detail.value)}
        ></ha-selector>
        <div class="hint">Laisser vide pour utiliser le nom de l'entité</div>
      </div>

      <div class="two-col">
        <div class="row">
          <label>Icône</label>
          <ha-selector
            .hass=${this.hass}
            .selector=${{icon:{}}}
            .value=${this._config.icon??""}
            @value-changed=${e=>this._valueChanged("icon",e.detail.value)}
          ></ha-selector>
        </div>
        <div class="row">
          <label>Couleur de l'icône</label>
          <ha-selector
            .hass=${this.hass}
            .selector=${{color_rgb:{}}}
            .value=${this._config.icon_color??void 0}
            @value-changed=${e=>this._valueChanged("icon_color",e.detail.value)}
          ></ha-selector>
          <div class="hint">Laisser vide pour suivre la couleur de la lumière</div>
        </div>
      </div>

      <div class="row inline">
        <div>
          <label>Replier couleur / température / scènes par défaut</label>
          <div class="hint">Un clic sur un onglet déplie/replie son contenu</div>
        </div>
        <ha-selector
          .hass=${this.hass}
          .selector=${{boolean:{}}}
          .value=${this._config.collapsible!==!1}
          @value-changed=${e=>this._valueChanged("collapsible",e.detail.value)}
        ></ha-selector>
      </div>
    `:_}_valueChanged(e,t){let n={...this._config};t===""||t===void 0||t===null||Array.isArray(t)&&t.length===0?delete n[e]:n[e]=t,this._config=n,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:n},bubbles:!0,composed:!0}))}};k.styles=j`
    .row {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-bottom: 16px;
    }
    .row.inline {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    label {
      font-size: 13px;
      font-weight: 500;
      color: var(--secondary-text-color, #888);
    }
    .hint {
      font-size: 12px;
      color: var(--secondary-text-color, #888);
      margin-top: -2px;
    }
    .two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
  `,b([R({attribute:!1})],k.prototype,"hass",2),b([v()],k.prototype,"_config",2),k=b([Y("govee-like-light-card-editor")],k);var ht={Rhythm:"mdi:waveform",Sway:"mdi:motion",Flow:"mdi:waves",Star:"mdi:star-four-points",Twinkle:"mdi:star-shooting",Hopping:"mdi:chart-bell-curve",Rolling:"mdi:rotate-3d-variant","Day and Night":"mdi:weather-night-partly-cloudy","Piano Keys":"mdi:piano",Separation:"mdi:call-split"},Ve="/local/images/govee_img/",f=class extends m{constructor(){super(...arguments);this._activeTab=null;this._sceneTab="official";this._initialTabPicked=!1;this._draggingBrightness=null;this._draggingHue=null;this._draggingSat=null;this._draggingKelvin=null;this._draggingSensitivity=null;this._rafPending=!1;this._lastKnownRgb=null}setConfig(t){if(!t.entity)throw new Error("Il faut renseigner une entit\xE9 `entity` (light.xxx Govee)");this._config={image_path:Ve,show_temperature:!0,collapsible:!0,...t}}getCardSize(){return this._config?.collapsible===!1?6:3}static getStubConfig(){return{type:"custom:govee-like-light-card",entity:"",collapsible:!0}}static getConfigElement(){return document.createElement("govee-like-light-card-editor")}get _stateObj(){return this.hass?.states?.[this._config.entity]}get _sceneStateObj(){return this._config.scene_entity?this.hass?.states?.[this._config.scene_entity]:void 0}get _diySceneStateObj(){return this._config.diy_scene_entity?this.hass?.states?.[this._config.diy_scene_entity]:void 0}get _musicSwitchStateObj(){return this._config.music_switch_entity?this.hass?.states?.[this._config.music_switch_entity]:void 0}get _musicModeStateObj(){return this._config.music_mode_entity?this.hass?.states?.[this._config.music_mode_entity]:void 0}get _musicSensitivityStateObj(){return this._config.music_sensitivity_entity?this.hass?.states?.[this._config.music_sensitivity_entity]:void 0}updated(t){super.updated(t),t.has("hass")&&(this._draggingBrightness=null,this._draggingHue=null,this._draggingSat=null,this._draggingKelvin=null,this._draggingSensitivity=null)}render(){let t=this._stateObj;if(!t)return g`<ha-card
        ><div class="empty-hint">
          Entité introuvable : <code>${this._config.entity}</code>
        </div></ha-card
      >`;let n=t.state==="on",i=t.attributes??{},s=i.supported_color_modes??[],a=s.includes("rgb")||s.includes("hs")||s.includes("xy"),l=s.includes("color_temp")&&this._config.show_temperature!==!1,o=!!this._sceneStateObj,c=!!this._diySceneStateObj,d=o||c,h=this._musicSwitchStateObj,p=this._musicModeStateObj,u=this._musicSensitivityStateObj,y=!!h||!!p||!!u,$=this._config.collapsible!==!1;!$&&!this._initialTabPicked&&(this._activeTab=a?"color":l?"temp":d?"scenes":y?"music":null,this._initialTabPicked=!0),this._activeTab==="color"&&!a&&(this._activeTab=null),this._activeTab==="temp"&&!l&&(this._activeTab=null),this._activeTab==="scenes"&&!d&&(this._activeTab=null),this._activeTab==="music"&&!y&&(this._activeTab=null);let I=L=>{this._activeTab=this._activeTab===L&&$?null:L},q=this._draggingBrightness??(n?Math.round((i.brightness??255)/255*100):0),ee=i.rgb_color;n&&ee&&(this._lastKnownRgb=ee);let F=ee??this._lastKnownRgb??[255,255,255],[Je,Xe]=Fe(F[0],F[1],F[2]),te=this._draggingHue??Je,ne=this._draggingSat??Xe,ie=Z(Q(te,ne,1)),Ye=a?`--govee-slider-fill: linear-gradient(90deg, ${Z(Q(te,ne,.35))}, ${ie})`:"",we=n?this._tintFor(F,q):void 0,Ge=this._draggingHue!==null||this._draggingSat!==null||this._draggingBrightness!==null,Qe=this._config.icon||i.icon||"mdi:led-strip-variant",xe=this._config.icon_color?Z(this._config.icon_color):n?ie:void 0,Ze=[n?"":"is-off",Ge?"no-transition":""].filter(Boolean).join(" ");return g`
      <ha-card
        class=${Ze}
        style=${we?`--govee-current-tint: ${we}`:""}
      >
        <div class="header">
          <div
            class="icon-wrap"
            style=${xe?`--govee-icon-color: ${xe}`:""}
            @click=${this._toggle}
          >
            <ha-icon icon=${Qe}></ha-icon>
          </div>
          <div class="titles">
            <div class="name">${this._config.name||i.friendly_name||this._config.entity}</div>
            <div class="state">${n?`Allum\xE9e \xB7 ${q}%`:"\xC9teinte"}</div>
          </div>
          <ha-switch .checked=${n} @change=${this._toggle}></ha-switch>
        </div>

        ${n?g`
              <div class="brightness-row">
                <div
                  class="slider brightness"
                  style=${Ye}
                  @pointerdown=${L=>this._startBrightnessDrag(L)}
                >
                  <div class="fill" style="width:${q}%"></div>
                  <div class="label">
                    <span>Luminosité</span>
                    <span>${q}%</span>
                  </div>
                </div>
              </div>

              <div class="tabs">
                <button
                  class=${this._activeTab==="color"?"active":""}
                  ?disabled=${!a}
                  @click=${()=>I("color")}
                >
                  Couleur
                </button>
                <button
                  class=${this._activeTab==="temp"?"active":""}
                  ?disabled=${!l}
                  @click=${()=>I("temp")}
                >
                  Température
                </button>
                <button
                  class=${this._activeTab==="scenes"?"active":""}
                  ?disabled=${!d}
                  @click=${()=>I("scenes")}
                >
                  Scènes
                </button>
                <button
                  class=${this._activeTab==="music"?"active":""}
                  ?disabled=${!y}
                  @click=${()=>I("music")}
                >
                  Musique
                </button>
              </div>
            `:_}
        ${n&&this._activeTab?g`
              <div class="panel">
                ${this._activeTab==="color"&&a?this._renderColorWheel(te,ne,ie):_}
                ${this._activeTab==="temp"&&l?this._renderTempSlider(i):_}
                ${this._activeTab==="scenes"&&d?this._renderScenes(o,c):_}
                ${this._activeTab==="music"&&y?this._renderMusic(h,p,u):_}
              </div>
            `:_}
      </ha-card>
    `}_tintFor(t,n){let[i,s,a]=t,l=.16+n/100*.22;return`linear-gradient(160deg, rgba(${i}, ${s}, ${a}, ${l}), rgba(20, 30, 38, 0.6))`}_renderColorWheel(t,n,i){let s=t*Math.PI/180,a=n*78,l=85+a*Math.sin(s),o=85-a*Math.cos(s);return g`
      <div class="wheel-wrap">
        <div
          class="wheel"
          style="background: radial-gradient(circle at center, white 0%, transparent 72%), ${"conic-gradient(from 0deg, red, yellow, lime, cyan, blue, magenta, red)"}"
          @pointerdown=${d=>this._startWheelDrag(d)}
        >
          <div class="thumb" style="left:${l}px; top:${o}px; --govee-thumb-color:${i}"></div>
        </div>
      </div>
    `}_startWheelDrag(t){let n=t.currentTarget;n.setPointerCapture(t.pointerId);let i=l=>{let o=n.getBoundingClientRect(),c=o.left+o.width/2,d=o.top+o.height/2,h=l.clientX-c,p=l.clientY-d,u=Math.atan2(h,-p)*180/Math.PI;u<0&&(u+=360);let y=Math.min(1,Math.sqrt(h*h+p*p)/(o.width/2));this._draggingHue=u,this._draggingSat=y,this._throttledCallColor(u,y)};i(t);let s=l=>i(l),a=()=>{window.removeEventListener("pointermove",s),window.removeEventListener("pointerup",a),this._draggingHue!==null&&this._draggingSat!==null&&this._callColor(this._draggingHue,this._draggingSat)};window.addEventListener("pointermove",s),window.addEventListener("pointerup",a)}_throttledCallColor(t,n){this._rafPending||(this._rafPending=!0,requestAnimationFrame(()=>{this._rafPending=!1,this._callColor(t,n)}))}_callColor(t,n){let[i,s,a]=Q(t,n,1);this.hass.callService("light","turn_on",{entity_id:this._config.entity,rgb_color:[i,s,a]})}_startBrightnessDrag(t){let n=t.currentTarget;if(n.classList.contains("disabled"))return;n.setPointerCapture(t.pointerId);let i=l=>{let o=n.getBoundingClientRect(),c=Math.round(Math.max(0,Math.min(1,(l.clientX-o.left)/o.width))*100);this._draggingBrightness=c,this._throttledCallBrightness(c)};i(t);let s=l=>i(l),a=()=>{window.removeEventListener("pointermove",s),window.removeEventListener("pointerup",a),this._draggingBrightness!==null&&this._callBrightness(this._draggingBrightness)};window.addEventListener("pointermove",s),window.addEventListener("pointerup",a)}_throttledCallBrightness(t){this._rafPending||(this._rafPending=!0,requestAnimationFrame(()=>{this._rafPending=!1,this._callBrightness(t)}))}_callBrightness(t){if(t<=0){this.hass.callService("light","turn_off",{entity_id:this._config.entity});return}this.hass.callService("light","turn_on",{entity_id:this._config.entity,brightness_pct:t})}_renderTempSlider(t){let n=t.min_color_temp_kelvin??2e3,i=t.max_color_temp_kelvin??6500,s=this._draggingKelvin??t.color_temp_kelvin??Math.round((n+i)/2),a=Math.max(0,Math.min(1,(s-n)/(i-n)));return g`
      <div
        class="temp-slider"
        @pointerdown=${l=>this._startTempDrag(l,n,i)}
      >
        <div class="thumb" style="left:${a*100}%"></div>
      </div>
      <div class="kelvin-label">${s} K</div>
    `}_startTempDrag(t,n,i){let s=t.currentTarget;s.setPointerCapture(t.pointerId);let a=c=>{let d=s.getBoundingClientRect(),h=Math.max(0,Math.min(1,(c.clientX-d.left)/d.width)),p=Math.round(n+h*(i-n));this._draggingKelvin=p,this._throttledCallTemp(p)};a(t);let l=c=>a(c),o=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",o),this._draggingKelvin!==null&&this._callTemp(this._draggingKelvin)};window.addEventListener("pointermove",l),window.addEventListener("pointerup",o)}_throttledCallTemp(t){this._rafPending||(this._rafPending=!0,requestAnimationFrame(()=>{this._rafPending=!1,this._callTemp(t)}))}_callTemp(t){this.hass.callService("light","turn_on",{entity_id:this._config.entity,color_temp_kelvin:t})}_renderScenes(t,n){t&&n&&this._sceneTab!=="official"&&this._sceneTab!=="diy"&&(this._sceneTab="official");let i=t&&n,s=i?this._sceneTab:t?"official":"diy",a=s==="official"?this._sceneStateObj:this._diySceneStateObj,l=s==="official"?this._config.scene_entity:this._config.diy_scene_entity,o=(a?.attributes?.options??[]).filter(d=>d!=="None"),c=a?.state;return g`
      ${i?g`
            <div class="scene-subtabs">
              <button
                class=${s==="official"?"active":""}
                @click=${()=>this._sceneTab="official"}
              >
                Scènes
              </button>
              <button class=${s==="diy"?"active":""} @click=${()=>this._sceneTab="diy"}>
                DIY
              </button>
            </div>
          `:_}
      ${o.length===0?g`<div class="empty-hint">Aucune scène disponible pour le moment.</div>`:g`
            <div class="scene-grid">
              ${o.map(d=>this._renderSceneTile(d,d===c,l))}
            </div>
          `}
    `}_renderSceneTile(t,n,i){let s=We[t],a=this._config.image_path||Ve,l=s?`background-image: url('${a}${s}')`:`background: ${Ke(t)}`;return g`
      <button class="scene-tile ${n?"selected":""}" @click=${()=>this._selectScene(i,t)}>
        <div class="thumb" style=${l}>
          ${s?_:g`<ha-icon icon=${Le(t)}></ha-icon>`}
        </div>
        <div class="scene-name">${t}</div>
      </button>
    `}_selectScene(t,n){this.hass.callService("select","select_option",{entity_id:t,option:n})}_renderMusic(t,n,i){let s=t?.state==="on",a=(n?.attributes?.options??[]).filter(o=>o!=="None"),l=n?.state;return g`
      ${t?g`
            <div class="music-toggle-row">
              <div class="label"><ha-icon icon="mdi:music"></ha-icon> Mode musique</div>
              <ha-switch .checked=${s} @change=${()=>this._toggleMusicMode(s)}></ha-switch>
            </div>
          `:_}
      ${a.length?g`
            <div class="mode-section-label">Type d'ambiance</div>
            <div class="mode-chip-grid">
              ${a.map(o=>g`
                  <button
                    class="mode-chip ${o===l?"selected":""}"
                    @click=${()=>this._setMusicMode(o)}
                  >
                    <ha-icon icon=${ht[o]||"mdi:music-note"}></ha-icon>
                    ${o}
                  </button>
                `)}
            </div>
          `:_}
      ${i?this._renderSensitivitySlider(i):_}
    `}_toggleMusicMode(t){this._config.music_switch_entity&&this.hass.callService("switch",t?"turn_off":"turn_on",{entity_id:this._config.music_switch_entity})}_setMusicMode(t){this._config.music_mode_entity&&this.hass.callService("select","select_option",{entity_id:this._config.music_mode_entity,option:t})}_renderSensitivitySlider(t){let n=t.attributes?.min??0,i=t.attributes?.max??100,s=this._draggingSensitivity??Number(t.state??n),a=Math.max(0,Math.min(100,(s-n)/(i-n)*100));return g`
      <div class="sensitivity-row">
        <div class="slider" @pointerdown=${l=>this._startSensitivityDrag(l,n,i)}>
          <div class="fill" style="width:${a}%"></div>
          <div class="label">
            <span>Sensibilité micro</span>
            <span>${Math.round(s)}</span>
          </div>
        </div>
      </div>
    `}_startSensitivityDrag(t,n,i){if(!this._config.music_sensitivity_entity)return;let s=t.currentTarget;s.setPointerCapture(t.pointerId);let a=c=>{let d=s.getBoundingClientRect(),h=Math.max(0,Math.min(1,(c.clientX-d.left)/d.width)),p=Math.round(n+h*(i-n));this._draggingSensitivity=p,this._throttledCallSensitivity(p)};a(t);let l=c=>a(c),o=()=>{window.removeEventListener("pointermove",l),window.removeEventListener("pointerup",o),this._draggingSensitivity!==null&&this._callSensitivity(this._draggingSensitivity)};window.addEventListener("pointermove",l),window.addEventListener("pointerup",o)}_throttledCallSensitivity(t){this._rafPending||(this._rafPending=!0,requestAnimationFrame(()=>{this._rafPending=!1,this._callSensitivity(t)}))}_callSensitivity(t){this._config.music_sensitivity_entity&&this.hass.callService("number","set_value",{entity_id:this._config.music_sensitivity_entity,value:t})}_toggle(){let t=this._stateObj;this.hass.callService("light",t?.state==="on"?"turn_off":"turn_on",{entity_id:this._config.entity})}};f.styles=qe,b([R({attribute:!1})],f.prototype,"hass",2),b([v()],f.prototype,"_config",2),b([v()],f.prototype,"_activeTab",2),b([v()],f.prototype,"_sceneTab",2),b([v()],f.prototype,"_draggingBrightness",2),b([v()],f.prototype,"_draggingHue",2),b([v()],f.prototype,"_draggingSat",2),b([v()],f.prototype,"_draggingKelvin",2),b([v()],f.prototype,"_draggingSensitivity",2),b([G(".slider.brightness")],f.prototype,"_brightnessEl",2),b([G(".wheel")],f.prototype,"_wheelEl",2),b([G(".temp-slider")],f.prototype,"_tempEl",2),f=b([Y("govee-like-light-card")],f);window.customCards=window.customCards||[];window.customCards.push({type:"govee-like-light-card",name:"Govee-like Light Card",description:"Carte moderne glassmorphism pour les lumi\xE8res Govee (govee-homeassistant), avec s\xE9lecteur de sc\xE8nes graphique."});export{f as GoveeLikeLightCard};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
