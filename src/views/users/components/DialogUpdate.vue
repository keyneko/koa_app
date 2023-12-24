<template lang="pug">
van-dialog(
  v-model='show'
  :title="$t('users.update')"
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
      van-field.bg-gray-50.mb-2(name='switch' :label="$t('g.protected')")
        template(#input)
          van-switch(v-model='formData.isProtected' size='20')
      //- 角色
      van-field.bg-gray-50.mb-2.scrollable(
        :label="$t('g.roles')")
        template(#input)
          van-checkbox-group(v-model='formData.roles')
            van-checkbox.mb-1(v-for="d in options('roles')" :key="d.value" shape="square" :name='d.value') {{ d.name }}
      //- 权限
      van-field.bg-gray-50.mb-2.scrollable(
        :label="$t('g.permissions')")
        template(#input)
          van-checkbox-group(v-model='formData.permissions')
            van-checkbox.mb-1(v-for="d in data.permissions" :key="d" shape="square" :name='d') {{ d }}

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
import { map, difference } from 'lodash'
import * as roleApi from '@/api/role'
import * as API from '@/api/user'

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

const roles = ref([])
const formData = reactive({
  username: undefined,
  name: undefined,
  status: undefined,
  isProtected: undefined,
  roles: [],
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
    formData.username = value.username
    formData.name = value.name
    formData.status = value.status
    formData.isProtected = value.isProtected
    formData.roles = value.roles
    formData.permissions = difference(value.permissions, value.denyPermissions)
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
    formData.username = undefined
    formData.name = undefined
    formData.status = undefined
    formData.isProtected = undefined
    formData.roles = []
    formData.permissions = []
  }, 200)
}

function onSubmit() {
  Toast.loading()
  return API.updateUser({
    ...formData,
    denyPermissions: difference(props.data.permissions, formData.permissions),
    permissions: undefined,
  }).then((res) => {
    Toast.success(i18n.t('g.updated'))
    emits('updated')
  })
}
</script>
