<template>
  <div>
    <img :src="poster" alt="">
    <Upload action="/" type="select" :before-upload="disabledUpload">
      <i-button type="info" icon="ios-cloud-upload-outline">上传文件</i-button>
    </Upload>
    <uploadPoster :showModal="showModal" @getImgUrl="getImgUrl" :imgRes="imgRes" :w="600" :h="450" :type="uploadType"></uploadPoster>
  </div>
</template>
<script>
  import uploadPoster from './myCom/uploadPost/uploadPoster'
  import qs from 'qs'
  export default {
    name: 'Index',
    data() {
      return {
        imgRes:"",
        showModal:false,
        poster:'',
        uploadType:'poster',
        headimgurl:''
      }
    },
    methods: {
      getImgUrl(data) {
        // this.poster = data
        if(data.type == 'poster'){
          this.poster = data.url
        }else if(data.type == 'headimgurl'){
          this.headimgurl = data.url
        }
        this.showModal = false
      },
      disabledUpload(file){
        var that = this
        this.uploadType = 'poster'
        // 创建一个 FileReader 对象
        let reader = new FileReader()
        // readAsDataURL 方法用于读取指定 Blob 或 File 的内容
        // 当读操作完成，readyState 变为 DONE，loadend 被触发，此时 result 属性包含数据：URL（以 base64 编码的字符串表示文件的数据）
        // 读取文件作为 URL 可访问地址
        reader.readAsDataURL(file)

        const _this = this
        reader.onloadend = function (e) {
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
      }
    },
    mounted: function() {
      var that = this
    },
    components: {
      uploadPoster,
    }
  }
</script>
<style scoped>
  .uploadTopBox {
    position: absolute;
    left: 50%;
    margin-left: -400px;
    top: 20%;
    width: 800px;
  }

  .uploadBox-cut {
    width: 700px;
    height: 500px;
    margin: 30px auto;
  }
</style>
