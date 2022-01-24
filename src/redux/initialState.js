import { storage } from "@/core/utils"
import { defaultStyles, defaultTitle } from "@/core/constants"

const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  titleState: defaultTitle,
  currentStyles: defaultStyles
}

export const initialState = storage('excel-state')
  ? storage('excel-state')
  : defaultState
