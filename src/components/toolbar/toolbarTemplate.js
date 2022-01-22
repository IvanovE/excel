function toButton(button) {
  const meta = `
    data-type="button"
    data-value='${JSON.stringify(button.value)}'
  `
  return `
      <div class="icon-btn ${button.active ? 'active' : ''}" ${meta}>
        <i class="${button.icon}" ${meta}></i>
      </div>
  `
}

export function createToolbar(state) {
  const buttons = [
    {
      icon: 'fas fa-bold',
      active: state['fontWeight'] === 'bold',
      value: {fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold'}
    },
    {
      icon: 'fas fa-italic',
      active: state['fontStyle'] === 'italic',
      value: {fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic'}
    },
    {
      icon: 'fas fa-underline',
      active: state['textDecoration'] === 'underline',
      value: {textDecoration: state['textDecoration'] === 'underline' ? 'none' : 'underline'}
    },
    {
      icon: 'fas fa-align-left',
      active: false,
      value: {textAlign: 'left'}
    },
    {
      icon: 'fas fa-align-center',
      active: false,
      value: {textAlign: 'center'}
    },
    {
      icon: 'fas fa-align-right',
      active: false,
      value: {textAlign: 'right'}
    }
  ]
  return buttons.map(toButton).join('')
}
