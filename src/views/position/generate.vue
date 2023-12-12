<template lang="pug">
.page--fixed
  .page__header
    van-nav-bar(
      :title="$t('routes.positionGen')"
      left-arrow
      @click-left="$router.back()")

  .page__body
    van-form(
      validate-first
      @submit="onSubmit"
      ref='form')
      //- 地区编号
      van-cell-group.mb-4(inset)
        van-field(
          v-model='formData.areaCode'
          :label="$t('positionGen.areaCode')"
          :placeholder="$t('positionGen.plhrAreaCode')"
          required
          :rules="[ \
            { required: true, message: $t('positionGen.requireAreaCode') }, \
            { validator: (v) => /^[A-Z0-9]{1,4}$/.test(v), message: $t('positionGen.formatErrAreaCode') }, \
          ]")
      //- 栋编号
      van-cell-group.mb-4(inset)
        van-field(
          v-model='formData.buildingCode'
          :label="$t('positionGen.buildingCode')"
          :placeholder="$t('positionGen.plhrBuildingCode')"
          required
          :rules="[ \
            { required: true, message: $t('positionGen.requireBuildingCode') }, \
            { validator: (v) => /^[A-Z0-9]{1,2}$/.test(v), message: $t('positionGen.formatErrBuildingCode') }, \
          ]")
      //- 楼层编号
      van-cell-group.mb-4(inset)
        van-field(
          v-model='formData.floorCode'
          :label="$t('positionGen.floorCode')"
          :placeholder="$t('positionGen.plhrFloorCode')"
          required
          :rules="[ \
            { required: true, message: $t('positionGen.requireFloorCode') }, \
            { validator: (v) => /^[A-Z0-9]{1,2}$/.test(v), message: $t('positionGen.formatErrFloorCode') }, \
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
      //- 是否可堆叠
      van-cell-group.mb-4(inset)
        van-field(
          required
          :label="$t('positionGen.isStackable')"
          :rules="[{ required: true, message: $t('positionGen.requireStackable') }]")
          template(#input)
            van-radio-group(v-model='formData.isStackable' direction='horizontal')
              van-radio.mb-1(v-for="d in options('position_stackable')" :key="d._id" :name='d.value') {{ d.name }}
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
          :value='lut("status", formData.status)'
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
import * as API from '@/api/position'
import { map } from 'lodash'

const router = useRouter()
const route = useRoute()
const { lut, options } = useDicts()

const buttonLoading = ref(false)
const showDialog = ref(false)
const showStatusPicker = ref(false)

const form = ref(null)

const formData = reactive({
  areaCode: '',
  buildingCode: '',
  floorCode: '',
  name: '',
  isStackable: 0,
  status: 0,
  files: [],
})

const statusColumns = computed(() =>
  map(options.value('status'), (d) => ({
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
  formData.isStackable = 0
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
  return API.createPosition({ ...formData, files: map(formData.files, (f) => f.url) })
    .then((res) => {
      Toast.success(i18n.t('created'))
      resetForm()
    })
    .finally(() => {
      buttonLoading.value = false
    })
}
</script>
