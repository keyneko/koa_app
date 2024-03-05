<template lang="pug">
.page
  .page__header
    van-nav-bar(
      :title="$t('routes.sensorChart')"
      left-arrow
      @click-left="$router.back()")
      template(#right)
        van-button.px-2(
          size='mini'
          type='info'
          icon-position='right'
          @click="showDatePicker = true"
          ) {{ $t('sensors.selectDate') }}

  .page__body
    Chart.mx-4(v-if="type == 0" :data="ds" :height="400")
    ChartRgbLed.mx-4(v-if="type == 1" :data="ds" :height="400")

  van-calendar(
    v-model="showDatePicker"
    :min-date='datepicker.minDate'
    :max-date='datepicker.maxDate'
    :current-date='new Date(queryParams.dateTime)'
    :show-confirm="false"
    @confirm="onDatePicked")
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { Toast } from 'vant'
import { useRouter, useRoute } from '@/router'
import i18n from '@/lang'
import Chart from './components/ChartTemp'
import ChartRgbLed from './components/ChartRgbLed'
import * as API from '@/api/sensor'
import dayjs from 'dayjs'
import { socket } from '@/utils/socket'

const router = useRouter()
const route = useRoute()
const { id, type, name } = route.query

const buttonLoading = ref(false)
const showDatePicker = ref(false)

const ds = ref([])

const queryParams = reactive({
  sensorId: id,
  dateTime: undefined,
})

const now = new Date()
const threeYearsAgo = new Date(now)
threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3)

const datepicker = {
  minDate: threeYearsAgo,
  maxDate: now,
}

function getRecords() {
  Toast.loading()
  return API.sensorRecords(queryParams)
    .then((res) => {
      ds.value = res.data || []
    })
    .finally(() => {
      Toast.clear()
    })
}

function onDatePicked(date) {
  showDatePicker.value = false
  queryParams.dateTime = dayjs(date).format('YYYY-MM-DD')
  getRecords()
}

try {
  socket.on('newSensorDataArrived', () => {
    console.log('new sensor data arrived')
    getRecords()
  })
}
catch (e) {
  console.error(e)
}

getRecords()
</script>
