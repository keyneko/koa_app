<template lang="pug">
.page--fixed
  .page__header
    van-nav-bar(:title="$t('routes.login')" left-arrow)
      template(#left): div
      template(#right)
        LangSelect

  .page__body.justify-center
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
          :placeholder="$t('login.plhrUsername')"
          :rules="[{ required: true, message: $t('login.requireUsername') }]")

        van-field(
          v-model='formData.password'
          data-testid="password"
          autocomplete="off"
          left-icon="shield-o"
          :type="showPwd?'':'password'"
          :placeholder="$t('login.plhrPswd')"
          :rules="[{ required: true, message: $t('login.requirePswd') }]")
          template(#right-icon)
            van-icon(:name="showPwd?'eye-o':'closed-eye'" @click='showPwd = !showPwd')

        van-field(
          v-model='formData.captcha'
          data-testid="captcha"
          left-icon="sign"
          autocomplete="off"
          :placeholder="$t('login.plhrCaptcha')"
          :rules="[{ required: true, message: $t('login.requireCaptcha') }]")
          template(#extra)
            .captcha(v-html="captcha.captcha" @click='getCaptcha')

        van-cell(title)
          template(#extra)
            a.gray(@click='onForgetPwd') {{ $t('login.forgetPswd') }}

      van-cell-group(inset)
        van-button(:loading='buttonLoading' block type='info' native-type='submit' data-testid="submit")
          | {{ $t('login_') }}

  .page__footer.h-auto
    .page-tip
      | {{ $t('login.noAccount') }}&nbsp;
      router-link.underline(:to="toRegister") {{ $t('login.toRegister') }}
</template>

<script setup>
import { ref, toRef, reactive, computed, watch } from 'vue'
import { Toast } from 'vant'
import { useRouter, useRoute } from '@/router'
import { encrypt, decrypt } from '@/utils/jsencrypt'
import Cookies from 'js-cookie'
import store from '@/store'
import i18n from '@/lang'
import * as API from '@/api/user'
import LangSelect from '@/components/LangSelect'

const router = useRouter()
const route = useRoute()

const form = ref(null)
const showPwd = ref(false)
const buttonLoading = ref(false)

const formData = reactive({
  username: '',
  password: '',
  captcha: '',
  captchaId: '',
})

const captcha = toRef(store.state.user, 'captcha')
watch(captcha, value => {
  formData.captchaId = value.captchaId
})

const toRegister = computed(() => {
  return {
    path: '/register',
    query: {},
  }
})

const toDashboard = computed(() => {
  return {
    path: '/dashboard',
    query: {},
  }
})

function getCaptcha() {
  formData.captcha = ''
  formData.captchaId = ''
  return store.dispatch('user/captcha')
}

function resetToken() {
  return store.dispatch('user/resetToken')
}

function onForgetPwd() {
  Toast( i18n.t('login.callAdmin') )
}

function onSubmit() {
  Toast.loading()
  buttonLoading.value = true
  return store.dispatch('user/login', formData).then(res => {
    router.replace( toDashboard.value )
  })
  .catch(e => {
    getCaptcha()
  })
  .finally(() => {
    Toast.clear()
    buttonLoading.value = false
  })
}

getCaptcha()
resetToken()
</script>

<style lang="scss" scoped>
:deep(.van-field) {
  .van-field__left-icon {
    margin-right: 15px;
    font-size: 18px;
  }
}

:deep(.captcha) {
  width: 96px;
  height: 36px;
  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
