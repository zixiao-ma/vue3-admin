<template>

  <a-card>

    <a-spin :spinning="$store.getters.loadStatus">
      <router-view></router-view>
    </a-spin>

  </a-card>

</template>

<script setup>

</script>
<style lang="scss" scoped>

</style>
