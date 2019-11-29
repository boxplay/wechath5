<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App'

  }
</script>

<style>
  *,
  html {
    margin: 0;
    padding: 0;
    font-size: 14px;
  }

  html {
    background-color: white;
  }
  .note-editor{
        margin: 0 auto;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 100%;
  }

  div {
    box-sizing: border-box;
  }

  .fade-enter {
    opacity: 0;
  }

  .fade-enter-active {
    transition: opacity 1s;
  }

  .fade-leave-to {
    opacity: 0;
  }

  .fade-leave-active {
    transition: opacity 1s;
  }

  ::-webkit-scrollbar {
    width: 0 !important;
  }

  ::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
  }

  .ivu-input {
    border: none !important;
    height: 2.4rem;
    font-size: 1rem;
    text-align: center;
    outline: none !important;
    font-size: 18px;
    text-align: left;
    border-radius: 0;
  }
  .ivu-input:focus{
    box-shadow:white !important;
  }
  .ivu-input:focus,.ivu-input:hover{
    border-color: white;
  }
  input::input-placeholder{color:  black !important ;} /* 有些资料显示需要写，有些显示不需要，但是在编辑器webstorm中该属性不被识别 */
  ::-webkit-input-placeholder { /* WebKit browsers */
  color: black !important ;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: black !important ;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: black !important ;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
  color: black !important ;
  }

</style>
