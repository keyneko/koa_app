import { ref, reactive, computed, toRef, set } from 'vue'
import store from '@/store'
import { find, debounce } from 'lodash'

const getDictDebounced = debounce(
  (name) => {
    store.dispatch('dicts/getDict', name)
  },
  1000,
  { leading: true }
)

export default function useDicts() {
  const dicts = toRef(store.state.dicts, 'dicts')

  /**
   * 查找字典表（Look Up Table）
   * @param  {String} name  字典表名称
   * @param  {Number|String} value 字典项值
   * @return {String}       字典标签Label
   */
  const lut = computed(() => (name, value) => {
    const list = dicts.value[name]

    if (!list) {
      getDictDebounced(name)
    }

    const obj = find(dicts.value[name], (d) => d.dictValue == value) || {}
    return obj.dictLabel || '-'
  })

  /**
   * 获取字典表下所有项列表
   * @param  {String} name 字典表名称
   * @return {Array}      字典表所有项列表
   */
  const options = computed(() => (name) => {
    const list = dicts.value[name]

    if (!list) {
      getDictDebounced(name)
    }

    return dicts.value[name] || []
  })

  return { lut, options }
}
