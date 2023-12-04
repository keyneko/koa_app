<template lang="pug">
.page--fixed
  .page__header
    van-nav-bar(title="注册" left-arrow)
      template(#left): div

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
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '用户名不能为空' }]")

        van-field(
          v-model='formData.password'
          data-testid="password"
          autocomplete="off"
          left-icon="shield-o"
          :type="showPwd?'':'password'"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '密码不能为空' }]")
          template(#right-icon)
            van-icon(:name="showPwd?'eye-o':'closed-eye'" @click='showPwd = !showPwd')

        van-field(
          v-model='formData.password2'
          data-testid="password2"
          autocomplete="off"
          left-icon="shield-o"
          :type="showPwd?'':'password'"
          placeholder="请重复密码"
          :rules="[{ validator: v => v == formData.password, message: '密码不一致' }]")

        van-field(
          v-model='formData.captcha'
          data-testid="captcha"
          left-icon="sign"
          autocomplete="off"
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '验证码不能为空' }]")
          template(#extra)
            .captcha(v-html="captcha.captcha" @click='getCaptcha')

      van-cell-group(inset)
        van-button(:loading='buttonLoading' block type='info' native-type='submit' data-testid="submit")
          | 注册

  .page__footer.h-auto
    .page-tip
      | 已有帐号？
      router-link(:to="toLogin") 直接登录
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
    Toast.success('注册成功')
    router.replace( toLogin.value )
  })
  .finally(() => {
    Toast.clear()
    buttonLoading.value = false
    getCaptcha()
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
