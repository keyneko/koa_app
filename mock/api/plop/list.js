// plop/list.js
const Mock = require('mockjs')

module.exports = (req, res) => {
  const total = 16
  const { pageNum, pageSize = 10 } = req.query

  if (pageNum == undefined) {
    return res.json({
      "code": 500,
      "message": "参数错误"
    })
  }

  if (pageNum * pageSize <= total) {
    return res.json(Mock.mock({
      "code": 200,
      "total": total,
      [`rows|${pageSize}`]: [{
        "title": "@cname",
        "describe": "@ctitle",
        "img": "@image(128x128)"
      }]
    }))
  } else {
    return res.json(Mock.mock({
      "code": 200,
      "total": total,
      [`rows|${total % pageSize}`]: [{
        "title": "@cname",
        "describe": "@ctitle",
        "img": "@image(128x128)"
      }]
    }))
  } // end of if
}
