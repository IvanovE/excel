import { ExcelComponent } from "@/core/ExcelComponent"
import { D } from "@/core/dom"

export class Formula extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }

  static className = 'excel__formula'

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `
  }

  init() {
    super.init()
    this.$formula = this.$root.querySelect('#formula')
    this.$on('table:select', $cell => {
      this.$formula.content($cell.content())
    })
    this.$on('table:input', $cell => {
      this.$formula.content($cell.content())
    })
  }

  onInput(event) {
    this.$trigger('formula:input', D(event.target).content())
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$trigger('formula:done')
    }
  }
}
