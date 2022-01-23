import { types } from "@/redux/types"

export function rootReducer(state, action) {
  let field
  switch (action.type) {
    case types.TABLE_RESIZE:
      field = action.data.type + 'State'
      return {...state, [field]: value(state, field, action)}

    case types.CHANGE_TEXT:
      field = 'dataState'
      return {
        ...state,
        currentText: action.data.value,
        [field]: value(state, field, action)
      }

    case types.CHANGE_STYLES:
      return {...state, currentStyles: action.data}

    case types.APPLY_STYLE:
      field = 'stylesState'
      const prevState = state[field] || {}
      action.data.ids.forEach(id => {
        prevState[id] = {...prevState[id], ...action.data.style}
      })
      return {
        ...state,
        [field]: prevState,
        currentStyles: {...state.currentStyles, ...action.data.style}
      }

    default: return state
  }
}

function value(state, field, action) {
  const val = state[field] || {}
  val[action.data.id] = action.data.value
  return val
}
