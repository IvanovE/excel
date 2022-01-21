import { DomListener } from "@/core/DomListener"

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.observer = options.observer
    this.store = options.store
    this.subscribe = options.subscribe || []
    this.unsubs = []

    this.prepare()
  }

  prepare() {}

  toHTML() {
    return ""
  }

  $trigger(event, ...args) {
    this.observer.trigger(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.observer.on(event, fn)
    this.unsubs.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubs.forEach(unsub => unsub())
  }
}
