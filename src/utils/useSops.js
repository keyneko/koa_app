import { ref, computed, toRef } from 'vue'
import store from '@/store'
import SOP from './sop'
import { find } from 'lodash'

export default function useSops() {
  const sops = toRef(store.state.user, 'sops')
  const hasSop = computed(() => (sopCode) => find(sops.value, (d) => d.sopCode == sopCode))

  /**
   * Get the icon based on sopCode
   */
  const sopIcon = computed(() => (sopCode) => {
    // prettier-ignore
    switch (sopCode) {
      /* eslint-disable no-multi-spaces */
      case SOP.rolesManagement          : return '更多应用'
      case SOP.usersManagement          : return '更多应用'
      case SOP.barcodeGenerate          : return '条码查询'
      case SOP.barcodeManagement        : return '条码查询'
      case SOP.positionGenerate         : return '条码查询'
      case SOP.positionManagement       : return '条码查询'
      /* eslint-enable no-multi-spaces */
    }
  })

  /**
   * Get the entrance path based on sopCode
   */
  const getEntryPath = computed(() => (sopCode) => {
    // prettier-ignore
    switch (sopCode) {
      /* eslint-disable no-multi-spaces */
      case SOP.rolesManagement          : return '/roles'
      case SOP.usersManagement          : return '/users'
      case SOP.barcodeGenerate          : return '/barcode/generate'
      case SOP.barcodeManagement        : return '/barcode/query'
      case SOP.positionGenerate         : return '/position/generate'
      case SOP.positionManagement       : return '/position/query'
      /* eslint-enable no-multi-spaces */
    }
  })

  return {
    sops,
    hasSop,
    sopIcon,
    getEntryPath,
  }
}
