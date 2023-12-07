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
   * 条码查询
   */
  {
    path: '/barcode/query',
    name: 'BarcodeQuery',
    component: () => import('@/views/barcode/query'),
  },
  /**
   * 条码列表
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
    path: '/barcode/generate',
    name: 'BarcodeGenerate',
    component: () => import('@/views/barcode/generate'),
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
