<template lang="pug">
//- 设置页
.page--fixed
  .page__header
    van-nav-bar(
      :title="$t('routes.settings')"
      left-arrow
      @click-left="$router.back()")

  .page__body
    van-cell-group(inset).mb-4
      van-cell(center).text-white.bg-primary
        template(#icon)
          Avatar.mr-4(size="48px")
        template(#title)
          .b {{ username }}
          .tel(v-if="name") {{ name }}

    van-cell-group.mb-4(inset)
      van-cell(:title="$t('settings.switchLang')" center)
        LangSelect(:showText="true" @switched="update")
      van-cell(:title="$t('settings.updateName')" is-link  @click="showDialogName = true")
      van-cell(:title="$t('settings.updatePswd')" is-link  @click="showDialogPassword = true")
      van-cell(:title="$t('settings.updateAvatar')" is-link  @click="showDialogAvatar = true")

    van-cell-group(inset)
      van-button.r8(type='default' block @click='logoutCfm') {{ $t('settings.logout') }}

  //- 对话框
  DialogName(v-model="showDialogName" @update="update")
  DialogAvatar(v-model="showDialogAvatar" @update="update")
  DialogPassword(v-model="showDialogPassword" @update="update")
</template>

<script setup>
import { ref, toRef, computed, provide } from 'vue'
import { Toast, Dialog } from 'vant'
import { useRouter, useRoute } from '@/router'
import store from '@/store'
import i18n from '@/lang'

import Avatar from '@/components/Avatar'
import LangSelect from '@/components/LangSelect'
import DialogName from './components/DialogName'
import DialogAvatar from './components/DialogAvatar'
import DialogPassword from './components/DialogPassword'

const router = useRouter()
const route = useRoute()

const name = toRef(store.getters, 'name')
const avatar = toRef(store.getters, 'avatar')
const username = toRef(store.getters, 'username')
provide('name', name)
provide('avatar', avatar)

const showDialogName = ref(false)
const showDialogAvatar = ref(false)
const showDialogPassword = ref(false)

// 登出
function logoutCfm() {
  Dialog.confirm({
    title: i18n.t('settings.logoutCfm'),
    message: i18n.t('settings.logoutCfmMsg'),
  }).then(async() => {
    try {
      Toast.loading()
      await store.dispatch('user/logout')
      Toast.clear()
      router.push(`/login?redirect=${route.fullPath}`)
    }
    catch (e) {}
  })
}

function update() {
  Toast.loading()
  return store.dispatch('user/getUser').finally(() => {
    Toast.clear()
  })
}
</script>

<style lang="scss">
.van-dropdown-menu__bar {
  height: auto;
  justify-content: flex-end;
}
.van-dropdown-menu__item {
  justify-content: end;
  justify-content: flex-end;
}
.van-dropdown-item {
  .van-overlay {
    background-color: transparent;
  }
  .van-dropdown-item__content {
    left: 15px;
    width: calc(100% - 30px);
    box-shadow: 1px 2px 10px rgb(100 101 102 / 30%);
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    margin-top: 12px;
  }
}
</style>
