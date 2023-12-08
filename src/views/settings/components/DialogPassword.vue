<template lang="pug">
van-dialog(
  v-model='show'
  :title="$t('settings.updatePswd')"
  :show-cancel-button='true'
  :closeOnClickOverlay='false'
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
      :placeholder="$t('settings.plhrOldPswd')"
      :rules="[{ required: true, message: $t('settings.requireOldPswd') }]")
    van-field.bg-gray-50.mb-2(
      v-model='formData.newPassword'
      type="password"
      required
      autocomplete="off"
      :placeholder="$t('settings.plhrNewPswd')"
      :rules="[{ required: true, message: $t('settings.requireNewPswd') }]")
    van-field.bg-gray-50(
      v-model='formData.newPasswordRe'
      type="password"
      required
      autocomplete="off"
      :placeholder="$t('settings.plhrRepeatPswd')"
      :rules="[{ validator: v => v == formData.newPassword, message: $t('settings.inconsistentPswd') }]")
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { Toast } from 'vant'
import * as API from '@/api/user'
import i18n from '@/lang'

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
      Toast.success( i18n.t('updated') )
      emit('update')
    })
}
</script>
