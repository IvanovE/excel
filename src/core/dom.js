class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    this.$el.append(node)
    return this
  }

  addListener(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  removeListener(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  closest(selector) {
    return D(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }
}

export function D(selector) {
  return new Dom(selector)
}

D.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return D(el)
}
