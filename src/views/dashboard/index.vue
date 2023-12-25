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
      van-cell.head(:title="$t('dashboard.applications')")
      van-empty(v-if='permissions.length == 0' :description="$t('g.noData')")
      template(v-else)
        van-grid(
          clickable
          center
          border
          :column-num="3")

          //- 权限词条
          van-grid-item(
            v-perm="['permissions:*:*']"
            key="permissions"
            :to="{ path: '/permissions' }")
            template(#icon)
              svg-icon(name='database-cog-outline' color="#ee0a24")
            template(#text)
              .label.van-ellipsis {{ $t('dashboard.permissions') }}

          //- 字典词条
          van-grid-item(
            v-perm="['dictionaries:*:*']"
            key="dictionaries"
            :to="{ path: '/dictionaries' }")
            template(#icon)
              svg-icon(name='database-cog-outline' color="#ee0a24")
            template(#text)
              .label.van-ellipsis {{ $t('dashboard.dictionaries') }}

          //- 角色管理
          van-grid-item(
            v-perm="['roles:*:*']"
            :to="{ path: '/roles' }")
            template(#icon)
              svg-icon(name='account-edit' color="#ee0a24")
            template(#text)
              .label.van-ellipsis {{ $t('dashboard.roles') }}

          //- 用户管理
          van-grid-item(
            v-perm="['users:*:*']"
            :to="{ path: '/users' }")
            template(#icon)
              svg-icon(name='account-group' color="#ee0a24")
            template(#text)
              .label.van-ellipsis {{ $t('dashboard.users') }}

          //- 条码查询
          van-grid-item(
            v-perm="['barcodes:query:*']"
            :to="{ path: '/barcode/query' }")
            template(#icon)
              svg-icon(name='barcode-scan')
            template(#text)
              .label.van-ellipsis {{ $t('dashboard.barcodeQuery') }}

          //- 条码管理
          van-grid-item(
            v-perm="['barcodes:management:*']"
            :to="{ path: '/barcode/list' }")
            template(#icon)
              svg-icon(name='barcode')
            template(#text)
              .label.van-ellipsis {{ $t('dashboard.barcodeManagement') }}

          //- 库位码查询
          van-grid-item(
            v-perm="['positions:query:*']"
            :to="{ path: '/position/query' }")
            template(#icon)
              svg-icon(name='qrcode-scan')
            template(#text)
              .label.van-ellipsis {{ $t('dashboard.positionQuery') }}

          //- 库位码管理
          van-grid-item(
            v-perm="['positions:management:*']"
            :to="{ path: '/position/list' }")
            template(#icon)
              svg-icon(name='qrcode')
            template(#text)
              .label.van-ellipsis {{ $t('dashboard.positionManagement') }}

          //- 传感器
          van-grid-item(
            v-perm="['sensors:*:*']"
            :to="{ path: '/sensor/index' }")
            template(#icon)
              svg-icon(name='wifi-cog' color="#07c160")
            template(#text)
              .label.van-ellipsis {{ $t('dashboard.sensors') }}

          //- entrance for test
          include ./fragments/testItems
</template>

<script>
export default {
  name: 'Dashboard',
}
</script>
<script setup>
import { ref, computed, toRef } from 'vue'
import { Toast } from 'vant'
import { useRouter, useRoute } from '@/router'
import useDicts from '@/utils/useDicts'
import useSops from '@/utils/useSops'
import store from '@/store'
import * as API from '@/api/user'
import Avatar from '@/components/Avatar'

const router = useRouter()
const route = useRoute()
const { lut, options } = useDicts()

const permissions = toRef(store.state.user, 'permissions')

// 路由存档
store.commit('route/RESET')
router.archive()
</script>

<style lang="scss" scoped>
.head {
  font-size: 15px;
  font-weight: bold;
  background-color: #f0f2f5;
}
</style>
