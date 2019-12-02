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
          <div class="layout-content-main add-split">
            <Split v-model="addSplit">
              <div slot="left" class="add-split-pane">
                <Form :model="model" :label-width='80' action="" @submit.native.prevent class="add-form-box"
                  label-position="right">
                  <div id='posteranddetail' v-show="showPart == 'posteranddetail'">
                    <!-- 上传头图 -->
                    <div class="add-poster">
                      <div class="add-poster-box">
                        <img width="100%" :src="poster?poster:'https://img.someet.cc/Fhe5L1DZvhVvUndWeN-tZ_K8r4WS'" alt="">
                        <Upload class="posterImgButton" action="/" type="select" :before-upload="uploadPoster">
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
                      <span>这是Someet发起人admin发起的#<Input style="width:10rem;border-bottom:2px solid black;" class="add-input"
                          v-model="model.id" placeholder="在这里输入标题" />#活动</span> <br>
                      <span>我期待遇见<Input style="width:10rem;border-bottom:2px solid black;" class="add-input" v-model="model.id"
                          placeholder="在这里输入标题" />的伙伴</span>
                    </div>
                    <!-- 开头详情 -->
                    <!-- 活动详情 -->
                    <div class="add-model-input-box">
                      <div id="summernote"></div>
                    </div>
                  </div>
                  <!-- 活动详情 -->
                  <div id='founder' v-show="showPart == 'founder'">
                    <div class="add-founder-box">
                      <!-- 发起人姓名 -->
                      <div class="add-founder-name">
                        这是admin
                      </div>
                      <Row>
                        <Col span="4">
                        <div class="add-founder-head">
                          <img src="https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIhH9ACDcvF0CbibwKcsKUDpqpjawia29icNNsfRhLwQiaiaXjAJ7iczrC2TnEYn78aJBxefiaCYFzA9iaK0w/132"
                            alt="" width="100%">
                        </div>
                        </Col>
                        <Col span="20">
                        <div class="add-founder-desc">
                          <Tag checkable color="primary">标签一</Tag>
                          <Tag checkable color="success">标签二</Tag>
                          <Tag checkable color="error">标签三</Tag>
                          <Tag checkable color="warning">标签四</Tag>
                          <Tag checkable color="primary">标签一</Tag>
                          <Tag checkable color="success">标签二</Tag>
                          <Tag checkable color="error">标签三</Tag>
                          <Tag checkable color="warning">标签四</Tag>
                          <Tag checkable color="primary">标签一</Tag>
                          <Tag checkable color="success">标签二</Tag>
                          <Tag checkable color="error">标签三</Tag>
                          <Tag checkable color="warning">标签四</Tag>
                        </div>
                        </Col>
                      </Row>
                      <!-- 发起人姓名 -->
                      <!-- 联合发起人开始 -->
                      <div class="add-founder-name">
                        <Checkbox v-model="co_founders.had_field8" label="twitter" @on-change="changeField8">
                          <span style="font-size: 1.3rem;">本次活动我有联合发起人</span>
                        </Checkbox>
                        <br>
                        <Input v-show="co_founders.had_field8" class="add-founder-name-input" v-model="model.field8"
                          placeholder="请输入联合发起人的姓名" style="width: 300px" />
                      </div>
                      <!-- 联合发起人结束 -->
                      <!-- 嘉宾开始 -->
                      <div class="add-founder-name">
                        <Checkbox v-model="co_founders.had_field7" label="twitter" @on-change="changeField7">
                          <span style="font-size: 1.3rem;">本次活动我有嘉宾</span>
                        </Checkbox>
                        <Row v-show="co_founders.had_field7">
                          <Col span="4">
                          <div class="add-founder-head">
                            <div class="add-founder-head-box">
                              <img :src="model.jiabin.jiabin_head?model.jiabin.jiabin_head:'http://img.someet.cc/phpQJdJJ0'"
                                alt="" width="100%">
                            </div>
                            <div class="add-founder-jiabin-head-btn">
                              <Upload action="/" type="select" :before-upload="uploadJiabin">
                                <i-button type="info" icon="ios-cloud-upload-outline">上传照片</i-button>
                              </Upload>
                            </div>
                          </div>
                          </Col>
                          <Col span="20">
                          <div class="add-founder-desc">
                            <div>
                              <Input class="add-founder-name-input" v-model="model.jiabin_name" placeholder="请输入嘉宾的姓名" style="width: 200px" />
                            </div>
                            <div class="add-founder-jiabin-box">
                              <Input class="add-founder-jiabin-desc" maxlength="200" v-model="model.jiabin_desc" show-word-limit type="textarea" placeholder="请输入嘉宾介绍"
                                style="width: 300px;border:1px solid black;resize: none;" />
                            </div>
                          </div>
                          </Col>
                        </Row>
                      </div>
                      <!-- 嘉宾结束 -->
                    </div>
                  </div>
                  <div class="add-model-input-box">
                    <ButtonGroup>
                      <Button size="large" type="primary" @click="changePartPre">
                        <Icon type="ios-arrow-back" />
                        上一页
                      </Button>
                      <Button size="large" type="primary" @click="changePartNext">
                        下一页
                        <Icon type="ios-arrow-forward" />
                      </Button>
                    </ButtonGroup>
                  </div>
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
    <uploadPoster :showModal="showModal" @getImgUrl="getImgUrl" :imgRes="imgRes" :w.sync="uploadBoxWidth.w" :h.sync="uploadBoxWidth.h" :type="uploadType"></uploadPoster>
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
        uploadBoxWidth:{
          w:200,
          h:200
        },
        showPart: 'founder',
        co_founders: {
          had_field8: false,
          had_field7: false
        }, //是否存在联合发起人
        model: {
          id: '',
          poster:'',
          headimgurl:'',
          title: '',
          detail_header: '',
          field8: '', //联合发起人
          jiabin:{
            jiabin_name:'',//嘉宾姓名，
            jiabin_head:'',//嘉宾头像
           jiabin_desc:'',//嘉宾简介
          }
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
      //添加联合发起人
      changeField8(res) {
        this.co_founders.had_field8 = res
      },
      changeField7(res) {
        this.co_founders.had_field7 = res
      },
      changePartPre() {
        this.showPart = 'posteranddetail'
      },
      changePartNext() {
        this.showPart = 'founder'
      },
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
        console.log(data)
        // this.poster = data
        if (data.type == 'poster') {
          this.model.poster = data.url
        } else if (data.type == 'headimgurl') {
          this.model.headimgurl = data.url
        }else if(data.type == 'jiabin'){
          this.model.jiabin.jiabin_head = data.url
        }
        this.showModal = false
      },
      //阻止框架默认的上传行为，并把图片本地地址传入
      uploadJiabin(file) {
        console.log(file)
        var that = this
        this.uploadBoxWidth = {
                   w:200,
                   h:200
                 }
        this.uploadType = 'jiabin'
        this.uploadFunc(file);
        return false;
      },
      uploadPoster(file) {
        console.log(file)
       this.uploadBoxWidth = {
                  w:600,
                  h:340
                }
        var that = this
        this.uploadType = 'poster'
        this.uploadFunc(file);
        return false;
      },
      uploadFunc(file){
        var that = this
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
      }
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
        that.height = height - 220
        $('#summernote').summernote({
          lang: 'zh-CN',
          placeholder: '请输入内容',
          height: 300,
          width: '90%',
          toolbar: [
            ['style', ['bold', 'italic']],
            ['fontsize', ['fontsize']],
            ['insert', ['picture']],
            ['paragraph']
          ],
          styleTags: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
          fontSizes: ['14', '15', '17', '18', '19'],
          callbacks: {
            onSubmit: function() {
              vm.richContent = $('#summernote').summernote('code')
            }
          }
        })
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
