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
      //- 条码
      van-cell(:title="$t('position')")
        b.black {{ formData.value }}
      //- 名称
      van-field.bg-gray-50.mb-2(
        v-model='formData.name'
        required
        :label="$t('name')"
        :placeholder="$t('plhrName')"
        :rules="[{ required: true, message: $t('requireName') }]")
      //- 是否可堆叠
      van-field.bg-gray-50.mb-2(
        required
        :label="$t('positionGen.isStackable')"
        :rules="[{ required: true, message: $t('positionGen.requireIsStackable') }]")
        template(#input)
          van-radio-group(v-model='formData.isStackable' direction='horizontal')
            van-radio(:name='0') 不可堆叠
            van-radio(:name='1') 可堆叠
      //- 状态
      van-field.bg-gray-50(
        readonly
        clickable
        is-link
        arrow-direction="down"
        :label="$t('status')"
        :placeholder="$t('plhrStatus')"
        :value='lut("position_status", formData.status)'
        @click='showStatusPicker = true')
      //- 拍照
      van-field(
        _required
        :label="$t('pictures')"
        _rules="[{ required: true, message: $t('requirePictures') }]")
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
    default: {},
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
  files: [],
})

const statusColumns = computed(() =>
  map(options.value('position_status'), (d) => ({
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
    formData.isStackable = value.isStackable
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
  return API.updatePosition({ ...formData, files: map(formData.files, (f) => f.url) }).then((res) => {
    Toast.success(i18n.t('updated'))
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