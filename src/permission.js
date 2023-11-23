// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
// import router from './router'
// import store from './store'
// import { Toast, Notify } from 'vant'
// import { getToken, removeToken } from '@/utils/auth'
// import getPageTitle from '@/utils/get-page-title'

// NProgress.configure({ showSpinner: false })

// // prettier-ignore
// const whiteList = [
//   "^/login",
//   "^/redirect",
//   "^/404",
//   "^/test/*",
// ]

// router.beforeEach(async(to, from, next) => {
//   // start progress bar
//   NProgress.start()

//   // set page title
//   document.title = getPageTitle(to.name, to.meta.title)

//   // 在白名单目录，不用校验token
//   if (!whiteList.every((d) => !new RegExp(d).test(to.path))) {
//     // in the free login whitelist, go directly
//     next()
//   }
//   else {
//     // determine whether the user has logged in
//     const hasToken = getToken()

//     if (hasToken) {
//       if (to.path === '/login') {
//         const query = to.query
//         const { redirect } = query

//         delete query.redirect

//         // if is logged in, redirect to the home page
//         next({ path: redirect || '/', query })
//         NProgress.done()
//       }
//       else {
//         // determine whether the user has obtained his permission roles through getInfo
//         const hasRoles = store.getters.roles && store.getters.roles.length > 0
//         if (hasRoles) {
//           next()
//         }
//         else {
//           try {
//             // get user info
//             // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
//             const { roles } = await store.dispatch('user/getInfo')

//             if (roles.length) {
//               // generate accessible routes map based on roles
//               const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

//               // dynamically add accessible routes
//               router.addRoutes(accessRoutes)

//               // hack method to ensure that addRoutes is complete
//               // set the replace: true, so the navigation will not leave a history record
//               next({ ...to, replace: true })
//             }
//             else {
//               removeToken()

//               next({ path: '/login', query: { ...to.query, redirect: to.path } })
//               NProgress.done()
//             }
//           }
//           catch (error) {
//             // remove token and go to login page to re-login
//             await store.dispatch('user/resetToken')

//             if (error.msg) {
//               console.error(error.msg)
//             }

//             next({ path: '/login', query: { ...to.query, redirect: to.path } })
//             NProgress.done()
//           }
//         }
//       }
//     }
//     else {
//       /* has no token*/

//       // other pages that do not have permission to access are redirected to the login page.
//       next({ path: '/login', query: { ...to.query, redirect: to.path } })
//       NProgress.done()
//     }
//   }
// })

// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })
