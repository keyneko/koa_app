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
      template(#right)
        Avatar(data-testid="avatar")

  .page__body
    van-cell-group.mb-4.title-basis(inset)
      van-cell(v-for="d in users" :key="d.id" center)
        template(#title)
          b {{ d.username }}
        template
          van-button.mr-2(type="general" size="small" v-copy="d.token") 复制token
          van-button(type="danger" size="small" @click="onDelete(d)") 删除用户
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
const { y } = useScrollPage()

const users = ref([])

// 路由存档
router.archive()

// function getUser() {
//   return store.dispatch('user/getUser')
// }

function getUsers() {
  Toast.loading()
  return API.getUsers()
    .then((res) => {
      users.value = res.data
    })
    .finally(() => {
      Toast.clear()
    })
}

function onDelete(d) {
  Toast.loading()
  return API.deleteUser(d.id)
    .then((res) => {
      this.getUsers()
    })
    .finally(() => {
      Toast.clear()
    })
}

// getUsers()
// getUser()
</script>

<style lang="scss" scoped></style>
