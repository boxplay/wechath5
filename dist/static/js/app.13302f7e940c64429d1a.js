webpackJsonp([0],{"+FTj":function(t,i){},DK6z:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_exports__.a={name:"Index",data:function(){return{height:0,isStart:!1,showQuestions:[],questionList:[],MyAnswer:[],currentBack:1,isAddHeight:!1,startReport:!1,hideQuestion:!1,imgComplte:!1,canvasInfo:{blankWidth:50,fontSize:40,fsForXg:50,fsForRes:60,fsForAn:70,fsForArt:35,topHeight:30},canvas:new Object,dpr:1,ctx:new Object,rectInfo:{},userNameInfo:{startX:0,startY:0},xgInfo:{startX:0,startY:0},rInfo:{startX:0,startY:0},aInfo:{startX:0,startY:0},tInfo:{startX:0,startY:0},resultText:{rText:"会说话的",aText:"考拉"},aImg:{width:0,height:0},article:{startX:0,startY:0},imgSrc:""}},mounted:function(){var t=this;console.log(this.getIps()),this.$axios.get("/static/question.json").then(function(i){t.questionList=i.data;for(var e=0;e<t.questionList.length;e++)t.showQuestions.push({question:!1,questionList:!1,answer:!1,content:""})}),this.$nextTick(function(){var t=window.screen.height;this.height=.8*t,setTimeout(function(){document.scrollingElement.scrollTop=document.scrollingElement.scrollHeight},150)})},methods:{getIps:function(){this.$axios.get("/getip").then(function(t){console.log(t.data)})},getWindowInfo:function(){var t={};return t.dpr=window.devicePixelRatio,window.innerWidth?(t.width=window.innerWidth,t.height=window.innerHeight):(t.width=document.body.clientWidth,t.height=document.body.clientHeight),t.width=828,t.height=1472,t},startQuestion:function(){this.isStart=!0;var t=this;setTimeout(function(){t.showQuestions[0].question=!0,$("#main").animate({backgroundPositionY:"0px"},1500)},1e3),setTimeout(function(){t.showQuestions[0].questionList=!0,t.currentBack+=1},2e3)},selectedAnswer:function selectedAnswer(questionIndex,answerIndex){var that=this;setTimeout(function(){var ele="showQuestions["+questionIndex+"]",obj=eval("that."+ele);obj.questionList=!0,obj.answer=!0},500);var myAnswer=that.questionList[questionIndex].answers[answerIndex];that.showQuestions[questionIndex].content=myAnswer,setTimeout(function(){newIndex>=that.questionList.length?that.startReport=!0:that.showQuestions[newIndex].question=!0},2e3),setTimeout(function(){newIndex>=that.questionList.length?that.startReport=!0:(that.showQuestions[newIndex].questionList=!0,that.currentBack+=1)},3e3);var newIndex=questionIndex+1;if(newIndex>=that.questionList.length)return!1},startReportEvent:function(){var t=document.createElement("canvas"),i=t.getContext("2d"),e=this.getWindowInfo().width,s=this.getWindowInfo().height,a=this.getWindowInfo().dpr;this.canvas=t,this.dpr=a,this.ctx=i,i.globalCompositeOperation="source-atop",t.width=a*e,t.height=a*s,i.fillStyle="white",i.fillRect(0,0,t.width,t.height),this.canvasRect(t,i,a)},canvasRect:function(t,i,e){var s=this.canvasInfo.blankWidth*e,a=this.canvasInfo.blankWidth*e,n=t.width-this.canvasInfo.blankWidth*e*2,r=t.height-this.canvasInfo.blankWidth*e*2;this.rectInfo={rectStartX:s,rectStartY:a,rectWidth:n,rectHeight:r},i.fillStyle="red",i.beginPath(),i.rect(s,a,n,r),i.fill(),this.drawUsername()},drawUsername:function(){this.canvas;var t=this.dpr,i=this.ctx,e=this.rectInfo.rectStartX+20*t+this.canvasInfo.fontSize*t,s=this.rectInfo.rectStartY+30*t+this.canvasInfo.fontSize*t;this.userNameInfo={startX:e,startY:s},i.font=this.canvasInfo.fontSize*t+"px Arial",i.fillStyle="#0094ff",i.textAlign="left",i.fillText("流言蜚语",e,s),i.restore(),this.drawXg()},drawXg:function(){this.canvas,this.dpr,this.ctx;var t=this.canvasInfo.fsForXg,i=t+this.canvasInfo.topHeight;this.drawText("我是一个：好人",t,0,i,"userNameInfo","xgInfo"),this.drawResultText()},drawResultText:function(){var t=this.resultText.rText,i=this.canvasInfo.fsForRes,e=i+this.canvasInfo.topHeight;e*=.9,this.drawText(t,i,10,e,"xgInfo","rInfo"),this.drawAnimalText()},drawAnimalText:function(){var t=this.resultText.aText,i=this.canvasInfo.fsForAn,e=i+this.canvasInfo.topHeight;e*=1,this.drawText(t,i,15,e,"rInfo","aInfo"),this.drawKl()},drawTags:function(){},drawArticle:function(t,i){console.log(i);var e="性情温和的你不喜欢给人制造麻烦也激励避免冲突或者意见不合不会迅速做出决定卓越的社交表单能力热情而富有同理心",s=this.canvas,a=this.dpr,n=this.ctx,r=s.width-this.aImg.width-10*a,o=i;this.article={startX:r,startY:o};var h=this.canvasInfo.fsForArt;n.font=h*a+"px Arial",n.fillStyle="#0094ff",n.textAlign="center";for(var c=0,d=0,l=0,v=0;v<e.length;v++)d+=n.measureText(e[v]).width;if(d>s.width-this.aImg.width-2*this.canvasInfo.blankWidth*a)for(v=0;v<e.length;v++)(l+=n.measureText(e[v]).width)>s.width-this.aImg.width-2*this.canvasInfo.blankWidth*a&&(n.textAlign="left",n.fillText(e.substring(c,v),r,o),o+=a*this.canvasInfo.fsForArt+5*a,l=0,c=v),v==e.length-1&&n.fillText(e.substring(c,v+1),r,o);else n.textAlign="center",n.fillText(e,r,r);this.drawQrcode()},drawImg:function(){var t=this,i=this.canvas,e=this.dpr,s=this.ctx,a=new Image;a.src="/static/1.jpeg",a.onload=function(){var t=a.width*e*2,n=a.height*e*2,r=i.width-t-140*e,o=80*e;s.drawImage(a,r,o,.6*t,.6*n)};var n=new Image;n.src="/static/2.jpg",n.onload=function(){var r=n.width*e*2,o=n.height*e*2,h=i.width-r-40*e,c=a.height*e+30*e;s.drawImage(n,h,c,.6*r,.6*o),t.drawArticle(t.aImg.width+10,t.canvas.height-t.aImg.height+t.canvasInfo.blankWidth*e)}},drawQrcode:function(){var t=this,i=this.canvas,e=this.dpr,s=this.ctx,a=new Image;a.src="/static/qrcod.jpeg",a.onload=function(){var n=.3*(i.width-t.aImg.width-t.canvasInfo.blankWidth*e),r=n,o=i.width-t.canvasInfo.blankWidth*e-n-20*e,h=i.height-n-t.canvasInfo.blankWidth*e-20*e;s.drawImage(a,o,h,n,r),t.convertCanvasToImage(i)}},drawText:function drawText(text,fontSize,paddingWidth,topHeight,currentEle,nextEle){var that=this,canvas=this.canvas,dpr=this.dpr,ctx=this.ctx,aStartX=eval("that."+currentEle).startX,aStartY=eval("that."+currentEle).startY+topHeight*dpr;eval("that."+nextEle).startX=aStartX,eval("that."+nextEle).startY=aStartY,ctx.font=fontSize*dpr+"px Arial",ctx.fillStyle="#0094ff",ctx.textAlign="left";for(var paddingWidth=paddingWidth*dpr,subIndex=0,tHeight=0,i=0;i<text.length;i++){var tWidth=ctx.measureText(text[i]).width;tHeight=ctx.measureText(text[i]).height,aStartX=eval("that."+currentEle).startX,aStartX=0!=i?eval("that."+currentEle).startX+(tWidth+paddingWidth)*i:eval("that."+currentEle).startX,ctx.fillText(text.substring(i,i+1),Math.round(aStartX),Math.round(aStartY)),subIndex=i}},drawKl:function(){var t=this.canvas,i=this.dpr,e=this.ctx,s=this,a=new Image;a.src="/static/kl.jpeg",a.onload=function(){var n=a.width*i*2,r=a.height*i*2;s.aImg.width=n,s.aImg.height=r;var o=t.height-r;e.drawImage(a,0,o,n,r),s.drawImg()}},convertCanvasToImage:function(t){this.imgSrc=t.toDataURL("image/jpeg"),this.imgComplte=!0,this.startReport=!1}},updated:function(){if(this.startReport)return!1;var t=this,i=$(".chat-box:last-child").height();if(this.isAddHeight)return!1;this.isAddHeight=!0,this.height+=i,console.log(this.height),this.$nextTick(function(){setTimeout(function(){$(".main").animate({scrollTop:t.height+"px"},"slow"),t.isAddHeight=!1},10)})}}},NHnr:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=e("7+uW"),a={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{attrs:{id:"app"}},[i("router-view")],1)},staticRenderFns:[]};var n=e("VU/8")({name:"App"},a,!1,function(t){e("+FTj")},null,null).exports,r=e("/ocq"),o=e("DK6z"),h={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{attrs:{id:"main"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:!t.imgComplte,expression:"!imgComplte"}],staticClass:"main"},[e("div",{staticClass:"chat-box"},[t._m(0),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:!t.isStart,expression:"!isStart"}],staticClass:"start-text",on:{click:t.startQuestion}},[t._v("\n        好的，开始吧\n      ")]),t._v(" "),e("transition",{attrs:{name:"fade"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.isStart,expression:"isStart"}],staticClass:"right",staticStyle:{display:"none"}},[e("div",{staticClass:"chat-right"},[e("div",{staticClass:"chat-right-item-question-right-me"},[e("span",[t._v("好的，我们开始吧")])])]),t._v(" "),e("div",{staticClass:"chat-left"},[e("div",{staticClass:"chat-left-head"},[t._v("\n              头像\n            ")])])])])],1),t._v(" "),t._l(t.questionList,function(i,s){return e("div",{directives:[{name:"show",rawName:"v-show",value:t.showQuestions[s]&&t.showQuestions[s].question,expression:"showQuestions[index] && showQuestions[index].question"}],staticClass:"chat-box animated fadeInLeft"},[e("div",{staticClass:"left"},[t._m(1,!0),t._v(" "),e("div",{staticClass:"chat-right"},[e("div",{staticClass:"chat-right-item"},[e("div",{staticClass:"chat-right-item-left"},[t._v("\n              "+t._s(s+1)+"/"+t._s(t.questionList.length)+"\n            ")]),t._v(" "),e("div",{staticClass:"chat-right-item-right"},[e("div",{staticClass:"text-tips"},[t._v("\n                "+t._s(i.question)+"\n              ")])])]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.showQuestions[s]&&t.showQuestions[s].questionList,expression:"showQuestions[index] && showQuestions[index].questionList"}],staticClass:"chat-right-item-question-box animated fadeInDown"},t._l(i.answers,function(i,a){return e("div",{staticClass:"chat-right-item-question",on:{click:function(i){return t.selectedAnswer(s,a)}}},[e("div",{staticClass:"chat-right-item-question-icon"},[t._v("\n                A\n              ")]),t._v(" "),e("span",[t._v(t._s(i))])])}),0)]),t._v(" "),e("div")]),t._v(" "),e("transition",{attrs:{name:"fade"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.showQuestions[s]&&t.showQuestions[s].answer,expression:"showQuestions[index] && showQuestions[index].answer"}],staticClass:"right"},[e("div",{staticClass:"chat-right"},[e("div",{staticClass:"chat-right-item-question-right-me"},[e("span",[t._v(t._s(t.showQuestions[s].content))])])]),t._v(" "),e("div",{staticClass:"chat-left"},[e("div",{staticClass:"chat-left-head"},[t._v("\n              头像\n            ")])])])])],1)})],2),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:2==t.currentBack,expression:"currentBack == 2"}],staticClass:"animate-box-main2 animated fadeInLeft"},[e("div",{staticClass:"animate-box-2"})]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:3==t.currentBack,expression:"currentBack == 3"}],staticClass:"animate-box-main3 animated fadeInUp"},[e("div",{staticClass:"animate-box-3"})]),t._v(" "),e("div",{directives:[{name:"show",rawName:"v-show",value:t.startReport,expression:"startReport"}],staticClass:"get-my-report-btn-box",on:{click:t.startReportEvent}},[e("div",{staticClass:"get-my-report-btn"},[t._v("\n      生成我的报告\n    ")])]),t._v(" "),e("div",{staticClass:"canvas-box"},[e("canvas",{attrs:{id:"can",width:"414",height:"736"}}),t._v(" "),e("img",{staticStyle:{width:"100%"},attrs:{src:t.imgSrc,alt:""}})])])},staticRenderFns:[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"left"},[e("div",{staticClass:"chat-left"},[e("div",{staticClass:"chat-left-head"},[t._v("\n            头像\n          ")])]),t._v(" "),e("div",{staticClass:"chat-right"},[e("div",{staticClass:"chat-right-item"},[e("div",{staticClass:"chat-right-item-left"},[t._v("\n              5/20\n            ")]),t._v(" "),e("div",{staticClass:"chat-right-item-right"},[e("div",{staticClass:"text-tips"},[t._v("\n                选择最符合你的一项描述\n              ")])])]),t._v(" "),e("div",{staticClass:"chat-right-item-question-box"},[e("div",{staticClass:"chat-right-item-question"},[e("div",{staticClass:"chat-right-item-question-icon"},[t._v("\n                A\n              ")]),t._v(" "),e("span",[t._v("选择最符合你的一项描述d 选择最符合你的一项描述d")])]),t._v(" "),e("div",{staticClass:"chat-right-item-question"},[e("div",{staticClass:"chat-right-item-question-icon"},[t._v("\n                B\n              ")]),t._v(" "),e("span",[t._v("我对自己和他们的期望都很高")])]),t._v(" "),e("div",{staticClass:"chat-right-item-question"},[e("div",{staticClass:"chat-right-item-question-icon"},[t._v("\n                C\n              ")]),t._v(" "),e("span",[t._v("我对自己和他们的期望都很高")])]),t._v(" "),e("div",{staticClass:"chat-right-item-question"},[e("div",{staticClass:"chat-right-item-question-icon"},[t._v("\n                D\n              ")]),t._v(" "),e("span",[t._v("我对自己和他们的期望都很高")])])])]),t._v(" "),e("div")])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"chat-left"},[i("div",{staticClass:"chat-left-head"},[this._v("\n            头像\n          ")])])}]};var c=function(t){e("Oppa")},d=e("VU/8")(o.a,h,!1,c,"data-v-310a0f2a",null).exports,l={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("Button",[t._v("Default")]),t._v(" "),e("Button",{attrs:{type:"primary"}},[t._v("Primary")]),t._v(" "),e("Button",{attrs:{type:"dashed"}},[t._v("Dashed")]),t._v(" "),e("Button",{attrs:{type:"text"}},[t._v("Text")]),t._v(" "),e("br"),e("br"),t._v(" "),e("Button",{attrs:{type:"info"}},[t._v("Info")]),t._v(" "),e("Button",{attrs:{type:"success"}},[t._v("Success")]),t._v(" "),e("Button",{attrs:{type:"warning"}},[t._v("Warning")]),t._v(" "),e("Button",{attrs:{type:"error"}},[t._v("Error")])],1)},staticRenderFns:[]},v=e("VU/8")({name:"collect",data:function(){return{}},mounted:function(){},methods:{}},l,!1,null,null,null).exports;s.default.use(r.a);var u=new r.a({mode:"history",routes:[{path:"/",name:"Index",component:d},{path:"/collect",name:"Collect",component:v}]}),f=e("K6Kj"),g=e.n(f);e("a7QP");s.default.prototype.$axios=axios,s.default.config.productionTip=!1,s.default.use(g.a),new s.default({el:"#app",router:u,components:{App:n},template:"<App/>"})},Oppa:function(t,i){},a7QP:function(t,i){}},["NHnr"]);
//# sourceMappingURL=app.13302f7e940c64429d1a.js.map