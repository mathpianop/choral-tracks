(this["webpackJsonpchoral-tracks"]=this["webpackJsonpchoral-tracks"]||[]).push([[0],{49:function(e,t,n){},53:function(e,t,n){},55:function(e,t,n){},56:function(e,t,n){},57:function(e,t,n){},61:function(e,t,n){},62:function(e,t,n){},77:function(e,t,n){},78:function(e,t,n){},81:function(e,t,n){},82:function(e,t,n){},83:function(e,t,n){},84:function(e,t,n){},85:function(e,t,n){},86:function(e,t,n){},87:function(e,t,n){},88:function(e,t,n){},89:function(e,t,n){},91:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(23),c=n.n(a),o=n(21),s=n(11),i=n(1),u=n(2),l=n(5),d=n(6),f=(n(49),n(35)),b=n.n(f),j=(n(52),n(53),n(3));var p=function(e){return Object(j.jsx)("button",{className:function(){var t=e.selected?" selected":"";return"full-choir"===e.role?"PreferenceBtn full-choir"+t:"PreferenceBtn"+t}(),onClick:function(){e.handler(e.partName),e.setSelectedPreference({role:e.role,partName:e.partName})},children:e.content})};n(55);var h=function(e){var t=Object(r.useState)({role:"full-choir",partName:null}),n=Object(d.a)(t,2),a=n[0],c=n[1],o=function(e,t){return"full-choir"===a.role&&"full-choir"===e||a.role===e&&a.partName===t};return Object(j.jsxs)("div",{className:"Preferences",style:{gridTemplateColumns:"repeat (".concat(e.parts.length,", auto)")},children:[Object(j.jsx)("span",{children:"Emphasize"}),e.parts.map((function(t){return Object(j.jsx)(p,{partName:t.name,content:t.initial,role:"emphasize",handler:e.emphasizePart,selected:o("emphasize",t.name),setSelectedPreference:c},"emphasize-".concat(t.name))})),Object(j.jsx)("span",{children:"Isolate"}),e.parts.map((function(t){return Object(j.jsx)(p,{partName:t.name,content:t.initial,role:"isolate",handler:e.isolatePart,selected:o("isolate",t.name),setSelectedPreference:c},"isolate-".concat(t.name))})),Object(j.jsx)("div",{className:"full-choir-container",style:{gridColumn:"2 / ".concat(e.parts.length+2)},children:Object(j.jsx)(p,{onClick:e.fullChoir,selected:o("full-choir"),role:"full-choir",content:"Full Choir",handler:e.fullChoir,setSelectedPreference:c})})]})};n(56);var O=function(e){var t=Object(r.useState)(0),n=Object(d.a)(t,2),a=n[0],c=n[1],o=Object(r.useState)(0),s=Object(d.a)(o,2),i=s[0],u=s[1],l=Object(r.useRef)();return Object(r.useEffect)((function(){var e=window.getComputedStyle(l.current).getPropertyValue("width");u(parseInt(e.slice(0,3)))}),[]),Object(r.useEffect)((function(){var t=e.timestamp/e.duration*i;c(t)}),[e.timestamp]),Object(j.jsx)("div",{className:"ProgressMeter",ref:l,onClick:function(t){var n=t.target.getBoundingClientRect(),r=(t.clientX-n.x)/i*e.duration;e.seekTrack(r)},children:Object(j.jsx)("div",{className:"progress-bar",style:{width:a}})})},m=n(37),g=n.n(m),v=n(36),x=n.n(v),y=n(38),w=n.n(y);n(57);var S=function(e){var t=function(t){32===t.keyCode&&e.pauseTrack()};return Object(j.jsxs)("div",{className:"Controls",children:[Object(j.jsx)("button",{className:"control-btn",onClick:e.resetTrack,children:Object(j.jsx)(w.a,{})}),e.playing?Object(j.jsx)("button",{className:"control-btn",onClick:e.pauseTrack,onKeyUp:t,children:Object(j.jsx)(x.a,{})}):Object(j.jsx)("button",{className:"control-btn",onClick:e.playTrack,children:Object(j.jsx)(g.a,{})}),Object(j.jsx)("div",{className:"progress-meter-container",children:Object(j.jsx)(O,{seekTrack:e.seekTrack,duration:e.duration,timestamp:e.timestamp})})]})},k=(n(61),"https://choral-tracks-rails.up.railway.app/api");function N(){return N=Object(l.a)(Object(u.a)().mark((function e(t){var n,r,a,c,o,s=arguments;return Object(u.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=s.length>1&&void 0!==s[1]?s[1]:{},r=n.timeout,a=new AbortController,c=setTimeout((function(){return a.abort()}),r),e.next=6,fetch(t,Object(i.a)({signal:a.signal},n));case 6:return o=e.sent,clearTimeout(c),e.abrupt("return",o);case 9:case"end":return e.stop()}}),e)}))),N.apply(this,arguments)}var C=function(e){return N.apply(this,arguments)};function I(){return I=Object(l.a)(Object(u.a)().mark((function e(t,n){var r,a,c,o,s,i=arguments;return Object(u.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=i.length>2&&void 0!==i[2]?i[2]:{},c=r?r.timeout:null,e.prev=2,!(c>0)){e.next=9;break}return e.next=6,C(t,r);case 6:a=e.sent,e.next=12;break;case 9:return e.next=11,fetch(t,r);case 11:a=e.sent;case 12:e.next=18;break;case 14:throw e.prev=14,e.t0=e.catch(2),e.t0.isNetworkError=!0,e.t0;case 18:return e.next=20,a[n]();case 20:if(o=e.sent,!a.ok){e.next=25;break}return e.abrupt("return",o);case 25:if(401!==a.status){e.next=31;break}throw(s=new Error(a.message)).isUnauthorized=!0,s;case 31:throw a.bodyContent=o,console.log(a),new Error("Software Bug");case 34:case"end":return e.stop()}}),e,null,[[2,14]])}))),I.apply(this,arguments)}var P=function(e,t){return I.apply(this,arguments)};function E(){return(E=Object(l.a)(Object(u.a)().mark((function e(t){var n;return Object(u.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(k,"/songs/").concat(t,"/parts"),e.next=3,P(n,"json",{timeout:2e3});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var T=function(e){return E.apply(this,arguments)};function A(){return(A=Object(l.a)(Object(u.a)().mark((function e(t){var n,r,a;return Object(u.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=t.split(".")).splice(n.length-1,1,"mp3"),r=n.join("."),a=new Request(r),e.next=6,P(a,"arrayBuffer",{timeout:8e3});case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var D=function(e){return A.apply(this,arguments)};var z=function(e){var t=Object(r.useState)(1e4),n=Object(d.a)(t,2),a=n[0],c=n[1],o=Object(r.useState)(0),s=Object(d.a)(o,2),i=s[0],f=s[1],p=Object(r.useState)(!1),O=Object(d.a)(p,2),m=O[0],g=O[1],v=Object(r.useState)(!0),x=Object(d.a)(v,2),y=x[0],w=x[1],k=Object(r.useState)([]),N=Object(d.a)(k,2),C=N[0],I=N[1],P=Object(r.useState)(!1),E=Object(d.a)(P,2),A=E[0],z=E[1],M=Object(r.useRef)({data:{},gainNodes:{},sourceNodes:{},loaded:{}}),F=Object(r.useRef)({ctx:e.audioContext,time:0}),R=Object(r.useRef)(),B=function(){var e=Object(l.a)(Object(u.a)().mark((function e(t){var n;return Object(u.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D(t.recording_url);case 2:return n=e.sent,e.abrupt("return",F.current.ctx.decodeAudioData(n,(function(e){return M.current.loaded[t.name]=!0,console.log(t.name,"loaded"),U()&&w(!1),e})));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),U=function(){return Object.values(M.current.loaded).length===C.length},L=function(){m||(C.forEach((function(e){!function(e){M.current.data[e.name].then((function(t){var n=F.current.ctx.createBufferSource();M.current.sourceNodes[e.name]=n,n.buffer=t,n.connect(M.current.gainNodes[e.name]),M.current.gainNodes[e.name].connect(F.current.ctx.destination),n.start(0,i),console.log("Playing AudioBuffer",t,F.current.ctx),n.onended=function(){console.log("Ended")}}))}(e)})),g(!0))},q=function(){m&&(C.forEach((function(e){console.log("Stopping"),M.current.sourceNodes[e.name].stop(),console.log("Stopped playing ",M.current.sourceNodes[e.name])})),g(!1))},H=function(){q(),f(0)};Object(r.useEffect)((function(){A&&(L(),z(!1))}),[A]);var _=function(e){C.forEach((function(t){t.name===e?M.current.gainNodes[t.name].gain.value=1:M.current.gainNodes[t.name].gain.value=.15}))},J=function(e){C.forEach((function(t){t.name===e?M.current.gainNodes[t.name].gain.value=1:M.current.gainNodes[t.name].gain.value=0}))},G=function(){C.forEach((function(e){M.current.gainNodes[e.name].gain.value=1}))},K=function(){var t=Object(l.a)(Object(u.a)().mark((function t(){var n;return Object(u.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,T(e.id);case 2:n=t.sent,I(n);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(r.useEffect)((function(){var e=M.current.sourceNodes;return K(),function(){Object.values(e).forEach((function(e){return e.stop()}))}}),[]),Object(r.useEffect)((function(){C.length>0&&(C.forEach((function(e){M.current.data[e.name]=B(e),M.current.gainNodes[e.name]=F.current.ctx.createGain()})),Object.values(M.current.data)[0].then((function(e){return c(e.duration)})))}),[C]),Object(r.useEffect)((function(){return m?(F.current.previousTime=F.current.ctx.currentTime,R.current=setInterval((function(){var e=F.current.ctx.currentTime-F.current.previousTime;F.current.previousTime=F.current.ctx.currentTime,f((function(t){return t+e}))}),250)):clearInterval(R.current),function(){return clearInterval(R.current)}}),[m]),Object(r.useEffect)((function(){i>a&&H()}),[i]),Object(j.jsxs)("div",{className:"Song",children:[Object(j.jsx)("h2",{className:"song-title",children:e.title}),Object(j.jsx)("span",{className:"loading-message",children:y?"Loading song (this might take a bit)":""}),Object(j.jsxs)(b.a,{loading:y,children:[Object(j.jsx)(S,{playTrack:L,resetTrack:H,pauseTrack:q,seekTrack:function(e){m&&z(!0),q(),f(e)},timestamp:i,duration:a,playing:m}),Object(j.jsx)("span",{className:"parts",children:"Parts: ".concat(C.map((function(e){var t=e.name;return t.charAt(0)+t.slice(1)})).join(", "))}),function(){if(C.length>1)return Object(j.jsx)(h,{parts:C,emphasizePart:_,isolatePart:J,fullChoir:G})}()]})]})};n(62);var M=function(e){return Object(j.jsx)("button",{className:"SongBtn",onClick:function(){return e.setSelectedSong(e.id)},children:e.title})},F=n(43);var R=function e(t){return"/"!==t.charAt(t.length-1)?t:e(t.slice(0,-1))};var B=function(e){var t=Object(r.useState)(null),n=Object(d.a)(t,2),a=n[0],c=n[1],s=Object(r.useState)(new F.a),i=Object(d.a)(s,1)[0];return Object(j.jsxs)("div",{className:"Home",children:[Object(j.jsx)(o.b,{to:"".concat(R(e.match.url),"/admin"),children:Object(j.jsx)("button",{className:"nav-btn",children:"Admin"})}),Object(j.jsx)("h1",{children:"Holy Transfiguration Choir"}),Object(j.jsxs)("section",{id:"overview",children:[Object(j.jsx)("p",{children:'Welcome to the HT choral resources! Hopefully, there will be a lot more to come, but for right now, check out the song player below. If you click on one of the titles, you can play the song with options to hear your part by itself ("isolate"), or with the other parts softer ("emphasize").'}),Object(j.jsx)("p",{id:"disclaimer",children:'NB: \u2002 This player may not work on a mobile device. \xa0 Also, you may find that you get the best experience using headphones, especially when selecting "emphasize".'})]}),function(){if(e.songs)return e.songs.map((function(e){return function(e){return e.id===a?Object(j.jsx)(z,{title:e.title,id:e.id,audioContext:i},e.id):Object(j.jsx)(M,{title:e.title,id:e.id,setSelectedSong:c},e.title+e.id)}(e)}))}()]})};n(77);var U=function(e){var t=Object(r.useState)("new"===e.mode),n=Object(d.a)(t,2),a=n[0],c=n[1],o=function(){c(!0)},s=function(){c(!1)};return Object(j.jsx)("div",{className:"RecordingInput",children:"new"===e.mode?Object(j.jsx)("input",{type:"file",accept:"audio/*",name:"recording",onChange:e.handleFileUpload,required:!0}):a&&"edit"===e.mode?Object(j.jsxs)("div",{className:"override-recording",children:[Object(j.jsx)("input",{type:"file",accept:"audio/*",name:"recording",onChange:e.handleFileUpload,required:!0}),Object(j.jsx)("button",{className:"revert-btn",onClick:s,children:"Revert to Existing Recording"})]}):Object(j.jsx)("button",{type:"button",onClick:o,children:"Override Recording"})})},L=n(41),q=n.n(L),H=(n(78),n(30));var _=function(e){var t=function(){e.removePart(e.index)},n=function(t){e.updatePart(e.index,t.target.name,t.target.value)},r=function(t){e.updatePart(e.index,t.target.name,t.target.files[0])};return Object(j.jsx)(H.b,{draggableId:e.part.key,index:e.index,disabled:e.noDrag,children:function(a){return Object(j.jsxs)("li",Object(i.a)(Object(i.a)(Object(i.a)({className:"edit"===e.part.mode?"PartFormlet edit-part":"PartFormlet"},a.draggableProps),a.dragHandleProps),{},{ref:a.innerRef,children:[Object(j.jsx)("h4",{className:"part-number",children:"Part ".concat(e.index+1)}),Object(j.jsx)("input",{type:"text",name:"name",className:"text-input",placeholder:"Name",value:e.part.name,onChange:n,required:!0}),Object(j.jsx)("input",{type:"text",name:"initial",className:"text-input initial-input",placeholder:"Initial",value:e.part.initial,onChange:n,required:!0}),Object(j.jsx)("button",{type:"button",className:"remove-part-btn",onClick:t,children:Object(j.jsx)(q.a,{})}),Object(j.jsx)(U,{mode:e.part.mode,handleFileUpload:r})]}))}})},J=n(34),G=n.n(J);var K=function(e){var t=["initial","name","recording","pitch_order"],n=e?Object(i.a)(Object(i.a)({},e),{},{recording:"existing",mode:"edit",key:G()()}):Object(i.a)(Object(i.a)({},t.reduce((function(e,t){return e[t]="",e}),{})),{},{mode:"new",key:G()()});return Object(i.a)(Object(i.a)({},n),{},{data:function(){var e=this,n=new FormData;return t.forEach((function(t){n.append(t,e[t])})),n}})};n(81);function V(){return(V=Object(l.a)(Object(u.a)().mark((function e(t,n){return Object(u.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P("".concat(k,"/songs/").concat(t),"json",{method:"delete",headers:{Authorization:"Bearer ".concat(n)},timeout:3e3});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var W=function(e,t){return V.apply(this,arguments)};function X(){return(X=Object(l.a)(Object(u.a)().mark((function e(t,n,r){return Object(u.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P({method:"delete",url:"".concat(k,"/songs/").concat(t,"/parts/").concat(n),headers:{Authorization:"Bearer ".concat(r)},timeout:3e3});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var Q=function(e,t,n){return X.apply(this,arguments)};var Y=function(e){var t,n=new AbortController,r=[];function a(e,t){return{data:e,id:t,abortController:new AbortController,sent:!1}}function c(){return t.id?"".concat(k,"/songs/").concat(t.id):"".concat(k,"/songs")}function o(e){return e.id?"".concat(k,"/songs/").concat(t.id,"/parts/").concat(e.id):"".concat(k,"/songs/").concat(t.id,"/parts")}function s(t,r){return{method:(a=t.id,a?"patch":"post"),body:t.data,headers:{Authorization:"Bearer ".concat(e)},signal:n.signal,timeout:r};var a}function i(){return(i=Object(l.a)(Object(u.a)().mark((function e(){var n;return Object(u.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(void 0!==t){e.next=2;break}throw new Error("Song not registered");case 2:return s(t,3e3),e.next=5,P(c(),"json",s(t,3e3));case 5:return n=e.sent,t.id||(t.id=n.id),e.abrupt("return",n);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function d(){return(d=Object(l.a)(Object(u.a)().mark((function e(){var n,a;return Object(u.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=4;break}throw new Error("No song registered");case 4:if(t.id){e.next=8;break}throw new Error("Cannot send part: song not yet created");case 8:if(0!==r.length){e.next=12;break}throw new Error("No parts registered");case 12:if(!r.every((function(e){return e.sent}))){e.next=14;break}throw new Error("Cannot send part: all parts already sent");case 14:return n=r.filter((function(e){return!e.sent})),(a=n[0]).sent=!0,e.next=19,P(o(a),"json",s(a,15e3));case 19:return e.abrupt("return",e.sent);case 20:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return{addSong:function(e,n){if(t)throw new Error("Song already registered");return(t=a(e,n)).abortController},addPart:function(e,t){var n=a(e,t);return r.push(n),n.abortController},sendSong:function(){return i.apply(this,arguments)},sendNextPart:function(){return d.apply(this,arguments)},get hasNextPart(){return!r.every((function(e){return e.sent}))}}},Z=n(9);var $=function e(t,n){return Object.freeze({get:function(){return t&&t.length>0?Object.freeze(t.map(Object.freeze)):n?Object.freeze([Object.freeze(n())]):[]},add:function(n){return e([].concat(Object(Z.a)(t),[n]))},remove:function(n){if(t.length>1){var r=Object(Z.a)(t);return r.splice(n,1),e(r)}return this},change:function(n,r,a){return e(t.map((function(e,t){if(t===n){var c=Object(i.a)({},e);return c[r]=a,c}return e})))},findIndex:function(e,n){t.findIndex((function(t){return t[e]===n}))},move:function(n,r){var a=t[n];return t.splice(n,1),t.splice(r,0,a),e(t)}})};var ee=function(e){var t=Object(r.useState)((function(){var t=e.editableParts?e.editableParts.map(K):[];return $(t,K)})),n=Object(d.a)(t,2),a=n[0],c=n[1],o=Object(r.useState)((function(){return"edit"===e.statusInfo.factoryMode?e.editableSong.title:""})),s=Object(d.a)(o,2),f=s[0],b=s[1],p=function(e){return c((function(t){return t.remove(e)}))},h=function(e,t,n){c((function(r){return r.change(e,t,n)}))},O=function(t){e.setLoadings((function(e){return e={},t.forEach((function(t){e[t.name]={success:!1,mode:t.mode}})),Object(i.a)({},e)}))},m=function(t){e.setLoadings((function(e){return e[t].success=!0,Object(i.a)({},e)}))},g=function(){var t=function(){var t=Object.values(e.editableParts),n=a.get().filter((function(e){return e.id})).map((function(e){return e.id}));return t.filter((function(e){return!n.includes(e.id)}))}();e.setLoadings((function(e){return t.forEach((function(t){e[t.name]={success:!1,mode:"destroy"}})),Object(i.a)({},e)})),t.forEach((function(t){x(e.editableSong.id,t)}))},v=function(){var t=Object(l.a)(Object(u.a)().mark((function t(){return Object(u.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.setStatusInfo((function(e){return e.setDestroy()})),t.prev=1,t.next=4,W(e.editableSong.id,e.token);case 4:e.setStatusInfo((function(e){return e.setSuccess()})),t.next=11;break;case 7:t.prev=7,t.t0=t.catch(1),console.log(t.t0),e.setStatusInfo((function(e){return e.setFailure()}));case 11:case"end":return t.stop()}}),t,null,[[1,7]])})));return function(){return t.apply(this,arguments)}}(),x=function(){var t=Object(l.a)(Object(u.a)().mark((function t(n,r){return Object(u.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Q(n,r.id,e.token);case 3:m(r),t.next=9;break;case 6:t.prev=6,t.t0=t.catch(0),console.log(t.t0);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})));return function(e,n){return t.apply(this,arguments)}}(),y=function(t){var n=function(){var e=new FormData;return e.append("title",f),e.append("parts_promised",a.length),e.append("choir_id",1),e}(),r=[],c=e.editableParts?e.editableParts.id:null,o=t.addSong(n,c);return r.push(o),e.setAbortControllers([].concat(r)),t.sendSong()},w=function(t){var n=[],r=a.get().reduce((function(e,r){var c=function(e){return e.pitch_order=a.indexOf(e),e.data()}(r);return n.push(t.addPart(c,r.id)),e.push(t.sendNextPart()),e}),[]);return e.setAbortControllers([].concat(n)),r},S=function(){var t=Object(l.a)(Object(u.a)().mark((function t(){var n,r;return Object(u.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return O(a),e.editableParts&&g(),n=Y(e.token),t.prev=3,t.next=6,y(n);case 6:t.next=12;break;case 8:t.prev=8,t.t0=t.catch(3),e.setStatusInfo((function(e){return e.setFailure()})),console.log(t.t0);case 12:try{r=w(n)}catch(c){e.setStatusInfo((function(e){return e.setFailure()})),console.log(c)}r.forEach(function(){var e=Object(l.a)(Object(u.a)().mark((function e(t){return Object(u.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=m,e.next=3,t;case 3:e.t1=e.sent.name,(0,e.t0)(e.t1);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 14:case"end":return t.stop()}}),t,null,[[3,8]])})));return function(){return t.apply(this,arguments)}}(),k=function(){window.confirm("Do you really want to delete this song?")&&v()};return Object(j.jsxs)("form",{className:"SongForm",onSubmit:function(t){t.preventDefault(),e.setStatusInfo((function(e){return e.setDelivery()})),S()},children:[Object(j.jsx)("div",{className:"title-bar",children:Object(j.jsx)("input",{type:"text",name:"title",className:"text-input song-title-input",placeholder:"Song Title",value:f,onChange:function(e){return b(e.target.value)},required:!0})}),Object(j.jsx)(H.a,{onDragEnd:function(e){var t=e.destination,n=e.source;t&&t.index!==n.index&&c((function(e){return e.move(n.index,t.index)}))},children:Object(j.jsx)(H.c,{droppableId:"partsList",children:function(e){return Object(j.jsxs)("ul",Object(i.a)(Object(i.a)({id:"parts-list",ref:e.innerRef},e.droppableProps),{},{children:[a.get().map((function(e,t){return Object(j.jsx)(_,{index:t,part:e,updatePart:h,removePart:p,noDrag:0===a.get().length},e.key)})),e.placeholder]}))}})}),Object(j.jsxs)("div",{className:"main-form-btns",children:[Object(j.jsx)("button",{type:"button",className:"pseudo-btn",id:"add-part-btn",onClick:function(){return c((function(e){return e.add(K())}))},children:"Add Part"}),Object(j.jsx)("button",{type:"button",className:"song-form-cancel pseudo-btn",onClick:function(){return e.setStatusInfo((function(e){return e.reset()}))},children:"Cancel"}),function(){if("edit"===e.statusInfo.factoryMode)return Object(j.jsx)("button",{type:"button",className:"pseudo-btn",onClick:k,children:"Delete Song"})}(),Object(j.jsx)("input",{type:"submit",className:"pseudo-btn",value:"new"===e.statusInfo.factoryMode?"Submit Song":"Update Song"})]})]})};n(82);var te=function(e){var t=function(){return"new"===e.loading.mode?{working:"Loading",finished:"Loaded"}:"edit"===e.loading.mode?{working:"Updating",finished:"Updated"}:"destroy"===e.loading.mode?{working:"Destroying",finished:"Destroyed"}:void 0};return Object(j.jsx)("div",{className:"PartLoadedEntry",children:Object(j.jsx)("span",{className:e.loading.success?"finished":"working",children:e.loading.success?"".concat(e.partName,": ").concat(t().finished):"".concat(e.partName,": ").concat(t().working)})})};n(83);var ne=function(e){return Object(j.jsxs)("div",{className:"SubmitProgress",children:[Object(j.jsx)("span",{className:"top-message",children:function(){switch(e.statusInfo.jobStatus){case"creating":return"Creating song...";case"updating":return"Updating song...";case"destroying":return"Destroying song...";default:return""}}()}),Object(j.jsxs)("div",{className:"progress-status",children:["delivery"===e.factoryMode?Object.entries(e.loadings).map((function(e){return Object(j.jsx)(te,{partName:e[0],loading:e[1]},"".concat(e[0],"-key"))})):"",Object(j.jsx)("span",{className:"report-message",children:function(){switch(e.statusInfo.jobStatus){case"submitted":return"Song successfully created!";case"updated":return"Song succesfully updated!";case"destroyed":return"Song successfully destroyed!";case"failedToCreate":return"Rats! Song creation could not be completed";case"failedToUpdate":return"Rats! Song could not be succesfully updated";case"failedToDestroy":return"Rats! Song could not be succesfully destroyed";default:return""}}()})]})]})};n(84);var re=function(e){var t=Object(r.useState)({}),n=Object(d.a)(t,2),a=n[0],c=n[1],o=function(){e.setStatusInfo((function(e){e.jobStatus="assembly",e.factoryMode="new"}))};return Object(r.useEffect)((function(){Object.values(a).every((function(e){return e.success}))&&Object.values(a).length>0&&e.setStatusInfo((function(e){return e.setSuccess()}))}),[a]),Object(j.jsx)("div",{className:"SongFactory",children:Object(j.jsxs)("div",{className:"central-container",children:[function(){if(!e.statusInfo.isInProgress())return Object(j.jsx)("button",{className:"pseudo-btn",id:"new-song-btn",onClick:o,children:"New Song"})}(),function(){switch(e.statusInfo.factoryMode){case"new":return Object(j.jsx)(ee,{token:e.token,statusInfo:e.statusInfo,setStatusInfo:e.setStatusInfo,setLoadings:c,loadings:a,setAbortControllers:e.setAbortControllers});case"edit":return Object(j.jsx)(ee,{token:e.token,statusInfo:e.statusInfo,setStatusInfo:e.setStatusInfo,setLoadings:c,loadings:a,editableSong:e.editableSong,editableParts:e.editableParts,setAbortControllers:e.setAbortControllers});case"delivery":case"destruction":return Object(j.jsx)(ne,{loadings:a,statusInfo:e.statusInfo});default:return Object(j.jsx)("span",{className:"prompt",children:"Create a song or select one to edit"})}}()]})})},ae=n(42),ce=n.n(ae);n(85);var oe=function(e){var t=function(){e.editSong(e.song)};return Object(j.jsx)("div",{className:"SongInfo",children:Object(j.jsxs)("div",{className:"song-info-title-bar",children:[Object(j.jsx)("h5",{className:"song-info-title",children:e.song.title}),e.statusInfo.isInProgress()?"":Object(j.jsx)("button",{type:"button",className:"edit-btn",onClick:t,children:Object(j.jsx)(ce.a,{})})]})})};n(86);var se=function(e){return Object(j.jsx)("div",{className:"CurrentCollection",children:e.songs.map((function(t){return Object(j.jsx)(oe,{song:t,editSong:e.editSong,statusInfo:e.statusInfo},t.id)}))})};n(87);function ie(){return(ie=Object(l.a)(Object(u.a)().mark((function e(t,n){var r;return Object(u.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P("".concat(k,"/choirs/").concat(t,"/edit"),"json",{headers:{Authorization:"Bearer ".concat(n)}});case 2:return r=e.sent,e.abrupt("return",r.songs);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var ue=function(e,t){return ie.apply(this,arguments)};var le=function(e){var t=Object(r.useState)(e),n=Object(d.a)(t,2),a=n[0],c=n[1];return[a,function(e){c((function(t){var n=Object(i.a)({},t);return e(n),n}))}]};var de=function(){var e="none",t="idle";return{get jobStatus(){return e},set jobStatus(t){!function(e){if(!function(e){return"none"===e||"assembly"===e||"creating"===e||"created"===e||"failedToCreate"===e||"updating"===e||"updated"===e||"failedToUpdate"===e||"destroying"===e||"destroyed"===e||"failedToDestroy"===e}(e))throw new Error("".concat(e," is not a valid jobStatus"))}(t),e=t},get factoryMode(){return t},set factoryMode(e){!function(e){if(!function(e){return"idle"===e||"new"===e||"edit"===e||"delivery"===e||"destruction"===e}(e))throw new Error("".concat(e," is not a valid factoryMode"))}(e),t=e},setFailure:function(){switch(this.jobStatus){case"creating":this.jobStatus="failedToCreate";break;case"updating":this.jobStatus="failedToUpdate";break;case"destroying":this.jobStatus="failedToDestroy";break;default:throw new Error("Cannot setFailure when job is not in progress (jobStatus: ".concat(this.jobStatus,")"))}this.factoryMode="idle"},setSuccess:function(){switch(this.jobStatus){case"creating":this.jobStatus="created";break;case"updating":this.jobStatus="updated";break;case"destroying":this.jobStatus="destroyed";break;default:throw new Error("Cannot setSuccess when job is not in progress (jobStatus: ".concat(this.jobStatus,")"))}this.factoryMode="idle"},setDelivery:function(){switch(this.factoryMode){case"new":this.jobStatus="creating";break;case"edit":this.jobStatus="updating";break;default:throw new Error("Cannot setDelivery when factoryMode is ".concat(this.factoryMode))}this.factoryMode="delivery"},setDestroy:function(){this.jobStatus="destroying",this.factoryMode="destruction"},isInProgress:function(){return"assembly"===this.jobStatus||"creating"===this.jobStatus||"updating"===this.jobStatus||"destroying"===this.jobStatus},reset:function(){this.factoryMode="idle",this.jobStatus="none"}}};var fe=function(e){var t=Object(r.useState)([]),n=Object(d.a)(t,2),a=n[0],c=n[1],s=le(de()),i=Object(d.a)(s,2),f=i[0],b=i[1],p=Object(r.useState)(null),h=Object(d.a)(p,2),O=h[0],m=h[1],g=Object(r.useState)([]),v=Object(d.a)(g,2),x=v[0],y=v[1],w=Object(r.useState)([]),S=Object(d.a)(w,2),k=S[0],N=S[1],C=function(){var e=Object(l.a)(Object(u.a)().mark((function e(t){var n;return Object(u.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return m(t),e.next=3,T(t.id);case 3:n=e.sent,y(n),b((function(e){e.factoryMode="edit",e.jobStatus="assembly"}));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){var t=function(){var t=Object(l.a)(Object(u.a)().mark((function t(){var n;return Object(u.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,ue(e.choirId,e.token);case 2:n=t.sent,c(n);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return!f.isInProgress()&&e.choirId&&t(),function(){return k.forEach((function(e){return e.abort()}))}}),[f,e.adminId]),Object(j.jsxs)("div",{className:"Admin",children:[Object(j.jsx)(o.b,{to:".",children:Object(j.jsx)("button",{className:"nav-btn",children:"Home"})}),Object(j.jsxs)("div",{className:"layout-container",children:[Object(j.jsx)(se,{songs:a,editSong:C,statusInfo:f}),Object(j.jsx)(re,{statusInfo:f,setStatusInfo:b,editableSong:O,editableParts:x,token:e.token,setAbortControllers:N})]})]})};var be=function(e){return e.token?Object(j.jsx)(fe,{token:e.token,choirId:e.choirId}):Object(j.jsx)(s.a,{to:"./login"})},je=n(14);function pe(){return(pe=Object(l.a)(Object(u.a)().mark((function e(t,n){var r;return Object(u.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(r=new FormData).append("password",n),r.append("username",t),e.next=5,P("".concat(k,"/admins/login"),"json",{method:"post",body:r,timeout:4e3});case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var he=function(e,t){return pe.apply(this,arguments)};n(88);var Oe=function(e){var t=Object(r.useState)(!1),n=Object(d.a)(t,2),a=n[0],c=n[1],o=Object(r.useState)(!1),u=Object(d.a)(o,2),l=u[0],f=u[1],b=Object(r.useState)({username:"",password:""}),p=Object(d.a)(b,2),h=p[0],O=p[1],m=function(e){O(Object(i.a)(Object(i.a)({},h),{},Object(je.a)({},e.target.name,e.target.value)))};return a?Object(j.jsx)(s.a,{to:"./admin"}):Object(j.jsxs)("div",{className:"Login central-container",children:[Object(j.jsx)("span",{id:"incorrect-credentials-message",children:l?"Either the username or the password is incorrect":""}),Object(j.jsxs)("form",{onSubmit:function(t){t.preventDefault(),he(h.username,h.password).then((function(t){!function(e){try{localStorage.setItem("token",e)}catch(t){}}(t.token),e.setToken(t.token),c(!0)})).catch((function(e){e.isUnauthorized?f(!0):console.log(e)}))},children:[Object(j.jsx)("label",{htmlFor:"username",children:"Username"}),Object(j.jsx)("input",{type:"text",id:"username",name:"username",className:"text-input",value:h.username,onChange:m,required:!0}),Object(j.jsx)("label",{htmlFor:"password",children:"Password"}),Object(j.jsx)("input",{type:"password",id:"password",name:"password",className:"text-input",value:h.password,onChange:m,required:!0}),Object(j.jsx)("input",{type:"submit",className:"pseudo-btn",value:"Log in"})]})]})};function me(){return(me=Object(l.a)(Object(u.a)().mark((function e(t){var n;return Object(u.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="".concat(k,"/choirs/").concat(t),e.next=3,P(n,"json",{timeout:8e3});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var ge=function(e){return me.apply(this,arguments)};var ve=function(){var e=Object(r.useState)(function(){try{return localStorage.getItem("token")}catch(e){return console.log("Couldn't find token"),null}}()),t=Object(d.a)(e,2),n=t[0],a=t[1],c=Object(r.useState)(),o=Object(d.a)(c,2),f=o[0],b=o[1],p=Object(s.g)().choirId,h=function(){var e=Object(l.a)(Object(u.a)().mark((function e(){var t;return Object(u.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,ge(p);case 3:t=e.sent,b(t.songs),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){h()}),[]),Object(j.jsx)("div",{className:"Choir",children:Object(j.jsxs)(s.d,{children:[Object(j.jsx)(s.b,{exact:!0,path:"/choir/:choirId",render:function(e){return Object(j.jsx)(B,Object(i.a)(Object(i.a)({},e),{},{songs:f}))}}),Object(j.jsx)(s.b,{path:"/choir/:choirId/admin",render:function(e){return Object(j.jsx)(be,Object(i.a)(Object(i.a)({},e),{},{token:n,choirId:p}))}}),Object(j.jsx)(s.b,{path:"/choir/:choirId/login",render:function(e){return Object(j.jsx)(Oe,Object(i.a)(Object(i.a)({},e),{},{setToken:a}))}})]})})};n(89);var xe=function(){return Object(j.jsx)(o.a,{children:Object(j.jsx)(s.d,{children:Object(j.jsx)(s.b,{path:"/choir/:choirId",component:ve})})})};c.a.render(Object(j.jsx)(xe,{}),document.getElementById("root"))}},[[91,1,2]]]);
//# sourceMappingURL=main.88e1cac9.chunk.js.map