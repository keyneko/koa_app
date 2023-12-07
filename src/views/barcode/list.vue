<template lang="pug">
.page--fixed
  .page__header
    van-nav-bar(
      title="条码列表"
      left-arrow
      @click-left="$router.back()")

  .page__body
    .m-4
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
      } else {
        list.value = concat(list.value, res.data)
      }
    })
    .finally(() => {
      Toast.clear()
    })
}

function onDelete(d) {
  Dialog.confirm({
    title: '提示',
    message: '确认<b class=red>删除</b>该条码吗？',
  })
    .then(() => {
      Toast.loading()
      return API.deleteBarcode({ value: d.value }).then((res) => {
        Toast.success('删除成功')
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

function onTagClicked(d) {
  queryParams.status = d.value
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
