(function(e){function t(t){for(var r,s,c=t[0],o=t[1],u=t[2],h=0,l=[];h<c.length;h++)s=c[h],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&l.push(a[s][0]),a[s]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r]);f&&f(t);while(l.length)l.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,c=1;c<n.length;c++){var o=n[c];0!==a[o]&&(r=!1)}r&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},a={app:0},i=[];function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],o=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var f=o;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"0e08":function(e,t,n){"use strict";var r=n("76cb"),a=n.n(r);a.a},"1fda":function(e,t,n){"use strict";var r=n("2ea6"),a=n.n(r);a.a},"2ea6":function(e,t,n){},"2ee3":function(e,t,n){"use strict";var r=n("f8e9"),a=n.n(r);a.a},"45e9":function(e,t,n){},"76cb":function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[0===e.$game.state?n("Menu"):e._e(),1===e.$game.state?n("Cars"):e._e(),2===e.$game.state?n("Stages"):e._e(),3===e.$game.state?n("Game"):e._e(),n("canvas",{ref:"canvas"})],1)},i=[],s=n("d4ec"),c=n("bee2"),o=n("262e"),u=n("2caf"),f=n("9ab4"),h=n("60a3"),l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"title"},[e._v("The Vehicular Epic")]),n("div",{staticClass:"menu"},[n("MenuButton",{attrs:{text:"New Game",color:"red"},on:{click:function(t){e.$game.state=1}}}),n("MenuButton",{attrs:{text:"Options",color:"green"}}),n("MenuButton",{attrs:{text:"Credits",color:"blue"}})],1)])},p=[],d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("button",{style:{"--button-color":e.color},domProps:{textContent:e._s(e.text)},on:{click:function(t){return e.$emit("click")}}})},v=[],m=function(e){Object(o["a"])(n,e);var t=Object(u["a"])(n);function n(){return Object(s["a"])(this,n),t.apply(this,arguments)}return n}(r["a"]);Object(f["a"])([Object(h["b"])({required:!0})],m.prototype,"text",void 0),Object(f["a"])([Object(h["b"])({required:!0})],m.prototype,"color",void 0),m=Object(f["a"])([h["a"]],m);var b=m,y=b,g=(n("1fda"),n("2877")),w=Object(g["a"])(y,d,v,!1,null,"90b4d8ee",null),k=w.exports,x=function(e){Object(o["a"])(n,e);var t=Object(u["a"])(n);function n(){return Object(s["a"])(this,n),t.apply(this,arguments)}return n}(r["a"]);x=Object(f["a"])([Object(h["a"])({components:{MenuButton:k}})],x);var j=x,O=j,_=(n("2ee3"),Object(g["a"])(O,l,p,!1,null,"5b95488c",null)),E=_.exports,M=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("div",{staticClass:"aside"},[n("MenuButton",{attrs:{text:"< Back",color:"blue"}})],1),n("div",[n("p",{domProps:{textContent:e._s(e.$game.vehicle.name)}}),n("MenuButton",{attrs:{text:"Continue",color:"green"},on:{click:e.done}})],1),n("div",{staticClass:"aside"},[n("MenuButton",{attrs:{text:"Next >",color:"blue"}})],1)])},A=[],S=(n("4de4"),n("0481"),n("4160"),n("caad"),n("4069"),n("b0c0"),n("4ec9"),n("d3b7"),n("3ca3"),n("cfc3"),n("9a8c"),n("a975"),n("735e"),n("c1ac"),n("d139"),n("3a7b"),n("d5d6"),n("82f8"),n("e91f"),n("60bd"),n("5f96"),n("3280"),n("3fcc"),n("ca91"),n("25a1"),n("cd26"),n("3c5d"),n("2954"),n("649e"),n("219c"),n("170b"),n("b39a"),n("72f7"),n("159b"),n("ddb0"),n("b85c")),R=(n("96cf"),n("1da1")),P=n("f594"),T=(n("d81d"),n("2af1"),n("4c53"),n("2909")),$=n("20e7"),B=function(){function e(t,n,r){Object(s["a"])(this,e),this._p1=t,this._p2=n,this._p3=r}return Object(c["a"])(e,[{key:"p1",get:function(){return this._p1}},{key:"p2",get:function(){return this._p2}},{key:"p3",get:function(){return this._p3}}]),e}(),z=function(){function e(){Object(s["a"])(this,e)}return Object(c["a"])(e,null,[{key:"normals",value:function(t){var n=[];return t.forEach((function(t){var r=$["c"].sub($["c"].create(),t.p2,t.p1),a=$["c"].sub($["c"].create(),t.p3,t.p1),i=Object(T["a"])(e.ncross(r,a));n.push(i,i,i)})),n}},{key:"ncross",value:function(e,t){var n=$["c"].cross($["c"].create(),e,t);return $["c"].normalize(n,n)}},{key:"angles",value:function(e){var t=new P["Vec3"],n=2*(e.w*e.x+e.y*e.z),r=1-2*(e.x*e.x+e.y*e.y);t.x=Math.atan2(n,r);var a=2*(e.w*e.y-e.z*e.x);Math.abs(a)>=1?t.y=Math.PI/2*Math.sign(a):t.y=Math.asin(a);var i=2*(e.w*e.z+e.x*e.y),s=1-2*(e.y*e.y+e.z*e.z);return t.z=Math.atan2(i,s),t}}]),e}(),V=function(){function e(){Object(s["a"])(this,e)}return Object(c["a"])(e,null,[{key:"perspective",value:function(e,t){var n=.01,r=n*Math.tan(e/2*(Math.PI/180)),a=$["a"].create();$["a"].frustum(a,-r*t,r*t,-r,r,n,0);var i=1e-6;return a[10]=i-1,a[14]=(i-2)*n,a}},{key:"lookAt",value:function(e,t,n,r,a,i){return $["a"].lookAt($["a"].create(),[e,t,n],[r,a,i],[0,-1,0])}},{key:"transform",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,r=e.x,a=e.y,i=e.z,s=$["a"].create();if($["a"].translate(s,s,[a,-i,r]),$["a"].scale(s,s,[n,n,n]),void 0!==t){var c=t.x,o=t.y,u=t.z,f=t.w,h=$["a"].fromQuat($["a"].create(),$["b"].set($["b"].create(),o,-u,c,-f));return $["a"].mul(s,s,h)}return s}}]),e}(),L=n("5530"),C={directionLocal:new P["Vec3"](0,0,-1),suspensionStiffness:20,dampingRelaxation:1,dampingCompression:1,maxSuspensionForce:1e4,rollInfluence:0,axleLocal:new P["Vec3"](0,1,0),maxSuspensionTravel:.3},F=function(){function e(t,n,r,a){var i=t.width,c=t.height,o=t.position,u=n.magnitude,f=n.depth,h=n.color;Object(s["a"])(this,e),this.quat=new P["Quaternion"](0,0,0,0);for(var l=12,p=i/10,d=c/10,v=[],m=[],b=0;b<l/2;b++){var y=[];y[2]=$["c"].fromValues(-f*p,0,0);for(var g=b;g<b+2;g++){var w=2*Math.PI*g/(l/2);y[g-b]=$["c"].fromValues(-4*p,u*(10*Math.sin(w)),u*(10*Math.cos(w)))}v.push(new B(y[0],y[1],y[2])),m.push(h,h,h)}for(var k=[],x=0;x<l;x++){var j=2*Math.PI*x/l,O=$["c"].fromValues(-4*p,d*(12.557*Math.sin(j)),d*(12.557*Math.cos(j)));k.push(O)}for(var _=0;_<l/2;_++)if(_>0){var E=_+(_-1),M=E+1,A=M+1;v.push(new B(v[_].p1,k[E],k[M])),v.push(new B(v[_].p1,k[M],k[A])),_<l/2-1?v.push(new B(v[_].p1,k[A],v[_+1].p1)):v.push(new B(v[_].p1,k[A],v[0].p1))}else v.push(new B(v[_].p1,k[_],k[_+1])),v.push(new B(v[_].p1,k[_+1],v[_+1].p1)),v.push(new B(v[_].p1,k[_],k[k.length-1]));for(var S=0;S<l;S++)S>0?(v.push(new B(k[S-1],$["c"].fromValues(-1*k[S-1][0],k[S-1][1],k[S-1][2]),$["c"].fromValues(-1*k[S-1][0],k[S][1],k[S][2]))),v.push(new B($["c"].fromValues(-1*k[S-1][0],k[S][1],k[S][2]),k[S],k[S-1]))):(v.push(new B(k[k.length-1],$["c"].fromValues(-1*k[k.length-1][0],k[k.length-1][1],k[k.length-1][2]),$["c"].fromValues(-1*k[k.length-1][0],k[S][1],k[S][2]))),v.push(new B($["c"].fromValues(-1*k[k.length-1][0],k[S][1],k[S][2]),k[S],k[k.length-1])));for(var R=l/2;R<v.length;R++)m.push([.18,.18,.18],[.18,.18,.18],[.18,.18,.18]);this.model=new ke({vertices:v.map((function(e){return[Object(T["a"])(e.p1),Object(T["a"])(e.p2),Object(T["a"])(e.p3)]})).flat(),colors:m,normals:z.normals(v)}),this.radius=d/8;var V=o.map((function(e){return e/100})),L=V[0],C=V[1],F=V[2];this.position=new P["Vec3"](F,L,C),this.suspension=r,this.friction=a}return Object(c["a"])(e,[{key:"render",value:function(e){e.uniformMatrix4fv("model",V.transform(this.position,this.quat)),this.model.render()}},{key:"options",get:function(){return Object(L["a"])(Object(L["a"])({},C),{},{radius:this.radius,suspensionRestLength:this.suspension,frictionSlip:this.friction,chassisConnectionPointLocal:this.position})}}]),e}(),G=function(){function e(t,n){var r=this,a=t.name,i=t.mass,c=t.boundaries,o=t.suspension,u=t.friction,f=t.wheels,h=t.rims;Object(s["a"])(this,e),this._wheels=[],this.name=a,this.model=n,this.mass=i,this.boundaries=c,f.map((function(e){return new F(e,h,o,u)})).forEach((function(e){return r._wheels.push(e)}))}return Object(c["a"])(e,[{key:"render",value:function(e,t){e.uniformMatrix4fv("model",V.transform(t.position,t.quat)),this.model.render(),this._wheels.forEach((function(t){return t.render(e)}))}},{key:"wheels",get:function(){return this._wheels}},{key:"shape",get:function(){var e=this.boundaries,t=e[0],n=e[1],r=e[2];return new P["Box"](new P["Vec3"](r,t,n))}}]),e}(),q=(n("a15b"),n("fb6a"),n("a9e3"),n("4d63"),n("ac1f"),n("25f0"),n("1276"),n("df7c")),I=n.n(q),U=function(){function e(){Object(s["a"])(this,e)}return Object(c["a"])(e,null,[{key:"create",value:function(){var e=Object(R["a"])(regeneratorRuntime.mark((function e(t,n){var r,a,i,s,c,o,u,f,h,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return o=function(e){for(var t,n=[],r=new RegExp("^".concat(e,"\\s(.+?)$"),"gm");null!==(t=r.exec(c));)n.push(t[1].split(/\s/).map((function(e){return Number(e)})));return n},r=I.a.join("models",n),a=[],i=[],s=[],e.next=7,fetch(I.a.join(r,t));case 7:return e.next=9,e.sent.text();case 9:return c=e.sent,u=o("v"),f=o("vn"),e.next=13,Object(R["a"])(regeneratorRuntime.mark((function e(){var t,n,a,i,s,o,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t={},n=/^mtllib\s(.+?)$/gm.exec(c),null===n){e.next=12;break}return a=I.a.basename(n[1]),i=/^newmtl\s(.+?)$/gm,s=/^Kd\s(.+?)$/gm,e.next=7,fetch(I.a.join(r,a));case 7:return e.next=9,e.sent.text();case 9:for(o=e.sent;null!==(u=i.exec(o));)t[u[1]]=s.exec(o)[1].split(/\s/).map((function(e){return Number(e)}));return e.abrupt("return",t);case 12:return t["default"]=[.25,.25,.25],e.abrupt("return",t);case 14:case"end":return e.stop()}}),e)})))();case 13:return h=e.sent,l="default",c.split(/\n/gm).filter((function(e){return/^(usemtl|f)/.test(e)})).map((function(e){return e.split(/\s/,4)})).forEach((function(e){"usemtl"===e[0]?l=e[1]:"f"===e[0]&&e.slice(1).forEach((function(e){var t=e.split(/\//g).map((function(e){return Number(e)}));a.push(u[t[0]-1]),i.push(h[l]),s.push(f[t[2]-1])}))})),e.abrupt("return",new ke({vertices:a,colors:i,normals:s}));case 17:case"end":return e.stop()}}),e)})));function t(t,n){return e.apply(this,arguments)}return t}()}]),e}(),N=n("3835"),D=[[-1,0,-1],[1,0,-1],[-1,0,1],[-1,0,1],[1,0,1],[1,0,-1]],H=[[0,-1,0],[0,-1,0],[0,-1,0],[0,1,0],[0,1,0],[0,1,0]],W=function(){function e(t,n,r,a){var i=this,c=a.entities,o=a.models;Object(s["a"])(this,e),this.objects=new Map,this.name=t,this.sky=n,this.ground=new ke({vertices:D,colors:D.map((function(e){return r})),normals:H}),c.forEach((function(e,t){i.objects.set(e,o[t])}))}return Object(c["a"])(e,[{key:"scene",value:function(e,t){e.disable(e.DEPTH_TEST),t.uniformMatrix4fv("model",V.transform(new P["Vec3"](0,0,0),void 0,1e6)),this.ground.render(),e.enable(e.DEPTH_TEST),e.clearColor(this.sky[0],this.sky[1],this.sky[2],1)}},{key:"render",value:function(e,t){e.uniform3f("u_LightPos",0,-100,0);var n,r=Object(S["a"])(this.objects.entries());try{for(r.s();!(n=r.n()).done;){var a=Object(N["a"])(n.value,2),i=a[0],s=a[1];i.render(e,s)}}catch(c){r.e(c)}finally{r.f()}}}]),e}(),Q=function(){function e(){Object(s["a"])(this,e),this._position=new P["Vec3"](0,0,0),this._quat=new P["Quaternion"](0,0,0,0)}return Object(c["a"])(e,[{key:"pos",value:function(e,t,n){this._position.set(n,e,-t)}},{key:"render",value:function(e,t){e.uniformMatrix4fv("model",V.transform(this._position,this._quat)),t.render()}},{key:"xz",set:function(e){var t=e/2;this._quat=new P["Quaternion"](0,0,-Math.sin(t),Math.cos(t))}},{key:"x",get:function(){return this._position.y}},{key:"y",get:function(){return-this._position.z}},{key:"z",get:function(){return this._position.x}},{key:"position",get:function(){return this._position}},{key:"quat",get:function(){return this._quat}}]),e}();function Y(e,t){for(var n,r=[],a=new RegExp("".concat(e,"\\((.+?)\\)"),"gm");null!==(n=a.exec(t));)r.push(n[1]);return r}var J,K,X=function(){function e(){Object(s["a"])(this,e)}return Object(c["a"])(e,null,[{key:"create",value:function(){var e=Object(R["a"])(regeneratorRuntime.mark((function e(t,n,r){var a,i,s,c,o,u,f;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=I.a.join("stages","".concat(t,".txt")),e.next=3,fetch(a);case 3:return e.next=5,e.sent.text();case 5:return i=e.sent,s=[],c=[],Y("set",i).forEach((function(e){var t=e.split(/[,]/g).map((function(e){return Number(e)})),a=n[t[0]-10];if(r.has(a)){c.push(r.get(a));var i=new Q;i.pos(t[1]/100,(t[3]-250)/100,t[2]/100),i.xz=t[4]*(Math.PI/180),s.push(i)}})),o=Y("name",i)[0]||"Unknown Stage",u=Y("ground",i)[0].split(/[,]/g).map((function(e){return Number(e)/255})),f=Y("sky",i)[0].split(/[,]/g).map((function(e){return Number(e)/255})),e.abrupt("return",new W(o,f,u,{entities:s,models:c}));case 13:case"end":return e.stop()}}),e)})));function t(t,n,r){return e.apply(this,arguments)}return t}()}]),e}(),Z=function(){function e(){Object(s["a"])(this,e),this._x=0,this._y=0,this._z=0,this._cx=0,this._cy=0,this._cz=0}return Object(c["a"])(e,[{key:"pos",value:function(e,t,n){this._x=e,this._y=t,this._z=n}},{key:"center",value:function(e,t,n){this._cx=e,this._cy=t,this._cz=n}},{key:"matrix",get:function(){return V.lookAt(this._x,this._y,this._z,this._cx,this._cy,this._cz)}},{key:"x",get:function(){return this._x}},{key:"y",get:function(){return this._y}},{key:"z",get:function(){return this._z}},{key:"cx",get:function(){return this._cx}},{key:"cy",get:function(){return this._cy}},{key:"cz",get:function(){return this._cz}}]),e}(),ee=.5,te=100,ne=2,re=function(e){Object(o["a"])(n,e);var t=Object(u["a"])(n);function n(){var e;return Object(s["a"])(this,n),e=t.apply(this,arguments),e.keys={},e.vehicle=new P["RaycastVehicle"]({}),e}return Object(c["a"])(n,[{key:"update",value:function(e){var t=this;this.position.copy(this.vehicle.chassisBody.position),this.quat.copy(this.vehicle.chassisBody.quaternion),this.vehicle.wheelInfos.forEach((function(n,r){t.vehicle.updateWheelTransform(r);var a=n.worldTransform,i=e[r];i.position.copy(a.position),i.quat.copy(a.quaternion)}))}},{key:"steer",get:function(){return ee}},{key:"force",get:function(){return te}},{key:"brake",get:function(){return ne}}]),n}(Q),ae=0,ie=new Z,se=new re,ce=new P["World"];ce.broadphase=new P["SAPBroadphase"](ce),ce.gravity.set(0,0,-10),ce.defaultContactMaterial.friction=.6,function(){var e=new P["Body"]({mass:0});e.addShape(new P["Plane"]),e.position.set(0,0,0),ce.addBody(e)}();var oe,ue=["drags"],fe=["prod","prodw","prodb2","prodb1","prodt","drod","grod","drodt","nrod","nrodt","mixpd","mixnd","mixpn","prode","drode","pipg","prmp","prmpc","prmpg","prmpm","prmpw","prmpb","prmps","dbmp","drmpb","drmps","pipe","spikes","rail","brdr","chk","fix","dchk","drodb","drodbb","bprmpup","prmpup","start","wall","fenc","prmpl","net","prmpspd","drmpg","tiny","dhil","stunl","tunl","lift","mountn","mass","cres","pile1","pile2","brdr2","tre1","tre2","tre3","tre4","tre5","tre6","tre7","tre8","cac1","cac2","cac3","blok","full","pyrmd","tub"],he=new Map,le=new Map,pe=71,de=new Map;function ve(){return me.apply(this,arguments)}function me(){return me=Object(R["a"])(regeneratorRuntime.mark((function e(){var t,n,r,a,i,s,c,o,u,f,h,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return window.addEventListener("resize",(function(){J.canvas.width=window.innerWidth,J.canvas.height=window.innerHeight})),J.enable(J.DEPTH_TEST),J.depthFunc(J.LEQUAL),K=new ge,e.next=6,K.create({name:"vertex.glsl",type:J.VERTEX_SHADER},{name:"fragment.glsl",type:J.FRAGMENT_SHADER});case 6:t=Object(S["a"])(ue),e.prev=7,t.s();case 9:if((n=t.n()).done){e.next=23;break}return r=n.value,e.next=13,fetch("models/vehicles/".concat(r,".json"));case 13:return e.next=15,e.sent.json();case 15:return a=e.sent,e.next=18,U.create(a["model"],"vehicles");case 18:i=e.sent,s=new G(a,i),he.set(r,s);case 21:e.next=9;break;case 23:e.next=28;break;case 25:e.prev=25,e.t0=e["catch"](7),t.e(e.t0);case 28:return e.prev=28,t.f(),e.finish(28);case 31:c=fe.filter((function(e){return!["start","full","cres"].includes(e)})),o=Object(S["a"])(c),e.prev=33,o.s();case 35:if((u=o.n()).done){e.next=43;break}return f=u.value,e.next=39,U.create("".concat(f,".obj"),"objects");case 39:h=e.sent,le.set(f,h);case 41:e.next=35;break;case 43:e.next=48;break;case 45:e.prev=45,e.t1=e["catch"](33),o.e(e.t1);case 48:return e.prev=48,o.f(),e.finish(48);case 51:l=1;case 52:if(!(l<=pe)){e.next=62;break}return e.t2=de,e.t3=l,e.next=57,X.create(String(l),fe,le);case 57:e.t4=e.sent,e.t2.set.call(e.t2,e.t3,e.t4);case 59:l++,e.next=52;break;case 62:window.dispatchEvent(new Event("resize"));case 63:case"end":return e.stop()}}),e,null,[[7,25,28,31],[33,45,48,51]])}))),me.apply(this,arguments)}function be(e){var t=0,n=1/60;function r(){se.keys["ArrowUp"]&&(se.vehicle.applyEngineForce(-se.force,2),se.vehicle.applyEngineForce(-se.force,3)),se.keys["ArrowDown"]&&(se.vehicle.applyEngineForce(se.force,2),se.vehicle.applyEngineForce(se.force,3)),se.keys["ArrowRight"]&&(se.vehicle.setSteeringValue(se.steer,0),se.vehicle.setSteeringValue(se.steer,1)),se.keys["ArrowLeft"]&&(se.vehicle.setSteeringValue(-se.steer,0),se.vehicle.setSteeringValue(-se.steer,1)),se.keys["Space"]&&(se.vehicle.setBrake(se.brake,0),se.vehicle.setBrake(se.brake,1),se.vehicle.setBrake(se.brake,2),se.vehicle.setBrake(se.brake,3));var e=performance.now()/1e3;if(0===t)return ce.step(n),t=e;ce.step(n,e-t,3)}function a(){if(ae=window.requestAnimationFrame(a),J.viewport(0,0,J.canvas.width,J.canvas.height),J.clear(J.COLOR_BUFFER_BIT|J.DEPTH_BUFFER_BIT),e.state!==oe.MENU){if(K.use(),K.uniformMatrix4fv("projection",V.perspective(70,window.innerWidth/window.innerHeight)),e.state===oe.CARS&&(J.clearColor(0,0,0,1),ie.pos(0,-4,20),ie.center(0,0,0),K.uniformMatrix4fv("view",ie.matrix),K.uniform3f("u_LightPos",0,-100,-10),e.vehicle.render(K,se)),e.state===oe.STAGES||e.state===oe.GAME){var t=de.get(e.stage);e.state===oe.STAGES&&(ie.pos(ie.x+.1,-100,ie.z+.1),K.uniformMatrix4fv("view",ie.matrix)),t.scene(J,K),t.render(K,ie)}if(e.state===oe.GAME){var n=z.angles(se.quat),i=se.x+-16*Math.sin(n.z),s=se.z+-16*Math.cos(n.z);ie.pos(i,se.y-5,s),ie.center(se.x,se.y,se.z),K.uniformMatrix4fv("view",ie.matrix),e.vehicle.render(K,se)}}r()}0===ae&&ve().then(a)}(function(e){e[e["MENU"]=0]="MENU",e[e["CARS"]=1]="CARS",e[e["STAGES"]=2]="STAGES",e[e["GAME"]=3]="GAME"})(oe||(oe={}));var ye=function(){function e(){Object(s["a"])(this,e),this._state=oe.MENU,this._selected=0,this._stage=64}return Object(c["a"])(e,[{key:"start",value:function(){be(this)}},{key:"stop",value:function(){window.cancelAnimationFrame(ae)}},{key:"initGame",value:function(){var e=this,t=new P["Body"]({mass:this.vehicle.mass});t.addShape(this.vehicle.shape),se.vehicle.chassisBody=t,this.vehicle.wheels.forEach((function(e){return se.vehicle.addWheel(e.options)})),se.vehicle.addToWorld(ce),ce.addEventListener("postStep",(function(){return se.update(e.vehicle.wheels)}))}},{key:"state",get:function(){return this._state},set:function(e){this._state=e}},{key:"selected",get:function(){return this._selected},set:function(e){this._selected=Math.max(Math.min(e,ue.length-1),0)}},{key:"stages",get:function(){return pe}},{key:"stage",get:function(){return this._stage},set:function(e){this._stage=e}},{key:"vehicle",get:function(){return he.get(ue[this._selected])}},{key:"context",set:function(e){J=e}},{key:"player",get:function(){return se}}]),e}(),ge=function(){function e(){Object(s["a"])(this,e),this.uniforms={},this.program=J.createProgram()}return Object(c["a"])(e,[{key:"create",value:function(){var e=Object(R["a"])(regeneratorRuntime.mark((function e(){var t,n,r,a,i,s,c,o,u,f=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:for(n=function(){return n=Object(R["a"])(regeneratorRuntime.mark((function e(t,n){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch(t);case 2:return e.abrupt("return",e.sent.text().then((function(e){var t=J.createShader(n);return J.shaderSource(t,e),J.compileShader(t),J.getShaderParameter(t,J.COMPILE_STATUS)?Promise.resolve(t):Promise.reject(J.getShaderInfoLog(t))})));case 3:case"end":return e.stop()}}),e)}))),n.apply(this,arguments)},t=function(e,t){return n.apply(this,arguments)},r=f.length,a=new Array(r),i=0;i<r;i++)a[i]=f[i];s=0,c=a;case 4:if(!(s<c.length)){e.next=13;break}return o=c[s],e.next=8,t("shaders/".concat(o.name),o.type);case 8:u=e.sent,J.attachShader(this.program,u);case 10:s++,e.next=4;break;case 13:if(J.linkProgram(this.program),J.getProgramParameter(this.program,J.LINK_STATUS)){e.next=16;break}throw new Error("[SHADER_PROGRAM ERROR] "+J.getProgramInfoLog(this.program));case 16:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"use",value:function(){J.useProgram(this.program)}},{key:"uniform",value:function(e){return void 0!==this.uniforms[e]?this.uniforms[e]:this.uniforms[e]=J.getUniformLocation(this.program,e)}},{key:"uniform1i",value:function(e,t){J.uniform1i(this.uniform(e),t)}},{key:"uniformMatrix4fv",value:function(e,t){J.uniformMatrix4fv(this.uniform(e),!1,t)}},{key:"uniform3f",value:function(e,t,n,r){J.uniform3f(this.uniform(e),t,n,r)}}]),e}(),we=function(){function e(){Object(s["a"])(this,e),this.buffers=[],this.buffer=J.createVertexArray()}return Object(c["a"])(e,[{key:"bind",value:function(){J.bindVertexArray(this.buffer)}},{key:"unbind",value:function(){J.bindVertexArray(null)}},{key:"push",value:function(e){this.bind();var t=this.buffers.length,n=J.createBuffer();this.buffers.push(n),J.enableVertexAttribArray(t),J.bindBuffer(J.ARRAY_BUFFER,n),J.bufferData(J.ARRAY_BUFFER,new Float32Array(e),J.STATIC_DRAW),J.vertexAttribPointer(t,3,J.FLOAT,!1,0,0),J.bindBuffer(J.ARRAY_BUFFER,null),this.unbind()}}]),e}(),ke=function(){function e(t){Object(s["a"])(this,e),this.buffer=new we,this.length=t.vertices.length,this.buffer.push(t.vertices.flat()),this.buffer.push(t.colors.flat()),this.buffer.push(t.normals.flat())}return Object(c["a"])(e,[{key:"render",value:function(){this.buffer.bind(),J.drawArrays(J.TRIANGLES,0,this.length),this.buffer.unbind()}}]),e}(),xe=function(e){Object(o["a"])(n,e);var t=Object(u["a"])(n);function n(){return Object(s["a"])(this,n),t.apply(this,arguments)}return Object(c["a"])(n,[{key:"mounted",value:function(){this.$game.player.pos(0,-1,10)}},{key:"done",value:function(){this.$game.state=oe.STAGES}}]),n}(r["a"]);xe=Object(f["a"])([Object(h["a"])({components:{MenuButton:k}})],xe);var je=xe,Oe=je,_e=(n("e70a"),Object(g["a"])(Oe,M,A,!1,null,"546c056d",null)),Ee=_e.exports,Me=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div")},Ae=[],Se=n("2fe1"),Re=function(e){Object(o["a"])(n,e);var t=Object(u["a"])(n);function n(){return Object(s["a"])(this,n),t.apply(this,arguments)}return Object(c["a"])(n,[{key:"mounted",value:function(){window.addEventListener("keydown",this.keydown)}},{key:"destroyed",value:function(){window.removeEventListener("keydown",this.keydown)}},{key:"keydown",value:function(e){switch(e.code){case"ArrowRight":this.$game.stage=Math.min(this.$game.stage+1,this.$game.stages);break;case"ArrowLeft":this.$game.stage=Math.max(this.$game.stage-1,1);break;case"Enter":this.$game.initGame(),this.$game.state=oe.GAME;break}}}]),n}(r["a"]);Re=Object(f["a"])([Se["b"]],Re);var Pe=Re,Te=Pe,$e=Object(g["a"])(Te,Me,Ae,!1,null,null,null),Be=$e.exports,ze=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div")},Ve=[],Le=function(e){Object(o["a"])(n,e);var t=Object(u["a"])(n);function n(){return Object(s["a"])(this,n),t.apply(this,arguments)}return Object(c["a"])(n,[{key:"mounted",value:function(){window.addEventListener("keydown",this.keydown),window.addEventListener("keyup",this.keyup)}},{key:"keydown",value:function(e){this.$game.player.keys[e.code]=!0}},{key:"keyup",value:function(e){this.$game.player.keys[e.code]=!1;var t=this.$game.player.vehicle;switch(t.wheelInfos.forEach((function(e,n){t.setBrake(0,n)})),e.code){case"ArrowUp":case"ArrowDown":t.applyEngineForce(0,2),t.applyEngineForce(0,3);break;case"ArrowRight":case"ArrowLeft":t.setSteeringValue(0,0),t.setSteeringValue(0,1);break}}}]),n}(r["a"]);Le=Object(f["a"])([Se["b"]],Le);var Ce=Le,Fe=Ce,Ge=Object(g["a"])(Fe,ze,Ve,!1,null,null,null),qe=Ge.exports,Ie=function(e){Object(o["a"])(n,e);var t=Object(u["a"])(n);function n(){return Object(s["a"])(this,n),t.apply(this,arguments)}return Object(c["a"])(n,[{key:"mounted",value:function(){var e=this.$refs["canvas"];this.$game.context=e.getContext("webgl2"),this.$game.start()}}]),n}(r["a"]);Ie=Object(f["a"])([Object(h["a"])({components:{Menu:E,Cars:Ee,Stages:Be,Game:qe}})],Ie);var Ue=Ie,Ne=Ue,De=(n("0e08"),Object(g["a"])(Ne,a,i,!1,null,"262a7352",null)),He=De.exports,We=r["a"].observable(new ye);r["a"].config.productionTip=!1,r["a"].mixin({computed:{$game:{get:function(){return We}}}}),new r["a"]({render:function(e){return e(He)}}).$mount("#app")},e70a:function(e,t,n){"use strict";var r=n("45e9"),a=n.n(r);a.a},f8e9:function(e,t,n){}});
//# sourceMappingURL=app.d960fd5c.js.map