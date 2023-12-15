<template lang="pug">
.page--fixed
  .page__header
    van-nav-bar(
      :title="$t('routes.barcodes')"
      left-arrow
      @click-left="$router.back()")

  .page__body
    .mb-4.mx-5
      div {{ $t('g.status') }}
      van-tag.mr-3(
        v-for="d in options('barcode_status')"
        :key="d._id"
        :type="d.value === queryParams.status?'primary':'default'"
        :mark="true"
        size="medium"
        @click="onTagClicked(d)") {{ d.name }}

    BarcodeList(
      ref="listRef"
      :list="list"
      :total="total"
      @fetch="getBarcodes"
      @delete="onDelete"
      @update="onUpdate"
      @detail="onDetail")

  DialogResult(v-model="showDialogResult" :data="barcode")
  DialogUpdate(v-model="showDialogUpdate" :data="barcode" @updated="reflashList")
</template>

<script setup>
import { ref, reactive, computed, onBeforeUnmount } from 'vue'
import { Toast, Dialog } from 'vant'
import { useRouter, useRoute } from '@/router'
import * as API from '@/api/barcode'
import i18n from '@/lang'
import useDicts from '@/utils/useDicts'
import { concat, without, range } from 'lodash'

import BarcodeList from './components/BarcodeList'
import DialogResult from './components/DialogResult'
import DialogUpdate from './components/DialogUpdate'

const router = useRouter()
const route = useRoute()
const { options } = useDicts()

const buttonLoading = ref(false)
const showDialogResult = ref(false)
const showDialogUpdate = ref(false)

const listRef = ref(null)
const list = ref([])
const total = ref(0)
const pageSize = 10

const barcode = ref({})
const queryParams = reactive({
  status: '',
})

function getBarcodes(pageNum = 1) {
  Toast.loading()
  return API.getBarcodes({ ...queryParams, pageNum, pageSize })
    .then((res) => {
      total.value = Math.ceil(res.total / pageSize)

      if (pageNum == 1) {
        list.value = res.data || []
      }
      else {
        list.value = concat(list.value, res.data)
      }
    })
    .finally(() => {
      Toast.clear()
    })
}

function onDelete(d) {
  Dialog.confirm({
    title: i18n.t('barcodes.deleteCfm'),
    message: i18n.t('barcodes.deleteCfmMsg'),
  })
    .then(() => {
      Toast.loading()
      return API.deleteBarcode({ value: d.value }).then((res) => {
        Toast.success(i18n.t('g.deleted'))
        list.value = without(list.value, d)
      })
    })
    .catch(() => {})
}

function onUpdate({ value }) {
  Toast.loading()
  return API.getBarcode({ value })
    .then((res) => {
      barcode.value = res.data
      showDialogUpdate.value = true
    })
    .finally(() => {
      Toast.clear()
    })
}

function onDetail({ value }) {
  Toast.loading()
  return API.getBarcode({ value })
    .then((res) => {
      barcode.value = res.data
      showDialogResult.value = true
    })
    .finally(() => {
      Toast.clear()
    })
}

function onTagClicked({ value }) {
  if (queryParams.status === value) {
    queryParams.status = ''
  }
  else {
    queryParams.status = value
  }
  listRef.value.onRefresh()
}

async function reflashList() {
  const { pageNum } = listRef.value
  let newList = []
  let newTotal

  for (const i of range(pageNum)) {
    const res = await API.getBarcodes({ ...queryParams, pageNum: i + 1, pageSize })
    newList = concat(newList, res.data)
    newTotal = res.total
  }
  list.value = newList
  total.value = newTotal
}

getBarcodes()
</script>
