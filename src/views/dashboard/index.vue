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

        //- 权限词条
        van-grid-item(
          v-perm="['permissions:*:*']"
          key="permissions"
          :to="{ path: '/permissions' }")
          template(#icon)
            svg-icon(name='database-cog-outline' color="#ee0a24")
          template(#text)
            .label.van-ellipsis {{ $t('dashboard.permissions') }}

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

        //- 条码生成
        van-grid-item(
          v-perm="['barcodes:create:*']"
          :to="{ path: '/barcode/generate' }")
          template(#icon)
            svg-icon(name='barcode')
          template(#text)
            .label.van-ellipsis {{ $t('dashboard.barcodeGenerate') }}

        //- 条码管理
        van-grid-item(
          v-perm="['barcodes:management:*']"
          :to="{ path: '/barcode/query' }")
          template(#icon)
            svg-icon(name='barcode-scan')
          template(#text)
            .label.van-ellipsis {{ $t('dashboard.barcodeQuery') }}

        //- 库位码生成
        van-grid-item(
          v-perm="['positions:create:*']"
          :to="{ path: '/position/generate' }")
          template(#icon)
            svg-icon(name='qrcode')
          template(#text)
            .label.van-ellipsis {{ $t('dashboard.positionGenerate') }}

        //- 库位码管理
        van-grid-item(
          v-perm="['positions:management:*']"
          :to="{ path: '/position/query' }")
          template(#icon)
            svg-icon(name='qrcode-scan')
          template(#text)
            .label.van-ellipsis {{ $t('dashboard.positionQuery') }}

        //- 传感器
        van-grid-item(
          v-perm="['sensors:*:*']"
          :to="{ path: '/sensor/index' }")
          template(#icon)
            svg-icon(name='wifi-cog')
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
</script>

<style lang="scss" scoped>
.head {
  font-size: 15px;
  font-weight: bold;
  background-color: #f0f2f5;
}
</style>
