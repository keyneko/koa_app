// plop/pie.js
const Mock = require('mockjs')

const { domains } = Mock.mock({
  "domains|6": [
    "@domain"
  ]
})

module.exports = (req, res) => {
  return res.json(Mock.mock({
    "code": 200,
    "data": {
      "series": [
        {
          "name": "@word(6)",
          "data|6": [
            { "value|50-1200": 100, "name|+1": domains }
          ]
        },
      ],
    }
  }))
}
