import { D } from "@/core/dom"

export class Excel {
  constructor(selector, options) {
    this.$el = D(selector)
    this.components = options.components || []
  }

  getRoot() {
    const $root = D.create('div', 'excel')

    this.components = this.components.map(Component => {
      const $el = D.create('div', Component.className)
      const component = new Component($el)
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })

    return $root
  }

  render() {
    this.$el.append(this.getRoot())

    this.components.forEach(component => component.init())
  }
}
