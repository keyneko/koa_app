<template lang="pug">
.page
  .page__header
    van-nav-bar(
      title="DHT11"
      left-arrow
      @click-left="$router.back()")
      template(#right)
        van-button.px-2(
          size='mini'
          type='info'
          icon-position='right'
          @click="onCreate"
          ) {{ $t('sensor.create') }}

  .page__body
    .mb-4.mx-5
      van-tag.mr-3(
        v-for="d in list"
        :key="d._id"
        :type="d._id === queryParams.sensorId?'primary':'default'"
        size="medium"
        @click="onTagClicked(d)"
        closeable
        @close="onDelete(d)") {{ d.name }}

    Chart.mx-4(:data="ds" :height="400")

  DialogCreate(v-model="showDialogCreate" @created="getSensors")
</template>

<script setup>
import { ref, reactive, computed, onBeforeUnmount } from 'vue'
import { Toast, Dialog } from 'vant'
import { useRouter, useRoute } from '@/router'
import i18n from '@/lang'
import Chart from './components/dht11.vue'
import * as API from '@/api/sensor'
import { without } from 'lodash'
import DialogCreate from './components/DialogCreate'

const router = useRouter()
const route = useRoute()

const buttonLoading = ref(false)
const showDialogCreate = ref(false)

const list = ref([])
const ds = ref([])

const queryParams = reactive({
  sensorId: '',
})

function getSensors() {
  Toast.loading()
  return API.getSensors({})
    .then((res) => {
      list.value = res.data
    })
    .finally(() => {
      Toast.clear()
    })
}

function onTagClicked(d) {
  queryParams.sensorId = d._id
  Toast.loading()
  return API.sensorRecords(queryParams)
    .then((res) => {
      ds.value = res.data || []
    })
    .finally(() => {
      Toast.clear()
    })
}

function onDelete(d) {
  Dialog.confirm({
    title: i18n.t('sensor.deleteCfm'),
    message: i18n.t('sensor.deleteCfmMsg'),
  })
    .then(() => {
      Toast.loading()
      return API.deleteSensor({ id: d._id }).then((res) => {
        Toast.success(i18n.t('deleted'))
        list.value = without(list.value, d)
      })
    })
    .catch(() => {})
}

function onCreate() {
  showDialogCreate.value = true
}

getSensors()
</script>
