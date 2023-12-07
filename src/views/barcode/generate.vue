<template lang="pug">
.page--fixed
  .page__header
    van-nav-bar(
      :title="$t('routes.barcodeGen')"
      left-arrow
      @click-left="$router.back()")

  .page__body
    van-form(
      validate-first
      @submit="onSubmit"
      ref='form')
      //- 分类
      van-cell-group.mb-4(inset)
        van-field(
          v-model='formData.category'
          :label="$t('barcodeGen.category')"
          :placeholder="$t('barcodeGen.plhrCategory')"
          required
          :rules="[ \
            { required: true, message: $t('barcodeGen.requireCategory') }, \
            { validator: fn, message: $t('barcodeGen.formatErrCategory') }, \
          ]")
      //- 名称
      van-cell-group.mb-4(inset)
        van-field(
          v-model='formData.name'
          :label="$t('name')"
          :placeholder="$t('plhrName')"
          required
          :rules="[ \
            { required: true, message: $t('requireName') }, \
          ]")
      //- 数量
      van-cell-group.mb-4(inset)
        van-field(
          v-model='formData.quantity'
          :label="$t('qty')"
          :placeholder="$t('plhrQty')"
          type="number"
          required
          :rules="[ \
            { required: true, message: $t('requireQty') }, \
          ]")
      //- 基础单位
      van-cell-group.mb-4(inset)
        van-field(
          v-model='formData.basicUnit'
          :label="$t('basicUnit')"
          :placeholder="$t('plhrBasicUnit')")
      //- 拍照
      van-cell-group(inset)
        van-field(
          required
          :label="$t('pictures')"
          :rules="[{ required: true, message: $t('requirePictures') }]")
          template(#input)
            van-uploader(
              v-model="formData.files"
              multiple
              :before-read="fileUpload")

  .page__footer.p-4.flex.gap-4
    van-button.r8(
      data-testid='submit'
      type='info'
      block
      :disabled="buttonLoading"
      @click='() => $refs.form.submit()'
      ) {{ $t('barcodeGen.submit') }}
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { Toast } from 'vant'
import { useRouter, useRoute } from '@/router'
import { upload } from '@/utils/fileUpload'
import i18n from '@/lang'
import * as API from '@/api/barcode'
import { map } from 'lodash'

const router = useRouter()
const route = useRoute()

const buttonLoading = ref(false)
const showDialog = ref(false)

const form = ref(null)
const fn = (v) => /^[A-Z]{2}$/.test(v)

const formData = reactive({
  category: '',
  name: '',
  quantity: '',
  basicUnit: '',
  files: [],
})

function fileUpload(file) {
  upload(file).then((res) => {
    formData.files.push({ url: res.data })
  })
  return false
}

function resetForm() {
  formData.name = ''
  formData.files = []
}

function onSubmit() {
  Toast.loading()
  buttonLoading.value = true
  return API.createBarcode({ ...formData, files: map(formData.files, (f) => f.url) })
    .then((res) => {
      Toast.success( i18n.t('barcodeGen.created') )
      resetForm()
    })
    .finally(() => {
      buttonLoading.value = false
    })
}
</script>
