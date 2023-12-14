<template lang="pug">
.relative.z-10(ref="container")
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import i18n from '@/lang'
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import { map, merge, isEmpty, debounce } from 'lodash'

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

// 图表容器
const container = ref(null)

// echarts图表对象
let chart = null

// 基础Options
const initOption = {
  // Make gradient line here
  visualMap: [
    {
      show: false,
      type: 'continuous',
      seriesIndex: 0,
      min: -5,
      max: 35,
      color: ['#ff2e2e', '#485ff0'],
    },
  ],
  tooltip: {
    trigger: 'axis',
    valueFormatter: (value) => `${value} °C`,
  },
  legend: {
    left: '0%',
    top: '1%',
  },
  grid: {
    left: '3%',
    right: '4%',
    top: 80,
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} °C',
    },
  },
  series: [],
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
            text: i18n.t('noData'),
            fontSize: '14px',
          },
        },
      }
      chart.setOption(option, true)
    }
    else {
      const mappedData = {
        xAxis: {
          type: 'category',
          data: map(props.data, (d) => dayjs(d.createdAt).format('HH:mm')),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: map(props.data, (d) => d.value),
            type: 'line',
          },
        ],
      }

      option = merge({}, initOption, mappedData, { graphic: { invisible: true } })

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
