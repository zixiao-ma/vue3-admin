<template>
  <search-model :dis="btnDisabled"></search-model>
  <main>
    <a-table
      :columns="columns"
      :data-source="tableData"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      rowKey="id"
      size="small"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key==='avatar'">
          <a-avatar :src="record.avatar"/>
        </template>
        <template v-if="column.key==='roles'">
          <a-tag v-for="tag in record.roles " :key="tag.id">{{ tag.name }}</a-tag>
        </template>
        <template v-if="column.key==='status'">
          <a-tag v-if="record.statu===1" color="green">正常</a-tag>
          <a-tag v-else color="red">禁用</a-tag>
        </template>
        <template v-if="column.key==='operate'">
          <a-button type="link">分配角色</a-button>
          <a-button type="link">重置密码</a-button>
          <a-button type="link">编辑</a-button>
          <a-button type="link">删除</a-button>
        </template>
      </template>
    </a-table>
  </main>
</template>

<script>
import { computed, defineComponent, reactive, ref, toRefs } from 'vue'
import { getUserList } from '@/api/user'
import SearchModel from '@/layout/components/searchModel'

const columns = [
  {
    title: '头像',
    key: 'avatar',
    dataIndex: 'avatar'
  },
  {
    title: '用户名',
    key: 'username',
    dataIndex: 'username'
  },
  {
    title: '角色名称',
    key: 'roles',
    dataIndex: 'roles'
  },
  {
    title: '邮箱',
    key: 'email',
    dataIndex: 'email'
  },
  {
    title: '手机号',
    key: 'username',
    dataIndex: 'username'
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status'
  },
  {
    title: '创建时间',
    key: 'created',
    dataIndex: 'created'
  },
  {
    title: '操作',
    key: 'operate',
    dataIndex: 'operate'
  }
]
export default defineComponent({
  components: { SearchModel },
  setup () {
    const value = ref('')
    const pageModel = reactive({
      current: 1,
      size: 100,
      total: ''
    })
    const tableData = ref([])
    const getTableData = async () => {
      try {
        const res = await getUserList(pageModel)
        console.log(res)
        pageModel.total = res.total
        tableData.value = res.records
      } catch (error) {

      }
    }
    getTableData()
    const state = reactive({
      selectedRowKeys: [],
      loading: false
    })
    const hasSelected = computed(() => state.selectedRowKeys.length > 0)

    const start = () => {
      state.loading = true // ajax request after empty completing

      setTimeout(() => {
        state.loading = false
        state.selectedRowKeys = []
      }, 1000)
    }

    const onSelectChange = selectedRowKeys => {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      state.selectedRowKeys = selectedRowKeys
    }
    const btnDisabled = computed(() => {
      return !(state.selectedRowKeys.length > 0)
    })
    return {
      btnDisabled,
      columns,
      hasSelected,
      ...toRefs(state),
      value,
      tableData,
      // func
      start,
      onSelectChange
    }
  }

})
</script>
<style lang="scss" scoped>

main {
  margin-top: 10px;
}
</style>
