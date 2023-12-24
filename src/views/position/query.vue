<template lang="pug">
.page--fixed
  .page__header
    van-nav-bar(
      :title="$t('routes.positionQuery')"
      left-arrow
      @click-left="$router.back()")

  .page__body
    ScanView.mb-4
      | {{ $t('positionQuery.scanTip') }}

    van-form(
      validate-first
      @submit="onSubmit"
      ref='form')
      van-cell-group(inset :title="$t('g.position')")
        van-field(
          v-model='formData.value'
          data-testid='input'
          :placeholder="$t('g.plhrPosition')"
          required
          :rules="[ \
            { required: true, message: $t('g.requirePosition') }, \
            { validator: fn, message: $t('g.formatErrPosition') }, \
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

  DialogResult(v-model="showDialog" :data="position")
</template>

<script setup>
import { ref, reactive, computed, onBeforeUnmount } from 'vue'
import { Toast } from 'vant'
import { useRouter, useRoute } from '@/router'
import ScanView from '@/components/ScanView'
import jsBridge from '@/utils/jsBridge'
import i18n from '@/lang'
import * as API from '@/api/position'
import DialogResult from './components/DialogResult'

const router = useRouter()
const route = useRoute()

const buttonLoading = ref(false)
const showDialog = ref(false)

const form = ref(null)
const fn = (v) => /^KW[A-Z0-9]{4}[A-Z0-9]{2}[A-Z0-9]{2}\d{4}$/.test(v)

const formData = reactive({
  value: '',
})
const position = ref({})

// const toList = computed(() => ({
//   path: '/position/list',
//   query: {},
// }))

// 注册扫码回调
jsBridge.register('barcode', (res) => {
  if (fn(res)) {
    formData.value = res
  }
  else {
    Toast(i18n.t('positionQuery.scanned') + res)
  }
})

// 注销扫码回调
onBeforeUnmount(() => {
  jsBridge.unregister('barcode')
})

function onSubmit() {
  Toast.loading()
  buttonLoading.value = true
  return API.getPosition(formData)
    .then((res) => {
      position.value = res.data
      showDialog.value = true
    })
    .finally(() => {
      Toast.clear()
      buttonLoading.value = false
    })
}
</script>
