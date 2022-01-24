import "regenerator-runtime/runtime"

import './sass/index.sass'
require('./index.html')

import { Router } from "@/core/routes/Router"
import { DashboardPage } from "@/core/pages/DashboardPage"
import { ExcelPage } from "@/core/pages/ExcelPage"


new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage
})
