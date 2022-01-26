import { Page } from "@/core/pages/page/Page"
import { D } from "@/core/dom"
import { createRecordsTable } from "@/shared/dashboardFunctions"

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString()
    return D.create('div', 'dashboard').html(
      `
        <div class="dashboard__header">
            <h1>Excel Dashboard</h1>
        </div>
        <div class="dashboard__new">
            <a href="#excel/${now}" class="dashboard__create">
                <i class="fas fa-plus"></i>
            </a>
        </div>
        <div class="dashboard__table">
          ${createRecordsTable()}
        </div>
    `
    )
  }
}
