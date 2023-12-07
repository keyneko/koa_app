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
      :list="list"
      :total="total"
      @update="getBarcodes"
      @delete="onDelete"
      @detail="onDetail")

  DialogResult(v-model="showDialog" :data="barcode")
</template>

<script setup>
import { ref, reactive, computed, onBeforeUnmount } from 'vue'
import { Toast, Dialog } from 'vant'
import { useRouter, useRoute } from '@/router'
import * as API from '@/api/query'
import DialogResult from './components/DialogResult'
import BarcodeList from './components/BarcodeList'
import useDicts from '@/utils/useDicts'
import { concat, without } from 'lodash'

const router = useRouter()
const route = useRoute()
const { options } = useDicts()

const buttonLoading = ref(false)
const showDialog = ref(false)

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

function onDetail({ value }) {
  Toast.loading()
  return API.getBarcode({ value })
    .then((res) => {
      barcode.value = res.data
      showDialog.value = true
    })
    .finally(() => {
      Toast.clear()
    })
}

function onTagClicked(d) {
  queryParams.status = d.value
  getBarcodes(1)
}

getBarcodes()
</script>

<style lang="scss">
.van-dropdown-item {
  .van-overlay {
    background-color: rgba(0, 0, 0, 0.3);
  }
  .van-dropdown-item__content {
    left: 15px;
    width: calc(100% - 30px);
    box-shadow: 1px -2px 10px rgb(100 101 102 / 30%);
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
}
</style>
