<template lang="pug">
van-dialog(
  v-model='show'
  :title="$t('settings.updateName')"
  :show-cancel-button='true'
  :closeOnClickOverlay='false'
  :beforeClose="beforeClose")
  van-form(
    validate-first
    ref='form'
    @submit="onSubmit")
    van-field.bg-gray-50(
      v-model='formData.name'
      required
      autocomplete="off"
      :placeholder="$t('settings.plhrName')"
      :rules="[{ required: true, message: $t('settings.requireName') }]")
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
      Toast.success( i18n.t('settings.nameUpdated') )
      resetForm()
      emit('update')
    })
}
</script>
