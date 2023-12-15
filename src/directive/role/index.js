import store from '@/store'

function checkRole(el, binding) {
  const { value, modifiers } = binding
  const { exclude } = modifiers
  const roles = store.getters && store.getters.roles

  if (value && value instanceof Array && value.length > 0) {
    const hasPermission = roles.some((role) => {
      return value.includes(role)
    })

    if ((hasPermission && exclude) || (!exclude && !hasPermission)) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
  else {
    throw new Error(`need roles! Like v-role="['admin','editor']"`)
  }
}

export default {
  inserted(el, binding) {
    checkRole(el, binding)
  },
  update(el, binding) {
    checkRole(el, binding)
  },
}
