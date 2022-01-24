function toHTML() {
  return `
      <li class="dashboard__record">
          <a href="#">Таблица номер 1</a>
          <strong>12.12.2021</strong>
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
    return `<p>Пока что вы не создали ни одной таблицы</p>`
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
