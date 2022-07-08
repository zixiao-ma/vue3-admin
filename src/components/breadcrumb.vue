<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-if="parent">{{ parent }}</a-breadcrumb-item>
    <a-breadcrumb-item>{{ children }}</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute()
const parent = ref('')
const children = ref('')
watch(route, (value, oldValue, onCleanup) => {
  if (route.path !== '/login') {
    parent.value = route.matched[0].meta.title
    children.value = route.matched[0].children[0].meta.title
  }
}, {
  deep: true,
  immediate: true
})

</script>
<style lang="scss" scoped>

</style>
