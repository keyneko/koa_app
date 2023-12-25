<template lang="pug">
van-dialog(
  v-model='show'
  :title="$t('dictionary.create')"
  :show-cancel-button='true'
  :closeOnClickOverlay='false'
  :beforeClose="beforeClose")
  van-form(
    validate-first
    ref='form')
    van-cell-group.title-basis
      //- key
      van-field.bg-gray-50.mb-2(
        v-model='formData.key'
        required
        :label="$t('dictionary.key')"
        :placeholder="$t('dictionary.plhrKey')"
        :rules="[ \
          { required: true, message: $t('dictionary.requireKey') }, \
          { validator: fn, message: $t('dictionary.formatErrKey') }, \
        ]")
      //- value
      van-field.bg-gray-50.mb-2(
        v-model='formData.value'
        required
        type="number"
        :label="$t('dictionary.value')"
        :placeholder="$t('dictionary.plhrValue')"
        :rules="[ \
          { required: true, message: $t('dictionary.requireValue') }, \
        ]")
      //- 名称
      van-field.bg-gray-50.mb-2(
        v-model='formData.name'
        required
        :label="$t('g.name')"
        :placeholder="$t('g.plhrName')"
        :rules="[ \
          { required: true, message: $t('g.requireName') }, \
        ]")
      //- 受保护
      van-field.bg-gray-50.mb-2(name='switch' :label="$t('g.protected')")
        template(#input)
          van-switch(v-model='formData.isProtected' size='20')
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { Toast } from 'vant'
import useDicts from '@/utils/useDicts'
import { upload } from '@/utils/fileUpload'
import bus from '@/utils/bus'
import i18n from '@/lang'
import { map } from 'lodash'
import * as API from '@/api/dicts'

const emits = defineEmits([])
const { lut, options } = useDicts()

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
})

const form = ref(null)
const show = ref(false)

const fn = (v) => /^[a-z]+(_[0-9a-z]+)*$/.test(v)

const formData = reactive({
  key: undefined,
  value: undefined,
  name: undefined,
  isProtected: undefined,
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
    formData.key = undefined
    formData.value = undefined
    formData.name = undefined
    formData.isProtected = undefined
  }, 200)
}

function onSubmit() {
  Toast.loading()
  return API.createDictionary({
    ...formData,
  }).then((res) => {
    Toast.success(i18n.t('g.created'))
    emits('created')
    bus.$emit('dictionary.created', res.data)
  })
}
</script>
