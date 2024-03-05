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
      //- id
      van-field.mb-2(
        v-model='formData.id'
        readonly
        :label="$t('g.identifier')")
      //- 主题
      van-field.bg-gray-50.mb-2(
        readonly
        clickable
        is-link
        required
        arrow-direction="down"
        :label="$t('sensors.topic')"
        :placeholder="$t('sensors.plhrTopic')"
        :value='formData.topic'
        @click='showSubscriptionPicker = true'
        :rules="[ \
          { required: true, message: $t('sensors.requireTopic') }, \
        ]")
      //- 消息
      van-field.bg-gray-50.mb-2(
        v-model='formData.payload'
        rows="2"
        type="textarea"
        :label="$t('sensors.payload')"
        :placeholder="$t('sensors.plhrPayload')")
      //- 服务质量
      van-field.bg-gray-50.mb-2(
        required
        :label="$t('sensors.qos')"
        :rules="[ \
          { required: true, message: $t('sensors.requireQos') }, \
        ]")
        template(#input)
          van-radio-group(v-model='formData.qos' direction='horizontal')
            van-radio.mb-1(shape="square" :name='0') QoS 0: {{ $t('sensors.qos0') }}
            van-radio.mb-1(shape="square" :name='1') QoS 1: {{ $t('sensors.qos1') }}
            van-radio.mb-1(shape="square" :name='2') QoS 2: {{ $t('sensors.qos2') }}
      //- 保留消息
      van-field.bg-gray-50.mb-2(name='switch' :label="$t('sensors.retain')")
        template(#input)
          van-switch(v-model='formData.retain' size='20')

  van-popup(v-model='showSubscriptionPicker' position='bottom')
    van-picker(
      show-toolbar
      :title="$t('sensors.subscribed')"
      :columns='subscriptionColumns'
      @confirm='onSubscriptionPicked'
      @cancel='showSubscriptionPicker = false')
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
const showSubscriptionPicker = ref(false)

const formData = reactive({
  id: undefined,
  qos: undefined,
  retain: undefined,
  topic: undefined,
  payload: undefined,
})

const subscriptionColumns = computed(() =>
  map(props.data.subscriptions, (d) => ({
    text: d.topic,
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
    formData.id = value.id
  }
)

function onSubscriptionPicked({ value }) {
  formData.qos = value.qos
  formData.topic = value.topic
  showSubscriptionPicker.value = false
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
    formData.id = undefined
    formData.qos = undefined
    formData.retain = undefined
    formData.topic = undefined
    formData.payload = undefined
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

<style lang="scss" scoped>
:deep(.van-field) {
  .van-field__value input {
    text-overflow: ellipsis;
  }
}
</style>
