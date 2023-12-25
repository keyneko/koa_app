<template lang="pug">
.page--fixed
  .page__header
    van-nav-bar(
      :title="$t('routes.barcodeCreate')"
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
          :label="$t('barcodeCreate.category')"
          :placeholder="$t('barcodeCreate.plhrCategory')"
          required
          :rules="[ \
            { required: true, message: $t('barcodeCreate.requireCategory') }, \
            { validator: fn, message: $t('barcodeCreate.formatErrCategory') }, \
          ]")
      //- 名称
      van-cell-group.mb-4(inset)
        van-field(
          v-model='formData.name'
          :label="$t('g.name')"
          :placeholder="$t('g.plhrName')"
          required
          :rules="[ \
            { required: true, message: $t('g.requireName') }, \
          ]")
      //- 数量
      van-cell-group.mb-4(inset)
        van-field(
          v-model='formData.quantity'
          :label="$t('g.qty')"
          :placeholder="$t('g.plhrQty')"
          type="number"
          required
          :rules="[ \
            { required: true, message: $t('g.requireQty') }, \
          ]")
      //- 基础单位
      van-cell-group.mb-4(inset)
        van-field(
          v-model='formData.basicUnit'
          :label="$t('g.basicUnit')"
          :placeholder="$t('g.plhrBasicUnit')")
      //- 拍照
      van-cell-group(inset)
        van-field(
          _required
          :label="$t('g.pictures')"
          _rules="[{ required: true, message: $t('g.requirePictures') }]")
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
      ) {{ $t('g.submit') }}
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { Toast } from 'vant'
import { useRouter, useRoute } from '@/router'
import useDicts from '@/utils/useDicts'
import { upload } from '@/utils/fileUpload'
import bus from '@/utils/bus'
import i18n from '@/lang'
import * as API from '@/api/barcode'
import { map } from 'lodash'

const router = useRouter()
const route = useRoute()
const { lut, options } = useDicts()

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
  return API.createBarcode({
    ...formData,
    files: map(formData.files, (f) => f.url),
  })
    .then((res) => {
      Toast.success(i18n.t('g.created'))
      resetForm()
      router.back()
      bus.$emit('barcode.created', res.data)
    })
    .finally(() => {
      buttonLoading.value = false
    })
}
</script>
