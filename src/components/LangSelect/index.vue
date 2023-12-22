<template lang="pug">
van-dropdown-menu.lang-select.mr-2(active-color="#1989fa")
  van-dropdown-item(ref="item")
    template(#title)
      template(v-if="showText")
        svg-icon.flag.mr-2(:name="lang.icon")
        span {{ lang.text }}
      template(v-else)
        svg-icon(name='language')

    van-cell.text-left(
      v-for="(d, i) in options" :key="i"
      :class="{ active: lang.value == d.value}"
      center
      @click="onItemClicked(d)")
      template(#title)
        svg-icon.flag.mr-2(:name="d.icon")
        span {{ d.text }}
      template(v-if="lang.value == d.value")
        van-icon(name='success' color="#1989fa")
</template>

<script setup>
import { ref, toRef, computed } from 'vue'
import { Toast } from 'vant'
import { vantLocales } from '@/lang'
import i18n from '@/lang'
import store from '@/store'
import { find } from 'lodash'

const emits = defineEmits(['switched'])
const props = defineProps({
  showText: {
    type: Boolean,
    default: false,
  },
})

const item = ref(null)

const options = [
  { icon: 'cn', text: '简体中文', value: 'zh' },
  { icon: 'us', text: 'English', value: 'en' },
  { icon: 'jp', text: '日本語', value: 'ja' },
]

const language = toRef(store.getters, 'language')
const lang = computed(() => find(options, { value: language.value }) || {})

function onItemClicked(d) {
  item.value.toggle()

  i18n.locale = d.value
  vantLocales(d.value)

  store.commit('app/SET_LANGUAGE', d.value)
  store.commit('dicts/EMPTY_DICTS')

  Toast.success(i18n.t('g.langSwitched'))
  emits('switched', d.value)
}
</script>

<style lang="scss">
.lang-select {
  .van-dropdown-menu__bar {
    background-color: transparent;
    box-shadow: none;
  }
}
</style>

<style lang="scss" scoped>
.svg-icon {
  height: 16px;
  vertical-align: text-top;
}
</style>
