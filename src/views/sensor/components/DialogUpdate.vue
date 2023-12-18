<template lang="pug">
van-dialog(
  v-model='show'
  :title="$t('sensors.update')"
  :show-cancel-button='true'
  :closeOnClickOverlay='false'
  :beforeClose="beforeClose")
  van-form(
    validate-first
    ref='form')
    van-cell-group.title-basis
      //- 名称
      van-field.bg-gray-50.mb-2(
        v-model='formData.name'
        required
        :label="$t('g.name')"
        :placeholder="$t('g.plhrName')"
        :rules="[ \
          { required: true, message: $t('g.requireName') }, \
        ]")
      //- 传感器类型
      van-field.bg-gray-50.mb-2(
        readonly
        clickable
        is-link
        required
        arrow-direction="down"
        :label="$t('sensors.type')"
        :placeholder="$t('sensors.plhrType')"
        :value='lut("sensor_type", formData.type)'
        @click='showTypePicker = true'
        :rules="[ \
          { required: true, message: $t('sensors.requireType') }, \
        ]")
      //- 序列号
      van-field.bg-gray-50.mb-2(
        v-model='formData.number'
        :label="$t('sensors.number')"
        :placeholder="$t('sensors.plhrNumber')")
      //- 制造商
      van-field.bg-gray-50.mb-2(
        v-model='formData.manufacturer'
        :label="$t('sensors.manufacturer')"
        :placeholder="$t('sensors.plhrManufacturer')")
      //- 状态
      van-field.bg-gray-50(
        readonly
        clickable
        is-link
        arrow-direction="down"
        :label="$t('g.status')"
        :placeholder="$t('g.plhrStatus')"
        :value='lut("status", formData.status)'
        @click='showStatusPicker = true')
      //- 受保护
      van-field.bg-gray-50.mb-2(name='switch' :label="$t('g.protected')")
        template(#input)
          van-switch(v-model='formData.isProtected' size='20')

  van-popup(v-model='showTypePicker' position='bottom')
    van-picker(
      show-toolbar
      :columns='typeColumns'
      @confirm='onTypePicked'
      @cancel='showTypePicker = false')

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
import * as API from '@/api/sensor'

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
const showTypePicker = ref(false)
const showStatusPicker = ref(false)

const formData = reactive({
  _id: undefined,
  name: undefined,
  type: undefined,
  number: undefined,
  manufacturer: undefined,
  status: undefined,
  isProtected: undefined,
})

const typeColumns = computed(() =>
  map(options.value('sensor_type'), (d) => ({
    text: d.name,
    value: d,
  }))
)
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
  if (!value) {
    resetForm()
  }
})

watch(
  () => props.data,
  (value) => {
    formData._id = value._id
    formData.name = value.name
    formData.type = value.type
    formData.number = value.number
    formData.manufacturer = value.manufacturer
    formData.status = value.status
    formData.isProtected = value.isProtected
  }
)

function onTypePicked({ value }) {
  formData.type = value.value
  showTypePicker.value = false
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

function resetForm() {
  setTimeout(() => {
    formData._id = undefined
    formData.name = undefined
    formData.type = undefined
    formData.number = undefined
    formData.manufacturer = undefined
    formData.status = undefined
    formData.isProtected = undefined
  }, 200)
}

function onSubmit() {
  Toast.loading()
  return API.updateSensor(formData).then((res) => {
    Toast.success(i18n.t('g.updated'))
    emits('updated')
  })
}
</script>
