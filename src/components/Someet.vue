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
          <!-- <Menu-item key="3" name='3'>
            <Icon type="ios-analytics" :size="iconSize"></Icon>
            <span class="layout-text">选项 3</span>
          </Menu-item> -->
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
                <i-table :highlight-row="true" border :content="self" :columns="activityCol" :data="activityList"></i-table>
                <Page :total="100" :page-size="30" @on-change="pageChange" />
              </Tab-pane>
              <Tab-pane label="已提交审核" key="key2" name='15'>
                <i-table :highlight-row="true" border :content="self" :columns="activityCol" :data="activityList"></i-table>
                <Page :total="100" :page-size="30" @on-change="pageChange" />
              </Tab-pane>
              <Tab-pane label="已发布" key="key3" name='20'>
                <i-table :highlight-row="true" border :content="self" :columns="activityCol" :data="activityList"></i-table>
                <Page :total="100" :page-size="30" @on-change="pageChange" />
              </Tab-pane>
            </Tabs>
          </div>
        </div>
        <div class="layout-copy">
          2015-2020 &copy; Someet城市青年社区
        </div>
      </i-col>
    </Row>
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
  import qs from 'qs'
  export default {
    name: 'Someet',
    data() {
      return {
        self: this,
        imgRes: "",
        showModal: false,
        poster: '',
        uploadType: 'poster',
        headimgurl: '',
        spanLeft: 5,
        spanRight: 19,
        height: 0, //屏幕高度，
        currentPage:1,
        currentTab:8,
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
            title: '地点',
            key: 'address'
          },
          {
            title: '状态',
            width: 130,
            key: 'status',
            render:(h,params)=>{
              if(params.row.status == 20){
                return h('div',{style:{'color':'red'}},'未提交审核')
              }
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '0px'
                  },
                  on: {
                    click: () => {
                      this.show(params.row.id)
                    }
                  }
                }, '提交审核')
              ]);
            }
          }
        ],
        activityList: [{
            id: '1',
            username: 'admin',
            title: '北京市朝阳区芍药居',
            address: '北京',
            status: 20
          },
          {
            id: '2',
            username: 'admin',
            title: '北京市朝阳区芍药居',
            address: '北京',
            status: 20
          },
          {
            id: '3',
            username: 'admin',
            title: '北京市朝阳区芍药居',
            address: '北京',
            status: 20
          },
          {
            id: '4',
            username: 'admin',
            title: '北京市朝阳区芍药居',
            address: '北京',
            status: 20
          }
        ]
      }
    },
    computed: {
      iconSize() {
        return this.spanLeft === 5 ? 14 : 24;
      }
    },
    methods: {
      show(index) {
      console.log(index)
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
      pageChange(page){
        console.log(page)
        this.currentPage = page;
      },
      //切换当行兰
      changeTab(name){
         console.log(name)
         if(this.currentTab != name){
           this.currentTab = name;
           this.getActList()
         }
      },
      //获取活动列表
      getActList(){
        var data = {
          page:this.currentPage+1,
          status:this.currentTab,
          pageSize:30
        }
        console.log(data)
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
