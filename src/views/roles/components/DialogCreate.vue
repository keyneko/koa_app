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
      //- 标识符
      van-field.bg-gray-50.mb-2(
        v-model='formData.value'
        required
        :label="$t('g.identifier')"
        :placeholder="$t('g.plhrIdentifier')"
        :rules="[ \
          { required: true, message: $t('g.requireIdentifier') }, \
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
      //- 权限
      van-field.bg-gray-50.mb-2(
        :label="$t('g.permissions')")
        template(#input)
          van-checkbox-group.max-h-64.overflow-y-auto(v-model='formData.permissions')
            van-checkbox.mb-1(v-for="d in options('permissions')" :key="d.value" shape="square" :name='d.value') {{ d.value }}
      //- //- SOPs
      //- van-field.bg-gray-50.mb-2(
      //-   :label="$t('g.sops')")
      //-   template(#input)
      //-     van-checkbox-group(v-model='formData.sops')
      //-       van-checkbox.mb-1(v-for="d in options('sops')" :key="d.value" shape="square" :name='d.value') {{ d.name }}
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
  value: undefined,
  name: undefined,
  isProtected: undefined,
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
    formData.value = undefined
    formData.name = undefined
    formData.isProtected = undefined
    formData.sops = []
    formData.permissions = []
  }, 200)
}

function onSubmit() {
  Toast.loading()
  return API.createRole({
    ...formData,
    value: formData.value.trim(),
  }).then((res) => {
    Toast.success(i18n.t('g.created'))
    emits('created')
  })
}
</script>
