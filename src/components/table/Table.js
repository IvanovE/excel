import { ExcelComponent } from "@/core/ExcelComponent"
import { createTable } from "@/components/table/tableTemplate"


export class Table extends ExcelComponent {
  // constructor($el) {
  //   super($el)
  // }

  static className = 'excel__table'

  toHTML() {
    return createTable(20)
  }
}
