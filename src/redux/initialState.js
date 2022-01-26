import { clone, storage } from "@/utils/utils"
import { defaultStyles, defaultTitle } from "@/utils/constants"

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  titleState: defaultTitle,
  currentStyles: defaultStyles,
  openedDate: new Date().toJSON()
}

export const initialState = (state) => {
  return storage(state)
  ? storage(state)
  : clone(defaultState)
}
