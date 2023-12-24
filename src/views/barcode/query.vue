<template lang="pug">
.page--fixed
  .page__header
    van-nav-bar(
      :title="$t('routes.barcodeQuery')"
      left-arrow
      @click-left="$router.back()")

  .page__body
    ScanView.mb-4
      | {{ $t('barcodeQuery.scanTip') }}

    van-form(
      validate-first
      @submit="onSubmit"
      ref='form')
      van-cell-group(inset :title="$t('g.barcode')")
        van-field(
          v-model='formData.value'
          data-testid='input'
          :placeholder="$t('g.plhrBarcode')"
          required
          :rules="[ \
            { required: true, message: $t('g.requireBarcode') }, \
            { validator: fn, message: $t('g.formatErrBarcode') }, \
          ]")

  .page__footer.p-4.flex.gap-4
    van-button.r8(
      data-testid='submit'
      type='info'
      block
      :disabled="buttonLoading"
      @click='() => $refs.form.submit()'
      ) {{ $t('g.submit') }}
    //- van-button.r8(
    //-   type='default'
    //-   block
    //-   :to="toList"
    //-   ) {{ $t('g.viewAll') }}

  DialogResult(v-model="showDialog" :data="barcode")
</template>

<script setup>
import { ref, reactive, computed, onBeforeUnmount } from 'vue'
import { Toast } from 'vant'
import { useRouter, useRoute } from '@/router'
import ScanView from '@/components/ScanView'
import jsBridge from '@/utils/jsBridge'
import i18n from '@/lang'
import * as API from '@/api/barcode'
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

// const toList = computed(() => ({
//   path: '/barcode/list',
//   query: {},
// }))

// 注册扫码回调
jsBridge.register('barcode', (res) => {
  if (fn(res)) {
    formData.value = res
  }
  else {
    Toast(i18n.t('barcodeQuery.scanned') + res)
  }
})

// 注销扫码回调
onBeforeUnmount(() => {
  jsBridge.unregister('barcode')
})

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
</script>
