import { D } from "@/core/dom"

export function resizeHandler($root, event) {
  return new Promise(resolve => {
    const $resizer = D(event.target)
    const $resizerParent = $resizer.closest('[data-type="resizable"]')
    const coords = $resizerParent.getCoords()
    const type = $resizer.data.resize
    const sideProp = type === 'col' ? 'bottom' : 'right'
    let value

    $resizer.css({
      opacity: 1,
      [sideProp]: '-5000px'
    })

    document.onmousemove = event => {
      if (type === 'col') {
        const delta = event.pageX - coords.right
        value = coords.width + delta
        $resizer.css({
          right: -delta + 'px'
        })
      } else {
        const delta = event.pageY - (coords.bottom + pageYOffset)
        value = coords.height + delta
        $resizer.css({
          bottom: -delta + 'px'
        })
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0
      })

      resolve({
        value,
        type,
        id: $resizerParent.data[type]
      })

      if (type === 'col') {
        $resizerParent.css({
          width: value + 'px'
        })
        $root
          .queryAll(`[data-col="${$resizerParent.data.col}"]`)
          .forEach(el => D(el).css({
            width: value + 'px'
          }))
      } else {
        $resizerParent.css({
          height: value + 'px'
        })
      }
    }
  })
}
