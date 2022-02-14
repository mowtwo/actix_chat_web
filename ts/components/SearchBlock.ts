import { searchStore } from "../store.js"
import { nextTick, PVueComponent } from "../utils.js"

type SearchBlockProps = {
  placeholder: string
  onInput: () => void
}
export const SearchBlock: PVueComponent<SearchBlockProps> = props => {
  return {
    ...props,
    $template: '#search-block',
    searchStore,
    inputFocus: false,
    nextTickBlur() {
      setTimeout(() => {
        nextTick(() => {
          this.inputFocus = false
        })
      }, 100)
    }
  }
}