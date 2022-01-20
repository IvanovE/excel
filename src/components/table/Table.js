import { ExcelComponent } from "@/core/ExcelComponent"
import { TableSelection } from "@/components/table/TableSelection"
import { createTable } from "@/components/table/tableTemplate"
import { resizeHandler } from "@/components/table/tableResize"
import { shouldResize, isCell, selectedMatrix, nextSelector } from "@/components/table/tableFunctions"
import { D } from "@/core/dom"
import * as actions from '@/redux/actions'

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
    this.$on('formula:input', text => {
      this.selection.current.content(text)
    })
    this.$on('formula:done', () => {
      this.selection.current.focus()
    })

    // this.$subscribe(state => console.log(state))
  }

  toHTML() {
    return createTable(50, this.store.getState())
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$trigger('table:select', $cell)
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.error('Resize error', e.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
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
