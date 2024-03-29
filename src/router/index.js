import Vue from 'vue'
import ArchiveRouter from '@/utils/ArchiveRouter'

Vue.use(ArchiveRouter)

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index'),
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true,
  },
  {
    path: '/',
    redirect: '/dashboard',
  },

  /**
   * 登录
   */
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index'),
  },

  /**
   * 注册
   */
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/login/register'),
  },

  /**
   * Dashboard
   */
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: { cache: true },
  },

  /**
   * 设置
   */
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/settings/index'),
  },

  /**
   * 权限词条
   */
  {
    path: '/permissions',
    name: 'Permissions',
    component: () => import('@/views/permissions/index'),
  },

  /**
   * 字典词条
   */
  {
    path: '/dictionaries',
    name: 'Dictionaries',
    component: () => import('@/views/dictionary/index'),
  },

  /**
   * 角色管理
   */
  {
    path: '/roles',
    name: 'Roles',
    component: () => import('@/views/roles/index'),
  },

  /**
   * 用户管理
   */
  {
    path: '/users',
    name: 'Users',
    component: () => import('@/views/users/index'),
  },

  /**
   * 条码查询
   */
  {
    path: '/barcode/query',
    name: 'BarcodeQuery',
    component: () => import('@/views/barcode/query'),
  },
  /**
   * 条码管理
   */
  {
    path: '/barcode/list',
    name: 'BarcodeList',
    component: () => import('@/views/barcode/list'),
  },
  /**
   * 条码生成
   */
  {
    path: '/barcode/create',
    name: 'BarcodeCreate',
    component: () => import('@/views/barcode/create'),
  },

  /**
   * 库位码查询
   */
  {
    path: '/position/query',
    name: 'PositionQuery',
    component: () => import('@/views/position/query'),
  },
  /**
   * 库位码管理
   */
  {
    path: '/position/list',
    name: 'PositionList',
    component: () => import('@/views/position/list'),
  },
  /**
   * 库位码生成
   */
  {
    path: '/position/create',
    name: 'PositionCreate',
    component: () => import('@/views/position/create'),
  },

  /**
   * 传感器
   */
  {
    path: '/sensor/index',
    name: 'Sensors',
    component: () => import('@/views/sensor/index'),
    meta: { cache: true },
  },

  /**
   * 传感器图表
   */
  {
    path: '/sensor/chart',
    name: 'SensorChart',
    component: () => import('@/views/sensor/chart'),
  },

] // end of constantRoutes


/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
]

const createRouter = () =>
  new ArchiveRouter({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export function useRouter() {
  return router
}

export function useRoute() {
  return router.currentRoute
}

export default router
