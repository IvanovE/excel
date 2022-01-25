import { clone, storage } from "@/core/utils"
import { defaultStyles, defaultTitle } from "@/core/constants"

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

export const initialState = (id) => {
  return storage(`excel:${id}`)
  ? storage(`excel:${id}`)
  : clone(defaultState)
}
