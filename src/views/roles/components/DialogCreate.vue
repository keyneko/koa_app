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
      van-field(
        v-model='formData.name'
        required
        :label="$t('name')"
        :placeholder="$t('plhrName')"
        :rules="[ \
          { required: true, message: $t('requireName') }, \
        ]")
      //- 状态
      van-field.bg-gray-50.mb-2(
        readonly
        clickable
        is-link
        required
        arrow-direction="down"
        :label="$t('status')"
        :placeholder="$t('plhrStatus')"
        :value='lut("status", formData.status)'
        @click='showStatusPicker = true')
      //- SOPs
      van-field.bg-gray-50.mb-2(
        :label="$t('sops')")
        template(#input)
          van-checkbox-group(v-model='formData.sops')
            van-checkbox.mb-1(v-for="d in options('sops')" :key="d.value" shape="square" :name='d.value') {{ d.name }}

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
})

const form = ref(null)
const show = ref(false)
const showStatusPicker = ref(false)

const formData = reactive({
  name: '',
  sops: [],
  status: 1,
})

const statusColumns = computed(() =>
  map(options.value('status'), (d) => ({
    text: d.name,
    value: d,
  })),
)

watch(
  () => props.value,
  (value) => {
    show.value = value
  },
)

watch(show, (value) => {
  emits('input', value)
})

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
      resetForm()
    } catch (e) {
      done(false)
    }
  } else {
    done()
    resetForm()
  }
}

function resetForm() {
  formData.name = ''
  formData.sops = []
  formData.status = 1
}

function onSubmit() {
  Toast.loading()
  return API.createRole(formData).then((res) => {
    Toast.success(i18n.t('created'))
    emits('created')
  })
}
</script>

<style lang="scss" scoped>
:deep(.van-field) {
  .van-field__label {
    margin-right: 0;
  }
}
</style>
