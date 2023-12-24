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
  const permissions = store.state.user.permissions
  const denyPermissions = store.state.user.denyPermissions

  if (value && value instanceof Array && value.length > 0) {
    const hasDenyPermission = denyPermissions.some((permission) => {
      const regExp = toRegExp(permission)
      return value.some((v) => regExp.test(v))
    })

    if (!hasDenyPermission) {
      const hasPermission = permissions.some((permission) => {
        const regExp = toRegExp(permission)
        return value.some((v) => regExp.test(v))
      })

      if (hasPermission) {
        return
      }
    }

    el.parentNode && el.parentNode.removeChild(el)
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
