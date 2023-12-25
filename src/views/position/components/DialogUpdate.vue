<template lang="pug">
van-dialog(
  v-model='show'
  :title="$t('positions.update')"
  :show-cancel-button='true'
  :closeOnClickOverlay='false'
  :beforeClose="beforeClose")
  van-form(
    validate-first
    ref='form')
    van-cell-group.title-basis
      //- 库位码
      van-field.mb-2(
        readonly
        :value='formData.value'
        :label="$t('g.position')"
        :placeholder="$t('g.plhrPosition')")
      //- 名称
      van-field.bg-gray-50.mb-2(
        v-model='formData.name'
        required
        :label="$t('g.name')"
        :placeholder="$t('g.plhrName')"
        :rules="[{ required: true, message: $t('g.requireName') }]")
      //- 是否可堆叠
      van-field.bg-gray-50.mb-2(
        required
        :label="$t('positionCreate.isStackable')"
        :rules="[{ required: true, message: $t('positionCreate.requireStackable') }]")
        template(#input)
          van-radio-group(v-model='formData.isStackable' direction='horizontal')
            van-radio.mb-1(v-for="d in options('position_stackable')" :key="d._id" :name='d.value') {{ d.name }}
      //- 状态
      van-field.bg-gray-50.mb-2(
        readonly
        clickable
        is-link
        required
        arrow-direction="down"
        :label="$t('g.status')"
        :placeholder="$t('g.plhrStatus')"
        :value='lut("status", formData.status)'
        @click='showStatusPicker = true')
      //- 受保护
      van-field.bg-gray-50.mb-2(name='switch' :label="$t('g.protected')")
        template(#input)
          van-switch(v-model='formData.isProtected' size='20')
      //- 拍照
      van-field(
        _required
        :label="$t('g.pictures')"
        _rules="[{ required: true, message: $t('g.requirePictures') }]")
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
import i18n from '@/lang'
import { map } from 'lodash'
import * as API from '@/api/position'

const emits = defineEmits(['input'])
const { lut, options } = useDicts()

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => ({}),
  },
})

const form = ref(null)
const show = ref(false)
const showStatusPicker = ref(false)

const formData = reactive({
  value: '',
  name: '',
  isStackable: '',
  status: '',
  isProtected: undefined,
  files: [],
})

const statusColumns = computed(() =>
  map(options.value('status'), (d) => ({
    text: d.name,
    value: d,
  }))
)

watch(
  () => props.value,
  (value) => {
    show.value = value
  }
)

watch(show, (value) => {
  emits('input', value)
})

watch(
  () => props.data,
  (value) => {
    formData.value = value.value
    formData.name = value.name
    formData.isStackable = value.isStackable
    formData.status = value.status
    formData.isProtected = value.isProtected
    formData.files = map(value.files, (f) => ({ url: f }))
  }
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
    }
    catch (e) {
      done(false)
    }
  }
  else {
    done()
  }
}

function onSubmit() {
  Toast.loading()
  return API.updatePosition({ ...formData, files: map(formData.files, (f) => f.url) }).then((res) => {
    Toast.success(i18n.t('g.updated'))
    emits('updated')
  })
}
</script>
