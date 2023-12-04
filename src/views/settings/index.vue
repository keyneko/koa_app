<template lang="pug">
//- 设置页
.page--fixed
  .page__header
    van-nav-bar(
      title="设置"
      left-arrow
      @click-left="$router.back()")

  .page__body
    van-cell-group(inset).profile
      van-cell(center)
        //- 头像
        template(#icon)
          Avatar
        //- 昵称
        template(#title)
          .font-bold {{ username }}
          .tel {{ name || '--' }}

    van-cell-group.mb-4(inset)
      van-cell(title="切换语言" center)
        LangSelect(:showText="true")

      van-cell(title="更新昵称" is-link  @click="showDialog = true")
      van-cell(title="更新头像" is-link  @click="showDialog = true")
      van-cell(title="更新密码" is-link  @click="showDialog = true")

    van-cell-group(inset)
      van-button.r8(type='default' block @click='logoutCfm') 退出登录

  //- 修改密码对话框
  DialogName(v-model="showDialog" @update="update")
</template>

<script setup>
import { ref, toRef, computed } from 'vue'
import { Toast, Dialog } from 'vant'
import { useRouter, useRoute } from '@/router'
import store from '@/store'
import storage from 'store2'

import Avatar from '@/components/Avatar'
import LangSelect from '@/components/LangSelect'
import DialogName from './components/DialogName'

const router = useRouter()
const route = useRoute()

const name = toRef(store.getters, 'name')
const username = toRef(store.getters, 'username')

const showDialog = ref(false)

// 登出
function logoutCfm() {
  Dialog.confirm({
    title: '确认登出',
    message: '确定注销并退出系统吗？',
  }).then(async () => {
    try {
      Toast.loading()
      await store.dispatch('user/logout')
      Toast.clear()
      router.push(`/login?redirect=${route.fullPath}`)
    } catch (e) {}
  })
}

function update() {
  Toast.loading
  return store.dispatch('user/getUser').finally(() => {
    Toast.clear()
  })
}
</script>

<style lang="scss">
$bg: #f0f2f5;
$main_color: #1989fa;
$dark_gray: #889aa4;
$light_gray: #eee;
$border-radius: 8px;

.profile {
  margin: 15px;
  border-radius: $border-radius;

  .avatar-wrapper {
    margin-right: 15px;
    img {
      width: 50px;
      height: 50px;
    }
  }

  .van-cell {
    color: #fff;
    background-color: $main_color;

    .tel {
      letter-spacing: 1px;
    }
  }
}

.van-dropdown-menu__bar {
  height: auto;
  justify-content: flex-end;
}
.van-dropdown-menu__item {
  justify-content: end;
  justify-content: flex-end;
}
.van-dropdown-menu__title {
  padding-left: 0;
  font-size: inherit;
}
.van-dropdown-item {
  .van-overlay {
    background-color: transparent;
  }
  .van-dropdown-item__content {
    left: 15px;
    width: calc(100% - 30px);
    box-shadow: 1px 2px 10px rgb(100 101 102 / 30%);
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
    margin-top: 12px;
  }
}

.van-cell__value {
  overflow: visible;
}
</style>
