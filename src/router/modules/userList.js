import HomeLayout from '@/layout'

export default {
  path: '/sys',
  name: 'sys:user:list',
  redirect: '/users',
  component: HomeLayout,
  meta: {
    title: '系统管理',
    icon: 'menu-outlined'
  },
  children: [
    {
      path: '/sys/users',
      name: 'sys:user:list',
      component: () => import('@/views/userList/index'),
      meta: {
        title: '用户管理',
        icon: 'user-outlined'
      }
    }]
}
