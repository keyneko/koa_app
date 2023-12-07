<template lang="pug">
van-dialog(
  v-model='show'
  title="更新条码"
  :show-cancel-button='true'
  :closeOnClickOverlay='true'
  :beforeClose="beforeClose")
  van-form(
    validate-first
    ref='form')
    van-cell-group.title-basis
      //- 条码
      van-cell(title="条码：")
        b.black {{ formData.value }}
      //- 名称
      van-field.bg-gray-50.mb-2(
        v-model='formData.name'
        required
        label="名称："
        autocomplete="off"
        placeholder="请输入名称"
        :rules="[{ required: true, message: '名称不能为空' }]")
      //- 数量
      van-field.bg-gray-50.mb-2(
        v-model='formData.quantity'
        required
        label="数量："
        type="number"
        autocomplete="off"
        placeholder="请输入数量"
        :rules="[{ required: true, message: '数量不能为空' }]")
      //- 基础单位
      van-field.bg-gray-50.mb-2(
        v-model='formData.basicUnit'
        required
        label="基础单位："
        autocomplete="off"
        placeholder="请输入基础单位"
        :rules="[{ required: true, message: '基础单位不能为空' }]")
      //- 状态
      van-field.bg-gray-50(
        readonly
        clickable
        is-link
        arrow-direction="down"
        label="状态："
        :value='lut("barcode_status", formData.status)'
        placeholder="请选择状态"
        @click='showStatusPicker = true')
      //- 拍照
      van-field(
        _required
        label="图片："
        _rules="[{ required: true, message: '请上传照片' }]")
        template(#input)
          van-uploader(
            v-model="formData.files"
            multiple
            :preview-size="44"
            :before-read="fileUpload")

  van-popup(v-model='showStatusPicker' position='bottom')
    van-picker(
      show-toolbar
      :columns='statusColumns'
      @confirm='onStatusPicked'
      @cancel='showStatusPicker = false')
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { Toast } from 'vant'
import useDicts from '@/utils/useDicts'
import { upload } from '@/utils/fileUpload'
import { map } from 'lodash'
import * as API from '@/api/barcode'

const emits = defineEmits(['input'])
const { lut, options } = useDicts()

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: {},
  },
})

const form = ref(null)
const show = ref(false)
const showStatusPicker = ref(false)

const formData = reactive({
  value: '',
  name: '',
  quantity: '',
  basicUnit: '',
  status: '',
  files: [],
})

const statusColumns = computed(() =>
  map(options.value('barcode_status'), (d) => ({
    text: d.name,
    value: d,
  })),
)

watch(
  () => props.value,
  (value) => {
    show.value = value
  },
)

watch(show, (value) => {
  emits('input', value)
})

watch(
  () => props.data,
  (value) => {
    formData.value = value.value
    formData.name = value.name
    formData.quantity = value.quantity
    formData.basicUnit = value.basicUnit
    formData.status = value.status
    formData.files = map(value.files, (f) => ({ url: f }))
  },
)

function fileUpload(file) {
  upload(file).then((res) => {
    formData.files.push({ url: res.data })
  })
  return false
}

function onStatusPicked({ value }) {
  formData.status = value.value
  showStatusPicker.value = false
}

async function beforeClose(action, done) {
  if (action === 'confirm') {
    try {
      await form.value.validate()
      await onSubmit()
      done()
    } catch (e) {
      done(false)
    }
  } else {
    done()
  }
}

function onSubmit() {
  Toast.loading()
  return API.updateBarcode({ ...formData, files: map(formData.files, (f) => f.url) }).then((res) => {
    Toast.success('条码更新成功')
    emits('updated')
  })
}
</script>

<style lang="scss" scoped>
:deep(.van-field) {
  .van-field__label {
    margin-right: 0;
  }
}
</style>
