const CODES = {
  A: 65,
  Z: 90
}

function getWidth(index, colState) {
  if (!colState) return
  return colState[index] ? colState[index] + 'px' : ''
}

function createCell({col, row, width}) {
  const widthStorage = width ? `style ="width: ${width}"` : ''
  return `
  <div
      class="cell" 
      data-type="cell"
      data-col="${col}" 
      data-id="${row}:${col}" 
      contenteditable
      ${widthStorage}
  ></div>
`
}

function createColumn({charIndex, index, width}) {
  const widthStorage = width ? `style ="width: ${width}"` : ''
  return `
    <div class="column"  data-col="${index}" data-type="resizable" ${widthStorage}>
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

function prepareColumn(state) {
  return function (charIndex, index) {
    return {
      charIndex,
      index,
      width: getWidth(index, state.colState)
    }
  }
}

function prepareCell(row, state) {
  return function (_, col) {
    return {
      col,
      row,
      width: getWidth(col, state.colState)
    }
  }
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(prepareColumn(state))
    .map(createColumn)
    .join('')

  rows.push(createRow(null, cols))

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(prepareCell(row, state))
      .map(createCell)
      .join('')

    rows.push(createRow(row + 1, cells))
  }

  return rows.join('')
}
