import Clipboard from 'clipboard'
import { Toast } from 'vant'
import i18n from '@/lang'

const Copy = {
  bind(el, binding) {
    const { silent } = binding.modifiers

    el.addEventListener('click', (evt) => {
      const clipboard = new Clipboard(el, {
        text: () => {
          return binding.value || el.innerText
        },
      })

      function clipboardSuccess(toast) {
        if (!silent) Toast.success(toast || i18n.t('g.copied'))
      }

      function clipboardError() {}

      clipboard.on('success', () => {
        clipboardSuccess(binding.arg)
        clipboard.destroy()
      })

      clipboard.on('error', () => {
        clipboardError()
        clipboard.destroy()
      })

      clipboard.onClick(evt)
    })
  },
}

export default Copy
