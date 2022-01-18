import { ExcelComponent } from "@/core/ExcelComponent"

export class Toolbar extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options
    })
  }

  static className = 'excel__toolbar'

  toHTML() {
    return `
        <div class="icon-btn">
            <i class="fas fa-bold"></i>
        </div>
        <div class="icon-btn">
            <i class="fas fa-italic"></i>
        </div>
        <div class="icon-btn">
            <i class="fas fa-underline"></i>
        </div>
        <div class="icon-btn">
            <i class="fas fa-align-left"></i>
        </div>
        <div class="icon-btn">
            <i class="fas fa-align-center"></i>
        </div>
        <div class="icon-btn">
            <i class="fas fa-align-right"></i>
        </div>
    `
  }

  onClick(event) {
    console.log(event.target)
  }
}
