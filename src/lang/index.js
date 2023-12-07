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
  }
}

const dateTimeFormats = {
  'en': {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    medium: { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric' }
  },
  'zh': {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    medium: { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: true }
  },
  'ja': {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    medium: { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: true }
  }
}

export function getLanguage() {
  const chooseLanguage = Cookies.get('language')
  if (chooseLanguage) return chooseLanguage

  // if has not choose language
  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'en'
}

export function vantLocales(lang) {
  if (lang === 'en') {
    Locale.use(lang, vantEnLocale)
  }
  else if (lang === 'zh') {
    Locale.use(lang, vantZhLocale)
  }
  else if (lang === 'ja') {
    Locale.use(lang, vantJaLocale)
  }
}

const i18n = new VueI18n({
  dateTimeFormats,
  locale: getLanguage(),
  messages,
  silentTranslationWarn: true,
})

export default i18n
