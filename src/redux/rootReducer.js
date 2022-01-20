import { types } from "@/redux/types"

export function rootReducer(state, action) {
  switch (action.type) {
    case types.TABLE_RESIZE:
      const prevState = state.colState || {}
      prevState[action.data.id] = action.data.value
      return {...state, colState: prevState}
    default: return state
  }
}
