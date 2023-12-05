<template lang="pug">
van-dialog(
  v-model='show'
  title="更新昵称"
  :show-cancel-button='true'
  :closeOnClickOverlay='true'
  :beforeClose="beforeClose")
  van-form(
    validate-first
    ref='form'
    @submit="onSubmit")
    van-field.bg-gray-50(
      v-model='formData.name'
      required
      autocomplete="off"
      placeholder="请输入昵称"
      :rules="[{ required: true, message: '昵称不能为空' }]")
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
  name: '',
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
  formData.name = ''
  form.value.resetValidation()
}

function beforeClose(action, done) {
  if (action === 'confirm') {
    form.value
      .validate()
      .then(async () => {
        await form.value.submit()
        done()
      })
      .catch(() => {
        done(false)
      })
  } else {
    resetForm()
    done()
  }
}

function onSubmit() {
  Toast.loading()
  return API.updateUser(formData)
    .then((res) => {
      resetForm()
      emit('update')
    })
    .finally(() => {
      Toast.clear()
    })
}
</script>
