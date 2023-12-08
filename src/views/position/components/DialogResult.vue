<template lang="pug">
van-dialog(
  v-model='show'
  :title="$t('positionQuery.results')"
  :show-cancel-button='false'
  :closeOnClickOverlay='false')
  van-cell-group.title-basis.mt-4
    van-cell(:title="$t('position')")
      b.black(v-copy) {{ data.value }}
    van-cell(:title="$t('name')")
      | {{ data.name }}
    van-cell(:title="$t('positionGen.isStackable')")
      | {{ data.isStackable == 0? '否': '是' }}
    van-cell(:title="$t('status')")
      | {{ lut('position_status', data.status) }}
    van-cell(:title="$t('pictures')")
      van-row(gutter="10")
        van-col(span="6" v-for="(d, i) in data.files" :key="i")
          van-image(
            :src="d"
            fit="cover"
            style="aspect-ratio: 1"
            @click.native=" \
              ImagePreview({ \
                images: data.files, \
                startPosition: i \
              }) \
            ")
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Toast, ImagePreview } from 'vant'
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
