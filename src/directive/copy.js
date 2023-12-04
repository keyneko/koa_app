import Clipboard from 'clipboard'
import { Toast } from 'vant'
import i18n from '@/lang'

const Copy = {
  bind(el, binding) {
    el.addEventListener('click', (evt) => {
      const clipboard = new Clipboard(el, {
        text: () => {
          return binding.value || el.innerText
        },
      })

      function clipboardSuccess(toast) {
        Toast.success(toast || i18n.t('gp.copied'))
      }

      function clipboardError() {
        Toast.fail(i18n.t('gp.copyFailed'))
      }

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
