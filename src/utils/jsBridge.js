function register(name, handler) {
  console.log('注册方法', name)
  window[name] = handler
  setTimeout(() => {
    window[name] = handler
  }, 1000)
}

function unregister(name) {
  console.log('注销方法', name)
  delete window[name]
  setTimeout(() => {
    delete window[name]
  }, 1000)
}

export default {
  register,
  unregister,
}
