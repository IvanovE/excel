export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  select($el) {
    this.clear()
    $el.addClass(TableSelection.className)
      .focus()
    this.group.push($el)
    this.current = $el
  }

  clear() {
    this.group.forEach($cell => $cell.removeClass(TableSelection.className))
    this.group = []
  }

  get selectedIds() {
    return this.group.map($el => $el.id())
  }

  selectGroup($group = []) {
    this.clear()
    this.group = $group
    this.group.forEach($el => $el.addClass(TableSelection.className))
  }

  applyStyle(style) {
    this.group.forEach($el => $el.css(style))
  }
}
