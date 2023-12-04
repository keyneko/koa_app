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
    van-cell-group.mb-4.title-basis(inset)
      van-cell(v-for="d in users" :key="d.id" :title='d.username')
        .van-multi-ellipsis--l2.break-all(v-copy) {{ d.token }}
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

const router = useRouter()
const route = useRoute()
const { y } = useScrollPage()

const users = ref([])

// 路由存档
router.archive()

function getUsers() {
  return API.getUsers().then(res => {
    users.value = res.data
  })
}

getUsers()
</script>

<style lang="scss" scoped>

</style>
