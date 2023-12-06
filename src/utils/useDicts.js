import { ref, reactive, computed, toRef, set } from 'vue'
import store from '@/store'
import { find, debounce } from 'lodash'

const getDictDebounced = debounce(
  (key) => {
    store.dispatch('dicts/getDictionaries', key)
  },
  1000,
  { leading: true },
)

export default function useDicts() {
  const dicts = toRef(store.state.dicts, 'dicts')

  /**
   * 查找字典表（Look Up Table）
   * @param  {String} key  字典表名称
   * @param  {Number|String} value 字典项值
   * @return {String}       字典标签Label
   */
  const lut = computed(() => (key, value) => {
    const list = dicts.value[key]

    if (!list) {
      getDictDebounced(key)
    }

    const obj = find(dicts.value[key], (d) => d.value == value) || {}
    return obj.name || '-'
  })

  /**
   * 获取字典表下所有项列表
   * @param  {String} key 字典表名称
   * @return {Array}      字典表所有项列表
   */
  const options = computed(() => (key) => {
    const list = dicts.value[key]

    if (!list) {
      getDictDebounced(key)
    }

    return dicts.value[key] || []
  })

  return { lut, options }
}
