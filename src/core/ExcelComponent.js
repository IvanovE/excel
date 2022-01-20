import { DomListener } from "@/core/DomListener"

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.observer = options.observer
    this.store = options.store
    this.unsubs = []
    this.storeSub = null

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

  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn)
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubs.forEach(unsub => unsub())
    this.storeSub.unsubscribe()
  }
}
