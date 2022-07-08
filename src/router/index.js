import { createRouter, createWebHashHistory } from 'vue-router'
import HomeLayout from '@/layout/index'
import dictList from '@/router/modules/dictList'
import menuList from '@/router/modules/menuList'
import roleList from '@/router/modules/roleList'
import userList from '@/router/modules/userList'

export const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    name: 'Home',
    component: HomeLayout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        meta: {
          title: '首页',
          icon: 'home-outlined'
        },
        component: () => import('@/views/index/index')
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error-page/404')
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error-page/401')
      }
    ]
  }

]
export const privateRoute = [dictList, menuList, roleList, userList]
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router

/* {
  path: '/sys',
    name: 'sys:manage',
  redirect: '/users',
  component: HomeLayout,
  meta: {
  title: '系统管理',
    icon: 'like-outlined'
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
    },
    {
      path: '/sys/roles',
      name: 'sys:role:list',
      component: () => import('@/views/roleList/index'),
      meta: {
        title: '角色管理',
        icon: 'appstore-outlined'
      }
    },
    {
      path: '/sys/menus',
      name: 'sys:menu:list',
      component: () => import('@/views/menuList'),
      meta: {
        title: '菜单管理',
        icon: 'bars-outlined'
      }
    }
  ]
},
{
  path: '/system',
    name: 'sys:tools',
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
} */
