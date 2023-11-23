import { ref, onMounted, onActivated, onDeactivated } from 'vue'

function get$Page() {
  return document.querySelector("#app > [class^=page]") || document.getElementById('app')
}

/**
 * 滚动页面
 * @param  {Number|HTMLElement} elOrNumy
 * @param  {String} behavior "auto"、"instant"、"smooth"
 */
function scrollPage(elOrNumy, behavior = 'instant') {
  try {
    if (elOrNumy instanceof HTMLElement) {
      elOrNumy.scrollIntoView({
        behavior,
        block: 'center',
        inline: 'nearest',
      })
    }
    else if (typeof elOrNumy == 'number') {
      const $page = get$Page()
      $page.scroll({
        behavior,
        top: elOrNumy,
        left: 0
      })
    }
  }
  catch (e) {}
}

export default function useScrollPage(behavior = 'instant') {
  const y = ref(0)

  onMounted(() => {
    y.value = 0
    scrollPage(0, behavior)
  })

  onActivated(() => {
    scrollPage(y.value, behavior)
  })

  onDeactivated(() => {
    const $page = get$Page()
    y.value = $page.scrollTop || 0
  })

  return { y, scrollPage }
}
