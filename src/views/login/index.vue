<template lang="pug">
.page--fixed
  .page__header
    van-nav-bar(:title="$t('route.login')" left-arrow)
      template(#left): div

  .page__body.flex.items-center.justify-center
    van-form(
      validate-first
      @submit='onSubmit'
      ref='form')

      .text-center.mb-4
        van-image.logo(
          fit="contain"
          height='40'
          style="margin-top: 8px;"
          :show-loading="false"
          :src="require('@/assets/logo/logo.png')")

      van-cell-group.mb-8.pt-2(inset)
        van-field(
          v-model='formData.username'
          data-testid="username"
          autocomplete="off"
          left-icon="manager-o"
          :placeholder="$t('login.username')"
          :rules="[{ required: true, message: $t('login.usernameRule') }]")

        van-field(
          v-model='formData.password'
          data-testid="password"
          autocomplete="off"
          left-icon="shield-o"
          :type="showPwd?'':'password'"
          :placeholder="$t('login.password')"
          :rules="[{ required: true, message: $t('login.passwordRule') }]")
          template(#right-icon)
            van-icon(:name="showPwd?'eye-o':'closed-eye'" @click='showPwd = !showPwd')

        van-field(
          v-model='formData.code'
          data-testid="code"
          left-icon="sign"
          autocomplete="off"
          :placeholder="$t('login.code')"
          :rules="[{ required: true, message: $t('login.codeRule') }]")
          template(#extra)
            van-image(
              data-testid="captcha"
              width='96'
              height='36'
              :src='captcha.img'
              @click.native='getCaptcha'
              style="margin: -7px 0px;")

        van-cell(title)
          template(#extra)
            a.gray(@click='onForgetPwd') {{ $t('login.forgetPassword') }}

      van-cell-group(inset)
        van-button(:loading='buttonLoading' block type='info' native-type='submit' data-testid="submit")
          | {{ $t('login.login') }}

  .page__footer.h-auto
    .page-tip
      | {{ $t('login.noAccount') }}
      a {{ $t('login.contactManager') }}
</template>

<script setup>
import { ref, toRef, reactive, computed, watch } from 'vue'
import { Toast } from 'vant'
import { useRouter, useRoute } from '@/router'
import { encrypt, decrypt } from '@/utils/jsencrypt'
import Cookies from 'js-cookie'
import store from '@/store'
import storage from 'store2'
import i18n from '@/lang'
import * as API from '@/api/user'

const router = useRouter()
const route = useRoute()
const { ticket } = route.query

const form = ref(null)
const showPwd = ref(false)
const buttonLoading = ref(false)

const formData = reactive({
  username: '',
  password: '',
  code: '',
  uuid: '',
})

const captcha = toRef(store.state.user, 'captcha')
watch(captcha, (value) => {
  formData.uuid = value.uuid
})

// 跳转ops绑定的可登录用户列表
const toAccounts = computed(() => {
  return {
    path: '/login/accounts',
    query: { ...route.query },
  }
})

function getCaptcha() {
  return store.dispatch('user/captchaImage')
}

function resetToken() {
  return store.dispatch('user/resetToken')
}

function onForgetPwd() {
  Toast.fail(i18n.t('login.contactManager') + i18n.t('login.resetPassword'))
}

function onSubmit() {
  const values = { ...formData }
  Cookies.set('username', values['username'])
  Cookies.set('password', encrypt(values['password']))

  buttonLoading.value = true
  Toast.loading()

  return store
    .dispatch('user/login', values)
    .then((res) => {
      router.replace({
        path: '/dashboard',
        query: { ...route.query },
      })
    })
    .catch((e) => {
      getCaptcha()
    })
    .finally(() => {
      buttonLoading.value = false
      Toast.clear()
    })
}

getCaptcha()
resetToken()

// 重置路由计数
store.commit('route/RESET')

</script>

<style lang="scss" scoped>
:deep(.van-field) {
  .van-field__left-icon {
    margin-right: 15px;
    font-size: 18px;
  }
}
</style>
