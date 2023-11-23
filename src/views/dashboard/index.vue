<template lang="pug">
.page--fixed-header.dashboard
  .page__header
    van-nav-bar(title="Dashboard")
      template(#title)
        van-image.logo(
          fit="contain"
          height='32'
          style="margin-top: 8px;"
          :show-loading="false"
          :src="require('@/assets/logo/logo_white.png')")

  .page__body

</template>

<script>
export default {
  name: 'Dashboard',
}
</script>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount, onActivated } from 'vue'
import { Toast } from 'vant'
import { useRouter, useRoute } from '@/router'
import useScrollPage from '@/utils/useScrollPage'

const router = useRouter()
const route = useRoute()
const { y } = useScrollPage()

// 路由存档
router.archive()
</script>

<style lang="scss" scoped>

</style>
