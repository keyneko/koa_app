function register(name, handler) {
  console.log('注册方法', name)
  window[name] = handler
}

function unregister(name) {
  console.log('注销方法', name)
  delete window[name]
}

export default {
  register,
  unregister,
}
