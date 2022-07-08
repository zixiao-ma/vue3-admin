<template>
  <div class="header">
    <a-input-search
      v-model:value="keyword"
      :loading="false"
      enter-button
      placeholder="搜索"
      style="width: 300px"
    />
    <a-button type="primary">新增</a-button>
    <a-button :disabled="props.dis" danger type="primary">批量删除</a-button>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'

const keyword = ref('')
const props = defineProps({
  dis: {
    type: Boolean,
    default: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  value: {
    type: String,
    default: ''
  }
})
// eslint-disable-next-line vue/no-setup-props-destructure
keyword.value = props.value
</script>
<style lang="scss" scoped>
.ant-btn {
  margin-left: 10px;
}
</style>
