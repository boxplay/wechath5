<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
    <Row type="flex">
      <i-col :span="spanLeft" class="layout-menu-left">
        <Menu active-key="1" theme="dark" width="auto">
          <div class="layout-logo-left"></div>
          <Menu-item key="1" name='1'>
            <Icon type="ios-navigate" :size="iconSize"></Icon>
            <span class="layout-text">活动列表</span>
          </Menu-item>
          <Menu-item key="2" name='2'>
            <Icon type="ios-keypad" :size="iconSize"></Icon>
            <span class="layout-text">活动发布</span>
          </Menu-item>
        </Menu>
      </i-col>
      <i-col :span="spanRight">
        <div class="layout-header" style="text-align: left;">
          <i-button type="text" @click="toggleClick">
            隐藏菜单
            <Icon type="ios-keypad"></Icon>
          </i-button>
        </div>
        <div class="layout-breadcrumb">
          <Breadcrumb>
            <Breadcrumb-item href="#">首页</Breadcrumb-item>
            <Breadcrumb-item href="#">应用中心</Breadcrumb-item>
            <Breadcrumb-item>某应用</Breadcrumb-item>
          </Breadcrumb>
        </div>
        <div class="layout-content" :style="'height:'+height+'px;'">
          <div class="add-tips-box">
            dasdasdas
          </div>
          <div class="layout-content-main add-split">
            <Split v-model="addSplit">
              <div slot="left" class="add-split-pane">
                <Form :model="model" :label-width='80' action="" @submit.native.prevent class="add-form-box" label-position="right">
                  <!-- 上传头图 -->
                  <div class="add-poster">
                    <div class="add-poster-box">
                      <img width="100%" :src="poster?poster:'https://img.someet.cc/Fhe5L1DZvhVvUndWeN-tZ_K8r4WS'" alt="">
                      <Upload class="posterImgButton" action="/" type="select" :before-upload="disabledUpload">
                        <i-button class="posterUploadButton" type="info" icon="ios-cloud-upload-outline">上传文件</i-button>
                      </Upload>
                    </div>
                  </div>
                  <!-- 标题开始 -->
                  <div class="add-model-input-box">
                    <Input class="add-input" v-model="model.id" maxlength="30" show-word-limit placeholder="在这里输入标题" />
                  </div>
                  <!-- 标题结束 -->
                  <!-- 开头详情 -->
                  <div class="add-model-input-box">
                    <!-- <Input class="add-input" v-model="model.id" maxlength="30" show-word-limit placeholder="在这里输入标题" /> -->
                     <span>这是Someet发起人admin发起的#<Input style="width:10rem;border-bottom:2px solid black;" class="add-input" v-model="model.id" placeholder="在这里输入标题" />#活动</span> <br>
                     <span>我期待遇见<Input style="width:10rem;border-bottom:2px solid black;" class="add-input" v-model="model.id" placeholder="在这里输入标题" />的伙伴</span>
                  </div>
                  <!-- 开头详情 -->
                </Form>
              </div>
              <div slot="right" class="add-split-pane">
                Right Pane
              </div>
            </Split>
          </div>
        </div>
        <div class="layout-copy">
          2015-2020 &copy; Someet城市青年社区
        </div>
      </i-col>
    </Row>
    <Modal v-model="warningBox" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>操作确认</span>
      </p>
      <div style="text-align:center">
        <p>操作后无法撤回</p>
        <p>确认操作?</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="modal_loading" @click="confirm">确定</Button>
      </div>
    </Modal>
    <uploadPoster :showModal="showModal" @getImgUrl="getImgUrl" :imgRes="imgRes" :w="600" :h="450" :type="uploadType"></uploadPoster>
  </div>
  <!-- <img :src="poster" alt="">
    <Upload action="/" type="select" :before-upload="disabledUpload">
      <i-button type="info" icon="ios-cloud-upload-outline">上传文件</i-button>
    </Upload>
    <uploadPoster :showModal="showModal" @getImgUrl="getImgUrl" :imgRes="imgRes" :w="600" :h="450" :type="uploadType"></uploadPoster> -->
  </div>
</template>
<script>
  import uploadPoster from './myCom/uploadPost/uploadPoster'
  import dateFormate from '@/common/date'
  export default {
    name: 'Add',
    data() {
      return {
        model:{
           id:''
        },
        addsplitFortop: 0.3,
        addSplit: 0.7,
        loadingData: true,
        modal_loading: false, //弹窗loading
        warningBox: false, //确认框
        self: this,
        imgRes: "",
        showModal: false, //上传插件是否显示
        poster: '',
        uploadType: 'poster', //图片上传参数
        headimgurl: '', //图片上传参数
        spanLeft: 5,
        spanRight: 19,
        height: 0, //屏幕高度，
      }
    },
    computed: {
      iconSize() {
        return this.spanLeft === 5 ? 14 : 24;
      }
    },
    methods: {
      //菜单显示和隐藏
      toggleClick() {
        if (this.spanLeft === 5) {
          this.spanLeft = 2;
          this.spanRight = 22;
        } else {
          this.spanLeft = 5;
          this.spanRight = 19;
        }
      },
      //关闭弹窗并确认
      confirm() {
        var that = this;
        this.modal_loading = true;
        this.$http.updateStatus(this.editInfo).then((res) => {

          if (res.status == 1) {
            that.activityList.splice(that.editInfo.index, 1)
            that.modal_loading = false;
            that.warningBox = false;
            that.$Message.success('Successfully delete');
            that.editInfo = {
              id: 0,
              status: 0,
              index: 0
            }
          } else {
            console.log(res)
          }
        })
      },
      //获取上传组件的返回值
      getImgUrl(data) {
        // this.poster = data
        if (data.type == 'poster') {
          this.poster = data.url
        } else if (data.type == 'headimgurl') {
          this.headimgurl = data.url
        }
        this.showModal = false
      },
      //阻止框架默认的上传女性为，并把图片本地地址传入
      disabledUpload(file) {
        var that = this
        this.uploadType = 'poster'
        // 创建一个 FileReader 对象
        let reader = new FileReader()
        // readAsDataURL 方法用于读取指定 Blob 或 File 的内容
        // 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串表示文件的数据）
        // 读取文件作为 URL 可访问地址
        reader.readAsDataURL(file)

        const _this = this
        reader.onloadend = function(e) {
          // reader.result
          let data;
          if (typeof reader.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([reader.result]))
          } else {
            data = reader.result
          }
          that.imgRes = data
          that.showModal = true
        }
        return false;
      },
    },
    filters: {
      formatDate(time) {
        return dateFormate.formatDate(time, 'MM-dd hh:mm') //年-月-日 时分
      }

    },
    mounted: function() {
      var that = this;
      this.$nextTick(() => {
        const height = window.screen.availHeight
        // const
        that.height = height - 250
        // console.log(window)
      })
    },
    components: {
      uploadPoster,
    }
  }
</script>
<style scoped>
  @import url("../assets/someet.css");
</style>
