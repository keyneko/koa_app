<template lang="pug">
van-dialog(
  v-model='show'
  :title="$t('roles.create')"
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
      //- 权限
      van-field.bg-gray-50.mb-2(
        :label="$t('permissions')")
        template(#input)
          van-checkbox-group(v-model='formData.permissions')
            van-checkbox.mb-1(v-for="d in options('permissions')" :key="d.value" shape="square" :name='d.value') {{ d.name }}（{{ d.value }}）
      //- SOPs
      van-field.bg-gray-50.mb-2(
        :label="$t('sops')")
        template(#input)
          van-checkbox-group(v-model='formData.sops')
            van-checkbox.mb-1(v-for="d in options('sops')" :key="d.value" shape="square" :name='d.value') {{ d.name }}
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { Toast } from 'vant'
import useDicts from '@/utils/useDicts'
import { upload } from '@/utils/fileUpload'
import i18n from '@/lang'
import { map } from 'lodash'
import * as API from '@/api/role'

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

const formData = reactive({
  name: '',
  sops: [],
  permissions: [],
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
  formData.sops = []
  formData.permissions = []
}

function onSubmit() {
  Toast.loading()
  return API.createRole(formData).then((res) => {
    Toast.success(i18n.t('created'))
    emits('created')
  })
}
</script>
