import HomeLayout from '@/layout'

export default {
  path: '/system',
  name: 'sys:dict:list',
  redirect: '/dicts',
  component: HomeLayout,
  meta: {
    title: '系统工具',
    icon: 'setting-outlined'
  },
  children: [
    {
      path: '/system/dicts',
      name: 'sys:dict:list',
      component: () => import('@/views/dictList/index'),
      meta: {
        title: '数字字典',
        icon: 'file-search-outlined'
      }
    }
  ]
}
