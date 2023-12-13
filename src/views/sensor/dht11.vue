<template lang="pug">
.page
  .page__header
    van-nav-bar(
      title="Dht11"
      left-arrow
      @click-left="$router.back()")
  .page__body
    Chart.mx-4(:data="ds" :height="400")
</template>

<script setup>
import { ref, reactive, computed, onBeforeUnmount } from 'vue'
import { Toast } from 'vant'
import { useRouter, useRoute } from '@/router'
import Chart from './components/dht11.vue'
import * as API from '@/api/test' // mock api for test

const router = useRouter()
const route = useRoute()

const buttonLoading = ref(false)

// 数据源DataSource
const ds = ref({})

function update() {
  Toast.loading()

  // 异步请求数据
  API.plopLine()
    .then((res) => {
      console.log(res)

      if (res.code == 200) {
        ds.value = res.data
      }
    })
    .finally(() => {
      Toast.clear()
    })
}

const timer = setInterval(update, 3000)
update()

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>
