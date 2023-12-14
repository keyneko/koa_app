<template lang="pug">
.page
  .page__header
    van-nav-bar(
      :title="$t('routes.sensors')"
      left-arrow
      @click-left="$router.back()")
      template(#right)
        van-button.px-2(
          size='mini'
          type='info'
          icon-position='right'
          @click="showActions = true"
          ) {{ $t('actions') }}

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

  van-action-sheet(v-model="showActions" close-on-click-action :actions="actions" @select="onAction")
  DialogCreate(v-model="showDialogCreate" @created="getSensors")
  DialogUpdate(v-model="showDialogUpdate" :data="selSensor" @updated="getSensors")
  DialogFilter(v-model="showDialogFilter" @confirm="getSensors")
</template>

<script setup>
import { ref, reactive, computed, watchEffect, onBeforeUnmount } from 'vue'
import { Toast, Dialog } from 'vant'
import { useRouter, useRoute } from '@/router'
import i18n from '@/lang'
import Chart from './components/ChartTemp'
import * as API from '@/api/sensor'
import { find, without } from 'lodash'
import DialogCreate from './components/DialogCreate'
import DialogUpdate from './components/DialogUpdate'
import DialogFilter from './components/DialogFilter'

const router = useRouter()
const route = useRoute()

const buttonLoading = ref(false)
const showActions = ref(false)
const showDialogCreate = ref(false)
const showDialogUpdate = ref(false)
const showDialogFilter = ref(false)

const list = ref([])
const ds = ref([])

const queryParams = reactive({
  sensorId: '',
})

const selSensor = computed(() => find(list.value, (d) => d._id == queryParams.sensorId) || {})

const actions = ref([])

watchEffect(() => {
  actions.value = [
    { id: 'create', name: i18n.t('create') },
    { id: 'update', name: i18n.t('update'), disabled: !queryParams.sensorId },
    { id: 'filter', name: i18n.t('filter') },
  ]
})

function getSensors(filters = {}) {
  Toast.loading()
  return API.getSensors(filters)
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
    title: i18n.t('sensors.deleteCfm'),
    message: i18n.t('sensors.deleteCfmMsg'),
  })
    .then(() => {
      Toast.loading()
      return API.deleteSensor({ _id: d._id }).then((res) => {
        Toast.success(i18n.t('deleted'))
        list.value = without(list.value, d)
      })
    })
    .catch(() => {})
}

function onAction({ id }) {
  if (id == 'create') {
    showDialogCreate.value = true
  }
  else if (id == 'update') {
    showDialogUpdate.value = true
  }
  else if (id == 'filter') {
    showDialogFilter.value = true
  }
}

getSensors()
</script>
