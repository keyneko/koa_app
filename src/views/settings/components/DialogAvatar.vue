<template lang="pug">
van-dialog(
  v-model='show'
  :title="$t('settings.updateAvatar')"
  :show-cancel-button='true'
  :closeOnClickOverlay='false'
  :beforeClose="beforeClose")
  van-form(
    validate-first
    ref='form'
    @submit="onSubmit")
    van-field(
      required
      :rules="[{ required: true, message: $t('settings.requireAvatar') }]")
      template(#input)
        van-uploader(
          v-model="files"
          :before-read="fileUpload"
          :preview-image="false"
          :deletable="false")
    van-cell
      .h-60
        vue-cropper(
          ref='cropper'
          :img='(files[0]||{}).url'
          :autoCrop="true"
          :autoCropWidth="100"
          :autoCropHeight="100"
          :canScale="true"
          :canMove="false"
          :canMoveBox="true"
          :fixed="true"
          :infoTrue="true"
          :full="false"
          :centerBox="true"
          :outputSize='.6'
          mode="contain"
          outputType='png')
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { Toast } from 'vant'
import * as API from '@/api/user'
import i18n from '@/lang'
import { VueCropper } from 'vue-cropper'
import { base64ToFile, upload } from '@/utils/fileUpload'

const buttonLoading = ref(false)
const form = ref(null)
const cropper = ref(null)
const show = ref(false)
const emit = defineEmits(['update'])

const files = ref([])
const formData = reactive({
  avatar: '',
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
  files.value = []
  formData.avatar = ''
}

function fileUpload(f) {
  files.value = [{ url: URL.createObjectURL(f) }]
  return false
}

function getCropData() {
  return new Promise((resolve) => {
    cropper.value.getCropData((data) => {
      resolve(data)
    })
  })
}

async function beforeClose(action, done) {
  if (action === 'confirm') {
    try {
      await form.value.validate()

      Toast.loading()
      const data = await getCropData()
      const file = base64ToFile(data)
      const res = await upload(file)
      formData.avatar = res.data
      await onSubmit()
      Toast.clear()

      resetForm()
      done()
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
  return API.updateUser(formData).then((res) => {
    Toast.success( i18n.t('updated') )
    emit('update')
  })
}
</script>
