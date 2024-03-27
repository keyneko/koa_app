<template lang="pug">
van-pull-refresh.flex-1(v-model='refreshing' @refresh='onRefresh')
  van-empty(v-if='list.length == 0' description="暂无数据")
  template(v-else)
    van-list(
      v-model='loading'
      :finished='finished'
      :immediate-check='false'
      :offset='10'
      @load='onLoad')
      van-cell-group(inset)
        van-collapse(v-model='activeName' accordion)
          van-collapse-item(v-for="d in list" :key="d.id" :name='d.id')
            template(#title)
              b.ignore(v-copy.silent) {{ d.key }}
              span.gray &nbsp;[{{ d.name }}]
            template
              .van-ellipsis {{ $t('g.name') }}: {{ d.name }}
              .van-ellipsis {{ $t('dictionary.value') }}: {{ d.value }}
              .van-ellipsis {{ $t('g.status') }}: {{ lut('status', d.status) }}
              .text-right
                van-button.ml-2(
                  size="small"
                  type="danger"
                  @click="emits('delete', d)"
                  ) {{ $t('g.delete') }}
                van-button.ml-2(
                  size="small"
                  type="general"
                  @click="emits('update', d)"
                  ) {{ $t('g.update') }}
</template>

<script setup>
import { ref, computed } from 'vue'
import { Toast, ImagePreview } from 'vant'
import useDicts from '@/utils/useDicts'
import bus from '@/utils/bus'

const { lut, options } = useDicts()

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  total: {
    type: Number,
    default: 1,
  },
})

const emits = defineEmits(['input'])
const refreshing = ref(false)
const loading = ref(false)
const finished = ref(false)
const pageNum = ref(1)
const activeName = ref('')

bus.$on('dictionary.created', (id) => {
  activeName.value = id
})

function onRefresh() {
  pageNum.value = 1
  emits('fetch', 1)

  setTimeout(() => {
    finished.value = false
    loading.value = false
    refreshing.value = false
  }, 1000)
}

function onLoad() {
  if (pageNum.value < props.total) {
    pageNum.value++
    emits('fetch', pageNum.value)
  }
  else {
    finished.value = true
  }
  loading.value = false
}
</script>
