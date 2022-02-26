(this["webpackJsonpchoral-tracks"]=this["webpackJsonpchoral-tracks"]||[]).push([[0],{100:function(e,t,n){},101:function(e,t,n){},102:function(e,t,n){},103:function(e,t,n){},104:function(e,t,n){},105:function(e,t,n){},106:function(e,t,n){},107:function(e,t,n){},109:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n.n(a),r=n(27),o=n.n(r),s=n(18),i=n(0),u=n(5),l=(n(54),n(8)),d=n(3),b=n.n(d),j=n(6),f=n(42),p=n.n(f),m=(n(58),n(59),n(2));var h=function(e){return Object(m.jsx)("button",{className:function(){var t=e.selected?" selected":"";return"full-choir"===e.role?"PreferenceBtn full-choir"+t:"PreferenceBtn"+t}(),onClick:function(){e.handler(e.partName),e.setSelectedPreference({role:e.role,partName:e.partName})},children:e.content})};n(61);var g=function(e){var t=Object(a.useState)({role:"full-choir",partName:null}),n=Object(u.a)(t,2),c=n[0],r=n[1],o=function(e,t){return"full-choir"===c.role&&"full-choir"===e||c.role===e&&c.partName===t};return Object(m.jsxs)("div",{className:"Preferences",style:{gridTemplateColumns:"repeat (".concat(e.parts.length,", auto)")},children:[Object(m.jsx)("span",{children:"Emphasize"}),e.parts.map((function(t){return Object(m.jsx)(h,{partName:t.name,content:t.initial,role:"emphasize",handler:e.emphasizePart,selected:o("emphasize",t.name),setSelectedPreference:r},"emphasize-".concat(t.name))})),Object(m.jsx)("span",{children:"Isolate"}),e.parts.map((function(t){return Object(m.jsx)(h,{partName:t.name,content:t.initial,role:"isolate",handler:e.isolatePart,selected:o("isolate",t.name),setSelectedPreference:r},"isolate-".concat(t.name))})),Object(m.jsx)("div",{className:"full-choir-container",style:{gridColumn:"2 / ".concat(e.parts.length+2)},children:Object(m.jsx)(h,{onClick:e.fullChoir,selected:o("full-choir"),role:"full-choir",content:"Full Choir",handler:e.fullChoir,setSelectedPreference:r})})]})};n(62);var O=function(e){var t=Object(a.useState)(0),n=Object(u.a)(t,2),c=n[0],r=n[1],o=Object(a.useState)(0),s=Object(u.a)(o,2),i=s[0],l=s[1],d=Object(a.useRef)();return Object(a.useEffect)((function(){var e=window.getComputedStyle(d.current).getPropertyValue("width");l(parseInt(e.slice(0,3)))}),[]),Object(a.useEffect)((function(){var t=e.timestamp/e.duration*i;r(t)}),[e.timestamp]),Object(m.jsx)("div",{className:"ProgressMeter",ref:d,onClick:function(t){var n=t.target.getBoundingClientRect(),a=(t.clientX-n.x)/i*e.duration;e.seekTrack(a)},children:Object(m.jsx)("div",{className:"progress-bar",style:{width:c}})})},x=n(44),v=n.n(x),S=n(43),y=n.n(S),k=n(45),N=n.n(k);n(63);var w=function(e){var t=function(t){32===t.keyCode&&e.pauseTrack()};return Object(m.jsxs)("div",{className:"Controls",children:[Object(m.jsx)("button",{className:"control-btn",onClick:e.resetTrack,children:Object(m.jsx)(N.a,{})}),e.playing?Object(m.jsx)("button",{className:"control-btn",onClick:e.pauseTrack,onKeyUp:t,children:Object(m.jsx)(y.a,{})}):Object(m.jsx)("button",{className:"control-btn",onClick:e.playTrack,children:Object(m.jsx)(v.a,{})}),Object(m.jsx)("div",{className:"progress-meter-container",children:Object(m.jsx)(O,{seekTrack:e.seekTrack,duration:e.duration,timestamp:e.timestamp})})]})},C=(n(68),"https://choral-tracks.herokuapp.com/api");var P=function(e){var t=Object(a.useState)(1e4),n=Object(u.a)(t,2),c=n[0],r=n[1],o=Object(a.useState)(0),s=Object(u.a)(o,2),i=s[0],l=s[1],d=Object(a.useState)(!1),f=Object(u.a)(d,2),h=f[0],O=f[1],x=Object(a.useState)(!0),v=Object(u.a)(x,2),S=v[0],y=v[1],k=Object(a.useState)([]),N=Object(u.a)(k,2),P=N[0],T=N[1],E=Object(a.useState)(!1),M=Object(u.a)(E,2),F=M[0],J=M[1],I=Object(a.useRef)({data:{},gainNodes:{},sourceNodes:{},loaded:{}}),A=Object(a.useRef)({ctx:e.audioContext,time:0}),B=Object(a.useRef)(),z=function(){return Object.values(I.current.loaded).length===P.length},D=function(){h||(P.forEach((function(e){!function(e){I.current.data[e.name].then((function(t){var n=A.current.ctx.createBufferSource();I.current.sourceNodes[e.name]=n,n.buffer=t,n.connect(I.current.gainNodes[e.name]),I.current.gainNodes[e.name].connect(A.current.ctx.destination),n.start(0,i),console.log("Playing AudioBuffer",t,A.current.ctx),n.onended=function(){console.log("Ended")}}))}(e)})),O(!0))},R=function(){h&&(P.forEach((function(e){console.log("Stopping"),I.current.sourceNodes[e.name].stop(),console.log("Stopped playing ",I.current.sourceNodes[e.name])})),O(!1))},U=function(){R(),l(0)};Object(a.useEffect)((function(){F&&(D(),J(!1))}),[F]);var L=function(e){P.forEach((function(t){t.name===e?I.current.gainNodes[t.name].gain.value=1:I.current.gainNodes[t.name].gain.value=.15}))},q=function(e){P.forEach((function(t){t.name===e?I.current.gainNodes[t.name].gain.value=1:I.current.gainNodes[t.name].gain.value=0}))},_=function(){P.forEach((function(e){I.current.gainNodes[e.name].gain.value=1}))},H=function(){var t=Object(j.a)(b.a.mark((function t(n){var a,c;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(C,"/songs/").concat(e.id,"/parts"),{signal:n});case 2:return a=t.sent,t.next=5,a.json();case 5:c=t.sent,T(c);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(a.useEffect)((function(){var e=new AbortController,t=I.current.sourceNodes;return H(e.signal),function(){e.abort(),Object.values(t).forEach((function(e){return e.stop()}))}}),[]),Object(a.useEffect)((function(){P.length>0&&(P.forEach((function(e){I.current.data[e.name]=function(e){var t=new Request(function(e){var t=e.split(".");return t.splice(t.length-1,1,"mp3"),t.join(".")}(e.recording));return fetch(t).then((function(e){return e.arrayBuffer()})).then((function(t){return A.current.ctx.decodeAudioData(t,(function(t){return I.current.loaded[e.name]=!0,console.log(e.name,"loaded"),z()&&y(!1),t}))}))}(e),I.current.gainNodes[e.name]=A.current.ctx.createGain()})),Object.values(I.current.data)[0].then((function(e){return r(e.duration)})))}),[P]),Object(a.useEffect)((function(){return h?(A.current.previousTime=A.current.ctx.currentTime,B.current=setInterval((function(){var e=A.current.ctx.currentTime-A.current.previousTime;A.current.previousTime=A.current.ctx.currentTime,l((function(t){return t+e}))}),250)):clearInterval(B.current),function(){return clearInterval(B.current)}}),[h]),Object(a.useEffect)((function(){i>c&&U()}),[i]),Object(m.jsxs)("div",{className:"Song",children:[Object(m.jsx)("h2",{className:"song-title",children:e.title}),Object(m.jsx)("span",{className:"loading-message",children:S?"Loading song (this might take a bit)":""}),Object(m.jsxs)(p.a,{loading:S,children:[Object(m.jsx)(w,{playTrack:D,resetTrack:U,pauseTrack:R,seekTrack:function(e){h&&J(!0),R(),l(e)},timestamp:i,duration:c,playing:h}),Object(m.jsx)("span",{className:"parts",children:"Parts: ".concat(P.map((function(e){var t=e.name;return t.charAt(0)+t.slice(1)})).join(", "))}),function(){if(P.length>1)return Object(m.jsx)(g,{parts:P,emphasizePart:L,isolatePart:q,fullChoir:_})}()]})]})};n(69);var T=function(e){return Object(m.jsx)("button",{className:"SongBtn",onClick:function(){e.setSelectedSong(e.id)},children:e.title})},E=n(48);var M=function e(t){return"/"!==t.charAt(t.length-1)?t:e(t.slice(0,-1))};var F=function(e){var t=Object(a.useState)(null),n=Object(u.a)(t,2),c=n[0],r=n[1],o=Object(a.useState)([]),i=Object(u.a)(o,2),d=i[0],f=i[1],p=Object(l.h)().choirId,h=Object(a.useState)(new E.a),g=Object(u.a)(h,1)[0];return Object(a.useEffect)((function(){var e=new AbortController;return function(){var e=Object(j.a)(b.a.mark((function e(){var t,n;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("".concat(C,"/choirs/").concat(p));case 3:if(200!==(t=e.sent).status){e.next=9;break}return e.next=7,t.json();case 7:n=e.sent,f(n.songs);case 9:e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(){return e.apply(this,arguments)}}()(),function(){return e.abort()}}),[]),Object(m.jsxs)("div",{className:"Home",children:[Object(m.jsx)(s.b,{to:"".concat(M(e.match.url),"/admin"),children:Object(m.jsx)("button",{className:"nav-btn",children:"Admin"})}),Object(m.jsx)("h1",{children:"Holy Transfiguration Choir"}),Object(m.jsxs)("section",{id:"overview",children:[Object(m.jsx)("p",{children:'Welcome to the HT choral resources! Hopefully, there will be a lot more to come, but for right now, check out the song player below. If you click on one of the titles, you can play the song with options to hear your part by itself ("isolate"), or with the other parts softer ("emphasize").'}),Object(m.jsx)("p",{id:"disclaimer",children:'NB: \u2002 This player may not work on a mobile device. \xa0 Also, you may find that you get the best experience using headphones, especially when selecting "emphasize".'})]}),d.map((function(e){return function(e){return e.id===c?Object(m.jsx)(P,{title:e.title,id:e.id,audioContext:g},e.id):Object(m.jsx)(T,{title:e.title,id:e.id,setSelectedSong:r},e.title+e.id)}(e)}))]})},J=n(7);n(80);var I=function(e){var t=Object(a.useState)("new"===e.mode),n=Object(u.a)(t,2),c=n[0],r=n[1],o=function(){r(!0)},s=function(){r(!1)};return Object(m.jsx)("div",{className:"RecordingInput",children:"new"===e.mode?Object(m.jsx)("input",{type:"file",accept:"audio/*",name:"recording",onChange:e.handleFileUpload,required:!0}):c&&"edit"===e.mode?Object(m.jsxs)("div",{className:"override-recording",children:[Object(m.jsx)("input",{type:"file",accept:"audio/*",name:"recording",onChange:e.handleFileUpload,required:!0}),Object(m.jsx)("button",{className:"revert-btn",onClick:s,children:"Revert to Existing Recording"})]}):Object(m.jsx)("button",{type:"button",onClick:o,children:"Override Recording"})})},A=n(46),B=n.n(A);n(81);var z=function(e){var t=function(t){e.updatePart(e.index,t.target.name,t.target.value)};return Object(m.jsxs)("div",{className:"edit"===e.part.mode?"PartFormlet edit-part":"PartFormlet",children:[Object(m.jsx)("h4",{className:"part-number",children:"Part ".concat(e.index+1)}),Object(m.jsx)("input",{type:"text",name:"name",className:"text-input",placeholder:"Name",value:e.part.name,onChange:t,required:!0}),Object(m.jsx)("input",{type:"text",name:"initial",className:"text-input initial-input",placeholder:"Initial",value:e.part.initial,onChange:t,required:!0}),Object(m.jsx)("button",{type:"button",className:"remove-part-btn",onClick:function(){e.removePart(e.index)},children:Object(m.jsx)(B.a,{})}),Object(m.jsx)(I,{mode:e.part.mode,handleFileUpload:function(t){e.updatePart(e.index,t.target.name,t.target.files[0])}})]})},D=n(31),R=n.n(D),U=n(20),L=n.n(U);n(99);var q=function(e){var t=function(){return{name:"",initial:"",recording:"",mode:"new",key:R()()}},n=Object(a.useState)((function(){return function(){if(e.editableParts){for(var n=Object(J.a)(e.editableParts),a=0;a<e.editableSong.parts_promised;a++)n[a]&&a===n[a].pitch_order?n.splice(a,1,{id:(c=n[a]).id,name:c.name,initial:c.initial,recording:"existing",mode:"edit",key:R()()}):n.splice(a,0,t());return n}return[t()];var c}()})),c=Object(u.a)(n,2),r=c[0],o=c[1],s=Object(a.useState)((function(){return"edit"===e.factoryMode?e.editableSong.title:""})),l=Object(u.a)(s,2),d=l[0],f=l[1],p=function(e){if(r.length>1){var t=r;t.splice(e,1),o(Object(J.a)(t))}},h=function(e,t,n){var a=r;a[e][t]=n,o(Object(J.a)(a))},g=function(t){e.setLoadings((function(e){return e={},t.forEach((function(t){e[t.name]={success:!1,mode:t.mode,progressEvent:{}}})),Object(i.a)({},e)}))},O=function(t){e.setLoadings((function(e){return e[t.name].success=!0,Object(i.a)({},e)}))},x=function(){var t=function(){var t=Object.values(e.editableParts),n=r.filter((function(e){return e.id})).map((function(e){return e.id}));return t.filter((function(e){return!n.includes(e.id)}))}();e.setLoadings((function(e){return t.forEach((function(t){e[t.name]={success:!1,mode:"destroy"}})),Object(i.a)({},e)})),t.forEach((function(t){S(e.editableSong.id,t)}))},v=function(){var t=Object(j.a)(b.a.mark((function t(n){return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.setFactoryMode("destruction"),t.prev=1,t.next=4,L()({method:"delete",url:"".concat(C,"/songs/").concat(e.editableSong.id),headers:{Authorization:"Bearer ".concat(e.token)},cancelToken:n[0].token,timeout:3e3});case 4:200===t.sent.status&&(e.setJobStatus("destroyed"),e.setFactoryMode("idle")),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1),e.setJobStatus("failedToDestroy");case 11:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(e){return t.apply(this,arguments)}}(),S=function(){var t=Object(j.a)(b.a.mark((function t(n,a){return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,L()({method:"delete",url:"".concat(C,"/songs/").concat(n,"/parts/").concat(a.id),headers:{Authorization:"Bearer ".concat(e.token)},timeout:3e3});case 3:200===t.sent.status&&O(a),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e,n){return t.apply(this,arguments)}}(),y=function(){var t=Object(j.a)(b.a.mark((function t(n,a,c,r){var o,s;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return o="new"===a.mode?"post":"patch",s="new"===a.mode?"":a.id,t.prev=2,t.next=5,L()({method:o,url:"".concat(C,"/songs/").concat(n,"/parts/").concat(s),data:c,headers:{Authorization:"Bearer ".concat(e.token)},cancelToken:r.token,timeout:6e4});case 5:200===t.sent.status&&O(a),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(2),"new"===e.factoryMode?e.setJobStatus("failedToCreate"):"edit"===e.factoryMode&&e.setJobStatus("failedToUpdate");case 12:case"end":return t.stop()}}),t,null,[[2,9]])})));return function(e,n,a,c){return t.apply(this,arguments)}}(),k=function(e,t,n){var a=new FormData;a.append("name",e.name),a.append("initial",e.initial),a.append("recording",e.recording),a.append("song_id",t),a.append("pitch_order",r.indexOf(e)),y(t,e,a,n)},N=function(){var t=Object(j.a)(b.a.mark((function t(n,a){var c,r;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c="new"===e.factoryMode?"post":"patch",r="new"===e.factoryMode?"":e.editableSong.id,t.prev=2,t.next=5,L()({method:c,url:"".concat(C,"/songs/").concat(r),data:n,headers:{Authorization:"Bearer ".concat(e.token)},cancelToken:a.token,timeout:3e3});case 5:return t.abrupt("return",t.sent);case 8:t.prev=8,t.t0=t.catch(2),"creating"===e.jobStatus?e.setJobStatus("failedToCreate"):"updating"===e.jobStatus&&e.setJobStatus("failedToUpdate"),console.log(t.t0);case 12:case"end":return t.stop()}}),t,null,[[2,8]])})));return function(e,n){return t.apply(this,arguments)}}(),w=function(){var t=Object(j.a)(b.a.mark((function t(n){var a,c;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return g(r),e.editableParts&&x(),e.setFactoryMode("delivery"),(a=new FormData).append("title",d),a.append("parts_promised",r.length),t.next=8,N(a,n[0]);case 8:(c=t.sent)&&r.forEach((function(e,t){k(e,c.data.id,n[t+1])}));case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),P=function(){window.confirm("Do you really want to delete this song?")&&e.setJobStatus("destroying")};return Object(a.useEffect)((function(){if("creating"===e.jobStatus||"updating"===e.jobStatus){var t=r.map((function(){return L.a.CancelToken.source()}));t.push(L.a.CancelToken.source()),e.setCancelSources(Object(J.a)(t)),w(t)}else if("destroying"===e.jobStatus){var n=[L.a.CancelToken.source()];e.setCancelSources([].concat(n)),v(n)}}),[e.jobStatus]),Object(m.jsxs)("form",{className:"SongForm",onSubmit:function(t){t.preventDefault(),"new"===e.factoryMode?e.setJobStatus("creating"):e.setJobStatus("updating")},children:[Object(m.jsx)("div",{className:"title-bar",children:Object(m.jsx)("input",{type:"text",name:"title",className:"text-input song-title-input",placeholder:"Song Title",value:d,onChange:function(e){f(e.target.value)}})}),r.map((function(e,t){return Object(m.jsx)(z,{index:t,part:e,updatePart:h,removePart:p},e.key)})),Object(m.jsxs)("div",{className:"main-form-btns",children:[Object(m.jsx)("button",{type:"button",className:"pseudo-btn",id:"add-part-btn",onClick:function(){var e=t();return o((function(t){return[].concat(Object(J.a)(t),[e])})),t},children:"Add Part"}),Object(m.jsx)("button",{type:"button",className:"song-form-cancel pseudo-btn",onClick:function(){e.setFactoryMode("idle"),e.setJobStatus("none")},children:"Cancel"}),function(){if("edit"===e.factoryMode)return Object(m.jsx)("button",{type:"button",className:"pseudo-btn",onClick:P,children:"Delete Song"})}(),Object(m.jsx)("input",{type:"submit",className:"pseudo-btn",value:"new"===e.factoryMode?"Submit Song":"Update Song"})]})]})};n(100);var _=function(e){var t=function(){return"new"===e.loading.mode?{working:"Loading",finished:"Loaded"}:"edit"===e.loading.mode?{working:"Updating",finished:"Updated"}:"destroy"===e.loading.mode?{working:"Destroying",finished:"Destroyed"}:void 0};return Object(m.jsx)("div",{className:"PartLoadedEntry",children:Object(m.jsx)("span",{className:e.loading.success?"finished":"working",children:e.loading.success?"".concat(e.partName,": ").concat(t().finished):"".concat(e.partName,": ").concat(t().working)})})};n(101);var H=function(e){return Object(m.jsxs)("div",{className:"SubmitProgress",children:[Object(m.jsx)("span",{className:"top-message",children:function(){switch(e.jobStatus){case"creating":return"Creating song...";case"updating":return"Updating song...";case"destroying":return"Destroying song...";default:return""}}()}),Object(m.jsxs)("div",{className:"progress-status",children:["creating"===e.jobStatus||"updating"===e.jobStatus?Object.entries(e.loadings).map((function(e){return Object(m.jsx)(_,{partName:e[0],loading:e[1]},"".concat(e[0],"-key"))})):"",Object(m.jsx)("span",{className:"report-message",children:function(){switch(e.jobStatus){case"submitted":return"Song successfully created!";case"updated":return"Song succesfully updated!";case"destroyed":return"Song successfully destroyed!";case"failedToCreate":return"Rats! Song creation could not be completed";case"failedToUpdate":return"Rats! Song could not be succesfully updated";case"failedToDestroy":return"Rats! Song could not be succesfully destroyed";default:return""}}()})]})]})};n(102);var G=function(e){var t=Object(a.useState)({}),n=Object(u.a)(t,2),c=n[0],r=n[1],o=function(){e.setFactoryMode("new"),e.setJobStatus("assembly")};return Object(a.useEffect)((function(){Object.values(c).every((function(e){return e.success}))&&("creating"===e.jobStatus?(e.setJobStatus("created"),e.setFactoryMode("idle")):"updating"===e.jobStatus&&(e.setJobStatus("updated"),e.setFactoryMode("idle")))}),[c]),Object(m.jsx)("div",{className:"SongFactory",children:Object(m.jsxs)("div",{className:"central-container",children:[function(){if("assembly"!==e.jobStatus&&"creating"!==e.jobStatus&&"updating"!==e.jobStatus&&"destroying"!==e.jobStatus)return Object(m.jsx)("button",{className:"pseudo-btn",id:"new-song-btn",onClick:o,children:"New Song"})}(),function(){switch(e.factoryMode){case"new":return Object(m.jsx)(q,{token:e.token,setFactoryMode:e.setFactoryMode,setLoadings:r,setJobStatus:e.setJobStatus,jobStatus:e.jobStatus,factoryMode:"new",setCancelSources:e.setCancelSources});case"edit":return Object(m.jsx)(q,{token:e.token,setFactoryMode:e.setFactoryMode,setLoadings:r,setJobStatus:e.setJobStatus,jobStatus:e.jobStatus,editableSong:e.editableSong,editableParts:e.editableParts,factoryMode:"edit",setCancelSources:e.setCancelSources});case"delivery":case"destruction":return Object(m.jsx)(H,{loadings:c,setJobStatus:e.setJobStatus,jobStatus:e.jobStatus});default:return Object(m.jsx)("span",{className:"prompt",children:"Create a song or select one to edit"})}}()]})})},K=n(47),V=n.n(K);n(103);var W=function(e){var t=function(){e.editSong(e.song)};return Object(m.jsxs)("div",{className:"SongInfo",children:[Object(m.jsxs)("div",{className:"song-info-title-bar",children:[Object(m.jsx)("h5",{className:"song-info-title",children:e.song.title}),function(){switch(e.jobStatus){case"creating":case"updating":case"destroying":case"assembly":return"";default:return Object(m.jsx)("button",{type:"button",className:"edit-btn",onClick:t,children:Object(m.jsx)(V.a,{})})}}()]}),Object(m.jsxs)("div",{className:"song-info-parts",children:[Object(m.jsxs)("div",{className:"song-info-parts-title-bar",children:[Object(m.jsx)("h6",{className:"parts-header",children:"Parts"}),Object(m.jsx)("span",{className:"number-promised",children:!e.songParts||e.song.parts_promised>e.songParts.length?" (".concat(e.song.parts_promised," expected)"):""})]}),Object(m.jsx)("div",{className:"song-parts",children:function(){if(e.songParts)return e.songParts.map((function(e){return Object(m.jsx)("span",{className:"part-name",children:e.name},e.name)}))}()})]})]})};n(104);var X=function(e){return Object(m.jsx)("div",{className:"CurrentCollection",children:function(){if(Object.keys(e.parts).length>0)return e.songs.map((function(t){return Object(m.jsx)(W,{song:t,songParts:e.parts[t.id.toString()],editSong:e.editSong,jobStatus:e.jobStatus},t.id)}))}()})};n(105);var Q=function(e){var t=Object(a.useState)([]),n=Object(u.a)(t,2),c=n[0],r=n[1],o=Object(a.useState)([]),i=Object(u.a)(o,2),l=i[0],d=i[1],f=Object(a.useState)("idle"),p=Object(u.a)(f,2),h=p[0],g=p[1],O=Object(a.useState)("none"),x=Object(u.a)(O,2),v=x[0],S=x[1],y=Object(a.useState)(null),k=Object(u.a)(y,2),N=k[0],w=k[1],P=Object(a.useState)(null),T=Object(u.a)(P,2),E=T[0],M=T[1],F=Object(a.useState)([]),J=Object(u.a)(F,2),I=J[0],A=J[1],B=function(){var t=Object(j.a)(b.a.mark((function t(n){var a,c;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch("".concat(C,"/admin"),{headers:{Authorization:"Bearer ".concat(e.token)},signal:n});case 3:return a=t.sent,t.next=6,a.json();case 6:c=t.sent,r(c.songs),d(c.parts),t.next=14;break;case 11:t.prev=11,t.t0=t.catch(0),n.aborted||console.log(t.t0);case 14:case"end":return t.stop()}}),t,null,[[0,11]])})));return function(e){return t.apply(this,arguments)}}();return Object(a.useEffect)((function(){if("assembly"!==v&&"creating"!==v&&"updating"!==v&&"destroying"!==v){var e=new AbortController;return B(e.signal),function(){return e.abort()}}return function(){return I.forEach((function(e){return e.cancel()}))}}),[v]),Object(m.jsxs)("div",{className:"Admin",children:[Object(m.jsx)(s.b,{to:".",children:Object(m.jsx)("button",{className:"nav-btn",children:"Home"})}),Object(m.jsxs)("div",{className:"layout-container",children:[Object(m.jsx)(X,{songs:c,parts:l,editSong:function(e){w(e),M(l[e.id.toString()]),g("edit"),S("assembly")},jobStatus:v}),Object(m.jsx)(G,{jobStatus:v,setJobStatus:S,factoryMode:h,setFactoryMode:g,editableSong:N,editableParts:E,token:e.token,setCancelSources:A})]})]})};var Y=function(e){return e.token?Object(m.jsx)(Q,{token:e.token}):Object(m.jsx)(l.a,{to:"./login"})},Z=n(19);n(106);var $=function(e){var t=Object(a.useState)(!1),n=Object(u.a)(t,2),c=n[0],r=n[1],o=Object(a.useState)(!1),s=Object(u.a)(o,2),d=s[0],b=s[1],j=Object(a.useState)({username:"",password:""}),f=Object(u.a)(j,2),p=f[0],h=f[1],g=function(e){h(Object(i.a)(Object(i.a)({},p),{},Object(Z.a)({},e.target.name,e.target.value)))};return c?Object(m.jsx)(l.a,{to:"./admin"}):Object(m.jsxs)("div",{className:"Login central-container",children:[Object(m.jsx)("span",{id:"incorrect-credentials-message",children:d?"Either the username or the password is incorrect":""}),Object(m.jsxs)("form",{onSubmit:function(t){t.preventDefault();var n=new FormData;n.append("password",p.password),n.append("username",p.username),fetch("".concat(C,"/login"),{method:"post",body:n}).then((function(e){return e.json()})).then((function(t){200===t.status?(function(e){try{localStorage.setItem("token",e)}catch(t){}}(t.token),e.setToken(t.token),r(!0)):401===t.status&&b(!0)})).catch((function(e){console.log(e)}))},children:[Object(m.jsx)("label",{htmlFor:"username",children:"Username"}),Object(m.jsx)("input",{type:"text",id:"username",name:"username",className:"text-input",value:p.username,onChange:g,required:!0}),Object(m.jsx)("label",{htmlFor:"password",children:"Password"}),Object(m.jsx)("input",{type:"password",id:"password",name:"password",className:"text-input",value:p.password,onChange:g,required:!0}),Object(m.jsx)("input",{type:"submit",className:"pseudo-btn",value:"Log in"})]})]})};var ee=function(e){var t=Object(a.useState)(function(){try{return localStorage.getItem("token")}catch(e){return null}}()),n=Object(u.a)(t,2),c=n[0],r=n[1],o=Object(l.g)();return Object(a.useEffect)((function(){return o.push("/".concat(e.choirId))}),[]),Object(m.jsx)("div",{className:"Choir",children:Object(m.jsxs)(l.d,{children:[Object(m.jsx)(l.b,{exact:!0,path:"/:choirId",component:F}),Object(m.jsx)(l.b,{path:"/:choirId/admin",render:function(e){return Object(m.jsx)(Y,Object(i.a)(Object(i.a)({},e),{},{token:c}))}}),Object(m.jsx)(l.b,{path:"/:choirId/login",render:function(e){return Object(m.jsx)($,Object(i.a)(Object(i.a)({},e),{},{setToken:r}))}})]})})};n(107);var te=function(){return Object(m.jsx)(s.a,{children:Object(m.jsx)(ee,{choirId:1})})};o.a.render(Object(m.jsx)(c.a.StrictMode,{children:Object(m.jsx)(te,{})}),document.getElementById("root"))},54:function(e,t,n){},59:function(e,t,n){},61:function(e,t,n){},62:function(e,t,n){},63:function(e,t,n){},68:function(e,t,n){},69:function(e,t,n){},80:function(e,t,n){},81:function(e,t,n){},99:function(e,t,n){}},[[109,1,2]]]);
//# sourceMappingURL=main.eba90b06.chunk.js.map