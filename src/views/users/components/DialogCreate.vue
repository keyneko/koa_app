<template lang="pug">
van-dialog(
  v-model='show'
  :title="$t('users.create')"
  :show-cancel-button='true'
  :closeOnClickOverlay='false'
  :beforeClose="beforeClose")
  van-form(
    validate-first
    ref='form')
    van-cell-group.title-basis
      //- 用户名
      van-field.bg-gray-50.mb-2(
        v-model='formData.username'
        required
        :label="$t('g.username')"
        :placeholder="$t('g.plhrUsername')"
        :rules="[ \
          { required: true, message: $t('g.requireUsername') }, \
          { pattern: /^[a-z][a-z0-9_]*$/, message: $t('g.invalidUsername') }, \
        ]")
      //- 初始密码
      van-field.mb-2(
        readonly
        disabled
        :value='formData.password'
        :label="$t('g.initialPassword')"
        )
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
      //- 角色
      van-field.bg-gray-50.mb-2.scrollable(
        :label="$t('g.roles')")
        template(#input)
          van-checkbox-group(v-model='formData.roles')
            van-checkbox.mb-1(v-for="d in options('roles')" :key="d.value" shape="square" :name='d.value') {{ d.name }}
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { Toast } from 'vant'
import useDicts from '@/utils/useDicts'
import { upload } from '@/utils/fileUpload'
import { encrypt } from '@/utils/jsencrypt'
import i18n from '@/lang'
import { map } from 'lodash'
import * as roleApi from '@/api/role'
import * as API from '@/api/user'

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

const roles = ref([])
const formData = reactive({
  username: undefined,
  password: '123456',
  name: undefined,
  isProtected: undefined,
  roles: [],
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
    formData.username = undefined
    formData.name = undefined
    formData.isProtected = undefined
    formData.roles = []
  }, 200)
}

function onSubmit() {
  Toast.loading()
  return API.createUser({
    ...formData,
    password: encrypt(formData.password),
  }).then((res) => {
    Toast.success(i18n.t('g.created'))
    emits('created')
  })
}
</script>
