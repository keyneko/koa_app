<template lang="pug">
.relative.z-10(ref="container")
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from '@/router'
import i18n from '@/lang'
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import { map, merge, isEmpty, debounce } from 'lodash'

const route = useRoute()
const { name: title } = route.query

const props = defineProps({
  width: {
    type: Number,
  },
  height: {
    type: Number,
    default: 320,
  },
  data: {
    type: Array,
    default: () => [],
  },
})

// chart container
const container = ref(null)

let chart = null

// Basic Options
const initOption = {
  // Make gradient line here
  visualMap: [
    {
      show: false,
      type: 'continuous',
      seriesIndex: 0,
      min: 0,
      max: 40,
      color: ['#ff2e2e', '#485ff0'],
    },
  ],
  title: {
    text: title,
    textStyle: {
      fontSize: 14,
      fontWeight: 'normal',
    },
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    right: 0,
    top: 36,
  },
  toolbox: {
    show: true,
    feature: {
      dataZoom: {
        yAxisIndex: 'none',
        title: {
          zoom: i18n.t('sensors.dataZoom'),
          back: i18n.t('sensors.dataZoomBack'),
        },
      },
      saveAsImage: {
        title: i18n.t('sensors.saveAsImage'),
      },
    },
  },
  grid: {
    left: 0,
    right: 15,
    top: 80,
    bottom: 0,
    containLabel: true,
  },
  dataZoom: [
    {
      id: 'dataZoomX',
      type: 'slider',
      xAxisIndex: [0],
      filterMode: 'none',
    },
  ],
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      show: true,
    },
  },
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        formatter: '{value}°C',
      },
    },
    {
      type: 'value',
      axisLabel: {
        formatter: '{value}%rh',
      },
    },
  ],
  series: [
    // 温度
    {
      name: i18n.t('sensors.temperature'),
      type: 'line',
      showSymbol: false,
      lineStyle: {
        color: '#a4348a',
      },
      itemStyle: {
        color: '#a4348a',
      },
      tooltip: {
        valueFormatter: (value) => value + '°C',
      },
      z: 9,
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' },
        ],
      },
      // markLine: {
      //   data: [{ type: 'average', name: 'Average' }],
      //   label: {
      //     position: 'insideMiddleBottom',
      //   },
      // },
    },

    // 湿度
    {
      name: i18n.t('sensors.humidity'),
      type: 'line',
      yAxisIndex: 1,
      showSymbol: false,
      lineStyle: {
        color: '#81c462',
      },
      itemStyle: {
        color: '#81c462',
      },
      tooltip: {
        valueFormatter: (value) => value + '%rh',
      },
      // markPoint: {
      //   data: [
      //     { type: 'max', name: 'Max' },
      //     { type: 'min', name: 'Min' },
      //   ],
      // },
      // markLine: {
      //   data: [{ type: 'average', name: 'Average' }],
      //   label: {
      //     position: 'insideMiddleBottom',
      //   },
      // },
    },
  ],
}

function draw(container) {
  if (props.width) {
    container.style.width = props.width + 'px'
  }
  container.style.height = props.height + 'px'

  setTimeout(() => {
    chart = echarts.init(container)
    let option = {}

    if (isEmpty(props.data)) {
      option = {
        graphic: {
          type: 'text',
          left: 'center',
          top: '50%',
          zlevel: 9999,
          silent: true,
          invisible: false,
          style: {
            fill: '#aaa',
            text: i18n.t('g.noData'),
            fontSize: '14px',
          },
        },
      }
      chart.setOption(option, true)
    }
    else {
      const mappedData = {
        xAxis: {
          type: 'time',
          scale: true,
          axisLabel: {
            rotate: 45,
            interval: 0,
            formatter: '{HH}:{mm}',
          },
        },
        series: [
          // 温度
          {
            data: map(props.data, (d) => [
              +new Date(d.createdAt),
              d.status.temperature || d.value,
            ]),
          },

          // 湿度
          {
            data: map(props.data, (d) => [
              +new Date(d.createdAt),
              d.status.humidity || 0,
            ]),
          },
        ],
      }

      option = merge({}, initOption, mappedData, {
        graphic: { invisible: true },
      })

      chart.setOption(option /*, true*/)
    }
  }, 0)
}

watch(
  () => props.data,
  (value) => {
    draw(container.value)
  }
)

const onResize = debounce(() => {
  chart && chart.resize()
}, 100)

onMounted(() => {
  draw(container.value)
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})
</script>
