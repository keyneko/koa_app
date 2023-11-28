<template lang="pug">
.page--fixed
  .page__header
    van-nav-bar(title="登录" left-arrow)
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
          v-model='formData.captcha'
          data-testid="captcha"
          left-icon="sign"
          autocomplete="off"
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '验证码不能为空' }]")
          template(#extra)
            .captcha(v-html="captcha" @click='getCaptcha')

        van-cell(title)
          template(#extra)
            a.gray(@click='onForgetPwd') 忘记密码？

      van-cell-group(inset)
        van-button(:loading='buttonLoading' block type='info' native-type='submit' data-testid="submit")
          | 登录

  .page__footer.h-auto
    .page-tip
      | 没有帐号？
      a 请联系管理员
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
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
  captcha: '',
  captchaId: '',
})

const captcha = ref('')

function getCaptcha() {
  return API.captcha().then(res => {
    captcha.value = res.captcha
    formData.captchaId = res.captchaId
  })
}

function resetToken() {
  // return store.dispatch('user/resetToken')
}

function onForgetPwd() {
  Toast.fail('请联系管理员重置密码')
}

function onSubmit() {

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
