<template lang="pug">
van-dialog(
  v-model='show'
  :title="$t('sensors.filter')"
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
        :label="$t('g.name')"
        :placeholder="$t('g.plhrName')")
      //- 传感器类型
      van-field.bg-gray-50.mb-2(
        readonly
        clickable
        is-link
        arrow-direction="down"
        :label="$t('sensors.type')"
        :placeholder="$t('sensors.plhrType')"
        :value='lut("sensor_type", formData.type)'
        @click='showTypePicker = true')
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
      //- //- 状态
      //- van-field.bg-gray-50(
      //-   readonly
      //-   clickable
      //-   is-link
      //-   arrow-direction="down"
      //-   :label="$t('g.status')"
      //-   :placeholder="$t('g.plhrStatus')"
      //-   :value='lut("status", formData.status)'
      //-   @click='showStatusPicker = true')
      //- 状态
      van-field.bg-gray-50.mb-2(
        required
        :label="$t('g.status')"
        :rules="[{ required: true, message: $t('g.requireStatus') }]")
        template(#input)
          van-radio-group(v-model='formData.status' direction='horizontal')
            van-radio.mb-1(v-for="d in options('status')" :key="d.value" :name='+d.value') {{ d.name }}

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
})

const form = ref(null)
const show = ref(false)
const showTypePicker = ref(false)
const showStatusPicker = ref(false)

const formData = reactive({
  name: undefined,
  number: undefined,
  type: undefined,
  manufacturer: undefined,
  status: undefined,
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
})

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
    resetForm()
  }
}

function resetForm() {
  formData.name = undefined
  formData.number = undefined
  formData.type = undefined
  formData.manufacturer = undefined
  formData.status = undefined
}

function onSubmit() {
  emits('confirm', { ...formData })
}
</script>
