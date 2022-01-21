import { types } from "@/redux/types"

export function rootReducer(state, action) {
  let prevState
  switch (action.type) {
    case types.TABLE_RESIZE:
      const field = action.data.type + 'State'
      prevState = state[field] || {}
      prevState[action.data.id] = action.data.value
      return {...state, [field]: prevState}

    case types.CHANGE_TEXT:
      prevState = state['dataState'] || {}
      prevState[action.data.id] = action.data.value
      return {...state, currentText: action.data.value, dataState: prevState}

    default: return state
  }
}
