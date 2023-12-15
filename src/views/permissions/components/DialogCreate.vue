<template lang="pug">
van-dialog(
  v-model='show'
  :title="$t('permissions.create')"
  :show-cancel-button='true'
  :closeOnClickOverlay='false'
  :beforeClose="beforeClose")
  van-form(
    validate-first
    ref='form')
    van-cell-group.title-basis
      //- 模式
      van-field.bg-gray-50.mb-2(
        v-model='formData.pattern'
        required
        :label="$t('g.pattern')"
        :placeholder="$t('g.plhrPattern')"
        :rules="[ \
          { required: true, message: $t('g.requirePattern') }, \
          { validator: fn, message: $t('g.formatErrPattern') }, \
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
      //- 描述
      van-field.bg-gray-50.mb-2(
        v-model='formData.description'
        type="textarea"
        rows="2"
        autosize
        :label="$t('g.description')"
        :placeholder="$t('g.plhrDescription')")
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { Toast } from 'vant'
import useDicts from '@/utils/useDicts'
import { upload } from '@/utils/fileUpload'
import i18n from '@/lang'
import { map } from 'lodash'
import * as API from '@/api/permission'

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

const r = (v) => v.replace(/\s/g, '').replace(/：/g, ':')
const fn = (v) => /^([A-Za-z]+|\*):([A-Za-z]+|\*):([A-Za-z]+|\*)$/.test(r(v))

const formData = reactive({
  _id: undefined,
  name: undefined,
  description: undefined,
  pattern: undefined,
})

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
    formData._id = value._id
    formData.name = value.name
    formData.description = value.description
    formData.pattern = value.pattern
  }
)

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
  formData._id = undefined
  formData.name = undefined
  formData.description = undefined
  formData.pattern = undefined
}

function onSubmit() {
  Toast.loading()
  return API.createPermission({
    ...formData,
    pattern: r(formData.pattern),
  }).then((res) => {
    Toast.success(i18n.t('g.created'))
    emits('created', res.data)
  })
}
</script>