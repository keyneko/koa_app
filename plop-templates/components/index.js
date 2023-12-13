const { notEmpty } = require('../utils.js')

module.exports = {
  description: '新建组件',
  prompts: async (inquirer) => {
    const answers = {}

    const { component } = await inquirer.prompt({
      type: 'list',
      name: 'component',
      message: '选择组件',
      choices: [{
        name: '列表（List）',
        value: 'list',
      }, {
        name: '步骤（Steps）',
        value: 'steps',
      }, {
        name: '图表（Echarts）',
        value: 'echarts',
      }, {
        name: '画布（Zrender）',
        value: 'zrender',
      }, {
        name: '视频（xgplayer）',
        value: 'xgplayer',
      }, ]
    })

    // Echarts组件选择图表类型
    if (component === 'echarts') {
      const { chartType } = await inquirer.prompt({
        type: "list",
        name: "chartType",
        message: '选择图表类型',
        choices: [{
          name: '柱状图（Bar）',
          value: 'bar',
        }, {
          name: '饼图（Pie）',
          value: 'pie',
        }, {
          name: '折线图（Line）',
          value: 'line',
        }, ]
      })
      answers.chartType = chartType
    }

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

    // 不单独生成组件文件的在此列出
    if (component === 'steps') {

    }
    else {
      const { componentName } = await inquirer.prompt({
        type: 'input',
        name: 'componentName',
        message: '输入组件名称',
        validate: notEmpty('componentName')
      })
      answers.componentName = componentName
    }

    // List组件页面是否使用标签页
    if (component === 'list') {
      const { hasTabs } = await inquirer.prompt({
        type: "confirm",
        name: "hasTabs",
        message: '是否使用标签页',
        default: false
      })
      answers.hasTabs = hasTabs
    }

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

    answers.component = component
    answers.moduleName = moduleName
    answers.name = name
    answers.hasRoute = hasRoute
    answers.hasEntrance = hasEntrance

    return Promise.resolve(answers)
  },
  actions: data => {
    const actions = []

    // 列表组件
    if (data.component === 'list') {
      actions.push({
        type: 'add',
        path: `src/views/{{dashCase moduleName}}/{{dashCase name}}.vue`,
        templateFile: 'plop-templates/components/list/index.hbs',
        data: {}
      })
      actions.push({
        type: 'add',
        path: `src/views/{{dashCase moduleName}}/components/{{componentName}}.vue`,
        templateFile: 'plop-templates/components/list/list.hbs',
        data: {}
      })
    }
    // 步骤组件
    else if (data.component === 'steps') {
      actions.push({
        type: 'add',
        path: `src/views/{{dashCase moduleName}}/{{dashCase name}}.vue`,
        templateFile: 'plop-templates/components/steps/index.hbs',
        data: {}
      })
    }
    // 图表组件
    else if (data.component === 'echarts') {
      actions.push({
        type: 'add',
        path: `src/views/{{dashCase moduleName}}/{{dashCase name}}.vue`,
        templateFile: 'plop-templates/components/echarts/index.hbs',
        data: {},
      })
      // 图表类型
      if (data.chartType === 'bar') {
        actions.push({
          type: 'add',
          path: `src/views/{{dashCase moduleName}}/components/{{componentName}}.vue`,
          templateFile: 'plop-templates/components/echarts/bar.hbs',
          data: {}
        })
      }
      else if (data.chartType === 'pie') {
        actions.push({
          type: 'add',
          path: `src/views/{{dashCase moduleName}}/components/{{componentName}}.vue`,
          templateFile: 'plop-templates/components/echarts/pie.hbs',
          data: {}
        })
      }
      else if (data.chartType === 'line') {
        actions.push({
          type: 'add',
          path: `src/views/{{dashCase moduleName}}/components/{{componentName}}.vue`,
          templateFile: 'plop-templates/components/echarts/line.hbs',
          data: {}
        })
      }
    }
    // 画布组件
    else if (data.component === 'zrender') {
      actions.push({
        type: 'add',
        path: `src/views/{{dashCase moduleName}}/{{dashCase name}}.vue`,
        templateFile: 'plop-templates/components/zrender/index.hbs',
        data: {},
      })
      actions.push({
        type: 'add',
        path: `src/views/{{dashCase moduleName}}/components/{{componentName}}.vue`,
        templateFile: 'plop-templates/components/zrender/canvas.hbs',
        data: {}
      })
    }
    // 视频播放
    else if (data.component === 'xgplayer') {
      actions.push({
        type: 'add',
        path: `src/views/{{dashCase moduleName}}/{{dashCase name}}.vue`,
        templateFile: 'plop-templates/components/xgplayer/index.hbs',
        data: {},
      })
      actions.push({
        type: 'add',
        path: `src/views/{{dashCase moduleName}}/components/{{componentName}}.vue`,
        templateFile: 'plop-templates/components/xgplayer/player.hbs',
        data: {}
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
    svg-icon(name='cog')
  template(#text)
    .label.van-ellipsis {{pascalCase name}}
        `,
      })
    }

    return actions
  }
}
