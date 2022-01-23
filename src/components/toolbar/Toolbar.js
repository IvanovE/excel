import { createToolbar } from "@/components/toolbar/toolbarTemplate"
import { D } from "@/core/dom"
import { ExcelStateComponent } from "@/core/ExcelStateComponent"
import { defaultStyles } from "@/core/constants"

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    })
  }

  prepare() {
    this.initState(defaultStyles)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles)
  }

  onClick(event) {
    const $target = D(event.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)
      this.$trigger('toolbar:applyStyle', value)
    }
  }
}
