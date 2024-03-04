<template lang="pug">
van-dialog(
  v-model='show'
  :title="$t('dictionary.update')"
  :show-cancel-button='true'
  :closeOnClickOverlay='false'
  :beforeClose="beforeClose")
  van-form(
    validate-first
    ref='form')
    van-cell-group.title-basis
      //- key
      van-field.mb-2(
        readonly
        :value='formData.key'
        :label="$t('dictionary.key')"
        :placeholder="$t('dictionary.plhrKey')")
      //- value
      van-field.mb-2(
        readonly
        v-model='formData.value'
        :label="$t('dictionary.value')"
        :placeholder="$t('dictionary.plhrValue')")
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
      //- 状态
      van-field.bg-gray-50.mb-2(
        readonly
        clickable
        is-link
        arrow-direction="down"
        :label="$t('g.status')"
        :placeholder="$t('g.plhrStatus')"
        :value='lut("status", formData.status)'
        @click='showStatusPicker = true')

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
import * as API from '@/api/dicts'

const emits = defineEmits([])
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

const fn = (v) => /^[a-z]+(_[0-9a-z]+)*$/.test(v)

const formData = reactive({
  id: undefined,
  key: undefined,
  value: undefined,
  name: undefined,
  isProtected: undefined,
  status: undefined,
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
  if (!value) {
    resetForm()
  }
})

watch(
  () => props.data,
  (value) => {
    formData.id = value.id
    formData.key = value.key
    formData.value = value.value
    formData.name = value.name
    formData.isProtected = value.isProtected
    formData.status = value.status
  }
)

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
    formData.id = undefined
    formData.key = undefined
    formData.value = undefined
    formData.name = undefined
    formData.isProtected = undefined
    formData.status = undefined
  }, 200)
}

function onSubmit() {
  Toast.loading()
  return API.updateDictionary({
    ...formData,
  }).then((res) => {
    Toast.success(i18n.t('g.updated'))
    emits('updated')
  })
}
</script>
