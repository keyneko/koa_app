<template lang="pug">
van-dialog(
  v-model='show'
  :title="$t('sensors.create')"
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
        :label="$t('name')"
        :placeholder="$t('plhrName')"
        :rules="[ \
          { required: true, message: $t('requireName') }, \
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

  van-popup(v-model='showTypePicker' position='bottom')
    van-picker(
      show-toolbar
      :columns='typeColumns'
      @confirm='onTypePicked'
      @cancel='showTypePicker = false')
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
})

const form = ref(null)
const show = ref(false)
const showTypePicker = ref(false)

const formData = reactive({
  name: '',
  number: '',
  type: '',
  manufacturer: '',
  status: 1,
})

const typeColumns = computed(() =>
  map(options.value('sensor_type'), (d) => ({
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

function onTypePicked({ value }) {
  formData.type = value.value
  showTypePicker.value = false
}

async function beforeClose(action, done) {
  if (action === 'confirm') {
    try {
      await form.value.validate()
      await onSubmit()
      done()
      resetForm()
    }
    catch (e) {
      done(false)
    }
  }
  else {
    done()
    resetForm()
  }
}

function resetForm() {
  formData.name = ''
  formData.number = ''
  formData.type = ''
  formData.manufacturer = ''
  formData.status = 1
}

function onSubmit() {
  Toast.loading()
  return API.createSensor(formData).then((res) => {
    Toast.success(i18n.t('created'))
    emits('created')
  })
}
</script>
