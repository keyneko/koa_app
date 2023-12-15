import store from '@/store'

function toRegExp(permission) {
  // Replace wildcard '*' with a regex pattern '.*' for any characters
  const regExpPattern = permission.replace(/\*/g, '.*')

  // Create a regular expression with the '^' to match from the beginning
  const regExp = new RegExp(`^${regExpPattern}$`)

  return regExp
}

function checkPermission(el, binding) {
  const { value } = binding
  const all_permission = '*:*:*'
  const permissions = store.getters && store.getters.permissions

  if (value && value instanceof Array && value.length > 0) {
    const hasPermissions = permissions.some((permission) => {
      const regExp = toRegExp(permission)
      return value.some((v) => regExp.test(v))
    })

    if (!hasPermissions) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
  else {
    throw new Error(`need permissions! Like v-permission="['*:*:*']"`)
  }
}

export default {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  },
}
