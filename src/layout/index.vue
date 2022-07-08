<template>
  <div id="main-container">
    <div :style="{width:$store.getters.menuCol?'84px':'210px'}" class="left">
      <menu-bar></menu-bar>
    </div>
    <div class="right">
      <div class="right_top">
        <nav-bar class="navbar"></nav-bar>
        <tags-view class="tagsView"></tags-view>
      </div>
      <div class="right_bottom">
        <app-main></app-main>
      </div>
    </div>

  </div>
</template>

<script setup>

import MenuBar from '@/layout/components/MenuBar'
import NavBar from '@/layout/components/NavBar'
import AppMain from '@/layout/components/AppMain'
import TagsView from '@/layout/components/TagsView'</script>
<style lang="scss" scoped>
#main-container {
  width: 100%;
  height: 100%;
  display: flex;

  .left {
    background-color: #001529;
    transition: all .3s;
  }

  .right {
    flex: 1;

    .right_top {
      height: 75px;
      border-bottom: 1px solid #ddd;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;

      .navbar {
        flex: 1;
        border-bottom: 1px solid #ddd;
      }

      .tagsView {
        height: 30px;
        line-height: 30px;
        padding-left: 10px;
      }
    }

    .right_bottom {
      padding: 10px;
    }
  }
}
</style>
