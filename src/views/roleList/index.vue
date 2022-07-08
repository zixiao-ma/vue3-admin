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
        <template v-if="column.key==='status'">
          <a-tag v-if="record.statu===1" color="green">正常</a-tag>
          <a-tag v-else color="red">禁用</a-tag>
        </template>
        <template v-if="column.key==='operate'">
          <a-button type="link">分配权限</a-button>
          <a-button type="link">编辑</a-button>
          <a-button type="link">删除</a-button>
        </template>
      </template>
    </a-table>
  </main>
</template>

<script>
import { computed, defineComponent, reactive, ref, toRefs } from 'vue'
import { getRoleList } from '@/api/user'
import SearchModel from '@/layout/components/searchModel'
/* code: "normal"
created: "2021-01-04T10:09:14"
id: 3
menuIds: []
name: "普通用户"
remark: "只有基本查看功能"
statu: 1
updated: "2021-01-30T08:19:52" */
const columns = [
  {
    title: '用户名',
    key: 'name',
    dataIndex: 'name'
  },
  {
    title: '唯一编码',
    key: 'code',
    dataIndex: 'code'
  },
  {
    title: '描述',
    key: 'remark',
    dataIndex: 'remark'
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status'
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
        const res = await getRoleList(pageModel)
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
