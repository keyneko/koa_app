<template lang="pug">
.page--fixed
  .page__header
    van-nav-bar(:title="$t('routes.register')" left-arrow)
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
          v-model='formData.password2'
          data-testid="password2"
          autocomplete="off"
          left-icon="shield-o"
          :type="showPwd?'':'password'"
          :placeholder="$t('login.plhrRepeatPswd')"
          :rules="[{ validator: v => v == formData.password, message: $t('login.inconsistentPswd') }]")

        van-field(
          v-model='formData.captcha'
          data-testid="captcha"
          left-icon="sign"
          autocomplete="off"
          :placeholder="$t('login.plhrCaptcha')"
          :rules="[{ required: true, message: $t('login.requireCaptcha') }]")
          template(#extra)
            .captcha(v-html="captcha.captcha" @click='getCaptcha')

      van-cell-group(inset)
        van-button(:loading='buttonLoading' block type='info' native-type='submit' data-testid="submit")
          | {{ $t('register') }}

  .page__footer.h-auto
    .page-tip
      | {{ $t('login.hasAccount') }}&nbsp;
      router-link.underline(:to="toLogin") {{ $t('login.toLogin') }}
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
  password2: '',
  captcha: '',
  captchaId: '',
})

const captcha = toRef(store.state.user, 'captcha')
watch(captcha, value => {
  formData.captchaId = value.captchaId
})

const toLogin = computed(() => {
  return {
    path: '/login',
    query: {},
  }
})

function getCaptcha() {
  formData.captcha = ''
  formData.captchaId = ''
  return store.dispatch('user/captcha')
}

function onSubmit() {
  Toast.loading()
  buttonLoading.value = true
  return API.register(formData).then(res => {
    Toast.success( i18n.t('registered') )
    router.replace( toLogin.value )
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
