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
            <a href="/add" target="_blank"><span class="layout-text">活动发布</span></a>
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
          <div class="layout-content-main">
            <Tabs active-key="key1" @on-click="changeTab">
              <Tab-pane label="未提交审核" key="key1" name='8'>
                <!-- <i-table :highlight-row="true" border :content="self" :columns="activityCol" :data="activityList"></i-table> -->
                <Table :loading="loadingData" border :columns="activityCol" :data="activityList">
                  <template slot-scope="{ row }" slot="status">
                    <strong style="color:#FF0000;">未提交审核</strong>
                  </template>
                  <template slot-scope="{ row }" slot="start_time">
                    <i>{{row.start_time | formatDate}}</i>
                  </template>
                  <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="updateStatus(row.id,row.status,index)">提交审核</Button>
                    <Button type="error" size="small">修改</Button>
                  </template>
                </Table>
              </Tab-pane>
              <Tab-pane label="已提交审核" key="key2" name='15'>
                <Table :loading="loadingData" border :columns="activityCol" :data="activityList">
                  <template slot-scope="{ row }" slot="status">
                    <strong style="color:#FF0000;">已提交审核</strong>
                  </template>
                  <template slot-scope="{ row }" slot="start_time">
                    <i>{{row.start_time | formatDate}}</i>
                  </template>
                  <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px">查看</Button>
                    <Button type="error" size="small" disabled>修改</Button>
                  </template>
                </Table>
              </Tab-pane>
              <Tab-pane label="已发布" key="key4" name='20'>
                <Table :loading="loadingData" border :columns="activityCol" :data="activityList">
                  <template slot-scope="{ row }" slot="status">
                    <strong style="color:#FF0000;">已发布</strong>
                  </template>
                  <template slot-scope="{ row }" slot="start_time">
                    <i>{{row.start_time | formatDate}}</i>
                  </template>
                  <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px">查看</Button>
                    <Button type="error" size="small">关闭活动</Button>
                  </template>
                </Table>
              </Tab-pane>
              <Tab-pane label="已关闭" key="key5" name='30'>
                <Table :loading="loadingData" border :columns="activityCol" :data="activityList">
                  <template slot-scope="{ row }" slot="status">
                    <strong style="color:#FF0000;">已关闭</strong>
                  </template>
                  <template slot-scope="{ row }" slot="start_time">
                    <i>{{row.start_time | formatDate}}</i>
                  </template>
                  <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px">查看</Button>
                    <Button type="error" size="small" disabled>取消活动</Button>
                  </template>
                </Table>

              </Tab-pane>
              <Tab-pane label="已取消" key="key6" name='40'>
                <Table :loading="loadingData" border :columns="activityCol" :data="activityList">
                  <template slot-scope="{ row }" slot="status">
                    <strong style="color:#FF0000;">已取消</strong>
                  </template>
                  <template slot-scope="{ row }" slot="start_time">
                    <i>{{row.start_time | formatDate}}</i>
                  </template>
                  <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px">查看</Button>
                    <Button type="error" size="small" disabled>关闭活动</Button>
                  </template>
                </Table>
              </Tab-pane>
            </Tabs>
            <Page :total="total" v-show="activityList.length > 0" :page-size="pageSize" @on-change="pageChange" />
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
  import qs from 'qs'
  export default {
    name: 'Someet',
    data() {
      return {
        editInfo:{
          id:0,
          status:0,
          index:0
        },
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
        currentPage: 1,
        currentTab: 8,
        total: 0,
        pageSize: 5,
        activityCol: [{
            title: 'ID',
            width: 80,
            key: 'id'
          },
          {
            title: '发起人',
            width: 100,
            key: 'username'
          },
          {
            title: '标题',
            key: 'title'
          },
          {
            title: '时间',
            key: 'start_time',
            slot: 'start_time'
          },
          {
            title: '状态',
            width: 130,
            key: 'status',
            slot: 'status'
          },
          {
            title: '操作',
            key: 'action',
            width: 180,
            slot: 'action',
            align: 'center',
          }
        ],
        activityList: []
      }
    },
    computed: {
      iconSize() {
        return this.spanLeft === 5 ? 14 : 24;
      }
    },
    methods: {
      //关闭弹窗并确认
      confirm() {
        var that =this;
        this.modal_loading = true;
        this.$http.updateStatus(this.editInfo).then((res)=>{

            if(res.status == 1){
              that.activityList.splice(that.editInfo.index,1)
              that.modal_loading = false;
              that.warningBox = false;
              that.$Message.success('Successfully delete');
              that.editInfo = {
                id:0,
                status:0,
                index:0
              }
            }else{
              console.log(res)
            }
        })
      },
      //关闭活动
      updateStatus(id, status,index) {
        if (status == 8) {
          this.editInfo = {
            id:id,
            status:15,
            index:index
          }
          this.warningBox = true
        }

      },
      //移除单行数据，仅视觉移除
      remove(index) {
        this.activityList.splice(index, 1);
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
      //分页切换
      pageChange(page) {
        this.currentPage = page;
        this.getActList();
      },
      //切换当行兰
      changeTab(name) {
        if (this.currentTab != name) {
          this.currentTab = name;
          this.getActList()
        }
      },
      //获取活动列表
      getActList() {
        const that = this;
        that.loadingData = false
        that.activityList = [];
        that.total = 0
        var data = {
          page: this.currentPage + 1,
          status: this.currentTab,
          limit: this.pageSize
        }
        // data = {}
        this.$http.getActivityList(data).then((res) => {
          that.loadingData = false
          that.activityList = res.data;
          that.total = Number(res.count)
        })
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
        that.height = height - 250
        // console.log(window)
      })
      this.getActList();
    },
    components: {
      uploadPoster,
    }
  }
</script>
<style scoped>
  @import url("../assets/someet.css");
</style>
