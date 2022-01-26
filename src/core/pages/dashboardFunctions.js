import {storage} from "@/utils/utils";

function toHTML(key) {
  const model = storage(key)
  const id = key.split(':')[1]
  const date = new Date(model.openedDate).toLocaleDateString()
  const time = new Date(model.openedDate).toLocaleTimeString()
  return `
      <li class="dashboard__record">
          <a href="#excel/${id}">${model.titleState}</a>
          <strong>${date} - ${time}</strong>
      </li>
  `
}

function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}

export function createRecordsTable() {
  const keys = getAllKeys()
  if (!keys.length) {
    return `<p class="dashboard__table-empty">Пока что вы не создали ни одной таблицы</p>`
  }

  const records = keys.map(toHTML).join('')
  return `
      <div class="dashboard__list-header">
          <span>Название</span>
          <span>Дата открытия</span>
      </div>
      
      <ul class="dashboard__list">
        ${records}
      </ul>
  `
}
