<template lang="pug">
.page--fixed-header
  .page__header
    van-nav-bar(
      :title="$t('routes.sensors')"
      left-arrow
      @click-left="$router.back()")
      template(#right)
        van-button.px-2(
          v-perm="['sensors:management:create']"
          size='mini'
          type='info'
          icon-position='right'
          @click="showDialogCreate = true"
          ) {{ $t('g.create') }}
        van-button.px-2(
          size='mini'
          type='info'
          icon-position='right'
          @click="showDialogFilter = true"
          ) {{ $t('g.filter') }}

  .page__body
    van-empty(v-if='list.length == 0' :description="$t('g.noData')")
    template(v-else)
      van-cell-group(inset)
        van-collapse(v-model='activeName' accordion)
          van-collapse-item(v-for="d in list" :key="d._id" :name='d._id')
            template(#title)
              b(v-copy.silent) {{ d.name }}
            template
              table.table.mb-4
                tr(v-if="d._id")
                  th _id
                  td(v-copy) {{ d._id }}
                tr(v-if="d.apiKey")
                  th apiKey
                  td(v-copy) {{ d.apiKey }}
                tr
                  th(width=100) {{ $t('sensors.type') }}
                  td {{ lut("sensor_type", d.type) }}
                tr
                  th {{ $t('sensors.number') }}
                  td {{ d.number || '-' }}
                tr
                  th {{ $t('sensors.manufacturer') }}
                  td {{ d.manufacturer || '-' }}
                tr
                  th {{ $t('g.status') }}
                  td {{ lut('status', d.status) }}
                tr
                  th {{ $t('sensors.isOnline') }}
                  td
                    span(:class="d.isOnline? 'green b': ''") {{ lut('online', d.isOnline) }}
                tr
                  th {{ $t('g.protected') }}
                  td {{ lut('yes_or_no', d.isProtected) }}

              .flex.justify-between
                van-button.ml-2(
                  v-perm="['sensors:management:publish']"
                  size="small"
                  type="primary"
                  @click="onPublish(d)"
                  ) {{ $t('sensors.publish') }}
                div
                  van-button.ml-2(
                    size="small"
                    type="general"
                    :to="toChart(d)"
                    ) {{ $t('g.view') }}
                  van-button.ml-2(
                    v-perm="['sensors:management:update']"
                    size="small"
                    type="general"
                    @click="onUpdate(d)"
                    ) {{ $t('g.update') }}
                  van-button.ml-2(
                    v-perm="['sensors:management:delete']"
                    size="small"
                    type="danger"
                    @click="onDelete(d)"
                    ) {{ $t('g.delete') }}

  DialogCreate(v-model="showDialogCreate" @created="getSensors")
  DialogUpdate(v-model="showDialogUpdate" :data="sensor" @updated="getSensors")
  DialogFilter(v-model="showDialogFilter" @confirm="getSensors")
  DialogPublish(v-model="showDialogPublish" :data="sensor")
</template>

<script>
export default {
  name: "Sensors",
}
</script>
<script setup>
import { ref, computed, nextTick } from 'vue'
import { Toast, Dialog } from 'vant'
import { useRouter, useRoute } from '@/router'
import useDicts from '@/utils/useDicts'
import useScrollPage from '@/utils/useScrollPage'
import i18n from '@/lang'
import * as API from '@/api/sensor'
import { map, find, without } from 'lodash'
import dayjs from 'dayjs'
import DialogCreate from './components/DialogCreate'
import DialogUpdate from './components/DialogUpdate'
import DialogFilter from './components/DialogFilter'
import DialogPublish from './components/DialogPublish'

const router = useRouter()
const route = useRoute()
const { lut, options } = useDicts()
useScrollPage()

const buttonLoading = ref(false)
const showDialogCreate = ref(false)
const showDialogUpdate = ref(false)
const showDialogFilter = ref(false)
const showDialogPublish = ref(false)

const list = ref([])
const sensor = ref({})
const activeName = ref('')

const toChart = computed(() => (d) => ({
  path: '/sensor/chart',
  query: {
    _id: d._id,
    name: d.name,
  },
}))

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

function onDelete(d) {
  Dialog.confirm({
    title: i18n.t('sensors.deleteCfm'),
    message: i18n.t('sensors.deleteCfmMsg'),
  })
    .then(() => {
      Toast.loading()
      return API.deleteSensor({ _id: d._id }).then((res) => {
        Toast.success(i18n.t('g.deleted'))
        list.value = without(list.value, d)
      })
    })
    .catch(() => {})
}

function onUpdate(d) {
  sensor.value = {}
  nextTick(() => {
    sensor.value = d
  })
  showDialogUpdate.value = true
}

function onPublish(d) {
  sensor.value = {}
  nextTick(() => {
    sensor.value = d
  })
  showDialogPublish.value = true
}

getSensors()
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  @apply border-collapse border border-gray-300;
  th,
  td {
    @apply border border-gray-200;
    @apply px-2 py-1 text-left leading-none break-all;
  }
}
</style>
