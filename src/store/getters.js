import { map, filter } from 'lodash'

const getters = {
  language: state => state.app.language,
  token: state => state.user.token,
  user: state => state.user.user,
  avatar: state => state.user.avatar,
  username: state => state.user.username,
  name: state => state.user.name,
  roles: state => state.user.roles,
  sops: state => state.user.sops,
  permissions: state => state.user.permissions,
  errorLogs: state => state.errorLog.logs,
}

export default getters
