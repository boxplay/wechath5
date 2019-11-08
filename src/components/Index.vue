<template>
  <div id="main">
    <div class="main" v-show="!imgComplte">
      <!-- 问题开始 -->
      <div class="chat-box">
        <div class="left">
          <div class="chat-left">
            <div class="chat-left-head">
              头像
            </div>
          </div>
          <div class="chat-right">
            <div class="chat-right-item">
              <div class="chat-right-item-left">
                5/20
              </div>
              <div class="chat-right-item-right">
                <div class="text-tips">
                  选择最符合你的一项描述
                </div>
              </div>
            </div>
            <div class="chat-right-item-question-box">
              <div class="chat-right-item-question">
                <div class="chat-right-item-question-icon">
                  A
                </div>
                <span>选择最符合你的一项描述d 选择最符合你的一项描述d</span>
              </div>
              <div class="chat-right-item-question">
                <div class="chat-right-item-question-icon">
                  B
                </div>
                <span>我对自己和他们的期望都很高</span>
              </div>

              <div class="chat-right-item-question">
                <div class="chat-right-item-question-icon">
                  C
                </div>
                <span>我对自己和他们的期望都很高</span>
              </div>

              <div class="chat-right-item-question">
                <div class="chat-right-item-question-icon">
                  D
                </div>
                <span>我对自己和他们的期望都很高</span>
              </div>
            </div>
          </div>
          <div>
          </div>
        </div>
        <div v-show="!isStart" class="start-text" @click="startQuestion">
          好的，开始吧
        </div>
        <transition name="fade">
          <div v-show="isStart" class="right" style="display: none;">
            <div class="chat-right">
              <div class="chat-right-item-question-right-me">
                <span>好的，我们开始吧</span>
              </div>
            </div>
            <div class="chat-left">
              <div class="chat-left-head">
                头像
              </div>
            </div>
          </div>
        </transition>
      </div>
      <!-- 问题结束 -->
      <!-- 问题开始 -->
      <div v-for="(item,index) in questionList" class="chat-box animated fadeInLeft" v-show="showQuestions[index] && showQuestions[index].question">
        <div class="left">
          <div class="chat-left">
            <div class="chat-left-head">
              头像
            </div>
          </div>
          <div class="chat-right">
            <div class="chat-right-item">
              <div class="chat-right-item-left">
                {{index+1}}/{{questionList.length}}
              </div>
              <div class="chat-right-item-right">
                <div class="text-tips">
                  {{item.question}}
                </div>
              </div>
            </div>
            <div class="chat-right-item-question-box animated fadeInDown" v-show="showQuestions[index] && showQuestions[index].questionList">
              <div v-for="(val,key) in item.answers" class="chat-right-item-question" @click="selectedAnswer(index,key)">
                <div class="chat-right-item-question-icon">
                  A
                </div>
                <span>{{val}}</span>
              </div>
            </div>
          </div>
          <div>
          </div>
        </div>
        <transition name="fade">
          <div class="right" v-show="showQuestions[index] && showQuestions[index].answer">
            <div class="chat-right">
              <div class="chat-right-item-question-right-me">
                <span>{{showQuestions[index].content}}</span>
              </div>
            </div>
            <div class="chat-left">
              <div class="chat-left-head">
                头像
              </div>
            </div>
          </div>
        </transition>
      </div>
      <!-- 问题结束 -->
    </div>

    <!-- 动画小组件 -->
    <div class="animate-box-main2 animated fadeInLeft" v-show="currentBack == 2">
      <div class="animate-box-2">

      </div>
    </div>
    <div class="animate-box-main3 animated fadeInUp" v-show="currentBack == 3">
      <div class="animate-box-3">

      </div>
    </div>
    <!-- 动画小组件结束 -->
    <!-- 生成我的报告 -->
    <div class="get-my-report-btn-box" v-show="startReport" @click="startReportEvent">
      <div class="get-my-report-btn">
        生成我的报告
      </div>
    </div>
    <!-- 生成我的报告 -->
    <!-- canvas -->
    <div class="canvas-box">
      <img :src="imgSrc" alt="" style="width:100%;">
    </div>
    <!-- canvas -->
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data() {
      return {
        height: 0,
        isStart: false,
        showQuestions: [],
        questionList: [],
        MyAnswer: [],
        currentBack: 1,
        isAddHeight: false,
        startReport: false,
        hideQuestion:false,
        imgComplte:false,
        canvasInfo: {
          blankWidth: 30
        },
        canvas: new Object(),
        dpr: 1,
        ctx: new Object(),
        rectInfo: {}, //矩形信息,
        userNameInfo: {
          startX: 0,
          startY: 0
        },
        xgInfo: {
          startX: 0,
          startY: 0
        },
        rInfo: {
          startX: 0,
          startY: 0
        },
        aInfo: {
          startX: 0,
          startY: 0
        },
        tInfo: {
          startX: 0,
          startY: 0
        },
        resultText: {
          rText: "会说话的",
          aText: "考拉",
        },
        aImg: {
          width: 0,
          height: 0
        },
        article: {
          startX: 0,
          startY: 0
        },
        imgSrc:''
      }
    },
    mounted: function() {
      var that = this
      // this.startReportEvent()
      this.$axios.get('/static/question.json').then((response) => {
        that.questionList = response.data
        for (var i = 0; i < that.questionList.length; i++) {
          that.showQuestions.push({
            question: false,
            questionList: false,
            answer: false,
            content: ''
          })
        }
      })
      this.$nextTick(function() {
        var height = window.screen.height
        this.height = height * 0.8
        setTimeout(function() {
          document.scrollingElement.scrollTop = document.scrollingElement.scrollHeight;
        }, 150);

      });
    },
    methods: {
      // 获取页面dpr和宽度
      getWindowInfo() {
        var windowInfo = {};
        windowInfo.dpr = window.devicePixelRatio;
        if (window.innerWidth) {
          windowInfo.width = window.innerWidth;
        } else {
          windowInfo.width = document.body.clientWidth;
        }
        return windowInfo;
      },
      startQuestion() {
        this.isStart = true
        var that = this
        setTimeout(function() {
          that.showQuestions[0].question = true
          $('#main').animate({
            'backgroundPositionY': 0 + 'px'
          }, 1500)

        }, 1000)
        setTimeout(function() {
          that.showQuestions[0].questionList = true
          that.currentBack += 1
        }, 2000)
      },
      selectedAnswer(questionIndex, answerIndex) {
        var that = this
        setTimeout(function() {
          var ele = 'showQuestions[' + questionIndex + ']'
          var obj = eval(`that.${ele}`)
          obj.questionList = true
          obj.answer = true
        }, 500)
        var myAnswer = that.questionList[questionIndex].answers[answerIndex]
        that.showQuestions[questionIndex].content = myAnswer

        setTimeout(function() {
          if (newIndex >= that.questionList.length){
            that.startReport = true;
          }else{
            that.showQuestions[newIndex].question = true
          }

        }, 2000)
        setTimeout(function() {
          if (newIndex >= that.questionList.length){
            that.startReport = true;
          }else{
            that.showQuestions[newIndex].questionList = true
            that.currentBack += 1
          }
        }, 3000)
        var newIndex = questionIndex + 1
        if (newIndex >= that.questionList.length){
          return false
        }
      },
      startReportEvent() {
        // this.startReport = !this.startReport
        var canvas = document.createElement("canvas");
        // var canvas = document.getElementById('can');
        var ctx = canvas.getContext("2d");
        var clientWidth = this.getWindowInfo().width; //获取屏幕宽度用于canvas宽度自适应移动端屏幕
        var dpr = this.getWindowInfo().dpr;
        this.canvas = canvas
        this.dpr = dpr
        this.ctx = ctx
        ctx.globalCompositeOperation = "source-atop"; //** 坑锯齿感觉没什么用不知道是不是用错地方了 **
        canvas.width = dpr * clientWidth; //由于手机屏幕时retina屏，都会多倍渲染，用dpr来动态设置画布宽高，避免图片模糊
        canvas.height = dpr * clientWidth * 609 / 375;
        ctx.fillStyle = 'white'
        ctx.fillRect(0,0,canvas.width,canvas.height)
        this.canvasRect(canvas, ctx, dpr);
      },
      canvasRect(canvas, ctx, dpr) {
        //先画一个矩形
        //获取矩形的长宽和位置
        var rectStartX = this.canvasInfo.blankWidth * dpr;
        var rectStartY = this.canvasInfo.blankWidth * dpr
        var rectWidth = canvas.width - (this.canvasInfo.blankWidth * dpr * 2)
        var rectHeight = canvas.height - (this.canvasInfo.blankWidth * dpr * 2);
        this.rectInfo = {
          rectStartX: rectStartX,
          rectStartY: rectStartY,
          rectWidth: rectWidth,
          rectHeight: rectHeight
        }
        //开始画矩形
        ctx.fillStyle = 'red'
        ctx.beginPath();
        ctx.rect(rectStartX, rectStartY, rectWidth, rectHeight);
        ctx.fill();
        //写名字
        this.drawUsername()
      },
      drawUsername() {
        var canvas = this.canvas
        var dpr = this.dpr
        var ctx = this.ctx
        //获取起点位置
        var nameStartX = this.rectInfo.rectStartX + (20 * dpr)
        var nameStartY = this.rectInfo.rectStartY + (30 * dpr)
        this.userNameInfo = {
          startX: nameStartX,
          startY: nameStartY
        }
        ctx.font = 20 * dpr + 'px Arial'
        ctx.fillStyle = "#0094ff";
        ctx.textAlign = 'left';
        ctx.fillText("流言蜚语", nameStartX, nameStartY);
        ctx.restore()
        this.drawXg();
      },
      drawXg() {
        var canvas = this.canvas
        var dpr = this.dpr
        var ctx = this.ctx
        var text = "我是一个：好人";
        //文字,文字大小,文字间距,距离上高度,上一个定位的元素,当前定位元素
        this.drawText(text, 18, 0, 30, 'userNameInfo', 'xgInfo')
        this.drawResultText()
      },
      //绘制结果文字
      drawResultText() {
        var text = this.resultText.rText
        this.drawText(text, 32, 10, 60, 'xgInfo', 'rInfo')
        this.drawAnimalText()

      },
      drawAnimalText() {
        var text = this.resultText.aText
        this.drawText(text, 60, 15, 80, 'rInfo', 'aInfo')
        //开始载入考拉图片
        this.drawKl()
      },
      drawTags() {

      },
      drawArticle(Y,H) {
        console.log(H)
        var text = "性情温和的你不喜欢给人制造麻烦也激励避免冲突或者意见不合不会迅速做出决定卓越的社交表单能力热情而富有同理心"
        var that = this
        var canvas = this.canvas
        var dpr = this.dpr
        var ctx = this.ctx
        //获取起点位置
        var aStartX = canvas.width - this.aImg.width - 10 * dpr
        var aStartY = Y + H + 25*dpr
        // console.log(this.aImg.width +'---aStartx')
        this.article = {
          startX: aStartX,
          startY: aStartY
        }
        ctx.font = 15 * dpr + 'px Arial'
        ctx.fillStyle = "#0094ff";
        ctx.textAlign = 'center';
        //设置文字间距
        var paddingWidth = 1 * dpr
        //截取开始
        var lastSubStrIndex = 0
        var tHeight = 0;
        var allTextWidth = 0,lineWidth=0
        for (var i = 0; i < text.length; i++) {
          allTextWidth += ctx.measureText(text[i]).width;
        }
        // 字符串长度大于画布区域要换行
        if (allTextWidth > canvas.width - this.aImg.width - this.canvasInfo.blankWidth*dpr) {
          for (var i = 0; i < text.length; i++) {
            lineWidth += ctx.measureText(text[i]).width;
            if (lineWidth > canvas.width - this.aImg.width - this.canvasInfo.blankWidth*dpr -20*dpr) {
              ctx.textAlign = 'left';
              ctx.fillText(text.substring(lastSubStrIndex, i), aStartX, aStartY);
              aStartY += dpr * 20; //设置行高
              lineWidth = 0;
              lastSubStrIndex = i;
            }
            if (i == text.length - 1) {
              ctx.fillText(text.substring(lastSubStrIndex, i + 1), aStartX, aStartY);
            }
          }
        } else {
          // 小于者居中显示
          ctx.textAlign = 'center';
          ctx.fillText(text, aStartX, aStartX);
        }
        that.drawQrcode()

      },
      //绘制对联
      drawImg() {
        var that = this
        var canvas = this.canvas
        var dpr = this.dpr
        var ctx = this.ctx
        var img = new Image();
        img.src = "/static/1.jpeg";
        img.onload = function() {
          var imgWidth = img.width * dpr
          var imgHeight = img.height * dpr
          var imgStartX = canvas.width - imgWidth - (100 * dpr)
          var imgStartY = 80 * dpr
          ctx.drawImage(img, imgStartX, imgStartY, imgWidth * 0.6, imgHeight * 0.6);
          // this.drawCanvasUserImg(canvas, ctx, dpr);
        }
        var img2 = new Image();
        img2.src = "/static/2.jpg";
        img2.onload = function() {
          var img2Width = img2.width * dpr
          var img2Height = img2.height * dpr
          // console.log(img2Height)
          var img2StartX = canvas.width - img2Width - (40 * dpr)
          var img2StartY = 200 * dpr
          ctx.drawImage(img2, img2StartX, img2StartY, img2Width * 0.6, img2Height * 0.6);
          that.drawArticle(img2StartY,img2Height*0.6)
        }

      },
      //绘制二维码
      drawQrcode(){
        var that = this
        var canvas = this.canvas
        var dpr = this.dpr
        var ctx = this.ctx
        var img3 = new Image();
        img3.src = "/static/qrcod.jpeg";
        img3.onload = function() {
          var img3Width = (canvas.width - that.aImg.width - that.canvasInfo.blankWidth)*0.5
          var img3Height = img3Width
          var img3StartX = (canvas.width - that.aImg.width - that.canvasInfo.blankWidth - img3Width)/2 + that.aImg.width -10*dpr
          var img3StartY = canvas.height - img3Width - that.canvasInfo.blankWidth - 50*dpr
          ctx.drawImage(img3, img3StartX, img3StartY, img3Width, img3Height);
          that.convertCanvasToImage(canvas);
        }
      },
      //绘制文本
      drawText(text, fontSize, paddingWidth, topHeight, currentEle, nextEle) {
        // eval(`that.${ele}`)
        // console.log(eval(`this.${currentEle}`))
        var that = this
        var canvas = this.canvas
        var dpr = this.dpr
        var ctx = this.ctx
        //获取起点位置
        var aStartX = eval(`that.${currentEle}`).startX
        var aStartY = eval(`that.${currentEle}`).startY + (topHeight * dpr)
        eval(`that.${nextEle}`).startX = aStartX
        eval(`that.${nextEle}`).startY = aStartY
        ctx.font = fontSize * dpr + 'px Arial'
        ctx.fillStyle = "#0094ff";
        ctx.textAlign = 'left';
        //设置文字间距
        var paddingWidth = paddingWidth * dpr
        //截取开始
        var subIndex = 0
        var tHeight = 0;
        for (var i = 0; i < text.length; i++) {
          //m每个字的宽度
          var tWidth = ctx.measureText(text[i]).width;
          tHeight = ctx.measureText(text[i]).height
          aStartX = eval(`that.${currentEle}`).startX
          if (i != 0) {
            aStartX = eval(`that.${currentEle}`).startX + (tWidth + paddingWidth) * i
          } else {
            aStartX = eval(`that.${currentEle}`).startX
          }
          ctx.fillText(text.substring(i, i + 1), Math.round(aStartX), Math.round(aStartY));
          subIndex = i;
        }
      },
      //考拉图片
      drawKl() {
        var that = this
        var canvas = this.canvas
        var dpr = this.dpr
        var ctx = this.ctx
        var that = this
        var img = new Image();
        img.src = "/static/kl.jpeg";
        img.onload = function() {
          var imgWidth = img.width * dpr
          var imgHeight = img.height * dpr
          that.aImg.width = imgWidth
          that.aImg.height = imgHeight
          var imgStartY = canvas.height - imgHeight
          ctx.drawImage(img, 0, imgStartY, imgWidth, imgHeight);
          // this.drawCanvasUserImg(canvas, ctx, dpr);
          that.drawImg();
        }
      },
      convertCanvasToImage (canvas) {
        this.imgSrc = canvas.toDataURL("image/jpeg");//png有毒在安卓机下识别二维码无法跳转
        this.imgComplte = true
        this.startReport = false
      },
      },
      updated() {
        // console.log(!this.startReport)
        if (this.startReport) return false
        var that = this
        var boxHeight = $('.chat-box:last-child').height();
        if (this.isAddHeight) {
          return false
        }
        this.isAddHeight = true
        this.height += boxHeight
        console.log(this.height)
        // this.height = height * 0.8
        this.$nextTick(function() {
          setTimeout(function() {
            $('.main').animate({
              "scrollTop": that.height + 'px'
            }, 'slow');
            that.isAddHeight = false
          }, 10);

        });
      }
  }
</script>

<style scoped>
  @import '../assets/index.css'
</style>
