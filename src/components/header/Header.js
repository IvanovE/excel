import { ExcelComponent } from "@/core/ExcelComponent"
import { D } from "@/core/dom"
import { changeTitle } from "@/redux/actions"
import { debounce } from "@/core/utils"
import { ActiveRoute } from "@/core/routes/ActiveRoute"

export class Header extends ExcelComponent{
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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
            <div class="icon-btn" data-button="remove">
                <i class="far fa-trash-alt" data-button="remove"></i>
            </div>
            <div class="icon-btn" data-button="exit">
                <i class="fas fa-sign-out-alt" data-button="exit"></i>
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

  onClick(event) {
    const $target = D(event.target)
    if ($target.data.button === 'remove') {
      const desicion = confirm('Вы действительно хотите удалить эту таблицу?')
      if (desicion) {
        localStorage.removeItem(`excel:${ActiveRoute.param}`)
        ActiveRoute.navigate('')
      }
      return
    }
    if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }
}
