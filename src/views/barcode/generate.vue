<template lang="pug">
.page--fixed
  .page__header
    van-nav-bar(
      title="条码生成"
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
          label="分类"
          placeholder="请输入分类"
          required
          :rules="[ \
            { required: true, message: '分类不能为空' }, \
            { validator: fn, message: '分类格式错误（两位大写字母）' }, \
          ]")
      //- 名称
      van-cell-group.mb-4(inset)
        van-field(
          v-model='formData.name'
          label="名称"
          placeholder="请输入名称"
          required
          :rules="[ \
            { required: true, message: '名称不能为空' }, \
          ]")
      //- 数量
      van-cell-group.mb-4(inset)
        van-field(
          v-model='formData.quantity'
          label="数量"
          placeholder="请输入数量"
          type="number"
          required
          :rules="[ \
            { required: true, message: '数量不能为空' }, \
          ]")
      //- 基础单位
      van-cell-group.mb-4(inset)
        van-field(
          v-model='formData.basicUnit'
          label="基础单位"
          placeholder="请输入基础单位")
      //- 拍照
      van-cell-group(inset)
        van-field(
          required
          label="上传照片"
          :rules="[{ required: true, message: '请上传照片' }]")
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
      ) 提交
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { Toast } from 'vant'
import { useRouter, useRoute } from '@/router'
import { upload } from '@/utils/fileUpload'
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
  quantity: 1,
  basicUnit: 'pcs',
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
  formData.quantity = 1
  formData.files = []
}

function onSubmit() {
  Toast.loading()
  buttonLoading.value = true
  return API.createBarcode({ ...formData, files: map(formData.files, (f) => f.url) })
    .then((res) => {
      Toast.success(`条码创建成功`)
      resetForm()
    })
    .finally(() => {
      buttonLoading.value = false
    })
}
</script>
