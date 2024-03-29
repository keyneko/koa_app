<template lang="pug">
.page--fixed
  .page__header
    van-nav-bar(
      :title="$t('routes.positionCreate')"
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
          :label="$t('positionCreate.areaCode')"
          :placeholder="$t('positionCreate.plhrAreaCode')"
          required
          :rules="[ \
            { required: true, message: $t('positionCreate.requireAreaCode') }, \
            { validator: (v) => /^[A-Z0-9]{1,4}$/.test(v), message: $t('positionCreate.formatErrAreaCode') }, \
          ]")
      //- 栋编号
      van-cell-group.mb-4(inset)
        van-field(
          v-model='formData.buildingCode'
          :label="$t('positionCreate.buildingCode')"
          :placeholder="$t('positionCreate.plhrBuildingCode')"
          required
          :rules="[ \
            { required: true, message: $t('positionCreate.requireBuildingCode') }, \
            { validator: (v) => /^[A-Z0-9]{1,2}$/.test(v), message: $t('positionCreate.formatErrBuildingCode') }, \
          ]")
      //- 楼层编号
      van-cell-group.mb-4(inset)
        van-field(
          v-model='formData.floorCode'
          :label="$t('positionCreate.floorCode')"
          :placeholder="$t('positionCreate.plhrFloorCode')"
          required
          :rules="[ \
            { required: true, message: $t('positionCreate.requireFloorCode') }, \
            { validator: (v) => /^[A-Z0-9]{1,2}$/.test(v), message: $t('positionCreate.formatErrFloorCode') }, \
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
      //- 是否可堆叠
      van-cell-group.mb-4(inset)
        van-field(name='switch' :label="$t('positionCreate.isStackable')")
          template(#input)
            van-switch(v-model='formData.isStackable' size='20')
      //- //- 是否可堆叠
      //- van-cell-group.mb-4(inset)
      //-   van-field(
      //-     required
      //-     :label="$t('positionCreate.isStackable')"
      //-     :rules="[{ required: true, message: $t('positionCreate.requireStackable') }]")
      //-     template(#input)
      //-       van-radio-group(v-model='formData.isStackable' direction='horizontal')
      //-         van-radio.mb-1(v-for="d in options('position_stackable')" :key="d._id" :name='d.value') {{ d.name }}
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
import * as API from '@/api/position'
import { map } from 'lodash'

const router = useRouter()
const route = useRoute()
const { lut, options } = useDicts()

const buttonLoading = ref(false)
const showDialog = ref(false)

const form = ref(null)

const formData = reactive({
  areaCode: '',
  buildingCode: '',
  floorCode: '',
  name: '',
  isStackable: 0,
  files: [],
})

function fileUpload(file) {
  upload(file).then((res) => {
    formData.files.push({ url: res.data })
  })
  return false
}

function resetForm() {
  formData.isStackable = 0
  formData.files = []
}

function onSubmit() {
  Toast.loading()
  buttonLoading.value = true
  return API.createPosition({
    ...formData,
    files: map(formData.files, (f) => f.url),
  })
    .then((res) => {
      Toast.success(i18n.t('g.created'))
      resetForm()
      router.back()
      bus.$emit('position.created', res.data)
    })
    .finally(() => {
      buttonLoading.value = false
    })
}
</script>
