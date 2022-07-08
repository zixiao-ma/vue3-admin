import HomeLayout from '@/layout'

export default {
  path: '/sys',
  name: 'sys:role:list',
  redirect: '/users',
  component: HomeLayout,
  meta: {
    title: '系统管理',
    icon: 'like-outlined'
  },
  children: [
    {
      path: '/sys/roles',
      name: 'sys:role:list',
      component: () => import('@/views/roleList/index'),
      meta: {
        title: '角色列表',
        icon: 'appstore-outlined'
      }
    }]
}
