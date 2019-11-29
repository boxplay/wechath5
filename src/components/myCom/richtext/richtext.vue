<template>
  <div>
    <div id="butGroup">
      <button id="bold" @click="addBold">加粗</button>
      <button id="copy" @click="copy">复制</button>
      <button id="big" @click="big">变大</button>
      <button id='remove' @click="remove">缩小</button>
      <button id="upload" @click="upload">上传图片</button>
      <button id='justifyCenter' @click="justifyCenter">居中</button>
    </div>
    <iframe ref="HtmlEdit" id='HtmlEdit' style="width:400px; height: 300px" marginWidth='2px' marginHeight='2px'></iframe>
  </div>
</template>

<script>
  import {
    VueCropper
  } from 'vue-cropper'
  export default {
    name: 'richtext',
    data() {
      return {

      }
    },
    methods: {
      remove(){
        this.editorDoc.execCommand("RemoveFormat",false,null);
      },
      upload() {
        this.editorDoc.execCommand('insertHtml', false,
          "<img src='http://img.someet.cc/FlpAnn3vD3OxymlEpLGW8Eoffh1Y' width='100%'>")
      },
      justifyCenter() {
        this.editorDoc.execCommand('justifyCenter', false);
      },
      big() {
        //所有字体特效只是使用 execComman() 就能完成。
        this.editorDoc.execCommand("fontSize", true, 10);

      },
      //复制方法
      copy() {
        this.editorDoc.execCommand("copy", true, null);
      },
      //加粗方法
      addBold() {
        this.editorDoc.execCommand("Bold", true, null);
      }
    },
    mounted() {
      var that = this
      console.log(this.editor)
      //只需键入以下设定，iframe立刻变成编辑器。
      this.editorDoc.designMode = 'On'; //打开设计模式
      this.editorDoc.contentEditable = true; // 设置元素为可编辑
      this.editorDoc.addEventListener('paste', (e) => {
        // Prevent the default pasting event and stop bubbling
        e.preventDefault();
        e.stopPropagation();

        // Get the clipboard data
        let paste = (e.clipboardData || window.clipboardData).getData('text/html');
        console.log(paste)
        // Do something with paste like remove non-UTF-8 characters
        // paste = paste.replace(/width\:\"(.*)\"/gi, '123');
        paste = paste.replace(/<img[^>]*>/gi, function(match, capture) {
          // return match.replace(/(<img[^>]*)(\/?>)/gi, "$1width='100%' $2") // 添加width="100%"
          return match.replace(/style\s*?=\s*?([‘"])[\s\S]*?\1/ig, 'style="max-width:100%;height:auto;"') // 替换style

        })
        // Find the cursor location or highlighted area
        const selection = this.editorDoc.getSelection();

        // Cancel the paste operation if the cursor or highlighted area isn't found
        if (!selection.rangeCount) return false;
        var div = this.editorDoc.createElement("div");
        div.innerHTML = paste;
        // Paste the modified clipboard content where it was intended to go
        selection.getRangeAt(0).insertNode(div);
        //$("#tip").html(paste)
      });
    },
    computed: {
      editor() {
        return this.$refs.HtmlEdit.contentWindow;
      },
      editorDoc() {
        return document.getElementById("HtmlEdit").contentDocument; //获取iframe documen 对象
      }
    }
  }
</script>

<style>
</style>
