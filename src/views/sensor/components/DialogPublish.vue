<template lang="pug">
van-dialog(
  v-model='show'
  :title="$t('sensors.publish')"
  :show-cancel-button='true'
  :closeOnClickOverlay='false'
  :beforeClose="beforeClose")
  van-form(
    validate-first
    ref='form')
    van-cell-group.title-basis
      //- _id
      van-field.mb-2(
        v-model='formData.sensorId'
        readonly
        :label="$t('g.identifier')")
      //- 主题
      van-field.bg-gray-50.mb-2(
        v-model='formData.topic'
        required
        :label="$t('sensors.topic')"
        :placeholder="$t('sensors.plhrTopic')"
        :rules="[ \
          { required: true, message: $t('sensors.requireTopic') }, \
        ]")
      //- 消息
      van-field.bg-gray-50.mb-2(
        v-model='formData.message'
        required
        rows="2"
        type="textarea"
        :label="$t('sensors.message')"
        :placeholder="$t('sensors.plhrMessage')"
        :rules="[ \
          { required: true, message: $t('sensors.requireMessage') }, \
        ]")
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

const formData = reactive({
  sensorId: undefined,
  topic: undefined,
  message: undefined,
})

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
    formData.sensorId = value._id
    formData.topic = value.topic
    formData.message = value.message
  }
)

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
    formData.sensorId = undefined
    formData.topic = undefined
    formData.message = undefined
  }, 200)
}

function onSubmit() {
  Toast.loading()
  return API.sensorPublish(formData).then((res) => {
    Toast.success(i18n.t('sensors.published'))
    emits('published')
  })
}
</script>
