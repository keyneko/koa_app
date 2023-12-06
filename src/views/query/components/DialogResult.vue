<template lang="pug">
van-dialog(
  v-model='show'
  title="查询结果"
  :show-cancel-button='false'
  :closeOnClickOverlay='true')
  van-cell-group.title-basis.mt-4
    van-cell(title="条码：")
      b.black(v-copy) {{ data.value }}
    van-cell(title="名称：")
      | {{ data.name }}
    van-cell(title="数量：")
      | {{ data.quantity }}{{ data.basicUnit }}
    van-cell(title="状态：")
      | {{ lut('barcode_status', data.status) }}
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Toast } from 'vant'
import useDicts from '@/utils/useDicts'

const emit = defineEmits(['input'])
const { lut } = useDicts()

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: {},
  },
})

const show = ref(false)

watch(
  () => props.value,
  (value) => {
    show.value = value
  },
)

watch(show, (value) => {
  emit('input', value)
})
</script>
