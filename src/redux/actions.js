import { types } from "@/redux/types"

export function tableResize(data) {
  return {
    type: types.TABLE_RESIZE,
    data
  }
}
