<template lang="pug">
van-dropdown-menu.lang-select.mr-2.ignore(active-color="#1989fa")
  van-dropdown-item(ref="dropdownItem")
    template(#title)
      template(v-if="showText")
        svg-icon.flag.mr-2(v-if="selLanguage.flag" :name="selLanguage.flag")
        span {{ selLanguage.text || '选择语言' }}
      template(v-else)
        svg-icon(name='language')

    van-cell.text-left(
      v-for="(d, i) in options" :key="i"
      :class="{ active: selLanguage.value == d.value}"
      center
      @click="onItemClicked(d)")
      template(#title)
        svg-icon.flag.mr-2(:name="d.flag")
        span {{ d.text }}
      template(v-if="selLanguage.value == d.value")
        van-icon(name='success' color="#1989fa")
</template>

<script setup>
import { ref, toRef, computed } from 'vue'
import { Toast } from 'vant'
import { vantLocales } from '@/lang'
import store from '@/store'
import { find, map } from 'lodash'

const props = defineProps({
  showText: {
    type: Boolean,
    default: false,
  },
})

const dropdownItem = ref(null)
const language = toRef(store.getters, 'language')
const languages = toRef(store.state.app, 'languages')
const selLanguage = computed(() => find(options.value, { value: language.value }) || {})

function onItemClicked(d) {
  store.dispatch('app/setLanguage', d.value)
  dropdownItem.value.toggle()
  vantLocales(d.value)

  try {
    translate.changeLanguage(d.value)
    translate.execute()
  }
  catch (e) {}
}

const options = computed(() => {
  return map(languages.value, (d) => ({
    flag: d.flag || 'xx',
    text: d.name,
    value: d.id,
  }))
})
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
:deep(.van-cell).active {
  background-color: #def2ff;
}

.svg-icon {
  height: 16px;
  vertical-align: text-bottom;
}
</style>
