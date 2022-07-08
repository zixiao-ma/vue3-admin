<template>
  <a-result status="404" sub-title="Sorry,token timed out, please login again" title="401">
    <template #extra>
      <a-button type="primary" @click="$store.commit('user/logout')">Back Home</a-button>
    </template>
  </a-result>
</template>
<script setup>

</script>
<style lang="scss" scoped>

</style>
