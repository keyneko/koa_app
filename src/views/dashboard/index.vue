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
      van-empty(v-if='sops.length == 0' image-size="64" :description="$t('noData')")
      template(v-else)
        van-grid(
          clickable
          center
          border
          :column-num="3")
          van-grid-item(
            v-for="(sop, i) in sops"
            :key="i"
            :to="{path: getEntryPath(sop)}")
            template(#icon)
              svg-icon(:name='sopIcon(sop)')
            template(#text)
              .label.van-ellipsis {{ lut('sops', sop) }}
</template>

<script>
export default {
  name: 'Dashboard',
}
</script>
<script setup>
import { ref, computed } from 'vue'
import { Toast } from 'vant'
import { useRouter, useRoute } from '@/router'
import useDicts from '@/utils/useDicts'
import useSops from '@/utils/useSops'
import * as API from '@/api/user'
import Avatar from '@/components/Avatar'

const router = useRouter()
const route = useRoute()
const { lut, options } = useDicts()
const { sops, sopIcon, getEntryPath } = useSops()
</script>

<style lang="scss" scoped>
.head {
  font-size: 15px;
  font-weight: bold;
  background-color: #f0f2f5;
}
</style>
