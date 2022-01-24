import { ExcelComponent } from "@/core/ExcelComponent"
import { D } from "@/core/dom"
import { changeTitle } from "@/redux/actions"
import { debounce } from "@/core/utils"

export class Header extends ExcelComponent{
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const title = this.store.getState().titleState
    return `
        <input type="text" class="input" value="${title}">
        <div class="icons">
            <div class="icon-btn">
                <i class="far fa-trash-alt"></i>
            </div>
            <div class="icon-btn">
                <i class="fas fa-sign-out-alt"></i>
            </div>
        </div>
    `
  }

  onInput(event) {
    const $target = D(event.target)
    this.$dispatch(changeTitle({
      title: $target.content()
    }))
  }
}
