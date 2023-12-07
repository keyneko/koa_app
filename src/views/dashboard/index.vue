<template lang="pug">
.page--fixed-header.dashboard
  .page__header
    van-nav-bar(:title="$t('routes.dashboard')")
      template(#title)
        van-image.logo(
          fit="contain"
          height='32'
          style="margin-top: 8px;"
          :show-loading="false"
          :src="require('@/assets/logo/logo_white.png')")
      template(#right)
        router-link(to='/settings')
          Avatar(data-testid="avatar")

  .page__body
    van-cell-group(inset)
      van-cell.head(:title="$t('dashboard.mySkills')")
      van-grid(
        clickable
        center
        border
        :column-num="3")
        van-grid-item(:to="toGenerate")
          template(#icon)
            svg-icon(name='条码查询')
          template(#text)
            .label.van-ellipsis {{ $t('dashboard.barcodeGenerate') }}
        van-grid-item(:to="toQuery")
          template(#icon)
            svg-icon(name='条码查询')
          template(#text)
            .label.van-ellipsis {{ $t('dashboard.barcodeQuery') }}
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
import * as API from '@/api/user'
import store from '@/store'
import Avatar from '@/components/Avatar'

const router = useRouter()
const route = useRoute()
useScrollPage()

// 路由存档
router.archive()

const toGenerate = computed(() => ({
  path: '/barcode/generate',
  query: {},
}))

const toQuery = computed(() => ({
  path: '/barcode/query',
  query: {},
}))
</script>

<style lang="scss" scoped>
.head {
  font-size: 15px;
  font-weight: bold;
  background-color: #f0f2f5;
}
</style>
