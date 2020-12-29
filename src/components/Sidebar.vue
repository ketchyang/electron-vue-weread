<template>
  <div class="side-bar">
    <span class="side-bar-item" >推荐</span>
    <span class="side-bar-item">我的书架</span>
    <span class="side-bar-item">文档上传</span>
    <span class="side-bar-item">正在阅读</span>
    <span class="side-bar-item">设置</span>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    msg: String
  }
};
</script>

<style lang="scss">
.side-bar {
  width: 200px;
  height: 100vh;
  background: #606266;

  .side-bar-item {
    height: 50px;
    display: block;
    line-height: 50px;
    font-size: 18px;
    padding-left: 30px;
    color: white;
  }

  .side-bar-item:hover {
    background: #909399;
    -moz-transition: all 1s ease 0s;
    -webkit-transition: all 1s ease 0s;
    transition: all 1s ease 0s;
    -o-transition: all 1s ease 0s;
  }
}
</style>
