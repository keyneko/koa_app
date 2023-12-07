<template lang="pug">
van-pull-refresh.flex-1(v-model='refreshing' @refresh='onRefresh')
  van-empty(v-if='list.length == 0' description="暂无数据")
  template(v-else)
    van-list(v-model='loading' :finished='finished' :immediate-check='false' :offset='10' @load='onLoad')

      transition-group(
        tag="div"
        enter-active-class='fadeInRight'
        leave-active-class='fadeOutLeft'
        )
        .animated.faster(v-for="d in list" :key="d._id")
          van-cell-group.title-basis.mb-4(inset)
            van-cell(center)
              template(#icon)
                van-image.mr-4(
                  width='64'
                  height='64'
                  radius="3"
                  lazy-load
                  fit="contain"
                  :src="d.files[0]"
                  @click.native.stop="ImagePreview(d.files)")
              template
                .van-ellipsis
                  span 条码：
                  b.black(v-copy) {{ d.value }}
                .van-ellipsis
                  span 名称：
                  | {{ d.name }}
                .van-ellipsis
                  span 状态：
                  | {{ lut('barcode_status', d.status) }}
            van-cell(value)
              template(#extra)
                van-button.ml-2(
                  size="small"
                  type="danger"
                  @click="emits('delete', d)"
                  ) 删除条码
                van-button.ml-2(
                  size="small"
                  type="general"
                  @click="emits('detail', d)"
                  ) 查看详情
</template>

<script setup>
import { ref, computed } from 'vue'
import { Toast, ImagePreview } from 'vant'
import useDicts from '@/utils/useDicts'

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
const emits = defineEmits(['update'])
const refreshing = ref(false)
const loading = ref(false)
const finished = ref(false)
const pageNum = ref(1)

function onRefresh() {
  pageNum.value = 1
  emits('update', 1)

  setTimeout(() => {
    Toast.success('刷新成功')

    finished.value = false
    loading.value = false
    refreshing.value = false
  }, 1000)
}

function onLoad() {
  if (pageNum.value < props.total) {
    pageNum.value++
    emits('update', pageNum.value)
  } else {
    finished.value = true
  }
  loading.value = false
}
</script>
