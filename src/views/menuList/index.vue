<template>
  <a-button type="primary">新增</a-button>
  <main>
    <a-table
      :columns="columns"
      :data-source="tableData"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      rowKey="id"
      size="small"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key==='type'">
          <a-tag v-if="record.type===0" color="blue">目录</a-tag>
          <a-tag v-if="record.type===1" color="green">菜单</a-tag>
          <a-tag v-if="record.type===2" color="cyan">按钮</a-tag>
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
import { getMenuList } from '@/api/user'
/* component: ""
created: "2021-01-15T18:58:18"
icon: "el-icon-s-operation"
id: 1
name: "系统管理"
ordernum: 1
parentId: 0
path: ""
perms: "sys:manage"
statu: 1
type: 0
updated: "2021-01-15T18:58:20" */
const columns = [
  {
    title: '名称',
    key: 'name',
    dataIndex: 'name'
  },
  {
    title: '权限编码',
    key: 'perms',
    dataIndex: 'perms'
  },
  {
    title: '图标',
    key: 'icon',
    dataIndex: 'icon'
  },
  {
    title: '类型',
    key: 'type',
    dataIndex: 'type'
  },
  {
    title: '菜单URL',
    key: 'path',
    dataIndex: 'path'
  },
  {
    title: '菜单组件',
    key: 'component',
    dataIndex: 'component'
  },
  {
    title: '排序号',
    key: '',
    dataIndex: ''
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
        const res = await getMenuList(pageModel)
        console.log(res, 'res')
        tableData.value = res
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
.ant-btn {
  margin: 0 3px;
}

main {
  margin-top: 10px;
}
</style>
