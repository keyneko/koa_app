import store from '@/store'
import english from './nomenclature_english'

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      console.log('loaded script:', src)
      resolve()
    }
    script.onerror = (e) => {
      reject(e)
    }
    document.head.appendChild(script)
  })
}

export async function initTranslate() {
  await loadScript('/js/translate.js')

  translate.selectLanguageTag.show = false
  translate.service.use('client.edge')
  translate.language.setLocal('chinese_simplified')
  translate.ignore.tag.push('code')
  translate.ignore.tag.push('ign')
  translate.listener.start()

  await store.dispatch('app/getLanguages')

  // Set nomenclatures
  ;[english].forEach((lang) => {
    let text = ''
    for (const key in lang.list) {
      text += key + '=' + lang.list[key] + '\n'
    }

    // console.log('chinese_simplified', lang.id, text)
    translate.nomenclature.append('chinese_simplified', lang.id, text)
  })

  setTimeout(() => {
    translate.execute()
  }, 1000)
}
