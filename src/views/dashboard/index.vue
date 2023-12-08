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
        van-grid-item(:to="toBarcodeGenerate")
          template(#icon)
            svg-icon(name='条码查询')
          template(#text)
            .label.van-ellipsis {{ $t('dashboard.barcodeGenerate') }}
        van-grid-item(:to="toBarcodeQuery")
          template(#icon)
            svg-icon(name='条码查询')
          template(#text)
            .label.van-ellipsis {{ $t('dashboard.barcodeQuery') }}
        van-grid-item(:to="toPositionGenerate")
          template(#icon)
            svg-icon(name='条码查询')
          template(#text)
            .label.van-ellipsis {{ $t('dashboard.positionGenerate') }}
        van-grid-item(:to="toPositionQuery")
          template(#icon)
            svg-icon(name='条码查询')
          template(#text)
            .label.van-ellipsis {{ $t('dashboard.positionQuery') }}
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

const toBarcodeGenerate = computed(() => ({
  path: '/barcode/generate',
  query: {},
}))

const toBarcodeQuery = computed(() => ({
  path: '/barcode/query',
  query: {},
}))

const toPositionGenerate = computed(() => ({
  path: '/position/generate',
  query: {},
}))

const toPositionQuery = computed(() => ({
  path: '/position/query',
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
