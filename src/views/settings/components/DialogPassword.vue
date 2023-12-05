<template lang="pug">
van-dialog(
  v-model='show'
  title="更新密码"
  :show-cancel-button='true'
  :closeOnClickOverlay='true'
  :beforeClose="beforeClose")
  van-form(
    validate-first
    ref='form'
    @submit="onSubmit")
    van-field.bg-gray-50.mb-2(
      v-model='formData.password'
      type="password"
      required
      autocomplete="off"
      placeholder="请输入原密码"
      :rules="[{ required: true, message: '原密码不能为空' }]")
    van-field.bg-gray-50.mb-2(
      v-model='formData.newPassword'
      type="password"
      required
      autocomplete="off"
      placeholder="请输入新密码"
      :rules="[{ required: true, message: '新密码不能为空' }]")
    van-field.bg-gray-50(
      v-model='formData.newPasswordRe'
      type="password"
      required
      autocomplete="off"
      placeholder="请重复新密码"
      :rules="[{ validator: v => v == formData.newPassword, message: '新密码不一致' }]")
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { Toast } from 'vant'
import * as API from '@/api/user'

const buttonLoading = ref(false)
const form = ref(null)
const show = ref(false)
const emit = defineEmits(['update'])

const formData = reactive({
  password: '',
  newPassword: '',
  newPasswordRe: '',
})

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
})

watch(
  () => props.value,
  (value) => {
    show.value = value
  },
)

watch(show, (value) => {
  emit('input', value)
})

function resetForm() {
  formData.password = ''
  formData.newPassword = ''
  formData.newPasswordRe = ''
  form.value.resetValidation()
}

async function beforeClose(action, done) {
  if (action === 'confirm') {
    try {
      await form.value.validate()
      await onSubmit()
      done()
      resetForm()
    } catch (e) {
      done(false)
    }
  } else {
    done()
    resetForm()
  }
}

function onSubmit() {
  Toast.loading()
  return API.updateUser(formData)
    .then((res) => {
      Toast.success('密码更新成功')
      emit('update')
    })
}
</script>
