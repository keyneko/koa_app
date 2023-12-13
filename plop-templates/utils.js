function notEmpty(name) {
  return function(value) {
    if (!value || value.trim() === '') {
      return `${name} is required`
    }
    return true
  }
}

module.exports = { notEmpty }
