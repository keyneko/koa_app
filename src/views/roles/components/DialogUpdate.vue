<template lang="pug">
van-dialog(
  v-model='show'
  :title="$t('roles.update')"
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
      //- 状态
      van-field.bg-gray-50.mb-2(
        readonly
        clickable
        is-link
        required
        arrow-direction="down"
        :label="$t('g.status')"
        :placeholder="$t('g.plhrStatus')"
        :value='lut("status", formData.status)'
        @click='showStatusPicker = true')
      //- 受保护
      van-field(name='switch' :label="$t('g.protected')")
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
import * as API from '@/api/role'

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
const showStatusPicker = ref(false)

const formData = reactive({
  value: undefined,
  name: undefined,
  status: undefined,
  isProtected: undefined,
  sops: [],
  permissions: [],
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
    formData.value = value.value
    formData.name = value.name
    formData.status = value.status
    formData.isProtected = value.isProtected
    formData.sops = value.sops
    formData.permissions = value.permissions
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
    formData.value = undefined
    formData.name = undefined
    formData.status = undefined
    formData.isProtected = undefined
    formData.sops = []
    formData.permissions = []
  }, 200)
}

function onSubmit() {
  Toast.loading()
  return API.updateRole(formData).then((res) => {
    Toast.success(i18n.t('g.updated'))
    emits('updated')
  })
}
</script>
