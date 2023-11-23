import { map, filter } from 'lodash'

const getters = {
  language: state => state.app.language,
  token: state => state.user.token,
  user: state => state.user.user,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  nickName: state => state.user.nickName,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  factory: state => state.user.factory,
  sops: state => state.user.sops,
  ossConfig: state => state.gp.ossConfig,
  errorLogs: state => state.errorLog.logs,
  cached: state => map(filter(state.route.stack, { cache: true }), d => d.name)
}

export default getters
