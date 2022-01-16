const CODES = {
  A: 65,
  Z: 90
}


function createCell(_, index) {
  return `
    <div class="cell" data-col="${index}" contenteditable></div>
  `
}

function createColumn(charIndex, index) {
  return `
    <div class="column"  data-col="${index}" data-type="resizable">
        ${charIndex}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(index, content) {
  const resizer = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : ''

  return `
    <div class="row" data-type="resizable">
        <div class="row-info">
            ${index ? index : ''}
            ${resizer}
        </div>
        <div class="row-data">${content}</div>    
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(createColumn)
    .join('')

  rows.push(createRow(null, cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(createCell)
      .join('')

    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}
