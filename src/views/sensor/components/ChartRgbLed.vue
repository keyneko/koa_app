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

const colorConvert = (value) => {
  const red = parseInt(value.substring(0, 3), 10)
  const green = parseInt(value.substring(3, 6), 10)
  const blue = parseInt(value.substring(6, 9), 10)
  return `rgba(${red}, ${green}, ${blue}, 1)`
}

// chart container
const container = ref(null)

let chart = null

// Basic Options
const initOption = {
  title: {
    text: title,
    textStyle: {
      fontSize: 14,
      fontWeight: 'normal',
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
    },
    formatter: function(params) {
      return `
        <div>${params[0].marker} ${dayjs(params[0].data[0]).format(
  'YYYY-MM-DD HH:mm:ss'
)}</div>
        <div class="text-right b">${colorConvert(params[0].data[1])}</div>
      `
    },
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
    left: 15,
    right: 15,
    top: 80,
    bottom: 0,
    containLabel: true,
  },
  dataZoom: [
    { id: 'dataZoomX', type: 'slider', xAxisIndex: [0], filterMode: 'none' },
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
      type: 'category',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
      },
      axisLabel: {
        show: false,
        formatter: (value) => {
          return colorConvert(value)
        },
      },
    },
  ],
  series: [
    {
      type: 'scatter',
      symbolSize: 20,
      itemStyle: {
        color: function(params) {
          return colorConvert(params.data[1])
        },
        borderColor: '#666',
      },
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
          {
            data: map(props.data, (d) => [
              +new Date(d.createdAt),
              d.status.substring(0, 9),
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
