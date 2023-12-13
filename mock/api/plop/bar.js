// plop/bar.js
const Mock = require('mockjs')

module.exports = (req, res) => {
  return res.json(Mock.mock({
    "code": 200,
    "data": {
      "xAxis": [{
        "data": ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      }],
      "series": [{
        "name": '@word(6)',
        "data|7": ["@integer(1, 400)"]
      }]
    }
  }))
}
