<template>
  <a-result status="404" sub-title="Sorry, the page you visited does not exist." title="404">
    <template #extra>
      <a-button type="primary" @click="$router.push('/')">Back Home</a-button>
    </template>
  </a-result>
</template>

<script setup>

</script>
<style lang="scss" scoped>

</style>
