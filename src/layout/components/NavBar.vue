<template>
  <div class="navbox">
    <div class="left">
      <span style="font-size: 20px;" @click="$store.commit('setCollapsed')">
        <menu-fold-outlined v-if="!$store.getters.menuCol"/>
      <menu-unfold-outlined v-else/>
      </span>
      <breadcrumb class="breadcrumb"></breadcrumb>

    </div>
    <div class="right">

      <a-avatar :src="$store.getters.userInfo.avatar"/>
      <span class="dropdown">
        <a-dropdown :trigger="['click']">
        <a class="ant-dropdown-link" @click.prevent>
          {{ $store.getters.userInfo.username }}
          <DownOutlined/>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;" @click="$router.push('/')">首页</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="showConfirm">退出登录</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      </span>

    </div>
  </div>
</template>

<script setup>
import { DownOutlined, ExclamationCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
import { createVNode } from 'vue'
import { useStore } from 'vuex'
import Breadcrumb from '@/components/breadcrumb'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()
const showConfirm = () => {
  Modal.confirm({
    title: '提示',
    icon: createVNode(ExclamationCircleOutlined),
    content: '您确定要退出登录吗？',
    okText: '确认',
    cancelText: '取消',
    onOk () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 500)
      }).then(() => {
        store.commit('user/logout')
        router.push('/login')
      })
    },

    onCancel () {
    }
  })
}
</script>
<style lang="scss" scoped>
.navbox {
  display: flex;
  padding: 0 15px;
  justify-content: space-between;
  align-items: center;

}

.breadcrumb {
  margin-left: 10px;
}

.left {
  display: flex;
  align-items: center;

}

.dropdown {
  margin: 0 10px;
}
</style>
