// plop/line.js
const Mock = require('mockjs')

module.exports = (req, res) => {
  return res.json(Mock.mock({
    "code": 200,
    "data": {
      "xAxis": {
        "data": ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      "series": [
        {
          "name": 'Email',
          "type": 'line',
          "data|7": ["@integer(1, 800)"]
        },
        {
          "name": 'Union Ads',
          "type": 'line',
          "data|7": ["@integer(1, 800)"]
        },
        {
          "name": 'Video Ads',
          "type": 'line',
          "data|7": ["@integer(1, 800)"]          },
        {
          "name": 'Direct',
          "type": 'line',
          "data|7": ["@integer(1, 800)"]
        },
        {
          "name": 'Search Engine',
          "type": 'line',
          "data|7": ["@integer(1, 800)"]
        }
      ]
    }
  }))
}
