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
      //- 状态
      van-cell-group.mb-4(inset)
        van-field(
          readonly
          clickable
          is-link
          required
          arrow-direction="down"
          :label="$t('status')"
          :placeholder="$t('plhrStatus')"
          :value='lut("barcode_status", formData.status)'
          @click='showStatusPicker = true')
      //- 拍照
      van-cell-group(inset)
        van-field(
          _required
          :label="$t('pictures')"
          _rules="[{ required: true, message: $t('requirePictures') }]")
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
      ) {{ $t('submit') }}

  van-popup(v-model='showStatusPicker' position='bottom')
    van-picker(
      show-toolbar
      :columns='statusColumns'
      @confirm='onStatusPicked'
      @cancel='showStatusPicker = false')
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { Toast } from 'vant'
import { useRouter, useRoute } from '@/router'
import useDicts from '@/utils/useDicts'
import { upload } from '@/utils/fileUpload'
import i18n from '@/lang'
import * as API from '@/api/barcode'
import { map } from 'lodash'

const router = useRouter()
const route = useRoute()
const { lut, options } = useDicts()

const buttonLoading = ref(false)
const showDialog = ref(false)
const showStatusPicker = ref(false)

const form = ref(null)
const fn = (v) => /^[A-Z]{2}$/.test(v)

const formData = reactive({
  category: '',
  name: '',
  quantity: '',
  basicUnit: '',
  status: 0,
  files: [],
})

const statusColumns = computed(() =>
  map(options.value('barcode_status'), (d) => ({
    text: d.name,
    value: d,
  })),
)

function fileUpload(file) {
  upload(file).then((res) => {
    formData.files.push({ url: res.data })
  })
  return false
}

function resetForm() {
  formData.name = ''
  formData.status = 0
  formData.files = []
}

function onStatusPicked({ value }) {
  formData.status = value.value
  showStatusPicker.value = false
}

function onSubmit() {
  Toast.loading()
  buttonLoading.value = true
  return API.createBarcode({ ...formData, files: map(formData.files, (f) => f.url) })
    .then((res) => {
      Toast.success( i18n.t('created') )
      resetForm()
    })
    .finally(() => {
      buttonLoading.value = false
    })
}
</script>
