const { notEmpty } = require('../utils.js')

module.exports = {
  description: '新建页面',
  prompts: async (inquirer) => {
    const answers = {}

    const { templateName } = await inquirer.prompt({
      type: 'list',
      name: 'templateName',
      message: '选择页面模板',
      choices: [{
          name: '布局页面（layout）',
          value: 'layout',
        },
        {
          name: '扫码页面（scan）',
          value: 'scan',
        },
        {
          name: '标签页页面（tabs）',
          value: 'tabs',
        },
      ],
    })

    const { moduleName } = await inquirer.prompt({
      type: 'input',
      name: 'moduleName',
      message: '输入模块名称',
      validate: notEmpty('moduleName')
    })

    const { name } = await inquirer.prompt({
      type: 'input',
      name: 'name',
      message: '输入页面名称',
      validate: notEmpty('name')
    })

    // 布局页面
    if (templateName === 'layout') {
      const { layout } = await inquirer.prompt({
        type: 'checkbox',
        name: 'layout',
        message: '选择页面布局',
        choices: [{
            name: '固定页头',
            value: 'fixed-header',
            checked: true,
          },
          {
            name: '固定页脚',
            value: 'fixed-footer',
            checked: true,
          },
        ],
      })

      answers.layout = layout
    }
    // 标签页面
    else if (templateName === 'tabs') {
      const { hasSubTabs } = await inquirer.prompt({
        type: 'confirm',
        name: 'hasSubTabs',
        message: '是否启用子标签页',
        default: false,
      })

      answers.hasSubTabs = hasSubTabs
    }

    const { hasCache } = await inquirer.prompt({
      type: 'confirm',
      name: 'hasCache',
      message: '是否缓存页面',
      default: false,
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

    answers.templateName = templateName
    answers.moduleName = moduleName
    answers.name = name
    answers.hasCache = hasCache
    answers.hasRoute = hasRoute
    answers.hasEntrance = hasEntrance

    return Promise.resolve(answers)
  },
  actions: (data) => {
    const actions = []

    // 布局页面
    if (data.templateName === 'layout') {
      const fixed =
        data.layout.includes('fixed-header') && data.layout.includes('fixed-footer') ?
        'fixed' :
        data.layout.includes('fixed-header') ?
        'fixed-header' :
        data.layout.includes('fixed-footer') ?
        'fixed-footer' :
        ''

      actions.push({
        type: 'add',
        path: `src/views/{{dashCase moduleName}}/{{dashCase name}}.vue`,
        templateFile: 'plop-templates/view/layout/index.hbs',
        data: {
          fixed: fixed,
        },
      })
    }
    // 扫码页面
    else if (data.templateName === 'scan') {
      actions.push({
        type: 'add',
        path: `src/views/{{dashCase moduleName}}/{{dashCase name}}.vue`,
        templateFile: 'plop-templates/view/scan/index.hbs',
        data: {},
      })
    }
    // 标签页面
    else if (data.templateName === 'tabs') {
      actions.push({
        type: 'add',
        path: `src/views/{{dashCase moduleName}}/{{dashCase name}}.vue`,
        templateFile: 'plop-templates/view/tabs/index.hbs',
        data: {},
      })
    }

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
    component: () => import('@/views/{{dashCase moduleName}}/{{dashCase name}}'),${data.hasCache ? `
    meta: { cache: true }` : ''}
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
    svg-icon(name='application-cog-outline')
  template(#text)
    .label.van-ellipsis {{pascalCase name}}
        `,
      })
    }

    return actions
  },
}
