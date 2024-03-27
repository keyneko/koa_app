import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import { Locale } from 'vant'

import vantEnLocale from 'vant/lib/locale/lang/en-US'
import vantZhLocale from 'vant/lib/locale/lang/zh-CN'
import vantJaLocale from 'vant/lib/locale/lang/ja-JP'

import enLocale from './en'
import zhLocale from './zh'
import jaLocale from './ja'

Vue.use(VueI18n)

const messages = {
  en: {
    ...vantEnLocale,
    ...enLocale,
  },
  zh: {
    ...vantZhLocale,
    ...zhLocale,
  },
  ja: {
    ...vantJaLocale,
    ...jaLocale,
  },
}

export function getLanguage() {
  const chooseLanguage = Cookies.get('language')

  return chooseLanguage === 'english'
    ? 'en'
    : chooseLanguage === 'chinese_traditional'
      ? 'hk'
      : chooseLanguage === 'japanese'
        ? 'ja'
        : 'zh'
}

export function vantLocales(lang) {
  if (lang === 'en' || lang === 'english') {
    Locale.use('en', vantEnLocale)
  }
  else if (lang === 'zh' || lang === 'chinese_simplified') {
    Locale.use('zh', vantZhLocale)
  }
  else if (lang === 'ja' || lang === 'japanese') {
    Locale.use('ja', vantJaLocale)
  }
}

const i18n = new VueI18n({
  locale: getLanguage(),
  fallbackLocale: 'zh',
  messages,
  silentTranslationWarn: true,
})

export default i18n
