import { ExcelComponent } from "@/core/ExcelComponent"

export class Header extends ExcelComponent{
  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options
    })
  }

  static className = 'excel__header'

  toHTML() {
    return `
        <input type="text" class="input" placeholder="Новая таблица">
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
}
