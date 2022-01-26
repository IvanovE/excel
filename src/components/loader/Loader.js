import { D } from "@/core/dom"

export function Loader() {
  return D.create('div', 'loader').html(`
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
  `
  )
}
