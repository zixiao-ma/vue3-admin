import HomeLayout from '@/layout'

export default {
  path: '/sys',
  name: 'sys:menu:list',
  redirect: '/users',
  component: HomeLayout,
  meta: {
    title: '系统管理',
    icon: 'like-outlined'
  },
  children: [
    {
      path: '/sys/menus',
      name: 'sys:menu:list',
      component: () => import('@/views/menuList'),
      meta: {
        title: '菜单管理',
        icon: 'bars-outlined'
      }
    }]
}
