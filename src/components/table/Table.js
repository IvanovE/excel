import { ExcelComponent } from "@/core/ExcelComponent"
import { TableSelection } from "@/components/table/TableSelection"
import { createTable } from "@/components/table/tableTemplate"
import { resizeHandler } from "@/components/table/tableResize"
import { shouldResize, isCell, selectedMatrix, nextSelector } from "@/components/table/tableFunctions"
import { D } from "@/core/dom"

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    this.selectCell(this.$root.querySelect('[data-id="0:0"]'))
    this.$subscribe('formula:input', text => {
      this.selection.current.content(text)
    })
    this.$subscribe('formula:done', () => {
      this.selection.current.focus()
    })
  }

  toHTML() {
    return createTable(50)
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$trigger('table:select', $cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    }

    if (isCell(event)) {
      const $target = D(event.target)
      if (event.shiftKey) {
        const $cells = selectedMatrix($target, this.selection.current)
          .map(el => this.$root.querySelect(`[data-id="${el}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown']
    const {key} = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.querySelect(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  onInput(event) {
    this.$trigger('table:input', D(event.target))
  }
}
