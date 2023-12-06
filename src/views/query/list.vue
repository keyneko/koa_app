<template lang="pug">
.page--fixed
  .page__header
    van-nav-bar(
      title="条码列表"
      left-arrow
      @click-left="$router.back()")
  .page__body

    transition-group(
      tag="div"
      enter-active-class='fadeInRight'
      leave-active-class='fadeOutLeft')

      van-cell-group.title-basis.mb-4.animated.faster(v-for="(d, i) in list" :key="i" inset)
        van-cell(title="条码：")
          b.black {{ d.value }}
        van-cell(title="名称：")
          | {{ d.name }}
        van-cell(title="状态：")
          | {{ lut('barcode_status', d.status) }}
        van-cell(value)
          template(#extra)
            van-button.ml-2(
              size="small"
              type="danger"
              @click="onDelete(d)"
              ) 删除条码
            van-button.ml-2(
              size="small"
              type="general"
              @click="onDetail(d)"
              ) 查看详情

  DialogResult(v-model="showDialog" :data="barcode")
</template>

<script setup>
import { ref, reactive, computed, onBeforeUnmount } from 'vue'
import { Toast } from 'vant'
import { useRouter, useRoute } from '@/router'
import * as API from '@/api/query'
import DialogResult from './components/DialogResult'
import useDicts from '@/utils/useDicts'

const router = useRouter()
const route = useRoute()
const { lut } = useDicts()

const buttonLoading = ref(false)
const showDialog = ref(false)

const list = ref([])
const barcode = ref({})

function getBarcodes() {
  Toast.loading()
  return API.getBarcodes()
    .then((res) => {
      list.value = res.data
    })
    .finally(() => {
      Toast.clear()
    })
}

function onDelete({ value }) {
  Toast.loading()
  return API.deleteBarcode({ value }).then((res) => {
    Toast.success('删除成功')
    setTimeout(getBarcodes, 500)
  })
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

getBarcodes()
</script>
