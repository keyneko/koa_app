const { notEmpty } = require('../utils.js')

module.exports = {
  description: '新建杂项',
  prompts: async (inquirer) => {
    const answers = {}

    const { miscName } = await inquirer.prompt({
      type: 'list',
      name: 'miscName',
      message: '选择杂项',
      choices: [{
          name: '字典查询（dictionary）',
          value: 'dicts',
        }, {
          name: '产线查询（proline）',
          value: 'proline',
        }, {
          name: '报错日志（errorLogs）',
          value: 'logs',
        }, {
          name: '特性检测（modernizr）',
          value: 'modernizr',
        },
      ],
    })

    const { hasRoute } = await inquirer.prompt({
      type: 'confirm',
      name: 'hasRoute',
      message: '是否插入路由',
      default: false,
    })

    const { hasEntrance } = await inquirer.prompt({
      type: 'confirm',
      name: 'hasEntrance',
      message: '是否添加入口',
      default: false,
    })

    answers.moduleName = 'misc'
    answers.miscName = miscName
    answers.name = miscName
    answers.hasRoute = hasRoute
    answers.hasEntrance = hasEntrance

    return Promise.resolve(answers)
  },
  actions: (data) => {
    const actions = []

    actions.push({
      type: 'add',
      path: `src/views/{{dashCase moduleName}}/{{dashCase name}}.vue`,
      templateFile: 'plop-templates/misc/{{miscName}}/index.hbs',
      data: {},
    })

    // 是否插入路由
    if (data.hasRoute) {
      actions.push({
        type: 'modify',
        path: 'src/router/index.js',
        pattern: /(export const constantRoutes = \[)([\s\S]*)(\n\] \/\/ end of constantRoutes)/g,
        template: `$1$2
  // {{upperCamelCase moduleName name}}
  {
    path: '/{{dashCase moduleName}}/{{dashCase name}}',
    name: '{{upperCamelCase moduleName name}}',
    component: () => import('@/views/misc/{{dashCase name}}'),
  },$3
        `,
      })
    }

    // 是否添加页面入口
    if (data.hasEntrance) {
      actions.push({
        type: 'modify',
        path: 'src/views/dashboard/fragments/testItems.pug',
        pattern: /^([\s\S]*)$/g,
        template: `$1
//- {{upperCamelCase moduleName name}}
van-grid-item(
  key="{{upperCamelCase moduleName name}}"
  :to="{ path: '/{{dashCase moduleName}}/{{dashCase name}}' }")
  template(#icon)
    svg-icon(name='tools')
  template(#text)
    .label.van-ellipsis {{pascalCase name}}
        `,
      })
    }

    return actions
  },
}
