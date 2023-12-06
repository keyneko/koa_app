<template lang="pug">
.page--fixed
  .page__header
    van-nav-bar(
      title="条码查询"
      left-arrow
      @click-left="$router.back()")
  .page__body
    ScanView.mb-4
      | 请扫描条码

    van-form(
      validate-first
      @submit="onSubmit"
      ref='form')
      van-cell-group(inset title="查询条码")
        van-field(
          v-model='formData.value'
          data-testid='input'
          placeholder="输入条形码"
          required
          :rules="[ \
            { required: true, message: '条码不能为空' }, \
            { validator: fn, message: '条码格式错误' }, \
          ]")

  .page__footer.p-4.flex.gap-4
    van-button.r8(
      data-testid='submit'
      type='info'
      block
      :disabled="buttonLoading"
      @click='() => $refs.form.submit()'
      ) 提交查询
    van-button.r8(
      type='default'
      block
      :to="toList"
      ) 查看所有条码

  DialogResult(v-model="showDialog" :data="barcode")
</template>

<script setup>
import { ref, reactive, computed, onBeforeUnmount } from 'vue'
import { Toast } from 'vant'
import { useRouter, useRoute } from '@/router'
import ScanView from '@/components/ScanView'
import jsBridge from '@/utils/jsBridge'
import * as API from '@/api/query'
import DialogResult from './components/DialogResult'

const router = useRouter()
const route = useRoute()

const buttonLoading = ref(false)
const showDialog = ref(false)

const form = ref(null)
const fn = (v) => /^[A-Z]{2}\d{8}\d{4}$/.test(v)

const formData = reactive({
  value: '',
})
const barcode = ref({})

const toList = computed(() => ({
  path: '/query/list',
  query: {},
}))

// 注册扫码回调
jsBridge.register('barcode', (res) => {
  if (fn(res)) {
    formData.value = res
  } else {
    Toast(`扫码结果： ${res}`)
  }
})

// 注销扫码回调
onBeforeUnmount(() => {
  jsBridge.unregister('barcode')
})

function getBarcodes() {
  API.getBarcodes().then((res) => {
    console.log(res.data)
  })
}

function getBarcode(value) {
  API.getBarcode({ value }).then((res) => {
    console.log(res.data)
  })
}

function createBarcode(formData) {
  API.createBarcode(formData).then((res) => {
    console.log(res.data)
  })
}

function updateBarcode(params, formData) {
  API.updateBarcode(params, formData).then((res) => {
    console.log(res.data)
  })
}

function deleteBarcode(params) {
  API.deleteBarcode(params).then((res) => {
    console.log(res.data)
  })
}

function onSubmit() {
  Toast.loading()
  buttonLoading.value = true
  return API.getBarcode(formData)
    .then((res) => {
      barcode.value = res.data
      showDialog.value = true
    })
    .finally(() => {
      Toast.clear()
      buttonLoading.value = false
    })
}

// getBarcodes()
// getBarcode('SJ202312060001')
// createBarcode({
//   category: 'WJ',
//   name: '超级飞侠乐迪模型',
//   quantity: 1,
//   basicUnit: '只',
//   status: 1,
// })
// updateBarcode(
//   { value: 'WJ202312060004' },
//   {
//     name: '超级飞侠小爱模型',
//     quantity: 2,
//     basicUnit: '只',
//     status: 1,
//   },
// )
// deleteBarcode({ value: 'WJ202312060003' })
</script>
