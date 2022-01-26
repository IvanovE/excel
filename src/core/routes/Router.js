import { D } from "@/core/dom"
import { ActiveRoute } from "@/core/routes/ActiveRoute"
import { Loader } from "@/components/loader/Loader"

export class Router {
  constructor(selector, routes = {}) {
    if (!selector) {
      throw new Error('Selector is not provided in router')
    }
    this.$placeholder = D(selector)
    this.routes = routes
    this.page = null
    this.changePageHandler = this.changePageHandler.bind(this)
    this.loader = new Loader()
    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  async changePageHandler() {
    this.$placeholder
      .clear()
      .append(this.loader)
    if (this.page) {
      this.page.destroy()
    }
    const Page = ActiveRoute.path.includes('excel')
      ? this.routes.excel
      : this.routes.dashboard
    this.page = new Page(ActiveRoute.param)
    const root = await this.page.getRoot()
    this.$placeholder
      .clear()
      .append(root)
    this.page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
