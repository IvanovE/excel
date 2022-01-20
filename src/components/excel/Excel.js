import { D } from "@/core/dom"
import { Observer } from "@/core/Observer"

export class Excel {
  constructor(selector, options) {
    this.$el = D(selector)
    this.components = options.components || []
    this.store = options.store
    this.observer = new Observer()
  }

  getRoot() {
    const $root = D.create('div', 'excel')
    const componentOptions = {
      observer: this.observer,
      store: this.store
    }

    this.components = this.components.map(Component => {
      const $el = D.create('div', Component.className)
      const component = new Component($el, componentOptions)
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

  destroy() {
    this.components.forEach(component => component.destroy())
  }
}
