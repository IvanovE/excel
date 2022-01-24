import { ExcelComponent } from "@/core/ExcelComponent"
import { TableSelection } from "@/components/table/TableSelection"
import { createTable } from "@/components/table/tableTemplate"
import { resizeHandler } from "@/components/table/tableResize"
import { shouldResize, isCell, selectedMatrix, nextSelector } from "@/components/table/tableFunctions"
import { D } from "@/core/dom"
import * as actions from '@/redux/actions'
import { defaultStyles } from "@/core/constants"
import { parse } from "@/core/utils"

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      subscribe: ['currentText'],
      ...options
    })
  }

  prepare() {
    this.selection = new TableSelection()
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  updateCell(value) {
    if (value === '') {
      this.selection.current
        .attribute('data-value', ' ')
        .content('')
      return
    }
    this.selection.current
      .attribute('data-value', value)
      .content(parse(value))
  }

  init() {
    super.init()
    this.selectCell(this.$root.querySelect('[data-id="0:0"]'))
    this.$on('formula:input', value => {
      this.updateCell(value)
      this.updateTextInStore(value)
    })
    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
    this.$on('toolbar:applyStyle', style => {
      this.selection.applyStyle(style)
      this.$dispatch(actions.applyStyle({
        style,
        ids: this.selection.selectedIds
      }))
    })
  }

  toHTML() {
    return createTable(50, this.store.getState())
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$trigger('table:select', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
    this.$dispatch(actions.selectCell({
      value: $cell.data.value
    }))
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.error('Resize error', e.message)
    }
  }

  async onMousedown(event) {
    if (shouldResize(event)) {
      await this.resizeTable(event)
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
    const value = D(event.target).content()
    this.updateCell(value)
    this.updateTextInStore(value)
  }
}
