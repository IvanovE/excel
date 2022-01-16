import { ExcelComponent } from "@/core/ExcelComponent"
import { createTable } from "@/components/table/tableTemplate"
import { resizeHandler } from "@/components/table/tableResize"
import { shouldResize } from "@/components/table/tableFunctions"

export class Table extends ExcelComponent {
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    })
  }

  static className = 'excel__table'

  toHTML() {
    return createTable(50)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    }
  }
}
