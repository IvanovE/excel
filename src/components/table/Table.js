import { ExcelComponent } from "@/core/ExcelComponent"
import { createTable } from "@/components/table/tableTemplate"
import { D } from "@/core/dom"


export class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    })
  }

  static className = 'excel__table'

  toHTML() {
    return createTable(20)
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = D(event.target)
      const $resizerParent = $resizer.closest('[data-type="resizable"]')
      const coords = $resizerParent.getCoords()

      document.onmousemove = event => {
        const delta = event.pageX - coords.right
        const newWidth = coords.width + delta
        $resizerParent.$el.style.width = newWidth + 'px'
      }

      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }
}
