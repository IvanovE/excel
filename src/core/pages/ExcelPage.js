import { Page } from "@/core/pages/page/Page"
import { Excel } from "@/components/excel/Excel"
import { Header } from "@/components/header/Header"
import { Toolbar } from "@/components/toolbar/Toolbar"
import { Formula } from "@/components/formula/Formula"
import { Table } from "@/components/table/Table"
import { createStore } from "@/core/store/createStore"
import { rootReducer } from "@/redux/rootReducer"
import { debounce, storage } from "@/utils/utils"
import { initialState } from "@/redux/initialState"

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params ? this.params : Date.now().toString()

    const store = createStore(rootReducer, initialState(params))
    const stateListener = debounce(state => {
      storage(storageName(params), state)
    }, 300)

    store.subscribe(stateListener)

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    })

    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
  }
}

function storageName(param) {
  return `excel:` + param
}
