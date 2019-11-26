<template>
  <div v-show="showModal">
    <Card class="uploadTopBox" style="margin-left:-400px;">
      <p slot="title">
        <Icon type="ios-film-outline"></Icon>
        裁剪图片
      </p>
      <a href="#" slot="extra">
        <Icon type="ios-loop-strong"></Icon>
        关闭
      </a>
      <div class="uploadBox-upload">
        <div>
          <label class="ivu-btn ivu-btn-info" style="line-height: 32px;" for="uploads">选择图片</label>
          <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg"
            @change="uploadImg($event, 1)">
          <i-button type="info" @click="changeScale(1)">放大</i-button>
          <i-button type="info" @click="changeScale(-1)">缩小</i-button>
          <button class="ivu-btn ivu-btn-success" @click="finish('base64')">裁剪上传</button>
        </div>
        <div class="uploadBox-cut">
          <vueCropper ref="cropper" :img="option.img?option.img:imgRes" :outputSize="option.size" :outputType="option.outputType" :info="true"
            :full="option.full" :canMove="option.canMove" :canMoveBox="option.canMoveBox" :original="option.original"
            :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight"
            :fixedBox="option.fixedBox"></vueCropper>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
  import {
    VueCropper
  } from 'vue-cropper'
  import qs from 'qs'
  export default {
    name: 'uploadPoster',
    data() {
      return {
        headImg: '',
        showModalNative:true,
        //剪切图片上传
        crap: false,
        option: {
          img:'',
          outputSize: 1, //剪切后的图片质量（0.1-1）
          full: false, //输出原图比例截图 props名full
          outputType: 'png',
          canMove: true,
          original: true,
          canMoveBox: true,
          autoCrop: true,
          autoCropWidth: 600,
          autoCropHeight: 340,
          fixedBox: true
        },
        uploadImgSrc: ''
      }
    },
    props:{
      imgRes:{
        default:""
      },
      showModal:{
        default:false
      },
      type:{
        default:'poster'
      },
      w:{
        default:0
      },
      h:{
        default:0
      }
    },
    methods: {
      uploadImg(e, num) {
        //上传图片
        // this.option.img
        var file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        var reader = new FileReader()
        reader.onload = (e) => {
          let data
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          if (num === 1) {
            this.option.img = data
          } else if (num === 2) {
            this.example2.img = data
          }
        }
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        reader.readAsArrayBuffer(file)
      },
      finish(type) {
        var that = this;
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob((data) => {
            var img = window.URL.createObjectURL(data)
            this.uploadImgSrc = img
          })
        } else {
          this.$refs.cropper.getCropData((data) => {
            this.uploadImgSrc = data
            //开始上传
            var data = {
              'imgData': data
            }
            data = qs.stringify(data)
            this.$axios.post('/upload', data, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
              }
            }).then((res) => {
              console.log(res.data.data.url)
              that.$emit('getImgUrl',{'url':res.data.data.url,'type':that.type})
            })
          })
        }
      },
      imgLoad(msg) {
        console.log(msg)
      },
      changeScale(num) {
        num = num || 1
        this.$refs.cropper.changeScale(num)
      },
    },
    mounted: function() {
      var that = this
    },
    components: {
      VueCropper,
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
